import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoryCards from './CategoryCards';

const SingleCategories = () => {

    const sellerPosts = useLoaderData();
    console.log("🚀 ~ file: SingleCategories.js ~ line 7 ~ SingleCategories ~ sellerPosts", sellerPosts)
    return (
        <div className='m-auto'>
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