import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { TwoFactorService } from "./two-factor.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";

@Controller("2fa")
export class TwoFactorController {
  constructor(private readonly twoFactorService: TwoFactorService) {}

  @Post("enable")
  @UseGuards(JwtAuthGuard)
  async enableTwoFactor(@CurrentUser() user: any) {
    return this.twoFactorService.enableTwoFactor(user.id);
  }

  @Post("disable")
  @UseGuards(JwtAuthGuard)
  async disableTwoFactor(@CurrentUser() user: any) {
    return this.twoFactorService.disableTwoFactor(user.id);
  }

  @Post("verify")
  @UseGuards(JwtAuthGuard)
  async verifyTwoFactor(
    @CurrentUser() user: any,
    @Body() body: { code: string },
  ) {
    return this.twoFactorService.verifyTwoFactor(user.id, body.code);
  }

  @Post("backup-codes")
  @UseGuards(JwtAuthGuard)
  async generateBackupCodes(@CurrentUser() user: any) {
    return this.twoFactorService.generateBackupCodes(user.id);
  }

  @Get("status")
  @UseGuards(JwtAuthGuard)
  async getTwoFactorStatus(@CurrentUser() user: any) {
    return this.twoFactorService.getTwoFactorStatus(user.id);
  }

  @Post("generate")
  @UseGuards(JwtAuthGuard)
  async generateTwoFactorSecret(@CurrentUser() user: any) {
    const crypto = await import("crypto");
    const secret = crypto.randomBytes(20).toString("hex");
    const qrCode = `otpauth://totp/POS:${user.email || user.id}?secret=${secret}&issuer=POS`;
    return { secret, qrCode };
  }
}
