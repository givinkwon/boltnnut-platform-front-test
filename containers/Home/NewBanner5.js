import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "../../components/Background";
import * as Title from "../../components/Title";
import * as Text from "../../components/Text";
import Fade from "react-reveal/Fade";

class NewBanner5Container extends React.Component {
  render() {
    return (
      <CustomBackground>
        <Fade bottom>
          <Container>
            <Title32>클라이언트 분들께 검증된 볼트앤너트를 만나보세요.</Title32>

            <ReviewContainer>
              <ReviewBox>
                <div style={{ width: "324px" }}>
                  <Text16>HCLAB</Text16>
                  <Text22>
                    개발 업체 찾는기간이
                    <br /> 3달이 단축됐습니다.
                  </Text22>
                  <Text18>
                    처음에는 100개 정도만 양산을 할 생각으로 여러 업체를 찾아다녔는데 괜찮은 업체를 찾기가 정말 힘들었습니다. 업체들과 미팅을 할 때 제조 관련 용어를 몰라 힘이 들었는데, 볼트앤너트를
                    통해 실질적으로 도움이 되는 다양한 제조 지식을 얻을 수 있었습니다. 무엇보다도 볼트앤너트를 통해 좋은 업체들을 만난 것이 가장 큰 도움이 되었습니다.
                  </Text18>
                </div>
              </ReviewBox>

              <ReviewBox>
                <div style={{ width: "324px" }}>
                  <Text16>끌리다</Text16>
                  <Text22>
                    단순히 제조사들과의 연결이
                    <br />
                    아닌 고민을 함께 나누어 줍니다.
                  </Text22>
                  <Text18>
                    처음 제조, 설계 등을 하려고 하다 보니 모르는게 너무 많았습니다. 볼트앤너트는 단순히 설계를 해주고 제조사들과의 연결만 해주는 것이 아니라 함께 고민을 나누어 준다는 것이 너무
                    감사했고, 만족스러웠습니다. 혼자만 생각하는 아이디어는 실수나 부족한 부분이 있기 마련인데 함께 고민할 수 있어서 정말 든든했습니다.
                  </Text18>
                </div>
              </ReviewBox>

              <ReviewBox>
                <div style={{ width: "324px" }}>
                  <Text16>HCLAB</Text16>
                  <Text22>
                    비전문가도 쉽게
                    <br />
                    소통할 수 있게 도와줍니다.
                  </Text22>
                  <Text18>
                    철이나 알루미늄 소재를 이용하여 비정형의 제품 용기를 만들고 싶은데, 오프라인 업체는 한계가 있고 비전문가다보니 소통이 쉽지 않습니다. 볼트앤너트에서 업체를 찾다가 '맞춤형 문의'를
                    하였는데, 일반인의 수준에 맞추어 설명을 해주시고, 또 모르기에 의뢰할 수 있는 것들에 대해 단호하게 거절하기 보다는 충분히 고려를 해주신다는 점이 큰 장점 같습니다.
                  </Text18>
                </div>
              </ReviewBox>
            </ReviewContainer>
          </Container>
        </Fade>
      </CustomBackground>
    );
  }
}

export default NewBanner5Container;

const CustomBackground = styled(Background)`
  height: 939px;
  background-color: #f6f6f6;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 140px;
`;

const Title32 = styled(Title.FontSize32)`
  font-size: 32px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: -0.8px;
  color: #555963;
`;

const ReviewContainer = styled.div`
  display: inline-flex;
  justify-content: space-around;
  width: 1200px;
  margin-top: 80px;
`;

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 384px;
  height: 532px;
  border-radius: 10px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
`;

const Text16 = styled(Text.FontSize16)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.4px;
  color: #0933b3;
`;

const Text18 = styled(Text.FontSize18)`
  margin-top: 48px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.45px;
  color: #86888c;
`;

const Text22 = styled(Text.FontSize22)`
  margin-top: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.64;
  letter-spacing: -0.55px;
  color: #1e2222;
`;
