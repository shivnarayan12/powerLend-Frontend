
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [hide, setHide] = useState(true);
    const token = window.localStorage.getItem("token");
    const userId = window.localStorage.getItem("userid");
    const filteredUsers = users.filter((user) => user._id !== userId);

    useEffect(() => {
        axios.get(`https://powerlend.onrender.com/getUserDetails`)
            .then(response => setUsers(response.data))
            .catch(err => console.error("Error fetching user details:", err));

        setHide(!token);
    }, [userId, token]);

    const handleDelete = () => {console.log(deleteUserId);
        if (deleteUserId) {
            axios.delete(`https://powerlend.onrender.com/deleteUser/${deleteUserId}`
                , {
                    headers: {
                      "Content-Type": "Application/json",
                      authorization: token,
                    },
                    withCredentials: true,
                  })
            
            
                .then(() => {
                    setUsers(users.filter(user => user._id !== deleteUserId));
                    setShow(false);
                })
                .catch(err => console.error("Error deleting user:", err));
        }
    };

    return (
        <div hidden={hide}>
            <div style={{ padding: "5px" }}>
                <Link to="/AdminPortal">
                    <button className="Back_Btn">
                        <svg className="svg-icon" viewBox="0 0 20 20">
                            <path fill="black" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
                        </svg>
                        <span className="back_text">Back</span>
                    </button>
                </Link>
                <h3 style={{ textAlign: "center", fontFamily: 'Montserrat, sans-serif', fontWeight: "bolder", marginTop: "-40px" }}>User Management</h3>
                <hr />
            </div>
            <div>
                <div className="container mt-4">
                    <center>
                        <Table striped bordered hover variant="light" style={{ width: "100%", fontFamily: 'Montserrat, sans-serif', textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>User Email</th>
                                    <th>Phone Number</th>
                                    <th>Shipping Address</th>
                                    <th>Orders Placed</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.address}</td>
                                        <td>{user.orders}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => {
                                                setDeleteUserId(user._id);
                                                setShow(true);
                                            }}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </center>
                </div>
            </div>
            <Modal show={show} onHide={() => setShow(false)} backdrop="static" contentClassName='modal-bg'>
                <Modal.Header closeButton>
                    <Modal.Title>Remove User!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to permanently remove this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={() => setShow(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Remove</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

