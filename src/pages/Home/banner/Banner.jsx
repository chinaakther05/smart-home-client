import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner3 from '../../../assets/home 3.jpg'
import banner4 from '../../../assets/home 4.jpeg'
import banner5 from '../../../assets/home 5.jpg'

const Banner = () => {
    return (
             <Carousel autoPlay={true} infiniteLoop={true}
              showThumbs={false} 
              showStatus={false} >
            <div>
                <img className='w-full h-[550px] object-cover' src={banner3} alt="Banner 1" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img className='w-full h-[550px] object-cover' src={banner4} alt="Banner 2" />
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