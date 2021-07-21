import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import * as Title from "components/Title";
import * as Text from "components/Text";

const search = "/static/images/search.svg";
const banner0img = "/static/images/banner0img.png";

class NewBanner0Container extends React.Component {
  state = {
    text: "",
  };

  handleChangeInputValue(e) {
    this.setState({
      text: e.target.value,
    });
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "200px" }}>
        <Containerv1 style={{ justifyContent: "space-between" }}>
          <LeftBox>
            <Header>
              대한민국 제조사 정보
              <br />
              여기 다 있다.
            </Header>
            <Middle> 당신에게 맞는 제조사 정보를 바로 조회해보세요.</Middle>
            <SearchBar>
              <Input placeholder="원하는 분야나 비슷한 제품을 검색해보세요." onChange={this.handleChangeInputValue.bind(this)} value={this.state.text} />
              <img src={search} />
            </SearchBar>
          </LeftBox>

          <RightBox>
            <img src={banner0img} />
          </RightBox>
        </Containerv1>
      </div>
    );
  }
}

export default NewBanner0Container;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 558px;
`;

const RightBox = styled.div``;

const Header = styled(Title.FontSize48)`
  width: 420px;
  height: 151px;
  object-fit: contain;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -1.2px;
  color: #1e2222;
`;

const Middle = styled(Text.FontSize20)`
  width: 387px;
  height: 29px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.8;
  letter-spacing: -0.5px;
  text-align: left;
  color: #000000;
  margin-top: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  font-size: 18px;
  height: 59px;
  object-fit: contain;
  border-radius: 60px;
  box-shadow: 4px 5px 12px 0 rgba(146, 146, 146, 0.2);
  border: solid 1px #0933b3;
  background-color: #ffffff;
  margin-top: 80px;
  padding-left: 32px;
  padding-right: 32px;

  > img {
    cursor: pointer;
  }
`;

const Input = styled.input`
  border: none;
  border-radius: 60px;
  width: 100%;
  font-size: 18px;

  :focus {
    outline: none;
  }

  ::placeholder {
    object-fit: contain;
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.89;
    letter-spacing: -0.45px;
    text-align: left;
    color: #acadad;
  }
`;
