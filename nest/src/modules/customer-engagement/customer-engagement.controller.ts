import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { TenantGuard } from "../../common/guards/tenant.guard";
import { TenantId } from "../../common/decorators/tenant-id.decorator";

@Controller("customer-engagement")
@UseGuards(JwtAuthGuard, TenantGuard)
export class CustomerEngagementController {
  @Get()
  async getEngagement(@TenantId() tenantId: string) {
    return {
      data: [],
      total: 0,
      activeCustomers: 0,
      inactiveCustomers: 0,
      retentionRate: 0,
    };
  }

  @Get("stats/overall")
  async getOverallStats(@TenantId() tenantId: string) {
    return {
      totalCustomers: 0,
      activeCustomers: 0,
      newCustomersThisMonth: 0,
      retentionRate: 0,
      averageOrderValue: 0,
      customerLifetimeValue: 0,
    };
  }
}
