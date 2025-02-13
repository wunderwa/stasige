```yaml
layout: default
menuShort: Documentation
menuLong: Get started
title: Get started
```
<!--config-->
## Start

- Install node

- Install yarn 
- Clone repo to locally dev 

```shell
npm i -g yarn
git clone git@github.com:wunderwa/stamdic.git
cd stamdic
yarn
```

- Copy default site template and init git repo to save  

```shell
# cp -R ./sites/default ./sites/my-site
# cd ./sites/my-site
# git init 
# =
yarn copy my-site
```

- Add new page

```shell
yarn new my-site /new/page:en,eu  
```

Edit template and save changes

```shell
cd sites/my-site
# edit template
# add commit
# push 
```

