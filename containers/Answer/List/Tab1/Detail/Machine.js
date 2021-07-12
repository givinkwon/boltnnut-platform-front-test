import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'
import Slider from "react-slick";

import RatioImage from 'components/RatioImage'
import * as Text from 'components/Text'
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'


@inject('Answer')
@observer
class MachineConatiner extends React.Component {
  slider = null
  sliderNext = () => {
    this.slider.slickNext()
  }
  sliderPrev = () => {
    this.slider.slickPrev()
  }
  render(){
    const { Answer } = this.props
    const { current_partner } = Answer

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
     <>
    { current_partner && current_partner.machine_set.length > 0 &&
      <div>
        <Header>
          <Text.FontSize20 color={WHITE} fontWeight={700}>보유 장비</Text.FontSize20>
        </Header>
        <Content>
          <Slider {...settings} ref={slider => (this.slider = slider)}>
            {
              current_partner && current_partner.machine_set.map((item, idx) => {
                return <Image key={idx} ratio='65%' src={item.img_machine}/>
              })
            }
          </Slider>
          {
            (current_partner && current_partner.machine_set.length > 0)
            && (
              <>
                <Arrow left onClick={this.sliderPrev}/>
                <Arrow right onClick={this.sliderNext}/>
              </>
            )
          }
        </Content>

      </div>
      }
      </>
    )
  }
}

export default MachineConatiner

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

  padding: 0 15px;
`
const Content = styled.div`
  position: relative;
  background-color: #f2f2f2;
  padding: 20px;

  flex-wrap: wrap;
  > p {
    line-height: 1.3;
  }
`
