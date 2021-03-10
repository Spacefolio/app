// import React from "react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { userActions } from "../_actions";
// import { IRootState } from "../_reducers";
// import { INewUser } from "../../../types";
// import {
//   Container,
//   CssBaseline,
//   Avatar,
//   Typography,
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   Button,
//   Grid,
//   createStyles,
//   makeStyles,
//   Theme,
//   Link,
// } from "@material-ui/core";
// import { LockOutlined } from "@material-ui/icons";
// import { Form, FormWrapper, SubmitButton } from "./RegistrationStyles";

// export const RegisterPage = () => {
//   const registering = useSelector(
//     (state: IRootState) => state.registration.registering
//   );

//   const error = useSelector(
//     (state: IRootState) => state.registration.registrationError
//   );
//   const dispatch = useDispatch();

//   const { register } = userActions;

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordCheck, setPasswordCheck] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [user, setUser] = useState<INewUser>({
//     email,
//     password,
//   });

//   useEffect(() => {
//     setUser({ email, password });
//   }, [email, password]);

//   const handleSubmit = (e: any) => {
//     e.preventDefault();

//     setSubmitted(true);
//     if (
//       // firstName &&
//       // lastName &&
//       email &&
//       password &&
//       password == passwordCheck
//     ) {
//       dispatch(register(user));
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <FormWrapper>
//         <Typography component="h1" variant="h5">
//           Sign Up
//         </Typography>
//         <div className="g-signin2" data-onsuccess="onSignIn"></div>
//         <Form onSubmit={handleSubmit}>
//           {/* <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 variant="outlined"
//                 required
//                 margin="normal"
//                 fullWidth
//                 name="firstname"
//                 label="First Name"
//                 type="firstname"
//                 id="firstname"
//                 autoComplete="first name"
//                 value={firstName}
//                 onChange={(e: any) => setFirstName(e.target.value)}
//                 helperText={
//                   submitted && !firstName && "First Name is Required."
//                 }
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 margin="normal"
//                 name="lastname"
//                 label="Last Name"
//                 type="lastname"
//                 id="lastname"
//                 autoComplete="last name"
//                 value={lastName}
//                 onChange={(e: any) => setLastName(e.target.value)}
//                 helperText={submitted && !lastName && "Last Name is Required."}
//               />
//             </Grid>
//           </Grid> */}

//           <Grid item xs={12}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={email}
//               onChange={(e: any) => setEmail(e.target.value)}
//               helperText={submitted && !email && "Email is Required."}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e: any) => setPassword(e.target.value)}
//               helperText={submitted && !password && "Password is Required."}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               variant="outlined"
//               required
//               margin="normal"
//               fullWidth
//               name="confirmPassword"
//               label="Confirm Password"
//               type="password"
//               id="confirmPassword"
//               autoComplete="current-password"
//               value={passwordCheck}
//               onChange={(e: any) => setPasswordCheck(e.target.value)}
//               helperText={
//                 submitted &&
//                 password != passwordCheck &&
//                 "Passwords must Match."
//               }
//             />
//           </Grid>

//           <SubmitButton
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//           >
//             Sign Up
//           </SubmitButton>

//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link href="/login" variant="body2">
//                 {"Already have an account? Sign In Here"}
//               </Link>
//             </Grid>
//           </Grid>
//         </Form>
//       </FormWrapper>
//     </Container>
//   );
// };
