import { Controller, Get, Post, Param, Body, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { TenantGuard } from "../../common/guards/tenant.guard";
import { TenantId } from "../../common/decorators/tenant-id.decorator";

@Controller("marketing")
@UseGuards(JwtAuthGuard, TenantGuard)
export class MarketingController {
  @Get("campaigns")
  async getCampaigns(@TenantId() tenantId: string) {
    return { data: [], total: 0 };
  }

  @Post("campaigns")
  async createCampaign(@Body() data: any, @TenantId() tenantId: string) {
    return { success: true, id: "stub-campaign-id", ...data };
  }

  @Post("campaigns/:id/send")
  async sendCampaign(@Param("id") id: string) {
    return { success: true, message: `Campaign ${id} sent` };
  }

  @Post("campaigns/send-sms")
  async sendSms(@Body() data: any) {
    return { success: true, message: "SMS sent" };
  }

  @Post("campaigns/send-email")
  async sendEmail(@Body() data: any) {
    return { success: true, message: "Email sent" };
  }

  @Post("promos")
  async createPromo(@Body() data: any) {
    return { success: true, id: "stub-promo-id", ...data };
  }
}
