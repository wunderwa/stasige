### yarn wrk (stasige ssg) 
Build and deploy

Base usage (Build production (html, css and js) and deploy):
```shell
yarn wrk -bd 〈site〉
```

```shell
yarn wrk -hcbdDCSJHI 〈site〉
```

`-h` - help description

`-c`  - clear console with `clear`


`-b`  - build prod site `./sites/〈site〉` -〉 `./dist/〈site〉`

`-bD`  - build dev site `./sites/〈site〉` in `./http/〈site〉`

`-d`  - deploy prod site from `./dist/〈site〉/*`

`-dD`  - deploy dev site from `./http/〈site〉/*`

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
yarn wrk -bD 〈site〉
```
Build all and deploy
```shell
yarn wrk -bdD 〈site〉
```
Rebuild styles, js, html or images only 
```shell
yarn wrk -bDS 〈site〉 
yarn wrk -bDJ 〈site〉 
yarn wrk -bDH 〈site〉 
yarn wrk -bDI 〈site〉 
```
