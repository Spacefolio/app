import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './Portfolio.scss';

import { userActions } from "../_actions";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.authentication.user);

  const getUsers = userActions.getAll;
  const deleteUser = userActions.delete;

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleDeleteUser = (id) => {
    return (e) => dispatch(deleteUser(id));
  };

  return (
    <div className="center-my-children-column">
      <h1>Hi {user.firstName}!</h1>
      <p>You're Looking at the portfolio page</p>
    </div>
  );
};
