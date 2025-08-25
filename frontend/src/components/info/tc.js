import React from "react";
import styles from "../../info.module.css";
import Logo4 from '../../Assets/Logo4.jpg'

const Tc = () => {
  return (
    <div>
      <h1 className={styles.header}><a href='/'><img className={styles.logo} src={Logo4} alt="" /></a> Terms & Conditions</h1>
      <div className={styles.textContent}>
        <p>
          Welcome to Baker's Nest! We are delighted to have you as a visitor to
          our website. Before you explore the delightful world of our baked
          goods, please take a moment to review the following terms and
          conditions that govern your use of this website. By accessing or using
          this website, you agree to be bound by these terms. If you do not
          agree with any part of these terms, please refrain from using our
          website.
        </p>
        <h1>1. Acceptance of Terms </h1>
        <p>By accessing or using this website, you agree to comply with and be
        bound by these terms and conditions. If you do not agree to these terms,
        please refrain from using our website.</p>
        <h1>2. Privacy Policy</h1>
        <p>
          Your privacy is important to us. Please review our Privacy Policy,
          which explains how we collect, use, and protect your personal
          information.
        </p>
        <h1>3. Products and Pricing</h1>
        <p>
          All products listed on the website are subject to availability. Prices
          are subject to change without notice. We strive to provide accurate
          product information and pricing, but errors may occur. In such cases,
          we reserve the right to correct any errors and cancel orders if
          necessary.
        </p>
        <h1>4. Ordering and Payment</h1>
        <p>
          To place an order, follow the instructions on our website. By placing
          an order, you agree to provide accurate and complete information. We
          accept various forms of payment, and all transactions are processed
          securely. Orders are confirmed upon successful payment.
        </p>
        <h1>5. Shipping and Delivery</h1>
        <p>
          Shipping and delivery details, including costs and timeframes, are
          outlined in our Shipping Policy. Please review this information before
          placing an order.
        </p>
        <h1>6. Returns and Refunds</h1>
        <p>
          Our Return and Refund Policy outlines the terms and conditions for
          returns and refunds. By making a purchase, you agree to the terms
          outlined in this policy.
        </p>
        <h1>7. Intellectual Property</h1>
        <p>
          All content on this website, including but not limited to text,
          images, logos, and graphics, is the property of Baker's Nest and is
          protected by copyright and other intellectual property laws. You may
          not use, reproduce, or distribute any content from this website
          without our prior written consent.
        </p>
        <h1>8. Limitation of Liability</h1>
        <p>
          To the fullest extent permitted by law, Baker's Nest shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages, or any loss of profits or revenues, whether incurred
          directly or indirectly, or any loss of data, use, goodwill, or other
          intangible losses resulting from your access to or use of this
          website.
        </p>
        <h1>9. Changes to Terms and Conditions</h1>
        <p>
          We reserve the right to update or modify these terms and conditions at
          any time without prior notice. Please review this page periodically
          for changes. Your continued use of the website after any changes
          indicates your acceptance of the updated terms.
        </p>
        <h1>10. Governing Law</h1>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of the Republic of India. Any disputes arising out of or
          related to these terms and conditions shall be subject to the
          exclusive jurisdiction of the courts in India.
        </p>
        <p>
          Thank you for visiting Baker's Nest! We hope you enjoy your time on
          our website and savor the delicious treats we have to offer. If you
          have any questions or concerns, please don't hesitate to contact us.
        </p>
      </div>
    </div>
  );
};

export default Tc;
