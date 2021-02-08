import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import * as Text from 'components/Text'

import {WHITE, PRIMARY, DARKGRAY} from 'static/style'

import MenuItem from './MenuItem'
const image1 = 'static/images/Info.png'
const dropdown = 'static/images/main/dropdown.png';
const dropup = 'static/images/partner/arrow_up.png';
@inject('Partner')
@observer
class MenuConatiner extends React.Component {
  state = {
    width: 0,
    tab: 0,
    showDrop: true,
    showDetail: 'none'
  };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  detailDown = () => {
    const { showDrop, showDetail } = this.state;
    this.setState({showDrop: 'none', showDetail: true})
  }

  detailUp = () => {
    const { showDrop, showDetail } = this.state;
    this.setState({showDrop: true, showDetail: 'none'})
  }

  setTab = (tab) => {
    // 초기화
    if(this.state.tab === tab) {
      this.setState({
        ...this.state,
        tab: 0,
      })
    }
    // 선택
    else {
      this.setState({
        ...this.state,
        tab: tab,
      })
    }
  }

  render(){
    const { Partner } = this.props
    const { width, tab, showDrop, showDetail } = this.state

    return (
      <>
        {
          width < 1299.98 ? (
              <MobileMenuBox style={{display: "none"}}>
                <MobileMenuHeader>
                  {/*<MobileMenuTab active={tab === 1} onClick={() => this.setTab(1)}>
                    <Text.FontSize18 color={tab === 1 ? WHITE : DARKGRAY} fontWeight={700}>제품분야</Text.FontSize18>
                  </MobileMenuTab>*/}
                  <MobileMenuTab active={tab === 2} onClick={() => this.setTab(2)}>
                    <Text.FontSize18 color={tab === 2 ? WHITE : DARKGRAY} fontWeight={700}>카테고리</Text.FontSize18>
                  </MobileMenuTab>
                  {/*<MobileMenuTab active={tab === 3} onClick={() => this.setTab(3)}>
                    <Text.FontSize18 color={tab === 3 ? WHITE : DARKGRAY} fontWeight={700}>지역</Text.FontSize18>
                  </MobileMenuTab>*/}
                </MobileMenuHeader>

                <Menu>
                  {
                    tab === 2 && (
                      <>
                        {
                          Partner.develop_list.length > 0 && Partner.develop_list.map((item, idx) => {
                            return (
                            <>

                              <MenuItem
                                type='develop'
                                key={idx}
                                data={item}
                                main_checked={Partner.developBig && Partner.developBig.id === item.id}
                              />

                            </>
                            )
                          })
                        }
                      </>
                    )
                  }
                </Menu>
              </MobileMenuBox>
            )
            : (
              <MenuBox>
                {/*<Menu>
                  <Header>
                    <Text.FontSize18 color={WHITE} fontWeight={700}>제품분야</Text.FontSize18>
                  </Header>
                  {
                    Partner.category_list.length > 0 && Partner.category_list.map((item, idx) => {
                      return <MenuItem type='category' key={idx} data={item}/>
                    })
                  }
                </Menu>*/}
                <Menu>
                  <Header class="line">
                    <span>카테고리</span>
                    <img src={image1}/>
                  </Header>
                  {
                    Partner.develop_list.length > 0 && Partner.develop_list.map((item, idx) => {
                      return (
                       <>
                       {(item.id == 1) &&
                        <MenuItem
                          type='develop'
                          key={idx}
                          data={item}
                          main_checked={Partner.developBig && Partner.developBig.id === item.id}
                        />
                        }
                        </>
                      )
                    })
                  }
                  { showDetail == true && Partner.develop_list.length > 0 && Partner.develop_list.map((item, idx) => {
                      
                      return (
                       <>
                       {(item.id == 3 || item.id == 4) &&
                        <MenuItem
                          type='develop'
                          key={idx}
                          data={item}
                          main_checked={Partner.developBig && Partner.developBig.id === item.id}
                        />
                        }
                        </>
                      )
                    })

                  }
                  <div class="dropdown" style={{display: showDrop}}>
                    <img src={dropdown} onClick = {this.detailDown}/>
                  </div>
                  <div class="dropup" style={{display: showDetail}}>
                    <img src={dropup} onClick = {this.detailUp}/>
                  </div>
                </Menu>
              </MenuBox>
            )
        }
      </>
    )
  }
}

export default MenuConatiner

const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: row;
    border: 1px solid #ddd;
    margin-top: 15px;
    margin-bottom: 20px;
  }
`
const Menu = styled.div`
  width: 219px;
  margin-bottom: 20px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    margin-bottom: 0;
  }
  @media (min-width: 768px) {
    width: 219px;
    margin-top: 30px;
    margin-right: 87px;
  }
  .dropdown {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    > img {
      cursor: pointer;
      float: right;
      padding-right: 33px;
    }
  }
  .dropup {
    width: 100%;
    height: 12px;
    padding-top: 19px;
    padding-bottom: 19px;
    > img {
      cursor: pointer;
      float: right;
      padding-right: 33px;
    }
  }
`
const Header = styled.div`
  width: 219px;
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
  padding-bottom: 10px;
  //background: linear-gradient(to top, #c2c2c2, #c2c2c2, transparent 5%);
  border-bottom: 2px solid #c2c2c2;
  > img {
    width: 18px;
    height: 18px;
    object-fit: contain;
    padding-left: 12.1px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    justify-content: center;
    margin-bottom: 4px;
  }
`

const MobileMenuBox = styled.div`
  margin: 20px 0 32px;
  box-shadow: 0 0 6px 0 rgba(0,0,0,0.1);
`
const MobileMenuHeader = styled.div`
  display: flex;
`;
const MobileMenuTab = styled.div`
  flex: 1;
  background-color: ${props => props.active ? PRIMARY : '#f5f5f5'};

  border-right: 1px solid #c6c6c6;
  :last-of-type {
    border-right: none;
  }

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 12px 0;
`
const MobileMenuBody = styled.div`
  width: 100%;
`;
