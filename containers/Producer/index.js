import React from "react";

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
import MobileRequest from "./MobileRequest";
import MobileRequestDone from "./MobileRequestDone";

@inject("Auth", "Partner")
@observer
class ManufacturerConatiner extends React.Component {
  async componentDidMount() {
    const { Auth, Partner } = this.props;
    console.log("producer didmount");
    Partner.init();
    Partner.newIndex = 0;
    Partner.mobileRequestIndex = 0;
    await Auth.checkLogin();
  }
  componentWillUnmount = () => {
    console.log("producer unmount");
  };

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
                      <SearchFilterBox width={this.props.width} />
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
              {Partner.mobileRequestIndex == 0 && (
                <>
                  <MobileSearchBar width={this.props.width} />
                  <MobileContentContainer width={this.props.width} />
                </>
              )}
              {Partner.mobileRequestIndex == 1 && (
                <MobileRequest width={this.props.width} />
              )}
              {Partner.mobileRequestIndex == 2 && (
                <MobileRequestDone width={this.props.width} />
              )}
            </>
          ))}
      </>
    );
  }
}

export default ManufacturerConatiner;
