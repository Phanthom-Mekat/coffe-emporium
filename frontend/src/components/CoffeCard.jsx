/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeCard = ({ coffee, coffees, setCoffees }) => {
    const { _id,
        name,
        chef,
        supplier,
        taste,
        
        photo,
    } = coffee;

    const handleDelete = _id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(_id)
                fetch(`https://coffe-backend.vercel.app/coffee/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remaining = coffees.filter(cof => cof._id !== _id);
                            setCoffees(remaining)
                        }
                    })

            }
        });
    }

    return (
        <>
            <div className="card card-side bg-gray-300 text-black shadow-2xl">
                <figure>
                    <img
                        src={photo}
                        alt={name} />
                </figure>
                <div className="flex justify justify-between w-full ">
                    <div>
                        <h2 className="card-title">name: {name}</h2>
                        <p>chef: {chef} </p>
                        <p>Supplier: {supplier} </p>
                        <p>Taste: {taste} </p>
                    </div>
                    <div className="card-actions justify-end ">
                        <div className="join join-vertical space-y-2">
                            <button className="btn ">View</button>
                            <Link to={`updatecoffee/${_id}`} className="btn ">Edit</Link>
                            <button
                                onClick={() => handleDelete(_id)} className="btn btn-error">X</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CoffeCard;