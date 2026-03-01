import { Controller, Get, Put, Body, UseGuards } from "@nestjs/common";
import { TenantProfileService } from "./tenant-profile.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { TenantGuard } from "../../common/guards/tenant.guard";
import { TenantId } from "../../common/decorators/tenant-id.decorator";

@Controller("tenant")
@UseGuards(JwtAuthGuard, TenantGuard)
export class TenantProfileController {
  constructor(private readonly tenantProfileService: TenantProfileService) {}

  @Get("profile")
  async getProfile(@TenantId() tenantId: string) {
    return this.tenantProfileService.getProfile(tenantId);
  }

  @Put("profile")
  async updateProfile(@Body() data: any, @TenantId() tenantId: string) {
    return this.tenantProfileService.updateProfile(tenantId, data);
  }
}
