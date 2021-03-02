import React, { useState, useEffect } from "react";
import { ModalBg, ModalBoxSetup, ModalWrapper } from "./ModalStyles";
import { CloseIcon } from "../../_components";
import { SvgWrapperButton } from "../../GlobalStyles";

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
            <SvgWrapperButton
              onClick={() => dismiss()}
            >
              <CloseIcon />
            </SvgWrapperButton>

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
