import React, { Fragment } from "react";
import styled, {css} from 'styled-components'
import Router from 'next/router'
import Slider from "react-slick";

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
class MobileContentContainer extends React.Component {
  state = {
    magazineLength: 0,
    magazine_idx: 3
  }
  componentDidMount () {
    this.setState({...this.state, magazineLength: this.props.length})
    window.addEventListener('scroll', this.loadScroll);
  }
  pushToDetail = async (id) => {
    const {Magazine} = this.props;
    await Router.push(`/magazine/${id}`);
    Magazine.setCurrent(id);
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
      console.log(this.props.length)
    }
    if (scrollTop + clientHeight + 5 > scrollHeight && magazineLength > magazine_idx ) {
      if (newIdx < magazineLength) {
        this.setState({...this.state, magazine_idx: newIdx})
      } else {
        this.setState({...this.state, magazine_idx: magazineLength})
        console.log(2)
      }
    }
  }

  render() {
    const { magazine_idx, magazineLength } = this.state;
    console.log(this.state);
    return (
        <FindExperct>
            {
            magazine_idx && this.props.Magazine.magazine_list.slice(0,magazine_idx).map((item, idx) => {
              return (
                <Item
                  onClick={() => this.pushToDetail(item.id)}>
                  <Image ratio='45%' src={item.image}/>
                  <span> {item.title} </span>
                </Item>
              )
              })
            }
        </FindExperct>
  )}
}

export default MobileContentContainer;

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
const Item = styled.div`
  width: calc(100%);
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > span {
    width: 100%;
    height: 100%;
    object-fit: contain;
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.42;
    letter-spacing: -0.6px;
    text-align: center;
    color: var(--black);
    white-space: nowrap;
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
  border-radius: 25px;

  width: calc(90%);
  height: 310px ;

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
