import React from 'react'
import styled, {css, keyframes } from 'styled-components'
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'
import Section from 'components/Section'
import Containerv1 from 'components/Containerv1'
import ButtonComponent from 'components/Button'
import SelectComponent from 'components/Select';

import * as Text from 'components/Text'
import * as Content from 'components/Content';
import * as Title from 'components/Title';

import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'
import { red } from '@material-ui/core/colors'

const search_ic = 'static/icon/search.png'
const right = "/static/images/main/main_right.png";

const threedprinter = '/static/images/Home/Banner10/3Dprinter.svg'
const cnc = '/static/images/Home/Banner10/cnc.svg'
const mold = '/static/images/Home/Banner10/mold.svg'
const product = '/static/images/Home/Banner10/product.svg'
const machinery = '/static/images/Home/Mobile/MobileBanner10/machinery.svg'
const part = '/static/images/Home/Mobile/MobileBanner10/part.svg'


@inject('Request')
@observer
class MobileRequestSelectContainer extends React.Component {
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
  Next = (type) => {
    const { Request } = this.props
    Request.request_type=type;
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
  // state={
  //   click: false,
  // }
  // testfunc = () => {
  //   this.setState({click: true});
  //   console.log(this.state.click);
  // }
   render(){
    const { Request } = this.props
    const { width } = this.state

    return (
        //15, 18, 14, 13, 
    //   <Section>
        <div style={{marginTop:0,width:'100%'}}>
            <HeadBox>
              <Font15 active={true}>나에게 맞는 제조방식을 선택해주세요.</Font15>
            </HeadBox>
            <ButtonBox>
              {/* <Button id="sign_uo_button_client" active={Request.request_type==="development"} onClick={() => Request.request_type="development"}> */}
              <Button id="sign_uo_button_client" active={Request.request_type==="development"} onClick={()=>this.Next("development")}>
                    <ButtonText>
                    {/* 원래대로 */}
                    <Font18>생산</Font18>
                    <Font14>
                    볼트앤너트 자동 견적 알고리즘과 전문 품질 감리 시스템 통해 원하는 품질의 생산품을 납기에 맞춰 납품드립니다.  
                    </Font14>
                    </ButtonText>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <ImageBox>
                            <ImgContainer>
                                <Image1 src={threedprinter}></Image1>
                                <Font13>3D 프린터</Font13>
                            </ImgContainer>
                            <ImgContainer>
                                <Image1 src={cnc}></Image1>
                                <Font13>CNC</Font13>
                            </ImgContainer>
                            <ImgContainer>
                                <Image1 src={mold}></Image1>
                                <Font13>금형/사출</Font13>
                            </ImgContainer>
                        </ImageBox>
                    </div>
              </Button>
              <Button id="sign_uo_button_partner" active={Request.request_type==="production"} onClick={() => this.Next("production")}>
                    <ButtonText>
                    {/* 바로 도면첨부 */}
                    <Font18>제작</Font18>
                    <Font14 style={{height:65}}>
                      제작하고자 하는 제품의 전문 엔지니어가 프로젝트를 관리하여
                      원하는 품질과 납기, 견적에 제작해드립니다.
                    </Font14>
                    </ButtonText>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <ImageBox>
                            <ImgContainer>
                                <Image1 src={product}></Image1>
                                <Font13>제품</Font13>
                            </ImgContainer>

                            <ImgContainer>
                                <Image1 src={machinery}></Image1>
                                <Font13>기계/설비/장비</Font13>
                            </ImgContainer>
                            <ImgContainer>
                                <Image1 src={part}></Image1>
                                <Font13>부품/센서</Font13>
                            </ImgContainer>
                        </ImageBox>
                    </div>
              </Button>
            </ButtonBox>
         </div>
    )
  }
}

export default MobileRequestSelectContainer

const Font13 = styled(Content.FontSize13)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.62;
  letter-spacing: -0.33px;
  color: #414550;
  text-align:center;
`

const Font18 = styled(Content.FontSize18)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.18px;
  text-align:left;
//   margin-top:25px;
  color: #0933b3;
`

const Font14 = styled(Title.FontSize14)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.86 !important;
  letter-spacing: -0.35px !important;
  color: #414550;
  margin-top:16px;
`
const boxFade = keyframes`
from {
  opacity: 1;
}
50% {
  opacity: 0.2;
}
to {
  opacity: 1;
}
`

const Font15 = styled(Content.FontSize15)`
  font-weight: bold !important;
  font-stretch: normal !important;
  font-style: normal  !important;
  line-height: 2.67 !important;
  letter-spacing: -0.38px !important;
  color: #0933b3;
  animation: ${ boxFade } 2s linear infinite;
`

const HeadBox = styled.div`
  width: 100%;
  margin-top:30px;
  justify-content: center;
  p{
    text-align: center;
  }
`


const ButtonBox = styled.div`
  width: 100%;
  margin-bottom:128px;
`
const Button = styled.div`
  cursor: pointer;
  margin-top:28px;
  padding:25px 14px 26px 14px;
//   width: 588px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border: 1px solid #c7c7c7;
  border-radius: 10px;
//   box-sizing: border-box;
//   p{
//     display : flex;
//     justify-content: center;
//     align-items: center;
//     text-align : center;
//   }

  :active{
    border: 4px solid #0933b3;
    box-shadow: 0 3px 6px 0 var(--black-16);
    >div p{
      color: #0933b3;
    }
    padding: 22px 11px 23px 11px;
  }
  
`

const ButtonText = styled.div`
//   justify-content: space-between;
`
// const Button_inside = styled.div`
//   padding:25px 14px 26px 14px;
// `
const ImageBox = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  width:100%;
  padding: 0 37px 0 37px;
//   width: 244px;
  margin-top: 66px;
  margin-left: 0px !important;
`

const Image1 = styled.img`
  width: 68px;
  height: 70px;
`

const ImgContainer = styled.div`
//   width: 68px;
  height: 104px;
//   white-space: nowrap;
//   text-align: center;
  justify-content: space-between;
  align-items: center;
//   align-content: space-evenly;
  >p{
    margin-top: 10px;
  }
`
// const Box = styled.div`
// width: 50px;
// height: 50px;
// background-color: red;
// ${props => props.active && css`

//   display: flex;
//   width: 500px;
//   height: 500px;

//     `}
// `