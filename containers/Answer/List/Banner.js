import React from 'react'
import styled from 'styled-components'

import Container from 'components/Container'
import * as Text from 'components/Text'
import { WHITE } from 'static/style'
import {inject, observer} from "mobx-react";


@inject('Answer')
@observer
class BannerConatiner extends React.Component {
  render(){
    const {Answer} = this.props
    let request = null
    let subclass = null
    let category = null
    let main = null
    if(Answer.current_request_id !== -1) {
      request = Answer.getRequestById(Answer.current_request_id);
    }
    if(request) {
      subclass = Answer.getSubclassById(request.product);
      if(subclass) {
        category = Answer.getCategoryById(subclass.category)
        main = Answer.getMainCategoryById(subclass.maincategory)
      }
    }

    return (
      <Banner>
        <Container>
          <Text.FontSize48 color={WHITE} fontWeight={700} style={{marginBottom: 8}}>{request && request.name}</Text.FontSize48>
          <Text.FontSize24 color={WHITE} fontWeight={400}>{main && main.maincategory} | {category && category.category} | {subclass && subclass.subclass}</Text.FontSize24>
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
      margin-top: 12px;
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