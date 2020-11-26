import React, { Component } from 'react';
import styled from 'styled-components';

import RatioImage from './RatioImage';
import * as Text from './Text';

class DownloadFileComponent extends Component {
  render() {
    const { file } = this.props;
    return (
      <DownloadFile target="_blank" href={file} download>
        <Text.FontSize20 color="#40404090" fontWeight={300}>
          {
            file ? file.split('/').pop() : '첨부 파일이 없습니다'
          }
        </Text.FontSize20>
        <RatioImage src="/static/icon/download_file.svg" />
      </DownloadFile>
    );
  }
}

export default DownloadFileComponent;

const DownloadFile = styled.a`
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 14px 15px;
  /*
  margin-left: -15px;
  margin-right: 15px;
  */
  text-decoration: none;

  /* DownloadFileIcon */
  > div {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
  
  /* [파일 이름] max-line-num = 1 */
  > p {
    max-height: 1.3em;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 2px 0;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    > p {
      max-width: calc(100%);
    }
  }
`;
