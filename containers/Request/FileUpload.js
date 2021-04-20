import React, { Component, useCallback } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { useDropzone } from 'react-dropzone';
import STLViewer from 'stl-viewer';
import FileImage from 'FileImage.js';

import CircularProgress from '@material-ui/core/CircularProgress';
// Components
import * as Content from 'components/Content';
import * as ManufactureProcessAPI from 'axios/ManufactureProcess';
import SelectComponent from 'components/Select';
import ManufactureProcess from '../../stores/ManufactureProcess';
import InputComponent from 'AddFile';

import Calendar from './Calendar2';
import Magazine from '../../stores/Magazine';

const pass2 = 'static/images/pass2.png';
const pass3 = 'static/images/pass3.png';
const deleteButtonImg = '/static/images/delete.png';
const calendar = '/static/images/facebook.png';

const fileList = [];

const customStyles = {
	container: (base, state) => {
		return {
			...base,
			zIndex: state.isFocused ? '98' : 'auto', //Only when current state focused
		};
	},
	dropdownIndicator: () => ({
		color: '#555555',
		width: 40,
		height: 40,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	option: (provided, state) => ({
		...provided,
		color: state.isSelected ? '#000000' : '#555555',
		backgroundColor: '#fff',
		borderRadius: 0,
		padding: 16,
		fontSize: 16,
	}),
	control: () => ({
		fontSize: 16,
		border: '1px solid #e6e6e6',
		backgroundColor: '#fff',
		display: 'flex',
		borderRadius: 6,
	}),
	singleValue: (provided, state) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = 'opacity 300ms';
		return { ...provided, opacity, transition };
	},
};

@inject('Request', 'ManufactureProcess')
@observer
class FileUploadContainer extends Component {
	static defaultProps = { title: '도면 파일을 업로드 해주세요.' };

	estimateInfoList = [];
	state = {
		fileList: [],
		checkFileUpload: false,
		checkCard: true,
		value: '',
		rows: 1,
		minRows: 1,
		maxRows: 100,
		loading: false,
		checkScroll: false,
		orderPrice: [],
	};

	// 직접 입력할 경우 텍스트 박스의 값을 저장하는 함수
	setNumCount = (data, val) => {
		console.log(val);
		if (val.label != '직접 입력') {
			data.quantity = { label: val, value: val };
		}
		if (val.label == '직접 입력' && (val.value == 0 || val.value == '')) {
			data.quantity = { label: '직접 입력', value: val };
		}
		if (val.value == 0) {
			data.quantity = { label: '직접 입력', value: val.value };
		}
		console.log(data.quantity);
	};

	// ESC 버튼을 눌렀을 경우 발생하는 함수 (삭제 에정)
	escFunction(event) {
		if (event.keyCode === 27) {
			console.log('esc');
		}
	}

	checkQuantityData = (e, data, idx) => {
		const directInput = document.getElementsByClassName('directInput');
		console.log(directInput);
		console.log(this);
		const re = /^[0-9\b]+$/;
		console.log(idx);
		if (e.target.value === '') {
			e.target.placeholder = '직접 입력하세요';
		} else if (!re.test(e.target.value)) {
			data.quantity = { label: '직접 입력', val: '' };
		}

		if (data.selectBig.name === '금형사출') {
			if (e.target.value > 0 && e.target.value < 100) {
				alert('최소 주문 수량은 100개입니다!');
				data.quantity = { label: '직접 입력', val: 0 };
				e.target.value = '';
				// directInput[idx].focus();
			} else {
				this.countPrice();
			}
		} else {
			this.countPrice();
		}
	};

	countQuantity = (prev_value = 0, current_value = 0, checked = 0) => {
		const { ManufactureProcess } = this.props;
		console.log(typeof prev_value);
		console.log(typeof current_value);
		console.log(prev_value);
		console.log(current_value);
		console.log(checked);
		console.log(typeof checked);
		//console.log(data)
		if (!checked) {
			ManufactureProcess.quantity = ManufactureProcess.quantity - prev_value + current_value;
			console.log(ManufactureProcess.quantity);
		} else if (checked === 1) {
			ManufactureProcess.quantity = ManufactureProcess.quantity - current_value;
			console.log(ManufactureProcess.quantity);
		} else {
			ManufactureProcess.quantity = ManufactureProcess.quantity + current_value;
			console.log(ManufactureProcess.quantity);
		}
	};
	componentDidMount() {
		const { ManufactureProcess } = this.props;

		if (!ManufactureProcess.checkPaymentButton) {
			window.addEventListener('scroll', this.loadScroll);
		}
	}

	componentWillUnmount = () => {
		const { ManufactureProcess } = this.props;
		ManufactureProcess.dataPrice = [];
		window.removeEventListener('scroll', this.loadScroll);
	};

	// 각각의 도면 데이터들의 가격과 총 주문금액을 계산하는 함수
	async countPrice() {
		const { ManufactureProcess } = this.props;
		//   console.log(ManufactureProcess.quantity)
		let price = 0;
		await fileList.map((data, idx) => {
			data.totalMoldPrice = Math.round(data.moldPrice / 10000) * 10000;
			data.totalEjaculationPrice = Math.round(data.ejaculationPrice / 10) * 10 * (data.quantity.value ? data.quantity.value : 0);
			data.totalPrice = Math.round(data.productionPrice / 100) * 100 * data.quantity.value;

			// 도면 데이터가 체크 되어 있는 경우에만 총 주문금액 계산
			if (data.checked) {
				if (data.selectBig.name === '금형사출') {
					price += data.totalMoldPrice;
					price += data.totalEjaculationPrice;
				} else {
					price += data.totalPrice;
				}

				//console.log(typeof(data.quantity.value))
				//ManufactureProcess.quantity = ManufactureProcess.quantity + parseInt(data.quantity.value)
				//console.log(typeof(ManufactureProcess.quantity))
				//console.log(ManufactureProcess.quantity)
			} else {
				this.setState({ g: 3 });
			}
		});
		ManufactureProcess.orderPrice = price;
	}

	loadFileResopnse = fileIdx => {
		const ManufactureProcessFormData = new FormData();
		ManufactureProcessFormData.append('blueprint', fileList[fileIdx].originFile);
		ManufactureProcessFormData.append('process', ManufactureProcess.selectedBigCategory.id);
		ManufactureProcessFormData.append('detailProcess', ManufactureProcess.selectedMidCategory.id);
		fileList[fileIdx].selectedMid = ManufactureProcess.selectedMidCategory;
		fileList[fileIdx].priceLoading = true;
		this.setState({ t: false });
		console.log('fileIdx = ' + fileIdx + ' / process = ' + ManufactureProcess.selectedBigCategory.id + ' / detailProcess =' + ManufactureProcess.selectedMidCategory.id);

		//기본정보입력에서 받은 의뢰서로 바꾸기
		ManufactureProcessFormData.append('request', 2467);
		// this.setState({fileList:fileList})
		console.log(ManufactureProcessFormData);
		ManufactureProcessAPI.saveSelect(ManufactureProcessFormData)
			.then(res => {
				fileList[fileIdx].price = res.data.data.totalMaxPrice;
				fileList[fileIdx].productionPrice = res.data.data.maxPrice;
				fileList[fileIdx].priceLoading = false;
				this.countPrice();
				//리렌더링을 위한 state설정. 바꿔야될듯
				this.setState({ t: true });
				this.setState({
					fileList: fileList,
				});
			})
			.catch(e => {
				console.log(e);
				console.log(e.response);
			});
		//
	};
	checkboxChange = (idx, e) => {
		this.setState({ ...this.state, checkCard: e });
	};

	// 스크롤 할 때 도면 추가하는 부분 밑으로 스크롤 할 경우 헤더 부분 fix가 풀리고 다시 도면 추가하는 부분으로 스크롤 할 경우 헤더 부분이 fix가 되게끔 하는 함수
	loadScroll = () => {
		const { ManufactureProcess } = this.props;
		if (!ManufactureProcess.checkPaymentButton) {
			var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			var standardHeight = 180;
			var currentHeight = standardHeight + fileList.length * 240;
			const card = document.getElementById('card');

			if (card) {
				if (this.props.ManufactureProcess.checkFileUpload) {
					if (scrollTop > currentHeight && !this.state.checkScroll) {
						card.style.display = 'none';
						card.style.position = 'static';
						this.setState({ checkScroll: true });
					} else if (scrollTop < currentHeight) {
						card.style.display = 'flex';
						card.style.position = 'fixed';
						this.setState({ checkScroll: false }); // checkScroll 안 쓸 듯
					}
				} else {
					card.style.display = 'flex';
				}
			}
		}
	};

	// 추가 요청 사항 부분 - 사용자가 멀티 라인으로 텍스트 할 경우 자동으로 높이 조절되게끔 해주는 함수
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
			value: event.target.value,
			rows: currentRows < maxRows ? currentRows : maxRows,
		});

		ManufactureProcess.requestComment = event.target.value;
	};

	// 수량이 변경되는 경우 수량 정보를 저장
	onQuantityChange(data, value) {
		if (data.selectBig.name === '금형사출' && value.value > 0 && value.value < 100) {
			alert('최소 주문 수량은 100개입니다!');
		} else {
			this.setState(() => {
				return { quantity: value.value };
			});
			data.quantity = value;
		}
	}

	MyDropzone = () => {
		const { ManufactureProcess } = this.props;
		const dropHandler = files => {
			let loadingCounter = 0;
			console.log('dropHandler');
			files.forEach((file, fileIdx) => {
				const ManufactureProcessFormData = new FormData();
				ManufactureProcessFormData.append('blueprint', file);
				ManufactureProcessFormData.append('process', ManufactureProcess.categoryDefaultValue.big.id);
				ManufactureProcessFormData.append('detailProcess', ManufactureProcess.categoryDefaultValue.mid.id);
				//기본정보입력에서 받은 의뢰서로 바꾸기
				ManufactureProcessFormData.append('request', 2467);
				console.log(ManufactureProcessFormData);
				this.setState({ loading: true });

				//this.props.ManufactureProcess.saveSelect(ManufactureProcessFormData)
				ManufactureProcessAPI.saveSelect(ManufactureProcessFormData)
					.then(res => {
						loadingCounter++;
						this.setState({
							fileList: fileList.push({
								originFile: file,
								drawFile: res.data.data.stl_file,
								fileName: file.name,
								price: res.data.data.maxPrice,
								//MaxPrice: res.data.data.maxPrice,

								productionPrice: res.data.data.maxPrice, // 생산가
								moldPrice: Math.round(res.data.data.totalMaxPrice / 10000) * 10000, // 금형가
								ejaculationPrice: Math.round(res.data.data.maxPrice / 10) * 10, // 사출가

								x_length: Math.round(res.data.data.x_length),
								y_length: Math.round(res.data.data.y_length),
								z_length: Math.round(res.data.data.z_length),

								selectedMid: ManufactureProcess.categoryDefaultValue.mid,
								checked: true,

								quantity: { label: '', value: 0 },
								prevQuantity: 0,
								inputQuantity: 0,

								totalPrice: 0,
								totalMoldPrice: res.data.data.totalMaxPrice,
								totalEjaculationPrice: res.data.data.maxPrice,

								optionBig: ManufactureProcess.ManufactureProcessList,
								selectBig: ManufactureProcess.categoryDefaultValue.big,
								optionMid: ManufactureProcess.categoryDefaultValue.big.detail,
								selectedMid: ManufactureProcess.categoryDefaultValue.mid,
								priceLoading: false,
							}),
						});

						console.log(loadingCounter + '/' + files.length);
						if (loadingCounter === files.length) {
							this.setState({ loading: false });
						}

						this.countPrice();
					})
					.catch(e => {
						console.log(e);
						console.log(e.response);
					});
			});
		};

		const onDrop = useCallback(acceptedFiles => {
			// Do something with the files
			this.setState({ checkFileUpload: true });
			this.props.ManufactureProcess.checkFileUpload = true;

			const card = document.getElementById('card');

			if (card) {
				card.style.display = 'flex';
				card.style.position = 'fixed';
			}
			dropHandler(acceptedFiles);
		}, []);

		const { getRootProps, getInputProps, isDragActive } = useDropzone({
			onDrop,
		});

		return (
			<>
				<div {...getRootProps()}>
					<input {...getInputProps()} />

					<InputBox checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>
						{isDragActive ? (
							<p>Drop the files here ...</p>
						) : (
							<DropZoneContainer>
								{this.state.loading === true ? (
									<>
										<div>Uploading files...</div>
										<CircularProgress
											style={{
												margin: '10px auto',
												width: '22px',
												height: '22px',
											}}
											className='spinner'
										/>
									</>
								) : (
									<>
										{!this.props.ManufactureProcess.checkFileUpload && (
											<>
												<div
													style={{
														display: 'flex',
														alignItems: 'center',
														flexDirection: 'column',
														marginBottom: '24px',
													}}
												>
													<div
														style={{
															color: '#0933b3',
															fontSize: '20px',
															fontWeight: 'bold',
															marginBottom: '-3px',
														}}
													>
														↑
													</div>
													<div
														style={{
															width: '22px',
															height: '7px',
															border: '3px solid #0933b3',
															borderTop: 'none',
														}}
													></div>
												</div>
												<p>
													3D 도면 파일을 이곳에 드래그 또는 <span>파일찾기</span>
												</p>
												<p>*한 파일에 한 파트만 업로드 해주세요.</p>
												<FileImageContainer>
													<FileImage name='.STP' />
													<FileImage name='.STEP' />
													<FileImage name='.STL' />
												</FileImageContainer>
											</>
										)}
										{this.props.ManufactureProcess.checkFileUpload && (
											<div>
												<span>
													<div></div>
													<div></div>
												</span>
												<p>
													3D 도면 파일을 이곳에 드래그 또는 <span>파일찾기</span>
												</p>
											</div>
										)}
									</>
								)}
							</DropZoneContainer>
						)}
					</InputBox>
				</div>
			</>
		);
	};

	render() {
		const { ManufactureProcess } = this.props;

		return (
			<>
				<Container>
					<Card checkFileUpload={this.props.ManufactureProcess.checkFileUpload} onChange={this.scrollChange} id='card'>
						<Header>{this.props.ManufactureProcess.checkFileUpload ? '도면 추가' : this.props.title}</Header>

						<TableHeader checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>
							<div></div>
							<span>파일명</span>
							<span>기본가공</span>
							<span>재료</span>
							<span>마감</span>
							<span>색상</span>
							<span>수량</span>
						</TableHeader>
					</Card>

					<ItemList checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>
						{fileList.map((data, idx) => (
							<>
								<ItemBox>
									<MainBox>
										<CheckBox
											active={data.checked}
											onClick={() => {
												if (!data.checked) {
													data.checked = true;
													this.countQuantity(0, parseInt(data.quantity.value), 2);
												} else {
													data.checked = false;
													this.countQuantity(0, parseInt(data.quantity.value), 1);
												}

												this.setState({ f: 3 });
												this.countPrice();
											}}
										>
											<div active={data.checked}>
												<img src={pass3} active={data.checked} />
											</div>
										</CheckBox>

										<StlBox>
											{data.fileName}

											<STLViewer
												model={data.drawFile} // stl파일 주소
												width={120} // 가로
												height={120} // 세로
												// width={250}
												// height={210}
												modelColor='gray' // 색
												backgroundColor='white' // 배경색
												rotate={true} // 자동회전 유무
												orbitControls={true} // 마우스 제어 유무
												cameraX={500}
												//cameraZ={500}
												//lights={[2,4,1]}
												//lights={[2, 2, 2]}
												// lights={[0, 0, 1]}
												//lightColor={'red'}
											/>
											<Length>{data.x_length + ' x ' + data.y_length + ' x ' + data.z_length + ' mm'}</Length>
										</StlBox>
										<ColumnBox>
											<ManufactureBox>
												<Select // defaultValue={ManufactureProcess.ManufactureProcessList[2]}
													defaultValue={ManufactureProcess.categoryDefaultValue.big}
													styles={customStyles}
													value={data.selectBig}
													options={data.optionBig}
													getOptionLabel={option => option.name}
													onChange={e => {
														ManufactureProcess.setBigCategory(e);
														this.loadFileResopnse(idx);

														data.selectBig = e;
														data.optionMid = e.detail;

														if (data.selectBig.name === '금형사출') {
															this.countQuantity(data.quantity.value, 0);
															data.quantity = { label: '0', value: 0 };
														} else {
															this.countQuantity(data.quantity.value, 1);
															data.quantity = { label: '1', value: 1 };
														}
														this.countPrice();
													}}
												/>
											</ManufactureBox>
										</ColumnBox>
										<MaterialBox>
											<Select
												defaultValue={ManufactureProcess.categoryDefaultValue.mid}
												value={data.selectedMid}
												styles={customStyles}
												options={data.optionMid}
												getOptionLabel={option => option.name}
												onChange={e => {
													ManufactureProcess.setMidCategory(e);
													//this.countQuantity(data.quantity.value, value.value)
													this.countQuantity(0, 0);
													this.loadFileResopnse(idx);
													this.countPrice();
												}}
											/>
										</MaterialBox>
										<WrapBox checkQuantity={data.quantity.value}>
											<span>기본가공</span>
										</WrapBox>
										<ColorBox>
											<span>검정</span>
										</ColorBox>
										<QuantityBox quantity={data.quantity.value}>
											{data.quantity.label != '직접 입력' && data.selectBig.name !== '금형사출' && (
												<Select
													id='select'
													quantity={data.quantity.label}
													width='118px'
													styles={customStyles}
													style={{ overflow: 'visible' }}
													options={quantityAry}
													getOptionLabel={option => option.label}
													value={data.quantity}
													onChange={value => {
														console.log(data.selectBig.name);
														this.countQuantity(data.quantity.value, value.value);
														this.onQuantityChange(data, value);
														this.countPrice();
													}}
												/>
											)}

											{(data.quantity.label == '직접 입력' || data.selectBig.name === '금형사출') && (
												<DirectInputBox quantity={data.quantity.label} id='directInputBox'>
													<input
														id='morethanTen'
														className='directInput'
														placeholder='직접 입력하세요'
														onKeyPress={e => {
															if (e.key === 'Enter') {
																this.checkQuantityData(e, data, idx);
															}
														}}
														onBlur={e => {
															console.log(e.target.value);
															console.log(data.prevQuantity);
															if (e.target.value >= 100) {
																this.countQuantity(parseInt(data.prevQuantity), parseInt(e.target.value));
																data.prevQuantity = e.target.value;
															}
															this.checkQuantityData(e, data, idx);
														}}
														onChange={e => {
															const re = /^[0-9\b]+$/;

															if (e.target.value === '' || re.test(e.target.value)) {
																this.setNumCount(data, e.target.value);
															} else {
																data.quantity = { label: '직접 입력', val: 0 };
																e.target.value = '';
																this.setNumCount(data, e.target.value);
																alert('숫자를 입력하세요');
															}
														}}
													/>
												</DirectInputBox>
											)}
										</QuantityBox>
									</MainBox>

									<div style={{ textAlign: 'right' }}>
										<TailBox checkSelectBig={data.selectBig.name} style={{ float: 'right', display: 'inline-block' }}>
											<div>
												<span>
													{data.priceLoading === true ? (
														<CircularProgress style={{ width: '22px', height: '22px' }} className='spinner' />
													) : data.selectBig.name === '금형사출' ? (
														<>
															<span>금형가 </span>
															<span>{data.totalMoldPrice.toLocaleString('ko-KR') + ' 원'}</span>

															<span style={{ marginLeft: '30px' }}>사출가</span>
															<span>{data.totalEjaculationPrice.toLocaleString('ko-KR') + ' 원'}</span>
														</>
													) : (
														<>
															<span>가격 </span>
															<span>{data.totalPrice.toLocaleString('ko-KR') + ' 원'} </span>
														</>
													)}
												</span>
											</div>
										</TailBox>
									</div>
									<DeleteBox>
										<span
											onClick={() => {
												this.setState({ fileList: fileList.splice(idx, 1) });
												this.countQuantity(0, parseInt(data.quantity.value), 1);
												if (fileList.length === 0) {
													this.setState({ checkFileUpload: false });
													this.props.ManufactureProcess.checkFileUpload = false;

													if (!this.props.ManufactureProcess.checkFileUpload) {
														const card = document.getElementById('card');
														if (card) {
															card.style.display = 'flex';
															card.style.position = 'static';
														}
													}
													this.countPrice();
												}
											}}
										>
											<img src={deleteButtonImg} />
										</span>
									</DeleteBox>
								</ItemBox>
							</>
						))}
					</ItemList>

					<NoticeBox checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>
						<EntireDelete>
							<span>선택항목 삭제</span>
						</EntireDelete>
						<EntireDelete>
							<span>전체 삭제</span>
						</EntireDelete>
						<div>* 금형사출의 경우 최소수량 100개 이상만 가능합니다.</div>
					</NoticeBox>

					<ContentBox checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>
						<this.MyDropzone onChange={this.scrollChange}></this.MyDropzone>
					</ContentBox>

					<NoFileButton checkFileUpload={ManufactureProcess.checkFileUpload}>
						<div>*혹시 도면 파일이 없으신가요?</div>
						<div
							style={{ cursor: 'pointer' }}
							onClick={() => {
								this.props.Request.newIndex = 2;
							}}
						>
							<span>도면 파일 없이 견적 받기</span>
							<span>
								<img src={pass2} />
							</span>
						</div>
					</NoFileButton>
					<Price checkFileUpload={this.props.ManufactureProcess.checkFileUpload} id='price'>
						<PriceLabel>
							<div>자동 견적 가격</div>
							<p>해당 사항은 볼트앤너트 알고리즘이 도출한 견적으로 가공품의 발주 요건에 따라 변경될 수 있습니다.</p>
							<p>본 견적은 후처리를 제외한 순수 단품 가공 견적입니다.</p>

							{/* <span>총 배송비</span>
                <span>총 결제 금액</span> */}
						</PriceLabel>

						<PriceData>
							<span>=</span>
							<span>
								{ManufactureProcess.orderPrice.toLocaleString('ko-KR')}
								<span> 원</span>
							</span>
						</PriceData>
					</Price>

					<DeliveryDate
						checkDateConference={ManufactureProcess.date_conference}
						checkDateUndefined={ManufactureProcess.date_undefined}
						checkCalendar={ManufactureProcess.calendar_checked}
						checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
					>
						<div>납기 일</div>
						<div>
							<div style={{ height: '50px' }}>
								<Calendar />
							</div>
							<div
								onClick={() => {
									console.log('click1');
									if (ManufactureProcess.date_conference) {
										ManufactureProcess.date_conference = false;
									} else {
										ManufactureProcess.date_conference = true;
									}
									console.log(ManufactureProcess.date_conference);
								}}
							>
								<div>
									<img src={pass3} />
								</div>
								<span>납기일 협의 가능</span>
							</div>
							<div
								onClick={() => {
									console.log('click2');
									if (ManufactureProcess.date_undefined) {
										ManufactureProcess.date_undefined = false;
									} else {
										ManufactureProcess.date_undefined = true;
									}
									console.log(ManufactureProcess.date_undefined);
								}}
							>
								<div>
									<img src={pass3} />
								</div>
								<span>납기일 미정</span>
							</div>
						</div>
					</DeliveryDate>
					<Request checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>
						<div>
							<span>발주 요청사항</span>
							<span>?</span>
						</div>
						<div>
							<div>다음 사항이 명확하게 작성되어야 정확한 견적을 받을 가능성이 높습니다.</div>
							<div>1. 가공품 목적 및 사용 환경</div>
							<div>2. 가공 부품별 특이 사항</div>
							<div>3. 공급처가 충족해야하는 발주 조건</div>
						</div>
						<textarea
							placeholder='특이사항 및 요청을 입력해주세요'
							onFocus={e => (e.target.placeholder = '')}
							onBlur={e => (e.target.placeholder = '특이사항 및 요청을 입력해주세요')}
							rows={this.state.rows}
							value={this.state.value}
							className={'textarea'}
							placeholderStyle={{ fontWeight: '400' }}
							onChange={this.handleChange}
						/>
					</Request>
					<Reference checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>
						<div>
							<span>참고 파일</span>
							<span>이미지 혹은 PDF 자료만 업로드 가능합니다. 전문 설계 용어와 기호를 사용해 주시면 좋습니다.</span>
						</div>

						<span style={{ display: 'inline-block' }}>
							<InputComponent file={true} onChange={this.handleChange} />
							<div></div>
						</span>
					</Reference>

					<Button checkFileUpload={ManufactureProcess.checkFileUpload}>
						<div>
							<span>상담 요청하기</span>
						</div>
						<div>
							<span
								onClick={() => {
									ManufactureProcess.checkPaymentButton = true;
									this.props.Request.newIndex = 1;
								}}
							>
								주문하기
							</span>
						</div>
					</Button>
				</Container>
			</>
		);
	}
}

export default FileUploadContainer;

const quantityAry = [
	{ label: '1', value: 1 },
	{ label: '2', value: 2 },
	{ label: '3', value: 3 },
	{ label: '4', value: 4 },
	{ label: '5', value: 5 },
	{ label: '6', value: 6 },
	{ label: '7', value: 7 },
	{ label: '8', value: 8 },
	{ label: '9', value: 9 },
	{ label: '직접 입력', value: '' },
];

const Select = styled(SelectComponent)`
	width: ${props => (props.width ? props.width : '180px')};
	display: ${props => (props.quantity === '직접 입력' ? 'none' : 'block')};
	@keyframes fadeIn {
		0% {
			opacity: 0.5;
			transform: translateY(-10px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
	>div: nth-of-type(2) {
		-webkit-font-smoothing: antialiased;
		animation: fadeIn 0.2s ease-out;
	}
`;

const Box = styled.div`
	width: 380px;

	${props =>
		props.active &&
		css`
			svg {
				@keyframes select {
					0% {
						transform: skewY(-180deg);
					}
				}
				animation: select 0.4s ease-out;
				transform: rotate(-180deg);
			}
		`}
	${props =>
		!props.active &&
		css`
			svg {
				@keyframes selectOut {
					0% {
						transform: rotate(-180deg);
					}
				}
				animation: selectOut 0.4s;
			}
		`}
`;
const ItemList = styled.div`
	width: 101%;
	height: 100%;
	padding-left: 3px;
	padding-top: ${props => (props.checkFileUpload ? '215px' : '0')};
`;

const ItemBox = styled.div`
	display: flex;
	justify-content: space-between;
	width: 1204px;
	height: 201px;
	position: relative;
	object-fit: contain;
	border-radius: 10px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
	background-color: #ffffff;
	margin-bottom: 40px;
	padding: 0 44px 0 15px;
	box-sizing: border-box;
`;

const StlBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 280px;
	margin-right: 30px;
	padding-right: 50px;
	box-sizing: border-box;
`;

const Length = styled.div`
	font-size: 16px;
	line-height: 40px;
	letter-spacing: -0.4px;
	color: #282c36;
`;

const ColumnBox = styled.div`
	margin-right: 30px;
`;
const MainBox = styled.div`
	display: flex;
	align-items: center;
`;

const NoticeBox = styled.div`
	width: 100%;
	height: 92px;
	border: 3px solid red;
	display: ${props => (props.checkFileUpload ? 'flex' : 'none')};
	position: relative;
	align-items: center;
	> div:last-child {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;
const EntireDelete = styled.div`
	height: 40px;
	border: 1px solid #999999;
	border-radius: 3px;
	padding: 7px 12px 6px 12px;
	box-sizing: border-box;
	margin-right: 16px;
	> span {
		font-size: 18px;
		line-height: 28px;
		letter-spacing: -0.45px;
		color: #999999;
	}
`;

const ContentBox = styled.div`
	width: 1199px;
	height: ${props => (props.checkFileUpload ? '100px' : '313px')};
	display: flex;
	flex-direction: column;
	border: 2px dashed #a4aab4;
	border-radius: 5px;
	background-color: #f6f6f6;
	margin-left: 1px;
	margin-bottom: ${props => (props.checkFileUpload ? '0' : '66px')};
	:focus {
		outline: none;
	}
`;
const NoFileButton = styled.div`
	width: 100%;
	margin-bottom: ${props => (props.checkFileUpload ? '0' : '425px')};
	text-align: center;
	display: ${props => (props.checkFileUpload ? 'none' : 'flex')};
	flex-direction: ${props => (props.checkFileUpload ? '' : 'column')};
	align-items: ${props => (props.checkFileUpload ? '' : 'center')};
	> div:nth-of-type(1) {
		font-size: 20px;
		line-height: 40px;
		letter-spacing: -0.5px;
		color: #86888c;
		margin-bottom: 14px;
	}
	> div:nth-of-type(2) {
		border: 1px solid #a4aab4;
		border-radius: 60px;
		width: 268px;
		> span:nth-of-type(1) {
			font-size: 18px;
			line-height: 40px;
			letter-spacing: -0.45px;
			color: #414550;
			margin-right: 11px;
		}
		> span:nth-of-type(2) {
			position: relative;
			> img {
				vertical-align: middle;
				color: #414550;
				position: absolute;
				top: 15%;
			}
		}
	}
`;
const ManufactureBox = styled.div`
	display: flex;
`;

const MaterialBox = styled.div`
	margin-right: 39px;
`;

// WrapBox와 ColorBox 합칠 예정
const WrapBox = styled.div`
	width: 89px;
	height: 40px;
	margin-right: 36px;
	box-sizing: border-box;
	> span {
		width: 100%;
		text-align: left;
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		line-height: 40px;
		letter-spacing: -0.45px;
		color: #282c36;
		background-color: #e1e2e4;
		text-align: center;
		padding: 6px 12px 7px 12px;
		border: 1px solid #e1e2e4;
		border-radius: 3px;
	}
`;

const ColorBox = styled.div`
	width: 57px;
	height: 40px;
	margin-right: 39px;
	> span {
		width: 100%;
		text-align: left;
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		line-height: 40px;
		letter-spacing: -0.45px;
		color: #282c36;
		background-color: #e1e2e4;
		text-align: center;
		padding: 6px 12px 7px 12px;
		border: 1px solid #e1e2e4;
		border-radius: 3px;
	}
`;

const QuantityBox = styled.div`
	width: 120px;
	height: 40px;
	position: relative;
`;

const TailBox = styled.div`
	width: 800px;
	position: absolute;
	top: 70%;
	left: 32%;
	> div {
		> span {
			> span:nth-of-type(odd) {
				color: #282c36;
				font-weight: 500;
				text-align: left;
				line-height: 40px;
				margin-right: 20px;
			}

			> span:nth-of-type(even) {
				font-size: 24px;
				letter-spacing: -0.6px;
			}
		}
	}
`;

const DeleteBox = styled.div`
	position: absolute;
	top: 8%;
	left: 97%;
`;

const InputBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: ${props => (props.checkFileUpload ? '100px' : '313px')};
	text-align: center;
	:focus {
		outline: 0;
	}
	cursor: pointer;
`;

const Card = styled.div`
	width: 1210px;
	height: ${props => (props.checkFileUpload ? '210px' : '100px')};
	object-fit: contain;
	background-color: white;
	margin: 60px 0px 20px 0;
	display: flex;
	flex-direction: column;
	position: ${props => (props.checkFileUpload ? 'fixed' : 'static')};
	top: 0;
	z-index: 99;
	box-sizing: border-box;
`;

const Header = styled(Content.FontSize32)`
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.06;
	letter-spacing: -0.8px;
	text-align: left;
	color: #0a2165;
	padding-top: 38px;
	padding-bottom: 20px;
	object-fit: contain;
`;

const FileImageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Container = styled.div`
	width: 100%;
	height: 100%;
`;
const CheckBox = styled.div`
  width:75px;
  display: flex;
  align-items: center;
  > div{        
    width: 19px;
    height: 19px;
    background-color: ${props => (props.active ? '#0933b3' : '#ffffff')};
    margin-right: 10px;    
    position: relative;
    cursor: pointer;
    border: 1px solid #c6c7cc;
    border-radius: 2px;
    box-sizing: border-box;
    > img{
      display: ${props => (props.active ? 'static' : 'none')};
      position: absolute;
      top: 17%;
      left: 15%;        
    }
  }
}
`;

const DropZoneContainer = styled.div`
	> div {
		display: flex;
		align-items: center;

		> span {
			width: 26px;
			height: 26px;
			border-radius: 13px;
			background-color: #0933b3;
			margin-right: 20px;
			position: relative;
			> div {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				background-color: #ffffff;
				border: 1px solid white;
			}
			> div:nth-of-type(1) {
				//border: 3px solid red;
				width: 14px;
				height: 0px;
			}
			> div:nth-of-type(2) {
				width: 0px;
				height: 14px;
			}
		}
	}

	p:nth-of-type(1) {
		font-size: 20px;
		line-height: 40px;
		letter-spacing: -0.5px;
		color: #282c36;
		margin-bottom: 4px;

		span {
			color: #0933b3;
			font-weight: 600;
		}

		:focus {
			outline: none;
		}
	}
	> p:nth-of-type(2) {
		font-size: 16px;
		line-height: 40px;
		letter-spacing: -0.4px;
		color: #767676;
	}
`;

const TableHeader = styled.div`
	margin-top: 30px;
	align-items: center;
	width: 100%;
	border-bottom: 1px solid #c6c7cc;
	padding-bottom: 18px;
	display: ${props => (props.checkFileUpload ? 'flex' : 'none')};
	> div {
		width: 19px;
		height: 19px;
		border: 1px solid #c6c7cc;
		margin-left: 18px;
		margin-right: 148px;
		box-sizing: border-box;
	}
	> span {
		font-size: 1.125em;
		text-align: left;
		line-height: 40px;
		letter-spacing: -0.45px;
		color: #282c36;
		font-weight: 600;
	}
	> span:nth-of-type(1) {
		margin-right: 223px;
	}
	> span:nth-of-type(2) {
		margin-right: 164px;
	}
	> span:nth-of-type(3) {
		margin-right: 141px;
	}
	> span:nth-of-type(4) {
		margin-right: 76px;
	}
	> span:nth-of-type(5) {
		margin-right: 93px;
	}
	> span:nth-of-type(6) {
		margin-right: 85px;
	}
`;

const Price = styled.div`
	flex-direction: column;

	width: 100%;
	//height: 197px;
	border-top: 3px solid #414550;
	border-bottom: 2px solid #c6c7cc;

	margin-top: 60px;
	margin-bottom: 70px;
	display: ${props => (props.checkFileUpload ? 'flex' : 'none')};
`;
const PriceLabel = styled.div`
	height: 171px;
	display: flex;
	flex-direction: column;
	//justify-content: space-around;
	align-items: center;
	border-bottom: 1px solid #e1e2e4;
	padding: 30px 0;
	box-sizing: border-box;
	> div {
		font-size: 24px;
		line-height: 40px;
		letter-spacing: -0.6px;
		color: #282c36;
		font-weight: bold;
	}
	> p {
		font-size: 18px;
		line-height: 34px;
		letter-spacing: -0.45px;
		color: #999999;
	}
`;
const PriceData = styled.div`
	height: 105px;
	display: flex;
	justify-content: center;
	align-items: center;
	> span {
		font-size: 30px;
		line-height: 40px;
		letter-spacing: -0.75px;
		color: #282c36;
		font-weight: normal;
		margin-right: 45px;
	}
	> span:last-child {
		color: #0933b3;
		font-weight: bold;
	}
`;

const Button = styled.div`
	margin-top: 83px;
	margin-bottom: 230px;
	display: ${props => (props.checkFileUpload ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;

	> div {
		width: 226px;
		height: 61px;
		font-size: 20px;
		line-height: 52px;
		letter-spacing: -0.5px;
		font-weight: bold;
		border-radius: 5px;
		text-align: center;

		position: relative;
		> span {
			position: absolute;
			width: 100%;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
	> div:nth-of-type(1) {
		border: 1px solid #0933b3;
		background-color: #ffffff;
		color: #0933b3;
		margin-right: 22px;
	}
	> div:nth-of-type(2) {
		border: 1px solid #ffffff;
		background-color: #0933b3;
		color: #ffffff;
	}
`;
const DeliveryDate = styled.div`
	width: 1200px;
	display: ${props => (props.checkFileUpload ? 'static' : 'none')};
	background-color: #f6f6f6;
	border: 1px solid #ffffff;
	border-radius: 5px;
	padding: 26px 24px 22px 24px;
	box-sizing: border-box;
	margin-bottom: 40px;
	margin-top: 70px;

	> div:nth-of-type(1) {
		height: 27px;
		font-size: 18px;
		line-height: 40px;
		letter-spacing: -0.45px;
		color: #282c36;
		font-weight: bold;
		margin-bottom: 16px;
	}

	> div:nth-of-type(2) {
		display: flex;
		//justify-content: center;
		align-items: center;

		> div:nth-of-type(1) {
			width: 66%;
			height: 55px;
			font-size: 18px;
			line-height: 40px;
			letter-spacing: -0.45px;
			color: #282c36;
			font-weight: bold;
			//margin-bottom: 16px;
			//border: 3px solid red;
			background-color: #ffffff;
			position: relative;
			display: flex;
			align-items: center;
			> span {
				position: absolute;
				right: 2%;
				bottom: 6%;
			}
			> div {
				//display: ${props => (props.checkCalendar ? 'block' : 'none')};
				//display: block;
			}
		}
		> div:nth-of-type(2) {
			margin: 0 30px;
			> div {
				//background-color: ${props => (props.checkDateConference ? '#999999' : '#ffffff')};
				background-color: #999999;
				> img {
					display: ${props => (props.checkDateConference ? 'block' : 'none')};
					// display: none;
				}
			}
		}
		> div:nth-of-type(3) {
			> div {
				//background-color: ${props => (props.checkDateUndefined ? '#999999' : '#ffffff')};
				background-color: #999999;
				> img {
					display: ${props => (props.checkDateUndefined ? 'block' : 'none')};
				}
			}
		}
		> div:nth-of-type(2),
		> div:nth-of-type(3) {
			//position: relative;
			//padding-left: 35px;
			display: flex;
			> div {
				width: 19px;
				height: 19px;
				border: 1px solid white;
				border-radius: 2px;
				position: relative;
				margin-right: 18px;
				box-sizing: border-box;

				> img {
					position: absolute;
					top: 18%;
					left: 18%;
				}
			}
		}
	}
`;
const Request = styled.div`
	width: 1200px;
	display: ${props => (props.checkFileUpload ? 'static' : 'none')};
	background-color: #f6f6f6;
	border: 1px solid #ffffff;
	border-radius: 5px;
	padding: 26px 24px 22px 24px;
	box-sizing: border-box;
	margin-bottom: 40px;
	margin-top: 70px;
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
	> div:nth-of-type(2) {
		width: 600px;
		height: 180px;
		border: 3px solid green;
		position: absolute;
		top: 13%;
		left: 70px;
		background-color: #ffffff;
	}
	> textarea {
		resize: none;
		border: 1px solid #ffffff;
		width: 100%;
		padding: 14px 16px;
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
  display: ${props => (props.checkFileUpload ? 'static' : 'none')};
  width: 1200px;
  background-color: #f6f6f6;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 0 24px 22px 24px;  
  box-sizing: border-box;
  >div:nth-of-type(1){
    height: 27px;
    margin-top: 26px;
    margin-bottom: 16px;
    box-sizing: border-box;
    >span:nth-of-type(1){
      font-size: 18px;
      line-height: 40px;
      letter-spacing: -0.45px;
      color: #282c36;
      font-weight: bold;
      margin-right: 10px;
    }
    >span:nth-of-type(2){
      font-size: 16px;
      line-height: 40px;
      letter-spacing: -0.4px;
      color: #86888c;      
    }
  }
  >div:nth-of-type(2){
    border: 1px solid #ffffff;
    background-color: #ffffff;
    position: relative;
  }
}
`;

const DirectInputBox = styled.div`
	font-size: 18px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	letter-spacing: -0.45px;
	color: #282c36;
	width: 108px;
	height: 29px;
	border: solid 1px #c6c7cc;
	border-radius: 3px;
	padding: 4px;
	> input {
		width: 90%;
		padding: 4px;
		outline: none;
		border: none;
		font-size: 18px;
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		letter-spacing: -0.45px;
		color: #282c36;
		::placeholder {
			font-size: 14px;
		}
	}
`;
