import React from "react";
import Select from "react-select";
import styled, { keyframes } from "styled-components";

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { isElementAccessExpression } from "typescript";

const star = "/static/icon/star.svg";

@inject("Partner", "Auth")
@observer
class QuestionBox extends React.Component {
  state = {
    width: null,
  };

  componentDidMount = async () => {
    const { Partner } = this.props;
    Partner.resetReviewAry();
  };
  componentWillUnmount = () => {};

  onClickHandler = (key) => {
    const { Array, checkIndex, checkIndexFunc, id } = this.props;
    console.log(toJS(Array[key - 1]));

    console.log(`전 : ${checkIndex}`);
    console.log(`key : ${key}`);

    if (checkIndex != key) {
      checkIndexFunc(id, Array[key - 1].score);
    }
    console.log(`후 : ${checkIndex}`);
  };

  render() {
    const { width, Partner, Array, header, checkIndex } = this.props;
    console.log(checkIndex);

    return (
      <>
        <Card checkIndex={checkIndex}>
          <header>
            <span>{header}</span>
          </header>
          <main>
            <div
              onClick={() => {
                this.onClickHandler(1);
              }}
            >
              <div></div>
            </div>
            <div></div>
            <div
              onClick={() => {
                this.onClickHandler(2);
              }}
            >
              <div></div>
            </div>
            <div></div>
            <div
              onClick={() => {
                this.onClickHandler(3);
              }}
            >
              <div></div>
            </div>
          </main>
          <footer>
            <span>{Array[checkIndex - 1].content}</span>
          </footer>
        </Card>
      </>
    );
  }
}

export default QuestionBox;

const Card = styled.div`
  width: 100%;
  height: 263px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 13px 0 54px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #e1e2e4;
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 13px 0 0 0;
    height: 210px;
  }
  header {
    margin-bottom: 44px;
    @media (min-width: 0px) and (max-width: 767.98px) {
      margin-top: 10px;
      margin-bottom: 18px;
    }
    span {
      font-size: 24px;
      line-height: 40px;
      letter-spacing: -0.6px;
      color: #282c36;
      font-weight: normal;
      @media (min-width: 0px) and (max-width: 767.98px) {
        font-size: 16px;
      }
    }
  }
  main {
    margin-bottom: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 0px) and (max-width: 767.98px) {
      width: 172px;
      height: 32px;
      margin-bottom: 25px;
    }
    div:nth-child(odd) {
      width: 31px;
      height: 31px;
      border-radius: 27px;
      background-color: #f6f6f6;
      position: relative;
      cursor: pointer;
      @media (min-width: 0px) and (max-width: 767.98px) {
        border-radius: 27px;
      }
      > div {
        width: 12px;
        height: 12px;
        border-radius: 11px;
        background-color: #e1e2e4;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    div:nth-child(even) {
      // display: none;
      width: 39px;
      height: 0px;
      border: 1px solid #e1e2e4;
    }
    div:nth-of-type(1) {
      background-color: ${(props) =>
        props.checkIndex == 1 ? "#0933b3" : "#f6f6f6"};
      div {
        background-color: ${(props) =>
          props.checkIndex == 1 ? "#ffffff" : "#e1e2e4"};
      }
    }

    div:nth-of-type(3) {
      background-color: ${(props) =>
        props.checkIndex == 2 ? "#0933b3" : "#f6f6f6"};

      div {
        background-color: ${(props) =>
          props.checkIndex == 2 ? "#ffffff" : "#e1e2e4"};
      }
    }

    div:nth-of-type(5) {
      background-color: ${(props) =>
        props.checkIndex == 3 ? "#0933b3" : "#f6f6f6"};
      div {
        background-color: ${(props) =>
          props.checkIndex == 3 ? "#ffffff" : "#e1e2e4"};
      }
    }
  }
  footer {
    span {
      font-size: 16px;
      line-height: 40px;
      letter-spacing: -0.4px;
      color: #0933b3;
      font-weight: normal;
      @media (min-width: 0px) and (max-width: 767.98px) {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
`;
