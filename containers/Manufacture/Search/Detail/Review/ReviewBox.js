import React from "react";
import Select from "react-select";
import styled, { keyframes } from "styled-components";
import ReviewStarRating from "./Review/ReviewStarRating";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "react-slick";

const star = "/static/icon/star_blue3.svg";

@inject("Partner", "Auth")
@observer
class ReviewBox extends React.Component {
  state = {
    avg_consult_score: 0,
    avg_kindness_score: 0,
    avg_communication_score: 0,
    avg_profession_score: 0,
  };
  componentdidmount = () => {
    console.log("review componentdidmount");

    /* 리뷰를 위한 변수 및 연산 */
    let total_consult_score = 0;
    let total_kindness_score = 0;
    let total_communication_score = 0;
    let total_profession_score = 0;
    console.log(Partner.partnerReviewList);
    console.log(Partner.partnerAllReviewList);

    // (await Partner.partnerAllReviewList[0]) &&
    //   Partner.partnerAllReviewList[0].data.map((item, idx) => {
    //     total_consult_score += item.consult_score;
    //     total_kindness_score += item.kindness_score;
    //     total_communication_score += item.communication_score;
    //     total_profession_score += item.profession_score;
    //   });
    // Partner.partnerAllReviewList[0] &&
    //   this.setState({
    //     avg_consult_score:
    //       total_consult_score / Partner.partnerAllReviewList[0].data.length,
    //     avg_kindness_score:
    //       total_kindness_score / Partner.partnerAllReviewList[0].data.length,
    //     avg_communication_score:
    //       total_communication_score /
    //       Partner.partnerAllReviewList[0].data.length,
    //     avg_profession_score:
    //       total_profession_score / Partner.partnerAllReviewList[0].data.length,
    //   });
  };
  render() {
    const { Auth, Partner, width } = this.props;
    console.log("RENDER");
    return (
      <SummaryBox>
        <label>클라이언트 평균 만족도</label>
        <header>
          <mainscore>
            <div>
              <TotalRating>
                <div>
                  <ReviewStarRating
                    width={width > 1300 ? "31" : width > 992 ? "26" : "22"}
                    margin={4}
                    score={Math.floor(this.state.avg_consult_score)}
                  />
                </div>
                <img src={star}></img>
              </TotalRating>
            </div>
            <div>
              <span>{this.state.avg_consult_score.toFixed(2)}</span>
              <span>전체 누적 평점</span>
            </div>
          </mainscore>

          <subscore>
            <div>
              <span
                style={{
                  color: "#999999",
                }}
              >
                친절도
              </span>
              {width > 768 ? (
                <div>
                  <ReviewStarRating
                    width={width > 1300 ? "15" : width > 992 ? "13" : "11"}
                    margin={1}
                    score={this.state.avg_kindness_score}
                  />
                </div>
              ) : (
                <>
                  <CustomSlider value={this.state.avg_kindness_score * 20} />
                  <div>{this.state.avg_kindness_score.toFixed(1)}</div>
                </>
              )}
            </div>

            <div>
              <span
                style={{
                  color: "#999999",
                }}
              >
                연락 빈도
              </span>
              {width > 768 ? (
                <div>
                  <ReviewStarRating
                    width={width > 1300 ? "15" : width > 992 ? "13" : "11"}
                    margin={1}
                    score={this.state.avg_communication_score}
                  />
                </div>
              ) : (
                <>
                  <CustomSlider
                    value={this.state.avg_communication_score * 20}
                  />
                  <div>{this.state.avg_communication_score.toFixed(1)}</div>
                </>
              )}
            </div>

            <div>
              <span
                style={{
                  color: "#999999",
                }}
              >
                전문성
              </span>
              {width > 768 ? (
                <div>
                  <ReviewStarRating
                    width={width > 1300 ? "15" : width > 992 ? "13" : "11"}
                    margin={1}
                    score={this.state.avg_profession_score}
                  />
                </div>
              ) : (
                <>
                  <CustomSlider value={this.state.avg_profession_score * 20} />
                  <div>{this.state.avg_profession_score.toFixed(1)}</div>
                </>
              )}
            </div>
          </subscore>
        </header>
      </SummaryBox>
    );
  }
}

export default ReviewBox;

const CustomSlider = withStyles({
  root: {
    color: "#0933b3",
    height: "7px !important",
    width: "60%",
    // cursor: "default",
    // background: "red",
    padding: 0,
    display: "none",
    marginRight: "10px",
  },
  thumb: {
    // top: -10,
    // paddingRight: 20,
    // content: "apapap"
    display: "none",
  },
  track: {
    height: 6,
    borderRadius: 10,
  },
  rail: {
    color: "#e6e6e6",
    opacity: 1,
    height: 6,
    borderRadius: 10,
  },
  "@media (min-width: 0px) and (max-width: 767.98px)": {
    root: {
      display: "block",
    },
  },
})(Slider);

const SummaryBox = styled.div`
  margin-top: 50px;
  margin-bottom: 34px;
  > label {
    font-size: 24px;
    line-height: 40px;
    letter-spacing: -0.6px;
    color: #282c36;
    font-weight: 500;
    margin-bottom: 24px;
    display: block;
  }
  > header {
    display: flex;
    justify-content: space-between;
    > mainscore {
      display: flex;
      > div:nth-of-type(1) {
        padding-top: 9px;
        box-sizing: border-box;
      }
      > div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        > span:nth-of-type(1) {
          align-self: center;
          font-size: 48px;
          line-height: 40px;
          letter-spacing: -1.2px;
          color: #282c36;
          font-weight: bold;
          margin-bottom: 12px;
        }
        > span:nth-of-type(2) {
          font-size: 16px;
          line-height: 24px;
          letter-spacing: -0.4px;
          color: #191919;
          font-weight: normal;
        }
      }
    }
    > subscore {
      display: flex;
      flex-direction: column;
      width: 165px;
     
      > div {
        margin-bottom: 9px;
        display: flex;
        justify-content: space-between;

        // 4. (1)        
        >div{
          display: flex;
          align-items: center;
        }
      }
    }
  }  

  @media (min-width: 768px) and (max-width: 991.98px) {
    >label{
      font-size: 20px;
    }
    > header {    
      > mainscore {      
        > div:nth-of-type(1) {
          padding-top: 6px;        
        }
        > div:nth-of-type(2) {        
          > span:nth-of-type(1) {
            font-size: 32px;
            line-height: 24px;
            
            margin-bottom: 6px;
          }
          > span:nth-of-type(2) {
            font-size: 12px;
            line-height: 18px;        
          }
        }
      }
      > subscore {      
        width: 165px;
        > div {
          margin-bottom: 7px;
          >span{
            font-size:12px;
          }
        }
      }
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    >header{
      > subscore {          
        > div {      
        
          align-items: center;
          >span{              
            padding: 2px;
            width: 180px;
            // margin-bottom: 7px;
          }
          > span:nth-of-type(1) {
              
              margin-right: 10px;
              font-size: 12px;
              // width: 55px;
              text-align: right;
          
            }
            > div:nth-of-type(1) {
              
              // display: none;
              font-size: 12px;
            }
            > div:nth-of-type(2) {
              // display: none;
              
        
              display: block;
              font-size: 12px;
                 
            }
          
        }
      }
    }
  }


  @media (min-width: 992px) and (max-width: 1299.98px) {
    >label{
      font-size: 22px;
    }
      > header {    
    > mainscore {      
      > div:nth-of-type(1) {
        padding-top: 8px;        
      }
      > div:nth-of-type(2) {        
        > span:nth-of-type(1) {
          font-size: 40px;
          line-height: 32px;
          
          margin-bottom: 8px;
        }
        > span:nth-of-type(2) {
          font-size: 14px;
          line-height: 24px;        
        }
      }
    }
   > subscore {      
      width: 165px;
      > div {
        margin-bottom: 7px;
        >span{
          font-size:12px;

          // 4. (2)
        align-items: center;
        @media (min-width: 0px) and (max-width: 767.98px) {
          padding: 2px;
          width: 180px;
          margin-bottom: 7px;
        }
        > span:nth-of-type(1) {
          @media (min-width: 0px) and (max-width: 767.98px) {
            margin-right: 10px;
            font-size: 12px;
            width: 55px;
            text-align: right;
          }
        }
        > div:nth-of-type(1) {
          @media (min-width: 0px) and (max-width: 767.98px) {
            display: none;
          }
        }
        > div:nth-of-type(2) {
          display: none;
          @media (min-width: 0px) and (max-width: 767.98px) {
            display: block;
            font-size: 12px;
          }
// 4. (2)        
}
      }
    }
  }
`;

const TotalRating = styled.div`
  > div {
    @media (min-width: 0px) and (max-width: 767.98px) {
      display: none;
    }
  }
  > img {
    display: none;
    @media (min-width: 0px) and (max-width: 767.98px) {
      width: 21.7px;
      height: 21px;
      display: block;
    }
  }
`;
