import React from 'react';
import Categories from './Categories/Categories';
import Banner from './Banner/Banner';
import Tips from './Tips/Tips';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <Tips></Tips>
        </div>
    );
};

export default Home;