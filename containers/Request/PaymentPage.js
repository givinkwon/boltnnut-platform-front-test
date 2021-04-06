import React from 'react';
import styled, { css } from 'styled-components';
import Background from '../../components/Background';
import Containerv1 from '../../components/Containerv1';
import * as Title from '../../components/Title';
import * as Content from '../../components/Content';
import InputComponent from 'components/Input2';

const img = '/static/images/request/PaymentPage/*.png';
const passimg = '/static/images/request/PaymentPage/pass.png';

class PaymentPageContainer extends React.Component {
	render() {
		return (
			<Background>
				<PaymentPageDiv>
					<PaymentPageLeft>
						<LeftHeader>결제 정보 입력</LeftHeader>
						<OrderInfoBox>
							<OrderInfoTitle>주문자 정보</OrderInfoTitle>
						</OrderInfoBox>
						<FontSize20>
							<div>이름</div>
							<NameKor>(한글)</NameKor>
							<img src={img} />
						</FontSize20>
						<InputComponent
							class='Input'
							placeholder='옵션을 선택해주세요.'
							// value={Request.input_name}
							onChange={() => {
								console.log('r');
							}}
						/>
						{/* <NameBox placeholder='옵션을 선택해주세요.' /> */}

						<FontSize20>
							<div>전화번호</div>
							<img src={img} />
						</FontSize20>
						<InlineFlexDiv>
							<PhoneNumBox placeholder={'010'} width={90} />
							{/* <div style={{ width: 90 }}>dd</div> */}
							{/* <div style={{ width: 90 }}>dd</div> */}
							<PhoneNumDash />
							<PhoneNumBox placeholder={'1234'} />
							<PhoneNumDash />
							<PhoneNumBox placeholder={'5678'} />
						</InlineFlexDiv>

						<FontSize20>
							<div>배송주소</div>
							<img src={img} />
						</FontSize20>
						<InlineFlexDiv>
							<DeliveryAddressBox1 />
							<SearchBtn>주소검색</SearchBtn>
						</InlineFlexDiv>
						<DeliveryAddressBox2 />
						<DeliveryAddressBox3
							placeholder={'상세주소를 입력해 주세요'}
						/>

						<FontSize20>
							<div>결제방법</div>
							<img src={img} />
						</FontSize20>
						<PaymentWayBox>
							<PaymentWay>
								<div>신용카드</div>
							</PaymentWay>
							<PaymentWay>
								<div>실시간 계좌이체</div>
							</PaymentWay>
							<PaymentWay>
								<div>후불결제</div>
							</PaymentWay>
						</PaymentWayBox>
					</PaymentPageLeft>

					<PaymentPageRight>
						<PaymentInfoTitle>
							<div>결제정보</div>
						</PaymentInfoTitle>

						<PaymentInfo1>
							<div>생산 소요 시간</div>
							<div>도착 예정일</div>
						</PaymentInfo1>
					</PaymentPageRight>
				</PaymentPageDiv>
			</Background>
		);
	}
}

export default PaymentPageContainer;

const PaymentPageDiv = styled(Containerv1)`
	justify-content: space-between;
`;

// left
const PaymentPageLeft = styled.div`
	display: flex;
	flex-direction: column;
	width: 588px;
`;

const PaymentPageRight = styled.div`
	display: flex;
	flex-direction: column;
	width: 588px;
	height: 934px;
	margin-top: 202px;
	// margin-left: 24px;
	// padding: 35px 0 38px;
	object-fit: contain;
	border-radius: 5px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
	background-color: var(--white);
`;

const InlineFlexDiv = styled.div`
	display: inline-flex;
`;

const LeftHeader = styled(Title.FontSize26)`
	margin-top: 154px;
	padding-left: 4px;
	font-family: NotoSansCJKkr;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.54;
	letter-spacing: -0.65px;
	color: #414550;
`;

const OrderInfoBox = styled(Title.FontSize24)`
	display: flex;
	width: 100%;
	height: 95px;
	padding-left: 4px;
	padding-bottom: 3px;
	margin-top: 10px;
	border-top: 3px solid black;
	border-bottom: 3px solid #c6c7cc;
	background-color: #f6f6f6;
	font-family: NotoSansCJKkr;
	font-size: 24px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.67;
	letter-spacing: -0.6px;
	text-align: left;
	color: #282c36;
`;

const OrderInfoTitle = styled.div`
	margin-top: 49px;
`;

const FontSize20 = styled.div`
	display: inline-flex;
	margin-top: 24px;
	margin-bottom: 10px;
	padding-left: 4px;
	font-family: NotoSansCJKkr;
	font-size: 20px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.7;
	letter-spacing: -0.5px;
	color: #282c36;
`;

const NameKor = styled(Title.FontSize16)`
	margin-top: 4px;
	margin-left: 6px;
	color: #999999;
`;

const PhoneNumBox = styled(InputComponent)`
	// .sOZqz {
	// 	width: 90px !important;
	// }
	// width: 12px !important;
	// height: 44px;
	// margin-top: 10px;
	// margin-left: 4px;
	// object-fit: contain;
	// border-radius: 3px;
	// border: solid 1px #c6c7cc;
	// ::placeholder {
	// 	color: #c6c7cc;
	// }
	// font-size: 18px;
`;

const PhoneNumDash = styled.div`
	width: 10px;
	height: 0;
	margin: 33px 18px 0 16px;
	object-fit: contain;
	border: solid 1px #282c36;
`;

const DeliveryAddressBox1 = styled.input`
	width: 463px;
	height: 44px;
	margin-top: 10px;
	margin-left: 4px;
	object-fit: contain;
	border: none;
	background-color: #f6f6f6;
	padding-left: 10px;
	font-size: 18px;
`;

const DeliveryAddressBox2 = styled.input`
	width: 588px;
	height: 44px;
	margin-top: 10px;
	margin-left: 4px;
	object-fit: contain;
	border: none;
	background-color: #f6f6f6;
	padding-left: 10px;
	font-size: 18px;
`;

const SearchBtn = styled.button`
	width: 113px;
	margin-top: 10px;
	margin-left: 12px;
	height: 44px;
	border-radius: 3px;
	border: solid 1px #c6c7cc;
	font-size: 18px;
	background-color: white;
`;

const DeliveryAddressBox3 = styled.input`
	width: 588px;
	height: 44px;
	border: solid 1px #e1e2e4;
	border-radius: 3px;
	margin-top: 10px;
	margin-left: 4px;
	font-size: 18px;
	::placeholder {
		color: #c6c7cc;
	}
`;

const PaymentWayBox = styled.div`
	display: inline-flex;
	justify-content: space-between;
`;

const PaymentWay = styled.div`
	width: 188px;
	height: 118px;
	border-radius: 3px;
	border: solid 2px #e1e2e4;
`;

// right
const PaymentInfoTitle = styled(Title.FontSize24)`
	width: 91px;
	height: 36px;
	margin-top: 35px;
	margin-left: 38px;
	font-family: NotoSansCJKkr;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.67;
	letter-spacing: -0.6px;
	text-align: left;
	color: #282c36;
`;

const PaymentInfo1 = styled.div`
	width: 512px;
	heigth: 134px;
	margin-top: 26px;
	margin-left: 38px;
	border-top: solid 1px #c6c7cc;
`;
