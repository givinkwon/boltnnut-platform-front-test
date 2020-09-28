import React from 'react'
import styled, {css} from 'styled-components'
import Router from 'next/router'

import * as Text from 'components/Text'
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'
import {inject, observer} from "mobx-react";

import * as FormatUtils from 'utils/format';

@inject('Notice')
@observer
class ContentConatiner extends React.Component {
  pushToDetail = async (id) => {
    const {Notice} = this.props;
    await Router.push(`/notice/${id}`);
    Notice.setCurrent(id);
  }


  render(){
    const noticeList = this.props.Notice.notice_list

    return (
      <div>
        <Header>
          <Text.FontSize20 color={WHITE} fontWeight={700}>No.</Text.FontSize20>
          <Text.FontSize20 color={WHITE} fontWeight={700}>제목</Text.FontSize20>
          <Text.FontSize20 color={WHITE} fontWeight={700}>등록일</Text.FontSize20>
        </Header>
        {
          noticeList.map((notice, idx) => {
            return (
              <Content key={notice.id}>
                <div>
                  <Text.FontSize20 color={DARKGRAY} fontWeight={500}>{notice.id}</Text.FontSize20>
                  <Text.FontSize20
                    color={PRIMARY}
                    fontWeight={500}
                    onClick={() => this.pushToDetail(notice.id)}
                  >
                    {notice.title}
                  </Text.FontSize20>
                  <Text.FontSize20 color={DARKGRAY} fontWeight={500}>{FormatUtils.formatDate(notice.created_at)}</Text.FontSize20>
                </div>
              </Content>
            );
          })
        }
      </div>
    )
  }
}

export default ContentConatiner

const Header = styled.div`
  height: 55px;
  background-color: ${PRIMARY};

  display: flex;
  align-items: center;

  padding: 0 15px;
  > p {
    :nth-of-type(1) {
      width: 15%;
    }
    :nth-of-type(2) {
      width: 60%;
    }
    :nth-of-type(3) {
      width: 25%;
    }
  }
`
const Content = styled.div`
  background-color: #f2f2f2;
  border-bottom: 1px solid #dedede;  
  
  > div {
    display: flex;
    padding: 10px 15px;
    > p {
      :nth-of-type(1) {
        width: 15%;
      }
      :nth-of-type(2) {
        width: 60%;
        cursor: pointer;
      }
      :nth-of-type(3) {
        width: 25%;
      }
    }
  }
  
  :last-child {
    border-bottom: none;
  }
`
