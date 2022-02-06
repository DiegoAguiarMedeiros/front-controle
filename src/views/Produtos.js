import React from "react";
import CustomTable from "../components/CustomTable/CustomTable";
import CustomModal from "../components/CustomModal/CustomModal";
import CustomAlert from "../components/CustomAlert/CustomAlert";

// react-bootstrap components
import {
  Alert,
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
const indices = ['ID', 'NOME', 'MEDIDA', 'CATEGORIA']
const productState = {
  table: [null],
  showAlert: null
}

const formNewCategoria = [
  {
    "key": "1",
    "controlId": "name.formNewCategoria",
    "className": "mb-3",
    "label": "Nome",
    "placeholder": "Nome",
    "type": "text",
  }
]
const formNewProduct = [
  {
    "key": "1",
    "controlId": "name.formNewProduct",
    "className": "mb-3",
    "label": "Nome",
    "placeholder": "Nome",
    "type": "text",
  },
  {
    "key": "2",
    "controlId": "medida.formNewProduct",
    "className": "mb-3",
    "label": "Medida",
    "placeholder": "3 litors",
    "type": "select",
    "optionDefault": "Selecionar Tipo Medida",
    "option": []
  },
  {
    "key": "3",
    "controlId": "qtd.formNewProduct",
    "className": "mb-3",
    "label": "Quantidade",
    "placeholder": "3 litors",
    "type": "Number",
  },
  {
    "key": "4",
    "controlId": "categoria.formNewProduct",
    "className": "mb-3",
    "label": "Categoria",
    "placeholder": "3 litors",
    "type": "select",
    "optionDefault": "Selecionar Categoria",
    "option": []
  }
]

class Produtos extends React.Component {

  constructor(props) {
    super(props)
    this.displayAlert = []

    this.setProdutc = this.setProdutc.bind(this)
    this.addProduct = this.addProduct.bind(this)
    this.addCategoria = this.addCategoria.bind(this)
    this.showAlertReturn = this.showAlertReturn.bind(this)
    this.registerProduct = this.registerProduct.bind(this)
    this.registerCategoria = this.registerCategoria.bind(this)
  }



  auth = {
    token: null
  }

  state = { productState }



  async getToken(params, callback, next, err) {
    const requestOptions = {
      method: 'GET'
    }
    var response = await fetch('http://localhost:3000/api/auth?user=user&password=1234', requestOptions)
      .then(response => response.json())
      .then(token => callback(token.token, next, null))
  }

  setProdutc(produtc) {
    productState.table = produtc
    this.setState({ productState })
  }
  setMedida(medidas) {
    console.log(medidas)
    formNewProduct[1].option = []
    medidas.map(medida => {
      formNewProduct[1].option.push({
        "value": medida.id,
        "label": medida.medida
      })
    })
  }
  setCategoria(categorias) {

    formNewProduct[3].option = []
    categorias.map(categoria => {
      formNewProduct[3].option.push({
        "value": categoria.id,
        "label": categoria.nome
      })
    })
  }
  async getProdutcs(params, callback, err) {

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'GET',
      headers: {
        authorization: params
      }
    }
    let produtcs = await fetch('http://localhost:3000/api/produtos', requestOptions)
      .then(response => response.json())
      .then(produtcs => callback(produtcs));
  }
  async getMedida(params, callback, err) {

    const requestOptions = {
      method: 'GET',
      headers: {
        authorization: params
      }
    }
    let medidas = await fetch('http://localhost:3000/api/medidas', requestOptions)
      .then(response => response.json())
      .then(medida => callback(medida));
  }
  async getCategoria(params, callback, err) {

    const requestOptions = {
      method: 'GET',
      headers: {
        authorization: params
      }
    }
    let categorias = await fetch('http://localhost:3000/api/categorias', requestOptions)
      .then(response => response.json())
      .then(categoria => callback(categoria));
  }

  async addCategoria() {
    await this.getToken(null, this.registerCategoria, this.showAlertReturn, null)
  }
  async addProduct() {
    await this.getToken(null, this.registerProduct, this.showAlertReturn, null)
  }

  showAlertReturn(retorno){
    console.log(retorno)
    let type = ""
    let message = ""

    if(retorno.success == 1){
      type = "success"
      message = retorno.mensagem
    }else{
      type = "danger"
      message = retorno.errorMensagem
    }
    this.showAlert(type,message)
  }

  async registerCategoria(params, callback, err){

    let nome = document.getElementById('name.formNewCategoria').value

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        nome: nome
      }),
      headers: {
        authorization: params,
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      }
    }
    console.log(requestOptions)
    let retorno = await fetch('http://localhost:3000/api/categoria/novo', requestOptions)
      .then(response => response.json())
      .then(resposta => callback(resposta))
      .then(await this.getToken(null, this.getCategoria, this.setCategoria, null))
  }
  async registerProduct(params, callback, err){

    let nome = document.getElementById('name.formNewProduct').value
    let medida = document.getElementById('medida.formNewProduct').value
    let qtd = document.getElementById('qtd.formNewProduct').value
    let categoria = document.getElementById('categoria.formNewProduct').value

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        nome: nome,
        medida:medida,
        qtd:qtd,
        categoria:categoria
      }),
      headers: {
        authorization: params,
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      }
    }

    let retorno = await fetch('http://localhost:3000/api/produto/novo', requestOptions)
      .then(response => response.json())
      .then(resposta => callback(resposta))
      .then(await this.getToken(null, this.getProdutcs, this.setProdutc, null))
  }

  showAlert(type,message) {
    this.displayAlert.unshift(<CustomAlert type={type} message={message}/>);
    this.setState({
      showAlert: this.displayAlert
    });
  }
  async componentDidMount() {

    await this.getToken(null, this.getProdutcs, this.setProdutc, null)
    await this.getToken(null, this.getMedida, this.setMedida, null)
    await this.getToken(null, this.getCategoria, this.setCategoria, null)

  }
  render() {
    return <>

      <Container fluid>
        {this.state.showAlert}
      </Container>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Row>
                  <Col md="4">
                    <CustomModal modalTitle="Novo Produto" form={formNewProduct} action={this.addProduct} />
                    <CustomModal modalTitle="Nova Categoria" form={formNewCategoria} action={this.addCategoria} />
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <CustomTable indices={indices} contents={this.state.productState.table} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>;
  }
}

export default Produtos;
