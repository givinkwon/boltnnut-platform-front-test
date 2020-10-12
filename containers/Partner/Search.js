import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import ButtonComponent from "components/Button";

import CheckClassModal from "CheckClassModal";
import CheckBoxComponent from "components/CheckBox";

import * as Text from "components/Text";
import { intcomma } from "utils/format";
import { WHITE, PRIMARY } from "static/style";
import SearchBarContainer from "./NewSearchBar";
import SearchBarContainer2 from "./NewSearchBar2";

@inject("Auth", "Partner")
@observer
class SearchBannerContainer extends React.Component {
  render () {
    return (
      <CustomContainer>
          <SearchBarContainer/>
          <SearchBarContainer2/>
      </CustomContainer>
    )
  }
}

export default SearchBannerContainer;


const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 720px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 930px;
  }

  @media (min-width: 1300px) {
    width: 1200px;
  }
`
const CustomContainer = styled(Container)`
  width: 100%;
  height:768px;
`
