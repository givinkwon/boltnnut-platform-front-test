import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'
import Section from 'components/Section'
import ButtonComponent from 'components/Button'

import * as Text from 'components/Text'
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'


@inject('Request')
@observer
class Step0Conatiner extends React.Component {
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
   render(){
    const { Request } = this.props;
    const { width } = this.state;

    return (
      <Section style={{paddingTop : 0}}>
        <Container>

          { width > 767.98 ? (
            <>
            <LineBox>
              <Line>
                <li class="line1"></li>
                <li class="line2"></li>
              </Line>
            </LineBox>
            
            {/* <Line>
              <Line1></Line1>
              <Line2></Line2>
              <LineBox>
                <Line3 left></Line3>
                <Line3 right></Line3>
              </LineBox>
              
            </Line> */}
            
            <ButtonBox>
              <Button active={Request.tab === 1} onClick={async() => await Request.setTab(1)}>
                <div style={{margin : 50}}>
                  <Text.FontSize36 color={'#191919'} fontWeight={700}>유통 제조</Text.FontSize36>
                  <Text.FontSize26 color={'#767676'} fontWeight={500}>개발시간, 개발비용, MOQ, 생산단가, 생산시간 등 제품에 필요한 모든 요소를 고려하여 제품 개발과 생산의 A-Z까지 설계해드립니다. 볼트앤너트의 프로젝트 매니저가 귀사의 개발팀장이 되어 개발/생산과정을 제시해드립니다</Text.FontSize26>
                </div>
              </Button>
              <Button active={Request.tab === 2} onClick={async() => await Request.setTab(2)}>
                <div style={{margin : 50}}>
                  <Text.FontSize36 color={'#191919'} fontWeight={700}>R&D 제조</Text.FontSize36>
                  <Text.FontSize24 color={'#767676'} fontWeight={500}>제품의 최적화를 위해 기능 명세를 기반으로 개발부터 생산까지 턴키 서비스를 통해 제조 프로세스를 설계해드립니다. R&D 요소 최적화, 양산 사이클 관리, 기간 조정을 통해 양산 Follow-up 비용 최대 40% 절감해보세요</Text.FontSize24>            
                </div>
              </Button>
            </ButtonBox>
            </>

          ) : (
            <>
            <LineBox>
              <Line>
                <li class="line1"></li>
                <li class="line2"></li>
              </Line>
            </LineBox>
            <ButtonBox>
              <Button active={Request.tab == 1} onClick={async() => await Request.setTab(1)}>
                <div style={{margin : 10}}>
                  <Text.FontSize36 color={'#191919'} fontWeight={700}>유통 제조</Text.FontSize36>
                  <Text.FontSize24 class="ButtonTextBody" color={'#767676'} fontWeight={500}>개발시간, 개발비용, MOQ, 생산단가, 생산시간 등 제품에 필요한 모든 요소를 고려하여 제품 개발과 생산의 A-Z까지 설계해드립니다.</Text.FontSize24>
                </div>
              </Button>
              <Button active={Request.tab == 2} onClick={async() => await Request.setTab(2)}>
                <div style={{margin : 10}}>
                  <Text.FontSize36 color={'#191919'} fontWeight={700}>R&D 제조</Text.FontSize36>
                  <Text.FontSize24 color={'#767676'} fontWeight={500}>제품의 최적화를 위해 기능 명세를 기반으로 개발부터 생산까지 턴키 서비스를 통해 제조 프로세스를 설계해드립니다.</Text.FontSize24>            
                </div>
              </Button>
            </ButtonBox>

            </>          
          )}


          
        </Container>
      </Section>

    )
  }
}

export default Step0Conatiner


const LineBox = styled.div`
    width: 50%;
    margin-right: auto;
    margin-left: auto;
`
const Line = styled.ul`
  color : #0933b3;
  .line1 {
    width: 0px;
    border : 2px solid ;
    height: 64px;
    margin-right: auto;
    margin-left: auto;
  }
  .line2 {
    border-top : 4px solid ;
    border-left : 4px solid ;
    border-right : 4px solid ;

    height : 64px
  }
`
// const Line = styled.div`
//   color : #0933b3;
//   size : 4px;
// `

// const Line1 = styled.hr`
//   height : 50px;
//   width : 0px;
// `
// const Line2 = styled.hr`
//   width : 50% ; 
// `
// const LineBox = styled.div`
//   width : 50%;
//   margin-right : auto ; 
//   margin-left : auto ; 
// `
// const Line3 = styled.hr`
//   height : 50px;
//   width : 0px;
//   display : inline-flex;
//   ${props => props.left && css`
//     /* text-align : left */
//     align : left;
//     margin-right : 596px;
//   `}
//   ${props => props.right && css`
//     /* text-align : right; */
//     align : right;
//   `}
// `


const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    div:nth-of-type(1) {
      margin-right: 6px;
    }
    div:nth-of-type(2) {
      margin-left: 6px;
    } 
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    div:nth-of-type(1) {
      margin-right: 8px;
    }
    div:nth-of-type(2) {
      margin-left: 8px;
    } 
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    div:nth-of-type(1) {
      margin-right: 10px;
    }
    div:nth-of-type(2) {
      margin-left: 10px;
    } 
  }
  @media (min-width: 1300px) {
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
      @media (min-width: 0px) and (max-width: 767.98px) {
        font-size: 12px !important;
      }
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
