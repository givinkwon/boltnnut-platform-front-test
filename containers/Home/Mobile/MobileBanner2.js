import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import * as Text from "components/Text";
import Button from "components/Button";
import Background from "components/Background";
import { inject, observer } from "mobx-react";
import MobileProposalCard from "containers/Manufacture/Producer/MobileProposalCard";
import { toJS } from "mobx";

@inject("Home", "Partner", "Auth", "Producer", "Category")
@observer
class MobileBanner2Container extends React.Component {
  async componentDidMount() {
    const { Partner, Category } = this.props;
    Partner.detailLoadingFlag = false;

    Partner.currentPage = 1;

    // 리스트 초기화 && 선택하기
    Category.reset();
    Category.add_selected("category", 1);
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
      { id: 1, name: "생활/위생" },
      { id: 2, name: "디지털/가전" },
      { id: 5, name: "반려" },
      { id: 6, name: "인테리어" },
      { id: 7, name: "주방" },
      { id: 41, name: "전자/반도체 부품" },
      { id: 46, name: "볼트/너트류" },
      { id: 39, name: "동력전달부품" },
      { id: 19, name: "냉난방/공조" },
      { id: 22, name: "밴딩/포장" },
    ];

    const { Partner, Auth, Producer, Category } = this.props;

    return (
      <Container>
        <InnerContainer>
          <Title20>
            <b style={{ fontWeight: "bold" }}>5600개</b>의 볼트앤너트의
          </Title20>
          <Title20>업체 전문가들을 만나보세요.</Title20>

          <CategoryBox>
            {nameTable.map((v, idx) => (
              <div style={{ width: "110px", display: "flex", justifyContent: "center" }}>
                <CategoryTitle key={v.id} active={this.onCompareCategory(v.id)} onClick={() => this.onClickCategory(v.id)}>
                  {v.name}
                </CategoryTitle>
              </div>
            ))}
          </CategoryBox>

          <div style={{ marginTop: "23px" }}>
            {Partner.partner_list &&
              Partner.partner_list.map((item, idx) => {
                return (
                  <>
                    {idx < 3 && (
                      <Background style={{ marginBottom: "5px" }}>
                        <div onClick={() => Partner.pushToDetail(item, idx)} style={{ width: "100%" }}>
                          <MobileProposalCard
                            data={item}
                            width={this.props.width}
                            categoryData={toJS(Partner.category_dic[idx])}
                            idx={idx}
                            handleIntersection={Producer.handleIntersection}
                            customer="partner"
                          />
                        </div>
                      </Background>
                    )}
                  </>
                );
              })}
          </div>

          <Text16 style={{ marginTop: "56px" }}>다양한 카테고리의 업체 전문가들을 찾고 있으신가요?</Text16>

          <SignupButtom>
            <ButtonText16>회원가입하기</ButtonText16>
          </SignupButtom>
        </InnerContainer>
      </Container>
    );
  }
}

export default MobileBanner2Container;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 841px;
  background-color: #f6f6f6;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.1);
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
  width: 347px;
`;

const Title20 = styled(Title.FontSize20)`
  font-weight: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: -0.5px;
  color: #282c36;
`;

const Text16 = styled(Text.FontSize16)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 3.13;
  letter-spacing: -0.4px;
  color: #282c36;
`;

const ButtonText16 = styled(Text.FontSize16)`
  font-family: NotoSansCJKkr;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 3.25;
  letter-spacing: -0.4px;
  color: #0933b3;
`;

const CategoryBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  // margin-top: 80px;
  margin: 80px 14px 0px 14px;
  border-bottom: solid 1px #c6c7cc;
  white-space: nowrap;
  width: 100%;

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

const SignupButtom = styled(Button)`
  width: 148px;
  height: 42px;
  border-radius: 29px;
  border: solid 1.5px #0933b3;
  margin-top: 33px;
  background: none;
`;
