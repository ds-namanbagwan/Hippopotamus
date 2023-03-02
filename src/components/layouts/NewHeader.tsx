import * as React from "react"
import { Props } from "react-phone-number-input"
type props = {
  _site: any
}
export default function Header1(data: props) {

  // console.log(data, "_site")
  return (
    <>
    <div className="container-fluid">
      <div className="flex" style={{ boxShadow: "0 2px 4px 0 rgb(0 0 0 / 30%)", alignItems: "center",justifyContent:"space-between" }}>

        <img className="w-52" src={data?._site?.c_headerlogo?.image.url} alt=""/>
        <div className="gap-32 flex ml-6">
          {data?._site?.c_headerlable?.map((res: any) => {
            return (
              <>

                <a href="#"> {res.label}</a>

              </>
            )
          })}
        </div>
        <div className="flex ml-24">
          {data?._site?.c_headerbutton?.map((button: any) => {
            return (
              <>

                <button className="button-bx direction-button4 p-[2%]"><a href="#"> {button.label}</a></button>

              </>)
          }
          )}
        </div>

      </div>
      </div>
    </>
  )
}
