import React from "react";
import { heroBg } from "../../images/homeImages";

export default function DiscoverSection() {
  return (
    <section className="discover py-5 bg-primary text-white">
      <div
        className="discover-background w-100 h-100 all-center"
        style={{ background: `url(${heroBg})` }}
      >
        <div className="container all-center">
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6 my-auto">
              <div className="subtitle bold text-white-50">Subtitle</div>
              <div className="title bold my-3">Title</div>
              <div className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                quas unde necessitatibus voluptatibus saepe rerum minus
                exercitationem praesentium voluptates, quos dolores temporibus
                adipisci error dolorem qui quo repellat ullam voluptate,
                recusandae culpa eum blanditiis? Soluta a, distinctio optio quae
                nisi quaerat animi recusandae veritatis, laudantium officia,
                eaque dignissimos sapiente vitae.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
