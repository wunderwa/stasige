## stamdic
### free names

### Install
```shell
git clone 
yarn
```

default
### Build
```shell
./wr`k build <site-name>
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
menu: Menu title
title: Head title or its part
<!--config-->
Content of page as markdown
```

### Config
```
layout: see /templates/layout/*.pug
menu: Menu title
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

Build `default` site
```shell
 ./worker -b default
```
Deploy `default` site
```shell
 ./worker -b default
```

Build & deploy `default` site
```shell
 ./worker -bd default
```



### Idea
make deploy in node script 
```shell
yarn add -D minimist @types/minimist node-ssh
```