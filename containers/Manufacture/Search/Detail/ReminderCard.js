import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import NewProposalCard from "./NewProposalCard";

@inject("Partner", "Auth", "Common")
@observer
class ReminderCardContainer extends React.Component {
  render() {
    const { Partner } = this.props;

    // 비슷한 업체 카드 배열 생성
    let index = 0;
    if (Partner.partner_detail_list[0]) {
      index = Partner.partner_detail_list[0].idx;
    }

    const length = Partner.partner_list.length;
    let arr = [];

    for (let i = 0; i < length; i++) {
      arr.push(i);
    }

    Partner.shuffleArray(arr);
    let remainderAry = arr.filter((el) => el !== index);

    return (
      <ReminderCardSection>
        <InnerBox>
          {Partner.partner_list &&
            remainderAry.map((item, idx) => {
              return (
                <ProposalCardBox
                  onClick={(e) => {
                    Partner.viewerLoading = 0;
                    Partner.recentPartnerId = Partner.partner_detail_list[0].item.id;
                    Partner.remindCardPushToDetail(Partner.partner_list[item], item);
                  }}
                >
                  <NewProposalCard
                    data={Partner.partner_list[item]}
                    width={this.props.width}
                    categoryData={toJS(Partner.category_dic[item])}
                    idx={item}
                    handleIntersection={this.handleIntersection}
                    customer="partner"
                  />
                </ProposalCardBox>
              );
            })}
        </InnerBox>
      </ReminderCardSection>
    );
  }
}

export default ReminderCardContainer;

const ReminderCardSection = styled.section`
  display: flex;
  width: 792px;
  height: 320px;
  margin-top: 24px;
  justify-content: space-between;

  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  /* ::-webkit-scrollbar-thumb {
    background-color: #fff;
  } */
`;

const InnerBox = styled.div`
  display: flex;
  gap: 15px;
`;

const ProposalCardBox = styled.div`
  width: 200px;
  height: 309px;
  cursor: pointer;
`;
