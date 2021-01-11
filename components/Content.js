import React from 'react'
import styled from 'styled-components'

export const FontSize48 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto' : 'Noto Sans KR'}, sans-serif;
  font-style: ${props => props.fontStyle ? props.fontStyle : 'normal'};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 14px;
    letter-spacing: 0.25px;
  }
  @media (min-width: 1280px) {
    font-size: 48px;
    letter-spacing: 0.6px;
    line-height: 1.67;
  }
`

export const FontSize32 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto' : 'Noto Sans KR'}, sans-serif;
  font-style: ${props => props.fontStyle ? props.fontStyle : 'normal'};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 14px;
    letter-spacing: 0.25px;
  }
  @media (min-width: 1280px) {
    font-size: 32px;
    letter-spacing: 0.6px;
    line-height: 1.67;
  }
`

export const FontSize24 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto' : 'Noto Sans KR'}, sans-serif;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 14px;
    letter-spacing: 0.25px;
  }
  @media (min-width: 1280px) {
    font-size: 24px;
    letter-spacing: 0.6px;
    line-height: 1.67;
  }
`

export const FontSize22 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto' : 'Noto Sans KR'}, sans-serif;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 22px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
  }
  @media (min-width: 1280px) {
    font-size: 22px;
  }
`

export const FontSize18 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto' : 'Noto Sans KR'}, sans-serif;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 14px;
    letter-spacing: 0.25px;
  }
  @media (min-width: 1280px) {
    font-size: 18px;
    letter-spacing: 0.5px;
  }
`
export const FontSize17 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto' : 'Noto Sans KR'}, sans-serif;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: center;
    font-size: 17px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 14px;
    letter-spacing: 0.25px;
  }
  @media (min-width: 1280px) {
    font-size: 17px;
  }
`
export const FontSize16 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto' : 'Noto Sans KR'}, sans-serif;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 16px;
    line-height: 0.94;
    letter-spacing: -0.4px;

  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 14px;
    letter-spacing: 0.25px;
  }
  @media (min-width: 1280px) {
    font-size: 16px;
    letter-spacing: 0.5px;
  }
`
export const FontSize15 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto' : 'Noto Sans KR'}, sans-serif;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 15px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 14px;
    letter-spacing: 0.25px;
  }
  @media (min-width: 1280px) {
    font-size: 15px;
    letter-spacing: 0.5px;
  }
`
export const FontSize14 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto' : 'Noto Sans KR'}, sans-serif;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 14px;
    letter-spacing: 0.25px;
  }
  @media (min-width: 1280px) {
    font-size: 14px;
    letter-spacing: 0.25px;
  }
` 
  