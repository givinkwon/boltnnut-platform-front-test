import React from 'react';
import styled from 'styled-components';
import * as Content from 'components/Content';
import * as Title from 'components/Title';
import Buttonv1 from 'components/Buttonv1';

const profile = '/static/images/project/user.svg';
const partnerbadge = '/static/images/project/partnerbadge.svg';

class ContentSub extends React.Component {
	render() {
		return (
			<ContainerSub>
				<Box3 style={{ marginBottom: 20 }}>
					<Font18 style={{ color: '#ffffff', fontWeight: 'bold' }}>
						프로젝트 지원하기
					</Font18>
				</Box3>
				<Box3 style={{ backgroundColor: '#ffffff' }}>
					<Font18 style={{ color: '#0933b3', fontWeight: 'bold' }}>
						관심 프로젝트 등록
					</Font18>
				</Box3>

				<PartnerContainer>
					<img src={profile} style={{ width: 42, height: 35 }}></img>
					<img src={partnerbadge} style={{ marginLeft: 22 }}></img>
				</PartnerContainer>
				<ApplicationStatus>
					<div>
						<Font16>프로젝트 지원</Font16>
						<Font16>관심 프로젝트</Font16>
					</div>
					<div>
						<Font16 style={{ color: '#0933b3' }}>2</Font16>
						<Font16 style={{ color: '#0933b3' }}>4</Font16>
					</div>
				</ApplicationStatus>
			</ContainerSub>
		);
	}
}

export default ContentSub;

const ContainerSub = styled.div`
	width: 180px;
	display: flex;
	flex-direction: column;
	margin-left: 24px;
`;

const Box3 = styled(Buttonv1)`
	border-radius: 5px;
	display: flex;
	width: 100% !important;
	height: 46px !important;
	box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
	justify-content: center;
	align-items: center;
	border: solid 1px #0933b3;
	box-sizing: border-box;
`;

const PartnerContainer = styled.div`
	margin-top: 48px;
	display: inline-flex;
	flex-direction: row;
	padding-bottom: 22px;
	border-bottom: solid 2px #e1e2e4;
`;
const ApplicationStatus = styled.div`
	display: inline-flex;
	flex-direction: row;
	margin-top: 13px;
	justify-content: space-between;
	> div {
		flex-direction: column;
		> p {
			margin-bottom: 12px;
		}
	}
`;
const Font16 = styled(Content.FontSize16)`
	font-weight: normal;
	letter-spacing: -0.4px !important;
	color: #282c36;
	line-height: 1.5;
`;

const Font18 = styled(Content.FontSize18)`
	color: #282c36;
	display: flex;
	align-items: center;
	line-height: 1.5;
	justify-content: center;
	letter-spacing: -0.45px !important;
`;
