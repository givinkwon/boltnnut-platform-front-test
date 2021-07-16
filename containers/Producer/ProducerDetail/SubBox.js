import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import * as PartnerAPI from "axios/Partner";
import { toJS } from "mobx";

@inject("Partner", "Auth")
@observer
class SubBoxContainer extends React.Component {
  render() {
    console.log(toJS(this.props.Auth));
    return (
      <>
        <Container>
          <ActiveItem>
            <div>자동견적&비슷한 업체를 추천 받고 싶다면</div>
            <Button>
              <div>
                <span>프로젝트 의뢰하기</span>
              </div>
            </Button>

            <Button>
              <div>
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

const Button = styled.button``;

const UserBox = styled.div``;

const SubItem = styled.div``;
