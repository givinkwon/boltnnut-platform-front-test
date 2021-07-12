import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from "react-reveal/Fade";
import Router from "next/router";
import KSLink from "components/KSLink";

const image1 = "/static/images/banner_dot.png";
const passImg = "/static/images/pass7.png";
const backgroundImg = "/static/images/Home/Banner5/Banner5_Bg.png";

class TabletBanner13Container extends React.Component {
  render() {
    const { width } = this.props;
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Containerv2 width={this.props.width}>
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

                <div>
                  <Button>
                    <div>
                      <KSLink url={"producer"} content={"업체 정보 조회"} />
                    </div>
                    <img src={passImg} />
                  </Button>
                  {/* </div> */}
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
        </Containerv2>
      </div>
    );
  }
}

export default TabletBanner13Container;

const Containerv2 = styled(Containerv1)`
  // padding-left: 100px;
  // padding-right: 30px;
  // background-image: url("/static/images/banner_dot.png");
  // background-position: center;
  // background-size: cover;

  // padding-left: 450px;
  background-image: url(/static/images/banner_dot.png);
  background-position: 65%;
  background-position-y: top;
  background-size: 1070px 400px;
  background-repeat: no-repeat;
  width: 100%;
`;

const Container = styled.div`
  // padding-left: 100px;
  // padding-right: 30px;
  // background-image: url("/static/images/banner_dot.png");
  // background-position: center;
  // background-size: cover;

  // padding-left: 450px;
  padding-left: ${(props) =>
    props.width
      ? 17 *
        (props.width / 700) *
        (props.width / 700) *
        (props.width / 700) *
        (props.width / 500)
      : ""}px;
  padding-right: 30px;
  background-image: url(/static/images/banner_dot.png);
  background-position: 74%;
  background-position-y: top;
  background-size: 1070px 400px;
  background-repeat: no-repeat;
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  width: 100%;
  padding-top: 80px;
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
const Middle = styled(Title.FontSize26)`
  font-size: 24px !important;
  color: #282c36;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  margin-bottom: 44px;

  > p {
    font-weight: bold;
  }
`;
const Body = styled(Title.FontSize18)`
  // white-space:nowrap;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #555963;
  > div:nth-of-type(1) {
    // text-align: center;
    > span {
      font-size: 18px;
      display: block;
    }
    // > span:nth-of-type(1) {
    //   margin-bottom: 25px;
    //   display: block;
    // }

    // > span:nth-of-type(2) {
    //   font-size: 14px;
    //   // margin-bottom: 60px;
    // }
  }
  // > div:nth-of-type(2) {
  //   display: flex;
  //   // justify-content: center;
  //   align-items: center;
  //   > div {
  //     cursor: pointer;
  //     margin-top: 30px;
  //     border: 2px solid #0933b3;
  //     border-radius: 4px;
  //     width: 215px;
  //     height: 40px;
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     > span:nth-of-type(1) {
  //       margin-right: 15px;
  //       font-size: 16px;
  //       line-height: 52px;
  //       letter-spacing: -0.65px;
  //       color: #0933b3;
  //       font-weight: 500;
  //     }
  //     > span:nth-of-type(2) {
  //       padding-top: 8px;
  //       > img {
  //         width: 9px;
  //         height: 18px;
  //       }
  //     }
  //   }
  // }
`;

const Button = styled.button`
  background: none;
  cursor: pointer;
  margin-top: 30px;
  border: 2px solid #0933b3;
  border-radius: 4px;
  width: 215px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
  > div {
    margin-right: 15px;
    font-size: 16px;
    line-height: 52px;
    letter-spacing: -0.65px;
    color: #0933b3;
    font-weight: 500;
  }
  > img {
    width: 9px;
    height: 18px;
  }
`;
