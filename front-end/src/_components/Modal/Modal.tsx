import React, { useState, useEffect } from "react";
import { ModalBg, ModalBoxSetup, ModalWrapper } from "./generalStyle";
import {CloseButton} from '../../_components';

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
  clickOutsidedismiss
}) => {
  return (
    <React.Fragment>
      {visible ? (
        <ModalWrapper>
          <ModalBoxSetup>
            <CloseButton top="5px" right="5px" clickAction={() => dismiss()}></CloseButton>
            {children}
          </ModalBoxSetup>
          <ModalBg onClick={() => {
            clickOutsidedismiss? dismiss(): null
          }} />
        </ModalWrapper>
      ) : null}
    </React.Fragment>
  );
};
