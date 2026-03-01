import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { AdminMonitorService } from "../admin-monitor/admin-monitor.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";

@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminMonitorService: AdminMonitorService) {}

  @Get("health")
  @Roles("SUPER_ADMIN")
  async getHealth() {
    return this.adminMonitorService.getSystemHealth();
  }

  @Get("server/resources")
  @Roles("SUPER_ADMIN")
  async getServerResources() {
    return this.adminMonitorService.getServerResources();
  }

  @Get("docker/containers")
  @Roles("SUPER_ADMIN")
  async getDockerContainers() {
    return this.adminMonitorService.getDockerContainers();
  }

  @Get("docker/logs/:name")
  @Roles("SUPER_ADMIN")
  async getDockerLogs(@Param("name") name: string) {
    return this.adminMonitorService.getContainerLogs(name);
  }

  @Post("docker/restart/:name")
  @Roles("SUPER_ADMIN")
  async restartContainer(@Param("name") name: string) {
    return this.adminMonitorService.restartContainer(name);
  }

  @Post("docker/stop/:name")
  @Roles("SUPER_ADMIN")
  async stopContainer(@Param("name") name: string) {
    return this.adminMonitorService.stopContainer(name);
  }

  @Get("logs/:type")
  @Roles("SUPER_ADMIN")
  async getLogs(@Param("type") type: string) {
    return { data: [], type, total: 0 };
  }

  @Get("subscriptions/:id")
  @Roles("SUPER_ADMIN")
  async getSubscription(@Param("id") id: string) {
    return { id, plan: "BASIC", status: "ACTIVE", startDate: new Date(), endDate: new Date() };
  }

  @Put("subscriptions/:id")
  @Roles("SUPER_ADMIN")
  async updateSubscription(@Param("id") id: string, @Body() data: any) {
    return { success: true, id, ...data };
  }

  @Delete("subscriptions/:id")
  @Roles("SUPER_ADMIN")
  async deleteSubscription(@Param("id") id: string) {
    return { success: true, message: `Subscription ${id} deleted` };
  }

  @Get("addons-purchase/:id")
  @Roles("SUPER_ADMIN")
  async getAddonPurchase(@Param("id") id: string) {
    return { id, addons: [] };
  }

  @Put("addons-purchase/:id")
  @Roles("SUPER_ADMIN")
  async updateAddonPurchase(@Param("id") id: string, @Body() data: any) {
    return { success: true, id, ...data };
  }

  @Delete("addons-purchase/:id")
  @Roles("SUPER_ADMIN")
  async deleteAddonPurchase(@Param("id") id: string) {
    return { success: true, message: `Addon purchase ${id} deleted` };
  }
}
