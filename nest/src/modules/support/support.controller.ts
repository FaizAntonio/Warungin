import { Controller, Get, Post, Put, Param, Body, UseGuards, Request } from "@nestjs/common";
import { SupportService } from "./support.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { TenantGuard } from "../../common/guards/tenant.guard";
import { TenantId } from "../../common/decorators/tenant-id.decorator";

@Controller("support")
@UseGuards(JwtAuthGuard, TenantGuard)
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get("tickets")
  async getTickets(@TenantId() tenantId: string) {
    return this.supportService.getTickets(tenantId);
  }

  @Post("tickets")
  async createTicket(@Body() data: any, @TenantId() tenantId: string, @Request() req: any) {
    return this.supportService.createTicket(data, tenantId, req.user?.id);
  }

  @Put("tickets/:id/assign")
  async assignTicket(@Param("id") id: string, @Body() data: any) {
    return this.supportService.assignTicket(id, data);
  }

  @Post("tickets/:id/notes")
  async addNote(@Param("id") id: string, @Body() data: any) {
    return this.supportService.addNote(id, data);
  }

  @Post("tickets/:id/reply")
  async replyTicket(@Param("id") id: string, @Body() data: any) {
    return this.supportService.replyTicket(id, data);
  }
}
