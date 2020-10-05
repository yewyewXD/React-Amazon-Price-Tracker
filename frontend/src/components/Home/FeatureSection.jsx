import React from "react";
import { featureItemBg } from "../../images/homeImages";
import featureItem1 from "../../images/featureProfile.png";
import featureItem2 from "../../images/featureTrack.png";
import featureItem3 from "../../images/featureUpdate.png";

export default function FeatureSection() {
  const featureCols = [
    {
      image: featureItem1,
      title: "Create an account",
      subtitle:
        "To access to your personal dashboard, you have to first login or create an account.",
    },
    {
      image: featureItem2,
      title: "Track a new product",
      subtitle:
        "Go to any product detail page on Amazon, copy & paste the link into the Product URL field, label the record with a personalized name, enter your desired price, and run the trace.",
    },
    {
      image: featureItem3,
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
            <div className="column col-lg-4 mt-lg-0 my-sm-5 my-4 " key={index}>
              <div className="image all-center">
                <img
                  src={featureItemBg}
                  alt="TrackBase step item background"
                  className="position-absolute"
                />
                <img
                  src={featureCol.image}
                  alt={featureCol.title}
                  className="front-image"
                />
              </div>
              <div className="title bold mb-3 mt-4 ">{featureCol.title}</div>
              <div className="subtitle">{featureCol.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
