import React from 'react';
import { Link } from 'react-router-dom';

const CategoryOptions = ({ category }) => {

    const { name, image } = category;

    return (

        <div className="flex flex-col justify-start mt-6 lg:m-6">
            <img className='mx-auto w-80' alt='phone brands' src={image} />
            <Link to={`/singleCategories/${category?._id}`} className='mt-5'>
                <button className="px-6 py-2 border rounded-md bg-sky-600 text-gray-50 border-sky-600">
                    <span className="not-sr-only">{name}</span>
                </button>
            </Link>
        </div>

    );
};

export default CategoryOptions;