import React from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import Router from "next/router";

import Container from "components/Container";
import RatioImage from "components/RatioImage";
import * as Text from "components/Text";
import { BLACK1, DARKGRAY } from "static/style";

const right = "static/icon/right-arrow.png";

class ContentConatiner extends React.Component {
  state = {
    current: 1,
    next: true,
    prev: false,
  };
  slider = null;
  afterChangeHandler = (current) => {
    if (current === 0) {
      this.setState({ next: true, prev: false });
    } else {
      if (this.slider.state.breakpoint) {
        // slidesToShow : 2
        if (current === this.props.data.category_set.length - 2) {
          this.setState({ next: false, prev: true });
        } else {
          this.setState({ next: true, prev: true });
        }
      } else {
        // slidesToShow : 3
        if (current === this.props.data.category_set.length - 3) {
          this.setState({ next: false, prev: true });
        } else {
          this.setState({ next: true, prev: true });
        }
      }
    }
  };
  sliderNext = () => {
    const breakpoint = this.slider.state.breakpoint;
    this.slider.slickNext();
  };
  sliderPrev = () => {
    if (this.state.current === 0) {
      this.setState({ prev: false, next: true });
    } else {
      this.setState({ prev: true });
    }
    this.slider.slickPrev();
  };
  render() {
    const { prev, next } = this.state;
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      beforeChange: (current) => {
        this.setState({ current: current });
      },
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <CustomContainer>
        <Header>
          <Text.FontSize40 color={BLACK1} fontWeight={700}>
            {this.props.data.maincategory}
          </Text.FontSize40>
          {this.props.data.category_set.length > 3 && (
            <>
              <Icon
                prev
                style={{ marginLeft: "auto", opacity: prev ? 1 : 0.4 }}
                src={right}
                onClick={this.sliderPrev}
              />
              <Icon
                style={{ opacity: next ? 1 : 0.4 }}
                src={right}
                onClick={this.sliderNext}
              />
            </>
          )}
        </Header>
        <List>
          <Slider
            {...settings}
            ref={(slider) => (this.slider = slider)}
            afterChange={this.afterChangeHandler}
          >
            {this.props.data.category_set.map((item, idx) => {
              return (
                <ItemBox
                  key={idx}
                  onClick={() =>
                    Router.push(
                      `/request?big=${item.maincategory}&mid=${item.id}`
                    )
                  }
                >
                  <Item>
                    <Image
                      ratio="50%"
                      src={item.middle_img}
                      onClick={() => this.setState({ tab: 1 })}
                    />
                    <Text.FontSize24 color="#4d4f5c" fontWeight={500}>
                      {item.category}
                    </Text.FontSize24>
                  </Item>
                </ItemBox>
              );
            })}
          </Slider>
        </List>
      </CustomContainer>
    );
  }
}

export default ContentConatiner;

const Header = styled.div`
  display: flex;
  align-items: center;
  
`;
const Icon = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 30px;
    height: 30px;
  }
  ${(props) =>
    props.prev &&
    css`
      transform: rotate(180deg);
    `}
`;
const CustomContainer = styled(Container)`
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 0px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 30px 0px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 40px 0px;
  }
  @media (min-width: 1300px) {
    padding: 60px 0px;
  }
`;
const List = styled.div`
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 25px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 30px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 30px;
  }
  @media (min-width: 1300px) {
    margin-top: 35px;
  }
`;
const ItemBox = styled.div`
  :focus {
    outline: none;
  }
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 15px);

  > p {
    margin-top: 25px;
    margin-left: 10px;
    margin-right: auto;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 20px;
    > p {
      margin-top: 25px;
    }
  }
  @media (min-width: 768px) {
    > p {
      margin-top: 20px;
    }
  }
`;
const Image = styled(RatioImage)`
  cursor: pointer;
  border-radius: 12px;
  
  width: calc(100% - 15px);
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    max-width: 400px;
  }
  > div {
    transition: 0.4s;
  }
  :hover {
    > div {
      transform: scale(1.2);
    }
  }
`;
