import React from 'react';

const TableBody = ({ data, columns, styles }) => {
  if (!data.length) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
            No data available
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          style={{
            backgroundColor: styles.bodyBackgroundColor,
            color: styles.bodyFontColor,
            fontSize: styles.bodyFontSize,
          }}
        >
          {columns.map((col) => (
            <td
              key={col.key}
              style={{
                padding: '10px',
                borderBottom: '1px solid #ddd',
                textAlign: col.align || 'left',
              }}
            >
              {row[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
