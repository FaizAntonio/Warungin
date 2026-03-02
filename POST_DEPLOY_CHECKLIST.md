# POST DEPLOY CHECKLIST

## 1) Infra & Process
- [ ] Backend process up (no crash loop)
- [ ] Database reachable from backend runtime
- [ ] `DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET` loaded in deploy env

## 2) Quick Smoke (5 minutes)
- [ ] Run `npm run smoke:post-deploy`
- [ ] If server not exposed from this machine, run `npm run smoke:post-deploy -- --skip-http` then execute smoke from server shell
- [ ] Confirm required check `GET /health` returns success

## 3) Auth & Role sanity
- [ ] Login `SUPER_ADMIN` works
- [ ] Login `ADMIN_TENANT` works
- [ ] One restricted route returns `403` for low role (expected)

## 4) Critical flows
- [ ] Create order from POS
- [ ] Complete payment flow and open callback page
- [ ] Open dashboard and orders pages without console/runtime errors

## 5) Monitoring
- [ ] Error logs stable (no spike in 5-10 min after deploy)
- [ ] Webhook/payment failure count normal
- [ ] API latency normal for core endpoints (`/health`, `/orders`, `/dashboard`)

## 6) Rollback readiness
- [ ] Previous deploy artifact/version is known
- [ ] Rollback command/path documented and tested
