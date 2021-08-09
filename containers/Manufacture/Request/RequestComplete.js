import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import Router from "next/router";
import Buttonv1 from "components/Buttonv1";

const submitimg = "./static/images/request/submitimg.svg";

class RequestComplete extends React.Component {
  // 추가 견적 요청했을 때
  additionalrequest = () => {
    alert("해당 서비스는 준비중입니다. 추가 견적을 원하시면 고객센터로 연락해주세요")
    Router.push("/")
  }


  render() {
    return (
      <>
        <Content>
          <img
            src={submitimg}
            style={{ marginTop: 80, width: 296, height: 296 }}
          ></img>
          <Title>
            {/* 제조사에 직접 견적 요청 */}
            <span style={{ color: "#0933b3" }}>견적 요청이 완료</span>
            {/* 프로젝트 의뢰 & 맞춤형 문의 견적 요청 */}
            <span style={{ color: "#0933b3" }}>요청이 완료</span>
            되었습니다.
          </Title>
          <span
            style={{
              fontSize: 22,
              letterSpacing: -0.55,
              color: "#1e2222",
              textAlign: "center",
              lineHeight: 1.64,
            }}
          >
            더 다양하고 빠른 견적을 받기 위해 볼트앤너트에서
            <br />
            검증된 제조사로부터 추가적인 견적을 받아보시겠습니까?{" "}
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: -0.4,
              color: "#a4aab4",
              marginTop: 70,
            }}
          >
            * 카카오톡으로 제조사의 견적을 무료로 받아 볼 수 있습니다.
          </span>
          <Button onClick={() => this.additionalrequest()}
            style={{ background: "#0933b3", marginTop: 12, marginBottom: 10 }}
          >
            확인
          </Button>
          <Button onClick={() => Router.push("/")} style={{ marginBottom: 300 }}>이전 페이지로</Button>
        </Content>
      </>
    );
  }
}

export default RequestComplete;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: NotoSansCJKkr;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 500;
  line-height: 1.06;
  letter-spacing: -0.8px;
  color: #1e2222;
  margin-bottom: 60px;
`;

const Button = styled(Buttonv1)`
  width: 228px !important;
  height: 48px !important;
  background-color: #c6c7cc;
  box-shadow: none;
  font-size: 18px;
  line-height: 1.89;
  letter-spacing: -0.45px;
`;
