import React, { useState, useEffect } from "react";
import { ModalBg, ModalBoxSetup, ModalWrapper } from "./generalStyle";
import { CloseButton } from "../../_components";

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
      {visible ? (
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
              <CloseButton />
            </div>

            {children}
          </ModalBoxSetup>
          <ModalBg
            onClick={() => {
              clickOutsidedismiss ? dismiss() : null;
            }}
          />
        </ModalWrapper>
      ) : null}
    </React.Fragment>
  );
};
