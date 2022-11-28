import React from 'react';
import useTitle from '../../hooks/UseTitle';

const Dashboard = () => {

    useTitle('Dashboard')

    return (
        <div>
            <h1 className='m-5 text-2xl font-bold'>Welcome To Dashboard</h1>
        </div>
    );
};

export default Dashboard;