import React, { useCallback } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";

import BannerContainer from "./Banner";
import SearchBarContainer from "./SearchBar";
import MenuContainer from "./Menu";
import ContentContainer from "./Content";
import SearchBannerContainer from "./Search";

@inject("Partner", "Request")
@observer
class PartnerConatiner extends React.Component {
  state = {
    width: 0,
  }
  async componentDidMount() {
    await this.props.Partner.init();
    this.props.Partner.search_text = await this.props.query.q;
    await this.props.Partner.searchjust();
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render() {
    const { width } = this.state
    return (
      <div style={{overflow: 'hidden'}}>
      { width > 767.99 ? (
      <div style={{overflow: 'hidden'}}>
        <SearchBannerContainer/>
        <CustomContainer>
          <Container>
            <MenuContainer />
            <ContentContainer />
          </Container>
        </CustomContainer>
      </div>
        ) : (
      <div style={{overflow: 'hidden'}}>
        <SearchBannerContainer/>
        <CustomContainer>
            <ContentContainer />
        </CustomContainer>
      </div>
        )
      }
      </div>
    );
  }
}

export default PartnerConatiner;

const CustomContainer = styled.div`
  display: inline-flex;
  width: 100%;
  background-color : #f5f7f7;
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
    overflow: hidden;
  }
`;
const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  display: inline-flex;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }

  @media (min-width: 767.99px) and (max-width: 991.98px) {
    width: 720px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 930px;
  }

  @media (min-width: 1300px) {
    width: 1200px;
  }
`
