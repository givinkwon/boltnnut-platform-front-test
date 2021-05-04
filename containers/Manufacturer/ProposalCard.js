import React from "react";
import styled from "styled-components";

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
    // const {
    //   data,
    //   middleCategory,
    //   mainCategory,
    //   newData,
    //   checkTotal,
    //   customer,
    // } = this.props;
    const { data } = this.props;
    const { width } = this.state;

    return (
      <>
        <Card>
          {/* <HeaderWrapper>
            <Title>sdfdsf</Title>
            <Content>sdfdsf</Content>
          </HeaderWrapper>
          <CategoryWrapper>
            <SubTitle>
              <span>카테고리</span>
            </SubTitle>
            <CategoryBox>
              <span>sdfdsf</span>
            </CategoryBox>
            <CategoryBox>
              <span>dsfdsf</span>
            </CategoryBox>
          </CategoryWrapper>
          <FooterWrapper>
            <div style={{ display: "inline-flex" }}>
              <SubTitle>희망개발기간</SubTitle>
              <Content>sdfdsf</Content>
            </div>
            <PriceTagBox>
              <span class="tag1"> 견적 </span>
              <span class="tag2">dsfdsf</span>
            </PriceTagBox>
          </FooterWrapper> */}
          <Header>
            <Logo>
              <img src={data.results.logo} />
            </Logo>
          </Header>
          <Main>
            <Name>{data.results.name}</Name>
            <InfoOne>Info1</InfoOne>
            <InfoTwo>Info2</InfoTwo>
          </Main>
        </Card>
      </>
    );
  }
}

export default ProposalCard;

const Card = styled.div`
  width: 100%;
  //width: 987px;
  position: relative;
  object-fit: contain;
  border-radius: 10px;
  //box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border: 2px solid #0933b3;
  background-color: #ffffff;
  display: flex;

  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 108px;

    padding-left: 14px;
    padding-right: 14px;
    padding-top: 7px;
    padding-bottom: 14px;
    margin-top: 14px;
    box-sizing: border-box;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 100%;
    margin-bottom: 34px;
    padding: 33px 0px 30px 34px;
    box-sizing: border-box;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    height: 100%;
    margin-bottom: 34px;
    padding: 33px 0px 30px 34px;
    box-sizing: border-box;
  }
  @media (min-width: 1300px) {
    height: 195px;
    margin-bottom: 34px;
    padding: 33px 0px 30px 34px;
    box-sizing: border-box;
  }
`;

const Header = styled.div`
  border: 2px solid red;
  flex-grow: 1;
`;
const Logo = styled.div``;
const Main = styled.div`
  border: 2px solid blue;
  flex-grow: 3;
`;
const Name = styled.div``;
const InfoOne = styled.div``;
const InfoTwo = styled.div``;
