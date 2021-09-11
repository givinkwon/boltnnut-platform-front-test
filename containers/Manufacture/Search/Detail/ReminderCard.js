import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

import ProposalCard from "./ProposalCard";

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
      <InnerBox
        style={{
          width: 792,
          marginTop: 24,
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {Partner.partner_list &&
            (length < 4
              ? remainderAry.map((item, idx) => {
                  return (
                    <div
                      onClick={(e) => {
                        Partner.viewerLoading = 0;
                        Partner.recentPartnerId = Partner.partner_detail_list[0].item.id;

                        Partner.remindCardPushToDetail(Partner.partner_list[item], item);
                      }}
                      style={{
                        width: 225,
                        height: 309,
                        cursor: "pointer",
                      }}
                    >
                      <ProposalCard
                        data={Partner.partner_list[item]}
                        width={this.props.width}
                        height={309}
                        categoryData={toJS(Partner.category_dic[item])}
                        idx={item}
                        handleIntersection={this.handleIntersection}
                        customer="partner"
                      />
                    </div>
                  );
                })
              : remainderAry.splice(0, 3).map((item, idx) => {
                  return (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        Partner.viewerLoading = 0;
                        Partner.recentPartnerId = Partner.partner_detail_list[0].item.id;
                        Partner.remindCardPushToDetail(Partner.partner_list[item], item);
                      }}
                      style={{
                        width: 225,
                        height: 309,
                        cursor: "pointer",
                      }}
                    >
                      <ProposalCard
                        data={Partner.partner_list[item]}
                        width={this.props.width}
                        height={309}
                        categoryData={toJS(Partner.category_dic[item])}
                        idx={item}
                        handleIntersection={this.handleIntersection}
                        customer="partner"
                      />
                    </div>
                  );
                }))}
        </div>
      </InnerBox>
    );
  }
}

export default ReminderCardContainer;

const InnerBox = styled.div`
  display: flex;
`;
