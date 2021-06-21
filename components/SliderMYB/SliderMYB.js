import React, { Component } from "react";
import Slider from "react-slick";
import MYBSection from "../MYBSection/MYBSection";

/* 
export default function MakeYourBoxSlider() {
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    accessibility: false,
    draggable: false
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
} */

export default class MakeYourBoxSlider extends Component {
  state = {
    slideIndex: 0
  }
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  /* goTo(index){
    this.slider.slickGoTo(index);
  } */
  render() {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      accessibility: false,
      draggable: false,
    };
    return (
      <div>
        
        <Slider ref={c => (this.slider = c)} {...settings}>
          <div>

            <MYBSection title='¡PASO 1!'/>

            <div className>
              <button onClick={this.next}>
                Next
              </button>
            </div>

          </div>
          <div>

            <MYBSection title='¡PASO 2!'/>

            <div className>
              <button onClick={this.previous}>
                Previous
              </button>
              <button onClick={this.next}>
                Next
              </button>
            </div>

          </div>
          <div>
            <MYBSection title='¡PASO 3!'/>
            <div className>
              <button onClick={this.previous}>
                Previous
              </button>
              <button onClick={this.next}>
                Next
              </button>
            </div>
          </div>
          <div>
            <MYBSection title='¡PASO 4!'/>
            <div className>
              <button onClick={this.previous}>
                Previous
              </button>
            </div>
          </div>
          
        </Slider>

        {/* <button onClick={this.goTo(3)} >
            GO TO SLIDE 4
        </button> */}

      </div>
    );
  }
}