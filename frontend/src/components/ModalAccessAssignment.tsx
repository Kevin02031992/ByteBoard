import { useEffect, useState } from "react";
import type { Access } from "../types/access";
import type { Profile } from "../types/profile";
import type { ProfileAccess, ProfileAccessPayload } from "../types/profile_access";
import { getAllAccess } from "../api/access.api";
import {
  getProfileAccessByProfile,
  createProfileAccess,
  deleteProfileAccess,
} from "../api/profile_access.api";
import ModalRead from "./ModalRead";
import ModalDecision from "./ModalDecision";
import ModalAlert from "./ModalAlert";
import TableComponent from "./TableComponent";
import ButtonComponent from "./ButtonComponent";
import { formatDate, formatDateTime } from "../utils/formatDate.util";
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons";

interface Props {
  profile: Profile;
  onClose: () => void;
}

const ModalAccessAssignment = ({ profile, onClose }: Props) => {
  const [accessList, setAccessList] = useState<Access[]>([]);
  const [assignedAccess, setAssignedAccess] = useState<ProfileAccess[]>([]);
  const [selectedAccessId, setSelectedAccessId] = useState<string>("");
  const [selectedAccess, setSelectedAccess] = useState<ProfileAccess | null>(null);
  const [showRead, setShowRead] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"info" | "success" | "error" | "warning">("info");
  const [alertMessage, setAlertMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAccess, setFilteredAccess] = useState<ProfileAccess[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const accessPerPage = 6;
  const indexLast = currentPage * accessPerPage;
  const indexFirst = indexLast - accessPerPage;
  const currentAccess = filteredAccess.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(filteredAccess.length / accessPerPage);


  // 🔃 Carga accesos al montar
  useEffect(() => {
    fetchProfileAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfileAccess = async () => {
    try {
      const [allAccess, assigned] = await Promise.all([
        getAllAccess(),
        getProfileAccessByProfile(profile.profile_id),
      ]);
      setAccessList(allAccess);
      setAssignedAccess(assigned);
      setFilteredAccess(assigned);
    } catch {
      showModalAlert("Error al cargar datos", "error");
    }
  };

  // 🧠 Accesos disponibles para asignar
  const availableAccess = accessList.filter(
    (a) => !assignedAccess.some((pa) => pa.access_id === a.access_id)
  );

  const handleAssign = async () => {
    if (!selectedAccessId) {
      showModalAlert("Debe seleccionar una opción de acceso.", "warning");
      return;
    }
    try {
      const payload: ProfileAccessPayload = {
        profile_id: profile.profile_id,
        access_id: selectedAccessId,
      };
      await createProfileAccess(payload);
      showModalAlert("Acceso asignado correctamente", "success");
      setSelectedAccessId("");
      fetchProfileAccess();
    } catch {
      showModalAlert("Error al asignar el acceso", "error");
    }
  };

  const showModalAlert = (message: string, type: "success" | "error" | "warning" | "info") => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
  };

  const handleDelete = async () => {
    if (!selectedAccess) return;

    try {
      const res = await deleteProfileAccess(selectedAccess.profile_access_id);
      showModalAlert(`${res.message}`, "success");
      fetchProfileAccess();
    } catch (error) {
      showModalAlert(`${error}`, "error");
    } finally {
      setShowDelete(false);
      setSelectedAccess(null);
    }
  };

  const handleFilter = () => {
    const query = searchQuery.toLowerCase();
    const filtered = assignedAccess.filter((a) =>
      a.access_name.toLowerCase().includes(query)
    );
    setFilteredAccess(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearchQuery("");
    setFilteredAccess(assignedAccess);
    setCurrentPage(1);
  };


  return (
    <div className="modal-overlay">
      <div className="modal-content modal-lg">
        <h5 className="fw-bold border-bottom pb-2 mb-3">
          <i className="bi bi-link-45deg me-2"></i>
          Asignar accesos al perfil "{profile.profile_name}"
        </h5>

        <div className="mb-3 row g-2 align-items-end">
          <div className="col-md-9">
            <label className="form-label fw-semibold">Buscar y seleccionar acceso</label>
            <select
              className="form-select"
              value={selectedAccessId}
              onInput={(e) => {
                const term = (e.target as HTMLSelectElement).value.toLowerCase();
                const match = availableAccess.find(
                  (a) =>
                    a.access_name.toLowerCase().includes(term) ||
                    a.access_path?.toLowerCase().includes(term)
                );
                setSelectedAccessId(match ? match.access_id : "");
              }}
              onChange={(e) => setSelectedAccessId(e.target.value)}
            >
              <option value="">Seleccionar acceso</option>
              {availableAccess.map((a) => (
                <option key={a.access_id} value={a.access_id}>
                  {a.access_name} ({a.access_path})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <ButtonComponent
              label="Asignar"
              use="addAccess"
              className="btn-success text-white w-100 text-white btn-hover-effect"
              onClick={handleAssign}
            />
          </div>
        </div>
        <div className="row g-2 mb-3">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Buscar acceso por nombre"
              className="form-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-6 d-flex gap-2">
            <ButtonComponent
              label="Buscar"
              use="search"
              className="w-100 text-white btn-hover-effect"
              style={{ backgroundColor: "#0d6efd", border: "none" }}
              onClick={handleFilter}
            />
            <ButtonComponent
              label="Cargar todos"
              use="reload"
              className="w-100 text-white btn-hover-effect"
              style={{ backgroundColor: "#6c757d", border: "none" }}
              onClick={handleClear}
            />
          </div>
        </div>


        <div className="table-responsive">
          <TableComponent
            headers={["Nombre", "Descripción", "Tipo", "Ruta", "Acciones"]}
            centered
          >
            {currentAccess.length > 0 ? (
              currentAccess.map((a) => (
                <tr key={a.profile_access_id}>
                  <td>{a.access_name}</td>
                  <td>{a.access_description || "—"}</td>
                  <td>{["", "Página", "Botón", "Acción"][a.access_type]}</td>
                  <td>{a.access_path}</td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <ButtonComponent
                        label="Ver"
                        use="viewAccess"
                        size="sm"
                        className="text-white btn-hover-effect"
                        style={{ backgroundColor: "#6c757d", border: "none", width: "100px" }}
                        onClick={() => {
                          setSelectedAccess(a);
                          setShowRead(true);
                        }}
                      />
                      <ButtonComponent
                        label="Eliminar"
                        use="deleteAccess"
                        size="sm"
                        className="text-white btn-hover-effect"
                        style={{ backgroundColor: "#6c757d", border: "none", width: "100px" }}
                        onClick={() => {
                          setSelectedAccess(a);
                          setShowDelete(true);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-3 text-muted">
                  No hay accesos asignados
                </td>
              </tr>
            )}
          </TableComponent>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span style={{ visibility: "hidden" }}>espacio</span>
          <div className="d-flex justify-content-center gap-3">
            <ButtonComponent
              label={<ArrowLeftCircle size={20} />}
              className="d-flex align-items-center justify-content-center text-white btn-hover-effect"
              style={{
                backgroundColor: "#6c757d",
                border: "none",
                width: "60px",
                height: "40px",
                transition: "all 0.3s ease",
                lineHeight: "1",
              }}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            <ButtonComponent
              label={<ArrowRightCircle size={20} />}
              className="d-flex align-items-center justify-content-center text-white btn-hover-effect"
              style={{
                backgroundColor: "#6c757d",
                border: "none",
                width: "60px",
                height: "40px",
                transition: "all 0.3s ease",
                lineHeight: "1",
              }}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            />
          </div>
          <span className="text-muted small">Página {currentPage} de {totalPages}</span>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <ButtonComponent
            label="Cerrar"
            use="cancel"
            className="btn-secondary text-white btn-hover-effect"
            onClick={onClose}
          />
        </div>

        {showRead && selectedAccess && (
          <ModalRead
            title="Detalle del acceso asignado"
            onClose={() => {
              setShowRead(false);
              setSelectedAccess(null);
            }}
          >
            <div className="px-3 py-2">
              <h6 className="fw-bold border-bottom pb-1 mb-3">
                <i className="bi bi-window me-2"></i>
                Información general del registro
              </h6>
              <p><strong>Nombre:</strong> {selectedAccess.access_name}</p>
              <p><strong>Descripción:</strong> {selectedAccess.access_description}</p>
              <p><strong>Ruta:</strong> {selectedAccess.access_path}</p>
              <p><strong>Tipo:</strong> {["", "Página", "Botón", "Acción"][selectedAccess.access_type]}</p>

              <h6 className="fw-bold border-bottom pb-1 mt-4 mb-3">
                <i className="bi bi-shield-check me-2"></i>
                Información de auditoría
              </h6>
              <p><strong>Creado por:</strong> {selectedAccess.profile_access_creater_name || selectedAccess.profile_access_creater}</p>
              <p><strong>Fecha creación:</strong> {formatDate(selectedAccess.profile_access_creationDate)}</p>
              <p><strong>Actualizado por:</strong> {selectedAccess.profile_access_updater_name || selectedAccess.profile_access_updater}</p>
              <p><strong>Fecha actualización:</strong> {formatDateTime(selectedAccess.profile_access_updateDate)}</p>
              <p><strong>Condición:</strong> {selectedAccess.profile_access_condition ? "Activo" : "Inactivo"}</p>
            </div>
          </ModalRead>
        )}

        {showDelete && selectedAccess && (
          <ModalDecision
            title="Eliminar acceso asignado"
            message={`¿Está seguro que desea eliminar el acceso "${selectedAccess.access_name}" del perfil?`}
            confirmLabel="Eliminar"
            cancelLabel="Cancelar"
            onClose={() => {
              setShowDelete(false);
              setSelectedAccess(null);
            }}
            onConfirm={handleDelete}
          />
        )}

        <ModalAlert
          show={showAlert}
          type={alertType}
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      </div>
    </div>
  );
};

export default ModalAccessAssignment;
