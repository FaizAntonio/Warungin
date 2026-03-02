# PAGE-API AUDIT REPORT

Generated: 2026-03-02T06:23:42.960Z

## Coverage Summary
- Routed view files audited: 79
- View files with API calls: 63
- View files without direct API calls: 16
- API calls with unresolved backend base path: 0
- Duplicate route entries found: 0

## Routed Page -> API Mapping

### client\src\views\NotFound.vue
- No direct `api.*` call in page file

### client\src\views\Unauthorized.vue
- No direct `api.*` call in page file

### client\src\views\addons\Addons.vue
- GET /addons/available | base: addons | backend-base-exists: yes
- GET /addons | base: addons | backend-base-exists: yes
- GET /subscriptions/current | base: subscriptions | backend-base-exists: yes
- POST /payment/addon | base: payment | backend-base-exists: yes
- POST /addons/unsubscribe/${addonId} | base: addons | backend-base-exists: yes

### client\src\views\analytics\AdvancedAnalytics.vue
- GET /analytics/predictions | base: analytics | backend-base-exists: yes
- GET /analytics/top-products | base: analytics | backend-base-exists: yes
- GET /analytics/custom-reports | base: analytics | backend-base-exists: yes
- GET /outlets | base: outlets | backend-base-exists: yes
- GET /analytics/custom-reports/${report.id}/export | base: analytics | backend-base-exists: yes
- POST /analytics/custom-reports | base: analytics | backend-base-exists: yes

### client\src\views\auth\ForgotPassword.vue
- No direct `api.*` call in page file

### client\src\views\auth\Login.vue
- GET /outlets | base: outlets | backend-base-exists: yes

### client\src\views\cashier\CashShift.vue
- GET /store-shift/current | base: store-shift | backend-base-exists: yes
- GET /cash-shift/current | base: cash-shift | backend-base-exists: yes
- GET /cash-shift/history | base: cash-shift | backend-base-exists: yes
- POST /store-shift/open | base: store-shift | backend-base-exists: yes
- POST /cash-shift/open | base: cash-shift | backend-base-exists: yes
- POST /cash-shift/close | base: cash-shift | backend-base-exists: yes
- GET /store-shift/today | base: store-shift | backend-base-exists: yes
- GET /store-shift/history | base: store-shift | backend-base-exists: yes
- GET /cash-shift/history | base: cash-shift | backend-base-exists: yes
- GET /store-shift/${shiftId}/details | base: store-shift | backend-base-exists: yes

### client\src\views\cashier\OpenShift.vue
- GET /store-shift/current | base: store-shift | backend-base-exists: yes
- GET /cash-shift/current | base: cash-shift | backend-base-exists: yes
- GET /outlets/${selectedStoreId} | base: outlets | backend-base-exists: yes
- POST /store-shift/open | base: store-shift | backend-base-exists: yes
- POST /cash-shift/open | base: cash-shift | backend-base-exists: yes
- POST /cash-shift/close | base: cash-shift | backend-base-exists: yes

### client\src\views\customers\Customers.vue
- GET /customers | base: customers | backend-base-exists: yes
- PUT /customers/${editingCustomer.value.id} | base: customers | backend-base-exists: yes
- POST /customers | base: customers | backend-base-exists: yes
- DELETE /customers/${id} | base: customers | backend-base-exists: yes
- PUT /customers/${pointsCustomer.value.id} | base: customers | backend-base-exists: yes
- DELETE /customers/${id} | base: customers | backend-base-exists: yes
- GET /addons | base: addons | backend-base-exists: yes
- POST /marketing/campaigns/send-sms | base: marketing | backend-base-exists: yes
- POST /marketing/campaigns/send-email | base: marketing | backend-base-exists: yes
- POST /customers | base: customers | backend-base-exists: yes

### client\src\views\dashboard\Dashboard.vue
- GET /dashboard/stats | base: dashboard | backend-base-exists: yes
- GET /subscriptions/current | base: subscriptions | backend-base-exists: yes
- GET /orders | base: orders | backend-base-exists: yes

### client\src\views\delivery\DeliveryOrders.vue
- GET /delivery/orders | base: delivery | backend-base-exists: yes
- POST /delivery/orders/${orderId}/process | base: delivery | backend-base-exists: yes
- POST /delivery/couriers | base: delivery | backend-base-exists: yes
- POST /marketing/promos | base: marketing | backend-base-exists: yes

### client\src\views\discounts\Discounts.vue
- GET /products | base: products | backend-base-exists: yes
- GET /discounts | base: discounts | backend-base-exists: yes
- GET /products | base: products | backend-base-exists: yes
- GET /products | base: products | backend-base-exists: yes
- PUT /discounts/${editingDiscount.value.id} | base: discounts | backend-base-exists: yes
- POST /discounts | base: discounts | backend-base-exists: yes
- DELETE /discounts/${id} | base: discounts | backend-base-exists: yes

### client\src\views\finance\AccountingFinance.vue
- GET /finance/summary | base: finance | backend-base-exists: yes
- GET /finance/balance-sheet | base: finance | backend-base-exists: yes
- GET /finance/cash-flow | base: finance | backend-base-exists: yes

### client\src\views\finance\FinancialManagement.vue
- GET /financial-management/cash-flow/summary | base: financial-management | backend-base-exists: yes
- GET /financial-management/expenses/by-category | base: financial-management | backend-base-exists: yes
- POST /financial-management/tax/calculate | base: financial-management | backend-base-exists: yes
- GET /financial-management/forecast | base: financial-management | backend-base-exists: yes
- POST /financial-management/cash-flow | base: financial-management | backend-base-exists: yes
- POST /financial-management/expenses | base: financial-management | backend-base-exists: yes
- POST /financial-management/bank-reconciliation | base: financial-management | backend-base-exists: yes

### client\src\views\finance\ProfitLossReport.vue
- GET /finance/profit-loss | base: finance | backend-base-exists: yes
- GET /finance/profit-loss | base: finance | backend-base-exists: yes

### client\src\views\finance\Transactions.vue
- GET /orders | base: orders | backend-base-exists: yes
- GET /orders/export | base: orders | backend-base-exists: yes

### client\src\views\inventory\PurchaseOrders.vue
- GET /purchase-orders | base: purchase-orders | backend-base-exists: yes
- GET /suppliers | base: suppliers | backend-base-exists: yes
- GET /products | base: products | backend-base-exists: yes
- POST /purchase-orders | base: purchase-orders | backend-base-exists: yes
- PUT /purchase-orders/${po.id} | base: purchase-orders | backend-base-exists: yes
- POST /purchase-orders/${po.id}/receive | base: purchase-orders | backend-base-exists: yes
- POST /purchase-orders/${po.id}/cancel | base: purchase-orders | backend-base-exists: yes

### client\src\views\inventory\RestockSuggestions.vue
- GET /inventory/restock-suggestions | base: inventory | backend-base-exists: yes

### client\src\views\inventory\StockAlerts.vue
- GET /stock-alerts/low-stock | base: stock-alerts | backend-base-exists: yes
- GET /stock-alerts/stats | base: stock-alerts | backend-base-exists: yes
- POST /stock-alerts/send | base: stock-alerts | backend-base-exists: yes

### client\src\views\inventory\StockTransfers.vue
- GET /outlets | base: outlets | backend-base-exists: yes
- GET /products?limit=1000 | base: products | backend-base-exists: yes
- GET /stock-transfers | base: stock-transfers | backend-base-exists: yes
- POST /stock-transfers | base: stock-transfers | backend-base-exists: yes
- PUT /stock-transfers/${id}/cancel | base: stock-transfers | backend-base-exists: yes

### client\src\views\inventory\Suppliers.vue
- GET /suppliers | base: suppliers | backend-base-exists: yes
- PUT /suppliers/${editingSupplier.value.id} | base: suppliers | backend-base-exists: yes
- POST /suppliers | base: suppliers | backend-base-exists: yes
- DELETE /suppliers/${supplier.id} | base: suppliers | backend-base-exists: yes

### client\src\views\kitchen\KitchenOrders.vue
- GET /orders | base: orders | backend-base-exists: yes
- PUT /orders/${order.id}/kitchen-status | base: orders | backend-base-exists: yes

### client\src\views\marketing\Contact.vue
- POST /contact | base: contact | backend-base-exists: yes

### client\src\views\marketing\ContactSuccess.vue
- No direct `api.*` call in page file

### client\src\views\marketing\CustomerEngagement.vue
- GET /customer-engagement/stats/overall | base: customer-engagement | backend-base-exists: yes
- GET /customer-engagement | base: customer-engagement | backend-base-exists: yes

### client\src\views\marketing\Demo.vue
- POST /contact/demo | base: contact | backend-base-exists: yes

### client\src\views\marketing\EmailAnalytics.vue
- GET /email-analytics/overall | base: email-analytics | backend-base-exists: yes
- GET /marketing/campaigns | base: marketing | backend-base-exists: yes
- GET /email-analytics/campaign/${selectedCampaignId.value} | base: email-analytics | backend-base-exists: yes

### client\src\views\marketing\EmailScheduler.vue
- GET /email-scheduler | base: email-scheduler | backend-base-exists: yes
- PUT /email-scheduler/${editingSchedule.value.id} | base: email-scheduler | backend-base-exists: yes
- POST /email-scheduler | base: email-scheduler | backend-base-exists: yes
- POST /email-scheduler/${schedule.id}/cancel | base: email-scheduler | backend-base-exists: yes

### client\src\views\marketing\EmailTemplates.vue
- GET /email-templates | base: email-templates | backend-base-exists: yes
- PUT /email-templates/${editingTemplate.value.id} | base: email-templates | backend-base-exists: yes
- POST /email-templates | base: email-templates | backend-base-exists: yes
- DELETE /email-templates/${template.id} | base: email-templates | backend-base-exists: yes

### client\src\views\marketing\Help.vue
- No direct `api.*` call in page file

### client\src\views\marketing\HelpArticle.vue
- No direct `api.*` call in page file

### client\src\views\marketing\HelpCategory.vue
- No direct `api.*` call in page file

### client\src\views\marketing\Home.vue
- No direct `api.*` call in page file

### client\src\views\marketing\MarketingCampaigns.vue
- GET /marketing/campaigns | base: marketing | backend-base-exists: yes
- POST /marketing/campaigns/${campaignId}/send | base: marketing | backend-base-exists: yes
- POST /marketing/campaigns | base: marketing | backend-base-exists: yes

### client\src\views\marketing\Pricing.vue
- GET /addons/available | base: addons | backend-base-exists: yes

### client\src\views\marketing\Terms.vue
- No direct `api.*` call in page file

### client\src\views\orders\Orders.vue
- GET /orders | base: orders | backend-base-exists: yes
- GET /orders/${order.id} | base: orders | backend-base-exists: yes
- GET /orders/${order.id} | base: orders | backend-base-exists: yes
- PUT /orders/${id}/status | base: orders | backend-base-exists: yes
- GET /orders/${order.id} | base: orders | backend-base-exists: yes
- DELETE /orders/${id} | base: orders | backend-base-exists: yes
- POST /orders/bulk-delete | base: orders | backend-base-exists: yes
- POST /orders/bulk-refund | base: orders | backend-base-exists: yes
- POST /orders/bulk-delete | base: orders | backend-base-exists: yes

### client\src\views\payment\PaymentCallback.vue
- GET /payment/status/${orderId.value} | base: payment | backend-base-exists: yes

### client\src\views\pos\FailedSyncReview.vue
- POST /orders | base: orders | backend-base-exists: yes
- POST /transactions | base: transactions | backend-base-exists: yes

### client\src\views\pos\POS.vue
- GET /tenant/profile | base: tenant | backend-base-exists: yes
- GET /members | base: members | backend-base-exists: yes
- GET /discounts | base: discounts | backend-base-exists: yes
- POST /orders | base: orders | backend-base-exists: yes
- POST /transactions | base: transactions | backend-base-exists: yes
- POST /orders | base: orders | backend-base-exists: yes
- POST /transactions | base: transactions | backend-base-exists: yes
- GET /cash-shift/current | base: cash-shift | backend-base-exists: yes

### client\src\views\products\ProductAdjustments.vue
- GET /products/${productId} | base: products | backend-base-exists: yes
- GET /products/adjustments | base: products | backend-base-exists: yes
- GET /products | base: products | backend-base-exists: yes
- GET /outlets | base: outlets | backend-base-exists: yes
- GET /suppliers | base: suppliers | backend-base-exists: yes
- POST /products/adjustments | base: products | backend-base-exists: yes
- POST /products/adjustments | base: products | backend-base-exists: yes

### client\src\views\products\Products.vue
- PUT /products/${product.id} | base: products | backend-base-exists: yes
- DELETE /products/${id} | base: products | backend-base-exists: yes
- GET /products | base: products | backend-base-exists: yes
- GET /addons/check-limit/ADD_PRODUCTS | base: addons | backend-base-exists: yes
- PUT /products/${product.id} | base: products | backend-base-exists: yes
- PUT /products/${product.id} | base: products | backend-base-exists: yes
- PUT /products/${editingProduct.value.id} | base: products | backend-base-exists: yes
- POST /products | base: products | backend-base-exists: yes
- DELETE /products/${id} | base: products | backend-base-exists: yes
- POST /products | base: products | backend-base-exists: yes
- POST /products | base: products | backend-base-exists: yes

### client\src\views\receipts\ReceiptTemplates.vue
- GET /receipts/templates | base: receipts | backend-base-exists: yes
- PUT /receipts/templates/${editingTemplate.value.id} | base: receipts | backend-base-exists: yes
- POST /receipts/templates | base: receipts | backend-base-exists: yes
- POST /receipts/templates/${id}/set-default | base: receipts | backend-base-exists: yes
- DELETE /receipts/templates/${id} | base: receipts | backend-base-exists: yes

### client\src\views\reports\AdvancedReporting.vue
- GET /advanced-reporting/templates | base: advanced-reporting | backend-base-exists: yes
- GET /advanced-reporting/scheduled | base: advanced-reporting | backend-base-exists: yes
- GET /advanced-reporting/dashboard-settings | base: advanced-reporting | backend-base-exists: yes
- PUT /advanced-reporting/templates/${editingTemplate.value.id} | base: advanced-reporting | backend-base-exists: yes
- POST /advanced-reporting/templates | base: advanced-reporting | backend-base-exists: yes
- PUT /advanced-reporting/scheduled/${editingScheduleId.value} | base: advanced-reporting | backend-base-exists: yes
- POST /advanced-reporting/scheduled | base: advanced-reporting | backend-base-exists: yes
- PUT /advanced-reporting/dashboard-settings | base: advanced-reporting | backend-base-exists: yes
- POST /advanced-reporting/generate | base: advanced-reporting | backend-base-exists: yes
- DELETE /advanced-reporting/scheduled/${report.id} | base: advanced-reporting | backend-base-exists: yes

### client\src\views\reports\GlobalReports.vue
- GET /reports/global | base: reports | backend-base-exists: yes
- PUT /admin/subscriptions/${editingSubscription.value.id} | base: admin | backend-base-exists: yes
- DELETE /admin/subscriptions/${id} | base: admin | backend-base-exists: yes
- PUT /admin/addons-purchase/${editingAddon.value.id} | base: admin | backend-base-exists: yes
- DELETE /admin/addons-purchase/${id} | base: admin | backend-base-exists: yes

### client\src\views\reports\Reports.vue
- GET /reports/tenant | base: reports | backend-base-exists: yes
- GET /analytics/predictions | base: analytics | backend-base-exists: yes
- GET /analytics/top-products | base: analytics | backend-base-exists: yes

### client\src\views\reports\StoreReports.vue
- GET /reports/multi | base: reports | backend-base-exists: yes

### client\src\views\rewards\RewardView.vue
- POST /rewards/watch-ad | base: rewards | backend-base-exists: yes

### client\src\views\rewards\Rewards.vue
- GET /rewards/balance | base: rewards | backend-base-exists: yes
- GET /rewards/daily-limit | base: rewards | backend-base-exists: yes
- GET /rewards/transactions | base: rewards | backend-base-exists: yes
- GET /rewards/config | base: rewards | backend-base-exists: yes
- POST /rewards/redeem/subscription | base: rewards | backend-base-exists: yes
- POST /rewards/redeem/addon | base: rewards | backend-base-exists: yes

### client\src\views\settings\AdditionalComponentsGuide.vue
- No direct `api.*` call in page file

### client\src\views\settings\AdvancedComponentsGuide.vue
- No direct `api.*` call in page file

### client\src\views\settings\ArchiveManagement.vue
- GET /archives/stats | base: archives | backend-base-exists: yes
- GET /archives/files | base: archives | backend-base-exists: yes
- POST /archives/orders | base: archives | backend-base-exists: yes
- POST /archives/transactions | base: archives | backend-base-exists: yes
- POST /archives/reports | base: archives | backend-base-exists: yes
- POST /archives/all | base: archives | backend-base-exists: yes
- POST /archives/restore | base: archives | backend-base-exists: yes

### client\src\views\settings\FormStyleGuide.vue
- No direct `api.*` call in page file

### client\src\views\settings\GDPRSettings.vue
- GET /gdpr/export | base: gdpr | backend-base-exists: yes
- GET /gdpr/export-tenant | base: gdpr | backend-base-exists: yes
- POST /gdpr/delete | base: gdpr | backend-base-exists: yes

### client\src\views\settings\LoadingStatesGuide.vue
- No direct `api.*` call in page file

### client\src\views\settings\PasswordSettings.vue
- POST /password/update | base: password | backend-base-exists: yes

### client\src\views\settings\Preferences.vue
- No direct `api.*` call in page file

### client\src\views\settings\RetentionManagement.vue
- GET /retention/stats | base: retention | backend-base-exists: yes
- POST /retention/orders | base: retention | backend-base-exists: yes
- POST /retention/transactions | base: retention | backend-base-exists: yes
- POST /retention/reports | base: retention | backend-base-exists: yes
- POST /retention/audit-logs | base: retention | backend-base-exists: yes
- POST /retention/contact-submissions | base: retention | backend-base-exists: yes
- POST /retention/demo-requests | base: retention | backend-base-exists: yes
- POST /retention/apply-all | base: retention | backend-base-exists: yes

### client\src\views\settings\Sessions.vue
- GET /sessions | base: sessions | backend-base-exists: yes
- DELETE /sessions/${sessionId} | base: sessions | backend-base-exists: yes
- POST /sessions/revoke-all | base: sessions | backend-base-exists: yes

### client\src\views\settings\StoreSettings.vue
- GET /tenant/profile | base: tenant | backend-base-exists: yes
- PUT /tenant/profile | base: tenant | backend-base-exists: yes
- PUT /tenant/profile | base: tenant | backend-base-exists: yes

### client\src\views\settings\SubscriptionPlans.vue
- GET /subscriptions/current | base: subscriptions | backend-base-exists: yes
- GET /addons/check-limit/ADD_OUTLETS | base: addons | backend-base-exists: yes
- GET /addons/check-limit/ADD_USERS | base: addons | backend-base-exists: yes
- POST /subscriptions/upgrade | base: subscriptions | backend-base-exists: yes

### client\src\views\settings\SystemSettings.vue
- GET /settings/system | base: settings | backend-base-exists: yes
- PUT /settings/system | base: settings | backend-base-exists: yes

### client\src\views\settings\TableStyleGuide.vue
- No direct `api.*` call in page file

### client\src\views\settings\TwoFactorAuth.vue
- GET /2fa/status | base: 2fa | backend-base-exists: yes
- POST /2fa/generate | base: 2fa | backend-base-exists: yes
- POST /2fa/enable | base: 2fa | backend-base-exists: yes
- POST /2fa/disable | base: 2fa | backend-base-exists: yes

### client\src\views\settings\WebhookTester.vue
- GET /webhooks?includeInactive=true | base: webhooks | backend-base-exists: yes
- GET /webhooks/${selectedWebhookId.value}/deliveries | base: webhooks | backend-base-exists: yes
- POST /webhooks/${selectedWebhookId.value}/test | base: webhooks | backend-base-exists: yes
- POST /webhooks/${selectedWebhookId.value}/replay/${deliveryId} | base: webhooks | backend-base-exists: yes

### client\src\views\settings\Webhooks.vue
- GET /webhooks?includeInactive=true | base: webhooks | backend-base-exists: yes
- PUT /webhooks/${editingWebhook.value.id} | base: webhooks | backend-base-exists: yes
- POST /webhooks | base: webhooks | backend-base-exists: yes
- DELETE /webhooks/${id} | base: webhooks | backend-base-exists: yes
- POST /webhooks/${id}/test | base: webhooks | backend-base-exists: yes

### client\src\views\stores\EditStore.vue
- GET /outlets/${route.params.id} | base: outlets | backend-base-exists: yes
- PUT /outlets/${route.params.id} | base: outlets | backend-base-exists: yes

### client\src\views\stores\StoreDetail.vue
- GET /outlets/${route.params.id} | base: outlets | backend-base-exists: yes

### client\src\views\stores\Stores.vue
- GET /outlets | base: outlets | backend-base-exists: yes
- GET /addons/check-limit/ADD_OUTLETS | base: addons | backend-base-exists: yes
- PUT /outlets/${editingStore.value.id} | base: outlets | backend-base-exists: yes
- POST /outlets | base: outlets | backend-base-exists: yes
- DELETE /outlets/${store.id} | base: outlets | backend-base-exists: yes

### client\src\views\subscription\Subscription.vue
- GET /subscriptions/current | base: subscriptions | backend-base-exists: yes
- POST /payment/addon | base: payment | backend-base-exists: yes
- POST /payment/addon | base: payment | backend-base-exists: yes

### client\src\views\superadmin\BackupManagement.vue
- GET /tenants | base: tenants | backend-base-exists: yes
- GET /superadmin/backups/critical | base: superadmin | backend-base-exists: yes
- GET /superadmin/backups | base: superadmin | backend-base-exists: yes
- GET /superadmin/backups/${backupId}/view | base: superadmin | backend-base-exists: yes
- GET /superadmin/backups/${backupId}/download | base: superadmin | backend-base-exists: yes
- POST /superadmin/backups/${backupId}/resend-email | base: superadmin | backend-base-exists: yes
- POST /superadmin/backups/${tenantId}/regenerate | base: superadmin | backend-base-exists: yes

### client\src\views\superadmin\ContactMessages.vue
- GET /contact | base: contact | backend-base-exists: yes
- PUT /contact/${message.id}/read | base: contact | backend-base-exists: yes
- DELETE /contact/${message.id} | base: contact | backend-base-exists: yes
- POST /contact/bulk | base: contact | backend-base-exists: yes
- POST /contact/bulk | base: contact | backend-base-exists: yes
- POST /contact/bulk | base: contact | backend-base-exists: yes
- GET /support/tickets | base: support | backend-base-exists: yes
- GET /users | base: users | backend-base-exists: yes
- POST /support/tickets | base: support | backend-base-exists: yes
- PUT /support/tickets/${selectedTicket.value.id}/assign | base: support | backend-base-exists: yes
- POST /support/tickets/${selectedTicket.value.id}/notes | base: support | backend-base-exists: yes
- GET /contact | base: contact | backend-base-exists: yes

### client\src\views\superadmin\ServerMonitor.vue
- GET /admin/docker/containers | base: admin | backend-base-exists: yes
- GET /admin/server/resources | base: admin | backend-base-exists: yes
- GET /admin/health | base: admin | backend-base-exists: yes
- GET /admin/logs/${selectedLogType.value}?tail=200 | base: admin | backend-base-exists: yes
- GET /admin/docker/logs/${containerName}?tail=500 | base: admin | backend-base-exists: yes
- POST /admin/docker/restart/${containerName} | base: admin | backend-base-exists: yes
- POST /admin/docker/stop/${containerName} | base: admin | backend-base-exists: yes

### client\src\views\superadmin\SuperDashboard.vue
- GET /dashboard/stats | base: dashboard | backend-base-exists: yes

### client\src\views\superadmin\SystemInfo.vue
- No direct `api.*` call in page file

### client\src\views\support\ClientSupport.vue
- GET /support/tickets | base: support | backend-base-exists: yes
- POST /support/tickets | base: support | backend-base-exists: yes
- POST /support/tickets/${selectedTicket.value.id}/reply | base: support | backend-base-exists: yes

### client\src\views\tenants\TenantDetail.vue
- PUT /tenants/${tenantId}/subscription | base: tenants | backend-base-exists: yes
- GET /addons/available | base: addons | backend-base-exists: yes
- POST /addons/subscribe | base: addons | backend-base-exists: yes
- PUT /addons/${editAddonForm.value.id} | base: addons | backend-base-exists: yes
- PUT /users/${user.id} | base: users | backend-base-exists: yes
- DELETE /users/${user.id} | base: users | backend-base-exists: yes
- PUT /outlets/${store.id} | base: outlets | backend-base-exists: yes
- GET /tenants/${tenantId} | base: tenants | backend-base-exists: yes
- PUT /tenants/${tenantId} | base: tenants | backend-base-exists: yes
- POST /tenants/${tenantId}/users | base: tenants | backend-base-exists: yes
- PUT /users/${editingUser.value.id} | base: users | backend-base-exists: yes
- POST /tenants/${tenantId}/outlets | base: tenants | backend-base-exists: yes
- PUT /outlets/${editStoreForm.value.id} | base: outlets | backend-base-exists: yes

### client\src\views\tenants\Tenants.vue
- GET /tenants | base: tenants | backend-base-exists: yes
- DELETE /tenants/${id} | base: tenants | backend-base-exists: yes
- PUT /tenants/${editingTenant.value.id} | base: tenants | backend-base-exists: yes
- POST /tenants | base: tenants | backend-base-exists: yes

### client\src\views\users\Users.vue
- GET /users | base: users | backend-base-exists: yes
- GET /addons/check-limit/ADD_USERS | base: addons | backend-base-exists: yes
- PUT /users/${editingUser.value.id} | base: users | backend-base-exists: yes
- POST /users | base: users | backend-base-exists: yes
- DELETE /users/${id} | base: users | backend-base-exists: yes

## Potential Mismatches

- No unresolved backend base path from direct page API calls

## Duplicate Route Entries

- No duplicate route path/name detected
