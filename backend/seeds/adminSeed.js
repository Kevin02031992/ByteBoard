// adminSeed.js
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const db = require("../config/database");
const { generateUniqueId } = require("../utils/generateId.util");

(async () => {
  try {
    const user_id = await generateUniqueId("user", "user_id");
    const now = new Date();
    const hashedPassword = await bcrypt.hash("Admin1234!", 10);

    const insertQuery = `
      INSERT INTO user (
        user_id, user_identification, user_name, user_companyMail, user_personalMail,
        user_phone1, user_phone2, user_addres, user_birthday, user_picture,
        user_password, user_password1, user_password2, user_password3,
        user_passwordType, user_passwordDays, user_passwordTries, user_vacationDays,
        user_lastConection, user_startDate, user_endDate, user_state,
        user_creationDate, user_creater, user_updateDate, user_updater, user_condition
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      user_id,
      "000000000", // Cédula
      "Administrador General",
      "admin@byteboard.com",
      "admin.personal@mail.com",
      "88888888",
      "99999999",
      "Oficinas centrales",
      "1990-01-01",
      "multimedia/system_pictures/default-user.png",
      hashedPassword,
      null,
      null,
      null,
      1,
      60,
      0,
      0,
      now,
      now,
      null,
      1,
      now,
      user_id,
      now,
      user_id,
      1,
    ];

    await db.query(insertQuery, values);

    console.log("✅ Usuario administrador creado correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al crear usuario administrador:", error);
    process.exit(1);
  }
})();
