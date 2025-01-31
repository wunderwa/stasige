```yaml
layout: default
menuName: Console
title: Console Combinations
```
<!--config-->
## Console option Combinations

Base usage (Build production (html, css and js) and deploy): 

```shell
wrk.sh -bd <site>
```
`-h` - help description

`-c` - copy default site template in new location `./sites/default` =>  `./sites/<site>`

`-b`  - build site with `./sites/<site>` in `./dist/<site>`

`-bD`  - build site with `./sites/<site>` in `./http/<site>`

`-d`  - deploy site from `./dist/<site>/*`

`-dD`  - deploy site from `./http/<site>/*`

`-a`  - add md templates. `./wrk -a <site> about/me ru,en` -> `./sites/<site>/pages/about/me/index.en.md` & `./sites/<site>/pages/about/me/index.ru.md`

`-k`  - clear console with `clear`

`-s`  - start local server


`-D`  - dev mode

`-C`  - clear build dir: like `rm -r dirPath/*`  (only with -D)

`-S`  - build styles (SCSS files) (only with `-D`)

`-J`  - build js (TS files) (only with `-D`)

`-H`  - build html (PUG files) (only with `-D`)

`-L`  - show logs with PUG variables (only with `-DH`)

### Development

Build all 
```shell
./wrk -bD <site>
#or
./wrk -bDCSJH <site>
```
Build all and deploy
```shell
./wrk -bdD <site>
eq
./wrk -bdDCSJH <site>
```
Rebuild styles only 
```shell
./wrk -bDS <site> 
```
Rebuild html  only
```shell
./wrk -bDH <site> 
```
Rebuild html and log PUG variables
```shell
./wrk -bDHL <site>
```
Rebuild js
```shell
./wrk -bDJ <site> 
```
