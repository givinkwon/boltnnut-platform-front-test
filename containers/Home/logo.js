import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'

import Button from "components/Button";
import Container from 'components/Container'
import RatioImage from 'components/RatioImage'
import * as Text from 'components/Text'
import { WHITE, BLACK1, PRIMARY, DARKGRAY } from 'static/style'
import {BLACK} from "../../static/style";
const image1 = "/static/images/logo/logo_1.png";
const image2 = "/static/images/logo/logo_2.png";
const image3 = "/static/images/logo/logo_3.png";
const image4 = "/static/images/logo/logo_4.png";
const image5 = "/static/images/logo/logo_5.png";
const image6 = "/static/images/logo/logo_6_3.png";
const image7 = "/static/images/logo/logo_7.jpg";
const image8 = "/static/images/logo/logo_8.jpg";
const image9 = "/static/images/logo/logo_9.png";
const image10 = "/static/images/logo/logo_10.png";
const image11 = "/static/images/logo/logo_11.png";
const image12 = "/static/images/logo/logo_12.png";
const image13 = "/static/images/logo/logo_13.png";
const image14 = "/static/images/logo/logo_14.png";
const image15 = "/static/images/logo/logo_15.png";
const image16 = "/static/images/logo/logo_16.jpg";
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
const image29 = "/static/images/logo/logo_29.png";

@inject('Home')
@observer
class NewBanner5Container extends React.Component {
  state = {
    search: '',
    tab: 0,
  }
  render() {
    const { Home } = this.props
    const { tab } = this.state
    return (
      <Banner>
           <HeaderBox>
                <Header> 이미 <Bold>2,000여명</Bold>이 넘는 클라이언트분들이 <br/> 볼트앤너트를 이용하셨습니다. </Header>
           </HeaderBox>
      <Category>
          <Item>
            <Image src={image1} active={true}/>
          </Item>
          <Item>
            <Image src={image2} active={true}/>
          </Item>
          <Item>
            <Image src={image3} active={true}/>
          </Item>
          <Item>
            <Image src={image4} active={true}/>
          </Item>
          <Item>
            <Image src={image5} active={true}/>
          </Item>
          <Item>
            <Image src={image10} active={true}/>
          </Item>
          <Item>
            <Image src={image7} active={true}/>
          </Item>
          <Item>
            <Image src={image8} active={true}/>
          </Item>
          <Item>
            <Image src={image9} active={true}/>
          </Item>
          <Item>
            <Image src={image6} active={true}/>
          </Item>
          <Item>
            <Image src={image11} active={true}/>
          </Item>
          <Item>
            <Image src={image12} active={true}/>
          </Item>
          <Item>
            <Image src={image13} active={true}/>
          </Item>
          <Item>
            <Image src={image14} active={true}/>
          </Item>
          <Item>
            <Image src={image16} active={true}/>
          </Item>
          <Item>
            <Image src={image17} active={true}/>
          </Item>
          <Item>
            <Image src={image18} active={true}/>
          </Item>
          <Item>
            <Image src={image19} active={true}/>
          </Item>
          <Item>
            <Image src={image20} active={true}/>
          </Item>
          <Item>
            <Image src={image21} active={true}/>
          </Item>
          <Item>
            <Image src={image22} active={true}/>
          </Item>
          <Item>
            <Image src={image23} active={true}/>
          </Item>
          <Item>
            <Image src={image24} active={true}/>
          </Item>
          <Item>
            <Image src={image25} active={true}/>
          </Item>
          <Item>
            <Image src={image26} active={true}/>
          </Item>
          <Item>
            <Image src={image27} active={true}/>
          </Item>
          <Item>
            <Image src={image28} active={true}/>
          </Item>
          <Item>
            <Image src={image29} active={true}/>
          </Item>
          {/*<FooterBox>
                    <ButtonBox>
                <Button
                id={'request'}
                backgroundColor={WHITE + "00"}
                borderColor={WHITE}
                onClick={() => Router.push("/request")}
                padding= {0}
                >
                <Text.FontSize24 id={'request_text'} color={WHITE} fontWeight={500} borderRadius={0}>
                    무료로 업체 정보 받기
                </Text.FontSize24>
                </Button>
            </ButtonBox>
            </FooterBox>*/}
      </Category>
      </Banner>
    )
  }
}

export default NewBanner5Container;

const Banner = styled(Container)`
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 0px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 40px 0px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 60px 0px;
  }
  @media (min-width: 1300px) {
    padding: 80px 0px;
  }
`

const Category = styled(Container)`
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 0px;
    margin-bottom: 20px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 40px 0px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 60px 0px;
  }
  @media (min-width: 1300px) {
    padding: 80px 0px;
  }
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: calc(14% - 40px);
  padding: 20px 0;
  margin: 0 20px;

  @media (min-width: 0px) and (max-width: 499.98px) {
    width: calc(50% - 30px);
    margin: 0;
    padding: 15px;

    > p {
      font-size: 14px;
    }
  }
  @media (min-width: 500px) and (max-width: 991.98px) {
    margin: 0;
    width: calc(33.33% - 30px);
    padding: 15px;
  }
  @media (min-width: 992px) and (max-width: 1199.98px) {
    margin: 0;
    width: calc(25% - 30px);
    padding: 15px;
  }
`
const Image = styled(RatioImage)`
  cursor: pointer;
  margin-bottom: 20px;
  /* border: 2px solid #ddd;
  border-radius: 200px !important;  
  ${props => props.active && css`
    border: 2px solid ${PRIMARY};
  `} */
`
const HeaderBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: inline-flex;
  :focus {
    outline: none;
  }
`
const BodyBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  display: inline-flex;
  :focus {
    outline: none;
  }
`
const FooterBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: inline-flex;
  :focus {
    outline: none;
  }
`
 const Bold = styled.span`
  font-Weight : bold;
`
const ButtonBox = styled.div`
  margin-top: 104px;
  margin-bottom: 0px;
  height : 64px;
  width : 227px;
  display : inline-block;
  div:nth-of-type(1) {
    margin-right: 10px;
    width: 100% !important;
    height: fit-content;
    padding: 22px 0px 14px 0px !important;
    background-color: #ffc000 !important;;
    text-align: center;
    align-items: center;
    border: none;
    border-radius: 30px;
     @media (min-width: 0px) and (max-width: 767.98px) {
        margin-top: 30px;
    }

    > p {
        color: #061953 !important;
        width: 161px !important;
        height: 27px !important;
        font-size: 17px !important;
        font-weight: bold;
        text-align: center;
      }
    :hover {
      background-color: ${WHITE};
      > p {

      }
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 63px;
    margin-bottom: 40px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 240px;
    margin-top: 63px;
    margin-bottom: 40px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 104px;
    margin-bottom: 0px;
  }
  @media (min-width: 1300px) {
    margin-top: 104px;
    margin-bottom: 0px;
  }
  
`

const Header = styled.div`
  margin-top: 100px;
  width: 720px;
  height: 107px;
  font-size: 32px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: #061953;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 24px;
    margin-bottom: 9px;
    font-size: 18px !important;
    width: 100%;
    height: 100%;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: center;
    color: #061953;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 80px;
    margin-bottom: 60px;
  width: 550px;
  height: 100%;
  font-family: NotoSansCJKkr;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: #061953;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {

  }
  @media (min-width: 1300px) {
  }
`
