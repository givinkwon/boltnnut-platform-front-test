import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

import Container from "components/Container";
import Section from "components/Section";
import ButtonComponent from "components/Button";
import ButtonSpinnerComponent from "components/ButtonSpinner";
import CheckBoxComponent from "components/CheckBox";

import * as Text from "components/Text";
import { GRAY, DARKGRAY, PRIMARY, PRIMARY2, WHITE } from "static/style";

import Email from "./Step2/Email";
import Company from "./Step2/Company";
import Category from "./Step2/Category";
import Business from "./Step2/Business";
import Develop from "./Step2/Develop";
import Material from "./Step2/Material";
import File from "./Step2/File";
import MarketingModal from "./MarketingModal";
import PartnerEmailConatiner from "./Step2/partnerEmail";

import PartnerDetailContainer from "./Step2/PartnerDetailContainer";

const search_ic = "static/icon/search.png";

@inject("Auth", "Answer")
@observer
class Step2Conatiner extends React.Component {
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  componentDidMount() {
    const { Auth, Answer } = this.props;
    console.log(Auth.type);
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });

    if (Auth.type === "expert") {
      Answer.loadCategories();
    }
  }

  state = {
    width: 0,
    accept_terms: true,
    //   accept_marketing: false,
    open_marketing: false,
  };

  handleSubmit = () => {
    const { Auth } = this.props;

    if (!this.state.accept_terms) {
      alert("이용약관을 확인해주세요");
      return;
    }

    Auth.signup();
  };

  toggleCheckBox = () => {
    this.setState({
      ...this.state,
      accept_terms: !this.state.accept_terms,
    });
  };

  //  toggleCheckBox2 = () => {
  //    this.setState({
  //      ...this.state,
  //      accept_marketing: !this.state.accept_marketing,
  //    })
  //  }

  openMarketingModal = () => {
    this.setState({
      ...this.state,
      open_marketing: true,
    });
  };
  handleClose = () => {
    this.setState({
      ...this.state,
      open_marketing: false,
    });
  };

  render() {
    const { Auth } = this.props;
    const { width } = this.state;
    return (
      <SectionContainer style={{ paddingTop: 50, paddingBottom: 130 }}>
        <InfoContainer>
          <Container>
            {Auth.type === "client" && (
              <>
                <Email />
              </>
            )}
            {Auth.type === "expert" && (
              <>
                <PartnerEmailConatiner />
                <Company />
                <Business />
                <Category />
                <Develop />
                <Material />
                <File />
              </>
            )}
            {Auth.type === "detailexpert" && (
              <>
                <PartnerDetailContainer />
              </>
            )}
            {width > 767.98 ? (
              <>
                <TermsContainer>
                  <Terms>
                    <CheckBoxComponent
                      primary
                      checked={this.state.accept_terms}
                      onChange={this.toggleCheckBox}
                    >
                      <Text.FontSize20 fontWeight={300}>
                        <Link target="_blank" href="/term/policy">
                          이용약관&nbsp;
                        </Link>
                        및
                        <Link target="_blank" href="/term/personal">
                          &nbsp;개인정보 처리방침
                        </Link>
                        에 동의합니다.
                        <PrimaryColor>&nbsp;(필수)</PrimaryColor>
                      </Text.FontSize20>
                    </CheckBoxComponent>
                  </Terms>
                  <Terms>
                    <CheckBoxComponent
                      primary
                      checked={Auth.marketing}
                      onChange={Auth.setMarketing}
                      value={Auth.marketing}
                    >
                      <Text.FontSize20 fontWeight={300}>
                        <Link target="_blank" onClick={this.openMarketingModal}>
                          마케팅 정보 수신&nbsp;
                        </Link>
                        에 동의합니다. (선택)
                      </Text.FontSize20>
                    </CheckBoxComponent>
                    <MarketingModal
                      open={this.state.open_marketing}
                      handleClose={this.handleClose}
                      open_marketing={this.state.open_marketing}
                      accept_marketing={this.state.accept_marketing}
                    />
                  </Terms>
                </TermsContainer>
                <ButtonBox>
                  {/* <ButtonComponent backgroundColor='#e6e6e6' borderColor='#e6e6e6' borderRadius={100} onClick={() => Auth.setStep(0)}>
                  <Text.FontSize20 color='#a0a0a0' fontWeight={500}>이전</Text.FontSize20>
                </ButtonComponent> */}
                  <ButtonComponent
                    id="sign_up_button_complete_div"
                    backgroundColor={PRIMARY}
                    borderColor={PRIMARY}
                    borderRadius={100}
                    onClick={this.handleSubmit}
                  >
                    {Auth.loading ? (
                      <ButtonSpinnerComponent />
                    ) : (
                      <Text.FontSize20
                        id="sign_up_button_complete_p"
                        color={WHITE}
                        fontWeight={500}
                      >
                        가입완료
                      </Text.FontSize20>
                    )}
                  </ButtonComponent>
                </ButtonBox>
              </>
            ) : (
              <>
                <TermsContainer>
                  <Terms>
                    <CheckBoxComponent
                      primary
                      checked={this.state.accept_terms}
                      onChange={this.toggleCheckBox}
                    >
                      <span class="agreeText">
                        <Link target="_blank" href="/term/policy">
                          이용약관&nbsp;
                        </Link>
                        및
                        <Link target="_blank" href="/term/personal">
                          &nbsp;개인정보 처리방침
                        </Link>
                        에 동의합니다.
                        <PrimaryColor>&nbsp;(필수)</PrimaryColor>
                      </span>
                    </CheckBoxComponent>
                  </Terms>
                  <Terms style={{ marginLeft: 0 }}>
                    <CheckBoxComponent
                      primary
                      checked={Auth.marketing}
                      onChange={Auth.setMarketing}
                      value={Auth.marketing}
                    >
                      <span class="agreeText">
                        <Link target="_blank" onClick={this.openMarketingModal}>
                          마케팅 정보 수신&nbsp;
                        </Link>
                        에 동의합니다. (선택)
                      </span>
                    </CheckBoxComponent>
                    <MarketingModal
                      open={this.state.open_marketing}
                      handleClose={this.handleClose}
                      open_marketing={this.state.open_marketing}
                      accept_marketing={this.state.accept_marketing}
                    />
                  </Terms>
                </TermsContainer>
                <ButtonBox>
                  {/* <ButtonComponent backgroundColor='#e6e6e6' borderColor='#e6e6e6' borderRadius={100} onClick={() => Auth.setStep(0)}>
                  <Text.FontSize20 color='#a0a0a0' fontWeight={500}>이전</Text.FontSize20>
                </ButtonComponent> */}
                  <ButtonComponent
                    id="sign_up_button_complete_div"
                    backgroundColor={PRIMARY}
                    borderColor={PRIMARY}
                    borderRadius={100}
                    onClick={this.handleSubmit}
                  >
                    {Auth.loading ? (
                      <ButtonSpinnerComponent />
                    ) : (
                      <span
                        class="buttonText"
                        id="sign_up_button_complete_p"
                        color={WHITE}
                        fontWeight={500}
                      >
                        가입완료
                      </span>
                    )}
                  </ButtonComponent>
                </ButtonBox>
              </>
            )}
          </Container>
        </InfoContainer>
      </SectionContainer>
    );
  }
}

export default Step2Conatiner;

const SectionContainer = styled(Section)``;
const TermsContainer = styled.div`
  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;
const InfoContainer = styled.div`
  > div {
    display: flex;
    flex-direction: column;
  }

  > div > div {
    margin-right: auto;
    margin-left: auto;
  }
  ${Container} {
    @media (min-width: 0px) and (max-width: 767.98px) {
      padding: 0px 16px;
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
    }
    @media (min-width: 992px) and (max-width: 1299.98px) {
    }
    @media (min-width: 1300px) {
    }
  } //Container media
  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  } //InfoContainer media
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  div {
    border-radius: 3px;
    box-shadow: 0 3px 6px 0 rgba(123, 123, 123, 0.64);
    background-color: #0a2165;
    width: 147px;
    height: 52px;
    :hover {
      background-color: #0933b3;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      width: 120px;
    }
    .buttonText {
      font-size: 16px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.13;
      letter-spacing: -0.4px;
      color: #ffffff;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;

const Terms = styled.div`
  margin-top: 15px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    .agreeText {
      font-size: 12px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: -0.3px;
      color: #191919;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;
const Link = styled.a`
  color: #191919;
  display: inline-block;
  font-weight: 500;
  text-decoration: none;
`;
const PrimaryColor = styled.a`
  display: inline-block;
  color: ${PRIMARY2};
`;
