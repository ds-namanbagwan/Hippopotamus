import * as React from "react";

type data = {
    c_socialIcon: any;
    c_socialReceiveText: any;
    c_yearimage: any;
    c_textSocial: any
}
function SocialData(data: any) {
    const { c_socialIcon, c_socialReceiveText, c_yearimage, c_textSocial } = data
    // console.log("tyus,", c_textSocial)

    return (
        <>

            <div className="container mt-[7%] mb-[3%]">
                <div className="flex w-full justify-center" >
                    <img className="w-52" src={c_yearimage.url} alt="" />
                    <p className="mt-[2.5%] ml-[2%] mr-[2%] w-[19%]" style={{
                        fontSize: "15px",
                        fontWeight: "bold", fontFamily: "Roboto"
                    }}>{c_textSocial}
                    </p>
                    {c_socialIcon?.map((item: any) => {
                        return (
                            <>
                                <div className="w-[80px] ml-3">
                                    <img src={item.url} alt="" />
                                </div>
                            </>
                        )
                    })}
                    <div className="relative ml-[3%] w-52" >
                        <img src="https://a.mktgcdn.com/p/tA6P5CMH9AgZt5U5-_SLUn9Ot5l-JISFSgA4ByOphFo/495x240.png" alt="" />
                        <div className="text absolute top-2 text-white font-bold ml-[25%] mt-[10%]">{c_socialReceiveText}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}
export default SocialData;