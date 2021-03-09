import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import Buttonv1 from "components/Buttonv1";
import Fade from 'react-reveal/Fade';
import Router from 'next/router';


const threedprinter = '/static/images/Home/Banner10/3Dprinter.svg'
const threedprinterBlue = '/static/images/Home/Banner10/3DprinterBlue.svg'
const cnc = '/static/images/Home/Banner10/cnc.svg'
const machinery = '/static/images/Home/Banner10/machinery.svg'
const product = '/static/images/Home/Banner10/product.svg'
const mold = '/static/images/Home/Banner10/mold.svg'
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
			<Fade bottom>
				<Containerv1 style={{justifyContent: "space-evenly",marginTop: 30, height:329}}>
					
					<Block onMouseEnter={()=>this.cursorOn(0)} onMouseLeave={()=>this.cursorOut(0)} >
						<BlockText>
							<span>3D 프린터<br/></span>
							<span>개발<br/></span>
						</BlockText>
						<ImgContainer src = {threedprinter}></ImgContainer>
									
						{this.state.list[0]== true &&
							
							<ButtonContainer onClick={() => Router.push("/request")}>
								가견적 받기
							</ButtonContainer>
						}
					</Block>
			
					<Block onMouseEnter={()=>this.cursorOn(1)} onMouseLeave={()=>this.cursorOut(1)} >
						<BlockText>
							<span>CNC<br/></span>
							<span>개발<br/></span>
						</BlockText>
						<ImgContainer src = {cnc}></ImgContainer>
						{this.state.list[1] == true &&
							<ButtonContainer onMouseOver={this.cursorOn2} onClick={() => Router.push("/request")}>
								가견적 받기
							</ButtonContainer>
						}
					</Block>
					<Block onMouseEnter={()=>this.cursorOn(2)} onMouseLeave={()=>this.cursorOut(2)} >
						<BlockText>
							<span>금형/사출<br/></span>
							<span>개발<br/></span>
						</BlockText>
						<ImgContainer src = {mold}></ImgContainer>
						{this.state.list[2] == true &&
							
							<ButtonContainer onClick={() => Router.push("/request")}>
								가견적 받기
							</ButtonContainer>
						}
					</Block>
					<Block onMouseEnter={()=>this.cursorOn(3)} onMouseLeave={()=>this.cursorOut(3)} >
						<BlockText>
							<span>제품</span>
							<span><p>생산</p></span>
						</BlockText>
						<ImgContainer src = {product}></ImgContainer>
						{this.state.list[3] == true &&
							<ButtonContainer onClick={() => Router.push("/request")}>
								가견적 받기
							</ButtonContainer>
						}
					</Block>
					<Block onMouseEnter={()=>this.cursorOn(4)} onMouseLeave={()=>this.cursorOut(4)} >
						<BlockText>
							<span>기계/설비/장비<br/></span>
							<span><p>생산</p></span>
						</BlockText>
						<ImgContainer src = {machinery}></ImgContainer>
						{this.state.list[4] == true &&
							<ButtonContainer onClick={() => Router.push("/request")}>
								가견적 받기
							</ButtonContainer>
						}
					</Block>
					<Block onMouseEnter={()=>this.cursorOn(5)} onMouseLeave={()=>this.cursorOut(5)} >
						<BlockText>
							<span>부품/센서</span>
							<span><p>생산</p></span>
						</BlockText>
						<ImgContainer src = {part} style={{width: 119.2}}></ImgContainer>
						{this.state.list[5] == true &&
							<ButtonContainer onClick={() => Router.push("/request")}>
								가견적 받기
							</ButtonContainer>
						}
					</Block>
				</Containerv1>
			</Fade>
		</Background>

	)}}


export default Banner10Container

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
>span:nth-of-type(1){
	font-size: 18px;
	font-weight: bold;
	font-style: normal;
	letter-spacing: -0.45px;
	color: #414550;
	line-height: 2.22;
}
>span: nth-of-type(2){
	margin-top: 1px;
	height: 20px;
	font-size: 14px;
	font-weight: normal;
	font-style: normal;
	letter-spacing: -0.35px;
	color: #8c7d70;
	>p{
		color: #00498c;
	}
}
`

const ImgContainer = styled.img`
	object-fit: contain;
	width: 116px;
	height: 118px;
	margin-top: 4px;


`
const ButtonContainer = styled(Buttonv1)`
	width: 128px !important;
	height: 30px !important;
	margin-left: 26px !important;
	margin-top: 2px !important;
	font-size: 16px !important; 
	padding-bottom: 3px !important;
`