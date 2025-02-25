### yarn new (stasige ssg)  (mono mode)
Create new page(s)
```shell
yarn new -ch 〈path:lang,lang〉
```

* `-c` - clear console
* `-h` - help description
* `path` - page base path (ex. `/docs/icons`)
* `lang` - page lang 

Create pages for all project languages (see ./build.json langs key)
```shell
yarn new -c 〈path〉
yarn new -c /docs/new
```

Create page for one language (en)
```shell
yarn new -c 〈path:lang〉
yarn new -c /docs/new:en
# ./pages/docs/new/index.en.md
```

Create pages for selected languages (ru,en)
```shell
yarn new -c 〈path:lang,lang〉
yarn new -c /docs/new:ru,en
# ./pages/docs/new/index.en.md 
# ./pages/docs/new/index.ru.md
```
