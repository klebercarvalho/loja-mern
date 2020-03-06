import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import lixeira from './img/lixeira.png';

class App extends Component {

  constructor() {
    super();

    this.state = {
      produto: {
        descricao: '',
        categoria: 'Eletrônicos'
      },
      produtos: []
    };

    this.urlAPI = 'http://localhost:4000/produtos';
    this.aoAlterarValorDoCampo = this.aoAlterarValorDoCampo.bind(this);
    this.recuperarProdutos = this.recuperarProdutos.bind(this);
    this.salvar = this.salvar.bind(this);
    this.remover = this.remover.bind(this);
  }

  componentDidMount() {
    this.recuperarProdutos();
  }

  aoAlterarValorDoCampo(evento) {
    const nome = evento.target.name;
    const valor = evento.target.value;

    let produto = { ...this.state.produto };
    produto[nome] = valor;
    this.setState({ produto });
  }

  salvar(evento) {
    evento.preventDefault();

    axios
      .post(this.urlAPI, this.state.produto)
      .then(() => {
        let produto = {
          descricao: '',
          categoria: 'Eletrônicos'
        };
        this.setState({ produto });
        this.recuperarProdutos();
      });
  }

  remover(id) {
    axios
      .delete(`${this.urlAPI}/${id}`)
      .then(() => this.recuperarProdutos());
  }

  recuperarProdutos() {
    axios
      .get(this.urlAPI)
      .then(resposta => this.setState({ produtos: resposta.data }));
  }

  render() {
    const listaProdutos = this.state.produtos.map(
      produto => {
        return (
          <tr key={produto._id}>
            <td>{produto.descricao}</td>
            <td>{produto.categoria}</td>
            <td>
              <button onClick={() => this.remover(produto._id)}><img src={lixeira} alt="Remover" /></button>
            </td>
          </tr>
        );
      }
    );

    return (
      <div>

        <div id="banner">
          <h1>Loja</h1>
        </div>

        <div id="conteiner">

          <div id="formulario">
            <form onSubmit={this.salvar}>
              <div className="grupoFormulario">
                <label htmlFor="descricao">Descrição</label>
                <input
                  type="text"
                  value={this.state.produto.descricao}
                  id="descricao"
                  name="descricao"
                  onChange={this.aoAlterarValorDoCampo}
                  required />
              </div>
              <div className="grupoFormulario">
                <label htmlFor="categoria">Categoria</label>
                <select
                  name="categoria"
                  id="categoria"
                  value={this.state.produto.categoria}
                  onChange={this.aoAlterarValorDoCampo} >
                  <option value="Eletrônicos">Eletrônicos</option>
                  <option value="Eletrodomésticos">Eletrodomésticos</option>
                  <option value="Eletrônicos">Alimentos</option>
                  <option value="Eletrônicos">Higiene Pessoal</option>
                </select>
              </div>
              <input id="botaoSalvar" type="submit" value="Salvar" />
            </form>
          </div>

          {
            this.state.produtos.length > 0 &&
            <div id="listagemProdutos">
              <table>
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {listaProdutos}
                </tbody>
              </table>
            </div>
          }

        </div>
      </div>
    );
  }
}

export default App;
