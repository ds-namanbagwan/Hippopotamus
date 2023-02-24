import * as React from "react";
import { useEffect } from "react";
 const Holidayhours =(props:any)=>{

    return(
     <>
      {props.hours.map((res:any,index:Number)=>{
          console.log(res.isClosed)
       const weeks=[
         "Sunday",
         "Monday",
         "Tuesday",
         "Wednesday",
         "Thursday",
         "Friday",
         "Saturday"
       ]
    
       const d = new Date(res.date);
       let day = d.getDay();
       let a,s,holidayDate:any;
      function join(t:any, a:any, s:any) {
        function format(m:any) {
        let f = new Intl.DateTimeFormat('en', m);
        return f.format(t);  
        }
   return a.map(format).join(s);
     } 
   
     a = [ {day: '2-digit'},{month: 'numeric'},{year: 'numeric'}];
    //  s = join(new Date(), a, '-');  
     var d1 = new Date();
     var d2 = new Date(res.date);
   if(d2.getDate() >= d1.getDate()){  
         
          
           return(
            <div className="pop-up-holyhrs">
                <div>{join(new Date(res.date), a, '-') }</div>         
                <div>{weeks[day]}</div> 
                {console.log(res)}  
                {res.isClosed?<span className="cl-time">
                      Closed
                    </span>:<>   
                {res.openIntervals&&res.openIntervals.map((openinterval: any, index: Number) => {
                  
                  return (
                    <>
                  
                     <div>  
                      <>
                      <span className="op-time">
                        {openinterval.start}
                      </span>{" "}
                     <span className="spac-bx"> - </span> 
                      {" "}
                      <span className="cl-time">
                        {openinterval.end}
                      </span></>
                   
                      </div>
                    </>
                  );
                })}</>}
                   {props.c_specific_day&&props.c_specific_day.map((specificDay:any)=>{
                        return(
                          <>
                          <div>
                          {specificDay.holidayDate==res.date?
                           <span className="specificday">
                           {specificDay.holidayName}
                         </span>:''
                        
                        }
                        </div>
                          </>
                        )
                      })}
              </div>
           )
          }
         
         })}
         
     </>
    )
   }
   export default Holidayhours;