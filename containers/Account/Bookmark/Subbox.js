import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { withRouter } from "next/router";
import Router from "next/router";

@inject("Partner", "Auth", "Project", "Common", "Request")
@observer
class SubBoxContainer extends React.Component {
  componentDidMount = async () => {
    const { Auth } = this.props;
  };
  render() {
    const { Auth } = this.props;

    const clientId =
      this.props.Auth.logged_in_client && this.props.Auth.logged_in_client.id;
    const userEmail =
      Auth.logged_in_client && Auth.logged_in_client.user.username;

    return (
      <>
        <Container>
          <Button>
            <span>{userEmail}</span>
          </Button>
          <Button>
            <span>프로젝트 의뢰하기</span>
          </Button>
        </Container>
      </>
    );
  }
}

const buttenArray = [
  { id: 1, name: "프로젝트 의뢰하기" },
  { id: 2, name: "관심 업체 등록하기" },
];

export default SubBoxContainer;

const Container = styled.div`
  width: 300px;
  height: 500px;
  //   border: 3px solid red;
`;

const ActiveItem = styled.div`
  height: 187px;
  padding: 25px 0 16px 26px;
  box-sizing: border-box;
  margin-bottom: 50px;
  > div {
    margin-bottom: 15px;
    font-size: 14px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 15px 0 6px 16px;
    > div {
      font-size: 11px;
    }
  }
`;

const ShowItem = styled.div`
  // border: 3px solid green;
  height: 80px;

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 70%;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border: none;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 230px;
    height: 47px;
    background-color: ${(props) =>
      props.type === "project"
        ? props.active
          ? "#0933b3"
          : "#0933b3"
        : props.active
        ? "#eeeeee"
        : "#ffffff"};

    border: 1px solid #e1e2e4;
    border-radius: 5px;
    > span {
      font-size: 14px;
      line-height: 9px;
      letter-spacing: -0.35px;
      color: ${(props) =>
        props.type === "project"
          ? props.active
            ? "#ffffff"
            : "#ffffff"
          : props.active
          ? "#a4aab4"
          : "#767676"};
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > div {
      width: 180px;
      height: 34px;
      > span {
        font-size: 12px;
      }
    }
  }
`;

const UserBox = styled.div`
  border-bottom: 1px solid #e1e2e4;
  // padding-bottom: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  > div {
    font-size: 14px;
    line-height: 77px;
    letter-spacing: -0.35px;
    color: #999999;
    font-weight: normal;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 60px;
    > img {
      width: 30px;
    }
  }
`;

const SubItem = styled.div`
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  > span:last-child {
    color: #0933b3;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    > span {
      font-size: 13px;
    }
  }
`;
