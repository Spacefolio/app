import styled from "styled-components";
import {RD} from '../../Application/ResponsiveDesign'

export const MetaPortfolioWrapper = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: ${RD.breakpointtablet}) {
    // grid-template-areas:
    //   "one one"
    //   "two three"
    //   "five four";
  }

  @media screen and (max-width: ${RD.breakpointtablet}) {
    // grid-template-areas:
    //   "one"
    //   "two"
    //   "three"
    //   "four"
    //   "five";
  }
`;

export const PortfolioValueWrapper = styled.div`
  border: 1px solid var(--accent-base)
`;
