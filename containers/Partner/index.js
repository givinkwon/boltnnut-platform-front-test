import React, { useCallback } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";

import Container from "components/Container";

import BannerContainer from "./Banner";
import SearchBarContainer from "./SearchBar";
import MenuContainer from "./Menu";
import ContentContainer from "./Content";

@inject("Partner")
@observer
class PartnerConatiner extends React.Component {
  async componentDidMount() {
    await this.props.Partner.init();
    this.props.Partner.search_text = await this.props.query.q;
    await this.props.Partner.searchjust();
  }
  render() {
    return (
      <>
        <BannerContainer />
        <SearchBarContainer />
        <CustomContainer>
          <MenuContainer />
          <ContentContainer />
        </CustomContainer>
      </>
    );
  }
}

export default PartnerConatiner;

const CustomContainer = styled(Container)`
  display: flex;
  @media (min-width: 0px) and (max-width: 767.98px) {
      
    flex-direction: column;
  }
`;
