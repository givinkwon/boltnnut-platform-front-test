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
import AnimationCount from 'react-count-animation';
import RequestListCard from "../../components/RequestCard";
import CounterContainer from "../Request/Counter";
//Skeleton
import Skeleton from '@material-ui/lab/Skeleton';


const pass1 = 'static/images/pass1.png'
const pass2 = 'static/images/pass2.png'

const left = 'static/icon/left-arrow.png'
const right = 'static/icon/right-arrow.png'


@inject('Partner', 'Home', "Loading")
@observer
class ContentConatiner extends React.Component {
  state = {
    current: 0,
    next: true,
    prev: true,
    word: "",
    count: 0,
    width: 0,
    customers: 0,
    category_list: [
      ['디자인','inactive', 1],
      ['금형/사출','inactive', 14],
      ['금속가공','inactive', 12],
      ['기구설계','inactive', 6],
      ['회로설계','inactive', 2],
      ['실리콘','inactive', 10],
      ['3D 프린터','inactive', 9],
      ['기계설계','inactive', 7],
      ['진공성형','inactive', 11],
      ],
    category_idx: ['디자인', '금형/사출', '금속가공', '기구설계', '회로설계', '실리콘', '3D 프린터', '기계설계', '진공성형'],
  }
  handleIntersection = (event) => {
    if(event.isIntersecting) {
      console.log('추가 로딩을 시도합니다')
      const {Partner} = this.props
      Partner.getNextPartner()
    }
  }
  loadScroll = () => {
    const { Partner } = this.props;
    const { width } = this.state;

    if (typeof document != "undefined") {
      var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      var clientHeight = document.documentElement.clientHeight;
    }
    if (width < 991.98 && scrollTop + clientHeight + 5 > scrollHeight) {
      Partner.getNextPartner();
    }
  }
  // IE 오류 해결
  async componentDidMount() {
    const { Home, Partner } = this.props
    console.log('componentDidMount');

    // setTimeout(() => 
    // this.props.Loading.setOpen(true), 4000);

    const self = this;
    const userAgent = window.navigator.userAgent;
    const searchButton = document.getElementById('searchbutton')
    const searchBarInput = document.getElementById('search')

    window.addEventListener('resize', this.updateDimensions);
    window.addEventListener('scroll', this.loadScroll);
    this.setState({ ...this.state, width: window.innerWidth });

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
    console.log('componentWillMount');

    if (typeof window !== "undefined") {
      window.removeEventListener('resize', this.updateDimensions);
    }
    const { Partner } = this.props;
    Partner.getNextPartner();
    this.setState({...this.state, count: Partner.partner_count})
  }

  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

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
    if (this.state.current%5 == 4) {
      Partner.getNextPartner();
      console.log(this.state.current)
    }
    console.log(this.state.current)
    console.log(this.state.current%5);
  }
  pagePrev = () => {
    if (this.state.current != 0) {
      const newPage = this.state.current - 1
      this.setState({...this.state, current: newPage, prev: true})
    }
  }
  sleep = (time) => {
    var timeStart = new Date().getTime();
    while (true) {
      var elapsedTime = new Date().getTime() - timeStart;
      if (elapsedTime > time) {
        break;
      }
    }
  }
  buttonClick = (e) => {
    const { Partner } = this.props;
    const { current } = this.state;
    const newPage = e.target.innerText*1;
    var length = Partner.partner_list.length;
    var filledPage = parseInt(length/5);

    while (filledPage < newPage) {
      Partner.getNextPartner();
      filledPage = filledPage + 2;
      console.log(filledPage)
    }
    this.setState({...this.state, current: newPage-1});
  }

  CategoryCircle = () => {
    const { Partner } = this.props;
    const { category_list, category_idx, width } = this.state;
    const handleChange = async (e) => {
      if (category_list[category_idx.indexOf(e.target.innerText)][1] == "inactive") {
        const temp_list = category_list;
        const temp_idx = category_idx;
        const idx = temp_idx.indexOf(e.target.innerText);

        Partner.setList(temp_list[idx][2], 'develop');

        delete temp_idx[idx]
        delete temp_list[idx]
        const f = [e.target.innerText]
        const f_list = [[e.target.innerText, 'active']]

        for (var item in temp_idx) {
          f.push(temp_idx[item])
        }
        for (var item in temp_list) {
          f_list.push(temp_list[item])
        }
        this.setState({...this.state, category_idx: f, category_list: f_list})
      } else {
        const temp_list = category_list;
        const temp_idx = category_idx;
        const idx = temp_idx.indexOf(e.target.innerText);

        Partner.setList(temp_list[idx][2], 'develop');

        delete temp_idx[idx]
        delete temp_list[idx]
        const f = []
        const f_list = []

        for (var item in temp_idx) {
          f.push(temp_idx[item])
        }
        f.push(e.target.innerText)
        for (var item in temp_list) {
          f_list.push(temp_list[item])
        }
        f_list.push([e.target.innerText, 'inactive'])
        this.setState({...this.state, category_idx: f, category_list: f_list})
      }
    }
    var settings = {
      dots: false,
      infinite: false,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      draggable: false,
    }
    return (
  <>
    { width < 767.99 ? (
  <>
    <Slider {...settings}>
      {
      category_list.map((item, idx) => {
        return (
        <CategoryBox onClick = {handleChange}>
          <div class={item[1]}>
            <span> {item[0]} </span>
          </div>
        </CategoryBox>
        )
      })
      }
    </Slider>
  </>
    ) : (
    <>
      {
      category_list.map((item, idx) => {
        return (
        <CategoryBox onClick = {handleChange}>
          <div class={item[1]}>
            <span> {item[0]} </span>
          </div>
        </CategoryBox>
        )
      })
      }
    </>
    )
    }
  </>
  )
  }

  countCalc () {
    const { Request, Partner } = this.props;
    let result = 3924

    if(Partner.select_big != null && Partner.select_mid == null){
        result = Partner.select_big.id === 0 ?  4490 : 460 * (((Partner.select_big.id)/5) + 4)
    }
    if(Partner.select_big != null && Partner.select_mid != null && Partner.select_small == null){
        result = Partner.select_big.id === 0 ?  4490 : 460 * (((Partner.select_big.id)/5) + 4) - 260* ((Partner.select_mid.id/50) + 5)
    }
    if(Partner.select_big != null && Partner.select_mid != null && Partner.select_small != null){
        result = Partner.select_big.id === 0 ?  4490 : 460 * (((Partner.select_big.id)/5) + 4) - 260* ((Partner.select_mid.id/50) + 5) - 40 * ((Request.select_small.id/100) + 3)
    }
    return result
  }

  render() {
    const { Partner, Home, Loading } = this.props
    const { prev, next, current, searchWord, count, width } = this.state
    const current_set = (parseInt(current/5) + 1)
    const page = parseInt(count/5) + 1

    const countSettings = {
      start: 0,
      count : this.countCalc(),
      duration: 6000,
      decimals: 0,
      useGroup: true,
      animation: 'up'
    };

    return (
      <CustomContainer>
      <>
      { width < 1299.98 && (
        <>
          <MobileList>
            <this.CategoryCircle/>
          </MobileList>
        </>
        )
      }
      </>
          <Header>
            {Partner.search_true == 1 ?
            (Partner.search_text + "에 대한 검색 결과입니다.")
             : <div style={{display: "inline-flex"}}>
                 총 <AnimationCount {...countSettings}> 3924 </AnimationCount> 개의 제조사가 있습니다.
               </div>
             }
          </Header>
      { width > 991.98 ? (
      <>
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
                  // Loading.is_open ? (
                    
                  // ):( 
                  //   <Skeleton animation="wave" variant="rect" width="894px" height="200px" style={{ marginBottom: 20 }}/>
                  // )
                  
                )
              })
            }
          </List>
        <PageBar>
            <img src={pass1} style={{opacity: current_set == 1 && current == 0  ? 0.4 : 1 }} onClick = {this.pagePrev}/>
              <PageCount onClick = {this.buttonClick} value = {5*(current_set - 1) + 1} active={current%5 == 0}> {5*(current_set - 1) + 1} </PageCount>
              <PageCount onClick = {this.buttonClick} value = {5*(current_set - 1) + 2} active={current%5 == 1}> {5*(current_set - 1) + 2} </PageCount>
              <PageCount onClick = {this.buttonClick} value = {5*(current_set - 1) + 3} active={current%5 == 2}> {5*(current_set - 1) + 3} </PageCount>
              <PageCount onClick = {this.buttonClick} value = {5*(current_set - 1) + 4} active={current%5 == 3}> {5*(current_set - 1) + 4} </PageCount>
              <PageCount onClick = {this.buttonClick} value = {5*(current_set - 1) + 5} active={current%5 == 4}> {5*(current_set - 1) + 5} </PageCount>
              <PageCount> ... </PageCount>
            <img src={pass2} style={{opacity: page == current ? 0.4 : 1, display: page == current? 'none' : 'block'}} onClick = {this.pageNext} />
        </PageBar>
      </>
    ) : (
    <>
      <List>
          {
            Partner.partner_list.length > 0 && Partner.partner_list.map((item, idx) => {
              return (
                <Card
                  key={item.id}
                  item={item}
                  handleIntersection={this.handleIntersection}
                  observer={!this.props.Home.is_ie && idx === Partner.partner_list.length - 1}
                />
              )
            })
          }
        </List>
    </>
    )}
      </CustomContainer>
    )
  }
}

export default ContentConatiner

const CustomContainer = styled.div`
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100%);
    padding: 0;
  }

  @media (min-width: 767.99px) and (max-width: 991.98px) {
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
  justify-content: center;
  .slick-dots {
    width: 120px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    justify-content: center;
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
  @media (min-width: 767.99px) {
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
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding-top: 16px;
    height: auto;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.08;
    letter-spacing: -0.3px;
    text-align: left;
    padding-left: calc(5%);
    }
  @media (min-width: 767.99px) and (max-width: 991.98px) {
    }
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
const CategoryBox = styled.div`
  width: 64px;
  height: 22px;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  text-align: center;
  font-size: 10px;
  display:flex;
  align-items: center;
  :hover {
    outline: none;
  }
  > span {
    width: 32px;
    height: 18px;
    font-size: 10px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.67;
    letter-spacing: -0.3px;
    text-align: center;
    @media (min-width: 767.99px) and (max-width: 1299.98px) {
      font-size: 16px;
    }
  }
  .active {
    width: 64px;
    height: 22px;
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
    background-color: #0933b3;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (min-width: 767.99px) and (max-width: 1299.98px) {
      width: 100%;
      height: 32px;
      border-radius: 15px;
      display: flex;
      justify-content: center;
    }
    :hover {
      outline: none;
    }
      > span {
        color: white;
        font-size: 12px;
      }
    }
  @media (min-width: 767.99px) and (max-width: 1299.98px) {
    width: calc(10%);
    height: 32px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    font-size: 14px;
  }
`
const SelectRow = styled.div`
  width: 100%;
  align-items: center;
  position: relative;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 0px;
    }
  @media (min-width: 767.99px) and (max-width: 1299.98px) {
    padding-left: 0px;
    display: inline-flex;
    justify-content: space-between;
  }
`
const MobileList = styled(SelectRow)`
  display: block;
  padding-left: calc(5%);
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: solid 2px #dfdfdf;
  border-top: solid 2px #dfdfdf;
  .slick-list {
    height: 24px;
    > div > div {
      width: 64px !important;
      margin-right: 12px;
    }
    > div > div > div {
        width: 64px;
    }
    > div > div > div > div {
      display: flex !important;
      justify-content: center;
    }
    @media (min-width: 767.99px) and (max-width: 1299.98px) {
      height: 36px;
    }
  }
`
