import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import StarRatingComponent from 'react-star-rating-component';
import ReviewCard from 'components/Review';
import ReviewCard2 from 'components/Review';
import * as Content from 'components/Content';
import Fade from 'react-reveal/Fade';

const MANU = "/static/images/Home/Banner5/Manu.png";
const TAJO = "/static/images/Home/Banner5/TAJO.png";
const HCLAB = "/static/images/Home/Banner5/HCLAB.png";
const person = "/static/images/Home/Banner5/person.png";

class Banner5Container extends React.Component {
  state = {
      rating: 1
  };

  render() {
    let rate = this.state.rating;
    const item1 = {
        name: "Manu",
        review: "기존 거래처에서 받은 조건이 찜찜해도 다른 방법이 없었는데 볼트앤너트를 통해 업체들을 추천 받아 비교해 볼 수 있었고 더 나은 조건의 업체와계약하게 되었습니다.",
        logo: MANU
    }
    const item2 = {
        name: "TAJO",
        review: "제조양산 프로세스를 모르다보니 시행착오가 많았는데 볼트앤너트 측에서 PM 업무를 수행하여 제품을 성공적으로 양산할 수 있었습니다.",
        logo: TAJO
    }
    const item3 = {
        name: "HCLAB",
        review: "공장에 대한 지식이 없는 저희에게 처음에는 막막. 제품이 원료나 가공 방법에 따라 원가가 공장에 대한 지식이 없는 저희에게 처음에는 막막.제품이 원료나 가공 방법에 따라합니다.",
        logo: HCLAB,
        title: '개발 업체 찾는기간이\n3달이 단축됐죠'
    }
    return (
        <Background>
            <Containerv1 style={{display: 'inline-flex', alignItems: 'center', paddingTop: 150, paddingBottom: 210,flexDirection: 'column'}}>
              <Fade bottom>
                <Header>
                  클라이언트분들께<br/>
                  검증된 <span class="bold">볼트앤너트</span>를 만나보세요
                </Header>
                <RatingBox>
                  <StarTitle>
                    클라이언트 평균 만족도
                  </StarTitle>
                  <div style={{paddingTop: 24, display: 'inline-flex'}}>
                    <MyStarRatingComponent
                      name="rate1"
                      starCount={5}
                      starColor={"#0a2165"}
                      value={5}
                    />
                    <Rate>
                      4.8 <span class="slash"> / </span> <span class="total"> 5.0 </span>
                    </Rate>
                  </div>
                </RatingBox>
                <div style={{display: 'inline-flex', width: "100%", justifyContent: 'space-between'}}>
                  <div>
                    <ReviewCard2 item = {item3} big={true}/>
                  </div>
                  <div>
                    <ReviewCard item = {item1}/>
                    <div style={{marginTop: 28}} />
                    <ReviewCard item = {item2}/>
                  </div>
                  <div>
                    <ReviewCard item = {item2}/>
                    <div style={{marginTop: 28}} />
                    <ReviewCard item = {item1}/>
                  </div>
                </div>
              </Fade>
            </Containerv1>
        </Background>
    );
  }
}

export default Banner5Container;

const Header = styled(Title.FontSize56)`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: -1.4px;
    text-align: center;
    color: #111111;
    .bold {
        font-weight: bold;
    }
`
const StarTitle = styled(Title.FontSize24)`
    text-align: center;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: -0.6px;
    color: #282c36;
    margin-top: 90px;
`
const RatingBox = styled.div`
    width: 312px;
    padding-bottom: 50px;
    display: inline-flex;
    flex-direction: column;
`
const MyStarRatingComponent = styled(StarRatingComponent)`
  align-self: center;
  padding-right: 19px;
  display: inline-flex !important;
  > label {
    cursor: none;
    width: 30px;
    height: 30px;
    > i {
        font-size: 30px;
    }
  }
`
const Rate = styled(Content.FontSize48)`
  font-weight: bold;
  color: #0a2165;
  white-space: nowrap;
  .slash {
    font-size: 32px;
    color: #86888c;
  }
  .total {
      font-size: 24px;
      color: #86888c;
  }
`
