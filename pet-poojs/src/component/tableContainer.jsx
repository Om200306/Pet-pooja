import React, { useState, useMemo } from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

const TableContainer = ({ data, columns, styles }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [filters, setFilters] = useState({});

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

 
  const filteredData = useMemo(() => {
    return sortedData.filter((row) =>
      Object.keys(filters).every((key) => {
        const rowValue = row[key] ?? '';
        const filterValue = filters[key] ?? '';
        return rowValue.toString().toLowerCase().includes(filterValue.toLowerCase());
      })
    );
  }, [sortedData, filters]);

  
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' };
        if (prev.direction === 'desc') return { key: null, direction: null };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="table-container" style={{ fontFamily: styles.fontFamily, overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <TableHeader
          columns={columns}
          sortConfig={sortConfig}
          onSort={handleSort}
          onFilter={handleFilter}
          styles={styles}
        />
        {filteredData.length > 0 ? (
          <TableBody data={filteredData} columns={columns} styles={styles} />
        ) : (
          <tbody>
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                No data available
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TableContainer;
