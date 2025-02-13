```yaml
layout: default
menuShort: Images
menuLong: Adding images
title: docs/images en title
```
<!--config-->
## Adding images to a page

- Add directory `-img` in root of directory containing current *.lang.md file.
- `jpg`, `png`, `webp` and `gif` images are supported.  
- `jpg` and `png` imagess will be converted in `webp` one.
- `webp` will be compressed.
- `gif` will be copied as is.

```markdown
![alt text](-img/stamdic.gif)
![Jpg image](-img/stamdic.jpg)
![jpgPng image](-img/stamdic.png)
```

![Gif image](-img/stamdic.gif)

![Jpg image](-img/stamdic.jpg) {.img}

![jpgPng image](-img/stamdic.png) {.img}


