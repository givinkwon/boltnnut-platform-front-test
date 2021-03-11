import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'
import Section from 'components/Section'
import ButtonComponent from 'components/Button'

import * as Text from 'components/Text'
import * as Content from 'components/Content';
import * as Title from 'components/Title';

import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'

const search_ic = 'static/icon/search.png'
const right = "/static/images/main/main_right.png";


@inject('Request')
@observer
class RequestSelectContainer extends React.Component {
  state = {
    width : 0, 
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  searchText = (e) => {
    this.setState({ search: e.target.value })
  }
  Next = () => {
    const { Request } = this.props
    
    // if(Request.request_type==="production")
    // {
    // //   Auth.setStep(1)
    //     // Request.step_index=2;
    //     this.props.DetailQuestion.loadSelectFromTitle(1);
    // }
    // else
    // {
    //     // Request.step_index=1;
    // }
    Request.step_index=1;
  }
   render(){
    const { Request } = this.props
    const { width } = this.state

    return (
      <Section>
        <Container>
          { width > 767.98 ? (
            <>
            <ButtonBox>
              <Button id="sign_uo_button_client" active={Request.request_type==="development"} onClick={() => Request.request_type="development"}>
                <div style={{margin : 0}}>
                  {/* 원래대로 */}
                  <Font26 color={'#191919'} fontWeight={700}>제작</Font26>
                  <Font20 color={'#767676'} fontWeight={500}>
                    지속적인 소통과 제품 분석 시스템으로 제품 생산에 불필요한<br/>
                    가정을 방지하여 양산 비용을 최대 40% 절감합니다. 
                  </Font20>
                </div>
              </Button>
              <Button id="sign_uo_button_partner" active={Request.request_type==="production"} onClick={() => Request.request_type="production"}>
                <div style={{margin : 0}}>
                  {/* 바로 도면첨부 */}
                  <Font26 color={'#191919'} fontWeight={700}>생산</Font26>
                  <Font20 color={'#767676'} fontWeight={500}>
                    국내 제조사와 해외유통사 네트워크를 통해 원하는 조건에 맞는<br/>
                    제조견적, MOQ (최소발주수량)등의 정보를 전달해드립니다.
                  </Font20>            
                </div>
              </Button>
            </ButtonBox>
            <NextButton backgroundColor={Request.request_type ? PRIMARY : '#0a2165'} borderColor={Request.request_type ? PRIMARY : '#e6e6e6'} borderRadius={3} onClick={this.Next}>
              <Text.FontSize24 color={Request.request_type ? WHITE : '#ffffff'} fontWeight={500}>다음</Text.FontSize24>
              <Image src={right}/>
            </NextButton>
            </>
          ) : (
            <>
            <ButtonBox>
              <Button id="sign_uo_button_client" active={Request.request_type==="development"} onClick={() => Request.request_type="development"}>
                <div style={{margin : 0}}>
                  <span class="ButtonTextHeader">클라이언트</span>
                  <span class="ButtonTextBody">의뢰를 하고자하는 의뢰자</span>
                </div>
              </Button>
              <Button id="sign_uo_button_partner" active={Request.request_type==="production"} onClick={() => Request.request_type="production"}>
                <div style={{margin : 0}}>
                  <span class="ButtonTextHeader">전문가</span>
                  <span class="ButtonTextBody">제조 전문성을 가진 제조사</span>            
                </div>
              </Button>
            </ButtonBox>
            <NextButton backgroundColor={Request.request_type ? PRIMARY : '#0a2165'} borderColor={Request.request_type ? PRIMARY : '#e6e6e6'} borderRadius={3} onClick={this.Next}>
              <span class="nextButtonText">다음</span>
              <Image src={right}/>
            </NextButton>
            </>          
          )}
        </Container>
      </Section>

    )
  }
}

export default RequestSelectContainer

const Font46 = styled(Content.FontSize46)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.65;
  letter-spacing: -1.15px;
  color: #000000;
`

const Font18 = styled(Content.FontSize18)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.22;
  letter-spacing: -0.45px;
  color: #0933b3;
`

const Font26 = styled(Title.FontSize26)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.54;
  letter-spacing: -0.65px;
  color: #0933b3;
`

const Font20 = styled(Title.FontSize20)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.8;
  letter-spacing: -0.5px;
  color: #282c36;
`

const Font16 = styled(Content.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.4px;
  color: #414550;
`

const NextButton = styled(ButtonComponent)`
  margin: auto;
  border-radius: 3px;
  
  :hover {
    background-color : #0933b3;
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 96px;
    height: 40px;
    border-radius: 2px;

    margin-top : 70px;
    margin-bottom : 67px;

    > .nextButtonText {
      font-size: 16px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.06;
      letter-spacing: -0.4px;
      color: #ffffff;
    } 
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 117px;
    height: 52px;
    border-radius: 3px;
    margin-top : 50px;

  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    width: 117px;
    height: 52px;
    border-radius: 3px;
    margin-top : 50px;

  }
  @media (min-width: 1300px) {
    width: 117px;
    height: 52px;
    border-radius: 3px;

    margin-top : 50px;
  }
`
const Image = styled.img`
  width: 9px;
  height: 17px;
  margin-left : 4px;
  margin-top : 4px;
`
// const Info = styled.div`
//   > p {
//     color: #aaaaaa;
//     text-align: center;
//     @media (min-width: 0px) and (max-width: 767.98px) {
//       margin-top: 30px;
//     }
//     @media (min-width: 768px) {
//       margin-top: 30px;
//     }
//   }
// `
const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 2px;
    div:nth-of-type(1) {
      margin-right: 6px;
    }
    div:nth-of-type(2) {
      margin-left: 6px;
    } 
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 40px;
    div:nth-of-type(1) {
      margin-right: 8px;
    }
    div:nth-of-type(2) {
      margin-left: 8px;
    } 
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    margin-top: 50px;
    div:nth-of-type(1) {
      margin-right: 10px;
    }
    div:nth-of-type(2) {
      margin-left: 10px;
    } 
  }
  @media (min-width: 1300px) {
    margin-top: 60px;
    div:nth-of-type(1) {
      margin-right: 12px;
    }
    div:nth-of-type(2) {
      margin-left: 12px;
    } 
  }
`
const Button = styled.div`
  cursor: pointer;
  width: 588px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border: 1px solid #c7c7c7;
  border-radius: 10px;
  box-sizing: border-box;
  
  p{
    display : flex;
    justify-content: center;
    align-items: center;
    text-align : center;
    :nth-of-type(1) {
      margin-bottom : 10px; 
      line-height: 1.35;
      letter-spacing: -1px;
    }
    :nth-of-type(2) {
      line-height: 1.42;
      letter-spacing: -0.6px;
    }
  }
  
  ${props => props.active && css`
    background-color: #0933b3;
    p, span {
      color: ${WHITE} !important;
      display : flex; 
    }
  `}
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 192px;
    text-align: center;
    align-items: center;
    :hover {
      border: 2px solid #0933b3;
      box-shadow: 0 3px 6px 0 var(--black-16);
    }
    span { 
      display : block;
    }
    .ButtonTextHeader {
      font-size: 20px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.15;
      letter-spacing: -0.5px;
      color: #191919;
    }
    .ButtonTextBody {
      font-size: 12px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.17;
      letter-spacing: -0.3px;
      color: #767676;
      margin-top:7px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 340px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    height: 400px;
  }
  @media (min-width: 1300px) { 
    :hover {
      border: 4px solid #0933b3;
      box-shadow: 0 3px 6px 0 var(--black-16);
    }
    height: 437px;
  }
`