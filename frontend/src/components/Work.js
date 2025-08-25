import React from "react";
import PickMeals from "../Assets/pick-meals-image.png";
import ChooseMeals from "../Assets/choose-image.png";
import DeliveryMeals from "../Assets/delivery-image.png";

const Work = () => {

    const workInfoData = [
        {
            image: PickMeals,
            title: "Pick Meals",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            image: ChooseMeals,
            title: "Choose how often",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            image: DeliveryMeals,
            title: "Fast deliveries",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
    ];

  return (
    <div className="work-section-wrapper">
        <div className="work-section-top">
            <p className="primary-subheading">Work</p>
            <h1 className="primary-subheading">How It Works</h1>
            <p className="primary-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <div className="work-section-bottom">
            
        </div>

    </div>
  )
}

export default Work