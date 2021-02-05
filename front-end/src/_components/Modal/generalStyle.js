import styled from "styled-components";

export const ModalWrapper = styled.div`
position: fixed;
top: 0;
left: 0;
bottom: 0;
z-index: 1050;
display: flex;
align-items: center;
`;
export const ModalBoxSetup = styled.div`
position: absolute;
left: 10%;
right: 10%;
width: "32%";
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
export const ModalBg = styled.div`
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