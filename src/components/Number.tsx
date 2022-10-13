import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background-color: #EFEFEF;
  max-width: 900px;
  
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 111.2px;
    height: 106.36px;
    border-radius: 50%;
    background-color: #fff;
    margin: 1rem;
    font-weight: 700;
    font-size: 27px;
    line-height: 33px;
    color: #333333;
  }
`;

type Props = {}

const Number = ({ num }:{num: any}) => {
  
  return (
    <Wrapper>
      { num.map((item: any)=>{
        return <div key={item}>{ item }</div>
      })}
    </Wrapper>
  )
}

export default Number