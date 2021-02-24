import React, { useCallback, useEffect } from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import { Spacer } from '../../components/Spacer';
import { Typography } from '../../components/Typography';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './InsuranceGallery.module.scss';
import { getInsuranceThumbnails, selectInsuranceThumbnails } from './insuranceSlice';
import { useDispatch, useSelector } from 'react-redux';

/*const getListOfCarouselPlugins = (numberOfSlides: number) => {
  return [
    'infinite',
    'centered',
    {
      resolve: slidesToShowPlugin,
      options: {
        numberOfSlides,
      },
    },
    {
      resolve: arrowsPlugin,
      options: {
        arrowLeft: <div className={styles.leftArrow} />,
        arrowLeftDisabled: <div className={styles.leftArrow} />,
        arrowRight: <div className={styles.rightArrow} />,
        arrowRightDisabled: <div className={styles.rightArrow} />,
        addArrowClickHandler: true,
      },
    },
  ];
};*/

export const InsuranceGallery: React.FC = () => {
  const dispatch = useDispatch();

  const getInsuranceThumbnailsAction = useCallback(() => dispatch(getInsuranceThumbnails()), [dispatch]);

  const insuranceThumbnails = useSelector(selectInsuranceThumbnails);

  useEffect(() => {
    getInsuranceThumbnailsAction();
  }, [getInsuranceThumbnailsAction]);

  console.log(Object.keys(insuranceThumbnails));

  return (
    <React.Fragment>
      <Spacer variant="red-spacer" />
      <Typography variant="h3">KNOWLEDGE</Typography>
      <Spacer variant="small" />
      <Typography variant="h1">Managing Insurance</Typography>
      <Spacer variant="large" />

      {Object.keys(insuranceThumbnails).map((title) => (
        <React.Fragment key={title}>
          <Typography variant="h2">{title}</Typography>
          <Spacer variant="medium" />
          <Row>
            <Col>
              <Carousel
                slidesPerPage={4}
                arrows
                infinite
                centered
                addArrowClickHandler
                arrowLeft={<div className={styles.leftArrow} />}
                arrowRight={<div className={styles.rightArrow} />}
                arrowLeftDisabled={<div className={styles.leftArrow} />}
                arrowRightDisabled={<div className={styles.rightArrow} />}
              >
                {insuranceThumbnails[title].map((image, index) => (
                  <img
                    key={index}
                    src={image.images.low}
                    srcSet={`${image.images.low} 1x, ${image.images.medium} 2x, ${image.images.high} 3x`}
                    alt="Gallery Thumbnail"
                    className={styles.imageThumbnail}
                  />
                ))}
              </Carousel>
            </Col>
          </Row>
          <Spacer variant="medium" />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
