import React, {Component} from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import 'intersection-observer'; // polyfill
import Buttonv1 from "components/Buttonv1";

//Slider
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import EstimateLogoSlider from './EstimateSheetLogoSlider'

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";

const ThumbImage = "/static/images/request/RequestCard/Thumb.png";
const HeaderImg = "/static/images/request/Step3/Step3_Header.png";
const DropdownArrow1 = "/static/images/request/Step3/Step3_Dropdown1.png";
const DropdownArrow2 = "/static/images/request/Step3/Step3_Dropdown2.png";

class Step3Container extends Component {
  state = {
    percentage: 100,
  }

handleChange = (event, newValue) => {
  console.log(newValue)
  this.setState({percentage: newValue})
}
CustomSliderThumbComponent = (props) => {
  const {percentage} = this.state;
  console.log(props)
  console.log(percentage)
    return (
      <div {...props}>
        <img src={ThumbImage} />
        <ThumbText> {percentage}% </ThumbText>
      </div>
      );
    }

    render() {
      
      const {percentage} = this.state;
      return(
          <Card>
            <HeaderBackground>
                <Logo>
                    <img src={HeaderImg}/>
                </Logo>
                <Header>
                    {this.props.title}
                </Header>
                <HeaderTextBox>
                  <Content.FontSize24 fontWeight={'normal'} style={{textAlign: 'left'}} color={'#ffffff'}>
                    견적가
                  </Content.FontSize24>
                  <div style={{display:'flex',alignItems:'center'}}>
                    <Content.FontSize24 fontWeight={'normal'} style={{textAlign: 'left'}} color={'#ffffff'}>
                      25,000,000 원
                    </Content.FontSize24>
                    <div style={{marginLeft:20}}>
                      <img src={DropdownArrow1}/>
                    </div>
                  </div>
                </HeaderTextBox>
            </HeaderBackground>

            <ContentBox>
              <Content.FontSize16 fontWeight={'bold'} style={{textAlign: 'center'}} color={'#0933b3'}>
                최대 경력 40년 이상의 파트너들이 선정 되었습니다. 
              </Content.FontSize16>

              <CustomSlider
              ThumbComponent={this.CustomSliderThumbComponent}
              value={percentage}
              onChange={this.handleChange}
            />
              <ContentHeader>
                요청하신 0000 제품 개발의 전문가인 볼트앤너트 파트너사는 31개입니다.
              </ContentHeader>

              <EstimateLogoSlider/>
              
              <ConsultantBox>
                <ConsultantHeader>
                  매칭 컨설턴트 : 최진영 기술 고문 
                </ConsultantHeader>
                <ConsultantHashtag>#의료기기 #생활가전 #기구설계</ConsultantHashtag>
                <div style={{marginRight:50.4}}>
                  <img src={DropdownArrow2}/>
                </div>
              </ConsultantBox>

              <ContentHeader style={{marginTop:60}}>
                정확한 견적을 받고 싶다면?
              </ContentHeader>
              <Buttonv1 fontSize={20} style={{margin:'0 auto', marginTop: 30,marginBottom:50,width:260,height:50}}>
                무료 컨설팅 받기
              </Buttonv1>
            </ContentBox>

            
            
            {/* <LogoSlider/>
            <MatchingText>요청하신 000 제품 개발에 최적화된 제조 파트너사를 매칭중입니다.</MatchingText>
            <ButtonContainer>
              <NewButton backgroundColor={ "#ffffff" } color={"#282c36"}>이전</NewButton>
              <NewButton>다음</NewButton>
            </ButtonContainer> */}
          </Card>
        )
    }
}

export default withRouter(Step3Container);


const Card = styled.div`
  width: 894px;
  // height: 1170px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.52);
  background-color: white;
  margin: 60px 0px 200px 280px;
  display: inline;
  float: right;
`
const HeaderBackground = styled.div`
  background-color: #0a2165;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`
const HeaderTextBox = styled.div`
  display:flex;
  justify-content:space-between;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-bottom:18px;
  padding-top:12px;
`
const Logo = styled.div`
    margin-left: 5.4%;
    padding-top:40px;
`

const Header = styled(Content.FontSize32)`
  width: auto;
  height: calc(6.7%);
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -0.8px;
  text-align: center;
  color: #ffffff;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-top: 27px;
  padding-bottom:41px;
  border-bottom: solid 1px #ffffff;
  object-fit: contain;
`

const ContentHeader = styled(Content.FontSize24)`
  width: auto;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: center;
  color: #282c36;
  object-fit: contain;
`

const ContentBox = styled.div`
  // height: calc(46.3%);
  margin-right: 5.4%;
  margin-left: 5.4%;
  margin-top: 60px;
`

const CustomSlider = withStyles({
  root: {
    color: '#0933b3',
    height: 12,
    width: '100%',
    borderRadius: 10,
    paddingTop:20,
    paddingBottom:30
    },
  thumb: {
    top: -10,
    paddingRight: 20,
    content: "apapap"
  },
  track: {
    height: 12,
    borderRadius: 10,
  },
  rail: {
    color: '#c6c7cc',
    opacity: 1,
    height: 12,
    borderRadius: 10,
  },
})(Slider);

const ConsultantBox=styled.div`
  margin-top:100px;
  width:100%;
  height:76px;
  border-top:solid 1px #707070;
  border-bottom:solid 1px #707070;
  display: flex;
  align-items: center;
  justify-content:space-between;
`

const ConsultantHeader = styled(Content.FontSize24)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;
  object-fit: contain;
  margin-left:63px;
  // margin-right:26px;
`

const ConsultantHashtag = styled(Content.FontSize16)`
  width: auto;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;
  object-fit: contain;
`
const ThumbText = styled(Content.FontSize18)`
  position: absolute;
  color: white;
  top: -10px;
  font-weight: bold;
`
const MatchingText = styled(Title.FontSize20)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  color: #282c36;
  margin: 0px 176px;
`
const ButtonContainer = styled.div`
  width: 260px;
  height: 44px;
  margin: 90px 317px 50px 317px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`