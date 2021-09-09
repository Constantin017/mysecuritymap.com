# MYSECURITYMAP.COM

## Tech stack

- JavaScript
- CSS
- PHP
- [HUGO](https://gohugo.io/)

## Before start, set variables in the scripts

- [ ] bot_token       : src/php/core.php
- [ ] chat_id         : src/php/core.php
- [ ] re_sec          : src/php/core.php
- [ ] pubKey          : src/js/form.js
- [ ] googleAnalytics : config.toml
- [ ] googleReCaptcha : config.toml

### Build JavaScript and CSS files

```bash
npm install
npm run build:prod
```

### Build API PHP files

```bash
php ./src/php/build.php
```

### Build HUGO static files

```bash
hugo --minify
```
