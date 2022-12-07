import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { FaBookmark } from "react-icons/fa";
import Loading from '../../../Components/UseLoader/Loading';
import { AuthContext } from '../../../Contexts/AuthProvider';

const SellPosts = () => {

    const { user } = useContext(AuthContext);

    const { data: advertises = [], isLoading } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://resale-treasury-server-site.vercel.app/getAddProduct?email=${user?.email}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }

        }
    });


    if (isLoading) {
        <Loading></Loading>
    }

    return (
        <div className='m-auto text-center mt-20'>
            <h2 className="text-4xl text-primary"><span className="border-b-2 border-accent">Advertised</span> items</h2>

            {
                advertises.length === 0 ?
                    <h2 className="text-4xl text-gray-800 mt-10 font-semibold">There is no Advertised items to show</h2>
                    :
                    (<div className='mt-14 grid lg:grid-cols-4 gap-10'>
                        {advertises.map((advertise) => (
                            <div key={advertise?._id} className=" card card-compact lg:w-80 bg-base-100 shadow-xl shadow-primary">
                                <figure className=''>
                                    <img className='h-80' src={advertise?.image} alt="advertise" />
                                </figure>
                                <div className="card-body">
                                    <div className='flex justify-between'>
                                        <h2 className="card-title">{advertise?.product_name}</h2>
                                        <button className="text-sky-400"><FaBookmark /></button>
                                    </div>
                                    <h2 className="card-title text-md">Seller Name: {advertise?.seller_name}</h2>
                                    <h2 className="card-title text-sm">Location: {advertise?.location}</h2>
                                    <h2 className="card-title text-sm">Product Condition: {advertise?.product_condition ? advertise?.product_condition : 'Fair'}</h2>
                                    <div className='lg: flex justify-between'>
                                        <h2 className="card-title text-sm">Resale Price: ${advertise?.resale_price}</h2>
                                    </div>
                                    <div className='lg: flex justify-between'>
                                        <h2 className="card-title text-sm">Year Of Purchase: {advertise?.year_of_purchase ? advertise?.year_of_purchase : '2022-02-3'}</h2>
                                    </div>
                                    <h2 className="card-title text-sm">Posted On: {advertise?.posted}</h2>
                                    {/* <div className="card-actions justify-start">
                    <button className="text-sky-400"><Link to={`/advertise/${advertise.id}`}>Know more</Link></button>
                  </div> */}
                                </div>
                            </div>
                        ))}
                    </div>)
            }
        </div>
    );
};




export default SellPosts;