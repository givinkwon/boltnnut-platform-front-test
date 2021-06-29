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
        <FormControlLabel
          control={
            <WhiteCheckbox checked={checked} onChange={this.handleChange} />
          }
          label={this.props.children}
          className={className} onClick={onClick}
          />
      </CheckBox>
    )
  }
}

export default CustomCheckBoxComponent

const CheckBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`