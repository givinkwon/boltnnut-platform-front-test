import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import * as PartnerAPI from "axios/Partner";
import Partner from "../../../stores/Partner";

@inject("Partner", "Auth")
@observer
class RecentPartnerContainer extends React.Component {
  render() {
    return (
      <>
        <Container>
          {Partner.recentPartnerList &&
            Partner.recentPartnerList.map((item, idx) => {
              return (
                <Item>
                  <span>{item.name}</span>
                </Item>
              );
            })}
        </Container>
      </>
    );
  }
}

export default RecentPartnerContainer;

const Container = styled.div``;

const Item = styled.div``;
