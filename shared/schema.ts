import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Patients table for inpatient module
export const patients = pgTable("patients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nama: text("nama").notNull(),
  nik: varchar("nik", { length: 16 }).notNull().unique(),
  diagnosa: text("diagnosa").notNull(),
  tanggalMasuk: timestamp("tanggal_masuk").notNull(),
  dokterPenanggungJawab: text("dokter_penanggung_jawab").notNull(),
  ruangan: text("ruangan").notNull(),
});

export const insertPatientSchema = createInsertSchema(patients).omit({
  id: true,
}).extend({
  nik: z.string().length(16, "NIK harus terdiri dari 16 digit").regex(/^\d+$/, "NIK hanya boleh berisi angka"),
  nama: z.string().min(2, "Nama minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
  diagnosa: z.string().min(5, "Diagnosa minimal 5 karakter"),
  dokterPenanggungJawab: z.string().min(2, "Nama dokter minimal 2 karakter"),
  ruangan: z.string().min(1, "Ruangan harus diisi"),
});

export type InsertPatient = z.infer<typeof insertPatientSchema>;
export type Patient = typeof patients.$inferSelect;

// Legacy user schema - keeping for compatibility
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
