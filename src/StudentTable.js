import React, { Component } from 'react';
import './App.css';
import ReactTable from "react-table";
import "react-table/react-table.css";

class StudentTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            jsondata : [],
            coldata : []
        }
    }

    
    componentDidMount(){
        this.setState({loading:true})
        Promise.all([fetch('./data.json'),fetch('./columns.json')])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => {
            this.setState({
            loading: false,
            jsondata : data1, 
            coldata : data2
        })
    });
    }

  render() {
    const text = this.state.loading ? "loading...." : <ReactTable 
                                                        className ="-highlight" 
                                                        data={this.state.jsondata} 
                                                        columns={this.state.coldata} 
                                                        defaultPageSize = {5}
                                                        pageSizeOptions = {[5,10,20]} />;
    const styles = {
        paddingLeft:25,
        paddingRight:25,
        paddingTop:30,
        paddingBottom:50
        }
    return (
      <div style ={styles}>
        {text}
      </div> 
    );
  }
}

export default StudentTable;