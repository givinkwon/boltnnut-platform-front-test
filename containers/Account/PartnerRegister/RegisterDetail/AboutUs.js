import React, { Component } from "react";
import InnerBox from "components/InnerBox";
import * as Content from "components/Content";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import InputComponent from "components/Input2";
import * as Title from "components/Title";
import TextFieldComponent from "components/Input";
import LocationContainer from "containers/Account/Profile/LocationSearchModal";
import Select from "components/Select";

const getEmployee = [
  { label: "1~4인", value: 0 },
  { label: "5~9인", value: 1 },
  { label: "10~29인", value: 2 },
  { label: "30~49인", value: 3 },
  { label: "50~99인", value: 4 },
  { label: "100~199인", value: 5 },
  { label: "200~299인", value: 6 },
  { label: "300~499인", value: 7 },
  { label: "500~999인", value: 8 },
  { label: "1000인 이상", value: 9 },
];

const getRevenue = [
  { label: "5천만원 미만", value: 0 },
  { label: "5천~1억원 미만", value: 1 },
  { label: "1억~5억원 미만", value: 2 },
  { label: "5억~10억원 미만", value: 3 },
  { label: "10억원~50억원 미만", value: 4 },
  { label: "50억~100억원 미만", value: 5 },
  { label: "100억~200억원 미만", value: 6 },
  { label: "200억~400억원 미만", value: 7 },
  { label: "400억~600억원 미만", value: 8 },
  { label: "600억~800억원 미만", value: 9 },
  { label: "800억~1000억원 미만", value: 10 },
  { label: "1000억~1500억원 미만", value: 11 },
  { label: "1500억원 이상", value: 12 },
];

const customStyles = {
  dropdownIndicator: () => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menuList: (provided, state) => ({
    ...provided,
    maxHeight: "100%",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#000000" : "#555555",
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: "10px 14px",
    fontSize: 18,
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    letterSpacing: "-0.45px",
  }),
  control: () => ({
    fontSize: 18,
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    letterSpacing: "-0.45px",
    color: "#282c36",
    width: 377,
    height: 42,
    border: "solid 1px #c6c7cc",
    display: "flex",
    borderRadius: 3,
    padding: 0,
    paddingRight: 7,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

@inject("Category", "Partner")
@observer
class AboutUsContainer extends Component {
  componentDidMount() {
    // console.log("===================================");
    // console.log(toJS(this.props.Category.mainbusiness_list));
    // console.log(toJS(this.props.Category.maincategory_list));
    // console.log(toJS(this.props.Category.category_list));
    // console.log("===================================");
    // this.props.Category.isChecked("category");

    //내용 차면 바뀌게 처리해야됨
    this.props.Category.nextBtnActive = true;
  }
  render() {
    const { Category, Partner } = this.props;
    const t = "asd\nsad";

    return (
      <>
        <Font18 style={{ textAlign: "left", width: "100%", marginBottom: 16 }}>
          회사 소개를 작성해주세요
        </Font18>

        <InputComponent
          class="Input"
          boxHeight="159px"
          placeholder="업종, 설비, 개발품 등 최대한 내용을 상세히 작성해주세요.&#13;&#10;예시)<설비>프레스 80~250톤, N/C Feeder, 샤링기, 밀링기, 연마기, 컷팅기, 각종 측정장비 보유"
          // onFocus={(e) => (e.target.placeholder = "")}
          onChange={(e) => {
            Category.setPartnerInfo(e);
          }}
        />

        <Font18 style={{ textAlign: "left", width: "100%", marginBottom: 16 }}>
          회사 위치
        </Font18>

        <LocationBox>
          <InlineFlexDiv>
            <AddressBox>
              <Font16>{Category.locationZipCode}</Font16>
            </AddressBox>
            <SearchBtn
              onClick={() => {
                Category.locationModalActive = true;
              }}
            >
              주소검색
            </SearchBtn>
          </InlineFlexDiv>
          <InlineFlexDiv>
            <AddressBox>
              <Font16>{Category.LocationAddress}</Font16>
            </AddressBox>
          </InlineFlexDiv>
          {/* <DeliveryAddressBox2>{this.props.Payment.address}</DeliveryAddressBox2> */}
          {Category.LocationAddress != "" && (
            <InlineFlexDiv>
              <InputComponent
                boxHeight={"42px"}
                class="Input"
                placeholder="상세주소를 입력해 주세요"
                onChange={() => {
                  console.log("r");
                }}
              />
            </InlineFlexDiv>
          )}
        </LocationBox>

        {Category.locationModalActive && (
          <Layer
            onClick={() => {
              Category.locationModalActive = !Category.locationModalActive;
            }}
          >
            <span>
              <LocationContainer />
            </span>
          </Layer>
        )}
        {/* <LocationContainer /> */}
        <Font18 style={{ textAlign: "left", width: "100%", marginBottom: 16 }}>
          회사소개서 파일을 업로드해주세요
        </Font18>
        {Category.partnerInfoFile && (
          <Font16
            style={{ textAlign: "left", width: "100%", marginBottom: 16 }}
          >
            {Category.partnerInfoFile.name}
          </Font16>
        )}

        <InputComponent
          file={true}
          onChange={(e) => {
            Category.setPartnerInfoFile(e);
          }}
        />

        <Font18 style={{ textAlign: "left", width: "100%", marginBottom: 16 }}>
          제품 사진 파일을 업로드해주세요
        </Font18>

        {Category.partnerPortfolioArray.length > 0 && Category.partnerPortfolioArray.map((item) => {
          return (
          <Font16
            style={{ textAlign: "left", width: "100%", marginBottom: 16 }}
          >
            {item.name}
          </Font16>
          )
          }
        )}

        <InputComponent
          file={true}
          onChange={(e) => {
            Category.setPartnerPortfolioFile(e);
          }}
        />

        <Font18 style={{ textAlign: "left", width: "100%", marginBottom: 16 }}>
          진행한 제품군을 작성해주세요
        </Font18>

        <InputComponent
          class="Input"
          boxHeight="159px"
          placeholder="예시) 에어컨, 공기 청정기, 제습기, 에어컨, 공기 청정기, 제습기 에어컨, 공기 청정기, 제습기"
          // onFocus={(e) => (e.target.placeholder = "")}
          onChange={(e) => {
            Category.setPartnerHistory(e);
          }}
        />

        <RegisterBox>
          <InputInnerBox>
            <Title18>대표자<span>*</span></Title18>
            <CustomInput
              value={Partner.CEO_name}
              placeholder="대표자 명을 적어주세요"
              onChange={(e) => Partner.set_CEO_name(e.target.value)}
            />            
          </InputInnerBox>

          <InputInnerBox>
            <Title18>직원 수<span>*</span></Title18>
            <Select
              styles={customStyles}
              options={getEmployee}
              value={Partner.employee}

              getOptionLabel={(option) => option.label}
              placeholder="직원 수를 선택해주세요"
              onChange={Partner.set_employee}
            />
          </InputInnerBox>

        </RegisterBox>

        <RegisterBox>
          <InputInnerBox>
              <Title18>총 매출액<span>*</span></Title18> 
              <Select
              styles={customStyles}
              options={getRevenue}
              value={Partner.revenue}

              getOptionLabel={(option) => option.label}
              placeholder="최근연도 매출을 선택해주세요"
              onChange={Partner.set_revenue}
            />

            </InputInnerBox>
            <InputInnerBox>
              <Title18>설립연도<span>*</span></Title18>
              <CustomInput
                value={Partner.year}
                placeholder="설립연도를 적어주세요"
                onChange={(e) => Partner.set_year(e.target.value)}
              />
          </InputInnerBox>
        </RegisterBox>
        
        <RegisterBox>
          <InputInnerBox>
              <Title18>인증</Title18>
              <CustomInput 
                value={Partner.certification}
                placeholder=" ISO900, ISO901"
                onChange={(e) => Partner.set_certification(e.target.value)}
              />
          </InputInnerBox>
        </RegisterBox>
      </>
    );
  }
}

export default AboutUsContainer;
const InlineFlexDiv = styled.div`
  width: 70%;
  display: flex;
  margin-bottom: 10px;
`;

const SearchBtn = styled.button`
  cursor: pointer;
  width: 113px;
  height: 42px;
  border-radius: 3px;
  border: solid 1px #c6c7cc;
  font-size: 18px;
  background-color: white;
  margin-left: 15px;
`;
const AddressBox = styled.div`
  display: flex;
  width: 100%;
  height: 42px;
  border: none;
  align-items: center;
  background-color: #f6f6f6;
  font-size: 18px;
  padding-left: 15px;
`;

const LocationBox = styled.div`
  width: 100%;
`;
const Font18 = styled(Content.FontSize18)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
  text-align: left;
  color: #1e2222;
`;

const Font16 = styled(Content.FontSize16)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  /* line-height: 2.13;
  letter-spacing: -0.4px; */
  text-align: left;
  color: #1e2222;
`;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.5);

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;


/// 기본정보용
const RegisterBox = styled.div`
  width : 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  margin-top: 32px;
`;

const InputInnerBox = styled.div`
  width : 384px;
  padding : 0px;
  margin : 0px;
  margin-right: 24px;
  display: block;

`;


const CustomInput = styled.input`
  border-radius: 3px;
  padding : 0px;
  margin : 0px;
  width: 384px;
  height: 42px;
  font-size: 16px;
  border: solid 1px #c6c7cc;
  ::placeholder {
    color: #c7c7c7;
  }

  :focus {
    background-color: #edf4fe;
    outline: none;
  }
`;

const Title18 = styled(Title.FontSize18)`
  width: 384px;
  margin-right : 8px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
  color: #1e2222;
  margin-bottom: 10px;
  > span {
    margin-left : 8px;
    color : #e53c38;
  }
`;