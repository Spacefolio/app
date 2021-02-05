import React, { useState, useEffect } from "react";
import { ModalBg, ModalBoxSetup, ModalWrapper } from "./generalStyle";
import {CloseButton} from '../../_components';

interface DropdownProps {
  visible: boolean;
  dismiss(): void;
  children: any;
}

export const Modal: React.FC<DropdownProps> = ({
  visible,
  dismiss,
  children,
}) => {
  return (
    <React.Fragment>
      {visible ? (
        <ModalWrapper>
          <ModalBoxSetup>
            <CloseButton clickAction={() => dismiss()}></CloseButton>
            {children}
          </ModalBoxSetup>
          <ModalBg onClick={() => dismiss()} />
        </ModalWrapper>
      ) : null}
    </React.Fragment>
  );
};
