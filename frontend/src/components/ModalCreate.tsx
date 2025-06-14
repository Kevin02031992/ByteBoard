import React from "react";
import ButtonComponent from "./ButtonComponent";

interface ModalCreateProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
}

const ModalCreate: React.FC<ModalCreateProps> = ({
  title,
  children,
  onClose,
  onSubmit,
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(); // esto dispara handleCreate en User.tsx
  };
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1055 }}
    >
      <div className="bg-white rounded shadow p-3 w-100" style={{ maxWidth: "1100px", maxHeight: "90vh", overflowY: "auto" }}>
        {/* Encabezado */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">{title}</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className="mb-3">{children}</div>

          <div className="d-flex justify-content-between mt-4">
            <ButtonComponent
              label="Cancelar"
              use="cancel"
              type="button"
              className="text-white btn-hover-effect"
              style={{ backgroundColor: "#6c757d", border: "none", width: "120px" }}
              onClick={onClose}
            />
            <ButtonComponent
              label="Crear"
              use="addUser"
              type="submit"
              className="text-white btn-hover-effect"
              style={{ backgroundColor: "#198754", border: "none", width: "120px" }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCreate;
