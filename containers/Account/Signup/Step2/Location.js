import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import * as AccountAPI from "axios/Account/Account";

import * as Text from "components/Text";

@inject("Auth", "Answer")
@observer
class Location extends React.Component {
  state = {
    text: "",
    portfolioArray: [],
  };
  //   onChangeHandler = (e) => {
  //     const text = e.target.value;
  //     console.log(text);
  //     this.setState({ text: e.target.value });
  //   };
  //   onSubmitHandler = () => {
  //     const formData = new FormData();
  //     formData.append("url", this.state.text);
  //     const req = {
  //       data: formData,
  //     };
  //     AccountAPI.getPortfolio(req)
  //       .then((res) => {
  //         console.log(res);
  //         this.setState({ portfolioArray: res.data });
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };
  render() {
    return (
      <Container>
        <Header>
          <Name>위치</Name>

          <Button>주소 검색</Button>
        </Header>
        <Main>
          <span>도로명주소</span>
          <div>
            <input />
          </div>
          {/* <button onClick={this.onSubmitHandler}>입력</button> */}
        </Main>
        {/* <Temp>
          {this.state.portfolioArray &&
            this.state.portfolioArray.url &&
            this.state.portfolioArray.url.map((item, idx) => {
              return (
                <>
                  <img src={item} />
                  <span>{this.state.portfolioArray.score[idx]}</span>
                </>
              );
            })}          
        </Temp> */}
      </Container>
    );
  }
}

export default Location;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  margin-top: 100px;
  margin-bottom: 120px;
`;

const Name = styled.div`
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.6px;
  color: #414550;
  font-weight: bold;
  margin-right: 12px;
`;

const Button = styled.button`
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.45px;
  color: #0933b3;
  font-weight: 600;
  background-color: #ffffff;
  border: none;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid #e1e2e4;
  margin-bottom: 20px;
`;
const Main = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  > span {
    width: 90px;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.45px;
    color: #282c36;
    font-weight: 500;
    margin-right: 20px;
  }
  > div {
    width: 100%;
    border: 1px solid #c6c7cc;

    > input {
        width: 99%;
        height: 36px;
        border: none;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.67;
        letter-spacing: -0.18px;
        text-align: left;
        font-size: 14px;
        // font-family: inherit
        :focus {
          outline: none;    
        }
        ::placeholder {  
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 2.43;
          letter-spacing: -0.35px;
          text-align: left;
          color: #999999;
          padding-left: 0;
        }
        
  }
`;

const Temp = styled.div``;
