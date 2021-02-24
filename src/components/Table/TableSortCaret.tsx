import React from 'react';

import sortCaretDefaultSvg from '../../common/images/sort-caret-default.svg';
import sortCaretUpSvg from '../../common/images/sort-caret-up.svg';
import sortCaretDownSvg from '../../common/images/sort-caret-down.svg';

export const TableSortCaret = (order?: string) => {
  if (!order)
    return (
      <span>
        &nbsp;&nbsp;
        <img src={sortCaretDefaultSvg} alt="Default sorting" width={12} height={19} />
      </span>
    );
  else if (order === 'asc')
    return (
      <span>
        &nbsp;&nbsp;
        <img src={sortCaretUpSvg} alt="Up sorting" width={12} height={19} />
      </span>
    );
  else if (order === 'desc')
    return (
      <span>
        &nbsp;&nbsp;
        <img src={sortCaretDownSvg} alt="Down sorting" width={12} height={19} />
      </span>
    );
  return null;
};
