import React, { useContext } from "react";
import PopupBtn from "../Popup/PopupBtn";
import { UserContext } from "../../context/user/UserState";

export default function UserPanel() {
  const { user } = useContext(UserContext);

  return (
    <div className="user-panel py-4">
      <div className="title m-5 bold">My Tracks</div>

      {/* add button */}
      <PopupBtn type="addTrack">
        <button className="btn btn-primary btn-sm">+</button>
      </PopupBtn>

      <div className="tracks mt-5">
        {/* categories */}
        <div className="categories card mt-1 bg-transparent border-0">
          <div className="card-body">
            <div className="row text-capitalize px-1">
              <div>
                <input type="checkbox" />
              </div>
              <div className="col-sm-1 col-2 p-0 text-center"></div>
              <div className="col-xl-6 col-lg-4 col-sm-3 col-4 p-0">name</div>
              <div className="col-xl-1 col-md-2 col-3 d-sm-block d-none p-0">
                expected
              </div>
              <div className="col-xl-1 col-2 d-md-block d-none p-0">actual</div>
              <div className="col-md-2 col-sm-3 col-4 p-0">compare</div>
              {/* <div className="col-1 p-0"></div> */}
            </div>
          </div>
        </div>

        {/* track */}
        {user &&
          user.createdTracks.map((track) => (
            <div className="track card mt-1 border-0 rounded" key={track._id}>
              <div className="card-body">
                <div className="row pl-1">
                  <div className="checkbox all-center">
                    <input type="checkbox" />
                  </div>
                  <div className="col-sm-1 col-2 p-0 text-center">
                    <img
                      src={track.image}
                      alt=""
                      className="rounded"
                      style={{ height: "30px", width: "30px" }}
                    />
                  </div>
                  <div className="col-xl-6 col-lg-4 col-sm-3 col-4 p-0 d-flex align-items-center">
                    {track.name}
                  </div>
                  <div className="col-xl-1 col-md-2 col-3 p-0 d-none d-sm-flex align-items-center">
                    ${track.expectedPrice}
                  </div>
                  <div className="col-xl-1 col-2 p-0 d-none d-md-flex align-items-center">
                    ${track.actualPrice}
                  </div>
                  <div className="col-lg-1 col-md-2 col-sm-3 col-4 p-0 d-flex align-items-center">
                    {track.expectedPrice > track.actualPrice ? (
                      <span className="text-success m-0">Cheap</span>
                    ) : (
                      <span className="text-danger m-0">Expensive</span>
                    )}
                  </div>
                  <div
                    className="col-1 p-0 all-center justify-content-end"
                    role="button"
                  >
                    <PopupBtn type="editTrack" track={track}>
                      <small className="m-0 text-danger">Edit</small>
                    </PopupBtn>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
