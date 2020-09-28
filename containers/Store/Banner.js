import React from 'react'
import styled from 'styled-components'
import { inject, observer } from "mobx-react";

import Container from 'components/Container'
import * as Text from 'components/Text'
import { WHITE } from 'static/style' 

@inject("Auth")
@observer
class BannerConatiner extends React.Component {
  render(){
    const { Auth, tab } = this.props
    return (
      <Banner>
        <Container>
          {/* <Text.FontSize48 color={WHITE} fontWeight={700}>{tab === 1 ? '클라이언트 이용방법' : '전문가 이용방법'}</Text.FontSize48> */}
          {Auth.logged_in_user &&
                (Auth.logged_in_user.type === 0 ? (
                        <>
                            <Text.FontSize48 color={WHITE} fontWeight={700}>
                                {tab === 1 ? '회원등급' : '스토어'}
                            </Text.FontSize48>
                            <br/>
                            <br/>
                            <Text.FontSize24 color={WHITE} fontWeight={700}>
                                {tab === 1 ? '볼트앤너트의 회원 등급을 소개합니다' : '프라임회원이 되어 서비스를 이용해보세요'}
                            </Text.FontSize24>
                        </>
                    ) : (
                        <>
                            <Text.FontSize48 color={WHITE} fontWeight={700}>파트너 이용요금</Text.FontSize48><br/><br/>
                            <Text.FontSize24 color={WHITE} fontWeight={700}>볼트앤너트 파트너 이용요금을 알려드릴깨요</Text.FontSize24>
                        </>
                    )
                )
          }

          {/* 비로그인 */}
          {!Auth.logged_in_user &&
                (
                    <>
                        <Text.FontSize48 color={WHITE} fontWeight={700}>{tab === 1 ? '회원등급' : '스토어'}</Text.FontSize48><br/><br/>
                        <Text.FontSize24 color={WHITE} fontWeight={700}>{tab === 1 ? '볼트앤너트의 회원 등급을 소개합니다' : '프라임회원이 되어 서비스를 이용해보세요'}</Text.FontSize24>)
                    </>
                )
           }
        </Container>
      </Banner>
    )
  }
}

export default BannerConatiner

const Banner = styled.div`
  background-image: url('/static/images/banner.jpg');
  background-position: center;
  background-size: cover;
  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    > p:nth-of-type(2){
      margin-top: 8px;
    }
    > p:nth-of-type(3){
      line-height: 1.3;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 180px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 200px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    height: 230px;
  }
  @media (min-width: 1300px) { 
    height: 250px;
  }
`