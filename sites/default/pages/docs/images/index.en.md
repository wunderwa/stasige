```yaml
layout: default
menuShort: Images
menuLong: Adding images
title: Adding images
```
<!--config-->
## Adding images to a page

- Add directory `-img` in root of directory containing current *.lang.md file.
- `jpg`, `png`, `webp` and `gif` images are supported.  
- `jpg` and `png` images will be converted in `webp` one.
- `webp` will be compressed.
- `gif` will be copied as is.

```markdown
![alt text](-img/stamdic.gif)
![Jpg image](-img/stamdic.jpg)
![jpgPng image](-img/stamdic.png)
```

![Gif image](-img/stamdic.gif){.rounded .mx-auto .d-block .img-class-gif #img-id-gif data-clicker=open-in-modal}

![Jpg image](-img/stamdic.jpg){.rounded .mx-auto .d-block .img-class-jpg #img-id-jpg data-clicker=open-in-modal}

![jpgPng image](-img/stamdic.png){.rounded .mx-auto .d-block .img-class-png #img-id-png data-clicker=open-in-modal}
