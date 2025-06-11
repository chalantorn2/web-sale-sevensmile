// test-db-node.js - ทดสอบการเชื่อมต่อด้วย Node.js
import mysql from "mysql2/promise";

// กำหนดค่าการเชื่อมต่อตรงๆ (สำหรับทดสอบ)
const dbConfig = {
  host: "203.170.190.139",
  port: 3306,
  user: "sevensmile_sale",
  password: "*0x31pNc7",
  database: "sevensmile_sale",
  charset: "utf8mb4",
};

const runTests = async () => {
  console.log("🔍 Starting database connection tests...\n");

  let connection;

  try {
    // Test 1: สร้าง connection
    console.log("1️⃣ Testing database connection...");
    console.log(`Connecting to: ${dbConfig.host}:${dbConfig.port}`);
    console.log(`Database: ${dbConfig.database}`);
    console.log(`User: ${dbConfig.user}\n`);

    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database connection successful!\n");

    // Test 2: ทดสอบ basic query
    console.log("2️⃣ Testing basic query...");
    const [basicResult] = await connection.execute("SELECT 1 as test");
    console.log("✅ Basic query successful:", basicResult[0]);
    console.log("");

    // Test 3: ทดสอบ tours table
    console.log("3️⃣ Testing tours table...");
    const [countResult] = await connection.execute(
      "SELECT COUNT(*) as count FROM tours"
    );
    console.log(`✅ Tours table found with ${countResult[0].count} records\n`);

    // Test 4: ทดสอบ sample tour data
    console.log("4️⃣ Testing sample tour data...");
    const [sampleTours] = await connection.execute(`
      SELECT id, title, destination, base_price, rating, slug 
      FROM tours 
      LIMIT 3
    `);

    if (sampleTours.length > 0) {
      console.log("✅ Sample tours found:");
      sampleTours.forEach((tour) => {
        console.log(
          `   - ${tour.title} (${tour.destination}) - ฿${tour.base_price}`
        );
      });
      console.log("");
    } else {
      console.log("⚠️  No tour data found in database\n");
    }

    // Test 5: ทดสอบ tours by destination
    console.log("5️⃣ Testing tours by destination (krabi)...");
    const [krabiTours] = await connection.execute(
      `
      SELECT id, title, base_price, is_featured 
      FROM tours 
      WHERE destination = ? 
      ORDER BY is_featured DESC, rating DESC 
      LIMIT 3
    `,
      ["krabi"]
    );

    if (krabiTours.length > 0) {
      console.log("✅ Krabi tours found:");
      krabiTours.forEach((tour) => {
        const featured = tour.is_featured ? "⭐ Featured" : "";
        console.log(`   - ${tour.title} - ฿${tour.base_price} ${featured}`);
      });
      console.log("");
    } else {
      console.log("⚠️  No Krabi tours found\n");
    }

    // Test 6: ทดสอบ table structure
    console.log("6️⃣ Testing database structure...");
    const [tables] = await connection.execute("SHOW TABLES");
    console.log("✅ Available tables:");
    tables.forEach((table) => {
      const tableName = Object.values(table)[0];
      console.log(`   - ${tableName}`);
    });

    console.log("\n🎉 All database tests completed successfully!");
    console.log("\n✅ Your database is ready for the application!");
    console.log("\nNext steps:");
    console.log("1. Start your development server: npm run dev");
    console.log("2. Check if tour listings load correctly");
    console.log("3. Test the tour detail pages");
  } catch (error) {
    console.error("❌ Database test failed:", error.message);
    console.error("\n🔍 Troubleshooting:");

    if (error.code === "ENOTFOUND") {
      console.error("- Check if the host IP address is correct");
      console.error("- Verify your internet connection");
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("- Check username and password");
      console.error("- Verify database user permissions");
    } else if (error.code === "ECONNREFUSED") {
      console.error("- Check if port 3306 is open");
      console.error("- Verify remote access is enabled in Plesk");
      console.error("- Make sure your IP is whitelisted");
    } else if (error.code === "ETIMEDOUT") {
      console.error("- Connection timeout - check firewall settings");
      console.error("- Verify remote access is properly configured");
    } else {
      console.error("- Error code:", error.code);
      console.error("- Error errno:", error.errno);
    }

    console.error(
      "\n📞 If the issue persists, contact HostAtom support with this error information."
    );
  } finally {
    if (connection) {
      await connection.end();
      console.log("\n🔌 Database connection closed.");
    }
  }
};

// Run tests
runTests().catch((error) => {
  console.error("❌ Unexpected error:", error);
  process.exit(1);
});
