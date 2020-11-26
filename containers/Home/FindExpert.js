import React from 'react'
import styled, {css} from 'styled-components'
import Slider from "react-slick";
import Router from "next/router";
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'
import RatioImage from 'components/RatioImage'
import * as Text from 'components/Text'
import Button from "components/Button";

import {BLACK, BLACK1, DARKGRAY, PRIMARY, WHITE} from 'static/style'

const search_ic = 'static/icon/search.png'
const data = [
  {id:1, name: "3D프린터/Mock-up", image: 'static/images/main/1-1.png'},
  {id:2, name: "설계", image: 'static/images/main/1-2.png'},
  {id:3, name: "가공/금형/사출", image: 'static/images/main/1-3.png'},
]

@inject('Home', 'Partner')
@observer
class FindExperctConatiner extends React.Component {
  state = {
    search: "",
  };
  searchText = (e) => {
    this.setState({ search: e.target.value });
  };
  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // TODO 검색 API
      Router.push(`/partner?q=${this.state.search}`,'/');
    }
  };

  pushToPartner = (developBig) => {
    const { Partner } = this.props;
    Partner.setParentList(true, developBig, 'develop');
    Partner.developBig = developBig;
    Router.push('/partner');
  }

  render() {
    const { Home } = this.props;
    const { search } = this.state;

    var settings = {
      dots: false,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        },
      ]
    }
    return (
      <FindExperct>
        <Text.FontSize40 color={BLACK1} fontWeight={700}>제조 전문가를 확인해보세요</Text.FontSize40>

        <SearchBar>
          <input
            placeholder="만들고자 하는 제품 분야를 검색해보세요  ex)의료용품"
            value={search}
            onChange={this.searchText}
            onKeyDown={this.handleKeyDown}
          />
          <div />
        </SearchBar>

        {
          /*
          <Button
            borderColor={PRIMARY}
            backgroundColor={PRIMARY}
            borderRadius={16}
            onClick={() => Router.push("/partner")}
          >
            <Text.FontSize24 color={WHITE} fontWeight={500} borderRadius={0}>
              제조사 찾기
            </Text.FontSize24>
          </Button>

           */
        }

        <List>
          <Slider {...settings}>
          {
            Home.develop_list.length > 0 && Home.develop_list.map((item, idx) => {
              return (
                <ItemBox key={idx} onClick={() => this.pushToPartner(item)}>
                  <Item>
                    <Image ratio='60%' src={item.maincategory_img} />
                    <Text.FontSize24 color={DARKGRAY} fontWeight={500}>{item.maincategory}</Text.FontSize24>
                  </Item>
                </ItemBox>
              )
            })
          }
          </Slider>
        </List>
      </FindExperct>
    )
  }
}

export default FindExperctConatiner

const FindExperct = styled(Container)`
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
const List = styled.div`
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 30px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 30px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    margin-top: 30px;
  }
  @media (min-width: 1300px) { 
    margin-top: 30px;
  }
`
const ItemBox = styled.div`
  :focus {
    outline: none;
  }
`
const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    text-align: center;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    > p {
      margin-top: 20px;
    }
  }
  @media (min-width: 768px) {
    width: calc(100% - 10px);
    > p {
      margin-top: 20px;
    }
  }
`
const Image = styled(RatioImage)`
  cursor: pointer;
  border-radius: 0 !important;
  
  width: calc(100% - 20px);
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    max-width: 400px;
  }
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;

  margin-top: 50px;
  margin-right: 10px;
  border-radius: 20px;
  background-color: #f3f4f6;

  padding: 10px 15px;
  padding-left: 30px;
  /* max-width: 750px; */
  div {
    cursor: pointer;
    background-image: url(${search_ic});
    background-position: center;
    background-size: cover;
    width: 20px;
    height: 17px;
  }
  input {
    background-color: #fff0;
    border: 0px;
    width: 100%;

    &:focus {
      outline: none;
    }
    @media (min-width: 0px) and (max-width: 767.98px) {
      font-size: 16px;
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
      font-size: 18px;
    }
    @media (min-width: 992px) and (max-width: 1299.98px) { 
      font-size: 20px;
    }
    @media (min-width: 1300px) { 
      font-size: 24px;
    }
  }
 
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 40px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 40px;
  }
`;