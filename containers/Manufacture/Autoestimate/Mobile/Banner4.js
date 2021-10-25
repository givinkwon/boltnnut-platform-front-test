import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import StarRatingComponent from "react-star-rating-component";

const banner4score = "static/images/banner4score.svg";

class Banner4 extends React.Component {
  state = {
    rating: 1,
  };

  render() {
    const review = [
      {
        name: "HCLAB",
        desc: "투명하게 바로 견적이 나오는 서비스 200% 만족합니다. 기존 거래처가 계속 견적을 높게 불러서 인터넷에서 새로운 업체를 찾다가 바로공장을 찾게 되었습니다.",
        date: "2020.08.30",
      },
      {
        name: "끌린다",
        desc: "지인 통해서 알게 되었어요. 단품 발주할 때 좋다고... 납기가 촉박했는데 추석 연휴 때도 작업을 해주셔서 참 죄송하면서도 고마웠습니다.",
        date: "2020.06.25",
      },
      {
        name: "1인 기업",
        desc: "비전문가다보니 업체 찾고 소통하기가 쉽지 않았습니다. 지인소개를 통해 볼트앤너트를 알게 되어 문의를 드렸는 데, 그런 취약점을 잘 채워주시는 것 같아 감사드립니다.",
        date: "2021.07.20",
      },
      {
        name: "코스메틱 회사",
        desc: "며칠 고생하며 견적 받았던 여러 업체 보다 10% 정도는 싸길래 바로 결제를 했습니다. 첫 발주때는 품질이 100% 맘에 드는 건 아니었는데  이후에 담당자분이 특히 신경써주셔서 빠르게 가공품이 필요할 때마다 이용 중입니다.",
        date: "2021.07.20",
      },
    ];

    return (
      <Container>
        <InnerContainer>
          <Title20 >클라이언트 분들의 "바로발주" 후기.</Title20>
          <ReviewContainer>
            {review.map((v, idx) => (
              <div>
                <ReviewBox>
                  <InnerReviewBox>
                    <div style={{ display: "inline-flex", marginTop: "20px" }}>
                      <Title13>{v.name}</Title13>
                      <ReviewMyStarRatingComponent name="rate" starCount={5} starColor={"#0933b3"} value={5} />
                    </div>

                    <Title12>{v.desc}</Title12>

                    <div style={{ display: "flex", justifyContent: "flex-end", margin: "17px 0px 8px 0px" }}>
                      <Title9>{v.date}</Title9>
                    </div>
                  </InnerReviewBox>
                </ReviewBox>
              </div>
            ))}
          </ReviewContainer>
        </InnerContainer>
      </Container>
    );
  }
}

export default Banner4;

const Container = styled.div`
  height: 100%;
  padding-top: 50px;
  padding-bottom: 90px;
  background-color: #f6f6f6;
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


const ReviewBox = styled.div`
  display: flex;
  justify-content: center;
  width: 230px;
  border-radius: 10px;
  background-color: #ffffff;
  margin-top: 50px;
  margin-right: 8px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
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
  height: 260px;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
