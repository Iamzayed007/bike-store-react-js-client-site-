import React from 'react';
import Category from '../../CategoryBike/Category';
import ReviewHome from '../../Reviews/ReviewHome/ReviewHome';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import Banner from '../Banner/Banner';
import Bikes from '../Bikes/Bikes';

const Home = () => {
    return (
        <div>
            <Header />
            <Banner />
            <Bikes></Bikes>
            <ReviewHome></ReviewHome>
            <Category></Category>
            <Footer />

        </div>
    );
};

export default Home;