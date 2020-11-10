import React from 'react';
import styled from 'styled-components'
import * as Text from './Text'
import { GRAY, DARKGRAY, BLACK, WHITE } from 'static/style'

const check_on = '/static/images/check_on.png'
const check_off = '/static/images/check_off.png'

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";


const WhiteCheckbox = withStyles({
  root: {
    color: "#999999",
    borderRadius: "3px",
    "input:hover ~ &": {
      boederColor: "#0933b3",
    },
    "&$checked": {
      color: "#0933b3",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

class CustomCheckBoxComponent extends React.Component {
  render() {
    const { children, checked, onClick, className, name } = this.props
    return (
      <CheckBox >
        {/* <Icon src={checked ? check_on : check_off}/> */}
        <FormControlLabel
          control={
            <WhiteCheckbox checked={checked} onChange={this.handleChange} />
          }
          label={this.props.children}
          className={className} onClick={onClick}
          />
        {/* <Text.FontSize20 color={checked ? '#404040' : DARKGRAY} fontWeight={checked ? 500 : 300}>{children}</Text.FontSize20> */}
      </CheckBox>
    )
  }
}

export default CustomCheckBoxComponent

// const Icon = styled.img`
//   @media (min-width: 0px) and (max-width: 767.98px) {
//     width: 20px;
//     height: 20px;
//     margin-right: 6px;
//   }
//   @media (min-width: 768px) and (max-width: 991.98px) {
//     width: 22px;
//     height: 22px;
//     margin-right: 8px;
//   }
//   @media (min-width: 992px) and (max-width: 1299.98px) { 
//     width: 24px;
//     height: 24px;
//     margin-right: 9px;
//   }
//   @media (min-width: 1300px) { 
//     width: 26px;
//     height: 26px;
//     margin-right: 10px;
//   }
// `
const CheckBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`