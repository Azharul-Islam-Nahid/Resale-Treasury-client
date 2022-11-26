import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';

const CategoryCards = ({ sellerPost }) => {
    const { user } = useContext(AuthContext);

    const [modal, setModal] = useState(false);


    const { seller_name, resale_price, orginal_price, image, product_name, posted, year_used, location } = sellerPost;


    const modalSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value
        const productName = product_name
        const productImage = image
        const email = form.email.value
        const price = form.price.value
        const location = form.location.value
        const phone = form.phone.value

        const buyer = {
            name: name,
            product: productName,
            product_img: productImage,
            email: email,
            price: price,
            location: location,
            phone: phone
        }
        console.log("🚀 ~ file: ModalForm.js ~ line 32 ~ modalSubmit ~ buyer", buyer)
        console.log("🚀 ~ file: ModalForm.js ~ line 28 ~ modalSubmit ~ user", user)

        fetch(`http://localhost:5000/orders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(buyer)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setModal(false)
                    toast.success('The Item Is Booked!')
                }

                else {
                    setModal(false)
                    toast.error(data.message)
                }

            })
    }



    return (
        <div className="lg:max-w-3xl mx-auto m-10 p-6 space-y-4 sm:p-10 bg-gray-200 text-black rounded-lg">
            <h2 className="text-xl font-semibold">Seller name: {seller_name}</h2>
            <ul className="flex flex-col divide-y divide-gray-300">
                <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                    <div className="flex w-full space-x-2 sm:space-x-4">
                        <img className="flex-shrink-0 object-cover w-20 h-20 border-transparent rounded outline-none sm:w-32 sm:h-32 bg-gray-50" src={image} alt="resell products" />
                        <div className="flex flex-col justify-between w-full pb-4">
                            <div className="flex justify-between w-full pb-2 space-x-2">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">{product_name}</h3>
                                    <p className="text-sm text-gray-600">Classic</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">Selling price: {resale_price}</p>
                                    <p className="text-sm">Original price: {orginal_price}</p>
                                </div>
                            </div>
                            <div className="flex text-sm divide-x">
                                <button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Posted: {posted}</span>
                                </button>
                                <button type="button" className="flex items-center px-2 py-1 space-x-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                        <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                    </svg>
                                    <span>Add to favorites</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div className="space-y-1 text-right">
                <p>Used: <span className="font-semibold">{year_used}</span>
                </p>
                <p className="text-sm text-gray-600">Location: {location}</p>
            </div>
            <div className="flex justify-end space-x-4">
                <Link to='/'>
                    <button type="button" className="px-6 py-2 border rounded-md border-sky-600">Back
                        <span className="sr-only sm:not-sr-only"> to Home</span>
                    </button>
                </Link>
                <button onClick={() => setModal(true)} className="px-6 py-2 border rounded-md bg-sky-600 text-gray-50 border-sky-600">
                    <span className="sr-only sm:not-sr-only">Continue to </span>Booking
                </button>
            </div>
            {modal ? (

                <>
                    <form onSubmit={modalSubmit} className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 mx-auto h-2/3 my-auto flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-slate-500">
                        <button onClick={() => setModal(false)} className="btn btn-sm btn-circle absolute right-6 top-4">✕</button>
                        <h3 className="text-lg mb-1 font-bold text-white">{product_name}</h3>
                        <input name="name" type="text" defaultValue={user?.displayName} disabled className="input w-full input-bordered font-semibold" />
                        <input name="email" type="email" defaultValue={user?.email} disabled className="input w-full input-bordered font-semibold" />
                        <h3 className="text-sm text-white font-bold">Resale price</h3>
                        <input name="price" type="text" defaultValue={resale_price} disabled className="input w-full input-bordered font-semibold" />
                        <h3 className="text-sm text-white font-bold">Your phone number</h3>
                        <input name="phone" type="number" placeholder='Your phone number' className="input w-full input-bordered font-semibold" />
                        <h3 className="text-sm text-white font-bold">Meeting Location</h3>
                        <input name="location" type="text" placeholder='Your Meeting Location' className="input w-full input-bordered font-semibold" />
                        <input className='btn btn-primary w-full' type="submit" value="Submit" />
                    </form>
                </>
            ) : null}
        </div>
    );
};

export default CategoryCards;