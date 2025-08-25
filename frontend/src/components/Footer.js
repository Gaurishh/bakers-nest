import React from "react";
import Logo4 from "../Assets/Logo4.jpg";
import { BsInstagram } from "react-icons/bs/index.esm.js";
import { FaPhone } from "react-icons/fa/index.esm.js";

import styles from '../LandingPage.module.css';

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerSectionOne}>
        <div style={{display: "inline"}} className={styles.footerLogoContainer} id={styles.removed}>
          <a href="https://www.instagram.com/bakersnest2022/" target="_blank"><BsInstagram /> <p style={{display: "inline"}}>@bakersnest2022 </p></a>
        </div>
        <div style={{marginTop: "1.5rem"}} className={styles.footerLogoContainer} id={styles.removed}>
          <div style={{display: "inline"}}>
            <FaPhone />
            <div style={{float: "right"}}>
              <p>8595714343</p>
              <p>OR</p>
              <p>9999919685</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerSectionTwo}>
        <div className={styles.footerSectionColumns}>
          <a className={styles.footer} href='/tc' target="_blank">Terms & Conditions</a>
          <a className={styles.footer} href='/privacy' target="_blank">Privacy Policy</a>
          <a className={styles.footer} href='/cancellation' target="_blank">Cancellation & Refund</a>
          <a className={styles.footer} href='/shipping' target="_blank">Shipping & Delivery</a>
          <a className={styles.footer} href='/contact' target="_blank">Contact Us</a>
        </div>
      </div>
    </div>
  )
}

export default Footer;
