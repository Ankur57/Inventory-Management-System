import { useState } from 'react';

const Form = ({ onAddItem, onClose }) => {
    // State to manage form inputs
    const [productId, setProductId] = useState("");
    const [category, setCategory] = useState("");
    const [productName, setProductName] = useState("");
    const [costPrice, setCostPrice] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Calculate profit. Ensure values are numbers.
        const cost = parseFloat(costPrice);
        const selling = parseFloat(sellingPrice);
        const profit = (selling - cost) || 0; // Use 0 if result is NaN

        // Create a new item object
        const newItem = {
            id: productId, // Using the entered ID, or you could use a generated one
            category,
            product: productName,
            price: selling,
            costPrice: cost,
            profit,
        };

        // Pass the new item to the parent component and close the form
        onAddItem(newItem);
        onClose();

        // Optional: clear the form after submission
        setProductId("");
        setCategory("");
        setProductName("");
        setCostPrice("");
        setSellingPrice("");
    };

    return (
        <div className='h-full w-full flex items-center justify-center'>
            <div className='h-[80%] w-[80%] md:w-[50%] flex flex-col items-center bg-stone-200 border-2
                overflow-auto border-black rounded-sm'>
                <div className='w-[100%] flex flex-col items-center'>
                    <div className='flex justify-between w-[95%] items-center '>
                        <h1 className='font-Playfair font-semibold text-2xl md:text-4xl '>Add Items</h1>
                        {/* The onClick handler for the close button */}
                        <i onClick={onClose} className="font-medium text-3xl ri-arrow-left-circle-line text-right mt-3 cursor-pointer"></i>
                    </div>
                    <div className="h-1 w-full bg-gray-500 mb-5 mt-2"></div>
                </div>
                {/* Form with onSubmit handler */}
                <form className='w-[90%] flex flex-col mt-5 gap-6' onSubmit={handleSubmit}>
                    {/*Row-1*/}
                    <div className='flex flex-col'>
                        <h1 className='text-xl font-semibold'>Enter Product ID</h1>
                        <input
                            type='text'
                            placeholder='Enter Product Id'
                            className='p-2 placeholder:italic rounded'
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-xl font-semibold'>Select category</h1>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border p-2 rounded w-full"
                        >
                            <option value="">Select</option>
                            <option value="Jewellery">Jewellery</option>
                            <option value="Wallet">Wallet</option>
                        </select>
                    </div>

                    {/*Row-2*/}
                    <div className='flex flex-col'>
                        <h1 className=' text-xl font-semibold'>Select Product Name</h1>
                        <select
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option value="">-- Select --</option>
                            <option value="Ring">Ring</option>
                            <option value="Necklace">Necklace</option>
                            <option value="Placeholder Item">Placeholder Item</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className=' text-xl font-semibold'>Enter Cost Price</h1>
                        <input
                            type='number'
                            placeholder='Cost Price'
                            className='p-2 placeholder:italic rounded'
                            value={costPrice}
                            onChange={(e) => setCostPrice(e.target.value)}
                        />
                    </div>

                    {/*Row-3*/}
                    <div className='flex flex-col'>
                        <h1 className='font- text-xl font-semibold'>Enter Selling Price</h1>
                        <input
                            type='number'
                            placeholder='Selling Price'
                            className='p-2 placeholder:italic rounded'
                            value={sellingPrice}
                            onChange={(e) => setSellingPrice(e.target.value)}
                        />
                    </div>
                    {/* The profit calculation is now handled automatically on submit, so no need for an input here. */}

                    <button
                        type="submit"
                        className='bg-sky-400 p-3 w-[50%] sm:w-[30%] rounded-lg sm:text-xl font-semibold mt-5 mb-5 mx-auto'>
                        Add Item
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Form
