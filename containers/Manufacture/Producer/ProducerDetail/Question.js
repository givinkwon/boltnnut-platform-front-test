import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import WritingContainer from "./Writing";
import Partner from "../../../../stores/Manufacture/Partner";

const rightAngleImg = "/static/images/producer/rightAngle.svg";
@inject("Partner", "Auth")
@observer
class QuestionContainer extends React.Component {
  state = {
    writingModal: false,
    writingModalIdx: "",
    g: 0,
  };
  componentDidMount = () => {
    console.log("Question Container");
  };

  shouldComponentUpdate = (prevProps, nextState) => {
    const { idx, Partner } = this.props;
    console.log(this.state.g);
    console.log(nextState.g);

    console.log(prevProps.Partner.questionList);

    if (Partner.questionSaveSuccess) {
      setTimeout(() => {
        if (Partner.questionSaveSuccess) {
          Partner.questionSaveSuccess = 0;
        }
      }, 1000);
      return true;
    } else {
      return this.state.g !== nextState.g;
    }

    // return true;
  };

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
    } = this.props;
    console.log("renderrender");
    console.log(parentType);
    console.log(data.created_at.slice(0, data.created_at.indexOf("T")));
    // if (parentType === "comment") {
    //   console.log(data);
    // } else {
    //   console.log(subData);
    // }

    return (
      <>
        <Container>
          <Card>
            {!data.client && (
              <Recomment>
                <img src={rightAngleImg} />
              </Recomment>
            )}
            <Category>Q.</Category>
            <Content>
              {data.secret ? (
                <content>비밀 댓글입니다.</content>
              ) : (
                <content>{data.content}</content>
              )}

              {data.client && (
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
              {data.client && <Name>{data.client}</Name>}

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
            <WritingContainer
              type="recomment"
              clientId={clientId}
              partnerId={partnerId}
              data={data}
              setQA={this.props.setQA()}
            />
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
  align-items: center;
  border-bottom: 1px solid #e1e2e4;
  min-height: 134px;
`;
const Category = styled.div`
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.45px;
  color: #282c36;
  margin-right: 12px;
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
  > answer {
    cursor: pointer;
  }
`;
const Info = styled.div``;
const Name = styled.div`
  line-height: 40px;
  font-size: 16px;
  letter-spacing: -0.4px;
  color: #555963;
  font-weight: normal;
`;
const Date = styled.div`
  line-height: 27px;
  font-size: 16px;
  letter-spacing: -0.4px;
  color: #767676;
  font-weight: normal;
`;

const RecommentBox = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e2e4;
  padding-bottom: 30px;
  padding-left: 30px;
  > img {
    margin-right: 20px;
  }
`;

const Recomment = styled.div`
  display: flex;
  > img {
    margin-right: 20px;
  }
`;

// const WritingBox = styled(WritingContainer)`
//   margin-top: 30px;
//   border: 3px solid red;
// `;
