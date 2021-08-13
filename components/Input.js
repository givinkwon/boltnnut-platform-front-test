import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";

const CustomInput = withStyles({
  root: {
    marginTop: "35px",
    border: "1px",
    borderRadius: "3px",
    "& label": {
      color: "#c7c7c7",
    },
    "& placeholder": {
      fontSize: "20",
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.7",
      letterSpacing: "-0.5px",
      color: "#505050",
    },
    "& label.Mui-focused": {
      color: "#c7c7c7",
    },
    "& .MuiInput-underline:after": {
      borderColor: "#0933b3",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#c7c7c7",
      },
      "&:hover fieldset": {
        borderColor: "#0933b3",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0933b3",
      },
    },
  },
})(TextField);

class Input extends React.Component {
  state = {
    text: "",
    focused: false,
  };
  onFocus = () => {
    this.setState({ focused: true });
  };
  onBlur = () => {
    if (!this.state.text) {
      this.setState({ focused: false });
    }
  };
  onChange = (e) => {
    if (this.props.type === "file") {
      this.props.onChange(e.target.files[0]);
    } else {
      this.setState({ text: e.target.value });
      this.props.onChange(e.target.value);
    }
  };
  render() {
    const { focused } = this.state;
    const { placeholder, label, outlined, variant, multiline, rows, ...props } =
      this.props;
    return (
      <CustomInput
        {...props}
        id={this.id}
        label={focused ? label : placeholder}
        outlined={this.outlined}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
        variant="outlined"
      />
    );
  }
}

export default Input;
