import React from 'react'
import styled from 'styled-components'
import { inject } from 'mobx-react'

import Container from 'components/Container'
import * as Text from 'components/Text'
import { WHITE } from 'static/style' 

@inject('Auth')

class BannerConatiner extends React.Component {
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
  render(){
    const { width } = this.state
    const { Auth } = this.props


    return (
      <Banner>
        <Container>
        { width > 767.98 ? (
          <>
          <Text.FontSize56 color={'#0a2165'} >회원가입</Text.FontSize56>
          </>
        ) : (
          <>
          <span>회원가입</span>
          {Auth.step === 0 && <span>둘 중 하나를 선택해주세요</span> }
          </>
        )}
        </Container>
      </Banner>
    )
  }
}

export default BannerConatiner

const Banner = styled.div`
  background-position: center;
  background-size: cover;
  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    text-align : center; 
    p{
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.29;
      letter-spacing: -1.4px;
      text-align : center;
    }
    > span {
      font-stretch: normal;
      font-style: normal;
      :nth-of-type(1){
        font-size: 20px;
        font-weight: bold;
        line-height: 1.55;
        letter-spacing: -0.5px;
        color: #0a2165;
      }
      :nth-of-type(2){
        font-size: 12px;
        font-weight: 500;
        line-height: 1.17;
        letter-spacing: -0.3px;
        color: #767676;

        margin-top : 16px;
      }
    }
    @media (min-width: 0px) and (max-width: 767.98px) {
      margin-top:24px;
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
    }
    @media (min-width: 992px) and (max-width: 1299.98px) { 
    }
    @media (min-width: 1300px) { 
      margin-top:200px;
    }
  }
  
`