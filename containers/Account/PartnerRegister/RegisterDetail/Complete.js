import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import Router from "next/router";
import Buttonv1 from "components/Buttonv1";
import { inject, observer } from "mobx-react";

const submitimg = "/static/images/partnerregister/complete.png";

@inject("Category")
@observer
class RequestComplete extends React.Component {
  // 추가 견적 요청했을 때
  async componentDidMount() {
    const { Category } = this.props;

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
            <span style={{ color: "#0933b3" }}>파트너 등록이 완료</span>
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
            등록하신 정보를 통해 파트너님에게 고객이 의뢰를 요청할 수 있습니다.
            <br />
            수정은 '마이페이지-계정 설정-프로필 수정' 또는 '파트너 등록'에서 가능합니다.
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
            * 프로필 완성도가 높을수록 고객과 매칭될 확률이 높아집니다!
          </span>
          <Button
            onClick={() => Router.push("/project")}
            style={{ background: "#0933b3", marginTop: 12, marginBottom: 10 }}
          >
            프로젝트 둘러보기
          </Button>
          <Button
            onClick={() => Router.push("/partnerregister")}
            style={{ marginBottom: 300 }}
          >
            수정하기
          </Button>
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
