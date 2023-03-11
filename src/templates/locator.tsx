import * as React from "react";
import "../index.css";
import { GetHeadConfig, GetPath, HeadConfig, Template, TemplateConfig, TemplateProps, TemplateRenderProps } from "@yext/pages";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import { FilterSearch, VerticalResults, ResultsCount, AppliedFilters, ApplyFiltersButton, LocationBias, Pagination } from "@yext/search-ui-react";
import { Location } from "../types/search/locations";
import MapboxMap from "../components/MapboxMap";
import MapPin from "../components/MapPin";
import LocationCard from "../components/locatorPage/LocationCard";
import PageLayout from "../components/layouts/PageLayout";
import Geocode from "react-geocode";
import UseMyLocation from "../components/locatorPage/UseMyLocation"
import { Address } from "../types/search/locations";
import { useSearchActions } from "@yext/search-headless-react";
import { useEffect } from "react";
import SearchLayout from "../components/locatorPage/SearchLayout";
import { stagingBaseurl, favicon, AnalyticsEnableDebugging, AnalyticsEnableTrackingCookie } from "../../sites-global/global"
import Newsletter from "../components/locatorPage/Newsletter";
import { JsonLd } from "react-schemaorg";
import { StaticData } from "../../sites-global/staticData";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import { AnswerExperienceConfig } from "../config/answersHeadlessConfig";
import Header from "../components/layouts/NewHeader";
import Footer from "../components/layouts/footer";
import Header1 from "../components/layouts/NewHeader";
import Footer1 from "../components/layouts/NewFooter";
import BreadCrumbs from "../components/layouts/Breadcrumb";

// export const config: TemplateConfig = {
//   stream: {
//     $id: "Locator",
//     // Specifies the exact data that each generated document will contain. This data is passed in
//     // directly as props to the default exported function.
//     fields: [
//       "name",

//     ],
//     // Defines the scope of entities that qualify for this stream.
//     filter: {
//       entityIds: ["global-data"]
//     },
//     // The entity language profiles that documents will be generated for.
//     localization: {
//       locales: ["en_GB"],
//       primary: false,
//     },
//   },
// };

export const getPath: GetPath<TemplateProps> = () => {
  return `/index.html`;
};
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: "HIPPOPOTAMUS",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "HIPPOPOTAMUS",
        },
      },

      {
        type: "meta",
        attributes: {
          name: "author",
          content: StaticData.Brandname,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "robots",
          content: "noindex, nofollow",
        },
      },
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: "HIPPOPOTAMUS",
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: "HIPPOPOTAMUS",
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${document.c_meta_description ? document.c_meta_description : `View Timber Merchants near you today at MGM Timber. We stock high-quality, robust products at competitive rates.`}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:title",
          content: `${document.c_meta_title ? document.c_meta_title : `Timber Merchants Near Me - Find MGM Timber Branch Locator Here.`}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          content: favicon
        },
      },

    ],

  };
};

const Locator: Template<TemplateRenderProps> = ({
  document,
  __meta,
}) => {
  const {
    _site
  } = document;


  let templateData = { document: document, __meta: __meta };
  const endpoints = {
    universalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
    verticalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
    questionSubmission: "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
    universalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
    verticalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
    filterSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch",

  }
  var Api = "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18";
  return (
    <>
      <JsonLd<locator>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "MGM ",
          url: stagingBaseurl,
          logo: favicon,
        }}
      />
      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}>
          {/* <PageLayout global={_site}> */}
          <Header1 _site={_site} />
          <SearchHeadlessProvider
            experienceKey={AnswerExperienceConfig.experienceKey}
            locale={AnswerExperienceConfig.locale}
            apiKey={AnswerExperienceConfig.apiKey}
            verticalKey={AnswerExperienceConfig.verticalKey}
            experienceVersion="STAGING"
            sessionTrackingEnabled={true}
            endpoints={AnswerExperienceConfig.endpoints}
          >

            <SearchLayout _site={_site} />

          </SearchHeadlessProvider>


          {/* </PageLayout> */}
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
      <Footer1 _site={_site} />
    </>
  );
};

export default Locator;