import * as React from "react";
import gallerybg from "../../images/bg-service.jpg"

const PhotoGallery = (props: any) => {

   const photos = props.photos.map((element:any) => {
    const {height,url, width}=element;
    return (<div className="image-frame">
      <img   height={height}   
      src={url} // use normal <img> attributes as props
        width={width}      
        className="image  "
       alt="photogallery"
      >
      </img>
    </div>)
});


  return (
    <>
    
      <div className="space-y-5 container mx-auto">
     <div className="gallery-bg"> <img className=" " src={gallerybg} width="38" height="35" alt="gallerybg"/></div> 
        <div className="text-xl font-semibold text-center">
         <h1 className="text-red-eb pt-8"> Photos</h1>
          </div>
        <div className="photos-row">
            {photos}
        </div>
      </div>
    </>
  );
};

export default PhotoGallery;