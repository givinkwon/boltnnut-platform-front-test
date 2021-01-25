import React from "react";
import styled from "styled-components";
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
const IoPET = "/static/images/Home/Banner5/IOPET.png";
const JINYOUNG = "/static/images/Home/Banner5/JINYOUNG.png";
const person = "/static/images/Home/Banner5/person.png";

class MobileBanner5Container extends React.Component {
  state = {
      rating: 1
  };

  render() {
    let rate = this.state.rating;
    const item1 = {
        name: "MANU",
        review: "기존 거래처에서 받은 조건이 찜찜해도 다른 방법이 없었는데 볼트앤너트 가견적과 상담을 통해 합리적인 견적을 알 수 있었고, 더 나은 조건의 업체와 계약하게 되었습니다.",
        logo: MANU
    }
    const item2 = {
        name: "TAJO",
        review: "제품 제조에 처음 도전하다보니 개발업체를 찾느라 한 달 이상 애를 먹었습니다. 볼트앤너트 상담을 통해 전문 업체를 찾았고, 볼트앤너트 측에서 프로젝트를 전담하여 시행착오 없이 제조할 수 있었습니다.",
        logo: TAJO
    }
    const item3 = {
        name: "HCLAB",
        review: "IoT 전문 개발사를 찾고 있었는데, 볼트앤너트에서 찾아준 제조사 견적이 30% 이상 저렴해서 합리적인 가격으로 개발할 수 있었습니다.",
        logo: HCLAB,
        title: '기존 거래처 견적보다 30% 싸게 만들었습니다'
    }
    const item4 = {
        name: "IOPET",
        review: "제조 양산 프로세스를 모르다보니 시행착오가 많았는데, 볼트앤너트에서 계약서와 기능명세 작성부터 자료 이관 및 양산 프로세스 안내까지 도움주셔서 자사제품인 Petwash를 성공적으로 양산했습니다.",
        logo: IoPET 
    }
    const item5 = {
        name: "JIN&YOUNG ENG",
        review: "생산 계획 수립을 위해 개발부터 전체 양산 단가까지 턴키로 알아볼 필요가 있었는데, 볼트앤너트 상담을 통해 양산 예산을 안내해주셨고 그에 따라 적합한 생산 계획을 수립할 수 있었습니다.",
        logo: JINYOUNG
    }
    return (
        <Background style={{flexDirection: 'column', paddingBottom: 100}}>
              <Fade bottom>
                <Header>
                  클라이언트분들께<br/>
                  검증된 <span class="bold">볼트앤너트</span>를 만나보세요
                </Header>
                <RatingBox>
                  <StarTitle>
                    클라이언트 평균 만족도
                  </StarTitle>
                  <div style={{paddingTop: 4, display: 'inline-flex', justifyContent: 'center'}}>
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
                <div style={{display: 'inline-flex', flexDirection: 'column', width: "100%", justifyContent: 'center'}}>
                  <div style={{marginBottom: 7, display: 'inline-flex', justifyContent: 'center'}}>
                    <ReviewCard2 item = {item3} big={true}/>
                  </div>
                  <div style={{display: 'inline-flex', justifyContent: 'center'}}>
                    <ReviewCard item = {item1}/>
                    <div style={{marginRight: 7}} />
                    <ReviewCard item = {item2} />
                  </div>
                </div>
              </Fade>
        </Background>
    );
  }
}

export default MobileBanner5Container;

const Header = styled(Title.FontSize22)`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: -1.4px;
    text-align: center;
    color: #111111;
    margin-top: 100px;
    .bold {
        font-weight: bold;
    }
`
const StarTitle = styled(Title.FontSize14)`
    text-align: center;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: -0.6px;
    color: #282c36;
    margin-top: 26px;
`
const RatingBox = styled.div`
    width:100%;
    padding-bottom: 16px;
    display: inline-flex;
    flex-direction: column;
`
const MyStarRatingComponent = styled(StarRatingComponent)`
  align-self: center;
  padding-right: 10px;
  display: inline-flex !important;
  > label {
    cursor: none;
    width: 14px;
    height: 14px;
    display: flex;
    > i {
        font-size: 14px;
    }
  }
`
const Rate = styled(Content.FontSize14)`
  font-weight: bold;
  color: #0a2165;
  white-space: nowrap;
  .slash {
    font-size: 13px;
    color: #86888c;
  }
  .total {
      font-size: 13px;
      color: #86888c;
  }
`
