import React, { useState, useEffect } from "react";
import { ModalBg, ModalBoxSetup, ModalWrapper } from "./ModalStyles";
import { CloseIcon } from "../../_components";

interface ModalProps {
  visible: boolean;
  dismiss: any;
  children: any;
  clickOutsidedismiss?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  dismiss,
  children,
  clickOutsidedismiss,
}) => {
  return (
    <React.Fragment>
      {visible && (
        <ModalWrapper>
          <ModalBoxSetup>
            <div
              onClick={() => dismiss()}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                width: "2em",
              }}
            >
              <CloseIcon />
            </div>

            {children}
          </ModalBoxSetup>
          <ModalBg
            onClick={() => {
              clickOutsidedismiss && dismiss();
            }}
          />
        </ModalWrapper>
      )}
    </React.Fragment>
  );
};
