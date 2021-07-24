import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import StarRatingComponent from "react-star-rating-component";

const banner4score = "static/images/banner4score.svg";

class MobileBanner4Container extends React.Component {
  state = {
    rating: 1,
  };

  render() {
    const review = [
      {
        name: "TAJO",
        desc: "비전문가다보니 업체 찾고 소통하기가 쉽지 않았습니다. 지인 소개를 통해 볼트앤너트를 알게 되어 문의를 드렸는데 그런 취약점을 잘 채워주시는 것 같아 감사드립니다.",
        date: "2020.08.30",
      },
      {
        name: "HCLab",
        desc: "처음에는 100개 정도만 양산을 할 생각으로 여러 업체를 찾아다녔는데 괜찮은 업체를 찾기가 정말 힘들었습니다. 업체들과 미팅을 할 때 제조 관련 용어를 몰라 힘들었는데, 볼트앤너트를 통해... ",
        date: "2020.06.25",
      },
      {
        name: "1인 기업",
        desc: "업체 찾기가 힘들었는데 담당자분께서 본인 프로젝트처럼 대응해주시고 업체와 미팅에도 동석하여 직접 말하기 어려운 부분을 업체와 소통해주는 부분이 가장 마음에 들었습니다.",
        date: "2021.07.20",
      },
      {
        name: "코스메틱 회사",
        desc: "볼트앤너트에서 업체를 찾다가 맞춤형 문의를 하였는데, 일반인의 수준에 맞추어 설명을 해주셨고, 또 제작이 불가능한 것들도 거절하지 않고 충분히 고려 해주신다는 점이 큰 장점 같습니다.",
        date: "2021.07.20",
      },
    ];

    return (
      <Container>
        <InnerContainer>
          <Title20 style={{ marginTop: "70px" }}>클라이언트 분들께</Title20>
          <Title20>검증된 볼트앤너트를 만나보세요.</Title20>

          <Title16 style={{ marginTop: "32px" }}>평균 만족도</Title16>

          <RattingBox>
            <MyStarRatingComponent name="rate" starCount={5} starColor={"#0a2165"} value={5} />
            <img src={banner4score} />
          </RattingBox>

          <ReviewContainer>
            {review.map((v, idx) => (
              <ReviewBox>
                <InnerReviewBox>
                  <div style={{ display: "inline-flex", marginTop: "20px" }}>
                    <Title13>{v.name}</Title13>
                    <ReviewMyStarRatingComponent name="rate" starCount={5} starColor={"#0a2165"} value={5} />
                  </div>

                  <Title12>{v.desc}</Title12>

                  <div style={{ display: "flex", justifyContent: "flex-end", margin: "17px 0px 8px 0px" }}>
                    <Title9>{v.date}</Title9>
                  </div>
                </InnerReviewBox>
              </ReviewBox>
            ))}
          </ReviewContainer>
        </InnerContainer>
      </Container>
    );
  }
}

export default MobileBanner4Container;

const Container = styled.div`
  background-color: #f6f6f6;
  height: 488px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const Title16 = styled(Title.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.63;
  letter-spacing: -0.4px;
  color: #282c36;
`;

const MyStarRatingComponent = styled(StarRatingComponent)`
  margin-top: 11px;
  > label {
    width: 15px;
    height: 30px;
    > i {
      font-size: 15px;
    }
  }
`;

const ReviewMyStarRatingComponent = styled(StarRatingComponent)`
  margin-left: 7px;
  > label {
    width: 10px;
    height: 30px;
    > i {
      font-size: 7px;
    }
  }
`;

const RattingBox = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 140px;
  margin-top: 6px;
`;

const ReviewBox = styled.div`
  display: flex;
  justify-content: center;
  width: 228px;
  border-radius: 10px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  margin-top: 40px;
  margin-right: 8px;
`;

const InnerReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 188px;
`;

const Title13 = styled(Title.FontSize13)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.46;
  letter-spacing: -0.33px;
  color: #191919;
`;

const Title12 = styled(Title.FontSize12)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.3px;
  color: #636363;
`;

const Title9 = styled(Title.FontSize9)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -0.23px;
  color: #bcbdc1;
`;

const ReviewContainer = styled.div`
  display: inline-flex;

  position: relative;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;
