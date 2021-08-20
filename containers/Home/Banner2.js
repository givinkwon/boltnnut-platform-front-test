import React from "react";
import styled from "styled-components";
import * as Title from "components/Title";
import { inject, observer } from "mobx-react";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import PartnerCard from "../Manufacture/Search/Home/PartnerCard";
import { toJS } from "mobx";

@inject("Home", "Partner", "Auth", "Search", "Category")
@observer
class NewBanner2Container extends React.Component {
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

    const { Partner, Auth, Search, Category } = this.props;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "200px",
        }}
      >
        <Containerv1
          style={{ justifyContent: " center", flexDirection: "column" }}
        >
          <Header>
            <b style={{ fontWeight: "bold" }}>7071개</b>의 볼트앤너트의 업체
            전문가들을 만나보세요.
          </Header>

          <CategoryBox>
            {nameTable.map((v, idx) => (
              <CategoryTitle
                key={v.id}
                active={this.onCompareCategory(v.id)}
                onClick={() => this.onClickCategory(v.id)}
              >
                {v.name}
              </CategoryTitle>
            ))}
          </CategoryBox>

          {Partner.partner_list &&
            Partner.partner_list.map((item, idx) => {
              return (
                <>
                  {idx < 3 && (
                    <Background style={{ marginBottom: "5px" }}>
                      <div
                        onClick={() => Partner.pushToDetail(item, idx)}
                        style={{ width: "100%" }}
                      >
                        <PartnerCard
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
        </Containerv1>
      </div>
    );
  }
}

export default NewBanner2Container;

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
  justify-content: space-between;
  margin-top: 80px;
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
