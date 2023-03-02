import * as React from "react"
import { Props } from "react-phone-number-input"
type props = {
  _site : any
}
export default function Footer1(data:props) {

  // console.log(data,"_site")
  return (
    <>
      <div style={{marginTop:"48px",
    marginBottom: "15px",
    width: "100%",
    display: "flex",
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"}} > 
      <div className="flex" style={{ backgroundColor: "white"}}>
        
          {data?._site?.c_footerlable?.map((res: any) => {
            return (
              <>
                <div className="flex ml-2">
                  <a href="#">{res.label}</a>
                  <p>|</p> 
                </div>
                
              </>
            )
          })}
         
        
        </div>
      </div>
      <div className="ml-[40%] w-72">
        <img src={data?._site?.c_footerphoto?.image.url} alt=""/>
        </div>
    </>
  )
}
