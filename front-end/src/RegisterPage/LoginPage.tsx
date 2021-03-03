import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LoginPage";

import { userActions } from "../_actions";
import { FlexCard } from "../GlobalStyles";
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

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const loggingIn = useSelector(
    (state: IRootState) => state.authentication.loggedIn
  );
  const dispatch = useDispatch();

  const { login } = userActions;

  function handleSubmit(e: any) {
    e.preventDefault();

    setSubmitted(true);
    if (username && password) {
      dispatch(login(username, password));
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <FormWrapper>
        <Avatar>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
          />
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </FormWrapper>
    </Container>
  );
};
