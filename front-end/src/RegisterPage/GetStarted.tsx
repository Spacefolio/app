import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../_actions";
import { BigWideButton, FlexCard } from "../AlgonexStyles";
import { IRootState } from "../_reducers";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { FormWrapper } from "./RegistrationStyles";
import { userService } from "../_services";

export const GetStarted = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [passwordCheck, setPasswordCheck] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [headerText, setHeaderText] = useState("Enter Email");

  const [headerSubText, setHeaderSubText] = useState(
    "Enter your account email address to login or a new one to register an account"
  );

  const [isEmailRegistered, setIsEmailRegistered] = useState();

  const [formType, setFormType] = useState("CheckRegistration");

  const dispatch = useDispatch();

  function CheckEmail() {
    userService
      .registrationCheck(email)
      .then((res) => setIsEmailRegistered(res.registered));
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    setSubmitted(true);
    if (formType == "CheckRegistration" && emailTester(email)) {
      CheckEmail();
    } else if (formType == "login" && emailTester(email) && password) {
      dispatch(userActions.login({ email, password }));
    } else if (
      formType == "register" &&
      emailTester(email) &&
      password &&
      password == passwordCheck
    ) {
      dispatch(userActions.register({ email, password }));
    }
  }

  useEffect(() => {
    email == null && setFormType("CheckRegistration");
    if (formType == "login") {
      setHeaderText("Login");
      setHeaderSubText("Enter your password to login");
    }
    if (formType == "register") {
      setHeaderText("Sign Up");
      setHeaderSubText("Enter and confirm your password to sign up");
    }
    if (formType == "CheckRegistration") {
      setHeaderText("Enter Email");
      setHeaderSubText(
        "Enter your account email address to login or a new one to register an account"
      );
    }
  }, [formType, email]);

  useEffect(() => {
    if (isEmailRegistered != undefined) {
      if (isEmailRegistered) {
        setFormType("login");
      } else {
        setFormType("register");
      }
    }
  }, [isEmailRegistered]);

  const emailTester = (email: string) => {
    const emailTest = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
    );
    return emailTest.test(email);
  };

  return (
    <Container component="main">
      <FormWrapper>
        <Typography component="h1" variant="h5">
          {headerText}
        </Typography>
        <Typography>{headerSubText}</Typography>
        <form style={{ width: "400px" }} onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              type="email"
              autoComplete={formType != "CheckRegistration" ? "email" : "none"}
              autoFocus
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              helperText={
                submitted && !emailTester(email)
                  ? "Please enter a valid email address"
                  : null
              }
            />
          </Grid>

          {formType == "login" || formType == "register" ? (
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </Grid>
          ) : null}

          {formType == "register" ? (
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={passwordCheck}
                onChange={(e: any) => setPasswordCheck(e.target.value)}
                helperText={
                  submitted &&
                  password != passwordCheck &&
                  "Passwords must Match."
                }
              />
            </Grid>
          ) : null}

          <BigWideButton type="submit">Sign In</BigWideButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </FormWrapper>
    </Container>
  );
};
