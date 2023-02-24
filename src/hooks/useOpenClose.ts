import { useCallback, useEffect, useState } from "react";
import { Week } from "../components/commons/hours";

function useOpenClose(hoursData: Week, timeZone: string) {
  const [openObject, setOpenObject] = useState({
    isClosed: true,
    isOpen: false,
    start: "",
    end: "",
    day: "",
  });

  const timeStringToNumber = (timeString: any) => {
    const parts = timeString.split(":");
    const hours = parseInt(parts[0].replace(/\u200E/g, ""), 10);
    const minutes = parseInt(parts[1].replace(/\u200E/g, ""), 10);
    return hours * 3600 + minutes * 60;
  };

  const getIntervalOnDate = (
    hoursData: Week,
    key: string,
    index: number
  ) => {
    // Check for holiday
    if (hoursData && hoursData.holidayHours) {
      const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];

      const now = new Date();
      const currentDate = new Date(
        now.toLocaleString("en-US", { timeZone: timeZone })
      );

      currentDate.setDate(currentDate.getDate() + index);
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const dateString =
        year +
        "-" +
        (month < 10 ? "0" + month : month) +
        "-" +
        (day < 10 ? "0" + day : day);
      for (let i = 0; i < hoursData.holidayHours.length; i++) {
        const holiday = hoursData.holidayHours[i];
        // console.log('dateString', dateString,holiday.date, key, index, day)
        if (holiday.date === dateString) {
          if (holiday.openIntervals) {
            return { interval: holiday.openIntervals, isHoliday: true };
          } else if (holiday.isClosed === true) {
            return null;
          }
        }
      }
    }

    // Not on holiday
    if (hoursData && hoursData[key] && hoursData[key].openIntervals) {
      return { interval: hoursData[key].openIntervals, isHoliday: false };
    } else {
      return null;
    }
  };

  const getSorterForCurrentDay = (
    timeZone: string
  ): { [key: string]: number } => {
    const dayIndexes = [0, 1, 2, 3, 4, 5, 6];
    const now = new Date();
    const todayIndex = new Date(
      now.toLocaleString("en-US", { timeZone: timeZone })
    ).getDay();
    const updatedDayIndexes = [];
    for (let i = 0; i < dayIndexes.length; i++) {
      let dayIndex = dayIndexes[i];
      if (dayIndex - todayIndex >= 0) {
        dayIndex = dayIndex - todayIndex;
      } else {
        dayIndex = dayIndex + 7 - todayIndex;
      }
      updatedDayIndexes[i] = dayIndex;
    }

    return {
      sunday: updatedDayIndexes[0],
      monday: updatedDayIndexes[1],
      tuesday: updatedDayIndexes[2],
      wednesday: updatedDayIndexes[3],
      thursday: updatedDayIndexes[4],
      friday: updatedDayIndexes[5],
      saturday: updatedDayIndexes[6],
    };
  };

  const sortByDay = (week: Week, timeZone: string): Week => {
    const tmp = [];
    for (const [k, v] of Object.entries(week)) {
      tmp[getSorterForCurrentDay(timeZone)[k]] = { key: k, value: v };
    }

    const orderedWeek: Week = {};
    tmp.forEach((obj) => {
      orderedWeek[obj.key] = obj.value;
    });

    return orderedWeek;
  };

  //   console.log('hoursData', hoursData)

  const checkOpenClose = useCallback(() => {
    const now = new Date();
    const currentTime = new Date(
      now.toLocaleString("en-US", { timeZone: timeZone })
    );
    const nowTimeNumber =
      currentTime.getHours() * 3600 + currentTime.getMinutes() * 60;
    const sortedObject = sortByDay(hoursData, timeZone);

    const keysArray = Object.keys(sortedObject);
    // console.log("sortedObject", sortedObject);

    for (let index = 0; index < keysArray.length; index++) {
      const key = keysArray[index];
      let openRightNow = false;
      let timeInterval = null;
      let obj = {
        isClosed: true,
        isOpen: false,
        start: "",
        end: "",
        day: index === 0 ? "" : key,
      };

      const intr = getIntervalOnDate(hoursData, key, index);
      // console.log(key, index, intr);
      if (intr) {
        for (let i = 0; i < intr.interval.length; i++) {
          const interval = intr.interval[i];
          const startIntervalNumber = timeStringToNumber(interval.start);
          const endIntervalNumber = timeStringToNumber(interval.end);

          if (intr.isHoliday) {
            if (
              nowTimeNumber >= startIntervalNumber &&
              nowTimeNumber < endIntervalNumber
            ) {
              timeInterval = interval;
              openRightNow = index === 0 ? true : false;
              break;
            } else if (nowTimeNumber < startIntervalNumber) {
              timeInterval = interval;
              openRightNow = false;
              break;
            } else if (index !== 0) {
              timeInterval = interval;
            }
          } else if (index === 0) {
            if (endIntervalNumber < startIntervalNumber) {
              if (nowTimeNumber >= startIntervalNumber) {
                timeInterval = interval;
                openRightNow = index === 0 ? true : false;
                break;
              }
            } else if (
              nowTimeNumber >= startIntervalNumber &&
              nowTimeNumber < endIntervalNumber
            ) {
              timeInterval = interval;
              openRightNow = index === 0 ? true : false;
              break;
            } else if (nowTimeNumber < startIntervalNumber) {
              timeInterval = interval;
              break;
            }
          } else {
            // console.log('interval', interval);

            timeInterval = interval;
            break;
          }
        }
      }

      if (timeInterval) {
        obj = {
          isClosed: openRightNow ? false : true,
          isOpen: openRightNow,
          start: timeInterval.start,
          end: timeInterval.end,
          day: index === 0 ? "" : key,
        };
        setOpenObject(obj);
        break;
      }
    }
  }, [hoursData]);

  useEffect(() => {
    checkOpenClose();
    const timeInterval = setInterval(checkOpenClose, 1000);

    return () => clearInterval(timeInterval);
  }, [hoursData]);

  return {
    openObject,
  };
}

export default useOpenClose;
