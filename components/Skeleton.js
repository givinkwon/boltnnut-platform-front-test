import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Skeleton from '@material-ui/lab/Skeleton';


const SkeletonContainer = withStyles({
  root: {
    color: '#404040',
    "&$checked": {
      color: PRIMARY,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

class SkeletonContainer extends React.Component {
  handleChange = (e) => {
    this.props.onChange(e.target.checked);
  };
  render() {
    const { checked } = this.props;
    const { primary, placeholder, label, disabled, ...props } = this.props;

    return (
      <Skeleton {...props}
        value={}
        animation={}
        variant={}
        width={}
        height={}
      />
    );
  }
}

export default SkeletonContainer;
