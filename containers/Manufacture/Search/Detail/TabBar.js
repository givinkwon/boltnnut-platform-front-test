import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";

@inject("Partner", "Auth")
@observer
class TabBarContainer extends React.Component {
  // clickHandler = (item, idx) => {
  //   const { Partner } = this.props;

  //   if (Partner.selectedTabIdx === 0) {
  //     console.log(item);
  //     console.log(idx);
  //     Partner.selectedTabIdx = idx + 1;
  //   } else {
  //     Partner.selectedTabIdx = 0;
  //   }
  //   console.log(Partner.selectedTabIdx);
  // };
  render() {
    console.log("render");
    const {
      Partner,
      portfoliLocation,
      introductionLocation,
      reviewLocation,
      mapLocation,
    } = this.props;
    console.log(this.props.portfoliLocation);
    console.log(this.props.introductionLocation);
    console.log(this.props.reviewLocation);
    console.log(this.props.mapLocation);

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
                  if (idx === 2) {
                    console.log(reviewLocation);
                    window.scrollTo(0, reviewLocation);
                  }
                  if (idx === 3) {
                    window.scrollTo(0, mapLocation);
                  }
                  Partner.clickHandler("tabbar", item, idx);
                  this.setState({ g: 3 });
                }}
                active={Partner.activeHandler("tabbar", item, idx)}
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
  background-color: ${(props) => (props.active ? "#ffffff" : "#f6f6f6")};
  border: 1px solid #e3e4e6;
  border-bottom: ${(props) =>
    props.active ? "1px solid #ffffff" : "1px solid #E3E4E6"};
  border-top: ${(props) =>
    props.active ? "3px solid #2E323C" : "1px solid #E3E4E6"};

  > span {
    font-size: 19px;
    color: rgb(0, 0, 0);
    font-weight: ${(props) => (props.active ? "bold" : "400")};

    @media (min-width: 0px) and (max-width: 767.98px) {
      font-size: 14px;
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
      font-size: 16px;
    }
    @media (min-width: 992px) and (max-width: 1299.98px) {
    }
    @media (min-width: 1300px) {
    }
  }
`;
