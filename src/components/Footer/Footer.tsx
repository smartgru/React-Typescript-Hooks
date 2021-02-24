import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col className={styles.footerContainer}>
          <hr />
          Copyright © 2020 Arctic Rich Inc. All rights reserved.
        </Col>
      </Row>
    </Container>
  );
};
