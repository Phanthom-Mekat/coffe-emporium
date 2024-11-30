import Swal from 'sweetalert2'
const AddCoffee = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const chef = form.chef.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;

        const newCoffee = {
            name,
            chef,
            supplier,
            taste,
            category,
            details,
            photo,
        };
        console.log(newCoffee);
    
        fetch('https://coffe-backend.vercel.app/coffee',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(newCoffee)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.insertedId){
                Swal.fire({
                    title: 'Success!',
                    text: 'Coffee added successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
            }
        })
    }

    return (
        <div className="min-h-screen bg-base-200 p-4">
            <div className=" p-8 rounded-lg shadow-xl  mx-auto">
                <div className="flex items-center mb-4">
                    <button className="btn btn-ghost" onClick={() => window.history.back()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to home</span>
                    </button>
                </div>
                <h1 className="text-3xl font-bold text-center mb-6">Add New Coffee</h1>
                <p className="text-center mb-6">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-5 ">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" name="name" placeholder="Enter coffee name" className="input input-bordered w-full mt-1" />
                        </div>
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Chef</label>
                            <input type="text" name="chef" placeholder="Enter coffee chef" className="input input-bordered w-full mt-1" />
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Supplier</label>
                            <input type="text"  name="supplier" placeholder="Enter coffee supplier" className="input input-bordered w-full mt-1" />
                        </div>
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Taste</label>
                            <input type="text"  name="taste" placeholder="Enter coffee taste" className="input input-bordered w-full mt-1" />
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <input type="text" name="category" placeholder="Enter coffee category" className="input input-bordered w-full mt-1" />
                        </div>
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Details</label>
                            <textarea name="details" placeholder="Enter coffee details" className="textarea textarea-bordered w-full mt-1"></textarea>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Photo</label>
                        <input type="text" name="photo" placeholder="Enter photo URL" className="input input-bordered w-full mt-1" />
                    </div>
                    <button type="submit"  className="btn btn-wide btn-outline mt-4">Add Coffee</button>
                </form>
            </div>
        </div>
    );
};

export default AddCoffee;
