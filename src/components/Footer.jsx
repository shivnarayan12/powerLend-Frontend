import React, { useEffect, useState } from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBInput,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import 'typeface-montserrat';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Footer() {
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [repname, setRepname] = useState('');
  const [report, setReport] = useState('');
  const [hide, setHide] = useState(true);
  const logedin = window.localStorage.getItem("IsLogedIn");

  useEffect(() => {
    if (logedin) {
      setHide(false);
    } else {
      setHide(true);
    }
  }, []);

  const SubmitExp = (e) => {
    e.preventDefault();
    axios.post("https://powerlend.onrender.com/createExperience", { name, experience })
      .then(res => {
        console.log(res);
        toast.success('Experience Submitted');
        // Clear the form fields
        setName('');
        setExperience('');
      })
      .catch(err => console.log(err));
  };

  const SubmitReport = (e) => {
    e.preventDefault();
    axios.post("https://powerlend.onrender.com/createReport", { repname, report })
      .then(() => {
        toast.success('Report Submitted');
        // Clear the form fields
        setRepname('');
        setReport('');
      })
      .catch(err => console.log(err));
  };

  return (
    <MDBFooter style={{ fontFamily: "Montserrat, sans-serif" }} className='text-center' id='footer' color='warning' bgColor='black'>
      <MDBContainer className='p-4'>
        <section className='mb-4'>
          <a href="https://github.com/shivnarayan12" target='_blank'><Button variant="outline-warning"><i class="bi bi-github"></i></Button></a>{' '}&nbsp;

          <a href="https://www.facebook.com/profile.php?id=100049705831839" target='_blank'><Button variant="outline-warning"><i class="bi bi-facebook"></i></Button></a>{' '}&nbsp;

          <a href="https://x.com/SHIVNARAYA10719" target='_blank'><Button variant="outline-warning"><i class="bi bi-twitter-x"></i></Button></a>{' '}&nbsp;

          <a href="https://www.instagram.com/shivnarayansingh410/?hl=en" target='_blank'><Button variant="outline-warning"><i class="bi bi-instagram"></i></Button></a>{' '}&nbsp;

          <a href="https://www.linkedin.com/in/shiv-narayan-singh-44722222a/" target='_blank'><Button variant="outline-warning"><i class="bi bi-linkedin"></i></Button></a>{' '}&nbsp;

        </section>

        <section className='review'>
          <form onSubmit={SubmitExp}>
            <MDBRow className='d-flex justify-content-center'>
              <MDBCol size="auto">
                <p className='pt-2'>
                  <strong>Review your Experience</strong>
                </p>
              </MDBCol>

              <MDBCol md='2' start>
                <MDBInput contrast type='text' placeholder='Name' className='mb-4'
                  value={name} // bind the state variable
                  onChange={(e) => setName(e.target.value)} required={true} />
              </MDBCol>
              <MDBCol md='4' start>
                <MDBInput contrast type='text' placeholder='Experienced Content' className='mb-4' required={true}
                  value={experience} // bind the state variable
                  onChange={(e) => setExperience(e.target.value)} />
              </MDBCol>

              <MDBCol size="auto">
                <input type='Submit' class="btn btn-outline-warning" />{' '}
              </MDBCol>
            </MDBRow>
          </form>
        </section>

        <section className='report'>
          <form onSubmit={SubmitReport}>
            <MDBRow className='d-flex justify-content-center'>
              <MDBCol size="auto">
                <p className='pt-2'>
                  <strong>Report any Error</strong>
                </p>
              </MDBCol>

              <MDBCol md='2' start>
                <MDBInput contrast type='text' placeholder='Name' className='mb-4' required={true}
                  value={repname} // bind the state variable
                  onChange={(e) => setRepname(e.target.value)} />
              </MDBCol>
              <MDBCol md='4' start>
                <MDBInput contrast type='text' placeholder='Experienced Error' className='mb-4' required={true}
                  value={report} // bind the state variable
                  onChange={(e) => setReport(e.target.value)} />
              </MDBCol>

              <MDBCol size="auto">
                <input type='Submit' class="btn btn-outline-warning" value="Report" />{' '}
              </MDBCol>
            </MDBRow>
          </form>
        </section>

        <section className='mb-4'>
          <h5>OUR MISSION</h5>
          <p>
            At the heart of Power Lend is a commitment to empowering individuals and businesses by providing access to high-quality power tools without the burden of ownership. We strive to be the go-to destination for reliable and efficient tools that enhance productivity and make every project a success.
          </p>
        </section>

        <section className='mb-4'>
          <Link to='/ProfilePage'><Button variant="outline-warning" hidden={hide}>Profile</Button></Link>{' '}&nbsp;

          <Link to='/About'><Button variant="outline-warning">About</Button></Link>{' '}&nbsp;

          <Link to='/AllProducts'><Button variant="outline-warning">Products</Button></Link>{' '}
        </section>

      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Copyright:&nbsp;
        <Link className='text-white' to='/About'>
          PowerLend.com
        </Link>
      </div>
      <Toaster
        position='bottom-right'
        toastOptions={{ duration: 4000 }}
      />
    </MDBFooter>
  );
}
