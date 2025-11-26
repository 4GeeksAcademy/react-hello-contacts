import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


const EditContact = () => {
    //obtener el id del contacto desde la url 
    const { contact_id } = useParams()

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()
    let [data, setData] = useState({
        name: "", email: "", phone: "", address: ""
    })

    useEffect(() => {
        //buscan directamente en el store 
        const contactToEdit = store.contacts.find(contacto => contacto.id === parseInt(contact_id))

        if (contactToEdit) {
            setData({
                name: contactToEdit.name,
                email: contactToEdit.email,
                phone: contactToEdit.phone,
                address: contactToEdit.address

            })
        }
        else{
            alert("el contacto no fue encontrado")
        }
    }, [contact_id])










    const formChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }



    const FormSubmit = (e) => {
        e.preventDefault()

        if (!data.name || !data.email || !data.phone || !data.address) {
            alert("Todos los campos son obligatorios");
            return;
        }



        fetch("https://playground.4geeks.com/contact/agendas/maria/contacts", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                ...data, agenda_slug: "maria"
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to create contact")
                }
                return response.json()
            })
            .then((newContact) => {
                dispatch({
                    type: "add_contact",
                    payload: newContact
                })
                navigate("/");
            })
            .catch((error) => console.error("Error creating contact:", error))
    }

    return (
        <div className='container'>



            <h1>Edit Contact</h1>

            <form className="row g-3" onSubmit={FormSubmit}>
                <div className="col-md-12">
                    <label htmlFor="inputname" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="inputname" placeholder="Full Name" value={data.name} onChange={formChange} name="name" />
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" value={data.email} onChange={formChange} name="email" />
                </div>

                <div className="col-12">
                    <label htmlFor="inputphone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="inputphone" value={data.phone} onChange={formChange} name="phone" />
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="Apartment, studio, or floor" value={data.address} onChange={formChange} name="address" />
                </div>


                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
            </form>



            <button className='btn btn-warning' onClick={() => {
                console.log("volver a home");
                navigate("/")
            }}>or get back to contacts </button>
        </div>




    )
}

export default EditContact