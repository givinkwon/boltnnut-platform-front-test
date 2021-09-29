import React from "react";
import styled from "styled-components";

export const FontSize90 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
  text-shadow: ${(props) => props.shadow};
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
`;
export const FontSize56 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
  text-shadow: ${(props) => props.shadow};
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
`;
export const FontSize48 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
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
`;

export const FontSize40 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
  letter-spacing: 0.25px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 40px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 40px;
  }
  @media (min-width: 1280px) {
    font-size: 40px;
  }
`;

export const FontSize32 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
  letter-spacing: 0.25px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 32px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 32px;
  }
  @media (min-width: 1280px) {
    font-size: 32px;
  }
`;
export const FontSize26 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
  letter-spacing: 0px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 26px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 26px;
  }
  @media (min-width: 1280px) {
    font-size: 26px;
  }
`;
export const FontSize24 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
  letter-spacing: 0px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 24px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 24px;
  }
  @media (min-width: 1280px) {
    font-size: 24px;
  }
`;
export const FontSize23 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 23px;
    line-height: 1.57;
    letter-spacing: -1.15px;
    object-fit: contain;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    text-align: center;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
  }
  @media (min-width: 1280px) {
    font-size: 23px;
    letter-spacing: 0px;
  }
`;
export const FontSize22 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 22px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 22px;
  }

  @media (min-width: 1280px) {
    font-size: 22px;
  }
`;
export const FontSize18 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 18px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
  }
  @media (min-width: 1280px) {
    font-size: 18px;
  }
`;

export const FontSize17 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
  letter-spacing: 0.15px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 17px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 17px;
  }
  @media (min-width: 1280px) {
    font-size: 17px;
  }
`;

export const FontSize16 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
  letter-spacing: 0.15px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 16px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 16px;
  }
  @media (min-width: 1280px) {
    font-size: 16px;
  }
`;

export const FontSize15 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 15px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 15px;
  }
  @media (min-width: 1280px) {
    font-size: 15px;
  }
`;

export const FontSize14 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
  letter-spacing: ${(props) => (props.letterSpacing ? props.letterSpacing : -0.35)};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
  }
  @media (min-width: 1280px) {
    font-size: 14px;
  }
`;
export const FontSize13 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
  letter-spacing: ${(props) => (props.letterSpacing ? props.letterSpacing : -0.35)};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 13px;
    line-height: 1.46;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
  }
  @media (min-width: 1280px) {
    font-size: 13px;
  }
`;

export const FontSize12 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
  letter-spacing: ${(props) => (props.letterSpacing ? props.letterSpacing : -0.35)};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
    line-height: 1.46;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
  }
  @media (min-width: 1280px) {
    font-size: 12px;
  }
`;

export const FontSize20 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
  letter-spacing: 0.1px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 20px;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    font-size: 20px;
  }
  @media (min-width: 1280px) {
    font-size: 20px;
  }
`;

export const FontSize9 = styled.p`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  color: ${(props) => (props.color ? props.color : "#000000")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-family: ${(props) => (props.eng ? "Roboto" : "Noto Sans KR")}, sans-serif;
  letter-spacing: ${(props) => (props.letterSpacing ? props.letterSpacing : -0.35)};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 9px;
    line-height: 1.46;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
  }
  @media (min-width: 1280px) {
    font-size: 9px;
  }
`;
