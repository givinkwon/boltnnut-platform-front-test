import React from 'react'
import styled from 'styled-components'

export const Content1 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng && 'Roboto', sans-serif};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
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
export const ContentTitle = style.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  font-family: ${props => props.eng && 'Roboto', sans-serif};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
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
  