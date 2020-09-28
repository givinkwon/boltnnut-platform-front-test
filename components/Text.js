import React from 'react'
import styled from 'styled-components'

// Text List
// MainTitle, SectionTitle,
export const FontSize48 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 36px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 40px;
  }
  @media (min-width: 1300px) { 
    font-size: 48px;
  }
`

export const FontSize40 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 24px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 28px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 36px;
  }
  @media (min-width: 1300px) { 
    font-size: 40px;
  }
`


export const FontSize36 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 20px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 24px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 32px;
  }
  @media (min-width: 1300px) { 
    font-size: 36px;
  }
`

export const FontSize32 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 20px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 22px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 28px;
  }
  @media (min-width: 1300px) { 
    font-size: 32px;
  }
`

export const FontSize28 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 18px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 20px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 24px;
  }
  @media (min-width: 1300px) { 
    font-size: 28px;
  }
`

export const FontSize24 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 16px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 18px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 20px;
  }
  @media (min-width: 1300px) { 
    font-size: 24px;
  }
`

export const FontSize20 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 16px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 18px;
  }
  @media (min-width: 1300px) { 
    font-size: 20px;
  }
`


export const FontSize18 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 14px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 16px;
  }
  @media (min-width: 1300px) { 
    font-size: 18px;
  }
`

export const FontSize16 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 12px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 14px;
  }
  @media (min-width: 1300px) { 
    font-size: 16px;
  }
`

export const FontSize14 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 12px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 14px;
  }
  @media (min-width: 1300px) { 
    font-size: 14px;
  }
`

export const FontSize12 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 11px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 11px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 12px;
  }
  @media (min-width: 1300px) { 
    font-size: 12px;
  }
`

export const FontSize11 = styled.p`
  font-weight: ${props => props.fontWeight ? props.fontWeight : 300};
  color: ${props => props.color ? props.color : '#000000'};
  text-align: ${props => props.center ? 'center' : 'left'};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 11px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 11px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 11px;
  }
  @media (min-width: 1300px) { 
    font-size: 11px;
  }
`