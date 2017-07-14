# postcss-css-grid-ie [![Build Status][ci-img]][ci]

[PostCSS] plugin for automatically adding -ms equivalent properties for CSS grids to support IE10+.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/greggbjensen/postcss-css-grid-ie.svg
[ci]:      https://travis-ci.org/greggbjensen/postcss-css-grid-ie

### Input example

```css
.container {
    display: grid;

    grid-columns: 20px 1fr auto;

    grid-rows: 2fr auto;  
}

.container-item { 
    grid-column: 2 / 3;

    grid-row: 3 / 1;

    align-self: end;

    justify-self: start;
}
```

### Output example

```css
.container {
    display: -ms-grid; 
    display: grid;

    grid-columns: 20px 1fr auto; 
    -ms-grid-columns: 20px 1fr auto;    

    grid-rows: 2fr auto;
    -ms-grid-rows: 2fr auto;    
}

.container-item { 
    grid-column: 2 / 3; 
    -ms-grid-column: 2; 
    -ms-grid-column-span: 3;

    grid-row: 3 / 1; 
    -ms-grid-row: 3; 
    -ms-grid-row-span: 1;

    align-self: end; 
    -ms-grid-row-align: end;

    justify-self: start; 
    -ms-grid-column-align: start;    
}
```

## Usage

```js
postcss([ require('postcss-css-grid-ie') ])
```

## Supported Properties

All of the following properties are supported:

* display
* grid-columns
* grid-rows
* grid-column
* grid-row
* align-self
* justify-self

Other properties such as `grid-column-gap` and `grid-row-gap` are not supported as they are not availabe in the Internet Explorer specifications.  See "[Should I try to use the IE implementation of CSS Grid Layout?](https://rachelandrew.co.uk/archives/2016/11/26/should-i-try-to-use-the-ie-implementation-of-css-grid-layout/)" for more information.

See [PostCSS] docs for examples for your environment.
