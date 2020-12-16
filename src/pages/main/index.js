import React, { Component } from "react";
import api from '../../services/api';

import "./styles.css";

export default class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      products: [],
      snome: "",
      sqtde: 0,
      svalor: 0,
      option: "Produtos",
    }
  
    this.setarNome = this.setarNome.bind(this);
    this.setarQtde = this.setarQtde.bind(this);
    this.setarValor = this.setarValor.bind(this);
  }
  
  
  setarNome(event) {this.setState({snome: event.target.value});}
  setarQtde(event) {this.setState({sqtde: event.target.value});}
  setarValor(event) {this.setState({svalor: event.target.value});}

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    const response = await api.get('/');
    
    this.setState({products: response.data.produto});
  }

  insertProduct = async () => {
    if(this.state.snome == "" || this.state.sqtde == 0 || this.state.svalor == 0)
    {
      alert("Preencher todos os valores corretamente!")
    } else {
      const response = await api.post('/', {nome: this.state.snome, qtde: this.state.sqtde, valor: this.state.svalor});
      this.loadProducts();
      alert("Dados inseridos com sucesso!");
    }
  }

  decrementar = async (idx, op) => {
    const response = await api.put('/',{id: idx, action: op});
    this.loadProducts();
  }

  remover = async (id) => {
      console.log(id);
      if(window.confirm("Tem certeza que quer excluir?")) {
        const response = api.delete('/', {
          data: {
            id: id
        }
       });
      } 
      window.location.reload();
  }

  render() {
    return (
      <div className="products-div">
        <div className = "app-products">
          <div className="row product-table">
            <table>
              <tr>
                <th>Nome do Produto</th>
                <th>Quantidade em estoque</th>
                <th>Valor(R$)</th>
                <th>Quantidade</th>
                <th>EXCLUIR PRODUTO</th>
              </tr>
              {this.state.products.map(product => (
              <tr key = {product.id}>
                <td>{product.nome}</td>
                <td>{product.qtde}</td>
                <td>{product.valor}</td>
                <td>
                <input type="button" onClick = {() => this.decrementar(product.id, 1)} className="btn btn-success" value="Adicionar"></input>
                <input type="button" onClick = {() => this.decrementar(product.id, 2)} className="btn btn-danger" value="Remover"></input>
                </td>
                <td>
                <input type="button" onClick = {() => this.remover(product.id)} className="btn btn-danger" value="X"></input>
                </td>
              </tr>
              ))}
            </table>
          </div>
          <div className="product-operations-holder">
            <div className = "product-add">
              <h6>Inserir novo produto:</h6>
              <form>
              <label>Nome:  </label>
              <input value={this.state.nome} onChange={this.setarNome} size = "15" type = "text"></input>
              <label>  Quantidade:  </label>
              <input value={this.state.sqtde} onChange={this.setarQtde} size = "4" type = "text"></input>
              <label>  Preço:  </label>
              <input value={this.state.svalor} onChange={this.setarValor} size = "6" type = "text"></input>
              <input type="button" onClick = {this.insertProduct} className="btn btn-success" value="Adicionar"></input>
              </form>
            </div>
        </div>
      </div>
      </div>
    );
  }
}
