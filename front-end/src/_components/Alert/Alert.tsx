import React from "react";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import "./Alert.scss";
import { CloseButton } from "../../_components";
import { alertActions } from "../../_actions";

export const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.alert);

  return (
    <div className="alert-wrapper">
      {alert.message && (
        <div className={`alert-container ${alert.type}`}>
          <div style={{marginRight: '10px'}}>{alert.message}</div>
          <CloseButton width="1.5em" clickAction={() => dispatch(alertActions.clear())}/>
        </div>
      )}
    </div>
  );
};
