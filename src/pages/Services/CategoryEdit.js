import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import firbasecategorie from '../../firbasecategorie';
import 'bootstrap/dist/css/bootstrap.css';


class CategoryEdit extends Component {
  emptyCATEGORIE = {
    key: '',
  name:'',
  description: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyCATEGORIE
    };
  }

  componentDidMount = () => {
    let key = this.props.match.params.key
    if (key !== 'new') {
      firbasecategorie.get(key).on("value", this.onDataChange);
    }
  }

  componentWillUnmount = () => {
    firbasecategorie.getAll().off("value", this.onDataChange);
  }

  onDataChange = (item) => {
    let data = item.val();
    let categorie = {
      key: item.key,
     name: data.name,
     description  : data.description 

    
    };

    this.setState({
      item: categorie,
    });
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {item} = this.state;
    let key = this.props.match.params.key
    if (key !== 'new') {
      firbasecategorie.update(key, item);
    } else {
      firbasecategorie.addCategory(item);
    }

    this.props.history.push('/categories');
  };

  render = () => {
    
    const {item} = this.state;
    const title = <h2>{item.key ? 'Edit categorie' : 'Add categorie'}</h2>;

    return <div>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Categorie</Label>
            <Input type="text" name="name" id="productname" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="description">description</Label>
            <Input type="text" name="description" id="description" value={item.description || ''}
                   onChange={this.handleChange} autoComplete="description"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/categories">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(CategoryEdit);