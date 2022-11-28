import { useQuery } from '@tanstack/react-query';
import './AllSellers.css'
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../../../Components/UseLoader/Loading';
import useTitle from '../../../hooks/UseTitle';

const AllSellers = () => {

    useTitle('All seller')



    const { data: sellers, isLoading, refetch } = useQuery({

        queryKey: ['sellers'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://resale-treasury-server-site.vercel.app/users/Seller`, {
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






    const handleDeleteSeller = seller => {
        fetch(`https://resale-treasury-server-site.vercel.app/users/${seller._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success(`Buyer ${seller.name} removed successfully`)
                }

            })
    }
    const handleVerify = seller => {
        fetch(`https://resale-treasury-server-site.vercel.app/users/${seller._id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ verified: 'verified' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success(`Seller ${seller.name} verified successfully`)
                }

            })
    }

    if (isLoading) {
        <Loading></Loading>
    }



    return (
        <div>
            <div>
                <h2 className="m-5 text-2xl font-bold">Total sellers: {sellers?.length}</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                                <th>verify</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sellers?.map((seller, i) => <tr
                                    key={seller._id}
                                    value={seller}
                                    className="hover">
                                    <th>{i + 1}</th>
                                    {seller?.status === 'verified' &&
                                        <td>{seller?.name}<img src="https://i.ibb.co/n1rvDcv/valid-vector-icon-png-260889.jpg" alt="verifyIcon" class="verifyIcon"></img></td>
                                    }
                                    {
                                        seller?.status !== 'verified' &&
                                        <td>{seller?.name}</td>
                                    }
                                    <td>{seller?.email}</td>
                                    <td><label onClick={() => handleDeleteSeller(seller)} className="btn btn-xs btn-error">delete</label></td>
                                    {seller?.status === 'verified' &&
                                        <td><p className='text-green-600 font-extrabold'>Verified</p></td>
                                    }
                                    {
                                        seller?.status !== 'verified' &&
                                        <td><label onClick={() => handleVerify(seller)} className="btn btn-xs b">verify</label></td>
                                    }

                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllSellers;