import React, { Component, useCallback } from "react";
import styled from "styled-components";
import { inject, observer } from 'mobx-react';
import { useDropzone } from 'react-dropzone'
import STLViewer from 'stl-viewer'
import FileImage from 'FileImage.js'

import TTT from 'react-select'

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";
import * as ManufactureProcessAPI from "axios/ManufactureProcess";
import SelectComponent from 'components/Select';
import ManufactureProcess from "../../stores/ManufactureProcess";
import CheckBoxComponent from 'components/checkBox';
import DetailQuestion from "../../stores/DetailQuestion";
import InputComponent from 'components/Input2';

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
  }

  resize = (obj) => {
    //console.log(obj)
    console.log(this.state.fileList)
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

      // console.log('detailProcess:'+ManufactureProcess.selectedMidCategory.id)
      //기본정보입력에서 받은 의뢰서로 바꾸기
      ManufactureProcessFormData.append("request", 2467);
      // this.setState({fileList:fileList})
      ManufactureProcessAPI.saveSelect(ManufactureProcessFormData)
      .then((res) => {
        fileList[fileIdx].price=res.data.data.totalMaxPrice;
        console.log(fileList);
        this.setState(
          {
            fileList:fileList
          })
        console.log(res)
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

    componentDidMount(){
      window.addEventListener('scroll', this.loadScroll);
    }

    loadScroll = () => {
    //const { project_idx, projectLength } = this.state;
    //var newIdx = project_idx + 3

    if (typeof document != "undefined") {
      var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      var clientHeight = document.documentElement.clientHeight;
    }
    console.log(scrollHeight)
    console.log(scrollTop)
    console.log(clientHeight)

    // if (scrollTop + clientHeight + 4 > scrollHeight && projectLength == null) {
    //   this.setState({...this.state, projectLength: this.props.length})
    // }
    // if (scrollTop + clientHeight + 4 > scrollHeight && projectLength > project_idx ) {
    //   if (newIdx < projectLength) {
    //     this.setState({...this.state, project_idx: newIdx})
    //   } else {
    //     this.setState({...this.state, project_idx: projectLength})
    //   }
    // }
  }

    scrollChange = (event) => {
      console.log(event)
    }
    
    handleChange = (event) => {
      const textareaLineHeight = 34;
      const { minRows, maxRows } = this.state;
      console.log(event.target.scrollHeight)
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
    };

    setQuantity = (val) => {
      this.props.ManufactureProcess.quantity = val
    }

    onQuantityChange(data, value){ 
      // console.log(data)
      // console.log(value)
      // data.setState({quantity:value.value});      
      this.setState(() => {
        return { quantity: value.value };
      });
      console.log(this)
      console.log(this.state.quantity)
      data.quantity = value
      console.log(data.quantity)
    }
  MyDropzone = () => {
    const { Request, ManufactureProcess } = this.props;
    const dropHandler = (files) => {
      
      

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

            ManufactureProcessAPI.saveSelect(ManufactureProcessFormData)
              .then((res) => {

                this.setState(
                  {
                    fileList:fileList.push({
                      originFile:file,
                      drawFile:res.data.data.stl_file,
                      fileName:file.name,
                      price:res.data.data.totalMaxPrice,
                      selectedMid:ManufactureProcess.categoryDefaultValue.mid,
                      checked:true,
                      quantity: 1,
                    })
                  })
                  console.log(fileList);
                // return res;
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

        console.log(this.estimateInfoList);
        console.log("filelist")
        console.log(fileList)
        console.log(this.state.fileList)
      }
      )

    }

    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
      console.log(acceptedFiles);
      this.setState({checkFileUpload: true })
      console.log(fileList)

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
          <InputBox checkFileUpload={this.state.checkFileUpload}>{
            isDragActive ?
              <p>Drop the files here ...</p> :
              <DropZoneContainer>
                <p>3D 도면 파일을 이곳에 드래그 또는 <span>파일찾기</span></p>
                {!this.state.checkFileUpload && (
                  <>
                <p>*한 파일에 한 파트만 업로드 해주세요.</p>
                <FileImageContainer>
                  <FileImage name=".STP"/>                                                            
                  <FileImage name=".STEP"/>                                          
                  <FileImage name=".STL"/>                                          
                </FileImageContainer>
                </>
              )}
              </DropZoneContainer>
            }
            </InputBox>

        </div>
        {/* )}                         */}
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
        <Card checkFileUpload={this.state.checkFileUpload} onChange={this.scrollChange}>      
          <Header>
            {this.state.checkFileUpload ? "도면 추가" : this.props.title}
          </Header>         

          {/* 임시 이름 */}
          <TableHeader checkFileUpload={this.state.checkFileUpload}>
            <div></div>
            <span>파일명</span>
            <span>기본가공</span>
            <span>재료</span>
            <span>마감</span>
            <span>색상</span>
            <span>수량</span>
          </TableHeader>
        </Card>
        
        <ItemList checkFileUpload={this.state.checkFileUpload}>
          {fileList.map((data, idx) =>            
            <>
              {/* {console.log(data)} */}
                <ItemBox>
                  <MainBox>              
                    {/* <CheckBoxComponent checked={this.state.checkCard} onChange={this.checkboxChange(idx)}/> */}
                                            
                    {/* <CheckBox active={this.activeHandler(idx)} onClick = {()=>{
                      this.setCheck(idx);
                      data.checked=true;
                    }}>                                             
                        <div active={this.activeHandler(idx)}>
                          <img src={pass3} active={this.activeHandler(idx)}/>
                        </div>                                    
                     </CheckBox> */}
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
                      <STLViewer
                        model={data.drawFile} // stl파일 주소
                        width={120}                                  // 가로
                        height={120}                                 // 세로
                        modelColor='gray'                            // 색
                        backgroundColor='white'                      // 배경색
                        rotate={true}                                // 자동회전 유무
                        orbitControls={true}                         // 마우스 제어 유무
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
                          styles={customStyles} options={ManufactureProcess.ManufactureProcessList}
                          // value={ManufactureProcess.selectedBigCategory}
                          getOptionLabel={(option) => option.name} onChange={(e)=>{ManufactureProcess.setBigCategory(e);
                          this.loadFileResopnse(idx);
                          }}
                        />

                       
                      </ManufactureBox>
                    </ColumnBox>
                    <MaterialBox>
                       {/* </Box> */}
                       <Select
                    
                          defaultValue={ManufactureProcess.categoryDefaultValue.mid}
                          // value={ManufactureProcess.selectedMidCategory}
                          value={fileList[idx].selectedMid}
                          styles={customStyles} options={ManufactureProcess.midCategorySet}
                          getOptionLabel={(option) => option.name} onChange={(e)=>{ManufactureProcess.setMidCategory(e);
                            //
                              this.loadFileResopnse(idx);
                            //
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
                        <Select width="116px" styles={customStyles} style={{overflow: 'visible'}}placeholder='1' options={quantityAry} getOptionLabel={(option) => option.label} value={data.quantity} 
                        onChange={(value) => { 
                          console.log(value)
                          // data.setState({quantity: value})
                          console.log(`this.state.quantity: ${this.state.quantity}`)
                          console.log(`data.quantity: ${data.quantity}`)
                          console.log(data)
                          this.onQuantityChange(data, value)}
                          
                        }/>                        

                        
                    </QuantityBox>
                  </MainBox>

                  <TailBox>
                    <span>가격</span>                    
                    <span>{data.price}</span>                  
                    
                  </TailBox>
                  <DeleteBox>
                    <span onClick={() => {
                      this.setState({ fileList: fileList.splice(idx, 1) });
                      // console.log(fileList)
                      // console.log(this.state)
                      if(fileList.length === 0){
                        //  console.log("있음")
                        //  console.log(fileList.length)
                         this.state.checkFileUpload=false
                       }
                      // fileList && (
                      //   console.log("11111")
                      // )
                    }}>
                      <img src={deleteButtonImg} />
                    </span>
                  </DeleteBox>
                </ItemBox>
              </>

            )}
          </ItemList>
          
          
          <ContentBox checkFileUpload={this.state.checkFileUpload}>
            <this.MyDropzone onChange={this.scrollChange}></this.MyDropzone>                                 
          </ContentBox>
 
        
        
          <Price checkFileUpload = {this.state.checkFileUpload}>              
              <PriceLabel>
                <span>총 주문금액</span>
                <span>총 배송비</span>
                <span>총 결제 금액</span>
              </PriceLabel>

              <PriceData>                                              
                  <span>
                    2,979,850<span>원</span>
                  </span>
                  <span>+</span>                
                  <span>
                    979,850<span>원</span>
                    </span>
                  <span>=</span>
                  <span>
                    2,979,850<span>원</span>
                  </span>
              </PriceData>                                                          
            </Price>      

          <Request checkFileUpload={this.state.checkFileUpload}>        
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
          <Reference checkFileUpload={this.state.checkFileUpload}>
            <div>
              <span>참고 파일</span>
              <span>이미지 혹은 PDF 자료만 업로드 가능합니다. 전문 설계 용어와 기호를 사용해 주시면 좋습니다.</span>
            </div>
            
            <div>
              <InputComponent file={true}/>
              {/* <span>파일첨부</span> */}
            </div>
            
          </Reference>
          
          <Button checkFileUpload={this.state.checkFileUpload}>
              <div>
                <span>상담 요청하기</span>
              </div>
              <div>
                <span>주문하기</span>
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
  // top: 400px;
  width: 101%;
  height: 100%;
  // overflow: hidden;
  padding-left: 3px;
  padding-top: ${props => props.checkFileUpload ? '215px' : '0'};
`


const ItemBox = styled.div`
  display:flex;
  justify-content:space-between;
  // flex-direction: column;
  width: 1200px;
  height: 201px;
  // border:1px solid gray;
  position: relative;

  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
  margin-bottom: 40px;
  padding: 0 44px 0 22px;
  box-sizing: border-box;
`

const StlBox = styled.div`
  // border: 3px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  margin-right: 30px;

`

const ColumnBox = styled.div`
// border: 3px solid blue;
margin-right: 30px;
`

const MainBox = styled.div`
  display:flex;
  // border: 3px solid green;
  align-items: center;
`

const ContainerBox = styled.div`
  // position: ${props => props.checkFileUpload ? 'fixed' : 'static'};
`
const ContentBox = styled.div`
  // height: calc(46.3%);
  // position:relative;
  // position: ${props => props.checkFileUpload ? 'fixed' : 'static'};
  // z-index: 0;
  width: 1200px;
  height: ${props => props.checkFileUpload ? '100px' : '313px'};
  // margin-right: 5.4%;
  // margin-left: 5.4%;
  // margin-top: 2.2%;
  display: flex;
  flex-direction: column;
  border: 2px dashed #a4aab4;
  border-radius: 5px;
  background-color: #f6f6f6;
  margin-bottom: ${props => props.checkFileUpload ? '0' : '600px'};
`
const ManufactureBox = styled.div`
  display:flex;
`

const MaterialBox = styled.div`
  // border: 3px solid dodgerblue;
  margin-right: 39px;

`

// WrapBox와 ColorBox 합칠 예정
const WrapBox = styled.div`
  // border: 3px solid cyon;
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
  // border: 3px solid brown;
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
  // border: 3px solid skyblue;
  width: 120px;
  height: 40px;
  position: relative;
`

const TailBox = styled.div`
  // border: 3px solid red;
  width: 300px;  
  position: absolute;
  top: 70%;
  left: 80%;
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
    // width:500px;
    display:flex;
    align-items:center;
    justify-content:center;
    height: ${props => props.checkFileUpload ? '100px' : '313px'};
    // border:1px solid gray;
    text-align:center;
    // margin-bottom:20px;
    
`

const ImageBox = styled.div` 
  padding-top:10px;
  display:flex;
  justify-content:space-between;
  >img
  {
    height:216px;
    width:380px;
  }
`

const Card = styled.div`
  width: 84%;
  //width: 1800px;
  height: ${props => props.checkFileUpload ? '210px' : '100px'};
  object-fit: contain;
  // border-radius: 10px;
  // box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.52);
  background-color: white;
  margin: 60px 0px 20px 0;
  // display: inline;
  // float: right;
  display: flex;
  flex-direction: column;
  position: ${props => props.checkFileUpload ? 'fixed' : 'static'};
  top: 0;
  z-index: 10;
  // width: 100vw;
  // height: 100vh;
  // margin-bottom: ${props => props.checkFileUpload ? '300px' : '0'};
  box-sizing: border-box;
  // border: 3px solid red;
`
const Header = styled(Content.FontSize32)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.06;
  letter-spacing: -0.8px;
  text-align: left;
  color: #0a2165;
  // margin-left: 5.4%;
  // margin-right: 5.4%;
  padding-top: 38px;
  padding-bottom:20px;
  // border-bottom: solid 1px #c6c7cc;
  object-fit: contain;
`

const ConsultantHeader = styled(Content.FontSize24)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #414550;
  padding-top: 130px;
  padding-bottom:20px;
  border-bottom: solid 1px #c6c7cc;
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
  // border: 3px solid yellow;
  // padding-bottom: 300px;
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
  >p:nth-of-type(1){
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    margin-bottom: 4px;
    >span{
      color: #0933b3;
      font-weight: 600;
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
  // display: flex;
  align-items: center;
  //width: 1200px;
  width: 99%;
  border-bottom: 1px solid #c6c7cc;
  padding-bottom: 18px;
  z-index: 1000;
  display: ${props => props.checkFileUpload ? 'flex' : 'none'};

  >div{
    width: 19px;
    height: 19px;
    border: 1px solid #c6c7cc;
    margin-left: 17px;
    margin-right: 148px;
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
    margin-right: 152px;   
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


const Footer = styled.div`

`
const Price = styled.div`
  // display: flex;
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
  // border: 3px solid blue;
  // margin-left: 60%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  // div{
  //   font-size: 20px;
  //   line-height: 40px;
  //   letter-spacinig: -0.5px;
  //   text-align: left;
  //   color: #282c36;
  //   text-align: right;
  // }
  // >div >span:nth-of-type(1){
  //   font-weight: bold;

  // }
  >span{
    font-size: 30px;
    line-height: 40px;
    letter-spacing: -0.75px;
    color: #282c36;
    font-weight: bold;
  }
  >span:nth-child(2n), >span>span{
    font-weight: normal;
  }

`


const TotalPrice = styled.div`
  flex-basis: 20%;
  border: 3px solid green;
  display: flex;
  flex-direction: column;
  width: 114px;
  text-align: right;
  >span:nth-of-type(1){
    font-size: 30px;
    line-height: 40px;
    letter-spacing: -0.75px;
    color: #282c36;
    font-weight: bold;
  }
  >span:nth-of-type(2){
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
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
    font-size: 24px;
    line-height: 52px;
    letter-spacing: -0.6px;
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
    // min-height: 55px;
    // height: 89px;
    // overflow: hidden;
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
	
	  // box-shadow: 0px 4px 10px;

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
  height: 146px;
  background-color: #f6f6f6;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 0 24px;
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
  }
  // >div:nth-of-type(2){
  //   border: 1px solid #ffffff;
  //   width: 100%;
  //   height: 55px;
  //   margin-bottom: 22px;
  //   padding: 6px 0 14px 16px;
  //   box-sizing: border-box;
  //   background-color: #ffffff;
  //   >span{
  //     font-size: 18px;
  //     line-height: 40px;
  //     letter-spacing: -0.45px;
  //     color: #0933b3; 
  //   }
  }
`

const Font20 = styled(Title.FontSize20)`
  // width:100%;
  text-align:left;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: -0.5px;
  color: #282c36;
`

const Font16 = styled(Title.FontSize16)`
  // width:100%;
  text-align:left;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  color: #282c36;
`

const Font18 = styled(Title.FontSize18)`
  // width:100%;
  text-align:left;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.45px;
  color: #282c36;
  background-color: #e1e2e4;
`

