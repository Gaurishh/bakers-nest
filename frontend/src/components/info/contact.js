import React from 'react'
import styles from '../../info.module.css';
import Logo4 from '../../Assets/Logo4.jpg'

const Contact = () => {
  return (
    <div>
      <h1 className={styles.header}><a href='/'><img className={styles.logo} src={Logo4} alt="" /></a> Contact Us</h1>
      <div className={styles.textContent}>
        <h1>Email - bakersnest2022@gmail.com </h1>
        <h1>WhatsApp/Call - 8595714343 / 9999919685</h1>
        <h1> Instagram - <a href="https://www.instagram.com/bakersnest2022/" target="_blank"><p style={{display: "inline"}}>@bakersnest2022 </p></a></h1>
      </div>
    </div>
  )
}

export default Contact