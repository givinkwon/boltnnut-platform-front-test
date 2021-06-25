import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import * as Title from "components/Title";
import Slider from "react-slick";
import UseScrollCount from "containers/Home/UseScrollCount";
import Fade from "react-reveal/Fade";

//Page 1
const image1 = "/static/images/logo/logo_1.png";
const image2 = "/static/images/logo/logo_2.png";
const image3 = "/static/images/logo/logo_3.png";
const image4 = "/static/images/logo/logo_4.png";
const image5 = "/static/images/logo/logo_5.png";
const image6 = "/static/images/logo/logo_6.png";
const image7 = "/static/images/logo/logo_7.png";
const image8 = "/static/images/logo/logo_8.png";
const image9 = "/static/images/logo/logo_9.png";
const image10 = "/static/images/logo/logo_10.png";
const image11 = "/static/images/logo/logo_11.png";
const image12 = "/static/images/logo/logo_12.png";
const image13 = "/static/images/logo/logo_13.png";
const image14 = "/static/images/logo/logo_14.png";
const image15 = "/static/images/logo/logo_15.jpg";
const image16 = "/static/images/logo/logo_16.png";
const image17 = "/static/images/logo/logo_17.png";
const image18 = "/static/images/logo/logo_18.png";
const image19 = "/static/images/logo/logo_19.png";
const image20 = "/static/images/logo/logo_20.png";
const image21 = "/static/images/logo/logo_21.png";
const image22 = "/static/images/logo/logo_22.png";
const image23 = "/static/images/logo/logo_23.png";
const image24 = "/static/images/logo/logo_24.png";
const image25 = "/static/images/logo/logo_25.png";
const image26 = "/static/images/logo/logo_26.png";
const image27 = "/static/images/logo/logo_27.png";
const image28 = "/static/images/logo/logo_28.png";
// page2
const image29 = "/static/images/logo/logo_29.png";
const image30 = "/static/images/logo/logo_30.png";
const image31 = "/static/images/logo/logo_31.png";
const image32 = "/static/images/logo/logo_32.png";
const image33 = "/static/images/logo/logo_33.png";
const image34 = "/static/images/logo/logo_34.png";
const image35 = "/static/images/logo/logo_35.png";
const image36 = "/static/images/logo/logo_36.png";
const image37 = "/static/images/logo/logo_37.png";
const image38 = "/static/images/logo/logo_38.png";
const image39 = "/static/images/logo/logo_39.png";
const image40 = "/static/images/logo/logo_40.png";
const image41 = "/static/images/logo/logo_41.png";
const image42 = "/static/images/logo/logo_42.png";
const image43 = "/static/images/logo/logo_43.png";
const image44 = "/static/images/logo/logo_44.png";
const image45 = "/static/images/logo/logo_45.png";
const image46 = "/static/images/logo/logo_46.png";
const image47 = "/static/images/logo/logo_47.png";
const image48 = "/static/images/logo/logo_48.png";
const image49 = "/static/images/logo/logo_49.png";
const image50 = "/static/images/logo/logo_50.png";
const image51 = "/static/images/logo/logo_51.png";
const image52 = "/static/images/logo/logo_52.png";
const image53 = "/static/images/logo/logo_53.png";
const image54 = "/static/images/logo/logo_54.png";
const image55 = "/static/images/logo/logo_55.png";
const image56 = "/static/images/logo/logo_56.png";

// page3
const image57 = "/static/images/logo/logo_57.png";
const image58 = "/static/images/logo/logo_58.png";
const image59 = "/static/images/logo/logo_59.png";
const image60 = "/static/images/logo/logo_60.png";
const image61 = "/static/images/logo/logo_61.png";
const image62 = "/static/images/logo/logo_62.png";
const image63 = "/static/images/logo/logo_63.png";
const image64 = "/static/images/logo/logo_64.png";
const image65 = "/static/images/logo/logo_65.png";
const image66 = "/static/images/logo/logo_66.png";
const image67 = "/static/images/logo/logo_67.png";
const image68 = "/static/images/logo/logo_68.png";
const image69 = "/static/images/logo/logo_69.png";
const image70 = "/static/images/logo/logo_70.png";
const image71 = "/static/images/logo/logo_71.png";
const image72 = "/static/images/logo/logo_72.png";
const image73 = "/static/images/logo/logo_73.png";
const image74 = "/static/images/logo/logo_74.png";
const image75 = "/static/images/logo/logo_75.png";
const image76 = "/static/images/logo/logo_76.png";
const image77 = "/static/images/logo/logo_77.png";
const image78 = "/static/images/logo/logo_78.png";
const image79 = "/static/images/logo/logo_79.png";
const image80 = "/static/images/logo/logo_80.png";
const image81 = "/static/images/logo/logo_81.png";
const image82 = "/static/images/logo/logo_82.png";
const image83 = "/static/images/logo/logo_83.png";
const image84 = "/static/images/logo/logo_84.png";
const image85 = "/static/images/logo/logo_85.png";
const image86 = "/static/images/logo/logo_86.png";

const item1 = "/static/images/Home/Banner8/Banner8_img1.png";

const CountFunc = ({ index }) => {
  const countItem = {
    0: UseScrollCount(878 * 3, 0, 0, 0, 3),
  };

  return <p {...countItem[index]} />;
};

class TabletBanner8Container extends React.Component {
  render() {
    const SlideSettings = {
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      draggable: true,
      rows: 4,
      autoplay: true,
    };
    return (
      <Background
        style={{
          paddingBottom: 100,
          paddingTop: 100,
          justifyContent: "center",
        }}
      >
        <Fade bottom>
          <div>
            <Header>
              이미 <CountFunc index={0} />
              <p>명</p>이 넘는 클라이언트분들이
              <br />
              볼트앤너트를 이용하셨습니다.
            </Header>

            <ItemBox>
              <Slider {...SlideSettings}>
                <Item>
                  <img src={image1} />
                </Item>
                <Item>
                  <img src={image2} />
                </Item>
                <Item>
                  <img src={image3} />
                </Item>
                <Item>
                  <img src={image4} />
                </Item>
                <Item>
                  <img src={image5} />
                </Item>
                <Item>
                  <img src={image6} />
                </Item>
                <Item>
                  <img src={image7} />
                </Item>
                <Item>
                  <img src={image8} />
                </Item>
                <Item>
                  <img src={image9} />
                </Item>
                <Item>
                  <img src={image10} />
                </Item>
                <Item>
                  <img src={image11} />
                </Item>
                <Item>
                  <img src={image12} />
                </Item>
                <Item>
                  <img src={image13} />
                </Item>
                <Item>
                  <img src={image14} />
                </Item>
                <Item>
                  <img src={image16} />
                </Item>
                <Item>
                  <img src={image17} />
                </Item>
                <Item>
                  <img src={image18} />
                </Item>
                <Item>
                  <img src={image19} />
                </Item>
                <Item>
                  <img src={image20} />
                </Item>
                <Item>
                  <img src={image21} />
                </Item>
                <Item>
                  <img src={image22} />
                </Item>
                <Item>
                  <img src={image23} />
                </Item>
                <Item>
                  <img src={image24} />
                </Item>
                <Item>
                  <img src={image25} />
                </Item>
                <Item>
                  <img src={image26} />
                </Item>
                <Item>
                  <img src={image27} />
                </Item>
                <Item>
                  <img src={image28} />
                </Item>
                <Item>
                  <img src={image29} />
                </Item>

                <Item>
                  <img src={image30} />
                </Item>
                <Item>
                  <img src={image31} />
                </Item>
                <Item>
                  <img src={image32} />
                </Item>
                <Item>
                  <img src={image33} />
                </Item>
                <Item>
                  <img src={image34} />
                </Item>
                <Item>
                  <img src={image35} />
                </Item>
                <Item>
                  <img src={image36} />
                </Item>
                <Item>
                  <img src={image37} />
                </Item>
                <Item>
                  <img src={image38} />
                </Item>
                <Item>
                  <img src={image39} />
                </Item>
                <Item>
                  <img src={image40} />
                </Item>
                <Item>
                  <img src={image41} />
                </Item>
                <Item>
                  <img src={image42} />
                </Item>
                <Item>
                  <img src={image44} />
                </Item>
                <Item>
                  <img src={image45} />
                </Item>
                <Item>
                  <img src={image46} />
                </Item>
                <Item>
                  <img src={image47} />
                </Item>
                <Item>
                  <img src={image48} />
                </Item>
                <Item>
                  <img src={image49} />
                </Item>
                <Item>
                  <img src={image50} />
                </Item>
                <Item>
                  <img src={image51} />
                </Item>
                <Item>
                  <img src={image52} />
                </Item>
                <Item>
                  <img src={image53} />
                </Item>
                <Item>
                  <img src={image54} />
                </Item>
                <Item>
                  <img src={image55} />
                </Item>
                <Item>
                  <img src={image56} />
                </Item>
                <Item>
                  <img src={image57} />
                </Item>
                <Item>
                  <img src={image58} />
                </Item>

                <Item>
                  <img src={image59} />
                </Item>
                <Item>
                  <img src={image60} />
                </Item>
                <Item>
                  <img src={image61} />
                </Item>
                <Item>
                  <img src={image62} />
                </Item>
                <Item>
                  <img src={image63} />
                </Item>
                <Item>
                  <img src={image64} />
                </Item>
                <Item>
                  <img src={image65} />
                </Item>
                <Item>
                  <img src={image66} />
                </Item>
                <Item>
                  <img src={image67} />
                </Item>
                <Item>
                  <img src={image68} />
                </Item>
                <Item>
                  <img src={image69} />
                </Item>
                <Item>
                  <img src={image70} />
                </Item>
                <Item>
                  <img src={image71} />
                </Item>
                <Item>
                  <img src={image72} />
                </Item>
                <Item>
                  <img src={image73} />
                </Item>
                <Item>
                  <img src={image74} />
                </Item>
                <Item>
                  <img src={image75} />
                </Item>
                <Item>
                  <img src={image76} />
                </Item>
                <Item>
                  <img src={image77} />
                </Item>
                <Item>
                  <img src={image78} />
                </Item>
                <Item>
                  <img src={image79} />
                </Item>
                <Item>
                  <img src={image80} />
                </Item>
                <Item>
                  <img src={image81} />
                </Item>
                <Item>
                  <img src={image82} />
                </Item>
                <Item>
                  <img src={image83} />
                </Item>
                <Item>
                  <img src={image84} />
                </Item>
                <Item>
                  <img src={image85} />
                </Item>
                <Item>
                  <img src={image86} />
                </Item>
              </Slider>
            </ItemBox>
          </div>
        </Fade>
      </Background>
    );
  }
}

export default TabletBanner8Container;

const Header = styled(Title.FontSize26)`
  color: #191919;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: -0.55px;
  text-align: center;

  > p {
    display: inline;
    font-weight: bold;
  }
`;

const ItemBox = styled.div`
  padding-top: 36px;
  max-width: 100vw;
  width: 100%;
`;

const Item = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // width: calc(14% - 40px);
  // padding: 0px 0px 0px 0px;
  // margin: 0 20px;
  padding-bottom: 38px;

  :focus {
    outline: none;
  }

  > img {
    //   width:90px;
    //   height:90px;
    margin: 0 auto;
    width: 65%;
    height: 65%;
    overflow: hidden;
    cursor: pointer;
  }
`;

const ImgBox = styled.div`
  :focus {
    outline: none;
  }
`;

const Col = styled.div`
  :focus {
    outline: none;
  }
`;
