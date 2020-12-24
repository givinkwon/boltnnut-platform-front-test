import React from 'react'
import styled from 'styled-components'

export const FontSize90 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto': 'Noto Sans KR'}, sans-serif;
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
export const FontSize56 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto': 'Noto Sans KR'}, sans-serif;
  text-shadow: ${props => props.shadow};
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
export const FontSize48 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto': 'NotoSansKR'}, sans-serif;
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
export const FontSize32 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto': 'NotoSansKR'}, sans-serif;
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
export const FontSize24 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto': 'NotoSansKR'}, sans-serif;
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
export const FontSize18 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto': 'NotoSansKR'}, sans-serif;
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
export const FontSize16 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng ? 'Roboto': 'NotoSansKR'}, sans-serif;
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
export const FontSize14 = styled.p`
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
export const FontSize20 = styled.p`
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
    font-size: 20px;
  }
`
