import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';


const DisplayError = () => {


    const navigate = useNavigate();

    const { logOut } = useContext(AuthContext);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                navigate('/login')
            })
            .catch(err => console.log(err));
    }

    const error = useRouteError();
    return (
        <div>
            <section className="flex items-center h-full p-16 bg-gray-50 text-gray-800">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-md text-center">

                        <img src='https://i.ibb.co/C6d0Jg7/ef8bbd4554dedcc2fd1fd15ab0ebd7a1.gif' alt='error' />
                    </div>
                    <p className="text-red-500">Oops! Something Went Wrong!</p>
                    <p className='text-red-400'>{error.statusText || error.message}</p>
                    <h4 className="text-3xl"><button onClick={handleSignOut}>Sign out & log in again</button></h4>
                </div>
            </section>
        </div>
    );
};

export default DisplayError;