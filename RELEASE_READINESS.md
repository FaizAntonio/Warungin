# RELEASE READINESS

Generated: 2026-03-01T15:43:42.763Z

## Command Results

| Check | Command | Required | Status | Exit |
|---|---|---|---|---:|
| Full local audit pipeline | `npm run audit:local` | yes | PASS | 0 |
| Audit health summary | `npm run audit:status` | yes | PASS | 0 |
| Audit gate enforcement | `npm run audit:gate` | yes | PASS | 0 |
| Type/lint/prisma validation | `npm run check:all` | no | FAIL | 1 |

## Verdict

- Overall: READY
- Failed required checks: 0
- Failed optional checks: 1

## Failed Check Details

### Type/lint/prisma validation
- Required: no
```text
> warungin@2.0.0 check:all
> npm run type-check && npm run lint && cd client && npm run lint && cd .. && npx prisma validate && npm run prisma:generate


> warungin@2.0.0 type-check
> cd nest && npx tsc --noEmit && cd ../client && npx vue-tsc --noEmit && cd ..


> warungin@2.0.0 lint
> cd nest && npx eslint src --ext .ts


C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\common\exceptions\custom-exceptions.ts
  136:15  warning  'resourceTenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars
  136:41  warning  'requestTenantId' is defined but never used. Allowed unused args must match /^_/u   @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\common\pipes\enhanced-validation.pipe.ts
   4:3   warning  'BadRequestException' is defined but never used      @typescript-eslint/no-unused-vars
  20:11  warning  'primitiveTypes' is assigned a value but never used  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\common\utils\performance.util.ts
  2:10  warning  'Transform' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\2fa\two-factor.service.ts
  38:41  warning  'code' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\admin-monitor\admin-monitor.service.ts
  64:26  warning  'name' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\analytics\analytics.controller.ts
  75:59  warning  'tenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars
  81:65  warning  'tenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\archive\archive.controller.ts
   95:72  warning  'daysOld' is assigned a value but never used                                @typescript-eslint/no-unused-vars
  101:77  warning  'daysOld' is assigned a value but never used                                @typescript-eslint/no-unused-vars
  107:36  warning  'tenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars
  107:62  warning  'body' is defined but never used. Allowed unused args must match /^_/u      @typescript-eslint/no-unused-vars
  113:37  warning  'tenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars
  203:41  warning  'tenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars
  209:46  warning  'tenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars
  215:41  warning  'tenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars
  215:67  warning  'body' is defined but never used. Allowed unused args must match /^_/u      @typescript-eslint/no-unused-vars
  221:42  warning  'tenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\archive\archive.service.ts
  39:25  warning  'tenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars
  39:43  warning  'daysOld' is defined but never used. Allowed unused args must match /^_/u   @typescript-eslint/no-unused-vars
  47:26  warning  'tenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars
  47:44  warning  'daysOld' is defined but never used. Allowed unused args must match /^_/u   @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\audit-log\audit-log.service.ts
  67:37  warning  'tenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\auth\auth.controller.ts
  7:3  warning  'Req' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\customers\customers.service.ts
  171:11  warning  'customer' is assigned a value but never used                               @typescript-eslint/no-unused-vars
  225:11  warning  'customer' is assigned a value but never used                               @typescript-eslint/no-unused-vars
  250:26  warning  'id' is defined but never used. Allowed unused args must match /^_/u        @typescript-eslint/no-unused-vars
  250:38  warning  'tenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars
  254:28  warning  'id' is defined but never used. Allowed unused args must match /^_/u        @typescript-eslint/no-unused-vars
  254:40  warning  'tenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\customers\dto\create-customer.dto.ts
  1:52  warning  'Min' is defined but never used  @typescript-eslint/no-unused-vars
  1:57  warning  'Max' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\customers\dto\get-customers.dto.ts
  1:42  warning  'Min' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\dashboard\dashboard.controller.ts
  16:10  warning  'Public' is defined but never used             @typescript-eslint/no-unused-vars
  62:13  warning  'userRole' is assigned a value but never used  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\delivery\delivery.service.ts
  84:27  warning  'tenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars
  89:5   warning  'orderId' is defined but never used. Allowed unused args must match /^_/u   @typescript-eslint/no-unused-vars
  90:5   warning  'tenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars
  91:5   warning  'data' is defined but never used. Allowed unused args must match /^_/u      @typescript-eslint/no-unused-vars
  97:5   warning  'data' is defined but never used. Allowed unused args must match /^_/u      @typescript-eslint/no-unused-vars
  98:5   warning  'tenantId' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\discount\discount.service.ts
  4:3  warning  'BadRequestException' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\discount\dto\create-discount.dto.ts
  6:3  warning  'IsObject' is defined but never used  @typescript-eslint/no-unused-vars
  9:3  warning  'Max' is defined but never used       @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\discount\dto\update-discount.dto.ts
  6:3  warning  'IsObject' is defined but never used  @typescript-eslint/no-unused-vars
  9:3  warning  'Max' is defined but never used       @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\employee\employee.service.ts
  144:11  warning  'employee' is assigned a value but never used  @typescript-eslint/no-unused-vars
  152:11  warning  'employee' is assigned a value but never used  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\W
```