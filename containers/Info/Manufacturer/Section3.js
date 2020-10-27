import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Router from "next/router";
import RatioImage from 'components/RatioImage';
import * as Text from "components/Text";
import {BLACK, BLACK1, DARKGRAY, PRIMARY, WHITE} from 'static/style'


const search_ic = "static/icon/search.png";
const image1 = "/static/images/logo/TAJO.png";
const image2 = "/static/images/logo/logo_29.png";
const image3 = "/static/images/logo/logo_11.png";
const image4 = "/static/images/logo/logo_17.png";

const star_yellow_img = "/static/images/main/star_yellow.png";
const star_gray_img = "/static/images/main/star_gray.png";
const arrow = "/static/images/main/[M]chevron_down_gray.png"

class Section3Container extends React.Component {
  render() {
    return (
    <CustomContainer>
      <Container>
        <Header>성공 사례</Header>
        <BodyBox>
          <Item>
            <CommentBox>
              <Image src={image4} />
              <TextBox>
                <HeaderWrapper>
                  <div class="CommentHeader">
                    <p> MANU </p>
                  </div>
                  <div class="CommentStar">
                    <Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/>
                  </div>
                </HeaderWrapper>
                <div class="CommentBody">
                  <span class="Header"> 볼트앤너트 덕분에 2차 마켓까지 진행하였어요 </span>
                  <p> 업체를 고를 때 개발을 진행하는 마인드와 포트폴리오를 가장 중요하게 생각하는데 볼트앤너트가 모두 제공해줘서 편리했습니다. </p>
                </div>
              </TextBox>
            </CommentBox>
          </Item>
          <Item>
            <SmallCommentBox>
                <div class="HeaderWrapper">
                  <SmallImage src={image2} />
                  <div class = "TextBox">
                  <div class="CommentHeader">
                    <p> IOPET </p>
                  </div>
                  <div class="CommentStar">
                    <Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/>
                  </div>
                  </div>
                </div>
                <div class="CommentBody">
                  <p> 기존거래처에서 받은 조건이 찜찜해도 다른 방법이 없었는데 볼트앤너트를 통해 업체들을 추천 받아 비교해볼 수  있었고 더 나은 조건의 업체와계약하게 되었습니다. </p>
                </div>
            </SmallCommentBox>
            <SmallCommentBox>
                <div class="HeaderWrapper">
                  <SmallImage src={image3} />
                  <div class = "TextBox">
                  <div class="CommentHeader">
                    <p> HClab </p>
                  </div>
                  <div class="CommentStar">
                    <Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/>
                  </div>
                  </div>
                </div>
                <div class="CommentBody">
                  <p> 제품 제조에 처음 도전한 저희는 제품을 개발해줄 개발업체를 찾느라 한 달 이상 애를 먹고 있었어요. <br/> 볼트앤너트 덕에 더 이상 시간을 낭비하지 않아도 되었답니다. </p>
                </div>
            </SmallCommentBox>
            <SmallCommentBox>
                <div class="HeaderWrapper">
                  <SmallImage src={image1} />
                  <div class = "TextBox">
                  <div class="CommentHeader">
                    <p> TAJO </p>
                  </div>
                  <div class="CommentStar">
                    <Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/>
                  </div>
                  </div>
                </div>
                <div class="CommentBody">
                  <p> 제조 양산 프로세스를 모르다 보니 시행착오가 많았는데 볼트앤너트 측에서 PM 업무를 수행하여 제품을 성공적으로  양산할 수 있었습니다. </p>
                </div>
            </SmallCommentBox>
          </Item>
        </BodyBox>
      </Container>
    </CustomContainer>
    );
  }
}

export default Section3Container;

const CustomContainer = styled.div`
  padding: 0px;
  padding-bottom : 188px;
  width: 100%;
  margin-right: 0;
  margin-left: 0;
  align-items: center;
  background-color: #f5f7f7;
  flex-direction: column;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 40px);
    padding: 0 20px;
    height: 600px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
    height: 600px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }

  @media (min-width: 1300px) {
    width: 100%;
  }
`

const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  align-items: center;
  width: 1200px;
  background-color: #ffffff;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 720px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 930px;
  }

  @media (min-width: 1300px) {
    width: 1200px;
  }
`
const List = styled.div`
  width : 100%;
  height : 100%;
  padding-top : 0px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 0px;
    .slick-list {
    text-align : center;
    height:320px;
    }
    .slick-arrow slick-next{
     /* TODO */
    }
    ul.slick-dots {
      li button:before {
        content: '●';
        font-size: 16px;
        color: #ffffff;
        opacity: 0.2;
      }
      li.slick-active button:before {
        content: '●';
        font-size: 16px;
        color: #ffffff;
        opacity: 1;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 0px;
    .slick-list {
    text-align : center;
    height: 320px;
    }
    .slick-arrow slick-next{
     /* TODO */
    }
    ul.slick-dots {
      li button:before {
        content: '●';
        font-size: 16px;
        color: #ffffff;
        opacity: 0.2;
      }
      li.slick-active button:before {
        content: '●';
        font-size: 16px;
        color: #ffffff;
        opacity: 1;
      }
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    .slick-list {
    padding: 0px 0px 0px 0px;
    }
    margin-top : 0px;
  }
  @media (min-width: 1300px) {
    div.slick-list {
    !important height: 475px;
    }
    margin-top: 0px;
  }
`
const Header = styled.div`
  object-fit: contain;
  font-size: 32px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: -0.8px;
  color: #505050;
  background-color : #f5f7f7;
  margin : auto ;
  text-align : center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 50px;
    width: 290px;
    margin-bottom: 20px;
    font-size: 24px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 50px;
    width: 290px;
    margin-bottom: 40px;
    font-size: 24px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 70px;
    margin-bottom: 73px;
  }
  @media (min-width: 1300px) {
    padding-top: 120px;
    padding-bottom: 60px;
  }
`
const BodyBox = styled.div`
  width: 100%;
  background-color: #ffffff;
  align-items: center;
  :focus {
    outline: none;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: row;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
`
const FooterBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  :focus {
    outline: none;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 0px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 0px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
`
const Item = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: space-between;
  background-color : #f5f7f7;
  > p {
    text-align: left;
  }
  > div{
    display: inline-flex
    }
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
    height: 288px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 67px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    flex-direction: column;
    height: 288px;
    width: 552px;
    text-align: center;
    align-items: center;
    margin-bottom: 67px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }

  @media (min-width: 1300px) {
    width: 100%;
  }
`
const Image = styled(RatioImage)`
  width: 169px;
  height: 175px;
  object-fit: contain;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 180px;
    height: 100%;
    margin-left: 15px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 180px;
    height: 100%;
    margin-left: 15px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
    height: 100%;
    margin-left: 15px;
  }

  @media (min-width: 1300px) {
    width: 169px;
    height: 175px;
    margin-left: 30px;
  }
`
const SmallImage = styled(RatioImage)`
  width: 128px;
  height: 99px;
  object-fit: contain;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 180px;
    height: 100%;
    margin-left: 15px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 180px;
    height: 100%;
    margin-left: 15px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 128px;
    height: 99px;
  }

  @media (min-width: 1300px) {
    width: 128px;
    height: 99px;
  }
`
const CommentBox = styled.div`
  width: 1200px;
  height: 220px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  align-items: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 100%;
    width: 80%;
    border-radius: 22px;
    border: solid 1px #707070;
    background-color: #ffffff;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
  height: 158px;
  width: 100%;
  border-radius: 22px;
  border: solid 1px #707070;
  background-color: #ffffff;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
.CommentHeader {
  width: 70px;
  height: 24px;
  flex-direction: row;
  display: inline-flex;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-left: 24px;
    margin-top: 24px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-left: 24px;
    margin-top: 24px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
}
.CommentStar {
  width: 90px;
  height: 24px;
  flex-direction: row;
  display: inline-flex;
  margin-left: 15px;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 24px;
    margin-left: 24px;
    visibility: hidden;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 24px;
    margin-left: 24px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
}
.CommentBody {
  height: 40px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-left: 24px;
    margin-right: 30px;
    width: 100%;
    font-size : 13px !important;
    padding-right: 18px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-left: 24px;
    margin-right: 30px;
    width: 100%;
    font-size: 12px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-right: 10px;
  }

  @media (min-width: 1300px) {
    margin-right: 10px;
  }
  .Header {
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.6px;
    text-align: left;
    color: #060606;
    }
}
`
const SmallCommentBox = styled.div`
  width: 384px;
  height: 210px;
  object-fit: contain;
  border-radius: 10px;
  margin-top: 24px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  align-items: center;
  flex-direction: column;
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 100%;
    width: 80%;
    border-radius: 22px;
    border: solid 1px #707070;
    background-color: #ffffff;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  height: 158px;
  width: 100%;
  border-radius: 22px;
  border: solid 1px #707070;
  background-color: #ffffff;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
.TextBox {
  display: inline-flex;
  margin-left: 15px;
  flex-direction: column;
  margin-top: 25px;
}
.CommentHeader {
  width: 70px;
  height: 24px;
  flex-direction: row;
  display: inline-flex;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-left: 24px;
    margin-top: 24px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-left: 24px;
    margin-top: 24px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
}
.CommentStar {
  width: 90px;
  height: 24px;
  flex-direction: row;
  display: inline-flex;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 24px;
    margin-left: 24px;
    visibility: hidden;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 24px;
    margin-left: 24px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
}
.CommentBody {
  width: 330px;
  height: 66px;
  object-fit: contain;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: -0.38px;
  text-align: left;
  color: #191919;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-left: 24px;
    margin-right: 30px;
    width: 100%;
    font-size : 13px !important;
    padding-right: 18px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-left: 24px;
    margin-right: 30px;
    width: 100%;
    font-size: 12px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
}
.HeaderWrapper {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 70px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 70px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
}
`
const TextBox = styled.div`
  max-width: 900px;
  width: 600px;
  height: 150px;
  margin-left: 50px;
  margin-top: 50px;
  display: inline-flex;
  border-radius: 22px;
  display: inline-flex;
  flex-direction: column;
  background-color: #ffffff;
`
const Arrow = styled(RatioImage)`
  cursor: pointer;
  width: 60px;
  height: 60px;
  object-fit: contain;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: none;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    display: none;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  margin-top: 30px;
  margin-bottom: 24px;
  }

  @media (min-width: 1300px) {
  margin-top: 30px;
  margin-bottom: 24px;
  }
`
const HeaderWrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 70px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 70px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
`

const Star = styled(RatioImage)`
  width: 100%;
  height: 22px;
  object-fit: contain;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    max-width: 400px;
  }
`
