import React from "react";
import styled from "styled-components";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";

const certification = "/static/icon/certification_img.svg";
const category = "/static/images/project/category.svg";
const purpose = "/static/images/project/purpose.svg";
const moneyicon = "/static/images/project/moneyicon.svg";

@inject("Project", "Request")
@observer
class ProposalCard extends React.Component {
  state = {
    width: null,
  };

  componentDidMount() {
    const { Request } = this.props;
    console.log(Request.getRequest);

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
    const {
      data,
      middleCategory,
      mainCategory,
      newData,
      checkTotal,
      customer,
    } = this.props;
    const { width } = this.state;

    let name = "";
    let date = "";
    let period = "";
    let estimate = "";
    let status = "";
    let content = "";
    if (data.request_set[0]) {
      name = data.request_set[0].name && data.request_set[0].name;
      date =
        data.request_set[0].createdAt &&
        data.request_set[0].createdAt.substr(0, 10).replaceAll("-", ".");
      content =
        data.request_set[0].order_request_open &&
        data.request_set[0].order_request_open;
      period =
        data.request_set[0].deadline == "2020-11-11T11:11:00+09:00"
          ? "납기일미정"
          : data.request_set[0].deadline.substring(0, 10) +
            "(" +
            data.request_set[0].deadline_state +
            ")";
      status =
        data.request_set[0].request_state && data.request_set[0].request_state;
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
            모집중
          </div>
          <HeaderWrapper>
            <Title>{name}</Title>
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
                    <div>완제품/부품 구매</div>
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
                    <div>업체수배, 견적문의, 상담요청</div>
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
                    <div>
                      {Project.projectDetailData &&
                      Project.projectDetailData.request_set[0].price
                        ? Project.projectDetailData.request_set[0].price.toLocaleString(
                            "ko-KR"
                          ) + "원"
                        : "미정"}
                    </div>
                  </FieldContent>
                </CategoryBox>
              </Category>
              <Content>{content}</Content>
            </Main>
            <Aside></Aside>
          </CategoryWrapper>
          {/* <CategoryWrapper>
            <SubTitle>
              <span>공개내용</span>
            </SubTitle>
            <Content> {content} </Content>
            <CategoryBox>
              <span>{mainCategory}</span>
            </CategoryBox>
            <CategoryBox>
              <span>{middleCategory}</span>
            </CategoryBox>
          </CategoryWrapper>
          <FooterWrapper>
            <SubTitle>희망납기</SubTitle>
            <Content>{period}</Content>
          </FooterWrapper> */}
        </Card>
      </>
    );
  }
}

export default ProposalCard;

const Card = styled.div`
  width: 100%;
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

const Main = styled.div`
  width: 100%;
`;

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

const Aside = styled.div``;

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
