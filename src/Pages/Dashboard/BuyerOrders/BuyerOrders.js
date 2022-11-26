import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/PrimaryButton/UseLoader/Loading';



const BuyerOrders = () => {


    const url = `http://localhost:5000/orders`;

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['orders'],
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
    console.log("🚀 ~ file: BuyerOrders.js ~ line 24 ~ BuyerOrders ~ orders", orders)

    if (isLoading) {
        return <Loading></Loading>
    }



    return (
        <div>
            <h1 className='m-5 text-2xl font-bold'>Total Orders : {orders.length}</h1>
            <div className='grid lg:grid-cols-2 gap-10 mx-10 my-10'>
                {
                    orders?.map(order => <div
                        key={order?._id}
                    >
                        <div className="card w-96 bg-base-200 shadow-xl">
                            <figure><img className='object-cover object-center w-full rounded-t-md h-72 bg-grey-500' src={order?.product_img} alt="ordered-phone" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Product: {order?.product}</h2>

                                <p>Buyer name: {order?.name}</p>
                                <p>Email: {order?.email}</p>
                                <p>Location: {order?.location}</p>
                                <p>Phone: {order?.phone}</p>
                                <p className='font-bold'>Price: {order?.price}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Pay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default BuyerOrders;