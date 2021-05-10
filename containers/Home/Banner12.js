import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import * as Content from "components/Content";
import Fade from "react-reveal/Fade";
import Buttonv1 from "components/Buttonv1";
import Router from "next/router";

const image1 = "/static/images/Home/Banner12/Banner12_img1_2.png";
const image2 = "/static/images/Home/Banner12/Banner12_img2.png";
const image3 = "/static/images/Home/Banner12/Banner12_img3_2.png";
const Ellipse = "/static/images/Home/Banner12/Ellipse.png";
const backgroundImg = "/static/images/Home/Banner5/Banner5_Bg.png";

class Banner12Container extends React.Component {
  render() {
    return (
      <Background backgroundColor="#f6f6f6">
        <Fade bottom>
          <MainTitle>
            <Font56>가장 빠르고 편하게 제조업체를 찾고 소통하세요</Font56>
            {/* <Font48>3단계 프로세스</Font48> */}
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
                  <Header>1. 원하는 제품을 만들었던 <br/>업체 검색이 한 번에</Header>
                  <Body>
                    내가 원하는 제품을 만들었던 제조업체를 <br />
                    볼트앤너트를 통해 바로 검색하세요. <br />
                    지역별, 업력별 필터를 통해 원하는 조건의 <br />
                    전문업체 검색이 가능합니다. <br />
                  </Body>
                  <Buttonv1
                    onClick={() => Router.push("/request")}
                    style={{ width: "304px", height: "64px" }}
                    fontSize="23"
                  >
                    바로 업체 찾아보기
                  </Buttonv1>
                </Contents>
                <ImgBox
                  width={800}
                  height={420}
                  style={{ position: "relative" }}
                >
                  <div style={{ position: "absolute" }}></div>
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
                  <Header>2. 안전 거래 보장 <br/>프리미엄 파트너</Header>
                  <Body>
                    평균 업력 30년 이상의 업체 중 업체 실사가 완료된 <br />
                    프리미엄 파트너와 계약을 맺어보세요. <br />
                    볼트앤너트는 프리미엄 파트너와 계약시 <br />
                    에스크로 서비스와 안전거래를 보장합니다.
                  </Body>
                  <Buttonv1
                    onClick={() => Router.push("/request")}
                    style={{ width: "304px", height: "64px" }}
                    fontSize="23"
                  >
                    바로 무료 상담 받기
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
                  <Header>3. 해외 공장 생산<br/>견적 바로 알아보기</Header>
                  <Body>
                    볼트앤너트는 중국,인도네시아를 비롯 <br />
                    세계 각지 파트너 공장과 제휴를 맺고 있습니다. <br />
                    해외 생산 견적이 필요하신 경우 <br />
                    별도 문의가 가능합니다.<br />
                  </Body>
                </Contents>
                <ImgBox width={800} height={360}>
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
  align-self: center;
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
