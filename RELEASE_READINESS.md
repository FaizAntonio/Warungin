# RELEASE READINESS

Generated: 2026-03-02T04:48:00.080Z

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

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\financial-management\financial-management.service.ts
  70:11  warning  'monthlyOrders' is assigned a value but never used  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\internal\internal.service.ts
  22:30  warning  'body' is defined but never used. Allowed unused args must match /^_/u  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\members\members.service.ts
   12:3   warning  'PAGINATION_DEFAULT_LIMIT' is defined but never used  @typescript-eslint/no-unused-vars
   13:3   warning  'PAGINATION_DEFAULT_PAGE' is defined but never used   @typescript-eslint/no-unused-vars
   14:3   warning  'PAGINATION_MAX_LIMIT' is defined but never used      @typescript-eslint/no-unused-vars
  200:11  warning  'member' is assigned a value but never used           @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\orders\dto\create-order.dto.ts
  1:85  warning  'IsEnum' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\orders\dto\get-orders.dto.ts
  1:40  warning  'Min' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\Iz\Documents\New Replit\Warungin\Warungin\nest\src\modules\orders\orders.service.ts
    5:3   warning  'ForbiddenException' is defined but never used  @typescript-eslint/no-unused-vars
    9:10  warning  'CreateOrderDto' is defined but never used      @typescript-eslint/no-unused-vars
  136:11  warning  'order' is assigned a value but never used      @typescript-eslint/no-unused-vars
  161:11  warning  'order' is assigned a value but never used      @typescript-eslint/no-unused
```