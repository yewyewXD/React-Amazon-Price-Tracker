import React from "react";
import { featureItemBg } from "../../images/homeImages";

export default function FeatureSection() {
  const featureCols = [
    {
      image: featureItemBg,
      title: "Step 1",
      subtitle:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur cumque deserunt assumenda natus facere omnis voluptatum modi dolorum cum amet?",
    },
    {
      image: featureItemBg,
      title: "Step 2",
      subtitle:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur cumque deserunt assumenda natus facere omnis voluptatum modi dolorum cum amet?",
    },
    {
      image: featureItemBg,
      title: "Step 3",
      subtitle:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur cumque deserunt assumenda natus facere omnis voluptatum modi dolorum cum amet?",
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
