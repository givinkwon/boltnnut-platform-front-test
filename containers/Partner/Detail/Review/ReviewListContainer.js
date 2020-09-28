import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import * as Text from 'components/Text'
import Rating from "components/Rating";

import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'



@inject('Partner', 'Answer')
@observer
class ReviewListConatiner extends React.Component {
  render(){
    const { Partner, Answer } = this.props;
    const { requests, clients } = Partner;

    return (
      <div style={{marginTop: 10}}>
        <Header>
          <Text.FontSize20 color={WHITE} fontWeight={700}>평점과 후기</Text.FontSize20>
        </Header>
        <Content>
          {
            Partner.detail.review_set.map((review, idx) => {
              const request = Partner.getRequestByProjectId(review.project);
              const client = Partner.getClientById(review.client);
              let clientName = client && client.user.username.split('@')[0];

              const subclassObj = request && Answer.getSubclassById(request.product);
              let mainCategoryObj = '';
              let categoryObj = '';

              if(subclassObj) {
                mainCategoryObj = Answer.getMainCategoryById(subclassObj.maincategory);
                categoryObj = Answer.getCategoryById(subclassObj.category);
              }

              return (
                <Card key={idx}>
                  <Label>
                    <Text.FontSize16 color="#fff" fontWeight={700}>
                      완료
                    </Text.FontSize16>
                  </Label>
                  <CardTitle>
                    <Text.FontSize32 color={PRIMARY} fontWeight={700}>
                      {request && request.name}
                    </Text.FontSize32>

                    <div>
                      <Rating rating={review.avg_score} />
                      <Text.FontSize32 color="#404040" fontWeight={500} style={{fontFamily: 'Montserrat, sans-serif'}}>
                        {Number(review.avg_score).toFixed(1)}
                      </Text.FontSize32>
                    </div>
                  </CardTitle>

                  <CardBody>
                    <CategoryBox>
                      <div>
                        <Text.FontSize20 color="#404040" fontWeight={700}>
                          의뢰분야
                        </Text.FontSize20>

                        <div>
                          {request && request.category.map(categoryId => {
                            const categoryObj = Answer.getDevelopCategoryById(categoryId);
                            return (
                              <Text.FontSize20 color="#404040" fontWeight={300}>
                                { categoryObj && categoryObj.category }
                              </Text.FontSize20>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <Text.FontSize20 color="#404040" fontWeight={700}>
                          제품분야
                        </Text.FontSize20>

                        <div>
                          <Text.FontSize20 color="#404040" fontWeight={300}>
                            {mainCategoryObj && mainCategoryObj.maincategory}
                          </Text.FontSize20>
                          <Text.FontSize20 color="#404040" fontWeight={300}>
                            {categoryObj && categoryObj.category}
                          </Text.FontSize20>
                          <Text.FontSize20 color="#404040" fontWeight={300}>
                            {subclassObj && subclassObj.subclass}
                          </Text.FontSize20>
                        </div>
                      </div>
                    </CategoryBox>

                    <div>
                      <div>
                        <ClientBox>
                          <Text.FontSize28 color="#4b4b4b" fontWeight={500}>
                            {clientName && clientName.substring(0, clientName.length-3)}***
                          </Text.FontSize28>
                          <Text.FontSize28 color="#898989" fontWeight={500}>
                            클라이언트
                          </Text.FontSize28>
                        </ClientBox>

                        <LabelWrapper>
                          <Text.FontSize20 color="#404040" fontWeight={500}>
                            미팅 후기
                          </Text.FontSize20>
                        </LabelWrapper>
                        <ReviewContent>
                          <Text.FontSize20 color="#404040">
                            {review.content_good ? review.content_good : '비어있음'}
                          </Text.FontSize20>
                        </ReviewContent>

                        <LabelWrapper>
                          <Text.FontSize20 color="#404040" fontWeight={500}>
                            계약 후기
                          </Text.FontSize20>
                        </LabelWrapper>

                        <ReviewContent>
                          <Text.FontSize20 color="#404040">
                            {review.content_bad ? review.content_bad : '비어있음'}
                          </Text.FontSize20>
                        </ReviewContent>
                      </div>
                      <RatingList>
                        <RatingBox>
                          <Text.FontSize16 color="#404040" fontWeight={500}>
                            의사소통
                          </Text.FontSize16>
                          <div>
                            <Rating rating={review.talk_score} />
                            <Text.FontSize16 color="#4d4f5c" fontWeight={500}  style={{fontFamily: 'Montserrat, sans-serif'}}>
                              {Number(review.talk_score).toFixed(1)}
                            </Text.FontSize16>
                          </div>
                        </RatingBox>

                        <RatingBox>
                          <Text.FontSize16 color="#404040" fontWeight={500}>
                            전문성
                          </Text.FontSize16>
                          <div>
                            <Rating rating={review.expert_score} />
                            <Text.FontSize16 color="#4d4f5c" fontWeight={500} style={{fontFamily: 'Montserrat, sans-serif'}}>
                              {Number(review.expert_score).toFixed(1)}
                            </Text.FontSize16>
                          </div>
                        </RatingBox>

                        <RatingBox>
                          <Text.FontSize16 color="#404040" fontWeight={500}>
                            일정 만족도
                          </Text.FontSize16>
                          <div>
                            <Rating rating={review.time_score} />
                            <Text.FontSize16 color="#4d4f5c" fontWeight={500} style={{fontFamily: 'Montserrat, sans-serif'}}>
                              {Number(review.time_score).toFixed(1)}
                            </Text.FontSize16>
                          </div>
                        </RatingBox>

                        <RatingBox>
                          <Text.FontSize16 color="#404040" fontWeight={500}>
                            가격 만족도
                          </Text.FontSize16>
                          <div>
                            <Rating rating={review.price_score} />
                            <Text.FontSize16 color="#4d4f5c" fontWeight={500} style={{fontFamily: 'Montserrat, sans-serif'}}>
                              {Number(review.price_score).toFixed(1)}
                            </Text.FontSize16>
                          </div>
                        </RatingBox>

                        <RatingBox>
                          <Text.FontSize16 color="#404040" fontWeight={500}>
                            신뢰성
                          </Text.FontSize16>
                          <div>
                            <Rating rating={review.result_score} />
                            <Text.FontSize16 color="#4d4f5c" fontWeight={500} style={{fontFamily: 'Montserrat, sans-serif'}}>
                              {Number(review.result_score).toFixed(1)}
                            </Text.FontSize16>
                          </div>
                        </RatingBox>
                      </RatingList>
                    </div>
                  </CardBody>
                </Card>
              );
            })
          }
        </Content>
      </div>
    )
  }
}

export default ReviewListConatiner

const Header = styled.div`
  height: 55px;
  background-color: ${PRIMARY};

  display: flex;
  align-items: center;

  padding: 0 15px;
`
const Content = styled.div`
  background-color: #f2f2f2;
  padding: 20px;

  display: flex;
  flex-wrap: wrap;
  > p {
    line-height: 1.3;
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 10px;
  }
`

const Card = styled.div`
  width: 100%;
  padding: 40px;
  background-color: white;
  margin-bottom: 50px;

  position: relative;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.09);
  
  :last-of-type {
    margin-bottom: 0;
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 40px 10px 20px; 
  }
`;
const Label = styled.div`
  background-color: ${PRIMARY};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  
  position: absolute;
  top: -5px;
  left: -3px;
  
  padding: 7px 20px;
`;
const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  
  padding-bottom: 10px;
  border-bottom: 1px solid #f5f5f5;
  
  > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    
    > button {
      margin-top: 4px;
      :last-of-type {
        margin-right: 10px;
      }
    }
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
    > p {
      margin-bottom: 10px;
    }
    > div {
      margin-left: auto;
    }
  }
`;
const CardBody = styled.div`
  > div:nth-of-type(2) {
    margin-top: 20px;
    
    display: flex;
    
    > div:nth-of-type(1) {
      line-height: 1.3em;
      flex: 1;
    }
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    > div:nth-of-type(2) {
      flex-direction: column;
      
      > div:nth-of-type(1) {
        margin-bottom: 20px;
      }
    }
  }
`;
const CategoryBox = styled.div`
  background-color: #f2f2f2;;
  padding: 10px 20px;
  margin-top: 10px;

  > div:last-of-type {
    margin-bottom: 0;
  }
  > div {
    display: flex;
    margin-bottom: 10px;
    
    /* 의뢰분야, 제품분야 */
    > p:nth-of-type(1) {
      flex-grow: 0;
      flex-shrink: 0;
      height: fit-content;
      background-color: white;
      padding: 5px 15px;
      border-radius: 2px;
    }
    :last-of-type > p:nth-of-type(1) {
      margin-bottom: 0;
    }
    
    > div > p {
      display: inline-block;
      padding: 0 15px;
      margin: 5px 0;
    }
    
    /* 제품분야 */
    :nth-of-type(2) > div > p {
      border-right: 1px solid #404040;
    }
    :nth-of-type(2) > div > p:last-of-type {
      border-right: none;
    }
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 10px 10px;
    
    > div {
      flex-direction: column;
      > p:nth-of-type(1) {
        width: fit-content;
        margin-bottom: 10px !important;
      }
    }
    
    > div > div > p {
      padding: 0 8px;
    }
  
    > div:nth-of-type(2) > div > p {
      border-right: none;
    }
  }
`;

const ClientBox = styled.div`
  padding: 15px 0;
  border-bottom: 2px solid #f5f5f5;
  margin-bottom: 20px;
  
  display: flex;
  > p:nth-of-type(1) {
    margin-right: 8px;
  }
`;
const RatingList = styled.div`
  background-color: #f2f2f2;
  padding: 10px 24px;
  margin-left: 20px;
  
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-left: 0;
    padding: 10px 12px;
  }
`;
const RatingBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  border-bottom: 1px solid #e6e6e6;
  
  :last-of-type {
    border-bottom: none;
  }
  
  > p {
    margin-bottom: 4px;
  }
  
  > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    
    margin-left: 10px;
    padding: 8px 0;
    
    > p {
      margin-left: 5px;
      padding-bottom: 3px;
    }
    
    > button > div {
      width: 16px;
      height: 16px;
    }
  }
`;

const LabelWrapper = styled.div`
  margin-bottom: 10px;
`;
const ReviewContent = styled.div`
  margin-bottom: 25px;
  
  border: 1px solid #f5f5f5;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  max-height: 300px;
  overflow-y: scroll;
  
  :last-of-type {
    margin-bottom: 0;
  }
`;
