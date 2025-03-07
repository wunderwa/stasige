```yaml
layout: default
menuShort: Markdown
menuLong: Markdown extended support
title: Markdown extended support
```
<!--config-->
## Markdown extended support

Page config in yaml

```markdown
''''yaml
layout: default
menuShort: Menu name
menuLong: Menu long name
title: Head title or its part
''''
<!--config-->
Content of page as markdown with attributes {...attributes...} 
like
{.btn .btn-success title=My_title data-clicker=open-in-modal}
title Must be without space.
Space between element and '{' will add attrimutes to parent paragraph 
```

See npm package [markdown-it-attrs](https://www.npmjs.com/package/markdown-it-attrs)

Supported 'id', 'class', 'title', 'data-clicker'
- id - standard html attribute { #id} 
- class - standard html attribute { .class }
- title - standard html attribute { title=Title for it }
- data-clicker - attribute for clicker('action-name', callback) js function like { data-clicker='action-name' } 

See [bootstrap button manual new page](${links.bootstrap.url}/components/buttons/){.btn .btn-primary target=_blank}

You can [Open modal](#){.btn .btn-success title=My_title data-clicker=open-in-modal}