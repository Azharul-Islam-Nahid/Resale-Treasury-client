import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../../hooks/UseTitle';
import CategoryCards from './CategoryCards';

const SingleCategories = () => {

    useTitle('All phones')

    const sellerPosts = useLoaderData();
    console.log("🚀 ~ file: SingleCategories.js ~ line 7 ~ SingleCategories ~ sellerPosts", sellerPosts)
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 m-auto'>
            {
                sellerPosts.map(sellerPost => <CategoryCards
                    key={sellerPost?._id}
                    sellerPost={sellerPost}
                ></CategoryCards>)
            }
        </div>
    );
};

export default SingleCategories;