import React from "react";
import { ExclamationCircle, CheckCircle, InfoCircle, XCircle } from "react-bootstrap-icons";
import ButtonComponent from "./ButtonComponent";

interface ModalAlertProps {
  show: boolean;
  type: "success" | "error" | "warning" | "info";
  message: string;
  onClose: () => void;
}

const ModalAlert: React.FC<ModalAlertProps> = ({ show, type, message, onClose }) => {
  if (!show) return null;

  // 🎨 Colores e íconos por tipo
  const config = {
    success: {
      bg: "#d1e7dd",
      border: "#0f5132",
      icon: <CheckCircle size={40} className="text-success" />,
    },
    error: {
      bg: "#f8d7da",
      border: "#842029",
      icon: <XCircle size={40} className="text-danger" />,
    },
    warning: {
      bg: "#fff3cd",
      border: "#664d03",
      icon: <ExclamationCircle size={40} className="text-warning" />,
    },
    info: {
      bg: "#cff4fc",
      border: "#055160",
      icon: <InfoCircle size={40} className="text-info" />,
    },
  }[type];

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-sm">
        <div
          className="modal-content text-center p-4"
          style={{
            backgroundColor: config.bg,
            border: `2px solid ${config.border}`,
            borderRadius: "1rem",
          }}
        >
          <div className="mb-2">{config.icon}</div>
          <p className="mb-4" style={{ color: config.border }}>
            {message}
          </p>
          <ButtonComponent
            label="Cerrar"
            className="btn-hover-effect"
            style={{
              backgroundColor: config.border,
              color: "white",
              border: "none",
              width: "100px",
            }}
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
