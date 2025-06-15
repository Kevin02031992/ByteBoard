import React from "react";
import ButtonComponent from "./ButtonComponent";

interface ModalDecisionProps {
    title: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
}

const ModalDecision: React.FC<ModalDecisionProps> = ({
    title,
    message,
    onClose,
    onConfirm,
    confirmLabel = "Aceptar",
    cancelLabel = "Cancelar",
}) => {
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
            style={{ zIndex: 1055 }}
        >
            <div
                className="bg-white rounded shadow p-4 w-100"
                style={{ maxWidth: "600px" }}
            >
                {/* Título */}
                <div className="mb-3">
                    <h5 className="mb-0">{title}</h5>
                </div>

                {/* Mensaje */}
                <p className="text-muted">{message}</p>

                {/* Botones */}
                <div className="d-flex justify-content-between mt-4">
                    <ButtonComponent
                        label={confirmLabel}
                        use="delete"
                        type="button"
                        className="text-white btn-hover-effect"
                        style={{ backgroundColor: "#dc3545", border: "none", width: "120px" }}
                        onClick={onConfirm}
                    />
                    <ButtonComponent
                        label={cancelLabel}
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

export default ModalDecision;
