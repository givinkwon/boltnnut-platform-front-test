import React from "react";
import styled from "styled-components";
import * as Title from "components/Title";
import { inject, observer } from "mobx-react";
import CategoryCardComponent from "../../components/CategoryCard";
import Containerv1 from "../../components/Containerv1";

@inject("Home")
@observer
class NewBanner2Container extends React.Component {
  onClickCategory = (item) => {
    const { Home } = this.props;
    Home.categoryIndex = item.id;
  };

  onCompareCategory = (item) => {
    const { Home } = this.props;

    if (Home.categoryIndex === item.id) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const nameTable = [
      { id: "1", name: "액세서리, 잡화" },
      { id: "2", name: "뷰티, 화장품" },
      { id: "3", name: "생활용품" },
      { id: "4", name: "가전" },
      { id: "5", name: "레저, 스포츠" },
      { id: "6", name: "애견" },
      { id: "7", name: "유아" },
      { id: "8", name: "가구" },
      { id: "9", name: "소방" },
      { id: "10", name: "건설" },
      { id: "11", name: "부품, 공구, 작업기계류" },
    ];

    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "200px" }}>
        <Containerv1 style={{ justifyContent: " center", flexDirection: "column" }}>
          <Header>
            <b style={{ fontWeight: "bold" }}>5,660개</b>의 볼트앤너트의 업체 전문가들을 만나보세요.
          </Header>

          <CategoryBox>
            {nameTable.map((v) => (
              <CategoryTitle key={v.id} active={this.onCompareCategory(v)} onClick={() => this.onClickCategory(v)}>
                {v.name}
              </CategoryTitle>
            ))}
          </CategoryBox>

          <CategoryCardComponent />
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
