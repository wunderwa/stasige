### yarn wrk (stasige ssg) (mono mode) 
Build and deploy

Base usage (Build production (html, css and js) and deploy):
```shell
yarn wrk -bd
```

```shell
yarn wrk -hcbdDCSJHI
```

`-h` - help description

`-c`  - clear console with `clear`


`-b`  - build prod site `./site/` -〉 `./dist/`

`-bD`  - build dev site `./site/` in `./dist-dev/`

`-d`  - deploy prod site from `./dist/*`

`-dD`  - deploy dev site from `./dist-dev/*`

### Helpers for `dev` mode

`-D`  - dev mode.

Options below with `-D` only

`-C`  - clear build dir: like `rm -r dirPath/*`  (with `-D` only)

`-S`  - build styles (SCSS files) (with `-D` only)

`-J`  - build js (TS files) (with `-D` only)

`-H`  - build html (PUG files) (with `-D` only)

`-I`  - build images (png, jpg, webp to webp, gif) (with `-D` only)

### Development

Build all
```shell
yarn wrk -bD
```
Build all and deploy
```shell
yarn wrk -bdD
```
Rebuild styles, js, html or images only 
```shell
yarn wrk -bDS 
yarn wrk -bDJ 
yarn wrk -bDH 
yarn wrk -bDI 
```
