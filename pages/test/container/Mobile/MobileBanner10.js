

import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import Buttonv1 from "components/Buttonv1";
import Fade from 'react-reveal/Fade';
import Router from 'next/router';


const threedprinter = '/static/images/Home/Mobile/MobileBanner10/3Dprinter.svg'
const cnc = '/static/images/Home/Mobile/MobileBanner10/cnc.svg'
const mold = '/static/images/Home/Mobile/MobileBanner10/mold.svg'
const product = '/static/images/Home/Mobile/MobileBanner10/product.svg'
const machinery = '/static/images/Home/Mobile/MobileBanner10/machinery.svg'
const part = '/static/images/Home/Mobile/MobileBanner10/part.svg'


class MobileBanner10Container extends React.Component{

render(){
	return(
		<Background style = {{marginBottom: 50}}>
			<ContentContainer>
				<span>개발</span>
				<Block onClick={() => Router.push("/request")}>
					<ImgContainer src = {threedprinter}></ImgContainer>
					<BlockText>
						<span>3D 프린터<br/></span>
						<span>가견적 받기</span>
					</BlockText>
				</Block>
				
				<Block onClick={() => Router.push("/request")}>
					<ImgContainer src = {cnc}></ImgContainer>	
					<BlockText>
						<span>CNC<br/></span>
						<span>가견적 받기</span>
					</BlockText>				
				</Block>
				<Block onClick={() => Router.push("/request")}>
					<ImgContainer src = {mold}></ImgContainer>
					<BlockText>
						<span>금형/사출<br/></span>
						<span>가견적 받기</span>
					</BlockText>
				</Block>
			</ContentContainer>

			<ContentContainer>
				<span>생산</span>
				<Block onClick={() => Router.push("/request")}>
					<ImgContainer src = {product}></ImgContainer>
					<BlockText>
						<span>제품</span>
						<span>가견적 받기</span>
					</BlockText>
				</Block>
				<Block onClick={() => Router.push("/request")}>
					<ImgContainer src = {machinery}></ImgContainer>
					<BlockText>
						<span>기계/설비/장비<br/></span>
						<span>가견적 받기</span>
					</BlockText>
				</Block>
				<Block onClick={() => Router.push("/request")}>
				<ImgContainer src = {part}></ImgContainer>
					<BlockText>
						<span>부품/센서</span>
						<span>가견적 받기</span>
					</BlockText>
				</Block>
			</ContentContainer>
		</Background>
	)}}

export default MobileBanner10Container
const ContentContainer = styled(Containerv1)`
	
	display: flex;
	flex-direction: column;
	margin-top: 24px;
	text-align: left;
	>span{
		font-size: 15px;
		font-weight: bold;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.4;
		letter-spacing: -0.38px;
		text-align: left;
		color: #282c36;
	}

`
const Block = styled.div`
	width: 100%;
	height: 53px;
	margin-top: 10px;
	object-fit: contain;
	border-radius: 5px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
	background-color: #ffffff;
	object-fit: contain;
	text-align: center;
	align-items: center;
	display:inline-flex;
`
const BlockText = styled.div`
width: 100%;
	display: inline-flex;
	flex-direction: row;
	align-items: center;
	object-fit: contain;
	text-align: center;
	white-space: nowrap;
	margin-right: 18px;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.35px;
	justify-content: space-between;
  
	>span:nth-of-type(1){
		color: #414550;
	}
	>span:nth-of-type(2){
		color: #0933b3;
	}
}
`
const ImgContainer = styled.img`
	margin: 4px 13px 4px 9px;
	object-fit: contain;
	width:46px;
	height: 45px;
`
const ButtonContainer = styled(Buttonv1)`
	color: #0933b3;
	background-color: #ffffff;
	font-size: 14px !important; 
	height: 100%;
`