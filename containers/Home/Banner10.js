import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import Buttonv1 from "components/Buttonv1";
import Fade from 'react-reveal/Fade';
import Router from 'next/router';
import * as Content from "components/Content";

const threedprinter = '/static/images/Home/Banner10/3Dprinter.svg'
const cnc = '/static/images/Home/Banner10/cnc.svg'
const mold = '/static/images/Home/Banner10/mold.svg'
const product = '/static/images/Home/Banner10/product.svg'
const machinery = '/static/images/Home/Banner10/machinery.svg'
const part = '/static/images/Home/Banner10/part.svg'


class Banner10Container extends React.Component{
    state = {list:[ false, false, false, false, false, false ],}

	cursorOn=(idx)=>{
		const { list } = this.state;
		this.setState({
			list: list.map((item, j) => {
				if(j==idx){return true;}
			})
		})
	};

	cursorOut=(idx)=>{
		const{ list } = this.state;
		this.setState({
			list: list.map((item, j) => {
				if(j==idx){return false};
			})
		})
	};

	render(){
		return(
			<Background>
					<ContentContainer>
						<Fade bottom>
							<Block onMouseEnter={()=>this.cursorOn(0)} onMouseLeave={()=>this.cursorOut(0)} >
								<BlockText>
									<Font18>3D 프린터</Font18>
									<Font14>생산<br/></Font14>
								</BlockText>
								<ImgContainer src = {threedprinter}></ImgContainer>
											
								{this.state.list[0]== true &&
									
									<ButtonContainer onClick={() => Router.push("/request")}>
										견적 받기
									</ButtonContainer>
								}
							</Block>
					
							<Block onMouseEnter={()=>this.cursorOn(1)} onMouseLeave={()=>this.cursorOut(1)} >
								<BlockText>
									<Font18>CNC</Font18>
									<Font14>생산</Font14>
								</BlockText>
								<ImgContainer src = {cnc}></ImgContainer>
								{this.state.list[1] == true &&
									<ButtonContainer onMouseOver={this.cursorOn2} onClick={() => Router.push("/request")}>
										견적 받기
									</ButtonContainer>
								}
							</Block>
							<Block onMouseEnter={()=>this.cursorOn(2)} onMouseLeave={()=>this.cursorOut(2)} >
								<BlockText>
									<Font18>금형/사출</Font18>
									<Font14>생산</Font14>
								</BlockText>
								<ImgContainer src = {mold}></ImgContainer>
								{this.state.list[2] == true &&
									
									<ButtonContainer onClick={() => Router.push("/request")}>
										견적 받기
									</ButtonContainer>
								}
							</Block>
							<Block onMouseEnter={()=>this.cursorOn(3)} onMouseLeave={()=>this.cursorOut(3)} >
								<BlockText>
									<Font18>제품</Font18>
									<Font14 style = {{color: " #00498c"}}>제작</Font14>
								</BlockText>
								<ImgContainer src = {product}></ImgContainer>
								{this.state.list[3] == true &&
									<ButtonContainer onClick={() => Router.push("/request")}>
										견적 받기
									</ButtonContainer>
								}
							</Block>
							<Block onMouseEnter={()=>this.cursorOn(4)} onMouseLeave={()=>this.cursorOut(4)} >
								<BlockText>
									<Font18>기계/설비/장비<br/></Font18>
									<Font14 style = {{color: " #00498c"}}>제작</Font14>
								</BlockText>
								<ImgContainer src = {machinery}></ImgContainer>
								{this.state.list[4] == true &&
									<ButtonContainer onClick={() => Router.push("/request")}>
										견적 받기
									</ButtonContainer>
								}
							</Block>
							<Block onMouseEnter={()=>this.cursorOn(5)} onMouseLeave={()=>this.cursorOut(5)} >
								<BlockText>
									<Font18>부품/센서</Font18>
									<Font14 style = {{color: " #00498c"}}>제작</Font14>
								</BlockText>
								<ImgContainer src = {part} style={{width: 119.2}}></ImgContainer>
								{this.state.list[5] == true &&
									<ButtonContainer onClick={() => Router.push("/request")}>
										견적 받기
									</ButtonContainer>
								}
							</Block>
						</Fade>
					</ContentContainer>
			</Background>
		)
	}
}
export default Banner10Container

const ContentContainer = styled(Containerv1)`
	justify-content: space-between;
	margin-top: 30px;
	height: 329px;
`

const Block = styled.div`
	width: 180px;
	height: 198px;
	object-fit: contain;
	border-radius: 5px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
	background-color: #ffffff;
	object-fit: contain;
	text-align: center;
	white-space: nowrap;
	align-content: center;
	:hover{
		height: 247px;
	}
`

const BlockText = styled.div`
	object-fit: contain;
	text-align: center;
	white-space: nowrap;
	padding-top: 20px;
	font-stretch: normal;
`

const Font18 = styled(Content.FontSize18)`
	font-weight: bold;
	font-style: normal;
	letter-spacing: -0.45px;
	color: #414550;
	line-height: 2.22;
	text-align: center;
`

const Font14 = styled(Content.FontSize14)`
	margin-top: 1px;
	font-size: 14px;
	font-weight: normal;
	font-style: normal;
	letter-spacing: -0.35px;
	color: #8c7d70;
	text-align: center;
`

const ImgContainer = styled.img`
	object-fit: contain;
	width: 116px;
	height: 118px;
	margin-top: 4px;
`

const ButtonContainer = styled(Buttonv1)`
	box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;	
	width: 128px !important;
	height: 30px !important;
	margin-left: 26px !important;
	margin-top: 2px !important;
	font-size: 16px !important; 
	padding-bottom: 3px !important;
`