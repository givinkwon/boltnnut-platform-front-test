import React from 'react'
import Lottie from 'react-lottie'
import spinnerData from 'static/spinner.json'
import styled from 'styled-components'

export default class Spinner extends React.Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: spinnerData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
 
    return (
      <Wrap>
        <Lottie options={defaultOptions} height={280}width={280}/>
      </Wrap>
    )
  }
}

const Wrap = styled.div`
  z-index: 1000;
  position: fixed;
  background-color: rgba(0,0,0,0.5);
  filter: brightness(0.8);
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`