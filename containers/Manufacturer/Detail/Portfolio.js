import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import Slider from "react-slick";

import RatioImage from "components/RatioImage";
import * as Text from "components/Text";
import { GRAY, DARKGRAY, PRIMARY, WHITE } from "static/style";

const rowline = "/static/images/components/Footer/rowline.svg";
const facebook_mob = "/static/images/components/Footer/facebook.svg";
const instargram_mob = "/static/images/components/Footer/instargram.svg";
const blog_mob = "/static/images/components/Footer/blog.svg";
const post_mob = "/static/images/components/Footer/post.svg";
const facebook = "/static/images/components/Footer/facebook_big.svg";
const instargram = "/static/images/components/Footer/instargram_big.svg";
const camera_img = "/static/images/camera_img.png";

@inject("Answer")
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
    console.log(src);
    this.setState({ modalOpen: true, src: src });
  };
  render() {
    const { Answer } = this.props;
    // const { current_partner } = Answer

    var settings = {
      dots: false,
      infinite: false,
      arrows: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 630,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
          },
        },
      ],
    };
    return (
      <>
        {/* { current_partner && current_partner.portfolio_set.length > 0 && */}
        <div id="portfolio">
          {/* <Header>
            <Text.FontSize20 color={WHITE} fontWeight={700}>
              포트폴리오
            </Text.FontSize20>
          </Header> */}
          <Content>
            <Slider {...settings} ref={(slider) => (this.slider = slider)}>
              {/* {
              current_partner && current_partner.portfolio_set.map((item, idx) => {
                return <Image key={idx} ratio='65%' src={item.img_portfolio}/>
              })
            } */}
              <Image
                ratio="65%"
                src={camera_img}
                onClick={() => {
                  // console.log(this);
                  // console.log(this.slider.props.children[0].props.src);
                  const src = this.slider.props.children[0].props.src;
                  this.activeHandler(src);
                }}
              />
              <Image
                ratio="65%"
                src={camera_img}
                onClick={() => {
                  // console.log(this);
                  // console.log(this.slider.props.children[0].props.src);
                  const src = this.slider.props.children[1].props.src;
                  this.activeHandler(src);
                }}
              />
              <Image
                ratio="65%"
                src={camera_img}
                onClick={() => {
                  // console.log(this);
                  // console.log(this.slider.props.children[0].props.src);
                  const src = this.slider.props.children[2].props.src;
                  this.activeHandler(src);
                }}
              />
              <Image
                ratio="65%"
                src={instargram}
                onClick={() => {
                  // console.log(this);
                  // console.log(this.slider.props.children[0].props.src);
                  const src = this.slider.props.children[3].props.src;
                  this.activeHandler(src);
                }}
              />
            </Slider>
            {
              // (current_partner && current_partner.portfolio_set.length > 0)
              //   && (
              <>
                <Arrow left onClick={this.sliderPrev} />
                <Arrow right onClick={this.sliderNext} />
              </>
              // )
            }
          </Content>
          {this.state.modalOpen && (
            <Modal>
              <button
                className="close"
                onClick={() => {
                  this.setState({ modalOpen: false, src: "" });
                }}
              >
                {" "}
                &times;{" "}
              </button>
              <Image src={this.state.src} modal="modal" />
            </Modal>
          )}
        </div>
        {/* } */}
      </>
    );
  }
}

export default PortfolioConatiner;

const Image = styled(RatioImage)`
  margin-right: 10px;

  width: ${(props) => (props.modal === "modal" ? "80%" : "calc(100% - 10px)")};
  height: ${(props) => (props.modal === "modal" ? "80%" : "")};
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
      left: -25px;
    `}
  ${(props) =>
    props.right &&
    css`
      background-image: url("/static/icon/slick_right.png");
      right: -25px;
    `}
`;
const Header = styled.div`
  height: 55px;
  background-color: ${PRIMARY};

  display: flex;
  align-items: center;

  padding: 0 15px;
`;
const Content = styled.div`
  position: relative;
  background-color: #f2f2f2;
  padding: 20px;

  flex-wrap: wrap;
  > p {
    line-height: 1.3;
  }
`;

const Modal = styled.div`
  width: 600px;
  height: 600px;
  position: absolute;
  //bottom: 0;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  button {
    float: right;
    // border: 3px solid red;
    position: absolute;
    top: 0;
    right: 0;
  }
`;
