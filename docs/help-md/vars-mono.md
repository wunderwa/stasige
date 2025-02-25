### yarn vars (stasige ssg) (mono mode)
Show template variables for template

```shell
yarn vars -c 〈path:lang〉 〈list〉
```
* -h - help
* -c - clear console
* path - base path of page (with lang)
* lang - lang version of page (with path)
* list - variable name list separated by ',' to show values. Only global vars available without 〈path:lang〉
  + Global variables: linksByLang,linksByDir,mainMenu,langs,meta,links,timekey,data
  + page variables: lang,src,path,pathBase,layout,menuShort,menuLong,title,body

Show template variables names only or some global variables value:
```shell
yarn vars -c 
# example
yarn vars  
```

Show template some global variables value:
```shell
yarn vars -c 〈list〉
# example
yarn vars linksByLang,mainMenu,data
```

Show page variables and some global variables value:
```shell
yarn vars -c 〈path:lang〉 〈list〉
# example
yarn vars -c /docs:en title,lang,body
```
