import React from "react";
import styled from "styled-components";
import * as Content from "components/Content";
import * as Title from "components/Title";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import STLViewer from "stl-viewer";
const search_img = "/static/images/project/search.png";
import Modal from "./Modal";
import CloseModalButton from "components/CloseModalButton";
import DownloadFile from "components/DownloadFile";
import ManufactureProcess from "../../../../stores/ManufactureProcess";
import * as ManufactureProcessAPI from "axios/ManufactureProcess";
import { createNoSubstitutionTemplateLiteral } from "typescript";

const file_img = "static/images/file2.png";
const download_img = "static/images/download.png";

@inject("Project", "Auth", "ManufactureProcess")
@observer
class Content4 extends React.Component {
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

  openModal = () => {
    this.setState({ modalOpen: true });
  };
  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  // openModal = () => {
  //   this.setState({
  //     ...this.state,
  //     modal_open: true,
  //   });
  // };
  // closeModal = () => {
  //   this.setState({
  //     ...this.state,
  //     modal_open: false,
  //   });
  // };
  // closeClassModal = () => {
  //   this.setState({
  //     ...this.state,
  //     classModal_open: false,
  //   });
  // };

  downloadFile(urls) {
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

    //await projectDetailData && projectDetailData.request_set[0].estimate_set.map((item, idx) => {

    // //console.log(idx);
    // //console.log(process_idx);
    // //console.log(material_idx);
    // //console.log(detail_idx);

    let item_detail_idx = 0;
    if (process_idx === "1") {
      item_detail_idx = detail_idx - material_idx + 1;
    } else {
      item_detail_idx = detail_idx - material_idx;
    }

    if (
      // projectDetailData.request_set[0].estimate_set.length >
      // this.state.process.length
      projectDetailData.request_set[0].estimate_set.length > this.count
    ) {
      this.count++;
      const req = {
        id: process_idx,
      };
      await ManufactureProcessAPI.loadProcess(req).then((res) => {
        const data = res.data;

        this.setState({ process: this.state.process.concat(data.name) });

        for (let i = 0; i < data.detailmanufactureprocess_set.length; i++) {
          if (detail_idx == data.detailmanufactureprocess_set[i].id) {
            this.setState({
              detailProcess: this.state.detailProcess.concat(
                data.detailmanufactureprocess_set[i].name
              ),
            });
          }
        }
      });

      //})
      //this.setState({ render_process });
    }
  }

  async componentDidMount() {
    // const { Project, ManufactureProcess } = this.props;
    // const { projectDetailData } = Project;
    // count = projectDetailData.request_set[0].estimate_set.length
    // console.log("componentDidMount");
    // console.log(this.props.Project.projectDetailData);
    // (await this.props.ProjectprojectDetailData) &&
    //   this.props.Project.projectDetailData.request_set[0].estimate_set.map(
    //     (item, idx) => {
    //       console.log(toJS(decodeURI(item.stl_file.split("/").pop())));
    //     }
    //   );
  }
  render() {
    const { Project, ManufactureProcess, user } = this.props;
    const { projectDetailData } = Project;
    return (
      <Background>
        {/* <Containerv1 style={{ display: "flex", flexDirection: "column" }}> */}
        <RequestContainer>
          <Font24 mb={30}>프로젝트 설명 및 요청사항</Font24>
          <RequestSubContainer style={{ marginBottom: 70 }}>
            <Font20>공개 내용</Font20>
            <RequestBox>
              <RequestContent>
                <pre style={{ whiteSpace: "break-spaces" }}>
                  {projectDetailData &&
                    projectDetailData.request_set[0].order_request_open}
                  {/* {Project.projectDetailData.request_set[0].order_request_open} */}
                </pre>
              </RequestContent>
              <File>
                {projectDetailData &&
                  projectDetailData.request_set[0].requestfile_set.map(
                    (item, idx) => {
                      {
                        console.log(toJS(item));
                      }
                      if (item.share_inform) {
                        return (
                          <div>
                            <div>
                              <img src={file_img} />
                              {/* <DownloadFile
                              file={item.file}
                              href={decodeURI(item.file)}
                              download
                            ></DownloadFile> */}
                              <span
                                onClick={() => this.downloadFile(item.file)}
                                style={{ cursor: "pointer" }}
                              >
                                {decodeURI(item.file.split("/").pop())}
                              </span>
                            </div>
                          </div>
                        );
                      }
                    }
                  )}
              </File>
            </RequestBox>
          </RequestSubContainer>
          <Font20>비공개내용</Font20>
          {user === "partner" ? (
            <BlackBox>
              <span>'문의 답변을 해주셔야만 열람 할 수 있습니다.'</span>
              <RequestSubContainer style={{ filter: "blur(5px)" }}>
                <DrawingCard></DrawingCard>
                <RequestBox>
                  {" "}
                  <RequestContent></RequestContent>
                  <File></File>
                </RequestBox>
              </RequestSubContainer>
            </BlackBox>
          ) : (
            <RequestSubContainer>
              {/* <Font20>비공개내용</Font20> */}
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
                      //}
                      // console.log(process);
                    }
                    return (
                      <DrawingCard>
                        <Header>
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
                          <div
                            onClick={() => {
                              console.log("stl download");
                              this.downloadFile(item.stl_file);
                            }}
                          >
                            {/* <div onClick={this.openModal}> */}
                            <span
                              onClick={() => {}}
                              style={{ cursor: "pointer" }}
                            >
                              다운로드
                            </span>
                            <img src={download_img} />
                          </div>
                          {/* <CloseModalButton handleClose={this.closeModal} /> */}
                          <Modal
                            open={this.state.modalOpen}
                            close={this.closeModal}
                            header="도면"
                            title="dd"
                          >
                            <p>
                              dddddddddddddddddddddddddddddddddddddddddddddddd
                              dddddddddddddddddddd dddd dddddddd dddd dddd dddd
                              dddd dddddddd dddddddd
                            </p>
                          </Modal>
                        </Header>
                        <Body>
                          <DrawingName>
                            <div>
                              {decodeURI(item.stl_file.split("/").pop())}
                            </div>
                          </DrawingName>
                          <DrawingInfo>
                            <div>
                              <span>생산공정</span>

                              <span>{this.state.process[idx]}</span>
                            </div>

                            <div>
                              <span>재료</span>

                              <span>{this.state.detailProcess[idx]}</span>
                            </div>

                            <div>
                              <span>수량</span>
                              <span>{item.number}</span>
                            </div>
                            <div>
                              <span>가격</span>
                              {item.process === "1" ? (
                                <span>
                                  {(
                                    Math.round(item.totalMaxPrice / 10000) *
                                      10000 +
                                    Math.round(item.maxPrice / 10) *
                                      10 *
                                      item.number
                                  ).toLocaleString("ko-KR") + "원"}
                                </span>
                              ) : (
                                <span>
                                  {(
                                    Math.round(item.maxPrice) * item.number
                                  ).toLocaleString("ko-KR") + "원"}
                                </span>
                              )}
                            </div>
                          </DrawingInfo>

                          {/* <div>
                            <span>마감</span>
                            <span>기본가공</span>
                          </div>
                          <div>
                            <span>색상</span>
                            <span>검정</span>
                          </div> */}
                        </Body>
                        {/* <Tail>
                         
                        </Tail> */}
                      </DrawingCard>
                    );
                  }
                )}
              <RequestBox>
                {" "}
                <RequestContent>
                  {projectDetailData &&
                    projectDetailData.request_set[0].order_request_close}
                </RequestContent>
                <File>
                  {projectDetailData &&
                    projectDetailData.request_set[0].requestfile_set.map(
                      (item, idx) => {
                        if (!item.share_inform) {
                          return (
                            <div>
                              <div>
                                <img src={file_img} />
                                {/* <DownloadFile
                              file={item.file}
                              href={decodeURI(item.file)}
                              download
                            ></DownloadFile> */}
                                <span
                                  onClick={() => this.downloadFile(item.file)}
                                  style={{ cursor: "pointer" }}
                                >
                                  {decodeURI(item.file.split("/").pop())}
                                </span>
                              </div>
                            </div>
                          );
                        }
                      }
                    )}
                </File>
              </RequestBox>
            </RequestSubContainer>
          )}
        </RequestContainer>
        {/* </Containerv1> */}
      </Background>
    );
  }
}
export default Content4;

const Container4 = styled.div`
  width: 100%;
  height: 1091px;
`;

const Font24 = styled(Content.FontSize24)`
  line-height: 1.67;
  font-weight: bold;
  letter-spacing: -0.6px !important;
  color: #282c36;
  margin-bottom: ${(props) => (props.mb ? props.mb : "")}px;
`;

const Font20 = styled(Title.FontSize20)`
  line-height: 1.7;
  font-weight: normal;
  letter-spacing: -0.5px !important;
  color: #414550;
  margin-bottom: 12px;
`;

const RequestContainer = styled.div`
  width: 100%;
`;
const RequestSubContainer = styled.div`
  width: 100%;
  word-break: break-all;
`;

const RequestBox = styled.div`
  //height: 383px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  padding: 26px 43px;
  box-sizing: border-box;
`;

const RequestContent = styled.div`
  //border: 1px solid red;
  margin-bottom: 52px;
`;

const File = styled.div`
  //border: 1px solid blue;
  > div {
    > div {
      > span {
        font-size: 18px;
        font-weight: normal;
        line-height: 40px;
        letter-spacing: -0.45px;
        color: #767676;
      }
    }
  }
`;

// const RequestContainer = styled.div`
//   width: 100%;
// `;

const DrawingCard = styled.div`
  width: 100%;
  height: 233px;
  border: 1px solid #c6c7cc;
  border-radius: 4px;
  margin-bottom: 16px;
  display: flex;
`;

const Header = styled.div`
  //width: 100%;
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  // > div:nth-of-type(1) {
  //   font-size: 18px;
  //   font-weight: bold;
  //   line-height: 2.22;
  //   letter-spacinig: -0.45px;
  //   color: #282c36;
  // }

  > div:nth-of-type(2) {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    width: 40%;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    > span {
      font-size: 16px;
      line-height: 2.5;
      letter-spacing: -0.4px;
      color: #414550;
      font-weight: normal;
    }
  }
`;

const Body = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 20px;
  > div:nth-of-type(1) {
    > span:nth-of-type(1) {
      width: 30%;
      display: inline-block;
      font-size: 18px;
      font-weight: 500;
      line-height: 2.22;
      letter-spacing: -0.45px;
      color: #282c36;
    }
    > span:nth-of-type(2) {
    }
  }
`;
const Tail = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  > div {
    > span:nth-of-type(1) {
      width: 30%;
      display: inline-block;
      font-size: 18px;
      font-weight: 500;
      line-height: 2.22;
      letter-spacing: -0.45px;
      color: #282c36;
    }
    > span:nth-of-type(2) {
    }
  }
  > div:nth-of-type(1) {
    margin-bottom: 18px;
  }
  > div:last-child {
    margin-bottom: 10px;
  }
`;

const BlackBox = styled.div`
  position: relative;
  > span {
    font-size: 18px;
    color: #0933b3;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const DrawingName = styled.div`
  > div:nth-of-type(1) {
    font-size: 18px;
    font-weight: bold;
    line-height: 2.22;
    letter-spacinig: -0.45px;
    color: #282c36;
  }
`;
const DrawingInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;
    > span:nth-of-type(1) {
      font-size: 18px;
      line-height: 40px;
      letter-spacing: -0.45px;
      color: #282c36;
      font-weight: 500;
      margin-bottom: 8px;
    }
    > span:nth-of-type(2) {
      font-size: 18px;
      line-height: 40px;
      letter-spacing: -0.45px;
      color: #282c36;
    }
  }
`;
// const RequestBox = styled.div`
//   height: 383px;
//   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
//   padding: 26px 43px;
//   box-sizing: border-box;
// `;
