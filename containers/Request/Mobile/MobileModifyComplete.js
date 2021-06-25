import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import * as Content from "components/Content";
import * as Title from "components/Title";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import Router from "next/router";

const success = "/static/images/request/PaymentComplete/success.png";

@inject("Project")
@observer
class MobileRequestComplete extends React.Component {
  render() {
    return (
      <Background style={{ marginTop: 54 }}>
        <Containerv1 style={{ display: "flex", flexDirection: "column" }}>
          <RequestCompleteTitle>
            <SuccessImg
              src={success}
              style={{ marginBottom: "18px", marginTop: "30px" }}
            />
            <FontSize18>고객님의 프로젝트 수정이 완료 되었습니다.</FontSize18>
          </RequestCompleteTitle>
          <RequestCompleteBox>
            <RequestCompleteDesc>
              <InlineDiv
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                {/* <FontSize14>
                  문의에 적합한 전문 제조사들이 
								</FontSize14> */}
              </InlineDiv>
              <InlineDiv
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                {/* <FontSize14>
                의뢰주신 상담 내용을 확인한 후 상담에 대한 답변을 드립니다. 
								</FontSize14> */}
              </InlineDiv>

              <InlineDiv
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                {/* <FontSize14>
                답변이 도착하면 카카오톡으로 알려드립니다.
								</FontSize14> */}
              </InlineDiv>
            </RequestCompleteDesc>
          </RequestCompleteBox>
          <ButtonBox>
            <HomeBtn onClick={() => Router.push("/")}>홈으로 가기</HomeBtn>
            <MyProjectBtn onClick={() => Router.push("/project")}>
              내 프로젝트 보기
            </MyProjectBtn>
          </ButtonBox>
        </Containerv1>
      </Background>
    );
  }
}

export default MobileRequestComplete;

// global
const InlineDiv = styled.div`
  display: inline-flex;
`;

// img
const SuccessImg = styled.img`
  width: 39px;
  height: 39px;
`;

// fontsize
const FontSize26 = styled(Title.FontSize26)`
  font-weight: bold;
  line-height: 1.31;
  letter-spacing: -0.65px;
  color: #0a2165;
`;

const FontSize24 = styled(Title.FontSize24)`
  font-weight: bold;
  line-height: 1.67;
  letter-spacing: -0.6px;
  color: #282c36;
`;

const FontSize22 = styled(Title.FontSize22)`
  font-weight: normal;
  line-height: 1.82;
  letter-spacing: -0.55px;
  color: #282c36;
`;

const FontSize20 = styled(Title.FontSize20)`
  font-weight: bold;
  line-height: 2.6;
  letter-spacing: -0.5px;
  color: #ffffff;
`;

const FontSize18 = styled(Title.FontSize18)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;

  color: #0933b3;
  span {
    color: #282c36;
  }
`;

const FontSize14 = styled(Content.FontSize14)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.14 !important;
  letter-spacing: -0.35px !important;
  text-align: center;
  color: #282c36;
`;

// body
const RequestCompleteBox = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 226px;
  margin-top: 20px;
  margin-bottom: 40px;
  border: 20px solid #f6f6f6;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  background-color: #ffffff;
`;

const RequestCompleteTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const RequestCompleteDesc = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // margin-top: 30px;
  // margin-bottom: 90px;
  width: 100%;
  // margin-left: 5%;
  // margin-right: 5%;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 120px;
  // margin-left: 5%;
  // margin-right: 5%;
`;

const HomeBtn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 44px;
	border-radius: 5px;
	border: solid 1px #0933b3;
	cursor: pointer;
	font-size: 16px;
	margin-left : 5%;
	margin-right : 5%;
	font-weight: bold;
	line-height: 2.6;
	letter-spacing: -0.5px;
	color: #0933b3;
	}
	&:hover {
		transition: all 0.5s;
		border: solid 1px #0a2165;
		background-color: #f6f6f6;
		color: #0a2165;
	}
`;

const MyProjectBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 44px;
  border-radius: 5px;
  border: solid 1px #0933b3;
  cursor: pointer;
  background-color: #0933b3;
  font-size: 16px;
  font-weight: bold;
  line-height: 2.6;
  letter-spacing: -0.5px;
  margin-left: 5%;
  margin-right: 5%;
  color: #ffffff;
  &:hover {
    transition: all 0.5s;
    background-color: #0a2165;
  }
`;
