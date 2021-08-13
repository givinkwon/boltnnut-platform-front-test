import React from "react";
import styled from "styled-components";

import Container from "components/Containerv1";
import Background from "components/Background";

import Buttonv1 from "components/Buttonv1";

const arrow_bottom = "static/images/request/arrow_bottom.svg";

class RequestMain extends React.Component {
  render() {
    return (
      <Background>
        <Container>
          <Body>
            <Header>자주 묻는 클라이언트 질문</Header>
            <QnABox>
              <QnASubBox>
                <span>
                  <span
                    style={{
                      color: "#174aee",
                      fontWeight: "bold",
                      marginRight: 14,
                    }}
                  >
                    Q
                  </span>
                  볼트앤너트 의뢰 방식이 두 가지인 이유는 무엇인가요?{" "}
                </span>
                <img src={arrow_bottom} />
              </QnASubBox>
              <QnASubBox>
                <span>
                  <span
                    style={{
                      color: "#174aee",
                      fontWeight: "bold",
                      marginRight: 14,
                    }}
                  >
                    Q
                  </span>
                  프로젝트 등록 시 정보가 유출될 우려는 없나요?
                </span>
                <img src={arrow_bottom} />
              </QnASubBox>
              <QnASubBox>
                <span>
                  <span
                    style={{
                      color: "#174aee",
                      fontWeight: "bold",
                      marginRight: 14,
                    }}
                  >
                    Q
                  </span>
                  프로젝트 등록 이후 수정 및 삭제 어떻게 하나요?
                </span>
                <img src={arrow_bottom} />
              </QnASubBox>
              <QnASubBox>
                <span>
                  <span
                    style={{
                      color: "#174aee",
                      fontWeight: "bold",
                      marginRight: 14,
                    }}
                  >
                    Q
                  </span>
                  볼트앤너트 유선 상담 시에는 어떤 도움을 받을 수 있나요?
                </span>
                <img src={arrow_bottom} />
              </QnASubBox>
              <QnASubBox>
                <span>
                  <span
                    style={{
                      color: "#174aee",
                      fontWeight: "bold",
                      marginRight: 14,
                    }}
                  >
                    Q
                  </span>
                  의뢰 서비스를 이용하려면 별도의 비용이 필요한가요?
                </span>
                <img src={arrow_bottom} />
              </QnASubBox>
            </QnABox>
          </Body>
        </Container>
      </Background>
    );
  }
}

export default RequestMain;

const Body = styled.div`
  width: 100%;
  height: 893px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: NotoSansCJKkr;
`;

const Header = styled.span`
  font-size: 32px;
  line-height: 2.5;
  letter-spacing: -0.8px;
  color: #000;
`;

const QnABox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
`;

const QnASubBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 19px;
  line-height: 4.21;
  letter-spacing: -0.48px;
  color: #1e2222;
  padding-right: 32px;
  padding-left: 30px;
  cursor: pointer;
  &:hover {
    border-radius: 10px;
    background-color: #edf4fe;
  }
`;
