import React from "react";

// import Container from 'components/Container'
// import Section from 'components/Section'

import BannerConatiner from "./Banner";
import SearchBar from "./SearchBar";
import ContentConatiner from "./Content";

class ManufacturerConatiner extends React.Component {
  render() {
    return (
      <>
        <BannerConatiner />
        <SearchBar />
        <ContentConatiner />
      </>
    );
  }
}

export default ManufacturerConatiner;
