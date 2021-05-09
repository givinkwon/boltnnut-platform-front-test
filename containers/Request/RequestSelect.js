import React from "react";
import styled, { css, keyframes } from "styled-components";
import { inject, observer } from "mobx-react";

import Container from "components/Container";
import Section from "components/Section";
import ButtonComponent from "components/Button";
import SelectComponent from "components/Select";

import * as Text from "components/Text";
import * as Content from "components/Content";
import * as Title from "components/Title";

import { GRAY, DARKGRAY, PRIMARY, WHITE } from "static/style";

const search_ic = "static/icon/search.png";
const right = "/static/images/main/main_right.png";

const threedprinter = "/static/images/Home/Banner10/3Dprinter.svg";
const cnc = "/static/images/Home/Banner10/cnc.svg";
const mold = "/static/images/Home/Banner10/mold.svg";
const product = "/static/images/Home/Banner10/product.svg";
const machinery = "/static/images/Home/Mobile/MobileBanner10/machinery.svg";
const part = "/static/images/Home/Mobile/MobileBanner10/part.svg";

@inject("Request")
@observer
class RequestSelectContainer extends React.Component {
  state = {
    width: 0,
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  searchText = (e) => {
    this.setState({ search: e.target.value });
  };
  Next = (type) => {
    const { Request } = this.props;
    Request.request_type = type;
    // if(Request.request_type==="production")
    // {
    // //   Auth.setStep(1)
    //     // Request.step_index=2;
    //     this.props.DetailQuestion.loadSelectFromTitle(1);
    // }
    // else
    // {
    //     // Request.step_index=1;
    // }
    Request.step_index = 1;
  };
  // state={
  //   click: false,
  // }
  // testfunc = () => {
  //   this.setState({click: true});
  //   console.log(this.state.click);
  // }
  render() {
    const { Request } = this.props;
    const { width } = this.state;

    return (
      // <Section>
      //   <Container>
      <div style={{ flexDirection: "column", width: "100%" }}>
        {width > 767.98 ? (
          <>
            {/* <Box active={this.state.click===true} onClick ={this.testfunc}></Box> */}
            <HeadBox>
              <Font46>견적받기</Font46>
              <Font18 active={true}>
                나에게 맞는 제조방식을 선택해주세요.
              </Font18>
            </HeadBox>
            <ButtonBox>
              {/* <Button id="sign_uo_button_client" active={Request.request_type==="development"} onClick={() => Request.request_type="development"}> */}
              <Button
                id="sign_uo_button_client"
                active={Request.request_type === "development"}
                onClick={() => this.Next("development")}
              >
                {width > 1299.98 ? (
                  <ButtonText>
                    {/* 원래대로 */}
                    <Font26 style={{ height: 38, marginBottom: 24 }}>
                      생산
                    </Font26>
                    <Font20 style={{ height: 65 }}>
                      볼트앤너트 자동 견적 알고리즘과 전문 품질 감리 시스템 통해
                      원하는 품질의 생산품을 납기에 맞춰 납품드립니다.
                    </Font20>
                  </ButtonText>
                ) : (
                  <ButtonText>
                    {/* 원래대로 */}
                    <Font22 style={{ height: 38, marginBottom: 24 }}>
                      생산
                    </Font22>
                    <Font17 style={{ height: 65, wordBreak: "keep-all" }}>
                      볼트앤너트 자동 견적 알고리즘과 전문 품질 감리 시스템 통해
                      원하는 품질의 생산품을 납기에 맞춰 납품드립니다.
                    </Font17>
                  </ButtonText>
                )}

                <ImageBox>
                  <ImgContainer>
                    <Image1 src={threedprinter}></Image1>
                    <Font16>3D 프린터</Font16>
                  </ImgContainer>
                  <ImgContainer>
                    <Image1 src={cnc}></Image1>
                    <Font16>CNC</Font16>
                  </ImgContainer>
                  <ImgContainer>
                    <Image1 src={mold}></Image1>
                    <Font16>금형/사출</Font16>
                  </ImgContainer>
                </ImageBox>
              </Button>
              <Button
                id="sign_uo_button_partner"
                active={Request.request_type === "production"}
                onClick={() => this.Next("production")}
              >
                {width > 1299.98 ? (
                  <ButtonText>
                    {/* 바로 도면첨부 */}
                    <Font26 style={{ height: 38, marginBottom: 24 }}>
                      제작
                    </Font26>
                    <Font20 style={{ height: 65 }}>
                      제작하고자 하는 제품의 전문 엔지니어가 프로젝트를 관리하여
                      원하는 품질과 납기, 견적에 제작해드립니다.
                    </Font20>
                  </ButtonText>
                ) : (
                  <ButtonText>
                    {/* 바로 도면첨부 */}
                    <Font22 style={{ height: 38, marginBottom: 24 }}>
                      제작
                    </Font22>
                    <Font17 style={{ height: 65, wordBreak: "keep-all" }}>
                      제작하고자 하는 제품의 전문 엔지니어가 프로젝트를 관리하여
                      원하는 품질과 납기, 견적에 제작해드립니다.
                    </Font17>
                  </ButtonText>
                )}
                <ImageBox>
                  <ImgContainer>
                    <Image1 src={product}></Image1>
                    <Font16>제품</Font16>
                  </ImgContainer>

                  <ImgContainer>
                    <Image1 src={machinery}></Image1>
                    <Font16>기계/설비/장비</Font16>
                  </ImgContainer>
                  <ImgContainer>
                    <Image1 src={part}></Image1>
                    <Font16>부품/센서</Font16>
                  </ImgContainer>
                </ImageBox>
              </Button>
            </ButtonBox>
            {/* <NextButton backgroundColor={Request.request_type ? PRIMARY : '#0a2165'} borderColor={Request.request_type ? PRIMARY : '#e6e6e6'} borderRadius={3} onClick={this.Next}>
              <Text.FontSize24 color={Request.request_type ? WHITE : '#ffffff'} fontWeight={500}>다음</Text.FontSize24>
              <Image src={right}/>
            </NextButton> */}
          </>
        ) : (
          <ButtonBox>
            <Button
              id="sign_uo_button_client"
              active={Request.request_type === "development"}
              onClick={() => (Request.request_type = "development")}
            >
              <div style={{ margin: 0 }}>
                <span class="ButtonTextHeader">클라이언트</span>
                <span class="ButtonTextBody">의뢰를 하고자하는 의뢰자</span>
              </div>
            </Button>
            <Button
              id="sign_uo_button_partner"
              active={Request.request_type === "production"}
              onClick={() => (Request.request_type = "production")}
            >
              <div style={{ margin: 0 }}>
                <span class="ButtonTextHeader">전문가</span>
                <span class="ButtonTextBody">제조 전문성을 가진 제조사</span>
              </div>
            </Button>
          </ButtonBox>
        )}
      </div>
      //   </Container>
      // </Section>
    );
  }
}

export default RequestSelectContainer;

const Font46 = styled(Content.FontSize46)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.65;
  letter-spacing: -1.15px;
  color: #000000;
`;
const boxFade = keyframes`
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
`;

const Font18 = styled(Content.FontSize18)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.22;
  letter-spacing: -0.45px;
  color: #0933b3;
  animation: ${boxFade} 2s linear infinite;
`;

const Font17 = styled(Content.FontSize17)`
  font-weight: 500 !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: 1.7 !important;
  letter-spacing: -0.7px !important;
  color: #282c36;
`;

const Font26 = styled(Title.FontSize26)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.54 !important;
  letter-spacing: -0.65px !important;
  color: #0933b3;
`;

const Font20 = styled(Title.FontSize20)`
  font-weight: 500 !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: 1.8 !important;
  letter-spacing: -0.5px !important;
  color: #282c36;
`;

const Font22 = styled(Title.FontSize22)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.54 !important;
  letter-spacing: -0.65px !important;
  color: #0933b3;
`;

const Font16 = styled(Content.FontSize16)`
  font-weight: 500 !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: 1.25 !important;
  letter-spacing: -0.4px !important;
  color: #414550;
`;

const Image = styled.img`
  width: 9px;
  height: 17px;
  margin-left: 4px;
  margin-top: 4px;
`;
// const Info = styled.div`
//   > p {
//     color: #aaaaaa;
//     text-align: center;
//     @media (min-width: 0px) and (max-width: 767.98px) {
//       margin-top: 30px;
//     }
//     @media (min-width: 768px) {
//       margin-top: 30px;
//     }
//   }
// `

const HeadBox = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  p {
    text-align: center;
  }
  margin-top: 180px;

  @media (min-width: 768px) and (max-width: 1299.98px) {
    margin-top: 40px;
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 160px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 2px;
    div:nth-of-type(1) {
      margin-right: 6px;
    }
    div:nth-of-type(2) {
      margin-left: 6px;
    }
  }
  @media (min-width: 768px) and (max-width: 1299.98px) {
    margin-top: 40px;
    div:nth-of-type(1) {
      margin-right: 8px;
    }
    div:nth-of-type(2) {
      margin-left: 8px;
    }
  }

  @media (min-width: 1300px) {
    margin-top: 60px;
    > div:nth-of-type(1) {
      margin-right: 12px;
    }
    > div:nth-of-type(2) {
      margin-left: 12px;
    }
  }
`;
const Button = styled.div`
  cursor: pointer;
  width: 588px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border: 1px solid #c7c7c7;
  border-radius: 10px;
  box-sizing: border-box;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  :active {
    border: 4px solid #0933b3;
    box-shadow: 0 3px 6px 0 var(--black-16);

    > div > p {
      color: #0933b3;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 192px;
    text-align: center;
    align-items: center;
    :hover {
      border: 2px solid #0933b3;
      box-shadow: 0 3px 6px 0 var(--black-16);
    }
    span {
      display: block;
    }
    .ButtonTextHeader {
      font-size: 20px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.15;
      letter-spacing: -0.5px;
      color: #191919;
    }
    .ButtonTextBody {
      font-size: 12px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.17;
      letter-spacing: -0.3px;
      color: #767676;
      margin-top: 7px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 340px;
    padding: 0 15px;
    width: 355px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    height: 400px;
    padding: 0 15px;
  }
  @media (min-width: 1300px) {
    height: 420px;
    padding: 0 54px;
    // padding-top: 59px;
    // padding-bottom: 64px;
  }
`;

const ButtonText = styled.div`
  justify-content: space-between;
`;

const ImageBox = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  width: 344px;
  margin-top: 66px;
  margin-left: 0px !important;

  @media (min-width: 768px) and (max-width: 991.98px) {
    justify-content: space-evenly;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    justify-content: space-around;
  }
`;

const Image1 = styled.img`
  width: 68px;
  height: 70px;
`;

const ImgContainer = styled.div`
  width: 68px;
  height: 104px;
  white-space: nowrap;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  align-content: space-evenly;
  > p {
    margin-top: 10px;
  }
`;
// const Box = styled.div`
// width: 50px;
// height: 50px;
// background-color: red;
// ${props => props.active && css`

//   display: flex;
//   width: 500px;
//   height: 500px;

//     `}
// `
