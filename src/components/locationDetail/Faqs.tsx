import * as React from "react";
import gallerybg from "../../images/faq-bg.png"

import { useState, useEffect } from "react";
import AccordionItem from "./AccordianItem";
import { StaticData } from "../../../sites-global/staticData";


export default function Faq(props: any) {
  const [current, setCurrent] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [faqId, setFaqId] = useState(null);
  const [faqClass, setFaqClass] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  let preExpandedarr = [];

  if (props.faqs.length > 0) {
    props.faqs.map((e: any, i: Number) => {
      if (i == 0) {
        preExpandedarr = [e];
      }
    });
  }
  const isShowContent = (e: any) => {
    setFaqId(e.currentTarget.id);

    if (isShow) {
      setIsShow(false);
      setFaqClass("");
    } else {
      setIsShow(true);
      setFaqClass("opened");
    }
  };
  function setclass(e: any) {
    setCurrent(e.target.id);
  }
  const renderedQuestionsAnswers = props.faqs.map((item: any, index: Number) => {
    const showDescription = index === activeIndex ? "current" : "hidden";
    const background = index === activeIndex ? "active" : "";
    const fontWeightBold = index === activeIndex ? " font-weight-bold  py-0 mt-2" : "";
    const ariaExpanded = index === activeIndex ? "true" : "false";
    return (
      <AccordionItem
        showDescription={showDescription}
        fontWeightBold={fontWeightBold}
        ariaExpanded={ariaExpanded}
        background={background}
        item={item}
        index={index}
        onClick={() => {
          setActiveIndex(index);
        }}
      />
    );
  });

  return (
    <>
      <div className=" faq-main-sec">

        <div className=" faq-card ">
          <div className="faq-sec-inner">
            <h2 className="">{props.c_fAQsHeading?props.c_fAQsHeading:StaticData.FAQheading}</h2>
            <div className="faq-tabs">{renderedQuestionsAnswers}</div>
          </div>
        </div>


      </div>
    </>
  );
}