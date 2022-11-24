import axios from 'axios';
import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const Signup = () => {
    const { createUser, updateUser, providerLogin } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signupError, setSignupError] = useState('');
    const [createUserEmail, setCreateUserEmail] = useState('');

    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();


    const handleSignup = (data) => {
        console.log("🚀 ~ file: Signup.js ~ line 12 ~ handleSignup ~ data", data)
        setSignupError('')
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log("🚀 ~ file: Signup.js ~ line 18 ~ handleSignup ~ user", user)
                toast.success('User Created Successfully')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.role);
                    })

            })
            .catch(err => {
                console.error(err.message)
            })
            .catch(error => {
                console.log(error)
                setSignupError(error.message)
            });

    }

    const saveUser = (name, email, role) => {


        axios.post(`http://localhost:5000/users`, {
            name: name,
            email: email,
            role: role
        })
            .then(function (response) {
                console.log(response);
                navigate('/');
            })
            .catch(function (error) {
                console.log(error);
            });


        // normal post  system
        // const user = { name, email, role };

        // fetch(`http://localhost:5000/users`, {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(user)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log("🚀 ~ file: Signup.js ~ line 50 ~ saveUser ~ data", data)
        //         navigate('/');
        //     })

        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }



    const HandleGoogleSignIn = ({ name, email, role }) => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Created Successfully.')
                const userInfo = {
                    email: user.email,
                    name: user.displayName,
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(name = user.displayName, email = user.email, role = "Buyer");
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignupError(error.message)
            });



    }


    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='font-extrabold text-xl text-center'>Signup</h2>
                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text"
                            {...register("name", {
                                required: "Name Address is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="text"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <label className="label"> <span className="label-text">Account Type</span></label>
                    <select name="select" className="select select-bordered w-full max-w-xs"
                        {...register("role", {
                        })}>
                        <option defaultValue>Buyer</option>
                        <option>Seller</option>
                    </select>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        <label className="label"> <span className="label-text"></span></label>
                    </div>
                    <input className='btn btn-info w-full' value="signup" type="submit" />
                    <div>
                        {signupError && <p className='text-red-600'>{signupError}</p>}
                    </div>
                </form>
                <p>Already have an account? <Link className='font-bold text-info' to="/signup">signup</Link></p>
                <div className="divider"> </div>
                <button onClick={HandleGoogleSignIn} className='btn btn-info btn-outline w-full'>Google Sign In</button>
            </div>
        </div>
    );
};

export default Signup;