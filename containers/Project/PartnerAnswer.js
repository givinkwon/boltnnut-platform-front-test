import React from "react";
import styled from "styled-components";
import Background from "../../components/Background";
import Containerv1 from "../../components/Containerv1";
import * as Title from "../../components/Title";
import Router from "next/router";

const infoImg = "static/images/info.svg";

class PartnerAnswer extends React.Component {
  render() {
    return (
      <Background>
        <Containerv1>
          <Wrap>
            <MainBox>
              <MainInnerBox>
                <FontSize26>실리콘 반려동물 샤워기</FontSize26>

                <ProjectInfoBox>
                  <InlineDiv>
                    <FontSize18 style={{ color: "#86888c" }}>
                      예상금액
                    </FontSize18>
                  </InlineDiv>
                </ProjectInfoBox>
              </MainInnerBox>
            </MainBox>
            <SubBox>
              <InlineDiv
                style={{ justifyContent: "space-around", width: "133px" }}
              >
                <img src={infoImg} />
                <FontSize18
                  style={{
                    fontWeight: "500",
                    color: "#0933b3",
                  }}
                >
                  프로젝트 답변
                </FontSize18>
              </InlineDiv>

              <InlineDiv style={{ width: "150px", textAlign: "center" }}>
                <FontSize14>
                  프로젝트 답변을 해주시면 1:1 채팅 및 비공개 자료를 요청하실 수
                  있습니다.
                </FontSize14>
              </InlineDiv>
            </SubBox>
          </Wrap>
        </Containerv1>
      </Background>
    );
  }
}

export default PartnerAnswer;

// global
const InlineDiv = styled.div`
  display: inline-flex;
`;

// fontsize
const FontSize26 = styled(Title.FontSize26)`
  font-weight: bold;
  line-height: 1.31;
  letter-spacing: -0.65px;
  color: #282c36;
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
  font-weight: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
  color: #111111;
`;

const FontSize14 = styled.p`
  font-family: NotoSansCJKkr;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.86;
  letter-spacing: -0.14px;
  color: #282c36;
`;

// body
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin-top: 50px;
  margin-bottom: 43px;
`;

const MainBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 996px;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  background-color: #ffffff;
`;

const MainInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 932px;
`;

const SubBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 180px;
  height: 137px;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 520px;
`;

const HomeBtn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 242px;
	height: 61px;
	border-radius: 5px;
	border: solid 1px #0933b3;
	cursor: pointer;
	font-size: 20px;
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
  width: 242px;
  height: 61px;
  border-radius: 5px;
  border: solid 1px #0933b3;
  cursor: pointer;
  background-color: #0933b3;
  font-size: 20px;
  font-weight: bold;
  line-height: 2.6;
  letter-spacing: -0.5px;
  color: #ffffff;
  &:hover {
    transition: all 0.5s;
    background-color: #0a2165;
  }
`;

const ProjectInfoBox = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 932px;
  height: 63px;
  border-radius: 5px;
  border: solid 1px #c6c7cc;
`;
