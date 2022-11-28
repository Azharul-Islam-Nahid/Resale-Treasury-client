import React from 'react';
import Categories from './Categories/Categories';
import Banner from './Banner/Banner';
import Tips from './Tips/Tips';
import useTitle from '../../hooks/UseTitle';
import SellPosts from './SellPosts/SellPosts';

const Home = () => {

    useTitle('Home')

    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <SellPosts></SellPosts>
            <Tips></Tips>
        </div>
    );
};

export default Home;