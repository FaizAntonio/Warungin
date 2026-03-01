import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminMonitorModule } from "../admin-monitor/admin-monitor.module";

@Module({
  imports: [AdminMonitorModule],
  controllers: [AdminController],
})
export class AdminModule {}
