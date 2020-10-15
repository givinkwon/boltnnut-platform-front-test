import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const CustomInput = withStyles({
  root: {
    // width: ${props => props.width ? props.width : "100%"};
    // width: '100%',
    margin: '15px 0',
    '& label': {
      color: '#fff9',
    },
    '& input': {
      color: '#fff',
      '&::placeholder': {
        color: '#fff',
      }
    },
    '& label.Mui-focused': {
      color: '#fff',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid #fff9',
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid #fff9',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#fff',
      },
    },              
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
    const { placeholder, label, ...props } = this.props 
    return ( 
      <CustomInput {...props} 
        label={focused ? label : placeholder} 
        onFocus={this.onFocus} 
        onBlur={this.onBlur} 
        onChange={this.onChange}/>
    )
  }
}

export default Input
