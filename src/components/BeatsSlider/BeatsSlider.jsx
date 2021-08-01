import React from 'react';
import classes from './BeatsSlider.module.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import User from '../../assets/beats.png'

const Slider = () => {
    return (
        <React.Fragment>
            <Carousel
                showArrows={false}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                autoPlay={true}
                interval={4000}
            >
                <div className={classes.Carousel}>
                    <div className={classes.myCarousel}>
                        <img src={User} alt="user" />
                    </div>
                </div>

                <div>
                    <div className={classes.myCarousel}>
                        <img src={User} alt="user" />
                    </div>
                </div>

                <div>
                    <div className={classes.myCarousel}>
                        <img src={User} alt="user" />
                    </div>
                </div>
            </Carousel>
        </React.Fragment>
    )
}

export default Slider
