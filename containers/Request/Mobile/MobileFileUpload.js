import React, { Component, useCallback } from "react";
import styled from "styled-components";
import { inject, observer } from 'mobx-react';
import { useDropzone } from 'react-dropzone'
import STLViewer from 'stl-viewer'
import FileImage from 'FileImage.js'

import CircularProgress from '@material-ui/core/CircularProgress';
// Components
import * as Content from "components/Content";
import * as ManufactureProcessAPI from "axios/ManufactureProcess";
import SelectComponent from 'components/Select';
import ManufactureProcess from "../../../stores/ManufactureProcess";
import InputComponent from '../AddFile';
import Containerv1 from "../../../components/Containerv1";


const pass3 = 'static/images/pass3.png'
const deleteButtonImg = "/static/images/delete.png";

const fileList = []

const customStyles = {  
  container: (base, state) => {
    return ({
        ...base,
        zIndex: state.isFocused ? "98" : "auto"  //Only when current state focused
    })
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
    fontSize: 15,
  }),
  control: () => ({
    fontSize: 15,
    border: '1px solid #e6e6e6',
    backgroundColor: '#fff',
    display: 'flex',
    borderRadius: 6,  
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  }
}

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
    loading:false,
    checkScroll: false,
    orderPrice: [],
  }
  
  // 직접 입력할 경우 텍스트 박스의 값을 저장하는 함수
  setNumCount = (data, val) => {
    console.log(val)
    if (val.label != '직접 입력') {
      data.quantity = {label: val, value: val};
    }
    if (val.label == '직접 입력' && (val.value == 0 || val.value == '')) {      
      data.quantity = {label: "직접 입력", value: val};
    }
    if (val.value == 0) {      
      data.quantity = {label:'직접 입력', value:val.value}
    }
  }
  
  // ESC 버튼을 눌렀을 경우 발생하는 함수 (삭제 에정)
  escFunction(event){
    if(event.keyCode === 27) {
      console.log("esc")
    }
  }

  checkQuantityData = (e, data, idx) => {
    const directInput = document.getElementsByClassName("directInput")
    const re = /^[0-9\b]+$/;    
    if(e.target.value === ''){
      e.target.placeholder = '직접 입력하세요'
    }else if (!(re.test(e.target.value))) {
      data.quantity = {label: '직접 입력', val: ''}
    }
                      
    if(data.selectBig.name === "금형사출"){
      if(e.target.value > 0 && e.target.value < 100){
        alert("최소 주문 수량은 100개입니다!")
        data.quantity = {label: '직접 입력', val: 0}
        e.target.value = ''
        directInput[idx].focus();
      }else{
        this.countPrice()
      }                                    
    }else{
      this.countPrice()
    }                                                                            
  }

  componentDidMount(){
    const { ManufactureProcess } = this.props    

    if(!ManufactureProcess.checkPaymentButton){
      //window.addEventListener('scroll', this.loadScroll);
    }    
  }

  componentWillUnmount = () => {
    const { ManufactureProcess } = this.props
    ManufactureProcess.dataPrice = []
  }

  // 각각의 도면 데이터들의 가격과 총 주문금액을 계산하는 함수 
  async countPrice(){
    const { ManufactureProcess } = this.props
    let price = 0;
    await fileList.map((data, idx) => {           
      data.totalMoldPrice = Math.round(data.moldPrice/10000) * 10000    
      data.totalEjaculationPrice = Math.round(data.ejaculationPrice/10) * 10 * ( data.quantity.value ? data.quantity.value : 0 )
      data.totalPrice = Math.round(data.productionPrice/100) * 100 * data.quantity.value

      // 도면 데이터가 체크 되어 있는 경우에만 총 주문금액 계산
      if(data.checked){        
        if(data.selectBig.name === "금형사출"){        
          price += data.totalMoldPrice
          price += data.totalEjaculationPrice
        }else{          
          price += data.totalPrice
        }
      }else{
        
      }     
    })  
    this.setState({g:3})  
    ManufactureProcess.orderPrice = price;    
  }
  

  loadFileResopnse=(fileIdx)=>
    {
      const ManufactureProcessFormData = new FormData();
      ManufactureProcessFormData.append("blueprint", fileList[fileIdx].originFile);
      ManufactureProcessFormData.append("process", ManufactureProcess.selectedBigCategory.id);
      ManufactureProcessFormData.append("detailProcess", ManufactureProcess.selectedMidCategory.id);
      fileList[fileIdx].selectedMid=ManufactureProcess.selectedMidCategory;
      fileList[fileIdx].priceLoading=true;
      this.setState({t:false})
      console.log('fileIdx = '+fileIdx + ' / process = ' + ManufactureProcess.selectedBigCategory.id + ' / detailProcess =' + 
      ManufactureProcess.selectedMidCategory.id)

      //기본정보입력에서 받은 의뢰서로 바꾸기
      ManufactureProcessFormData.append("request", 2467);
      // this.setState({fileList:fileList})
      console.log(ManufactureProcessFormData)
      ManufactureProcessAPI.saveSelect(ManufactureProcessFormData)
      .then((res) => {
        fileList[fileIdx].price=res.data.data.totalMaxPrice;
        fileList[fileIdx].productionPrice = res.data.data.maxPrice;
        fileList[fileIdx].priceLoading=false;
        this.countPrice()
        //리렌더링을 위한 state설정. 바꿔야될듯
        this.setState({t:true})
        this.setState(
          {
            fileList:fileList
          })
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
      //
    }
    checkboxChange = (idx, e) => {
      this.setState({...this.state, checkCard: e});
    }

      // 스크롤 할 때 도면 추가하는 부분 밑으로 스크롤 할 경우 헤더 부분 fix가 풀리고 다시 도면 추가하는 부분으로 스크롤 할 경우 헤더 부분이 fix가 되게끔 하는 함수
      // loadScroll = () => {
      //   const { ManufactureProcess } = this.props
      //   if(!ManufactureProcess.checkPaymentButton){
      //     var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      //     var standardHeight = 180;
      //     var currentHeight = standardHeight + ((fileList.length) * 240)                
      //     const card = document.getElementById("card")      

      //     if(card){
      //       if(this.props.ManufactureProcess.checkFileUpload){        
      //         if(scrollTop > currentHeight && !this.state.checkScroll){                        
      //           card.style.display = "none"
      //           card.style.position = "static"                
      //           this.setState({checkScroll : true})                              
      //         }else if(scrollTop < currentHeight){                     
      //           card.style.display = "flex";
      //           card.style.position = "fixed"
      //           this.setState({checkScroll : false}) // checkScroll 안 쓸 듯        
      //         }                    
      //       }      
      //       else{      
      //         card.style.display = "flex"    
      //       }
      //     }    
      //   }  
      // }
    
    // 추가 요청 사항 부분 - 사용자가 멀티 라인으로 텍스트 할 경우 자동으로 높이 조절되게끔 해주는 함수
    handleChange = (event) => {
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

      ManufactureProcess.requestComment = event.target.value      
  };

  // 수량이 변경되는 경우 수량 정보를 저장
  onQuantityChange(data, value){          
    if(data.selectBig.name == "금형사출" && value.value > 0 && value.value < 100){
       alert("최소 주문 수량은 100개입니다!")          
    }else{
      this.setState(() => {
        return { quantity: value.value };
      });
      data.quantity = value
    }                  
  }

  MyDropzone = () => {
    const { ManufactureProcess } = this.props;
    const dropHandler = (files) => {
      
    let loadingCounter=0;
    console.log("dropHandler")
      files.forEach((file,fileIdx) => {          
        const ManufactureProcessFormData = new FormData();
        ManufactureProcessFormData.append("blueprint", file);
        ManufactureProcessFormData.append("process", ManufactureProcess.categoryDefaultValue.big.id);
        ManufactureProcessFormData.append("detailProcess", ManufactureProcess.categoryDefaultValue.mid.id);
        //기본정보입력에서 받은 의뢰서로 바꾸기
        ManufactureProcessFormData.append("request", 2467);
        console.log(ManufactureProcessFormData)
        this.setState({loading:true})
            
        //this.props.ManufactureProcess.saveSelect(ManufactureProcessFormData)
        ManufactureProcessAPI.saveSelect(ManufactureProcessFormData)
        .then((res) => {
          loadingCounter++;
          this.setState({
            fileList:fileList.push({
              originFile:file,
              drawFile:res.data.data.stl_file,
              fileName:file.name,
              price:res.data.data.maxPrice,
              //MaxPrice: res.data.data.maxPrice,

              productionPrice: res.data.data.maxPrice, // 생산가
              moldPrice: Math.round(res.data.data.totalMaxPrice/10000) * 10000,  // 금형가                      
              ejaculationPrice: Math.round(res.data.data.maxPrice/10) * 10, // 사출가                      

              x_length: Math.round(res.data.data.x_length),
              y_length: Math.round(res.data.data.y_length),
              z_length: Math.round(res.data.data.z_length),

              selectedMid:ManufactureProcess.categoryDefaultValue.mid,
              checked:true,
                      
              quantity: {label: "", value: "0"},
              inputQuantity: 0,

              totalPrice: 0,
              totalMoldPrice: res.data.data.totalMaxPrice,
              totalEjaculationPrice: res.data.data.maxPrice,
              
              optionBig:ManufactureProcess.ManufactureProcessList,
              selectBig:ManufactureProcess.categoryDefaultValue.big,
              optionMid:ManufactureProcess.categoryDefaultValue.big.detail,
              selectedMid:ManufactureProcess.categoryDefaultValue.mid,
              priceLoading:false
            })
          })
               
          console.log(loadingCounter +'/'+files.length)
          if(loadingCounter === files.length){
            this.setState({loading:false})
          }
          
          this.countPrice()
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
        });                                   
      })      
    }

    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
      this.setState({checkFileUpload: true })
      this.props.ManufactureProcess.checkFileUpload = true

      //const card = document.getElementById("card")
    //   if(card){                         
    //     card.style.display = "flex"
    //     card.style.position = "fixed"
    //   }
      dropHandler(acceptedFiles);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
      <>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
         
          <InputBox checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>{
            isDragActive ?
              <p>Drop the files here ...</p> :
              <DropZoneContainer checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>
                 {this.state.loading === true ? 
              <>
                <div style={{fontSize: '10px'}}>Uploading files...</div>
                <CircularProgress style={{margin:'5px auto', width: '12px', height: '12px'}}className="spinner" />
            
              </> : 
              <>                          
                  {!this.props.ManufactureProcess.checkFileUpload && (
                    
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '18px', marginTop: '40px'}}>
                      <div style={{color: '#0933b3', fontSize: '16px', fontWeight: 'bold', marginBottom: '-3px'}}>↑</div>
                      <div style={{width: '18px', height: '7px', border: '2px solid #0933b3', borderTop: 'none'}}></div>
                    </div>
                    <p>3D 도면 파일을 <span>파일찾기</span><span> 클릭</span></p>
                    <p>*한 파일에 한 파트만 업로드 해주세요.</p>
                    <FileImageContainer>
                      <FileImage name=".STP"/>                                                            
                      <FileImage name=".STEP"/>                                          
                      <FileImage name=".STL"/>                                          
                    </FileImageContainer>
                  </>
                )}
                {this.props.ManufactureProcess.checkFileUpload &&                
                  <div>              
                      <span>
                        <div></div>
                        <div></div>
                      </span>
                      <p>3D 도면 파일을 이곳에 드래그 또는 <span>파일찾기</span></p>              
                  </div>
                }
              </>
              }          
              </DropZoneContainer>
            }
            </InputBox>
        </div>
      </>
    )
  }

  render() {
    const { ManufactureProcess } = this.props;

    return (
      <>
      <Containerv1 style={{flexDirection:'column'}}>
        <Card checkFileUpload={this.props.ManufactureProcess.checkFileUpload} onChange={this.scrollChange} id="card">      
          <Header checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>
            {this.props.ManufactureProcess.checkFileUpload ? "도면 추가" : this.props.title}
          </Header>        
          <ContentBox checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>          
            <this.MyDropzone onChange={this.scrollChange}></this.MyDropzone>                                 
          </ContentBox> 
        </Card>
        
        
        <ItemList checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>
          {fileList.map((data, idx) =>            
            <>
                <ItemBox id="itemBox">
                  <MainBox>              
                     <CheckBox active={data.checked}>                                             
                        <div active={data.checked} onClick = {()=>{
                      if(!data.checked)
                      {
                        data.checked=true;
                      }
                      else
                      {
                        data.checked=false
                      }
                      
                      this.setState({f:3})
                      this.countPrice()
                    }}>
                          <img src={pass3} active={data.checked}/>
                        </div>                                    
                     </CheckBox>
                    
                    <StlBox>
                      <div>{data.fileName}</div>
                      <Length>
                        {data.x_length + " x " + data.y_length + " x " + data.z_length + " mm"}
                      </Length>
                      <STLViewer
                        model={data.drawFile} // stl파일 주소
                        width={120}                                  // 가로
                        height={120}                                 // 세로
                        // width={250}
                        // height={210}
                        modelColor='gray'                            // 색
                        backgroundColor='white'                      // 배경색
                        rotate={true}                                // 자동회전 유무
                        orbitControls={true}                         // 마우스 제어 유무
                        cameraX={500}
                        //cameraZ={500}
                        //lights={[2,4,1]}
                         //lights={[2, 2, 2]}
                        lights={[0, 0, 1]}
                        //lightColor={'red'}
                      />
                      
                    </StlBox>
                    <ColumnBox>                        
                      <ManufactureBox> 
                        <Label>생산공정</Label>                       
                        <Select                          // defaultValue={ManufactureProcess.ManufactureProcessList[2]}
                          defaultValue={ManufactureProcess.categoryDefaultValue.big}
                          styles={customStyles}                           
                          value={data.selectBig}
                          options={data.optionBig}                                                  
                          getOptionLabel={(option) => option.name} 
                          onChange={(e)=>{
                            ManufactureProcess.setBigCategory(e);
                            this.loadFileResopnse(idx);                                                        
                            data.selectBig=e;
                            data.optionMid=e.detail;
                            
                            if(data.selectBig.name === "금형사출"){
                              data.quantity = {label: "0", value: '0'};
                            }else{
                              data.quantity = {label: "1", value: '1'};
                            }                            
                            this.countPrice()
                          }}
                        />                         
                      </ManufactureBox>
                    </ColumnBox>
                    <MaterialBox>     
                        <Label>재료</Label>                                         
                       <Select                  
                          defaultValue={ManufactureProcess.categoryDefaultValue.mid}                          
                          value={data.selectedMid}
                          styles={customStyles}                           
                          options={data.optionMid}
                          getOptionLabel={(option) => option.name} 
                          onChange={(e)=>{
                            ManufactureProcess.setMidCategory(e);
                            this.loadFileResopnse(idx);                            
                            this.countPrice()
                          }}
                        />
                    </MaterialBox>
                    <WCLabel>
                        <Label>마감</Label>     
                        <Label>색상</Label>     
                    </WCLabel>
                    <WCBox>
                        <span>기본가공</span>
                        <span>검정</span>
                    </WCBox>

                    <QuantityBox quantity={data.quantity.value} id="quantityBox">  
                    <Label>수량</Label>                   
                    {(data.quantity.label != '직접 입력' && data.selectBig.name !== "금형사출") &&
                      <Select 
                        id="select"
                        quantity={data.quantity.label}                         
                        styles={customStyles} 
                        style={{overflow: 'visible'}} 
                        options={quantityAry} 
                        getOptionLabel={(option) => option.label} 
                        value={data.quantity} 
                        onChange={(value) => {                       
                          this.onQuantityChange(data, value)                                                                              
                          this.countPrice()
                        }                          
                      }/>                                        
                    }
                      
                      { (data.quantity.label == '직접 입력' || data.selectBig.name === "금형사출") &&                      
                      <DirectInputBox quantity={data.quantity.label} id="directInputBox">                                                                                                      
                          <input
                            id="morethanTen"
                            className="directInput"               
                            placeholder="직접 입력하세요"  
                            onKeyPress = {(e) => {
                              if (e.key === "Enter") {                                
                                this.checkQuantityData(e, data, idx)
                              }                              
                            }} 
                            
                            onFocus={(e) => {
                                e.target.placeholder = ''                                                                         
                              }
                             }
                            onBlur={(e) => {        
                              this.checkQuantityData(e, data, idx)                                                                        
                            }}       
                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;

                              if (e.target.value === '' || re.test(e.target.value)) {
                                this.setNumCount(data, e.target.value)
                              }else{
                                data.quantity = {label: '직접 입력', val: '0'}
                                e.target.value =''
                                this.setNumCount(data, e.target.value)
                                alert("숫자를 입력하세요")                                
                              }                                                   
                            }}                                                               
                          />                                      
                        </DirectInputBox>
                          }
                    </QuantityBox>
                  </MainBox>

                  
                  <div style={{textAlign: 'right'}}>
                  <TailBox id="tailBox" checkSelectBig = {data.selectBig.name} style={{float:'right', display: 'inline-block'}}>                                   
                    <div>                                      
                      <span>{data.priceLoading === true ? <CircularProgress style={{ width: '22px', height: '22px'}} className="spinner" /> 
                      : (data.selectBig.name === "금형사출" ? 
                        <>                   
                            <span>금형가 </span> 
                            <span>{data.totalMoldPrice.toLocaleString('ko-KR') + " 원"}</span>
                            
                            <span style={{marginLeft: '15px'}}>사출가</span>
                            <span>{data.totalEjaculationPrice.toLocaleString('ko-KR') + " 원"}</span>                          
                        </>
                      :
                        <>                                                    
                            <span>가격 </span>                              
                            <span>{data.totalPrice.toLocaleString('ko-KR') + " 원"} </span>                          
                        </>
                      )}
                      </span>          
                    </div>      
                  </TailBox>
                  </div>
                  <DeleteBox>
                    <span onClick={() => {                      
                      this.setState({ fileList: fileList.splice(idx, 1) });             
                      
                      if(fileList.length === 0){                        
                        this.setState({checkFileUpload: false})       
                        this.props.ManufactureProcess.checkFileUpload = false 
                          
                        if(!this.props.ManufactureProcess.checkFileUpload){
                          const card = document.getElementById("card")                          
                          if(card){
                            card.style.display = "flex"
                            card.style.position = "static"
                          }
                         }    
                       }                   
                       this.countPrice()   
                    }}>
                      <img src={deleteButtonImg} />
                    </span>
                  </DeleteBox>
                </ItemBox>            
              </>
            )}
          </ItemList>
                    

                
          {/* <Price checkFileUpload = {this.props.ManufactureProcess.checkFileUpload} id="price">              
              <PriceLabel>
                <span>총 주문금액</span>
                <span>총 배송비</span>
                <span>총 결제 금액</span>
              </PriceLabel>

              <PriceData>                                              
                  <span>
                    {ManufactureProcess.orderPrice.toLocaleString('ko-KR')}<span> 원</span>
                  </span>
                  <span>+</span>                
                  <span>
                    0<span> 원</span>
                  </span>
                  <span>=</span>
                  <span>
                    {ManufactureProcess.orderPrice.toLocaleString('ko-KR')}<span> 원</span>
                  </span>
              </PriceData>                                                          
            </Price>        */}


          {/* <Reference checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>
            <div>
              <span>참고 파일</span>
              <span>이미지 혹은 PDF 자료만 업로드 가능합니다. 전문 설계 용어와 기호를 사용해 주시면 좋습니다.</span>
            </div>
            
            <span style={{display: 'inline-block'}}>
              <InputComponent file={true} onChange={this.handleChange}/>              
              <div></div>
            </span>
            
          </Reference> */}
          
          {/* <Button checkFileUpload={ManufactureProcess.checkFileUpload}>
              <div>
                <span>상담 요청하기</span>
              </div>
              <div>
                <span onClick={() => {
                  ManufactureProcess.checkPaymentButton = true;
                }}>주문하기</span>
              </div>
            </Button> */}
            
        </Containerv1>
        <Request checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>        
                    
          <textarea                                              
            placeholder="요청 사항을 입력해주세요."                
            onFocus={(e) => e.target.placeholder = ''}
            onBlur={(e) => e.target.placeholder = '요청 사항을 입력해주세요.'}
            rows={this.state.rows}
            value={this.state.value}              
            className={'textarea'}
            placeholderStyle={{ fontWeight: '400' }}
            onChange={this.handleChange}                
                    />                        
        </Request>
      </>
    )
  }
}

export default FileUploadContainer;

const quantityAry = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5', value: '5'},
  {label: '6', value: '6'},
  {label: '7', value: '7'},
  {label: '8', value: '8'},
  {label: '9', value: '9'},
  {label: '직접 입력', value: ''},
];

const Select = styled(SelectComponent)`
  width: ${props => props.width ? props.width : '100%'};
  display: ${props => props.quantity === "직접 입력" ? 'none' : 'block'};
  margin: 8px 0 12px 0;

  @keyframes fadeIn {  
    0% {
      opacity:0.5;
      transform: translateY(-10px);
    }
    100% {
      opacity:1;
      transform: translateY(0);
    }
  }

  >div: nth-of-type(2){
    -webkit-font-smoothing: antialiased;
    animation: fadeIn 0.2s ease-out;
  }
`

const ItemList = styled.div`
  width: 97%;
  height: 100%;
  padding-left: 3px;
  
  padding-top: ${props => props.checkFileUpload ? '130px' : ''};
`


const ItemBox = styled.div`
  display:flex;
  justify-content:space-between;
  width: 100%;
  height: 557px;
  position: relative;

  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
  margin-bottom: 40px;  
  box-sizing: border-box;
  padding: 20px 14px;
`

const StlBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  box-sizing: border-box;
  >div{
    width: 90%;
    text-align: center;
    word-wrap: break-word;
  }
`

const Length = styled.div`
  font-size: 14px;
  line-height: 40px;
  letter-spacing: -0.35px;
  color: #282c36;
`

const ColumnBox = styled.div`
  width: 100%;
`
const MainBox = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const ContentBox = styled.div`
  width: ${props => props.checkFileUpload ? 'calc(100%-3px)' : '100%'};
  height: ${props => props.checkFileUpload ? '50px' : ''};
  display: flex;
  flex-direction: column;
  border: 2px dashed #a4aab4;
  border-radius: 5px;
  background-color: #f6f6f6;
  margin-bottom: ${props => props.checkFileUpload ? '0' : '120px'};
  :focus{
    outline: none;
  }

`
const ManufactureBox = styled.div`
  display:flex;
  flex-direction: column;
`

const MaterialBox = styled.div`
  width: 100%;
`
const Label = styled.div`
  font-size: 15px;
  letter-spzcing: -0.38px;
  color: #282c36;  
  font-weight: normal;  
`
const WCLabel = styled.div`
  display: flex;
  width: 100%;
  >div{
    flex-grow: 1;
  }
  >div:nth-of-type(2){
    padding-left: 5px;
  }
`

const WCBox = styled.div`
  width: 100%;
  display: flex;
  >span{
    flex-grow: 1;
    width: 100%;
    text-align:left;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    font-size: 15px;
    line-height: 40px;
    letter-spacing: -0.38px;
    color: #282c36;
    background-color: #e1e2e4;        
    padding-left: 11px;
    border: 1px solid #e1e2e4;
    border-radius: 3px;
    margin: 8px 12px 12px 0;
    box-sizing: border-box;
    height: 38px;
  }
  >span:nth-of-type(2){
    margin-right: 0;
  }
`

const QuantityBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const TailBox = styled.div`
  width: 100%;  
  position: absolute;
  top: 90%;
  left: -5%;
  >div{
    >span{    
      >span{
        font-size: 18px;
        color: #0933b3;
        letter-spacing: -0.45px;                
        line-height: 40px;
        font-weight: bold;
      }
      >span:nth-of-type(odd){        
        font-weight: 500;
        text-align: left;        
        margin-right: 10px;
      }
      
      >span:nth-of-type(even){        
        
      }      
    }
  }
`

const DeleteBox = styled.div`
  position: absolute;
  top: 3%;
  left: 91%;
`

const InputBox = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  height: ${props => props.checkFileUpload ? '50px' : ''};
  text-align:center;
  :focus{
    outline: 0;
  }    
  cursor: pointer;
`

const Card = styled.div`
  width: ${props => props.checkFileUpload ? 'calc(100% - 30px)' : '100%'};
  height: ${props => props.checkFileUpload ? '120px' : ''};
  object-fit: contain;
  background-color: white;
  margin-bottom: ${props => props.checkFileUpload ? '20px' : ''};
  display: flex;
  flex-direction: column;
  position: ${props => props.checkFileUpload ? 'fixed' : 'static'};
  top: 50px;
  z-index: 99;
  box-sizing: border-box;
`

const Header = styled.div`
  font-weight: ${props => props.checkFileUpload ? "bold" : "normal"};
  font-stretch: normal;
  font-style: normal;
  line-height: 18px;
  letter-spacing: -0.4px;
  color: #282c36;
  padding-top: 16px;
  padding-bottom:20px;
  object-fit: contain;
  text-align: ${props => props.checkFileUpload ? "left" : 'center'};
  font-size: ${props => props.checkFileUpload ? "18px" : "16px"};
`

const FileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CheckBox = styled.div`
  width: 100%;
  position: absolute;
  top: 3%;
  left: 5%;
  
  > div{        
    width: 19px;
    height: 19px;
    background-color: ${(props) => (props.active ? '#0933b3' :  '#ffffff')};
    margin-right: 10px;    
    position: relative;
    cursor: pointer;
    border: 1px solid #c6c7cc;
    border-radius: 2px;
    box-sizing: border-box;
    > img{
      display: ${(props) => (props.active ? 'static' :  'none')};
      position: absolute;
      top: 17%;
      left: 15%;        
    }
  }
}
`

const DropZoneContainer = styled.div`
  >div{
    display: flex;
    align-items: center;    
    
    >span{
      width: 20px;
      height: 20px;
      border-radius: 10px;
      background-color: #0933b3;
      margin-right: 16px;
      position: relative;

      >div{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffffff;
        border: 1px solid white;
      }
      >div:nth-of-type(1){
        width: 8px;
        height: 0px;    
      }
      >div:nth-of-type(2){
        width: 0px;
        height: 8px;
      }
    }  
  }
  
  p:nth-of-type(1){
    font-size: 15px;
    line-height: 30px;
    letter-spacing: -0.38px;
    color: #282c36;
    margin-bottom: 4px;
    height: ${props => props.checkFileUpload ? '' : '22px'};
    
    span:nth-of-type(1){
        border-bottom: ${props => props.checkFileUpload ? '' : '1px solid #0933b3'};
    }
    span{
      color: #0933b3;
      font-weight: bold;
    }
    
    :focus{
      outline: none;
    }
  }
  >p:nth-of-type(2){
    font-size: 14px;
    line-height: 30px;
    letter-spacing: -0.35px;
    color: #767676;
    height: 20px;
  }
`

const TableHeader = styled.div`
  margin-top: 30px;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #c6c7cc;
  padding-bottom: 18px;
  display: ${props => props.checkFileUpload ? 'flex' : 'none'};

  >div{
    width: 19px;
    height: 19px;
    border: 1px solid #c6c7cc;
    margin-left: 18px;
    margin-right: 148px;
    box-sizing: border-box;
  }
  >span{
    font-size: 1.125em;
    text-align: left;
    line-height: 40px;
    letter-spacing: -0.45px;
    color: #282c36;
    font-weight: 600;
  }
  >span:nth-of-type(1){
    margin-right: 223px;   
  }
  >span:nth-of-type(2){
    margin-right: 164px;   
  }
  >span:nth-of-type(3){
    margin-right: 141px;   
  }
  >span:nth-of-type(4){
    margin-right: 76px;   
  }
  >span:nth-of-type(5){
    margin-right: 93px;   
  }
  >span:nth-of-type(6){
    margin-right: 85px;   
  }
`

const Price = styled.div`
  flex-direction: column; 
  width: 100%;
  height: 197px;
  border-top: 3px solid #414550;
  border-bottom: 2px solid #c6c7cc;  
  margin-top: 60px;
  margin-bottom: 70px;
  display: ${props => props.checkFileUpload ? 'flex' : 'none'};
`
const PriceLabel = styled.div`
  height: 75px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #e1e2e4;
  >span{
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
  }
  >span:last-child{
    font-weight: bold;
  }
`
const PriceData = styled.div`
  height: 122px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  >span{
    font-size: 30px;
    line-height: 40px;
    letter-spacing: -0.75px;
    color: #282c36;
    font-weight: bold;
  }
  >span:last-child{
    color: #0933b3;
  }
  >span:nth-child(2n), >span>span{
    font-weight: normal;
  }
`

const Button = styled.div`
  margin-top: 83px;
  margin-bottom: 230px;
  display: ${props => props.checkFileUpload ? 'flex' : 'none'};
  justify-content: center;  
  align-items: center;
  
  >div{
    width: 226px;
    height: 61px;
    font-size: 20px;
    line-height: 52px;
    letter-spacing: -0.5px;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    
    position: relative;
    >span{      
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }    
  }

  >div:nth-of-type(1){
    border: 1px solid #0933b3;
    background-color: #ffffff;
    color: #0933b3;
    margin-right: 22px;
  }
  >div:nth-of-type(2){
    border: 1px solid #ffffff;
    background-color: #0933b3;
    color: #ffffff;
  }
`

const Request = styled.div`
  width: 100%;
  display: ${props => props.checkFileUpload ? 'static' : 'none'};
  padding: 16px 0 16px 14px;
  box-sizing: border-box;
  margin-bottom: 40px;
  margin-top: 50px;
  border-top: 1px solid #c6c7cc;
  border-bottom: 1px solid #c6c7cc;

  >textarea{
    resize: none;
    border: 1px solid #ffffff;
    width: 100%;
    box-sizing: border-box;
    font-size: 18px;
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
    :placeholder{
      font-weight: 300;
    }
    white-space: pre-line;

  }
`  

const Reference = styled.div`
  display: ${props => props.checkFileUpload ? 'static' : 'none'};
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
` 
  
const DirectInputBox = styled.div`
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  color: #282c36;
  height: 37px;
  border: solid 1px #c6c7cc;
  border-radius: 3px;
  padding: 4px;   
  width: 97%;
  display: block;
  margin: 8px 0 12px 0;
  > input {
    width: 90%;
    padding: 4px;
    outline: none;
    border: none;
    font-size: 15px;
    line-height: 30px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.45px;
    color: #282c36;
    ::placeholder{
      font-size: 14px;
    }
  }
`