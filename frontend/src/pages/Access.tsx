import { useState, useEffect } from "react";
import type { Access, AccessForm } from "../types/access";
import {
    getAllAccess,
    createAccess,
    updateAccess,
    deleteAccess,
} from "../api/access.api";
import Navbar from "../components/Navbar";
import TableComponent from "../components/TableComponent";
import ButtonComponent from "../components/ButtonComponent";
import ModalCreate from "../components/ModalCreate";
import ModalRead from "../components/ModalRead";
import ModalUpdate from "../components/ModalUpdate";
import ModalDecision from "../components/ModalDecision";
import ModalAlert from "../components/ModalAlert";
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons";
import { formatDate } from "../utils/formatDate.util";

const AccessPage = () => {
    const [accessList, setAccessList] = useState<Access[]>([]);
    const [filteredAccess, setFilteredAccess] = useState<Access[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [accessPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCreate, setShowCreate] = useState(false);
    const [showRead, setShowRead] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedAccess, setSelectedAccess] = useState<Access | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"error" | "success" | "warning" | "info">("error");

    const indexLast = currentPage * accessPerPage;
    const indexFirst = indexLast - accessPerPage;
    const currentAccess = filteredAccess.slice(indexFirst, indexLast);
    const totalPages = Math.ceil(filteredAccess.length / accessPerPage);

    const INITIAL_FORM: AccessForm = {
        access_name: "",
        access_description: "",
        access_path: "",
        access_type: 1,
    };
    const [formData, setFormData] = useState<AccessForm>(INITIAL_FORM);

    useEffect(() => {
        fetchAccess();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAccess = async () => {
        try {
            const data = await getAllAccess();
            setAccessList(data);
            setFilteredAccess(data);
        } catch (error) {
            showModalAlert(`Error al cargar accesos: ${error}`, "error");
        }
    };

    const handleFilter = () => {
        const query = searchQuery.toLowerCase();
        const filtered = accessList.filter(
            (a) =>
                a.access_name.toLowerCase().includes(query) ||
                a.access_path.toLowerCase().includes(query)
        );
        setFilteredAccess(filtered);
        setCurrentPage(1);
    };

    const handleClear = () => {
        setSearchQuery("");
        setFilteredAccess(accessList);
        setCurrentPage(1);
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleDelete = async () => {
        if (!selectedAccess) return;

        try {
            const res = await deleteAccess(selectedAccess.access_id);
            showModalAlert(`${res.data.message}`, "success");
            fetchAccess();
        } catch (error) {
            showModalAlert(`${error}`, "error");
        } finally {
            setShowDelete(false);
            setSelectedAccess(null);
        }
    };
    // 🔹 Crear nueva opción
    const handleCreate = async () => {
        // Validaciones
        if (!formData.access_name || !formData.access_type) {
            showModalAlert("Debe completar los campos obligatorios.", "warning");
            return;
        }

        try {
            await createAccess(formData);
            showModalAlert("Opción registrada correctamente.", "success");
            setShowCreate(false);
            fetchAccess();
        } catch (error) {
            showModalAlert(`${error}`, "error");
        }
    };

    // 🔄 Actualizar opción
    const handleUpdate = async () => {
        if (!selectedAccess) return;

        // Validaciones
        if (!formData.access_name || !formData.access_type) {
            showModalAlert("Debe completar los campos obligatorios.", "warning");
            return;
        }

        try {
            await updateAccess(selectedAccess.access_id, formData);
            showModalAlert("Opción actualizada correctamente.", "success");
            setShowUpdate(false);
            fetchAccess();
        } catch (error) {
            showModalAlert(`${error}`, "error");
        }
    };

    const showModalAlert = (message: string, type: "success" | "error" | "warning" | "info") => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);
    };

    return (
        <>
            <Navbar />
            <div className="container py-4">
                <h2 className="h4 fw-bold mb-4 text-center">Control de Accesos</h2>

                <div className="mb-3">
                    <ButtonComponent
                        label="Registrar opción"
                        use="addAccess"
                        className="text-white btn-hover-effect"
                        style={{ backgroundColor: "#198754", border: "none" }}
                        onClick={() => {
                            setFormData(INITIAL_FORM);
                            setShowCreate(true);
                        }}
                    />
                </div>

                <div className="row g-2 mb-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            placeholder="Buscar por nombre o ruta"
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
                        headers={["Nombre", "Descripción", "ID de Acceso", "Tipo", "Acciones"]}
                        centered
                    >{currentAccess.length > 0 ? (
                        currentAccess.map((a) => (
                            <tr key={a.access_id}>
                                <td>{a.access_name}</td>
                                <td>{a.access_description || "—"}</td>
                                <td>{a.access_path || "—"}</td>
                                <td>
                                    {{
                                        1: "Página",
                                        2: "Botón",
                                        3: "Acción",
                                    }[a.access_type] || "Otro"}
                                </td>
                                <td>
                                    <div className="d-flex gap-1 justify-content-center">
                                        <ButtonComponent
                                            label="Ver"
                                            size="sm"
                                            use="viewAccess"
                                            className="text-white btn-hover-effect"
                                            style={{ backgroundColor: "#6c757d", border: "none", width: "100px" }}
                                            onClick={() => {
                                                setSelectedAccess(a);
                                                setShowRead(true);
                                            }}
                                        />
                                        <ButtonComponent
                                            label="Editar"
                                            size="sm"
                                            use="editAccess"
                                            className="text-white btn-hover-effect"
                                            style={{ backgroundColor: "#6c757d", border: "none", width: "100px" }}
                                            onClick={() => {
                                                setSelectedAccess(a);
                                                setFormData({
                                                    access_name: a.access_name,
                                                    access_description: a.access_description,
                                                    access_path: a.access_path,
                                                    access_type: a.access_type,
                                                });
                                                setShowUpdate(true);
                                            }}
                                        />
                                        <ButtonComponent
                                            label="Eliminar"
                                            size="sm"
                                            use="deleteAccess"
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
                        <tr key="no-data">
                            <td colSpan={5} className="text-center text-muted py-3">
                                No hay accesos registrados.
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
                            className="text-white btn-hover-effect"
                            style={{ backgroundColor: "#6c757d", border: "none", width: "60px", height: "40px" }}
                            onClick={prevPage}
                            disabled={currentPage === 1}
                        />
                        <ButtonComponent
                            label={<ArrowRightCircle size={20} />}
                            className="text-white btn-hover-effect"
                            style={{ backgroundColor: "#6c757d", border: "none", width: "60px", height: "40px" }}
                            onClick={nextPage}
                            disabled={currentPage === 1 || totalPages === 0}
                        />
                    </div>
                    <span className="text-muted small">Página {currentPage} de {totalPages}</span>
                </div>
            </div>
            {showCreate && (
                <ModalCreate
                    title="Registrar nueva opción"
                    onClose={() => setShowCreate(false)}
                    onSubmit={handleCreate}

                >
                    <div className="row g-3 px-2">
                        <div className="col-md-6">
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                name="access_name"
                                className="form-control"
                                value={formData.access_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, access_name: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Ruta / Identificador</label>
                            <input
                                type="text"
                                name="access_path"
                                className="form-control"
                                value={formData.access_path}
                                onChange={(e) =>
                                    setFormData({ ...formData, access_path: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Descripción</label>
                            <input
                                type="text"
                                name="access_description"
                                className="form-control"
                                value={formData.access_description}
                                onChange={(e) =>
                                    setFormData({ ...formData, access_description: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Tipo</label>
                            <select
                                name="access_type"
                                className="form-select"
                                value={formData.access_type}
                                onChange={(e) =>
                                    setFormData({ ...formData, access_type: parseInt(e.target.value) })
                                }
                            >
                                <option value={1}>Página</option>
                                <option value={2}>Botón</option>
                                <option value={3}>Acción</option>
                            </select>
                        </div>
                    </div>
                </ModalCreate>
            )}
            {showUpdate && selectedAccess && (
                <ModalUpdate
                    title="Editar opción"
                    onClose={() => setShowUpdate(false)}
                    onSubmit={handleUpdate}

                >
                    <div className="row g-3 px-2">
                        <div className="col-md-6">
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                name="access_name"
                                className="form-control"
                                value={formData.access_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, access_name: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Ruta / Identificador</label>
                            <input
                                type="text"
                                name="access_path"
                                className="form-control"
                                value={formData.access_path}
                                onChange={(e) =>
                                    setFormData({ ...formData, access_path: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Descripción</label>
                            <input
                                type="text"
                                name="access_description"
                                className="form-control"
                                value={formData.access_description}
                                onChange={(e) =>
                                    setFormData({ ...formData, access_description: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Tipo</label>
                            <select
                                name="access_type"
                                className="form-select"
                                value={formData.access_type}
                                onChange={(e) =>
                                    setFormData({ ...formData, access_type: parseInt(e.target.value) })
                                }
                            >
                                <option value={1}>Página</option>
                                <option value={2}>Botón</option>
                                <option value={3}>Acción</option>
                            </select>
                        </div>
                    </div>
                </ModalUpdate>
            )}
            {showRead && selectedAccess && (
                <ModalRead
                    title="Detalle de la opción"
                    onClose={() => {
                        setShowRead(false);
                        setSelectedAccess(null);
                    }}
                >
                    <div className="px-3 py-2">
                        <h6 className="fw-bold border-bottom pb-1 mb-3"><i className="bi bi-window me-2"></i>Información general del registro</h6>
                        <p><strong>Nombre:</strong> {selectedAccess.access_name}</p>
                        <p><strong>Descripción:</strong> {selectedAccess.access_description || "—"}</p>
                        <p><strong>Ruta / Identificador:</strong> {selectedAccess.access_path || "—"}</p>
                        <p>
                            <strong>Tipo:</strong>{" "}
                            {{
                                1: "Página",
                                2: "Botón",
                                3: "Acción",
                            }[selectedAccess.access_type] || "Otro"}
                        </p>
                        <h6 className="fw-bold border-bottom pb-1 my-3"><i className="bi bi-shield-check me-2"></i>Información de auditoría</h6>
                        <p><strong>Creado por:</strong> {selectedAccess.access_creater_name}</p>
                        <p><strong>Fecha de creación:</strong> {formatDate(selectedAccess.access_creationDate)}</p>
                        <p><strong>Actualizado por:</strong> {selectedAccess.access_updater_name}</p>
                        <p><strong>Fecha de última actualización:</strong> {formatDate(selectedAccess.access_updateDate)}</p>
                        <p><strong>Condición:</strong> {selectedAccess.access_condition ? "Activo" : "Inactivo"}</p>
                    </div>
                </ModalRead>
            )}
            {showDelete && selectedAccess && (
                <ModalDecision
                    title="Eliminar opción"
                    message={`¿Está seguro que desea eliminar la opción "${selectedAccess.access_name}" del sistema? Esta acción es reversible.`}
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
        </>
    );
};

export default AccessPage;
