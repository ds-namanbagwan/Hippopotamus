// import React from 'react';


 const ApiCall = {
   
 
    fetch: (url: string, method = 'get', body = null, headers = null) => {
      
      const apiUrl = url;
      const allHeaders = ApiCall.getAllHeaders(headers, method);
  
      let options = {
        method: method,
      };
      
      let bodyData = {};
      
      if(body) {
        bodyData =  {
          body: JSON.stringify(body)
        };  
      }
      
      const allOptions = { ...options, ...allHeaders, ...bodyData};
      if (method ==='post' || method ==='put' || method ==='delete' ) {
          return fetch(apiUrl, allOptions).then(res => res.json());
      }else{
          const mode = 'no-cors';
          const headers = {'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Origin': '*'};
          const allOptions = JSON.stringify({mode, headers});
          // console.log(allOptions);	
          return fetch(apiUrl).then(res => res.json());
      }
      
    },

    getAllHeaders: (headers:string, method:any) => {
        
      let allHeaders = {	  
        'Access-Control-Allow-Credentials': 'true',	 
        'Access-Control-Allow-Origin': '*'
      };
      
      const newHeaders = {
         headers: allHeaders
      };
      
      
      return newHeaders;
      
    },
    
    getLocations: (params:any) => {

     //var baseURL = params.baseURL + (params.baseURL.includes('?') ? '&' : '?');
    var baseURL = "https://liveapi-sandbox.yext.com/v2/accounts/me/entities?";
    var api_key = "105f07d362323bad1c2fcae6671e6ec3";
    var vparam = "20181017";
    var limit = 5;
    var offset=params.offset;
    var entityTypes = "location";
    // var savedFilterIds = "953846729";
    var fields = "name,hours,neighborhood,address,mainPhone,slug,timeZoneUtcOffset,displayCoordinate,yextDisplayCoordinate";
    
    var fullURL = baseURL
        + "api_key=" + api_key 
        + "&v=" +  vparam       
        + "&limit=" + limit
        + "&entityTypes=" + entityTypes
        + "&fields=" + fields
        + "&resolvePlaceholders=true"
        // + "&savedFilterIds=" + savedFilterIds
        +"&offset="+offset; 
       
      return ApiCall.fetch(fullURL , 'get');	
      
    },
    getNearbyLocations: (params:any) => {

        // var baseURL = params.baseURL + (params.baseURL.includes('?') ? '&' : '?');
       var baseURL = "https://liveapi-sandbox.yext.com/v2/accounts/me/entities/geosearch?radius=2500";
       var api_key = "105f07d362323bad1c2fcae6671e6ec3";
       var vparam = "20181017";
       var location=params.location;
       var limit = params.limit;
       var offset=params.offset;
       var entityTypes =
           "location";
      //  var savedFilterIds = "953846729";
       var fields = "name,hours,neighborhood,address,mainPhone,slug,timeZoneUtcOffset,displayCoordinate,yextDisplayCoordinate";
       
       var fullURL = baseURL
           + "&api_key=" + api_key 
           + "&v=" +  vparam
           + "&location=" + location
           + "&limit=" + limit
           + "&entityTypes=" + entityTypes
           + "&fields=" + fields
           + "&resolvePlaceholders=true"
          //  + "&savedFilterIds=" + savedFilterIds
           +"&offset="+offset; 
          
         return ApiCall.fetch(fullURL , 'get');	

       },
       getAlphabet: (params:any) => {

        //var baseURL = params.baseURL + (params.baseURL.includes('?') ? '&' : '?');
       var baseURL = "https://liveapi-sandbox.yext.com/v2/accounts/me/entities?";
       var api_key = "105f07d362323bad1c2fcae6671e6ec3";
       var vparam = "20181017";
       var limit =params.limit;
       var offset=params.offset;
       var entityTypes = "location";
      //  var savedFilterIds = "953846729";
       var fields = "name,hours,neighborhood,address,mainPhone,slug,timeZoneUtcOffset,displayCoordinate,yextDisplayCoordinate";
       
       var fullURL = baseURL
           + "api_key=" + api_key 
           + "&v=" +  vparam       
           + "&limit=" + limit
           + "&entityTypes=" + entityTypes
           + "&fields=" + fields
           + "&resolvePlaceholders=true"
          //  + "&savedFilterIds=" + savedFilterIds
           +"&offset="+offset; 
          
         return ApiCall.fetch(fullURL , 'get');	
         
       },  
       getopenclose:(param:any)=>{

        
       var baseURL =  "https://liveapi-sandbox.yext.com/v2/accounts/me/entities/"+`${param.entityId}`+'?';
       var api_key = "105f07d362323bad1c2fcae6671e6ec3";
       var vparam = "20181017";
       var entityTypes = "location";
      //  var savedFilterIds = "953846729";
       var limit=3;

       var fullURL = baseURL
           + "api_key=" + api_key 
           + "&v=" +  vparam  
           + "&limit=" + limit     
           + "&entityTypes=" + entityTypes
           + "&resolvePlaceholders=true"
          //  + "&savedFilterIds=" + savedFilterIds
           
           return ApiCall.fetch(fullURL , 'get');	
       }

 
  };
  export default ApiCall
  