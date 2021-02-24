import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import { signOut } from '../../features/auth/authSlice';

import styles from './Header.module.scss';
import logo from '../../common/images/logo.svg';
import headerButton1 from '../../common/images/header-button-1.svg';
import headerButton2 from '../../common/images/header-button-2.svg';

import profileIcon from '../../common/images/profile-icon.svg';
import signOutIcon from '../../common/images/sign-out-icon.svg';

const menuMapping = [
  {
    baseUrl: '/save',
    label: 'Save',
    items: [
      {
        url: '/save/investment',
        label: 'Investment',
      },
      {
        url: '/save/insurance',
        label: 'Insurance',
      },
    ],
  },
  {
    baseUrl: '/sync',
    label: 'Sync',
    items: [
      {
        url: '/sync/balance',
        label: 'Balance',
      },
      {
        url: '/sync/transaction',
        label: 'Transaction',
      },
    ],
  },
];

const profilePopover = (
  <Popover id="popover-profile">
    <Popover.Content>
      <div className="popover-container">
        <div className="popover-block">
          <img src={profileIcon} alt="Arctic Rich Account" width={16} height={16} />
          <Link to="/user/profile">Account</Link>
        </div>
        <div className="popover-line" />
        <div className="popover-block">
          <img src={signOutIcon} alt="Arctic Rich Sign Out" width={16} height={16} />
          <Link to="#" onClick={() => signOut()}>
            Sign Out
          </Link>
        </div>
      </div>
    </Popover.Content>
  </Popover>
);

export const Header: React.FC = () => {
  const location = useLocation();
  const [secondaryMenuItems, setSecondaryMenuItems] = useState<{ url: string; label: string }[]>([]);

  useEffect(() => {
    const foundDefaultSecondaryMenuItems = menuMapping.find((item) => location.pathname.indexOf(item.baseUrl) > -1);

    if (foundDefaultSecondaryMenuItems) {
      setSecondaryMenuItems(foundDefaultSecondaryMenuItems.items);
    }
  }, [location.pathname]);

  const primaryMenuItemClickHandler = (e: React.MouseEvent, baseUrl: string) => {
    e.preventDefault();
    const foundSecondaryMenuItems = menuMapping.find((item) => item.baseUrl === baseUrl);

    if (foundSecondaryMenuItems) {
      setSecondaryMenuItems(foundSecondaryMenuItems.items);
    } else {
      setSecondaryMenuItems([]);
    }
  };

  return (
    <>
      <Row className={styles.primaryContainer}>
        <Col xs="2" className="text-right">
          <img src={logo} alt="Arctic Rich" width={162} height={54} />
        </Col>
        <Col xs="8">
          <Nav fill defaultActiveKey="/" className={styles.primaryNav + ' d-flex align-items-center'} as="ul">
            <Nav.Item as="li" className="d-flex align-items-center justify-content-center">
              <LinkContainer to="/mission" onClick={(e) => primaryMenuItemClickHandler(e, '/mission')}>
                <div>Mission</div>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item as="li" className="d-flex align-items-center justify-content-center">
              <LinkContainer to="/income" onClick={(e) => primaryMenuItemClickHandler(e, '/income')}>
                <div>Income</div>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item as="li" className="d-flex align-items-center justify-content-center">
              <LinkContainer to="/expense" onClick={(e) => primaryMenuItemClickHandler(e, '/expense')}>
                <div>Expense</div>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item as="li" className="d-flex align-items-center justify-content-center">
              <LinkContainer to="/save" onClick={(e) => primaryMenuItemClickHandler(e, '/save')}>
                <div>Save</div>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item as="li" className="d-flex align-items-center justify-content-center">
              <LinkContainer to="/loan" onClick={() => setSecondaryMenuItems([])}>
                <div>Loan</div>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item as="li" className="d-flex align-items-center justify-content-center">
              <LinkContainer to="/asset" onClick={(e) => primaryMenuItemClickHandler(e, '/asset')}>
                <div>Asset</div>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item as="li" className="d-flex align-items-center justify-content-center">
              <LinkContainer to="/sync" onClick={(e) => primaryMenuItemClickHandler(e, '/sync')}>
                <div>Sync</div>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs="2" className="d-flex align-items-center">
          <Link to="#" className="pr-4">
            <img src={headerButton2} alt="Arctic Rich Notifications" width={24} height={30} />
          </Link>
          <OverlayTrigger trigger="click" placement="bottom" overlay={profilePopover}>
            <Link to="#">
              <img src={headerButton1} alt="Arctic Rich Profile" width={25} height={28} />
            </Link>
          </OverlayTrigger>
        </Col>
      </Row>
      {secondaryMenuItems.length > 0 ? (
        <Row className={styles.secondaryContainer}>
          <Col>
            <Nav defaultActiveKey="/" className={styles.secondaryNav + ' d-flex justify-content-center'} as="ul">
              {secondaryMenuItems.map((item) => (
                <React.Fragment key={item.url}>
                  <Nav.Item as="li" className="d-flex align-items-center">
                    <LinkContainer to={item.url}>
                      <div>{item.label}</div>
                    </LinkContainer>
                  </Nav.Item>
                </React.Fragment>
              ))}
            </Nav>
          </Col>
        </Row>
      ) : null}
      <Row className={styles.gradient} />
    </>
  );
};
