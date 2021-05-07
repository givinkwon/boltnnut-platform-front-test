import React from 'react';
import styled, {css} from 'styled-components';
import { inject, observer } from 'mobx-react';
import * as Text from "components/Text";
import * as Content from "components/Content";
import Background from "components/Background";
import STLViewer from "stl-viewer";
import * as ManufactureProcessAPI from "axios/ManufactureProcess";
const search_img = "/static/images/project/search.png";
const fileimg = "/static/images/project/fileimg.svg";

@inject('Project', "Auth", "ManufactureProcess")
@observer

class MobileContent2 extends React.Component {
  process = [];
  detailProcess = [];
  count = 0;
  state = {
    modalOpen: false,
    modal_open: false,
    classModal_open: false,
    render_process: false,
    process: [],
    detailProcess: [],
  };

  downloadFile(urls) {
    console.log(urls);

    const blob = new Blob([this.content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = `${urls}`;
    a.download = `${urls}`;
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  async loadProcess(item, idx, process_idx, material_idx, detail_idx) {
    const { Project, ManufactureProcess } = this.props;
    const { projectDetailData } = Project;

    // console.log(toJS(item));
    // console.log(toJS(projectDetailData));
    // console.log(toJS(projectDetailData.request_set[0].estimate_set));

    //await projectDetailData && projectDetailData.request_set[0].estimate_set.map((item, idx) => {

    // console.log(idx);
    console.log(process_idx);
    // console.log(material_idx);
    // console.log(detail_idx);

    let item_detail_idx = 0;
    if (process_idx === "1") {
      item_detail_idx = detail_idx - material_idx + 1;
    } else {
      item_detail_idx = detail_idx - material_idx;
    }

    // console.log(item_detail_idx);
    // console.log(this.state.process.length);
    // console.log(projectDetailData.request_set[0].estimate_set.length);
    if (
      // projectDetailData.request_set[0].estimate_set.length >
      // this.state.process.length
      projectDetailData.request_set[0].estimate_set.length > this.count
    ) {
      this.count++;
      console.log("통과통과통과통과통과통과통과통과");
      const req = {
        id: process_idx,
      };
      await ManufactureProcessAPI.loadProcess(req).then((res) => {
        const data = res.data;
        // console.log(data.name);
        // console.log(data);
        console.log(data.detailmanufactureprocess_set);
        console.log(item_detail_idx);
        console.log(data.detailmanufactureprocess_set[item_detail_idx - 1]);

        this.setState({ process: this.state.process.concat(data.name) });
        //this.process = this.process.concat(data.name);
        this.setState({
          detailProcess:
            data.detailmanufactureprocess_set[item_detail_idx - 1] &&
            this.state.detailProcess.concat(
              data.detailmanufactureprocess_set[item_detail_idx - 1].name
            ),
        });
        // this.detailProcess = this.detailProcess.concat(
        //   data.detailmanufactureprocess_set[item_detail_idx - 1].name
        // );
      });
      console.log(this.state.process);
      console.log(this.state.detailProcess);

      //})
      //this.setState({ render_process });
    }
  }

  componentDidMount() {
    // const { Project, ManufactureProcess } = this.props;
    // const { projectDetailData } = Project;
    // count = projectDetailData.request_set[0].estimate_set.length
    console.log("componentDidMount");
    console.log(this.props.Project.projectDetailData);
  }


  render() {
    const { Project, ManufactureProcess, user } = this.props;
    const { projectDetailData } = Project;
    return(
          <div>
              <div style = {{marginBottom: 40}}>
                <Font16 style = {{marginBottom: 14}}>프로젝트 설명 및 요청사항</Font16>
                <Font15>공개 내용</Font15>
                <Box1 style = {{flexDirection: "column", paddingTop: 14, paddingBottom: 14}}>

                  <Font14 style={{color: "#282c36", lineHeight: '26px', letterSpacing: -0.35, whiteSpace: "break-spaces" }}>
                    {projectDetailData &&
                      projectDetailData.request_set[0].order_request_open}
                  </Font14>
                  <div style = {{display: 'flex', flexDirection: 'column', marginTop: 40}}>
                      {projectDetailData && projectDetailData.request_set[0].requestfile_set.map((item, idx) => {
                        if (item.share_inform) {
                          return (
                              <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <img src={fileimg} style={{width:20, height: 20, marginRight: 2 }} />

                                <Font14
                                  onClick={() => this.downloadFile(item.file)}
                                  style={{ color: "#767676", cursor: "pointer" }}
                                >
                                  {decodeURI(item.file.split("/").pop())}
                                </Font14>
                              </div>
                          );
                        }
                      }
                      )}
                  </div>
                  
                </Box1>
                
              </div>
            
              <div style = {{marginBottom: 120}}>
                
                <Font15>비공개 내용</Font15>
                {user === "partner" ? (
                  <>
                  <span>문의 답변을 해주셔야만 열람할 수 있습니다.</span>  
                  <BlackBox style={{ filter: "blur(5px)" }}>
                  
                  {projectDetailData &&
                    projectDetailData.request_set[0].estimate_set.map(
                      (item, idx) => {
                        {
                          // console.log(toJS(item));
                          //if (!this.state.render_process) {
                          this.loadProcess(
                            item,
                            idx,
                            item.process,
                            item.material,
                            item.category
                          );
                        }

                        return(              
                          <Box1 style = {{flexDirection: "column", paddingTop: 20, paddingBottom: 0}}>
                            <Font16 style = {{paddingBottom: 8}}>47c2f5474824497c9b00a3_stl.stl</Font16>
                            <Font14 style = {{paddingBottom: 17}}>345 x 265 x 21 mm</Font14> 
                            <div style = {{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
                              <div>
                                <STLViewer
                                  model={item.stl_file} // stl파일 주소
                                  width={120} // 가로
                                  height={120} // 세로
                                  // width={250}
                                  // height={210}
                                  modelColor="gray" // 색
                                  backgroundColor="white" // 배경색
                                  rotate={true} // 자동회전 유무
                                  orbitControls={true} // 마우스 제어 유무
                                  cameraX={500}
                                  //cameraZ={500}
                                  //lights={[2,4,1]}
                                  //lights={[2, 2, 2]}
                                  // lights={[0, 0, 1]}
                                  //lightColor={'red'}
                                />
                              </div>


                      <Box1 
                      onClick={() => {
                        console.log("stl download");
                        this.downloadFile(item.stl_file);
                      }}
                      
                      style = {{padding: 0, 
                        marginTop: 14,
                        marginBottom: 11, 
                        alignItems: "center", 
                        justifyContent: "center", 
                        width: 141, 
                        height: 32,
                        cursor: "pointer"
                        }}>
                        <Font14 style = {{letterSpacing: -0.35, color: "#414550"}}>도면 상세보기</Font14>
                        <img src = {search_img} style = {{width: 16, height: 16, marginLeft: 15}}></img>
                      </Box1>
                    </div>

                    <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                      <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>생산공정</Font15><Font15>{this.state.process[idx]}</Font15>
                    </div>
                    <div style = {{borderStyle: "solid",borderTopWidth:1, borderTopColor:"#e1e2e4"}}></div>
                    <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                      <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>재료</Font15><Font15>{this.state.detailProcess[idx]}</Font15>
                    </div>
                    {/* <div style = {{borderStyle: "solid",borderTopWidth:1, borderTopColor:"#e1e2e4"}}></div>
                     <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                       <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>마감</Font15><Font15>금형/사출</Font15>
                     </div>
                     <div style = {{borderStyle: "solid",borderTopWidth:1, borderTopColor:"#e1e2e4"}}></div>
                     <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                       <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>색상</Font15><Font15>금형/사출</Font15>
                     </div>
                     <div style = {{borderStyle: "solid",borderTopWidth:1, borderTopColor:"#e1e2e4"}}></div>
                     <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                       <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>수량</Font15><Font15>금형/사출</Font15>
                     </div> */}
                    <div style = {{borderStyle: "solid",borderTopWidth:1, borderTopColor:"#e1e2e4"}}></div>
                    <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                      <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>가격</Font15>
                      {item.process === "1" ? (
                        <Font15>
                          {(
                            Math.round(item.totalMaxPrice / 10000) *
                              10000 +
                            Math.round(item.maxPrice / 10) *
                              10 *
                              item.number
                          ).toLocaleString("ko-KR") + "원"}
                        </Font15>
                      ) : (
                        <Font15>
                          {(
                            Math.round(item.maxPrice) * item.number
                          ).toLocaleString("ko-KR") + "원"}
                        </Font15>
                      )}
                    </div>
                  </Box1>
                        );  
                    }
                    
                  )
                  }
                  <Box1 style = {{flexDirection: "column", paddingTop: 14, paddingBottom: 14}}>
                    <Font14 style = {{color: "#282c36", marginBottom: 40, lineHeight: '26px', letterSpacing: -0.35}}>
                      {projectDetailData &&
                      projectDetailData.request_set[0].order_request_close}
                      </Font14>
                    <div style = {{display: 'flex', flexDirection: 'column'}}>
                      {projectDetailData &&
                        projectDetailData.request_set[0].requestfile_set.map(
                          (item, idx) => {
                            if (!item.share_inform) {
                              return (

                                  <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
                                    <img src={fileimg} style={{width:20, height: 20, marginRight: 2 }} />
                                    {/* <DownloadFile
                                  file={item.file}
                                  href={decodeURI(item.file)}
                                  download
                                ></DownloadFile> */}
                                    <Font14 style = {{color: "#767676", alignItems: "center"}}
                                      onClick={() => this.downloadFile(item.file)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      {decodeURI(item.file.split("/").pop())}
                                    </Font14>
                                  </div>
                            
                              );
                            }
                          }
                        )}

                      </div>
                    </Box1>
                  </BlackBox>
                  </>

                ):(
                    <>
                  {projectDetailData &&
                    projectDetailData.request_set[0].estimate_set.map(
                      (item, idx) => {
                        {
                          // console.log(toJS(item));
                          //if (!this.state.render_process) {
                          this.loadProcess(
                            item,
                            idx,
                            item.process,
                            item.material,
                            item.category
                          );
                        }
                        return(              
                          <Box1 style = {{flexDirection: "column", paddingTop: 20, paddingBottom: 0}}>
                            <Font16 style = {{paddingBottom: 8}}>{decodeURI(item.stl_file.split("/").pop())}</Font16>
                            <Font14 style = {{paddingBottom: 17}}>345 x 265 x 21 mm</Font14> 
                            <div style = {{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
                              <div>
                                <STLViewer
                                  model={item.stl_file} // stl파일 주소
                                  width={120} // 가로
                                  height={120} // 세로
                                  // width={250}
                                  // height={210}
                                  modelColor="gray" // 색
                                  backgroundColor="white" // 배경색
                                  rotate={true} // 자동회전 유무
                                  orbitControls={true} // 마우스 제어 유무
                                  cameraX={500}
                                  //cameraZ={500}
                                  //lights={[2,4,1]}
                                  //lights={[2, 2, 2]}
                                  // lights={[0, 0, 1]}
                                  //lightColor={'red'}
                                />
                              </div>
                              <Box1 
                                onClick={() => {
                                  console.log("stl download");
                                  this.downloadFile(item.stl_file);
                                }}
                                
                                style = {{padding: 0, 
                                  marginTop: 14,
                                  marginBottom: 11, 
                                  alignItems: "center", 
                                  justifyContent: "center", 
                                  width: 141, 
                                  height: 32,
                                  cursor: "pointer"
                                  }}>
                                  <Font14 style = {{letterSpacing: -0.35, color: "#414550"}}>도면 상세보기</Font14>
                                  <img src = {search_img} style = {{width: 16, height: 16, marginLeft: 15}}></img>
                                </Box1>
                            </div>
                          
                            <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                              <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>생산공정</Font15><Font15>{this.state.process[idx]}</Font15>
                            </div>
                            <div style = {{borderStyle: "solid",borderTopWidth:1, borderTopColor:"#e1e2e4"}}></div>
                            <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                              <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>재료</Font15><Font15>{this.state.detailProcess[idx]}</Font15>
                            </div>
                            {/* <div style = {{borderStyle: "solid",borderTopWidth:1, borderTopColor:"#e1e2e4"}}></div>
                            <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                              <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>마감</Font15><Font15>금형/사출</Font15>
                            </div>
                            <div style = {{borderStyle: "solid",borderTopWidth:1, borderTopColor:"#e1e2e4"}}></div>
                            <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                              <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>색상</Font15><Font15>금형/사출</Font15>
                            </div>
                            <div style = {{borderStyle: "solid",borderTopWidth:1, borderTopColor:"#e1e2e4"}}></div>
                            <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                              <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>수량</Font15><Font15>금형/사출</Font15>
                            </div> */}
                            <div style = {{borderStyle: "solid",borderTopWidth:1, borderTopColor:"#e1e2e4"}}></div>
                            <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                              <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>가격</Font15>
                              {item.process === "1" ? (
                                <Font15>
                                  {(
                                    Math.round(item.totalMaxPrice / 10000) *
                                      10000 +
                                    Math.round(item.maxPrice / 10) *
                                      10 *
                                      item.number
                                  ).toLocaleString("ko-KR") + "원"}
                                </Font15>
                              ) : (
                                <Font15>
                                  {(
                                    Math.round(item.maxPrice) * item.number
                                  ).toLocaleString("ko-KR") + "원"}
                                </Font15>
                              )}
                            </div>
                          </Box1>
                  
                        );  
                        
                    }
                  )
                }
                <Box1 style = {{flexDirection: "column", paddingTop: 14, paddingBottom: 14}}>
                  <Font14 style = {{color: "#282c36", marginBottom: 40, lineHeight: '26px', letterSpacing: -0.35}}>
                    {projectDetailData &&
                    projectDetailData.request_set[0].order_request_close}
                    </Font14>
                  <div style = {{display: 'flex', flexDirection: 'column'}}>
                    {projectDetailData &&
                      projectDetailData.request_set[0].requestfile_set.map(
                        (item, idx) => {
                          if (!item.share_inform) {
                            return (

                                <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
                                  <img src={fileimg} style={{width:20, height: 20, marginRight: 2 }} />
                                  {/* <DownloadFile
                                file={item.file}
                                href={decodeURI(item.file)}
                                download
                              ></DownloadFile> */}
                                  <Font14 style = {{color: "#767676", alignItems: "center"}}
                                    onClick={() => this.downloadFile(item.file)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {decodeURI(item.file.split("/").pop())}
                                  </Font14>
                                </div>
                           
                            );
                          }
                        }
                      )}

                  </div>
                </Box1>
                </>
                )}
                

                
              </div>
            </div>


    );
  }

}
export default MobileContent2;


const Box1= styled.div`
border-radius: 5px;
  border: solid 1px #c6c7cc;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 14px 10px 14px;
  margin-top: 14px;
  word-break: break-all;
`

const Box2 = styled.div`
border-radius: 5px;
  border: solid 1px #c6c7cc;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 14px 10px 14px;
  margin-top: 14px;
  
>div:nth-of-type(2) {
  display: ${(props) => (props.active ? "flex !important" : "none !important")};
}
:hover{
  border-style: solid;
  border-color: #0933b3;
  height: 114px;
}
`

const BlackBox = styled.div`
  position: relative;
  // > span {
  //   font-size: 18px;
  //   color: #0933b3;
  //   font-weight: bold;
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  // }
`;

const Icon = styled.div`
display: flex;
flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 26px;
    hegiht: 26px;
  }
  p {

  }
`
const ChatNotice = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  // bottom: 15px;
  bottom: 8px;
  left: 12px;
  border-radius: 50%;
  // padding: 3px 7px 2px;
  display: ${(props) => (props.active ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  object-fit: contain;
  background-color: #ff3400;
`;

const Font12 = styled(Text.FontSize12)`
font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.83;
  letter-spacing: -0.3px;
  color: #282c36;
`

const Font14 = styled(Content.FontSize14)`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.07;
  letter-spacing: -0.35px;
  
` 

const Font15 = styled(Content.FontSize15)`
  
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -0.38px;
`

const Font16 = styled(Content.FontSize16)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.4px;
`

