import React from "react";
import styled, { css } from "styled-components";
import Router from "next/router";

import { GRAY, DARKGRAY, PRIMARY, WHITE } from "static/style";
import { inject, observer } from "mobx-react";

import RatioImage from "components/RatioImage";
import * as Text from "components/Text";

import ReviewContainer from "../Review/ReviewContainer";
import ImageContainer from "./Portfolio";

import { toJS } from "mobx";

@inject("Partner")
@observer
class DetailConatiner extends React.Component {
  componentDidMount = () => {
    // getPortfolio
    const { Partner } = this.props;
    console.log(toJS(Partner.partner_detail_list[0].item.id));

    Partner.getPortfolio(Partner.partner_detail_list[0].item.id);
  };
  onClickReviewHandler = () => {
    const { Partner } = this.props;

    // if (Partner.ReviewActiveIndex === idx) {
    //   console.log(`review false : ${idx}`);
    //   this.setState({ activeReview: false });
    //   Partner.ReviewActive = false;
    //   Partner.ReviewActiveIndex = -1;
    //   Partner.partnerName = "";
    // } else {
    //   console.log(`review true : ${idx}`);
    //   this.setState({ activeReview: true });
    //   Partner.ReviewActive = true;
    //   Partner.ReviewActiveIndex = idx;
    //   Partner.partnerName = name;
    // }
    if (Partner.ReviewActive) {
      //   console.log(`review false : ${idx}`);
      this.setState({ activeReview: false });
      Partner.ReviewActive = false;
      //   Partner.ReviewActiveIndex = -1;
      Partner.partnerName = "";
    } else {
      //   console.log(`review true : ${idx}`);
      this.setState({ activeReview: true });
      Partner.ReviewActive = true;
      //   Partner.ReviewActiveIndex = idx;
      Partner.partnerName = Partner.partner_detail_list[0].item.name;
    }
  };

  render() {
    const { Partner, width } = this.props;
    return (
      <div>
        {console.log(toJS(Partner.detail))}
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
              {/* {Partner.detail.name && Partner.detail.name} */}
              {Partner.partner_detail_list[0].item.name}
            </Text.FontSize20>
          </W30>
          <W30 center>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>
              전화번호
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {/* {Partner.detail.employee} */}
              {Partner.partner_detail_list[0].item.user.phone
                ? Partner.partner_detail_list[0].item.user.phone
                : "전화번호 없음"}
            </Text.FontSize20>
          </W30>

          <W30>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>
              지역
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {/* {console.log(toJS(Partner.partner_detail_list[0].item.city))} */}
              {Partner.getCityName(Partner.partner_detail_list[0].item.city)}
            </Text.FontSize20>
          </W30>

          <W50>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>
              회사 소개서
            </Text.FontSize20>
            <a href={Partner.partner_detail_list[0].item.file}>
              {Partner.partner_detail_list[0].item.file &&
                decodeURI(
                  Partner.partner_detail_list[0].item.file.split("/").pop()
                )}
            </a>
          </W50>

          <W50>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>
              이력서
            </Text.FontSize20>
            <a href={Partner.partner_detail_list[0].item.resume}>
              {Partner.partner_detail_list[0].item.resume &&
                decodeURI(
                  Partner.partner_detail_list[0].item.resume.split("/").pop()
                )}
            </a>
          </W50>

          {/* <W30>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>
              지역
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {Partner.getRegionNameById(Partner.partner_detail_list[0].city)}
              sdfdsfdsfds
            </Text.FontSize20>
          </W30> */}

          {/* {Partner.detail.product_possible &&
            Partner.detail.product_possible.length > 0 && ( */}
          <W100>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>
              가능한 제품 분야
            </Text.FontSize20>
            <BadgeList>
              {Partner.category_name_list &&
                Partner.category_name_list.map((item, idx) => {
                  return (
                    <Badge>
                      <Text.FontSize20
                        color="#404040"
                        fontWeight={500}
                        style={{ whiteSpace: "break-spaces" }}
                      >
                        {item}
                      </Text.FontSize20>
                    </Badge>
                  );
                })}
            </BadgeList>
          </W100>
          {/* )} */}
          {/* {Partner.detail.product_history &&
            Partner.detail.product_history.length > 0 && ( */}
          <W100>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>
              진행한 제품들
            </Text.FontSize20>
            <BadgeList>
              {/* {Partner.detail.product_history.map((item, idx) => {
                    return ( */}
              <Badge style={{ width: "100%" }}>
                <Text.FontSize20
                  color="#404040"
                  fontWeight={500}
                  style={{
                    width: "100%",
                    whiteSpace: "break-spaces",
                    wordBreak: "break-word",
                  }}
                >
                  {/* #{item.subclass} */}
                  {Partner.partner_detail_list[0].item.history}
                </Text.FontSize20>
              </Badge>
              {/* ); */}
              {/* })} */}
            </BadgeList>
          </W100>

          <W100>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>
              회사 소개
            </Text.FontSize20>
            <BadgeList>
              {/* {Partner.detail.product_history.map((item, idx) => {
                    return ( */}
              <Badge style={{ width: "100%" }}>
                <Text.FontSize20
                  color="#404040"
                  fontWeight={500}
                  style={{
                    width: "100%",
                    whiteSpace: "break-spaces",
                    wordBreak: "break-word",
                  }}
                >
                  {/* #{item.subclass} */}
                  {Partner.partner_detail_list[0].item.info_company}
                </Text.FontSize20>
              </Badge>
              {/* ); */}
              {/* })} */}
            </BadgeList>
          </W100>

          <W100>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>
              파일
            </Text.FontSize20>
            <ImageContainer
              file={Partner.partner_detail_list[0].item.file}
              width={width}
            />
          </W100>
          <Review>
            <div onClick={() => this.onClickReviewHandler()}>
              <span>리뷰 보기</span>
            </div>
          </Review>
          {/* )} */}
        </Content>

        {this.props.Partner.ReviewActive && (
          <>
            <ReviewContainer
              // data={data}
              width={width}
              Partner={Partner}
              // categoryData={categoryData}
              // idx={idx}
            />
          </>
        )}
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
  //background-color: #f8f8f8;
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

const W50 = styled.div`
  display: flex;
  margin-bottom: 20px;

  > p:nth-of-type(1) {
    width: 120px;
  }

  > p:nth-of-type(2) {
    margin-left: 20px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    > p:nth-of-type(2) {
      margin-left: auto;
    }
    > a {
      font-size: 12px;
      word-break: break-all;
    }
  }
  @media (min-width: 768px) {
    width: calc((100% - 28px) / 2);
    ${(props) =>
      props.center &&
      css`
        margin-right: 14px;
        margin-left: 14px;
      `}
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
  justify-content: space-between;
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
const Review = styled.div`
  //   position: absolute;
  //   top: 15px;
  //   right: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  width: 100%;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 40px;
    border-radius: 5px;
    background-color: #0933b3;
    color: #ffffff;
    span {
      font-size: 16px;
      font-weight: 500;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    // width: 80px;
    // height: 20px;
    > div {
      > span {
        font-size: 11px;
      }
    }
  }
`;
