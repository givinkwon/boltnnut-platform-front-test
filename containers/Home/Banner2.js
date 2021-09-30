import React from "react";
import styled from "styled-components";
import * as Title from "components/Title";
import { inject, observer } from "mobx-react";
import Background from "components/Background";
import MainPagePartnerCard from "./MainPagePartnerCard";
import { toJS } from "mobx";

@inject("Home", "Partner", "Auth", "Search", "Category")
@observer
class Banner2Container extends React.Component {
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
    // id는 실제 DB의 id로 해야함
    const nameTable = [
      { prikey: 41, name: "전자/반도체 부품" },
      { prikey: 1, name: "생활/위생" },
      { prikey: 2, name: "디지털/가전" },
      { prikey: 5, name: "반려" },
      { prikey: 6, name: "인테리어" },
      { prikey: 7, name: "주방" },
      { prikey: 46, name: "볼트/너트류" },
      { prikey: 39, name: "동력전달부품" },
      { prikey: 19, name: "냉난방/공조" },
      { prikey: 22, name: "밴딩/포장" },
    ];

    const { Partner, Auth, Search, Category } = this.props;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "200px",
        }}
      >
        <div
          style={{
            width: 1200,
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Header>
            <b style={{ fontWeight: "bold" }}>8479개</b>의 볼트앤너트의 업체 전문가들을 만나보세요.
          </Header>

          <CategoryBox>
            {nameTable.map((item, idx) => (
              <CategoryTitle key={idx} active={this.onCompareCategory(item.prikey)} onClick={() => this.onClickCategory(item.prikey)}>
                {item.name}
              </CategoryTitle>
            ))}
          </CategoryBox>

          {Partner.partner_list &&
            Partner.partner_list.map((item, idx) => {
              return (
                <>
                  {idx < 3 && (
                    <Background key={idx} style={{ marginTop: 24 }}>
                      <div onClick={() => Partner.pushToDetail(item, idx)} style={{ width: "100%" }}>
                        <MainPagePartnerCard
                          data={item}
                          width={this.props.width}
                          categoryData={toJS(Partner.category_dic[idx])}
                          idx={idx}
                          handleIntersection={Search.handleIntersection}
                          customer="partner"
                        />
                      </div>
                    </Background>
                  )}
                </>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Banner2Container;

const Header = styled(Title.FontSize32)`
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: -0.8px;
  text-align: center;
  color: #000000;
`;

const CategoryBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 80px;
  margin-bottom: 24px;
  border-bottom: solid 1px #c6c7cc;
`;

const CategoryTitle = styled.div`
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 18px;
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
