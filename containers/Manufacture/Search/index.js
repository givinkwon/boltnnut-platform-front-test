import React from "react";

import BannerConatiner from "./Home/Banner";
import SearchFilterBox from "./Home/SearchFilterBox";
import MobileSearchFilterBox from "./Mobile/MobileSearchFilterBox";

import ContentContainer from "./Home/Content";
import MobileContentContainer from "./Mobile/MobileContent";
import Container from "components/Containerv1";
import Background from "components/Background";
import { inject, observer } from "mobx-react";
import DetailContainer from "./Detail/index";

// cookie 추가
import Cookies from "js-cookie";

@inject("Auth", "Partner", "Category", "Cookie")
@observer
class SearchConatiner extends React.Component {
  async componentDidMount() {
    let partner_view_data = [];
    const { Auth, Partner, Category, Cookie } = this.props;

    Partner.newIndex = 0;
    Partner.mobileRequestIndex = 0;
    Auth.checkLogin();

    // Cookie 값 가지고 와서 리스트에 먼저 저장
    partner_view_data = await Cookies.get("partner_view");
    // list 전처리
    if (partner_view_data) {
      partner_view_data = partner_view_data
        .replace("[", "")
        .replace("]", "")
        .split(",");
    }

    if (partner_view_data !== undefined && partner_view_data !== "undefined") {
      partner_view_data.map((data) => Cookie.add_partner_view(data));
    }
  }

  render() {
    const { Auth, Partner, Search } = this.props;

    return (
      <>
        {this.props.width &&
          (this.props.width > 767.99 ? (
            <div>
              {/* 제조사 찾기 기본 화면 */}
              {Partner.newIndex == 0 && (
                <>
                  <BannerConatiner />
                  <Background>
                    <Container>
                      <SearchFilterBox width={this.props.width} />
                    </Container>
                  </Background>
                  <ContentContainer width={this.props.width} />
                </>
              )}
              {/* 제조사 찾기 상세 페이지 */}
              {Partner.newIndex == 1 && (
                <DetailContainer width={this.props.width} />
              )}
            </div>
          ) : (
            <>
              {/* 제조사 찾기 모바일 버전 기본 화면 */}
              {Partner.mobileRequestIndex == 0 && (
                <>
                  <MobileSearchFilterBox width={this.props.width} />
                  <MobileContentContainer width={this.props.width} />
                </>
              )}
            </>
          ))}
      </>
    );
  }
}

export default SearchConatiner;
