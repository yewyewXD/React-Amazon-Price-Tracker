import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../context/GlobalState";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { heroVector } from "../../images/homeImages";

import SignUpModal from "./Modals/SignUpModal";
import LoginModal from "./Modals/LoginModal";
import AddTrackModal from "./Modals/AddTrackModal";
import EditTrackModal from "./Modals/EditTrackModal";
import ConfirmModal from "./Modals/ConfirmModal";

const useStyles = makeStyles((theme) => ({
  paper: {
    boxShadow: theme.shadows[5],
    border: "none",
    outline: "none",
  },
}));

export default function PopupBtn({
  children,
  type,
  track,
  selectedTracks,
  setSelectedTracks,
}) {
  const classes = useStyles();
  const { token } = useContext(GlobalContext);

  const [open, setOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(type === "signUp");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleSwitchType() {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  }

  return (
    <div>
      <span role="button" onClick={handleOpen}>
        {children}
      </span>
      <Modal
        className="all-center"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div
            className={`${classes.paper} popup-modal-dialog container bg-white p-0 all-center`}
          >
            <div
              className={`popup-modal w-100 all-center ${
                (type === "deleteTrack" || type === "multiTrack") && "bg-white"
              }`}
            >
              {type !== "deleteTrack" && type !== "multiTrack" && (
                <div className="form-container-image all-center">
                  <img src={heroVector} alt="" className="w-100" />
                </div>
              )}

              <div className="form-container bg-white">
                {isSignUp && !token && (
                  <SignUpModal
                    handleSwitchType={handleSwitchType}
                    handleClose={handleClose}
                  />
                )}

                {!isSignUp && !token && (
                  <LoginModal
                    handleSwitchType={handleSwitchType}
                    handleClose={handleClose}
                  />
                )}

                {type === "addTrack" && token && (
                  <AddTrackModal handleClose={handleClose} open={open} />
                )}

                {type === "editTrack" && token && (
                  <EditTrackModal handleClose={handleClose} track={track} />
                )}

                {(type === "deleteTrack" || type === "multiTrack") && token && (
                  <ConfirmModal
                    type={type}
                    open={open}
                    handleClose={handleClose}
                    selectedTracks={selectedTracks}
                    setSelectedTracks={setSelectedTracks}
                  />
                )}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
