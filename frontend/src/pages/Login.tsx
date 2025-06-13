import { useState } from "react";
import { loginUser } from "../api/login.api";
import { useNavigate } from "react-router-dom";

// 💻 Página de login
const Login = () => {
    // 🎯 Navegación programática
    const navigate = useNavigate();

    // 📦 Estados del formulario
    const [user_identification, setUserIdentification] = useState("");
    const [user_password, setUserPassword] = useState("");
    const [error, setError] = useState("");

    // 🔐 Submit del login
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { token, user } = await loginUser(user_identification, user_password);

            // 💾 Guardar token y datos en localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/"); // 🏠 Ir al home si es exitoso
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Error inesperado");
            }
        }

    };


    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light" style={{
            backgroundImage: "url('/resource/login_background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}
        >


            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <div className="text-center mb-4">
                    <img src="resource/logo_transparent.png" alt="ByteBoard Logo" className="mx-auto mb-2" style={{ maxWidth: "180px" }} />
                </div>
                <h5 className="text-center mb-4">Iniciar sesión</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Cédula</label>
                        <input
                            type="text"
                            className="form-control"
                            value={user_identification}
                            onChange={(e) => setUserIdentification(e.target.value)}
                            required
                            placeholder="Ingrese su cédula"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            value={user_password}
                            onChange={(e) => setUserPassword(e.target.value)}
                            required
                            placeholder="Ingrese su contraseña"
                        />
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <button type="submit" className="btn btn-primary w-100">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
