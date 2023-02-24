import * as React from "react"
import { Props } from "react-phone-number-input"
type props = {
  _site : any
}
export default function Header1(data:props) {

  console.log(data,"_site")
  return (
    <>

      <div className="flex w-full" style={{ backgroundColor: "white" }}>
        <img src={data?._site?.c_headerlogo?.image.url}/>
        {/* <div className="flex w-full" style={{width:"100px",marginTop:"50px"}} > */}
        <div className="flex w-full" style={{ marginTop: "10px" }}>
          {data?._site?.c_headerlable?.map((res: any) => {
            return (
              <>
                {/* <div style={{width:"2000px",textAlign:"center",fontSize:"25px"}}> */}
                <div className="flex w-full" style={{ fontSize: "20px", marginTop: "40px" }}>
                  <a href="{res.link}" style={{ fontStyle: "italic" }}> {res.label}</a>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}
