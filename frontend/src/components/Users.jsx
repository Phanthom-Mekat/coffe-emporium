import { useLoaderData } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import Swal from "sweetalert2";

const Users = () => {
    const loadedUser = useLoaderData()
    const [users, setUsers] = useState(loadedUser)

    const handleDelete = id => {
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
                fetch(`http://localhost:5000/users/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            const remaining = users.filter(user => user._id !== id);
                            setUsers(remaining)
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })


            }
        });
    }
    return (
        <div>
            <Navbar />
            <h2 className="text-xl">users:{users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user =>
                                <tr key={users._id} className="hover">
                                    <th>{user._id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.data}</td>
                                    <td>
                                        <button className="btn">Edit</button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="btn">X</button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;