import { Controller, Get, Post, Put, Param, Body, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { TenantGuard } from "../../common/guards/tenant.guard";
import { TenantId } from "../../common/decorators/tenant-id.decorator";

@Controller("email-scheduler")
@UseGuards(JwtAuthGuard, TenantGuard)
export class EmailSchedulerController {
  @Get()
  async getScheduled(@TenantId() tenantId: string) {
    return { data: [], total: 0 };
  }

  @Post()
  async createScheduled(@Body() data: any, @TenantId() tenantId: string) {
    return { success: true, id: "stub-schedule-id", ...data };
  }

  @Put(":id")
  async updateScheduled(@Param("id") id: string, @Body() data: any) {
    return { success: true, id, ...data };
  }

  @Post(":id/cancel")
  async cancelScheduled(@Param("id") id: string) {
    return { success: true, message: `Schedule ${id} cancelled` };
  }
}
