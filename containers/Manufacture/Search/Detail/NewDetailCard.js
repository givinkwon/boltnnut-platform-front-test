import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import ContainerV1 from "components/ContainerV1";
import PortfolioConatiner from "./Portfolio";

@inject("Partner", "Auth", "Common")
@observer
class NewDetailCardContainer extends React.Component {
  componentDidMount() {
    console.log(Partner.partner_detail_list[0].item);
  }
  render() {
    const { Partner } = this.props;
    return (
      <div>
        <ContainerV1>
          <PortfolioConatiner
            data={Partner.partner_detail_list[0].item}
            // width={width}
          />
        </ContainerV1>
      </div>
    );
  }
}

export default NewDetailCardContainer;
