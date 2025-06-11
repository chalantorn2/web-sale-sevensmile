// api/middleware/database.js - Database Connection (ES Module)
import mysql from "mysql2/promise";

// Database configuration
const dbConfig = {
  host: process.env.VITE_DB_HOST || "203.170.190.139",
  port: parseInt(process.env.VITE_DB_PORT || "3306"),
  user: process.env.VITE_DB_USER || "sevensmile_sale",
  password: process.env.VITE_DB_PASSWORD || "*0x31pNc7",
  database: process.env.VITE_DB_NAME || "sevensmile_sale",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  charset: "utf8mb4",
  ssl: false,
};

// Create connection pool
let pool;

try {
  pool = mysql.createPool(dbConfig);
  console.log("✅ Database pool created successfully");
} catch (error) {
  console.error("❌ Database pool creation failed:", error);
}

// Helper function for database queries
const query = async (sql, params = []) => {
  try {
    if (!pool) {
      throw new Error("Database pool not initialized");
    }

    console.log("🔍 Executing query:", sql.substring(0, 100) + "...");
    const [rows] = await pool.execute(sql, params);

    return {
      success: true,
      data: rows,
      count: Array.isArray(rows) ? rows.length : 1,
    };
  } catch (error) {
    console.error("❌ Database query error:", error.message);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

// Helper function for Insert และได้ ID กลับมา
const insertOne = async (table, data) => {
  try {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => "?").join(", ");

    const sql = `INSERT INTO ${table} (${keys.join(
      ", "
    )}) VALUES (${placeholders})`;
    const [result] = await pool.execute(sql, values);

    return {
      success: true,
      data: {
        id: result.insertId,
        affectedRows: result.affectedRows,
      },
    };
  } catch (error) {
    console.error("❌ Database insert error:", error.message);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

// Helper function for Select ข้อมูล
const selectMany = async (table, options = {}) => {
  try {
    let sql = `SELECT * FROM ${table}`;
    const params = [];

    // WHERE clause
    if (options.where) {
      const whereConditions = Object.keys(options.where).map(
        (key) => `${key} = ?`
      );
      sql += ` WHERE ${whereConditions.join(" AND ")}`;
      params.push(...Object.values(options.where));
    }

    // ORDER BY
    if (options.orderBy) {
      sql += ` ORDER BY ${options.orderBy}`;
      if (options.order) {
        sql += ` ${options.order.toUpperCase()}`;
      }
    }

    // LIMIT
    if (options.limit) {
      sql += ` LIMIT ?`;
      params.push(parseInt(options.limit));
    }

    const [rows] = await pool.execute(sql, params);
    return {
      success: true,
      data: rows,
      count: rows.length,
    };
  } catch (error) {
    console.error("❌ Database select error:", error.message);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

// Helper function for Select ข้อมูลแค่ 1 record
const selectOne = async (table, where = {}) => {
  try {
    const result = await selectMany(table, { where, limit: 1 });
    if (!result.success) return result;

    return {
      success: true,
      data: result.data.length > 0 ? result.data[0] : null,
    };
  } catch (error) {
    console.error("❌ Database selectOne error:", error.message);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

// Test connection function
const testConnection = async () => {
  try {
    if (!pool) {
      return {
        success: false,
        error: "Database pool not initialized",
      };
    }

    const result = await query("SELECT 1 as test, NOW() as timestamp");

    if (result.success) {
      console.log("✅ Database connection test successful");
      return {
        success: true,
        data: {
          status: "connected",
          timestamp: result.data[0].timestamp,
          database: dbConfig.database,
          host: dbConfig.host,
        },
      };
    } else {
      console.error("❌ Database connection test failed:", result.error);
      return {
        success: false,
        error: result.error,
      };
    }
  } catch (error) {
    console.error("❌ Database connection test error:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Close connection pool
const closePool = async () => {
  if (pool) {
    await pool.end();
    console.log("🔌 Database pool closed");
  }
};

export {
  query,
  insertOne,
  selectMany,
  selectOne,
  testConnection,
  closePool,
  pool,
};
