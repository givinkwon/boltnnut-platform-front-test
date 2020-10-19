import React, {Component} from 'react'
import styled from "styled-components"

import RatioImage from "components/RatioImage";

class Rating extends Component {
	render() {
		const {name, rating, handleClick} = this.props;

		let RatingIcons = null
    let ratingIterator = [1, 2, 3, 4, 5]

    RatingIcons = ratingIterator.map((number) => {
      if(number <= rating) {
        return (
          <IconButton
            key={number}
            editable={name !== 'OO 만족도' && rating !== 0}
            onClick={() => handleClick(name, number)}
          >
            <RateIcon src="/static/icon/rate.svg"/>
          </IconButton>
        )
      }
      else {
        return (
          <IconButton
            key={number}
            editable={name !== 'OO 만족도'}
            onClick={() => handleClick(name, number)}
          >
            <RateIcon src="/static/icon/rate_empty.svg"/>
          </IconButton>
        )
      }
    })

		return (
			<>
				{RatingIcons}
			</>
		)
	}
}

Rating.defaultProps = {
  name: 'OO 만족도',
  rating: 0,
  handleClick: (name, number) => {
    console.log(`clicked RatingIcon(${number}) of ${name}`)
  },
}

export default Rating

const IconButton = styled.button`
  background-color: inherit;
  border: none;
  padding: 0;
  :focus {
    outline: 0;
  }
  cursor: ${props => props.editable ? 'pointer' : 'default'};
`
const RateIcon = styled(RatioImage)`
  width: 20px;
`
