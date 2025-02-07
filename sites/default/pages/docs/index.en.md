```yaml
layout: default
menuShort: Documentation
menuLong: Get started
title: Get started
```
<!--config-->
## Start


Clone repo to locally dev 

```shell
npm i -g yarn
git clone git@github.com:wunderwa/stamdic.git
cd stamdic
yarn
```

Copy default site template and init git repo to save  

```shell
# cp -R ./sites/default ./sites/my-site
yarn wrk -c my-site
git init
```

Add new page

```shell
yarn wrk -a my-site new/page:en,eu  
```

Edit template and save changes

```shell
cd sites/my-site
git init
# add repository, add commit, push  
```


![What is this](-img/preview1.webp)