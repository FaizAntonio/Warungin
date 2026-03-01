import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { TenantGuard } from "../../common/guards/tenant.guard";
import { TenantId } from "../../common/decorators/tenant-id.decorator";

@Controller("email-templates")
@UseGuards(JwtAuthGuard, TenantGuard)
export class EmailTemplatesController {
  @Get()
  async getTemplates(@TenantId() tenantId: string) {
    return { data: [], total: 0 };
  }

  @Post()
  async createTemplate(@Body() data: any, @TenantId() tenantId: string) {
    return { success: true, id: "stub-template-id", ...data };
  }

  @Put(":id")
  async updateTemplate(@Param("id") id: string, @Body() data: any) {
    return { success: true, id, ...data };
  }

  @Delete(":id")
  async deleteTemplate(@Param("id") id: string) {
    return { success: true, message: `Template ${id} deleted` };
  }
}
