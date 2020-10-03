import React, { useContext, useState } from "react";
import PopupBtn from "../Popup/PopupBtn";
import { UserContext } from "../../context/user/UserState";

export default function UserPanel() {
  const { user } = useContext(UserContext);
  const [selectedTracks, setSelectedTracks] = useState([]);

  function handleSelectTrack(e, track) {
    if (e.target.querySelector("input[type='checkbox']")) {
      const checkOnCard = e.target.querySelector("input[type='checkbox']");
      checkOnCard.checked = !checkOnCard.checked;
      updateSelectedTrack(checkOnCard, track);
    } else if (e.target.nodeName === "INPUT") {
      const checkOnCheckbox = e.target;
      updateSelectedTrack(checkOnCheckbox, track);
    }
  }

  function updateSelectedTrack(checkbox, selectedTrack) {
    if (checkbox.checked) {
      // check
      const newSelectedTracks = [...selectedTracks, selectedTrack];
      setSelectedTracks(newSelectedTracks);
    } else {
      // uncheck
      const newSelectedTracks = selectedTracks.filter(
        (track) => track !== selectedTrack
      );
      setSelectedTracks(newSelectedTracks);
    }
  }

  function handleSelectAllTracks(e) {
    const checkButtons = document.querySelectorAll(".check-btn");
    if (e.target.checked) {
      checkButtons.forEach((button) => {
        button.checked = true;
      });
    } else {
      checkButtons.forEach((button) => {
        button.checked = false;
      });
    }
  }

  // auto check checkAllBtn
  if (document.getElementById("checkAllBtn")) {
    if (selectedTracks.length === user.createdTracks.length) {
      document.getElementById("checkAllBtn").checked = true;
    } else if (document.getElementById("checkAllBtn")) {
      document.getElementById("checkAllBtn").checked = false;
    }
  }

  return (
    <div className="user-panel py-4">
      <div className="title my-5 mx-md-5 mx-4 bold">My Tracks</div>

      <div className="tracks mt-5">
        {/* actions */}
        <div className="actions">
          <PopupBtn type="addTrack">
            <button className="btn btn-primary btn-sm">+</button>
          </PopupBtn>
        </div>

        {/* categories */}
        <div className="categories card mt-1 bg-transparent border-0">
          <div className="card-body">
            <div className="row text-capitalize px-1">
              <div>
                <input
                  type="checkbox"
                  id="checkAllBtn"
                  onChange={handleSelectAllTracks}
                />
              </div>
              <div className="col-sm-1 col-2 p-0 text-center"></div>
              <div className="col-xl-6 col-lg-4 col-sm-3 col-4 p-0">name</div>
              <div className="col-xl-1 col-md-2 col-3 d-sm-block d-none p-0">
                expected
              </div>
              <div className="col-xl-1 col-2 d-md-block d-none p-0">actual</div>
              <div className="col-lg-2 col-md-2 col-sm-3 col-4 p-0">
                compare
              </div>
              <PopupBtn type="deleteTrack" selectedTracks={selectedTracks}>
                <button
                  className="btn btn-danger btn-sm position-absolute"
                  style={{ right: 0 }}
                >
                  <small className="m-0">Delete</small>
                </button>
              </PopupBtn>
            </div>
          </div>
        </div>

        {/* track */}
        {user &&
          user.createdTracks.map((track) => (
            <div
              className="track card mt-1 rounded"
              key={track._id}
              onClick={(e) => {
                handleSelectTrack(e, track);
              }}
            >
              <div className="card-body">
                <div className="row pl-1">
                  <div className="checkbox all-center">
                    <input
                      type="checkbox"
                      className="check-btn"
                      onChange={(e) => handleSelectTrack(e, track)}
                    />
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
                      <small className="m-0 edit-btn text-danger">Edit</small>
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
