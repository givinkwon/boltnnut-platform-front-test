import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';


const CustomInput = withStyles({
  root: {
    // width: ${props => props.width ? props.width : "100%"};
    // width: '100%',
    marginTop: '35px',
    border : '1px',
    borderRadius: '3px',
    
    '& label': {
      color: '#c7c7c7',
    },
    '& placeholder' : {
      fontSize: '20',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.7',
      letterSpacing: '-0.5px',
    },
    '& label.Mui-focused': {
      color: '#c7c7c7',
    },
    "& .MuiInput-underline:after": {
      borderColor: "#0933b3"
    },
    '& .MuiOutlinedInput-root': {
      "& fieldset": {
        borderColor: "#c7c7c7"
      },
      "&:hover fieldset": {
        borderColor: "#0933b3"
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0933b3',
      },
    }, 
    // '& input': {
    //   color: '#999999',
    //   '&::placeholder': {
    //     color: '#c7c7c7',
    //   }
    // },
    // '& .MuiTextField-root': {
    // },
    // '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    //   borderBottom: '2px solid #c7c7c7',
    // },
    // '& .MuiInput-underline:before': {
    //   borderBottom: '1px solid #c7c7c7',
    // },
    // '& .MuiInput-underline:after': {
    //   borderBottomColor: '#c7c7c7',
    // },       
  },            
})(TextField);

class Input extends React.Component {
  state = {
    text: '',
    focused: false
  }
  onFocus = () => {
    this.setState({focused: true})
  }
  onBlur = () => {
    if(!this.state.text){
      this.setState({focused: false})
    }
  }
  onChange = (e) => {
    if(this.props.type === 'file'){
      this.props.onChange(e.target.files[0])
    }
    else {
      this.setState({text: e.target.value})
      this.props.onChange(e.target.value)
    }
  }
  render() {
    const { focused } = this.state
    const { placeholder, label, outlined, variant, ...props } = this.props 
    return ( 
      <CustomInput {...props}
        id= {this.id} 
        label={focused ? label : placeholder} 
        outlined={this.outlined}
        onFocus={this.onFocus} 
        onBlur={this.onBlur} 
        onChange={this.onChange}
        variant="outlined"/>
    )
  }
}

export default Input