import React from "react";
import styled from "styled-components";
import * as Title from "components/Title";
import { inject, observer } from "mobx-react";
import MobileProposalCard from "containers/Manufacture/Search/Mobile/MobileProposalCard";
import { toJS } from "mobx";
import Router from "next/router";

@inject("Home", "Partner", "Auth", "Search", "Category")
@observer
class MobileBanner2Container extends React.Component {
  async componentDidMount() {
    const { Partner, Category } = this.props;
    Partner.detailLoadingFlag = false;

    Partner.currentPage = 1;

    // 리스트 초기화 && 선택하기
    Category.reset();
    Category.add_selected("category", 2);
  }

  onClickCategory = (idx) => {
    const { Home, Category, Partner } = this.props;
    Home.categoryIndex = idx;
    // 리스트 초기화 && 선택하기
    Category.reset();
    Category.add_selected("category", idx);
  };

  onCompareCategory = (idx) => {
    const { Home } = this.props;

    if (Home.categoryIndex === idx) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { Partner, Auth, Search, Category } = this.props;
    // id는 실제 DB의 id로 해야함
    const nameTable = [
      { id: 41, name: "전자/반도체 부품" },
      { id: 1, name: "생활/위생" },
      { id: 2, name: "디지털/가전" },
      { id: 5, name: "반려" },
      { id: 6, name: "인테리어" },
      { id: 7, name: "주방" },
      { id: 46, name: "볼트/너트류" },
      { id: 39, name: "동력전달부품" },
      { id: 19, name: "냉난방/공조" },
      { id: 22, name: "밴딩/포장" },
    ];

    return (
      <>
        <Container>
          <InnerContainer>
            <Title20>
              <b style={{ fontWeight: "bold" }}>8416개</b>의 볼트앤너트의
            </Title20>
            <Title20>업체 전문가들을 만나보세요.</Title20>

            <div style={{ marginTop: "23px", width: "95%" }}>
              <CategoryBox>
                {nameTable.map((v, idx) => (
                  <div
                    style={{
                      width: "110px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CategoryTitle key={v.id} active={this.onCompareCategory(v.id)} onClick={() => this.onClickCategory(v.id)}>
                      {v.name}
                    </CategoryTitle>
                  </div>
                ))}
              </CategoryBox>

              {Partner.partner_list &&
                Partner.partner_list.map((item, idx) => {
                  return (
                    <>
                      {idx < 3 && (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <ProposalCardBox onClick={() => Partner.pushToDetail(item, idx)}>
                            <MobileProposalCard
                              data={item}
                              width={this.props.width}
                              categoryData={toJS(Partner.category_dic[idx])}
                              idx={idx}
                              handleIntersection={Search.handleIntersection}
                              customer="partner"
                            />
                          </ProposalCardBox>
                        </div>
                      )}
                    </>
                  );
                })}
            </div>

            <Banner2ImgBox onClick={() => alert("모바일 버전은 준비중 입니다. 데스크탑 버전을 이용해 주세요")}>
              <div style={{ width: 310 }}>
                <Font16>다양한 카테고리의</Font16>
                <Font16 style={{ marginTop: 8 }}>
                  <span style={{ color: "#0933b3" }}>업체 전문가들을 찾고</span> 있으신가요?
                </Font16>
              </div>

              <SignupBtn>회원가입하기</SignupBtn>
            </Banner2ImgBox>
          </InnerContainer>
        </Container>
      </>
    );
  }
}

export default MobileBanner2Container;

const Font16 = styled(Title.FontSize16)`
  font-family: NotoSansCJKkr;
  font-weight: bold;
  color: #1e2222;
`;

const Title20 = styled(Title.FontSize20)`
  font-weight: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: -0.5px;
  color: #282c36;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 841px;
  background-color: #fff;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 3px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  width: 100%;
`;

const CategoryBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin: 40px 14px 20px 14px;
  border-bottom: solid 1px #c6c7cc;
  white-space: nowrap;
  width: 95%;

  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryTitle = styled.div`
  font-family: NotoSansCJKkr;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.89;
  letter-spacing: -0.45px;
  text-align: left;
  cursor: pointer;
  color: ${(props) => (props.active ? "#282c36" : "#b3b3b3")};
  border-bottom: ${(props) => (props.active ? "2px solid #282c36" : "")};
`;

const Banner2ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180px;
  margin-top: 30px;
  background-image: url("/static/images/Home/Mobile/MobileBanner2/mobilebanner2.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  cursor: pointer;
`;

const ProposalCardBox = styled.div`
  width: 95%;
  margin-top: 12px;
  border: none;
`;

const SignupBtn = styled.button`
  width: 148px;
  height: 42px;
  margin-top: 20px;
  margin-left: 170px;
  padding-top: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 29px;
  border: solid 1.5px #0933b3;
  background-color: #f6f6f6;

  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: 500;
  color: #0933b3;
`;
