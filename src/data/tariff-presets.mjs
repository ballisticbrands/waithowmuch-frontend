/**
 * Real products from the businesses we track, as tariff and landed-cost
 * presets. Shared by /tools/tariff-calculator/ and
 * /tools/landed-cost-calculator/.
 *
 * Factory prices and freight per unit are the ones in each business's margin
 * model (src/businesses/index.mjs: SHG, OT_COST, DT_COST, DJ_COST); the
 * classification is the one argued in the tariffs post
 * (/blog/how-much-do-tariffs-add-to-amazon-products/), with the CBP ruling it
 * leans on. Business names and whether a business is published come from the
 * API, as on the other tools: a preset whose business is not published is
 * dropped, so it can never link to a dead profile.
 *
 * 🚨 OTOTO's scissors. The margin model files them under the metal-kitchen-
 * tool line 8205.51.30; the HTS has a heading for scissors, 8213.00, and at
 * their factory price they fall in 8213.00.90 (valued over $1.75 a dozen,
 * 3¢ each + 3%, List 4B, suspended). The preset uses 8213.00.90 and says so.
 * The business data is left as it is.
 */
export const PRESETS = [
  {
    id: 'shg-deck', slug: 'spite-house-games', product: 'Deck of cards',
    code: '9504400000', country: 'CN', price: 0.47, freightPerUnit: 0.07,
    basis: 'Playing cards, 9504.40.00. The printer is not public; China is assumed.',
  },
  {
    id: 'ototo-spatula', slug: 'ototo', product: 'Splatypus silicone spatula',
    code: '3924104000', country: 'CN', price: 1.4, freightPerUnit: 0.17,
    basis: 'Plastic kitchenware, 3924.10.40, as in CBP ruling N331924.',
  },
  {
    id: 'ototo-corkscrew', slug: 'ototo', product: 'Vino bat corkscrew',
    code: '8205513030', country: 'CN', price: 5.54, freightPerUnit: 0.63,
    claims: { exclusion: { '20(vvv)(iii)(42)': true } },
    basis: 'Steel kitchen implements, 8205.51.30.30, as in CBP ruling N309532. USTR still excludes "kitchen and table implements of iron or steel, non-electric" under that number from the List 3 duty, through 9 January 2027; untick the exclusion to see the rate without it.',
  },
  {
    id: 'ototo-scissors', slug: 'ototo', product: 'Elizabat scissors',
    code: '8213009000', country: 'CN', price: 2.42, freightPerUnit: 0.29,
    basis: 'Scissors, 8213.00.90 (valued over $1.75 a dozen): a compound rate, 3¢ each plus 3%. Our margin model files them under 8205.51.30; the HTS heading for scissors is 8213.',
  },
  {
    id: 'dj-preschool', slug: 'doctor-jupiter', product: 'Preschool science kit, entered as a toy',
    code: '9503000073', country: 'CN', price: 3.25, freightPerUnit: 1.93,
    basis: 'Toys for ages 3 to 12, 9503.00.00.73. Our research says the maker is Indian: switch the country to India to see 10% in place of 12.5%.',
  },
  {
    id: 'dt-plastic', slug: 'draft-top', product: 'Lift can opener, if mainly plastic',
    code: '3924104000', country: 'CN', price: 1.37, freightPerUnit: 0.19,
    assist: { total: 9000, units: 50000 },
    basis: 'Plastic kitchenware, 3924.10.40. The ~$9,000 of moulds is an assist: here spread over an assumed 50,000-unit run.',
  },
  {
    id: 'dt-steel', slug: 'draft-top', product: 'Lift can opener, if a steel tool',
    code: '8210000000', country: 'CN', price: 1.37, freightPerUnit: 0.19,
    assist: { total: 9000, units: 50000 },
    basis: 'Hand-operated kitchen appliance, 8210.00.00: List 3, with no exclusion. Which material gives the opener its essential character decides between the two lines.',
  },
];

export const presetById = (id) => PRESETS.find((p) => p.id === id) ?? null;
