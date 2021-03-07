import { BottomNavigation } from "@material-ui/core";
import styled from "styled-components";
import { COLORS } from "../../AlgonexStyles";

export const BottomNavbar = styled(BottomNavigation)`
  width: 100%;
  position: fixed;
  bottom: 0px;
  background-color: ${COLORS.darkBase};
  * {
    color: white !important;
  }
`;