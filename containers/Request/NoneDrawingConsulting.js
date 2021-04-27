import React from "react";
import styled, { css } from "styled-components";
import Background from "../../components/Background";
import Containerv1 from "../../components/Containerv1";
import * as Title from "../../components/Title";
import InputComponent from "components/Input2";
import { inject, observer } from "mobx-react";
import Calendar from "./Calendar2";
import AddFile from "AddFile";
import AddFile2 from "AddFile2";

import * as RequestAPI from "axios/Request";
import Router from "next/router";

const checkcircle =
  "/static/images/request/NoneDrawingConsulting/checkcircle.svg";
const pass3 = "static/images/pass3.png";

@inject("ManufactureProcess", "Request", "Schedule", "Auth")
@observer
class NoneDrawingConsultingContainer extends React.Component {
  state = {
    selectedIdx: 0,
    purposeselected1: false,
    purposeselected2: false,
    purposeselected3: false,
    projectname: "",
    row: "",
    column: "",
    height: "",
    unit: [],
    purpose: {},
    duedate: "",
    duecheck: "",
    checkFileUpload: false,
    minRows: 7,
    maxRows: 100,
    rows: 7,
  };

  // unitCheckboxhandler
  //   componentDidMount = () => {
  //     const token = localStorage.getItem("token");
  //     console.log(token);
  //   };
  unitCheckboxHandler = (idx) => {
    this.setState({ selectedIdx: idx });
  };

  activeHandler = (idx) => {
    if (this.state.selectedIdx === idx) {
      return true;
    } else {
      return false;
    }
  };

  // purposecheckboxhandler
  purposeCheckboxHandlerOne = (index) => {
    const { purpose } = this.state;
    if (this.state.purposeselected1 === false) {
      this.setState({ purposeselected1: true });
      this.setState({
        state: { ...this.state.state, purpose: (purpose.id1 = index) },
      });
      console.log(purpose);
    } else if (this.state.purposeselected1 === true) {
      this.setState({ purposeselected1: false });
      this.setState({
        state: { ...this.state.state, purpose: delete purpose.id1 },
      });
      console.log(purpose);
    }
  };

  purposeCheckboxHandlerTwo = (index) => {
    const { purpose } = this.state;
    if (this.state.purposeselected2 === false) {
      this.setState({ purposeselected2: true });
      this.setState({
        state: { ...this.state.state, purpose: (purpose.id2 = index) },
      });
      console.log(purpose);
    } else if (this.state.purposeselected2 === true) {
      this.setState({ purposeselected2: false });
      this.setState({
        state: { ...this.state.state, purpose: delete purpose.id2 },
      });
      console.log(purpose);
    }
  };

  purposeCheckboxHandlerthree = (index) => {
    const { purpose } = this.state;
    if (this.state.purposeselected3 === false) {
      this.setState({ purposeselected3: true });
      this.setState({
        state: { ...this.state.state, purpose: (purpose.id3 = index) },
      });
      console.log(purpose);
    } else {
      this.setState({ purposeselected3: false });
      this.setState({
        state: { ...this.state.state, purpose: delete purpose.id3 },
      });
      console.log(purpose);
    }
  };

  // textarea
  handleChange = async (event) => {
    this.props.Auth.checkLogin();
    if(!this.props.Auth.logged_in_user) {
      alert("로그인이 필요한 서비스입니다.");
      Router.push("/login")
      return
    }
    const textareaLineHeight = 34;
    const { minRows, maxRows } = this.state;
    const { ManufactureProcess } = this.props;
    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });

    ManufactureProcess.requestComment = event.target.value;
  };

  handleChange2 = (event) => {
    const textareaLineHeight = 34;
    const { minRows, maxRows } = this.state;
    const { ManufactureProcess } = this.props;
    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      value2: event.target.value2,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });

    ManufactureProcess.requestComment2 = event.target.value2;
  };

  // axios data
  requestSubmit = () => {
    const {
      projectname,
      row,
      column,
      height,
      unit,
      purpose,
      duedate,
      duecheck,
    } = this.state;
    const { ManufactureProcess, Schedule } = this.props;
    // return alert(`
    //    프로젝트이름: ${projectname}
    //    가로: ${row}
    //    세로: ${column}
    //    높이: ${height}
    //    `);

    console.log("requestSubmit");
    console.log(Schedule.clickDay);
    var formData = new FormData();
    formData.append("request_state", "상담요청");
    //formData.append("purpose", purpose)
    formData.append("name", projectname);
    //formData.append("deadline", Schedule.clickDay + "   09:00");
    formData.append("deadline", "2020-11-11 11:11");
    formData.append("deadline_state", "납기일미정");
    //ManufactureProcess.date_undefined
    formData.append("order_request_open", ManufactureProcess.requestComment);
    formData.append("order_request_open", ManufactureProcess.requestComment2);
    // formData.append("file_open", ManufactureProcess.openFileArray);
    // formData.append("file_close", ManufactureProcess.privateFileArray);
    formData.append("blueprint_exist", 0);

    // const formData = {
    //   user: this.props.Auth.logged_in_user.id,
    //   request_state: "상담요청",
    //   name: projectname,
    //   deadline: "2020-11-11 11:11",
    //   deadline_state: ManufactureProcess.deliverystate,
    //   order_request_open: ManufactureProcess.requestComment,
    //   order_request_close: ManufactureProcess.requestComment2,
    //   file_open: ManufactureProcess.openFileArray,
    //   file_close: ManufactureProcess.privateFileArray,
    // };

    const Token = localStorage.getItem("token");
    //const token = "179bb0b55811073a76bc0894a7c73220da9a191d";
    const req = {
      headers: {
        Authorization: `Token ${Token}`,
      },
      data: formData,
    };

    console.log(req);

    RequestAPI.create(req)
      .then((res) => {
        console.log("create: ", res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
        console.log(e.response.data);
      });

    //
  };

  render() {
    const openPlaceHolderText = `모두에게 공개될 수 있는 내용을 입력해주세요.
      다음 사항이 명확하게 작성되어야 정확한 견적을 받을 가능성이 높습니다.
      1. 가공품 목적 및 사용 환경
      2. 가공 부품별 특이 사항
      3. 공급처가 충족해야하는 발주 조건
      `;

    const privatePlaceholderText = `회사의 세부적인 기술과 관련하여 외부로 유출되지 않아야 할 내용을 입력해주세요.`;

    const { ManufactureProcess } = this.props;

    const {
      projectname,
      row,
      column,
      height,
      unit,
      purpose,
      duedate,
      duecheck,
    } = this.state;

    return (
      <Background>
        <Containerv1 style={{ flexDirection: "column" }}>
          <PurposeBox>
            <InlineDiv>
              <FontSize24>문의 목적 </FontSize24>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <FontSize16 style={{ height: "24px", lineHeight: "1" }}>
                  (중복 선택 가능)
                </FontSize16>
              </div>
            </InlineDiv>

            <SelectBox style={{ width: "555px", marginTop: "16px" }}>
              <InlineDiv style={{ alignItems: "flex-end" }}>
                <PurposeSelectCircle
                  active={this.state.purposeselected1}
                  onClick={() => this.purposeCheckboxHandlerOne("상담요청")}
                >
                  <PusrposeFontSize18 active={this.state.purposeselected1}>
                    상담요청
                  </PusrposeFontSize18>
                </PurposeSelectCircle>
              </InlineDiv>

              <InlineDiv style={{ alignItems: "flex-end" }}>
                <PurposeSelectCircle
                  active={this.state.purposeselected2}
                  onClick={() => this.purposeCheckboxHandlerTwo("견적요청")}
                >
                  <PusrposeFontSize18 active={this.state.purposeselected2}>
                    견적요청
                  </PusrposeFontSize18>
                </PurposeSelectCircle>
              </InlineDiv>

              <InlineDiv style={{ alignItems: "flex-end" }}>
                <PurposeSelectCircle
                  active={this.state.purposeselected3}
                  onClick={() => this.purposeCheckboxHandlerthree("업체수배")}
                >
                  <PusrposeFontSize18 active={this.state.purposeselected3}>
                    업체수배
                  </PusrposeFontSize18>
                </PurposeSelectCircle>
              </InlineDiv>
            </SelectBox>
          </PurposeBox>
          <ProjectTitleBox>
            <InlineDiv>
              <FontSize24>프로젝트 제목</FontSize24>
            </InlineDiv>

            <InlineDiv style={{ marginTop: "16px" }}>
              <InputComponent
                class="Input"
                placeholder="프로젝트 제목을 입력해주세요."
                onChange={(e) => {
                  this.setState({ projectname: e });
                }}
              />
            </InlineDiv>
          </ProjectTitleBox>

          {/* <ProductInfoBox>
                  <InlineDiv>
                     <FontSize24>가견적을 위한 제품 정보</FontSize24>
                  </InlineDiv>

                  <div style={{ display: 'flex', marginBottom: '24px' }}>
                     <LengthHeightBox>
                        <InlineDiv style={{ alignItems: 'center', marginTop: '16px' }}>
                           <FontSize18 style={{ marginRight: '13px', width: '33px' }}>가로</FontSize18>
                           <InputComponent
                              class='Input'
                              placeholder='0'
                              onChange={e => {
                                 this.setState({ row: e });
                              }}
                              width='144px'
                           />
                        </InlineDiv>

                        <InlineDiv style={{ alignItems: 'center', marginTop: '16px' }}>
                           <FontSize18 style={{ marginRight: '13px', width: '33px' }}>세로</FontSize18>
                           <InputComponent
                              class='Input'
                              placeholder='0'
                              onChange={e => {
                                 this.setState({ column: e });
                              }}
                              width='144px'
                           />
                        </InlineDiv>

                        <InlineDiv style={{ alignItems: 'center', marginTop: '16px' }}>
                           <FontSize18 style={{ marginRight: '13px', width: '33px' }}>높이</FontSize18>
                           <InputComponent
                              class='Input'
                              placeholder='0'
                              onChange={e => {
                                 this.setState({ height: e });
                              }}
                              width='144px'
                           />
                        </InlineDiv>
                     </LengthHeightBox>

                     <SelectBox style={{ marginLeft: '70px', width: '316px' }}>
                        <InlineDiv style={{ alignItems: 'flex-end' }}>
                           <FontSize18 style={{ width: '33px' }}>단위</FontSize18>
                        </InlineDiv>

                        <InlineDiv style={{ alignItems: 'flex-end' }}>
                           <SelectCircle active={this.activeHandler(1)} onClick={() => this.unitCheckboxHandler(1)}>
                              <CheckCircleImg src={checkcircle} active={this.activeHandler(1)} />
                           </SelectCircle>
                           <FontSize18>mm</FontSize18>
                        </InlineDiv>

                        <InlineDiv style={{ alignItems: 'flex-end' }}>
                           <SelectCircle active={this.activeHandler(2)} onClick={() => this.unitCheckboxHandler(2)}>
                              <CheckCircleImg src={checkcircle} active={this.activeHandler(2)} />
                           </SelectCircle>
                           <FontSize18>cm</FontSize18>
                        </InlineDiv>

                        <InlineDiv style={{ alignItems: 'flex-end' }}>
                           <SelectCircle active={this.activeHandler(3)} onClick={() => this.unitCheckboxHandler(3)}>
                              <CheckCircleImg src={checkcircle} active={this.activeHandler(3)} />
                           </SelectCircle>
                           <FontSize18>m</FontSize18>
                        </InlineDiv>
                     </SelectBox>
                  </div>
               </ProductInfoBox>
               <ImageShape>
                  <FontSize24>이미지 형상</FontSize24>
               </ImageShape> */}

          <FontSize24 style={{ marginTop: "30px" }}>납기 일</FontSize24>
          <DeliveryDate
            checkDateConference={ManufactureProcess.date_conference}
            checkDateUndefined={ManufactureProcess.date_undefined}
            checkCalendar={ManufactureProcess.calendar_checked}
            checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
          >
            <div>
              <div style={{ height: "50px" }}>
                <Calendar />
              </div>
              <div
                onClick={() => {
                  if (ManufactureProcess.date_conference) {
                    ManufactureProcess.date_conference = false;
                  } else {
                    ManufactureProcess.date_conference = true;
                  }
                }}
              >
                <div>
                  <img src={pass3} />
                </div>
                <span>납기일 협의 가능</span>
              </div>
              <div
                onClick={() => {
                  if (ManufactureProcess.date_undefined) {
                    ManufactureProcess.date_undefined = false;
                  } else {
                    ManufactureProcess.date_undefined = true;
                  }
                }}
              >
                <div>
                  <img src={pass3} />
                </div>
                <span>납기일 미정</span>
              </div>
            </div>
          </DeliveryDate>

          <FontSize24>프로젝트 설명 및 요청사항</FontSize24>

          <Request>
            <div>
              <FontSize20 style={{ lineHeight: "1", fontWeight: "500" }}>
                공개 내용
              </FontSize20>
            </div>

            <textarea
              placeholder={`${openPlaceHolderText}`}
              onFocus={(e) => (e.target.placeholder = `${openPlaceHolderText}`)}
              onBlur={(e) => (e.target.placeholder = `${openPlaceHolderText}`)}
              rows={this.state.rows}
              value={this.state.value}
              className={"textarea"}
              placeholderStyle={{ fontWeight: "400" }}
              onChange={this.handleChange}
            />
          </Request>

          <Request>
            <div>
              <FontSize20 style={{ lineHeight: "1", fontWeight: "500" }}>
                비공개 내용
              </FontSize20>
            </div>

            <textarea
              placeholder={`${privatePlaceholderText}`}
              onFocus={(e) =>
                (e.target.placeholder = `${privatePlaceholderText}`)
              }
              onBlur={(e) =>
                (e.target.placeholder = `${privatePlaceholderText}`)
              }
              rows={this.state.rows}
              value2={this.state.value2}
              className={"textarea"}
              placeholderStyle={{ fontWeight: "400" }}
              onChange={this.handleChange2}
            />
          </Request>

          <InlineDiv style={{ marginBottom: "15px" }}>
            <FontSize24>참고 파일</FontSize24>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <FontSize18 style={{ color: "#86888c", marginLeft: "12px" }}>
                이미지 혹은 PDF 자료만 업로드 가능합니다. 전문 설계 용어와
                기호를 사용해 주시면 좋습니다.
              </FontSize18>
            </div>
          </InlineDiv>

          <Reference>
            <InlineDiv
              style={{
                marginBottom: "12px",
                backgroundColor: "#f6f6f6",
                border: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <FontSize20 style={{ fontWeight: "500", lineHeight: "1" }}>
                  공개 자료
                </FontSize20>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <FontSize18
                  style={{
                    color: "#86888c",
                    marginLeft: "12px",
                    lineHeight: "1",
                  }}
                >
                  모두에게 공개될 수 있는 자료를 첨부해주세요.
                </FontSize18>
              </div>
            </InlineDiv>

            <span style={{ display: "inline-block" }}>
              <AddFile2
                file={true}
                isOpen={true}
                onChange={this.handleChange}
              />
              <div></div>
            </span>

            <InlineDiv
              style={{
                marginBottom: "12px",
                backgroundColor: "#f6f6f6",
                border: "none",
                marginTop: "25px",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <FontSize20 style={{ fontWeight: "500", lineHeight: "1" }}>
                  비공개 자료
                </FontSize20>
              </div>
            </InlineDiv>

            <span style={{ display: "inline-block" }}>
              <AddFile2
                file={true}
                isOpen={false}
                onChange={this.handleChange}
              />
              <div></div>
            </span>
          </Reference>
          <CompleteBtnBox>
            <CompleteBtn
              onClick={() => {
                this.requestSubmit();
              }}
            >
              <FontSize20 style={{ color: "#ffffff" }}>
                상담 및 가격 요청하기
              </FontSize20>
            </CompleteBtn>
          </CompleteBtnBox>
        </Containerv1>
      </Background>
    );
  }
}

export default NoneDrawingConsultingContainer;

// global
const InlineDiv = styled.div`
  display: inline-flex;
`;

// fontsize
const FontSize24 = styled(Title.FontSize24)`
  font-weight: bold;
  line-height: 1.67;
  letter-spacing: -0.6px;
  color: #282c36;
`;

const FontSize20 = styled(Title.FontSize20)`
  font-weight: bold;
  line-height: 2.6;
  letter-spacing: -0.5px;
  color: var(--white);
`;

const FontSize18 = styled(Title.FontSize18)`
  font-weight: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
  color: #111111;
`;

const PusrposeFontSize18 = styled(Title.FontSize18)`
  font-weight: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
  color: ${(props) => (props.active ? "#ffffff" : "#414550")};
`;

const FontSize16 = styled(Title.FontSize16)`
  font-weight: normal;
  line-height: 2.5;
  letter-spacing: -0.4px;
  color: #86888c;
`;

// body
const ProjectTitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`;

const LengthHeightBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 650px;
`;

const SelectBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SelectCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  margin-right: 8px;
  margin-bottom: 7px;
  border-radius: 8px;
  border: solid 1px #86888c;
  background-color: ${(props) => (props.active ? "#0933b3" : "#ffffff")};
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
`;

const CheckCircleImg = styled.img`
  display: ${(props) => (props.active ? "block" : "none")};
`;

const PurposeBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  margin-bottom: 70px;
`;

const ImageShape = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1200px;
  height: 425px;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border: solid 1px #d8d8d8;
  margin-bottom: 95px;
`;

const RequestInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1200px;
  height: 146px;
  background-color: #f6f6f6;
  border-radius: 5px;
`;

const RequestInfoInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1152px;
  height: 98px;
`;

const CompleteBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CompleteBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 242px;
  border-radius: 5px;
  background-color: #0933b3;
  margin-bottom: 80px;
  cursor: pointer;
`;

const DeliveryDate = styled.div`
  width: 1200px;
  // display: ${(props) => (props.checkFileUpload ? "static" : "none")};
  background-color: #f6f6f6;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 26px 24px 22px 24px;
  box-sizing: border-box;
  margin-bottom: 40px;
  margin-top: 16px;

  // > div:nth-of-type(1) {
  //    height: 27px;
  //    font-size: 18px;
  //    line-height: 40px;
  //    letter-spacing: -0.45px;
  //    color: #282c36;
  //    font-weight: bold;
  //    margin-bottom: 16px;
  // }

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
        // background-color: #999999;
        > img {
          // display: ${(props) =>
            props.checkDateConference ? "block" : "none"};
          display: block;
        }
      }
    }
    > div:nth-of-type(3) {
      > div {
        background-color: ${(props) =>
          props.checkDateUndefined ? "#0933b3" : "#999999"};
        // background-color: #999999;
        > img {
          // display: ${(props) =>
            props.checkDateUndefined ? "block" : "none"};
          display: block;
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
  }
`;

const Request = styled.div`
  width: 1200px;
  // display: ${(props) => (props.checkFileUpload ? "static" : "none")};
  background-color: #f6f6f6;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 26px 24px 22px 24px;
  box-sizing: border-box;
  margin-bottom: 40px;
  margin-top: 16px;
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

    > span:last-child {
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
  // > div:nth-of-type(2) {
  //    width: 600px;
  //    height: 180px;
  //    border: 3px solid green;
  //    position: absolute;
  //    top: 13%;
  //    left: 70px;
  //    background-color: #ffffff;
  // }
  > textarea {
    resize: none;
    border: 1px solid #ffffff;
    width: 100%;
    padding: 14px 16px;
    margin-top: 12px;
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

const Reference = styled.div`
  // display: ${(props) => (props.checkFileUpload ? "static" : "none")};
  width: 1200px;
  background-color: #f6f6f6;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 24px 24px 22px 24px;
  box-sizing: border-box;
  margin-bottom: 60px;

  > span:nth-of-type(1) {
    font-size: 16px;
    line-height: 40px;
    letter-spacing: -0.4px;
    color: #86888c;
  }

  > div:nth-of-type(1) {
    border: 1px solid #ffffff;
    background-color: #ffffff;
    position: relative;
  }
`;