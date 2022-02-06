import React, { Component } from "react";
import { Table } from "react-bootstrap";
import loading from '../../assets/img/loading.gif'; // with import
class CustomTable extends Component {


    setIndices(indice) {
        return <th className="border-0" key={indice}>{indice}</th>
    }
    setContents(contents) {
        return contents == null ? <tr  key={1}><td colSpan={4}><center><img src={loading} /></center></td></tr> : <tr  key={contents.id}><td>{contents.id}</td><td>{contents.nome}</td><td>{contents.quantidade + '' + contents.medida}</td><td>{contents.categoria}</td></tr>
    }

    render() {
        return (
            <Table className="table-hover table-striped">
                <thead>
                    <tr>
                        {this.props.indices.map(indice => this.setIndices(indice))}
                    </tr>
                </thead>
                <tbody id="productBodyTable">
                    {this.props.contents.map(contents => this.setContents(contents))}
                </tbody>
            </Table>
        );
    }
}

export default CustomTable;
