import React, { Fragment } from "react";
import styled, {css} from 'styled-components'
import Router from 'next/router'
import Slider from "react-slick";

import Background from 'components/Background';
import Containerv1 from 'components/Containerv1';

import Container from 'components/Container'
import RatioImage from 'components/RatioImage'
import * as Text from 'components/Text'
import { BLACK1, GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'
import {inject, observer} from "mobx-react";

import * as FormatUtils from 'utils/format';


const left = 'static/icon/left-arrow.png'
const right = 'static/icon/right-arrow.png'

@inject('Magazine')
@observer
class TabletContentContainer extends React.Component {
  state = {
    magazineLength: 0,
    magazine_idx: 3,
    checked: false
  }
  componentDidMount () {
    this.setState({...this.state, magazineLength: this.props.length})
    window.addEventListener('scroll', this.loadScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadScroll);
  }

  activeHandler = (idx) => {
    // console.log(`this.state.index : ${this.state.index}`)
    // console.log(`idx : ${idx}`)
    if(idx=== this.props.Magazine.mobile_category_checked_idx) {
      // console.log("equal")
      

       return true; 
    } else { 
      return false; 
    }
  };

  // onClickHandler = (item, idx) => {
  //   const { Magazine } = this.props;
   
  //   // 동일한 상위 카테고리를 클릭했을 경우
  //   if(idx === Magazine.category_checked_idx){
  //     const categoryMenuItem = document.querySelectorAll(`.CategoryMenuItem${idx}`)
    
  //     // 선택되어있는 경우 하위 카테고리 보이게 하기
  //     if(item.checked){              
  //       for(var i = 0; i< categoryMenuItem.length; i++){
  //         categoryMenuItem[i].style.display = 'block'  
  //       }        
  //     }
  //     // 선택 안 되어있는 경우 하위 카테고리 감추기
  //     else{
  //       for(var i = 0; i< categoryMenuItem.length; i++){
  //         categoryMenuItem[i].style.display = 'none'
  //       }        
  //     }
  //   }
  //   // 다른 상위 카테고리를 클릭했을 경우
  //   else if(idx !== Magazine.category_checked_idx) {
  //     const categoryMenuPrevItem = document.querySelectorAll(`.CategoryMenuItem${Magazine.category_checked_idx}`)
  //     const categoryMenuItem = document.querySelectorAll(`.CategoryMenuItem${idx}`)

  //     // 이전 상위 카테고리의 첫 번째 하위 카테고리가 선택되고 나머지는 해제시킴
  //     Magazine.categoryAry[Magazine.category_checked_idx].item[Magazine.category_detail_checked_idx].checked = false
  //     Magazine.categoryAry[Magazine.category_checked_idx].item[0].checked = true
  //     Magazine.category_detail_checked_idx = 0

  //     // if(Magazine.category_checked_idx !== -1){
      
  //     // 이전에 선택한 상위 카테고리 체크 해제하고 지금 선택한 상위 카테고리는 체크
  //     Magazine.categoryAry[Magazine.category_checked_idx].checked = false;
  //     // }            
  //     Magazine.category_checked_idx = idx      
  //     Magazine.categoryAry[idx].checked = true;

  //     // 이전에 선택한 상위 카테고리의 하위 카테고리 화면에 보이게 하는 여부
  //     if(!item.checked){
  //       for(var i = 0; i< categoryMenuPrevItem.length; i++){
  //         categoryMenuPrevItem[i].style.display = 'block'  
  //       }
  //     }else{
  //       for(var i = 0; i< categoryMenuPrevItem.length; i++){
  //         categoryMenuPrevItem[i].style.display = 'none'
  //       }        
  //     }

  //     // 현재 선택한 상위 카테고리의 하위 카테고리 화면에 보이게 하는 여부
  //     if(Magazine.categoryAry[idx].checked){
  //       for(var i = 0; i< categoryMenuItem.length; i++){
  //         categoryMenuItem[i].style.display = 'block'  
  //       }
  //     }else{
  //       for(var i = 0; i< categoryMenuItem.length; i++){
  //         categoryMenuItem[i].style.display = 'none'
  //       }        
  //     }
  //   }
  //   this.setState({f:3})
  // }

  // onClickDetailHandler = (data, idx, id) => {
  //   const { Magazine } = this.props
   
  //   if(id === Magazine.category_detail_checked_idx){
    
  //   }
  //   else{
  //     if(Magazine.categoryAry[idx].item[Magazine.category_detail_checked_idx]){
  //       Magazine.categoryAry[idx].item[Magazine.category_detail_checked_idx].checked = false
  //     }
  //     Magazine.category_detail_checked_idx = id
  //     Magazine.categoryAry[idx].item[id].checked = true
      
  //   }
  // this.setState({g:3})
    
  // }
  categoryClickHandler = (item, idx) => {
    const { Magazine } = this.props
    const lowerCategory = document.getElementById("LowerCategory")
    //console.log(lowerCategory)

    if(Magazine.mobile_category_checked_idx !== idx){
      if(Magazine.mobileUpperCategoryAry[Magazine.mobile_category_checked_idx].item[Magazine.mobile_category_detail_checked_idx]){
        //console.log(Magazine.mobileUpperCategoryAry[Magazine.mobile_category_checked_idx])
        Magazine.mobileUpperCategoryAry[Magazine.mobile_category_checked_idx].item[Magazine.mobile_category_detail_checked_idx].checked = false      
        Magazine.mobileUpperCategoryAry[Magazine.mobile_category_checked_idx].item[0].checked = true  
        Magazine.mobile_category_detail_checked_idx = 0
      }

      //console.log(item)
      item.checked = true
      //console.log(Magazine.mobileUpperCategoryAry[Magazine.mobile_category_checked_idx])
      Magazine.mobileUpperCategoryAry[Magazine.mobile_category_checked_idx].checked = false
      Magazine.mobile_category_checked_idx = idx
    }
    if(item.name === "전체"){
      
    //  console.log(lowerCategory)
    console.log("전체O")
      lowerCategory.style.display = 'none'
      this.setState({checked : false })
      Magazine.checked = false
      //lowerCategory.style.display = 'none'
      
    }else{
      console.log("전체X")
      lowerCategory.style.display = 'flex'
      this.setState({checked : true })
      Magazine.checked = true
    }
    console.log(this.state.checked)
    console.log(Magazine.checked)
  }

  lowerCategoryClickHandler = (data, idx, id) => {
    //console.log("click!")
    const { Magazine } = this.props

    // console.log(Magazine.mobile_category_detail_checked_idx)
    // console.log(id)
    if(Magazine.mobile_category_detail_checked_idx !== id){
      data.checked = true
      // console.log(Magazine.mobileUpperCategoryAry[idx].item[id])
      Magazine.mobileUpperCategoryAry[idx].item[Magazine.mobile_category_detail_checked_idx].checked = false

      // if(Magazine.categoryAry[idx].item[Magazine.category_detail_checked_idx]){
      //   Magazine.categoryAry[idx].item[Magazine.category_detail_checked_idx].checked = false
      // }
      Magazine.mobile_category_detail_checked_idx = id
      Magazine.mobileUpperCategoryAry[idx].item[id].checked = true

    }
    this.setState({f:'3'})
  }

  pushToDetail = async (id) => {
    const {Magazine} = this.props;
    await Router.push(`/magazine/${id}`);
  }
  loadScroll = () => {
    const { magazine_idx, magazineLength } = this.state;
    var newIdx = magazine_idx + 3

    if (typeof document != "undefined") {
      var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      var clientHeight = document.documentElement.clientHeight;
    }
    if (scrollTop + clientHeight + 5 > scrollHeight && magazineLength == null) {
      this.setState({...this.state, magazineLength: this.props.length})
    }
    if (scrollTop + clientHeight + 5 > scrollHeight && magazineLength > magazine_idx ) {
      if (newIdx < magazineLength) {
        this.setState({...this.state, magazine_idx: newIdx})
      } else {
        this.setState({...this.state, magazine_idx: magazineLength})
      }
    }
  }

  prevPage = () => {
    const {current, next} = this.state;
    const { Magazine } = this.props;
    //var fullPage = parseInt((this.props.Magazine.magazine_list.length)/6)+1

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

    //Magazine.magazine_list.slice((Magazine.current_page-1)*6, (Magazine.current_page)*6)

   // Project.getProjectByPrice(Project.search_text, newPage)
  }

  nextPage = () => {
    const {current, next} = this.state;
    const { Magazine } = this.props;
    
    var fullPage = parseInt((this.props.Magazine.magazine_list.length)/6)+1
    Magazine.mobile_full_page = parseInt((this.props.Magazine.magazine_list.length)/6)+1
    console.log("nextPage")
    // console.log(fullPage)
    // console.log(current)
    console.log(Magazine.current_page)
    console.log(fullPage)
    if (Magazine.current_page < Magazine.mobile_full_page) {
      console.log("current != fullPage")
      const newPage = current + 1

      Magazine.current_page = Magazine.current_page + 1
      this.setState({...this.state, current: newPage, show:'hidden'})
      this.setState({...this.state, show:'visible'})
      //this.slider.slickNext();
    }
  }

  render() {
    const { magazine_idx, magazineLength } = this.state;
    const { Magazine } = this.props;    
    const current_set = (parseInt((Magazine.current_page-1) /5)+1)   

    return (
      <>
      
        <CategoryMenu checked={Magazine.checked}>
        {/* <Containerv1> */}
          <div></div>
          <div>
            { Magazine.mobileUpperCategoryAry.map((item, idx) => {
              return (  
                <UpperItem onClick={() => {this.categoryClickHandler(item, idx)}} checkUpperMenu={item.checked} checkBoxShadow={item}>
                  <span>{item.name}</span>
                </UpperItem>
              )
            })}             
            </div>
          {/* </Containerv1> */}
          <div id="LowerCategory">
            
          { Magazine.mobileUpperCategoryAry.map((item, idx) => {
            return(
              item.item && item.item.map((data, id) => {                                     
                return (     
                  <LowerItem checkUpperMenu={item} checkLowerMenu={data} checkBoxShadow={item} onClick={() => {this.lowerCategoryClickHandler(data, idx, id)}}>
                    <span>{data.name}</span>               
                  </LowerItem>                         
               )
              })            
            )
          })}
          </div>
        </CategoryMenu>
        
     
        {/* <FindExperct>
            {              
            magazine_idx && this.props.Magazine.magazine_list.slice(0,magazine_idx).map((item, idx) => {
              return (
              // <Row>
                <Item
                  onClick={() => this.pushToDetail(item.id)}>
                  <Image ratio='45%' src={item.image}/>
                  <span> {item.title} </span>
                </Item>
                // </Row>
              )
              })
            }
        </FindExperct> */}

        <Row checked={Magazine.checked}>
        {this.props.Magazine.magazine_list.slice((Magazine.current_page-1)*6, (Magazine.current_page)*6).map((item, idx) => {
                        
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
        <PageBar>
            
              
                  
              <img src={left} style={{opacity: current_set == 1 && Magazine.current_page <= 1  ? 0.4 : 1, cursor: 'pointer'}} onClick = {this.prevPage}/>
            
              <PageCount value = {5*(current_set - 1) + 1} active={Magazine.current_page % 5 == 1} style={{display:  Magazine.mobile_full_page < 5*(current_set - 1) + 1 ? 'none': 'block' }} onClick={this.movePage}> {5*(current_set - 1) + 1} </PageCount>
              <PageCount value = {5*(current_set - 1) + 2} active={Magazine.current_page % 5 == 2} style={{display:  Magazine.mobile_full_page < 5*(current_set - 1) + 2 ? 'none': 'block' }} onClick={this.movePage}> {5*(current_set - 1) + 2} </PageCount>
              <PageCount value = {5*(current_set - 1) + 3} active={Magazine.current_page % 5 == 3} style={{display:  Magazine.mobile_full_page < 5*(current_set - 1) + 3 ? 'none': 'block' }} onClick={this.movePage}> {5*(current_set - 1) + 3} </PageCount>
              <PageCount value = {5*(current_set - 1) + 4} active={Magazine.current_page % 5 == 4} style={{display:  Magazine.mobile_full_page < 5*(current_set - 1) + 4 ? 'none': 'block' }} onClick={this.movePage}> {5*(current_set - 1) + 4} </PageCount>
              <PageCount value = {5*(current_set - 1) + 5} active={Magazine.current_page % 5 == 0} style={{display:  Magazine.mobile_full_page < 5*(current_set - 1) + 5 ? 'none': 'block' }} onClick={this.movePage}> {5*(current_set - 1) + 5} </PageCount>
              {/* <PageCount> ... </PageCount> */}
                     
              <img src={right} onClick = {this.nextPage} style={{opacity: Magazine.current_page == Magazine.mobile_full_page  ? 0.4 : 1}}/>
      
          </PageBar>
      </>
  )}
}

export default TabletContentContainer;

const FindExperct = styled(Container)`
  text-align: center;
  display: flex;
  flex-wrap: wrap;
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
const CategoryMenu = styled.div`
  //width: 800px;
  >div:nth-of-type(1){
    width: 100%;
    height: 6px;
    position: fixed;
    top: 6%;
    background-color: white;
    z-index:1001;
  }
  >div:nth-of-type(2){    
    display: flex;    
    margin-top: 50px;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 6px 3px -2px rgba(0, 0, 0, 0.1);
    //box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    //box-shadow: 2px 3px 6px 0 rgba(0, 0, 0, 0.4);
  
     position: fixed;
     top: -5px;

    //  width: calc(100% - 22px); 
    //  transform: translateX(11px);
     
     width: 100%;
     height: 50px;
     background-color: #ffffff;
     z-index: 1000; 
     padding-bottom: ${props => props.checked ? '45px' : ''};
     //padding-bottom: 45px;

     span{
      // flex-grow: 1;
      //border: 3px solid red;
      text-align: center;
      font-size: 15px;
      line-height: 18px;
      letter-spacing: -0.38px;
      color: #282c36;
      width: 100%;
    }
  }   

  >div:nth-of-type(3){    
    display: none;
    width: 100%;
    height: 125px;
    //margin-top: 50px;
    align-items: center;
    justify-content: flex-start;
    //box-shadow: 0 6px 3px -2px rgba(0, 0, 0, 0.1);
    //box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    //box-shadow: 2px 3px 6px 0 rgba(0, 0, 0, 0.4);
  
     position: fixed;
     top: 10%;
     //width: 100%; 

     width: calc(100% - 22px); 
     transform: translateX(11px);

     height: 50px;
     background-color: #ffffff;
     z-index: 1001; 
     border-top: 2px solid rgba(0, 0, 0, 0.1);
     //box-shadow: 0 6px 3px -2px rgb(0 0 0 / 10%);

     span{
      // flex-grow: 1;
      //border: 3px solid red;
      text-align: center;
      font-size: 15px;
      line-height: 18px;
      letter-spacing: -0.38px;
      //color: #282c36;
    }
  }   
`
const UpperItem = styled.div`
  // width: 100%;
  // text-align: center;
  //border: 3px solid blue;
  >span{
    font-weight: ${(props) => props.checkUpperMenu ? 'bold' : 'normal'};
  }
`

const LowerItem = styled.div`
  //width: 50%;
  text-align: center;
  //border: 3px solid green;
  display: ${(props) => props.checkUpperMenu.checked ? 'block' : 'none'};

  // padding-left: 20px;
  // margin-right: 30px;
  >span{
    //font-weight: ${(props) => props.checkLowerMenu.checked ? 'bold' : 'normal'};
    color: ${(props) => props.checkLowerMenu.checked ? '#0933b3' : '#a4aab4'};
    border-bottom: ${(props) => props.checkLowerMenu.checked ? '3px solid #0933b3' : ''};
    padding-bottom: ${(props) => props.checkLowerMenu.checked ? '12px' : ''};
  }
`

const CategoryMenuItem = styled.div`

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
  margin-top: ${(props) => (props.checked ? '140px' : '116px')};
  //margin-top: 140px;
  //border-top: 3px solid red;
  // >div:nth-of-type(1){
  //   width: 33%;
  //   min-width: 500px;
  // }
`
const Item = styled.div`
  //width: calc(100%);
  width: 48%;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > span {
    width: 100%;
    height: 100%;
    object-fit: contain;
    font-size: 24px;
    // font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.42;
    letter-spacing: -0.6px;
    text-align: center;
    color: var(--black);
    white-space: nowrap;
    @media (max-width: 1299.98px) {
        font-size: 15px;
        line-height: 22px;
        letter-spacing: -0.38px;
        color: #414550;
        width: 90%;
        height: 114px;
        white-space: initial;
        word-break: keep-all;
        margin-top: 8px;
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
  border-radius: 25px;
  width: calc(90%);
  height: 222px ;
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
  margin-bottom: 150px;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  > img {
    cursor: pointer;
    width: 7px;
  }
`
const PageCount = styled.span`
    width: 14px;
    height: 19px;
    font-size: 14px;
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