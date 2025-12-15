import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner5 from '../../../assets/banner5.jpg'
import banner6 from '../../../assets/banner6.jpg'
import banner7 from '../../../assets/banner7.jpg'
import banner8 from '../../../assets/banner8.jpg'

const Banner = () => {
    return (
             <Carousel autoPlay={true} infiniteLoop={true}
              showThumbs={false} 
              showStatus={false} >
            <div>
                <img className='w-full h-[550px] object-cover' src={banner8} alt="Banner 1" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img className='w-full h-[550px] object-cover' src={banner7} alt="Banner 1" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img className='w-full h-[550px] object-cover' src={banner6} alt="Banner 2" />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img className='w-full h-[550px] object-cover' src={banner5} alt="Banner 3" />
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
    );   
    
};

export default Banner;