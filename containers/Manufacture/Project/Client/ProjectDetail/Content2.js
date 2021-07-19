import React from "react";
import styled, { css } from "styled-components";
import * as Content from "components/Content";
import * as Title from "components/Title";
import { createFalse } from "typescript";

const partnerbadge = "/static/images/project/partnerbadge.svg";

class Content2 extends React.Component {
  state = {
    check: 0,
  };
  cellChecked = (idx) => {
    this.setState({ check: idx });
  };
  activeHandler = (idx) => {
    const { check } = this.state;
    if (check == idx) {
      return true;
    } else {
      return false;
    }
  };

  Cell = [
    { Content: "지원한 파트너" },
    { Content: "선정된 파트너" },
    { Content: "프로젝트 지원/취소 안내" },
  ];

  render() {
    const { check } = this.state;

    return (
      <div style={{ marginTop: 100, marginBottom: 100 }}>
        <Container2Select>
          {this.Cell.map((cell, idx) => (
            <SelectContainer
              active={this.activeHandler(idx)}
              onClick={() => this.cellChecked(idx)}
            >
              <Font18 active={this.activeHandler(idx)}>{cell.Content}</Font18>
            </SelectContainer>
          ))}
        </Container2Select>

        {check == 0 ? (
          <Container2Body>
            <div>
              <Font22 style={{ fontWeight: "bold" }}>지원한 파트너</Font22>
              <Font24 style={{ marginLeft: 6, color: "#0933b3" }}>3</Font24>
            </div>
            <PartnerCategory>
              <div>
                <div>
                  <img src={partnerbadge} style={{ marginRight: 28 }}></img>
                </div>
                <div>
                  <Font20 style={{ color: "#282c36" }}>닉*</Font20>
                </div>
                <div>
                  <Font15 style={{ marginRight: 10 }}>2021.02.16</Font15>
                  <Font15>18:00</Font15>
                </div>
              </div>

              <div>
                <div>
                  <img src={partnerbadge} style={{ marginRight: 28 }}></img>
                </div>
                <div>
                  <Font20 style={{ color: "#282c36" }}>애***</Font20>
                </div>
                <div>
                  <Font15 style={{ marginRight: 10 }}>2021.02.16</Font15>
                  <Font15>18:00</Font15>
                </div>
              </div>

              <div>
                <div>
                  <img src={partnerbadge} style={{ marginRight: 28 }}></img>
                </div>
                <div>
                  <Font20 style={{ color: "#282c36" }}>숙***</Font20>
                </div>
                <div>
                  <Font15 style={{ marginRight: 10 }}>2021.02.16</Font15>
                  <Font15>18:00</Font15>
                </div>
              </div>
            </PartnerCategory>
          </Container2Body>
        ) : check == 1 ? (
          <Container2Body></Container2Body>
        ) : (
          <Container2Body />
        )}
      </div>
    );
  }
}

export default Content2;
const Container2Select = styled.div`
  width: 100%;
  height: 55px;
  display: inline-flex;
  flex-direction: row;
  margin-bottom: 40px;
  // >div{
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   width: 332px;
  //   border:solid 1px #c6c7cc;
  //   border-top: solid 2px #767676;
  //   background-color: ${(props) => (props.active ? "#ffffff" : "#f6f6f6")};

  // &:active{
  //   background-color: #ffffff;
  //   >p{
  //     font-weight: bold;
  //     color: #282c36;
  //   }

  // }
  // }
`;

const SelectContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 332px;
  border: solid 1px #c6c7cc;
  border-top: solid 2px #767676;
  background-color: ${(props) => (props.active ? "#ffffff" : "#f6f6f6")};
`;

const Container2Body = styled.div`
  width: 324px;
  display: flex;
  flex-direction: column;
  padding: 30px 630px 34px 42px;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);

  > div:nth-of-type(1) {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 26px;
  }
`;

const PartnerCategory = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 23px;

    > div:nth-of-type(3n-2) {
    }
    > div:nth-of-type(3n-1) {
      width: 115px;
    }
    > div:nth-of-type(3n) {
      display: flex;
      flex-direction: row;
    }
  }
`;
const Font15 = styled(Content.FontSize15)`
  color: #a4aab4;
  line-height: 1.5;
  letter-spacing: -0.38px !important;
`;
const Font18 = styled(Content.FontSize18)`
  color: #767676;
  display: flex;
  align-items: center;
  line-height: 1.5;
  justify-content: center;
  letter-spacing: -0.45px !important;
  font-weight: 500;
  ${(props) =>
    props.active &&
    css`
      font-weight: bold;
      color: #282c36;
    `}
`;

const Font20 = styled(Title.FontSize20)`
  color: #86888c;
  display: flex;
  align-items: center;
  text-align: center;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  line-height: 1.5;
  align-items: center;
`;
const Font22 = styled(Content.FontSize22)`
  line-height: 1.5;
`;
const Font24 = styled(Content.FontSize24)`
  line-height: 1.5;
  font-family: Roboto;
  font-weight: bold;
`;
