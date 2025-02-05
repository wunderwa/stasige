```yaml
layout: default
menuShort: Icons
menuLong: How to add icons
title: How to add icons
```
<!--config-->
## How to add icons in project

1. Go to https://icons.getbootstrap.com/
2. Search desired icon. `github` for example
3. Go to its page https://icons.getbootstrap.com/icons/github/
4. Copy `svg`
5. Convert svg to pug on https://html-to-pug.com/
6. Sdd it in file in your site template `./views/icons/github.pug`
7. Include in your pug template like `include ../icons/github.pug`

