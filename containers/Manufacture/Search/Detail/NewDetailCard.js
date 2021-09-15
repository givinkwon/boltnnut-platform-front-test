import React from "react";
import styled from "styled-components";
import { reaction } from "mobx";
import { inject, observer } from "mobx-react";

import * as Title from "components/Title";

import ContainerV1 from "components/Containerv1";
import ReminderCardContainer from "./ReminderCard";
import TabBarCardContainer from "./TabBarContainer";
import ReviewCardContainer from "./ReviewContainer";
import MapContainer from "./Map";
import QnAContainer from "./QnAContainer";
import SubContainer from "./SubContainer";
import ReviewWritingModal from "./ReviewWritingModal";
// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

@inject("Partner", "Auth", "Common")
@observer
class NewDetailCardContainer extends React.Component {
  state = {
    portfolioToShow: 20,
    portfolioSetMoreState: false,
    tabBarPrevState: 0, // 탭바의 이전상태를 가져오기 위함

    info: React.createRef(),
    review: React.createRef(),
    question: React.createRef(),
  };

  componentDidMount() {
    const { Partner } = this.props;

    // 포트폴리오 갯수가 20개 이상일때 더보기 버튼 활성화
    if (Partner.partner_detail_list[0].item.portfolio_set.length >= 20) {
      this.setState({ portfolioSetMoreState: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { Partner } = this.props;
    // 탭바 스크롤 이벤트
    if (prevState.tabBarPrevState !== Partner.tabBar) {
      if (Partner.tabBar === 1) {
        this.setState({ ...this.state, tabBarPrevState: 1 });
        this.state.info.current.scrollIntoView({ behavior: "smooth" });
      }
      // if (Partner.tabBar === 2) {
      //   this.setState({ ...this.state, tabBarPrevState: 2 });
      //   this.state.review.current.scrollIntoView({ behavior: "smooth" });
      // }
      // if (Partner.tabBar === 3) {
      //   this.setState({ ...this.state, tabBarPrevState: 3 });
      //   this.state.question.current.scrollIntoView({ behavior: "smooth" });
      // }
    }

    // 더 보여줄 포트폴리오가 없는 경우 더보기 버튼 삭제
    if (this.state.portfolioSetMoreState === true) {
      if (Partner.partner_detail_list[0].item.portfolio_set.length < this.state.portfolioToShow) {
        this.setState({ ...this.state, portfolioSetMoreState: false });
      }
      // 최대 100개 까지만 보여준다.
      if (this.state.portfolioToShow > 100) {
        this.setState({ ...this.state, portfolioSetMoreState: false });
      }
    }
  }

  componentWillUnmount() {
    const { Partner } = this.props;

    // 포트폴리오 더보기 갯수 초기화
    this.setState({ portfolioToShow: 20 });

    // 탭바 인덱스 초기화
    Partner.tabIdx = 1;
    Partner.tabBar = 0;
  }

  // 포트폴리오 보여주기 갯수 핸들러
  portfolioToShowHandler() {
    if (this.state.portfolioSetMoreState && this.state.portfolioToShow === 20) {
      this.setState({ portfolioToShow: 40 });
    }

    if (this.state.portfolioSetMoreState && this.state.portfolioToShow === 40) {
      this.setState({ portfolioToShow: 60 });
    }

    if (this.state.portfolioSetMoreState && this.state.portfolioToShow === 60) {
      this.setState({ portfolioToShow: 80 });
    }

    if (this.state.portfolioSetMoreState && this.state.portfolioToShow === 80) {
      this.setState({ portfolioToShow: 100 });
    }

    if (this.state.portfolioSetMoreState && this.state.portfolioToShow === 100) {
      this.setState({ portfolioToShow: 120 });
    }
  }

  render() {
    const { Partner, Auth } = this.props;
    console.log(Partner.tabIdx);

    // Map 리전 넣어주기
    let region = "";

    if (Partner.partner_detail_list[0].item) {
      region =
        Partner.partner_detail_list[0].item.region === null || Partner.partner_detail_list[0].item.region === "nan"
          ? Partner.city_name
          : Partner.partner_detail_list[0].item.region;
    }

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Container>
          {/* MainContainer */}
          <div style={{ width: 792, display: "flex", flexDirection: "column" }}>
            {/* <ReviewWritingModal /> */}
            {/* 포트폴리오 */}
            <PortfolioSection>
              <MainContainer>
                {Partner.partner_detail_list[0].item.portfolio_set.slice(0, this.state.portfolioToShow).map((v, idx) => (
                  <>
                    {console.log(Partner.partner_detail_list[0])}
                    <PortfolioImgBox key={idx} src={v.img_portfolio} />
                  </>
                ))}
              </MainContainer>

              <MoreBtn active={this.state.portfolioSetMoreState} onClick={() => this.portfolioToShowHandler()}>
                포트폴리오 더보기
                <img src="/static/images/partner/moredata.svg" style={{ marginLeft: 12, paddingBottom: 2 }} />
              </MoreBtn>
            </PortfolioSection>

            {/* 비슷한 업체 더 보기 */}
            <MoreCompanySection>
              <InnerBox style={{ width: 792, justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <img src="/static/images/partner/blueline.svg" style={{ width: 28, height: 4 }} />

                  <InnerBox>
                    <Font18>비슷한 업체 더보기</Font18>
                  </InnerBox>
                </div>

                {/* <InnerBox style={{ width: 100, alignItems: "center" }}>
                  <Font16 style={{ marginRight: 24 }}>1/2</Font16>
                  <img src="/static/images/partner/prev.svg" style={{ cursor: "pointer" }} />
                  <img src="/static/images/partner/next.svg" style={{ cursor: "pointer" }} />
                </InnerBox> */}
              </InnerBox>

              <ReminderCardContainer />
            </MoreCompanySection>

            {/* 탭바 */}
            <div ref={this.state.info}>
              <TabBarCardContainer />
            </div>

            {/* 지도 */}
            <MapSection>
              <Font24 style={{ marginBottom: 24 }}>위치</Font24>
              <MapContainer city={region} />
            </MapSection>

            {/* 리뷰 */}
            {/* <div ref={this.state.review}>
              <ReviewCardContainer />
            </div> */}

            {/* QnA */}
            {/* <div ref={this.state.question}>
              <QnAContainer />
            </div> */}

            {/* 다른 고객이 비교한 제조사 */}
            <CompareManufacturersSection>
              <img src="/static/images/partner/blueline.svg" style={{ width: 28, height: 4 }} />
              <InnerBox style={{ justifyContent: "space-between" }}>
                <Font18>다른 고객이 비교한 제조사</Font18>

                {/* <InnerBox style={{ width: 100, alignItems: "center" }}>
                  <Font16 style={{ marginRight: 24 }}>1/2</Font16>
                  <img src="/static/images/partner/prev.svg" style={{ cursor: "pointer" }} />
                  <img src="/static/images/partner/next.svg" style={{ cursor: "pointer" }} />
                </InnerBox> */}
              </InnerBox>

              <ReminderCardContainer />
            </CompareManufacturersSection>
          </div>

          {/* SubContainer */}
          <SubContainer />
        </Container>
      </div>
    );
  }
}

export default NewDetailCardContainer;

// Font && Common
const Font16 = styled(Title.FontSize16)`
  font-family: NotoSansCJKkr;
  color: #000000;
  font-weight: normal;
  margin-top: 4px;
  line-height: 1.5;
  letter-spacing: -0.4px;
`;

const Font18 = styled(Title.FontSize18)`
  font-family: NotoSansCJKkr;
  font-weight: bold;
  line-height: 2;
  letter-spacing: -0.45px;
`;

const Font24 = styled(Title.FontSize24)`
  font-family: NotoSansCJKkr;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
`;

const InnerBox = styled.div`
  display: flex;
`;

// MainContainer
const PortfolioSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const PortfolioImgBox = styled.img`
  width: 392px;
  height: 286px;
`;

const MoreCompanySection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 140px;
`;

const Container = styled(ContainerV1)`
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin-top: 80px;
`;

const MainContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  width: 792px;
`;

const MoreBtn = styled.button`
  display: ${(props) => (props.active ? "inline-display" : "none")};
  width: 792px;
  height: 67px;
  margin-top: 16px;
  object-fit: contain;
  border-radius: 3px;
  border: solid 1px #0933b3;
  background-color: #fff;
  color: #0933b3;
  font-size: 18px;
  font-weight: bold;
  font-family: NotoSansCJKkr;
  cursor: pointer;
`;

const MapSection = styled.section`
  width: 100%;
  height: 500px;
  margin-bottom: 140px;
  margin-top: 140px;
`;

const CompareManufacturersSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 140px;
  margin-bottom: 300px;
`;
