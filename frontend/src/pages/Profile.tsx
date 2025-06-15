import { useState, useEffect } from "react";
import type { Profile, ProfileForm } from "../types/profile";
import {
    getAllProfiles,
    createProfile,
    updateProfile,
    deleteProfile,
} from "../api/profile.api";
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


const ProfilePage = () => {
    const [profileList, setProfileList] = useState<Profile[]>([]);
    const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [profilesPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCreate, setShowCreate] = useState(false);
    const [showRead, setShowRead] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"error" | "success" | "warning" | "info">("error");

    const indexLast = currentPage * profilesPerPage;
    const indexFirst = indexLast - profilesPerPage;
    const currentProfiles = filteredProfiles.slice(indexFirst, indexLast);
    const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

    const INITIAL_FORM: ProfileForm = {
        profile_name: "",
        profile_description: "",
    };
    const [formData, setFormData] = useState<ProfileForm>(INITIAL_FORM);

    useEffect(() => {
        fetchProfiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProfiles = async () => {
        try {
            const data = await getAllProfiles();
            setProfileList(data);
            setFilteredProfiles(data);
        } catch (error) {
            showModalAlert(`Error al cargar perfiles: ${error}`, "error")
        }
    };

    const handleFilter = () => {
        const query = searchQuery.toLowerCase();
        const filtered = profileList.filter((p) =>
            p.profile_name.toLowerCase().includes(query)
        );
        setFilteredProfiles(filtered);
        setCurrentPage(1);
    };

    const handleClear = () => {
        setSearchQuery("");
        setFilteredProfiles(profileList);
        setCurrentPage(1);
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const showModalAlert = (message: string, type: "success" | "error" | "warning" | "info") => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);
    };

    const handleCreate = async () => {
        if (!formData.profile_name) {
            showModalAlert("Debe ingresar el nombre del perfil.", "warning");
            return;
        }
        try {
            await createProfile(formData);
            showModalAlert("Perfil registrado correctamente.", "success");
            setShowCreate(false);
            fetchProfiles();
        } catch (error) {
            showModalAlert(`${error}`, "error");
        }
    };

    const handleUpdate = async () => {
        if (!selectedProfile || !formData.profile_name) {
            showModalAlert("Debe completar el nombre del perfil.", "warning");
            return;
        }
        try {
            await updateProfile(selectedProfile.profile_id, formData);
            showModalAlert("Perfil actualizado correctamente.", "success");
            setShowUpdate(false);
            fetchProfiles();
        } catch (error) {
            showModalAlert(`${error}`, "error");
        }
    };

    const handleDelete = async () => {
        if (!selectedProfile) return;

        try {
            const res = await deleteProfile(selectedProfile.profile_id);
            showModalAlert(`${res.data.message}`, "success");
            fetchProfiles();
        } catch (error) {
            showModalAlert(`${error}`, "error");
        } finally {
            setShowDelete(false);
            setSelectedProfile(null);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container py-4">
                <h2 className="h4 fw-bold mb-4 text-center">Gestión de Perfiles</h2>

                <div className="mb-3">
                    <ButtonComponent
                        label="Registrar perfil"
                        use="addProfile"
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
                            placeholder="Buscar por nombre"
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
                    <TableComponent headers={["Nombre", "Descripción", "Acciones"]} centered>
                        {currentProfiles.length > 0 ? (
                            currentProfiles.map((p) => (
                                <tr key={p.profile_id}>
                                    <td>{p.profile_name}</td>
                                    <td>{p.profile_description || "—"}</td>
                                    <td>
                                        <div className="d-flex gap-1 justify-content-center">
                                            <ButtonComponent
                                                label="Ver"
                                                size="sm"
                                                use="viewProfile"
                                                className="text-white btn-hover-effect"
                                                style={{ backgroundColor: "#6c757d", border: "none", width: "100px" }}
                                                onClick={() => {
                                                    setSelectedProfile(p);
                                                    setShowRead(true);
                                                }}
                                            />
                                            <ButtonComponent
                                                label="Editar"
                                                size="sm"
                                                use="editProfile"
                                                className="text-white btn-hover-effect"
                                                style={{ backgroundColor: "#6c757d", border: "none", width: "100px" }}
                                                onClick={() => {
                                                    setSelectedProfile(p);
                                                    setFormData({
                                                        profile_name: p.profile_name,
                                                        profile_description: p.profile_description,
                                                    });
                                                    setShowUpdate(true);
                                                }}
                                            />
                                            <ButtonComponent
                                                label="Eliminar"
                                                size="sm"
                                                use="deleteProfile"
                                                className="text-white btn-hover-effect"
                                                style={{ backgroundColor: "#6c757d", border: "none", width: "100px" }}
                                                onClick={() => {
                                                    setSelectedProfile(p);
                                                    setShowDelete(true);
                                                }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr key="no-data">
                                <td colSpan={3} className="text-center text-muted py-3">
                                    No hay perfiles registrados.
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
                    title="Registrar nuevo perfil"
                    onClose={() => setShowCreate(false)}
                    onSubmit={handleCreate}
                >
                    <div className="row g-3 px-2">
                        <div className="col-md-6">
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                name="profile_name"
                                className="form-control"
                                value={formData.profile_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, profile_name: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Descripción</label>
                            <input
                                type="text"
                                name="profile_description"
                                className="form-control"
                                value={formData.profile_description}
                                onChange={(e) =>
                                    setFormData({ ...formData, profile_description: e.target.value })
                                }
                            />
                        </div>
                    </div>
                </ModalCreate>
            )}

            {showUpdate && selectedProfile && (
                <ModalUpdate
                    title="Editar perfil"
                    onClose={() => setShowUpdate(false)}
                    onSubmit={handleUpdate}
                >
                    <div className="row g-3 px-2">
                        <div className="col-md-6">
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                name="profile_name"
                                className="form-control"
                                value={formData.profile_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, profile_name: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Descripción</label>
                            <input
                                type="text"
                                name="profile_description"
                                className="form-control"
                                value={formData.profile_description}
                                onChange={(e) =>
                                    setFormData({ ...formData, profile_description: e.target.value })
                                }
                            />
                        </div>
                    </div>
                </ModalUpdate>
            )}

            {showRead && selectedProfile && (
                <ModalRead
                    title="Detalle del perfil"
                    onClose={() => {
                        setShowRead(false);
                        setSelectedProfile(null);
                    }}
                >
                    <div className="px-3 py-2">
                        <h6 className="fw-bold border-bottom pb-1 mb-3"><i className="bi bi-person-badge me-2"></i>Información general del registro</h6>
                        <p><strong>Nombre:</strong> {selectedProfile.profile_name}</p>
                        <p><strong>Descripción:</strong> {selectedProfile.profile_description || "—"}</p>
                        <h6 className="fw-bold border-bottom pb-1 my-3"><i className="bi bi-shield-check me-2"></i>Información de auditoría</h6>
                        <p><strong>Creado por:</strong> {selectedProfile.profile_creater_name}</p>
                        <p><strong>Fecha de creación:</strong> {formatDate(selectedProfile.profile_creationDate)}</p>
                        <p><strong>Actualizado por:</strong> {selectedProfile.profile_updater_name}</p>
                        <p><strong>Fecha de última actualización:</strong> {formatDate(selectedProfile.profile_updateDate)}</p>
                        <p><strong>Condición:</strong> {selectedProfile.profile_condition ? "Activo" : "Inactivo"}</p>
                    </div>
                </ModalRead>
            )}

            {showDelete && selectedProfile && (
                <ModalDecision
                    title="Eliminar perfil"
                    message={`¿Está seguro que desea eliminar el perfil "${selectedProfile.profile_name}"? Esta acción es reversible.`}
                    confirmLabel="Eliminar"
                    cancelLabel="Cancelar"
                    onClose={() => {
                        setShowDelete(false);
                        setSelectedProfile(null);
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

export default ProfilePage;
