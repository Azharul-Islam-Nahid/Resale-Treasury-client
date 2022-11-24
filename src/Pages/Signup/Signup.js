import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const Signup = () => {
    const { createUser } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signupError, setSignupError] = useState('');
    const [createUserEmail, setCreateUserEmail] = useState('');


    const handleSignup = data => {
        console.log("🚀 ~ file: Signup.js ~ line 12 ~ handleSignup ~ data", data)
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log("🚀 ~ file: Signup.js ~ line 18 ~ handleSignup ~ user", user)
            })
            .catch(err => console.error(err));

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
                <button className='btn btn-info btn-outline w-full'>Google Sign In</button>
            </div>
        </div>
    );
};

export default Signup;