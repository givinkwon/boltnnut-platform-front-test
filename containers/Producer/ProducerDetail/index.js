import React from "react";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import DetailCardContainer from "./DetailCard";
import ReviewContainer from "../Review/ReviewPage";
import CompleteContainer from "components/Complete";
import { inject, observer } from "mobx-react";

@inject("Auth", "Partner")
@observer
class ProducerDetailConatiner extends React.Component {
  componentDidMount() {
    const { Auth, Partner } = this.props;
    console.log(this.props.width);
    // Partner.reviewActiveIndex = 1;
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=1469e9509222cfd066d35737d4359063&libraries=LIBRARY&autoload=false";
    document.head.appendChild(script);
  }
  render() {
    const { Auth, Partner } = this.props;
    return (
      <>
        <Background>
          <Containerv1>
            {Partner.reviewActiveIndex == 0 && (
              <DetailCardContainer width={this.props.width} />
            )}

            {Partner.reviewActiveIndex == 1 && (
              <ReviewContainer width={this.props.width} />
            )}
            {Partner.reviewActiveIndex == 2 && (
              <CompleteContainer
                purpose="리뷰"
                width={this.props.width}
                Header="리뷰 작성이 완료되었습니다"
                MainOne="소중한 리뷰를 작성해 주셔서 감사합니다"
                MainTwo=""
                ButtonOne="홈으로 가기"
                ButtonTwo="제조사 찾기로 가기"
                RouterOne=""
                RouterTwo="producer"
              />
            )}
          </Containerv1>
        </Background>
      </>
    );
  }
}

export default ProducerDetailConatiner;
