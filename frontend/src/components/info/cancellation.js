import React from 'react'
import styles from '../../info.module.css';
import Logo4 from '../../Assets/Logo4.jpg'

const Cancellation = () => {
  return (
    <div>
      <h1 className={styles.header}><a href='/'><img className={styles.logo} src={Logo4} alt="" /></a> Cancellation & Refunds </h1>
      <div className={styles.textContent}>
        <h1>If an order has already started being prepared, then it cannot be cancelled. </h1>
        <h1>Ideally, an order should be cancelled within 30 minutes of order placement.</h1>
        <h1>In any case, kindly contact us @8595714343 for requesting cancellation, and we shall refund your money if we have not already started preparing your order.</h1>
      </div>
    </div>
  )
}

export default Cancellation