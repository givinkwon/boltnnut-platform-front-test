import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'
import Slider from "react-slick";

import Container from 'components/Container'
import RatioImage from 'components/RatioImage'
import * as Text from 'components/Text'

import Card from './Card'

import { BLACK1, DARKGRAY } from 'static/style'
import RequestListCard from "../../components/RequestCard";

const pass1 = 'static/images/pass1.png'
const pass2 = 'static/images/pass2.png'

const left = 'static/icon/left-arrow.png'
const right = 'static/icon/right-arrow.png'

@inject('Partner', 'Home')
@observer
class ContentConatiner extends React.Component {
  state = {
    current: 0,
    next: true,
    prev: true,
    word: "",
    count: 0
  }
  handleIntersection = (event) => {
    if(event.isIntersecting) {
      console.log('추가 로딩을 시도합니다')
      const {Partner} = this.props
      Partner.getNextPartner()
    }
  }
  // IE 오류 해결
  componentDidMount() {
    const { Home, Partner } = this.props
    const self = this;
    const userAgent = window.navigator.userAgent;
    const searchButton = document.getElementById('searchbutton')
    const searchBarInput = document.getElementById('search')

    if(userAgent.indexOf("MSIE ") !== -1 || userAgent.indexOf(".NET") !== -1
      || userAgent.indexOf("Edge") !== -1)
        {
          this.props.Home.is_ie = true;
        }
    searchButton.addEventListener('click', function(event) {
       self.setState({...this.state, searchWord: searchBarInput.value})
    })
  }
  componentWillMount() {
    const { Partner } = this.props;
    Partner.getNextPartner();
    this.setState({...this.state, count: Partner.partner_count})
  }
  afterChangeHandler = (current) => {
    if(current === 0){
      this.setState({next: true, prev: false})
    } else {
        this.setState({next: true, prev: true})
    }
  }
  pageNext = () => {
    const { Partner } = this.props;
    const { current, count } = this.state;
    const newPage = this.state.current + 1
    const page = parseInt(count/5) + 1

    this.setState({...this.state, current: newPage, count: Partner.partner_count})

    if (this.state.current %2 == 0) {
      Partner.getNextPartner();
    }
  }
  pagePrev = () => {
    if (this.state.current != 0) {
      const newPage = this.state.current - 1
      this.setState({...this.state, current: newPage, prev: true})
    }
  }
  setSearch = () => {
    this.setState({...this.state, searchWord: "Aa"})
  }
  buttonClick = () => {
    console.log("n")
  }

  render() {
    const { Partner, Home } = this.props
    const { prev, next, current, searchWord, count } = this.state
    const current_set = (parseInt(current/5) + 1)
    const page = parseInt(count/5) + 1

    return (
      <CustomContainer>
          <Header>
            {searchWord}에 대한 검색 결과입니다.
          </Header>
        <List>
          {
            Partner.partner_list.length > 0 && Partner.partner_list.slice(5*current, 5*(current+1)).map((item, idx) => {
              return (
                <Card
                  key={item.id}
                  item={item}
                  handleIntersection={this.handleIntersection}
                  observer={!this.props.Home.is_ie && idx === Partner.partner_list.length - 2}
                />
              )
            })
          }
        </List>
        <PageBar>
            <img src={pass1} style={{opacity: current_set == 1 && current == 0  ? 0.4 : 1 }} onClick = {this.pagePrev}/>
              <PageCount onClick = {this.buttonClick} value = {5*(current_set - 1) + 1} active={current%5 == 0}> {5*(current_set - 1) + 1} </PageCount>
              <PageCount value = {5*(current_set - 1) + 2} active={current%5 == 1}> {5*(current_set - 1) + 2} </PageCount>
              <PageCount value = {5*(current_set - 1) + 3} active={current%5 == 2}> {5*(current_set - 1) + 3} </PageCount>
              <PageCount value = {5*(current_set - 1) + 4} active={current%5 == 3}> {5*(current_set - 1) + 4} </PageCount>
              <PageCount value = {5*(current_set - 1) + 5} active={current%5 == 4}> {5*(current_set - 1) + 5} </PageCount>
              <PageCount> ... </PageCount>
            <img src={pass2} style={{opacity: page == current ? 0.4 : 1, display: page == current? 'none' : 'block'}} onClick = {this.pageNext} />
        </PageBar>
      </CustomContainer>
    )
  }
}

export default ContentConatiner

const CustomContainer = styled.div`
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 720px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
    width: 894px;
  }
`
const List = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .slick-dots {
    width: 120px;
  }
`
const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc((100%/2) - 7.5px);
    :nth-of-type(2n){
      margin-left: 15px;
    }
    > p {
      margin-top: 10px;
    }
  }
  @media (min-width: 768px) {
    width: calc((100%/3) - 10px);
    :nth-of-type(3n-1){
      margin-left: 15px;
      margin-right: 15px;
    }
    > p {
      margin-top: 20px;
    }
  }
`
const Image = styled(RatioImage)`
  cursor: pointer;
  border-radius: 12px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    max-width: 400px;
  }
  > div {
    transition: 0.4s;
  }
  :hover {
    > div {
      transform: scale(1.2);
    }
  }
`
const Header = styled.div`
  height: 36px;
  object-fit: contain;
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.42;
  letter-spacing: -0.6px;
  text-align: left;
  color: #191919;
  padding-top: 30px;
  padding-bottom: 15px;
`
const PageBar = styled.div`
  width: 351px;
  margin-top: 109px;
  margin-bottom: 157px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
`
const PageCount = styled.span`
    width: 14px;
    height: 30px;
    font-size: 25px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: 0.63px;
    text-align: left;
    color : #999999;
    cursor: pointer;
    ${(props) =>
      props.active &&
      css`
      font-weight: 700;
      color: #0933b3;
      `
     }
`
const Icon = styled.img`
  cursor: pointer;
  width: 10x;
  height: 17px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 30px;
    height: 30px;
  }
`