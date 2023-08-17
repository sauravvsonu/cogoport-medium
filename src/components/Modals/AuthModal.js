import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
// import {Modal } from "antd"
import { Link, useNavigate } from "react-router-dom";
import "./AuthModal.css";
import {
  Container,
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  InputLabel,
  Button,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
// import TextField from '@mui/material/TextField';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

export const AuthModal = ({ open, setOpen, signInPopup }) => {
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);

  // const onOpenModal = () => setOpen(true);
  // const onCloseModal = () => setOpen(false);
  const [emailSignIn, setEmailSignIn] = useState(false);
  const [emailSignUp, setEmailSignUp] = useState(false);

  const closeIcon = (
    <svg class="jh" width="29" height="29">
      <path
        d="M20.13 8.11l-5.61 5.61-5.6-5.61-.81.8 5.61 5.61-5.61 5.61.8.8 5.61-5.6 5.61 5.6.8-.8-5.6-5.6 5.6-5.62"
        fillRule="evenodd"
      ></path>
    </svg>
  );
  const handleEmailSignIn = () => {
    setEmailSignUp(false);
    setEmailSignIn(true);
    console.log("emailSignIn");
  };
  const handleEmailSignUp = () => {
    setEmailSignIn(false);
    setEmailSignUp(true);
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const SignInWithEmail = async (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    try {
      if (email === "") {
        setEmailError(true);
      }
      if (password === "") {
        setPasswordError(true);
      }

      if (email && password) {
        console.log(email, password);
      }

      const data = {
        user: {
          email: email,
          password: password,
        },
      };

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const authorizationHeader = response.headers.get("authorization");
      if (authorizationHeader !== null) {
        console.log(authorizationHeader);
        localStorage.Authorization = authorizationHeader;
      }

      const resData = await response.json();

      if (resData.status && resData.status.code === 200) {
        localStorage.setItem("currentUser", JSON.stringify(resData.data));
        console.log(resData);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const SignUpWithEmail = async (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);
    setPasswordConfirmError(false);
    try {
      if (email === "") {
        setEmailError(true);
      }
      if (password === "") {
        setPasswordError(true);
      }
      if (passwordConfirm === "") {
        setPasswordConfirmError(true);
      }

      if (email && password) {
        console.log(email, password, passwordConfirm);
      }
      const data = {
        user: {
          email: email,
          password: password,
          password_confirmation: passwordConfirm,
        },
      };
      const response = await axios.post(`http://localhost:3000/signup`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const authorizationHeader = response.headers["authorization"];
      if (authorizationHeader !== null) {
        console.log(response.headers, "header");
        localStorage.Authorization = authorizationHeader;

        // props.setAuthorization(authorizationHeader);
        console.log(authorizationHeader);
      }
      const resData = response.data;

      if (resData.status && resData.status.code === 200) {
        localStorage.setItem("currentUser", JSON.stringify(resData.data));

        console.log(resData);
        navigate("/");
      }
      // .then((res) => {
      //   console.log(res["data"]);
      //   if (res["data"]["status"]["code"] === 200) {
      //     console.log("success");
      //     localStorage.setItem(
      //       "currentUser",
      //       JSON.stringify(res["data"]["data"])
      //     );
      //     setEmailSignUp(false);
      //     setEmail("");
      //     setPassword("");
      //     setPasswordConfirm("");
      //     navigate("/");
      //   }
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    } catch (err) {
      console.log(err);
    }
  };
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  return (
    <Modal
      classNames={{
        overlayAnimationIn: "customEnterOverlayAnimation",
        overlayAnimationOut: "customLeaveOverlayAnimation",
        modalAnimationIn: "customEnterModalAnimation",
        modalAnimationOut: "customLeaveModalAnimation",
        overlay: "customOverlay",
        modal: "customModal",
      }}
      closeIcon={closeIcon}
      animationDuration={800}
      open={open}
      onClose={() => {
        setOpen(false);
        setEmailSignUp(false);
        setEmailSignIn(false);
      }}
      center
      visible={open}
      centered
      onCancel={() => {
        setOpen(false);
        setEmailSignUp(false);
        setEmailSignIn(false);
      }}
      onOk={() => {
        setOpen(false);
        setEmailSignUp(false);
        setEmailSignIn(false);
      }}
    >
      <div className="modal">
        {emailSignIn ? (
          <>
            <h2>Sign In With Email</h2>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={SignInWithEmail}
            >
              <TextField
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="email"
                value={email}
                error={emailError}
                fullWidth
                sx={{ mb: 3 }}
              />

              <TextField
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="password"
                value={password}
                error={passwordError}
                fullWidth
                sx={{ mb: 3 }}
              />
              <Button
                variant="outlined"
                color="primary"
                sx={{ marginTop: "1rem" }}
                type="submit"
              >
                Login
              </Button>
            </form>

            <div className="modal-footer">
              <span>
                Click “
                <button
                  style={{ cursor: "pointer" }}
                  onClick={handleEmailSignUp}
                >
                  Sign Up
                </button>
                ” to agree to Medium's Terms of Service and acknowledge that
                Medium's Privacy Policy applies to you.
              </span>
            </div>
          </>
        ) : emailSignUp ? (
          <>
            <h2>Sign Up With Email</h2>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={SignUpWithEmail}
            >
              <TextField
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="email"
                value={email}
                error={emailError}
                fullWidth
                sx={{ mb: 3 }}
              />

              <TextField
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="password"
                value={password}
                error={passwordError}
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                label="Confirm Password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="password"
                value={passwordConfirm}
                error={passwordConfirmError}
                fullWidth
                sx={{ mb: 3 }}
              />
              <Button
                variant="outlined"
                color="primary"
                sx={{ marginTop: "1rem" }}
                type="submit"
              >
                Sign Up
              </Button>
            </form>
          </>
        ) : (
          <>
            <h2>Welcome back</h2>
            <div className="signInButtons">
              <button onClick={signInPopup}>
                <svg width="25" height="25" class="nk gz y">
                  <g fill="none" fillRule="evenodd">
                    <path
                      d="M20.66 12.7c0-.61-.05-1.19-.15-1.74H12.5v3.28h4.58a3.91 3.91 0 0 1-1.7 2.57v2.13h2.74a8.27 8.27 0 0 0 2.54-6.24z"
                      fill="#4285F4"
                    ></path>
                    <path
                      d="M12.5 21a8.1 8.1 0 0 0 5.63-2.06l-2.75-2.13a5.1 5.1 0 0 1-2.88.8 5.06 5.06 0 0 1-4.76-3.5H4.9v2.2A8.5 8.5 0 0 0 12.5 21z"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M7.74 14.12a5.11 5.11 0 0 1 0-3.23v-2.2H4.9A8.49 8.49 0 0 0 4 12.5c0 1.37.33 2.67.9 3.82l2.84-2.2z"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M12.5 7.38a4.6 4.6 0 0 1 3.25 1.27l2.44-2.44A8.17 8.17 0 0 0 12.5 4a8.5 8.5 0 0 0-7.6 4.68l2.84 2.2a5.06 5.06 0 0 1 4.76-3.5z"
                      fill="#EA4335"
                    ></path>
                  </g>
                </svg>
                Sign in with Google
              </button>
              <button onClick={handleEmailSignIn}>
                <svg width="25" height="25" class="nk gz y">
                  <path d="M4 6v13h17V6H4zm5.9 7.97l2.6 2.12 2.6-2.12 4.14 4.02H5.76l4.15-4.02zm-4.88 3.32V9.97l4.1 3.35-4.1 3.97zm10.87-3.97l4.1-3.35v7.32l-4.1-3.97zm4.1-6.3v1.64l-7.49 6.12-7.48-6.13V7.01h14.96z"></path>
                </svg>
                Sign in with email
              </button>

              {/* <div className="modal-body">
      Already sign up? <span>Sign In</span>
    </div> */}
            </div>
            <div className="modal-footer">
              <span>
                Click “
                <button
                  style={{ cursor: "pointer" }}
                  onClick={handleEmailSignUp}
                >
                  Sign Up
                </button>
                ” to agree to Medium's Terms of Service and acknowledge that
                Medium's Privacy Policy applies to you.
              </span>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
