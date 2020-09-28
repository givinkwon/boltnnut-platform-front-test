import React from 'react'
import styled, {css} from 'styled-components'
import Router from 'next/router';

import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'
import {inject, observer} from "mobx-react";

import RatioImage from "components/RatioImage";
import * as Text from 'components/Text';

import * as FormatUtils from 'utils/format';

@inject('Notice')
@observer
class ContentConatiner extends React.Component {
  render(){
    const {Notice} = this.props
    const {current} = Notice;

    return (
      <div>
        <Header>
          <div onClick={Router.back}>
            <BackIcon src="/static/icon/left-arrow-white.png" />
            <Text.FontSize16 color={WHITE}>
              뒤로가기
            </Text.FontSize16>
          </div>

          <div>
            <Text.FontSize20 color={WHITE} fontWeight={700}>
              {current && current.title}
            </Text.FontSize20>
            <Text.FontSize20 color={WHITE} fontWeight={700}>
              {current && FormatUtils.formatDate(current.created_at)}
            </Text.FontSize20>
          </div>
        </Header>

        <Content>
          <div>
            { current && <Text.FontSize20
              color={DARKGRAY}
              fontWeight={500}
              dangerouslySetInnerHTML={{__html: current.content.replace(/(?:\r\n|\r|\n)/g, '<br />')}}
            /> }


          </div>
        </Content>
      </div>
    )
  }
}

export default ContentConatiner

const Header = styled.div`
  padding: 10px 25px;
  background-color: ${PRIMARY};
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  > div {
    display: flex;
    align-items: center;
  }
  > div:nth-of-type(1) {
    width: fit-content;
    margin-bottom: 15px;
    cursor: pointer;
    
    margin-top: 0.5px;
  }

  > div:nth-of-type(2) {
    > p {
      :nth-of-type(1) {
      
      }
      :nth-of-type(2) {
        margin-left: auto;
      }
    }
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 10px 15px;
  
    > div:nth-of-type(2) {
      flex-direction: column;
      align-items: flex-start;
      
      > p:nth-of-type(1) {
        margin-bottom: 10px;
      }
    }
  }
`
const Content = styled.div`
  background-color: #f2f2f2;
  border-bottom: 1px solid #dedede;  
  line-height: 200%;
  > div {
    display: flex;
    padding: 20px 25px;
    > p {
     
    }
  }
  
  :last-child {
    border-bottom: none;
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      padding: 10px 15px;
    }
  }
`

const BackIcon = styled(RatioImage)`
  width: 14px;
  height: 14px;
  
  margin-top: 1px;
  margin-right: 2px;
`;
