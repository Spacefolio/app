import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../_actions";
import { IRootState } from "../_reducers";
import { INewUser } from "../../../types";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { FormWrapper } from "./RegistrationStyles";

export const RegisterPage = () => {
  const registering = useSelector(
    (state: IRootState) => state.registration.registering
  );
  const dispatch = useDispatch();

  const { register } = userActions;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState<INewUser>({
    firstName,
    lastName,
    username,
    password,
  });

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "& .MuiTextField-root": {
          margin: theme.spacing(1),
          width: "25ch",
        },
      },
    })
  );

  useEffect(() => {
    setUser({ firstName, lastName, username, password });
  }, [firstName, lastName, username, password]);

  const handleSubmit = (event: Event) => {
    event.preventDefault();

    setSubmitted(true);
    if (firstName && lastName && username && password) {
      dispatch(register(user));
    }
  };

  const classes = useStyles();

  return (
    // <div className="col-md-6 col-md-offset-3">
    //   <h2>Register</h2>
    //   <form name="form" onSubmit={() => handleSubmit}>
    //     <div
    //       className={
    //         "form-group" + (submitted && !firstName ? " has-error" : "")
    //       }
    //     >
    //       <label htmlFor="firstName">First Name</label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         name="firstName"
    //         value={firstName}
    //         onChange={(e) => setFirstName(e.target.value)}
    //       />
    //       {submitted && !firstName && (
    //         <div className="help-block">First Name is required</div>
    //       )}
    //     </div>
    //     <div
    //       className={
    //         "form-group" + (submitted && !lastName ? " has-error" : "")
    //       }
    //     >
    //       <label htmlFor="lastName">Last Name</label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         name="lastName"
    //         value={lastName}
    //         onChange={(e) => setLastName(e.target.value)}
    //       />
    //       {submitted && !lastName && (
    //         <div className="help-block">Last Name is required</div>
    //       )}
    //     </div>
    //     <div
    //       className={
    //         "form-group" + (submitted && !username ? " has-error" : "")
    //       }
    //     >
    //       <label htmlFor="username">Username</label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         name="username"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //       />
    //       {submitted && !username && (
    //         <div className="help-block">Username is required</div>
    //       )}
    //     </div>
    //     <div
    //       className={
    //         "form-group" + (submitted && !password ? " has-error" : "")
    //       }
    //     >
    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         name="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       {submitted && !password && (
    //         <div className="help-block">Password is required</div>
    //       )}
    //     </div>
    //     <div className="form-group">
    //       <button className="btn btn-primary">Register</button>
    //       {registering && (
    //         <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
    //       )}
    //       <Link to="/login" className="btn btn-link">
    //         Cancel
    //       </Link>
    //     </div>
    //   </form>
    // </div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <FormWrapper>
        <Avatar>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form onSubmit={() => handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="firstname"
                label="First Name"
                type="firstname"
                id="firstname"
                autoComplete="firstname"
                value={firstName}
                onChange={(e: any) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="lastname"
                label="Last Name"
                type="lastname"
                id="lastname"
                autoComplete="lastname"
                value={lastName}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Already have an account? Sign In Here"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </FormWrapper>
    </Container>
  );
};
