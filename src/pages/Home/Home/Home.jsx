import React from 'react';
import Banner from '../banner/Banner';
import HeroSection from '../HeroSection/HeroSection';
import Reviews from '../Reviews';

const reviewsPromise = fetch('/reviews.json').then(res => res.json());
const Home = () => {
    return (
        <div className='mt-2 '>
          <Banner></Banner> 
          <HeroSection></HeroSection>
          <Reviews reviewsPromise={reviewsPromise}></Reviews>
          
        </div>
    );
};

export default Home;