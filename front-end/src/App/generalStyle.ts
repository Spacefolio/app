import styled from "styled-components";

export const AppContainer = styled.div`
height: 100%;

`;
export const CardBoxSetup = styled.div`
position: absolute;
overflow:hidden;
padding:16px;
margin: 50px auto;
box-sizing:border-box;
border-radius: 20px;
z-index:1;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
background: white;
border: 0.5px solid #E8E8E8;
`;
export const CardBg = styled.div`
width: 100vw;
height: 100vh;
z-index: 0;
background: rgba(0, 0, 0, 0.5);
`;
export const CloseButton = styled.div`
position: absolute
top: 0px;
right: 0px;
width: 100px;
height: 100px;
`;