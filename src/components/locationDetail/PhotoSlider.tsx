import * as React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const PhotoSlider = (props: any) => {
  const { photoGallery, height, width } = props;  
  const photos = photoGallery.map((element:any) => (   

	<SplideSlide>
    <img height={height} width={width} src={element.url} />
	</SplideSlide>    
  ));
  return (
    <>
	  <Splide aria-label="Photo Slider">
          {photos}
      </Splide>
    </>
  );
};

export default PhotoSlider;