import React, { useEffect } from 'react';
import 'typeface-montserrat';
import "../otherPages/EditProfile.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


export default function EditProfile() {

  const token = window.localStorage.getItem("token");
  const userid = window.localStorage.getItem("userid");

  // console.log("user id is fetched" ,userid);

  const { id } = useParams();
  const [image, setImage] = useState("https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp");
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const navigate = useNavigate();



  useEffect(() => {
    // console.log("userid",userid);
    // console.log("token",token);
    axios.get(`https://powerlend.onrender.com/getUpUser/${userid}`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: token,
      },
      withCredentials: true,
    })

      .then((e) => {

      }).catch(err => console.log(err));

  }, []);



  const UpUser = (e) => {
    e.preventDefault();
    // console.log(e.username);

    axios.put("https://powerlend.onrender.com/updateUser/" + userid,
      {
        image,
        username,
        email,
        phone,
        address
       
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true
      }
    )
      .then(() => {

        navigate("/ProfilePage");
      })
      .catch(err => console.log(err));
  }


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
   
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

 
  

  return (
    <center>
      <div class="form-container2">
        <div className='edit_image'>
          {image && (
            <div className="image-preview" style={{ backgroundImage: `url(${image})` }} />
          )}
          <div className="custom-upload">
            <label className='uploader' htmlFor="custom-image-upload">Upload Profile Image</label>
            <input
              type="file"
              id="custom-image-upload"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <form class="form2" onSubmit={UpUser}>
          <div class="form-group2">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required={true}
              value={username} onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div class="form-group2">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required={true}
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="form-group2">
            <label for="phone">Mobile Number</label>
            <input type="number" id="phone" name="phone" placeholder="Enter Mobile number" required={true}
              value={phone} onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div class="form-group2">
            <label for="address">Delivery Address</label>
            <input type="text" id="address" name="address" placeholder="Enter your address" required={true}
              value={address} onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button type="submit" class="form-submit-btn">Save Changes</button>
        </form>

      </div>
    </center>
  )
}
