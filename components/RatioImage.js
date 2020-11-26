import React from 'react'
import styled from 'styled-components'

class RatioImage extends React.Component {
  render() {
    const {src, ratio, className, onClick, children} = this.props
    return (
      <Image className={className} src={src} ratio={ratio} onClick={onClick && onClick}>
        <div>{children}</div>
      </Image>
    )
  }
}

export default RatioImage

const Image = styled.div`
  display: inline-block;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  ::before {
    margin-top: ${props => props.ratio ? props.ratio : '100%'};
    content: "";
    display: block;
  }
  > div {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url(${props => props.src});
    background-position: center;
    background-size: cover;
  }
  &:focus {
    outline: none;
  }
`
