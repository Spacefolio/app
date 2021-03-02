import React from "react";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "../../_components";
import { alertActions } from "../../_actions";
import {
  AlertContainer,
  AlertMessage,
  AlertWrapper,
  IconContainer,
} from "./AlertStyles";
import { IRootState } from "../../_reducers";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

export const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state: IRootState) => state.alert);

  return (
    <AlertWrapper>
      {alert.message && (
        <AlertContainer alertType={alert.type}>
          <AlertMessage>{alert.message}</AlertMessage>
          <IconContainer onClick={() => dispatch(alertActions.clear())}>
            <CloseIcon style={{ fill: "white" }} />
          </IconContainer>
        </AlertContainer>
      )}
    </AlertWrapper>
  );
};
export const ViewLoading = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
};
