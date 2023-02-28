import * as React from "react";
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

export default function Banner1(props: any) {
    console.log(props._site, "ahdfhahdshicgvcf")
    return <>
        {/* {console.log(props._site,"ahdfhahdshicgvcf")}  */}
        {props?._site?.map((button: any) => {
            return (
                <>
                    <div style={{ position: "relative" }}>
                        <div style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0,0,0,0.6)"
                        }}>
                        </div>
                        <img src={button.photo.image.url} style={{
                            width: "100%", height: "300px",
                            objectFit: "cover", objectPosition: "center"
                        }} />

                        <div className="" style={{position:"absolute",top:"0"}}> 
                            <p style={{ color:"#fff", fontSize: "3rem" }}>{button.photo.description}</p>

                            
                                {button?.button?.map((btn: any) => {
                                    return (
                                        <>
                                            <button className="button-bx direction-button1"><a href="#" style={{padding:"20px"}}>{btn.label}</a></button>
                                        </>
                                    )
                                }
                                )}
                            </div>
                        </div>
                                   </>

            )
        }

        )}

    </>

}

