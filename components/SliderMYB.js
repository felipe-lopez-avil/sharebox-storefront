import React from "react";
import Slider from "react-slick";
import MYBSection from "./MYBSection/MYBSection";




export default function MakeYourBoxSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
      <div>
        <MYBSection title='¡PASO 1!'/>
      </div>
      <div>
        <MYBSection title='¡PASO 2!'/>
      </div>
      <div>
        <MYBSection title='¡PASO 3!'/>
      </div>
      <div>
        <MYBSection title='¡PASO 4!'/>
      </div>
    </Slider>
  );
}