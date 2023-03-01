import * as React from "react";
import Geocode from "react-geocode";
import { useSearchActions } from "@yext/search-headless-react";
import { ChangeEvent, KeyboardEvent, useCallback } from "react";
import { SearchHeadlessProvider } from "@yext/search-headless-react";


export default function UseMyLocation(){
    const[query,setquery]=React.useState('');
    var Api="AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18";
    const geoclick=()=>{
      navigator.geolocation.getCurrentPosition(function (position) {
        // console.log("Latitude is :", position.coords.latitude);
        // console.log("Longitude is :", position.coords.longitude);
        Geocode.setApiKey(Api);
        Geocode.fromLatLng(position.coords.latitude,position.coords.longitude).then(
          (response:any) => {
            if (response.results[0]) {
              // console.log(response.results[0].formatted_address);
              setquery(response.results[0].formatted_address)

          }
        },
          (error:any) => {
            console.error(error);
          }
        );
      })
  
    }
    const search = useSearchActions();
    const handleTyping=()=>{
        search.setVertical(query);
      // console.log(search)
}
    return(
        <>
        
        <button
              className="font-nexa_boldregular relative search-location-arrow text-[#024B58] text-xs sm:text-sm"
              title="Search using your current location!"
              id="useLocation"
              onClick={handleTyping}
            >
              <svg
                className="absolute -left-4 top-[0px] sm:top-[2px] xl:top-1"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
              >
                <path
                  id="Icon_material-gps-fixed"
                  data-name="Icon material-gps-fixed"
                  d="M8.5,5.955A2.545,2.545,0,1,0,11.045,8.5,2.545,2.545,0,0,0,8.5,5.955Zm5.689,1.909A5.724,5.724,0,0,0,9.136,2.811V1.5H7.864V2.811A5.724,5.724,0,0,0,2.811,7.864H1.5V9.136H2.811a5.724,5.724,0,0,0,5.053,5.053V15.5H9.136V14.189a5.724,5.724,0,0,0,5.053-5.053H15.5V7.864ZM8.5,12.955A4.455,4.455,0,1,1,12.955,8.5,4.451,4.451,0,0,1,8.5,12.955Z"
                  transform="translate(-1.5 -1.5)"
                  fill="#024b58"
                />
              </svg>
             UseMyLocation
            </button>
            
         
        </>
    )
}

// function usestate(arg0: string): [any, any] {
//     throw new Error("Function not implemented.");
// }
