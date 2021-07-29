import React, { Component, useCallback } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import * as Title from "components/Title";

import SelectComponent from "components/Select";
import ManufactureProcess from "stores/Manufacture/ManufactureProcess";
import InputComponent from "AddFile2";
import CheckBoxComponent from "components/CheckBox";
import Buttonv1 from "components/Buttonv1";

import Calendar from "./Calendar2";

import Modal from "LoadingModal";

const pass3 = "static/images/pass3.png";
const reqeustlogo = "./static/images/request/request_logo.svg";
const starred = "./static/images/request/star_red.svg";
const down_arrow = "./static/images/request/down_arrow.svg";
const help_face = "./static/images/request/help_face.svg";
const checkbox = "./static/images/request/checkbox.svg";
const circlecheck = "./static/images/request/circlecheck.svg";
const circlecheckblue = "./static/images/request/circlecheck_blue.svg";

@inject("Request", "Auth", "Schedule", "ManufactureProcess")
@observer
class PartnerDirectRequest extends Component {
  state = {
    purposeAry: [
      { id: 1, name: "상담요청", checked: false },
      { id: 2, name: "견적문의", checked: false },
      { id: 3, name: "업체수배", checked: false },
    ],
    securityCheck1: false,
    securityCheck2: false,
  };

  activeHandler = (flag) => {
    if (flag == "check1") {
      if (this.state.securityCheck1) {
        this.setState({ securityCheck1: false });
      } else {
        this.setState({ securityCheck1: true });
      }
    }
    if (flag == "check2") {
      if (this.state.securityCheck2) {
        this.setState({ securityCheck2: false });
      } else {
        this.setState({ securityCheck2: true });
      }
    }
  };
  render() {
    const { ManufactureProcess } = this.props;
    const openPlaceHolderText = `모두에게 공개될 수 있는 내용을 입력해주세요.
    다음 사항이 명확하게 작성되어야 정확한 견적을 받을 가능성이 높습니다.
    1. 가공품 목적 및 사용 환경
    2. 가공 부품별 특이 사항
    3. 공급처가 충족해야하는 발주 조건
    `;

    const privatePlaceholderText = `회사의 세부적인 기술과 관련하여 외부로 유출되지 않아야 할 내용을 입력해주세요.`;

    return (
      <>
        <Container>
          <RequestHeader>
            <img src={reqeustlogo} style={{ widht: 45, height: 45 }}></img>
            <RequestTitle>
              <span style={{ color: "#0933b3" }}>프로젝트 정보</span>를
              입력해주세요.
            </RequestTitle>
          </RequestHeader>
          <Body>
            <Requestontent>
              <RequestContentBox>
                <ContentTitle>
                  <span>문의 목적</span>
                  <img src={starred} style={{ marginLeft: 4 }}></img>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: "normal",
                      color: "#86888c",
                      marginLeft: 12,
                    }}
                  >
                    (중복 선택 가능)
                  </span>
                </ContentTitle>
                <SelectBox style={{ width: "555px", marginTop: "16px" }}>
                  <InlineDiv style={{ alignItems: "flex-end" }}>
                    {this.state.purposeAry.map((item, idx) => {
                      return (
                        <PurposeSelectCircle
                          active={item.checked}
                          onClick={() => {
                            // ManufactureProcess.purposeHandler(item);
                            console.log(idx);
                          }}
                        >
                          <PurposeFont18 active={item.checked}>
                            {item.name}
                          </PurposeFont18>
                        </PurposeSelectCircle>
                      );
                    })}
                  </InlineDiv>
                </SelectBox>
              </RequestContentBox>
              <RequestContentBox>
                <ContentTitle>
                  <div>프로젝트 제목</div>
                  <img src={starred} style={{ marginLeft: 4 }}></img>
                </ContentTitle>
                <InputComponent
                  class="Input"
                  placeholder="진행하는 프로젝트 제목을 입력해주세요. ex) 반려동물 샤워기"
                  onFocus={(e) => (e.target.placeholder = "")}
                  value={this.state.projectname}
                  onChange={(e) => {
                    console.log(e);
                    this.setState({ projectname: e });
                  }}
                  style={{
                    width: "100%",
                    height: 42,
                    border: "solid 1px #c6c7cc",
                    borderRadius: 3,
                  }}
                />
              </RequestContentBox>
              <RequestContentBox>
                <ContentTitle>
                  <div>희망 예산</div>
                </ContentTitle>
                <Budget>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      color: "#414550",
                    }}
                  >
                    <BudgetBox>
                      <span style={{ marginLeft: 16 }}>0</span>
                      <img src={down_arrow} style={{ marginRight: 12 }}></img>
                    </BudgetBox>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 16,
                      }}
                    >
                      ~
                    </span>
                    <BudgetBox style={{ marginLeft: 16 }}>
                      <span style={{ marginLeft: 16 }}>0</span>
                      <img src={down_arrow} style={{ marginRight: 12 }}></img>
                    </BudgetBox>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 16,
                      }}
                    >
                      원
                    </span>
                  </div>
                  <CheckBoxComponent onChange={this.toggleCheckBox}>
                    <span
                      style={{
                        color: "#1e2222",
                        fontSize: 16,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      프로젝트 예산 조율이 가능합니다.
                    </span>
                  </CheckBoxComponent>
                  <BudgetHelp>
                    <span>예산 측정이 어려우신가요?</span>
                  </BudgetHelp>
                </Budget>
              </RequestContentBox>
              <RequestContentBox>
                <ContentTitle style={{ marginBottom: 8 }}>
                  <span>희망 납기일</span>
                </ContentTitle>
                <span
                  style={{
                    fontSize: 16,
                    color: "#505050",
                  }}
                >
                  프로젝트 제품분야에 해당하는 항목들을 선택해주세요.
                </span>

                <Calendar />
                <CheckBoxComponent onChange={this.toggleCheckBox}>
                  <span
                    style={{
                      color: "#1e2222",
                      fontSize: 16,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    납기일 협의가 가능합니다.
                  </span>
                </CheckBoxComponent>
              </RequestContentBox>
              <RequestContentBox>
                <ContentTitle style={{ marginBottom: 8 }}>
                  <span>프로젝트 내용</span>
                  <img src={starred}></img>
                </ContentTitle>
                <span
                  style={{
                    fontSize: 16,
                    color: "#505050",
                    letterSpacing: "-0.4px",
                  }}
                >
                  - 프로젝트 내용을 상세히 작성할수록 더 적합한 파트너를 만날 수
                  있습니다.
                </span>
                <Help>
                  <img src={help_face}></img>
                </Help>
                <InputComponent
                  class="Input"
                  onFocus={(e) => (e.target.placeholder = "")}
                  value={this.state.projectname}
                  onChange={(e) => {
                    console.log(e);
                    this.setState({ projectname: e });
                  }}
                  style={{
                    width: "100%",
                    height: "433px",
                    border: "solid 1px #c6c7cc",
                    borderRadius: 3,
                  }}
                />
              </RequestContentBox>
            </Requestontent>
            <RequestContentBox>
              <ContentTitle style={{ marginBottom: 4 }}>
                <span>프로젝트 관련 파일</span>
                <span
                  style={{
                    marginLeft: 12,
                    fontSize: 14,
                    lineHeight: 2.43,
                    letterSpacing: -0.35,
                    color: "#e53c38",
                    fontWeight: "normal",
                  }}
                >
                  (비공개)
                </span>
              </ContentTitle>
              <span
                style={{
                  fontSize: 16,
                  color: "#505050",
                }}
              >
                - 관련 파일은 모두 비공개로 올라갑니다. 보안상 공개로 올리지
                못했던 내용을 파일을 올려주세요.{" "}
              </span>
              <InputComponent file={true} isOpen={true} />
            </RequestContentBox>
            <RequestContentBox>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 32,
                  fontWeight: 500,
                  letterSpacing: -0.8,
                  color: "#1e2222",
                }}
              >
                <span style={{ color: "#0933b3" }}>도면 파일</span>을 업로드
                해주세요.
              </span>
              <ContentTitle>
                <span>도면 파일</span>
                <span
                  style={{
                    marginLeft: 20,
                    fontSize: 14,
                    lineHeight: 2.43,
                    letterSpacing: -0.35,
                    color: "#c7c7c7",
                    fontWeight: "normal",
                  }}
                >
                  이미지 혹은 PDF 자료만 업로드가 가능합니다.
                </span>
              </ContentTitle>
              <InputComponent file={true} isOpen={true} />
              <ContentTitle>
                <span>도면 보안 설정</span>
              </ContentTitle>
              <Security>
                <SecurityBox
                  active={this.state.securityCheck1}
                  onClick={() => {
                    this.activeHandler("check1");
                  }}
                >
                  <img
                    src={
                      this.state.securityCheck1 ? circlecheck : circlecheckblue
                    }
                    style={{ width: 17, height: 17 }}
                  ></img>
                  <span>모든 파트너가 도면 보기 가능</span>
                  <span>
                    모든 파트너가 도면을 볼 수 있으며
                    <br />
                    가장 정확한 견적을 받을 수 있습니다.
                  </span>
                </SecurityBox>
                <SecurityBox
                  active={this.state.securityCheck2}
                  onClick={() => {
                    this.activeHandler("check2");
                  }}
                >
                  <img
                    src={
                      this.state.securityCheck2 ? circlecheck : circlecheckblue
                    }
                    style={{ width: 17, height: 17 }}
                  ></img>
                  <span>허용된 파트너만 도면 보기</span>
                  <span>
                    채팅이나 견적서 요청에서
                    <br />
                    도면 보기 권한을 부여할 수 있습니다.
                  </span>
                </SecurityBox>
              </Security>
              <RequestBtn>
                <RequestBotton>의뢰 요청하기</RequestBotton>
              </RequestBtn>
            </RequestContentBox>
          </Body>
        </Container>
      </>
    );
  }
}

export default PartnerDirectRequest;

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
  width: 100%;
  height: 16px;
  padding-top: ${(props) =>
    props.checkBannerHeight && props.checkFileUpload ? "250px" : "0"};
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
`;

const StlBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  margin-right: 30px;
  padding-right: 50px;
  box-sizing: border-box;
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
  width: 100%;
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
`;
const EntireDelete = styled.div`
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

const ContentBox = styled.div`
  width: 100%;
  height: ${(props) => (props.checkFileUpload ? "100px" : "")};
  display: flex;
  flex-direction: column;
  border: 2px dashed #a4aab4;
  border-radius: 5px;
  background-color: #f6f6f6;
  margin-left: 1px;
  margin-bottom: ${(props) => (props.checkFileUpload ? "0" : "66px")};
  :focus {
    outline: none;
  }
`;
const NoFileButton = styled.div`
  width: 100%;
  margin-bottom: ${(props) => (props.checkFileUpload ? "0" : "411px")};
  text-align: center;
  display: ${(props) => (props.checkFileUpload ? "none" : "flex")};
  flex-direction: ${(props) => (props.checkFileUpload ? "" : "column")};
  align-items: ${(props) => (props.checkFileUpload ? "" : "center")};
  > div:nth-of-type(1) {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    margin-bottom: 14px;
  }
  > div:nth-of-type(2) {
    border: 1px solid #a4aab4;
    border-radius: 60px;
    width: 268px;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    > span:nth-of-type(1) {
      font-size: 18px;
      line-height: 40px;
      letter-spacing: -0.45px;
      color: #0933b3;
      margin-right: 11px;
    }
    > span:nth-of-type(2) {
      // position: relative;
      > img {
        vertical-align: middle;
        color: #414550;
        // position: absolute;
        // top: 15%;
      }
    }
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
  position: absolute;
  top: 8%;
  left: 97%;
`;

const InputBox = styled.div`
  height: 236px !important;
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
  display: flex;
  flex-direction: column;
  //position: ${(props) => (props.checkFileUpload ? "fixed" : "static")};
  position: static;
  top: 0;
  z-index: 99;
  box-sizing: border-box;
`;

const FileUpload = styled.div``;

const Header = styled.div`
  font-family: NotoSansCJKkr;
  font-size: 32px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.06;
  letter-spacing: -0.8px;
  text-align: center;
  color: #1e2222;
  margin-bottom: 70px;
`;

const FileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
    font-size: 15px;
    line-height: 2;
    letter-spacing: -0.38px;
    color: #1e2222;
    margin-bottom: 3px;
    margin-top: 6px;
    span {
      color: #0933b3;
      font-weight: 500;
    }
    :focus {
      outline: none;
    }
  }
  > p:nth-of-type(2) {
    font-size: 14px;
    letter-spacing: -0.4px;
    color: #767676;
  }
`;

const TableHeader = styled.div`
  margin-top: 30px;
  align-items: center;
  width: 100%;
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
  flex-direction: column;
  width: 100%;
  //height: 197px;
  border-top: 3px solid #414550;
  border-bottom: 2px solid #c6c7cc;
  margin-top: 60px;
  margin-bottom: 70px;
  display: ${(props) => (props.checkFileUpload ? "flex" : "none")};
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

const Button = styled.div`
  margin-top: 83px;
  margin-bottom: 230px;
  display: ${(props) => (props.checkFileUpload ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  > div {
    width: 226px;
    height: 61px;
    font-size: 20px;
    line-height: 52px;
    letter-spacing: -0.5px;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    position: relative;
    border: 1px solid #ffffff;
    background-color: #0933b3;
    color: #ffffff;
    > span {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
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
  border: ${(props) => (props.active ? "solid 1px #0933b3" : "")};
  cursor: pointer;
  margin-right: 30px;
`;
const PurposeFont18 = styled.div`
  font-weight: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
  color: ${(props) => (props.active ? "#0933b3" : "#414550")};
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
        background-color: ${(props) =>
          props.checkDateConference ? "#0933b3" : "#999999"};
        //background-color: #999999;
        > img {
          //display: ${(props) =>
            props.checkDateConference ? "block" : "none"};
          // display: none;
        }
      }
    }
    > div:nth-of-type(3) {
      > div {
        background-color: ${(props) =>
          props.checkDateUndefined ? "#0933b3" : "#999999"};
        //background-color: #999999;
        > img {
          //display: ${(props) =>
            props.checkDateUndefined ? "block" : "none"};
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
const Security = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SecurityBox = styled.div`
  width: 384px;
  height: 140px;
  border-radius: 5px;
  border: solid 1px #c6c7cc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const SecuritySetting = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const RequestHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 80px;
  margin-bottom: 70px;
  text-align: center;
  font-family: NotoSansCJKkr;
`;

const RequestTitle = styled.div`
  font-size: 32px;
  font-weight: 500;
  color: #1e2222;
  margin-top: 20px;
`;

const Body = styled.div`
  width: 100%;
  font-family: NotoSansCJKkr;
`;

const Requestontent = styled.div``;

const RequestContentBox = styled.div`
  width: 100%;
  margin-bottom: 74px;
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #1e2222;
  margin-bottom: 16px;
`;

const PurposeBtn = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const RequestButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 42px;
  border-radius: 30px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border: solid 1px #0933b3;
  background-color: #ffffff;
  margin-right: 16px;
  font-size: 16px;
  color: #0933b3;
  letter-spacing: -0.4px;
`;

const Budget = styled.div`
  display: flex;
  flex-direction: column;
`;

const BudgetBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 204px;
  height: 42px;
  border-radius: 3px;
  border: solid 1px #c6c7cc;
  margin-right: 16px;
`;

const BudgetCheckbox = styled.div`
  display: flex;
  justify-contet: flex-start;
  margin-top: 11px;
  font-size: 15px;
  line-height: 2.27;
  letter-spacing: -0.38px;
  color: #505050;
`;

const BudgetHelp = styled.div`
  display: flex;
  justify-content: flex-start;
  algin-items: center;
  font-size: 15px;
  letter-spacing: -0.38px;
  color: #0933b3;
  margin-top: 13px;
`;

const DateCheckbox = styled.div`
  display: flex;
  justify-contet: flex-start;
  margin-top: 12px;
  font-size: 15px;
  color: #505050;
`;

const Help = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 42px;
  border-radius: 3px;
  background-color: #edf4fe;
  margin-top: 16px;
  margin-bottom: 20px;
`;

const RequestBtn = styled.div`
  display: flex;
  justify-content: center;
`;

const RequestBotton = styled(Buttonv1)`
  width: 228px !important;
  height: 48px !important;
  font-size: 18px;
  line-height: 1.89;
  letter-spacing: -0.45px;
`;
