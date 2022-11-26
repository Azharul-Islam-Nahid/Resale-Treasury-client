import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider';

const ModalForm = ({ sellerPostInfo, setModal }) => {


    const { resale_price, product_name } = sellerPostInfo;

    const { user } = useContext(AuthContext);

    const modalSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value
        const email = form.email.value
        const price = form.price.value
        const location = form.location.value
        const phone = form.phone.value

        const user = {
            name: name,
            email: email,
            price: price,
            location: location,
            phone: phone
        }
        console.log("🚀 ~ file: ModalForm.js ~ line 28 ~ modalSubmit ~ user", user)

        toast.success('The Item Is Booked!')
        setModal(null)
    }
    return (
        <>
            <input type="checkbox" id="buyers-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="buyers-modal" className="btn btn-primary btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{product_name}</h3>
                    <form onSubmit={modalSubmit} className='grid grid-cols-1 gap-3 mt-10'>
                        <input name="name" type="text" placeholder="Your Name" className="input w-full input-bordered" defaultValue={user?.displayName} disabled />
                        <input name="email" type="email" placeholder="Email Address" className="input w-full input-bordered" defaultValue={user?.email} disabled />
                        <input name='price' type="text" defaultValue={resale_price} disabled className="input w-full input-bordered " />
                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                        <input name="location" type="text" placeholder="Meeting Location" className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-primary btn-outline w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default ModalForm;