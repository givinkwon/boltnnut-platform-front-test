import React, {Component} from 'react';
import styled from 'styled-components';
import {PRIMARY, WHITE, DARKGRAY} from "static/style";
import * as Content from "components/Content";
import * as Title from "components/Title";
import StarRatingComponent from 'react-star-rating-component';

// 이미지테스트
const person = "/static/images/Home/Banner6/person.png";
const person_mob = "/static/images/Home/Banner6/person_mob.png";

//@inject('Answer')
//@observer
class ReviewCard extends Component {
    render() {
        const {item, big, footerimg} = this.props;
        if (item && !big) {
        return (
            <Card>
                <CardHeader>
                    <img src={item.logo}/>
                    <Name eng={true}>
                        {item.name}<br/>
                        <MyStarRatingComponent
                          value={5}
                          starColor={'#0a2165'}
                        />
                    </Name>
                </CardHeader>
                <ContentBox>
                    {item.review}
                </ContentBox>
            </Card>
        )} else if (item && big) {
            return (
                <BigCard>
                    <CardHeader marginLeft={30}>
                        <img src={item.logo} marginRight={28}/>
                        <Name eng={true}>
                            {item.name}<br/>
                            <MyStarRatingComponent
                              value={5}
                              starColor={'#0a2165'}
                            />
                        </Name>
                    </CardHeader>
                    <ContentTitle style={{whiteSpace:'pre-line'}}>
                        {item.title ? item.title : ""}
                    </ContentTitle>
                    <ContentBox2>
                        {item.review}
                    </ContentBox2>
                    { footerimg &&
                    <ImageBox>
                        <ContentBox style={{fontWeight: 500}}>
                            김율 대표님
                        </ContentBox>
                        <img src={person_mob} style={{width:173, height:149, marginRight:20}}/>
                    </ImageBox>
                    }
                </BigCard>
            )
        }
    }
}

export default ReviewCard

/////////////////// ReviewCard1 ////////////////////

const Card = styled.div`
    width: 384px;
    height: 254px;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    @media (min-width: 0px) and (max-width: 767.98px) {
        width: 14%;
        height: 236px;
    }
`
const CardHeader = styled.div`
    display: inline-flex;
    align-items: center;
    width: 89.7%;
    margin-left: ${(props) => props.marginLeft ? props.marginLeft : 20}px;
    padding-top: 20px;
    > img {
        margin-right: 5%;
        width: 130px;
        height: 100px;
    }
    @media (min-width: 0px) and (max-width: 767.98px) {
        margin-left: 14px;
        > img {
            width: 46px;
            height: 46.2px;
            margin-right: ${(props) => props.marginRight ? props.marginRight : 22}px;
        }
    }
`
const Name = styled(Content.FontSize18)`
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.45px;
    text-align: left;
    color: #191919;
    @media (min-width: 0px) and (max-width: 767.98px) {
        font-size: 12px !important;
        line-height: 0.8
    }
`
const ContentBox = styled(Content.FontSize15)`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.53;
    letter-spacing: -0.38px !important;
    text-align: left;
    color: black;
    padding-left: 30px;
    padding-right: 10px;
    word-break: keep-all;
    @media (min-width: 0px) and (max-width: 767.98px) {
        font-size: 12px !important;  
        line-height: 1.5;
        letter-spacing: -0.3px;
        text-align: left;
        color: #767676;
        margin-top: 3px;
        padding-left:14px;
        padding-right:15px;
    }
`
/////////////////// ReviewCard2 ////////////////////
const BigCard = styled(Card)`
    height: 536px;
    overflow: hidden;
    @media (min-width: 0px) and (max-width: 767.98px) {
        width: 90%;
        // height: 204px;
        height:100%;
        object-fit: contain;
        border-radius: 7px;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        background-color: #ffffff;
    }
`
const ContentTitle = styled(Title.FontSize26)`
    padding-left: 30px;
    padding-right: 30px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: -0.65px;
    text-align: left;
    color: #191919;
    padding-bottom: 30px;
    padding-top: 30px;
    @media (min-width: 0px) and (max-width: 767.98px) {
        font-size: 13px !important;
        padding-bottom: 4px;
    }
`
const ContentBox2 = styled(Content.FontSize18)`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5 !important;
    letter-spacing: -0.45px !important;
    word-break: keep-all;
    text-align: left;
    color: #767676;
    padding-left: 30px;
    padding-right: 30px;
    @media (min-width: 0px) and (max-width: 767.98px) {
        font-size: 12px !important;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: -0.3px;
        text-align: left;
        color: #767676;
    }
`
const ImageBox = styled.div`
    width: 100%;
    height: 20%;
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 80px;
    > img {
        height: 100%;
    }
`
const MyStarRatingComponent = styled(StarRatingComponent)`
  @media (min-width: 0px) and (max-width: 767.98px) {
      > label {
          > i {
          font-size: 8px;
      }
    }
  }
`
