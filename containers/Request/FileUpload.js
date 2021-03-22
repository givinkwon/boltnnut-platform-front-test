import React, { Component, useCallback } from "react";
import styled from "styled-components";
import { inject, observer } from 'mobx-react';
import { useDropzone } from 'react-dropzone'
import STLViewer from 'stl-viewer'

import TTT from 'react-select'

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";
import * as ManufactureProcessAPI from "axios/ManufactureProcess";
import SelectComponent from 'components/Select';
import ManufactureProcess from "../../stores/ManufactureProcess";
const DeleteButtonImg = 'static/images/request/Step2/Q.png'
const fileList = [
//   {
//   drawFile: null,
//   fileName: 'd',
//   price: 'ff'
// }
]

const customStyles = {
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
    padding: 4,
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

  static defaultProps = { title: '파일업로드' };

  estimateInfoList = [];
  state = {
    fileList: []
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
                      drawFile:res.data.data.stl_file,
                      fileName:file.name,
                      price:res.data.data.totalMaxPrice,
                    })
                  })
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
      }
      )

    }

    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
      console.log(acceptedFiles);
      dropHandler(acceptedFiles);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
      <>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <InputBox>
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
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
      <Card>
        <Header>
          {this.props.title}
        </Header>
        <ContentBox>
          <ItemList>

            {fileList.map((data, idx) =>
              <>
                <ItemBox>
                  <MainBox>
                    <StlBox>
                      {/* <img src={DeleteButtonImg} style={{width:120,height:120}}/> */}
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
                      {data.fileName}
                      <ManufactureBox style={{ marginTop: 20 }}>
                        {/* <Box active={this.state.list[3]===true} onClick ={()=>this.state.list[3]? this.selectOut(3):this.selectClick(3)}  onBlur = {()=>this.selectOut(3)}> */}
                        {/* <input style={{display: 'none'}} value={Request.input_day ? Request.input_day.value : ''} class="Input"/> */}

                        <Select
                          // defaultValue={ManufactureProcess.ManufactureProcessList[2]}
                          defaultValue={ManufactureProcess.categoryDefaultValue.big}
                          styles={customStyles} options={ManufactureProcess.ManufactureProcessList}
                          // value={ManufactureProcess.selectedBigCategory}
                          getOptionLabel={(option) => option.name} onChange={()=>{ManufactureProcess.setBigCategory}}
                        />

                        {/* </Box> */}
                        <Select
                          defaultValue={ManufactureProcess.categoryDefaultValue.mid}
                          // value={ManufactureProcess.selectedBigCategory}
                          styles={customStyles} options={ManufactureProcess.midCategorySet}
                          getOptionLabel={(option) => option.name} onChange={()=>{ManufactureProcess.setMidCategory;
                            //
                            const ManufactureProcessFormData = new FormData();
                            ManufactureProcessFormData.append("blueprint", file);
                            ManufactureProcessFormData.append("process", ManufactureProcess.categoryDefaultValue.big.id);
                            ManufactureProcessFormData.append("detailProcess", ManufactureProcess.categoryDefaultValue.mid.id);
                            //기본정보입력에서 받은 의뢰서로 바꾸기
                            ManufactureProcessFormData.append("request", 2467);

                            ManufactureProcessAPI.saveSelect(ManufactureProcessFormData)
                              .then((res) => {
                                fileList.forEach(file=>
                                  {
                                    if(file.drawFile==res.data.data.stl_file)
                                    {
                                      // file.price=res.data.data.totalMaxPrice;
                                    }
                                  })
                                
                                this.setState(
                                  {
                                    fileList:fileList
                                  })
                                // return res;
                              })
                              .catch((e) => {
                                console.log(e);
                                console.log(e.response);
                              });
                              //
                          }}
                        />
                      </ManufactureBox>
                    </ColumnBox>

                  </MainBox>

                  <TailBox>
                    <div onClick={() => this.setState({ fileList: fileList.splice(idx, 1) })}>
                      <img src={DeleteButtonImg} />
                    </div>

                    {data.price}
                  </TailBox>
                </ItemBox>
              </>

            )}
          </ItemList>
          <this.MyDropzone></this.MyDropzone>
        </ContentBox>
      </Card>
    )
  }
}

export default FileUploadContainer;
const Select = styled(SelectComponent)`
  width: 180px;

  
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

`


const ItemBox = styled.div`
  display:flex;
  justify-content:space-between;
  // width:800px;
  border:1px solid gray;
`

const StlBox = styled.div`

`

const ColumnBox = styled.div`

`

const MainBox = styled.div`
  display:flex;
`

const ContentBox = styled.div`
  // height: calc(46.3%);
  margin-right: 5.4%;
  margin-left: 5.4%;
  margin-top: 2.2%;
  display: flex;
  flex-direction: column;
`
const ManufactureBox = styled.div`
  display:flex;
`

const TailBox = styled.div`

`
const InputBox = styled.div`
    // width:500px;
    display:flex;
    align-items:center;
    justify-content:center;
    height:300px;
    border:1px solid gray;
    text-align:center;
    margin-bottom:20px;
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
  width: 894px;
  // height: 976px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.52);
  background-color: white;
  margin: 60px 0px 200px 280px;
  display: inline;
  float: right;
`
const Header = styled(Content.FontSize32)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.06;
  letter-spacing: -0.8px;
  text-align: left;
  color: #0a2165;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-top: 38px;
  padding-bottom:20px;
  border-bottom: solid 1px #c6c7cc;
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
