import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import SelectComponent from "components/Select";

import CheckBoxComponent from "components/CheckBox";
import Buttonv1 from "components/Buttonv1";

import InputComponent from "components/Input3";
import InputComponent2 from "components/Input5";
import Calendar from "./Calendar";
import AddFile from "./AddFile";

const reqeustlogo = "./static/images/request/request_logo.svg";
const starred = "./static/images/request/star_red.svg";
const circlecheck = "./static/images/request/circlecheck.svg";
const circlecheckblue = "./static/images/request/circlecheck_blue.svg";
const helpimg = "./static/images/request/help_img.svg";
const help_face ="./static/images/request/phonehuman.png"

const customStyles = {
  dropdownIndicator: () => ({
    border : 0,
    color : "#c6c7cc"
  }),
  indicatorSeparator: () => ({
    display : "none"
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#000000" : "#555555",
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: 16,
    fontSize: 15,
  }),
  control: () => ({
    border: "0",
    borderBottom : "1px solid #e1e2e4",
    backgroundColor: "#fff",
    display: "flex",
    borderRadius: 3,
    width: 246,
    height: 42,
    fontSize : 15,
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
      { id: 1, name: "기획 상담", checked: false },
      { id: 2, name: "견적 요청", checked: false },
      { id: 3, name: "업체 수배", checked: false },
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

  // 제조문의 분류 state
  categoryCheckBox = () => {};

  render() {
    const { Request, Auth } = this.props;

    return (
      <>
        <Container>
          <RequestHeader>
            <RequestTitle>
              <span style={{ color: "#0933b3" }}>프로젝트 정보</span>를
              입력해주세요.
            </RequestTitle>
          </RequestHeader>
          <Body>
            <Requestontent>
            <RequestContentBox>
                <ContentTitle>
                  <div style={{fontSize : 13}}>프로젝트 제목</div>
                  <img src={starred} style={{ marginLeft: 4 }}></img>
                </ContentTitle>
                <ContentInput style={{border: "0px solid white", height : 30}}>
                  <InputComponent
                    class="Input"
                    placeholder="프로젝트 제목을 입력해주세요."
                    onChange={(e) => {
                      Request.set_name(e);
                    }}
                    style={{border: "0px solid white", height : "100%"}}
                  />
                </ContentInput>
              </RequestContentBox>
              <RequestContentBox>
                <ContentTitle>
                  <span style={{fontSize : 13}}>문의 목적</span>
                  <img src={starred} style={{ marginLeft: 4 }}></img>
                </ContentTitle>
                <SelectBox>
                  <InlineDiv style={{display : "inline-grid"}}>
                    {this.state.purposeAry.map((item, idx) => {
                      return (
                        <CheckBoxComponent onChange={() => {
                          console.log(item.checked);
                          Request.set_state(idx);
                          if (!item.checked) {
                            item.checked = true;
                          } else {
                            item.checked = false;
                          }
                          this.setState({ f: 3 });
                        }}>
                          <ProjectCategoryTitle style={{fontSize : 15, lineHeight : 2.07, color : "#999"}}>
                              {item.name}
                          </ProjectCategoryTitle>
                        </CheckBoxComponent>
                        
                      );
                    })}
                  </InlineDiv>
                </SelectBox>
              </RequestContentBox>

              {/* 프로젝트 의뢰에서만 */}
              {Request.request_type == 0 && (
                <RequestContentBox style={{height : "141px"}}>
                  <ContentTitle>
                    <div  style={{fontSize : 13}}>제조문의 분류</div>
                    <img src={starred} style={{ marginLeft: 4 }}></img>
                  </ContentTitle>
                  <ProjectFieldCheckbox>
                    <CheckBoxComponent onChange={this.categoryCheckBox}>
                      <ProjectCategoryTitle style={{fontSize : 15, lineHeight : 2.07, color : "#999"}}>
                        완제품/부품 구매
                      </ProjectCategoryTitle>
                    </CheckBoxComponent>
                    <CheckBoxComponent onChange={this.categoryCheckBox}>
                      <ProjectCategoryTitle style={{fontSize : 15, lineHeight : 2.07, color : "#999"}}>
                        개발/설계 업체
                      </ProjectCategoryTitle>
                    </CheckBoxComponent>
                    <CheckBoxComponent onChange={this.categoryCheckBox}>
                      <ProjectCategoryTitle style={{fontSize : 15, lineHeight : 2.07, color : "#999"}}>
                        제작 가능 업체
                      </ProjectCategoryTitle>
                    </CheckBoxComponent>
                  </ProjectFieldCheckbox>
                </RequestContentBox>
              )}

              <RequestContentBox>
                <ContentTitle>
                  <div style={{fontSize : 13}}>희망 예산</div>
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
                        marginLeft: 8,
                        fontSize : 12,
                        borderBottom : "1px solid #0933b3"
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
                          fontSize: 13,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        상담 후 예산 결정
                      </span>
                    </CheckBoxComponent>
                    <span
                      style={{
                        fontSize: 13,
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
                <ContentTitle style={{ fontSize : 13, marginBottom: 16 }}>
                  <div>제조문의 응답 희망 마감시간</div>
                </ContentTitle>
                <div style={{width : 246, display: "flex", flexDirection: "column" }}>
                  <Calendar />
                </div>
              </RequestContentBox>

              <RequestContentBox>
                <ContentTitle style={{ fontSize : 13, marginBottom: 4 }}>
                  <span>프로젝트 내용</span>
                  <img src={starred} style={{ marginLeft: 5 }}></img>
                  <span
                    style={{
                      marginLeft: 6,
                      fontSize: 13,
                      letterSpacing: -0.35,
                      color: "#e53c38",
                      fontWeight: "normal",
                    }}
                  >
                    (공개)
                  </span>
                </ContentTitle>
                
                <Help>
                  <img src={help_face} style={{width : 30}}></img>
                  <span
                    style={{
                      marginLeft: 6,
                      fontSize: 13,
                      letterSpacing: -0.35,
                      color: "#505050",
                      lineHeight : 1.67,
                      fontFamily : "NotoSansCJKkr"
                    }}
                  >
                    내용 작성이 어렵다면, 가능한만큼만 작성해주세요. <br/>
                    볼트앤너트가 유선으로 상담을 도와드립니다.
                  </span>
                </Help>
                <ProjectInput>
                  <InputComponentContent
                    class="Input"
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
                <ContentTitle style={{ marginBottom: 12 }}>
                  <div>선호 지역</div>
                  <img src={starred} style={{ marginLeft: 4 }}></img>
                </ContentTitle>
                <span
                  style={{
                    fontSize: 13,
                    color: "#505050",
                    letterSpacing: -0.4,
                    fontWeight: "normal",
                  }}
                >
                  업체와의 오프라인 미팅 시 고객님의 선호 위치를 참고합니다.
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
            <RequestTitle style={{ marginTop : 120, marginBottom : 50 }}>
              <span style={{color: "#0933b3" }}>관련 파일</span>을
              업로드해주세요.
            </RequestTitle>
              <ContentTitle style={{ marginBottom: 12 }}>
                <span>파일 업로드</span>
              </ContentTitle>
              <RequestContentBox style={{ marginTop: 8 }}>
                <span
                  style={{
                    fontSize: 13,
                    color: "#505050",
                  }}
                >
                  프로젝트 관련 파일을 모두
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
                  style={{marginRight : 10}}
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
                    모든 파트너가 파일을 볼 수 있으며
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
                  <SecurityBoxTitle>허용된 제조사만 파일 보기</SecurityBoxTitle>
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
                <RequestTitle style={{ marginTop : 120, marginBottom : 50 }}>
                  <span style={{color: "#0933b3" }}>의뢰 확인을 위한</span><br/><br/>
                  <span style={{color: "#0933b3" }}>필수 정보</span>를 입력해주세요.
                </RequestTitle>
                  <ClientInfo style={{display : "block"}}>
                    <div
                      style={{
                        display: "block",
                        justifyContent: "space-between",
                      }}
                    >
                      <ClientInfoBox>
                        <ContentTitle>
                          <div>이메일</div>
                          <img src={starred} style={{ marginLeft: 4 }}></img>
                        </ContentTitle>
                        <InputComponent
                          style={{border: "0px solid white", height : 18}}
                          placeholder="이메일을 입력하세요"
                          onChange={Request.setEmail}
                          value={Request.email}
                        />
                      </ClientInfoBox>
                      <ClientInfoBox>
                        <ContentTitle>
                          <div>전화번호</div>
                          <img
                            src={starred}
                            style={{ marginLeft: 4, marginTop: 0 }}
                          ></img>
                        </ContentTitle>
                        <InputComponent
                          style={{border: "0px solid white", height : 18}}
                          placeholder="-없이 입력해주세요"
                          type="phone"
                          onChange={Request.setPhone}
                          value={Request.phone}
                        />
                      </ClientInfoBox>
                    </div>
                    <ClientInfoBox>
                      <ContentTitle>
                        <div>비밀번호</div>
                        <img src={starred} style={{ marginLeft: 4 }}></img>
                      </ContentTitle>
                      <InputComponent
                        style={{border: "0px solid white", height : 18}}
                        placeholder="비밀번호를 입력하세요"
                        type="password"
                        onChange={Request.setPassword}
                        value={Request.password}
                      />
                    </ClientInfoBox>
                    <CheckBoxComponent checked onChange={this.categoryCheckBox}>
                      <span
                        style={{
                          color: "#1e2222",
                          fontSize: 12,
                          display: "flex",
                          alignItems: "center",
                          fontWeight : "bold"
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
                  }}
                >
                  {Request.request_id ? "의뢰 수정하기" : "의뢰 요청하기"}
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

const InputComponentContent = styled(InputComponent2)`
  font-family: NotoSansCJKkr !important ;
`;

const SelectBox = styled.div`
  width: 100%;
`;

const InlineDiv = styled.div`
  display: inline-flex;
`;

const PurposeSelectCircle = styled.div`
  width: 100%;
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

const Security = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 70px;
`;

const SecurityBox = styled.div`
  width: 50%;
  height: 159px;
  border-radius: 5px;
  font-size : 13px;
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
  font-size: 13px;
  font-weight: bold;
  line-height: 1.88;
  letter-spacing: -0.4px;
  color: #1e2222;
  margin-top: 15px;
  margin-bottom : 8px;
`;

const SecurityBoxContent = styled.span`
  font-size: 13px;
  line-height: 1.47;
  letter-spacing: -0.38px;
  color: #999999;
  margin-bottom: 20px;
`;

const Container = styled.div`
  width: calc(100% - 28px);
  display: flex;
  flex-direction: column;
  margin-left : 14px;
  margin-right : 14px;
`;

const RequestHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 80px;
  margin-bottom: 60px;
  text-align: center;
  font-family: NotoSansCJKkr;
`;

const RequestTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #1e2222;
  margin-top: 20px;
  text-align: left;
`;

const Body = styled.div`
  width: 100%;
  font-family: NotoSansCJKkr;
`;

const Requestontent = styled.div``;

const RequestContentBox = styled.div`
  width: 100%;
  margin-bottom: 56px;
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  color: #1e2222;
  margin-bottom: 12px;
`;

const Budget = styled.div`
  display: flex;
  flex-direction: column;
`;

const BudgetHelp = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
  letter-spacing: -0.38px;
  color: #0933b3;
  margin-top: 12px;
`;

const Help = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 54px;
  border-radius: 3px;
  background-color: #edf4fe;
  margin-top: 16px;
  margin-bottom: 20px;
`;

const RequestBtn = styled.div`
  font-size : 15px;
  width : 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 300px;
`;

const RequestButton = styled(Buttonv1)`
  width: 100% !important;
  height: 48px !important;
  font-size: 15px;
  line-height: 1.89;
  letter-spacing: -0.45px;
  font-family: NotoSansCJKkr !important;
`;

const ContentInput = styled.div`
  .MuiInputBase-root {
    height: 42px;
    width: 100%;
  }
`;

const ProjectInput = styled.div`
  width : 100%;
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
    width: 384px;
  }
`;

const HelpBox = styled.div`
  margin-top: 11px;
  flex-direction: column;
  border-radius: 3px;
  background-color: #edf4fe;
  padding: 10px 33px;
`;

const ProjectFieldCheckbox = styled.div`
  height: 42px;
  display: block;
  gap: 91px;
  margin-top: 16px;
  > label {
    width : 100%;
  }
`;

const ProjectCategoryTitle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #767676;
  font-size: 16px;
  font-family: NotoSansCJKkr;
  margin-top: 3px;
  margin-left: 12px;
`;
