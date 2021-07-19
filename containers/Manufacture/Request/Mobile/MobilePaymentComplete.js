import React from 'react';
import styled from 'styled-components';
import Background from '../../../components/Background';
import Containerv1 from '../../../components/Containerv1';
import * as Title from '../../../components/Title';

const success = '/static/images/request/PaymentComplete/success.png';
const detailDropDownImg = '/static/images/request/Mobile/MobileStep3/1030.png';

class MobilePaymentCompleteContainer extends React.Component {
	state = {
		deliveryinfo: false,
		orderprice: false,
	};

	deliveryInfoActiveHandler = () => {
		if (this.state.deliveryinfo === false) {
			this.setState({ deliveryinfo: true });
		} else {
			this.setState({ deliveryinfo: false });
		}
	};

	orderPriceActiveHandler = () => {
		if (this.state.orderprice === false) {
			this.setState({ orderprice: true });
		} else {
			this.setState({ orderprice: false });
		}
	};

	render() {
		return (
			<MobiletestDiv>
				<MarginDiv />
				<Background>
					
					<CompleteTitle>
						<SuccessImg src={success} style={{ marginBottom: '18px' }} />
						<InlineDiv>
							<FontSize18 style={{ color: '#0933b3' }}>주문이 정상적으로 완료</FontSize18>
							<FontSize18>되었습니다</FontSize18>
						</InlineDiv>
					</CompleteTitle>

					<CompleteInfoBackground>
						<CompleteInfoBox>
							<div style={{ width: '302px' }}>
								<CompleteInfoInlineDiv style={{ marginTop: '34px', borderBottom: '1px solid #e1e2e4' }}>
									<FontSize14 style={{ width: '65px', marginRight: '37px' }}>주문번호</FontSize14>
									<FontSize14 style={{ width: '198px', color: '#0933b3', marginBottom: '20px', fontWeight: '500' }}>2021032947895761</FontSize14>
								</CompleteInfoInlineDiv>

								<CompleteInfoInlineDiv style={{ justifyContent: 'flex-end', flexWrap: 'wrap', marginTop: '20px', borderBottom: '1px solid #e1e2e4' }}>
									<FontSize14 style={{ marginBottom: '6px', width: '65px', marginRight: '37px' }}>배송지정보</FontSize14>

									<DeliveryDescBox active={this.state.deliveryinfo}>
										<DeliveryDesc>박찬아 (010-4114-2628)</DeliveryDesc>
										<DescDropDownImg
											src={detailDropDownImg}
											onClick={() => {
												this.deliveryInfoActiveHandler();
											}}
										/>
									</DeliveryDescBox>
									<DetailDesc active={this.state.deliveryinfo}>서울 특별시 종로구 보문로 7길 4-4(숭인동) 아쿠아빌 202호</DetailDesc>
								</CompleteInfoInlineDiv>

								<CompleteInfoInlineDiv2 active={this.state.orderprice} style={{ justifyContent: 'flex-end', flexWrap: 'wrap', marginTop: '20px' }}>
									<FontSize14 style={{ marginBottom: '6px', width: '65px', marginRight: '37px' }}>주문금액</FontSize14>

									<OrderPriceBox active={this.state.orderprice}>
										<FontSize16 style={{ color: '#0933b3' }}>3,518,000 원</FontSize16>
										<DescDropDownImg
											src={detailDropDownImg}
											onClick={() => {
												this.orderPriceActiveHandler();
											}}
										/>
									</OrderPriceBox>
								</CompleteInfoInlineDiv2>

								<DetailDesc active={this.state.orderprice}>
									<CompleteInfoInlineDiv style={{ marginTop: '9px' }}>
										<FontSize14 style={{ width: '65px', marginRight: '37px', fontWeight: 'normal' }}>부품 가격</FontSize14>
										<FontSize16 style={{ color: '#282c36', fontWeight: 'normal' }}>3,518,000 원</FontSize16>
									</CompleteInfoInlineDiv>

									<CompleteInfoInlineDiv style={{ marginTop: '9px', borderBottom: '1px solid #e1e2e4' }}>
										<FontSize14 style={{ width: '65px', marginRight: '37px', fontWeight: 'normal' }}>배송비</FontSize14>
										<FontSize16 style={{ color: '#282c36', fontWeight: 'normal', marginBottom: '20px' }}>5,000 원</FontSize16>
									</CompleteInfoInlineDiv>
								</DetailDesc>

								<div>
									<CompleteInfoInlineDiv style={{ marginTop: '20px', marginBottom: '34px' }}>
										<FontSize14 style={{ width: '65px', marginRight: '37px' }}>결재 내역</FontSize14>

										<div>
											<div style={{ width: '202px', display: 'inline-flex', flexWrap: 'nowrap' }}>
												<FontSize14 style={{ fontWeight: 'normal' }}>국민 4432-****-****-219*</FontSize14>
												<FontSize14 style={{ fontWeight: 'normal', marginLeft: '4px' }}>일시불</FontSize14>
											</div>
											<FontSize14 style={{ fontWeight: 'normal' }}>승인일시 : 2021.03.26 12:30</FontSize14>
										</div>
									</CompleteInfoInlineDiv>
								</div>
							</div>
						</CompleteInfoBox>
					</CompleteInfoBackground>

					<WarningTextBox>
						<WarningText>
							<InlineDiv>
								<FontSize14 style={{ color: '#bcbcbc' }}>*</FontSize14>
								<FontSize12>
									확인버튼을 누르신 후, 사파리 브라우져 혹은 쇼핑몰
									<br />
									애플리케이션을 실행하셔야 해당 쇼핑몰을 통해 결제가 진행, 완료됩니다.
								</FontSize12>
							</InlineDiv>
						</WarningText>
					</WarningTextBox>

					<ConfirmBox>
						<ConfirmBtn>
							<FontSize16 style={{ color: '#ffffff', fontWeight: 'bold', marginLeft: '159px' }} onClick={() => alert('확인')}>
								확인
							</FontSize16>
						</ConfirmBtn>
					</ConfirmBox>
					{/* </Containerv1> */}
				</Background>
			</MobiletestDiv>
		);
	}
}

export default MobilePaymentCompleteContainer;

const MarginDiv = styled.div`
	margin-top: 70px;
`;

const MobiletestDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
`;

// image
const SuccessImg = styled.img`
	width: 39px;
	height: 39px;
`;

const DescDropDownImg = styled.img`
	width: 12px;
	height: 6px;
`;

// div
const InlineDiv = styled.div`
	display: inline-flex;
`;

const CompleteInfoInlineDiv = styled.div`
	display: inline-flex;
	justify-content: flex-start;
	width: 302px;
`;

// fontsize
const FontSize12 = styled.p`
	font-size: 12px;
	font-weight: normal;
	line-height: 1.5;
	letter-spacing: normal;
	color: #999999;
`;

const FontSize14 = styled(Title.FontSize14)`
	font-weight: bold;
	line-height: 1.43;
	letter-spacing: normal;
	color: #282c36;
`;

const FontSize16 = styled(Title.FontSize16)`
	font-weight: 500;
	line-height: 1.5;
	letter-spacing: normal;
	color: #282c36;
`;

const FontSize18 = styled(Title.FontSize18)`
	font-weight: bold;
	line-height: 1.5;
	letter-spacing: normal;
	color: #000000;
`;

// body
const CompleteTitle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-bottom: 20px;
`;

const CompleteInfoBackground = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	background-color: #f6f6f6;
	// height: 356px;
`;

const CompleteInfoBox = styled.div`
	margin: 28px 0 32px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 347px;
	background-color: #ffffff;
	border-radius: 5px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
	// height: 296px;
`;

const WarningTextBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-top: 18px;
	margin-bottom: 18px;
`;

const WarningText = styled.div`
	justify-content: center;
	align-items: center;
	width: 295px;
	height: 54px;
`;

const ConfirmBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const ConfirmBtn = styled.button`
	justify-content: center;
	align-items: center;
	width: 347px;
	height: 50px;
	border-radius: 5px;
	border: solid 1px #0933b3;
	background-color: #0933b3;
`;

const DeliveryDescBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 200px;
	margin-bottom: ${props => (props.active ? '6px' : '20px')};
`;

const OrderPriceBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 200px;
	margin-bottom: ${props => (props.active ? '6px' : '20px')};
`;

const DeliveryDesc = styled(FontSize14)`
	font-weight: normal;
`;

const DetailDesc = styled(Title.FontSize14)`
	width: 198px;
	margin-bottom: 20px;
	font-weight: normal;
	display: ${props => (props.active ? 'block' : 'none')};
`;

const CompleteInfoInlineDiv2 = styled.div`
	display: inline-flex;
	justify-content: flex-start;
	width: 302px;
	border-bottom: ${props => (props.active ? 'none' : '1px solid #e1e2e4')};
`;
