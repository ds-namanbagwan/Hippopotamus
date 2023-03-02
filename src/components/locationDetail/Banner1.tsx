import * as React from "react";
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

export default function Banner1(props: any) {
    // console.log(props, "ahdfhahdshicgvcf")
    return <>
        
                    <div style={{ position: "relative" }}>
                        <div style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0,0,0,0.6)"
                        }}>
                        </div>
                        <img src={props.props.bannerimage.image.url} alt="" style={{
                            width: "100%", height: "300px",
                            objectFit: "cover", objectPosition: "center"
                        }} />

                        <div className="absolute text-center top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4">
                           <p className="text-[40px] text-[#fff]"><h1>{props.props.name}</h1></p>
                           <button className="direction-button1 p-[9px] mt-[40px] ml-[inherit]"><a>{props.props.button1.label}</a></button>
                           <button className="direction-button2 p-[9px] mt-[40px] ml-[10px]"><a>{props.props.button2.label}</a></button>     
                            </div>
                        
                    </div>
              

    </>

}

