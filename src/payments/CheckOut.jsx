import React, { useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import "../payments/CheckOut.css";
import phonepe from "../asset/phonepe-1.svg";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';

export default function CheckOut() {

    const navigate = useNavigate();
    const { subtotal } = useParams();
    const total = parseInt(subtotal) + 24;

    const userid = window.localStorage.getItem("userid");
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        axios.get(`https://powerlend-tool-1-o.onrender.com/getUpUser/${userid}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            withCredentials: true,
        }).catch(err => console.log(err));
    }, [userid, token]);

    const handleOrderPlacement = async () => {
        try {
            const response = await axios.put(`https://powerlend-tool-1-o.onrender.com/update-order-count/${userid}`, {
                orders: 1
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                withCredentials: true,
            });

            if (response.data.success) {
                toast.success(`Order was placed! Total orders: ${response.data.orders}`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error placing order');
            console.error('Error placing order:', error);
        }
    };

    const handlePayment = async () => {
        try {
            const order = await axios.post("hhttps://powerlend-tool-1-o.onrender.com/create-order", {
                amount: total
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            const options = {
                key: "rzp_test_88QUmbTj8Tgz6d",
                amount: order.data.amount,
                currency: order.data.currency,
                name: "Power Lend",
                description: "Power Lend Test Transaction",
                image: "https://png.pngtree.com/png-clipart/20200701/original/pngtree-power-tool-design-png-image_5370869.jpg",
                order_id: order.data.id,
                callback_url: "https://powerlend-tool-1-o.onrender.com/verifyPayment", // Update with your server's URL
                prefill: {
                    name: "Shiv Narayan",
                    email: "PowerLend@gmail.com",
                    contact: "9000090000",
                },
                notes: {
                    address: "Power Lend Kachhawa Office",
                },
                theme: {
                    color: "#03fcfc",
                },
                handler: function (response) {
                    handlePaymentSuccess(response);
                },
                modal: {
                    ondismiss: function () {
                        console.log("Payment window closed");
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.log("PRINT ERROR", error);
        }
    };

    const handlePaymentSuccess = (response) => {
        const paymentDetails = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
        };

        fetch("https://powerlend-tool-1-o.onrender.com/verifyPayment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentDetails),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                toast.success('Payment verified successfully!');
                navigate('/CheckOut'); 
            } else {
                toast.error('Payment verification failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error verifying payment:', error);
            toast.error('There was an error verifying the payment.');
        });
    };

    return (
        <center>
            <div className='payment_view' style={{ fontFamily: "Montserrat, sans-serif", paddingTop: "20px" }}>
                <div>
                    <div className="form-container2" style={{ backgroundColor: "#ffc400" }} tabIndex="0">
                        <div className="form-container__block">
                            <div className="form-container__header">
                                <p style={{ fontWeight: "700", fontSize: "20px" }}><u>Order Summary</u></p>
                                <form className="form-container__form" style={{ gap: "1px" }}>
                                    <p style={{ fontWeight: "500", textAlign: "initial" }}>
                                        <b>Subtotal:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹ {subtotal}.00
                                    </p>
                                    <p style={{ fontWeight: "500", textAlign: "initial" }}>
                                        <b>Shipping Address:</b>&nbsp;&nbsp;<u>3<sup>rd</sup> Floor PowerLend Building, Kachhawa Bazar Near Christian Hospital, Mirzapur</u>
                                    </p>
                                    <p style={{ fontWeight: "500", textAlign: "initial" }}>
                                        <b>Shipping Fees:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FREE
                                    </p>
                                    <p style={{ fontWeight: "500", textAlign: "initial" }}>
                                        <b>Sales Tax:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹ 24.00
                                    </p>
                                    <h4 style={{ border: "1px solid black", backgroundColor: "black", color: "white", borderRadius: "5px" }}>
                                        Order Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ₹ {total}
                                    </h4>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div>&nbsp;</div>
                <div className="form-container2" style={{ backgroundColor: "#ffc400" }} tabIndex="0">
                    <div className="form-container__block">
                        <div className="form-container__header">
                            <button
                                className="btn btn-secondary btn-lg btn-pay-on-delivery"
                                onClick={handleOrderPlacement}
                            >
                                Pay on Delivery
                            </button>

                            <div className="form-container__form" style={{ gap: "1px" }}>
                                <div className="container text-center my-10">
                                    <button
                                        className="btn btn-secondary btn-lg"
                                        style={{ fontWeight: 'bold' }}
                                        onClick={(event) => {
                                            event.preventDefault(); // Prevent form submission
                                            handlePayment();
                                        }}>
                                        Proceed To Pay With RazorPay
                                    </button>
                                </div>
                                &nbsp;
                                <div className="form-container__register-buttons">
                                    <Link to="/"><button className="form-container__sign">Cancel</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position='bottom-center' />
        </center>
    );
}
