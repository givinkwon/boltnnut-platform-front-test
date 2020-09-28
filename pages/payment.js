import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('Payment') 
@observer
class Payment extends React.Component {
  static getInitialProps({query}) {
    return {query}
  }
  componentDidMount() {
    const { query, Payment } = this.props
    if(query.merchant_uid) {
      const res = {
        merchant_uid: query.merchant_uid
      }
      Payment.payment(res)
    }
    else {
      alert('결제 정보를 찾을 수 없습니다.\n다시 시도해주세요.')
    }
    Router.push('/')
  }
  render(){
    return null
  }
}

export default Payment
