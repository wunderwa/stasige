```yaml
layout: default
menuName: Console
title: Console Combinations
```
<!--config-->
## Console option Combinations

Base usage. Build production (html, css and js) and deploy 
```shell
./wrk.sh -bd <site>
# or equivalent
wrk -bdCSJH
```



`-h`  - help description

-b  - build site with ./sites/<site> template in ./www/<site>
-d  - deploy site from ./www/<site>/*
-c  - copy default site template in new location `./sites/default` =>  `./sites/<site>`
-a  - add md templates
`./wrk -a default about/me ru,en` - add `./sites/default/pages/about/me/index.en.md` and `./sites/default/pages/about/me/index.ru.md`
-k  - clear console with `clear`

-D  - dev mode
-C  - clear build dir: dev ? `rm -r dirPath/*`  : `rm -r dirPath`
-S  - build styles (SCSS files)
-J  - build js (TS files)
-H  - build html (PUG files)

`./wrk -b <site>` === `./wrk -bCSJH <site>`
`./wrk -bd <site>` === `./wrk -bdCSJH <site>`

### Development
Build all 
```shell
./wrk -bD <site>
#or
./wrk -bDCSJH <site>
```

`./wrk -bD <site>` === `./wrk -bDCSJH <site>`
`./wrk -bdD <site>` === `./wrk -bdDCSJH <site>`
`./wrk -bDS <site>` rebuild styles only
`./wrk -bDH <site>` rebuild html only
`./wrk -bDJ <site>` rebuild js only
