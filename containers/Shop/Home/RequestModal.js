import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

const request_modal_img = "static/images/search/request_modal_img.png";

@inject("Sample")
@observer
class RequestModal extends React.Component {

  render() {
    const { Sample, width } = this.props;

    return (
      <>
        {width && width > 767.99 ? (
          <ModalBox
            style={{ display: Sample.modal_open ? "block" : "none" }}
          >
            {Sample.modal_open ? (
              <>
                <button className="close" onClick={() => Sample.closeModal()}>
                  {" "}
                  &times;{" "}
                </button>
                <aside>
                  {width > 1800 && <img src={request_modal_img} />}
                </aside>
                <section>
                  <header>
                    <span>샘플 및 제품정보를 받으실 연락처를 입력해주세요.</span>
                    <span>
                      
                    </span>
                  </header>
                  <main>
                    <ContainerV2>
                      <Title>
                        <span>이메일</span>
                        <div>
                          <input
                            placeholder="이메일을 입력해주세요."
                            onChange={(e) => {
                              Sample.email = e.target.value;
                            }}
                          />
                        </div>
                      </Title>
                      <Title>
                        <span>전화번호</span>
                        <div>
                          <input
                            placeholder="전화번호를 입력해주세요."
                            onChange={(e) => {
                                Sample.phone = e.target.value;
                            }}
                          />
                        </div>
                      </Title>
                      <Title>
                        <span>회사명</span>
                        <div>
                          <input
                            placeholder="회사명을 입력해주세요."
                            onChange={(e) => {
                                Sample.company = e.target.value;
                            }}
                          />
                        </div>
                      </Title>
                      <Title>
                        <span>내용</span>
                        <div>
                          <input
                            placeholder="요청 내용을 입력해 주세요. :  구매 요청 및 문의 사항 등"
                            onChange={(e) => {
                                Sample.content = e.target.value;
                            }}
                          />
                        </div>
                      </Title>
                    </ContainerV2>
                  </main>
                  <footer>
                    <div
                      onClick={(e) => {
                        Sample.submit()
                      }}
                    >
                      <span>샘플 및 제품정보 요청</span>
                    </div>
                  </footer>
                </section>
              </>
            ) : null}
          </ModalBox>
        ) : (
          <MobileContainer>
            <>
              <section>
                <main>
                  <ContainerV2>
                    <Title>
                      <span>내용</span>
                      <div>
                        <input
                          placeholder="요청 내용을 입력해 주세요. :  구매 요청 및 문의 사항 등"
                          onChange={(e) => {
                              Sample.content = e.target.value;
                          }}
                        />
                      </div>
                    </Title>
                    <Email>
                      <span>회사명</span>
                      <div>
                        <input
                          placeholder="회사명을 입력해주세요."
                          onChange={(e) => {
                              Sample.company = e.target.value;
                          }}
                        />
                      </div>
                    </Email>
                    <Email>
                      <span>이메일</span>
                      <div>
                        <input
                          placeholder="이메일을 입력해주세요."
                          onChange={(e) => {
                            Sample.email = e.target.value;
                          }}
                        />
                      </div>
                    </Email>
                    <Email>
                      <span>전화번호</span>
                      <div>
                        <input
                          placeholder="전화번호를 입력해주세요."
                          onChange={(e) => {
                              Sample.phone = e.target.value;
                          }}
                        />
                      </div>
                    </Email>
                  </ContainerV2>
                </main>
                <footer>
                  <div
                    onClick={() => {
                      Sample.modal_open = false
                    }}
                  >
                    <span>취소</span>
                  </div>

                  <div
                    onClick={(e) => {
                        Sample.submit()
                    }}
                  >
                    <span>샘플|제품정보 요청</span>
                  </div>
                </footer>
              </section>
            </>
          </MobileContainer>
        )}
      </>
    );
  }
}

export default RequestModal;

const ContainerV2 = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;

  // height: 400px;
  width: 95%;

  padding-left: 48px;
  padding-right: 48px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 16px;
    width: 100%;
    padding-left: 0px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    justify-content: center;
    width: 95%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    justify-content: center;
    width: 95%;
  }
  @media (min-width: 1300px) {
    justify-content: center;
    // width: 1200px;
  }
`;

const MobileContainer = styled.div`
  margin-bottom: 64px;
  > aside {
    position: absolute;
    top: 90px;
    right: 60px;
  }
  > section {
    padding: 0 10px;
    max-width: 100%;
    // width: 90%;
    // height: 40%;

    > header {
      position: relative;
      padding: 8px;

      // font-weight: 500;

      font-size: 16px;
      margin-bottom: 0;
    }
    > main {
      height: 95%;
      font-size: 16px;
      // font-weight: 500;
    }
    > footer {
      height: 40px;
      margin-top: 0px;

      display: flex;
      justify-content: center;
      align-items: center;

      //   text-align: center;
      width: 100%;

      > div:nth-of-type(1) {
        background-color: #a4aab4;
        margin-right: 11px;
      }
      > div:nth-of-type(2) {
        background-color: #0933b3;
      }

      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        // border: 2px solid #0933b3;
        border-radius: 5px;
        // background-color: #ffffff;
        color: #ffffff;
        width: 160px;
        height: 44px;
        cursor: pointer;
        > span {
          font-size: 16px;
          line-height: 52px;
          letter-spacing: -0.4px;
        }
      }
    }
  }
  > button {
    font-size: 14px;
    margin: 10px 10px 0 0;
  }
`;

const ModalBox = styled.div`
  // display: none;
  position: fixed;
  top: 20%;
  right: 25%;
  bottom: 0;
  left: 25%;
  z-index: 101;
  background-color: white;
  height: 60%;
  width: 50% !important;
  box-shadow: 0 0 1px 0 rgb(0 0 0 / 40%);
  border-radius: 10px;
  padding-bottom: 48px;
  box-sizing: border-box;
  > aside {
    position: absolute;
    top: 190px;
    right: 100px;
  }
  > section {
    // max-width: 900px;
    width: 100%;
    // height: 90%;
    margin: 0 auto;
    border-radius: 0.3rem;
    //background-color: blanchedalmond;
    //border: 1px solid blue;
    > header {
      position: relative;
      // padding: 16px;
      // padding: 72px 16px 16px 16px;
      padding-top: 72px;
      //padding-top: 0;
      //background-color: #f1f1f1;
      // font-weight: 700;
      // margin-bottom: 30px;
      text-align: center;
      //   border-bottom: 3px solid #f1f1f1;
      // font-size: 30px;
      z-index: -1;
      margin-bottom: 60px;
      > span {
        color: #282c36;
        display: block;
      }
      > span:nth-of-type(1) {
        font-size: 24px;
        line-height: 40px;
        letter-spacing: -0.6px;

        font-weight: bold;
      }
      > span:nth-of-type(2) {
        font-size: 18px;
        line-height: 34px;
        letter-spacing: -0.45px;
        font-weight: normal;
      }
    }
    > main {
      background-color: white;
      font-color: white;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      // height: 85%;
      font-size: 20px;
      // font-weight: 600;
    }
    > footer {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;

      //   text-align: center;
      width: 100%;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #0933b3;
        border-radius: 5px;
        background-color: #ffffff;
        color: #0933b3;
        width: 200px;
        height: 50px;
        cursor: pointer;
        > span {
          font-size: 18px;
          line-height: 28px;
          letter-spacing: -0.45px;
        }
      }
    }
  }
  button {
    outline: none;
    cursor: pointer;
    border: 0;

    font-size: 21px;
    font-weight: 700;
    //margin-left: 10px;
    margin: 10px 10px 0 0;
    float: right;
    color: #000000;
    border-radius: 50%;
    background-color: #f1f1f1;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    position: fixed;
    padding-bottom: 12px;
    z-index: 101;

    // height: 180px;
    width: 90%;

    > section {
      padding: 0 10px;
      max-width: 100%;
      width: 90%;
      height: 40%;

      > header {
        position: relative;
        padding: 8px;

        font-weight: 500;

        font-size: 16px;
        margin-bottom: 0;
      }
      > main {
        height: 95%;
        font-size: 16px;
        font-weight: 500;
      }
      > footer {
        height: 40px;
        margin-top: 0px;

        > div {
          width: 180px;
          height: 30px;
          > span {
            font-size: 14px;
            line-height: 28px;
            letter-spacing: -0.45px;
            color: #ffffff;
          }
        }
      }
    }
    > button {
      font-size: 14px;
      margin: 10px 10px 0 0;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 95%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;

const Title = styled.div`
  margin-bottom: 24px;
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 100px;
    text-align: left;
  }
  > div {
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.45px;
    color: #282c36;
    width: 500px;
    height: 44px;
    border: solid 1px #c6c7cc;
    border-radius: 3px;
    padding: 4px;
    box-sizing: border-box;
    > input {
      width: 97%;
      // padding: 4px;
      outline: none;
      border: none;
      font-size: 18px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.45px;
      color: #282c36;
      line-height: 34px;
      ::placeholder {
        font-size: 14px;

        color: #c1bfbf;
      }
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 32px;
    > span {
      font-size: 12px;
      width: 50px;
    }
    > div {
      height: 35px;
      width: 80%;
      > input {
        font-size: 12px;
        line-height: 0px;
        ::placeholder {
          font-size: 11px;
        }
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    display: flex;
    align-items: center;
    > span {
      font-size: 16px;
      width: 80px;
    }
    > div {
      width: 80%;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    display: flex;
    align-items: center;
    > div {
      width: 80%;
    }
  }
  @media (min-width: 1300px) {
    display: flex;
    align-items: center;
  }
`;

const Email = styled.div`
  margin-bottom: 24px;
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 100px;
    text-align: left;
  }
  > div {
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.45px;
    color: #282c36;
    width: 275px;
    height: 44px;
    border: solid 1px #c6c7cc;
    border-radius: 3px;
    padding: 4px;
    box-sizing: border-box;
    > input {
      width: 90%;
      // padding: 4px;
      outline: none;
      border: none;
      font-size: 18px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.45px;
      color: #282c36;
      line-height: 34px;
      ::placeholder {
        font-size: 14px;
        color: #c1bfbf;
      }
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 32px;
    > span {
      font-size: 12px;
      width: 50px;
    }
    > div {
      height: 35px;
      width: 80%;
      > input {
        font-size: 12px;
        line-height: 0px;
        width: 97%;
        ::placeholder {
          font-size: 11px;
        }
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    display: flex;
    align-items: center;
    > span {
      width: 80px;
      font-size: 16px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    display: flex;
    align-items: center;
  }
  @media (min-width: 1300px) {
    display: flex;
    align-items: center;
  }
`;

const Phone = styled.div`
  margin-bottom: 24px;
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 100px;
    text-align: left;
  }
  > div {
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.45px;
    color: #282c36;
    width: 209px;
    height: 44px;
    border: solid 1px #c6c7cc;
    border-radius: 3px;
    padding: 4px;
    box-sizing: border-box;
    > input {
      width: 90%;
      // padding: 4px;
      outline: none;
      border: none;
      font-size: 18px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.45px;
      color: #282c36;
      line-height: 34px;
      ::placeholder {
        font-size: 14px;
        color: #c1bfbf;
      }
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 32px;
    > span {
      font-size: 12px;
      width: 50px;
    }
    > div {
      height: 35px;
      width: 80%;
      > input {
        font-size: 12px;
        line-height: 0px;
        width: 97%;
        ::placeholder {
          font-size: 11px;
        }
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    display: flex;
    align-items: center;
    > span {
      width: 80px;
      font-size: 16px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    display: flex;
    align-items: center;
  }
  @media (min-width: 1300px) {
    display: flex;
    align-items: center;
  }
`;
