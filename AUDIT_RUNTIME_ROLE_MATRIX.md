# RUNTIME ROLE MATRIX REPORT

Generated: 2026-03-01T13:56:04.895Z

## Per-Role Summary

| Role | OK | Route Blocked | API Denied | Unmapped | 
|---|---:|---:|---:|---:|
| GUEST | 11 | 298 | 5 | 0 |
| SUPER_ADMIN | 278 | 36 | 0 | 0 |
| ADMIN_TENANT | 216 | 98 | 0 | 0 |
| SUPERVISOR | 125 | 182 | 7 | 0 |
| CASHIER | 67 | 224 | 23 | 0 |
| KITCHEN | 28 | 274 | 12 | 0 |

## Non-Guest Mismatch Candidates

- role=SUPERVISOR | type=api-denied | route=pricing | page=client\src\views\marketing\Pricing.vue | api=GET /addons/available | backend=GET /addons/available | ref=nest\src\modules\addon\addon.controller.ts:39
- role=CASHIER | type=api-denied | route=pricing | page=client\src\views\marketing\Pricing.vue | api=GET /addons/available | backend=GET /addons/available | ref=nest\src\modules\addon\addon.controller.ts:39
- role=KITCHEN | type=api-denied | route=pricing | page=client\src\views\marketing\Pricing.vue | api=GET /addons/available | backend=GET /addons/available | ref=nest\src\modules\addon\addon.controller.ts:39
- role=CASHIER | type=api-denied | route=/login | page=client\src\views\auth\Login.vue | api=GET /outlets | backend=GET /outlets | ref=nest\src\modules\outlets\outlets.controller.ts:32
- role=KITCHEN | type=api-denied | route=/login | page=client\src\views\auth\Login.vue | api=GET /outlets | backend=GET /outlets | ref=nest\src\modules\outlets\outlets.controller.ts:32
- role=KITCHEN | type=api-denied | route=/payment/success | page=client\src\views\payment\PaymentCallback.vue | api=GET /payment/status/${orderId.value} | backend=GET /payment/status/:orderId | ref=nest\src\modules\payments\payment-legacy.controller.ts:55
- role=KITCHEN | type=api-denied | route=/payment/error | page=client\src\views\payment\PaymentCallback.vue | api=GET /payment/status/${orderId.value} | backend=GET /payment/status/:orderId | ref=nest\src\modules\payments\payment-legacy.controller.ts:55
- role=KITCHEN | type=api-denied | route=/payment/pending | page=client\src\views\payment\PaymentCallback.vue | api=GET /payment/status/${orderId.value} | backend=GET /payment/status/:orderId | ref=nest\src\modules\payments\payment-legacy.controller.ts:55
- role=CASHIER | type=api-denied | route=products | page=client\src\views\products\Products.vue | api=PUT /products/${product.id} | backend=PUT /products/:id | ref=nest\src\modules\products\products.controller.ts:61
- role=CASHIER | type=api-denied | route=products | page=client\src\views\products\Products.vue | api=DELETE /products/${id} | backend=DELETE /products/:id | ref=nest\src\modules\products\products.controller.ts:72
- role=CASHIER | type=api-denied | route=products | page=client\src\views\products\Products.vue | api=GET /addons/check-limit/ADD_PRODUCTS | backend=GET /addons/check-limit/:code | ref=nest\src\modules\addon\addon.controller.ts:103
- role=CASHIER | type=api-denied | route=products | page=client\src\views\products\Products.vue | api=PUT /products/${product.id} | backend=PUT /products/:id | ref=nest\src\modules\products\products.controller.ts:61
- role=CASHIER | type=api-denied | route=products | page=client\src\views\products\Products.vue | api=PUT /products/${product.id} | backend=PUT /products/:id | ref=nest\src\modules\products\products.controller.ts:61
- role=CASHIER | type=api-denied | route=products | page=client\src\views\products\Products.vue | api=PUT /products/${editingProduct.value.id} | backend=PUT /products/:id | ref=nest\src\modules\products\products.controller.ts:61
- role=CASHIER | type=api-denied | route=products | page=client\src\views\products\Products.vue | api=POST /products | backend=POST /products | ref=nest\src\modules\products\products.controller.ts:54
- role=CASHIER | type=api-denied | route=products | page=client\src\views\products\Products.vue | api=DELETE /products/${id} | backend=DELETE /products/:id | ref=nest\src\modules\products\products.controller.ts:72
- role=CASHIER | type=api-denied | route=products | page=client\src\views\products\Products.vue | api=POST /products | backend=POST /products | ref=nest\src\modules\products\products.controller.ts:54
- role=CASHIER | type=api-denied | route=products | page=client\src\views\products\Products.vue | api=POST /products | backend=POST /products | ref=nest\src\modules\products\products.controller.ts:54
- role=CASHIER | type=api-denied | route=orders | page=client\src\views\orders\Orders.vue | api=GET /orders/${order.id} | backend=GET /orders/export | ref=nest\src\modules\orders\orders.controller.ts:42
- role=KITCHEN | type=api-denied | route=orders | page=client\src\views\orders\Orders.vue | api=GET /orders/${order.id} | backend=GET /orders/export | ref=nest\src\modules\orders\orders.controller.ts:42
- role=CASHIER | type=api-denied | route=orders | page=client\src\views\orders\Orders.vue | api=GET /orders/${order.id} | backend=GET /orders/export | ref=nest\src\modules\orders\orders.controller.ts:42
- role=KITCHEN | type=api-denied | route=orders | page=client\src\views\orders\Orders.vue | api=GET /orders/${order.id} | backend=GET /orders/export | ref=nest\src\modules\orders\orders.controller.ts:42
- role=CASHIER | type=api-denied | route=orders | page=client\src\views\orders\Orders.vue | api=PUT /orders/${id} | backend=PUT /orders/bulk-update-kitchen | ref=nest\src\modules\orders\orders.controller.ts:126
- role=CASHIER | type=api-denied | route=orders | page=client\src\views\orders\Orders.vue | api=GET /orders/${order.id} | backend=GET /orders/export | ref=nest\src\modules\orders\orders.controller.ts:42
- role=KITCHEN | type=api-denied | route=orders | page=client\src\views\orders\Orders.vue | api=GET /orders/${order.id} | backend=GET /orders/export | ref=nest\src\modules\orders\orders.controller.ts:42
- role=CASHIER | type=api-denied | route=orders | page=client\src\views\orders\Orders.vue | api=DELETE /orders/${id} | backend=DELETE /orders/:id | ref=nest\src\modules\orders\orders.controller.ts:171
- role=KITCHEN | type=api-denied | route=orders | page=client\src\views\orders\Orders.vue | api=DELETE /orders/${id} | backend=DELETE /orders/:id | ref=nest\src\modules\orders\orders.controller.ts:171
- role=CASHIER | type=api-denied | route=orders | page=client\src\views\orders\Orders.vue | api=POST /orders/bulk-delete | backend=POST /orders/bulk-delete | ref=nest\src\modules\orders\orders.controller.ts:152
- role=KITCHEN | type=api-denied | route=orders | page=client\src\views\orders\Orders.vue | api=POST /orders/bulk-delete | backend=POST /orders/bulk-delete | ref=nest\src\modules\orders\orders.controller.ts:152
- role=CASHIER | type=api-denied | route=orders | page=client\src\views\orders\Orders.vue | api=POST /orders/bulk-refund | backend=POST /orders/bulk-refund | ref=nest\src\modules\orders\orders.controller.ts:143
- role=KITCHEN | type=api-denied | route=orders | page=client\src\views\orders\Orders.vue | api=POST /orders/bulk-refund | backend=POST /orders/bulk-refund | ref=nest\src\modules\orders\orders.controller.ts:143
- role=CASHIER | type=api-denied | route=orders | page=client\src\views\orders\Orders.vue | api=POST /orders/bulk-delete | backend=POST /orders/bulk-delete | ref=nest\src\modules\orders\orders.controller.ts:152
- role=KITCHEN | type=api-denied | route=orders | page=client\src\views\orders\Orders.vue | api=POST /orders/bulk-delete | backend=POST /orders/bulk-delete | ref=nest\src\modules\orders\orders.controller.ts:152
- role=CASHIER | type=api-denied | route=customers | page=client\src\views\customers\Customers.vue | api=DELETE /customers/${id} | backend=DELETE /customers/:id | ref=nest\src\modules\customers\customers.controller.ts:84
- role=CASHIER | type=api-denied | route=customers | page=client\src\views\customers\Customers.vue | api=DELETE /customers/${id} | backend=DELETE /customers/:id | ref=nest\src\modules\customers\customers.controller.ts:84
- role=CASHIER | type=api-denied | route=customers | page=client\src\views\customers\Customers.vue | api=GET /addons | backend=GET /addons | ref=nest\src\modules\addon\addon.controller.ts:27
- role=SUPERVISOR | type=api-denied | route=users | page=client\src\views\users\Users.vue | api=PUT /users/${editingUser.value.id} | backend=PUT /users/:id | ref=nest\src\modules\users\users.controller.ts:83
- role=SUPERVISOR | type=api-denied | route=users | page=client\src\views\users\Users.vue | api=POST /users | backend=POST /users | ref=nest\src\modules\users\users.controller.ts:59
- role=SUPERVISOR | type=api-denied | route=users | page=client\src\views\users\Users.vue | api=DELETE /users/${id} | backend=DELETE /users/:id | ref=nest\src\modules\users\users.controller.ts:93
- role=SUPERVISOR | type=api-denied | route=stores | page=client\src\views\stores\Stores.vue | api=POST /outlets | backend=POST /outlets | ref=nest\src\modules\outlets\outlets.controller.ts:53
- role=SUPERVISOR | type=api-denied | route=stores | page=client\src\views\stores\Stores.vue | api=DELETE /outlets/${store.id} | backend=DELETE /outlets/:id | ref=nest\src\modules\outlets\outlets.controller.ts:77
- role=SUPERVISOR | type=api-denied | route=delivery | page=client\src\views\delivery\DeliveryOrders.vue | api=POST /delivery/couriers | backend=POST /delivery/couriers | ref=nest\src\modules\delivery\delivery.controller.ts:41

## Critical Route Checklist (manual runtime)

- [ ] Validate route `dashboard` for all roles with expected 200/403
- [ ] Validate route `orders` for all roles with expected 200/403
- [ ] Validate route `customers` for all roles with expected 200/403
- [ ] Validate route `products` for all roles with expected 200/403
- [ ] Validate route `pos` for all roles with expected 200/403
- [ ] Validate route `open-shift` for all roles with expected 200/403
- [ ] Validate route `settings/store` for all roles with expected 200/403
- [ ] Validate route `settings/password` for all roles with expected 200/403
- [ ] Validate route `settings/2fa` for all roles with expected 200/403
- [ ] Validate route `marketing` for all roles with expected 200/403
- [ ] Validate route `reports/advanced` for all roles with expected 200/403
- [ ] Validate route `tenants` for all roles with expected 200/403
- [ ] Validate route `tenants/:id` for all roles with expected 200/403
- [ ] Validate route `superadmin/backups` for all roles with expected 200/403
- [ ] Validate route `/payment/success` for all roles with expected 200/403
- [ ] Validate route `/payment/error` for all roles with expected 200/403
- [ ] Validate route `/payment/pending` for all roles with expected 200/403
