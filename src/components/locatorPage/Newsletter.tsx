import * as React from "react";
import { useState } from "react";
import newsletterlogo from "../../images/newsletter-logo.png"
import ReCAPTCHA from "react-google-recaptcha";
import Modal from 'react-modal';
export default function Newsletter(){
    const [status, setStatus] = React.useState<string | null>(null)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [newsletter,setNewsletter]=React.useState(false);
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
  
    const FORM_URL = `https://www.matalan.co.uk/newsletter`
    const recaptchaRef = React.createRef();
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
    //  recaptchaRef.current.execute(); 
   
      const data = new FormData(event.target as HTMLFormElement)
    
      try {
        const response = await fetch(FORM_URL, {
          method: "post",
          body: data,
          headers: {
            accept: "application/json",
          },
        })
  
        setEmail("")
        const json = await response.json()
  
        if (json.status === "success") {
          setStatus("SUCCESS")
          return
        }
      } catch (err) {
        setStatus("ERROR")
        console.log(err)
      }
      
    }
    function onChange(value) {
        console.log("Captcha value:", value);
      }
  
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      setEmail(value)
    }
  
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      setName(value)
    }
    function openModal() {
        document.body.classList.add("overflow-hidden")
        setIsOpen(true);
      }
      let subtitle:any;
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        document.body.classList.remove("overflow-hidden")
        setIsOpen(false);
        setNewsletter(true);

      }
    return(
        <>
        <div className="newsletter-section">
        <div className="newsletter-inner">
      <div className="newsletter-logo">   <img className=" " src={newsletterlogo} width="200" height="83" alt="" /></div>

          <p>Sign up for Matalan Me and start receiving 
        exclusive discounts and rewards for shopping.</p>
        {/* {status === null && ( */}
        {!newsletter?<>
        <div className="search-field-bx">
        <input type="text" id="fame" name="newsletter[email]"  
          placeholder="Email"   onChange={handleEmailChange}/>
        <button className="" >SIGN ME UP</button>
        </div>
        <div>
            {status === "ERROR" &&(
            <><p className="!text-red">Please enter a valid email address            
                </p></>)}    
             </div></>:''}
     
        
         {/* )} */}
        </div>
</div>

{/* <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
            
            <div className="flex flex-raw c-email-sign-up__modal recaptcha-content">
<div className="c-email-sign-up__image u-pad-v-large@md-up">
  <div className="c-email-sign-up__desktop-image u-pad-h-small">
    <img src="https://matalan-assets.imgix.net/assets/email-signup/rewards-stacked-desktop-773c238166fb7af33f7e735c6dcb37064fb24a7bb9b0ada31ed7b110f9b84494.png" width="252" height="313" alt="Rewards For You"/>
  </div>

</div>

<div className="u-pad-h-xlarge@lg-up u-pad-v-huge@lg-up u-pad-b-huge@md u-pad-h-large@lg-down c-email-sign-up__content" data-form="popup-email-signup">
  {/* <h3 className="u-mar-b-large@md-up u-mar-v-medium@sm u-font-h3">Sign up now to...</h3> */}
  
  {/* <ul>
    <li className=""><span className="icon_svg"></span>Get exclusive discounts</li>
    <li className="u-dis-flex u-flex-align-items-center u-mar-b-medium u-font-size-16"><span className="icon_svg"></span>Get rewards for shopping</li>
    <form onSubmit={handleSubmit}>
    <input type="text" id="fame" name="newsletter[email]" value={email}  readOnly="readonly"
          placeholder="Email"   onChange={handleEmailChange}/>
    <input type="hidden" name="authenticity_token" value="SOv8Xo7vcZyQwOyhhaCBc3WROo26X5NF2XLXqWpS8aDeiDcOO1ba1ljM611ILToV5fKf19Xf8d97s8lkqD1iA=="    />
         
        
    <ReCAPTCHA
        //  ref={recaptchaRef}
         size="visible"
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        onChange={onChange}/>
         <button className="" onClick={closeModal}>SIGN ME UP</button>
         </form>
  </ul> */}
  
{/* </div> */}


           
     
      {/* </Modal> */} 
        </>
    )
}

