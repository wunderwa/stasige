```yaml
layout: default
menuName: Documentation
title: Get started
```
<!--config-->
## Start


Clone repo to locally dev 

```shell
git clone git@github.com:wunderwa/stamdic.git
cd stamdic
```

Copy default site template and init git repo to save  

```shell
# cp -R ./sites/default ./sites/my-site
./wrk -c my-site
git init
```

Add new page

```shell
./wrk -a my-site new/page en,eu  
```

Edit template and save changes

```shell
cd sites/my-site
git init
# add repository, add commit, push  
```
