import React from 'react';
import styled from 'styled-components';
import * as Text from 'components/Text';
import { DARKGRAY } from 'static/style';
import * as Content from 'components/Content';
import { inject, observer } from 'mobx-react';
import { CompressedPixelFormat } from 'three';

const addButtonImg = 'static/images/components/Input2/Mask.png';
const deleteButtonImg = '/static/images/delete.png';

@inject('Request', 'ManufactureProcess')
@observer
class InputComponent extends React.Component {
	constructor(props) {
		super(props);
		this.file = React.createRef();
	}
	state = {
		fileArray: [],
		fileName: '',
		file: '',
		checkFileUpload: false,
	};

	onChange = e => {
		if (this.props.type === 'file') {
			this.props.onChange(e.currentTarget.files[0]);
		} else {
			this.props.onChange(e.currentTarget.value);
		}
	};

	onChangeFile = e => {
		const { Request, ManufactureProcess } = this.props;

		if (e && e.currentTarget.files[0]) {
			const fileName = e.currentTarget.files[0].name;
			this.setState({
				fileArray: this.state.fileArray.push({
					file: e.currentTarget.files[0],
				}),
			});
			ManufactureProcess.fileArray.push({ file: e.currentTarget.files[0] });

			this.setState({
				...this.state,
				file: e.currentTarget.files[0],
				fileName: fileName,
				checkFileUpload: true,
			});
			// 단일 첨부 방식
			Request.setCommonFile(e.currentTarget.files[0]);
		}
	};

	render() {
		const {
			onChange,
			children,
			label,
			file,
			Request,
			ManufactureProcess,
			isOpen,
			...props
		} = this.props;
		const { fileName, checkFileUpload } = this.state;

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
					<FileText checkFileUpload={this.state.checkFileUpload}>
						<InputBox style={{ width: '100%', display: 'inline-flex' }}>
							<div>
								<input
									type='file'
									multiple={'multiple'}
									fileName={'fileName[]'}
									style={{ display: 'none' }}
									onChange={this.onChangeFile}
									id='inputFile'
									ref={this.file}
									value=''
									placeholder={'파일을 선택해 주세요.'}
								/>

								<div
									onClick={() => {
										this.file.current.click();
									}}
								>
									<span>파일 첨부</span>
									<img src={addButtonImg} />
								</div>
								<div>
									{ManufactureProcess.fileArray.map((item, idx) => {
										return (
											<>
												<span
													onClick={() => {
														if (checkFileUpload) {
															ManufactureProcess.fileArray.splice(idx, 1);

															/* 
                                A라는 파일을 올리고 그 파일을 삭제한 후 다시 A라는 파일을 올리려고 할 경우 
                                onChange 이벤트가 발생하지 않아서 아래와 같이 삭제할 때 강제적으로 innerHTML에 공백을 주어서 설정함으로써
                                위와 같은 문제 발생 시 onChange 이벤트가 발생하게끔 함
                            */
															const inputFile = document.getElementById(
																'inputFile'
															);
															inputFile.innerHTML = '';

															if (ManufactureProcess.fileArray.length === 0) {
																this.setState({ checkFileUpload: false });
															}
														}
													}}
												>
													<span>
														<span>{item.file.name}</span>
														<DeleteFile
															src={deleteButtonImg}
															style={{
																display: this.state.checkFileUpload
																	? 'inline'
																	: 'none',
															}}
														/>
													</span>
												</span>
											</>
										);
									})}
								</div>
							</div>
						</InputBox>
					</FileText>
				</Wrap>
			);
		}
	}
}

export default InputComponent;

const InputBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;  
  border: solid 1px #ffffff;
  color: #404040;
  border-radius: 3px;
  box-sizing: border-box;

  >div{
    display: inline-flex;

    >div:nth-of-type(1){        
      margin-right: 40px;
      cursor: pointer;

      >span{
        font-size: 18px;
        line-height: 40px;
        letter-sacing: -0.45px;
        color: #0933b3;
        font-weight: normal;
        box-sizing: border-box;
        margin-right: 5px;
      }
      >img {
        vertical-align : text-top;
      }      
    }
      
    >div:nth-of-type(2){      
      width: 950px;   
      word-wrap: break-word;
      word-break:break-all;
      
      >span{
        >span{          
          >span{
            margin-right: 10px;
            font-size: 18px;
            line-height: 40px;
            letter-spacing: -0.45px;
            color: #282c36;
            font-weight: normal;
            cursor: pointer;
          }
        }
      }
    }
  }
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
	width: 1152px;
	font-stretch: normal;
	font-style: normal;
	line-height: 40px;
	letter-spacing: -0.18px;
	text-align: left;
	color: #c6c7cc;
	display: inline-flex;
	align-items: center;
	padding: 14px 16px;
	flex-wrap: wrap;
	background-color: #ffffff;
	box-sizing: border-box;
	> span:nth-of-type(1) {
		> span {
			> img {
				margin: auto;
			}
		}
	}
	> span {
		align-self: center;

		> span {
			margin-right: 10px;
			color: #282c36;
			font-weight: normal;
		}

		> img:last-child {
			margin-right: 20px;
		}
	}
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
const DeleteFile = styled.img`
	width: 18px;
	height: 18px;
	padding: 2px;
	box-sizing: border-box;
	border: 1px solid transparent;
	border-radius: 9px;
	background-color: #e1e2e4;
	align-self: center;
	line-height: 40px;
	letter-spacing: -0.45px;
	margin-right: 29px;
	vertical-align: middle;
	cursor: pointer;
`;
