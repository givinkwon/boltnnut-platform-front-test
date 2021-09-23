import React from "react";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import DetailCardContainer from "./DetailCard";
import NewDetailCardContainer from "./NewDetailCard";
import MobileDetailCardContainer from "./Mobile/MobileDetailCard";
import ReviewContainer from "./Review/ReviewPage";
import CompleteContainer from "components/Complete";
import { inject, observer } from "mobx-react";

// cookie 추가
import Cookies from "js-cookie";

@inject("Auth", "Partner", "Cookie")
@observer
class SearchDetailConatiner extends React.Component {
  componentDidMount() {
    const { Auth, Partner, Cookie } = this.props;
    // 쿠기 값 리스트에 저장
    if (Partner.partner_detail_list[0].item) {
      Cookie.add_partner_view(Partner.partner_detail_list[0].item.id);
    }

    // 쿠키 저장하기
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 2440);
    Cookies.set("partner_view", Cookie.partner_view_list, {
      path: "/",
      expires,
    });

    console.log(Partner.reviewActiveIndex);
    //alert(Cookies.get('partner_view'))
  }
  render() {
    const { Auth, Partner, width } = this.props;
    return (
      <>
        {Partner.reviewActiveIndex == 0 &&
          (width && width > 767.98 ? (
            // <DetailCardContainer width={this.props.width} />
            <NewDetailCardContainer width={this.props.width} />
          ) : (
            // <MobileDetailCardContainer width={this.props.width} />
            <div></div>
          ))}
        <Background>
          <Containerv1>
            {Partner.reviewActiveIndex == 1 && <ReviewContainer width={this.props.width} />}

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
                RouterTwo="search"
              />
            )}
          </Containerv1>
        </Background>
      </>
    );
  }
}

export default SearchDetailConatiner;
