import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import Loading from '../../../Components/UseLoader/Loading';
import { AuthContext } from '../../../Contexts/AuthProvider';

const AddProduct = () => {

    const { user } = useContext(AuthContext);
    const imageHostKey = process.env.REACT_APP_imgbb_key;


    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            try {
                const res = await fetch("http://localhost:5000/categories");
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error);
            }
        },
    });
    // console.log(categories);

    if (isLoading) {
        return <Loading />;
    }

    const postedTime = new Date().toLocaleTimeString();
    // console.log(postedTime);

    const handleAddService = event => {

        event.preventDefault();

        const form = event.target;

        const productImage = form.product_img.files[0];

        const image = productImage;
        console.log("🚀 ~ file: AddProduct.js ~ line 42 ~ handleAddService ~ image", image)
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`



        const categoryID = form.categoryId.value;
        const productName = form.product_name.value;
        const email = user?.email;
        const sellerName = form.seller_name.value;
        const sellerLocation = form.location.value;
        const originalPrice = form.original_price.value;
        const resalePrice = form.resale_price.value;
        const yearUsed = form.year_used.value;





        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())

            .then(imgData => {
                console.log(imgData);
                if (imgData.success) {

                    const productDetail = {
                        id: categoryID,
                        image: imgData?.data.url,
                        product_name: productName,
                        location: sellerLocation,
                        resell_price: resalePrice,
                        orginal_price: originalPrice,
                        year_used: yearUsed,
                        seller_name: sellerName,
                        email: email,
                        posted: postedTime

                    }


                    fetch(`http://localhost:5000/addProduct`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(productDetail)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(` ${productName} posted successfully`);
                            Navigate('/dashboard/MyProducts')

                        })
                }
            })
    }

    return (
        <div>
            <h2 className="mt-5 text-4xl font-bold leading-tight lg:text-5xl">Post your Ad here</h2>
            <div className="grid max-w-screen-xl  grid-cols-1 mb-5 gap-8 px-5 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-10 xl:px-10 bg-teal-300 my-10">
                <div className="flex flex-col items-center">
                    <div className="space-y-1">
                    </div>
                    <img className="m-auto w-96 p-6 max-h-full lg:mt-60" src='https://i.ibb.co/QY0zGG6/giphy.gif' alt='notebook-animation' />
                </div>
                <form onSubmit={handleAddService} noValidate="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div>
                        <label htmlFor="categoryId" className="text-sm font-semibold">Product ID</label>
                        <select name="categoryId" className="select select-bordered w-full">
                            {
                                categories.map((categoryId) => <option
                                    key={categoryId._id}
                                    value={categoryId._id}
                                >{categoryId.name}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="brand_name" className="text-sm font-semibold">Model name</label>
                        <input id="product_name" type="text" className="w-full p-3 rounded font-semibold text-slate-900 dark:bg-gray-50" required />
                    </div>
                    <div>
                        <label htmlFor="product_img" className="text-sm font-semibold">Upload product image</label>
                        <input id="product_img" type="file" className="w-full p-3 rounded font-semibold text-slate-900 dark:bg-gray-50" required />
                    </div>
                    <div>
                        <label htmlFor="seller_name" className="text-sm font-semibold">Your Name</label>
                        <input id="seller_name" type="text" placeholder="" className="w-full p-3 rounded font-semibold text-slate-900 dark:bg-gray-50" required />
                    </div>
                    <div>
                        <label htmlFor="location" className="text-sm font-semibold">Your Location</label>
                        <input id="location" type="text" placeholder="" className="w-full p-3 rounded font-semibold text-slate-900 dark:bg-gray-50" required />
                    </div>
                    <div>
                        <label htmlFor="original_price" className="text-sm font-semibold">Original Price</label>
                        <input id="original_price" type="number" className="w-full p-3 rounded font-semibold text-slate-900 dark:bg-gray-50" required />
                    </div>
                    <div>
                        <label htmlFor="resale_price" className="text-sm font-semibold">Resale Price</label>
                        <input id="resale_price" type="number" className="w-full p-3 rounded font-semibold text-slate-900 dark:bg-gray-50" required />
                    </div>
                    <div>
                        <label htmlFor="year_used" className="text-sm font-semibold">Year Used</label>
                        <input id="year_used" type="number" className="w-full p-3 rounded font-semibold text-slate-900 dark:bg-gray-50" required />
                    </div>
                    <button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded dark:bg-gray-700 dark:text-gray-200">Post a product</button>

                </form>
            </div>
        </div>
    );
};

export default AddProduct;