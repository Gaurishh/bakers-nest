import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BannerBackground from "../../Assets/home-banner-background.png";
import BannerImage2 from "../../Assets/home-banner-image2.jpg";
import { WhatsApp } from '@mui/icons-material';
import LandingNavbar from './Navbar-Landing.js';
import { FiArrowRight } from "react-icons/fi/index.esm.js";

import styles from '../../LandingPage.module.css';

const Home = React.forwardRef((props, ref) => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    // Simple button animation
    const button = document.querySelector(`.${styles.primaryButton}`);
    button.style.transform = 'scale(0.95)';
    button.style.transition = 'transform 0.2s ease-in-out';

    setTimeout(() => {
      button.style.transform = 'scale(1)';
      navigate('/shop');
    }, 200);
  };

  return (
    <>
      <div className={styles.homeContainer} ref={ref}>
        <div className={styles.homeBannerContainer}>
          <div className={styles.homeBannerImageContainer}>
            <img src={BannerBackground} alt="" />
          </div>
        </div>
        <LandingNavbar home={props.home} about={props.about} contact={props.contact} />
      </div>

      <div className={styles.homeContainer2}>

        <div className={styles.homeTextSection}>
          <h1 style={{ fontWeight: "bold" }} className={styles.primaryHeading}>Baker's Nest - Homemade Delights</h1>
          <p className={styles.primaryText}>At Baker's Nest, we believe that every day should begin and end with something sweet. Our artisanal bakery is a haven for those who crave the delightful symphony of flavors and the comforting aroma of freshly baked treats.</p>
          <button
            style={{ fontSize: "24px", backgroundColor: "#ff3030", color: "white", fontWeight: "bold" }}
            className={styles.primaryButton}
            id={styles.removed}
            onClick={handleShopNow}
          >
            Shop now
            <FiArrowRight />
          </button>
          <p className={styles.primaryText2}><a style={{ textDecoration: "none", color: "black" }} href="https://wa.me/c/918595714343" target="_blank" rel="noreferrer">...or Order through <p style={{ color: "#25D366", display: "inline", fontSize: "23px" }}>WhatApp <WhatsApp /></p></a></p>
          <p style={{ marginLeft: "15px", marginTop: "0px" }} className={styles.primaryText2}>(8595714343)</p>
        </div>

        <div className={styles.homeImageContainer}>
          <img id={styles.homepageImage} src={BannerImage2} alt="" />
        </div>

      </div>
    </>
  )
})

export default Home;
