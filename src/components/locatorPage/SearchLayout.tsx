import { useSearchActions } from "@yext/search-headless-react";
import { useEffect, useState, useRef } from 'react';
import * as React from "react";
import {  LocationBias, Pagination } from "@yext/search-ui-react";

import { Location } from "../../types/search/locations";
import LocationCard from "./LocationCard";
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { GoogleMaps } from "./GoogleMaps";
import { useSearchState, Result } from "@yext/search-headless-react";
import Geocode from "react-geocode";
import Address from "../commons/Address";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import $ from "jquery";
import Banner from "../locationDetail/banner";
import LoadingSpinner from "../commons/LoadingSpinner";
import {breadcrumbhome, center_latitude, center_longitude, googleApikey, search_icn, UseMylocationsvg } from "../../../sites-global/global";
import { StaticData } from "../../../sites-global/staticData";

import FilterSearch from "../locatorPage/FilterSearch";
import ViewMore from "./ViewMore";
import VerticalResults from "../VerticalResults";
import ResultsCount from "./ResultsCount";
import useFetchResults from "../../hooks/useFetchResults";
import { Link } from "@mui/material";
import { AnswerExperienceConfig } from "../../config/answersHeadlessConfig";

var params1: any = { latitude: center_latitude, longitude:center_longitude }
var mapzoom = 8;
var centerLatitude = center_latitude;
var centerLongitude = center_longitude;
const SearchLayout = (props: any): JSX.Element => {
  const [isLoading, setIsloading] = React.useState(true);
  const [check, setCheck] = useState(false);
  type FilterHandle = React.ElementRef<typeof FilterSearch>;
  const filterRef = useRef<FilterHandle>(null);
  const locationResults = useFetchResults() || [];
  const locationinbuit=useSearchState(state => state.vertical?.results) || [];
  const alternateresult=useSearchState(state => state.vertical?.results?.length) || 0;
  const[displaymsg,setDisplaymsg]=useState(false);
  const [inputvalue, setInputValue] = React.useState('');
  // const [inputvalue, setInputValue] = React.useState('');
  const[allowlocation,setallowLocation]=React.useState('');
  const[newparam,SetNewparam]=React.useState({latitude:0,
    longitude:0});
  const [offset, setOffset] = React.useState(0);
  const searchActions = useSearchActions();
  const state = useSearchState(s => s) || [];
  const [optionclick, setOptionClick] = useState(true);

const loading = useSearchState(s=>s.searchStatus.isLoading);

  var searchKey: any;
  var target;

  var firstTimeRunners = true;


  const FirstLoad = () => {
    setCheck(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const params: any = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          params1 = params;
          SetNewparam(params1);
          mapzoom = 3;
          searchActions.setUserLocation(params1);
          searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
          searchActions.executeVerticalQuery();
        },
        function (error) {
          if (error.code == error.PERMISSION_DENIED) {
          }
        }
      );
    }
    params1 = {
      latitude: 54.9191,
      longitude: -1.3692,
    };
    SetNewparam(params1);
    // mapzoom=8;
    searchActions.setUserLocation(params1);
    searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
    searchActions.executeVerticalQuery();
    setTimeout(() => {
      setIsloading(false);
      $("body").removeClass("overflow-hidden");
    }, 3100);
  };
  const onClick = () => {

   if (navigator.geolocation) {
    const error =(error:any) => {    
     
      if(error.code == 1){
        setallowLocation('Please allow your Location')
          
          }       
  };


    navigator.geolocation.getCurrentPosition(function (position) {
      Geocode.setApiKey(googleApikey);
      var inputformat='';
      Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
        (response: any) => {
          if (response.results[0]) {
            filterRef.current && filterRef.current.setInputValue(response.results[0].formatted_address);
            setallowLocation('');
          }
        },
        (error: any) => {
          console.error(error);
          setCheck(false);
        }
      );

      let params = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      
      mapzoom=3;
      searchActions.setVertical('locations');
      searchActions.setUserLocation(params);
      searchActions.setOffset(0);
      searchActions.executeVerticalQuery();

    },error, {
      timeout: 10000,
  });
  }
} 

  
  const Findinput = () => {
    let searchKey = document.getElementsByClassName('FilterSearchInput');
    let Search = (searchKey[0].value);
    
    setInputValue('');
    if(searchKey[0].value!=""){
    getCoordinates(Search);
    }
    console.log(locationinbuit.length,"fisttimedispaly")
    if(locationinbuit.length==0){
      setDisplaymsg(true)
    }else { 
      setDisplaymsg(false);
    }
  }

  const handleInputValue = () => {
    setInputValue('');
  }
  const handleSetUserShareLocation = (value:any, userShareStatus:boolean) => {
    console.log(value,center_latitude,center_longitude,"value");
    setInputValue(value);
    if(userShareStatus){
      setCenterLatitude(center_latitude);
      setCenterLongitude(center_longitude);
    }
  }


    function getCoordinates(address: String) {
    setInputValue('');
   
 
          setCheck(true);
          // console.log(searchActions,"searchActions")
          searchActions.setQuery(address);
          searchActions.setUserLocation(params1);
          searchActions.setOffset(0);
          searchActions.executeVerticalQuery();
          
  }

  // let bannerimage = props._site.c_locatorBannerImage != undefined  ? props._site.c_locatorBannerImage.image.url:'';
 

  // const loader =
  //   isLoading ? <LoadingSpinner /> : '';

  const addClass = () => {

    document.body.setAttribute("class", "mapView");
    // setActive('')


  }

  useEffect(()=>{
    if(locationinbuit.length>0){
      setDisplaymsg(false);
    }
    },[locationinbuit])
    useEffect(()=>{
      console.log("yes rerender")
      locationResults.map((result:any, index:number) => {
        const resultelement = document.querySelectorAll(
          `.result-list-inner-${index + 1}`
        );
        for (let index = 0; index < resultelement.length; index++) {
          if(resultelement[index].classList.contains("active")||resultelement[index].classList.contains("fixed-hover")){
          resultelement[index].classList.remove("active", "fixed-hover");
        }
      }
      });
    },[loading])
 useEffect(()=>{
  if (firstTimeRunners) {
    firstTimeRunners = false;
    // searchActions.resetFacets();
    FirstLoad();
  }
 },[])

  return (
    <>

      {/* {loader} */}
      <div className="breadcrumb">
        <div className="container-custom">
          <ul>
            <li>
              <a href="#" className="home"> Home</a>
            </li>
            <li>{StaticData.locator_breadcrumb}</li>
          </ul>

        </div>
      </div>
      <div className="locator-main">
        {allowlocation.length > 0 ?
          <div className="for-allow">{allowlocation}</div>
          : ''}
        <div className="search-bx">
          <div className="location-with-filter">
            <h1 className="">{StaticData.FindLocationtext}</h1>
          </div>

          <div className="search-field">
            <FilterSearch
             ref={filterRef}
             displaymsg={displaymsg}
             setDisplaymsg={setDisplaymsg}
              customCssClasses={{
                filterSearchContainer: "m-2 w-full",
                inputElement: "FilterSearchInput pr-[90px]",
                optionsContainer: "options"
              }}
              inputvalue={inputvalue}
              setSearchInputValue={setInputValue}
              params={params1}
              searchOnSelect={true}
              searchFields={[
                {
                  entityType: "location",
                  fieldApiName: "address.line1",

                },
                {
                  entityType: "location",
                  fieldApiName: "address.postalCode",

                  },
                  {
                    entityType: "location",
                    fieldApiName: "name",

                },
                {
                  entityType: "location",
                  fieldApiName: "address.city",

                },
                {
                  entityType: "location",
                  fieldApiName: "address.region",

                  },
                  // {
                  //   entityType: "location",
                  //   fieldApiName: "address.countryCode",

                  // },
                ]}
                
                handleInputValue={handleInputValue}  
                handleSetUserShareLocation={handleSetUserShareLocation}
            />

            <button
              className="search-btn"
              aria-label="Search bar icon"
              id="search-location-button" onClick={Findinput}>
                {StaticData.Searchbox}
                {/* <span dangerouslySetInnerHTML={"TO FIND" } /> */}
                </button>
          </div>

<div className="fliter-sec">
          <button className="useMyLocation" title="Search using your current location!" id="useLocation" onClick={onClick}>
              <span className="icon" dangerouslySetInnerHTML={{ __html: UseMylocationsvg }} />

             <span className="underline hover:no-underline"> {StaticData.Usemylocation}</span>
            </button>

          <ResultsCount
            customCssClasses={{ container: "mx-2 my-0 text-dark-gray" }}
          />
</div>
        </div>
        <div className="mobile-btns">
          <div className="button-bx">

            <a className="btn listBtn" href="javascript:void(0);" onClick={() => {
              document.body.classList.remove('mapView')

            }}> List View</a>
            <a className="btn mapBtn" href="javascript:void(0);" onClick={addClass}> Map View</a>
          </div>
        </div>
        <div className=" map-section ">
          <GoogleMaps
            apiKey={googleApikey}
            centerLatitude={centerLatitude}
            centerLongitude={centerLongitude}
            check={true}
            defaultZoom={mapzoom}
            showEmptyMap={true}
          />
        </div>

        <div className="left-listing">

          <PerfectScrollbar >

            <div>
             
                <VerticalResults
                  displayAllOnNoResults={false}
                  CardComponent={LocationCard}
                  locationResults={locationinbuit}
                  customCssClasses={{
                    container:
                      "result-list flex flex-col scroll-smooth  overflow-auto",

                  }}
                  // CardComponent={LocationCard}
                />
             
      
              {locationinbuit && locationinbuit.length <= 0 ?
               <div className="browse-dir">
               <a className="underline " href='/gb.html'>Use the search above or <span className="font-second-main-font"> browse our directory</span></a> 
               </div>:''}
                <div className="button-bx">
               <ViewMore  className={" btn notHighlight lg:!w-[132%] !mb-2 button view-more"} idName={"view-more-button"} buttonLabel={"View More"} />
               </div>
            </div>
          </PerfectScrollbar>
        </div>


      </div>


    </>
  );
};

export default SearchLayout;


