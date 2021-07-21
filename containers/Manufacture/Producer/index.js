import React from "react";

import BannerConatiner from "./Banner";
import SearchBar from "./SearchBar";
import SearchFilterBox from "./SearchFilterBox";
import MobileSearchBar from "./MobileSearchBar";
import ContentContainer from "./Content";
import MobileContentContainer from "./MobileContent";
import Container from "components/Containerv1";
import Background from "components/Background";
import { inject, observer } from "mobx-react";
import DetailContainer from "./Detail/index";
import MobileRequest from "./MobileRequest";
import MobileRequestDone from "./MobileRequestDone";
import { DiagnosticCategory } from "typescript";

@inject("Auth", "Partner", "Category")
@observer
class ProducerConatiner extends React.Component {
  async componentDidMount() {
    const { Auth, Partner, Category } = this.props;    
    Partner.init();
    Partner.newIndex = 0;
    Partner.mobileRequestIndex = 0;
    await Auth.checkLogin();
  }  

  render() {
    const { Auth, Partner } = this.props;
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
                  <MobileSearchBar width={this.props.width} />
                  <MobileContentContainer width={this.props.width} />
                </>
              )}
              {/* 제조사 찾기 모바일 버전 업체 수배 화면 */}
              {Partner.mobileRequestIndex == 1 && (
                <MobileRequest width={this.props.width} />
              )}
              {/* 제조사 찾기 모바일 버전 업체 수배 완료 화면 */}
              {Partner.mobileRequestIndex == 2 && (
                <MobileRequestDone width={this.props.width} />
              )}
            </>
          ))}
      </>
    );
  }
}

export default ProducerConatiner;
