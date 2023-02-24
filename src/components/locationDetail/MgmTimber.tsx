import * as React from "react";
import { useEffect, useState } from "react";

export default function MgmTimber(props:any){
    console.log(props.c_mGMInformation,"c_mGMInformation")
    const [title,setTitle]=useState('');
    const getactiveimage=(e:any)=>{
       console.log(e,"event")
       setTitle(e);
    }
    useEffect(()=>{
        props.c_mGMInformation.imageInformation?.map((res: any, index: Number) => {
            if(index==0){
                setTitle(res.title);
            }
        })
    },[])
return(
    <>
    <div className="flex flex-raw">
    <div className="Main-image">
    {props.c_mGMInformation.imageInformation?.map((res: any, index: Number) => {
               if(title==res.title){
                return  res.image.map((img:any)=>{
                    return (<>
                        <img className=" " src={img.url} alt="" height={700} width={700} />
                        <h1>{res.title}</h1>
                        <a href={res.imageCta.link}> {res.imageCta.label}</a>
                        </>
                      );
                  })
                }
         
        })}
    
         <div className="content-container flex flex-raw">
        {props.c_mGMInformation.imageInformation?.map((res: any, index: Number) => {
                return  res.image.map((img:any)=>{
                    return (
                        // <div className={`ProductsImage content ${getActiveClass(i.image.alternateText, "active-content")} ${index == 0 && firstdefault ? "active-content" : ''}`}>
                        <a href="javascript:void(0)"   onClick={()=>getactiveimage(res.title)}>
                        <img className=" " src={img.url} alt="" height={300} width={300} />
                        </a>
                        // </div>
                      );
                  })
         
        })}
      </div>
      </div>
      <div className="right-description-content-inner">
           <p>{props.c_mGMInformation.description}</p>
           <button className="btn">{props.c_mGMInformation.cTA.label}</button>
      </div>
      </div>
    </>
)
}