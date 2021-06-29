import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import CardContainer from "Card";
import CheckUpdateModal from "./CheckUpdateModal";
import CheckClassModal from "./CheckClassModal";

import * as Text from "components/Text";

@inject("Auth")
@observer
class RightConatiner extends Component {
  state = {
    modal_open: false,
    classModal_open: false,
  };

  openModal = () => {
    this.setState({
      ...this.state,
      modal_open: true,
    });
  };
  closeModal = () => {
    this.setState({
      ...this.state,
      modal_open: false,
    });
  };
  closeClassModal = () => {
    this.setState({
      ...this.state,
      classModal_open: false,
    });
  };

  handleIntersection = (event) => {
    if(event.isIntersecting) {
      this.loadNextPage()
    }
  }

  loadNextPage = (event = null) => {
    const { Answer } = this.props;
    const request = Answer.getRequestById(Answer.current_request_id)

    console.log("다음 페이지 로딩 시도");

    const count = Answer.answers.length;

        Answer.loadNextAnswerPage();
  };

  render() {
    const { modal_open, classModal_open } = this.state;
    const { Answer } = this.props;
    const data = Answer.answers;

    const request = Answer.getRequestById(Answer.current_request_id)

    return (
      <Right>
        <CheckUpdateModal open={modal_open} handleClose={this.closeModal} />
        <CheckClassModal
          open={classModal_open}
          handleClose={this.closeClassModal}
        />

        {data.map((item, idx) => {
          console.log(Answer.getPartnerById(item.partner));

          return (
            <>
            {item.active &&
            <ExtraMeeting>
                <Text.FontSize20 color="#404040" fontWeight={500}>
                    업체 상세정보 페이지에서 연락처 확인 후 전화를 걸어 개발 상담을 진행하세요!
                </Text.FontSize20>
            </ExtraMeeting>}
            {item.active &&
            <CardContainer
              key={item.id}
              Answer={Answer}
              item={item}
              partner={Answer.getPartnerById(item.partner)}
              observer={idx === data.length - 1}

            />}
            </>
          );
        })}

        {data.map((item, idx) => {
          console.log(Answer.getPartnerById(item.partner));

          return (
            <>
            {!item.active &&
            <ExtraMeeting>
                <Text.FontSize20 color="#404040" fontWeight={500}>
                    업체 상세정보 페이지에서 연락처 확인 후 전화를 걸어 개발 상담을 진행하세요!
                </Text.FontSize20>
            </ExtraMeeting>}
            {!item.active &&
            <CardContainer
              key={item.id}
              Answer={Answer}
              item={item}
              partner={Answer.getPartnerById(item.partner)}
              observer={idx === data.length - 1}

            />}
            </>
          );
        })}
      </Right>
    );
  }
}

export default RightConatiner;

const Right = styled.div`
  width: 100%;
  position: relative;
`;
const ExtraMeeting = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: #e4e6ed;
  padding: 12px 40px;
  margin-top: 50px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > p {
    :nth-of-type(2) {
      cursor: pointer;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 20px;
    > p {
      :nth-of-type(1) {
        margin-bottom: 10px;
      }
    }
  }
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 80px;
  margin-top: 40px;
  > p {
    text-align: center;
  }
  > div {
    width: 30% !important;
  }
`;
