import React from "react";
import styled, { css } from "styled-components";

class ChatCardContainer extends React.Component {
  render() {
    return <Card></Card>;
  }
}

export default ChatCardContainer;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;
const InputBox = styled.div`
  padding: 5px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid orangered;
  flex-grow: 1;
`;

const SubmitForm = styled.form`
  display: flex;
  width: 100%;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto 40px;
`;

const SendButton = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  background-color: orangered;
  color: white;
  border: none;
  border-radius: 8px;
  margin-left: 10px;
`;
