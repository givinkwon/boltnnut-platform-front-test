import React, { Component } from "react";
import * as Content from "components/Content";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import InputComponent from "components/Input2";
import TextAreaComponent from "components/TextArea";
import MultipleInput from "components/MultipleInput";
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
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    letterSpacing: "-0.45px",
  }),
  control: () => ({
    fontSize: 16,
    fontWeight: "normal",
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
  placeholder: () => ({
    color: "#c6c7cc",
    fontSize: 16,
    fontWeight: "normal",
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

  componentWillUnmount() {
    const { Category } = this.props;

    Category.partnerInfoFile = null;
    Category.partnerPortfolioArray = [];
  }

  render() {
    const { Category, Partner } = this.props;
    return (
      <>
        <Font18
          style={{
            textAlign: "left",
            width: "100%",
            margin: "12px 0px 8px 0px",
          }}
        >
          회사 소개를 작성해주세요<span>*</span>
        </Font18>

        <Font16
          style={{
            width: "100%",
            marginBottom: 16,
            color: "#767676",
          }}
        >
          - 파트너 소개를 구체적으로 작성해주실수록 매칭 가능한 고객이
          많아집니다.
        </Font16>

        <TextAreaComponent
          class="Input"
          boxHeight="159px"
          placeholder="업종, 설비, 개발품 등 최대한 내용을 상세히 작성해주세요.&#13;&#10;
          예시)&#13;&#10;<설비>&#13;&#10;프레스 80~250톤, N/C Feeder, 샤링기, 밀링기, 연마기, 컷팅기, 각종 측정장비 보유"
          onChange={(e) => {
            Category.setPartnerInfo(e);
          }}
        />

        <Font18
          style={{
            textAlign: "left",
            width: "100%",
            margin: "70px 0px 12px 0px",
          }}
        >
          회사 위치<span>*</span>
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

        <div
          style={{
            display: "inline-flex",
            justifyContent: "flex-start",
            marginTop: 60,
            width: 794,
          }}
        >
          <div>
            <Font18>
              회사 소개서 파일을 업로드해주세요
              <span>*</span>
            </Font18>
          </div>

          <div
            style={{ display: "flex", alignItems: "center", marginLeft: 12 }}
          >
            <Font14>PPT 또는 PDF 자료만 업로드 가능합니다.</Font14>
          </div>
        </div>

        {Category.partnerInfoFile && (
          <PartnerInfoFileBox>
            <img
              src="/static/images/partnerregister/cripicon.svg"
              style={{ margin: "0px 15px 0px 17px" }}
            />
            <Font16>{Category.partnerInfoFile.name}</Font16>
          </PartnerInfoFileBox>
        )}

        <InputComponent
          file={true}
          onChange={(e) => {
            Category.setPartnerInfoFile(e);
          }}
        />

        <Font18
          style={{
            width: "100%",
            margin: "60px 0px 8px 0px",
          }}
        >
          사진 파일을 업로드해주세요<span>*</span>
        </Font18>

        <Font16
          style={{
            width: "100%",
            marginBottom: 16,
            color: "#767676",
          }}
        >
          - 포트폴리오에 등록될 제품 사진들을 첨부해주세요. 최소 5개 이상의 사진
          파일을 업로드 해주세요.
        </Font16>

        <PartnerPortfolioBox>
          {Category.imgUrl.length > 0 &&
            Category.imgUrl.map((item, idx) => (
              <div
                key={idx}
                style={{
                  border: "solid 1px #c6c7cc",
                  borderRadius: 3,
                  objectFit: "contain",
                }}
              >
                <img
                  src={item}
                  style={{ width: 100, height: 100, borderRadius: 3 }}
                />
              </div>
            ))}
        </PartnerPortfolioBox>

        <MultipleInput
          file={true}
          onChange={(e) => {
            console.log("qweqwe", e);
            Category.setPartnerPortfolioFile(e);
          }}
        />

        <TipContainer>
          <Font15>TIP</Font15>

          <div style={{ marginTop: 12 }}>
            <TipContainerInnerBox>
              <TipImgBox>
                <img src="/static/images/partnerregister/tipicon.svg" />
              </TipImgBox>

              <Font14 style={{ color: "#0933b3" }}>
                포트폴리오 사진을 많을수록 고객과 매칭 확률이 높아집니다.
              </Font14>
            </TipContainerInnerBox>

            <TipContainerInnerBox style={{ marginTop: 11 }}>
              <TipImgBox>
                <img src="/static/images/partnerregister/tipicon.svg" />
              </TipImgBox>

              <Font14 style={{ color: "#0933b3" }}>
                이미지가 선명하고 깔끔해야 고객이 포트폴리오를 쉽게 확인할 수
                있습니다.
              </Font14>
            </TipContainerInnerBox>
          </div>
        </TipContainer>

        <Font18
          style={{
            textAlign: "left",
            width: "100%",
            margin: "60px 0px 8px 0px",
          }}
        >
          진행한 제품군을 작성해주세요<span>*</span>
        </Font18>

        <Font16
          style={{
            width: "100%",
            marginBottom: 16,
            color: "#767676",
          }}
        >
          - 지금까지 진행해온 제품군을 상세히 작성해주세요. 최소 3개 이상의
          제품을 작성해주세요.
        </Font16>

        <TextAreaComponent
          class="Input"
          boxHeight="159px"
          placeholder="예시) 에어컨, 공기 청정기, 제습기, 에어컨, 공기 청정기, 제습기 에어컨, 공기 청정기, 제습기"
          onChange={(e) => {
            Category.setPartnerHistory(e);
          }}
        />

        <RegisterBox style={{ marginTop: 70 }}>
          <InputInnerBox>
            <Title18>
              대표자<span>*</span>
            </Title18>
            <CustomInput
              value={Partner.CEO_name}
              placeholder="대표자 성항을 입력해 주세요"
              onChange={(e) => Partner.set_CEO_name(e.target.value)}
            />
          </InputInnerBox>

          <InputInnerBox>
            <Title18>
              직원 수<span>*</span>
            </Title18>
            <Select
              styles={customStyles}
              options={getEmployee}
              value={Partner.employee}
              getOptionLabel={(option) => option.label}
              placeholder="선택해주세요"
              onChange={Partner.set_employee}
            />
          </InputInnerBox>
        </RegisterBox>

        <RegisterBox>
          <InputInnerBox>
            <Title18>
              총 매출액<span>*</span>
            </Title18>
            <Select
              styles={customStyles}
              options={getRevenue}
              value={Partner.revenue}
              getOptionLabel={(option) => option.label}
              placeholder="선택해주세요"
              onChange={Partner.set_revenue}
            />
          </InputInnerBox>
          <InputInnerBox>
            <Title18>
              설립연도<span>*</span>
            </Title18>
            <CustomInput
              value={Partner.year}
              placeholder="ex) 2000년"
              onChange={(e) => Partner.set_year(e.target.value)}
            />
          </InputInnerBox>
        </RegisterBox>

        <RegisterBox style={{ marginBottom: 70 }}>
          <InputInnerBox>
            <Title18>인증</Title18>
            <CustomInput
              value={Partner.certification}
              placeholder="ex) ISO900, ISO901"
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

  > span {
    margin-left: 8px;
    color: #e53c38;
  }
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

const Font14 = styled(Content.FontSize14)`
  font-family: NotoSansCJKkr;
  font-weight: normal;
  text-align: left;
  color: #c6c7cc;
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
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  margin-top: 32px;
`;

const InputInnerBox = styled.div`
  width: 384px;
  padding: 0px;
  margin: 0px;
  margin-right: 24px;
  display: block;
`;

const CustomInput = styled.input`
  border-radius: 3px;
  padding-left: 8px;
  width: 374px;
  height: 40px;
  font-size: 16px;
  border: solid 1px #c6c7cc;
  ::placeholder {
    color: #c7c7c7;
    font-size: 16px;
  }

  :focus {
    background-color: #edf4fe;
    outline: none;
  }
`;

const Title18 = styled(Title.FontSize18)`
  width: 384px;
  margin-right: 8px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
  color: #1e2222;
  margin-bottom: 10px;
  > span {
    margin-left: 8px;
    color: #e53c38;
  }
`;

const TipContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 35px;
  width: 792px;
  height: 86px;
  margin-top: 16px;
  background-color: #edf4fe;
`;

const TipContainerInnerBox = styled.div`
  display: flex;
  align-items: center;
`;

const TipImgBox = styled.span`
  margin-right: 12px;
`;

const Font15 = styled.p`
  font-family: NotoSansCJKkr;
  font-size: 15px;
  font-weight: 500;
  color: #0933b3;
  margin-top: 12px;
  margin-left: 26px;
`;

const PartnerInfoFileBox = styled.div`
  display: inline-flex;
  align-items: center;
  width: 792px;
  height: 42px;
  border-radius: 3px;
  border: solid 1px #c6c7cc;
`;

const PartnerPortfolioBox = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  width: 794px;
  gap: 15px;
  margin-bottom: 16px;
`;
