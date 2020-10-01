import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { heroVector } from "../../images/homeImages";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";

const useStyles = makeStyles((theme) => ({
  paper: {
    boxShadow: theme.shadows[5],
    border: "none",
    outline: "none",
  },
}));

export default function PopupBtn({ children, type }) {
  const classes = useStyles();
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
          <div className={`${classes.paper} container bg-white p-0 all-center`}>
            <div className="popup-modal all-center">
              <div className="form-image d-md-block d-none all-center">
                <img src={heroVector} alt="" className="w-100" />
              </div>
              <div className="form px-5 py-5 bg-white">
                {type === "signUp" && <SignUpModal />}
                {type === "login" && <LoginModal />}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
