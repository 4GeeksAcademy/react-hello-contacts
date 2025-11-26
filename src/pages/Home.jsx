import React, { useEffect, useState } from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import ContactCard from "../components/Card.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();
	
	const slug = "maria";
	const AGENDA_URL = `https://playground.4geeks.com/contact/agendas/${slug}`;

	const crearAgenda = () => {
		fetch(AGENDA_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" }
		})
			.then(resp => resp.json())
			.catch(error => console.error('Error al crear agenda:', error));
	};

	const obtenerContactos = () => {
		fetch(`${AGENDA_URL}/contacts`)
			.then(resp => {
				if (resp.status === 404) {
					crearAgenda();
									}
				
				return resp.json();
			})
			.then(data => {
				
				dispatch({ type: 'set_contacts', payload: data.contacts });
			})
			.catch(error => console.error(error.message));
	};




	useEffect(() => {
		obtenerContactos();
	}, []);

	

	return (
		<div className="container">
			<div className="row">
				<div className="col-12 d-flex justify-content-end">
					<Link to="/add-contact">
						<button className="btn btn-success" >Add New Contact</button>
					</Link>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<h1>Agenda de: {slug}</h1>
				</div>
			</div>
			<div className="mt-4">
				{store.contacts.length === 0 ? (
					<p>No hay contactos en la agenda.</p>
				) : (
					store.contacts.map((item) => (
						<ContactCard
							informacion={item}
							
							key={item.id}
						/>
					))
				)}
			</div>
		</div>
	);
};