import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { TenantGuard } from "../../common/guards/tenant.guard";
import { TenantId } from "../../common/decorators/tenant-id.decorator";

@Controller("email-analytics")
@UseGuards(JwtAuthGuard, TenantGuard)
export class EmailAnalyticsController {
  @Get("overall")
  async getOverallAnalytics(@TenantId() tenantId: string) {
    return {
      totalSent: 0,
      totalDelivered: 0,
      totalOpened: 0,
      totalClicked: 0,
      openRate: 0,
      clickRate: 0,
      bounceRate: 0,
    };
  }

  @Get("campaign/:id")
  async getCampaignAnalytics(@Param("id") id: string) {
    return {
      campaignId: id,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
    };
  }
}
