// import mysql from "mysql2/promise";

// // Database configuration - รองรับทั้ง Vite และ Node.js
// const getEnvVar = (key, defaultValue = null) => {
//   // สำหรับ Vite environment
//   if (typeof import.meta !== "undefined" && import.meta.env) {
//     return import.meta.env[key] || defaultValue;
//   }

//   // สำหรับ Node.js environment
//   if (typeof process !== "undefined" && process.env) {
//     return process.env[key] || defaultValue;
//   }

//   return defaultValue;
// };

// const dbConfig = {
//   host: getEnvVar("VITE_DB_HOST", "203.170.190.139"),
//   port: parseInt(getEnvVar("VITE_DB_PORT", "3306")),
//   user: getEnvVar("VITE_DB_USER", "sevensmile_sale"),
//   password: getEnvVar("VITE_DB_PASSWORD", "0x31pNc7"),
//   database: getEnvVar("VITE_DB_NAME", "sevensmile_sale"),
//   waitForConnections: true,
//   connectionLimit: parseInt(getEnvVar("VITE_DB_CONNECTION_LIMIT", "10")),
//   queueLimit: 0,
//   acquireTimeout: parseInt(getEnvVar("VITE_DB_TIMEOUT", "60000")),
//   timeout: parseInt(getEnvVar("VITE_DB_TIMEOUT", "60000")),
//   reconnect: true,
//   charset: "utf8mb4",
// };

// // Create connection pool
// let pool;

// try {
//   pool = mysql.createPool(dbConfig);
//   console.log("✅ Database pool created successfully");
// } catch (error) {
//   console.error("❌ Database pool creation failed:", error);
// }

// // Helper function สำหรับ query
// export const query = async (sql, params = []) => {
//   try {
//     if (!pool) {
//       throw new Error("Database pool not initialized");
//     }

//     const [rows] = await pool.execute(sql, params);
//     return { data: rows, error: null };
//   } catch (error) {
//     console.error("Database query error:", error);
//     return { data: null, error: error.message };
//   }
// };

// // Helper function สำหรับ Insert และได้ ID กลับมา
// export const insertOne = async (table, data) => {
//   try {
//     const keys = Object.keys(data);
//     const values = Object.values(data);
//     const placeholders = keys.map(() => "?").join(", ");

//     const sql = `INSERT INTO ${table} (${keys.join(
//       ", "
//     )}) VALUES (${placeholders})`;
//     const [result] = await pool.execute(sql, values);

//     return {
//       data: {
//         id: result.insertId,
//         affectedRows: result.affectedRows,
//       },
//       error: null,
//     };
//   } catch (error) {
//     console.error("Database insert error:", error);
//     return { data: null, error: error.message };
//   }
// };

// // Helper function สำหรับ Select ข้อมูล
// export const selectMany = async (table, options = {}) => {
//   try {
//     let sql = `SELECT * FROM ${table}`;
//     const params = [];

//     // WHERE clause
//     if (options.where) {
//       const whereConditions = Object.keys(options.where).map(
//         (key) => `${key} = ?`
//       );
//       sql += ` WHERE ${whereConditions.join(" AND ")}`;
//       params.push(...Object.values(options.where));
//     }

//     // ORDER BY
//     if (options.orderBy) {
//       sql += ` ORDER BY ${options.orderBy}`;
//       if (options.order) {
//         sql += ` ${options.order.toUpperCase()}`;
//       }
//     }

//     // LIMIT
//     if (options.limit) {
//       sql += ` LIMIT ?`;
//       params.push(options.limit);
//     }

//     const [rows] = await pool.execute(sql, params);
//     return { data: rows, error: null };
//   } catch (error) {
//     console.error("Database select error:", error);
//     return { data: null, error: error.message };
//   }
// };

// // Helper function สำหรับ Select ข้อมูลแค่ 1 record
// export const selectOne = async (table, where = {}) => {
//   try {
//     const result = await selectMany(table, { where, limit: 1 });
//     if (result.error) return result;

//     return {
//       data: result.data.length > 0 ? result.data[0] : null,
//       error: null,
//     };
//   } catch (error) {
//     console.error("Database selectOne error:", error);
//     return { data: null, error: error.message };
//   }
// };

// // Helper function สำหรับ Update
// export const updateOne = async (table, data, where) => {
//   try {
//     const setClause = Object.keys(data)
//       .map((key) => `${key} = ?`)
//       .join(", ");
//     const whereClause = Object.keys(where)
//       .map((key) => `${key} = ?`)
//       .join(" AND ");

//     const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
//     const params = [...Object.values(data), ...Object.values(where)];

//     const [result] = await pool.execute(sql, params);

//     return {
//       data: {
//         affectedRows: result.affectedRows,
//         changedRows: result.changedRows,
//       },
//       error: null,
//     };
//   } catch (error) {
//     console.error("Database update error:", error);
//     return { data: null, error: error.message };
//   }
// };

// // Helper function สำหรับ Delete
// export const deleteOne = async (table, where) => {
//   try {
//     const whereClause = Object.keys(where)
//       .map((key) => `${key} = ?`)
//       .join(" AND ");
//     const sql = `DELETE FROM ${table} WHERE ${whereClause}`;
//     const params = Object.values(where);

//     const [result] = await pool.execute(sql, params);

//     return {
//       data: { affectedRows: result.affectedRows },
//       error: null,
//     };
//   } catch (error) {
//     console.error("Database delete error:", error);
//     return { data: null, error: error.message };
//   }
// };

// // Test connection function
// export const testConnection = async () => {
//   try {
//     const result = await query("SELECT 1 as test");
//     if (result.error) {
//       console.error("❌ Database connection test failed:", result.error);
//       return false;
//     } else {
//       console.log("✅ Database connection test successful");
//       return true;
//     }
//   } catch (error) {
//     console.error("❌ Database connection test error:", error);
//     return false;
//   }
// };

// // Close connection pool
// export const closePool = async () => {
//   if (pool) {
//     await pool.end();
//     console.log("Database pool closed");
//   }
// };

// export default pool;
