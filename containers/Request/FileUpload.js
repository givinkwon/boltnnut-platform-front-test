import React, { Component, useCallback } from "react";
import styled from "styled-components";
import { inject, observer } from 'mobx-react';
import { useDropzone } from 'react-dropzone'
import STLViewer from 'stl-viewer'
import FileImage from 'FileImage.js'

import TTT from 'react-select'
import CircularProgress from '@material-ui/core/CircularProgress';
// Components
import * as Content from "components/Content";
import * as Title from "components/Title";
import * as ManufactureProcessAPI from "axios/ManufactureProcess";
import SelectComponent from 'components/Select';
import ManufactureProcess from "../../stores/ManufactureProcess";
import CheckBoxComponent from 'components/checkBox';
import DetailQuestion from "../../stores/DetailQuestion";
import InputComponent from 'AddFile';
import RatioImage from "components/RatioImage";

const DeleteButtonImg = 'static/images/request/Step2/Q.png'
const pass3 = 'static/images/pass3.png'
const deleteButtonImg = "/static/images/delete.png";

const fileList = [
//   {
//   drawFile: null,
//   fileName: 'd',
//   price: 'ff'
// }
]

const customStyles = {
  // menu: provided => ({...provided, zIndex: 999}),

  // menuList: (provided, state) => ({
  //   ...provided,
  //   // width: state.selectProps.width,
  //   // color: state.selectProps.menuColor,  
  //   position: 'relative',  
  //   zIndex: 9999,
  // }),

  container: (base, state) => {
    return ({
        ...base,
        zIndex: state.isFocused ? "999" : "1"  //Only when current state focused
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
  }
}

@inject('Request', 'ManufactureProcess')
@observer
class FileUploadContainer extends Component {

  
  static defaultProps = { title: '도면 파일을 업로드 해주세요.' };
  totalPrice = 0
  //checkFileUpload = false;

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
    orderPrice: 0
  }
  

  
  componentDidMount(){
    if(!this.props.ManufactureProcess.checkPaymentButton){
      window.addEventListener('scroll', this.loadScroll);
    }
  }

  componentDidUpdate = () => {
    this.countPrice()
  }

  async countPrice(){
    let price = 0;
    await fileList.map((data, idx) => {
      if(data.checked){
        price += this.setPrice(data)
      }
    })
    this.props.ManufactureProcess.orderPrice = price;
  }
  setPrice = (data) => {
    this.totalPrice = Math.round((data.price * data.quantity.value))
    // this.setState({orderPrice : this.state.totalPrice + this.totalPrice})

    // this.setState((state) => {
    //   // 중요: 값을 업데이트할 때 `this.state` 대신 `state` 값을 읽어옵니다.
    //   return {orderPrice : state.totalPrice + this.totalPrice}
    // });

    // console.log(this.state.orderPrice)
    // console.log("setPrice")
    return this.totalPrice
  }
  resize = (obj) => {
    //console.log(obj)
    //console.log(this.state.fileList)
    // obj.style.height = "1px";
    // obj.style.height = (12+obj.scrollHeight)+"px";
  }

// useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [isTabnavOn]);

  // handleScroll = () => {
  //   console.log('스크롤 이벤트');
  //   if (window.scrollY > 500 && !isTabnavOn) {
  //     console.log('키기', window.scrollY, isTabnavOn);
  //     setIsTabnavOn(true);
  //     return;
  //   }
  //   if (window.scrollY <= 500 && isTabnavOn) {
  //     console.log('끄기', window.scrollY, isTabnavOn);
  //     setIsTabnavOn(false);
  //     return;
  //   }
  // };

  loadFileResopnse=(fileIdx)=>
    {
      const ManufactureProcessFormData = new FormData();
      ManufactureProcessFormData.append("blueprint", fileList[fileIdx].originFile);
      ManufactureProcessFormData.append("process", ManufactureProcess.selectedBigCategory.id);
      // console.log('process:'+ManufactureProcess.selectedBigCategory.id)
      ManufactureProcessFormData.append("detailProcess", ManufactureProcess.selectedMidCategory.id);
      fileList[fileIdx].selectedMid=ManufactureProcess.selectedMidCategory;
      fileList[fileIdx].priceLoading=true;
      this.setState({t:false})
      console.log('fileIdx = '+fileIdx + ' / process = ' + ManufactureProcess.selectedBigCategory.id + ' / detailProcess =' + 
      ManufactureProcess.selectedMidCategory.id)
      // console.log('fileNum'+ fileIdx +'의 priceLoading='+fileList[fileIdx].priceLoading)
      // console.log('detailProcess:'+ManufactureProcess.selectedMidCategory.id)
      //기본정보입력에서 받은 의뢰서로 바꾸기
      ManufactureProcessFormData.append("request", 2467);
      // this.setState({fileList:fileList})
      ManufactureProcessAPI.saveSelect(ManufactureProcessFormData)
      .then((res) => {
        fileList[fileIdx].price=res.data.data.totalMaxPrice;
        fileList[fileIdx].priceLoading=false;
      //  console.log(fileList);
        //리렌더링을 위한 state설정. 바꿔야될듯
        this.setState({t:true})
        this.setState(
          {
            fileList:fileList
          })
      //  console.log(res)
        // return res;
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


  setCheck = (idx) => {
    // const {ManufactureProcess} = this.props;
    
    // //console.log(idx)
    // if(idx in ManufactureProcess.checked_index){
    //   //ManufactureProcess.checked_index = -1;
    //   delete ManufactureProcess.checked_index[idx];
    //   // ManufactureProcess.variation = false;
    //   console.log("삭제!");
    //   ManufactureProcess.checked_index2 = -1;  
    // } else{
    //   ManufactureProcess.checked_index[idx] = true;  
    //   // ManufactureProcess.variation = true;
    //   console.log("추가!");
    //   ManufactureProcess.checked_index2 = idx;    
    // }
    
    // console.log(ManufactureProcess.checked_index)




    // if(idx === ManufactureProcess.checked_index2){            
    //   ManufactureProcess.checked_index2 = -1;            
    // } else{
    //   ManufactureProcess.checked_index2 = idx;            
    // }

  
  }
  activeHandler = (idx) => {
    // const {ManufactureProcess} = this.props;      
    //   console.log("activeHandler 입니다");
    //   console.log(idx)
      
      
    //    if(idx in ManufactureProcess.checked_index) {
    //       console.log("true")
    //       return true; 
    //    } else { 
    //     console.log("false")
    //      return false; 
    //    }

    //    if(idx !== ManufactureProcess.checked_index2) {
    //     console.log(`${idx} true`)
    //     return true; 
    //   } else { 
    //     console.log(`${idx} false`)
    //     return false; 
    //  }
    };

  

    loadScroll = () => {
      if(!this.props.ManufactureProcess.checkPaymentButton){
      var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      var clientHeight = document.documentElement.clientHeight;
      var standardHeight = 180;
      var currentHeight = standardHeight + ((fileList.length) * 240)          
      
      if(this.props.ManufactureProcess.checkFileUpload){
        if(scrollTop > currentHeight && !this.state.checkScroll){    
          const card = document.getElementById("card")      
          card.style.display = "none"
          card.style.position = "static"                
          this.setState({checkScroll : true})          
        }else if(scrollTop < currentHeight){           
          card.style.display = "flex";
          card.style.position = "fixed"
          this.setState({checkScroll : false}) // checkScroll 안 쓸 듯        
      }      
    }else{      
      card.style.display = "flex"    
    }    
  }
  }
       
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
    // console.log(event)
    // console.log(this.state.value)
    // console.log(ManufactureProcess.requestComment)
  };

  setQuantity = (val) => {
    this.props.ManufactureProcess.quantity = val
  }

  onQuantityChange(data, value){      
    this.setState(() => {
      return { quantity: value.value };
    });
    data.quantity = value
  }

  MyDropzone = () => {
    const { Request, ManufactureProcess } = this.props;
    const dropHandler = (files) => {
      
    let loadingCounter=0;
      // const temp=this.state.fileList;
      // console.log(files);
      // temp.push({stl:'static/images/request/Step2/Q.png',name:files[0].name})
      files.forEach((file,fileIdx) => {          
            const ManufactureProcessFormData = new FormData();
            ManufactureProcessFormData.append("blueprint", file);
            ManufactureProcessFormData.append("process", ManufactureProcess.categoryDefaultValue.big.id);
            ManufactureProcessFormData.append("detailProcess", ManufactureProcess.categoryDefaultValue.mid.id);
            //기본정보입력에서 받은 의뢰서로 바꾸기
            ManufactureProcessFormData.append("request", 2467);
            this.setState({loading:true})
            ManufactureProcessAPI.saveSelect(ManufactureProcessFormData)
              .then((res) => {

                loadingCounter++;

                this.setState(
                  {
                    fileList:fileList.push({
                      originFile:file,
                      drawFile:res.data.data.stl_file,
                      fileName:file.name,
                      price:res.data.data.totalMaxPrice,
                      selectedMid:ManufactureProcess.categoryDefaultValue.mid,
                      checked:true,
                      quantity: {label: "1", value: "1"},
                      totalPrice: 0,
                      optionBig:ManufactureProcess.ManufactureProcessList,
                      selectBig:ManufactureProcess.categoryDefaultValue.big,
                      optionMid:ManufactureProcess.categoryDefaultValue.big.detail,
                      selectedMid:ManufactureProcess.categoryDefaultValue.mid,
                      priceLoading:false
                    })
                  })
                  console.log(fileList);
                // return res;
                console.log(loadingCounter +'/'+files.length)
                if(loadingCounter === files.length)
                {
                  this.setState({loading:false})
                }
                console.log("filelist")
                console.log(fileList)
              })
              .catch((e) => {
                console.log(e);
                console.log(e.response);
              });
        
              
        //============================================================
        // console.log(ManufactureProcess.ManufactureProcessList);
        // console.log("fileidx="+fileIdx)
        // ManufactureProcess.ManufactureProcessList.forEach((bigCategory,bigIdx) => {
        //   console.log("bigIdx="+bigIdx)
        //   bigCategory.detail.forEach((midCategory,midIdx) => {
        //     console.log("midIdx="+midIdx)
        //     // console.log(bigCategory.name + ' / ' + midCategory.name)
        //     const ManufactureProcessFormData = new FormData();
        //     ManufactureProcessFormData.append("blueprint", file);
        //     ManufactureProcessFormData.append("process", bigCategory.id);
        //     ManufactureProcessFormData.append("detailProcess", midCategory.id);
        //     //기본정보입력에서 받은 의뢰서로 바꾸기
        //     ManufactureProcessFormData.append("request", 2467);

        //     ManufactureProcessAPI.saveSelect(ManufactureProcessFormData)
        //       .then((res) => {
        //         // this.estimateInfoList.push({
        //         //   detail:midCategory.name,
        //         //   price:bigCategory.name+midCategory.name
        //         // })
        //         this.estimateInfoList.push(
        //           {
        //             fileNum:fileIdx,
        //             process: bigCategory.id,
        //             detailProcess: midCategory.id,
        //             price:midCategory.name+' 가격'
        //           }
        //         )
        //         // console.log('bigIdx=='+bigIdx +"/midIdx=="+midIdx+'/ManufactureProceessList.length=='+ManufactureProcess.ManufactureProcessList.length);
        //         // if(bigIdx==ManufactureProcess.ManufactureProcessList.length-1
        //         //   && midIdx == bigCategory.detail.length-1)
        //         console.log('estimateInfoLength='+this.estimateInfoList.length)
        //         console.log('fileLen='+files.length)
        //         if(this.estimateInfoList.length==(files.length*5))
        //         {
        //           console.log(this.estimateInfoList)
        //           // const DefaultArr = this.estimateInfoList.find(this.isDefaultArr);
        //           const DefaultArr = this.estimateInfoList.find(element => 
        //             element.detailProcess===ManufactureProcess.categoryDefaultValue.mid.id);
        //           console.log(ManufactureProcess.categoryDefaultValue.mid.id)
        //           console.log(DefaultArr)
        //           const defaultPrice = DefaultArr.price;

        //           this.setState(
        //           {
        //             fileList:fileList.push({
        //               drawFile:res.data.data.stl_file,
        //               fileName:file.name,
        //               // price:res.data.data.totalMaxPrice,
        //               price: defaultPrice
        //             })
        //           })
        //         }
        //         // return res;
        //       })
        //       .catch((e) => {
        //         console.log(e);
        //         console.log(e.response);
        //       });
        //   })
        // })

        // console.log(this.estimateInfoList);
        
        // console.log(this.state.fileList)
        
      }
      )

    }

    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
      //console.log(acceptedFiles);
      this.setState({checkFileUpload: true })
      this.props.ManufactureProcess.checkFileUpload = true
      //console.log(this.props.ManufactureProcess.checkFileUpload )

      const card = document.getElementById("card")
                          
      card.style.display = "flex"
      card.style.position = "fixed"

      //console.log("onDrop!!")
      //console.log(fileList)

      dropHandler(acceptedFiles);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
      <>
      {/* {fileList && (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <InputBox style={{height: '500px'}}>{
            isDragActive ?
              <p>Drop the files here ...</p> :
              <DropZoneContainer>
                <p>3D 도면 파일을 이곳에 드래그 또는 <span>파일찾기</span></p>              
              </DropZoneContainer>
          }
          </InputBox>

        </div>
      )} */}
      {/* {!this.checkFileUpload && ( */}
        <div {...getRootProps()}>
          <input {...getInputProps()} />
         
          <InputBox checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>{
            isDragActive ?
              <p>Drop the files here ...</p> :
              <DropZoneContainer>
                 {this.state.loading === true ? 
              <>
                <div>Uploading files...</div>
                <CircularProgress style={{margin:'10px auto', width: '22px', height: '22px'}}className="spinner" />
            
              </> : 
              <>                          
                  {!this.props.ManufactureProcess.checkFileUpload && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '24px'}}>
                      <div style={{color: '#0933b3', fontSize: '20px', fontWeight: 'bold', marginBottom: '-3px'}}>↑</div>
                      <div style={{width: '22px', height: '7px', border: '3px solid #0933b3', borderTop: 'none'}}></div>
                    </div>
                    <p>3D 도면 파일을 이곳에 드래그 또는 <span>파일찾기</span></p>
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
    const options = [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" },
      { value: "berry", label: "Berry" },
    ]

    this.componentDidMount()
    {
      // ManufactureProcess.ManufactureProcessList.forEach(t=>console.log(t))
      // console.log(ManufactureProcess.ManufactureProcessList)
    }
    return (
      <>
      <Container>
        <Card checkFileUpload={this.props.ManufactureProcess.checkFileUpload} onChange={this.scrollChange} id="card">      
          <Header>
            {this.props.ManufactureProcess.checkFileUpload ? "도면 추가" : this.props.title}
          </Header>         

          {/* 임시 이름 */}
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
          {fileList.map((data, idx) =>            
            <>
                <ItemBox>
                  <MainBox>              
                     <CheckBox active={data.checked} onClick = {()=>{
                      this.setCheck(idx);
                      if(!data.checked)
                      {
                        data.checked=true;
                      }
                      else
                      {
                        data.checked=false
                      }
                      
                      this.setState({f:3})
                    }}>                                             
                        <div active={data.checked}>
                          <img src={pass3} active={data.checked}/>
                        </div>                                    
                     </CheckBox>
                    
                    <StlBox>
                      {/* <img src={DeleteButtonImg} style={{width:120,height:120}}/> */}
                      {data.fileName}
                      {/* {useEffect(() => {
  
                        }, [])} */}
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
                      {/* <TTT options={options} defaultValue={options[2]}></TTT> */}
                      
                      <ManufactureBox>
                        {/* <Box active={this.state.list[3]===true} onClick ={()=>this.state.list[3]? this.selectOut(3):this.selectClick(3)}  onBlur = {()=>this.selectOut(3)}> */}
                        {/* <input style={{display: 'none'}} value={Request.input_day ? Request.input_day.value : ''} class="Input"/> */}

                        <Select
                          // defaultValue={ManufactureProcess.ManufactureProcessList[2]}
                          defaultValue={ManufactureProcess.categoryDefaultValue.big}
                          styles={customStyles} 
                          // options={ManufactureProcess.ManufactureProcessList}
                          value={data.selectBig}
                          options={data.optionBig}
                          // value={ManufactureProcess.selectedBigCategory}
                          
                          getOptionLabel={(option) => option.name} 
                          onChange={(e)=>{
                            ManufactureProcess.setBigCategory(e);
                            this.loadFileResopnse(idx);
                            // data.optionBig = e;
                            data.selectBig=e;
                            data.optionMid=e.detail;
                          }}
                        />

                       
                      </ManufactureBox>
                    </ColumnBox>
                    <MaterialBox>
                       {/* </Box> */}
                       <Select
                    
                          defaultValue={ManufactureProcess.categoryDefaultValue.mid}
                          // value={ManufactureProcess.selectedMidCategory}
                          value={data.selectedMid}
                          styles={customStyles} 
                          // options={ManufactureProcess.midCategorySet}
                          options={data.optionMid}
                          getOptionLabel={(option) => option.name} 
                          onChange={(e)=>{
                            ManufactureProcess.setMidCategory(e);
                            this.loadFileResopnse(idx);
                          }}
                        />
                    </MaterialBox>
                    <WrapBox>
                        <span>기본가공</span>
                    </WrapBox>
                    <ColorBox>
                        <span>검정</span>
                    </ColorBox>
                    <QuantityBox>
                        <Select width="116px" styles={customStyles} style={{overflow: 'visible'}} placeholder='1' options={quantityAry} getOptionLabel={(option) => option.label} value={data.quantity} 
                        onChange={(value) => {                       
                          this.onQuantityChange(data, value)}                                                    
                        }/>                                                
                    </QuantityBox>
                  </MainBox>

                  
                  <div style={{textAlign: 'right'}}>
                  <TailBox style={{float:'right', display: 'inline-block'}}>                                   
                    <span>가격</span>                    
                    <span>{data.priceLoading === true ? <CircularProgress style={{ width: '22px', height: '22px'}}className="spinner" /> : this.setPrice(data).toLocaleString('ko-KR') + " 원"}</span>                
                  </TailBox>
                  </div>
                  <DeleteBox>
                    <span onClick={() => {
                      // let temp = fileList
                      // temp.splice(idx, 1)

                      this.setState({ fileList: fileList.splice(idx, 1) });             
                      
                      if(fileList.length === 0){
                        
                        this.setState({checkFileUpload: false})       
                        this.props.ManufactureProcess.checkFileUpload = false 
                          
                        if(!this.props.ManufactureProcess.checkFileUpload){
                          const card = document.getElementById("card")                          
                          card.style.display = "flex"
                          card.style.position = "static"
                         }    
                       }                      
                    }}>
                      <img src={deleteButtonImg} />
                    </span>
                  </DeleteBox>
                </ItemBox>            
              </>
            )}
          </ItemList>
                    
          <ContentBox checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>          
            <this.MyDropzone onChange={this.scrollChange}></this.MyDropzone>                                 
          </ContentBox>
                 
          <Price checkFileUpload = {this.props.ManufactureProcess.checkFileUpload} id="price">              
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
            </Price>      

          <Request checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>        
            <div>기타 요청사항</div>            
              <textarea              
                onkeydown={this.resize(this)} 
                onkeyup={this.resize(this)}
                placeholder="특이사항 및 요청을 입력해주세요"
                // value={Partner.search_text}
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = '특이사항 및 요청을 입력해주세요'}
                rows={this.state.rows}
				        value={this.state.value}
				
				        className={'textarea'}
                placeholderStyle={{ fontWeight: '400' }}
				        onChange={this.handleChange}
                // onChange={this.searchText}                
                // class="Input"
                // onKeyDown={this.handleKeyDown}
              />                        
          </Request>
          <Reference checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>
            <div>
              <span>참고 파일</span>
              <span>이미지 혹은 PDF 자료만 업로드 가능합니다. 전문 설계 용어와 기호를 사용해 주시면 좋습니다.</span>
            </div>
            
            <span style={{display: 'inline-block'}}>
              <InputComponent file={true} onChange={this.handleChange}/>
              {/* <span>파일첨부</span> */}
              <div></div>
            </span>
            
          </Reference>
          
          <Button checkFileUpload={this.props.ManufactureProcess.checkFileUpload}>
              <div>
                <span>상담 요청하기</span>
              </div>
              <div>
                <span onClick={() => {
                  ManufactureProcess.checkPaymentButton = true;
                }}>주문하기</span>
              </div>
            </Button>
            
        </Container>
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
  {label: '10', value: '10'},
];


const Select = styled(SelectComponent)`
  width: ${props => props.width ? props.width : '180px'};

  
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

const Box = styled.div`
width: 380px;

  
  ${props => props.active && css`
  svg{
    @keyframes select{
      0% {
        transform: skewY(-180deg);
      }
    }

    animation: select 0.4s ease-out;
    transform: rotate(-180deg);
  }
  `}

  ${props => !props.active && css`
  svg{
    @keyframes selectOut{
      0% {
        transform: rotate(-180deg);
      }
    }
    animation: selectOut 0.4s ;
  }
`}


`
const ItemList = styled.div`
  width: 101%;
  height: 100%;
  padding-left: 3px;
  padding-top: ${props => props.checkFileUpload ? '215px' : '0'};
`


const ItemBox = styled.div`
  display:flex;
  justify-content:space-between;
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
`

const StlBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  margin-right: 30px;
`

const ColumnBox = styled.div`
margin-right: 30px;
`

const MainBox = styled.div`
  display:flex;
  align-items: center;
`

const ContentBox = styled.div`
  width: 1199px;
  height: ${props => props.checkFileUpload ? '100px' : '313px'};
  display: flex;
  flex-direction: column;
  border: 2px dashed #a4aab4;
  border-radius: 5px;
  background-color: #f6f6f6;
  margin-left: 1px;
  margin-bottom: ${props => props.checkFileUpload ? '0' : '600px'};
  :focus{
    outline: none;
  }

`
const ManufactureBox = styled.div`
  display:flex;
`

const MaterialBox = styled.div`
  margin-right: 39px;
`

// WrapBox와 ColorBox 합칠 예정
const WrapBox = styled.div`
  width: 89px;
  height: 40px;
  margin-right: 36px;
  box-sizing: border-box;
  >span{
    width: 100%;
    text-align:left;
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
`

const ColorBox = styled.div`
  width: 57px;
  height: 40px;
  margin-right: 39px;
  >span{
    width: 100%;
    text-align:left;
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
`

const QuantityBox = styled.div`
  width: 120px;
  height: 40px;
  position: relative;
`

const TailBox = styled.div`
  width: 315px;  
  position: absolute;
  top: 70%;
  left: 71%;
  >span:nth-of-type(1){
    font-size: 18px;
    line-height: 40px;
    letter-spacing: -0.45px;
    color: #282c36;
    font-weight: 500;
    text-align: left;
    margin-right: 20px;
  }
  >span:nth-of-type(2){
    font-size: 24px;
    line-height: 40px;
    letter-spacing: -0.6px;
    color: #282c36;
    font-weight: 500;
    text-align: left;
  }
`
const DeleteBox = styled.div`
  position: absolute;
  top: 8%;
  left: 97%;
`
const InputBox = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height: ${props => props.checkFileUpload ? '100px' : '313px'};
    text-align:center;
    :focus{
      outline: 0;
    }
    
`

const Card = styled.div`
  //width: 84%;
  width: 1210px;
  height: ${props => props.checkFileUpload ? '210px' : '100px'};
  object-fit: contain;
  background-color: white;
  margin: 60px 0px 20px 0;
  display: flex;
  flex-direction: column;
  position: ${props => props.checkFileUpload ? 'fixed' : 'static'};
  top: 0;
  z-index: 10;
  box-sizing: border-box;
`
const Header = styled(Content.FontSize32)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.06;
  letter-spacing: -0.8px;
  text-align: left;
  color: #0a2165;
  padding-top: 38px;
  padding-bottom:20px;
  object-fit: contain;
`

const FileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  //width: 1800px;
  width: 100%;
  height: 100%;
`
const CheckBox = styled.div`
  width:75px;
  display: flex;
  align-items: center;
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
`

const DropZoneContainer = styled.div`
  >div{
    display: flex;
    align-items: center;
    
    >span{
      width: 26px;
      height: 26px;
      border-radius: 13px;
      background-color: #0933b3;
      margin-right: 20px;
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
        //border: 3px solid red;
        width: 14px;
        height: 0px;    
      }
      >div:nth-of-type(2){
        width: 0px;
        height: 14px;
      }
    }
  }
  
  p:nth-of-type(1){
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    margin-bottom: 4px;
    
    span{
      color: #0933b3;
      font-weight: 600;
    }
    
    :focus{
      outline: none;
    }
  }
  >p:nth-of-type(2){
    font-size: 16px;
    line-height: 40px;
    letter-spacing: -0.4px;
    color: #767676;
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
  width: 1200px;
  display: ${props => props.checkFileUpload ? 'static' : 'none'};
  background-color: #f6f6f6;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 26px 24px 22px 24px;
  box-sizing: border-box;
  margin-bottom: 40px;
  margin-top: 70px;

  >div{
    height: 27px;
    font-size: 18px;
    line-height: 40px;
    letter-spacing: -0.45px;
    color: #282c36;
    font-weight: bold;
    margin-bottom: 16px;
  }
  >textarea{
    resize: none;
    border: 1px solid #ffffff;
    width: 100%;
    padding: 14px 16px;
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