import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';

const Map = '/static/images/Info/Mobile/MobileMap.svg';
const Banner2Img = '/static/images/Info/Mobile/MobileBanner2Img.png';
const Banner3Img = '/static/images/Info/Mobile/MobileBanner3Img.png';
const Banner1Img = '/static/images/Info/Mobile/MobileBanner1Img.png';
const Banner1Img2 = '/static/images/Info/Mobile/MobileBanner1Img2.png';
import MobilePaymentPageContainer from '../Request/Mobile/MobilePaymentPage';
import MobilePaymentCompleteContainer from '../Request/Mobile/MobilePaymentComplete';
class MobileInfoContainer extends React.Component {
	render() {
		return (
			<>
				<MobilePaymentPageContainer></MobilePaymentPageContainer>
			</>
		);
	}
}

export default MobileInfoContainer;

const Background = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
`;
const Header = styled.div`
  width: 216px;
  height: 65px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 22px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: -0;.55px;
  text-align: center;
  color: #282c36;
  margin: 108px 0px 30px 0px;
  > span {
    font-weight: 700;
  }
`;
const SubHeader = styled.div`
	width: 286px;
	height: 70px;
	object-fit: contain;
	font-family: NotoSansCJKkr;
	font-size: 15px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.6;
	letter-spacing: -0.38px;
	text-align: center;
	color: #414550;
	margin-top: 20px;
	margin-bottom: 140px;
`;
const ContentBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	> p {
		height: 33px;
		font-family: NotoSansCJKkr;
		font-size: 22px;
		font-weight: bold;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.45;
		letter-spacing: -0.55px;
		text-align: center;
		color: #000000;
		margin-bottom: 30px;
	}
	> span {
		font-family: NotoSansCJKkr;
		font-size: 15px;
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.6;
		letter-spacing: -0.38px;
		text-align: center;
		color: #414550;
		margin: 24px 0px 26px 0px;
	}
	> div {
		background-color: #0933b3;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 202px;
		height: 50px;
		border-radius: 46px;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
		font-family: NotoSansCJKkr;
		font-size: 15px;
		font-weight: bold;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.27;
		letter-spacing: -0.38px;
		text-align: left;
		color: #ffffff;
		margin-bottom: 140px;
	}
`;
const ImgContainer = styled.span`
	display: flex;
	flex-direction: row;
	justify-content: start;
	width: 318px;
`;
