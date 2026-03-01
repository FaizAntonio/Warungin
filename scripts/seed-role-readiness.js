#!/usr/bin/env node

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env.local") });

const bcrypt = require("bcryptjs");
const { PrismaClient } = require("../nest/src/generated/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.tenant.upsert({
    where: { slug: "audit-tenant" },
    update: {},
    create: {
      name: "Audit Tenant",
      slug: "audit-tenant",
      email: "tenant-audit@example.com",
      isActive: true,
    },
  });

  const tenant = await prisma.tenant.findUnique({ where: { slug: "audit-tenant" } });
  if (!tenant) {
    throw new Error("Failed to resolve audit tenant after upsert.");
  }

  const hashedPassword = await bcrypt.hash("Password123!", 10);
  const users = [
    { email: "superadmin.audit@example.com", role: "SUPER_ADMIN", name: "Super Admin Audit" },
    { email: "admin.audit@example.com", role: "ADMIN_TENANT", name: "Admin Tenant Audit" },
    { email: "supervisor.audit@example.com", role: "SUPERVISOR", name: "Supervisor Audit" },
    { email: "cashier.audit@example.com", role: "CASHIER", name: "Cashier Audit" },
    { email: "kitchen.audit@example.com", role: "KITCHEN", name: "Kitchen Audit" },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { tenantId_email: { tenantId: tenant.id, email: user.email } },
      update: {
        name: user.name,
        role: user.role,
        isActive: true,
      },
      create: {
        tenantId: tenant.id,
        email: user.email,
        password: hashedPassword,
        name: user.name,
        role: user.role,
        isActive: true,
      },
    });
  }

  console.log("Role readiness seed completed.");
}

main()
  .catch((error) => {
    console.error("Failed to seed role readiness:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
