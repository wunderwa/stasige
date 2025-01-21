
Default lang set as first element of array in `build.json` in "langs" key

```yaml
sites:
  default: # default site 
    build.json: 'config file for building of site'
    pages: # site content directory; page structure of site  
      index.en.md: 'Root page content and page options in yaml on top of file'
      index.ru.md: 'Root page on other lang'
      about:
        index.en.md: 'Next Page content and page options in yaml on top of file'
        index.ru.md: 'Next Page on other lang'
    scripts:
      index.ts: 'Root of typescript'
      any.scss: ' any scripts that will by included in index.ts'
    styles:
      index.scss: 'Root of sass styles'
      any.scss: ' any style that will by included in index.scss'
    views:
      index.pug: 'Core file, has skeleton of html'
      layouts:  #main design of page, can set in top of pages/<page>/index.<lang>.md
        main.pug: 'default layout if layout=main or not set or layout not found'
        other.pug: 'other layout, layout=other in pages/**/*.md'
        other-ru.pug: 'other layout, layout=other-ru you can set another layout for lang version of page'
      
        
      partial: # parts of page
        head.pug: ' <head> with title, meta etc'
```

Current site structure for site.com, default lang is 'en'
- https://site.com/ 
- https://site.com/ru/ 
- https://site.com/about
- https://site.com/ru/about 



pages in `yamd` format contains yaml before markdovn separated by a separator
```markdown
ke1: value1
ke2: value2
<!--config-->
Markdown here

```