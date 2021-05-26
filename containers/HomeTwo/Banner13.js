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

class Banner13Container extends React.Component {
  render() {
    return (
      <Background backgroundColor="#ffffff">
        <Containerv1
          style={{
            // paddingBottom: 306,
            // paddingTop: 308,
            justifyContent: "space-between",
          }}
        >
          {/* <Fade bottom> */}
          <Box>
            <div>
              {/* <Header>민감 정보 선택 공개 서비스</Header> */}
              <Middle>
                <p>제조업체를 온라인에서 바로 만나다</p>
              </Middle>
              <Body>
                <span>
                  "저희 사무실 근처에 이런 제품 만드는 공장이 없나요?"
                </span>
                <span>
                  국내 5000개 이상의 제조업체 네트워크를 통해 <br />
                  제조 업체수배를 온라인에서 쉽고 편하게 진행하세요.
                </span>
                <div onClick={() => Router.push("/producer")}>
                  <span>지금 업체 찾기</span>
                  <span>
                    <img src={passImg} />
                  </span>
                </div>
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
        </Containerv1>
      </Background>
    );
  }
}

export default Banner13Container;

const Box = styled.div`
  background-image: url("/static/images/banner_dot.png");
  background-position: center;
  background-size: cover;
  display: flex;
  width: 100%;
  padding-top: 90px;
  padding-bottom: 50px;
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
  > span:nth-of-type(1) {
    margin-bottom: 25px;
    display: block;
  }
  > span:nth-of-type(2) {
    font-size: 20px;
    // margin-bottom: 60px;
  }
  > div {
    cursor: pointer;
    margin-top: 60px;
    border: 2px solid #0933b3;
    border-radius: 4px;
    width: 316px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    > span:nth-of-type(1) {
      margin-right: 15px;
      font-size: 26px;
      line-height: 52px;
      letter-spacing: -0.65px;
      color: #0933b3;
      font-weight: 500;
    }
  }
`;
