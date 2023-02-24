import * as React from "react";
import { useEffect } from "react";
import { StaticData } from "../../../sites-global/staticData";
import Timer from "../locationDetail/countdown";
// import OpenCloseBlock from "./OpenCloseBlock";

export const OpenStausFunctions = {
  formatOpenNowString: (hoursData: any, timeZone: any) => {
    const now = new Date();
    const currentTime = new Date(
      now.toLocaleString("en-US", { timeZone: timeZone })
    );

    const tomorrow = new Date(currentTime.getTime() + 60 * 60 * 24 * 1000);
    let nextTomorrow = new Date(tomorrow.getTime() + 86400000);
    let Day = 0;
    const yesterday = new Date(currentTime.getTime() - 60 * 60 * 24 * 1000);
    const nowTimeNumber =
      currentTime.getHours() + currentTime.getMinutes() / 60;

    const intervalsToday = OpenStausFunctions.getIntervalOnDate(
      currentTime,
      hoursData
    );
    const intervalsTomorrow = OpenStausFunctions.getIntervalOnDate(
      tomorrow,
      hoursData
    );
    const intervalsnextTommorow = OpenStausFunctions.getIntervalOnDate(
      nextTomorrow,
      hoursData
    );
    const intervalsYesterday = OpenStausFunctions.getIntervalOnDate(
      yesterday,
      hoursData
    );
    let openRightNow = false;
    let currentInterval: any = null;
    let nextInterval: any = null;

    if (intervalsYesterday) {
      for (let i = 0; i < intervalsYesterday.length; i++) {
        const interval = intervalsYesterday[i];
        const startIntervalNumber = OpenStausFunctions.timeStringToNumber(
          interval.start
        );
        const endIntervalNumber = OpenStausFunctions.timeStringToNumber(
          interval.end
        );

        // If end overflows to the next day (i.e. today).
        if (endIntervalNumber < startIntervalNumber) {
          if (nowTimeNumber < endIntervalNumber) {
            currentInterval = interval;
            openRightNow = true;
          }
        }
      }
    }

    // Assumes no overlapping intervals
    if (intervalsToday) {
      for (let i = 0; i < intervalsToday.length; i++) {
        const interval = intervalsToday[i];
        const startIntervalNumber = OpenStausFunctions.timeStringToNumber(
          interval.start
        );
        const endIntervalNumber = OpenStausFunctions.timeStringToNumber(
          interval.end
        );

        // If current time doesn't belong to one of yesterdays interval.
        if (currentInterval == null) {
          if (endIntervalNumber < startIntervalNumber) {
            if (nowTimeNumber >= startIntervalNumber) {
              currentInterval = interval;
              openRightNow = true;
            }
          } else if (
            nowTimeNumber >= startIntervalNumber &&
            nowTimeNumber < endIntervalNumber
          ) {
            currentInterval = interval;
            // console.log(currentInterval, endIntervalNumber);
            openRightNow = true;
          }
        }

        if (nextInterval == null) {
          if (startIntervalNumber > nowTimeNumber) {
            nextInterval = interval;
          }
        } else {
          if (
            startIntervalNumber > nowTimeNumber &&
            startIntervalNumber <
              OpenStausFunctions.timeStringToNumber(nextInterval.start)
          ) {
            nextInterval = interval;
          }
        }
      }
    }

    let nextIsTomorrow = false;

    // If no more intervals in the day
    if (nextInterval == null) {
      if (intervalsTomorrow) {
        if (intervalsTomorrow.length > 0) {
          nextInterval = intervalsTomorrow[0];
          Day = tomorrow.getDay();
          // console.log(tomorrow.getDay(),nextTomorrow,nextTomorrow.getDay());
          nextIsTomorrow = true;
        }
      } else if (intervalsnextTommorow) {
        if (intervalsnextTommorow.length > 0) {
          nextInterval = intervalsnextTommorow[0];
          Day = nextTomorrow.getDay();
          // console.log(nextTomorrow.getDay());
          nextIsTomorrow = true;
        }
      } else if (
        OpenStausFunctions.getIntervalOnDate(
          new Date(nextTomorrow.getTime() + 86400000),
          hoursData
        )
      ) {
        nextTomorrow = new Date(nextTomorrow.getTime() + 86400000);
        // console.log(nextTomorrow.getDay());
        Day = nextTomorrow.getDay();
        const nextintervals = OpenStausFunctions.getIntervalOnDate(
          nextTomorrow,
          hoursData
        );
        if (nextintervals.length > 0) {
          nextInterval = nextintervals[0];
          nextIsTomorrow = true;
        }
      } else if (
        OpenStausFunctions.getIntervalOnDate(
          new Date(nextTomorrow.getTime() + 172800000),
          hoursData
        )
      ) {
        nextTomorrow = new Date(nextTomorrow.getTime() + 172800000);
        // console.log(nextTomorrow.getDay());
        Day = nextTomorrow.getDay();
        const nextintervals = OpenStausFunctions.getIntervalOnDate(
          nextTomorrow,
          hoursData
        );
        if (nextintervals.length > 0) {
          nextInterval = nextintervals[0];
          nextIsTomorrow = true;
        }
      } else if (
        OpenStausFunctions.getIntervalOnDate(
          new Date(nextTomorrow.getTime() + 86400000 + 172800000),
          hoursData
        )
      ) {
        nextTomorrow = new Date(nextTomorrow.getTime() + 86400000 + 172800000);
        Day = nextTomorrow.getDay();
        const nextintervals = OpenStausFunctions.getIntervalOnDate(
          nextTomorrow,
          hoursData
        );
        if (nextintervals.length > 0) {
          nextInterval = nextintervals[0];
          nextIsTomorrow = true;
        }
      }
      //  console.log(nextTomorrow,Day)
    }

    const week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const statusclass = "";

   

    if (openRightNow) {
      // console.log("openRightNow");

      if (
        currentInterval.start === "00:00" &&
        currentInterval.end === "23:59"
      ) {
        return <div className={"opendot"}>Open 24 Hours</div>;
      } else {
        return (
          <div className={"opendot green-dot"}>
           
            <div className="hours-info ">
              {" "}
              <span className="font-second-main-font "> Open now - </span>
              <span className="lowercase">
                {OpenStausFunctions.formatTime(currentInterval.start).replace(
                  ":00",
                  ""
                )}
              </span>{" "}
              to{" "}
              <span className="lowercase">
                {OpenStausFunctions.formatTime(currentInterval.end).replace(
                  ":00",
                  ""
                )}
              </span>{" "}
            </div>
          </div>
        );
        // hoursString = 'Open now - [closingTime]';
        // hoursString = hoursString.replace("[closingTime]", OpenStausFunctions.formatTime(currentInterval.end).replace(':00',''));
      }
    } else if (nextInterval) {
      if (nextIsTomorrow) {
        return (
          <div className={"closeddot 4"}>
            <div className="red-dot">
            
              <div className="hours-info ">
                <span className="font-second-main-font "> Closed - </span>
                {"Opens at "}
                <span className="lowercase">
                  {OpenStausFunctions.formatTime(nextInterval.start).replace(
                    ":00",
                    ""
                  )}
                </span>
                {" "}{week[Day]}
              </div>
            </div>{" "}
          </div>
        );
      } else {
        return (
          <div className={"closeddot 3"}>
            <div className="red-dot">
             
              <div className="hours-info ">
                <span className="font-second-main-font">Closed - </span>
                {"Opens at "}
                <span className="lowercase">
                  {OpenStausFunctions.formatTime(nextInterval.start).replace(
                    ":00",
                    ""
                  )}
                </span>
              </div>{" "}
            </div>{" "}
          </div>
        );
      }
    } else {
      return (
        <div className="closeddot 2">
          <div className="red-dot">
           
            <div className="hours-info ">Closed</div>{" "}
          </div>
        </div>
      );
    }
  },
  getYextTimeWithUtcOffset: (entityUtcOffsetSeconds:number) => {
    const now = new Date();
    let utcOffset = 0;
    if (entityUtcOffsetSeconds) {
      utcOffset = entityUtcOffsetSeconds * 1000;
    }
    if (utcOffset !== 0) {
      const localUtcOffset = now.getTimezoneOffset() * 60 * 1000;
      return new Date(now.valueOf() + utcOffset + localUtcOffset);
    }
    return now;
  },
  parseTimeZoneUtcOffset: (timeString:string) => {
    if (!timeString) {
      return 0;
    }
    const parts = timeString.split(":");
    const hours = parseInt(parts[0].replace(/\u200E/g, ""), 10);
    const minutes = parseInt(parts[1].replace(/\u200E/g, ""), 10);
    if (hours < 0) {
      return -(Math.abs(hours) + minutes / 60) * 60 * 60;
    }
    return (hours + minutes / 60) * 60 * 60;
  },

  timeStringToNumber: (timeString: any) => {
    const parts = timeString.split(":");
    const hours = parseInt(parts[0].replace(/\u200E/g, ""), 10);
    const minutes = parseInt(parts[1].replace(/\u200E/g, ""), 10);
    return hours + minutes / 60;
  },
  getIntervalOnDate: (date, hoursData) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    const dateString =
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (day < 10 ? "0" + day : day);
    const dayOfWeekString = days[date.getDay()];

    // Check for holiday
    if (hoursData && hoursData.holidayHours) {
      for (let i = 0; i < hoursData.holidayHours.length; i++) {
        const holiday = hoursData.holidayHours[i];
        if (holiday.date == dateString) {
          if (holiday.openIntervals) {
            return holiday.openIntervals;
          } else if (holiday.isClosed === true) {
            return null; // On holiday but closed
          }
        }
      }
    }

    // Not on holiday
    if (
      hoursData &&
      hoursData[dayOfWeekString] &&
      hoursData[dayOfWeekString].openIntervals
    ) {
      return hoursData[dayOfWeekString].openIntervals;
    } else {
      return null;
    }
  },
  formatTime: (time) => {
    const tempDate = new Date("January 1, 2020 " + time);
    const localeString = "en-US";

    return tempDate.toLocaleTimeString(localeString.replace("_", "-"), {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  },
  getUtcOffsetFromTimeZone: (timeZone, date = new Date()) => {
    const tz = date
      .toLocaleString("en-gb", { timeZone, timeStyle: "long" })
      .split(" ")
      .slice(-1)[0];
    const dateString = date.toString();
    const offset =
      Date.parse(`${dateString} UTC`) - Date.parse(`${dateString} ${tz}`);
    return OpenStausFunctions.msToTime(offset);
  },
  msToTime: (duration) => {
    let milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = hours < 10 ? hours : hours;
    return hours + ":00";
  },
};

export default function OpenClose(props: any) {
  let a;
  let s;
  let dateNewFormat: any;

  function join(t: any, a: any, s: any) {
    function format(m: any) {
      const f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }
  if (props.hours && props.hours.reopenDate) {
    a = [{ day: "numeric" }, { month: "long" }, { year: "numeric" }];
    s = join(new Date(props.hours.reopenDate), a, " ");
    dateNewFormat = s;
  }

  return (
    <>
      {props.hours && props.hours.reopenDate ? (
        <>
          <h3 className="text-2xl md:text-[28px] notHighlight">
            {StaticData.tempClosed}
          </h3>
          <p className="mt-4">
            <Timer dateNewFormat={dateNewFormat} hours={props.hours} />
          </p>{" "}
        </>
      ) : props.hours ? (
        //  <div class="closeing-div notHighlight" dangerouslySetInnerHTML={{__html: OpenStausFunctions.formatOpenNowString(props.hours, props.timezone)}} />
        <div className="closeing-div notHighlight">
          {/* {OpenStausFunctions.formatOpenNowString(props.hours, props.timezone)}{" "} */}
          {
            OpenStausFunctions.formatOpenNowString(props.hours, props.timezone)}
         
        </div>
      ) : (
        <div className="closeddot  1">
          <div className="red-dot notHighlight">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 8 8"
            >
              <circle
                data-name="Ellipse 5"
                cx="4"
                cy="4"
                r="4"
                fill="#ad1e1f"
              />
            </svg>
            <div className="hours-info font-second-main-font ">Closed</div>{" "}
          </div>
        </div>
      )}
    </>
  );
}
// function formatTime(end: any): string {
//   throw new Error("Function not implemented.");
// }
