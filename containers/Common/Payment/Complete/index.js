import Divider from 'material-ui/Divider';
import React from 'react';
import styled, { css } from 'styled-components';
import Background from 'components/Background';
import Containerv1 from 'components/Containerv1';
import * as Title from 'components/Title';
import Router from 'next/router';
import { inject, observer } from "mobx-react";

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

@inject("Payment", "AutoEstimate")
@observer
class PaymentCompleteContainer extends React.Component {
	render() {
        const { Payment, AutoEstimate } = this.props;
		return (
			<Background>
				<Containerv1 style={{ flexDirection: 'column' }}>
					<CompleteInfoTitle>
						<CompleteInfoImg style={{ display: 'flex', justifyContent: 'center' }}>
							<img src={success}></img>
						</CompleteInfoImg>
						<CompleteInfoDesc style={{ display: 'block', marginTop: '20px' }}>
							<FontSize32>발주 요청이 정상적으로 완료되었습니다.</FontSize32>
                            <br/>
                            <FontSize32 style={{ color: '#282c36' }}>배정된 프로젝트 매니저가 검토 후 1영업일 내로 연락드립니다.</FontSize32>
                        </CompleteInfoDesc>
					</CompleteInfoTitle>

					<CompleteInfoBackground>
						<CompleteInfoBox>
							<CompleteInfoLeft>
								<InlineFlexDiv style={{ marginTop: '76px', borderBottom: `1px solid #c6c7cc` }}>
									<FontSize20 style={{ marginBottom: '12px' }}>주문번호</FontSize20>
									<FontSize18 style={{ marginBottom: '12px' }}>2947895761</FontSize18>
								</InlineFlexDiv>

								<InlineFlexDiv style={{ marginTop: '154px', marginBottom: '10px', borderBottom: `1px solid #c6c7cc` }}>
									<FontSize20 style={{ marginBottom: '12px' }}>배송지정보</FontSize20>
									<FontSize18 style={{ color: '#414550', fontWeight: 'normal', marginBottom: '12px' }}>{Payment.Name} ( {Payment.PhoneNumber} )</FontSize18>
								</InlineFlexDiv>

								<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
									<FontSize18 style={{ color: '#767676', width: '312px', fontWeight: 'normal', textAlign: 'right' }}>{Payment.Location}</FontSize18>
								</div>
							</CompleteInfoLeft>

							<CompleteInfoRight>
								<InlineFlexDiv style={{ marginTop: '76px', borderBottom: `1px solid #c6c7cc` }}>
									<FontSize20 style={{ marginBottom: '12px' }}>주문금액</FontSize20>
									<FontSize18 style={{ marginBottom: '12px' }}>{(Math.round(AutoEstimate.totalPrice/1000) * 1000 + 5000).toLocaleString("ko-KR")} 원</FontSize18>
								</InlineFlexDiv>

								<InlineFlexDiv>
									<FontSize18 style={{ color: '#767676', fontWeight: 'normal', marginTop: '10px' }}>부품가격</FontSize18>
									<FontSize18 style={{ color: '#414550', marginTop: '10px' }}>{(Math.round(AutoEstimate.totalPrice/1000) * 1000).toLocaleString("ko-KR")}원</FontSize18>
								</InlineFlexDiv>
								<InlineFlexDiv>
									<FontSize18 style={{ color: '#767676', fontWeight: 'normal', marginTop: '12px' }}>배송비</FontSize18>
									<FontSize18 style={{ color: '#414550', marginTop: '12px' }}>5,000원</FontSize18>
								</InlineFlexDiv>

								<InlineFlexDiv style={{ marginTop: '73px', borderBottom: `1px solid #c6c7cc` }}>
									<FontSize20 style={{ marginBottom: '12px' }}>예상 납기일</FontSize20>
									<FontSize18 style={{ marginBottom: '12px' }}>{AutoEstimate.totalPeriod} 영업일</FontSize18>
								</InlineFlexDiv>

								<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
									<FontSize18 style={{ color: '#767676', fontWeight: 'normal' }}>배송 예정일 : 생산완료 후 1영업일 이내</FontSize18>

								</div>

							</CompleteInfoRight>
						</CompleteInfoBox>
					</CompleteInfoBackground>

					<div style={{ display: 'inline-flex', marginTop: '60px', marginBottom: 230, justifyContent: 'center' }}>
						{/* <CompleteBtn onClick={() => Router.push('/request')}>
							<FontSize20 style={{ color: '#0933b3', fontWeight: 'bold', textAlign: 'center' }}>제조사 찾아보기</FontSize20>
						</CompleteBtn> */}

						<CompleteBtn onClick={() => Router.push('/')} style={{ backgroundColor: '#0933b3', marginLeft: '22px' }}>
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
    text-align : center!important;
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
	@media (min-width: 0px) and (max-width: 767.98px) {
		height: 100%;
	}
`;

const CompleteInfoBox = styled.div`
	display: flex;
	justify-content: space-around;
	width: 1200px !important;
	height: 436px;
	border-radius: 5px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
	background-color: #ffffff;
	@media (min-width: 0px) and (max-width: 767.98px) {
		display: block;
		height: 100%;
	}
`;

const CompleteInfoLeft = styled.div`
	width: 460px;
	@media (min-width: 0px) and (max-width: 767.98px) {
		width: 90%;
		margin-left: 5%;
		margin-right: 5%;
	}
`;

const CompleteInfoRight = styled.div`
	width: 460px;
	@media (min-width: 0px) and (max-width: 767.98px) {
		width: 90%;
		margin-left: 5%;
		margin-right: 5%;
		margin-bottom : 50px;
	}
`;

const CompleteBtn = styled.button`
	width: 226px;
	height: 61px;
	border-radius: 5px;
	border: solid 1px #0933b3;
	background-color: #ffffff;
`;
