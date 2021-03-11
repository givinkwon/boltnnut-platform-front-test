import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import Router from 'next/router';
import * as Content from "components/Content";
import Fade from 'react-reveal/Fade';

const threedprinter = '/static/images/Home/Mobile/MobileBanner10/3Dprinter.svg'
const cnc = '/static/images/Home/Mobile/MobileBanner10/cnc.svg'
const mold = '/static/images/Home/Mobile/MobileBanner10/mold.svg'
const product = '/static/images/Home/Mobile/MobileBanner10/product.svg'
const machinery = '/static/images/Home/Mobile/MobileBanner10/machinery.svg'
const part = '/static/images/Home/Mobile/MobileBanner10/part.svg'


class TabletBanner10Container extends React.Component{
	render(){
		return(
			<Background style = {{marginBottom: 50}}>
				<ContentContainer>
					<Fade bottom>
						<Head>개발</Head>
						<Block onClick={() => Router.push("/request")}>
							<BlockLeft>
								<ImgContainer src = {threedprinter}></ImgContainer>
								<Font14>3D 프린터</Font14>
							</BlockLeft>

							<BlockRight>
								<Font14 style={{color: "#0933b3"}}>가견적 받기</Font14>
							</BlockRight>
						</Block>
						
						<Block onClick={() => Router.push("/request")}>
							<BlockLeft>
								<ImgContainer src = {cnc}></ImgContainer>	
								<Font14>CNC</Font14>
							</BlockLeft>

								<BlockRight>
									<Font14 style={{color: "#0933b3"}}>가견적 받기</Font14>
								</BlockRight>
						</Block>

						<Block onClick={() => Router.push("/request")}>
							<BlockLeft>
								<ImgContainer src = {mold}></ImgContainer>
								<Font14>금형/사출</Font14>
							</BlockLeft>

							<BlockRight>
								<Font14 style={{color: "#0933b3"}}>가견적 받기</Font14>
							</BlockRight>
						</Block>

						<Head>생산</Head>
						<Block onClick={() => Router.push("/request")}>
							<BlockLeft>
								<ImgContainer src = {product}></ImgContainer>
								<Font14>제품</Font14>
							</BlockLeft>

							<BlockRight>
								<Font14 style={{color: "#0933b3"}}>가견적 받기</Font14>
							</BlockRight>

						</Block>
						<Block onClick={() => Router.push("/request")}>
							<BlockLeft>
								<ImgContainer src = {machinery}></ImgContainer>
								<Font14>기계/설비/장비</Font14>
							</BlockLeft>

							<BlockRight>
								<Font14 style={{color: "#0933b3"}}>가견적 받기</Font14>
							</BlockRight>

						</Block>
						<Block onClick={() => Router.push("/request")}>
							<BlockLeft>
								<ImgContainer src = {part}></ImgContainer>
									<Font14>부품/센서</Font14>
							</BlockLeft>

							<BlockRight>
								<Font14 style={{color: "#0933b3"}}>가견적 받기</Font14>	
							</BlockRight>
						</Block>
					</Fade>
				</ContentContainer>
			</Background>
		)
	}
}

export default TabletBanner10Container

const ContentContainer = styled(Containerv1)`
	display: flex;
	flex-direction: column;
	align-items: center;
	white-space: nowrap;
`

const Head = styled(Content.FontSize15)`
	object-fit: contain;
	text-align: left;
	width: 564px;
	padding-left: 2px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: -0.38px;
  text-align: left;
  color: #282c36;
	margin-top: 24px;
`

const Block = styled.button`
	border: none;
	width: 564px;
	height: 53px;
	margin-top: 10px;
	object-fit: contain;
	border-radius: 5px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
	background-color: #ffffff;
	object-fit: contain;
	text-align: left;
	align-items: center;
	display:inline-flex;
	justify-content:space-between;
	padding: 4px 18px 4px 9px;
	:hover{
		border: solid 0.6px #0933b3;
		box-sizing: border-box;
		>div >p
		{
			color:#0933b3;
		}
	}
`
const BlockLeft = styled.div`
	object-fit: contain;
	display: flex;
	align-items: center;
`

const BlockRight = styled.div`
	object-fit: contain;
	width: 66px;
`

const Font14 = styled(Content.FontSize14)`
	object-fit: contain;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.5;
	letter-spacing: -0.35px !important;
	text-align: left;
	color: #414550;
`

const ImgContainer = styled.img`
	margin-right:13px;
	object-fit: contain;
	width:46px;
	height: 45px;
`