import React from "react";
import { heroBg, heroVector } from "../../images/homeImages";

export default function DiscoverSection() {
  return (
    <section className="discover py-5 text-white">
      <div
        className="discover-background w-100 h-100 all-center"
        style={{ background: `url(${heroBg})` }}
      >
        <div className="container all-center">
          <div className="row">
            <div className="col-lg-6 d-lg-block d-none my-auto">
              <img src={heroVector} className="w-100" alt="" />
            </div>
            <div className="col-lg-6 my-auto">
              <div className="subtitle bold text-white-50 text-uppercase">
                our mission
              </div>
              <div className="title bold my-3">Say Goodbye to Bookmarks</div>
              <p className="description">
                Are you're tired of bookmarking Amazon product pages and
                checking them out one by one, to see if their prices drop? Don't
                worry, <span className="bold">TrackerBase</span> is here for the
                rescue.
              </p>

              <p className="description">
                We automate all the boring process and show the latest prices of
                the Amazon products you tracked in one place. While waiting for
                our system to finish the trace, you can just sit back and have a
                cup of tea.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
