import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage2 from "../Assets/about-background-image2.jpg";
import { BsFillPlayCircleFill } from "react-icons/bs/index.esm.js";
import { useRef } from "react";

import styles from '../LandingPage.module.css';
 
const About = React.forwardRef((props, ref) => {
  return (
    <div className={styles.aboutSectionContainer} ref={ref}>
      <div className={styles.aboutBackgroundImageContainer}>
        <img src={AboutBackground} alt="" />
      </div>
      <div className={styles.aboutSectionImageContainer}>
        <img id={styles.homepageImage} src={AboutBackgroundImage2} alt="" />
      </div>
      <div className={styles.aboutSectionTextContainer}>
        <p className={styles.primarySubheading}>About</p>
        <h1 style={{fontWeight: "bold"}} className={styles.primaryHeading}>Our Promise</h1>
        <p className={styles.primaryText}>We believe that the true magic of baking lies in the love and passion that goes into every bite. Our promise to you is to consistently deliver the finest baked goods, handcrafted with the utmost care and attention to detail. Whether you order daily or just on special occasions, you can always expect a delightful experience. </p>
        {/* <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button"> <BsFillPlayCircleFill/> Watch Video </button>
        </div> */}
      </div>
    </div>
  );
})

export default About