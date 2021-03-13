import React, { useEffect, useState } from "react";
import {
  CloseButton,
  ModalBg,
  ModalBoxSetup,
  ModalContent,
  ModalHeader,
  ModalWrapper,
} from "./_styles";

import {
  GrowFromZero,
  RD,
  ScrollBox,
  SvgWrapperButton,
} from "../../_styles";
import { Close } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../_reducers";
import { dispatch } from "d3-dispatch";
import { applicationViewActions } from "../../_actions/applicationView.actions";
import useMedia from "use-media";
import { ThemeProvider, Typography } from "@material-ui/core";
import { theme } from "../../_styles/Theme";
import { useLockBodyScroll } from "../../_hooks/useBodyScrollLock";

interface ModalProps {}

export const Modal: React.FC<ModalProps> = ({}) => {
  const isMobile = useMedia({ maxWidth: RD.breakpointsmartphone });

  const { isVisible, component, header } = useSelector(
    (state: IRootState) => state.applicationView.modal
  );

  const dispatch = useDispatch();

  useLockBodyScroll(isVisible);

  return (
    <React.Fragment>
      {isVisible && (
        <ModalWrapper>
          <GrowFromZero in={true}>
            <ThemeProvider theme={theme}>
              <ModalBoxSetup isMobile={isMobile}>
                <ModalHeader>
                  <Typography>{header.toLocaleUpperCase()}</Typography>
                </ModalHeader>
                <ModalContent>
                  <CloseButton
                    onClick={() =>
                      dispatch(applicationViewActions.setModal(false, null))
                    }
                  >
                    <Close />
                  </CloseButton>
                  {component}
                </ModalContent>
              </ModalBoxSetup>
            </ThemeProvider>
          </GrowFromZero>
          <ModalBg
            onClick={() => {
              dispatch(applicationViewActions.setModal(false, null));
            }}
          />
        </ModalWrapper>
      )}
    </React.Fragment>
  );
};
