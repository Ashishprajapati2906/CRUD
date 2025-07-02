import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UpdateUser = () => {

    const [inputUser, setInputUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        setInputUser({
            ...inputUser,
            [event.target.name]: event.target.value,
        })
    }

    const { id } = useParams()
    const fetchSingleUser = async () => {
        const res = await axios.get(`http://localhost:5000/read/${id}`)
        console.log("response mai kya aa rha hai", res);
        setInputUser({
            name: res.data.name,
            email: res.data.email,
            password: res.data.password
        })
        // console.log("response mai kya aa rha hai", userData);
    }
    useEffect(() => {
        fetchSingleUser()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputUser);
        const res = await axios.put(`http://localhost:5000/update/${id}`, inputUser)
        console.log(res);

        if (res.status === 200) {
            window.location = "/"
        }
        // fetchalluser()
    }
    return (
        <>
            <button
                onClick={() => window.history.back()}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                ← Back
            </button>
            <div className="w-2/3 mx-auto mt-5">
                <form
                    onSubmit={handleSubmit}
                >
                    <h1>Update User</h1>
                    <div className="">
                        <label className=" text-sm text-gray-500 ">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                            placeholder="Enter name"
                            required
                            value={inputUser.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="">
                        <label className=" text-sm text-gray-500 ">Email</label>
                        <input
                            type="text"
                            name="email"
                            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                            placeholder="Enter email "
                            required
                            value={inputUser.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="">
                        <label className=" text-sm text-gray-500 ">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                            placeholder="Enter Password "
                            required
                            value={inputUser.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-center my-4">
                        <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdateUser