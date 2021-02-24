import React from 'react';
import Container from 'react-bootstrap/Container';

import { Header } from '../Header';
import { Footer } from '../Footer';

export const RegularLayout: React.FC = ({ children }) => {
  return (
    <Container fluid>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </Container>
  );
};
