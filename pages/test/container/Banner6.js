import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import StarRatingComponent from 'react-star-rating-component';
import ReviewCard from 'components/Review';
import ReviewCard2 from 'components/Review';
import * as Content from 'components/Content';
import Fade from 'react-reveal/Fade';
import Slider from 'react-slick';

const MANU = "/static/images/Home/Banner6/Manu.png";
const TAJO = "/static/images/Home/Banner6/TAJO.png";
const HCLAB = "/static/images/Home/Banner6/HCLAB.png";
const IoPET = "/static/images/Home/Banner6/IOPET.png";
const JINYOUNG = "/static/images/Home/Banner6/JINYOUNG.png";

const KMH = "/static/images/Home/Banner6/근명고등학교.png";
const lisk = "/static/images/Home/Banner6/리스크엔지니어링.png";
const hygenu = "/static/images/Home/Banner6/하이젠어스.png";
const umtel = "/static/images/Home/Banner6/움틀.png";
const hansung = "/static/images/Home/Banner6/한성대.png";

class Banner6Container extends React.Component {
  state = {
    rating: 1
  };

  render() {
    let rate = this.state.rating;
    const item1 = {
      name: "리스크엔지니어링",
      review: `볼트앤너트에 스테인레스 가공을 의뢰하였습니다. 
      제조사와의 빠른 매칭이 도움이 되었고, 볼트앤너트 관리와 
      납기에 대해서 만족합니다. 향후에도 볼트앤너트 
      서비스를 다시 이용하고 싶습니다.`,
      logo: lisk
    }

    const item2 = {
      name: "움틀",
      review: `볼트앤너트와 실험용 여과기 개발 및 
      금형 생산을 진행했습니다. 전문 실험 기기이다보니 특정 원료
      생산 및 후가공이 까다로웠는데, 볼트앤너트에서 요구조건을 충족  
      하는 업체를 수배 및 관리해줘서 성공적으로 생산했습니다. `,
      logo: umtel
    }
    const item3 = {
      name: "HCLAB",
      review: "IoT 전문 개발사를 찾고 있었는데, 볼트앤너트에서 찾아준 제조사 견적이 30% 이상 저렴해서 합리적인 가격으로 개발할 수 있었습니다.",
      logo: HCLAB,
      title: '기존 거래처 견적보다\n30% 싸게 만들었습니다'
    }

    const item4 = {
      name: "하이젠어스",
      review: `볼트앤너트에 소량의 기계부품을 의뢰하였습니다. 
      의뢰 부품에 대한 난이도 의견 및 정확한 제작 견적가가 
      도움이 되었고, 매칭된 제조사는 높은 품질과 
      저렴한 가격으로 부품을 정상 납품하였습니다.  `,
      logo: hygenu
    }
    const item5 = {
      name: "JIN&YOUNG ENG",
      review: "생산 계획 수립을 위해 개발부터 전체 양산 단가까지 턴키로 알아볼 필요가 있었는데, 볼트앤너트 상담을 통해 양산 예산을 안내해주셨고 그에 따라 적합한 생산 계획을 수립할 수 있었습니다.",
      logo: JINYOUNG
    }

    const item6 = {
      name: "MANU",
      review: "기존 거래처에서 받은 조건이 찜찜해도 다른 방법이 없었는데 볼트앤너트 가견적과 상담을 통해 합리적인 견적을 알 수 있었고, 더 나은 조건의 업체와 계약하게 되었습니다.",
      logo: MANU
    }

    const item7 = {
      name: "TAJO",
      review: "제품 제조에 처음 도전하다보니 개발업체를 찾느라 한 달 이상 애를 먹었습니다. 볼트앤너트 상담을 통해 전문 업체를 찾았고, 볼트앤너트 측에서 프로젝트를 전담하여 시행착오 없이 제조할 수 있었습니다.",
      logo: TAJO
    }
    const item8 = {
      name: "IOPET",
      review: "제조 양산 프로세스를 모르다보니 시행착오가 많았는데, 볼트앤너트에서 계약서와 기능명세 작성부터 자료 이관 및 양산 프로세스 안내까지 도움주셔서 자사제품인 Petwash를 성공적으로 양산했습니다.",
      logo: IoPET
    }
    const item9 = {
      name: "한성대학교",
      review: `볼트앤너트에 샤워기헤드 제품을 의뢰하였습니다.
      전반적인 제품 모델링 과정을 상세하게 설명해주셔서 
      좋았습니다. 어떤식으로 진행되는지 몰랐는데 상세히 
      알려주셔서 편했습니다.`,
      logo: hansung
    }
    const item10 = {
      name: "GMH",
      review: `볼트앤너트에 케이스제작을 의뢰하였습니다. 
      시제품 제조서비스를 이용하는 과정에서
      너무 많은 도움이 되었고, 정말 친절하게 
      알려주시고 세심히 체크해 주셨습니다. 
      저희 입장에서 생각하고 일을 진행해주셔서
      정말 좋게 일을 마무리 할 수 있었습니다.
      다음에 또 시제품을 만들어야하는 상황이 온다면 볼트앤너트를
      애용하고 싶습니다. 
      `,
      title: `다음 제품도 볼트앤너트에서
      만들고 싶습니다.`,
      logo: KMH
    }
    const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      vertical: false
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
            <CustomSlider {...settings}>
              <div>
                <div>
                  <ReviewCard2 item = {item3} big={true} footerimg={true}/>
                </div>
                <div>
                  <ReviewCard item = {item1}/>
                  <div style={{marginTop: 28}} />
                  <ReviewCard item = {item2}/>
                </div>
                <div>
                  <ReviewCard item = {item4}/>
                  <div style={{marginTop: 28}} />
                  <ReviewCard item = {item5}/>
                </div>
              </div>
              <div>
                <div>
                  <ReviewCard2 item = {item10} big={true}/>
                </div>
                <div>
                  <ReviewCard item = {item6}/>
                  <div style={{marginTop: 28}} />
                  <ReviewCard item = {item7}/>
                </div>
                <div>
                  <ReviewCard item = {item8}/>
                  <div style={{marginTop: 28}} />
                  <ReviewCard item = {item9}/>
                </div>
              </div>
            </CustomSlider>
          </Fade>
        </Containerv1>
      </Background>
    );
  }
}

export default Banner6Container;

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
const CustomSlider = styled(Slider)`
  width: 1200px;
  div {
    outline: none;
  }
  .slick-list {
    width: 100%;
  }
  .slick-track {
    width: 100%;
    > div > div > div {
      padding-top: 5px;
      padding-bottom: 5px;
      display: inline-flex !important;
      justify-content: center;
      > div {
        margin-right: 22px;
        :nth-of-type(3) {
          margin-right: 0px;
        }
      }
    }
  }
`
