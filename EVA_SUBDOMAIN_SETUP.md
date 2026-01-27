# EVA Subdomain Setup Guide

## DNS Configuration Required

To enable `eva.brooksidemps.com` to work properly, you need to configure DNS settings:

### Option 1: CNAME Record (Recommended)
Add a CNAME record in your DNS provider:
```
Type: CNAME
Name: eva
Value: brooksidemps.com
TTL: 3600 (or your preferred TTL)
```

### Option 2: A Record (Alternative)
If CNAME is not available, use an A record pointing to the same IP as brooksidemps.com:
```
Type: A
Name: eva
Value: [Your server IP address]
TTL: 3600
```

## Server Configuration

### Apache (.htaccess)
The existing `.htaccess` file should handle the subdomain automatically if DNS is configured correctly.

### Nginx
If using Nginx, add server block:
```nginx
server {
    server_name eva.brooksidemps.com;
    root /path/to/your/build;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## SEO Benefits

The EVA page is now optimized for these search queries:
- "eva brookside"
- "eva virtual assistant"
- "eva ph"
- "eva philippines"
- "eva virtual assistant philippines"
- "eva brooksidemps"
- "eva brookside manpower"
- "brookside eva"
- "eva va philippines"

## Verification

After DNS configuration:
1. Wait for DNS propagation (can take up to 48 hours)
2. Test: `https://eva.brooksidemps.com`
3. Verify canonical URLs point to eva.brooksidemps.com
4. Submit sitemap to Google Search Console with both URLs

## Current SEO Implementation

✅ Enhanced meta tags with target keywords
✅ FAQ schema with search queries
✅ Structured data optimized for "EVA Brookside"
✅ Content includes natural keyword placement
✅ Sitemap includes eva.brooksidemps.com
✅ Robots.txt allows subdomain
✅ Canonical URLs configured for subdomain
