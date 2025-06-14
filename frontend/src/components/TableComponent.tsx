import React from "react";

// 📌 Props: headers (encabezados), contenido (filas) y opción para centrar encabezados
interface TableComponentProps {
  headers: string[];
  children: React.ReactNode;
  centered?: boolean; // Centra SOLO los encabezados
}

const TableComponent: React.FC<TableComponentProps> = ({ headers, children, centered = false }) => {
  return (
    <div className="table-responsive">
      <table
        className="table table-bordered table-hover align-middle shadow-sm rounded"
        style={{ borderRadius: "0.75rem", overflow: "hidden" }}
      >
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className={`py-2 px-3 ${centered ? "text-center" : ""}`}
                style={{
                  backgroundColor: "#ced4da", // gris más oscuro
                  color: "#000",
                  fontFamily: "'Segoe UI', sans-serif",
                  fontSize: "0.95rem"
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          style={{
            fontFamily: "'Segoe UI', sans-serif",
            fontSize: "0.92rem",
          }}
        >
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
