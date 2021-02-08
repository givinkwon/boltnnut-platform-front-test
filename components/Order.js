import React from 'react'
import styled from 'styled-components'

import * as Text from 'components/Text'
import Container from 'components/Container'

import {PRIMARY} from "static/style"

class Order extends React.Component {
	render() {
		const {orderEnum, order, setOrder} = this.props

		return (
			<Wrapper>
				<Container>
					<List>
						{
							orderEnum && orderEnum.map(item => {
								return (
									<Item key={item.id} active={order === item.id} onClick={() => setOrder(item.id) }>
										<Text.FontSize18 color={order === item.id ? "white" : "#808dab"} fontWeight={500}>
											{item.name}
										</Text.FontSize18>
									</Item>
								)
							})
						}
					</List>
				</Container>
			</Wrapper>
		)
	}
}

export default Order


const Wrapper = styled.div`
	background-color: ${PRIMARY};
`
const List = styled.ul`
	padding: 0;

	@media (min-width: 0px) and (max-width: 767.98px) {

	}
	@media (min-width: 768px) and (max-width: 991.98px) {

	}
`
const Item = styled.li`
	cursor: pointer;
	margin: 20px 0;
	padding: 0 15px;
	display: inline-block;
	border-right: 1px solid #808dab;
	:first-child {
		padding-left: 0;
	}
	:last-child {
		border-right: none;
	}
`