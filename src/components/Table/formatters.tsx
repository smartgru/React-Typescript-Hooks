import React, { useState } from 'react';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import isValid from 'date-fns/isValid';

import styles from './formatters.module.scss';
import { Link } from 'react-router-dom';
import { Modal } from '../Modal';
import { BetterRates } from '../../types';

export const priceFormatter = (cell: string) => {
  return <span>${cell}</span>;
};

export const percentageFormatter = (cell: string) => {
  return <span>{cell}%</span>;
};

export const dateFormatter = (dateFormat: string) => (cell: string) => {
  if (!isValid(parseISO(cell))) {
    return '';
  }
  return <span>{format(parseISO(cell), dateFormat)}</span>;
};

export const editIconFormatter = (cell: number, _: unknown, __: unknown, formatExtraData: Record<string, string>) => {
  return (
    <Link
      to={{
        pathname: formatExtraData.baseUrl + cell,
        state: { background: formatExtraData.locationObj },
      }}
    >
      <span className={styles.editIcon} />
    </Link>
  );
};

export const deleteIconFormatter = (
  cell: number,
  row: Record<string, number>,
  __: unknown,
  formatExtraData: Record<string, (id: number) => void | string>,
) => {
  return <span className={styles.deleteIcon} onClick={() => formatExtraData.clickHandler(row.id)} />;
};

export const betterRatesModalFormatter = (cell: BetterRates) => {
  const BetterRatesModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <React.Fragment>
        <Link to="#" onClick={() => setIsOpen(true)}>
          Better Rates
        </Link>
        <Modal
          title={['Better', 'Rates']}
          show={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          {cell.length > 0
            ? cell.map((rate) => (
                <p key={rate.institution}>
                  <strong>Institution:</strong> {rate.institution}
                  <br />
                  <strong>Type:</strong> {rate.type}
                  <br />
                  <strong>Rate:</strong> {rate.rate} %
                  <br />
                </p>
              ))
            : 'No Better Rates available.'}
        </Modal>
      </React.Fragment>
    );
  };

  return <BetterRatesModal />;
};
