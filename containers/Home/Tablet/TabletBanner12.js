import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import * as Content from "components/Content";
import Fade from "react-reveal/Fade";
import Buttonv1 from "components/Buttonv1";
import Router from "next/router";

const image1 = "/static/images/Home2/Banner13_img1.png";
const image2 = "/static/images/Home2/Banner13_img2.png";
const image3 = "/static/images/Home2/Banner13_img3.png";
const Ellipse = "/static/images/Home/Banner12/Ellipse.png";
const backgroundImg = "/static/images/Home/Banner5/Banner5_Bg.png";

class TabletBanner12Container extends React.Component {
  render() {
    return (
      <Background backgroundColor="#f6f6f6" style={{ padding: "100px 0" }}>
        <Fade bottom>
          <MainTitle>
            <Font40>온라인 업체 수배를 위한</Font40>
            <Font32>3단계 프로세스</Font32>
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
                backgroundColor: "#f6f6f6",
                zIndex: "1",
              }}
            />
            <img
              src={Ellipse}
              style={{
                position: "absolute",
                left: "187px",
                top: "39%",
                backgroundColor: "#f6f6f6",
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
                width: "194px",
                height: "1px",
                backgroundColor: "#a4aab4",
                position: "absolute",
                top: "78px",
              }}
            ></div>
            <div
              style={{
                width: "1px",
                height: "145px",
                backgroundColor: "#a4aab4",
                position: "absolute",
                top: "78px",
                left: "195px",
              }}
            />
          </div>
        </Fade>

        <Containerv1
          style={{
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "100%" }}>
            <Fade bottom>
              <ContainerBox>
                <Contents>
                  <Header>
                    1. 원하는 제품을 만들었던 <br />
                    업체 검색이 한 번에
                  </Header>
                  <Body>
                    내가 원하는 제품을 만들었던 제조업체를 <br />
                    볼트앤너트를 통해 바로 검색하세요. <br />
                    지역별, 입력별 필터를 통해 원하는 조건의 <br />
                    전문업체 검색이 가능합니다. <br />
                  </Body>
                  <Buttonv1
                    onClick={() => Router.push("/producer")}
                    style={{
                      width: "180px",
                      height: "40px",
                      marginTop: "25px",
                    }}
                    fontSize="13"
                  >
                    바로 무료 상담 받기
                  </Buttonv1>
                </Contents>
                <ImgBox
                  width={369}
                  height={260}
                  style={{ position: "relative" }}
                >
                  <div style={{ position: "absolute" }}></div>
                  <img src={image1} style={{ width: "96%", height: "56%" }} />
                  <div
                    style={{
                      width: "1px",
                      height: "126px",
                      backgroundColor: "#a4aab4",
                      position: "absolute",
                      bottom: 0,
                      left: "165px",
                    }}
                  />
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
                    right: "154px",
                    top: "64%",
                    backgroundColor: "#f6f6f6",
                    zIndex: "1",
                  }}
                />
                <img
                  src={Ellipse}
                  style={{
                    position: "absolute",
                    left: "17%",
                    top: "64%",
                    backgroundColor: "#f6f6f6",
                    zIndex: "1",
                  }}
                />
                <div
                  style={{
                    width: "1px",
                    height: "165px",
                    backgroundColor: "#a4aab4",
                    position: "absolute",
                    left: "calc(100% - 162px)",
                  }}
                />
                <div
                  style={{
                    width: "420px",
                    height: "1px",
                    backgroundColor: "#a4aab4",
                    position: "absolute",
                    top: "165px",
                    left: "calc(0% + 139px)",
                  }}
                ></div>
                <div
                  style={{
                    width: "1px",
                    height: "87px",
                    backgroundColor: "#a4aab4",
                    position: "absolute",
                    top: "165px",
                    left: "130px",
                  }}
                />
              </div>
              <ContainerBox>
                <ImgBox
                  style={{ marginRight: "140px" }}
                  width={307}
                  height={328}
                >
                  <img src={image2} style={{ width: "255px" }} />
                </ImgBox>
                <Contents>
                  <Header>
                    2. 안전 거래 보장 <br />
                    프리미엄 파트너
                  </Header>
                  <Body>
                    평균 업력 30년 이상의 업체 중 업체 실사가 완료된 <br />
                    프리미엄 파트너와 계약을 맺어보세요. <br />
                    볼트앤너트는 프리미엄 파트너와 계약시
                    <br />
                    에스크로 서비스와 안전거래를 보장합니다. <br />
                  </Body>
                  <Buttonv1
                    onClick={() => Router.push("/request")}
                    style={{
                      width: "180px",
                      height: "40px",
                      marginTop: "25px",
                    }}
                    fontSize="13"
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
                    right: "22%",
                    top: "64%",
                    backgroundColor: "#f6f6f6",
                    zIndex: "1",
                  }}
                />
                <img
                  src={Ellipse}
                  style={{
                    position: "absolute",
                    left: "18%",
                    top: "64%",
                    backgroundColor: "#f6f6f6",
                    zIndex: "1",
                  }}
                />
                <div
                  style={{
                    width: "1px",
                    height: "163px",
                    backgroundColor: "#a4aab4",
                    position: "absolute",
                    left: "137px",
                    top: "-3px",
                  }}
                />
                <div
                  style={{
                    width: "405px",
                    height: "1px",
                    backgroundColor: "#a4aab4",
                    position: "absolute",
                    top: "167px",
                    left: "calc(0% + 144px)",
                  }}
                ></div>
                <div
                  style={{
                    width: "1px",
                    height: "87px",
                    backgroundColor: "#a4aab4",
                    position: "absolute",
                    top: "165px",
                    left: "553px",
                  }}
                />
              </div>
              <ContainerBox>
                <Contents>
                  <Header>
                    3. 해외 공장 생산 <br /> 견적 바로 알아보기
                  </Header>
                  <Body>
                    볼트앤너트는 중국, 인도네시아를 비롯 <br />
                    세계 각지 파트너 공장과 제휴를 맺고 있습니다. <br />
                    해외 생산 견적이 필요한 경우 <br />
                    별도 문의가 가능합니다. <br />
                  </Body>
                </Contents>
                <ImgBox width={458} height={235}>
                  <img src={image3} style={{ width: "340px" }} />
                </ImgBox>
              </ContainerBox>
            </Fade>
          </div>
        </Containerv1>
      </Background>
    );
  }
}

export default TabletBanner12Container;

const MainTitle = styled.div`
  // margin-top: 64px;
  margin-bottom: 29px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Font32 = styled(Title.FontSize32)`
  font-weight: bold;
  color: #0933b3;
`;
const Font40 = styled(Title.FontSize40)`
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
  font-size: 26px;
  color: #282c36;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 43px;
  letter-spacing: -1px;
  //margin-bottom: 16px;
  margin-bottom: 30px;
`;
const Body = styled(Title.FontSize18)`
  //color: #f6f6f6;
  color: #282c36;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 26px;
  letter-spacing: -0.6px;
  // margin-bottom: 7 0px;
`;

const ImgBox = styled.div`
  // width: ${(props) => (props.width ? props.width : "")}px;
  // height: ${(props) => (props.height ? props.height : "")}px;
  // //height: 481px;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  // border-radius: 10px;
  // padding: 14px 10px 20px 14px;
  // background-color: #ffffff;
  // box-sizing: border-box;
  > img {
    width: ${(props) => (props.width ? props.width : "")}px;
    height: ${(props) => (props.height ? props.height : "")}px;
    // height: 341px;
  }
`;
