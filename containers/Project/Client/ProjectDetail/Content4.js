import React from "react";
import styled from "styled-components";
import * as Content from "components/Content";
import * as Title from "components/Title";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";

class Content4 extends React.Component {
  render() {
    return (
      <Background>
        {/* <Containerv1 style={{ display: "flex", flexDirection: "column" }}> */}
        <RequestContainer>
          <Font24 mb={30}>프로젝트 설명 및 요청사항</Font24>
          <PublicRequestContainer>
            <Font20>공개내용</Font20>
            <PublicRequestBox>rewerwerwerewr</PublicRequestBox>
          </PublicRequestContainer>
          <PrivateRequestContainer>
            <Font20>비공개내용</Font20>
            <DrawingCard>
              <Header>
                <div>이름</div>
                <div>사진</div>
                <div>
                  <span>도면 상세보기</span>
                </div>
              </Header>
              <Body>
                <div>
                  <span>생산공정</span>
                  <span>3D프린팅</span>
                </div>
                <div>
                  <span>재료</span>
                  <span>유사ARS검정레진</span>
                </div>
                <div>
                  <span>마감</span>
                  <span>기본가공</span>
                </div>
                <div>
                  <span>색상</span>
                  <span>검정</span>
                </div>
              </Body>
              <Tail>
                <div>
                  <span>수량</span>
                  <span>1</span>
                </div>
                <div>
                  <span>가격</span>
                  <span>2,979,850원</span>
                </div>
              </Tail>
            </DrawingCard>
            <PrivateRequestBox>werewrewrewrewr</PrivateRequestBox>
          </PrivateRequestContainer>
        </RequestContainer>
        {/* </Containerv1> */}
      </Background>
    );
  }
}
export default Content4;

const Container4 = styled.div`
  width: 100%;
  height: 1091px;
`;

const Font24 = styled(Content.FontSize24)`
  line-height: 1.67;
  font-weight: bold;
  letter-spacing: -0.6px !important;
  color: #282c36;
  margin-bottom: ${(props) => (props.mb ? props.mb : "")}px;
`;

const Font20 = styled(Title.FontSize20)`
  line-height: 1.7;
  font-weight: normal;
  letter-spacing: -0.5px !important;
  color: #414550;
  margin-bottom: 12px;
`;

const RequestContainer = styled.div`
  width: 100%;
`;
const PublicRequestContainer = styled.div`
  width: 100%;
`;

const PublicRequestBox = styled.div`
  height: 383px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  padding: 26px 43px;
  box-sizing: border-box;
`;

const PrivateRequestContainer = styled.div`
  width: 100%;
`;

const DrawingCard = styled.div`
  width: 100%;
  height: 233px;
  border: 1px solid #c6c7cc;
  border-radius: 4px;
  margin-bottom: 16px;
  display: flex;
`;

const Header = styled.div`
  //width: 100%;
  border: 2px solid red;
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  > div:nth-of-type(1) {
    font-size: 18px;
    font-weight: bold;
    line-height: 2.22;
    letter-spacinig: -0.45px;
    color: #282c36;
  }

  > div:nth-of-type(3) {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    width: 50%;
    height: 32px;
    display: flex;
    align-items: center;
    > span {
      font-size: 16px;
      line-height: 2.5;
      letter-spacing: -0.4px;
      color: #414550;
      font-weight: normal;
    }
  }
`;

const Body = styled.div`
  border: 2px solid blue;
  flex-grow: 2;
`;
const Tail = styled.div`
  border: 2px solid green;
  flex-grow: 1;
`;

const PrivateRequestBox = styled.div`
  height: 383px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  padding: 26px 43px;
  box-sizing: border-box;
`;
