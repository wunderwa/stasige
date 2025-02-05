
Base usage (Build production (html, css and js) and deploy):
```shell
# from project root dir
./wrk -bd <site>
# or with yarn
yarn wrk -bd <site>
```
`!` Use ./wrk from project root only

`-h` - help description

`-k`  - clear console with `clear`

`-c` - copy default site template in new location `./sites/default` =>  `./sites/<site>`
```shell
yarn wrk -c <site>
```

`-a`  - add md templates.
```shell
yarn wrk -a <site> about/me ru,en
# -> `./sites/<site>/pages/about/me/index.en.md` & `./sites/<site>/pages/about/me/index.ru.md`
```

`-b`  - build prod site `./sites/<site>` -> `./dist/<site>`

`-bD`  - build dev site `./sites/<site>` in `./http/<site>`

`-d`  - deploy prod site from `./dist/<site>/*`

`-dD`  - deploy dev site from `./http/<site>/*`


`-s`  - start local server

### Helpers for `dev` mode

`-D`  - dev mode.

Options below with `-D` only

`-C`  - clear build dir: like `rm -r dirPath/*`  (with `-D` only)

`-S`  - build styles (SCSS files) (with `-D` only)

`-J`  - build js (TS files) (with `-D` only)

`-H`  - build html (PUG files) (with `-D` only)

`-V`  - show vars with PUG variables (with `-DH` only)

`-L`  - show VARS and values of vars from list separated by ',' (only with `-DH`)

### Development

Build all
```shell
yarn wrk -bD <site>
```
Build all and deploy
```shell
yarn wrk -bdD <site>
```
Rebuild styles only
```shell
yarn wrk -bDS <site> 
```

Rebuild js only
```shell
yarn wrk -bDJ <site> 
```

Rebuild html  only
```shell
yarn wrk -bDH <site> 
```

### VARS

show list of vars in pug template
```shell
yarn wrk -kDV default
```

show list of vars in pug template; value of selected page (pathBase='/')
```shell
yarn wrk -bDVL /,title <site>
```

value of selected page (by pathBase='/') and lang en
```shell
yarn wrk -bDVL /,en,title <site>
# or pathBase='/docs' lang='ru'
 yarn wrk -kDVL /docs,ru,path,pathBase,title  default
```
