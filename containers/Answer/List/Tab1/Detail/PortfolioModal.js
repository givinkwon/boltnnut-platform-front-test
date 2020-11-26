import React, {Component} from 'react'
import styled, {css} from 'styled-components'
import Slider from "react-slick";
import { withRouter } from 'next/router'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import * as Text from 'components/Text'
import ResponsiveImage from 'components/ResponsiveImage'
import CloseModalButton from "components/CloseModalButton";

import { PRIMARY } from 'static/style'


class PortfolioModal extends Component {
	handleClick = async () => {
		const {handleClose} = this.props

		await handleClose()
	}

  slider = null
  sliderNext = () => {
    this.slider.slickNext()
  }
  sliderPrev = () => {
    this.slider.slickPrev()
  }
  toDetail = (item) => {
    if(!item.disabled){
      console.log("toDetail")
      Router.push(`/answer/${item.id}`)
    }
  }

	render() {
		const {open, handleClose, portfolio_set} = this.props

    var settings = {
      dots: true,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          }
        },
        {
          breakpoint: 630,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          }
        }
      ]
    }

		return (
			<StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="portfolio-modal"
        aria-describedby="portfolio-modal"
      >
        <DialogHeader>
					<CloseModalButton handleClose={handleClose} />
        	<Text.FontSize28 color={PRIMARY} fontWeight={500}>
        	 포트폴리오
        	</Text.FontSize28>
        </DialogHeader>

        <DialogBody>
          <PortfolioBox>
              <Slider {...settings} ref={slider => (this.slider = slider)}>
                {
                  portfolio_set && portfolio_set.map((item, idx) => {
                    return (
                      <ResponsiveImage key={idx} src={item.img_portfolio} />
                    )
                  })
                }
              </Slider>
              <Arrow left onClick={this.sliderPrev}/>
              <Arrow right onClick={this.sliderNext}/>
            </PortfolioBox>
        </DialogBody>
      </StyledDialog>
		)
	}
}

export default withRouter(PortfolioModal)

const StyledDialog = styled(Dialog)`
	@media (min-width: 0px) and (max-width: 767.98px) {
    > div {
    	:nth-of-type(3) {
    		> div {
    			max-width: 500px;
    		}
    	}
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  	> div {
    	:nth-of-type(3) {
    		> div {
    			width: 720px;
    			max-width: 720px;
    		}
    	}
    }
  }
  @media (min-width: 992px) {
    > div {
    	:nth-of-type(3) {
    		> div {
    			width: 964px;
    			max-width: 964px;
    		}
    	}
    }
  }
`
const DialogHeader = styled(DialogTitle)`
  padding: 10px 15px;
`
const DialogBody = styled(DialogContent)`
	position: relative;
	background-color: #f5f5f5;
  padding: 30px 24px;
`

const Arrow = styled.div`
  position: absolute;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  width: 50px;
  height: 50px;
  display: block;
  top: calc(50% - 15px);
  ${props => props.left && css`
    background-image: url('/static/icon/slick_left.png');
    left: -15px;
  `}
  ${props => props.right && css`
    background-image: url('/static/icon/slick_right.png');
    right: -15px;
  `}

  @media (min-width: 630px) and (max-width: 991.98px) {
    top: calc(50% - 15px);
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) { 
  }

  @media (min-width: 1300px) { 
  }
`

const PortfolioBox = styled.div`
  position: relative;

  .slick-slider {
    margin-bottom: 30px;
  }
  .slick-track {
    display: flex;
    align-items: center;
  }
  .slick-arrow {
    display: none !important;
  }
  .slick-slide {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
  }
  .slick-slide img {
    max-height: 60vh !important;
  }

  @media (min-width: 0px) and (max-width: 629.98px) {
    .slick-track > div {
    }
  }
`
