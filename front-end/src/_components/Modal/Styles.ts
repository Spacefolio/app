import styled from "styled-components";
import { CenteredFlexBox, SvgWrapperButton } from "../../_styles";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  ${CenteredFlexBox}
`;

export const ModalHeader = styled.div`
  display: flex;
  border-radius: 10px 10px 0 0;
  align-items: center;
  padding: 1rem;
  width: 100%;
  background: whitesmoke;
  height: 80px;
`;

export const ModalContent = styled.div`
  padding: 1rem;
  padding-top: 0;
  max-height: 520px;
  top: 0;
  bottom: 0;
`;

export const ModalBoxSetup = styled.div<{ isMobile: boolean }>`
  width: 400px;
  max-height: 600px;
  position: absolute;
  padding: 0;
  margin: 0px auto;
  box-sizing: border-box;
  border-radius: 10px;
  z-index: 6;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  background: white;
  border: 0.5px solid whitesmoke;
  ${(props) => props.isMobile && `bottom: 0; width: 100%;`}
`;
export const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 5;
  background: rgba(0, 0, 0, 0.5);
`;
export const CloseButton = styled(SvgWrapperButton)`
  position: absolute;
  top: 0px;
  right: 0px;
`;
