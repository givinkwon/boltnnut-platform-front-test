import React, { Fragment } from "react";
import styled, {css} from 'styled-components'
import Router from 'next/router'
import Slider from "react-slick";

import Background from 'components/Background';
import Containerv1 from 'components/Containerv1';

import Container from 'components/Container'
import RatioImage from 'components/RatioImage'
import SearchBar from './SearchBar'
import * as Text from 'components/Text'
import { BLACK1, GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'
import {inject, observer} from "mobx-react";

import * as FormatUtils from 'utils/format';


const left = 'static/icon/left-arrow.png'
const right = 'static/icon/right-arrow.png'
const dropDown = 'static/images/pass5.png'
const dropUp = 'static/images/pass6.png'

@inject('Magazine')
@observer
class ContentConatiner extends React.Component {
  state = {    
    current: 0,
    next: true,
    prev: false,
    show: 'visible'
  }
  test = (item, idx) => {

  }

  activeHandler = (idx) => {
    // console.log(`this.state.index : ${this.state.index}`)
    // console.log(`idx : ${idx}`)
    if(idx=== this.props.Magazine.category_checked_idx) {
      // console.log("equal")
      

       return true; 
    } else { 
      return false; 
    }
  };

  onClickHandler = (item, idx) => {
    const { Magazine } = this.props;
   
    // 동일한 상위 카테고리를 클릭했을 경우
    if(idx === Magazine.category_checked_idx){
      const categoryMenuItem = document.querySelectorAll(`.CategoryMenuItem${idx}`)
    
      // 선택되어있는 경우 하위 카테고리 보이게 하기
      if(item.checked){              
        for(var i = 0; i< categoryMenuItem.length; i++){
          categoryMenuItem[i].style.display = 'block'  
        }        
      }
      // 선택 안 되어있는 경우 하위 카테고리 감추기
      else{
        for(var i = 0; i< categoryMenuItem.length; i++){
          categoryMenuItem[i].style.display = 'none'
        }        
      }
    }
    // 다른 상위 카테고리를 클릭했을 경우
    else if(idx !== Magazine.category_checked_idx) {
      const categoryMenuPrevItem = document.querySelectorAll(`.CategoryMenuItem${Magazine.category_checked_idx}`)
      const categoryMenuItem = document.querySelectorAll(`.CategoryMenuItem${idx}`)

      // 이전 상위 카테고리의 첫 번째 하위 카테고리가 선택되고 나머지는 해제시킴
      Magazine.categoryAry[Magazine.category_checked_idx].item[Magazine.category_detail_checked_idx].checked = false
      Magazine.categoryAry[Magazine.category_checked_idx].item[0].checked = true
      Magazine.category_detail_checked_idx = 0

      // if(Magazine.category_checked_idx !== -1){
      
      // 이전에 선택한 상위 카테고리 체크 해제하고 지금 선택한 상위 카테고리는 체크
      Magazine.categoryAry[Magazine.category_checked_idx].checked = false;
      // }            
      Magazine.category_checked_idx = idx      
      Magazine.categoryAry[idx].checked = true;

      // 이전에 선택한 상위 카테고리의 하위 카테고리 화면에 보이게 하는 여부
      if(!item.checked){
        for(var i = 0; i< categoryMenuPrevItem.length; i++){
          categoryMenuPrevItem[i].style.display = 'block'  
        }
      }else{
        for(var i = 0; i< categoryMenuPrevItem.length; i++){
          categoryMenuPrevItem[i].style.display = 'none'
        }        
      }

      // 현재 선택한 상위 카테고리의 하위 카테고리 화면에 보이게 하는 여부
      if(Magazine.categoryAry[idx].checked){
        for(var i = 0; i< categoryMenuItem.length; i++){
          categoryMenuItem[i].style.display = 'block'  
        }
      }else{
        for(var i = 0; i< categoryMenuItem.length; i++){
          categoryMenuItem[i].style.display = 'none'
        }        
      }
    }
    this.setState({f:3})
  }

  onClickDetailHandler = (data, idx, id) => {
    const { Magazine } = this.props
   
    if(id === Magazine.category_detail_checked_idx){
    
    }
    else{
      if(Magazine.categoryAry[idx].item[Magazine.category_detail_checked_idx]){
        Magazine.categoryAry[idx].item[Magazine.category_detail_checked_idx].checked = false
      }
      Magazine.category_detail_checked_idx = id
      Magazine.categoryAry[idx].item[id].checked = true
      
    }
  this.setState({g:3})
    
  }
  // buttonClick = (e) => {
  //   const { current } = this.state;
  //   const newPage = e.target.innerText*1;
  //   this.setState({...this.state, current: newPage-1});
  //   this.slider.slickGoTo(newPage-1)
  // }
  pushToDetail = async (id) => {
    const {Magazine} = this.props;
    await Router.push(`/magazine/${id}`);
  }

  sliderNext = () => {
    const {current, next} = this.state;
    var fullPage = parseInt((this.props.Magazine.magazine_list.length - 6)/3)+1

    if (current != fullPage && this.props.Magazine.magazine_list.length > 6) {
      const newPage = current + 1
      this.setState({...this.state, current: newPage, show:'hidden'})
      setTimeout(() => {this.setState({...this.state, show:'visible'})}, 600)
      //this.slider.slickNext();
    }
  }
  sliderPrev = () => {
    const {current, prev} = this.state;

    if (current != 0) {
      const newPage = current - 1
      this.setState({...this.state, current: newPage, show:'hidden'})
      setTimeout(() => {this.setState({...this.state, show:'visible'})}, 600)
      //this.slider.slickPrev();
    }
  }
  prevPage = () => {
    const {current, next} = this.state;
    const { Magazine } = this.props;
    //var fullPage = parseInt((this.props.Magazine.magazine_list.length)/12)+1

    //console.log("nextPage")
    console.log(Magazine.current_page)
    if (Magazine.current_page > 1) {
      console.log("current != fullPage")
      const newPage = current - 1

      Magazine.current_page = Magazine.current_page - 1
      this.setState({...this.state, current: newPage, show:'hidden'})
      this.setState({...this.state, show:'visible'})
      //this.slider.slickNext();
    }
  }
  movePage = (e) => {
    const { Magazine } = this.props;
    const newPage = e.target.innerText*1;        
    Magazine.current_page = newPage

    //Magazine.magazine_list.slice((Magazine.current_page-1)*12, (Magazine.current_page)*12)

   // Project.getProjectByPrice(Project.search_text, newPage)
  }

  nextPage = () => {
    const {current, next} = this.state;
    const { Magazine } = this.props;
    
    var fullPage = parseInt((this.props.Magazine.magazine_list.length)/12)+1
    Magazine.full_page = parseInt((this.props.Magazine.magazine_list.length)/12)+1
    console.log("nextPage")
    // console.log(fullPage)
    // console.log(current)
    console.log(Magazine.current_page)
    console.log(fullPage)
    if (Magazine.current_page < Magazine.full_page) {
      console.log("current != fullPage")
      const newPage = current + 1

      Magazine.current_page = Magazine.current_page + 1
      this.setState({...this.state, current: newPage, show:'hidden'})
      this.setState({...this.state, show:'visible'})
      //this.slider.slickNext();
    }
  }
  
  render() {
    const { prev, next, width, height, current, show } = this.state;
    const { Magazine } = this.props;
    //const current_set = (parseInt(current/5) + 1)
    //const current_set = (parseInt(Magazine.) + 1)
    const current_set = (parseInt((Magazine.current_page-1) /5)+1)   
  
    //Magazine.full_page = parseInt((this.props.Magazine.magazine_list.length)/12)+1
    var fullPage = parseInt((this.props.Magazine.magazine_list.length)/12)+1

    var settings = {
      dots: false,
      infinite: false,
      arrows: false,
      slidesToShow: 3,
      rows: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      draggable: false,
    };

    return (
      <>
      <ContainerBox>
        <CategoryBox>
          <CategoryHeader>
            <span>카테고리</span>
          </CategoryHeader>

          
          { Magazine.categoryAry.map((item, idx) => {
            return(           
                          
            <CategoryMenu checkMenu={item.checked} className="CategoryMenu">              
            {/* {console.log(item.checked)} */}
              <div active={this.activeHandler(item.id)} onClick={() => {
                // console.log(idx)

                if(item.checked){
                  item.checked=false
                }else{
                  item.checked=true
                }
                // {console.log(item.checked)}
                this.onClickHandler(item, idx)}
              }>
                {/* {console.log(item.name)} */}
                <span className={`CategoryName${idx}`}>{item.name}</span>
                <img src= {item.checked ? 'static/images/pass6.png' : 'static/images/pass5.png'}></img>
              </div>
              
              
                { item.item.map((data, id) => {
                  return(
                    <>
                    <CategoryMenuItem checkUpperMenu = {item.checked} checkMenu={data.checked} className={`CategoryMenuItem${idx}`}>                                  
                    <div onClick={() => {
                      // if(data.checked){
                      //   data.checked=false
                      // }else{
                      //   data.checked=true
                      // }                      
                      this.onClickDetailHandler(data, idx, id)
                    }}>
                      {data.name}
                    </div>
                    {/* {console.log(data)} */}
                    </CategoryMenuItem>    
                    </>
                  )
                  
                })}                
                
              
            </CategoryMenu>
            )
          })}
          {/* <CategoryMenu className="CategoryMenu">
            <div id="menu1" onClick={this.onClickHandler}>
              <span>실시간 클릭</span>
              <img src = {dropDown}></img>
            </div>
            <CategoryMenuItem className="CategoryMenuItem">
              <div>A</div>
              <div>B</div>
              <div>C</div>
            </CategoryMenuItem>
          </CategoryMenu>

          <CategoryMenu className="CategoryMenu">
            <div id="menu2" onClick={this.onClickHandler}>
              <span>실시간 브랜드</span>
              <img src = {dropDown}></img>
            </div>
            <CategoryMenuItem className="CategoryMenuItem">
              <div>a</div>
              <div>b</div>
              <div>c</div>
            </CategoryMenuItem>
          </CategoryMenu>

          <CategoryMenu className="CategoryMenu">
            <div id="menu3" onClick={this.onClickHandler}>
              <span>베스트 상품</span>
              <img src = {dropDown} ></img>
            </div>
            <CategoryMenuItem className="CategoryMenuItem">
              <div>CNC</div>
              <div>3D 프린터</div>
              <div>금형사출</div>
            </CategoryMenuItem>
          </CategoryMenu>

          <CategoryMenu className="CategoryMenu">
            <div id="menu4" onClick={this.onClickHandler}>
              <span>베스트 상품</span>
              <img src = {dropDown}></img>
            </div>
            <CategoryMenuItem className="CategoryMenuItem">
              <div>1</div>
              <div>2</div>
              <div>3</div>
            </CategoryMenuItem>
          </CategoryMenu> */}

        </CategoryBox>
        <ContentBox>
          {/* <Background>
            <Containerv1>  */}
            
          {/* <span>1</span>
          <span>2</span>
          <span>3</span> */}
            
        {/* <FindExperct>
          <List style={{marginBottom:150}}> */}
            {/* <Slider {...settings} rows="3" ref={slider => (this.slider = slider)}>
            {
            this.props.Magazine.magazine_list.map((item, idx) => {
              return (
                <Item
                  onClick={() => this.pushToDetail(item.id)}>
                  <Image ratio='45%' src={item.image}/>
                  <span> {item.title} </span>
                </Item>
              )
              })
            }
            </Slider> */}

            
                {/* <div>
                   <div>A</div>
                </div>            */}
                <Row>
                  {/* <div> */}
                      {/* <div style={{width: '280px', height: '140px', border: '3px solid red'}}>A</div> */}
                      <SearchBar/>
                      {/* {console.log(this.props.Magazine.magazine_list.slice((Magazine.current_page-1)*12, 12))} */}
                      {console.log(Magazine.current_page)}
                      {this.props.Magazine.magazine_list.slice((Magazine.current_page-1)*12, (Magazine.current_page)*12).map((item, idx) => {
                        
                          return (     
                            <>
                              {item && (
                              <Item onClick={() => this.pushToDetail(item.id)}>
                                <Image ratio='45%' src={item.image}/>
                                <span> {item.title} </span>
                              </Item>
                              )}
                            {/* </div> */}
                            </>
                        )
                      
                        
                    })}    
                </Row>
              
          {/* </List> */}
          {/* </Containerv1>
        </Background> */}
          <PageBar>
            {
              
            current == 0 ? (              
              <img src={left} style={{opacity: current_set == 1 && Magazine.current_page <= 1  ? 0.4 : 1, cursor: 'pointer'}} onClick = {this.prevPage}/>
              ) : (
              <img src={left} style={{opacity: current_set == 1 && Magazine.currentPage <= 1  ? 0.4 : 1, cursor: 'pointer'}} onClick = {this.prevPage}/>
              )
            }
              <PageCount value = {5*(current_set - 1) + 1} active={Magazine.current_page % 5 == 1} style={{display:  Magazine.full_page < 5*(current_set - 1) + 1 ? 'none': 'block' }} onClick={this.movePage}> {5*(current_set - 1) + 1} </PageCount>
              <PageCount value = {5*(current_set - 1) + 2} active={Magazine.current_page % 5 == 2} style={{display:  Magazine.full_page < 5*(current_set - 1) + 2 ? 'none': 'block' }} onClick={this.movePage}> {5*(current_set - 1) + 2} </PageCount>
              <PageCount value = {5*(current_set - 1) + 3} active={Magazine.current_page % 5 == 3} style={{display:  Magazine.full_page < 5*(current_set - 1) + 3 ? 'none': 'block' }} onClick={this.movePage}> {5*(current_set - 1) + 3} </PageCount>
              <PageCount value = {5*(current_set - 1) + 4} active={Magazine.current_page % 5 == 4} style={{display:  Magazine.full_page < 5*(current_set - 1) + 4 ? 'none': 'block' }} onClick={this.movePage}> {5*(current_set - 1) + 4} </PageCount>
              <PageCount value = {5*(current_set - 1) + 5} active={Magazine.current_page % 5 == 0} style={{display:  Magazine.full_page < 5*(current_set - 1) + 5 ? 'none': 'block' }} onClick={this.movePage}> {5*(current_set - 1) + 5} </PageCount>
              {/* <PageCount> ... </PageCount> */}
            {
            current == fullPage ? (
              <img src={right} onClick = {this.nextPage} style={{opacity: Magazine.current_page == Magazine.full_page  ? 0.4 : 1}}/>
              ) : (
              <img src={right} onClick = {this.nextPage} style={{opacity: Magazine.current_page == Magazine.full_page  ? 0.4 : 1}}/>
              )
            }
          </PageBar>
        {/* </FindExperct> */}        
        
        </ContentBox>
        </ContainerBox>
      </>
  )}
}
// const categoryAry = [
//   { id : 1, name : '실시간 클릭', item: [{name : 'A', checked: 'true'}, {name : 'B', checked: 'false'}, {name : 'C', checked: 'false'}, {name : 'D', checked: 'false'}, {name : 'E', checked: 'false'}], checked: 'true'},
//   { id : 2, name : '베스트 브랜드', item: [{name : '가', checked: 'true'}, {name : '나', checked: 'false'}], checked: 'false'},
//   { id : 3, name : '베스트 상품', item: [{name : 'CNC', checked: 'true'}, {name : '3D 프린터', checked: 'false'}, {name : '금형사출', checked: 'false'}], checked: 'false'},
//   { id : 4, name : '베스트 베스트', item: [{name : '1', checked: 'true'}, {name : '2', checked: 'false'}, {name : '3', checked: 'false'}, {name : '4', checked: 'false'}], checked: 'false'},
// ]

export default ContentConatiner;

const ContainerBox = styled.div`
  display: flex;
  margin-top: 95px;
`
const CategoryBox = styled.div`  
  
`
const CategoryHeader = styled.div`  
  margin-bottom: 55px;
  width: 300px;
  >span:nth-of-type(1){
    //width: 300px;
    font-size: 22px;
    line-height: 34px;
    letter-spacing: -0.55px;
    color: #414550;
    font-weight: bold;
  }
`
const CategoryMenu = styled.div`
  >div:nth-of-type(1){
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    >span:nth-of-type(1){
      font-size: 18px;
      line-height: 34px;
      letter-spacing: -0.45px;
      color: #414550;
      font-weight: ${props => props.checkMenu ? "bold" : "normal"};            
    }
    >img{
      src: ${(props) => (props.checkMenu ? "static/images/pass5.png" : "static/images/pass6.png")};
    }
  }

`

const CategoryMenuItem = styled.div`
  // display: block;
  display: ${(props) => (props.checkUpperMenu ? 'block' : 'none')};
  //checkUpperMenu
  // width: 100px;
  // height: 100px;
  // border: 3px solid red;
  >div{
    font-size:16px;
    line-height: 34px;
    letter-spacing: -0.4px;
    color: ${(props) => (props.checkMenu ? '#282c36' : '#767676')};
    //color: blue;
    padding-left: 24px;
    font-weight : ${(props) => (props.checkMenu ? 'bold' : 'normal')};

  }
`


const ContentBox = styled.div`
  //width: 1000px;

`
const FindExperct = styled(Container)`
  text-align: center;
  /* @media (min-width: 0px) and (max-width: 767.98px) {
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
  } */
`
const List = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  > div {
    width: 100%;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
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

const ItemBox = styled.a`
  display: block;
  :focus {
    outline: none;
  }
  text-decoration: none;
`
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  //flex-direction: row;
  width: 105%;
  // >div:nth-of-type(1){
  //   width: 33%;
  //   min-width: 500px;
  // }
`
const Item = styled.div`
  //width: calc(100%);
  width: 30%;
  height: 247px;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
  > span {
    width: 80%;
    height: 113px;
    padding-top: 10px;
    object-fit: contain;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 26px;
    letter-spacing: -0.45px;
    text-align: center;
    //color: var(--black);
    color: #414550;
    //white-space: nowrap;
    word-break: keep-all;
    @media (max-width: 1299.98px) {
      font-size: 18px;
      width: 90%;
      height: 50px;
      white-space: initial;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }
  @media (min-width: 768px) {
  }
`
const Image = styled(RatioImage)`
  cursor: pointer;
  // border-radius: 25px;
  width: calc(100%);
  height: 160px ;
  @media (min-width: 0px) and (max-width: 767.98px) {
    border-radius: 10px;
    max-width: 400px;
    :hover {
      border-radius: 10px;
      > div {
        border-radius: 15px;
        transform: scale(1.2);
      }
    }
  }
  > div {
    transition: 0.4s;
  }
  :hover {
    border-radius: 10px;
    > div {
      border-radius: 10px;
      transform: scale(1.2);
    }
  }
`
// paging
const PageBar = styled.div`
  width: 250px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 250px;
  margin-top: 100px;
  //margin: 100px auto 200px auto;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  > img {
    cursor: pointer;
  }
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