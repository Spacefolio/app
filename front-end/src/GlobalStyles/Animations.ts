import { Grow } from "@material-ui/core";
import styled from "styled-components";

export const spinAnimation = `
fill: var(--accent-base);
animation-name: spin;
animation-duration: 2000ms;
animation-iteration-count: infinite;
animation-timing-function: linear;
}
@keyframes spin {
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(-360deg);
}
`;

export const ResizeTransition = `
-webkit-transition:all 1s ease;
-moz-transition:all 1s ease;
      -o-transition:all 1s ease;
            transition:all 1s ease;
`;

export const FadeoutAnimation = `
-webkit-animation:fadeOut 1s;
    -webkit-animation-delay:3s;
    -webkit-animation-fill-mode:forwards;
    -moz-animation:fadeOut 1s;
    -moz-animation-delay:3s;
    -moz-animation-fill-mode:forwards;
    animation:fadeOut 1s;
    animation-delay:3s;
    animation-fill-mode:forwards;
}
@-webkit-keyframes fadeOut {
  from {
      opacity:1;
  }
  to {
      opacity:0;
  }
}
@-moz-keyframes fadeOut {
  from {
      opacity:1;
  }
  to {
      opacity:0;
  }
}
@keyframes fadeOut {
  from {
      opacity:1;
  }
  to {
      opacity:0;
  }
}
`;
export const GrowFromZero = styled(Grow)`
  transformorigin: 0 0 0;
`;
