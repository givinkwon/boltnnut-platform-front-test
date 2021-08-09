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
    addfile: false,
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

  fileHandler = () => {
    if (this.state.addfile) {
      this.setState({ addfile: false });
    } else {
      this.setState({ addfile: true });
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
              {this.state.modalOn ? (
                <ModalBackground>
                  <Modal>
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 500,
                        letterSpacing: -0.6,
                        marginBottom: 30,
                      }}
                    >
                      회사 인증
                    </div>
                    <span
                      style={{
                        fontSize: 18,
                        lineHeight: 1.67,
                        letterSpacing: -0.45,
                        color: "#414550",
                        marginBottom: 30,
                      }}
                    >
                      안전한 활동을 위해 사업자 등록증 인증을 진행합니다. 인증이
                      완료되면 고객에게 인증마크가 보여지며, 인증을 할 경우
                      업체에 대한 신뢰도와 의뢰율이 2배이상 높아집니다.{" "}
                    </span>
                    <ModalButtonBox>
                      <ModalButton1
                        active={this.state.modalOn}
                        onClick={this.modalHandler}
                      >
                        나중에 할래요
                      </ModalButton1>
                      <ModalButton2>
                        <FileComponent
                          file={true}
                          content="인증하기"
                          type="authentication"
                        />
                      </ModalButton2>
                    </ModalButtonBox>
                  </Modal>
                </ModalBackground>
              ) : (
                <></>
              )}
            </Info>
          </Header>
          {Profile.authenticationFile && (
            <Main>
              <Item onClick={() => (Profile.authenticationFile = "")}>
                <div>{Profile.authenticationFile.name}</div>
                <img src={closeImg} />
              </Item>
            </Main>
          )}
        </Container>
      </>
    );
  }
}

export default Authentication;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : "")};
`;

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
  padding: 1px 6px;
  line-height: 1.5;
`;

const ModalBackground = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const Modal = styled.div`
  box-sizing: border-box;
  width: 504px;
  height: 293px;
  padding: 40px 32px 29px 32px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  // align-items: center;
  position: relative;
  border-radius: 3px;
`;

const ModalButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ModalButton1 = styled(Buttonv1)`
  width: 196px !important;
  height: 46px !important;
  border-radius: 5px !important;
  background-color: #e1e2e4;
  color: #a4aab4;
  font-size: 18px;
  box-shadow: none !important;
  line-height: 1.89;
  letter-spacing: -0.45px;
  margin-right: 15px;
`;

const ModalButton2 = styled(Buttonv1)`
  width: 196px !important;
  height: 46px !important;
  border-radius: 5px !important;
  font-size: 18px;
  box-shadow: none !important;
  line-height: 1.89;
  letter-spacing: -0.45px;
`;

const InputBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  border: solid 1px #ffffff;
  color: #404040;
  border-radius: 3px;
  box-sizing: border-box;
`;

const Input = styled.div`
  width: 100%;
  margin-top: ${(props) => props.marginTop}px;
  color: #404040;
  font-weight: 400;
  padding-left: 2.3%;
  :focus {
    outline: none;
  }
  > input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0 !important;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: -0.18px;
    text-align: left;
    font-size: 18px;
    :focus {
      outline: none;
    }
    ::placeholder {
      font-weight: 400;
      color: #c6c7cc;
    }
  }
`;
