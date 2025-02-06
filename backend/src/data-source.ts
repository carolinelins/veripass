import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "formulaire",
  synchronize: true, // ⚠️ Use apenas em dev, pois recria tabelas automaticamente!
  logging: false,
  entities: ["src/entities/*.ts"], // Certifique-se de que está no caminho correto
  migrations: ["src/migrations/*.ts"],
})

AppDataSource.initialize()
  .then(() => console.log("📌 Database connected!"))
  .catch((error) => console.error("❌ Database connection failed:", error));