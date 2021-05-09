import React from 'react';
import styled from 'styled-components';
import Background from 'components/Background';
import Containerv1 from 'components/Containerv1';
import * as Title from 'components/Title';
import Router from 'next/router';

class MobileRequestComplete extends React.Component {
	render() {
		return (
			<Background>
				<Containerv1>
					<RequestCompleteBox>
						<RequestCompleteTitle>
							<FontSize26 style={{ marginBottom: '20px' }}>
								고객님의 제조 상담이 접수 되었습니다.
							</FontSize26>
						</RequestCompleteTitle>

						<RequestCompleteDesc>
							<InlineDiv
								style={{ alignItems: 'center', justifyContent: 'center' }}
							>
								<FontSize22>
									문의에 적합한 전문 제조사들이 의뢰주신 상담 내용을 확인한 후
								</FontSize22>
							</InlineDiv>
							<InlineDiv
								style={{ alignItems: 'center', justifyContent: 'center' }}
							>
								<FontSize22>
									상담에 대한 답변을 드립니다. 답변이 도착하면 카카오톡으로 알려드립니다.
								</FontSize22>
							</InlineDiv>
						</RequestCompleteDesc>

						<ButtonBox>
							<HomeBtn onClick={() => Router.push('/')}>홈으로 가기</HomeBtn>

							<MyProjectBtn onClick={() => Router.push('/project')}>내 프로젝트 보기</MyProjectBtn>
						</ButtonBox>
					</RequestCompleteBox>
				</Containerv1>
			</Background>
		);
	}
}

export default MobileRequestComplete;

// global
const InlineDiv = styled.div`
	display: inline-flex;
`;

// fontsize
const FontSize26 = styled(Title.FontSize26)`
	font-weight: bold;
	line-height: 1.31;
	letter-spacing: -0.65px;
	color: #0a2165;
`;

const FontSize24 = styled(Title.FontSize24)`
	font-weight: bold;
	line-height: 1.67;
	letter-spacing: -0.6px;
	color: #282c36;
`;

const FontSize22 = styled(Title.FontSize22)`
	font-weight: normal;
	line-height: 1.82;
	letter-spacing: -0.55px;
	color: #282c36;
`;

const FontSize20 = styled(Title.FontSize20)`
	font-weight: bold;
	line-height: 2.6;
	letter-spacing: -0.5px;
	color: #ffffff;
`;

const FontSize18 = styled(Title.FontSize18)`
	font-weight: normal;
	line-height: 1.89;
	letter-spacing: -0.45px;
	color: #111111;
`;

// body
const RequestCompleteBox = styled.div`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 496px;
	margin-top: 60px;
	margin-bottom: 200px;
	border-radius: 10px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
	background-color: #ffffff;
	padding-left : 5%;
	padding-right : 5%;
`;

const RequestCompleteTitle = styled.div`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-left: 5%;
	margin-right: 5%;
	border-bottom: solid 1px #c6c7cc;
`;

const RequestCompleteDesc = styled.div`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-top: 30px;
	margin-bottom: 90px;
	width: 100%;
	margin-left: 5%;
	margin-right: 5%;
`;

const ButtonBox = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-left: 5%;
	margin-right: 5%;
`;

const HomeBtn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 61px;
	border-radius: 5px;
	border: solid 1px #0933b3;
	cursor: pointer;
	font-size: 20px;
	margin-left : 5%;
	margin-right : 5%;
	font-weight: bold;
	line-height: 2.6;
	letter-spacing: -0.5px;
	color: #0933b3;
	}
	&:hover {
		transition: all 0.5s;
		border: solid 1px #0a2165;
		background-color: #f6f6f6;
		color: #0a2165;
	}
`;

const MyProjectBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 61px;
  border-radius: 5px;
  border: solid 1px #0933b3;
  cursor: pointer;
  background-color: #0933b3;
  font-size: 18px;
  font-weight: bold;
  line-height: 2.6;
  letter-spacing: -0.5px;
  margin-left : 5%;
  margin-right : 5%;
  color: #ffffff;
	&:hover {
		transition: all 0.5s;
		background-color: #0a2165;
	}
`;

const FontSize14 = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.86;
  letter-spacing: -0.14px;
  color: #282c36;
`;