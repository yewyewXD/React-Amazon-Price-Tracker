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
    <section className="feature my-5 py-5">
      <div className="container">
        <div className="row">
          {featureCols.map((featureCol, index) => (
            <div className="column col-md-4 all-center-column" key={index}>
              <img src={featureCol.image} alt={featureCol.title} />
              <div className="title">{featureCol.title}</div>
              <div className="subtitle">{featureCol.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
