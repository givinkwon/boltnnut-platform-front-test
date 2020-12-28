import React from 'react'
import styled, {css} from 'styled-components'
import Router from 'next/router'
import Slider from "react-slick";
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'
import RatioImage from 'components/RatioImage'
import * as Text from 'components/Text'
import { BLACK1, DARKGRAY, WHITE, PRIMARY } from 'static/style'

/*
const data = [
  {id:1, name: "제조 스타트업이 망하는 72가지 이유", image: 'static/images/main/2-1.png', disabled: true},
  {id:2, name: "제품을 만드려면 특허는 기본?", image: 'static/images/main/2-2.png', disabled: false},
  {id:3, name: "제조 스타트업이 망하는 72가지 이유", image: 'static/images/main/2-1.png', disabled: false},
  {id:3, name: "제조 스타트업이 망하는 72가지 이유", image: 'static/images/main/2-1.png', disabled: true},
]
 */

@inject('Answer')
@observer
class FindExperctConatiner extends React.Component {
  state = { width: 0 }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
    console.log('window width: ' + window.innerWidth)
  };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  slider = null
  sliderNext = () => {
    this.slider.slickNext()
  }
  sliderPrev = () => {
    this.slider.slickPrev()
  }
  toDetail = (item) => {
    console.log("toDetail")
    if (item.apply_count === 0) {
      alert('볼트앤너트 파트너스가 의뢰서를 분석 중입니다. 제안서가 곧 도착합니다');
      return;
    }

    Router.push(`/answer/${item.id}`)
  }
  render() {
    const {Answer} = this.props
    const data = Answer.requests

    var settings = {
      dots: false,
      infinite: false,
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
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
      ],
      beforeChange: (oldIndex, newIndex) => {
        const {Answer} = this.props

        // 8번째, 18번째, ...이고 nextPage가 있을 경우 상태 업데이트?
        // 상태가 업데이트 되면 리렌더링
        // initialSlide 값을 조정하기
        let prevItemNum = this.state.width > 630 ? (oldIndex + 3) : (oldIndex + 2)
        let nextItemNum = this.state.width > 630 ? (newIndex + 3) : (newIndex + 2)

        console.log(`${prevItemNum} -> ${nextItemNum}번째 item`)

        if(Answer.requests && nextItemNum === (Answer.requests.length-2)) {
          console.log('의뢰 목록 갱신하자(' + nextItemNum + ', ' + (Answer.requests.length-2) + ')')
          Answer.loadNextClientRequestList()
        }
      }
    };
    return (
      <FindExperct>
        <List>
          <Slider {...settings} ref={slider => (this.slider = slider)}>
          {
            data.map((item, idx) => {
              console.log(item)
              // ToDo: 유틸로 빼기
              const now = new Date()
              const created_at_date = new Date(item.created_at)
              let due_at_date = new Date(created_at_date.getTime())
              // 마감일을 만들어진지 하루 뒤로 설정함
              due_at_date.setDate(due_at_date.getDate() + 1)

              const created_at = '' +
                created_at_date.getUTCFullYear() + '.' +
                (created_at_date.getUTCMonth() + 1) + '.' +
                created_at_date.getUTCDate()

              const due_at = '' +
                due_at_date.getUTCFullYear() + '.' +
                (due_at_date.getUTCMonth() + 1) + '.' +
                due_at_date.getUTCDate()

              const subclass = Answer.getSubclassById(item.product)
              let category = null
              let mainCategory = null
              if(subclass) {
                category = Answer.getCategoryById(subclass.category)
                mainCategory = Answer.getMainCategoryById(subclass.maincategory)
              }

              return (
                <ItemBox key={item.id} onClick={() => this.toDetail(item)}>
                  <Item>
                    <Card ratio='135%'>
                      <div className='body'>
                        <div className='badge'>
                          <Text.FontSize20 color={WHITE} fontWeight={500}>
                            {mainCategory && mainCategory.maincategory}
                          </Text.FontSize20>
                        </div>
                        <Text.FontSize18 color="#4d4f5c70" fontWeight={400} style={{marginTop: 20, marginBottom:10}}>
                          {category && category.category}
                        </Text.FontSize18>
                        <Text.FontSize32 style={{marginBottom: 20}} fontWeight={600}>
                          {item.name ? item.name : '의뢰서 확인하기'}
                        </Text.FontSize32>
                        <Text.FontSize18 fontWeight={500} color="#4d4f5c99" style={{fontFamily: 'Montserrat, sans-serif'}}>
                          {created_at}
                        </Text.FontSize18>
                      </div>

                       {/*{item.active
                              ? (*/}
                                <div className='end_date active'>
                                  <Text.FontSize18 style={{marginBottom: 2, marginTop: 2}} fontWeight={500}>
                                    전문 제조사 정보를<br/>
                                    확인해보세요.
                                  </Text.FontSize18>
                                </div>
                              {/*)
                              : (
                                <div className='end_date'>
                                  <Text.FontSize18 style={{marginBottom: 2, marginTop: 2}} fontWeight={500}>해당 요청 의뢰가 마감되었습니다.</Text.FontSize18>
                                  <Text.FontSize18 color={DARKGRAY} fontWeight={500}>{due_at} 마감</Text.FontSize18>
                                </div>
                              )

                      }*/}

                      <p className='footer'>
                          {item.apply_count}개의 제안서 확인
                      </p>
                    </Card>
                  </Item>
                </ItemBox>
              )
            })
          }
          </Slider>
          <Arrow left onClick={this.sliderPrev}/>
          <Arrow right onClick={this.sliderNext}/>
        </List>
      </FindExperct>
    )
  }
}

export default FindExperctConatiner

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
const ItemBox = styled.div`
  :focus {
    outline: none;
  }
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
