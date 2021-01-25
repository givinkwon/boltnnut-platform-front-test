import React from 'react'
import styled from 'styled-components'
import * as Title from 'components/Title'
import { inject, observer } from 'mobx-react';

const img_item1 = "static/images/request/Step2/ProductInfo/ProductInfo_item1.png";
const img_item2 = "static/images/request/Step2/ProductInfo/ProductInfo_item2.png";
const img_item3 = "static/images/request/Step2/ProductInfo/ProductInfo_item3.png";

@inject('DetailQuestion', 'Request')
@observer
class ProductInfoContainer extends React.Component {
  render(){
    const ItemArray=[];
    const item1 = {
        name: "3D 프린터",
        logo: img_item1
    }
    const item2 = {
        name: "CNC",
        logo: img_item2
    }
    const item3 = {
        name: "금형 사출",
        logo: img_item3
    }

    const testSelect = {
        title: [
            "실리콘",
            "금속",
            "다이캐스팅"
        ]
    }

    ItemArray.push(item1,item2,item3);
    return (
        <ItemBox>
            {ItemArray && ItemArray.map((item) => {
            return (
                <Item>
                    <ItemTitle>{item.name}</ItemTitle>
                    <img src={item.logo}/>
                    {testSelect.title.map((selectData) =>{return(
                        <SelectItem>
                            <ItemContent>{selectData}</ItemContent>
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
    line-height: 2;
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
