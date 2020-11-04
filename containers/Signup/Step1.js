import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'
import Section from 'components/Section'
import ButtonComponent from 'components/Button'

import * as Text from 'components/Text'
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'

const search_ic = 'static/icon/search.png'
const right = "/static/images/main/main_right.png";


@inject('Auth')
@observer
class Step1Conatiner extends React.Component {
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
    const { Auth } = this.props
    
    if(Auth.type){
      Auth.setStep(1)
    }
  }
   render(){
    const { Auth } = this.props
    const { width } = this.state

    return (
      <Section>
        <Container>
          {/* <Info>
            <Text.FontSize24>
              {
                Auth.type === 'client' &&
                  '의뢰를 하고자하는 의뢰사'
              }
              {
                Auth.type === 'expert' &&
                  '제조 전문성을 가진 제조사'
              }
            </Text.FontSize24>
          </Info> */}
          { width > 767.98 ? (
            <>
            <ButtonBox>
            <Button id="sign_uo_button_client" active={Auth.type==="client"} onClick={() => Auth.setType('client')}>
              <div style={{margin : 0}}>
                <Text.FontSize36 color={'#191919'} fontWeight={700}>클라이언트</Text.FontSize36>
                <Text.FontSize24 color={'#767676'} fontWeight={500}>의뢰를 하고자하는 의뢰자</Text.FontSize24>
              </div>
            </Button>
            <Button id="sign_uo_button_partner" active={Auth.type==="expert"} onClick={() => Auth.setType('expert')}>
              <div style={{margin : 0}}>
                <Text.FontSize36 color={'#191919'} fontWeight={700}>전문가</Text.FontSize36>
                <Text.FontSize24 color={'#767676'} fontWeight={500}>제조 전문성을 가진 제조사</Text.FontSize24>            
              </div>
              </Button>
            </ButtonBox>
            <NextButton backgroundColor={Auth.type ? PRIMARY : '#0a2165'} borderColor={Auth.type ? PRIMARY : '#e6e6e6'} borderRadius={3} onClick={this.Next}>
              <Text.FontSize24 color={Auth.type ? WHITE : '#ffffff'} fontWeight={500}>다음</Text.FontSize24>
              <Image src={right}/>
            </NextButton>
            </>

          ) : (
            <>
            <ButtonBox>
              <Button id="sign_uo_button_client" active={Auth.type==="client"} onClick={() => Auth.setType('client')}>
                <div style={{margin : 0}}>
                  <span class="ButtonTextHeader">클라이언트</span>
                  <span class="ButtonTextBody">의뢰를 하고자하는 의뢰자</span>
                </div>
              </Button>
              <Button id="sign_uo_button_partner" active={Auth.type==="expert"} onClick={() => Auth.setType('expert')}>
                <div style={{margin : 0}}>
                  <span class="ButtonTextHeader">전문가</span>
                  <span class="ButtonTextBody">제조 전문성을 가진 제조사</span>            
                </div>
              </Button>
            </ButtonBox>
            <NextButton backgroundColor={Auth.type ? PRIMARY : '#0a2165'} borderColor={Auth.type ? PRIMARY : '#e6e6e6'} borderRadius={3} onClick={this.Next}>
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

export default Step1Conatiner

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
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    width: 117px;
    height: 52px;
    border-radius: 3px;
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
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    margin-top: 50px;
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