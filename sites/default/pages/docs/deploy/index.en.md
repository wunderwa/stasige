```yaml
layout: default
menuShort: Deploy
menuLong: Deploy
title: Deploy settings
```
<!--config-->

File `deploy.json` in root of template contains deploy ssh settings.

```json
{
  "prod": {
    "ssh": "my-site",
    "path": "/var/www/site-prod/"
  },
  "dev": {
    "ssh": "my-site",
    "path": "/var/www/site-dev/"
  }
}
```
- `dev` section for key `D` and dev deploying, `prod` - production
- 'ssh' - alias of from `.ssh/config` or hostname `user@ip`
