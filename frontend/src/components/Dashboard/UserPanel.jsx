import React from "react";

export default function UserPanel() {
  return (
    <div className="user-panel py-4">
      <div className="title m-5 bold">My Tracks</div>

      {/* add button */}
      <button className="btn btn-primary btn-sm">+</button>

      <div className="tracks mt-5 px-5">
        {/* categories */}
        <div class="categories card mt-1 bg-transparent border-0">
          <div class="card-body">
            <div className="row text-capitalize px-1">
              <div>
                <input type="checkbox" />
              </div>
              <div className="col-1 p-0 text-center">image</div>
              <div className="col-6 p-0">name</div>
              <div className="col-1 p-0">expected</div>
              <div className="col-1 p-0">actual</div>
              <div className="col-1 p-0">compare</div>
              <div className="col-1 p-0"></div>
            </div>
          </div>
        </div>

        {/* track */}
        <div class="track card mt-1 border-0 rounded">
          <div class="card-body">
            <div className="row px-1">
              <div className="checkbox all-center">
                <input type="checkbox" />
              </div>
              <div className="col-1 p-0 text-center">image</div>
              <div className="col-6 p-0">name</div>
              <div className="col-1 p-0">Expected</div>
              <div className="col-1 p-0">Actual</div>
              <div className="col-1 p-0">Compare</div>
              <div className="col-1 p-0 text-danger text-center" role="button">
                <small>Edit</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
