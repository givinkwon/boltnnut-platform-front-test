import React, {Component,useCallback} from "react";
import styled from "styled-components";
import { inject, observer } from 'mobx-react';
import {useDropzone} from 'react-dropzone'
// Components
import * as Content from "components/Content";
import * as Title from "components/Title";

const DeleteButtonImg = 'static/images/request/Step2/Q.png'
const testData=[
  // {
  //   stl:'static/images/request/Step2/Q.png',
  //   name:'asdasd'
  // }
]
function MyDropzone(fileData) {
      const dropHandler = (files)=>
      {
        testData.push({stl:'static/images/request/Step2/Q.png',name:files[0].name})
        console.log(testData);
        // console.log("RRRASNDLKNASLD");
        //file을 백엔드에 전해줌(1)

      // let formData = new FormData();

      // const config ={
      //     header:{'content-type':'multipart/form-data'}
      // }
      // formData.append("file", files[0])

      // axios.post('/api/product/image', formData, config)
      //     // 백엔드가 file저장하고 그 결과가 reponse에 담김
      //     // 백엔드는 그 결과를 프론트로 보내줌(3)
      //     .then(response =>{
      //         if(response.data.success){
      //             setImages([...Images, response.data.filePath])
      //         }else{
      //             alert('파일 저장 실패')
      //         }
      //     })
    }

    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
      console.log(acceptedFiles);
      dropHandler(acceptedFiles);
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
      <>
      {/* <ItemList>

      
      {fileData.map((data)=>
        <>
          <ItemBox>
            <MainBox>
              <StlBox>
                <img src={DeleteButtonImg} style={{width:120,height:120}}/>
              </StlBox>
              <ColumnBox>
                {data.name}
                <ManufactureBox style={{marginTop:20}}>
                  <div>
                    div1
                  </div>
                  <div>
                    div2
                  </div>
                  <div>
                    div3
                  </div>
                </ManufactureBox>
              </ColumnBox>
              
            </MainBox>

            <TailBox>
              <div>
                <img src={DeleteButtonImg}/>
              </div>
              
              가격: 15,000원
            </TailBox>
          </ItemBox>
        </>

      )}
      </ItemList> */}
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

@inject('Request')
@observer
class FileUploadContainer extends Component {

  static defaultProps = { title: '파일업로드' };

    render() {
      return(
          <Card>
            <Header>
              {this.props.title}
            </Header>
            <ContentBox>
            <ItemList>

      
              {testData.map((data)=>
                <>
                  <ItemBox>
                    <MainBox>
                      <StlBox>
                        <img src={DeleteButtonImg} style={{width:120,height:120}}/>
                      </StlBox>
                      <ColumnBox>
                        {data.name}
                        <ManufactureBox style={{marginTop:20}}>
                          <div>
                            div1
                          </div>
                          <div>
                            div2
                          </div>
                          <div>
                            div3
                          </div>
                        </ManufactureBox>
                      </ColumnBox>
                      
                    </MainBox>

                    <TailBox>
                      <div>
                        <img src={DeleteButtonImg}/>
                      </div>
                      
                      가격: 15,000원
                    </TailBox>
                  </ItemBox>
                </>

              )}
              </ItemList>
                <MyDropzone></MyDropzone>
            </ContentBox>
          </Card>
        )
    }
}

export default FileUploadContainer;

const ItemList=styled.div`

`


const ItemBox=styled.div`
  display:flex;
  justify-content:space-between;
  // width:800px;
  border:1px solid gray;
`

const StlBox=styled.div`

`

const ColumnBox = styled.div`

`

const MainBox=styled.div`
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

const TailBox=styled.div`

`
const InputBox=styled.div`
    // width:500px;
    display:flex;
    align-items:center;
    justify-content:center;
    height:300px;
    border:1px solid gray;
    text-align:center;
    margin-bottom:20px;
`

const ImageBox=styled.div` 
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
