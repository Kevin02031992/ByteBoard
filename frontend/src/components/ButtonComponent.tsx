import React from "react";
import { PersonPlus, PersonDash, Eye, Pencil, ArrowClockwise, Search, XCircle, Upload, Eraser, Key, Ban } from "react-bootstrap-icons";

interface ButtonProps {
  label: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  size?: "sm" | "lg";
  use?: "addUser" | "deleteUser" | "viewUser" | "editUser" | "reload" | "search" | "cancel" | "upload" | "delete" |
  "addAccess" | "viewAccess" | "editAccess" | "deleteAccess";
  type?: "button" | "submit" | "reset"; 
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  onClick,
  className = "",
  style = {},
  disabled = false,
  size,
  use,
  type = "button", // ✅ Valor por defecto
}) => {
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";

  const getIcon = () => {
    switch (use) {
      case "addUser":
        return <PersonPlus className="me-1" />;
      case "deleteUser":
        return <PersonDash className="me-1" />;
      case "viewUser":
        return <Eye className="me-1" />;
      case "editUser":
        return <Pencil className="me-1" />;
      case "reload":
        return <ArrowClockwise className="me-1" />;
      case "search":
        return <Search className="me-1" />;
      case "cancel":
        return <XCircle className="me-1" />;
      case "upload":
        return <Upload className="me-1" />;
      case "delete":
        return <Eraser className="me-1" />;
      case "addAccess":
        return <Key className="me-1" />;
      case "viewAccess":
        return <Eye className="me-1" />;
        case "editAccess":
        return <Pencil className="me-1" />;
        case "deleteAccess":
        return <Ban className="me-1" />;
      default:
        return null;
    }
  };

  return (
    <button
      type={type} // ✅ Esto es CRÍTICO para que funcione el submit
      onClick={onClick}
      className={`btn ${sizeClass} ${className}`}
      style={style}
      disabled={disabled}
    >
      {getIcon()} {label}
    </button>
  );
};

export default ButtonComponent;
