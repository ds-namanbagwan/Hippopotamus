import * as React from 'react';
import { useState, useEffect } from 'react';
import { StaticData } from '../../../sites-global/staticData';

const Timer = (props:any) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [week,setWeek]=useState({props})
  var deadline = "";
  const weeks=[
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ]
  const d = new Date(props.dateNewFormat);
  let a;
  let s;
  let dateNewFormat;
  function join(t:any, a:any, s:any) {
    function format(m:any) {
     let f = new Intl.DateTimeFormat('en', m);
     return f.format(t);  
    }
   return a.map(format).join(s);
     } 

  console.log(weeks[d.getDay()])
  console.log(week.props.hours)
  for (const key in week.props.hours) {
if(week.props.hours!="undefined"){
 
   if(typeof week.props.hours.holidayHours!="undefined"){

     week.props.hours.holidayHours?.map((res:any)=>{
      a = [{day: 'numeric'}, {month: 'long'}, {year: 'numeric'}];
      s = join(new Date(res.date), a, ' ');
      dateNewFormat = s
    if(dateNewFormat==props.dateNewFormat){
        res.openIntervals?.map((interval:any)=>{
          deadline=props.dateNewFormat +' '+ interval.start+':00'
        })
    }
    else{
      if (week.props.hours?.hasOwnProperty(key)) {
        if(key===weeks[d.getDay()]){
         // console.log(key,week.props.hours[key])
         week.props.hours[key].openIntervals?.map((res:any)=>{
           deadline=props.dateNewFormat +' '+ res.start+':00'
           
         })
        }
         }

    }
   
     })
   }
   else{
   
    if (week.props.hours?.hasOwnProperty(key)) {
      if(key===weeks[d.getDay()]){
     
       week.props.hours[key].openIntervals.map((res:any)=>{
         deadline=props.dateNewFormat +' '+ res.start+':00'
        //  console.log('fbesndfbsidbnf')
       })
      }
       }
  }
 
}
  }

  const getTime = () => {
    var now = new Date();
    var nowUTC:any = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    console.log(nowUTC);
    const time = Date.parse(deadline) - nowUTC;
    
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer">
         <div className="timer flex flex-row text-sm text-white" role="timer">
     {days>0?
      <div className="col-4 px-3">
        <div className="box font-normal">
          <p id="day">{days < 10 ? "0" + days : days}</p>
          <span className="text">{StaticData.Days}</span>
        </div>
      </div>
      :''}
      <div className="col-4 px-3">
        <div className="box font-normal">
          <p id="hour">{hours < 10 ? "0" + hours : hours}</p>
          <span className="text">{StaticData.Hours}</span>
        </div>
      </div>
      <div className="col-4 px-3">
        <div className="box font-normal">
          <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
          <span className="text">{StaticData.Minutes}</span>
        </div>
      </div>
      <div className="col-4 px-3">
        <div className="box font-normal">
          <p id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
          <span className="text">{StaticData.Seconds}</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Timer;