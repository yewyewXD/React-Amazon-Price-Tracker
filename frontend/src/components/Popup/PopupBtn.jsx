import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../context/user/GlobalState";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { heroVector } from "../../images/homeImages";

import SignUpModal from "./Modals/SignUpModal";
import LoginModal from "./Modals/LoginModal";
import AddTrackModal from "./Modals/AddTrackModal";
import EditTrackModal from "./Modals/EditTrackModal";
import DeleteConfirmModal from "./Modals/DeleteConfirmModal";

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
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
                type === "deleteTrack" && "bg-white"
              }`}
            >
              {type !== "deleteTrack" && (
                <div className="form-container-image all-center">
                  <img src={heroVector} alt="" className="w-100" />
                </div>
              )}

              <div className="form-container bg-white">
                {type === "signUp" && !token && (
                  <SignUpModal handleClose={handleClose} />
                )}

                {type === "login" && !token && (
                  <LoginModal handleClose={handleClose} />
                )}

                {type === "addTrack" && token && (
                  <AddTrackModal handleClose={handleClose} open={open} />
                )}

                {type === "editTrack" && token && (
                  <EditTrackModal handleClose={handleClose} track={track} />
                )}

                {type === "deleteTrack" && token && (
                  <DeleteConfirmModal
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
