import axios from "axios";
import '../books.css'
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const [title, settitle] = useState([])
    const [desc, setdesc] = useState([])
    const [price, setprice] = useState([])
    const [cover, setcover] = useState([])
    const [error, setError] = useState(false)


    const { id } = useParams()
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:5000/books/${id}`)
            .then((res) => {
                settitle(res.data.data[0].title)
                setdesc(res.data.data[0].desc)
                setcover(res.data.data[0].cover)
                setprice(res.data.data[0].price)
            }
            )
            .catch((err) => console.log(err))
    }, [])

    const update = async (e) => {
        e.preventDefault();
        const book = { title, desc, cover, price }
        try {
            await axios.put(`http://localhost:5000/books/${id}`, book);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };





    return (
        <div className="form">
            <h1>Update the Book</h1>
            <input
                type="text"
                value={title}
                placeholder="Book title"
                name="title"
                onChange={(e) => settitle(e.target.value)}
            />
            <textarea
                rows={5}
                value={desc}
                type="text"
                placeholder="Book desc"
                name="desc"
                onChange={(e) => setdesc(e.target.value)}
            />
            <input
                value={price}
                placeholder="Book price"
                name="price"
                onChange={(e) => setprice(e.target.value)}
            />
            <input
                type="text"
                value={cover}
                placeholder="Book cover"
                name="cover"
                onChange={(e) => setcover(e.target.value)}
            />
            <button onClick={update}>Update</button>
            {error && "Something went wrong!"}
            <Link to="/">See all books</Link>
        </div>
    );
};

export default Edit;