import React from 'react'
import styled from 'styled-components'
import * as Title from 'components/Title'
import { inject, observer } from 'mobx-react';

const img_item1 = "static/images/request/Step2/ProductInfo/ProductInfo_item1.png";
const img_item2 = "static/images/request/Step2/ProductInfo/ProductInfo_item2.png";
const img_item3 = "static/images/request/Step2/ProductInfo/ProductInfo_item3.png";

@inject('DetailQuestion', 'Request','ManufactureProcess')
@observer
class ProductInfoContainer extends React.Component {

    componentDidMount()
    {
        console.log(this.props.ManufactureProcess.title_list);
    }
  render(){
    const ImageArray={
        "3D 프린팅":img_item1,
        "CNC":img_item2,
        "금형사출":img_item3
    }

    const { ManufactureProcess } = this.props;

    return (
        <ItemBox>
            {ManufactureProcess.title_list.data && ManufactureProcess.title_list.data.map((item) => {
            return (
                <Item>
                    <ItemTitle>{item.name}</ItemTitle>
                    <img src={ImageArray[item.name]}/>
                    {item.detailManufactureProcess.map((selectData) =>{return(
                        <SelectItem>
                            <ItemContent>{selectData.name}</ItemContent>
                        </SelectItem>
                    )})}
                </Item>
            )}
            )
        }
        </ItemBox>
    );
  }
}

export default ProductInfoContainer;

const SelectItem = styled.div`
    width: 230px;
    height: 42px;
    margin-bottom:8px;
    border-radius: 3px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);

`

const ItemBox=styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    padding-bottom:100px;
`

const Item=styled.div`
    width:254px;
    height:410px;
    display:flex;
    flex-direction:column;
    align-items:center;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);

    >img{
        margin:12px 0 38px 0;
    }
`

const ItemTitle = styled(Title.FontSize20)`
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.5px;
    text-align: left;
    color: #282c36;
    margin-top:20px;
`

const ItemContent = styled(Title.FontSize18)`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.22;
    letter-spacing: -0.45px;
    text-align: center;
    color: #282c36;
    
`
