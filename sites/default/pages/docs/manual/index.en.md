```yaml
layout: default
menuShort: Manual
menuLong: Manual
title: Dev manual
```
<!--config-->
## Stamdic: Static Site Generator with markdown data
### yarn man (stamdic ssg)
Show all comands and its help
```shell
yarn man -ch <cmd>
```

* `-c` - clear console
* `-h` - help description
*  `<cmd>` - <empty> | man | copy | new | vars | srv | wrk | doc 

* `yarn man`
* `yarn man man`
* `yarn man copy`
* `yarn man new`
* `yarn man vars`
* `yarn man srv`
* `yarn man wrk`
* `yarn man doc`
### yarn wrk (stamdic ssg)
Build and deploy

Base usage (Build production (html, css and js) and deploy):
```shell
yarn wrk -bd <site>
```

```shell
yarn wrk -hcbdDCSJHI <site>
```

`-h` - help description

`-c`  - clear console with `clear`


`-b`  - build prod site `./sites/<site>` -> `./dist/<site>`

`-bD`  - build dev site `./sites/<site>` in `./http/<site>`

`-d`  - deploy prod site from `./dist/<site>/*`

`-dD`  - deploy dev site from `./http/<site>/*`

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
yarn wrk -bD <site>
```
Build all and deploy
```shell
yarn wrk -bdD <site>
```
Rebuild styles, js, html or images only 
```shell
yarn wrk -bDS <site> 
yarn wrk -bDJ <site> 
yarn wrk -bDH <site> 
yarn wrk -bDI <site> 
```
## yarn copy (stamdic ssg)
Copy site template (in new)
```shell
yarn copy -ch <site>
```

* `-c` - clear console
* `-h` - help description
* `<site>` - new site template

Copy default site template in new location `./sites/default` =>  `./sites/<site>`
```shell
yarn copy <site>
```
### yarn srv (stamdic ssg)
Start local server
```shell
yarn srv -hcDp <port> <site>
```
* `-c` - clear console
* `-h` - help description
* `<site>` - site template
* `-D` - dev mode
* `-p <port>` - port number. Default 8000
### yarn new (stamdic ssg)
Create new page(s)
```shell
yarn new -ch <site> <path:lang,lang>
```

* `-c` - clear console
* `-h` - help description
* `<site>` - new site template
* `path` - page base path (ex. `/docs/icons`)
* `lang` - page lang 

Create pages for all project languages (see ./build.json langs key)
```shell
yarn new -c <site> <path>
yarn new -c default /docs/new
```

Create page for one language (en)
```shell
yarn new -c <site> <path:lang>
yarn new -c default /docs/new:en
# ./sites/default/pages/docs/new/index.en.md
```

Create pages for selected languages (ru,en)
```shell
yarn new -c <site> <path:lang,lang>
yarn new -c default /docs/new:ru,en
# ./sites/<site>/pages/docs/new/index.en.md 
# ./sites/<site>/pages/docs/new/index.ru.md
```
### yarn vars (stamdic ssg)
Show template variables for selected template

```shell
yarn vars -c <site> <path:lang> <list>
```
* -h - help
* -c - clear console
* site - site template name (required)
* path - base path of page (with lang)
* lang - lang version of page (with path)
* list - variable name list separated by ',' to show values. Only global vars available without <path:lang>
  + Global variables: linksByLang,linksByDir,mainMenu,langs,meta,links,timekey,data
  + page variables: lang,src,path,pathBase,layout,menuShort,menuLong,title,body

Show template variables names only or some global variables value:
```shell
yarn vars -c  <site>
# example
yarn vars default  
```

Show template some global variables value:
```shell
yarn vars -c  <site> <list>
# example
yarn vars default linksByLang,mainMenu,data
```

Show page variables and some global variables value:
```shell
yarn vars -c <site> <path:lang> <list>
# example
yarn vars -c  default /docs:en title,lang,body
```
