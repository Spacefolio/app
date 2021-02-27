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