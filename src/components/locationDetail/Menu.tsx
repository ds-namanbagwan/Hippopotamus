import * as React from "react";

function Menu(props:any){
    // console.log(props.c_matalanMenu.c_matalanMenu)
    return(
        <>
      <div className="nav-section">
      <div className="container mx-auto">
        
        <ul className="primary-nav">
        {props.c_matalanMenu.c_matalanMenu.map((item:any,i:Number)=>{
             return(
                <>
                <li className="-mb-px mr-1 w-full">
                <a className="" href="#">{item.menuList}</a>
                </li>
                </>
             )
           })} 
            
       </ul>
       </div>
       </div>
        
        </>
    )
}

export default Menu