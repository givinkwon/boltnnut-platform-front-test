import React from 'react';
import styled, { css } from 'styled-components';
import Background from '../../components/Background';
import Containerv1 from '../../components/Containerv1';
import * as Title from '../../components/Title';
import InputComponent from 'components/Input2';
import { inject, observer } from 'mobx-react';
import Calendar from './Calendar2';
import AddFile from 'AddFile';
import AddFile2 from 'AddFile2';
import * as RequestAPI from '../../axios/Request';

const checkcircle =
	'/static/images/request/NoneDrawingConsulting/checkcircle.svg';
const pass3 = 'static/images/pass3.png';

@inject('ManufactureProcess', 'Schedule', 'Auth')
@observer
class NoneDrawingConsultingContainer extends React.Component {
	state = {
		selectedIdx: 0,
		purposeselected1: false,
		purposeselected2: false,
		purposeselected3: false,
		projectname: '',
		purpose: {},
		duecheck: '',
		checkFileUpload: false,
		minRows: 7,
		maxRows: 100,
		rows: 7,
		opendesc: '',
		privatedesc: '',
	};

	submit = () => {
		const { purpose, projectname } = this.state;
		const { Schedule, ManufactureProcess, Auth } = this.props;

		const formData = {
			user: Auth.logged_in_user.id,
			request_state: purpose,
			name: projectname,
			deadline: Schedule.clickDay,
			deadline_state: ManufactureProcess.deliverystate,
			order_request_open: ManufactureProcess.requestComment,
			order_request_close: ManufactureProcess.requestComment2,
			file_open: ManufactureProcess.openFileArray,
			file_close: ManufactureProcess.privateFileArray,
		};

		const req = {
			data: formData,
		};
		console.log(formData);
		// RequestAPI.create(formData).then(res => console.log(res));
	};

	// unitCheckboxhandler
	unitCheckboxHandler = idx => {
		this.setState({ selectedIdx: idx });
	};

	activeHandler = idx => {
		if (this.state.selectedIdx === idx) {
			return true;
		} else {
			return false;
		}
	};

	// purposecheckboxhandler
	purposeCheckboxHandlerOne = index => {
		const { purpose } = this.state;
		if (this.state.purposeselected1 === false) {
			this.setState({ purposeselected1: true });
			this.setState({
				state: { ...this.state.state, purpose: (purpose.id1 = index) },
			});
			console.log(purpose);
		} else if (this.state.purposeselected1 === true) {
			this.setState({ purposeselected1: false });
			this.setState({
				state: { ...this.state.state, purpose: delete purpose.id1 },
			});
			console.log(purpose);
		}
	};

	purposeCheckboxHandlerTwo = index => {
		const { purpose } = this.state;
		if (this.state.purposeselected2 === false) {
			this.setState({ purposeselected2: true });
			this.setState({
				state: { ...this.state.state, purpose: (purpose.id2 = index) },
			});
			console.log(purpose);
		} else if (this.state.purposeselected2 === true) {
			this.setState({ purposeselected2: false });
			this.setState({
				state: { ...this.state.state, purpose: delete purpose.id2 },
			});
			console.log(purpose);
		}
	};

	purposeCheckboxHandlerthree = index => {
		const { purpose } = this.state;

		if (this.state.purposeselected3 === false) {
			this.setState({ purposeselected3: true });
			this.setState({
				state: { ...this.state.state, purpose: (purpose.id3 = index) },
			});
			console.log(purpose);
		} else {
			this.setState({ purposeselected3: false });
			this.setState({
				state: { ...this.state.state, purpose: delete purpose.id3 },
			});
			console.log(purpose);
		}
	};

	// date_conference
	dateConferenceWayClick = idx => {
		const { ManufactureProcess } = this.props;

		ManufactureProcess.date_conference_idx = idx;

		if (ManufactureProcess.date_conference_idx === 1) {
			ManufactureProcess.deliverystate = '납기일 협의 가능';
		}

		if (ManufactureProcess.date_conference_idx === 2) {
			ManufactureProcess.deliverystate = '납기일 미정';
		}
		console.log(ManufactureProcess.date_conference_idx);
		console.log(ManufactureProcess.deliverystate);
	};

	dateConferenceActiveHandler = idx => {
		const { ManufactureProcess } = this.props;

		if (ManufactureProcess.date_conference_idx === idx) {
			return true;
		} else {
			return false;
		}
	};

	// textarea
	handleChange = event => {
		const textareaLineHeight = 34;
		const { minRows, maxRows } = this.state;
		const { ManufactureProcess } = this.props;
		const previousRows = event.target.rows;
		event.target.rows = minRows; // reset number of rows in textarea

		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

		if (currentRows === previousRows) {
			event.target.rows = currentRows;
		}

		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}

		this.setState({
			opendesc: event.target.opendesc,
			rows: currentRows < maxRows ? currentRows : maxRows,
		});

		ManufactureProcess.requestComment = event.target.value;
	};

	handleChange2 = event => {
		console.log(event.target.value);
		const textareaLineHeight = 34;
		const { minRows, maxRows } = this.state;
		const { ManufactureProcess } = this.props;
		const previousRows = event.target.rows;
		event.target.rows = minRows; // reset number of rows in textarea

		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

		if (currentRows === previousRows) {
			event.target.rows = currentRows;
		}

		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}

		this.setState({
			privatedesc: event.target.privatedesc,
			rows: currentRows < maxRows ? currentRows : maxRows,
		});

		ManufactureProcess.requestComment2 = event.target.value;
	};

	render() {
		const openPlaceHolderText = `모두에게 공개될 수 있는 내용을 입력해주세요.
		다음 사항이 명확하게 작성되어야 정확한 견적을 받을 가능성이 높습니다.
		1. 가공품 목적 및 사용 환경
		2. 가공 부품별 특이 사항
		3. 공급처가 충족해야하는 발주 조건
		`;

		const privatePlaceholderText = `회사의 세부적인 기술과 관련하여 외부로 유출되지 않아야 할 내용을 입력해주세요.`;

		const { ManufactureProcess } = this.props;

		const {
			projectname,
			row,
			column,
			height,
			unit,
			purpose,
			duedate,
			duecheck,
		} = this.state;

		return (
			<Background>
				<Containerv1 style={{ flexDirection: 'column' }}>
					<PurposeBox>
						<InlineDiv>
							<FontSize24>문의 목적</FontSize24>
							<div style={{ display: 'flex', alignItems: 'flex-end' }}>
								<FontSize16 style={{ height: '24px', lineHeight: '1' }}>
									(중복 선택 가능)
								</FontSize16>
							</div>
						</InlineDiv>

						<SelectBox style={{ width: '555px', marginTop: '16px' }}>
							<InlineDiv style={{ alignItems: 'flex-end' }}>
								<PurposeSelectCircle
									active={this.state.purposeselected1}
									onClick={() => this.purposeCheckboxHandlerOne('상담요청')}
								>
									<PusrposeFontSize18 active={this.state.purposeselected1}>
										상담요청
									</PusrposeFontSize18>
								</PurposeSelectCircle>
							</InlineDiv>

							<InlineDiv style={{ alignItems: 'flex-end' }}>
								<PurposeSelectCircle
									active={this.state.purposeselected2}
									onClick={() => this.purposeCheckboxHandlerTwo('견적요청')}
								>
									<PusrposeFontSize18 active={this.state.purposeselected2}>
										견적요청
									</PusrposeFontSize18>
								</PurposeSelectCircle>
							</InlineDiv>

							<InlineDiv style={{ alignItems: 'flex-end' }}>
								<PurposeSelectCircle
									active={this.state.purposeselected3}
									onClick={() => this.purposeCheckboxHandlerthree('업체수배')}
								>
									<PusrposeFontSize18 active={this.state.purposeselected3}>
										업체수배
									</PusrposeFontSize18>
								</PurposeSelectCircle>
							</InlineDiv>
						</SelectBox>
					</PurposeBox>
					<ProjectTitleBox>
						<InlineDiv>
							<FontSize24>프로젝트 제목</FontSize24>
						</InlineDiv>

						<InlineDiv style={{ marginTop: '16px' }}>
							<InputComponent
								class='Input'
								placeholder='프로젝트 제목을 입력해주세요.'
								onChange={e => {
									this.setState({ projectname: e });
								}}
							/>
						</InlineDiv>
					</ProjectTitleBox>

					<DeliveryDateBox>
						<FontSize24>납기 일</FontSize24>

						<DeliveryDateInnerBox>
							<InlineDiv style={{ width: '798px', backgroundColor: '#ffffff' }}>
								<Calendar />
							</InlineDiv>

							<CenterInlineDiv>
								<DateImgBox
									onClick={() => {
										this.dateConferenceWayClick(1);
									}}
									active={this.dateConferenceActiveHandler(1)}
								>
									<img src={pass3} />
								</DateImgBox>
								<FontSize16>납기일 협의 가능</FontSize16>
							</CenterInlineDiv>

							<CenterInlineDiv>
								<DateImgBox
									onClick={() => {
										this.dateConferenceWayClick(2);
									}}
									active={this.dateConferenceActiveHandler(2)}
								>
									<img src={pass3} />
								</DateImgBox>
								<FontSize16>납기일 미정</FontSize16>
							</CenterInlineDiv>
						</DeliveryDateInnerBox>
					</DeliveryDateBox>

					<FontSize24>프로젝트 설명 및 요청사항</FontSize24>
					<Request>
						<div>
							<FontSize20 style={{ lineHeight: '1', fontWeight: '500' }}>
								공개 내용
							</FontSize20>
						</div>

						<textarea
							placeholder={`${openPlaceHolderText}`}
							onFocus={e => (e.target.placeholder = `${openPlaceHolderText}`)}
							onBlur={e => (e.target.placeholder = `${openPlaceHolderText}`)}
							rows={this.state.rows}
							value={this.state.opendesc}
							className={'textarea'}
							placeholderStyle={{ fontWeight: '400' }}
							onChange={this.handleChange}
						/>
					</Request>

					<Request>
						<div>
							<FontSize20 style={{ lineHeight: '1', fontWeight: '500' }}>
								비공개 내용
							</FontSize20>
						</div>

						<textarea
							placeholder={`${privatePlaceholderText}`}
							onFocus={e =>
								(e.target.placeholder = `${privatePlaceholderText}`)
							}
							onBlur={e => (e.target.placeholder = `${privatePlaceholderText}`)}
							rows={this.state.rows}
							value={this.state.privatedesc}
							className={'textarea'}
							placeholderStyle={{ fontWeight: '400' }}
							onChange={this.handleChange2}
						/>
					</Request>

					<InlineDiv style={{ marginBottom: '15px' }}>
						<FontSize24>참고 파일</FontSize24>
						<div style={{ display: 'flex', alignItems: 'flex-end' }}>
							<FontSize18 style={{ color: '#86888c', marginLeft: '12px' }}>
								이미지 혹은 PDF 자료만 업로드 가능합니다. 전문 설계 용어와
								기호를 사용해 주시면 좋습니다.
							</FontSize18>
						</div>
					</InlineDiv>

					<Reference>
						<InlineDiv
							style={{
								marginBottom: '12px',
								backgroundColor: '#f6f6f6',
								border: 'none',
							}}
						>
							<div style={{ display: 'flex', alignItems: 'flex-end' }}>
								<FontSize20 style={{ fontWeight: '500', lineHeight: '1' }}>
									공개 자료
								</FontSize20>
							</div>
							<div style={{ display: 'flex', alignItems: 'flex-end' }}>
								<FontSize18
									style={{
										color: '#86888c',
										marginLeft: '12px',
										lineHeight: '1',
									}}
								>
									모두에게 공개될 수 있는 자료를 첨부해주세요.
								</FontSize18>
							</div>
						</InlineDiv>

						<span style={{ display: 'inline-block' }}>
							<AddFile2
								file={true}
								isOpen={true}
								onChange={this.handleChange}
							/>
							<div></div>
						</span>

						<InlineDiv
							style={{
								marginBottom: '12px',
								backgroundColor: '#f6f6f6',
								border: 'none',
								marginTop: '25px',
							}}
						>
							<div style={{ display: 'flex', alignItems: 'flex-end' }}>
								<FontSize20 style={{ fontWeight: '500', lineHeight: '1' }}>
									비공개 자료
								</FontSize20>
							</div>
						</InlineDiv>

						<span style={{ display: 'inline-block' }}>
							<AddFile2
								file={true}
								isOpen={false}
								onChange={this.handleChange}
							/>
							<div></div>
						</span>
					</Reference>
					<CompleteBtnBox>
						<CompleteBtn
							onClick={() => {
								this.submit();
							}}
						>
							<FontSize20 style={{ color: '#ffffff' }}>
								상담 및 가격 요청하기
							</FontSize20>
						</CompleteBtn>
					</CompleteBtnBox>
				</Containerv1>
			</Background>
		);
	}
}

export default NoneDrawingConsultingContainer;

// global
const InlineDiv = styled.div`
	display: inline-flex;
`;

const CenterInlineDiv = styled.div`
	display: inline-flex;
	justify-content: center;
	align-items: center;
`;

// fontsize
const FontSize24 = styled(Title.FontSize24)`
	font-weight: bold;
	line-height: 1.67;
	letter-spacing: -0.6px;
	color: #282c36;
`;

const FontSize20 = styled(Title.FontSize20)`
	font-weight: bold;
	line-height: 2.6;
	letter-spacing: -0.5px;
	color: var(--white);
`;

const FontSize18 = styled(Title.FontSize18)`
	font-weight: normal;
	line-height: 1.89;
	letter-spacing: -0.45px;
	color: #111111;
`;

const PusrposeFontSize18 = styled(Title.FontSize18)`
	font-weight: normal;
	line-height: 1.89;
	letter-spacing: -0.45px;
	color: ${props => (props.active ? '#ffffff' : '#414550')};
`;

const FontSize16 = styled(Title.FontSize16)`
	font-weight: normal;
	line-height: 2.5;
	letter-spacing: -0.4px;
	color: #86888c;
`;

// body
const ProjectTitleBox = styled.div`
	display: flex;
	flex-direction: column;
`;

const ProductInfoBox = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 60px;
`;

const LengthHeightBox = styled.div`
	display: flex;
	justify-content: space-between;
	width: 650px;
`;

const SelectBox = styled.div`
	display: flex;
	justify-content: space-between;
`;

const SelectCircle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 14px;
	height: 14px;
	margin-right: 8px;
	margin-bottom: 7px;
	border-radius: 8px;
	border: solid 1px #86888c;
	background-color: ${props => (props.active ? '#0933b3' : '#ffffff')};
`;

const PurposeSelectCircle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 140px;
	height: 44px;
	border-radius: 30px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
	background-color: ${props => (props.active ? '#0933b3' : '#ffffff')};
	cursor: pointer;
`;

const PurposeBox = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 60px;
	margin-bottom: 70px;
`;

const ImageShape = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 1200px;
	height: 425px;
	border-radius: 5px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
	border: solid 1px #d8d8d8;
	margin-bottom: 95px;
`;

const RequestInfoBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 1200px;
	height: 146px;
	background-color: #f6f6f6;
	border-radius: 5px;
`;

const RequestInfoInnerBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 1152px;
	height: 98px;
`;

const CompleteBtnBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const CompleteBtn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 242px;
	border-radius: 5px;
	background-color: #0933b3;
	margin-bottom: 80px;
	cursor: pointer;
`;

const Request = styled.div`
	width: 1200px;
	// display: ${props => (props.checkFileUpload ? 'static' : 'none')};
	background-color: #f6f6f6;
	border: 1px solid #ffffff;
	border-radius: 5px;
	padding: 26px 24px 22px 24px;
	box-sizing: border-box;
	margin-bottom: 40px;
	margin-top: 16px;
	position: relative;

	> div:nth-of-type(1) {
		> span:nth-of-type(1) {
			height: 27px;
			font-size: 18px;
			line-height: 40px;
			letter-spacing: -0.45px;
			color: #282c36;
			font-weight: bold;
			margin-bottom: 16px;
			margin-right: 7px;
		}

		> span:last-child {
			width: 20px;
			height: 20px;
			border: 1px solid #000000;
			border-radius: 10px;
			display: inline-block;
			text-align: center;
			font-size: 16px;
			letter-spacing: -0.4px;
			color: #414550;
			font-weight: bold;
			box-sizing: border-box;
		}
	}
	// > div:nth-of-type(2) {
	// 	width: 600px;
	// 	height: 180px;
	// 	border: 3px solid green;
	// 	position: absolute;
	// 	top: 13%;
	// 	left: 70px;
	// 	background-color: #ffffff;
	// }
	> textarea {
		resize: none;
		border: 1px solid #ffffff;
		width: 100%;
		padding: 14px 16px;
		margin-top: 12px;
		box-sizing: border-box;
		font-size: 15px;
		line-height: 34px;
		letter-spzcing: -0.45px;
		color: #282c36;
		border-radius: 5px;
		overflow: auto;
		height: auto;

		font-family: inherit;
		:focus {
			outline: none;
		}
		:placeholder {
			font-weight: 300;
		}
		white-space: pre-line;
	}
`;

const Reference = styled.div`
	// display: ${props => (props.checkFileUpload ? 'static' : 'none')};
	width: 1200px;
	background-color: #f6f6f6;
	border: 1px solid #ffffff;
	border-radius: 5px;
	padding: 24px 24px 22px 24px;
	box-sizing: border-box;
	margin-bottom: 60px;

	> span:nth-of-type(1) {
		font-size: 16px;
		line-height: 40px;
		letter-spacing: -0.4px;
		color: #86888c;
	}

	> div:nth-of-type(1) {
		border: 1px solid #ffffff;
		background-color: #ffffff;
		position: relative;
	}
`;

const DeliveryDateBox = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 70px;
	margin-bottom: 70px;
`;

const DeliveryDateInnerBox = styled.div`
	width: 1200px;
	height: 103px;
	display: inline-flex;
	align-items: center;
	justify-content: space-around;
	margin-top: 16px;
	background-color: #f6f6f6;
	border: 1px solid #ffffff;
	border-radius: 5px;
`;

const DateImgBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 19px;
	height: 19px;
	margin-right: 14px;
	background-color: ${props => (props.active ? '#0933b3' : '#999999')};
`;
