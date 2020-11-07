---
title: "Supported Markdown"
date: 2020-10-26 13:00:01
image: "./root-image.png"
tags:
  - Markdown
---

Hi guys.
This is my first post and is just a test for different
markdown syntax that is supported in my blog.

# Heading 1
Syntax: # Heading 1

## Heading 2
Syntax: ## Heading 2

### Heading 3
Syntax: ### Heading 3

#### Heading 4
Syntax: #### Heading 4

##### Heading 5
Syntax: ##### Heading 5

###### Heading 6
Syntax: ###### Heading 6

<br>
<br>

This will be bold -> **Vighnesh**. <br>
Syntax: \*\*Vighnesh\*\*

<br>
<br>

This will be italic -> *Vighnesh*. <br>
Syntax: \*Vighnesh\*

<br>
<br>

This will be strikethrough -> ~~Vighnesh~~. <br>
Syntax: \~\~Vighnesh\~\~

<br>
<br>

This will be bold and italic -> ***Vighnesh***. <br>
Syntax: \*\*\*Vighnesh\*\*\*

<br>
<br>

> This is a block quote

Syntax: > This is a block quote

<br>
<br>

#### Ordered Lists
1. Item 1
1. Item 2
1. Item 3

> Syntax (without backslash):     <br>
> \1. Item 1                      <br>
> \1. Item 2                      <br>
> \1. Item 3                      <br>


#### Unordered Lists
* Item 1
* Item 2
* Item 3

> Syntax:    <br>
> \* Item 1  <br>
> \* Item 2  <br>
> \* Item 3  <br>


<br>
<br>


### 3 Backticks for code block 
```js
const a = 1;
const b = 2;

function add(x, y) {
  return x + y;
}

console.log(add(a, b));
```
> \`\`\`js <br>
> console.log("Hello"); <br>
> \`\`\`


<br>
<br>

Single `backtick` for inline code. <br>
\`backtick\`

<br>
<br>

Adding a Link. <br>
Syntax: \[Link Name](https://some-link.com)


<br>
<br>

Adding title to a Link. <br>
Syntax: \[Link Name](https://some-link.com "Some title")


<br>
<br>

Adding an image. <br>
Syntax: \!\[Alt Text](https://image.com)

<br>
<br>

#### Tables

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

>\| Syntax      \| Description \| <br>
 \| \--------- \| \----------- \| <br>
 \| Header      \| Title       \| <br>
 \| Paragraph   \| Text        \| <br>


<br>

#### Table Alignment

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

> \| Syntax      | Description | Test Text     | <br>
  \| :---        |    :----:   |          ---: | <br>
  \| Header      | Title       | Here's this   | <br>
  \| Paragraph   | Text        | And more      | <br>


<br>
<br>

#### Task list
- [x] Task 1
- [ ] Task 2
- [ ] Task 3
> Syntax <br>
 \- [x] Task 1 <br>
 \- [ ] Task 2 <br>
 \- [ ] Task 3 <br>


<br>
<br>


#### Math support

$$
(a + b)^2 = a^2 + 2ab + b^2
$$
Syntax: 
* Inline
\$(a + b)^2 = a^2 + 2ab + b^2\$
* Block
\$\$(a + b)^2 = a^2 + 2ab + b^2\$\$
