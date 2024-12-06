import React from 'react';

const TableHeader = ({ columns, sortConfig, onSort, onFilter, styles }) => {
  return (
    <thead>
      <tr style={{ backgroundColor: styles.headerBackgroundColor, color: styles.headerFontColor, fontSize: styles.headerFontSize }}>
        {columns.map((col) => (
          <th
            key={col.key}
            style={{ cursor: col.sortable ? 'pointer' : 'default', padding: '10px', borderBottom: '2px solid #ddd' }}
            onClick={() => col.sortable && onSort(col.key)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {col.title}
              {col.sortable && (
                <span>
                  {sortConfig.key === col.key && sortConfig.direction === 'asc' && '▲'}
                  {sortConfig.key === col.key && sortConfig.direction === 'desc' && '▼'}
                  {sortConfig.key !== col.key && '↕'}
                </span>
              )}
            </div>
            {col.filterable && (
              <input
                type="text"
                placeholder={`Filter ${col.title}`}
                style={{
                  marginTop: '5px',
                  padding: '5px',
                  fontSize: styles.headerFontSize,
                  width: '100%',
                  boxSizing: 'border-box',
                }}
                onChange={(e) => onFilter(col.key, e.target.value)}
              />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
