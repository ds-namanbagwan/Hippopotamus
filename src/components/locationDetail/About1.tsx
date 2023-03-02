import * as React from "react"
import { Props } from "react-phone-number-input"

export default function About1(data: any) {
    // console.log(data, "whyfdg")

    return (
        <>
            <div className="container">
                <div className="flex w-full">
                    <img src={data?.data?.image?.url} alt="" />
                    {/* <div className="flex w-full" style={{}}>                        */}
                    <p style={{marginLeft:"0.5%",fontFamily:"fantasy",fontSize:"2rem",color:"#a61615"}}>{data?.data?.head}</p> <br/><br/>                   
                   <div style={{marginTop: "5%",marginRight: "10%",marginLeft:"-10.5%"}}> {data?.data?.desc1}<br/>
                    {data?.data?.desc2}<br/>
                    {data?.data?.desc3}<br/><br/><br/>
                    {data?.data?.desc4}<br/><br/>
                    {data?.data?.desc5}<br/>
                    </div>
                </div>
            </div>
        </>
    )
}
