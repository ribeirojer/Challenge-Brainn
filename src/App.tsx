import useFetch from './hooks/useFetch';
import Number from './components/Number';
import styled from 'styled-components'
import { useState } from 'react';

const Wrapper = styled.main`
  display: flex;
  background-color: #EFEFEF;
  .back svg {
    position: absolute;
    height: 100%;
    left: 65px;
  }
  @media (max-width: 425px) {
    flex-direction: column;
    .back svg {
      transform: rotate(90deg);
      top: 10px;
      left: -100px;
    }
  }
`;
const Retangulo = styled.span`
  position: absolute;
  height: 100%;
  width: 190px;
  background-color: ${props => props.color || "#6BEFA3"};

  @media (max-width: 425px) {
    transform: rotate(90deg);
    top: -187px;
    left: 87px;
  }
`;
const Main = styled.section`
  min-width: 36%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 92px 96px;
  height: 100vh;
  z-index: 2;

  select {
    width: 215.91px;
    padding: 1rem;
    color: #333333;
    border: 1px solid #fff;
    border-radius: 0.5rem;
  }
  option {
    font-size: 15px;
    line-height: 18px;  
    color: #333333;
  }
  section {
    display: flex;
    align-items: center;
  }
  .bottom p {
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.135em;
    color: #FFFFFF;
    margin-bottom: 1rem;
  }
  .bottom h3 {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF;
  }
  .bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  h1 {
    font-weight: 700;
    font-size: 30px;
    line-height: 37px;
    margin-left: 24px;
    color: #FFFFFF;
  }
  .bottom_mobile {
    display: none;
  }
  .logo {
    position: relative;
  }
  .logo :first-child {
    position: absolute;
  }
  
  @media (max-width: 425px) {
    padding: 63px 71px;
    align-items: center;
    justify-content: unset;
    height: unset;

    select {
      width: 233px;
      margin-bottom: 4rem;
    }
    section {
      flex-direction: column;
    }
    h1 {
      margin-left: unset;
      margin-bottom: 4rem;
    }
    .bottom {
      display: none;
    }
    .bottom_mobile {
      display: block;
      font-size: 14px;
      line-height: 17px;
      color: #FFFFFF;
    }
  }
`;

function App() {
  
  const base = 'https://brainn-api-loterias.herokuapp.com/api/v1/';
  const [id, setId] = useState(0)
  const [first, setFirst] = useState('MEGA-SENA')
  const [numb, setNumb] = useState(2359);
  const [info, setInfo] = useState('4531 – 07/04/2020')
  const { data, isLoading, error } = useFetch(base+'loterias');
  const data2 = useFetch(base+'loterias-concursos');
  const data3:any = useFetch(base + 'concursos/' + numb);
  
  if(isLoading || data2.isLoading || data3.isLoading){
    return <p>carregando...</p>
  }
  if(error || data2.error || data3.error){
    return <p>Houve um problema...</p>
  }
  const colors = ['#6BEFA3', '#8666EF', '#DD7AC6', '#FFAB64', '#5AAD7D', '#BFAF83'];
  
  function handleEditData ({ e }: { e: any; }): void {
    
    const hoje = new Date(data3.data.data);
    const dataFormatada = new Intl.DateTimeFormat("pt-BR").format(hoje);
    const { nome } = data[e]
    const { concursoId } = data2.data[e]

    setId(e);
    setFirst(nome);
    setNumb(concursoId);
    setInfo(`${ concursoId } – ${dataFormatada}`);
  }

  return (
    <Wrapper>

      <div className="back">
        <Retangulo color={colors[id]}></Retangulo>
        <svg width="613" height="1080" viewBox="0 0 613 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M613 0C613 0 361.26 501.011 613 1080H0V0H613Z" fill={colors[id]}/>
        </svg>
      </div>

      <Main>
        <select onChange={(e) => handleEditData({ e: e.target.value })} name="loterias" id="loterias">
          {data.map((item:any)=> {
            return <option key={item.id} value={item.id}>{ item.nome.toUpperCase() }</option>
          })}
        </select>
        <section>
          <div className='logo'>
            <svg width="61" height="56" viewBox="0 0 61 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M20.6615 0.0412678C22.9312 0.0457177 25.1065 0.910103 26.7114 2.44521C28.3163 3.98032 29.2199 6.0611 29.2246 8.23206V26.5273H9.25368C7.9987 26.512 6.76258 26.233 5.63282 25.7101C4.50306 25.1872 3.50728 24.4331 2.71598 23.5013C1.92468 22.5694 1.3572 21.4826 1.05372 20.3177C0.750243 19.1528 0.718182 17.9383 0.959808 16.7603C1.20143 15.5822 1.71084 14.4694 2.45196 13.5005C3.19308 12.5316 4.1478 11.7305 5.24853 11.1537C6.34926 10.5769 7.56909 10.2386 8.82166 10.1627C10.0742 10.0869 11.3289 10.2753 12.4969 10.7147C12.0873 9.48668 11.9867 8.18345 12.2033 6.91117C12.4199 5.63888 12.9475 4.43351 13.7433 3.39321C14.5391 2.3529 15.5805 1.50707 16.7827 0.924597C17.9849 0.34212 19.3139 0.0394621 20.6615 0.0412678ZM40.2192 55.3497C37.9494 55.3453 35.774 54.4807 34.1693 52.9454C32.5645 51.4101 31.6612 49.3291 31.657 47.158V28.8628H51.6251C52.8807 28.8774 54.1175 29.1559 55.248 29.6786C56.3785 30.2012 57.3751 30.9553 58.167 31.8873C58.959 32.8194 59.5269 33.9066 59.8307 35.072C60.1345 36.2373 60.1667 37.4524 59.925 38.6309C59.6832 39.8095 59.1735 40.9229 58.4319 41.892C57.6903 42.8612 56.735 43.6626 55.6336 44.2393C54.5322 44.8161 53.3116 45.1541 52.0585 45.2294C50.8053 45.3048 49.5501 45.1156 48.3819 44.6754C48.7917 45.9033 48.8924 47.2065 48.676 48.4788C48.4596 49.751 47.9321 50.9564 47.1366 51.9968C46.341 53.0372 45.2998 53.8831 44.0977 54.4658C42.8956 55.0484 41.5667 55.3513 40.2192 55.3497Z" fill="white"/>
            </svg>
            <svg width="61" height="56" viewBox="0 0 61 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M20.661 55.3497C22.9307 55.3453 25.106 54.4809 26.7109 52.9458C28.3158 51.4107 29.2194 49.3299 29.2241 47.1589V28.8628H9.25318C7.99763 28.8774 6.76079 29.1559 5.63028 29.6786C4.49977 30.2012 3.50325 30.9553 2.71131 31.8873C1.91937 32.8194 1.35138 33.9066 1.04759 35.072C0.743791 36.2373 0.711621 37.4524 0.953355 38.6309C1.19509 39.8095 1.70481 40.9229 2.44642 41.892C3.18802 42.8612 4.14336 43.6626 5.24476 44.2393C6.34616 44.8161 7.56668 45.1541 8.81985 45.2294C10.073 45.3048 11.3282 45.1156 12.4964 44.6754C12.0866 45.9035 11.9859 47.2068 12.2024 48.4792C12.4189 49.7516 12.9465 50.9571 13.7423 51.9975C14.5381 53.0379 15.5796 53.8839 16.7819 54.4664C17.9841 55.0489 19.3133 55.3516 20.661 55.3497ZM40.2186 0.0412652C37.9492 0.0459492 35.7741 0.910438 34.1694 2.44552C32.5647 3.9806 31.6612 6.06124 31.6565 8.23206V26.5264H51.6246C52.8796 26.5111 54.1157 26.2321 55.2455 25.7092C56.3753 25.1863 57.371 24.4322 58.1623 23.5004C58.9536 22.5685 59.5211 21.4817 59.8246 20.3168C60.1281 19.1519 60.1601 17.9374 59.9185 16.7594C59.6769 15.5813 59.1675 14.4685 58.4264 13.4996C57.6852 12.5308 56.7305 11.7296 55.6298 11.1528C54.529 10.576 53.3092 10.2377 52.0566 10.1618C50.8041 10.086 49.5494 10.2744 48.3814 10.7138C48.7908 9.48599 48.8913 8.18302 48.6747 6.91099C48.4581 5.63895 47.9306 4.43382 47.1351 3.39366C46.3395 2.35351 45.2984 1.50774 44.0966 0.925189C42.8947 0.342642 41.566 0.0397836 40.2186 0.0412652Z" fill="white"/>
            </svg>
          </div>
          <h1>{ first.toUpperCase() }</h1>
        </section>
        <p className='bottom_mobile'>CONCURSO Nº { numb }</p>
        <section className='bottom'>
          <p data-testid={"pure_button"}>CONCURSO</p>
          <h3>{info}</h3>
        </section>
      </Main>

      <Number num={data3.data.numeros}/>
      
    </Wrapper>
  )
}

export default App
