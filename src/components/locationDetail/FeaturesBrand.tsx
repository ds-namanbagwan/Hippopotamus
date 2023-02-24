import * as React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function FeaturesBrand(props:any) {
    console.log(props.c_features_brand)
    const photos = props.c_features_brand.map((element:any) => (   

        <SplideSlide>
        <img height='100' width="100" src={element.image.url} />
        </SplideSlide>    
      ));
  return (
    <>
    <h1 className="text-center text-xxl pb-3">{props.name}</h1>
    <div className="Features-brand">
   <Splide id="splide-nearby"
        options={{
          rewind: false,
          type: "splide",
          perPage: 3,
          perMove: 1,
          arrows: false,
          drag: false,
          pagination: false,
          lazyLoad: "nearby",
          breakpoints: {
            1920: {
              perPage:5,
              drag: true,
              pagination: true,
              arrows: true,
              type: "splide",
            },
          },
        }}>
          {photos}
      </Splide>
      </div>
    </>
  )
}
