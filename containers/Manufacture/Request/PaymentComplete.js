import Divider from 'material-ui/Divider';
import React from 'react';
import styled, { css } from 'styled-components';
import Background from 'components/Background';
import Containerv1 from 'components/Containerv1';
import * as Title from 'components/Title';

const success = '/static/images/request/PaymentComplete/success.png';

const CompleteInfoTitle = styled.div`
	margin: 0 auto;
	margin-top: 115px;
	margin-bottom: 70px;
`;

const CompleteInfoImg = styled.div`
	display: flex;
	justify-content: center;
`;

const CompleteInfoDesc = styled.div`
	display: inline-flex;
	margin-top: 20px;
`;

class PaymentCompleteContainer extends React.Component {
	render() {
		return (
			<Background>
				<Containerv1 style={{ flexDirection: 'column' }}>
					<CompleteInfoTitle>
						<CompleteInfoImg style={{ display: 'flex', justifyContent: 'center' }}>
							<img src={success}></img>
						</CompleteInfoImg>
						<CompleteInfoDesc style={{ display: 'inline-flex', marginTop: '20px' }}>
							<FontSize32>주문이 정상적으로 완료</FontSize32>
							<FontSize32 style={{ color: '#282c36' }}>되었습니다.</FontSize32>
						</CompleteInfoDesc>
					</CompleteInfoTitle>

					<CompleteInfoBackground>
						<CompleteInfoBox>
							<CompleteInfoLeft>
								<InlineFlexDiv style={{ marginTop: '76px', borderBottom: `1px solid #c6c7cc` }}>
									<FontSize20 style={{ marginBottom: '12px' }}>주문번호</FontSize20>
									<FontSize18 style={{ marginBottom: '12px' }}>2021032947895761</FontSize18>
								</InlineFlexDiv>

								<InlineFlexDiv style={{ marginTop: '154px', marginBottom: '10px', borderBottom: `1px solid #c6c7cc` }}>
									<FontSize20 style={{ marginBottom: '12px' }}>배송지정보</FontSize20>
									<FontSize18 style={{ color: '#414550', fontWeight: 'normal', marginBottom: '12px' }}>박찬아 (010-4114-9296)</FontSize18>
								</InlineFlexDiv>

								<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
									<FontSize18 style={{ color: '#767676', width: '312px', fontWeight: 'normal', textAlign: 'right' }}>(03111) 서울 특별시 종로구 보문로 7길 4-4 (숭인동) 아쿠아빌 202호</FontSize18>
								</div>
							</CompleteInfoLeft>

							<CompleteInfoRight>
								<InlineFlexDiv style={{ marginTop: '76px', borderBottom: `1px solid #c6c7cc` }}>
									<FontSize20 style={{ marginBottom: '12px' }}>주문금액</FontSize20>
									<FontSize18 style={{ marginBottom: '12px' }}>3,518,000원</FontSize18>
								</InlineFlexDiv>

								<InlineFlexDiv>
									<FontSize18 style={{ color: '#767676', fontWeight: 'normal', marginTop: '10px' }}>부품가격</FontSize18>
									<FontSize18 style={{ color: '#414550', marginTop: '10px' }}>3,513,000원</FontSize18>
								</InlineFlexDiv>
								<InlineFlexDiv>
									<FontSize18 style={{ color: '#767676', fontWeight: 'normal', marginTop: '12px' }}>배송비</FontSize18>
									<FontSize18 style={{ color: '#414550', marginTop: '12px' }}>5,000원</FontSize18>
								</InlineFlexDiv>

								<InlineFlexDiv style={{ marginTop: '73px', borderBottom: `1px solid #c6c7cc` }}>
									<FontSize20 style={{ marginBottom: '12px' }}>결제 내역</FontSize20>
									<FontSize18 style={{ marginBottom: '12px' }}>3,518,000원</FontSize18>
								</InlineFlexDiv>

								<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
									<FontSize18 style={{ color: '#767676', fontWeight: 'normal' }}>국민 9490-****-****-****</FontSize18>
									<FontSize18 style={{ color: '#767676', fontWeight: 'normal', marginLeft: '20px' }}>일시불</FontSize18>
								</div>
								<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
									<FontSize18 style={{ color: '#767676', fontWeight: 'normal' }}>승인일시 : 2021.03.26 12:30</FontSize18>
								</div>
							</CompleteInfoRight>
						</CompleteInfoBox>
					</CompleteInfoBackground>

					<div style={{ display: 'inline-flex', marginTop: '60px', justifyContent: 'center' }}>
						<CompleteBtn onClick={() => alert('구매내역 보기')}>
							<FontSize20 style={{ color: '#0933b3', fontWeight: 'bold', textAlign: 'center' }}>구매내역 보기</FontSize20>
						</CompleteBtn>

						<CompleteBtn onClick={() => alert('홈으로가기')} style={{ backgroundColor: '#0933b3', marginLeft: '22px' }}>
							<FontSize20 style={{ color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>홈으로가기</FontSize20>
						</CompleteBtn>
					</div>
				</Containerv1>
			</Background>
		);
	}
}

export default PaymentCompleteContainer;

const InlineFlexDiv = styled.div`
	display: flex;
	justify-content: space-between;
`;

const FontSize32 = styled(Title.FontSize32)`
	font-weight: 500;
	line-height: 1.06;
	letter-spacing: -0.8px;
	color: #0933b3;
`;

const FontSize20 = styled(Title.FontSize20)`
	font-weight: bold;
	line-height: 1.7;
	letter-spacing: -0.5px;
	color: #282c36;
`;

const FontSize18 = styled(Title.FontSize18)`
	font-weight: 500;
	line-height: 1.89;
	letter-spacing: -0.45px;
	color: #0933b3;
`;

const CompleteInfoBackground = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 556px;
	background-color: #f6f6f6;
`;

const CompleteInfoBox = styled.div`
	display: flex;
	justify-content: space-around;
	width: 1200px !important;
	height: 436px;
	border-radius: 5px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
	background-color: #ffffff;
`;

const CompleteInfoLeft = styled.div`
	width: 460px;
`;

const CompleteInfoRight = styled.div`
	width: 460px;
`;

const CompleteBtn = styled.button`
	width: 226px;
	height: 61px;
	border-radius: 5px;
	border: solid 1px #0933b3;
	background-color: #ffffff;
`;
