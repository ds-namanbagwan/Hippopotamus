import * as React from "react";
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "../../types/search/locations";
import GetDirection from "../commons/GetDirection";
import redmapimage from "../../images/red-map.svg";
import timesvg from "../../images/watch-icn.svg"
import Address from "../commons/Address";
import OpenClose from "../commons/openClose";
import { StaticData } from "../../../sites-global/staticData";
import { Link } from "@yext/pages/components";


const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
}
let array = [];



const LocationCard: CardComponent<Location> = ({ result }) => {

  let url = "";
  const [hoursopen, setHoursopen] = React.useState(false);

  function opentime(e: any) {
    //console.log(e.target);
    var closethis = e.target.closest(".lp-param-results");
    if (closethis.querySelector('.storelocation-openCloseTime').classList.contains("hidden")) {
      closethis.querySelector('.storelocation-openCloseTime').classList.remove("hidden")
      setHoursopen(true);
    }
    else {
      closethis.querySelector('.storelocation-openCloseTime').classList.add("hidden")
      setHoursopen(false);
    }
  }

  const { address } = result.rawData;
  //     var name: any = result.rawData.name?.toLowerCase();
  //   var region: any = result.rawData.address.region?.toLowerCase();
  //   var initialregion: any = region.toString();
  //   var finalregion: any = initialregion.replaceAll(" ", "-");
  //   var city: any = result.rawData.address.city?.toLowerCase();
  //   var initialrcity: any = city.toString();
  //   var finalcity: any = initialrcity.replaceAll(" ", "-");
  //   var string: any = name.toString();
  //   let result1: any = string.replaceAll(" ", "-");
  //  if (!result.rawData.slug) {
  //    url= `/${result.rawData.id}-${result1}.html`;
  //  } else {
  //    url= `/${result.rawData.slug.toString()}.html`;
  //  }

  return (
    <div className={`location result-list-inner-${result.id} result`} id={`result-${result.id}`} key={`result-${result.rawData.id}`}>
      <div className="result-inner ">
        <div className="center-column">
          <div className="lp-param-results lp-subparam-hours">
            <div className="location-name-miles icon-row" >
              <div className="icon text-black relative">
                {/* <img className=" " src={redmapimage} width="20" height="20"alt={''} /> */}
                <span className="map-count"></span></div>
              <h2 style={{ fontWeight: "bold" }}><Link className="inline-block notHighlight"
                data-ya-track={`viewDetail -${result.rawData.name}`}
                eventName={`viewDetail -${result.rawData.name}`}
                rel="noopener noreferrer"
                href={`/${result.rawData.id+".html"}`}>{result.rawData.name}
              </Link></h2>
              {typeof result.distance != "undefined" ?
                <div className="distance" style={{ marginTop: "20%" }}>
                  {metersToMiles(result.distance)} <span>{StaticData.miles}</span>
                </div>
                : ''}
            </div>


            <div className="icon-row content-col address-with-availablity notHighlight">

              {result.rawData.hours?.reopenDate ? <>
                <div className="icon"> <img className=" " src={timesvg} width="20" height="20" alt="" /> </div>
                <div className=" flex open-now-string items-center " data-id={`main-shop-${result.rawData.id}`} onClick={opentime}>
                  {StaticData.tempClosed}
                </div>
              </>
                : <>
                  <div className=" flex open-now-string items-center" data-id={`main-shop-${result.rawData.id}`} >
                    <OpenClose timezone={result.rawData.timezone} hours={result.rawData.hours} deliveryHours={result.rawData.hours}></OpenClose>
                  </div></>}
              <Address address={address} />
              {result.rawData.hours ? <>
                <div className="mt-2">
                  {/* <h6>Opening Hours</h6> */}

                  <div>{result.rawData.mainPhone}</div>

                  {/* <div className={`storelocation-openCloseTime  capitalize hidden`}>
                    {hoursopen?
                   typeof result.rawData.hours === "undefined" ? ("") :
                     <Hours key={result.rawData.name} additionalHoursText={result.rawData.additionalHoursText} hours={result.rawData.hours} c_specific_day={result.rawData.c_specific_day} />
                   :''}
                </div> */}
                </div></> : <div className="closeddot notHighlight red-dot">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                  <circle id="Ellipse_5" data-name="Ellipse 5" cx="4" cy="4" r="4" fill="#ad1e1f" />
                </svg>
                <div className="hours-info text-lg font-second-main-font closeddot">
                  Closed
                </div>
              </div>}

            </div>

            <div className="button-bx">
              {result.rawData.displayCoordinate ?
                <GetDirection buttonText={StaticData.getDirection} address={address} latitude={result.rawData.displayCoordinate?.latitude} longitude={result.rawData.displayCoordinate?.longitude} />
                : <GetDirection buttonText={StaticData.getDirection} address={address} latitude={result.rawData.yextDisplayCoordinate?.latitude} longitude={result.rawData.yextDisplayCoordinate?.longitude} />}
              <a href="#" style={{color:"#a61615"}}>RESERVE</a>

            </div>



          </div>

        </div>
      </div>
    </div>

  );

}

export default LocationCard;