import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'
import Slider from "react-slick";

import ImageModal from "containers/Profile/Step2/ImageModal"

import RatioImage from 'components/RatioImage'
import * as Text from 'components/Text'
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'


class ImageBoxConatiner extends React.Component {
  state = {
    portfolioModalOpen: false,
  }

  openPortfolioModal = () => {
    this.setState({
      ...this.state,
      portfolioModalOpen: true,
    })
  }
  closePortfolioModal = () => {
    this.setState({
      ...this.state,
      portfolioModalOpen: false,
    })
  }

  slider = null
  sliderNext = () => {
    this.slider.slickNext()
  }
  sliderPrev = () => {
    this.slider.slickPrev()
  }
  render() {
    const {
      title, data, checkedList, imgField,
      postData, deleteData, toggleIsMain, updateCheckedIsMain,
    } = this.props

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
          }
        },
        {
          breakpoint: 630,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
          }
        },
      ],
    }
    return (
      <div>
        <ImageModal
          title={title}
          data={data}
          checkedList={checkedList}
          imgField={imgField}

          postData={postData}
          deleteData={deleteData}
          toggleIsMain={toggleIsMain}
          updateCheckedIsMain={updateCheckedIsMain}

          open={this.state.portfolioModalOpen}
          handleClose={this.closePortfolioModal}
        />

        <Header>
          <HeaderLeft>
            <Text.FontSize20 color={WHITE} fontWeight={700}>{title}</Text.FontSize20>
            <Text.FontSize18 color={WHITE} fontWeight={500}>{data.length}건</Text.FontSize18>
          </HeaderLeft>
          <HeaderRight>
            <Text.FontSize20 color={PRIMARY} fontWeight={500} onClick={this.openPortfolioModal}>
              수정하기
            </Text.FontSize20>
          </HeaderRight>
        </Header>
        <Content>

          <Slider {...settings} ref={slider => (this.slider = slider)}>
            {
              (data.length > 0)
                ? data.map((item, idx) => {
                  return <Image key={idx} ratio='65%' src={item[imgField]}/>
                })
                : (
                  <div className="heightBox"></div>
                )
            }
          </Slider>
          {
            data.length > 3 &&
              <>
                <Arrow left onClick={this.sliderPrev}/>
                <Arrow right onClick={this.sliderNext}/>
              </>
          }

        </Content>
      </div>
    )
  }
}

export default ImageBoxConatiner

const Image = styled(RatioImage)`
  margin-right: 10px;
  width: calc(100% - 10px);
`
const Arrow = styled.div`
  position: absolute;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  width: 60px;
  height: 60px;
  display: block;
  top: calc(50% - 30px);
  ${props => props.left && css`
    background-image: url('/static/icon/slick_left.png');
    left: -25px;
  `}
  ${props => props.right && css`
    background-image: url('/static/icon/slick_right.png');
    right: -25px;
  `}
`
const Header = styled.div`
  height: 55px;
  background-color: ${PRIMARY};

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 15px;
`
const HeaderLeft = styled.div`
  display: inline-flex;
  align-items: flex-end;
  
  > p:nth-of-type(1) {
    margin-right: 10px;
  }
`
const HeaderRight = styled.div`
  > p {
    cursor: pointer;
    box-sizing: border-box;
    width: fit-content;
    padding: 10px 15px;
    border-radius: 30px;
    background-color: ${WHITE};
  }
`

const Content = styled.div`
  position: relative;
  background-color: #f2f2f2;
  padding: 50px 20px;

  flex-wrap: wrap;
  > p {
    line-height: 1.3;
  }
  
  .heightBox {
    height: 145px;
  }
`
