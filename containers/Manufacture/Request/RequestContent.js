import React, { Component, useCallback } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import * as Title from "components/Title";

import SelectComponent from "components/Select";

import CheckBoxComponent from "components/CheckBox";
import Buttonv1 from "components/Buttonv1";

import InputComponent from "components/Input";
import InputComponent2 from "components/Input5";
import ButtonSpinnerComponent from "components/ButtonSpinner";
import Calendar from "./Calendar";

import AddFile from "./AddFile";
import AddDrawingFile from "./AddDrawing";
const pass3 = "static/images/pass3.png";
const reqeustlogo = "./static/images/request/request_logo.svg";
const starred = "./static/images/request/star_red.svg";
const down_arrow = "./static/images/request/down_arrow.svg";
const help_face = "./static/images/request/help_face.svg";
const checkbox = "./static/images/request/checkbox.svg";
const circlecheck = "./static/images/request/circlecheck.svg";
const circlecheckblue = "./static/images/request/circlecheck_blue.svg";
const helpimg = "./static/images/request/help_img.svg";
const fileupload = "./static/images/request/fileupload.svg";

const customStyles = {
  dropdownIndicator: () => ({
    color: "#555555",
    width: 14,
    height: 42,
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
    border: "1px solid #c7c7c7",
    backgroundColor: "#fff",
    display: "flex",
    borderRadius: 3,
    width: 204,
    height: 42,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

@inject("Request", "Auth", "Schedule", "Signup")
@observer
class RequestContent extends Component {
  state = {
    purposeAry: [
      { id: 1, name: "기획에 대한 상담을 받고 싶어요.", checked: false },
      { id: 2, name: "견적을 받고 싶어요.", checked: false },
      { id: 3, name: "전문 업체를 찾고 싶어요.", checked: false },
    ],
    priceAry: [
      { id: 1, name: "100만원 이하" },
      { id: 2, name: "100만원 - 300만원" },
      { id: 3, name: "300만원 - 500만원" },
      { id: 4, name: "500만원 - 1000만원" },
      { id: 5, name: "1000만원 - 2000만원" },
      { id: 6, name: "2000만원 - 3000만원" },
      { id: 7, name: "3000만원 - 5000만원" },
      { id: 8, name: "5000만원 - 1억원" },
      { id: 9, name: "1억원이상" },
    ],
    regionAry: [
      { id: 1, name: "서울" },
      { id: 2, name: "경기도" },
      { id: 3, name: "인천" },
      { id: 4, name: "충청도" },
      { id: 5, name: "경상북도" },
      { id: 6, name: "경상남도" },
      { id: 7, name: "전라도" },
      { id: 8, name: "제주도" },
    ],
    securityCheck1: false,
    securityCheck2: false,
    period_state: false,
    price_state: false,
    region_state: false,
    budget: false,
  };

  async componentDidMount() {
    const { purposeAry } = this.state;
    const { Request } = this.props;
    console.log(purposeAry);
    // request 초기화
    Request.reset();
  }

  activeHandler = (flag) => {
    const { Request } = this.props;
    if (flag == "check1") {
      if (this.state.securityCheck1) {
        this.setState({ securityCheck1: false });
      } else {
        this.setState({ securityCheck1: true, securityCheck2: false });
        // 공개하기
        Request.set_file_secure(1);
      }
    }
    if (flag == "check2") {
      if (this.state.securityCheck2) {
        this.setState({ securityCheck2: false });
      } else {
        this.setState({ securityCheck2: true, securityCheck1: false });
        // 비공개하기
        Request.set_file_secure(2);
      }
    }
    if (flag == "budget") {
      if (this.state.budget) {
        this.setState({ budget: false });
      } else {
        this.setState({ budget: true });
      }
    }
  };

  // 희망 기간 state
  periodCheckBox = () => {
    const { Request } = this.props;
    this.setState({
      ...this.state,
      period_state: !this.state.period_state,
    });
    // 이상하게 비동기 문제 때문에 안맞아서 역순으로 체크해놓음..
    Request.set_period_state(!this.state.period_state);
  };

  // 희망 가격 state
  priceCheckBox = () => {
    const { Request } = this.props;
    this.setState({
      ...this.state,
      price_state: !this.state.price_state,
    });
    // 이상하게 비동기 문제 때문에 안맞아서 역순으로 체크해놓음..
    Request.set_price_state(!this.state.price_state);
  };

  // 희망 지역 state
  regionCheckBox = () => {
    const { Request } = this.props;
    this.setState({
      ...this.state,
      region_state: !this.state.region_state,
    });
    // 이상하게 비동기 문제 때문에 안맞아서 역순으로 체크해놓음..
    if (this.state.region_state == true) {
      Request.set_region_state(0);
    } else {
      Request.set_region_state(1);
    }
  };

  render() {
    const { Request, Auth } = this.props;

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
                </ContentTitle>
                <SelectBox>
                  <InlineDiv>
                    {this.state.purposeAry.map((item, idx) => {
                      return (
                        <PurposeSelectCircle
                          active={item.checked}
                          onClick={() => {
                            console.log(item.checked);
                            Request.set_state(idx);
                            if (!item.checked) {
                              item.checked = true;
                            } else {
                              item.checked = false;
                            }
                            this.setState({ f: 3 });
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
                <ContentInput>
                  <InputComponent
                    class="Input"
                    // placeholder="진행하는 프로젝트 제목을 입력해주세요. ex) 반려동물 샤워기"
                    onFocus={(e) => (e.target.placeholder = "")}
                    onChange={(e) => {
                      Request.set_name(e);
                    }}
                  />
                </ContentInput>
              </RequestContentBox>

              {/* 프로젝트 의뢰에서만 */}
              {Request.request_type == 0 && (
                <RequestContentBox>
                  <ContentTitle style={{ marginBottom: 3 }}>
                    <div>프로젝트 분류</div>
                    <img src={starred} style={{ marginLeft: 4 }}></img>
                    <span
                      style={{
                        fontSize: 14,
                        letterSpacing: -0.35,
                        color: "#86888c",
                        fontWeight: "normal",
                        marginLeft: 12,
                      }}
                    >
                      (중복 선택 가능)
                    </span>
                  </ContentTitle>
                  <span
                    style={{
                      fontSize: 16,
                      color: "#505050",
                      letterSpacing: -0.4,
                      fontWeight: "normal",
                    }}
                  >
                    프로젝트 분류에 해당하는 항목을 선택해주세요.
                  </span>
                  <ProjectFieldCheckbox>
                    <CheckBoxComponent >
                      <span
                        style={{
                          color: "#767676",
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          marginRight: 91,
                        }}
                      >
                        완제품/부품 구매
                      </span>
                    </CheckBoxComponent>
                    <CheckBoxComponent >
                      <span
                        style={{
                          color: "#767676",
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          marginRight: 60,
                        }}
                      >
                        개발/설계 업체
                      </span>
                    </CheckBoxComponent>
                    <CheckBoxComponent >
                      <span
                        style={{
                          color: "#767676",
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          marginRight: 91,
                        }}
                      >
                        제작 가능 업체
                      </span>
                    </CheckBoxComponent>
                  </ProjectFieldCheckbox>
                </RequestContentBox>
              )}

              <RequestContentBox>
                <ContentTitle>
                  <div>희망 예산</div>
                  <img src={starred} style={{ marginLeft: 4 }}></img>
                </ContentTitle>
                <Budget>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      color: "#414550",
                    }}
                  >
                    <SelectComponent
                      styles={customStyles}
                      options={this.state.priceAry}
                      value={Request.request_price}
                      getOptionLabel={(option) => option.name}
                      placeholder={"예산 선택"}
                      onChange={Request.set_price}
                    />

                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 16,
                        marginLeft: 12,
                      }}
                    >
                      원
                    </span>
                  </div>
                  {/* <CheckBoxComponent onChange={() => this.priceCheckBox()}>
                    <span
                      style={{
                        color: "#1e2222",
                        fontSize: 15,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      프로젝트 예산 조율이 가능합니다.
                    </span>
                  </CheckBoxComponent> */}
                  <BudgetHelp
                    active={this.state.budget}
                    onClick={() => {
                      this.activeHandler("budget");
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <img src={helpimg}></img>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: 4,
                      }}
                    >
                      예산 측정이 어려우신가요?
                    </span>
                  </BudgetHelp>
                  <HelpBox
                    style={{ display: this.state.budget ? "flex" : "none" }}
                  >
                    <CheckBoxComponent onChange={this.priceCheckBox}>
                      <span
                        style={{
                          color: "#1e2222",
                          fontSize: 15,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        상담 후 예산 결정
                      </span>
                    </CheckBoxComponent>
                    <span
                      style={{
                        fontSize: 15,
                        lineHeight: 2.27,
                        letterSpacing: -0.38,
                        color: "#505050",
                        marginLeft: 31,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      프로젝트 예산 측정이 어렵다면, 볼트앤너트에서 유선으로
                      예산 책정을 도와드립니다.
                    </span>
                  </HelpBox>
                </Budget>
              </RequestContentBox>

              {/* 프로젝트 의뢰에서만 */}
              <RequestContentBox>
                <ContentTitle style={{ marginBottom: 16 }}>
                  <div>프로젝트 예상 진행 기간</div>
                </ContentTitle>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {/* <span
                    style={{
                      fontSize: 16,
                      color: "#505050",
                      letterSpacing: -0.4,
                      fontWeight: "normal",
                      marginBottom: 16,
                    }}
                  >
                    희망하는 프로젝트 진행 기간을 입력해주세요.
                  </span> */}
                  <Calendar />
                  {/* <CheckBoxComponent onChange={() => this.periodCheckBox()}>
                    <span
                      style={{
                        color: "#1e2222",
                        fontSize: 15,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      프로젝트 진행 기간 조율이 가능합니다.
                    </span>
                  </CheckBoxComponent> */}
                </div>
              </RequestContentBox>

              <RequestContentBox>
                <ContentTitle style={{ marginBottom: 4 }}>
                  <span>프로젝트 내용</span>
                  <img src={starred} style={{ marginLeft: 5 }}></img>
                  <span
                    style={{
                      marginLeft: 12,
                      fontSize: 14,
                      letterSpacing: -0.35,
                      color: "#e53c38",
                      fontWeight: "normal",
                    }}
                  >
                    (공개)
                  </span>
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
                <ProjectInput>
                  <InputComponent2
                    class="Input"
                    onFocus={(e) => (e.target.placeholder = "")}
                    value={Request.request_contents}
                    onChange={(e) => {
                      Request.set_contents(e);
                    }}
                  />
                </ProjectInput>
              </RequestContentBox>
            </Requestontent>

            {/* 제조사 선택에서 온 게 아닌 경우만 지역 노출 */}
            {Request.request_type != 2 && (
              <PartnerInfo>
                <ContentTitle style={{ marginBottom: 4 }}>
                  <div>선호 지역</div>
                  <img src={starred} style={{ marginLeft: 4 }}></img>
                </ContentTitle>
                <span
                  style={{
                    fontSize: 16,
                    color: "#505050",
                    letterSpacing: -0.4,
                    fontWeight: "normal",
                  }}
                >
                  -업체와의 오프라인 미팅 시 고객님의 선호 위치를 참고합니다.
                </span>
                <div
                  style={{
                    marginTop: 16,
                  }}
                >
                  <SelectComponent
                    styles={customStyles}
                    options={this.state.regionAry}
                    value={Request.request_region}
                    getOptionLabel={(option) => option.name}
                    placeholder={"시/도"}
                    onChange={Request.set_region}
                  />
                </div>
                {/* <CheckBoxComponent onChange={() => this.regionCheckBox()}>
                      <span
                        style={{
                          color: "#1e2222",
                          fontSize: 15,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        위치 조율이 가능합니다.
                      </span>
                    </CheckBoxComponent> */}
              </PartnerInfo>
            )}

            <RequestContentBox>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 32,
                  fontWeight: 500,
                  letterSpacing: -0.8,
                  color: "#1e2222",
                  marginTop: 140,
                  marginBottom: 70,
                }}
              >
                <span style={{ color: "#0933b3" }}>관련 파일</span>을 업로드
                해주세요.
              </span>
              <ContentTitle style={{ marginBottom: 4 }}>
                <span>파일 업로드</span>
              </ContentTitle>
              <RequestContentBox>
                <span
                  style={{
                    fontSize: 16,
                    color: "#505050",
                  }}
                >
                  - 공개로 올리지 못했던 내용과 프로젝트 관련 파일을 모두
                  올려주세요. (도면 포함)
                </span>
                {/* 관련 파일 추가하는 함수가 들어가 있는 컴포넌트 */}
                <AddFile file={true} isOpen={true} />
              </RequestContentBox>
              {/* <AddDrawingFile file={true} isOpen={true} /> */}

              <ContentTitle>
                <span>파일 보안 설정</span>
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
                      this.state.securityCheck1 ? circlecheckblue : circlecheck
                    }
                    style={{ width: 17, height: 17, marginTop: 14 }}
                  ></img>
                  <SecurityBoxTitle>
                    모든 제조사가 파일 보기 가능
                  </SecurityBoxTitle>
                  <SecurityBoxContent>
                    모든 파트너가 도면을 볼 수 있으며
                    <br />
                    가장 정확한 견적을 받을 수 있습니다.
                  </SecurityBoxContent>
                </SecurityBox>
                <SecurityBox
                  active={this.state.securityCheck2}
                  onClick={() => {
                    this.activeHandler("check2");
                  }}
                >
                  <img
                    src={
                      this.state.securityCheck2 ? circlecheckblue : circlecheck
                    }
                    style={{ width: 17, height: 17, marginTop: 14 }}
                  ></img>
                  <SecurityBoxTitle>허용된 제조사만 도면 보기</SecurityBoxTitle>
                  <SecurityBoxContent>
                    채팅이나 견적서 요청에서
                    <br />
                    파일 보기 권한을 부여할 수 있습니다.
                  </SecurityBoxContent>
                </SecurityBox>
              </Security>

              {/* 프로젝트 의뢰에서만 */}
              {/* <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 32,
                  fontWeight: 500,
                  letterSpacing: -0.8,
                  color: "#1e2222",
                  marginTop: 140,
                  marginBottom: 70,
                }}
              >
                <span style={{ color: "#0933b3" }}>파트너 모집 정보</span>를
                입력해주세요.
              </span> */}

              {/* 로그인 안했을 시  */}
              {this.props.Auth.logged_in_user ? (
                <></>
              ) : (
                <>
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: 32,
                      fontWeight: 500,
                      letterSpacing: -0.8,
                      color: "#1e2222",
                      marginTop: 140,
                      marginBottom: 70,
                    }}
                  >
                    <span style={{ color: "#0933b3" }}>
                      의뢰 확인을 위한 필수 정보
                    </span>
                    를 입력해주세요.
                  </span>
                  <ClientInfo>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <ClientInfoBox style={{ marginRight: 10 }}>
                        <ContentTitle>
                          <div>이메일</div>
                          <img src={starred} style={{ marginLeft: 4 }}></img>
                        </ContentTitle>
                        <InputComponent
                          style={{ width: "100%", marginTop: 0 }}
                          placeholder="이메일을 입력하세요"
                          label="아이디"
                          onChange={Request.setEmail}
                          value={Request.email}
                        />
                      </ClientInfoBox>
                      <ClientInfoBox style={{ marginLeft: 10 }}>
                        <ContentTitle>
                          <div>전화번호</div>
                          <img
                            src={starred}
                            style={{ marginLeft: 4, marginTop: 0 }}
                          ></img>
                        </ContentTitle>
                        <InputComponent
                          style={{ width: "100%", marginTop: 0 }}
                          placeholder="-없이 입력해주세요"
                          label="휴대전화"
                          type="phone"
                          onChange={Request.setPhone}
                          value={Request.phone}
                        />
                      </ClientInfoBox>
                    </div>
                    <ClientInfoBox style={{ width: "48.5%", marginBottom: 11 }}>
                      <ContentTitle>
                        <div>비밀번호</div>
                        <img src={starred} style={{ marginLeft: 4 }}></img>
                      </ContentTitle>
                      <InputComponent
                        style={{ width: "100%", marginTop: 0 }}
                        placeholder="비밀번호를 입력하세요"
                        label="비밀번호"
                        type="password"
                        onChange={Request.setPassword}
                        value={Request.password}
                      />
                    </ClientInfoBox>
                    <CheckBoxComponent checked>
                      <span
                        style={{
                          color: "#1e2222",
                          fontSize: 15,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        이용약관 및 개인정보 처리방침에 동의합니다. (필수)
                      </span>
                    </CheckBoxComponent>
                  </ClientInfo>
                </>
              )}

              <RequestBtn>
                <RequestButton
                  onClick={() => {
                    Request.requestSubmit();
                    // console.log(this.newIndex);
                  }}
                >
                  의뢰 요청하기
                </RequestButton>
                <span
                  style={{
                    fontSize: 15,
                    lineHeight: 1.47,
                    letterSpacing: -0.38,
                    color: "#0933b3",
                    marginTop: 8,
                  }}
                >
                  프로젝트 등록이 완료됩니다.
                </span>
              </RequestBtn>
              {/* {Request.loadingFlag && (
                <>
                  <LoadingComponent scale="30%" primary />
                  <Layer1 />
                </>
              )} */}
            </RequestContentBox>
          </Body>
        </Container>
      </>
    );
  }
}

export default RequestContent;

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
    }
  }
  p:nth-of-type(1) {
    font-size: 15px;
    line-height: 2;
    letter-spacing: -0.38px;
    color: #1e2222;
    margin-bottom: 3px;
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
  width: 100%;
  margin-left: ;
`;
const InlineDiv = styled.div`
  display: inline-flex;
`;
const PurposeSelectCircle = styled.div`
  width: 224px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border: ${(props) => (props.active ? "solid 1px #0933b3" : "")};
  cursor: pointer;
  margin-right: 16px;
  padding: 0px 10px;
  color: #1e2222;
`;
const PurposeFont18 = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 2.5;
  letter-spacing: -0.4px;
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
  margin-bottom: 70px;
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
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#edf4fe" : "#ffffff")};
`;

const SecurityBoxTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.88;
  letter-spacing: -0.4px;
  color: #1e2222;
  margin-top: 14px;
`;

const SecurityBoxContent = styled.span`
  font-size: 15px;
  line-height: 1.47;
  letter-spacing: -0.38px;
  color: #999999;
  margin-bottom: 17px;
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
  margin-top: 12px;
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
  flex-direction: column;
  align-items: center;
  margin-bottom: 300px;
`;

const RequestButton = styled(Buttonv1)`
  width: 228px !important;
  height: 48px !important;
  font-size: 18px;
  line-height: 1.89;
  letter-spacing: -0.45px;
`;

const FileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentInput = styled.div`
  .MuiInputBase-root {
    height: 42px;
    width: 100%;
    margintop: 0px;
  }
`;

const ProjectInput = styled.div`
  .MuiInputBase-root {
    height: 433px;
    width: 100%;
  }
`;

const PartnerInfo = styled.div``;

const ClientInfo = styled.div`
  margin-bottom: 70px;
`;

const ClientInfoBox = styled.div`
  margin-bottom: 32px;
  width: 100%;
  .MuiInputBase-root {
    height: 42px;
    width: 100%;
    margintop: 0px;
  }
`;

const HelpBox = styled.div`
  margin-top: 11px;
  flex-direction: column;
  border-radius: 3px;
  background-color: #edf4fe;
  padding: 10px 33px;
`;

const LoadingComponent = styled(ButtonSpinnerComponent)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const Layer1 = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ProjectFieldCheckbox = styled.div`
  margin-top: 16px;
  padding: 9px 12px 9px 12px;
  border-radius: 3px;
  border: solid 1px #c6c7cc;
`;
