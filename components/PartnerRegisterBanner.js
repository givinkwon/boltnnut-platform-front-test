import React from "react";
import styled, { css } from "styled-components";
import * as Content from "components/Content";

const signupDotImg = "/static/icon/SignupMain.svg";

class PartnerRegisterBanner extends React.Component {
  render() {
    return (
      <ItemBox>
        <img style={{ marginBottom : '20px' }} src={signupDotImg} />
        <Font32>
          <span>추가정보를 입력</span>해주세요.
        </Font32>
        <Font19>
          고객이 제조사를 찾을 때 확인하는 정보입니다. 최대한 빠짐없이
          체크해주세요.
        </Font19>
      </ItemBox>
    );
  }
}

export default PartnerRegisterBanner;

const ItemBox = styled.div`
  margin-top: 80px;
  margin-bottom: 61px;
`;

const Font32 = styled(Content.FontSize32)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.06;
  letter-spacing: -0.8px;
  text-align: center;
  color: #282c36;

  > span {
    color: #0933b3;
  }
`;

const Font19 = styled(Content.FontSize19)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.79;
  letter-spacing: -0.48px;
  text-align: center;
  color: #000;
`;

