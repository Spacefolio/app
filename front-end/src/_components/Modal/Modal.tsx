import React, { useState, useEffect } from "react";
import { ModalBg, ModalBoxSetup, ModalWrapper } from "./generalStyle";
import { CloseButton } from "../../_components";

interface DropdownProps {
  visible: boolean;
  dismiss(): void;
  children: any;
  clickOutsidedismiss?: boolean;
}

export const Modal: React.FC<DropdownProps> = ({
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
