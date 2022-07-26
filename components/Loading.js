import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

function Loader({ type, color, message }) {
    return (
        <ContentWrap>
            <BOX>
                <H1>
                    <span>견적산출 중입니다</span>
                    <br />
                    정확한 계산을 위해
                    <br />
                    조금 더 기다려주세요!
                </H1>
                <br />
                <ReactLoading type={type} color={color} height={'214px'} width={'214px'} />
            </BOX>
        </ContentWrap>
    );
}

export default Loader;

const ContentWrap = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.7);
`;

const BOX = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 460px;
    height: 600px;
    border-radius: 20px;
    background-color: white;
`;

const H1 = styled.div`
    font-family: NotoSansCJKkr;
    color: #414550;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    line-height: 1.4;
    margin-bottom: 80px;
    span {
        font-weight: 600;
        color: #0933b3;
    }
`;
