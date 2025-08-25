import React from "react";

const Success = ({success}) => {
  return (
    <div>
      <div className="alert alert-success" role="alert">
        <p>{success}</p>
        <p>The pick-up address is: 2103(3rd Floor), Sector 57, Gurgaon </p>
        <p>You will be notified on your email once your order has been prepared, which usually takes 1 business day. </p>
        <p>For any queries or concerns, call/drop a message to 8595714343 </p>
        <h1>Thanks for shopping with us! Have a great day :) </h1>
      </div>
    </div>
  );
};

export default Success;
