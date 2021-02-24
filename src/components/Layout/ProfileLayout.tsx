import React from 'react';
import Container from 'react-bootstrap/Container';

import { Header } from '../Header';
import { Footer } from '../Footer';

export const ProfileLayout: React.FC = ({ children }) => {
  return (
    <Container fluid>
      <Header />
      {children}
      <Footer />
    </Container>
  );
};
