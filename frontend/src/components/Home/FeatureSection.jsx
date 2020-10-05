import React from "react";
import { featureItemBg } from "../../images/homeImages";

export default function FeatureSection() {
  const featureCols = [
    {
      image: featureItemBg,
      title: "Create an account",
      subtitle:
        "To access to your personal dashboard, you have to first login or create an account.",
    },
    {
      image: featureItemBg,
      title: "Track a new product",
      subtitle:
        "Go to any product detail page on Amazon, copy & paste the link into the Product URL field, label the record with a personalized name, enter your desired price, and run the trace.",
    },
    {
      image: featureItemBg,
      title: "Keep it updated",
      subtitle:
        "You can re-track all the recorded products in just one click. Do it once in a while to get the latest price and information of the products.",
    },
  ];
  return (
    <section className="feature my-lg-5 py-3 text-center">
      <div className="container">
        <h1 className="title m-0 mb-lg-5 my-lg-0 my-4">It's Easy to Use</h1>
        <div className="row">
          {featureCols.map((featureCol, index) => (
            <div
              className="column col-lg-4 all-center-column mt-lg-0 my-sm-5 my-4 "
              key={index}
            >
              <img src={featureCol.image} alt={featureCol.title} />
              <div className="title bold mb-3 mt-4 ">{featureCol.title}</div>
              <div className="subtitle">{featureCol.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
