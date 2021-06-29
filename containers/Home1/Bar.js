import styled from "styled-components";

class BarContainer extends React.Component {

  Selector = (current) => {
     if (current == 1) {
       return this.Bar1();
     }
     if (current == 2) {
       return this.Bar2();
     }
     if (current == 3) {
       return this.Bar3();
     }
     if (current == 4) {
       return this.Bar4();
     }
   }

   setPage1 () {
     this.setState({page: 1})
   }

   setPage2 () {
     this.setState({page: 2})
   }

   setPage3 () {
     this.setState({page: 3})
   }

   setPage4 () {
     this.setState({page: 4})
   }

  Bar1 () {
      return (
      <>
                <LineContainer>
                  <SubContainer>
                    <TextCellContainer>
                      <ContentBox>
                        <TableCellContainer>
                          <Circle>
                            <div class="circle active" >
                              <span> 1 </span>
                            </div>
                          </Circle>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <Circle>
                            <div class="circle normal">
                              <span> 2 </span>
                            </div>
                          </Circle>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <Circle>
                            <div class="circle normal">
                              <span> 3 </span>
                            </div>
                          </Circle>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <Circle>
                            <div class="circle normal">
                              <span> 4 </span>
                            </div>
                          </Circle>
                        </TableCellContainer>
                      </ContentBox>
                    </TextCellContainer>
                  </SubContainer>
                  <SubContainer>
                    <TableCellContainer>
                      {<EndLine style={{marginLeft: 16}}>
                        <TableCellContainer>
                          <SlideLine>
                            <div class="active"/>
                          </SlideLine>
                        </TableCellContainer>
                      </EndLine>}
                      <ContentBox>
                        <TableCellContainer>
                          <SlideLine/>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideLine/>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideLine/>
                        </TableCellContainer>
                      </ContentBox>
                      {<EndLine>
                        <TableCellContainer>
                          <SlideLine/>
                        </TableCellContainer>
                      </EndLine>}
                    </TableCellContainer>
                  </SubContainer>
                </LineContainer>
                <LineContainer2>
                  <SubContainer>
                    <TextCellContainer>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideText>
                            <div class="SlideText active">
                              프로필
                            </div>
                          </SlideText>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideText>
                            포트폴리오
                          </SlideText>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideText>
                            보유장비
                          </SlideText>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideText>
                            업체 스토리
                          </SlideText>
                        </TableCellContainer>
                      </ContentBox>
                    </TextCellContainer>
                  </SubContainer>
                </LineContainer2>
      </>
                )
              }
    Bar2 ()  {
    return (
    <>
                <LineContainer>
                  <SubContainer>
                    <TextCellContainer>
                      <ContentBox>
                        <TableCellContainer>
                          <Circle>
                            <div class="circle after">
                              <span> 1 </span>
                            </div>
                          </Circle>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <Circle>
                            <div class="circle active">
                              <span> 2 </span>
                            </div>
                          </Circle>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <Circle>
                            <div class="circle normal">
                              <span> 3 </span>
                            </div>
                          </Circle>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <Circle>
                            <div class="circle normal">
                              <span> 4 </span>
                            </div>
                          </Circle>
                        </TableCellContainer>
                      </ContentBox>
                    </TextCellContainer>
                  </SubContainer>
                  <SubContainer>
                    <TableCellContainer>
                      {<EndLine style={{marginLeft: 16}}>
                        <TableCellContainer>
                          <SlideLine>
                            <div class="active"/>
                          </SlideLine>
                        </TableCellContainer>
                      </EndLine>}
                      <ContentBox>
                        <TableCellContainer>
                          <SlideLine>
                            <div class="active">
                            </div>
                          </SlideLine>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideLine/>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideLine/>
                        </TableCellContainer>
                      </ContentBox>
                      {<EndLine>
                        <TableCellContainer>
                          <SlideLine/>
                        </TableCellContainer>
                      </EndLine>}
                    </TableCellContainer>
                  </SubContainer>
                </LineContainer>
                <LineContainer2>
                  <SubContainer>
                    <TextCellContainer>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideText>
                            프로필
                          </SlideText>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideText>
                            <div class="SlideText active">
                              포트폴리오
                            </div>
                          </SlideText>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideText>
                            보유장비
                          </SlideText>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideText>
                            업체 스토리
                          </SlideText>
                        </TableCellContainer>
                      </ContentBox>
                    </TextCellContainer>
                  </SubContainer>
                </LineContainer2>
    </>
                )
               }
    Bar3 () {
      return (
      <>
                <LineContainer>
                  <SubContainer>
                    <TextCellContainer>
                      <ContentBox>
                        <TableCellContainer>
                          <Circle>
                            <div class="circle after">
                              <span> 1 </span>
                            </div>
                          </Circle>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <Circle>
                            <div class="circle after">
                              <span> 2 </span>
                            </div>
                          </Circle>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <Circle>
                            <div class="circle active">
                              <span> 3 </span>
                            </div>
                          </Circle>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <Circle>
                            <div class="circle normal">
                              <span> 4 </span>
                            </div>
                          </Circle>
                        </TableCellContainer>
                      </ContentBox>
                    </TextCellContainer>
                  </SubContainer>
                  <SubContainer>
                    <TableCellContainer>
                      {<EndLine style={{marginLeft: 16}}>
                        <TableCellContainer>
                          <SlideLine>
                            <div class="active"/>
                          </SlideLine>
                        </TableCellContainer>
                      </EndLine>}
                      <ContentBox>
                        <TableCellContainer>
                          <SlideLine>
                            <div class="active">
                            </div>
                          </SlideLine>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideLine>
                            <div class="active">
                            </div>
                          </SlideLine>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideLine/>
                        </TableCellContainer>
                      </ContentBox>
                      {<EndLine>
                        <TableCellContainer>
                          <SlideLine/>
                        </TableCellContainer>
                      </EndLine>}
                    </TableCellContainer>
                  </SubContainer>
                </LineContainer>
                <LineContainer2>
                  <SubContainer>
                    <TextCellContainer>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideText>
                            프로필
                          </SlideText>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideText>
                            포트폴리오
                          </SlideText>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideText>
                            <div class="SlideText active">
                              보유장비
                            </div>
                          </SlideText>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideText>
                            업체 스토리
                          </SlideText>
                        </TableCellContainer>
                      </ContentBox>
                    </TextCellContainer>
                  </SubContainer>
                </LineContainer2>
      </>
               )
             }
    Bar4 () {
      return (
      <>
                <LineContainer>
                  <SubContainer>
                    <TextCellContainer>
                      <ContentBox>
                        <TableCellContainer>
                          <Circle>
                            <div class="circle after">
                              <span> 1 </span>
                            </div>
                          </Circle>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <Circle>
                            <div class="circle after">
                              <span> 2 </span>
                            </div>
                          </Circle>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <Circle>
                            <div class="circle after">
                              <span> 3 </span>
                            </div>
                          </Circle>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <Circle>
                            <div class="circle active">
                              <span> 4 </span>
                            </div>
                          </Circle>
                        </TableCellContainer>
                      </ContentBox>
                    </TextCellContainer>
                  </SubContainer>
                  <SubContainer>
                    <TableCellContainer>
                      {<EndLine style={{marginLeft: 16}}>
                        <TableCellContainer>
                          <SlideLine>
                            <div class="active"/>
                          </SlideLine>
                        </TableCellContainer>
                      </EndLine>}
                      <ContentBox>
                        <TableCellContainer>
                          <SlideLine>
                            <div class="active">
                            </div>
                          </SlideLine>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideLine>
                            <div class="active">
                            </div>
                          </SlideLine>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideLine>
                            <div class="active">
                            </div>
                          </SlideLine>
                        </TableCellContainer>
                      </ContentBox>
                      {<EndLine>
                        <TableCellContainer>
                          <SlideLine>
                            <div class="active"/>
                          </SlideLine>
                        </TableCellContainer>
                      </EndLine>}
                    </TableCellContainer>
                  </SubContainer>
                </LineContainer>
                <LineContainer2>
                  <SubContainer>
                    <TextCellContainer>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideText>
                            프로필
                          </SlideText>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideText>
                            포트폴리오
                          </SlideText>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideText>
                            보유장비
                          </SlideText>
                        </TableCellContainer>
                      </ContentBox>
                      <ContentBox>
                        <TableCellContainer>
                          <SlideText>
                            <div class="SlideText active">
                              업체 스토리
                            </div>
                          </SlideText>
                        </TableCellContainer>
                      </ContentBox>
                    </TextCellContainer>
                  </SubContainer>
                </LineContainer2>
      </>
                )
    }

  render() {
    const { current } = this.props;

    return (
        this.Selector(1)
      )
  }
  }

export default BarContainer;
// slider circle
const LineContainer = styled.div` {
  position: relative;
  width: 100%;
  height: 30px;
}

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 10px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 100px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 100px;
  }

  @media (min-width: 1300px) {
    margin-top: 69px;
  }
`
const LineContainer2 = styled.div` {
  position: relative;
  width: 100%;
  height: 30px;
  margin-top: 12px;
  margin-bottom: 40px;
}
@media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 10px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-bottom: 24px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-bottom: 24px;
  }

  @media (min-width: 1300px) {
  }
`
const SubContainer = styled.div` {
  position: absolute;
  width: 100%;
  height: 100%;
  display: table;
  font-size: 0; /* div 사이의 간격을 없애기 위해서 씀*/
`
const TableCellContainer = styled.div` {
  width: 100%;
  height: 100%;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
`
const TextCellContainer = styled.div` {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 10px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
`
const ContentBox = styled.div` {
  display: inline-table;
  width: calc(100% / 5);
  position: relative;
  height: 100%;
  vertical-align: middle;
}
`
const EndLine = styled.div` {
  display: inline-table;
  width: calc(70% / 5);
  position: relative;
  height: 100%;
  vertical-align: middle;
}
`
const Circle = styled.div`
  font-size: 16px;
  cursor: pointer;
  width: 28px;
  height: 28px;
  margin:auto;
  justify-contents: center;
  align-items: center;
  color: #707070;
  line-height: 20px;
  text-align: center;
  display: block;
  z-index: 100;
  vertical-align: middle;
  position: relative; /* z-index는 relative 등의 특정 포지션에서만 작동함 */
  transform: translateX(10px);
  > div {
  display: flex;
  align-items: center;
  justify-content: center;
  }
  .after {
  border-radius: 16px;
  width: 100%;
  height: 28px;
  border: 2px solid #061953;
  background-color: #ffffff;
  }
  .active {
  border-radius: 16px;
  width: 100%;
  height: 28px;
  border: 2px solid #061953;
  background-color: #061953;
  color: white;
  }
  .normal {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    background-color: white;
  }
`
const SlideLine = styled.div`
  height:2px;
  width: calc(100%);
  background-color: gray;
  position: relative;
  .active {
    background-color: #061953;
    height:2px;
    width: calc(100%);
    position: relative;
  }
`
const SlideText = styled.div`
  font-size: 16px;
  width: 100%;
  height: 20px;
  font-family: NotoSansCJKkr;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  text-align: center;
  color: #707070;
  display: block;
  z-index: 100;
  position: relative; /* z-index는 relative 등의 특정 포지션에서만 작동함 */
  float: middle;
  transform: translateX(10px);
  .active {
    color: #061953;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 10px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
}
`