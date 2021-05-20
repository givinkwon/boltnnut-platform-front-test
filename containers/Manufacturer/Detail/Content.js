import React from "react";
import styled, { css } from "styled-components";
import Router from "next/router";

import { GRAY, DARKGRAY, PRIMARY, WHITE } from "static/style";
import { inject, observer } from "mobx-react";

import RatioImage from "components/RatioImage";
import * as Text from "components/Text";

@inject("Partner")
@observer
class DetailConatiner extends React.Component {
  render() {
    const { Partner } = this.props;
    return (
      <div>
        <Header>
          <Text.FontSize20 color={WHITE} fontWeight={700}>
            회사정보
          </Text.FontSize20>
        </Header>
        <Content>
          <W30>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>
              회사이름
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {/* {Partner.detail.name} */}
              {Partner.partner_detail_list[0].name}
            </Text.FontSize20>
          </W30>
          <W30 center>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>
              종업원 수
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {/* {Partner.detail.employee} */}
              sdfdsfdsfsdfdsf
            </Text.FontSize20>
          </W30>
          <W30>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>
              설립연도
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {/* {Partner.detail.career} */}
              sdfdsfdsfdsf
            </Text.FontSize20>
          </W30>
          <W30>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>
              매출액
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {/* {Partner.detail.revenue}백만원 */}
              sdfdsfdsf
            </Text.FontSize20>
          </W30>
          <W30 center>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>
              시/도
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {Partner.getCityName(Partner.partner_detail_list[0].city)}
              sfdsfdsfdsf
            </Text.FontSize20>
          </W30>
          <W30>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>
              지역
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {Partner.getRegionNameById(Partner.partner_detail_list[0].city)}
              sdfdsfdsfds
            </Text.FontSize20>
          </W30>

          {/* {Partner.detail.product_possible &&
            Partner.detail.product_possible.length > 0 && (
              <W100>
                <Text.FontSize20 color={PRIMARY} fontWeight={700}>
                  가능한 제품 분야
                </Text.FontSize20>
                <BadgeList>
                  {Partner.detail.product_possible.map((item, idx) => {
                    return (
                      <Badge key={idx}>
                        <Text.FontSize20 color="#404040" fontWeight={500}>
                          #{item.subclass}
                        </Text.FontSize20>
                      </Badge>
                    );
                  })}
                </BadgeList>
              </W100>
            )} */}
          {/* {Partner.detail.product_history &&
            Partner.detail.product_history.length > 0 && (
              <W100>
                <Text.FontSize20 color={PRIMARY} fontWeight={700}>
                  진행한 제품들
                </Text.FontSize20>
                <BadgeList>
                  {Partner.detail.product_history.map((item, idx) => {
                    return (
                      <Badge key={idx}>
                        <Text.FontSize20 color="#404040" fontWeight={500}>
                          #{item.subclass}
                        </Text.FontSize20>
                      </Badge>
                    );
                  })}
                </BadgeList>
              </W100>
            )} */}
        </Content>
      </div>
    );
  }
}

export default DetailConatiner;

const BadgeList = styled.div`
  margin-top: 15px;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  border: solid 1px #dedede;
  padding: 5px 10px;
  background-color: #fff;
`;
const Badge = styled.div`
  margin: 4px;
  display: flex;
  align-items: center;
  padding: 7px;
  background-color: #f8f8f8;
  border-radius: 4px;
  > img {
    width: 30px;
    height: 30px;
    margin-left: 12px;
    cursor: pointer;
  }
  > p {
    flex-shrink: 0;
  }
`;
const W100 = styled.div`
  width: 100%;
  margin: 10px 0px;
`;
const Header = styled.div`
  height: 55px;
  background-color: ${PRIMARY};

  display: flex;
  align-items: center;

  padding: 0 15px;
`;
const Content = styled.div`
  background-color: #f2f2f2;
  padding: 20px;

  display: flex;
  flex-wrap: wrap;

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 30px 15px 20px;
  }
`;
const W30 = styled.div`
  display: flex;
  margin-bottom: 20px;
  > p:nth-of-type(1) {
    width: 80px;
  }

  > p:nth-of-type(2) {
    margin-left: 20px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    > p:nth-of-type(2) {
      margin-left: auto;
    }
  }
  @media (min-width: 768px) {
    width: calc((100% - 28px) / 3);
    ${(props) =>
      props.center &&
      css`
        margin-right: 14px;
        margin-left: 14px;
      `}
  }
`;
