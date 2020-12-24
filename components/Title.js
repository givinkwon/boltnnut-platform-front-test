import React from 'react'
import styled from 'styled-components'

export const Title1 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto' : 'NotoSansKR'},sans-serif;
  text-shadow: ${props => props.shadow};
  letter-spacing: -1.5px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 48px;
  }
  @media (min-width: 1280px) {
    font-size: 90px;
  }
`
export const Title2 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto': 'NotoSansKR'}, sans-serif;
  letter-spacing: -0.5px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 48px;
  }
  @media (min-width: 1280px) {
    font-size: 56px;
  }
`
export const Title3 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng && 'Roboto', "sans-serif"};
  letter-spacing: 0px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 48px;
  }
  @media (min-width: 1280px) {
    font-size: 48px;
  }
`
export const Title4 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng && 'Roboto', "sans-serif"};
  letter-spacing: 0.25px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 48px;
  }
  @media (min-width: 1280px) {
    font-size: 32px;
  }
`
export const Title5 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng && 'Roboto', "sans-serif"};
  letter-spacing: 0px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 48px;
  }
  @media (min-width: 1280px) {
    font-size: 24px;
  }
`
export const Title6 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng && 'Roboto', "sans-serif"};
  letter-spacing: 0.15px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 48px;
  }
  @media (min-width: 1280px) {
    font-size: 18px;
  }
`
export const SubTitle1 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng && 'Roboto', "sans-serif"};
  letter-spacing: 0.15px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 48px;
  }
  @media (min-width: 1280px) {
    font-size: 16px;
  }
`
export const SubTitle2 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng && 'Roboto', "sans-serif"};
  letter-spacing: 0.1px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 48px;
  }
  @media (min-width: 1280px) {
    font-size: 14px;
  }
`
