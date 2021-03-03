import React from "react";
import { CloseButton, ModalBg, ModalBoxSetup, ModalWrapper } from "./ModalStyles";

import { GrowFromZero, SvgWrapperButton } from "../../GlobalStyles";
import { Close } from "@material-ui/icons";

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
          <GrowFromZero in={true}>
            <ModalBoxSetup>
              <CloseButton onClick={() => dismiss()}>
                <Close />
              </CloseButton>
              {children}
            </ModalBoxSetup>
          </GrowFromZero>
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
