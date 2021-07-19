import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";

@inject("Partner", "Auth")
@observer
class RequestContainer extends React.Component {
  render() {
    return (
      <>
        <Container>
          <Label>제작문의</Label>
          <Description>
            <div>문의하신 내용에대해</div>
            <div>메일로 회신드리겠습니다.</div>
          </Description>
          <Item>
            <span>이름</span>
            <div>
              <input />
            </div>
          </Item>
          <Item>
            <span>회사명</span>
            <div>
              <input />
            </div>
          </Item>
          <Item>
            <span>이메일</span>
            <div>
              <input />
            </div>
          </Item>
          <Item>
            <span style={{ alignSelf: "self-start" }}>문의내용</span>
            <div>
              <input style={{ height: "400px" }} />
            </div>
          </Item>
          <Button>
            <div>
              <span>전송</span>
            </div>
          </Button>
        </Container>
      </>
    );
  }
}

export default RequestContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  input {
    width: 97%;
    // padding: 4px;
    outline: none;
    border: 1px solid #0933b3;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.45px;
    color: #282c36;
    line-height: 34px;
    ::placeholder {
      font-size: 14px;

      color: #c1bfbf;
    }
`;

const Label = styled.div`
  align-self: center;
`;

const Description = styled.div`
  text-align: center;
`;

const Item = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  > span {
    width: 25%;
  }
`;

const Button = styled.button`
  border: none;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    background-color: #0933b3;
    width: 100px;
    height: 30px;
    border-radius: 30px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
