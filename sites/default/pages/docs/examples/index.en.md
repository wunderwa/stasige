```yaml
layout: default
menuShort: Examples
menuLong: Examples
title: Examples
```
<!--config-->
## Examples

#### Replacer of build.json params

See `sites/docs/examples/index.en.md`

Use formatting  like `${root.key}`  to insert values from `build.json` (no spaces between braces) 

- [${links.github.en}](${links.github.url})
- [${links.github.ru}](${links.github.url})
- links.github.url ${links.github.url} 
- links.github.ru ${links.github.ru}
- links.github.en ${links.github.en}
- [${links.wrong.name}](${links.wrong.url})
