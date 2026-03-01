import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { InternalService } from "./internal.service";
import { Public } from "../../common/decorators/public.decorator";
import { InternalApiKeyGuard } from "../../common/guards/internal-api-key.guard";

@Controller("internal")
export class InternalController {
  constructor(private readonly internalService: InternalService) {}

  @Public()
  @UseGuards(InternalApiKeyGuard)
  @Get("health")
  async healthCheck() {
    return this.internalService.healthCheck();
  }

  @Public()
  @UseGuards(InternalApiKeyGuard)
  @Get("info")
  async getSystemInfo() {
    return this.internalService.getSystemInfo();
  }

  @Public()
  @UseGuards(InternalApiKeyGuard)
  @Post("payment/webhook")
  async handlePaymentWebhook(@Body() body: any) {
    return this.internalService.handlePaymentWebhook(body);
  }

  @Public()
  @UseGuards(InternalApiKeyGuard)
  @Post("backup")
  async triggerBackup(@Body() body: { tenantId?: string; type?: string }) {
    return this.internalService.triggerBackup(body.tenantId, body.type);
  }

  @Public()
  @UseGuards(InternalApiKeyGuard)
  @Post("subscription/revert")
  async revertSubscriptions() {
    return this.internalService.revertSubscriptions();
  }

  @Public()
  @UseGuards(InternalApiKeyGuard)
  @Get("tenants/active")
  async getActiveTenants() {
    return { data: await this.internalService.getActiveTenants() };
  }

  @Public()
  @UseGuards(InternalApiKeyGuard)
  @Post("api-key/rotate")
  async rotateApiKey(@Body() body: { newKey: string }) {
    return this.internalService.rotateApiKey(body.newKey);
  }

  @Public()
  @UseGuards(InternalApiKeyGuard)
  @Get("api-key/history")
  async getApiKeyHistory() {
    return this.internalService.getApiKeyHistory();
  }
}
