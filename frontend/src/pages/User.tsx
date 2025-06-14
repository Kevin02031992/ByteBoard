import { useState, useEffect } from "react";
import type { User } from "../types/user";
import type { UserForm } from "../types/user";
import { getAllUsers } from "../api/user.api";
import { createUser } from "../api/user.api";
import Navbar from "../components/Navbar";
import TableComponent from "../components/TableComponent";
import ButtonComponent from "../components/ButtonComponent";
import ModalCreate from "../components/ModalCreate";
import ModalAlert from "../components/ModalAlert";

const UserPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCreate, setShowCreate] = useState(false);
    const indexLastUser = currentPage * usersPerPage;
    const indexFirstUser = indexLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexFirstUser, indexLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const [previewImage, setPreviewImage] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [addressCount, setAddressCount] = useState(0);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"error" | "success" | "warning" | "info">("error");
    const INITIAL_FORM_STATE: UserForm = {
        user_identification: "",
        user_name: "",
        user_companyMail: "",
        user_personalMail: "",
        user_phone1: "",
        user_phone2: "",
        user_addres: "",
        user_birthday: "",
        user_picture: null,
        user_password: "",
        user_startDate: "",
        user_endDate: ""
    };
    const [formData, setFormData] = useState<UserForm>({
        user_identification: "",
        user_name: "",
        user_companyMail: "",
        user_personalMail: "",
        user_phone1: "",
        user_phone2: "",
        user_addres: "",
        user_birthday: "",
        user_picture: null,
        user_password: "",
        user_startDate: "",
        user_endDate: "",
    });

    useEffect(() => {
        fetchUsers();
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

        if (
            window.bootstrap !== null &&
            typeof window.bootstrap === "object" &&
            "Tooltip" in window.bootstrap
        ) {

            const Tooltip = (window.bootstrap as { Tooltip: TooltipConstructor }).Tooltip;

            tooltipTriggerList.forEach((el) => {
                new Tooltip(el as HTMLElement);
            });
        }
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await getAllUsers();
            setUsers(res);
            setFilteredUsers(res); // Inicialmente sin filtros
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    // 🔍 Filtrar por nombre o cédula
    const handleFilter = () => {
        const query = searchQuery.toLowerCase();
        const filtered = users.filter(user =>
            user.user_name.toLowerCase().includes(query) ||
            user.user_identification.toLowerCase().includes(query)
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    };

    const handleClear = () => {
        setSearchQuery("");
        setFilteredUsers(users);
        setCurrentPage(1);
    };

    const handleCreate = async () => {

        if (!validateBeforeSubmit()) return;
        try {
            const data = new FormData();

            // Agrega todos los campos excepto la imagen
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== "user_picture" && value !== null && value !== undefined) {
                    data.append(key, value as string);
                }
            });

            // ✅ Adjuntar imagen si es un archivo válido
            if (formData.user_picture && typeof formData.user_picture !== "string") {
                const file = formData.user_picture as File;
                const filename = `temp_profile_picture_${Date.now()}.${file.name.split(".").pop()}`;
                data.append("user_picture", file, filename); // 👈 NOMBRE debe ser EXACTAMENTE 'user_picture'
            }

            // ✅ Enviar al backend
            const res = await createUser(data);
            alert(`✅ Usuario creado con ID: ${res.data.user_id}`);

            fetchUsers();
            setShowCreate(false);
        } catch (error) {
            console.error("Error al crear usuario:", error);
            alert("❌ No se pudo crear el usuario");
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData({ ...formData, user_password: value });

        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSymbol = /[^A-Za-z0-9]/.test(value);
        const isLengthValid = value.length >= 10 && value.length <= 20;

        if (!isLengthValid) {
            setPasswordError("La contraseña debe tener entre 10 y 20 caracteres.");
        } else if (!hasUpper || !hasLower || !hasNumber || !hasSymbol) {
            setPasswordError("Debe incluir mayúscula, minúscula, número y símbolo.");
        } else {
            setPasswordError(null);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const maxSizeMB = 5;
        const allowedTypes = ["image/jpeg", "image/png"];

        // 🧪 Validar tipo
        if (!allowedTypes.includes(file.type)) {
            alert("Solo se permiten imágenes en formato PNG o JPG.");
            return;
        }

        // 🧪 Validar tamaño
        if (file.size > maxSizeMB * 1024 * 1024) {
            alert(`El archivo es demasiado grande. Máximo permitido: ${maxSizeMB}MB.`);
            return;
        }

        if (file) {
            setFormData((prev) => ({ ...prev, user_picture: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    const validateBeforeSubmit = (): boolean => {
        const {
            user_identification,
            user_name,
            user_companyMail,
            user_phone1,
            user_birthday,
            user_password,
            user_startDate,
        } = formData;

        // Verifica campos obligatorios
        if (
            !user_identification ||
            !user_name ||
            !user_companyMail ||
            !user_phone1 ||
            !user_birthday ||
            !user_password ||
            !user_startDate
        ) {
            setAlertMessage("❗ Debes llenar todos los campos obligatorios.");
            setAlertType("warning");
            setShowAlert(true);
            return false;
        }

        // Validación de formato de contraseña
        const isValidPassword =
            user_password.length >= 10 &&
            user_password.length <= 20 &&
            /[A-Z]/.test(user_password) &&
            /[a-z]/.test(user_password) &&
            /\d/.test(user_password) &&
            /[^A-Za-z0-9]/.test(user_password);

        if (!isValidPassword) {
            setAlertMessage("❌ La contraseña no cumple con los requisitos.");
            setAlertType("error");
            setShowAlert(true);
            return false;
        }

        // Coincidencia con confirmación
        if (formData.user_password !== confirmPassword) {
            setAlertMessage("❌ Las contraseñas no coinciden.");
            setAlertType("error");
            setShowAlert(true);
            return false;
        }

        return true;
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const resetForm = () => {
        setFormData(INITIAL_FORM_STATE);
        setPreviewImage("");
        setConfirmPassword("");
        setAddressCount(0);
    };

    const handleCloseModal = () => {
        resetForm();
        setShowCreate(false);
    };


    return (

        <>
            <Navbar />
            <div className="container py-4">
                <h2 className="h4 fw-bold mb-4 text-center">Gestión de usuarios</h2>

                {/* ➕ Botón Crear Usuario */}
                <div className="mb-3">
                    <ButtonComponent
                        label="Crear Usuario"
                        use="addUser"
                        className="text-white btn-hover-effect"
                        style={{ backgroundColor: "#198754", border: "none" }}
                        onClick={() => {
                            setShowCreate(true);
                        }}
                    />
                </div>

                {/* 🔍 Filtro */}
                <div className="row g-2 mb-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            placeholder="Buscar por cédula o nombre"
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

                {/* 🧾 Tabla */}
                <div className="table-responsive">
                    <TableComponent
                        headers={["ID", "Cédula", "Nombre", "Correo", "Teléfono", "Estado", "Acciones"]}
                        centered
                    >
                        {currentUsers.map(user => (
                            <tr key={user.user_id}>
                                <td>{user.user_id}</td>
                                <td>{user.user_identification}</td>
                                <td>{user.user_name}</td>
                                <td>{user.user_companyMail}</td>
                                <td>{user.user_phone1}</td>
                                <td>
                                    {user.user_state === 1
                                        ? "Activo"
                                        : user.user_state === 2
                                            ? "Inactivo"
                                            : "Suspendido"}
                                </td>
                                <td>
                                    <div className="d-flex gap-1 justify-content-center">
                                        <ButtonComponent
                                            label="Ver"
                                            size="sm"
                                            use="viewUser"
                                            className="text-white btn-hover-effect"
                                            style={{ backgroundColor: "#6c757d", border: "none", width: "100px" }}
                                            onClick={() => console.log("Ver", user.user_id)}
                                        />
                                        <ButtonComponent
                                            label="Editar"
                                            size="sm"
                                            use="editUser"
                                            className="text-white btn-hover-effect"
                                            style={{ backgroundColor: "#6c757d", border: "none", width: "100px" }}
                                            onClick={() => console.log("Editar", user.user_id)}
                                        />
                                        <ButtonComponent
                                            label="Eliminar"
                                            size="sm"
                                            use="deleteUser"
                                            className="text-white btn-hover-effect"
                                            style={{ backgroundColor: "#6c757d", border: "none", width: "100px" }}
                                            onClick={() => console.log("Eliminar", user.user_id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </TableComponent>
                </div>

                {/* 🔄 Paginación */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <span style={{ visibility: "hidden" }}>espacio</span>
                    <div className="d-flex justify-content-center gap-3">
                        <ButtonComponent
                            label="◀"
                            className="text-white btn-hover-effect"
                            style={{ backgroundColor: "#6c757d", border: "none", width: "60px" }}
                            onClick={prevPage}
                            disabled={currentPage === 1}
                        />
                        <ButtonComponent
                            label="▶"
                            className="text-white btn-hover-effect"
                            style={{ backgroundColor: "#6c757d", border: "none", width: "60px" }}
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                        />
                    </div>
                    <span className="text-muted small">Página {currentPage} de {totalPages}</span>
                </div>
            </div>
            {showCreate && (
                <ModalCreate
                    title="Crear nuevo usuario"
                    onClose={handleCloseModal}
                    onSubmit={handleCreate}
                >
                    <div className="row g-3 px-2">
                        <div className="col-md-6">
                            {/* 📷 Foto + vista previa */}
                            <div className="col-12 d-flex flex-column align-items-center">
                                <label className="form-label">Foto de perfil</label>
                                <img
                                    src={previewImage || `${import.meta.env.VITE_API_URL_IMG}/multimedia/system_pictures/default-user.png`}
                                    alt="preview"
                                    className="rounded-circle mb-2"
                                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form-control w-50"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            {/* 🔢 Cédula */}
                            <div className="col-md-12">
                                <label className="form-label">Cédula</label>
                                <input
                                    type="text"
                                    name="user_identification"
                                    maxLength={20}
                                    className="form-control"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* 👤 Nombre */}
                            <div className="col-md-12">
                                <label className="form-label">Nombre completo</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    maxLength={50}
                                    className="form-control"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            {/* 🎂 Fecha nacimiento */}
                            <div className="col-md-12">
                                <label className="form-label">Fecha de nacimiento</label>
                                <input
                                    type="date"
                                    name="user_birthday"
                                    className="form-control"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>


                        {/* ✉️ Correos */}
                        <div className="col-md-3">
                            <label className="form-label">Correo institucional</label>
                            <input
                                type="email"
                                name="user_companyMail"
                                maxLength={100}
                                className="form-control"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Correo personal</label>
                            <input
                                type="email"
                                name="user_personalMail"
                                maxLength={100}
                                className="form-control"
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* 📞 Teléfonos */}
                        <div className="col-md-3">
                            <label className="form-label">Teléfono principal</label>
                            <input
                                type="text"
                                name="user_phone1"
                                maxLength={10}
                                className="form-control"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Teléfono secundario</label>
                            <input
                                type="text"
                                name="user_phone2"
                                maxLength={10}
                                className="form-control"
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* 🏠 Dirección */}
                        <div className="col-12">
                            <label className="form-label">Dirección (máx. 150 caracteres)</label>
                            <textarea
                                name="user_addres"
                                maxLength={150}
                                className="form-control"
                                rows={2}
                                onChange={(e) => {
                                    handleInputChange(e);
                                    setAddressCount(e.target.value.length);
                                }}

                            />
                            <div className="text-end small text-muted">{addressCount}/150</div>
                        </div>



                        {/* 🔑 Contraseña + Confirmación */}
                        <div className="col-md-4">
                            <label className="form-label d-flex align-items-center gap-2">
                                Contraseña
                                <i
                                    className="bi bi-info-circle text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Mín. 10, máx. 20. Al menos 1 mayúscula, 1 minúscula, 1 número, 1 símbolo."
                                    style={{ cursor: "pointer" }}
                                ></i>
                            </label>
                            <input
                                type="password"
                                name="user_password"
                                className="form-control"
                                onChange={handlePasswordChange}
                                required
                            />
                            {passwordError && (
                                <div className="text-danger small">{passwordError}</div>
                            )}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Confirmar contraseña</label>
                            <input
                                type="password"
                                name="confirm_password"
                                className="form-control"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            {confirmPassword && confirmPassword !== formData.user_password && (
                                <div className="text-danger small">Las contraseñas no coinciden</div>
                            )}
                        </div>

                        {/* 🏢 Fechas laborales */}
                        <div className="col-md-4">
                            <label className="form-label">Fecha de ingreso</label>
                            <input
                                type="date"
                                name="user_startDate"
                                className="form-control"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                </ModalCreate>
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

export default UserPage;
