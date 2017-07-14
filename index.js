var postcss = require('postcss');

module.exports = postcss.plugin('postcss-css-grid-ie', function () {

    const columnRowValueRegEx = /(\d+)\s*\/\s*(\d+)/;

    function processDisplay(decl, rule) {

        // Add display: -ms-grid;
        if (decl.value.toLowerCase() === 'grid') {
            rule.insertBefore(decl,
                postcss.decl({ prop: 'display', value: '-ms-grid' }));
        }
    }

    function processGridColumnsRows(decl) {
        decl.cloneAfter({ prop: `-ms-${decl.prop}` });
    }

    function processAlignSelf(decl) {
        decl.cloneAfter({ prop: '-ms-grid-row-align' });
    }

    function processJustifySelf(decl) {
        decl.cloneAfter({ prop: '-ms-grid-column-align' });
    }

    function processGridColumnRow(decl, rule, columnRow) {
        const match = columnRowValueRegEx.exec(decl.value);
        if (match) {
            const place = match[1];
            const span = match[2];

            rule.insertAfter(decl,
                postcss.decl(
                    { prop: `-ms-grid-${columnRow}`, value: place }));

            rule.insertAfter(decl.next(),
                postcss.decl(
                    { prop: `-ms-grid-${columnRow}-span`, value: span }));
        }
    }

    return (css) => {

        css.walkRules((rule) => {

            rule.walkDecls((decl) => {

                switch (decl.prop.toLowerCase()) {
                case 'display':
                    processDisplay(decl, rule);
                    break;
                case 'grid-columns':
                case 'grid-rows':
                    processGridColumnsRows(decl);
                    break;
                case 'grid-column':
                    processGridColumnRow(decl, rule, 'column');
                    break;
                case 'grid-row':
                    processGridColumnRow(decl, rule, 'row');
                    break;
                case 'align-self':
                    processAlignSelf(decl);
                    break;
                case 'justify-self':
                    processJustifySelf(decl);
                    break;
                default:
                    // Do nothing.
                }
            });
        });
    };
});
