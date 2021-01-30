import React from 'react'

import RequestCard from 'components/RequestCard'
import {inject, observer} from "mobx-react";
import {PRIMARY, WHITE, DARKGRAY, BLACK, BLACK1} from "static/style";
import styled, {css} from 'styled-components'
import * as Text from 'components/Text'
import Container from "components/Container";


// slicker
import Slider from "react-slick";
const search_ic = 'static/icon/search.png'
const right = 'static/icon/right-arrow.png'
import RatioImage from 'components/RatioImage'
import Router from 'next/router'

class HomeRequestContainer extends React.Component {
  state = {
    current: 1,
    next: true,
    prev: false,
  };

  afterChangeHandler = (current) => {
    if(current === 0){
      this.setState({next: true, prev: false})
    }
    else {
      // slidesToShow : 2
      if(current === 1) {
        this.setState({next: false, prev: true})
      }
      else {
        this.setState({next: true, prev: true})
      }
    }
    console.log(this.state.current+"alka salsa")
    console.log(this.state.next + "next", this.state.prev + "prev")
  }

  sliderNext = () => {
    const breakpoint = this.slider.state.breakpoint
    this.slider.slickNext()
  }
  sliderPrev = () => {
    if(this.state.current === 0) {
      this.setState({ prev: false,  next: true })
    }
    else {
      this.setState({ prev: true })
    }
    this.slider.slickPrev()
  }

  render() {
    const { prev, next } = this.state
    const settings = {
      dots: true,
      infinite: false,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: (current) => {
        this.setState({current: current})
      },
    };

    return (
      <Banner>
          <Text.FontSize40 color={BLACK1} fontWeight={700}>이런 의뢰가 빗발치고 있읍니다!</Text.FontSize40>
          <br/>
          <Text.FontSize40 color={BLACK1} fontWeight={700}>로그인스근하게박으십시오.</Text.FontSize40>

        <FindExperct>
          <List>
            <Slider {...settings} ref={slider => (this.slider = slider)} afterChange={this.afterChangeHandler}>
              <ItemBox onClick={() => Router.push(`/signup`)}>
                <Item>
                  <Card ratio='40%'>
                    <div className='body'>
                      <div className='badge'>
                        <Text.FontSize20 color={WHITE} fontWeight={500}>
                          ㅎㅇ
                        </Text.FontSize20>
                      </div>
                        <Text.FontSize18 color="#4d4f5c70" fontWeight={400} style={{marginTop: 20, marginBottom:10}}>
                          잡화
                        </Text.FontSize18>
                        <Text.FontSize32 style={{marginBottom: 20}} fontWeight={600}>
                          가자미자동해체기구
                        </Text.FontSize32>
                        <Text.FontSize18 fontWeight={500} color="#4d4f5c99" style={{fontFamily: 'Montserrat, sans-serif'}}>
                          2020.08.09
                        </Text.FontSize18>
                      </div>
                      <div className='end_date active'>
                        <Text.FontSize18 style={{marginBottom: 2, marginTop: 2}} fontWeight={500}>
                          상세 정보를 확인해 보세요.
                        </Text.FontSize18>
                      </div>
                      <p className='footer'>
                        가입하기
                      </p>
                  </Card>
                </Item>
              </ItemBox>

              <ItemBox>
                <Item>
                  <Card ratio='40%'>
                    <div className='body'>
                      <div className='badge'>
                        <Text.FontSize20 color={WHITE} fontWeight={500}>
                          헬로우
                        </Text.FontSize20>
                      </div>
                        <Text.FontSize18 color="#4d4f5c70" fontWeight={400} style={{marginTop: 20, marginBottom:10}}>
                          금속
                        </Text.FontSize18>
                        <Text.FontSize32 style={{marginBottom: 20}} fontWeight={600}>
                          작년달력
                        </Text.FontSize32>
                        <Text.FontSize18 fontWeight={500} color="#4d4f5c99" style={{fontFamily: 'Montserrat, sans-serif'}}>
                          2020.08.09
                        </Text.FontSize18>
                      </div>
                      <div className='end_date active'>
                        <Text.FontSize18 style={{marginBottom: 2, marginTop: 2}} fontWeight={500}>
                          상세 정보를 확인해 보세요.
                        </Text.FontSize18>
                      </div>
                      <p className='footer'>
                        가입하기
                      </p>
                  </Card>
                </Item>
              </ItemBox>

            </Slider>
            <Arrow left onClick={this.sliderPrev} style={{display: prev ? "block" : "none"}}/>
            <Arrow right onClick={this.sliderNext} style={{display: next ? "block" : "none"}}/>
          </List>
        </FindExperct>
      </Banner>
    )
  }
}

export default HomeRequestContainer

const Arrow = styled.div`
  position: absolute;
  v
  background-size: cover;
  background-position: center;
  width: 60px;
  height: 60px;
  display: block;
  top: calc(50% - 30px);
  ${props => props.left && css`
    background-image: url('/static/icon/slick_left.png');
    left: -25px;
    @media (min-width: 0px) and (max-width: 767.98px) {
      left: -15px;
    }
  `}
  ${props => props.right && css`
    background-image: url('/static/icon/slick_right.png');
    right: -25px;
    @media (min-width: 0px) and (max-width: 767.98px) {
      right: -15px;
    }
  `}
`
const Banner = styled(Container)`
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 0px;
    margin-bottom: 20px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 40px 0px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 60px 0px;
  }
  @media (min-width: 1300px) {
    padding: 80px 0px;
  }
`

const Card = styled(RatioImage)`
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  box-shadow: 0 0 10px 0 rgba(122, 135, 167, 0.4);
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100% - 155px);

    > p:nth-of-type(2) {
      margin-bottom: 20px;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      text-align: center;
      //line-height: 1.3em;
      //max-height: 2.6em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

    }
  }
  .footer {
    position: absolute;
    bottom: 0;

    margin-top: auto;
    width: calc(100%);
    padding: 25px 0 !important;
    background-color: ${PRIMARY};
    color: #fff;
    display: flex;
    justify-content: center;
    align-items:center;
  }
  .end_date {
    border-top: 2px dashed #e4e6ed;
    height: 85px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .end_date.active > p {
    line-height: 1.25em;
    text-align: center;
  }
  .badge {
    background-color: ${PRIMARY};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    > p {
      /* 위 좌우 아래 */
      padding: 6px 12px 6px;
      text-align: center;
    }

  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    max-width: 300px;
    height: fit-content;
    ::before {
      margin-top: 0;
    }

    > div {
      position: relative;
      height: fit-content;
    }

    .end_date {
      height: 80px;
    }
    .body {
      height: fit-content;
      padding: 40px 0;
    }
    .footer {
      position: relative;
    }
  }
  ${props => props.disabled && css`
    opacity: 0.6;
    background-color: #f1f2f5;
  `}
`
const Item = styled.div`
  > p {
    text-align: center;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 16px);
    margin: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    > p {
      margin-top: 20px;
    }
  }
  @media (min-width: 630px) {
    width: calc(100% - 16px);
    margin: 8px;
    > p {
      margin-top: 20px;
    }
  }
`

const CardBody = styled.div`
	padding: 30px 40px;
	p {
		line-height: 1.3em;
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
		padding: 30px 20px 15px;
	}
`

const Title = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	box-sizing: border-box;
	padding: 0 0 15px;
	border-bottom: 1px solid #efefef;

	> p {
		line-height: 1.3em;
		max-height: 1.3em;
		overflow: hidden;
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
		display: block;
		p {
			word-break: keep-all;
		}
		>div {
			width: fit-content;
			margin-top: 12px;
			margin-left: auto;
		}
	}
	@media (min-width: 768px) and (max-width: 991.98px) {
		>p {
			margin-bottom: 3px;
		}
	}
`
const Remaining = styled.div`
	background-color: #e4e6ed50;
	border-radius: 26px;
	padding: 5px 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (min-width: 0px) and (max-width: 767.98px) {
		padding: 5px 15px;
	}
	>p:nth-of-type(1) {
		padding-top: 1px;
	}
`
const Content = styled.div`
	padding: 15px 5px;
	> p {
		line-height: 1.3em;
		max-height: 2.6em;
		overflow: hidden;
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
		> p {
			line-height: 1.3em;
			max-height: 3.9em;
			overflow: hidden;
		}
	}
`
const RequestInfo = styled.div`
	padding: 17px 20px;
	background-color: #dededf60;

	>div, >div>div, >div>div>div {
		display: flex;
		align-items: flex-start;
	}
	>div {
		margin-bottom: 12px;
		:last-child {
			margin-bottom: 0;
		}
	}
	>div>div {
		flex: 1;
	}
	/* 2번째 줄 */
	>div:nth-of-type(2) {
		p {
			padding: 3px 8px;
		}
	}
	>div>div>div {
		flex: 1;
		align-items: center;
		flex-wrap: wrap;

		/* 의뢰분야 항목들 */
		>p {
			padding: 3px 8px;
		}
	}
	/* 우선순위 높은 */
	> div > div > p:nth-of-type(1) {
		flex-grow: 0;
		flex-shrink: 0;
		background-color: white;
		padding: 3px 15px;
		margin-right: 15px;
		border-radius: 2px;
	}

	/* 코인 */
	> div:nth-of-type(3) {
		> div {
			align-items: center !important;

			> p:nth-of-type(1) {
				margin-right: 23px !important;
			}
		}
	}

	> div > div {
		> p:nth-of-type(1) {
			width: 75px;
			text-align: center;
		}
	}

	@media (min-width: 0px) and (max-width: 991.98px) {
		padding: 17px 10px;
		>div {
			flex-direction: column;
		}
		>div>div:nth-of-type(1) {
			margin-bottom: 12px;
		}
		> div:nth-of-type(3) {
			>div {
				margin-bottom: 0;
			}
		}

		> div > div {
			> p:nth-of-type(1) {
				width: 60px;
				text-align: center;
			}
		}
	}
`
const PriceInfo = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
	margin-right: 10px;
	> div {
		display: flex;
		align-items: flex-start;
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
		flex-direction: column;
		> div {
			padding-top: 3px;
			padding-left: 8px;
		}
	}
`
const Negotiation = styled.div`
	width: 20px;
	height: 20px;
	background-color: white;
	border: 1px solid #9597a6;
	border-radius: 3px;
	@media (min-width: 992px) {
		margin-top: 3px;
	}
`

const Button = styled.button`
	cursor: pointer;
	background-color: #efefef60;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	width: 100%;
	padding: 10px 0;
	border: 1px solid ${PRIMARY}60;
	:focus {
		outline: 0;
	}
`

const Icon = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
  align: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 30px;
    height: 30px;
  }
  ${props => props.prev && css`
    transform: rotate(180deg);
  `}
`

const ItemBox = styled.div`
  :focus {
    outline: none;
  }
`

const FindExperct = styled(Container)`
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 20px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`
const List = styled.div`
  position: relative;

  .slick-track {
    overflow-y: hidden !important;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 40px;
    .slick-track {
      height: 380px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 50px;
    .slick-track {
      height: 310px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 60px;
    .slick-track {
      height: 430px;
    }
  }
  @media (min-width: 1300px) {
    margin-top: 60px;
    .slick-track {
      height: 530px;
    }
  }
`