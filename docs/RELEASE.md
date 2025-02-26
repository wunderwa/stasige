#Release

## Releases (add tag)
```shell
git tag -a v0.1.0 2004632 -m 'v0.3.0'
git push origin v0.3.0
```
## Releases (npm)
```shell
yarn build
npm login
npm publish --access public

npm unpublish stasige@0.3.0
```
