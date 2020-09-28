import React from 'react'
import { inject, observer } from 'mobx-react'

import ContentConatiner from './Content'
  
@inject('Home')
@observer
class ContentGroupConatiner extends React.Component {
  render() {
    const { Home } = this.props
    return (
      <>
      {
        Home.category_list.length > 0 && Home.category_list.map((item, idx) => {
          return <ContentConatiner key={idx} data={item}/>
        })
      }
      </>
    )
  }
}

export default ContentGroupConatiner
