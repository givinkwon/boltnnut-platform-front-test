import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import * as AccountAPI from "axios/Account/Account";
import * as PartnerAPI from "axios/Manufacture/Partner";

@inject("Partner", "Auth", "Common", "Search")
@observer
class MainPagePartnerCard extends React.Component {
  state = {
    width: null,
    modalOpen: false,
    city: "",
    business: [],
  };

  componentDidMount() {
    const { Search, data } = this.props;

    window.addEventListener("resize", Search.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });

    const req = {
      id: data && data.city,
    };

    const partnerReq = {
      id: data && data.id,
    };

    PartnerAPI.getCityName(req)
      .then((res) => {
        this.setState({ city: res.data.maincategory });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    const temp = [];
    PartnerAPI.getBusinessCategory(partnerReq)
      .then((res) => {
        res.data.business.forEach((element) => {
          PartnerAPI.getBusinessName(element).then((res) => {
            temp.push(res.data.category);
            this.setState({ business: temp });
          });
        });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
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

  clickLog = (partner) => {
    const { Auth, Partner } = this.props;

    let formData = new FormData();
    formData.append("client", Auth.logged_in_client.id);
    formData.append("search", Partner.search_text);
    formData.append("partner", partner.id);

    Partner.setclickLog(formData);

    formData = new FormData();

    formData.append(
      "url",
      window.location.protocol +
        "//" +
        window.location.host +
        "/" +
        "phoneClick"
    );
    const req = {
      data: formData,
    };

    AccountAPI.setUserPageIP(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  render() {
    const { data, width, Partner, categoryData, idx, Auth } = this.props;
    const clientId = Auth.logged_in_client && Auth.logged_in_client.id;
    const partnerId = data && data.id;
    const loggedInPartnerId =
      Auth.logged_in_partner && Auth.logged_in_partner.id;
    const existLogo = data && data.logo && data.logo.split("/")[4];

    return (
      <>
        {width > 767.98 && data ? (
          <>
            <Card>
              <Header>
                {data && data.portfolio_set.length > 0 ? (
                  <Item>
                    {/* 이미지 검색이면 매칭된 이미지를 띄우고, 아닌 경우에는 포토폴리오 이미지를 띄우기 */}
                    {Partner.matching_image.length > 0 ? (
                      <img src={Partner.matching_image[idx]}></img>
                    ) : (
                      <img src={data && data.portfolio_set[0].img_portfolio} />
                    )}
                  </Item>
                ) : existLogo === "null" ? (
                  <Item>
                    {Partner.active ? (
                      <img src="static/images/noportfolio_img_over.svg" />
                    ) : (
                      <img src="static/images/noportfolio_img.svg" />
                    )}
                  </Item>
                ) : (
                  <Item>
                    <img src={data && data.logo} />
                  </Item>
                )}
              </Header>

              <Main>
                <Title>
                  <div>
                    <Name>{data && data.name}</Name>
                    {data && data.identification_state === true ? (
                      <Certification>
                        <img src="/static/icon/certification_img.svg"></img>
                        <div>신원 인증</div>
                      </Certification>
                    ) : (
                      <></>
                    )}
                  </div>
                </Title>

                <Introduce
                  style={{
                    width: 630,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {data && data.history}
                </Introduce>

                <Bottom>
                  <BottomBox>
                    <Location>
                      <img src="static/icon/location.svg" />
                      <div style={{ marginLeft: 10 }}>
                        {(data && data.region === null) || data.region === "nan"
                          ? this.state.city
                          : data.region}
                      </div>
                    </Location>
                  </BottomBox>
                </Bottom>

                {this.state.business.length > 0 ? (
                  <div style={{ display: "flex", marginTop: 11 }}>
                    {this.state.business.map((item, idx) => (
                      <Hashtag>#{item}</Hashtag>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </Main>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <Header>
                {data && data.portfolio_set.length > 0 ? (
                  <Item>
                    <img src={data && data.portfolio_set[0].img_portfolio} />
                  </Item>
                ) : existLogo === "null" ? (
                  <Item>
                    {Partner.active ? (
                      <img src="static/images/noportfolio_img_over.svg" />
                    ) : (
                      <img src="static/images/noportfolio_img.svg" />
                    )}
                  </Item>
                ) : (
                  <Item>
                    <img src={data && data.logo} />
                  </Item>
                )}
              </Header>
              <Main>
                <Name>{data && data.name}</Name>
                <InfoOne>
                  {data &&
                    (data.info_company.length > 70
                      ? data.info_company.slice(0, 70) + "..."
                      : data.info_company)}
                </InfoOne>
              </Main>
            </Card>
          </>
        )}
      </>
    );
  }
}

export default MainPagePartnerCard;

const Card = styled.div`
  display: inline-flex;
  gap: 20px;
  width: 100%;
  height: 226px;
  padding: 14px 10px 14px 10px;
  background: ${(props) => (props.active ? "f6f6f6" : "#ffffff")};
  border-radius: 8px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
  cursor: pointer;

  :hover {
    border: 1px solid #0933b3;
  }
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
  margin-top: 32px;

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

const Introduce = styled.div`
  font-size: 16px;
  line-height: 2.5;
  letter-spacing: -0.4px;
  color: #1e2222;
`;
const Hashtag = styled.div`
  display: flex;
  font-size: 15px;
  color: #555963;
  justify-content: center;
  align-items: center;
  height: 34px;
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 20px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: ${(props) => (props.active ? "#ffffff" : "#f6f6f6")};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  width: 95%;
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Location = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    width: 100%;
    font-size: 14px;
    color: #767676;
  }
  img {
    width: 10.6px;
    height: 15.3px;
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
  padding: 20px 0;
  margin: 0 20px;

  > img {
    border: solid 1px #eeeeee;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    width: 262px;
    height: 200px;
  }
`;
