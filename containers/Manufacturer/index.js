import React from "react";

// import Container from 'components/Container'
// import Section from 'components/Section'

import BannerConatiner from "./Banner";
import SearchBar from "./SearchBar";
import SearchFilterBox from "./SearchFilterBox";
import MobileSearchBar from "./MobileSearchBar";
import ContentContainer from "./Content";
import MobileContentContainer from "./MobileContent";
import Container from "components/Containerv1";
import Background from "components/Background";
import { inject, observer } from "mobx-react";
import DetailContainer from "./Detail/index";

@inject("Auth", "Partner")
@observer
class ManufacturerConatiner extends React.Component {
  async componentDidMount() {
    const { Auth, Partner } = this.props;
    Partner.newIndex = 0;
    await Auth.checkLogin();
  }

  render() {
    const { Auth, Partner } = this.props;
    return (
      <>
        {this.props.width &&
          (this.props.width > 767.99 ? (
            <div>
              {Partner.newIndex == 0 && (
                <>
                  <BannerConatiner />
                  <Background>
                    <Container>
                      <SearchBar />
                      {/* <SearchFilterBox /> */}
                    </Container>
                  </Background>

                  <ContentContainer width={this.props.width} />
                </>
              )}
              {Partner.newIndex == 1 && (
                <DetailContainer width={this.props.width} />
              )}
            </div>
          ) : (
            <>
              {Partner.newIndex == 0 && (
                <>
                  <MobileSearchBar />
                  <MobileContentContainer width={this.props.width} />
                </>
              )}
              {Partner.newIndex == 1 && (
                <DetailContainer width={this.props.width} />
              )}
            </>
          ))}
      </>
    );
  }
}

export default ManufacturerConatiner;
