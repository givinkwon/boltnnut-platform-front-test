import React from 'react';
import styled from 'styled-components';
import * as Text from './Text';
import { DARKGRAY } from 'static/style';
import * as Content from 'components/Content';
import { inject, observer } from 'mobx-react';

const fileImage = 'static/images/components/Input2/Mask.png';

@inject('Request')
@observer
class InputComponent extends React.Component {
	constructor(props) {
		super(props);
		this.file = React.createRef();
	}
	state = {
		fileName: '',
		file: '',
	};
	onChange = e => {
		if (this.props.type === 'file') {
			this.props.onChange(e.currentTarget.files[0]);
		} else {
			this.props.onChange(e.currentTarget.value);
		}
	};

	onChangeFile = e => {
		const { Request } = this.props;
		if (e.currentTarget.files[0]) {
			const fileName = e.currentTarget.files[0].name;
			this.setState({
				...this.state,
				file: e.currentTarget.files[0],
				fileName: fileName,
			});
		}

		Request.setCommonFile(e.currentTarget.files[0]);
	};

	render() {
		const {
			onChange,
			children,
			label,
			file,
			Request,
			...props
		} = this.props;
		const { fileName } = this.state;

		if (!file) {
			return (
				<Wrap width={this.props.width}>
					{label && (
						<Text.FontSize20 color={DARKGRAY} fontWeight={500}>
							{label}
						</Text.FontSize20>
					)}
					<InputBox marginTop={label ? 12 : 0}>
						<Input>
							<input {...props} onChange={this.onChange} />
						</Input>
						{children}
					</InputBox>
				</Wrap>
			);
		} else {
			return (
				<Wrap width={this.props.width}>
					<InputBox
						style={{ width: '100%', display: 'inline-block' }}
						onClick={() => this.file.current.click()}
					>
						<input
							type='file'
							multiple={'multiple'}
							fileName={'fileName[]'}
							style={{ display: 'none' }}
							onChange={this.onChangeFile}
							ref={this.file}
							placeholder={'파일을 선택해 주세요.'}
						/>
						<FileText>
							{Request.common_file
								? this.state.fileName
								: '파일을 선택해 주세요.'}
						</FileText>
						<img src={fileImage} />
					</InputBox>
				</Wrap>
			);
		}
	}
}

export default InputComponent;

const InputBox = styled.div`
	display: flex;
	height: 50px;
	width: 100%;
	border: solid 1px #c7c7c7;
	color: #404040;
	border-radius: 3px;
	> img {
		padding: 15px 15px;
		position: relative;
		float: right;
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
		height: 100%;
		height: 34px;
		object-fit: contain;
		border-radius: 3px;
		background-color: #ffffff;
		> img {
			position: relative;
			padding-top: 8px;
			padding-bottom: 8px;
			padding-right: 20px;
			padding-left: 0;
			width: 20px;
			height: 18px;
		}
	}
`;
const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	width: ${props => (props.width ? props.width : '100%')};
	> p {
		margin-top: 15px;
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
	}
`;
const Input = styled.div`
  width: 100%;
  margin-top: ${props => props.marginTop}px;
  color: #404040;
  font-weight: 400;
  padding-left: 2.3%;
  :focus {
    outline: none;
  }
  > input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0 !important;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: -0.18px;
    text-align: left;
    font-size: 18px;
    :focus {
      outline: none;
    }
    ::placeholder {
      font-weight: 400;
      color: #c6c7cc;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding-left: 2.3% !important;
  > input {
    width: 100%;
    height: 100%;
    border: none;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: -0.18px;
    text-align: left;
    font-size: 14px;
    :focus {
      outline: none;
    }
    ::placeholder {  
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.43;
      letter-spacing: -0.35px;
      text-align: left;
      color: #999999;
      padding-left: 0;
    }
  }
`;
const FileText = styled(Content.FontSize18)`
	font-stretch: normal;
	font-style: normal;
	line-height: 1.67;
	letter-spacing: -0.18px;
	text-align: left;
	color: #c6c7cc;
	padding-top: 10px;
	display: flex;
	align-items: center;
	padding-left: 15px;
	position: absolute;
	@media (min-width: 0px) and (max-width: 767.98px) {
		font-size: 14px !important;
		padding-top: 0px;
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		line-height: 2.43;
		letter-spacing: -0.35px;
		text-align: left;
		color: #999999;
	}
`;
