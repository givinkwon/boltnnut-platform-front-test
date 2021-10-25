import React, { Component, useCallback } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import FileImage from "./Fileimage";
import { useDropzone } from "react-dropzone";
import AutoEstimateCard from "./AutoEstimateCard";
import STLViewer from "stl-viewer";
import Banner0 from "./Home/Banner0";
import Banner1 from "./Home/Banner1";
import Banner2 from "./Home/Banner2";
import Banner3 from "./Home/Banner3";
import Banner4 from "./Home/Banner4";
import Banner5 from "./Home/Banner5";

import MobileBanner0 from "Mobile/Banner0";
import MobileBanner1 from "Mobile/Banner1";
import MobileBanner2 from "Mobile/Banner2";
import MobileBanner3 from "Mobile/Banner3";
import MobileBanner4 from "Mobile/Banner4";
import MobileBanner5 from "Mobile/Banner5";

// Components
import Buttonv1 from "components/Buttonv1";
import * as Content from "components/Content";
import * as Title from "components/Title";
import SelectComponent from "components/Select";
// import LoadingComponent from "components/Loading";

import Router from "next/router";

// 이미지 && 아이콘
const pass2 = "static/images/pass2.png";
const pass3 = "static/images/pass3.png";
const pass7 = "static/images/pass7.png";
const deleteButtonImg = "/static/images/delete.svg";
const fileImg = "/static/images/file.png";
const calendar = "/static/images/facebook.png";
const clip = "./static/images/request/clip.svg";
const addfile = "./static/images/request/addfile.svg";

// selectbox 디자인
const customStyles = {
  container: (base, state) => {
    return {
      ...base,
      zIndex: state.isFocused ? "98" : "auto", //Only when current state focused
    };
  },
  dropdownIndicator: () => ({
    color: "#555555",
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#000000" : "#555555",
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: 16,
    fontSize: 16,
  }),
  control: () => ({
    fontSize: 16,
    border: "1px solid #e6e6e6",
    backgroundColor: "#fff",
    display: "flex",
    borderRadius: 6,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

// time.sleep
function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

// 자동 견적 설명 관련 state
let checkBox = false;
let checkBox_one = false;

@inject("Request", "AutoEstimate")
@observer
class AutoestimateContainer extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {
    const { AutoEstimate } = this.props;
    AutoEstimate.reset();
  };

  // 물음표 설명 트리거
  setIsShown = (flag, idx = 0) => {
    if (idx === 0) {
      checkBox = flag;
      this.setState({ checkBox: flag });
    } else if (idx === 1) {
      checkBox_one = flag;
      this.setState({ checkBox_one: flag });
    }
  };

  // 파일 드랍다운 & 저장
  MyDropzone = () => {
    const { AutoEstimate } = this.props;
    const dropHandler = (files) => {
      let loadingCounter = 0;
      this.state.loading = true;
      // 파일 값 저장
      files.forEach((file, fileIdx) => {
        AutoEstimate.set_file(file);

        // 견적 호출하기
        AutoEstimate.create_estimate();
      });

      setTimeout(() => {
        this.setState({ loading: false });
      }, 3000);
    };

    // 파일 업로드 && 드랍 함수 시작
    const onDrop = useCallback((acceptedFiles) => {
      // 확장자가 맞는 지 체크하는 state
      let check_file = false;

      // 넣은 파일의 확장자 체크 함수
      acceptedFiles.map((data, idx) => {
        let fileNameAvailable = ["stp", "step", "stl", "dwg"];
        const extension = data.name.split(".");

        if (!fileNameAvailable.includes(extension[extension.length - 1])) {
          check_file = false;
          alert("STP, STEP 파일만 자동 견적을 제공하고 있습니다. \nDwg 혹은 STL 파일의 경우 하단의 고객센터로 전화주시면 1영업일 내로 견적을 내드립니다.");
          return false;
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
                    3D 도면 파일을 이곳에 드래그 또는 <span>파일찾기</span>
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

    // 파일 드랍다운 & 저장
    MobileDropzone = () => {
      const { AutoEstimate } = this.props;
      const dropHandler = (files) => {
        let loadingCounter = 0;
        this.state.loading = true;
        // 파일 값 저장
        files.forEach((file, fileIdx) => {
          AutoEstimate.set_file(file);
  
          // 견적 호출하기
          AutoEstimate.create_estimate();
        });
  
        setTimeout(() => {
          this.setState({ loading: false });
        }, 3000);
      };
  
      // 파일 업로드 && 드랍 함수 시작
      const onDrop = useCallback((acceptedFiles) => {
        // 확장자가 맞는 지 체크하는 state
        let check_file = false;
  
        // 넣은 파일의 확장자 체크 함수
        acceptedFiles.map((data, idx) => {
          let fileNameAvailable = ["stp", "step", "stl", "dwg"];
          const extension = data.name.split(".");
  
          if (!fileNameAvailable.includes(extension[extension.length - 1])) {
            check_file = false;
            alert("STP, STEP 파일만 자동 견적을 제공하고 있습니다. \nDwg 혹은 STL 파일의 경우 하단의 고객센터로 전화주시면 1영업일 내로 견적을 내드립니다.");
            return false;
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
                      이 곳을 클릭해 3D 도면 파일 <span>업로드</span>
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

  // 도면 및 관련파일 & 저장
  DWGDropzone = () => {
    const { AutoEstimate } = this.props;
    const dropHandler = (files) => {
      // 파일 값 저장
      files.forEach((file, fileIdx) => {
        AutoEstimate.set_file_set(file);
      });
    };
    // 파일 업로드 && 드랍 함수 시작
    const onDrop = useCallback((acceptedFiles) => {
      dropHandler(acceptedFiles);
      // 끝
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <InputBox checkFileUpload={AutoEstimate.checkFileUpload}>
            <DropZoneContainer>
              {/*파일이 있을 때 */}
              {AutoEstimate.checkFileUpload && (
                <div>
                  <span>
                    <div></div>
                    <div></div>
                  </span>
                  <p>
                    도면(DWG) 및 관련 파일을 이곳에 드래그 또는 <span>파일찾기</span>
                  </p>
                </div>
              )}
            </DropZoneContainer>
          </InputBox>
        </div>
      </>
    );
  };
  // 도면 및 관련파일 && 드랍 함수 끝

  render() {
    const { AutoEstimate, width } = this.props;
    console.log(AutoEstimate.fileList);
    return (
      <>
        {/*웹*/}
        {width > 768 &&
        <Container>
          <Banner0 />
          {/* 자동 견적 헤더 */}
          <HeaderBox>
            <Header>{AutoEstimate.checkFileUpload ? "도면 추가" : "도면 파일을 업로드 해주세요."}</Header>
          </HeaderBox>
          <TableHeader checkFileUpload={AutoEstimate.checkFileUpload}>
            <div></div>
            <span style={{ marginRight: 396 }}>파일명</span>
            <span style={{ marginRight: 180 }}>기본가공</span>
            <span style={{ marginRight: 180 }}>재료</span>
            <span style={{ marginRight: 80 }}>수량</span>
          </TableHeader>

          {/* 자동 견적 창 */}
          <ItemList checkFileUpload={AutoEstimate.checkFileUpload}>
            {AutoEstimate.fileList.map((data, idx) => (
              <ItemBox>
                <MainBox>
                  <CheckBox
                    active={data.checked}
                    onClick={() => {
                      if (!data.checked) {
                        data.checked = true;
                        AutoEstimate.checkQuantity(idx, data.quantity, 0);
                      } else {
                        data.checked = false;
                        AutoEstimate.checkQuantity(idx, data.quantity, 1);
                      }

                      AutoEstimate.countPrice();
                    }}
                  >
                    <div active={data.checked}>
                      <img src={pass3} active={data.checked} />
                    </div>
                  </CheckBox>

                  <StlBox style={{ marginRight: 220, paddingRight: 0 }}>
                    {data.fileName}

                    <STLViewer
                      model={data.stl_file} // stl파일 주소
                      width={120} // 가로
                      height={120} // 세로
                      modelColor="gray" // 색
                      backgroundColor="white" // 배경색
                      rotate={true} // 자동회전 유무
                      orbitControls={true} // 마우스 제어 유무
                      cameraX={500}
                    />
                    <Length>{Math.round(data.x_length) + " x " + Math.round(data.y_length) + " x " + Math.round(data.z_length) + " mm"}</Length>
                  </StlBox>
                  <ColumnBox>
                    <ManufactureBox>
                      <Select
                        styles={customStyles}
                        value={data.selectedManufacture}
                        options={AutoEstimate.ManufactureOption}
                        getOptionLabel={(option) => option.name}
                        onChange={(e) => {
                          // 공정 선택
                          AutoEstimate.setManufacture(e, idx);
                          // 변경 값에 따라 값 다시 받아오기
                          AutoEstimate.ReloadAutoEstimate(idx);
                        }}
                      />
                    </ManufactureBox>
                  </ColumnBox>
                  <MaterialBox>
                    <Select
                      value={data.selectedMaterial}
                      styles={customStyles}
                      options={data.selectedManufacture.id == 1 ? AutoEstimate.CNCMaterialOption : AutoEstimate.MoldMaterialOption}
                      getOptionLabel={(option) => option.name}
                      onChange={(e) => {
                        AutoEstimate.setMaterial(e, idx);
                        // 변경 값에 따라 값 다시 받아오기
                        AutoEstimate.ReloadAutoEstimate(idx);
                      }}
                    />
                  </MaterialBox>
                  <QuantityBox>
                    <DirectInputBox>
                      <input
                        value={AutoEstimate.fileList[idx].quantity}
                        placeholder="직접 입력하세요"
                        onChange={(e) => {
                          // 숫자 검증을 위해
                          const re = /^[0-9\b]+$/;

                          if (re.test(e.target.value)) {
                            AutoEstimate.countQuantity(idx, e.target.value);
                          } else {
                            e.target.value = "";
                            AutoEstimate.countQuantity(idx, e.target.value);
                          }
                        }}
                      />
                    </DirectInputBox>
                  </QuantityBox>
                </MainBox>

                {/* 가격 표시 */}
                <div style={{ textAlign: "right" }}>
                  <TailBox style={{ float: "right", display: "inline-block" }}>
                    <div>
                      <span>
                        {/* 금형인 경우(id = 2), 금속가공인 경우(id = 1)*/}
                        {data.selectedManufacture.id === 2 ? (
                          <>
                            <div>
                              <span>금형비 </span>
                              <span>
                                {/* 1000의 자리까지 반올림 */}
                                {(Math.round(data.moldPrice / 1000) * 1000).toLocaleString("ko-KR") + " 원"}
                              </span>
                              <span> + </span>
                              <span>사출비 </span>
                              <span>
                                {/* 1의 자리까지 반올림 */}
                                {(Math.round(data.injectionPrice) * data.quantity).toLocaleString("ko-KR") + " 원"}
                              </span>
                            </div>

                            <div>
                              <span>가격 </span>
                              <span style={{ marginRight: 20 }}>
                                {(Math.round(data.moldPrice / 1000) * 1000 + Math.round(data.injectionPrice) * data.quantity).toLocaleString("ko-KR") + " 원"}
                              </span>
                              <span>예상 납기일 </span>
                              <span>{data.period + " 영업일"}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <span>가격 </span>
                            <span style={{ marginRight: 20 }}>
                              {/* 1000의 자리까지 반올림 */}
                              {(Math.round(data.price / 1000) * 1000 * data.quantity).toLocaleString("ko-KR") + " 원"}
                            </span>
                            <span>예상 납기일 </span>
                            <span>{data.period + " 영업일"}</span>
                          </>
                        )}
                      </span>
                    </div>
                  </TailBox>
                </div>
                <DeleteBox>
                  <span onClick={() => 
                    {
                      AutoEstimate.fileList.splice(idx, 1)
                      AutoEstimate.countPrice()
                    }}>
                    <img src={deleteButtonImg} />
                  </span>
                </DeleteBox>
              </ItemBox>
            ))}
          </ItemList>

          <NoticeBox checkFileUpload={AutoEstimate.checkFileUpload}>
            {/* 전체 삭제 */}
            <EntireDelete
              onClick={() => {
                // 모두 초기화
                AutoEstimate.fileList = [];
                AutoEstimate.checkFileUpload = false;
              }}
            >
              <span>전체 삭제</span>
            </EntireDelete>
            <div>* 금형사출의 경우 최소수량 100개 이상만 가능합니다.</div>
          </NoticeBox>

          {/* 파일 업로드 창 */}
          <ContentBox checkFileUpload={AutoEstimate.checkFileUpload}>
            <this.MyDropzone />
          </ContentBox>
          {/* 자동 견적 소개 창*/}

          {!AutoEstimate.checkFileUpload && (
            <>
              <Banner2 />
              <Banner3 />
              <Banner4 />
              <Banner5 />
            </>
          )}

          {/* 도면이 업로드된 상태면 견적 카드 보여주기 */}
          {AutoEstimate.checkFileUpload && (
            <>
              <Price style={{width: "90%", marginLeft : "5%", marginRight : "5%"}} checkFileUpload={AutoEstimate.checkFileUpload}>
                <PriceLabel active={checkBox_one}>
                  <div>
                    <span>자동 견적 가격 (예상 납기일)</span>
                    <span
                      onMouseOver={() => {
                        this.setIsShown(true, 1);
                        console.log("mouse-enter");
                      }}
                      onMouseOut={() => {
                        this.setIsShown(false, 1);
                        console.log("mouse-out");
                      }}
                    >
                      ?
                    </span>
                  </div>
                  <div>
                    <p>해당 사항은 볼트앤너트 AI 알고리즘이 도출한 견적으로</p>
                    <p>가공품의 발주 요건에 따라 변경될 수 있습니다.</p>
                    <p>본 견적은 후처리를 제외한 순수 단품 가공 견적입니다.</p>
                  </div>
                </PriceLabel>
                <PriceData>
                  <span>
                    {(Math.round(AutoEstimate.totalPrice / 1000) * 1000).toLocaleString("ko-KR")}
                    <span> 원( VAT 미포함,</span>
                  </span>
                  <span>
                    {AutoEstimate.totalPeriod}
                    <span> 영업일)</span>
                  </span>
                </PriceData>
              </Price>

              {/* 파일 업로드 창 */}
              <HeaderBox>
                <Header>{AutoEstimate.checkFileUpload && "도면(DWG) 및 관련 파일 : 상세 발주사항이 포함된 자료"}</Header>
                {AutoEstimate.request_file_set.map((item, idx) => {
                  return (
                    <>
                      <AddFileList>
                        <span
                          onClick={() => {
                            if (AutoEstimate.request_file_set.length > 0) {
                              AutoEstimate.request_file_set.splice(idx, 1);
                            }
                          }}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <span>
                            <img
                              src={clip}
                              style={{
                                marginLeft: 17,
                                marginRight: 17,
                              }}
                            ></img>
                            <span>{item.name}</span>
                            <DeleteFile
                              onClick={() => AutoEstimate.delete_File(idx)}
                              src={deleteButtonImg}
                              style={{
                                marginLeft: 17,
                              }}
                            />
                          </span>
                        </span>
                      </AddFileList>
                    </>
                  );
                })}
              </HeaderBox>
              <ContentBox checkFileUpload={AutoEstimate.checkFileUpload}>
                <this.DWGDropzone />
              </ContentBox>
              {/* 자동 견적 소개 창*/}

              <Button
                onClick={() => {
                  // 도면 및 발주요청 파일 저장
                  AutoEstimate.create_dwg();
                  Router.push("/payment");
                }}
              >
                결제하기
              </Button>
            </>
          )}
        </Container>
        }

        {/* 모바일 */}
        {width < 768 &&
        <Container style={{width : "90%", marginLeft : "5%", marginRight : "5%"}}>
        <MobileBanner0 />
        {/* 자동 견적 헤더 */}
        <HeaderBox style={{width : "95%"}}>
          <Header style={{ fontSize : 18}}>{AutoEstimate.checkFileUpload ? "도면 추가" : "도면 파일을 업로드 해주세요."}</Header>
        </HeaderBox>

        {/* 자동 견적 창 */}
        <ItemList checkFileUpload={AutoEstimate.checkFileUpload}>
          {AutoEstimate.fileList.map((data, idx) => (
            <ItemBox>
              <MainBox>
                <CheckBox
                  active={data.checked}
                  onClick={() => {
                    if (!data.checked) {
                      data.checked = true;
                      AutoEstimate.checkQuantity(idx, data.quantity, 0);
                    } else {
                      data.checked = false;
                      AutoEstimate.checkQuantity(idx, data.quantity, 1);
                    }

                    AutoEstimate.countPrice();
                  }}
                >
                  <div active={data.checked}>
                    <img src={pass3} active={data.checked} />
                  </div>
                </CheckBox>

                <StlBox style={{ marginRight: 50, paddingRight: 0 }}>
                  {data.fileName}

                  <STLViewer
                    model={data.stl_file} // stl파일 주소
                    width={120} // 가로
                    height={120} // 세로
                    modelColor="gray" // 색
                    backgroundColor="white" // 배경색
                    rotate={true} // 자동회전 유무
                    orbitControls={true} // 마우스 제어 유무
                    cameraX={500}
                  />
                  <Length>{Math.round(data.x_length) + " x " + Math.round(data.y_length) + " x " + Math.round(data.z_length) + " mm"}</Length>
                </StlBox>

                <div style={{display : "block"}}>
                <div style={{marginBottom : 20}}>가공방법</div>
                <ColumnBox>
                  <ManufactureBox>
                    <Select
                      styles={customStyles}
                      value={data.selectedManufacture}
                      options={AutoEstimate.ManufactureOption}
                      getOptionLabel={(option) => option.name}
                      onChange={(e) => {
                        // 공정 선택
                        AutoEstimate.setManufacture(e, idx);
                        // 변경 값에 따라 값 다시 받아오기
                        AutoEstimate.ReloadAutoEstimate(idx);
                      }}
                    />
                  </ManufactureBox>
                </ColumnBox>
                <div style={{marginBottom : 20, marginTop : 20}}>소재</div>
                <MaterialBox>
                  <Select
                    value={data.selectedMaterial}
                    styles={customStyles}
                    options={data.selectedManufacture.id == 1 ? AutoEstimate.CNCMaterialOption : AutoEstimate.MoldMaterialOption}
                    getOptionLabel={(option) => option.name}
                    onChange={(e) => {
                      AutoEstimate.setMaterial(e, idx);
                      // 변경 값에 따라 값 다시 받아오기
                      AutoEstimate.ReloadAutoEstimate(idx);
                    }}
                  />
                </MaterialBox>
                <div style={{marginBottom : 20, marginTop : 20}}>주문 개수</div>
                <QuantityBox>
                  <DirectInputBox>
                    <input
                      value={AutoEstimate.fileList[idx].quantity}
                      placeholder="직접 입력하세요"
                      onChange={(e) => {
                        // 숫자 검증을 위해
                        const re = /^[0-9\b]+$/;

                        if (re.test(e.target.value)) {
                          AutoEstimate.countQuantity(idx, e.target.value);
                        } else {
                          e.target.value = "";
                          AutoEstimate.countQuantity(idx, e.target.value);
                        }
                      }}
                    />
                  </DirectInputBox>
                </QuantityBox>
                </div>
              </MainBox>

              {/* 가격 표시 */}
              <div style={{ textAlign: "right" }}>
                <TailBox style={{ float: "right", display: "inline-block" }}>
                  <div>
                    <span>
                      {/* 금형인 경우(id = 2), 금속가공인 경우(id = 1)*/}
                      {data.selectedManufacture.id === 2 ? (
                        <>
                          <div>
                            <span>금형비 </span>
                            <span>
                              {/* 1000의 자리까지 반올림 */}
                              {(Math.round(data.moldPrice / 1000) * 1000).toLocaleString("ko-KR") + " 원"}
                            </span>
                            <span> + </span>
                            <span>사출비 </span>
                            <span>
                              {/* 1의 자리까지 반올림 */}
                              {(Math.round(data.injectionPrice) * data.quantity).toLocaleString("ko-KR") + " 원"}
                            </span>
                          </div>

                          <div>
                            <span>가격 </span>
                            <span style={{ marginRight: 20 }}>
                              {(Math.round(data.moldPrice / 1000) * 1000 + Math.round(data.injectionPrice) * data.quantity).toLocaleString("ko-KR") + " 원"}
                            </span>
                            <span>예상 납기일 </span>
                            <span>{data.period + " 영업일"}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <span>가격 </span>
                          <span style={{ marginRight: 20 }}>
                            {/* 1000의 자리까지 반올림 */}
                            {(Math.round(data.price / 1000) * 1000 * data.quantity).toLocaleString("ko-KR") + " 원"}
                          </span>
                          <span>예상 납기일 </span>
                          <span>{data.period + " 영업일"}</span>
                        </>
                      )}
                    </span>
                  </div>
                </TailBox>
              </div>
              <DeleteBox>
                <span onClick={() => AutoEstimate.fileList.splice(idx, 1)}>
                  <img src={deleteButtonImg} />
                </span>
              </DeleteBox>
            </ItemBox>
          ))}
        </ItemList>

        <NoticeBox checkFileUpload={AutoEstimate.checkFileUpload}>
          {/* 전체 삭제 */}
          <EntireDelete
            onClick={() => {
              // 모두 초기화
              AutoEstimate.fileList = [];
              AutoEstimate.checkFileUpload = false;
            }}
          >
            <span>전체 삭제</span>
          </EntireDelete>
          <div>* 금형/사출 최소 수량 : 100개</div>
        </NoticeBox>

        {/* 파일 업로드 창 */}
        <ContentBox style={{width : "90%"}} checkFileUpload={AutoEstimate.checkFileUpload}>
          <this.MobileDropzone/>
        </ContentBox>
        {/* 자동 견적 소개 창*/}

        {!AutoEstimate.checkFileUpload && (
          <>
            <MobileBanner2 />
            <MobileBanner3 />
            <MobileBanner4 />
            <MobileBanner5 />
          </>
        )}

        {/* 도면이 업로드된 상태면 견적 카드 보여주기 */}
        {AutoEstimate.checkFileUpload && (
          <>
            <Price checkFileUpload={AutoEstimate.checkFileUpload}>
              <PriceLabel active={checkBox_one}>
                <div>
                  <span>자동 견적 가격 (예상 납기일)</span>
                  <span
                    onMouseOver={() => {
                      this.setIsShown(true, 1);
                      console.log("mouse-enter");
                    }}
                    onMouseOut={() => {
                      this.setIsShown(false, 1);
                      console.log("mouse-out");
                    }}
                  >
                    ?
                  </span>
                </div>
                <div>
                  <p>해당 사항은 볼트앤너트 AI 알고리즘이 도출한 견적으로</p>
                  <p>가공품의 발주 요건에 따라 변경될 수 있습니다.</p>
                  <p>본 견적은 후처리를 제외한 순수 단품 가공 견적입니다.</p>
                </div>
              </PriceLabel>
              <PriceData>
                <span>
                  {(Math.round(AutoEstimate.totalPrice / 1000) * 1000).toLocaleString("ko-KR")}
                  <span> 원( VAT 미포함,</span>
                </span>
                <span>
                  {AutoEstimate.totalPeriod}
                  <span> 영업일)</span>
                </span>
              </PriceData>
            </Price>

            {/* 파일 업로드 창 */}
            <HeaderBox style={{marginLeft : "5%", marginRight : "5%"}}>
              <Header style={{fontSize : 24}}>{AutoEstimate.checkFileUpload && "도면(DWG) 및 관련 파일 : 상세 발주사항이 포함된 자료"}</Header>
              {AutoEstimate.request_file_set.map((item, idx) => {
                return (
                  <>
                    <AddFileList>
                      <span
                        onClick={() => {
                          if (AutoEstimate.request_file_set.length > 0) {
                            AutoEstimate.request_file_set.splice(idx, 1);
                          }
                        }}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <span>
                          <img
                            src={clip}
                            style={{
                              marginLeft: 17,
                              marginRight: 17,
                            }}
                          ></img>
                          <span>{item.name}</span>
                          <DeleteFile
                            onClick={() => AutoEstimate.delete_File(idx)}
                            src={deleteButtonImg}
                            style={{
                              marginLeft: 17,
                            }}
                          />
                        </span>
                      </span>
                    </AddFileList>
                  </>
                );
              })}
            </HeaderBox>
            <ContentBox  style={{width : "90%", marginLeft : "5%", marginRight : "5%"}} checkFileUpload={AutoEstimate.checkFileUpload}>
              <this.DWGDropzone />
            </ContentBox>
            {/* 자동 견적 소개 창*/}

            <Button
              onClick={() => {
                // 도면 및 발주요청 파일 저장
                AutoEstimate.create_dwg();
                Router.push("/payment");
              }}
            >
              결제하기
            </Button>
          </>
        )}
      </Container>
      }
      </>
    );
  }
}

export default AutoestimateContainer;

const quantityAry = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
  { label: "7", value: 7 },
  { label: "8", value: 8 },
  { label: "9", value: 9 },
  { label: "직접 입력", value: "" },
];

const Select = styled(SelectComponent)`
  width: ${(props) => (props.width ? props.width : "180px")};
  display: ${(props) => (props.quantity === "직접 입력" ? "none" : "block")};
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
  ${(props) =>
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
  ${(props) =>
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
  width: 1200px;
  height: 100%;
  padding-left: 3px;
  margin-left: auto;
  margin-right: auto;
  //padding-top: ${(props) => (props.checkFileUpload ? "215px" : "0")};
  //padding-top: ${(props) => (props.checkBannerHeight && props.checkFileUpload ? "215px" : "0")};
  padding-top: ${(props) => (props.checkBannerHeight && props.checkFileUpload ? "250px" : "0")};
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
}
  `;

const ItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1204px;
  height: 219px;
  position: relative;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
  margin-bottom: 40px;
  padding: 28px 44px 26px 15px;
  box-sizing: border-box;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    height: 100%;
}
`;

const StlBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  margin-right: 30px;
  padding-right: 50px;
  box-sizing: border-box;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 200px;
}
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
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  height: 92px;
  //border: 3px solid red;
  display: ${(props) => (props.checkFileUpload ? "flex" : "none")};
  position: relative;
  align-items: center;
  padding-bottom: 40px;
  box-sizing: border-box;
  > div:last-child {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 90%;
}
`;
const EntireDelete = styled.div`
  cursor: pointer;
  height: 40px;
  border: 1px solid #999999;
  border-radius: 3px;
  padding: 7px 12px 6px 12px;
  box-sizing: border-box;
  margin-right: 16px;
  > span {
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.45px;
    color: #999999;
  }
`;

const HeaderBox = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`;

const ContentBox = styled.div`
  width: 1200px;
  height: ${(props) => (props.checkFileUpload ? "100px" : "313px")};
  display: flex;
  flex-direction: column;
  border: 2px dashed #a4aab4;
  border-radius: 5px;
  background-color: #f6f6f6;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${(props) => (props.checkFileUpload ? "0" : "66px")};
  :focus {
    outline: none;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 90%;
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
  //top: ${(props) => (props.checkSelectBig === "금형사출" ? "70%" : "80%")}
  left: 32%;
  > div {
    > span {
      > div:nth-of-type(1) {
        margin-bottom: 6px;
      }
      > div:last-child {
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
          font-weight: 500;
        }
      }
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

const FileAddBox = styled.div`
  position: absolute;
  top: 7%;
  left: 94%;
`;

const DeleteBox = styled.div`
  cursor: pointer;
  position: absolute;
  top: 8%;
  left: 97%;
  @media (min-width: 0px) and (max-width: 767.98px) {
    left: 95%;
}
`;

const InputBox = styled.div`
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

const Card = styled.div`
  width: 1210px;
  height: ${(props) => (props.checkFileUpload ? "210px" : "100px")};
  object-fit: contain;
  background-color: white;
  //margin: 60px 0px 20px 0;
  margin: 30px 0px 20px 0;
  display: flex;
  flex-direction: column;
  //position: ${(props) => (props.checkFileUpload ? "fixed" : "static")};
  position: static;
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
  margin: auto;
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
    background-color: ${(props) => (props.active ? "#0933b3" : "#ffffff")};
    margin-right: 10px;    
    position: relative;
    cursor: pointer;
    border: 1px solid #c6c7cc;
    border-radius: 2px;
    box-sizing: border-box;
    > img{
      display: ${(props) => (props.active ? "static" : "none")};
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
    //line-height: 40px;
    letter-spacing: -0.4px;
    color: #767676;
  }
`;

const TableHeader = styled.div`
  margin-top: 30px;
  align-items: center;
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 1px solid #c6c7cc;
  padding-bottom: 18px;
  display: ${(props) => (props.checkFileUpload ? "flex" : "none")};
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
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  //height: 197px;
  border-top: 3px solid #414550;
  border-bottom: 2px solid #c6c7cc;
  margin-top: 60px;
  margin-bottom: 70px;
  display: ${(props) => (props.checkFileUpload ? "flex" : "none")};
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 90%;
}
`;
const PriceLabel = styled.div`
  height: 76px;
  display: flex;
  flex-direction: column;
  //justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #e1e2e4;
  padding: 20px 0;
  box-sizing: border-box;
  position: relative;
  > div:nth-of-type(1) {
    display: flex;
    align-items: center;
    > span:nth-of-type(1) {
      font-size: 24px;
      line-height: 40px;
      letter-spacing: -0.6px;
      color: #282c36;
      font-weight: bold;
    }
    > span:last-child {
      margin-left: 13px;
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
    display: ${(props) => (props.active ? "block" : "none")};
    width: 448px;
    height: 135px;
    border: 1px solid #707070;
    border-radius: 5px;
    position: absolute;
    background-color: #ffffff;
    top: 75px;
    right: 8%;
    padding: 20px 10px 20px 30px;
    box-sizing: border-box;
    > p {
      font-size: 18px;
      line-height: 34px;
      letter-spacing: -0.45px;
      color: #999999;
    }
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
    color: #0933b3;
    font-weight: bold;
    margin-right: 22px;
  }
  > span:last-child {
    color: #0933b3;
    font-weight: bold;
  }
`;

const Button = styled(Buttonv1)`
  margin: 83px auto 230px auto;
  width: 158px !important;
  height: 44px !important;
  font-size: 16px;
  font-family: NotoSansCJKkr !important;
  line-height: 1.5;
  letter-spacing: -0.4px;
  margin-top: 22px;
  margin-bottom: 66px;
  z-index: 2;
  :hover {
    background-color: #174aee;
  }
`;

const Projectbox = styled.div`
  display: ${(props) => (props.checkFileUpload ? "block" : "none")};
`;
const Purposebox = styled.div`
  display: ${(props) => (props.checkFileUpload ? "block" : "none")};
  margin-bottom: 70px;
`;
const SelectBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const InlineDiv = styled.div`
  display: inline-flex;
`;
const PurposeSelectCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 44px;
  border-radius: 30px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: ${(props) => (props.active ? "#0933b3" : "#ffffff")};
  cursor: pointer;
  margin-right: 30px;
`;
const PurposeFont18 = styled.div`
  font-weight: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
  color: ${(props) => (props.active ? "#ffffff" : "#414550")};
`;

const Label = styled.div`
  //display: ${(props) => (props.checkFileUpload ? "block" : "none")};
  margin-bottom: 16px;
  > span {
    font-size: 24px;
    line-height: 40px;
    letter-spacing: -0.6px;
    color: #282c36;
    font-weight: bold;
    margin-right: 12px;
  }
  > p {
    vertical-align: middle;
    display: inline-block;
    font-size: 18px;
    line-height: 40px;
    letter-spacing: -0.45px;
    color: #86888c;
  }
`;
const ProjectTitle = styled.div`
  height: 55px;
  border: 1px solid #e1e2e4;
  border-radius: 5px;
  padding: 14px 14px;
  box-sizing: border-box;
  //margin-top: 16px;
  margin-bottom: 10px;
  > input {
    width: 100%;
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

const DeliveryBox = styled.div`
  display: ${(props) => (props.checkFileUpload ? "block" : "none")};
  margin-top: 70px;
  margin-bottom: 40px;
  // > div:nth-of-type(1) {
  //   height: 27px;
  //   font-size: 18px;
  //   line-height: 40px;
  //   letter-spacing: -0.45px;
  //   color: #282c36;
  //   font-weight: bold;
  //   margin-bottom: 16px;
  // }
`;
const DeliveryDate = styled.div`
  width: 1200px;
  display: ${(props) => (props.checkFileUpload ? "static" : "none")};
  background-color: #f6f6f6;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 26px 24px 22px 24px;
  box-sizing: border-box;
  > div:nth-of-type(1) {
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
        //display: ${(props) => (props.checkCalendar ? "block" : "none")};
        //display: block;
      }
    }
    > div:nth-of-type(2) {
      margin: 0 30px;
      > div {
        background-color: ${(props) => (props.checkDateConference ? "#0933b3" : "#999999")};
        //background-color: #999999;
        > img {
          //display: ${(props) => (props.checkDateConference ? "block" : "none")};
          // display: none;
        }
      }
    }
    > div:nth-of-type(3) {
      > div {
        background-color: ${(props) => (props.checkDateUndefined ? "#0933b3" : "#999999")};
        //background-color: #999999;
        > img {
          //display: ${(props) => (props.checkDateUndefined ? "block" : "none")};
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
  
`;
const RequestBox = styled.div`
  display: ${(props) => (props.checkFileUpload ? "block" : "none")};
`;
const Request = styled.div`
  width: 1200px;
  // display: ${(props) => (props.checkFileUpload ? "static" : "none")};
  background-color: #f6f6f6;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 0 24px 30px 24px;
  box-sizing: border-box;
  margin-bottom: 40px;
  margin-top: 16px;
  position: relative;
  > div {
    margin-top: 24px;
    margin-bottom: 12px;
    > span:nth-of-type(1) {
      height: 27px;
      font-size: 18px;
      line-height: 40px;
      letter-spacing: -0.45px;
      color: #282c36;
      font-weight: 500;
      margin-bottom: 16px;
      margin-right: 7px;
    }
    // > span:last-child {
    //   width: 20px;
    //   height: 20px;
    //   border: 1px solid #000000;
    //   border-radius: 10px;
    //   display: inline-block;
    //   text-align: center;
    //   font-size: 16px;
    //   letter-spacing: -0.4px;
    //   color: #414550;
    //   font-weight: bold;
    //   box-sizing: border-box;
    // }
  }
  // > div:nth-of-type(2) {
  //   display: ${(props) => (props.active ? "block" : "none")};
  //   width: 600px;
  //   height: 180px;
  //   // border: 3px solid green;
  //   position: absolute;
  //   top: 44%;
  //   left: 17%;
  //   background-color: #ffffff;
  //   z-index: 1;
  //   padding: 20px 10px 20px 30px;
  //   box-sizing: border-box;
  //   > p {
  //     color: #767676;
  //     line-height: 34px;
  //     letter-spacing: -0.45px;
  //     font-size: 18px;
  //   }
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

const PrivateRequest = styled.div`
  width: 1200px;
  display: ${(props) => (props.checkFileUpload ? "static" : "none")};
  background-color: #f6f6f6;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 0 24px 30px 24px;
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
const ReferenceBox = styled.div`
  display: ${(props) => (props.checkFileUpload ? "static" : "none")};
`;
const Reference = styled.div`
  width: 1200px;
  background-color: #f6f6f6;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 0 24px 22px 24px;
  box-sizing: border-box;
  > div {
    height: 27px;
    margin-top: 26px;
    margin-bottom: 16px;
    box-sizing: border-box;
    > span {
      font-size: 18px;
      line-height: 40px;
      letter-spacing: -0.45px;
      color: #282c36;
      font-weight: bold;
      margin-right: 10px;
    }
    > p {
      display: inline-block;
      font-size: 16px;
      line-height: 40px;
      letter-spacing: -0.4px;
      color: #86888c;
    }
  }
  // > div:nth-of-type(even) {
  //   border: 1px solid #ffffff;
  //   background-color: #ffffff;
  //   position: relative;
  // }
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

const Font20 = styled(Title.FontSize20)`
  color: #0933b3;
  text-align: right;
  font-weight: normal;
`;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.5);
  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const AddFileList = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  object-fit: contain;
  border-radius: 3px;
  border: solid 1px #c6c7cc;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  letter-spacing: -0.4px;
  text-align: left;
  color: #1e2222;
  margin-bottom: 8px;
`;

const DeleteFile = styled.img`
  width: 18px;
  height: 18px;
  padding: 2px;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 9px;
  background-color: #e1e2e4;
  align-self: center;
  line-height: 40px;
  letter-spacing: -0.45px;
  margin-right: 29px;
  vertical-align: middle;
  cursor: pointer;
`;
