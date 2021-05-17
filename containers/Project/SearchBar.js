import React from "react";
import styled, {css} from "styled-components";
import { inject, observer } from "mobx-react";
import SelectComponent from 'Select';

import ButtonComponent from "components/Buttonv2";

import Background from 'components/Background';
import Container from 'components/Containerv1';
import {toJS} from "mobx";

import { PRIMARY2 } from "static/style";

const filter_img = "static/images/manufacturer/filter.png";
const search_img = "static/images/manufacturer/search.png";

@inject("Auth", "Project")
@observer

class SearchBarConatiner extends React.Component {
  state = {
    search: "",
    modal_open: false,
    list: false,
    width: null,
    filter_active: false,
  };

  filterActiveHandler = () => {

    if (this.state.filter_active) {
      this.setState({ filter_active: false });
    } else {
      this.setState({ filter_active: true });
    }
  };

  activeHandler = (idx) => {
    const { Project } = this.props;
    if(idx=== Project.radiobox_checked_idx) {
      // console.log("equal")
       return true; 
    } else { 
      return false; 
    }
  };
  onClickHandler = (item, idx) => {
    const { Project } = this.props       
    console.log(idx);
    if(Project.radiobox_checked_idx !== idx){        
      this.setState({index : idx})    
      Project.radiobox_checked_idx = idx
      Project.filter = item.name     
      Project.project_next = null;
      Project.project_count = null;
// this.count = 0;
      Project.currentPage = 1;     
      console.log(Project.filter)
      Project.getProjectByPrice(Project.search_text)
    }
  };


  selectClick = () => {
    const{list} = this.state;
    this.setState({ list: true });

  }

  selectOut= () =>{
    const{list} = this.state;
    this.setState({ list: false });
  }


  searchText = (e) => {
    const { Project } = this.props
    // this.props.Partner.search_text = e.target.value;
    this.setState({search : e.target.value})
    Project.search_text = e.target.value
    console.log(e.target)
  };
  search = () => {
    const { Project } = this.props
 
    Project.currentPage = 1
    Project.getProjectByPrice(Project.search_text)
  };
  closeModal = () => {
    this.setState({
      ...this.state,
      modal_open: false,
    });
  };
  handleKeyDown = (e) => {
    const { Project } = this.props
    if (e.key === "Enter") {      
      Project.currentPage = 1
      Project.getProjectByPrice(Project.search_text)
    }
  };
  async componentDidMount() {
    await this.props.Auth.checkLogin();

        //창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render() {    
    const { Project } = this.props;
    const { width } = this.state;
    const customStyles = {
      dropdownIndicator: () => ({
        backgroundColor: "#fff",
        color: "#c1b1bf",
        width: 34,
        height: 34,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "#000000" : "#555555",
        backgroundColor: "#fff",
        borderRadius: 0,
        padding: 16,
        fontSize: 10,
      }),
      control: () => ({
        fontSize: 10,
        width: 84,
        fontWeight: "normal",
        lineHeight: 34,
        letterSpacing: "-0.45px",
        // border: "1px solid #c7c7c7",
        // borderRadius: "3px",
        color: "#c1bfbf",
        display: "flex",
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";
    
        return { ...provided, opacity, transition };
      },
    };
    

    return (
      <>
      {width > 768 ? 
      <Form>
        <Box active={this.state.list===true} onClick ={()=>this.state.list ? this.selectOut():this.selectClick()}  onBlur = {()=>this.selectOut()}>
        <input style={{display: 'none'}} value={Request.select_big ? Request.select_big.maincategory : ''} class="Input"/>       
          <Select placeholder='전체' options={categoryArray}  getOptionLabel={(option) => option.label} value={Project.input_category} onChange={Project.setCategory}/>    
        </Box>
          <SearchBar>        
              <input
                placeholder=""
                // value={Partner.search_text}
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = ''}
                onChange={this.searchText}                
                class="Input"
                onKeyDown={this.handleKeyDown}
              />            
          </SearchBar>
          <SearchButton              
                width={80}
                borderColor={PRIMARY2}
                borderRadius={0}
                onClick={this.search}                
              >
                <img
                  style={{ width: 18, height: 18}}
                  src="/static/images/search_cobalt-blue.png"
                />
          </SearchButton>
      </Form>
      :
      <Form active = {this.state.filter_active}>
        <SearchFilterBox>
          <SearchBar>
            <div>
            <input style = {{display: 'none'}} class="Input"/>       
            <Select styles = {customStyles} placeholder='전체' options={categoryArray}  getOptionLabel={(option) => option.label} value={Project.input_category} onChange={Project.setCategory}/>
            </div>
            <div>
            <input
              onChange={this.searchText}                
              class="Input"
              onKeyDown={this.handleKeyDown}
            />     
            </div>       
            <div>
            <SearchButton              
                  width={50}
                  style={{ height: "36px", width: "20px", margin: "0 auto" }}
                  borderColor={PRIMARY2}
                  borderRadius={0}
                  onClick={this.search}                
                >
                  <img
                    style={{ width: 18, height: 18}}
                    src= {search_img}
                  />
            </SearchButton>
            </div>
          </SearchBar>
          <Filter onClick={() => {
              this.filterActiveHandler();
            }}>
              <img src={filter_img} />
          </Filter>
        </SearchFilterBox>
        
        <FilterContainer
          style={{ flex: "0 auto" }}
          active={this.state.filter_active}
        >
          {request_data.map((item, idx) => {
            return (
              <>
              {console.log(toJS(item))}
                <FilterContent
                  onClick={() => {
                    this.onClickHandler(item, item.id);
                  }}
                  active={this.activeHandler(item.id)}
                >
                  <div active={this.activeHandler(item.id)}>
                    <div active={this.activeHandler(item.id)}></div>
                  </div>
                  <span>{item.name}</span>
                </FilterContent>
              </>
            );
          })}
        </FilterContainer>
      </Form>
    }
    </>
    );
  }
}

export default SearchBarConatiner;

const request_data = [
  {
    id: "1",
    name: "전체",
    checked: "false",
  },
  {
    id: "2",
    name: "상담요청",
    checked: "false",
  },
  {
    id: "3",
    name: "견적문의",
    checked: "false",
  },
  {
    id: "4",
    name: "업체수배",
    checked: "false",
  },
];

const categoryArray = [
  {label: '전체', value: '전체'},
  {label: '제목', value: '제목'},
  {label: '내용', value: '내용'},  
];

const SearchBar = styled.div`
display: flex;
box-sizing: border-box;

@media (min-width: 768px) and (max-width: 1299.98px){
  width: 690px;
  height: 44px;
  box-sizing: border-box;
  margin 0 24px;
  
  input {
    font-size: 18px;
    width: 100%;
    padding: 0 14px;

    border: 1px solid #c6c7cc;
    border-radius: 3px;
    :focus {
      outline: none;
    }
    ::placeholder{
      color: #c1bfbf;
    }
  }

}


@media (min-width: 767.98px) {
  width: 690px;
  height: 44px;
  box-sizing: border-box;
  margin 0 24px;
  
  input {
    font-size: 18px;
    width: 100%;
    padding: 0 14px;

    border: 1px solid #c6c7cc;
    border-radius: 3px;
    :focus {
      outline: none;
    }
    ::placeholder{
      color: #c1bfbf;
    }
  }
}


  @media (min-width: 0px) and (max-width: 767.98px){
    width: 100%;
    height: 43px;
    margin 0 14px;
    border: 1px solid #c6c7cc;
    border-radius: 3px;
    >div:nth-of-type(1){
      flex-grow:1;
    }
  
    >div:nth-of-type(2){
      //border: 1px solid green;
      flex-grow:5;
      input {
        width: 95%;
        height: 36px;
        //padding: 0 14px;
        padding-left: 10px;
    
        //border: 1px solid #c6c7cc;
        border: none;
        border-radius: 3px;
        :focus {
          outline: none;
        }
        ::placeholder{
          color: #c1bfbf;
        }
      }
    }
    >div:nth-of-type(3){
        //border: 1px solid black;
        flex-grow:1;
    }
  }

`;
const Form = styled.div`
  width: 100%;
 

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 16px;
    // height: 40px;
  }
  @media (min-width: 768px) {
    display: flex;
    margin-top: 60px;
    height: 50px;
    justify-content: flex-start;
`;

const SearchFilterBox = styled.div`
  //border: 2px solid green;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchButton = styled(ButtonComponent)`
  border-radius: 3px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 70px;
    border: 1px solid #ffffff80;
    img {
      margin-right: 0 !important;
    }
    > p {
      display: none;
    }
  }
`

const Select = styled(SelectComponent)`
box-sizing: border-box;
option{
  color: #c1bfbf;
}

@media (min-width: 0px) and (max-width: 767.98px) {
  margin: 0;
  padding: 0;
  margin-right: 8px;
  width: 100%;
  height: 36px;
  object-fit: contain;
  background-color: #ffffff;
  position: relative;
}
@media (min-width: 768px) and (max-width: 1299.98px) {
  width: 140px;
  height: 36px;
  option{
    color: #c1bfbf;
  }
}

@media (min-width: 1300px) {
  width: 180px;
  height: 36px;
  option{
    color: #c1bfbf;
  }
}

`

const Box = styled.div`
cursor: pointer;
  ${ props => props.active && css`
  svg{
    @keyframes select{
      0% {
        transform: skewY(-180deg);
      }
    }

    animation: select 0.4s ease-out;
    transform: rotate(-180deg);
  }
  `}

  ${props => !props.active && css`
  svg{
    @keyframes selectOut{
      0% {
        transform: rotate(-180deg);
      }
    }
    animation: selectOut 0.4s ;
  }
`}
`
const Filter = styled.div`
  //border: 2px solid red;

  > img {
    width: 36px;
    height: 36px;
  }
`;

const FilterContainer = styled.div`
  display: ${(props) => (props.active ? "flex" : "none")};
  flex-wrap: wrap;
  padding: 0 24px;
  box-sizing: border-box;
  margin-top: 14px;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.2);
`;
const FilterContent = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  text-align: center;
  margin-bottom: 14px;
  > div {
    width: 13px;
    height: 13px;
    border: ${(props) =>
      props.active ? "1px solid #0933b3" : "1px solid #999999"};
    border-radius: 12px;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    > div {
      display: ${(props) => (props.active ? "block" : "none")};
      width: 7px;
      height: 7px;
      //border: 1px solid #0933b3;
      border-radius: 6px;
      background-color: #0933b3;
      // position: absolute;
      // top: 50%;
      // left: 50%;
    }
  }
  > span {
    margin-left: 11px;
    font-size: 14px;
    line-height: 15px;
    letter-spacing: -0.35px;
    color: #999999;
  }
`;