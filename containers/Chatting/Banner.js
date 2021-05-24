import React from 'react';
import styled from 'styled-components';

import * as Text from 'components/Text';
import { WHITE } from 'static/style';
import Background from 'components/Background';
import Container from 'components/Containerv1';
import * as Title from '../../components/Title';
import * as Content from 'components/Content';
const BackImg = 'static/images/answer/MaskGroup/MaskGroup77.png';

import { inject, observer } from 'mobx-react';

@inject('Auth')
@observer
class BannerConatiner extends React.Component {
	render() {
		const { Auth } = this.props;
		return (
			<Background
				src={BackImg}
				backgroundColor={'#000000'}
				style={{ height: 208, opacity: 0.9 }}
			>
				<Container>
					{Auth.logged_in_client && (
						<Item>
							<div
								style={{
									display: 'inline-flex',
									alignItems: 'flex-end',
									height: '59px',
									marginBottom: '15px',
								}}
							>
								<FontSize40>채팅하기</FontSize40>
							</div>
							<FontSize22>
								상담중인 제조사와 채팅으로 소통해보세요
							</FontSize22>
						</Item>
					)}
					{Auth.logged_in_partner && (
						<Item>
							<div
								style={{
									display: 'inline-flex',
									alignItems: 'flex-end',
									height: '59px',
									marginBottom: '15px',
								}}
              >
								<FontSize40>
									채팅하기
								</FontSize40>
							</div>
							<FontSize22>
                답변한 프로젝트의 클라이언트와 채팅으로 소통해보세요
							</FontSize22>
						</Item>
					)}
				</Container>
			</Background>
		);
	}
}

export default BannerConatiner;

const Item = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	width: 100%;

	@media (min-width: 0px) and (max-width: 767.98px) {
		height: 180px;
		> p:nth-of-type(2) {
			margin-top: 16px;
		}
	}
	@media (min-width: 768px) and (max-width: 991.98px) {
		height: 208px;
	}
	@media (min-width: 992px) and (max-width: 1299.98px) {
		height: 208px;
	}
	@media (min-width: 1300px) {
		height: 208px;
	}

	> p {
		line-height: 1.5em;
		word-break: keep-all;
	}

	> p:nth-of-type(2) {
		margin-top: 8px;
	}
	> p:nth-of-type(3) {
		line-height: 1.3;
	}
`;

const Banner = styled.div`
	background-image: url('/static/images/answer/MaskGroup/MaskGroup77.png');
	background-position: center;
	background-size: cover;
	background-color: #000204;

	${Container} {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;

		> p {
			line-height: 1.25em;
			word-break: keep-all;
		}

		> p:nth-of-type(2) {
			margin-top: 8px;
		}
		> p:nth-of-type(3) {
			line-height: 1.3;
		}
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
		height: 180px;
		> p:nth-of-type(2) {
			margin-top: 16px;
		}
	}
	@media (min-width: 768px) and (max-width: 991.98px) {
		height: 200px;
	}
	@media (min-width: 992px) and (max-width: 1299.98px) {
		height: 230px;
	}
	@media (min-width: 1300px) {
		height: 250px;
	}
`;

const FontSize40 = styled(Title.FontSize40)`
	font-family: NotoSansCJKkr;
	font-size: 40px;
	font-weight: 500;
  font-stretch: normal;
  font-style: normal;

	line-height: 1.95 !important;
	letter-spacing: -1px !important;
	color: #ffffff;
`;


const FontSize22 = styled(Content.FontSize22)`
	font-family: NotoSansCJKkr;
	font-size: 22px;
	font-weight: normal;
	line-height: 1.82 !important;
	letter-spacing: -0.55px !important;
	color: #ffffff;
`;
