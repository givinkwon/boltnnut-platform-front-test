import React from 'react'
import styled, {css} from 'styled-components'

import Container from 'components/Container'
import * as Text from 'components/Text'
import { WHITE, PRIMARY } from 'static/style'
import RatioImage from 'components/RatioImage'
import {withRouter} from "next/router";
class TabConatiner extends React.Component {
  render(){
    const { tab, setTab, router } = this.props

    return (
      <Container>
        <Tabs>
          {/*<Tab active={tab===1} onClick={() => setTab(1)}>
            <Text.FontSize20 fontWeight={500}>큐레이션된 제조사</Text.FontSize20>
          </Tab>*/}
          {tab==2 &&
          <Tab active={true} onClick={() => {router.back()}}>
			<Text.FontSize20 fontWeight={500}>
			    {/*<ArrowLeft src="/static/icon/left-arrow-white.png" />*/}
			    제조사 리스트 돌아가기
			</Text.FontSize20>
		  </Tab>
		  }
          <Tab active={tab===2} onClick={() => setTab(2)}>
            <Text.FontSize20 fontWeight={500}>제조사 정보</Text.FontSize20>
          </Tab>
          {/*<Tab active={tab===3} onClick={() => setTab(3)}>
            <Text.FontSize20 fontWeight={500}>제조사 스토리</Text.FontSize20>
          </Tab>*/}

        </Tabs>
      </Container>
    )
  }
}

export default withRouter(TabConatiner)

const Tabs = styled.div`
  margin-top: 30px;
  display: flex;
  @media (min-width: 0px) and (max-width: 767.98px) {
    /* height: 180px; */
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    /* height: 200px; */
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    /* height: 230px; */
  }
  @media (min-width: 1300px) { 
    /* height: 250px; */
  }
`

const Tab = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: #dededf;
  > p {
    color: #898989;
    padding-top: 2px;
  }
  border-left: 1px solid #898989;
  :first-of-type {
    border-left: 0;
  }
  
  padding: 15px 0px;
  ${props => props.active && css`
      background-color: ${PRIMARY};
      > p {
        color: ${WHITE};
      }
  `}
`
const ArrowLeft = styled(RatioImage)`
	width: 18px;
	margin-right: 10px;

`