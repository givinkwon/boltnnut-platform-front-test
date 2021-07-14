import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import * as PartnerAPI from "axios/Partner";

@inject("Partner", "Auth")
@observer
class TabBarContainer extends React.Component {
  clickHandler = (item, idx) => {
    const { Partner } = this.props;

    if (Partner.selectedTabIdx === 0) {
      console.log(item);
      console.log(idx);
      Partner.selectedTabIdx = idx + 1;
    } else {
      Partner.selectedTabIdx = 0;
    }
    console.log(Partner.selectedTabIdx);
  };
  render() {
    console.log("render");
    const { Partner, portfoliLocation, introductionLocation } = this.props;
    console.log(this.props.portfoliLocation);

    return (
      <>
        <Container>
          {tabArray.map((item, idx) => {
            return (
              <Item
                onClick={() => {
                  if (idx === 0) {
                    console.log(idx);
                    console.log(portfoliLocation);
                    window.scrollTo(0, portfoliLocation);
                  }
                  if (idx === 1) {
                    window.scrollTo(0, introductionLocation);
                  }
                  Partner.clickHandler(item, idx);
                  this.setState({ g: 3 });
                }}
                active={Partner.activeHandler(item, idx)}
              >
                <span>{item.name}</span>
              </Item>
            );
          })}
        </Container>
      </>
    );
  }
}

export default TabBarContainer;

const tabArray = [
  { id: 1, name: "포트폴리오" },
  { id: 2, name: "업체 정보" },
  { id: 3, name: "리뷰" },
  { id: 4, name: "위치" },
];

const Container = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 50px;
  // border: 3px solid red;
  position: relative;
`;

const Item = styled.div`
  // border: 3px solid blue;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  border-bottom: ${(props) => (props.active ? "2px solid black" : "")};
  > span {
    font-size: 19px;
    color: rgb(0, 0, 0);
    font-weight: ${(props) => (props.active ? "bold" : "400")};
  }
`;
