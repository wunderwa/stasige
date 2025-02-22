### yarn vars (stasige ssg)
Show template variables for selected template

```shell
yarn vars -c 〈site〉 〈path:lang〉 〈list〉
```
* -h - help
* -c - clear console
* site - site template name (required)
* path - base path of page (with lang)
* lang - lang version of page (with path)
* list - variable name list separated by ',' to show values. Only global vars available without 〈path:lang〉
  + Global variables: linksByLang,linksByDir,mainMenu,langs,meta,links,timekey,data
  + page variables: lang,src,path,pathBase,layout,menuShort,menuLong,title,body

Show template variables names only or some global variables value:
```shell
yarn vars -c  〈site〉
# example
yarn vars default  
```

Show template some global variables value:
```shell
yarn vars -c  〈site〉 〈list〉
# example
yarn vars default linksByLang,mainMenu,data
```

Show page variables and some global variables value:
```shell
yarn vars -c 〈site〉 〈path:lang〉 〈list〉
# example
yarn vars -c  default /docs:en title,lang,body
```
