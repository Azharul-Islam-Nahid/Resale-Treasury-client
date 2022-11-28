import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Components/UseLoader/Loading';
import { AuthContext } from '../../../Contexts/AuthProvider';
import useTitle from '../../../hooks/UseTitle';

const MyProducts = () => {

    useTitle('Seller products')

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);


    const url = `https://resale-treasury-server-site.vercel.app/getProduct?email=${user?.email}`;

    const { data: sellerPosts = [], isLoading, refetch } = useQuery({
        queryKey: ['sellerPosts'],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    console.log("🚀 ~ file: MyProducts.js ~ line 29 ~ MyProducts ~ sellerPosts", sellerPosts)




    if (isLoading) {
        return <Loading></Loading>
    }


    const handleDeleteSeller = post => {
        fetch(`https://resale-treasury-server-site.vercel.app/deleteProduct/${post._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Sell post for ${post?.product_name} removed successfully`)
                }

            })
    }

    const handleAdvertising = ad => {

        const productDetail = {
            id: ad?.id,
            condition: ad?.condition,
            description: ad?.description,
            image: ad?.image,
            product_name: ad?.product_name,
            location: ad?.location,
            resale_price: ad?.resale_price,
            orginal_price: ad?.orginal_price,
            year_used: ad?.year_used,
            seller_name: ad?.seller_name,
            email: ad?.email,
            posted: ad?.posted

        }

        fetch(`https://resale-treasury-server-site.vercel.app/addProductTohome`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(productDetail)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success(` ${ad?.product_name}advertised successfully`);
                    navigate('/')
                }

                else {
                    toast.error(data.message)
                }


            })
    }



    return (
        <div>
            <h2 className="m-5 text-2xl font-bold">Your Products: {sellerPosts?.length}</h2>
            <div className='grid lg:grid-cols-2 gap-10 mx-10 my-10'>
                {
                    sellerPosts &&


                    sellerPosts?.map(Posts => <div
                        key={Posts?._id}
                    >
                        <div className="card w-72 bg-base-200 shadow-xl">
                            <figure><img className='object-cover object-center w-full rounded-t-md h-72 bg-grey-500' src={Posts?.image} alt="ordered-phone" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Product: {Posts?.product_name}</h2>

                                <p>Seller name: {Posts?.seller_name}</p>
                                <p>Location: {Posts?.location}</p>
                                <p>Used year: {Posts?.year_used}</p>
                                <p className='font-bold'>Condition: {Posts?.condition}</p>
                                <p className='font-bold'>Resell price: {Posts?.resale_price} $</p>
                                <p>Description: {Posts?.description}</p>
                                <div className="card-actions justify-end">
                                    <button onClick={() => handleAdvertising(Posts)} className='btn btn-primary btn-outline w-full' to=''>
                                        Advertise
                                    </button>

                                    <button onClick={() => handleDeleteSeller(Posts)} style={{
                                        color: 'red',
                                        borderColor: 'red'
                                    }} className='btn btn-outline w-full hover:bg-red-300'>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
            <div>

            </div>
        </div>
    );
};

export default MyProducts;