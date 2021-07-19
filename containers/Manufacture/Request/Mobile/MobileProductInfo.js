import React from 'react'
import styled from 'styled-components'
import * as Title from 'components/Title'
import { inject, observer } from 'mobx-react';


const img_item1 = "static/images/request/Step2/ProductInfo/item1.svg";
const img_item2 = "static/images/request/Step2/ProductInfo/item2.svg";
const img_item3 = "static/images/request/Step2/ProductInfo/item3.svg";

@inject('DetailQuestion', 'Request','ManufactureProcess')
@observer
class MobileProductInfoContainer extends React.Component {
  componentDidMount()
  {
  }

  render(){

    let buttonClick = (e,data) => {
      const { ManufactureProcess } = this.props;
      var idx=e.currentTarget.getAttribute('value');
      if(ManufactureProcess.SelectChecked===idx)
      {
        ManufactureProcess.SelectChecked='';
        ManufactureProcess.SelectedItem = null;
      }
      else
      {
        ManufactureProcess.SelectChecked=idx;
        ManufactureProcess.SelectedItem = data;
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

    const {  ManufactureProcess } = this.props;
    let ButtonIndex=0;
    return (
      <ItemBox>
        {ManufactureProcess.title_list.data && ManufactureProcess.title_list.data.map((item) => {
          return (
            <Item>
              <div style={{display:'flex', flexDirection:'column', alignItems:"center", marginLeft:36}}>
                <img src={ImageArray[item.name]}/>
                <ItemTitle>{item.name}</ItemTitle>
              </div>
              <div style={{display:'flex', flexDirection:'column', alignItems:"center", marginRight:18}}>
                {item.detailManufactureProcess && item.detailManufactureProcess.map((selectData) =>{
                  ButtonIndex++;
                  return(
                    <>
                      <SelectItem
                        onClick={ (event) => buttonClick(event,selectData) }
                        value={ButtonIndex}
                        active={ activeHandler(ButtonIndex) }
                        selected={ManufactureProcess.SelectChecked!=''}>
                        <ItemContent>{selectData.name}</ItemContent>
                      </SelectItem>
                    </>
                  )})}
              </div>
            </Item>
          )}
        )
        }
      </ItemBox>
    );
  }
}

export default MobileProductInfoContainer;

const SelectItem = styled.div`
    display: flex;
  justify-content: center;
  align-items: center;
    width: 115px;
    height: 38px;
    margin-bottom: 8px;
    border-radius: 3px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    &:hover {
        border: solid 2px #0933b3;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
        > p
        {
            color:#0933b3;
            font-weight:500;
            cursor:Default;
        }
      }
    border: ${(props) => (props.active ? 'solid 2px #0933b3' : 'none')};
    >p
    {
        color:${(props) => (props.active ? '#0933b3' : (props.selected ? '#c6c7cc' :'#282c36'))};
        font-weight:${(props) => (props.active ? '500' : 'normal')};
    }
`

const ItemBox=styled.div`
  width:100%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content:space-between;
`

const Item=styled.div`
    width:347px;
    height:144px;
    display:flex;
    flex-direction:row;
    align-items : center;
    justify-content: space-between;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    margin: 17px 7px;
    > img{
    margin:0px 0 0px 36px;
    }
`

const ItemTitle = styled.p`
  font-family: NotoSansCJKkr;
  font-size: 13px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.62;
  letter-spacing: -0.33px;
  text-align: center;
  color: #282c36;
  margin-top: 8px;
`

const ItemContent = styled.p`
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.33px;
  text-align: center;
  color: #414550;
`
