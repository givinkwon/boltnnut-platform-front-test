import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import * as Title from "../../components/Title";
import * as Text from "../../components/Text";
import { inject, observer } from "mobx-react";
import Background from "../../components/Background";

// Images
const stepimg1 = "/static/images/Home/step1web.png";
const stepimg2 = "/static/images/Home/step2.svg";
const stepimg3 = "/static/images/Home/step3.svg";
const backgroundlogo = "/static/images/backgroundlogo.svg";

@inject("Home")
@observer
class Banner4Container extends React.Component {
  state = {
    stepBoxIndex: 0,
    stepImgIndex: 0,
    stepImgActive: false,
  };

  onClickStepBox = (idx) => {
    this.setState({
      stepBoxIndex: idx,
      stepImgIndex: idx,
      stepImgActive: true,
    });
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
    const stepBoxArray = [
      {
        step: "Step1",
        title: "제조사 찾기",
        desc1: "한번의 검색으로 제품에 맞는",
        desc2: "카테고리의 제조사를 찾아보세요.",
      },
      {
        step: "Step2",
        title: "제조사에 의뢰하기",
        desc1: "제조사를 비교하고 간단한 양식에",
        desc2: "맞춰 견적 요청서를 작성해 보세요.",
      },
      {
        step: "Step3",
        title: "제조사와 직접 채팅하기",
        desc1: "제조사에게 견적 요청서를 자세히",
        desc2: "상담받고 견적을 조율해 보세요.",
      },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <CustomContainer>
          <Containerv1 style={{ justifyContent: "center", flexDirection: "column" }}>
            <InnerContainer>
              <Title32>"저희 사무실 근처에 이런 제품 만드는 공장이 없나요?"</Title32>
              <Title32>볼트앤너트 플랫폼에서 내 제품 분야에 꼭 맞는 업체를 찾아보세요.</Title32>
            </InnerContainer>

            <StepContainer>
              <img style={{ width: "750px", height: "460px" }} src={this.onChangeStepImage()} />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {stepBoxArray.map((v, idx) => (
                  <StepBox onClick={() => this.onClickStepBox(idx)} active={this.onCompareStepBox(idx)}>
                    <Text13 active={this.onCompareStepBox(idx)}>{v.step}</Text13>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "25px",
                      }}
                    >
                      <Text22>{v.title}</Text22>
                      <Text17>{v.desc1}</Text17>
                      <Text17 style={{ marginTop: 0 }}>{v.desc2}</Text17>
                    </div>
                  </StepBox>
                ))}
              </div>
            </StepContainer>
          </Containerv1>
        </CustomContainer>

        <BackgroundLogo src={backgroundlogo} />
      </div>
    );
  }
}

export default Banner4Container;

const CustomContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 140px;
  margin-bottom: 30px;
`;

const BackgroundLogo = styled.img`
  height: 121px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title32 = styled(Title.FontSize32)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: -0.8px;
  color: #000000;
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
`;

const StepBox = styled.div`
  display: inline-flex;
  justify-content: space-around;
  width: 384px;
  height: 156px;
  margin-top: 17px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: ${(props) => (props.active ? "4px 5px 20px 0 rgba(0, 0, 0, 0.16)" : "none")};
  background-color: ${(props) => (props.active ? "#ffffff" : "#eeeeee")};

  :hover {
    box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
  }
`;

const Text13 = styled(Text.FontSize13)`
  margin-top: 35px;
  height: 19px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.54;
  letter-spacing: -0.33px;
  color: ${(props) => (props.active ? "#0933b3" : "#999999")};
`;

const Text22 = styled(Text.FontSize22)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.82;
  letter-spacing: -0.55px;
  color: #000000;
`;

const Text17 = styled(Text.FontSize17)`
  width: 261px;
  margin-top: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: -0.43px;
  color: #555963;
`;
