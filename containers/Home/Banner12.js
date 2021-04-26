import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import * as Content from "components/Content";
import Fade from "react-reveal/Fade";
import Buttonv1 from "components/Buttonv1";
import Router from "next/router";

const image1 = "/static/images/Home/Banner12/Banner12_img1.png";
const image2 = "/static/images/Home/Banner12/Banner12_img2.png";
const image3 = "/static/images/Home/Banner12/Banner12_img3.png";
const Ellipse = "/static/images/Home/Banner12/Ellipse.png";
const backgroundImg = "/static/images/Home/Banner5/Banner5_Bg.png";

class Banner12Container extends React.Component {
  render() {
    return (
      <Background backgroundColor="#ffffff">
        <Fade bottom>
          <MainTitle>
            <Font56>볼트앤너트 제조상담을 위한</Font56>
            <Font48>3단계 프로세스</Font48>
          </MainTitle>

          <div
            style={{
              width: "1px",
              position: "relative",
              height: "180px",
            }}
          >
            <img
              src={Ellipse}
              style={{
                position: "absolute",
                right: "-7px",
                top: "39%",
                backgroundColor: "#ffffff",
                zIndex: "1",
              }}
            />
            <img
              src={Ellipse}
              style={{
                position: "absolute",
                left: "407px",
                top: "39%",
                backgroundColor: "#ffffff",
                zIndex: "1",
              }}
            />
            <div
              style={{
                width: "1px",
                height: "78px",
                backgroundColor: "#a4aab4",
                position: "absolute",
              }}
            />
            <div
              style={{
                width: "415px",
                height: "1px",
                backgroundColor: "#a4aab4",
                position: "absolute",
                top: "78px",
              }}
            ></div>
            <div
              style={{
                width: "1px",
                height: "108px",
                backgroundColor: "#a4aab4",
                position: "absolute",
                top: "78px",
                left: "415px",
              }}
            />
          </div>
        </Fade>

        <Containerv1
          style={{
            paddingBottom: 250,
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "100%" }}>
            <Fade bottom>
              <ContainerBox>
                <Contents>
                  <Header>1. 문의 사항 입력하기</Header>
                  <Body>
                    문의하고자 하는 정보를 적어주세요. <br />
                    민감 정보는 비공개로 제조사의 정보 확인 후 <br />
                    공개 처리 할 수 있습니다. <br />
                    *도면이 있다면 자동 견적을 받아 볼 수 있습니다. <br />
                  </Body>
                  <Buttonv1
                    onClick={() => Router.push("/request")}
                    style={{ width: "304px", height: "64px" }}
                    fontSize="23"
                  >
                    지금 무료 가견적 받기
                  </Buttonv1>
                </Contents>
                <ImgBox
                  width={369}
                  height={481}
                  style={{ position: "relative" }}
                >
                  <div style={{ position: "absolute" }}>d</div>
                  <img src={image1} />
                </ImgBox>
              </ContainerBox>
              <div
                style={{
                  width: "100%",
                  position: "relative",
                  height: "250px",
                }}
              >
                <img
                  src={Ellipse}
                  style={{
                    position: "absolute",
                    right: "15%",
                    top: "64%",
                    backgroundColor: "#ffffff",
                    zIndex: "1",
                  }}
                />
                <img
                  src={Ellipse}
                  style={{
                    position: "absolute",
                    left: "16%",
                    top: "64%",
                    backgroundColor: "#ffffff",
                    zIndex: "1",
                  }}
                />
                <div
                  style={{
                    width: "1px",
                    height: "165px",
                    backgroundColor: "#a4aab4",
                    position: "absolute",
                    left: "calc(100% - 188px)",
                  }}
                />
                <div
                  style={{
                    width: "818px",
                    height: "1px",
                    backgroundColor: "#a4aab4",
                    position: "absolute",
                    top: "165px",
                    left: "calc(0% + 200px)",
                  }}
                ></div>
                <div
                  style={{
                    width: "1px",
                    height: "87px",
                    backgroundColor: "#a4aab4",
                    position: "absolute",
                    top: "165px",
                    left: "200px",
                  }}
                />
              </div>
              <ContainerBox>
                <ImgBox
                  style={{ marginRight: "304px" }}
                  width={387}
                  height={512}
                >
                  <img src={image2} />
                </ImgBox>
                <Contents>
                  <Header>2. 제조사의 상담 확인하기</Header>
                  <Body>
                    제조사는 공개정보를 확인하고 간단한 댓글 문의 혹은 <br />
                    상세한 제안 문의를 진행할 수 있습니다. <br />
                  </Body>
                  <Buttonv1
                    onClick={() => Router.push("/request")}
                    style={{ width: "304px", height: "64px" }}
                    fontSize="23"
                  >
                    1:1 컨설팅 받기
                  </Buttonv1>
                </Contents>
              </ContainerBox>
              <div
                style={{
                  width: "100%",
                  position: "relative",
                  height: "250px",
                }}
              >
                <img
                  src={Ellipse}
                  style={{
                    position: "absolute",
                    right: "15%",
                    top: "64%",
                    backgroundColor: "#ffffff",
                    zIndex: "1",
                  }}
                />
                <img
                  src={Ellipse}
                  style={{
                    position: "absolute",
                    left: "16%",
                    top: "64%",
                    backgroundColor: "#ffffff",
                    zIndex: "1",
                  }}
                />
                <div
                  style={{
                    width: "1px",
                    height: "165px",
                    backgroundColor: "#a4aab4",
                    position: "absolute",
                    left: "200px",
                  }}
                />
                <div
                  style={{
                    width: "818px",
                    height: "1px",
                    backgroundColor: "#a4aab4",
                    position: "absolute",
                    top: "165px",
                    left: "calc(0% + 200px)",
                  }}
                ></div>
                <div
                  style={{
                    width: "1px",
                    height: "87px",
                    backgroundColor: "#a4aab4",
                    position: "absolute",
                    top: "165px",
                    left: "calc(100% - 188px)",
                  }}
                />
              </div>
              <ContainerBox>
                <Contents>
                  <Header>3. 제조사와 소통하기</Header>
                  <Body>
                    제조사의 회사 정보와 상담 내용을 확인하고 <br />
                    적합한 제조사와 소통해보세요. <br />
                    채팅과 통화 등 다양한 형태로 소통할 수 있습니다. <br />
                    *원하는 제조사만 민감 정보를 볼 수 있게 <br />
                    공개 할 수 있습니다. <br />
                  </Body>
                </Contents>
                <ImgBox width={588} height={370}>
                  <img src={image3} />
                </ImgBox>
              </ContainerBox>
            </Fade>
          </div>
        </Containerv1>
      </Background>
    );
  }
}

export default Banner12Container;

const MainTitle = styled.div`
  margin-top: 64px;
  margin-bottom: 29px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Font48 = styled(Title.FontSize48)`
  font-weight: bold;
  color: #0933b3;
`;
const Font56 = styled(Title.FontSize56)`
  font-weight: bold;
  margin-bottom: 20px;
`;

const ContainerBox = styled.div`
  width: 100%;
  display: flex;
  //margin-bottom: 267px;
`;
const Contents = styled.div`
  width: 100%;
`;
const Header = styled.div`
  //color: #e8eeff;
  font-size: 40px;
  color: #282c36;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 92px;
  letter-spacing: -1px;
  margin-bottom: 16px;
`;
const Body = styled(Title.FontSize24)`
  //color: #f6f6f6;
  color: #282c36;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 40px;
  letter-spacing: -0.6px;
  margin-bottom: 70px;
`;

const ImgBox = styled.div`
  width: ${(props) => (props.width ? props.width : "")}px;
  height: ${(props) => (props.height ? props.height : "")}px;
  //height: 481px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 14px 10px 20px 14px;
  background-color: #ffffff;
  box-sizing: border-box;
`;
