import { Button } from "@material-ui/core";
import styled from "styled-components";
import { CenteredFlexBox, COLORS, TimingStyle } from ".";

// export const BigWideButton = styled.button`
//   ${CenteredFlexBox}
//   width: 100%;
//   border-radius: 1rem;
//   background-color: ${COLORS.primaryBase};
//   padding: 1rem;
//   color: white;
//   box-shadow: 0px 15px 25px -17px ${COLORS.primaryBase};
//   cursor: pointer;
//   ${TimingStyle}
//   &:hover {
//     background-color: ${COLORS.accentBase};
//     box-shadow: 0px 15px 25px -17px ${COLORS.accentBase};
//   }
// `;

export const ActionButton = styled(Button)`
  box-shadow: 0px 15px 25px -17px ${COLORS.primaryBase};
  min-width: 120px;
  padding: 10 10px;
  border-radius: 20px;
`;

export const NavButton = styled(Button)`
  box-shadow: 0px 15px 25px -17px ${COLORS.primaryBase};
  min-width: 120px;
  padding: 10 10px;
  border-radius: 20px;
`;