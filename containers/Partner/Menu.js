import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import * as Text from 'components/Text'

import {WHITE, PRIMARY, DARKGRAY} from 'static/style'

import MenuItem from './MenuItem'

@inject('Partner')
@observer
class MenuConatiner extends React.Component {
  state = {
    width: 0,
    tab: 0,
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
    const { width, tab } = this.state

    return (
      <>
        {
          width < 768 ? (
              <MobileMenuBox>
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
                    tab === 1 && (
                      <>
                        {
                          Partner.category_list.length > 0 && Partner.category_list.map((item, idx) => {
                            return <MenuItem type='category' key={idx} data={item}/>
                          })
                        }
                      </>
                    )
                  }
                  {
                    tab === 2 && (
                      <>
                        {
                          Partner.develop_list.length > 0 && Partner.develop_list.map((item, idx) => {
                            console.log(Partner.developBig);
                            console.log(develop_list)
                            return (
                              <MenuItem
                                type='develop'
                                key={idx}
                                data={item}
                                main_checked={Partner.developBig && Partner.developBig.id === item.id}
                              />
                            )
                          })
                        }
                      </>
                    )
                  }
                  {
                    tab === 3 && (
                      <>
                        {
                          Partner.city_list.length > 0 && Partner.city_list.map((item, idx) => {
                            return <MenuItem type='city' key={idx} data={item}/>
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
                  <Header>
                    <Text.FontSize18 color={WHITE} fontWeight={700}>카테고리</Text.FontSize18>
                  </Header>
                  {
                    Partner.develop_list.length > 0 && Partner.develop_list.map((item, idx) => {
                      console.log(Partner.developBig);
                      console.log(item)
                      return (
                        <MenuItem
                          type='develop'
                          key={idx}
                          data={item}
                          main_checked={Partner.developBig && Partner.developBig.id === item.id}
                        />
                      )
                    })
                  }
                </Menu>
                {/*<Menu style={{marginBottom: 20}}>
                  <Header>
                    <Text.FontSize18 color={WHITE} fontWeight={700}>지역</Text.FontSize18>
                  </Header>
                  {
                    Partner.city_list.length > 0 && Partner.city_list.map((item, idx) => {
                      return <MenuItem type='city' key={idx} data={item}/>
                    })
                  }
                </Menu>*/}
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
  background-color: #fff;
  box-shadow: 0 0 6px 0 rgba(0,0,0,0.1);
  margin-bottom: 20px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    margin-bottom: 0;
  }
  @media (min-width: 768px) {
    width: 200px;
    margin-top: 15px;
    margin-right: 15px;
  }
`
const Header = styled.div`
  width: calc(100% - 30px);
  padding: 15px;
  margin-bottom: 16px;

  background-color: ${PRIMARY};
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
