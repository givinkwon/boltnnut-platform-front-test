import React from "react";
import styled from "styled-components";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";

const certification = "/static/icon/certification_img.svg";
const category = "/static/images/project/category.svg";
const purpose = "/static/images/project/purpose.svg";
const moneyicon = "/static/images/project/moneyicon.svg";
const bookmarkcount = "static/icon/bookmarkcount.svg";
const views = "/static/images/project/views.svg";
const applicant2 = "/static/images/project/applicant2.svg";

@inject("Project")
@observer
class ProposalCard extends React.Component {
  state = {
    width: null,
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  render() {
    const { data } = this.props;
    const { width } = this.state;

    // 의뢰명
    let name = "";
    // 의뢰 날짜
    let date = "";
    // 의뢰 기간
    let period = "";
    // 희망 가격
    let price = "";
    // 의뢰 목적
    let status = "";
    // 의뢰 내용
    let content = "";

    // 의뢰 파일 list
    let filelist = "";

    // 의뢰 분류
    let category = "";

    // 희망 지역
    let region = "";

    // 데이터 저장
    if (data.request_set[0]) {
      name = data.request_set[0].name && data.request_set[0].name;
      
      date = data.request_set[0].createdAt && data.request_set[0].createdAt.substr(0, 10).replaceAll("-", ".");
      
      content = data.request_set[0].contents && data.request_set[0].contents;
      
      
      period = data.request_set[0].deadline == "2020-11-11T11:11:00+09:00" ? "납기일미정"
          : data.request_set[0].deadline.substring(0, 10) +
            "(" +
            data.request_set[0].deadline_state +
            ")";
      
      price = data.request_set[0].price && data.request_set[0].price
      
      status = data.request_set[0].request_state && data.request_set[0].request_state;

      filelist = data.request_set[0].requestfile_set && data.request_set[0].requestfile_set

      category = data.request_set[0].category && data.request_set[0].category

      region = data.request_set[0].region && data.request_set[0].region
    }

    const { Project } = this.props;

    return (
      <>
        <Card>
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: -0.3,
              color: "#0933b3",
            }}
          >
            {data.status}
          </div>
          <HeaderWrapper>
            <Title>{name && name}</Title>
            {data.identification_state === true ? (
              <Certification>
                <img src={certification}></img>
              </Certification>
            ) : (
              <></>
            )}
            <Date style={{ color: "#86888c" }}>{date}</Date>
          </HeaderWrapper>
          <CategoryWrapper>
            <Main>
              <Category>
                <CategoryBox>
                  <Field>
                    <img src={category} style={{ marginRight: 4 }}></img>
                    <span
                      style={{
                        fontSize: 16,
                        letterSpacing: -0.4,
                        color: "#767676",
                        marginRight: 16,
                      }}
                    >
                      업체분류
                    </span>
                  </Field>
                  <FieldContent>
                    <div style={{ marginLeft: 3 }}>{category && category }</div>
                  </FieldContent>
                </CategoryBox>
                <CategoryBox style={{ marginLeft: 16 }}>
                  <Field>
                    <img src={purpose} style={{ marginRight: 4 }}></img>
                    <span
                      style={{
                        fontSize: 16,
                        letterSpacing: -0.4,
                        color: "#767676",
                        marginRight: 16,
                      }}
                    >
                      문의 목적
                    </span>
                  </Field>
                  <FieldContent>
                    <div style={{ marginLeft: 3 }}>
                      {status && status}
                    </div>
                  </FieldContent>
                </CategoryBox>
                <CategoryBox style={{ marginLeft: 16, borderRight: "none" }}>
                  <Field>
                    <img src={moneyicon} style={{ marginRight: 4 }}></img>
                    <span
                      style={{
                        fontSize: 16,
                        letterSpacing: -0.4,
                        color: "#767676",
                        marginRight: 16,
                      }}
                    >
                      예상 금액
                    </span>
                  </Field>
                  <FieldContent>
                    <div style={{ marginLeft: 3 }}>
                      {price != "" ? price : "미정"}
                    </div>
                  </FieldContent>
                </CategoryBox>
              </Category>
              <Content>{content}</Content>
            </Main>
            <Aside>
              <AsideContent>
                <img src={bookmarkcount} style={{ marginRight: 6 }} />
                <div>3</div>
              </AsideContent>
              <AsideContent>
                <img src={views} style={{ marginRight: 6 }} />
                <div> 높음 </div>
              </AsideContent>
              <AsideContent style={{ borderBottom: "solid 1px #e1e2e4" }}>
                <img src={applicant2} style={{ marginRight: 6 }} />
                <div> 총 3명 지원 </div>
              </AsideContent>
            </Aside>
          </CategoryWrapper>
        </Card>
      </>
    );
  }
}

export default ProposalCard;

const Card = styled.div`
  width: 94%;
  padding: 30px 24px 30px 30px;
  position: relative;
  object-fit: contain;
  border-radius: 8px;
  border: solid 1px #e1e2e4;
  background-color: #ffffff;
`;
const Title = styled.span`
  height: 36px;
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;
  white-space: nowrap;
  margin-right: 30px;
`;
const SubTitle = styled.span`
  height: 29px;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: -0.5px;
  text-align: left;
  color: #282c36;
  white-space: nowrap;
  margin-right: 15px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 100%;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.38px;
  }
`;
const HeaderWrapper = styled.div`
  width: 100%;
  margin-top: 13px;
  margin-bottom: 27px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Date = styled.div`
  font-size: 14px;
  letter-spacing: -0.35px;
  text-align: left;
  color: #b3b3b3;
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Main = styled.div``;

const Category = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const CategoryBox = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-right: solid 1px #c6c7cc;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const FieldContent = styled.div`
  margin-right: 16px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.4px;
  color: #282c36;
`;

const Aside = styled.div`
  width: 112px;
  display: flex;
  flex-direction: column;
`;

const AsideContent = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 11px;
  font-size: 14px;
  letter-spacing: -0.35px;
  text-align: left;
  color: #282c36;
}
`;

const FooterWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  // height: 29px;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 14px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-bottom: 32px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-bottom: 32px;
  }
  @media (min-width: 1300px) {
    margin-bottom: 32px;
  }
`;

const Content = styled.span`
  width: 100%;
  font-size: 14px;
  letter-spacing: -0.35px;
  text-align: left;
  color: #767676;
  margin-top: 32px;
`;

const Certification = styled.div`
  width: 14px;
  height: 14px;
  margin-right: 30px;
`;
