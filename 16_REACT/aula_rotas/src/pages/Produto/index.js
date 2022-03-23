import { useParams } from "react-router-dom";


function Produto() {
  const {id} = useParams();
    return (
      <div>
        
        <h1>Grade de produto Produto</h1>
        <span>Produto selecionado: {id}</span>
      </div>
    );
  }
  
  export default Produto;