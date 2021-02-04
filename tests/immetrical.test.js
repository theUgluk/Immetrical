import Immetric from '../src/immetrical'
/**
*  - Immetrical
*      - convertToSi
*          - Num
*          - Above max
*          - Below min
 *         - on unit
 *         - magnitude 0
**/
//@TODO uitvogelen wat de goede methods van expect zijn en die gebruiken (toStrictEqual)
//Calculate
test('convertToSi: nMagnitude negative, not in indexes', () => {
    let im = new Immetric();
    expect(im.convertToSI(5, -4)).toStrictEqual([500, 'micro']);
});

test('convertToSi: nMagnitude negative, in indexes', () => {
    let im = new Immetric();
    expect(im.convertToSI(5, -1)).toStrictEqual([5, 'deci']);
});

test('convertToSi: nMagnitude below min', () => {
    let im = new Immetric();
    expect(im.convertToSI(5, -23)).toStrictEqual([0.05, 'septo']);
});

test('convertToSi: nMagnitude positive, Not in indexes', () => {
    let im = new Immetric();
    expect(im.convertToSI(5, 7)).toStrictEqual([50, 'mega']);
});

test('convertToSi: nMagnitude positive, in indexes', () => {
    let im = new Immetric();
    expect(im.convertToSI(5, 1)).toStrictEqual([5, 'deca']);
});

test('convertToSi: nMagnitude above max', () => {
    let im = new Immetric();
    expect(im.convertToSI(5, 21)).toStrictEqual([5000, 'exa']);
});
