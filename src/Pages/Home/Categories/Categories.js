import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../Components/PrimaryButton/UseLoader/Loading';
import CategoryOptions from './CategoryOptions';

const Categories = () => {

    // , {
    //     headers: {
    //         authorization: `bearer ${localStorage.getItem('accessToken')}`
    //     }
    // })

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/categories`)
            const data = await res.json()
            return data
        }
    })

    if (isLoading) {
        <Loading></Loading>
    }



    return (
        <section className="p-6 bg-gray-100 text-gray-800">
            <div className="container mx-auto grid justify-center grid-cols-1 md:grid-cols-2 text-center lg:grid-cols-3">
                {
                    categories?.map(category => <CategoryOptions
                        key={category?._id}
                        category={category}
                    ></CategoryOptions>)
                }

            </div>
        </section>
    );
};

export default Categories;