import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import BannerContainer from 'containers/Project/Banner';
import Router from 'next/router';
import Container from 'components/Container'
import Containerv1 from 'components/Containerv1'
import Nav from 'components/Nav';
import MobileNav from 'components/MobileNav';
import Footer from 'components/Footer';
import Spinner from 'components/Spinner';
import * as Text from "components/Text";
import * as Content from "components/Content";
import * as Title from "components/Title";
import Background from "components/Background";


const back_ic = '/static/images/components/MobileNav/back_ic.svg';

@inject('Project', 'Loading')
@observer
class MobileDetail extends React.Component {
	state = {
		width: null,
	};
	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);
		this.setState({ ...this.state, width: window.innerWidth });
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}
	updateDimensions = () => {
		this.setState({ ...this.state, width: window.innerWidth });
	};
	render() {
		const { Project, Loading } = this.props;
		const { width } = this.state;
    const gray = "#f6f6f6";
		return (
      <>
        <div>
          { width && width < 768 && <MobileNav src={ back_ic } headText={"프로젝트 관리"} width={ width }/>}

        </div>
        <Background>
          <Containerv1 style = {{display: 'flex', flexDirection:'column', paddingTop: 90}}>
            <div style = {{marginBottom: 40}}>
              <Font15 style = {{color: "#0933b3", marginBottom: 14}}>모집중</Font15>
              <Font16 style = {{marginBottom: 8}}>실리콘 반려동물 샤워기</Font16>
              <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Font14 style = {{color: "#999999"}}>제품 및 용품 반려동물 용품</Font14>
                <Font14 style = {{color: "#999999"}}>2021.03.11</Font14>
              </div>

              <Box1>
                <Font14 style = {{color: "#999999"}}>예상 금액</Font14><Font14 style = {{color: "#414550"}}>25,000,000원</Font14>
              </Box1>
              <Box1>
                <Font14 style = {{color: "#999999"}}>예상 기간</Font14><Font14 style = {{color: "#414550"}}>2달</Font14>
              </Box1>
              <Box1>
                <Font14 style = {{color: "#999999"}}>지원 수</Font14><Font14 style = {{color: "#414550"}}>2명</Font14>
              </Box1>
            </div>
            <div>
              <Font16>지원한 파트너</Font16>


            </div>
            <div>
              <Font16>프로젝트 설명 및 요청사항</Font16>
              <Font15>공개 내용</Font15>
              <Box1>
                <Font15>하이젠어스</Font15>
                <Font14>"프로젝트 보고 연락...</Font14>

                
                
              </Box1>
              
              <Font15>비공개 내용</Font15>

              
            </div>


          




          </Containerv1>
        </Background>
        <Footer color = {gray}/>
      </>
		);
	}
}

export default MobileDetail;

const Box1= styled.div`
border-radius: 5px;
  border: solid 1px #c6c7cc;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 14px 10px 14px;
  margin-top: 14px;
`
const Font13 = styled(Content.FontSize13)`

`
const Font14 = styled(Content.FontSize14)`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.07;
  letter-spacing: -0.35px;
  
`

const Font15 = styled(Content.FontSize15)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -0.38px;
  color: #0933b3;
`

const Font16 = styled(Content.FontSize16)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.4px;
  color: #282c36;
`

