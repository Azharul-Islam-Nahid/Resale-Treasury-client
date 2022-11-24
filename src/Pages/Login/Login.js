import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const navigate = useNavigate();


    const handleLogin = data => {
        console.log("🚀 ~ file: Login.js ~ line 12 ~ handleLogin ~ data", data)
        setLoginError('')

        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log("🚀 ~ file: Login.js ~ line 18 ~ handleLogin ~ user", user)
                navigate('/')
                toast.success('User Logged in')

            })
            .catch(err => {
                console.error(err.message)
                setLoginError(err.message.split(' ')[2])
            })


    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='font-extrabold text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="text"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
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
                    <input className='btn btn-info w-full' value="Login" type="submit" />
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>
                <p>New to Resale Treasury? <Link className='font-bold text-info' to="/signup">Create New Account</Link></p>
                <div className="divider"> </div>
                <button className='btn btn-info btn-outline w-full'>Google Log In</button>
            </div>
        </div>
    );
};

export default Login;