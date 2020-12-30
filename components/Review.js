import React, {Component} from 'react';
import styled from 'styled-components';
//import 'intersection-observer'; // polyfill
//import Observer from '@researchgate/react-intersection-observer';
//import {inject, observer} from "mobx-react";
import {PRIMARY, WHITE, DARKGRAY} from "static/style";
import * as Content from "components/Content";
import * as Title from "components/Title";
import StarRatingComponent from 'react-star-rating-component';

// 이미지테스트
const person = "/static/images/Home/Banner5/person.png";

//@inject('Answer')
//@observer
class ReviewCard extends Component {
    render() {
        const {item, big} = this.props;

        console.log(this.props);
        if (item && !big) {
        return (
            <Card>
                <CardHeader>
                    <img src={item.logo} />
                    <Name eng={true}>
                        {item.name}<br/>
                        <StarRatingComponent 
                          value={5}
                          starColor={'#0a2165'}/>
                    </Name>
                </CardHeader>
                <ContentBox>
                    {item.review}
                </ContentBox>
            </Card>
        )} else if (item && big) {
            return (
                <BigCard>
                    <CardHeader>
                        <img src={item.logo} />
                        <Name eng={true}>
                            {item.name}<br/>
                            <StarRatingComponent 
                              value={5}
                              starColor={'#0a2165'}/>
                        </Name>
                    </CardHeader>
                    <ContentTitle style={{whiteSpace:'pre-line'}}>
                        {item.title ? item.title : ""}
                    </ContentTitle>
                    <ContentBox2>
                        {item.review}
                    </ContentBox2>
                    <ImageBox>
                        <ContentBox style={{fontWeight: 'bold'}}>
                            김율 대표님
                        </ContentBox>
                        <img src={person} />
                    </ImageBox>
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
`
const CardHeader = styled.div`
    display: inline-flex;
    align-items: center;
    width: 89.7%;
    margin-left: 10.7%;
    padding-top: 6.7%;
`
const Name = styled(Content.FontSize18)`
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.45px;
    text-align: left;
    color: #191919;
`
const ContentBox = styled(Content.FontSize15)`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.53;
    letter-spacing: -0.38px;
    text-align: left;
    color: #191919;
    padding-left: 7.8%;
    padding-right: 7.8%;
`
/////////////////// ReviewCard2 ////////////////////
const BigCard = styled(Card)`
    height: 536px;
    overflow: hidden;
`
const ContentTitle = styled(Title.FontSize26)`
    padding-left: 7.8%;
    padding-right: 7.8%;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: -0.65px;
    text-align: left;
    color: #191919;
    padding-bottom: 30px;
`
const ContentBox2 = styled(Content.FontSize18)`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.45px;
    text-align: left;
    color: #767676;
    padding-left: 7.8%;
    padding-right: 7.8%;
`
const ImageBox = styled.div`
    width: 100%;
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    > img {
        margin-right: 7.8%;
    }
`
