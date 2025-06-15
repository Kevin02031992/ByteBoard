import React from "react";
import ButtonComponent from "./ButtonComponent";

interface ModalReadProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

const ModalRead: React.FC<ModalReadProps> = ({ title, children, onClose }) => {
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
            style={{ zIndex: 1055 }}
        >
            <div className="bg-white rounded shadow p-3 w-100" style={{ maxWidth: "1000px", maxHeight: "90vh", overflowY: "auto" }}>
                {/* Encabezado */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">{title}</h5>
                    <button className="btn-close" onClick={onClose}></button>
                </div>

                {/* Cuerpo con contenido personalizado */}
                <div className="mb-3">{children}</div>

                {/* Botón cerrar */}
                <div className="d-flex justify-content-end mt-4">
                    <ButtonComponent
                        label="Cerrar"
                        use="cancel"
                        type="button"
                        className="text-white btn-hover-effect"
                        style={{ backgroundColor: "#6c757d", border: "none", width: "120px" }}
                        onClick={onClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default ModalRead;
