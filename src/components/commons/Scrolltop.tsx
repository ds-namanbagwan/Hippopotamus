import * as React from "react";

export const Scroll ={
 scrollToRow(index: any) {
    let result: any = [].slice.call(document.querySelectorAll(`.result`) || [])[0];
    let offset: any = [].slice.call(document.querySelectorAll(`.result`) || [])[index];
  
    // alert(offset.offsetTop-result.offsetTop); 
    let o = offset.offsetTop - result.offsetTop;
  
    [].slice.call(document.querySelectorAll(".scrollbar-container") || []).forEach(function (el: any) {
      el.scrollTop = o;
    });
  
  }
}