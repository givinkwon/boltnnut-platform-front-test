import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import * as Title from "components/Title";
import * as Text from "components/Text";
import SearchBar from "../Manufacture/Producer/SearchBar";

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

  // 검색함수
  search = async () => {
    const { Partner, ManufactureProcess } = this.props;
    
    await Router.push('/producer')
    // console.log("click");
    // alert("EXECUTE");
    Partner.loadingFlag = true;
    setTimeout(() => {
      Partner.loadingFlag = false;
    }, 3000);

    Partner.currentPage = 1;
    Partner.click_count += 1;
    await Partner.getPartner(Partner.currentPage, Partner.click_count);
    ManufactureProcess.PartnerCount = Partner.partner_count;
    console.log(toJS(ManufactureProcess.PartnerCount));
    if (Partner.search_text) {
      Partner.isSearched = true;
    } else {
      Partner.isSearched = false;
    }

    if (Partner.search_text != "") {
      // console.log("click2");
      if (ManufactureProcess.loadingSaveSearchText) {
        // console.log("click3");
        Partner.subButtonActive = true;
        console.log(Partner.subButtonActive);
        ManufactureProcess.saveSearchText(Partner.search_text);
        ManufactureProcess.loadingSaveSearchText = false;
        setTimeout(
          () => (ManufactureProcess.loadingSaveSearchText = true),
          2000
        );
      }
    }
  };

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
            </SearchBar>
          </LeftBox>

          <RightBox>
            <img src={banner0img} onClick={this.search} />
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
