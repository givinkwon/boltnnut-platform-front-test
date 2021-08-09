import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import FileComponent from "./AddFile";

import * as Text from "components/Text";
import Buttonv1 from "components/Buttonv1";

const addButtonImg = "static/images/components/Input2/Mask.png";
const plusImg = "/static/images/signup/plus.svg";
const closeImg = "/static/images/signup/close.svg";

@inject("Auth", "Answer", "Partner", "Profile")
@observer
class Authentication extends React.Component {
  state = {
    modalOn: false,
  };

  modalHandler = () => {
    if (this.state.modalOn) {
      this.setState({ modalOn: false });
      console.log(this.state.modalOn);
    } else {
      this.setState({ modalOn: true });
      console.log(this.state.modalOn);
    }
  };

  render() {
    const { Profile } = this.props;
    return (
      <>
        <Container>
          <Header>
            <Info>
              <div style={{ display: "flex" }}>
                <Name>회사 인증</Name>
                <Description>
                  인증을 할 경우 업체에 대한 신뢰도와 의뢰율이 2배이상
                  높아집니다.
                </Description>
              </div>
              <Certification
                active={this.state.modalOn}
                onClick={this.modalHandler}
              >
                인증하기
              </Certification>
            </Info>
            {/* <FileComponent file={true} content="인증하기" type="authentication" /> */}
          </Header>
          <Main>
            {Profile.authenticationFile && (
              <Item onClick={() => (Profile.authenticationFile = "")}>
                <div>{Profile.authenticationFile.name}</div>
                <img src={closeImg} />
              </Item>
            )}
          </Main>
          {/* <input
          type="file"
          multiple={"multiple"}
          fileName={"fileName[]"}
          style={{ display: "none" }}
          onChange={this.props.Partner.onChangeFile}
          id="inputFile"
          ref={this.file}
          value=""
          placeholder={"파일을 선택해 주세요."}
        /> */}

          {/* <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            console.log(this.file);
            this.file.current.click();
          }}
        >
          <img src={addButtonImg} />
        </div> */}
          {/* <Button>인증하기</Button> */}
        </Container>
      </>
    );
  }
  //       <Header>
  //         <Info>
  //           <Name>포트폴리오</Name>
  //           <Description>인증을 할 경우 업체에 대한 신뢰도와 의뢰율이 2배이상 높아집니다.</Description>
  //         </Info>

  //         <Button>파일 업로드하기</Button>
  //       </Header>

  //       <Main>사업자등록증 업로드</Main>
  //     </Container>
  //   );
  // }
}

export default Authentication;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //   justify-content: space-between;
  //   align-items: center;
  margin-top: 100px;
  margin-bottom: 120px;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.6px;
  color: #414550;
  font-weight: bold;
  margin-right: 12px;
`;

const Description = styled.div`
  font-size: 16px;
  line-height: 34px;
  letter-spacing: -0.4px;
  color: #555963;
  font-weight: normal;
`;

const Button = styled.button`
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.45px;
  color: #0933b3;
  font-weight: 600;
  background-color: #ffffff;
  border: none;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #e1e2e4;
  //   width: 100%;
  margin-bottom: 20px;
`;
const Main = styled.div`
  width: 100%;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.16);
  height: 406px;
  padding: 20px 10px;
  box-sizing: border-box;
`;
const Item = styled.div`
  display: inline-flex;
  border-radius: 20px;
  align-items: center;
  background-color: #f6f6f6;
  height: 34px;
  padding: 6px 12px 6px 16px;
  box-sizing: border-box;
  margin-right: 15px;
`;

const Certification = styled.div`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.45px;
  text-align: left;
  color: #0933b3;
  cursor: pointer;
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  position: fixed;
  opacity: 0.9;
`;

const Modal = styled.div`
  width: 504px;
  height: 293px;
  padding: 28px 61px 241px 18px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  position: fixed;
  border-radius: 3px;
`;

const ModalButtonBox = styled.div``;

const ModalButton1 = styled(Buttonv1)`
  width: 230px !important;
  height: 48px !important;
  border-radius: 5px !important;
  font-size: 18px;
  line-height: 1.89;
  letter-spacing: -0.45px;
`;

const ModalButton2 = styled(Buttonv1)`
  width: 230px !important;
  height: 48px !important;
  border-radius: 5px !important;
  font-size: 18px;
  line-height: 1.89;
  letter-spacing: -0.45px;
`;
