import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 92px 0;
  margin: 0 auto;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 111.2px;
    height: 106.36px;
    border-radius: 50%;
    background-color: #fff;
    margin: 0.5rem 1rem;
    font-weight: 700;
    font-size: 27px;
    line-height: 33px;
    color: #333333;
    z-index: 2;
  }
  p {
    font-weight: 400;
  }
  
  @media (max-width: 425px) {
    
    padding: 32px 0;
    .apoio {
      display: none;
    }
    span {
      height: 76px;
      width: 76px;
      margin: 0.5rem 0.5rem;
      font-size: 20px;
      line-height: 24px;
    }
    p {
      margin: 2rem;
    }
  }
`;

type Props = {}

const Number = ({ num }:{num: any}) => {
  
  return (
    <Wrapper>
      <div className='apoio'></div>
      <div>
        { num.map((item: any)=>{
          return <span key={item}>{ item }</span>
        })}
      </div>
      <p>Este sorteio é meramente ilustrativo e não possui nenhuma ligação com a CAIXA.</p>
    </Wrapper>
  )
}

export default Number