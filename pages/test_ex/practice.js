import React from "react";
import styled from 'styled-components';

import Containerv1 from 'components/Containerv1';
import Buttonv1 from 'components/Buttonv1';
import FooterComponent from 'components/Footer';
import Nav from 'components/Nav';

const Map = '/static/images/Info/InfoMap.svg';
const Line = '/static/images/Info/Line.svg';
const Line2 = '/static/images/Info/Line2.svg';
const Line3 = '/static/images/Info/Line3.svg';
const Banner1Img = '/static/images/Info/Banner1Img.png';
const Banner1Img2 = '/static/images/Info/Banner1Img2.png';
const Banner2Img = '/static/images/Info/Banner2Img.png';
const Banner3Img = '/static/images/Info/Banner3Img.png';

class Test extends React.Component {
  render() {
    return (
      <Containerv1>
        <Nav></Nav>   
        <Background>
			<Background1>
				<TextBox style={{marginTop: 280}}>
					<Title>온라인 맞춤 제조 플랫폼, <span>볼트앤너트</span></Title>
					
					<Content>전세계 5000개 네트워크를 통해 가전/생활용품, 산업 기계 및 장비, 개발 부품 발주까지<br/> 
										빠르고 합리적 견적에 발주를 도와드립니다.
					</Content>
				</TextBox>
				<img style={{marginTop:50, marginBottom:31, height:484}} src = {Map}></img>
			</Background1>

					<img style={{marginLeft: 291, height: 182}} src = {Line}></img>

					<Background2>
						<TextBox style = {{marginTop: 76}}>
							<Head>AI 자동 견적 서비스</Head>
							<Body>5944개의 프로젝트 데이터를 학습한 볼트앤너트 알고리즘은<br/>
										요구되는 제품의 품질과 난이도에 따라 최적 견적을 도출하고<br/>
										그에 따라 전문가를 자동 매칭합니다.<br/>
										그를 통해 합리적인 견적으로 성공적 발주를 할 수 있도록 돕습니다.
							</Body>
							<Buttonv1 style = {{width: 304, height: 64, marginTop: 72}}><ButtonWrite>지금 무료 가견적 받기</ButtonWrite></Buttonv1>
									
						</TextBox>
						<img style = {{marginLeft: 13, height: 395}} src = {Banner1Img}></img>
						<img style={{marginTop: 204, marginLeft: -50, width:343, height:288}} src = {Banner1Img2}></img>
					</Background2>
                  
					<img style={{height: 345, marginLeft: 29}} src = {Line2}></img>
							
					<Background2>
						<img style = {{width: 588, height: 363}} src = {Banner2Img}></img>
						<TextBox style = {{marginTop: 3, marginLeft: 126, width: 630}}>
							<Head>전문적인 프로젝트 관리</Head>
							<Body>최대 40년 경력의 볼트앤너트 컨설턴트들이 발주 도면의<br/>
										생산성을 감리하고, 발주된 의뢰의 시작부터 납품까지<br/>
										검수함으로써 개발/생산품의 품질을 보장합니다.
							</Body>
						<Buttonv1 style = {{width: 304, height: 64, marginTop: 72}}><ButtonWrite>1:1 컨설팅 받기</ButtonWrite></Buttonv1>
									
									
						</TextBox>
					</Background2>
              <img style = {{marginLeft: 197}}src = {Line3}></img>

          <Background2>
            <TextBox style = {{marginRight: 43}}>
              <Head>확실한 납기</Head>
              <Body>모든 개발/생산 프로젝트를 볼트앤너트 9/14 Management<br/>
                    프로세스를 통해 관리 및 감독하여 Delay issue를<br/>
                    선제적으로 차단하고, Misleading Task를 최소화하여<br/>
                    확실한 납기를 보장합니다.</Body>
            </TextBox>
						<img style = {{marginBottom: 400}}src = {Banner3Img}></img>
          </Background2>
          <FooterComponent></FooterComponent>
                    
        </Background>
				    
      </Containerv1>


    )
  }
}

export default Test


const Background = styled.div`
	position: absolute;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
`
const Background1 = styled.div`
	aligh-items: center;
`
const TextBox = styled.div`
	flex-direction: column;
	align-items: center;
	word-break: keep-all;
`
const Title = styled.div`
	height: 83px;
	object-fit: contain;
	font-size: 56px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.64;
	letter-spacing: -1.4px;
	text-align: center;
	color: #282c36;
	>span{
			font-weight: 700;
	}
`
const Content = styled.div`
	height: auto;
	margin: 18px 0 0 0; 
	object-fit: contain;
	font-size: 26px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.54;
	letter-spacing: -0.65px;
	text-align: center;
	color: #555963;
	word-break: keep-all;
`

const Background2 = styled.div`
	object-fit: contain;
	display: inline-flex;
`

const Head = styled.div`
	height: 59px;
	margin: 0 0 32px 0;
	object-fit: contain;
	font-size: 35px;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: 2.3;
	letter-spacing: -1px;
	text-align: left;
	color: #282c36;
`
const Body = styled.div`
    object-fit: contain;   
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: -0.6px;
    text-align: left;
    color: #555963;
    white-space:nowrap;
`
const ButtonWrite = styled.div`
    font-size: 23px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.61;
    letter-spacing: -0.58px;
    text-align: left;
`
