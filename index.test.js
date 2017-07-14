var postcss = require('postcss');

var plugin = require('./');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

describe('postcss-css-grid-ie', () => {

    it('adds display: -ms-grid;', () => {
        return run(
            `.container { 
                display: grid;
            }`,

            `.container { 
                display: -ms-grid; 
                display: grid;
            }`, { });
    });

    it('adds -ms-grid-columns', () => {
        return run(
            `.container-item { 
                grid-columns: 20px 1fr auto;
            }`,

            `.container-item { 
                grid-columns: 20px 1fr auto; 
                -ms-grid-columns: 20px 1fr auto;
            }`, { });
    });

    it('adds -ms-grid-rows', () => {
        return run(
            `.container-item { 
                grid-rows: 20px 1fr auto;
            }`,

            `.container-item { 
                grid-rows: 20px 1fr auto; 
                -ms-grid-rows: 20px 1fr auto;
            }`, { });
    });

    it('adds -ms-grid-column and -ms-grid-column-span', () => {
        return run(
            `.container-item { 
                grid-column: 2 / 3;
            }`,

            `.container-item { 
                grid-column: 2 / 3; 
                -ms-grid-column: 2; 
                -ms-grid-column-span: 3;
            }`, { });
    });

    it('adds -ms-grid-row and -ms-grid-row-span', () => {
        return run(
            `.container-item { 
                grid-row: 3 / 1;
            }`,

            `.container-item { 
                grid-row: 3 / 1; 
                -ms-grid-row: 3; 
                -ms-grid-row-span: 1;
            }`, { });
    });
});

