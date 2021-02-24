import React from 'react';
import { default as BootstrapTable, BootstrapTableProps, PaginationOptions } from 'react-bootstrap-table-next';
import {
  default as paginationFactory,
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Form from 'react-bootstrap/Form';

import styles from './Table.module.scss';
import { Spacer } from '../Spacer';

const { SearchBar } = Search;

const handleSizePerPage = ({ page, onSizePerPageChange }: PaginationOptions, newSizePerPage: number) => {
  onSizePerPageChange && onSizePerPageChange(newSizePerPage, page ? page : 10);
};

const customPaginationTotal = (from: number, to: number, size: number) => (
  <div className={styles.paginationColor}>
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} entries
    </span>
  </div>
);

export type TableProps = BootstrapTableProps;

export const Table: React.FC<TableProps> = ({ columns, data, ...otherProps }) => {
  const modifiedColumns = columns.map((column) => {
    return {
      ...column,
      footer: column.text,
    };
  });

  const paginationOptions = {
    custom: true,
    totalSize: data.length,
    sizePerPage: 10,
  };

  return (
    <ToolkitProvider keyField="id" data={data} columns={columns} search>
      {(toolkitProps) => (
        <PaginationProvider pagination={paginationFactory(paginationOptions)}>
          {({ paginationProps, paginationTableProps }) => (
            <React.Fragment>
              <Spacer variant="small" />
              <div className="d-flex align-items-center">
                <div className={styles.paginationShowEntries}>
                  Show
                  <Form.Control
                    as="select"
                    className={styles.paginationShowEntriesSelect}
                    onChange={(e) => handleSizePerPage(paginationProps, parseInt(e.currentTarget.value, 10))}
                    defaultValue={10}
                  >
                    <option value={1}>1</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                  </Form.Control>
                  entries
                </div>
                <div className="ml-auto">
                  <SearchBar {...toolkitProps.searchProps} />
                </div>
              </div>
              <Spacer variant="small" />

              <BootstrapTable
                {...otherProps}
                {...toolkitProps.baseProps}
                {...paginationTableProps}
                data={data}
                columns={modifiedColumns}
                striped
                classes={styles.tableContainer}
                headerClasses={styles.tableHeader}
                footerClasses={styles.tableFooter}
              />
              <Spacer variant="small" />
              <div className="d-flex align-items-center">
                <PaginationTotalStandalone {...paginationProps} paginationTotalRenderer={customPaginationTotal} />
                <div className="ml-auto">
                  <PaginationListStandalone
                    {...paginationProps}
                    hidePageListOnlyOnePage
                    alwaysShowAllBtns
                    withFirstAndLast={false}
                    nextPageText="Next"
                    prePageText="Previous"
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        </PaginationProvider>
      )}
    </ToolkitProvider>
  );
};
