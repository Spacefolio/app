import styled from "styled-components";
import { CenteredFlexBox } from "../../GlobalStyles";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 4;
  ${CenteredFlexBox}
`;
export const ModalBoxSetup = styled.div`
  position: absolute;
  overflow: hidden;
  padding: 16px;
  margin: 50px auto;
  box-sizing: border-box;
  border-radius: 5px;
  z-index: 3;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  background: white;
  border: 0.5px solid #e8e8e8;
`;
export const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
`;
export const CloseButton = styled.div`
position: absolute
top: 0px;
right: 0px;
width: 100px;
height: 100px;
`;
