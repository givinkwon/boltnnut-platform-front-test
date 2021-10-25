import React from "react";
import styled from "styled-components";
import * as Title from "components/Title";

const bluedot = "static/images/bluedot.svg";
const stepimg1 = "/static/images/Home/step1.png";
const stepimg2 = "/static/images/Home/step2.svg";
const stepimg3 = "/static/images/Home/step3.svg";

class MobileBanner3Container extends React.Component {
  state = {
    stepBoxIndex: 0,
    stepImgIndex: 0,
    stepImgActive: false,
  };

  onClickStepBox = (idx) => {
    this.setState({ stepBoxIndex: idx, stepImgIndex: idx, stepImgActive: true });
  };

  onCompareStepBox = (idx) => {
    if (this.state.stepBoxIndex === idx) {
      return true;
    } else {
      return false;
    }
  };

  onChangeStepImage = () => {
    if (this.state.stepImgIndex === 0) {
      return stepimg1;
    } else if (this.state.stepBoxIndex === 1) {
      return stepimg2;
    } else if (this.state.stepBoxIndex === 2) {
      return stepimg3;
    }
  };

  render() {
    const stepBoxArray = ["Step1", "Step2", "Step3"];

    return (
      <Container>
        <InnerBox>
          <Title20>CNC 가공 부품 발주까지 단, 3분</Title20>
          <Title20>도면 업로드 | 견적과 납기 확인 | 발주 요청</Title20>

          <StepContainer>
            {stepBoxArray.map((v, idx) => (
              <StepBox onClick={() => this.onClickStepBox(idx)} active={this.onCompareStepBox(idx)}>
                <Title12 active={this.onCompareStepBox(idx)}>{v}</Title12>
                <BlueDotImg src={bluedot} active={this.onCompareStepBox(idx)} />
              </StepBox>
            ))}
          </StepContainer>

          <img src={this.onChangeStepImage()} />

          {this.state.stepBoxIndex === 0 ? (
            <>
              <Title18 style={{ marginTop: "32px" }}>3D 도면 업로드</Title18>
              <Title15 style={{ marginTop: "8px" }}>STEP, STP 등 3D 도면 업로드</Title15>
              <Title15>* 2D 도면도 업로드 가능</Title15>
            </>
          ) : this.state.stepBoxIndex === 1 ? (
            <>
              <Title18 style={{ marginTop: "32px" }}>견적과 납기 확인</Title18>
              <Title15 style={{ marginTop: "8px" }}>AI 견적과 납기를 확인하고</Title15>
              <Title15>발주를 요청해보세요.</Title15>
            </>
          ) : (
            <>
              <Title18 style={{ marginTop: "32px" }}>발주 요청</Title18>
              <Title15 style={{ marginTop: "8px" }}>배송 정보 입력 후 발주 요청!</Title15>
              <Title15>* 연구비/지원금은 후불 요청도 가능</Title15>
            </>
          )}

          {/* {textArray.map((v, idx) => (
            <>
              <Title18 style={{ marginTop: "32px" }} active={this.onCompareStepBox(idx) }>
                {v.title}
              </Title18>
              <Title15 style={{ marginTop: "18px" }} active={this.onCompareStepBox(idx)}>
                {v.desc1}
              </Title15>
              <Title15 style={{ marginBottom: "70px" }} active={this.onCompareStepBox(idx)}>
                {v.desc2}
              </Title15>
            </>
          ))} */}
        </InnerBox>
      </Container>
    );
  }
}

export default MobileBanner3Container;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const InnerBox = styled.div`
  width: 346px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title20 = styled(Title.FontSize20)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: -0.5px;
  color: #111111;
`;

const Title12 = styled(Title.FontSize12)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.3px;
  color: ${(props) => (props.active ? "#282c36" : "#8d8d8e")};
`;

const Title18 = styled(Title.FontSize18)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.22;
  letter-spacing: -0.45px;
  color: #000000;
`;

const Title15 = styled(Title.FontSize15)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: -0.38px;
  color: #555963;
`;

const StepContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
`;

const StepBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70px;
  cursor: pointer;
`;

const BlueDotImg = styled.img`
  width: 5px;
  height: 5px;
  margin-top: 6px;
  display: ${(props) => (props.active ? "inline-block" : "none")};
`;
