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
