import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import ReviewContainer from "containers/Manufacture/Search/Detail/Review/ReviewContainer";
import * as PartnerAPI from "axios/Manufacture/Partner";
import Button from "components/Button";
import * as Content from "components/Content";
import Sample from "stores/Shop/Sample";
import RequestModal from "./RequestModal";

const star = "static/icon/star_lightblue.svg";
const viewcount = "static/images/viewcount.svg";
const bookmarkcount = "static/icon/bookmarkcount.svg";
const bookmarkImg = "/static/icon/bookmark_empty.svg";
const bookmarkBlueImg = "/static/icon/bookmark_blue.svg";
const location = "static/icon/location.svg";

@inject("Partner", "Auth", "Common", "Search", "Sample")
@observer
class PartnerCard extends React.Component {
  state = {
    width: null,
    introduction: false,
    call: false,
    message: false,
    active: false,
    modalOpen: false,
    activeReview: false,
    city: "",
    business: [],
    totalPartnerBookmark: "",
    total_review: -1,
  };

  componentDidMount() {
    const { width, Search, data, Partner, idx, Auth } = this.props;
    window.addEventListener("resize", Search.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }

  componentWillUnmount() {
    const { Search } = this.props;
    window.removeEventListener("resize", Search.updateDimensions);
  }

  openModal = (user_phone) => {
    this.props.Partner.modalActive = true;
    if (!user_phone) {
      this.props.Partner.modalUserPhone = "전화번호 없음";
    } else {
      this.props.Partner.modalUserPhone = user_phone;
    }
  };

  closeModal = (e) => {
    if (e) {
      e.stopPropagation();
    }

    this.setState({ modalOpen: false });

    this.props.Partner.modalActive = false;
  };

  checkLogin = async () => {
    const { Auth } = this.props;
    await Auth.checkLogin();

    if (Auth && Auth.logged_in_user) {
      return true;
    } else {
      return false;
    }
  };

  activeHandler = (type) => {
    switch (type) {
      case "file":
        if (this.state.introduction) {
          this.setState({ introduction: false });
        } else {
          this.setState({ introduction: true });
        }

        break;
      case "call":
        if (this.state.call) {
          this.setState({ call: false });
        } else {
          this.setState({ call: true });
        }
        break;
      case "message":
        if (this.state.message) {
          this.setState({ message: false });
        } else {
          this.setState({ message: true });
        }
        break;
      case "active":
        if (this.state.active) {
          this.setState({ active: false });
        } else {
          this.setState({ active: true });
        }
    }
  };

  render() {
    const { data, width, Partner, categoryData, idx, Auth, Sample } = this.props;
    const clientId = Auth.logged_in_client && Auth.logged_in_client.id;
    const partnerId = data && data.id;
    const loggedInPartnerId = Auth.logged_in_partner && Auth.logged_in_partner.id;
    const existLogo = data && data.logo && data.logo.split("/")[4];

    return (
      <>
        <RequestModal width={width} />
        {width > 767.98 && data ? (
          <>
            <Card
              active={this.state.active}
              onMouseOver={() => {
                this.activeHandler("active");
              }}
              onMouseOut={() => {
                this.activeHandler("active");
              }}
            >
              <Header>
                {data && data.portfolio_set.length > 0 ? (
                  <Item>
                    {/* 이미지 검색이면 매칭된 이미지를 띄우고, 아닌 경우에는 포토폴리오 이미지를 띄우기 */}
                    {Partner.matching_image.length > 0 ? <img src={Partner.matching_image[idx]} /> : <img src={data && data.portfolio_set[0].img_portfolio} />}
                  </Item>
                ) : existLogo === "null" ? (
                  <Item>{this.state.active ? <img src="static/images/noportfolio_img_over.svg" /> : <img src="static/images/noportfolio_img.svg" />}</Item>
                ) : (
                  <Item>
                    <img src={data && data.logo} />
                  </Item>
                )}
              </Header>

              <Main>
                <Title>
                  <div>
                    <Name>{data.history}</Name>
                  </div>
                </Title>

                <Introduce style={{ color: "#555963", marginBottom: 20 }}>{data && data.name}</Introduce>

                {/*가격이 너무 높을 때는 표시하지 않음*/}
                {data.shop && data.shop.price1 && data.shop.price1 < 2000000 ? (
                  <>
                    <Introduce style={{ textAlign: "right" }}>
                      단품 가격 : {data.shop.price1 && (Math.round((data.shop.price1 * 0.95) / 100) * 100).toLocaleString("ko-KR")}원
                    </Introduce>
                    <Introduce style={{ textAlign: "right" }}>
                      {data.shop.moq2} : {(Math.round((data.shop.price1 * 0.85) / 100) * 100).toLocaleString("ko-KR")}원
                    </Introduce>
                    <Introduce style={{ textAlign: "right" }}>
                      {data.shop.moq3} : {(Math.round((data.shop.price1 * 0.7) / 100) * 100).toLocaleString("ko-KR")}원
                    </Introduce>
                  </>
                ) : (
                  <>
                    <Introduce style={{ textAlign: "right" }}>
                      단품 가격 : {data.shop && data.shop.price1 && (Math.round((data.shop.price1 * 0.95) / 10000) * 10000).toLocaleString("ko-KR")}원
                    </Introduce>
                    <Introduce style={{ textAlign: "right" }}>구매수량에 따라 가격 협의</Introduce>
                  </>
                )}
                <ButtonBox onClick={() => Sample.openModal(data.name)}>
                  <ButtonComponent style={{ width: "200px", height: "42px" }} backgroundColor={"#0933b3"} borderRadius={5}>
                    <MainCategoryFont color={"#ffffff"} fontWeight={500}>
                      샘플|제품정보 요청
                    </MainCategoryFont>
                  </ButtonComponent>
                </ButtonBox>
              </Main>
            </Card>
          </>
        ) : (
          <>
            <Card
              active={this.state.active}
              onClick={(e) => {
                // this.cardClick(e);
              }}
              onMouseOver={() => {
                this.activeHandler("active");
              }}
              onMouseOut={() => {
                this.activeHandler("active");
              }}
            >
              <Header>
                {data && data.portfolio_set.length > 0 ? (
                  <Item>
                    <img src={data && data.portfolio_set[0].img_portfolio} />
                  </Item>
                ) : existLogo === "null" ? (
                  <Item>{this.state.active ? <img src="static/images/noportfolio_img_over.svg" /> : <img src="static/images/noportfolio_img.svg" />}</Item>
                ) : (
                  <Item>
                    <img src={data && data.logo} />
                  </Item>
                )}
              </Header>

              <Main>
                <Name>{data && data.name}</Name>
                <InfoOne>{data && (data.info_company.length > 70 ? data.info_company.slice(0, 70) + "..." : data.info_company)}</InfoOne>
              </Main>
            </Card>

            {this.props.Partner.ReviewActive && this.props.Partner.ReviewActiveIndex === idx && (
              <>
                <ReviewContainer data={data} width={width} Partner={Partner} categoryData={categoryData} idx={idx} />
              </>
            )}
          </>
        )}
      </>
    );
  }
}

export default PartnerCard;

const Card = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  height: 248px;
  border-bottom: solid 2px #e1e2e4;
  cursor: pointer;
  padding: 14px 0px 14px 10px;
  background-color: ${(props) => (props.active ? "#f6f6f6" : "#ffffff")};
`;

const Header = styled.div`
  /* margin-right: 34px; */
`;

const Main = styled.div`
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 60%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 60%;
  }
  @media (min-width: 1300px) {
    width: 80%;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  > div:nth-of-type(1) {
    display: flex;
  }
`;

const Name = styled.div`
  font-size: 20px;
  line-height: 40px;
  letter-spacing: -0.5px;
  color: #1e2222;
  font-weight: bold;

  @media (min-width: 0px) and (max-width: 767.98px) {
    color: #0933b3;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.4px;
  }
`;

const Certification = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 20px;

  img {
    width: 16px;
    height: 16px;
    margin-top: 13px;
  }

  div {
    margin-left: 5px;
    font-size: 16px;
    line-height: 2.5;
    letter-spacing: -0.4px;
    text-align: left;
    color: #999999;
  }
`;

const BookMark = styled.div`
  margin-right: 20px;
`;

const Introduce = styled.div`
  width: 630px;
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
  color: #1e2222;
  margin-bottom: 12px;
`;

const Hashtag = styled.div`
  display: flex;
  font-size: 15px;
  color: #555963;
  justify-content: center;
  align-items: center;
  height: 34px;
  border-radius: 5px;
  margin-right: 12px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: ${(props) => (props.active ? "#ffffff" : "#f6f6f6")};
`;

const BlankHashtag = styled.div`
  width: 1px;
  height: 34px;
  background-color: ${(props) => (props.active ? "#f6f6f6" : "#ffffff")};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 57px;
`;

const Review = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 22px;
    height: 21px;
  }
`;

const Score = styled.div`
  font-size: 14px;
`;

const Location = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    width: 100%;
    font-size: 14px;
    color: #767676;
    line-height: 2.86;
    letter-spacing: -0.35px;
  }
  img {
    width: 10.6px;
    height: 15.3px;
  }
`;

const ViewCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    margin-left: 5px;
    width: 50px;
    font-size: 12px;
    color: #999999;
  }
  img {
    width: 16px;
    height: 16px;
  }
`;

const BookmarkCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    font-size: 12px;
    color: #999999;
  }
  img {
    width: 16px;
    height: 16px;
  }
`;

const InfoOne = styled.div`
  word-break: break-all;
  white-space: break-spaces;
  line-height: 1.2;
  letter-spacing: 0.56px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    color: #282c36;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.33px;
    height: 50%;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-bottom: 35px;
  }
  @media (min-width: 1300px) {
    width: 90%;
  }
`;

const Item = styled.div`
  margin: 0 20px;
  padding: 20px 0;
  border-radius: 10px;
  overflow: hidden;
  > img {
    border: solid 1px #eeeeee;
    border-radius: 10px;
    cursor: pointer;
    width: 262px;
    height: 200px;
    object-fit: cover;
    object-position: center top;
  }
`;

const ButtonComponent = styled(Button)`
  width: 80px;
  height: 42px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 65px !important;
    height: 30px !important;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 73px !important;
    height: 36px !important;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 20%;
  padding-right: 20px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 15%;
  }
`;

const MainCategoryFont = styled(Content.FontSize15)`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "normal")};
  font-stretch: normal;
  font-style: normal;
  line-height: 2.27;
  letter-spacing: -0.38px;
  text-align: left;
  color: ${(props) => (props.color ? props.color : "#282c36")};
  word-break: break-word;
}`;
