import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import * as PartnerAPI from "axios/Partner";
import { toJS } from "mobx";

@inject("Partner", "Auth")
@observer
class SubBoxContainer extends React.Component {
  componentDidMount = async () => {
    const { Partner, Auth, partnerId } = this.props;

    const clientId = this.props.Auth.logged_in_client.id;
    await Partner.existBookmarkPartner(clientId, partnerId);
  };
  render() {
    const { Partner, Auth, partnerId } = this.props;
    console.log(this.props.Auth.logged_in_client.id);
    console.log(toJS(`clientId: ${this.props.Auth.logged_in_client.id}`));
    const clientId = this.props.Auth.logged_in_client.id;
    console.log(toJS(`partnerId: ${partnerId}`));
    return (
      <>
        <Container>
          <ActiveItem>
            <div>자동견적&비슷한 업체를 추천 받고 싶다면</div>

            {/* {buttenArray.map((item, idx) => {
              return (
                <Button
                  style={{ marginBottom: "12px" }}
                  active={Partner.activeHandler("interested", item, idx)}                  
                >
                  <div
                    onClick={() => {
                      Partner.clickHandler("interested", item, idx);
                      this.setState({ g: 3 });
                    }}
                  >
                    <span>{item.name}</span>
                  </div>
                </Button>
              );
            })} */}
            <Button
              active={Partner.activeHandler("project")}
              style={{ marginBottom: "12px" }}
              type="project"
            >
              <div
                onClick={() => {
                  Partner.clickHandler("project");
                  this.setState({ g: 3 });
                }}
              >
                <span>프로젝트 의뢰하기</span>
              </div>
            </Button>

            <Button
              active={Partner.activeHandler("interested")}
              type="interested"
            >
              <div
                onClick={async () => {
                  console.log("click!!");
                  Partner.clickHandler("interested");
                  if (Partner.interestedIdx) {
                    await Partner.setBookmarkPartner(clientId, partnerId);
                    await Partner.getBookmarkPartner(clientId);
                  }
                  this.setState({ g: 3 });
                }}
              >
                <span>관심 업체 등록하기</span>
              </div>
            </Button>
          </ActiveItem>
          <ShowItem>
            <UserBox></UserBox>
            <SubItem>
              <span>프로젝트 의뢰</span>
              <span>0</span>
            </SubItem>
            <SubItem>
              <span>관심 업체 등록</span>
              <span>0</span>
            </SubItem>
          </ShowItem>
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
  border: 1px solid #e1e2e4;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  padding: 25px 0 16px 26px;
  box-sizing: border-box;
  margin-bottom: 50px;
`;

const ShowItem = styled.div`
  border: 3px solid green;
  height: 80px;
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
    background-color: #ffffff;
    border: ${(props) =>
      props.active ? "1px solid #0933b3" : "1px solid #e1e2e4"};
    border-radius: 5px;
    > span {
      font-size: 14px;
      line-height: 9px;
      letter-spacing: -0.35px;
      color: #767676;
    }
  }
`;

const UserBox = styled.div``;

const SubItem = styled.div``;
