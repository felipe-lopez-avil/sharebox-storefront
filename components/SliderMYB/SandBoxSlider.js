import React, { Component } from "react";
import Slider from "react-slick";
import MYBSection from "../MYBSection/MYBSection";


export default class SandBoxSlider extends Component {
  
    // Begins

    constructor(props) {
        super(props)
        this.changeHandler = this.changeHandler.bind(this)
        this.changeSlider = this.changeSlider.bind(this)
        this.state = {
          slideIndex: 0,
        }
      }
    
      changeHandler(e) {
        this.sliderWrapper.slider.slickGoTo(e.target.id)
      }
    
      changeSlider(){
        this.setState({
          slideIndex: this.sliderWrapper.slider.innerSlider.state.currentSlide
        })
      }
      
      render() {
        return (
          <div>
            {/* <input onChange={this.changeHandler} value={this.state.slideIndex} 
              type='range' min={0} max={3} /> */}
              <input type="submit" value="Slide 4" id={2} onClick={this.changeHandler}/>
            {/* <button onClick={this.sliderWrapper.slider.slickGoTo(3)}>
                Go To Slide 4
            </button> */}
            <SliderWrapper 
              ref={sliderWrapper => this.sliderWrapper = sliderWrapper}  
              beforeChange={this.changeUpdateCount.bind(this)}
              afterChange={this.changeSlider.bind(this)}
              slideIndex={this.state.slideIndex}
              updateCount={this.state.updateCount}
            />
          </div>
        );
      }

    // Ends
  
}


class SliderWrapper extends React.Component {
  
    shouldComponentUpdate(nextProps, nextState) {
      // certain condition here, perhaps comparison between this.props and nextProps
      // and if you want to update slider on setState in parent of this, return true, otherwise return false
      if (this.props.updateCount !== nextProps.updateCount) {
        return false
      }
      return true
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

        {/* <button>
            GO TO SLIDE 5
        </button>
 */}
      </div>
    );
  }
}