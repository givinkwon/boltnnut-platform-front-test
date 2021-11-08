import React, { Component, useCallback } from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import { useDropzone } from "react-dropzone";
import * as Title from "components/Title";
import * as Text from "components/Text";
import SearchBar from "./SearchBar";
import Router from "next/router";
import Buttonv1 from "components/Buttonv1";
import { inject, observer } from "mobx-react";
import FileImage from "../Manufacture/Autoestimate/Fileimage";

const banner0img = "/static/images/banner0img.svg";
const arrow = "static/images/request/arrow.svg";
const mainvideo = "/static/videos/video.mp4";

@inject("Request", "AutoEstimate")
@observer
class Banner0Container extends React.Component {
  state = {
    loading: false,
  };
   // 파일 드랍다운 & 저장
   MyDropzone = () => {
    const { AutoEstimate } = this.props;
    const dropHandler = (files) => {
      let loadingCounter = 0;
      this.state.loading = true;
      // 파일 값 저장
      files.forEach((file, fileIdx) => {
        const Fileextension = file.name.split(".");
        // 도면 파일만 견적 추가
        if(Fileextension[1] == "stp" || Fileextension[1] == "step"){
          AutoEstimate.set_file(file);

          // 견적 호출하기
          AutoEstimate.create_estimate();
        }
        else{
          AutoEstimate.set_file_set(file);
        }
      });

      setTimeout(() => {
        this.setState({ loading: false });
      }, 3000);
    };

    // 파일 업로드 && 드랍 함수 시작
    const onDrop = useCallback((acceptedFiles) => {
      AutoEstimate.home = true;
      Router.push("/autoestimate");
      // 확장자가 맞는 지 체크하는 state
      let check_file = false;

      // 넣은 파일의 확장자 체크 함수
      acceptedFiles.map((data, idx) => {
        let fileNameAvailable = ["stp", "step"];
        const extension = data.name.split(".");

        if (!fileNameAvailable.includes(extension[extension.length - 1])) {
          check_file = false;
          alert("STP, STEP 파일만 자동 견적을 제공하고 있습니다. \n타 확장자 파일의 경우 하단의 버튼 클릭 후, 기본정보 입력 후 후불결제를 클릭해주세요.");
          check_file = true;
          // 파일 업로드 된 것 체크
          AutoEstimate.checkFileUpload = true;
        } else {
          check_file = true;
          // 파일 업로드 된 것 체크
          AutoEstimate.checkFileUpload = true;
        }
      });

      // 파일 확장자가 맞는 경우에만 자동 견적 도출 || 안 맞는 경우에는 견적 미도출
      if (check_file) {
        dropHandler(acceptedFiles);
      }
      // 끝
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {/* {this.state.loading && <LoadingComponent type="spin" color="#0933b3" message="견적산출 중입니다" />} */}
          <InputBox checkFileUpload={AutoEstimate.checkFileUpload}>
            <DropZoneContainer>
              {/*파일이 없을 때 */}
              {!AutoEstimate.checkFileUpload && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      marginBottom: "24px",
                    }}
                  >
                    <div
                      style={{
                        color: "#0933b3",
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "-3px",
                      }}
                    >
                      ↑
                    </div>
                    <div
                      style={{
                        width: "22px",
                        height: "7px",
                        border: "3px solid #0933b3",
                        borderTop: "none",
                      }}
                    ></div>
                  </div>
                  <p>
                    도면 올리고 바로 <span>납기와 견적</span> 확인하세요
                  </p>
                  <p>*한 파일에 한 파트만 업로드 해주세요.</p>
                  <FileImageContainer>
                    <FileImage name=".STP" />
                    <FileImage name=".STEP" />
                    <FileImage name=".STL" />
                    <FileImage name=".DWG" />
                  </FileImageContainer>
                </>
              )}

              {/*파일이 있을 때 */}
              {AutoEstimate.checkFileUpload && (
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
            </DropZoneContainer>
          </InputBox>
        </div>
      </>
    );
  };
  // 파일 업로드 && 드랍 함수 끝

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "90px",
          marginBottom: "110px",
        }}
      >
        <Containerv1 style={{ gap: 30, alignItems: "center" }}>
          <LeftBox>
            <Header>
              CNC 가공 빠르고, 안전하게
              <br />
              AI 견적으로 제조 부품 바로발주
            </Header>

            <Middle>3D 도면만 올리면 부품 납기, 견적이 바로!<br/>즉시 견적 확인하고 편하게 발주하세요.</Middle>

            <this.MyDropzone/>
          </LeftBox>
          <video style={{ borderRadius: 10, boxShadow : "4px 5px 20px 0 rgba(0, 0, 0, 0.16)", width: "700px", height: "700px", marginTop: 40}} autoPlay muted>
                <source style={{ width: "700px", height: "700px"}} src={mainvideo} type="video/mp4"/>
          </video>
          {/* <img src={banner0img} style={{ marginTop: 40 }} /> */}
        </Containerv1>
      </div>
    );
  }
}

export default Banner0Container;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 588px;
`;

const Header = styled(Title.FontSize32)`
  width: 420px;
  height: 151px;
  object-fit: contain;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -1.2px;
  color: #1e2222;
`;

const Middle = styled(Text.FontSize24)`
  width: 100%;
  height: 29px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.8;
  letter-spacing: -0.5px;
  text-align: left;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 80px;
`;
const Button = styled(Buttonv1)`
  width: 263px !important;
  height: 58px !important;
  font-size: 20px;
  font-family: NotoSansCJKkr !important;
  line-height: 2.1;
  letter-spacing: -0.5px;
  margin-top: 100px;
  z-index: 2;
  :hover {
    background-color: #174aee;
  }
`;

const InputBox = styled.div`
  background-color: rgb(246, 246, 246);
  border : 2px dashed #a4aab4;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.checkFileUpload ? "100px" : "313px")};
  text-align: center;
  :focus {
    outline: 0;
  }
  cursor: pointer;
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
    //line-height: 40px;
    letter-spacing: -0.4px;
    color: #767676;
  }
`;

const FileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;