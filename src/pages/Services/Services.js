import React from 'react';
import { InfoSection, Pricing } from '../../components';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import CategoryList from './CategoryList';
import CategoryEdit from './CategoryEdit';
function Services() {
  return (
    <>
        <Container fluid>
   <CategoryList />
        </Container>
    </>
  );
}

export default Services;
