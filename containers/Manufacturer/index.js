import React from "react";

// import Container from 'components/Container'
// import Section from 'components/Section'

import BannerConatiner from "./Banner";
import SearchBar from "./SearchBar";
import MobileSearchBar from "./MobileSearchBar";
import ContentConatiner from "./Content";
import MobileContentConatiner from "./MobileContent";
import Container from "components/Containerv1";
import Background from "components/Background";

class ManufacturerConatiner extends React.Component {
  render() {
    return (
      <>
        {this.props.width &&
          (this.props.width > 767.99 ? (
            <div>
              <BannerConatiner />
              <Background>
                <Container>
                  <SearchBar />
                </Container>
              </Background>

              <ContentConatiner width={this.props.width} />
            </div>
          ) : (
            <>
              {console.log(this.props.width)}
              <MobileSearchBar />
              <MobileContentConatiner width={this.props.width} />
            </>
          ))}
      </>
    );
  }
}

export default ManufacturerConatiner;
