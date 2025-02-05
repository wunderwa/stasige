## stamdic

[stamdic.memd.space](https://stamdic.memd.space/)

### Install
```shell
npm i -g yarn
git clone git@github.com:wunderwa/stamdic.git stamdic
cd stamdic
yarn
```

default
### Build
```shell
yarn wrk build <site-name>
```


### Pages

Pages in /sites/<site-name>/pages/ for each language

```shell
# for home page 
/pages/en.md #compile  to '/' as main lang
/pages/ru.md # -> '/ru/' as other lang

# for about page 
/pages/about/en.md #compile  to '/about/' as main lang
/pages/about/ru.md # -> '/about/ru/' as other lang
```


md file has yaml section in top with separator `<!--config-->` 
File.md format
```
layout: default
menuShort: Menu title
menuLong: Menu long title
title: Head title or its part
<!--config-->
Content of page as markdown
```

### Config
```
layout: see /templates/layout/*.pug
menuShort: Menu title
menuLong: Menu long title
title: Head title or its part
```

## For deploying
Install shell dependencies `jq` and `ssh` 
```shell
# deb
sudo apt install jq ssh
# mac 
brew install jq openssh
```

## Usage

Copy default site template to new one
```shell
 yarn wrk -c mysite
```

Build `default` site
```shell
 yarn wrk -b default
```
Deploy `default` site
```shell
 yarn wrk -b default
```

Build & deploy `default` site
```shell
 yarn wrk -bd default
```


- [Structure](docs/STRUCTURE.md)

### Idea
make deploy in node script?
```shell
yarn add -D node-ssh
```