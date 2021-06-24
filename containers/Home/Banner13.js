import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from "react-reveal/Fade";
import Router from "next/router";

const image1 = "/static/images/banner_dot.png";
const passImg = "/static/images/pass7.png";
const backgroundImg = "/static/images/Home/Banner5/Banner5_Bg.png";
const lock = "static/images/Home/lock.svg";

class Banner13Container extends React.Component {
  render() {
    return (
      <Container width={this.props.width}>
        {/* <Fade bottom> */}
        <Box>
          <div>
            {/* <Header>민감 정보 선택 공개 서비스</Header> */}
            <Middle>
              <p>대한민국 제조사 정보 여기 다 있다.</p>
            </Middle>
            <Body>
              <div>
                <span>포트폴리오, 계약 후기 상세 조회 가능!</span>
                <span>남동공단, 창원 등 전국 5000여 개 제조사 정보</span>
                <span>바로 조회하세요</span>
              </div>

              <div onClick={() => Router.push("/producer")}>
                <span>업체 정보 조회</span>
                <span>
                  <img src={passImg} />
                </span>
              </div>

              {/* <div
                style={{
                  color: "#ffffff",
                  lineHeight: 1.5,
                  fontSize: 18,
                  opacity: 0.8,
                  marginTop: 6,
                }}
              >
                <img src={lock} style={{ marginRight: 8 }} />
                민감 정보는 비공개로 작성 후 선택 공개하세요
              </div> */}
            </Body>
          </div>
          {/* <img
              src={image1}
              //   style={{ transform: "translate(-20%, -60%) scale(0.7)" }}
            /> */}
          {/* <Header>민감 정보 선택 공개 서비스</Header>
              <Middle>
                <p>
                  원하는 업체만 <br />
                  정보 공개 및 소통
                </p>
              </Middle>
              <Body>
                민감한 연구개발 정보는 내가 소통하고
                <br />
                검증한 업체에게만 공개할 수 있습니다.
              </Body> */}
        </Box>
        {/* <div>
            <Header>민감 정보 선택 공개 서비스</Header>
            <Middle>
              <p>
                원하는 업체만 <br />
                정보 공개 및 소통
              </p>
            </Middle>
            <Body>
              민감한 연구개발 정보는 내가 소통하고
              <br />
              검증한 업체에게만 공개할 수 있습니다.
            </Body>
          </div> */}
        {/* </Fade> */}
      </Container>
    );
  }
}

export default Banner13Container;

const Container = styled.div`
  // padding-left: 100px;
  // padding-right: 30px;
  // background-image: url("/static/images/banner_dot.png");
  // background-position: center;
  // background-size: cover;

  // padding-left: 450px;
  padding-left: ${(props) =>
    props.width
      ? 30 *
        (props.width / 1300) *
        (props.width / 1300) *
        (props.width / 1300) *
        (props.width / 900)
      : ""}px;
  padding-right: 30px;
  background-image: url(/static/images/banner_dot.png);
  background-position: 50%;
  background-position-y: top;
  background-size: 1400px 600px;
  background-repeat: no-repeat;
  width: 100%;
`;
const Box = styled.div`
  display: flex;
  width: 100%;
  padding-top: 100px;
  padding-bottom: 85px;
`;
const Header = styled(Title.FontSize20)`
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
`;
const Middle = styled(Title.FontSize48)`
  color: #282c36;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  margin-bottom: 72px;

  > p {
    font-weight: bold;
  }
`;
const Body = styled(Title.FontSize24)`
  // white-space:nowrap;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #555963;

  > div:nth-of-type(1) {
    text-align: center;
    > span {
      display: block;
      font-size: 32px;
      color: #282c36;
    }
  }

  // > span:nth-of-type(1) {
  //   margin-bottom: 25px;
  //   display: block;
  //   color: #282c36;
  // }
  // > span:nth-of-type(2) {
  //   font-size: 20px;
  //   // margin-bottom: 60px;
  // }
  > div:nth-of-type(2) {
    cursor: pointer;
    margin-top: 60px;
    border: 2px solid #0933b3;
    border-radius: 4px;
    width: 316px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    > span:nth-of-type(1) {
      margin-right: 15px;
      font-size: 26px;
      line-height: 52px;
      letter-spacing: -0.65px;
      color: #0933b3;
      font-weight: 500;
    }
    > span:nth-of-type(2) {
      padding-top: 6px;
      > img {
        width: 14px;
        height: 24px;
      }
    }
  }
`;