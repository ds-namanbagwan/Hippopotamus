// src/template/404.tsx
import {
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  GetPath,
  Template,
  TemplateConfig,
} from "@yext/pages";
import * as React from "react";
import { favicon } from "../../sites-global/global";
import { StaticData } from "../../sites-global/staticData";
import Footer1 from "../components/layouts/NewFooter";
import Header1 from "../components/layouts/NewHeader";
import PageLayout from "../components/layouts/PageLayout";
import "../index.css";
export const config: TemplateConfig = {
  stream: {
    $id: "404",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "name",

    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: ["header&footer"]
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

// The path must be exactly 404.html
export const getPath: GetPath<TemplateProps> = () => {
  return "404.html";
};

// Add a title to the page
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "Page Not Found",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: favicon,
        },
      },
    ]
  };
};

// Template that will show as the page
const FourOhFour: Template<TemplateRenderProps> = ({
  document,
}) => {
  const {
    _site
  } = document;
  return (
    <>
      {/* <PageLayout global={_site}> */}
      <Header1 _site={_site} />
        <div className="content-list">
          <div className="container">
            <div className="sec-title text-center">
              <h1 className="" style={{ textAlign: "center" }}>
                {StaticData.PagenotFound}
              </h1>
              <p>{StaticData.cantfind_page}.</p>
              <p>{StaticData.Youcouldtry}</p>
              <div className="button-bx max-w-[45rem] flex !mt-[5%] !mb-[5%] !ml-[25%]">
                <a className="btn" href="javascript:history.back()">{StaticData.Previuspage} &gt;</a>
                <a className="btn" href="/">{StaticData.homePage} &gt;</a>
              </div>
            </div>


          </div>
        </div>
        <Footer1 _site={_site} />
    </>
  );
};

export default FourOhFour;
