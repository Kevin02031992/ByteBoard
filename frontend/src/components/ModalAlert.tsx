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

  const config = {
    success: {
      border: "#0f5132",
      icon: <CheckCircle size={40} className="text-success" />,
    },
    error: {
      border: "#842029",
      icon: <XCircle size={40} className="text-danger" />,
    },
    warning: {
      border: "#664d03",
      icon: <ExclamationCircle size={40} className="text-warning" />,
    },
    info: {
      border: "#055160",
      icon: <InfoCircle size={40} className="text-info" />,
    },
  }[type];

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1055 }}
    >
      <div
        className="rounded shadow p-4"
        style={{
          width: "500px",
          maxWidth: "90%",
          backgroundColor: "#fff",
          border: `2px solid ${config.border}`,
        }}
      >
        <div className="d-flex align-items-center gap-3 mb-3">
          {config.icon}
          <p className="mb-0" style={{ color: config.border }}>{message}</p>
        </div>

        <div className="d-flex justify-content-end">
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
