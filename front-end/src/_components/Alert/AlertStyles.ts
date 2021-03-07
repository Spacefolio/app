import styled from "styled-components";
import { InlineDiv } from "../../AlgonexStyles";
import { COLORS } from "../../AlgonexStyles/ResponsiveDesign";

export const AlertWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

interface IAlertContainerProps {
  alertType: "success" | "danger";
}
export const AlertContainer = styled.div`
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props: IAlertContainerProps) =>
    props.alertType == "danger" ? COLORS.errorBase : COLORS.accentBase};
  padding: 10px;
  position: fixed;
  bottom: 5%;
  z-index: 500;
`;

export const AlertMessage = styled(InlineDiv)`
  color: white;
  margin-right: 10px;
`;

export const IconContainer = styled.div`
  width: 2rem;
  height: 2rem;
`;
