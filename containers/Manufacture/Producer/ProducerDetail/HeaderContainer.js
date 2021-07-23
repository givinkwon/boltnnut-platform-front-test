import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";

const viewImg = "/static/images/producer/views.svg";
const bookmarkImg = "/static/images/producer/bookmark.svg";
const bookmarkBlueImg = "/static/images/producer/bookmark_blue.svg";

@inject("Partner", "Auth")
@observer
class HeaderContainer extends React.Component {
  componentDidMount = async () => {
    const { Partner, Auth } = this.props;

    const clientId = Auth.logged_in_client && Auth.logged_in_client.id;
    const partnerId = Partner.partner_detail_list[0].item.id;
    await Partner.existBookmarkPartner(clientId, partnerId);
    await Partner.getTotalBookmarkByPartner(partnerId);
  };
  render() {
    console.log("render");
    const { Partner, Auth } = this.props;
    const clientId = Auth.logged_in_client && Auth.logged_in_client.id;
    const partnerId =
      Partner.partner_detail_list[0] && Partner.partner_detail_list[0].item.id;
    const loggedInPartnerId =
      Auth.logged_in_partner && Auth.logged_in_partner.id;
    console.log(Partner.interestedIdx);

    return (
      <>
        <Container>
          {Partner.partner_detail_list.length != 0 && (
            <name>{Partner.partner_detail_list[0].item.name}</name>
          )}

          <ImgBox>
            <img src={viewImg} />

            <img
              src={Partner.interestedIdx ? bookmarkBlueImg : bookmarkImg}
              onClick={async () => {
                if (!loggedInPartnerId && clientId) {
                  Partner.clickHandler("interested");
                  Partner.checkedInterestedIdx(clientId, partnerId);
                  this.setState({ h: 3 });
                }
              }}
            />
            <span>{Partner.totalPartnerBookmark}</span>
          </ImgBox>
        </Container>
      </>
    );
  }
}

export default HeaderContainer;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 34px;
  > name {
    font-size: 26px;
    line-height: 52px;
    letter-spacinig: -0.65px;
    color: #282c36;
    font-weight: bold;
  }
`;

const ImgBox = styled.div``;
