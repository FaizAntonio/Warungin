# AUDIT BUG REPORT

Generated: 2026-03-01

## Audit Scope

- Source of truth: router + page API call mapping + backend controller auth/roles + runtime-oriented role matrix.
- Reports used:
  - `AUDIT_PAGE_API_REPORT.md`
  - `AUDIT_AUTH_ROUTE_API_MATRIX.md`
  - `AUDIT_RUNTIME_ROLE_MATRIX.md`

## Current Status

- P0 blocker: **0**
- P1 confirmed mismatch (static auth/route/api): **0**
- P2 confirmed mismatch (static auth/route/api): **0**
- Runtime role-candidate mismatch: **exists** (mostly page-level mixed action permissions that need manual per-role verification).

## Priority Findings

### P0 (None)

- No direct public-route to protected-api bug left from static matcher.

### P1 Candidate (Role Runtime, Manual Verify)

- `products` page includes actions denied for `CASHIER` (create/update/delete product endpoints).
  - Page: `client/src/views/products/Products.vue`
  - Backend refs: `nest/src/modules/products/products.controller.ts:54`, `nest/src/modules/products/products.controller.ts:61`, `nest/src/modules/products/products.controller.ts:72`
- `orders` page includes admin actions denied for lower roles (bulk delete/refund/delete order).
  - Page: `client/src/views/orders/Orders.vue`
  - Backend refs: `nest/src/modules/orders/orders.controller.ts:143`, `nest/src/modules/orders/orders.controller.ts:152`, `nest/src/modules/orders/orders.controller.ts:171`
- `users` page includes CRUD actions denied for `SUPERVISOR`.
  - Page: `client/src/views/users/Users.vue`
  - Backend refs: `nest/src/modules/users/users.controller.ts:59`, `nest/src/modules/users/users.controller.ts:83`, `nest/src/modules/users/users.controller.ts:93`
- `stores` page includes create/delete outlet actions denied for `SUPERVISOR`.
  - Page: `client/src/views/stores/Stores.vue`
  - Backend refs: `nest/src/modules/outlets/outlets.controller.ts:53`, `nest/src/modules/outlets/outlets.controller.ts:77`

## Interpretation

- Candidate findings above are not always bugs: several pages intentionally combine read access for lower roles with restricted write actions.
- Final verdict requires runtime check that restricted actions are hidden/disabled in UI and return proper `403` if called directly.

## Runtime Verification Checklist (Next)

- For each role (`SUPER_ADMIN`, `ADMIN_TENANT`, `SUPERVISOR`, `CASHIER`, `KITCHEN`) validate:
  - Route access (200/redirect/403 expected).
  - Button/action visibility for restricted operations.
  - API response for forced action calls (should be 403 for denied role).
- Critical routes to verify first:
  - `orders`, `products`, `users`, `stores`, `delivery`, `settings/password`, `settings/2fa`, `tenants/:id`, `superadmin/backups`.
