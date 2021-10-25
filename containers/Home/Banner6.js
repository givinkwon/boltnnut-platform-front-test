import React from "react";
import styled from "styled-components";
import Background from "../../components/Background";
import Button from "../../components/Button";

class Banner6Container extends React.Component {
  render() {
    return (
      <CustomBackground>
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Font29>발품 파는 오프라인 가공 발주 이제 그만!</Font29>
            <Font25>
            AI 견적으로 제조 부품 바로발주 
            </Font25>
          </div>

          <a href={"autoestimate"}>
            <RequestButton>바로발주 시작하기</RequestButton>
          </a>
        </Container>
      </CustomBackground>
    );
  }
}

export default Banner6Container;

const CustomBackground = styled(Background)`
  display: flex;
  justify-content: center;
  height: 352px;
  background-image: url("/static/images/Banner6BackgroundImg.png");
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Font29 = styled.p`
  font-family: NotoSansCJKkr;
  font-size: 29px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.72;
  letter-spacing: -0.73px;
  color: #1e2222;
`;

const Font25 = styled.p`
  font-family: NotoSansCJKkr;
  font-size: 25px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: -0.63px;
  color: #000000;
`;

const RequestButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 224px !important;
  height: 58px;
  margin-top: 46px;
  border-radius: 29px;
  border: solid 2px #0933b3;
  background: none;
  cursor: pointer;

  font-size: 20px !important;
  font-weight: 500;
  font-style: normal;
  color: #0933b3;

  :hover {
    background-color: #edf4fe;
  }
`;
