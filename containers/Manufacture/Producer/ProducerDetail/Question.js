import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import WritingContainer from "./Writing";
import { toJS } from "mobx";
import NoticeCard from "./Notice";
import Partner from "stores/Manufacture/Partner";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

const rightAngleImg = "/static/images/producer/rightAngle.svg";
@inject("Partner", "Auth")
@observer
class QuestionContainer extends React.Component {
  state = {
    writingModal: false,
    writingModalIdx: "",
    g: 0,
  };
  componentDidMount = async () => {
    const { idx, Partner, data } = this.props;
    console.log("Question Container");

    // await Partner.getClientNameById(data.client, idx, "question");
    console.log(toJS(Partner.questionClientInfo));
  };

  // shouldComponentUpdate = (prevProps, nextState) => {
  //   const { idx, Partner } = this.props;
  //   console.log(this.state.g);
  //   console.log(nextState.g);

  //   console.log(prevProps.Partner.questionList);

  //   // if (Partner.questionSaveSuccess) {
  //   //   setTimeout(() => {
  //   //     if (Partner.questionSaveSuccess) {
  //   //       Partner.questionSaveSuccess = 0;
  //   //     }
  //   //   }, 1000);
  //   //   return true;
  //   // } else {
  //   //   return this.state.g !== nextState.g;
  //   // }

  //   // return true;
  // };

  componentWillUnmount = () => {
    const { idx, Partner } = this.props;
    Partner.writingModalIdx = 0;
  };

  setQA2 = () => {
    this.setState((state) => {
      this.setState({ g: state.g + 1 });
    });
  };
  render() {
    const {
      data,
      subData,
      width,
      idx,
      Partner,
      clientId,
      partnerId,
      parentType,
      mergeData,
      Auth,
    } = this.props;
    console.log("renderrender");
    console.log(parentType);
    console.log(data);
    let name = data && data.name;
    console.log(name);
    console.log(toJS(mergeData));
    // console.log(data.created_at.slice(0, data.created_at.indexOf("T")));
    console.log(idx);
    const loggedInPartnerId =
      Auth.logged_in_partner && Auth.logged_in_partner.id;

    console.log(loggedInPartnerId);
    console.log(partnerId);
    console.log(clientId);
    console.log(data.client);
    // if (parentType === "comment") {
    //   console.log(data);
    // } else {
    //   console.log(subData);
    // }

    return (
      <>
        <Container>
          <Card>
            {data.recomment && (
              <Recomment>
                <img src={rightAngleImg} />
              </Recomment>
            )}
            {data.recomment && data.state ? (
              <Category>A.</Category>
            ) : (
              <Category>Q.</Category>
            )}

            <Content>
              {!data.secret ||
              clientId === data.client ||
              loggedInPartnerId === partnerId ? (
                <content>{data.content}</content>
              ) : (
                <content>비밀 댓글입니다.</content>
              )}

              {!data.recomment &&
                (clientId === data.client ||
                  loggedInPartnerId === partnerId) && (
                  <answer
                    onClick={() => {
                      console.log(Partner.writingModalIdx);
                      console.log(idx + 1);
                      if (Partner.writingModalIdx === idx + 1) {
                        Partner.writingModalIdx = 0;
                      } else {
                        Partner.writingModalIdx = idx + 1;
                      }
                      // this.setState({ h: 3 });
                      // this.setState((state) => {
                      //   return {
                      //     g: state.g + 1,
                      //   };
                      // });
                      console.log(this.state.writingModal);
                    }}
                  >
                    답글달기
                  </answer>
                )}
            </Content>
            <Info>
              {console.log(toJS(data))}
              {console.log(name)}
              {data.client && !data.state ? (
                <Name>{Partner.questionClientInfo[idx]}</Name>
              ) : (
                <Name style={{ color: "#0933b3" }}>제조업체</Name>
              )}
              {/* <hr /> */}
              {/* {!data.state && (
                <Name>{Partner.questionClientInfo[idx]}</Name>
                // <Name>{data.name}</Name>
              )} */}

              {/* {data.state && <Name>제조업체</Name>} */}

              <Date>
                {data.created_at.slice(0, data.created_at.indexOf("T"))}
              </Date>
            </Info>
          </Card>
        </Container>
        {console.log(Partner.writingModalIdx)}
        {console.log(idx + 1)}
        {Partner.writingModalIdx === idx + 1 && (
          <RecommentBox>
            <img src={rightAngleImg} />
            <div style={{ width: "100%" }}>
              <NoticeCard />
              <WritingContainer
                type="recomment"
                clientId={clientId}
                partnerId={partnerId}
                data={data}
                setQA={this.props.setQA}
              />
            </div>
          </RecommentBox>
        )}
      </>
    );
  }
}

export default QuestionContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  display: flex;
  // align-items: center;
  border-bottom: 1px solid #e1e2e4;
  min-height: 134px;
  padding-top: 20px;
  box-sizing: border-box;
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding-top: 12px;
  }
`;
const Category = styled.div`
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.45px;
  color: #282c36;
  margin-right: 12px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
    margin-right: 9px;
    line-height: 18px;
  }
`;
const Content = styled.div`
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.45px;
  color: #282c36;
  padding-right: 34px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  white-space: break-spaces;
  justify-content: space-between;
  padding-bottom: 10px;
  > answer {
    cursor: pointer;
    font-size: 16px;
    line-height: 40px;
    letter-spacing: -0.4px;
    color: #86888c;
    font-weight: normal;
    text-decoration-line: underline;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
    line-height: 18px;

    > answer {
      font-size: 13px;
      line-height: 18px;
    }
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const Name = styled.div`
  line-height: 40px;
  font-size: 16px;
  letter-spacing: -0.4px;
  color: #555963;
  font-weight: normal;

  @media (min-width: 0px) and (max-width: 767.98px) {
    line-height: 18px;
    font-size: 13px;
  }
`;
const Date = styled.div`
  line-height: 27px;
  font-size: 16px;
  letter-spacing: -0.4px;
  color: #767676;
  font-weight: normal;
  @media (min-width: 0px) and (max-width: 767.98px) {
    line-height: 18px;
    font-size: 13px;
  }
`;

const RecommentBox = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e2e4;
  padding-bottom: 30px;
  padding-left: 30px;
  margin-top: 30px;
  > img {
    margin-right: 20px;
  }
`;

const Recomment = styled.div`
  display: flex;
  align-self: baseline;
  > img {
    margin-right: 20px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > img {
      width: 11px;
      margin-right: 8px;
    }
  }
`;

// const WritingBox = styled(WritingContainer)`
//   margin-top: 30px;
//   border: 3px solid red;
// `;
