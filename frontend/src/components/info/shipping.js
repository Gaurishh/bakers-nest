import React from 'react'
import styles from '../../info.module.css';
import Logo4 from '../../Assets/Logo4.jpg'

const Shipping = () => {
  return (
    <div>
      <h1 className={styles.header}><a href='/'><img className={styles.logo} src={Logo4} alt="" /></a> Shipping & Delivery </h1>
      <div className={styles.textContent}>
        <h1>Any order that is placed must be picked up from our location at Sector 57, Gurgaon usually within 1-2 business days of order placement. </h1>
        <h1>Exact address shall be provided after successful placement of an order. </h1>
      </div>
    </div>
  )
}

export default Shipping