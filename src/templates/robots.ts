// src/templates/robots.ts
import { TemplateConfig } from "@yext/pages";
import { stagingBaseurl } from "../../sites-global/global";

/**
 * Not required depending on your use case.
 */
export const config: TemplateConfig = {
  // The name of the feature. If not set the name of this file will be used (without extension).
  // Use this when you need to override the feature name.
  name: "robots",
};

export const getPath = () => {
  return `robots.txt`;
};

export const render = (data: any): string => {
  /*
   * Return a string that will be served at <your-site-domain>.com/robots.txt.
   * For more information about robots.txt, check out this resource: https://developers.google.com/search/docs/advanced/robots/intro
   * An empty robots.txt will NOT prevent any pages from being crawled.
   */

  return `Sitemap: ${stagingBaseurl}/sitemap.xml
  User-agent: /`;
};