import React, { Component } from 'react';
import styled from 'styled-components';
import RatioImage from './RatioImage';

class CloseModalButton extends Component {
  render() {
    const { handleClose } = this.props;
    return (
      <Button onClick={handleClose}>
        <CloseModalIcon src="/static/icon/close_modal.svg" />
      </Button>
    );
  }
}

CloseModalButton.defaultProps = {
  handleClose: () => {
    console.log('pass handleClose() to props');
  },
};

export default CloseModalButton;

const Button = styled.button`
  padding: 0;
  border: none;
  background-color: inherit;
  position: absolute;
  top: 15px;
  right: 15px;
  :focus {
    outline: 0;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
  top: 10px;
  right: 10px;
}
`;
const CloseModalIcon = styled(RatioImage)`
  cursor: pointer;
  width: 36px;
  height: 36px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 24px;
    height: 24px;
  }
`;
