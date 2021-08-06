import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import * as Text from "components/Text";
import Button from "../../../components/Button";

const bluedot = "static/images/bluedot.svg";
const stepimg1 = "/static/images/stepimg1.png";
const stepimg2 = "/static/images/stepimg2.svg";
const stepimg3 = "/static/images/stepimg3.png";

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
          <Title20>"이 제품 만드는 공장 없나요?"</Title20>
          <Title20>볼트앤너트에서 내 제품 분야에 꼭 맞는</Title20>
          <Title20>업체를 찾아보세요.</Title20>

          <StepContainer>
            {stepBoxArray.map((v, idx) => (
              <StepBox onClick={() => this.onClickStepBox(idx)} active={this.onCompareStepBox(idx)}>
                <Title12 active={this.onCompareStepBox(idx)}>{v}</Title12>
                <BlueDotImg src={bluedot} active={this.onCompareStepBox(idx)} />
              </StepBox>
            ))}
          </StepContainer>

          <img src={this.onChangeStepImage()} style={{ width: "346px", height: "205px", marginTop: "18px" }} />

          {this.state.stepBoxIndex === 0 ? (
            <>
              <Title18 style={{ marginTop: "32px" }}>제조사 찾기</Title18>
              <Title15 style={{ marginTop: "18px" }}>한번의 검색으로 제품제 맞는</Title15>
              <Title15 style={{ marginBottom: "70px" }}>카테고리의 제조사를 찾아보세요.</Title15>
            </>
          ) : this.state.stepBoxIndex === 1 ? (
            <>
              <Title18 style={{ marginTop: "32px" }}>제조사에 의뢰하기</Title18>
              <Title15 style={{ marginTop: "18px" }}>제조사를 비교하고 간단한 양식에</Title15>
              <Title15 style={{ marginBottom: "70px" }}>맞춰 견적 요청서를 작성해 보세요.</Title15>
            </>
          ) : (
            <>
              <Title18 style={{ marginTop: "32px" }}>제조사와 직접 채팅하기</Title18>
              <Title15 style={{ marginTop: "18px" }}>제조사에게 견적 요청서를 자세히</Title15>
              <Title15 style={{ marginBottom: "70px" }}>상담받고 견적을 조율해 보세요.</Title15>
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
  margin-top: 70px;
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
