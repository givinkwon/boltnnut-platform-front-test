import React from "react";
import styled from "styled-components";
import Background from "../../components/Background";
import Containerv1 from "../../components/Containerv1";


const image1 = "/static/images/Home/Banner2/image1.png"

class Banner2Conatiner extends React.Component {
    render() {
        return (
            <Banner2Background backgroundColor = {"#0a2165"}>
                <Containerv1>
                    <ItemBox>
                        <TextBox>
                            <div className="Header">
                                컨설턴트 중 해당 제품
                            </div>
                            <div className="Middle">
                                5000여개의 제조사 중 <br/>
                                딱 맞는 전문가를 매칭
                            </div>
                            <div className="Body">
                                200여개 이상의 프로젝트 데이터를 학습한 AI 매칭<br/>
                                알고리즘이 내 제품의 전문가를 큐레이션해드립니다.
                            </div>
                        </TextBox>
                        <ImageBox>
                            <img src={image1}/>
                        </ImageBox>
                    </ItemBox>
                </Containerv1>
            </Banner2Background>

        );
    }
}

export default Banner2Conatiner;

const Banner2Background = styled(Background)`
    height:1000px;
`

const ItemBox = styled.div`
    padding-top:256px;
    display:flex;
`

const TextBox = styled.div`
  width: 510px;
  @media (min-width: 0px) and (max-width: 767.98px) {
      width: 100%;
      margin: 0;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-right: 30px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
  .Header {
  width:300px;
  height: 36px;
  object-fit: contain;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: -0.75px;
  text-align: left;
  color: #ffffff;
  @media (min-width: 0px) and (max-width: 767.97px) {
    // width: auto;
    // height: 58px;
    // font-size: 20px;
    // font-weight: bold;
    // font-stretch: normal;
    // font-style: normal;
    // line-height: 1.4;
    // padding-top : calc(5%);
    // padding-left: calc(6%);
  }
  @media (min-width: 767.98px) and (max-width: 991.98px) {
    font-size : 28px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
  }
  .Middle {
  padding-top:16px;
  width: 510px;
  height: 159px;
  object-fit: contain;
  font-size: 56px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  text-align: left;
  color: #f6f6f6;
  @media (min-width: 0px) and (max-width: 767.97px) {
    // height: 24px;
    // object-fit: contain;
    // font-size: 16px;
    // font-weight: 500;
    // font-stretch: normal;
    // font-style: normal;
    // line-height: 1.25;
    // letter-spacing: -0.4px;
    // text-align: left;
    // color: #505050;
    // padding-top: 0px;
    // padding-top : calc(3%);
    // padding-left: calc(6%);
  }
  @media (min-width: 768.98px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
  }
  .Body{
  padding-top:105px;
  
  width: 510px;
  height: 76px;
  object-fit: contain;
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #cedafe;
  
  @media (min-width: 0px) and (max-width: 767.97px) {
    // width: 217px;
    // height: 66px;
    // object-fit: contain;
    // font-size: 12px;
    // font-weight: normal;
    // font-stretch: normal;
    // font-style: normal;
    // line-height: 1.33;
    // letter-spacing: -0.3px;
    // text-align: left;
    // color: #767676;
    // padding-top : calc(1%);
    // padding-left: calc(6%);
    // margin: 0;
  }
  @media (min-width: 767.98px) and (max-width: 991.98px) {
    width: 100%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
  .HyperLink {
  width: 52px;
  height: 27px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: -0.38px;
  text-align: left;
  color: #0933b3;
  }
  }
`

const ImageBox = styled.div`
  margin-left:218px;
  width: 588px;
  height: 392px;
  object-fit: contain;
  justify-content: left;
  align-items: left;
  
  > div {
    background-repeat: no-repeat;
    height: 100%;
  }
  > img{
    background-repeat: no-repeat;
    height: 100%;
    border-radius: 10px;
  }
  
  @media (min-width: 0px) and (max-width: 767.97px) {
     // width: calc(100%);
     // height: calc(42.6%);
     // object-fit: contain;
     // border-radius: 4px;
  }
  @media (min-width: 767.98px) and (max-width: 991.98px) {
    // height: 100%;
    // width: 50%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`

