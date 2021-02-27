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
