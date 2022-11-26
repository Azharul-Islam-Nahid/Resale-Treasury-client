import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../Components/UseLoader/Loading';

const AllBuyers = () => {


    const { data: buyers, isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/users/Buyer`, {
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
        return <Loading></Loading>
    }

    return (
        <div>
            <div>
                <h2 className="m-5 text-2xl font-bold">Total buyers: {buyers?.length}</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                buyers?.map((buyer, i) => <tr
                                    key={buyers._id}
                                    value={buyer}
                                    className="hover">
                                    <th>{i + 1}</th>
                                    <td>{buyer?.name}</td>
                                    <td>{buyer?.email}</td>
                                    <td><label onClick='' className="btn btn-xs btn-error">delete</label></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                {/* {
                deleteBuyer && <ConfirmationModal
                    closeModal={closeModal}
                    modalData={deleteBuyer}
                    modalAction={handleDeleteBuyer}
                    actionButtonName='delete'
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deleteBuyer.name} it can't be undone.`}
                >

                </ConfirmationModal>
            } */}
            </div>
        </div>
    );
};

export default AllBuyers;