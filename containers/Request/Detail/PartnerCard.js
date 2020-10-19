import React from "react";
import styled from "styled-components";

import ProfileInfoContainer from "../../Answer/List/Tab1/ProfileInfo";

import * as Text from 'components/Text';
import RatioImage from "../../../components/RatioImage";
import {inject, observer} from "mobx-react";
import Router from "next/router";
import {PRIMARY} from "../../../static/style";


@inject('Request', 'Answer')
@observer
class PartnerCard extends React.Component {
  pushToDetail = () => {
    const {partner} = this.props
    Router.push(`/partner/${partner.id}`)
  }

  render() {
    const {partner, Answer, Request} = this.props
    const {created_request} = Request

    let mainCategories = []

    return (
      <Card onClick={this.pushToDetail}>
        <CardBody>
          {
            partner ?
              <BorderWrapper>
                <Image src={partner.logo} />
                <ProfileInfoContainer partner={partner} />
              </BorderWrapper>
              :
              <></>
          }

          <ContentWrapper>
            <ContentRight>
              <CategoryBox>
                <Label>
                  <Text.FontSize16 color="#404040" fontWeight={700}>
                    의뢰분야
                  </Text.FontSize16>
                </Label>
                <CategoryList>
                  {
                    partner
                    && partner.category.map((categoryObj, idx) => {
                      return (
                        <Text.FontSize16 key={idx} color="#404040">
                          {categoryObj.category}
                        </Text.FontSize16>
                      );
                    })
                  }
                </CategoryList>
              </CategoryBox>

              <CategoryBox>
                <Label>
                  <Text.FontSize16 color="#404040" fontWeight={700}>
                    만든제품분야
                  </Text.FontSize16>
                </Label>
                <CategoryList>
                  {
                    partner
                    && partner.history_set.map(subclassId => {
                      const subclassObj = Answer.getSubclassById(subclassId);
                      console.log(subclassObj.id)
                      let mainCategory = null
                      let idx = -1;
                      if(subclassObj) {
                        mainCategory = Answer.getMainCategoryById(subclassObj.maincategory)
                      }
                      if(mainCategory) {
                        idx = mainCategories.findIndex(main => main === mainCategory.maincategory)
                        if(idx === -1) {
                          mainCategories.push(mainCategory.maincategory)
                        }
                        else {
                          return null
                        }
                      }

                      return (
                        <Text.FontSize16 key={subclassId} color="#404040">
                          {mainCategory && mainCategory.maincategory}
                        </Text.FontSize16>
                      );
                    })
                  }
                </CategoryList>
              </CategoryBox>
            </ContentRight>

            <ContentLeft>
              <Text.FontSize24 color="#676769">
                {partner && partner.info_company}
              </Text.FontSize24>
            </ContentLeft>
          </ContentWrapper>
        </CardBody>
      </Card>
    );
  }
}

export default PartnerCard;

const Card = styled.div`
  cursor: pointer;
  
  :hover {
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.17);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.17);
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.17);  
  }

  :nth-of-type(1) {
    margin-top: 50px;
  }

  p {
    line-height: 1.3em;
  }
  
  background-color: white;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
  @media (min-width: 0px) and (max-width: 991.98px) {
    :nth-of-type(1) {
      margin-top: 20px;
    }
  }
  @media (min-width: 992px) {
  }
`
const CardBody = styled.div`
  padding: 20px 40px;
  > p {
    :last-of-type {
      line-height: 1.25em;
    }
  }
  
  @media (min-width: 0px) and (max-width: 991.98px) {
    padding: 20px 15px;
  }
`

const Image = styled(RatioImage)`
  display: inline-block;
  width: 66px;
  border: 2px solid ${PRIMARY};
  box-sizing: border-box;
  vertical-align: middle;
  margin-bottom: 10px;
  border-radius: 50%;
  @media (min-width: 0px) and (max-width: 991.98px) {
    width: 50px;
    margin-top: 10px;
    vertical-align: top;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  
  padding-left: 8px;
  
  @media (min-width: 0px) and (max-width: 991.98px) {
    flex-direction: column;
    padding-left: 0;
  }
`;
const ContentLeft = styled.div`
  flex: 7;
  margin-top: 15px;
  margin-right: 30px;
  
  @media (max-width: 767.98px) and (min-width: 0px) {
    > p {
      font-size: 14px !important;
      padding: 0 15px;
      
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 1.3em;
      max-height: 3.9em;
    }
    margin-right: 0;
    margin-top: 5px;
  }
`;
const ContentRight = styled.div`
  flex: 5;
  background-color: #f5f5f5;
  margin-top: 15px;
  padding: 15px 25px;
  
  @media (min-width: 0px) and (max-width: 991.98px) {
    padding: 16px 10px;
    margin-bottom: 10px;
  }
`

const CategoryBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  
  :last-child {
    margin-bottom: 0;
  }
  
  @media (min-width: 0px) and (max-width: 991.98px) {
    flex-direction: column;
  }
`
const Label = styled.div`
  flex-shrink: 0;
  width: 120px;
  margin-right: 10px;
  
  > p {
    background-color: white;
    padding: 3px 5px;
    text-align: center;
  }
  
  @media (min-width: 0px) and (max-width: 991.98px) {
    width: 80px;
    margin-bottom: 10px;
  }
`
const CategoryList = styled.div`
  > p {
    padding: 3px 5px;
    display: inline-block;
  }
`

const BorderWrapper = styled.div`
  @media (min-width: 0px) and (max-width: 991.98px) {
    border-bottom: 1px solid #001a5620;
  }
`
