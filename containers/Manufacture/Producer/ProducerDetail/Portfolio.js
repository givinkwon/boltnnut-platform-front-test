import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import Slider from "react-slick";

import RatioImage from "components/RatioImage";
import * as Text from "components/Text";
import { GRAY, DARKGRAY, PRIMARY, WHITE } from "static/style";
import { toJS } from "mobx";
import BlackBox from "./BlackBox";

const rowline = "/static/images/components/Footer/rowline.svg";
const facebook_mob = "/static/images/components/Footer/facebook.svg";
const instargram_mob = "/static/images/components/Footer/instargram.svg";
const blog_mob = "/static/images/components/Footer/blog.svg";
const post_mob = "/static/images/components/Footer/post.svg";
const facebook = "/static/images/components/Footer/facebook_big.svg";
const instargram = "/static/images/components/Footer/instargram_big.svg";
const camera_img = "/static/images/camera_img.png";
const banner1_img = "/static/images/Home/Banner1/Banner1_img.png";
const banner_dot_img = "/static/images/Home/Banner12/Banner12_img1.png";
const banner9_img = "/static/images/Home/Banner9/Banner9_img1.png";

@inject("Partner", "Auth", "Answer", "Producer")
@observer
class PortfolioConatiner extends React.Component {
  state = {
    modalOpen: false,
    src: "",
  };

  slider = null;
  sliderNext = () => {
    this.slider.slickNext();
  };
  sliderPrev = () => {
    this.slider.slickPrev();
  };

  activeHandler = (src) => {
    this.setState({ modalOpen: true, src: src });
  };

  componentDidMount = async () => {
    const { Partner, Auth, width } = this.props;

    const img = document.getElementById("image");
  };
  render() {
    const { width, data, Auth } = this.props;

    let notLoginUser = false;
    if (!Auth.logged_in_client && !Auth.logged_in_partner) {
      notLoginUser = true;
    }

    var settings = {
      dots: false,
      infinite: false,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      draggable: false,
      swipeToSlide: false,
      touchMove: false,
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 630,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
          },
        },
      ],
    };
    console.log(data.portfolio_set);
    return (
      <>
        <div
          id="portfolio"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Content>
            {data.portfolio_set.length != 0 ? (
              <Slider {...settings} ref={(slider) => (this.slider = slider)}>
                {data.portfolio_set.map((item, idx) => {
                  return (
                    <Image
                      key={idx}
                      ratio="65%"
                      size="contain"
                      repeat="no-repeat"
                      src={item.img_portfolio}
                    />
                  );
                })}
              </Slider>
            ) : (
              <>
                <NoPortfolio>
                  <div>
                    <span>포트폴리오가 준비되지 않았습니다.</span>
                  </div>
                </NoPortfolio>
              </>
            )}

            {data && data.portfolio_set.length > 0 && !notLoginUser && (
              <>
                <Arrow left onClick={this.sliderPrev} />
                <Arrow right onClick={this.sliderNext} />
              </>
            )}
          </Content>

          {this.state.modalOpen && (
            <Modal width={width}>
              <button
                className="close"
                onClick={() => {
                  this.setState({ modalOpen: false, src: "" });
                }}
              >
                {" "}
                &times;{" "}
              </button>
              <Image
                src={this.state.src}
                modal="modal"
                size="contain"
                repeat="no-repeat"
                style={{ backgroundRepeat: "no-repeat" }}
              />
            </Modal>
          )}
          {this.state.modalOpen && <Layer />}
        </div>
        {notLoginUser && (
          <BlackBox top="80" content="이 제조사의 포트폴리오를 보고싶다면?" />
        )}
        <Footer>
          {notLoginUser && <Block />}

          <SmallImageContainer login={notLoginUser}>
            {data.portfolio_set.length != 0 &&
              data.portfolio_set.map((item, idx) => {
                return (
                  <SmallImageBox>
                    <img
                      src={item.img_portfolio}
                      onClick={() => {
                        const src = this.slider.props.children[idx].props.src;
                        this.activeHandler(src);
                      }}
                    />
                  </SmallImageBox>
                );
              })}
          </SmallImageContainer>
        </Footer>
      </>
    );
  }
}

export default PortfolioConatiner;

const Image = styled(RatioImage)`
  margin-right: 10px;

  width: ${(props) => (props.modal === "modal" ? "90%" : "calc(100% - 10px)")};
  height: ${(props) => (props.modal === "modal" ? "90%" : "")};
  cursor: pointer;
  // :hover {
  //   transform: scale(1.5);
  // }
`;
const Arrow = styled.div`
  position: absolute;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  width: 60px;
  height: 60px;
  display: block;
  top: calc(50% - 30px);
  ${(props) =>
    props.left &&
    css`
      background-image: url("/static/icon/slick_left.png");
      left: -50px;
    `}
  ${(props) =>
    props.right &&
    css`
      background-image: url("/static/icon/slick_right.png");
      right: -50px;
    `}

    @media (max-width: 479.98px) {
    width: 30px;
    height: 30px;
    display: block;
    top: calc(50% - 10px);

    ${(props) =>
      props.left &&
      css`
        background-image: url("/static/icon/slick_left.png");
        left: -13px;
      `}
    ${(props) =>
      props.right &&
      css`
        background-image: url("/static/icon/slick_right.png");
        right: -13px;
      `}
  }
  @media (min-width: 480px) and (max-width: 629.98px) {
    width: 35px;
    height: 35px;
    display: block;
    top: calc(50% - 20px);

    ${(props) =>
      props.left &&
      css`
        background-image: url("/static/icon/slick_left.png");
        left: -20px;
      `}
    ${(props) =>
      props.right &&
      css`
        background-image: url("/static/icon/slick_right.png");
        right: -20px;
      `}
  }

  @media (min-width: 630px) and (max-width: 1300px) {
    width: 40px;
    height: 40px;
    display: block;
    top: calc(50% - 20px);

    ${(props) =>
      props.left &&
      css`
        background-image: url("/static/icon/slick_left.png");
        left: -30px;
      `}
    ${(props) =>
      props.right &&
      css`
        background-image: url("/static/icon/slick_right.png");
        right: -30px;
      `}
  }
`;
const Header = styled.div`
  height: 55px;
  background-color: ${PRIMARY};

  display: flex;
  align-items: center;

  padding: 0 15px;
`;
const Content = styled.div`
  width: 85%;
  position: relative;
  //background-color: #f2f2f2;
  padding: 20px;

  flex-wrap: wrap;
  > p {
    line-height: 1.3;
  }

  @media (max-width: 767.98px) {
    width: 80%;
    padding: 0 20px;
    margin-top: 20px;
  }
`;

const Modal = styled.div`
  position: absolute;
  //bottom: 0;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  //background-color: #000000;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 101;
  button {
    // border: 3px solid red;
    position: absolute;
    top: 0;
    right: 0;

    outline: none;
    cursor: pointer;
    border: 0;

    font-size: 21px;
    font-weight: 700;
    //margin-left: 10px;
    margin: 10px 10px 0 0;
    float: right;
    color: #000000;
    border-radius: 50%;
    background-color: #f1f1f1;
  }

  @media (max-width: 479.98px) {
    width: ${(props) => (props.width ? props.width - 20 : 0)}px;
    // width: 200px;
    height: 200px;
    top: 25%;
  }

  @media (min-width: 480px) and (max-width: 767.98px) {
    width: ${(props) => (props.width ? props.width - 100 : 0)}px;
    height: 300px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 400px;
    height: 400px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 550px;
    height: 550px;
  }
  @media (min-width: 1300px) {
    width: 700px;
    height: 700px;
  }
`;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.4);

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const NoPortfolio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    // border: 2px solid #0933b3;
    // border-radius: 3px;
    height: 50px;
    width: 50%;
    box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.5);
    > span {
      font-size: 28px;
      line-height: 24px;
      color: #0933b3;
      font-weight: bold;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      height: 30px;
      width: 60%;
      > span {
        font-size: 10px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > div {
      > span {
        font-size: 18px;
      }
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    > div {
      > span {
        font-size: 18px;
      }
    }
  }
`;

const SmallImageContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
`;
const SmallImageBox = styled.div`
  width: 169px;
  height: 123px;
  flex: 0 0 auto;
  border: 1px solid #707070;
  border-radius: 3px;
  margin-right: 10px;
  cursor: pointer;

  > img {
    width: 100%;
    height: 100%;
  }
`;

const Footer = styled.div`
  position: relative;
  filter: blur(9px);
`;
const Block = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
`;
