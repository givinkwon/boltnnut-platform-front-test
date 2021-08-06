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
import DownloadFile from "components/DownloadFile";
import * as ManufactureProcessAPI from "axios/Manufacture/ManufactureProcess";
import { createNoSubstitutionTemplateLiteral } from "typescript";

const file_img = "/static/images/project/fileimg.svg";
const download_img = "static/images/download.png";

@inject("Project", "Auth", "ManufactureProcess")
@observer
class Content4 extends React.Component {

  // 파일 다운로드
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

  async componentDidMount() {
  }
  render() {
    const { Project, ManufactureProcess, user, Auth } = this.props;
    console.log(Project.projectDetailData)

    return (
      <Background>
        <RequestContainer>
          <Font24 mb={30}>프로젝트 설명 및 요청사항</Font24>
          
          <RequestSubContainer style={{ marginBottom: 70 }}>
            <Font20>의뢰 내용</Font20>
            <RequestBox>
              <RequestContent>
                <pre style={{ whiteSpace: "break-spaces" }}>
                  {Project.projectDetailData &&
                    Project.projectDetailData.request_set[0].contents}
                </pre>
              </RequestContent>
            </RequestBox>
          </RequestSubContainer>


          {/*비공개내용 :  파트너, 해당 프로젝트를 만든 클라이언트, 해당 프로젝트를 만들지 않은 클라이언트 구분*/}
          <Font20>프로젝트 관련 파일</Font20>
          {/* 파트너일 경우 */}
          {user === "partner" ? (
            <BlackBox>
              <span>
                '의뢰하신 클라이언트가 공개 요청을 승인하면 열람할 수 있습니다.'
              </span>
              <RequestSubContainer style={{ filter: "blur(5px)" }}>
              {/* 의뢰 관련 파일 추가 */}
              <File>
                {Project.projectDetailData &&
                  Project.projectDetailData.request_set[0].requestfile_set.map(
                    (item, idx) => {
                      {
                        console.log(toJS(item));
                      }
                      if (item.share_inform) {
                        return (
                          <div>
                            <div>
                              <img
                                src={file_img}
                                style={{ marginRight: "14px" }}
                              />
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
                {/* 도면 파일 추가 */}
                <DrawingCard></DrawingCard>
                <RequestBox>
                  {" "}
                  <RequestContent></RequestContent>
                  <File></File>
                </RequestBox>
              </RequestSubContainer>
            </BlackBox>
          ) : Project.projectDetailData.request_set[0].client ==
            Auth.logged_in_client.id ? (
            <>
              {/*해당 프로젝트의 클라이언트일 경우*/}
              <RequestSubContainer>
                {Project.projectDetailData &&
                  Project.projectDetailData.request_set[0].estimate_set.map(
                    (item, idx) => {
                      {
                        this.loadProcess(
                          item,
                          idx,
                          item.process,
                          item.material,
                          item.category
                        );
                      }
                      return (
                        <DrawingCard>
                          <Header>
                            <div>
                              <STLViewer
                                model={item.stl_file} // stl파일 주소
                                width={120} // 가로
                                height={120} // 세로
                                modelColor="gray" // 색
                                backgroundColor="white" // 배경색
                                rotate={true} // 자동회전 유무
                                orbitControls={true} // 마우스 제어 유무
                                cameraX={500}
                              />
                            </div>
                            <div
                              onClick={() => {
                                console.log("stl download");
                                this.downloadFile(item.stl_file);
                              }}
                            >
                              <span
                                onClick={() => {}}
                                style={{ cursor: "pointer" }}
                              >
                                다운로드
                              </span>
                              <img src={download_img} />
                            </div>

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
                          </Body>
                        </DrawingCard>
                      );
                    }
                  )}
                <RequestBox>
                  {" "}
                  <RequestContent>
                    {Project.projectDetailData &&
                      Project.projectDetailData.request_set[0].content}
                  </RequestContent>
                  <File>
                    {Project.projectDetailData &&
                      Project.projectDetailData.request_set[0].requestfile_set.map(
                        (item, idx) => {
                          if (!item.share_inform) {
                            return (
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <img src={file_img} />
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
            </>
          ) : (
            <>
              {/*해당 프로젝트의 클라이언트가 아닐 경우*/}
              <BlackBox>
                <span>'해당 프로젝트 담당자만 확인할 수 있습니다.'</span>
                <RequestSubContainer style={{ filter: "blur(5px)" }}>
                  <DrawingCard></DrawingCard>
                  <RequestBox>
                    {" "}
                    <RequestContent></RequestContent>
                    <File></File>
                  </RequestBox>
                </RequestSubContainer>
              </BlackBox>
            </>
          )}
        </RequestContainer>
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
      > img {
        margin-right: 14px;
      }
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
    white-space: nowrap;
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
