## stasige 

[stasige.memd.space](https://stasige.memd.space/)

### Install

```shell
npm i -g yarn
# or
npm i -g bun

npx stasige-init # the script will ask for all missing parameters
npx stasige-init --bun # for bun PM using. default PM - yarn
cd new-project
#or
npx stasige-init new-project
#or
npx stasige-init [--mono | --multi] [--framework [bootstrap | bootstrap.native]] new-project
```

```shell
npx stasige-init --mono --framework bootstrap new-project
```

```shell
npx stasige-init --mono --framework bootstrap.native new-project
```

```shell
npx stasige-init --multi --framework bootstrap new-project
```

```shell
npx stasige-init --multi --framework bootstrap.native new-project
```


For multi mode
- `new-project/sites/default` - default bootstrap template 
- `yarn copy new-tmp` - create copy in `sites/new-tmp`
For mono mode
- One template in `new-project/`  

### Build
```shell
#mono
yarn wrk -cb
#multi
yarn wrk -cb <site-name>
```

### Show available commands
```shell
yarn man
```

### Pages

Pages in `/sites/<site-name>/pages/` for each language. Or in  `/pages/` for mono mode

```shell
# for home page 
/pages/index.en.md #compile  to '/' as main lang
/pages/index.ru.md # -> '/ru/' as russian lang etc

# for about page 
/pages/about/index.en.md #compile  to '/about/' as main lang
/pages/about/index.ru.md # -> '/about/ru/' as russian lang etc
```

md file has yaml section in top with separator `<!--config-->` 
File.md format
```markdown
```yaml
layout: default
menuShort: Menu title
menuLong: Menu long title
title: Head title or its part
```.
<!--config-->
Content of page as markdown
```

### Config
```
layout: see /views/layout/*.pug
menuShort: Menu title
menuLong: Menu long title
title: Head title or its part
```

## Usage

Copy default site template to new one
```shell
#for multi mode only
yarn copy mysite
```

Build `default` site
```shell
# multi mode
yarn wrk -b default
# mono mode
yarn wrk -b
```

Deploy `default` site
```shell
# multi mode
 yarn wrk -d default
# mono mode
yarn wrk -d
```

Build & deploy `default` site
```shell
# multi mode
 yarn wrk -bd default
# mono mode
yarn wrk -bd
```

## To ssg development

```shell
git clone git@github.com:wunderwa/stasige.git stasige
cd stasige
yarn
```

- [Structure](https://github.com/wunderwa/stasige/blob/main/docs/STRUCTURE.md)
- [Structure local](docs/STRUCTURE.md)

