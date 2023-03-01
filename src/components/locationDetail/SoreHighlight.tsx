import * as React from "react";
import { useState } from "react";
import { StaticData } from "../../../sites-global/staticData";
import Noimage from "../../images/placeholder.jpg"

export default function StoreHighlight(props: any) {
 

    // storeData ={...props.c_storeHighlightInfo}
    return (<>
        <div className="container mx-auto">
          
            <div className="sec-title">
                <h2> {StaticData.Brandname} {props.name} {StaticData.Storehighlight}</h2>
            </div>

            <div className="services-inner">

                {
                    props.c_storeHighlightInfo.map((res: any, i: Number) => {
                        // console.log(res, "storehighlight")

                        return (
                            <>
                                {res.title && res.findOutMore.label?
                                
                                <div className="item">
                                    <div className="service-item">
                                        <div className="service-img">
                                            {res.image ?
                                                
                                                    <img src={res.image.image.url} className="w-full" height="250" />
                                                
                                             : <img className="w-full" src="http://a.mktgcdn.com/p-sandbox/PTjCS8rBXb9HTapnby2IEwQooHVJYvQqu7fhve2Gheo/1000x667.jpg" height="250" alt="" />
                                            }
                                        </div>

                                        <h3>{res.title}</h3>
                                        <div className="service-desc">
                                            {res.description}
                                        </div>
                                        {res.findOutMore.link&&res.findOutMore.label?
                                        <div className="button-bx !ml-0 mt-4">
                                            <a className="btn" href={res.findOutMore.link}>
                                                {res.findOutMore.label}</a>
                                        </div>
                                        :''}
                                    </div> </div>:''}
                            </>

                        )
                    })
                }
            </div>
        </div>
    </>
    )



}