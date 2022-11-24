import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';

const CategoryOptions = ({ category }) => {

    const { name, image } = category;

    return (

        <div className="flex flex-col justify-start mt-6 lg:m-6">
            <img className='mx-auto w-80' alt='phone brands' src={image} />
            <Link to={`/singleCategories/${category?._id}`} className='mt-5'>
                <PrimaryButton>{name}</PrimaryButton>
            </Link>
        </div>

    );
};

export default CategoryOptions;