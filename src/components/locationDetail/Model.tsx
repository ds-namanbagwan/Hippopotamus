import * as React from "react";
import { useEffect } from "react";
import Modal from "react-modal";
import { Cross } from "../../../sites-global/global";
import { StaticData } from "../../../sites-global/staticData";
import Holidayhours from "./Holdayhours";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#main');

function Model(props: any) {
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    document.body.classList.add("overflow-hidden");
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  }

  var day;
  return(
    <>
  {props.holidayHours.map((res:any,index:Number)=>{
    const d = new Date(res.date);
     day = d.getDay();
    let a,s,holidayDate:any;
   function join(t:any, a:any, s:any) {
     function format(m:any) {
     let f = new Intl.DateTimeFormat('en', m);
     return f.format(t);  
     }
return a.map(format).join(s);
  } 

 /* a = [ {day: '2-digit'},{month: 'numeric'},{year: 'numeric'}];
  s = join(new Date(), a, '-');  
  console.log(new Date(join(new Date(res.date), a, '-')).getTime(),new Date(s).getTime())
      if(new Date(join(new Date(res.date), a, '-')).getTime()>=new Date(s).getTime()){
*/

    var d1 = new Date();
    var d2 = new Date(res.date);
 
    if(d2.getDate() >= d1.getDate()){    
   
  return (
    <>
     
      <a onClick={openModal} className="text-link" id="holidaybtn" href="javascript:void(0);">
        {props.name}
      </a>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <a
          onClick={closeModal}
          type="button"
          id="closeButton"
          className="closeButton bg-closeIcon bg-no-repeat bg-center w-7 h-7 bg-[length:48px]"
        >
          <div dangerouslySetInnerHTML={{ __html: Cross }} />
        </a>

        {props.holidayHours ? (
          <>
            <div className="font-bold text-lg  mb-4">{StaticData.Holdiay}</div>
            <div className="pop-up-holyhrs heading">
              <div>Date</div>

              <div>Day</div>
              <div> Opening Hours</div>
              <div> Specific Day</div>
            </div>
            <Holidayhours hours={props.holidayHours} c_specific_day={props.c_specific_day} />
          </>
        ) : (
          ""
        )}
      </Modal>
    </>
  );
}
})

}
</>
  )
}

export default Model;
