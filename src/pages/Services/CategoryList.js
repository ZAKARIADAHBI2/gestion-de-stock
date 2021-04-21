import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import firbasecategorie from '../../firbasecategorie';
import 'bootstrap/dist/css/bootstrap.css';


class CategoryList extends Component {

  constructor(props) {
    super(props);
    this.state = {categories: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount = () => {
    firbasecategorie.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount = () => {
    firbasecategorie.getAll().off("value", this.onDataChange);
  }

  onDataChange = (items) => {
    console.log(items);
    let categories = [];
    items.forEach(item => {
      let data = item.val();
      categories.push({
        key: item.key,
       name:data.name,
       description  : data.description 
  
       
        
      });
    });

    this.setState({
      categories: categories,
      isLoading: false
    });
  }

  async remove(key) {
    firbasecategorie.delete(key)
    .then(() => {
      let updatedCategorie = [...this.state.categories].filter(i => i.key !== key);
      this.setState({categories: updatedCategorie});
    });
  }

  render() {
    const {categories, isLoading} = this.state;

    const CategoryList = categories.map(categorie => {
      return <tr key={categorie.key}>
        <td style={{whiteSpace: 'nowrap'}}>{categorie.name}</td>
        <td >{categorie.description}</td>
      
       
     
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/categories/" + categorie.key}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(categorie.key)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/categories/new">Add Categorie</Button>
          </div>
          <h3>Categorie List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Categorie</th>
                <th width="20%">Dsecripetion</th>
              
                <th width="20%">Actions</th>
              </tr>
            </thead>
            <tbody>
            {CategoryList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}
export default CategoryList;