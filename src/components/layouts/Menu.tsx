import * as React from "react";
import Link from "../commons/Link";

function Menu(props: any) {
  console.log(props.c_matalanMenu)
  return (
    <>
      <ul className="primary-nav">
        {props.c_matalanMenu && props.c_matalanMenu.c_header_links.map((item: any, i: Number) => {
          return (
            <>
              <li>
              <Link props={item} />
              </li>
            </>
          )
        })}

      </ul>
    </>
  )
}

export default Menu