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

    let buttonClick = (e) => {
        const {DetailQuestion,ManufactureProcess} = this.props;
        // console.log(e.currentTarget.getAttribute('value'));
        var idx=e.currentTarget.getAttribute('value');
        if(ManufactureProcess.SelectChecked===idx)
        {
            console.log(2);
          DetailQuestion.nextPage = null;
          ManufactureProcess.SelectChecked='';
          DetailQuestion.SelectId = null;
        }
        else
        {
            console.log(1);
          ManufactureProcess.SelectChecked=idx;
        //   console.log("ManuProcess SelectChecked="+idx);
        //   DetailQuestion.nextPage = e.nextTitle;
        //   DetailQuestion.SelectId = e.id;
        }
    };

    const ImageArray={
        "3D 프린팅":img_item1,
        "CNC":img_item2,
        "금형사출":img_item3
    }

    let activeHandler=(idx) =>
    {
      if(idx==ManufactureProcess.SelectChecked)
        { 
            return true; 
        } 
        else
        { 
            return false; 
        }
    };

    const { ManufactureProcess } = this.props;
    let ButtonIndex=0;
    return (
        <ItemBox>
            {/* RequestCard-> ComponentDidUpdate 업데이트용 div. 외부에서 받아오는 input value의 변경으로는 update가 호출이 안되기 때문에 필요 */}
            <div>
                {ManufactureProcess.SelectChecked}
            </div>
            <input value={ManufactureProcess.SelectChecked} class="Input" style={{display:'none'}}/>
            {ManufactureProcess.title_list.data && ManufactureProcess.title_list.data.map((item) => {
            return (
                <Item>
                    <ItemTitle>{item.name}</ItemTitle>
                    <img src={ImageArray[item.name]}/>
                    
                    {item.detailManufactureProcess && item.detailManufactureProcess.map((selectData) =>{
                        ButtonIndex++;
                        return(
                        <>
                            <SelectItem onClick={ buttonClick } value={ButtonIndex} active={ activeHandler(ButtonIndex) }>
                                <ItemContent>{selectData.name}</ItemContent>
                            </SelectItem>
                        </>
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
    &:hover {
        border: solid 2px #0933b3;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
        >p
        {
            color:#0933b3;
            font-weight:500;
        }
      }
    border: ${(props) => (props.active ? 'solid 2px #0933b3' : 'none')};
    >p
    {
        color:${(props) => (props.active ? '#0933b3' : '282c36')};
        font-weight:${(props) => (props.active ? '500' : 'normal')};
    }
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
