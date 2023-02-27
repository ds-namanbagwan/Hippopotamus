import * as React from "react"
import { Props } from "react-phone-number-input"
type props = {
  _site : any
}
export default function Header1(data:props) {

  console.log(data,"_site")
  return (
    <>

      <div className="flex w-full" style={{ backgroundColor: "white" ,height:"100px",boxShadow:"0 2px 4px 0 rgb(0 0 0 / 30%)"}}>
      <div style={{marginLeft:"50px"}}>
        <img src={data?._site?.c_headerlogo?.image.url} width="290"/>
        </div>
        <div className="flex w-full" style={{ marginTop: "40px",marginLeft:"70px",fontSize:"16px",fontWeight:"bold",color:"black",textAlign:"center"}}>
          {data?._site?.c_headerlable?.map((res: any) => {
            return (
              <>
                <div className="flex w-full">
                  <a href="{res.link}" style={{ fontStyle: "italic" }}> {res.label}</a>
                </div>
              </>
            )
          })}
        </div>
        <div style={{width:"500px",background:"red"}}> 

         </div>
      </div>
    </>
  )
}
