import React from "react";

const defaultTableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const defaultThStyle = {
  backgroundColor: "#f0f0f0",
  padding: "8px",
  border: "1px solid #ccc",
  fontWeight: "bold",
};

const defaultTdStyle = {
  padding: "8px",
  border: "1px solid #ccc",
};

const defaultUpdateBtnStyle = {
  marginRight: "6px",
  padding: "4px 8px",
  backgroundColor: "#2196F3",
  color: "#fff",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer",
};

const defaultDeleteBtnStyle = {
  padding: "4px 8px",
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer",
};

const Table = ({
  columns = [],
  data = [],
  className = "",
  permissions = { add: false, update: false, delete: false },
  onAdd,
  onUpdate,
  onDelete,
  buttonStyles = {}, // Accept custom styles for buttons
}) => {
  const isStyled = className && className.trim().length > 0;

  return (
    <div style={{ overflowX: "auto" }}>
      {permissions.add && (
        <button
          onClick={onAdd}
          style={{
            marginBottom: "10px",
            padding: "6px 12px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Row
        </button>
      )}

      <table className={className} style={isStyled ? {} : defaultTableStyle}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={isStyled ? {} : defaultThStyle}>
                {col}
              </th>
            ))}
            {(permissions.update || permissions.delete) && (
              <th style={isStyled ? {} : defaultThStyle}>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} style={isStyled ? {} : defaultTdStyle}>
                  {row[col]}
                </td>
              ))}
              {(permissions.update || permissions.delete) && (
                <td style={isStyled ? {} : defaultTdStyle}>
                  {permissions.update && (
                    <button
                      onClick={() => onUpdate?.(row, rowIndex)}
                      style={{
                        ...defaultUpdateBtnStyle,
                        ...buttonStyles.update,
                      }}
                    >
                      Update
                    </button>
                  )}
                  {permissions.delete && (
                    <button
                      onClick={() => onDelete?.(row, rowIndex)}
                      style={{
                        ...defaultDeleteBtnStyle,
                        ...buttonStyles.delete,
                      }}
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
