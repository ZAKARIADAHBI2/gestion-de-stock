import React, { Component } from 'react';
import { InfoSection, Pricing } from '../../components';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import loogo from '../../images/pro.jpg';

import { Link } from 'react-router-dom';
import FirebaseService from '../../FirebaseService';
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {customers: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount = () => {
    FirebaseService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount = () => {
    FirebaseService.getAll().off("value", this.onDataChange);
  }

  onDataChange = (items) => {
    console.log(items);
    let customers = [];
    items.forEach(item => {
      let data = item.val();
      customers.push({
        key: item.key,
        productname: data.productname,
        Price: data.Price,
        Quntite: data.Quntite,
        category: data.category,
        image: data.image

       
        
      });
    });

    this.setState({
      customers: customers,
      isLoading: false
    });
  }

  async remove(key) {
    FirebaseService.delete(key)
    .then(() => {
      let updatedCustomers = [...this.state.customers].filter(i => i.key !== key);
      this.setState({customers: updatedCustomers});
    });
  }

  render() {
    const {customers, isLoading} = this.state;
    const styles={
      width:"20%",
      display:"inline-block",
      padding:"1%"
    }
    const btnn={
  padding: "1rem 4rem",
  border: "none",
  background: "#e31837",
  color: "#fff",
  transition: "0.2 ease-out"
 
    }
    const hhh={
      fontsize: "clamp(2rem, 2.5vw, 3rem)",
  textalign: "center",
  marginbottom: "5rem",
  
    }
    const customerList = customers.map(customer => {
      return <div style={styles} class="product-grid">
                  <div class="product-image">
                      <a href="#">
                          <img class="pic-1" src={loogo}/></a>
                  </div>
                  <div class="product-content">
                      <h3 class="title">
                          <a href="#">{customer.productname}</a>
                      </h3>
                      <div class="price">{customer.Price}</div>
                  </div>
                  <button style={btnn}
              className="btn-custom"
           
            >
              Add to cart
            </button>
              </div>
            
         
      
    });
              
   

    return (
      <div>
        
        <Container fluid>
            {customerList}
            
        </Container>
      </div>
    );
  }
}

export default Home;