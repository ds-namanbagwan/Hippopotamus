import * as React from "react"
export default function Service(props: any) {
    // console.log(props, "c_servicesdata")
    return (
        <>
        <p style={{
              marginBottom: "3%", fontFamily: "Bebas Neue", fontSize: "2rem",
              color: "#a61615", fontWeight: "bold",marginTop:"3%"
            }}>OUR SERVICES</p>
            <div className="flex w-full" style={{ backgroundColor: "white" }}>
                {/* <div className="flex w-full"> */}
                <div className="grid grid-cols-3">
                    {props?.props?.map((s: any) => {
                        // console.log(props.s, "52728522752454175241")
                        return (
                            <>
                                <div className="container">
                                    <div style={{marginLeft:"160px"}}>
                                        <img src={s?.serviceimage?.url} width="30%"/>
                                        </div>
                                    
                                    <div className="text-center pt-4" style={{color:"#a61615",fontWeight:"bold"}}>
                                    {s?.heading}
                                    </div>
                                    <div className="pt-4" style={{width:"250px",textAlign: "center",marginLeft:"70px"}}>{s?.shortdescription}</div>
                                    
                                </div>


                            </>
                        )
                    })}

                </div>

            </div>
        </>
    )
}