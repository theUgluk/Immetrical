const util = require("../src/util");

/**
 * Tests to add:
 *  - Util
 *      - getCleanObj
 *          - Base object
 *          - Subsection of object
 **/
//@TODO uitvogelen wat de goede methods van expect zijn en die gebruiken (toStrictEqual)

//Calculate

test('calculator 1 meter to 1 mile conversion', () => {
    expect(util.calculate(1, 1, 0.00062137119224)).toBe(0.00062137119224);
})

test('calculator divide by 0', () => {
    expect(() => {
        util.calculate(1, 0, 0.00062137119224)
    }).toThrow();
})

// ConvertRange
test('convertToRange below 0', () => {
    expect(util.convertToRange(0.005)).toStrictEqual([5, -3]);
});

test('convertToRange between 1 and 10', () => {
    expect(util.convertToRange(5)).toStrictEqual([5, 0]);
})
test('convertToRange above 10', () => {
    expect(util.convertToRange(500)).toStrictEqual([5, 2]);
})

//Convert
