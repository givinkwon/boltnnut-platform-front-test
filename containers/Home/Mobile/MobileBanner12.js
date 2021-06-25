import React from "react";
import styled from "styled-components";
import Containerv1 from "../../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import * as Content from "components/Content";
import Fade from "react-reveal/Fade";
import Buttonv1 from "components/Buttonv1";
import Router from "next/router";

const image1 = "/static/images/Home2/Banner13_img1.png";
const image2 = "/static/images/Home2/Banner13_img2.png";
const image3 = "/static/images/Home/Banner12/Banner12_img3.png";
const Ellipse = "/static/images/Home/Banner12/Ellipse.png";
const backgroundImg = "/static/images/Home/Banner5/Banner5_Bg.png";

class MobileBanner12Container extends React.Component {
  state = {
    width: null,
  };
  componentDidMount() {
    this.setState({ ...this.state, width: window.innerWidth });
    console.log(this.state.width);
  }
  render() {
    const { width } = this.props;
    return (
      <Background backgroundColor="#f6f6f6">
        <Fade bottom>
          <MainTitle>
            <Font23>온라인 업체 수배를 위한</Font23>
            <Font23 style={{ color: "#0933b3" }}>3단계 프로세스</Font23>
          </MainTitle>
        </Fade>

        <Containerv1
          style={{
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "100%" }}>
            <Fade bottom>
              <ContainerBox>
                <ImgBox>
                  <img src={image1} style={{ width: `${width - 48}px` }} />
                </ImgBox>
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
                {/* <Buttonv1
                    onClick={() => Router.push("/request")}
                    style={{ width: "304px", height: "64px" }}
                    fontSize="23"
                  >
                    지금 무료 가견적 받기
                  </Buttonv1> */}
              </ContainerBox>

              <ContainerBox>
                <ImgBox>
                  <img src={image2} style={{ width: `${width - 48}px` }} />
                </ImgBox>
                <Header>
                  2. 업체 찾기 서비스로 <br />
                  프리미엄 파트너
                </Header>
                <Body>
                  검색을 통해 원하는 제조사를 찾지 못하셨나요?
                  <br />
                  간단한 업체 수배 요청으로
                  <br />
                  5000 개의 제조사를 만나보세요.
                  <br />
                  채팅과 통화 등 다양한 형태로 소통할 수 있습니다.
                  <br />
                  *원하는 제조사만 민감 정보를
                  <br />볼 수 있게 공개 할 수 있습니다.
                </Body>
                {/* <Buttonv1
                  onClick={() => Router.push("/request")}
                  style={{ width: "304px", height: "64px" }}
                  fontSize="23"
                >
                  1:1 컨설팅 받기
                </Buttonv1> */}
              </ContainerBox>

              <ContainerBox>
                <ImgBox>
                  <img src={image3} style={{ width: `${width - 48}px` }} />
                </ImgBox>
                <Header>
                  3. 안전 거래 보장 <br />
                  프리미엄 파트너
                </Header>
                <Body>
                  평균 업력 30년 이상의 업체 중 업체 실사가 완료된 <br />
                  프리미엄 파트너와 계약을 맺어보세요. <br />
                  볼트앤너트는 프리미엄 파트너와 계약시
                  <br />
                  에스크로 서비스와 안전거래를 보장합니다. <br />
                </Body>
              </ContainerBox>
            </Fade>
          </div>
        </Containerv1>
      </Background>
    );
  }
}

export default MobileBanner12Container;

const MainTitle = styled.div`
  margin-top: 100px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Font48 = styled(Title.FontSize48)`
  font-weight: bold;
  color: #0933b3;
`;
const Font23 = styled(Content.FontSize22)`
  font-size: 23px !important;
  font-weight: bold;
  line-height: 32px;
  letter-spacing: -0.58px;
`;

const ContainerBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  //margin-bottom: 267px;
  position: relative;
`;

const Header = styled.div`
  //color: #e8eeff;
  font-size: 20px;
  color: #282c36;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 32px;
  letter-spacing: -0.5px;
  margin: 16px 0;
  text-align: center;
`;
const Body = styled(Title.FontSize16)`
  //color: #f6f6f6;
  color: #414550;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
  margin-bottom: 100px;
  text-align: center;
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
  // //   position: absolute;
`;
