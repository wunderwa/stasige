```yaml
layout: default
menuShort: Examples
menuLong: Examples
title: Examples
```
<!--config-->
## Examples {.text-center}

#### Replacer of build.json params

See `sites/docs/examples/index.en.md`

Use formatting  like `${root.key}`  to insert values from `build.json` (no spaces between braces) 

- [${links.github.en}](${links.github.url})
- [${links.github.ru}](${links.github.url})
- links.github.url ${links.github.url} 
- links.github.ru ${links.github.ru}
- links.github.en ${links.github.en}
- [${links.wrong.name}](${links.wrong.url})

### Paragraphs with align classes 

Paragraph with align start {`.text-start`}
{.text-start}

Paragraph with align center {`.text-center`}
{.text-center}

Paragraph with align end {`.text-end`}
{.text-end}

Link as button: .btn .btn-secondary .btn-sm 
[${links.github.en}](${links.github.url}){.btn .btn-secondary .btn-sm}
inline!

See bootstrap documentation