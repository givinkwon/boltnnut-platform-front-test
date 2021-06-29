import React from 'react'
import styled from 'styled-components'

import * as Text from 'components/Text'
import DownloadFile from 'components/DownloadFile'
import RequestArea from 'components/RequestArea'

import * as FormatUtils from 'utils/format'
import RatioImage from 'components/RatioImage';
import { PRIMARY, WHITE } from 'static/style'
import {inject, observer} from "mobx-react";
const image1 = "/static/images/partner/pdsolution.jpg";
@inject('Answer')
@observer
class RequestCard extends React.Component {
  constructor(props) {
        super(props);
        this.state = {dimensions: {}};
        this.onImgLoad = this.onImgLoad.bind(this);
    }
    onImgLoad({target:img}) {
        this.setState({dimensions:{height:img.offsetHeight,
                                   width:img.offsetWidth}});
    }

  state = {
    requestId: -1
  }

  componentDidMount() {
    const splitedUrl = window.location.pathname.split('/')
    let pathname = splitedUrl[splitedUrl.length-2]
    const requestId = pathname === 'detail' ? splitedUrl[splitedUrl.length-3] : splitedUrl[splitedUrl.length-1]

    this.setState({
      ...this.state,
      requestId: requestId,
    })
  }

  render() {
    const {Answer,src} = this.props
    const {width, height} = this.state.dimensions;
    const request = Answer.getRequestById(this.state.requestId)
    const product = request ? Answer.getSubclassById(request.product) : null
    const mainCategory = product ? Answer.getDevelopBigCategoryById(product.maincategory) : null
    const selectSaves = Answer.select_saves

    console.log(Answer.subclasses)
    {Answer.partners[0] && console.log("/static/images/partner/" + Answer.partners[0].id + ".jpg")}
    return (
      <Card>
        <CardTitle>
          <Text.FontSize28 color="#4d4f5c" fontWeight={700}>
            제조사 스토리
          </Text.FontSize28>
        </CardTitle>

        <CardBody>
        <div>
           <img onLoad={this.onImgLoad} src={Answer.partners[0] && "/static/images/partner/" + Answer.partners[0].id + ".jpg"}/>
        </div>
        </CardBody>
      </Card>
    )
  }
}

export default RequestCard

const Card = styled.div`
  max-width: 100%;
  height: auto !important;
	@media (min-width: 0px) and (max-width: 767.98px) {
		margin-bottom: 50px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
		margin-bottom: 50px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {

  }

  @media (min-width: 1300px) {

  }

  flex: 5;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  margin-bottom: 20px;
`
const CardTitle = styled.div`
	background-color: #f5f5f5;
	box-sizing: border-box;
	padding: 28px 50px;


	@media (min-width: 0px) and (max-width: 767.98px) {
		padding: 15px 15px;
  }
  @media (min-width: 0px) and (max-width: 991.98px) {
    padding: 29px 30px;
  }
	@media (min-width: 992px) and (max-width: 1299.98px) {
		padding: 29px 30px;
  }
`
const CardBody = styled.div`
    max-width: 100%;
    height: auto !important;
    img{
        border-radius: 0 !important;
        max-width: 100%;
        height: 100%;
    }
	/*p {
		line-height: 1.3em;
		word-break: keep-all;
	}
	>div {
		border-bottom: 1px solid #dadbe6;
		padding: 30px 0;
		margin: 0 10px;
		display: flex;

		/* 라벨
		>p:nth-of-type(1) {
			width: 135px;
			flex-shrink: 0;
		}
	}
	>div:last-child {
		border-bottom: none;
	}

	>div:nth-of-type(2) {
		flex-direction: column;
		>p {
			margin-bottom: 24px;
		}
	}
	/* 첨부파일
	>div:nth-of-type(5) {
		display: flex;
		align-items: center;
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
		padding: 0 15px;
		margin: 0;
		>div {
			padding: 20px 0;
			margin: 0;
		}

		/* 라벨
		>div>p:nth-of-type(1) {
			width: 100px;
		}

		>div:nth-of-type(2) {
			flex-direction: column;
			>p {
				margin-bottom: 12px;
			}
		}
		>div:nth-of-type(5) {
			>a {
				margin-left: -15px;
			}
		}
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 0 30px;
    > div {
      margin: 0 !important;
    }
    
		>div:nth-of-type(5) {
			>a {
				margin-left: -15px;
			}
		}
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
		padding: 0 15px;
		>div {
		  margin: 0 15px;
			padding: 20px 0;
		}

		/* 라벨
		>div>p:nth-of-type(1) {
			width: 100px;
		}

		>div {
			:nth-of-type(2),
			:nth-of-type(5) {
				flex-direction: column;
				align-items: flex-start;
				>p {
					margin-bottom: 12px;
				}
			}

		}
  }*/
`
const ReadOnlyTextField = styled.div`
  max-width: 100%;
  height: auto !important;
	box-sizing: border-box;
	background-color: white;
	border: 1px solid #dadbe6;
	border-radius: 8px;
	padding: 20px 25px;
	margin: 0;
	>p {
		word-break: break-all;
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
		padding: 10px 10px;
		margin: 0;
	}
	@media (min-width: 768px) and (max-width: 1299.98px) {
		padding: 10px 15px;
  }
`



