/**
 * Virora Mahjong — the Amazon keywords its listings show up on, for the
 * Advertising section.
 *
 * 🚨 From the evidence, not authored. Every row is
 * waithowmuch-research research/virora-mahjong/ad-keywords.json (Jungle Scout
 * keywords_by_asin_query, read 2026-10-05) for the eight ASINs carrying a sold
 * badge in Sep 2026: searches are Jungle Scout's exact-match monthly volume,
 * positions the best any of the eight held, cost per click its exact-match
 * suggested bid. Regenerate from that file rather than editing a row.
 *
 * Its own module so the profile entry in index.mjs stays prose.
 */

/** The 50 highest-volume keywords where a listing of theirs ranks in the top
 *  60 organically or holds a sponsored slot. Of 739 keywords Jungle Scout
 *  returned, 660 qualify. */
export const VIRORA_TOP_KEYWORDS = [
  ['mahjong set', '485,500', '#14', 'None seen', '$1.14'],
  ['mahjong mat', '323,347', '#22', 'None seen', '$0.75'],
  ['mahjong tiles', '272,639', '#3', 'None seen', '$1.27'],
  ['mahjong', '192,279', '#22', 'None seen', '$0.67'],
  ['mahjong tile set', '98,447', '#11', 'None seen', '$0.98'],
  ['american mahjong set', '93,264', '#14', 'None seen', '$1.12'],
  ['majiang set', '61,922', '#24', 'None seen', '$1.06'],
  ['american mahjong tiles', '43,484', '#2', 'None seen', '$0.96'],
  ['mahjong mats', '39,313', '#17', 'None seen', '$0.73'],
  ['mahjong sets', '31,247', '#13', 'None seen', '$1.13'],
  ['mahjong gifts', '30,756', '#5', 'None seen', '$0.57'],
  ['mahjong tiles american', '28,676', '#2', 'None seen', '$0.68'],
  ['mah jongg sets', '28,245', '#12', 'None seen', '$1.59'],
  ['mahjong mat with rules', '24,649', '#9', 'None seen', '—'],
  ['mahjong mats for table', '24,433', '#12', 'None seen', '—'],
  ['mahjong table cloth', '22,466', '#49', 'None seen', '$0.47'],
  ['chinese mahjong set', '20,094', '#56', 'None seen', '$0.95'],
  ['mahjong game set', '16,756', '#18', 'None seen', '$1.64'],
  ['virora mahjong tiles', '14,347', '#1', '#2', '—'],
  ['mahjong sets for beginners', '12,985', '#39', 'None seen', '—'],
  ['travel mahjong sets american', '11,983', '#43', 'None seen', '—'],
  ['american mahjong', '11,861', '#20', 'None seen', '$1.00'],
  ['american mahjong mat', '11,289', '#18', 'None seen', '—'],
  ['mah jongg mat', '11,226', '#18', 'None seen', '$0.63'],
  ['american mahjong tile set', '10,408', '#5', 'None seen', '—'],
  ['mahjong clearance', '10,333', '#29', 'None seen', '—'],
  ['mah jong', '9,821', '#30', 'None seen', '$0.43'],
  ['pink mahjong tiles', '9,744', '#2', 'None seen', '—'],
  ['green mahjong tiles', '9,581', '#14', '#27', '—'],
  ['premium mahjong tile sets', '9,069', '#3', 'None seen', '—'],
  ['green mahjong mat', '9,049', '#35', 'None seen', '—'],
  ['mahjong tiles set', '8,656', '#5', 'None seen', '$1.04'],
  ['pink mahjong mat', '8,530', '#17', 'None seen', '—'],
  ['mahjong game', '8,174', '#27', 'None seen', '$0.73'],
  ['hobby lobby mahjong tiles', '8,165', '#33', 'None seen', '—'],
  ['mah jong tiles', '8,055', '#6', 'None seen', '$0.89'],
  ['mini mahjong travel set', '7,655', '#30', 'None seen', '$1.54'],
  ['mahjong table mat', '7,470', '#27', 'None seen', '$0.72'],
  ['mahjong atelier', '7,188', '#42', 'None seen', '—'],
  ['yellow mountain american mahjong sets', '7,118', '#31', 'None seen', '—'],
  ['oh my mahjong', '7,037', '#2', 'None seen', '—'],
  ['sweet jojo mahjong tiles', '6,679', '#27', 'None seen', '—'],
  ['mah jong mat', '6,272', '#24', 'None seen', '$0.75'],
  ['mahjong set american', '6,144', '#21', 'None seen', '$3.31'],
  ['mini mahjong set', '6,053', '#36', 'None seen', '$0.82'],
  ['majong', '5,918', '#17', 'None seen', '$0.51'],
  ['tortoise mahjong tiles', '5,819', '#36', 'None seen', '—'],
  ['oh my mahjong tiles', '5,775', '#3', 'None seen', '—'],
  ['4 layer mahjong tiles', '5,363', '#2', 'None seen', '—'],
  ['neoprene mahjong mat', '5,313', '#7', 'None seen', '—'],
];

/** Every keyword where an ad of theirs was seen — 26 of 739. "A month" is
 *  searches × a 1% click rate × the cost per click; none of the 26 carries a
 *  Jungle Scout bid, so each takes the $1.00 median of the 102 that do. The
 *  rows sum to $614 (unrounded, $618). */
export const VIRORA_AD_KEYWORDS = [
  ['virora mahjong tiles', '14,347', '#2', '$1.00', '$143'],
  ['green mahjong tiles', '9,581', '#27', '$1.00', '$96'],
  ['engraved mahjong tiles', '4,966', '#21', '$1.00', '$50'],
  ['mahjong mat pink', '4,821', '#22', '$1.00', '$48'],
  ['orange mahjong mat', '3,688', '#4', '$1.00', '$37'],
  ['virora mahjong', '3,568', '#1', '$1.00', '$36'],
  ['acrylic mahjong tiles', '2,662', '#37', '$1.00', '$27'],
  ['premium acrylic mahjong tiles', '2,433', '#6', '$1.00', '$24'],
  ['noise dampening mahjong mat', '2,171', '#47', '$1.00', '$22'],
  ['mahjong mat orange', '1,644', '#4', '$1.00', '$16'],
  ['rolled mahjong mat no creases', '1,508', '#6', '$1.00', '$15'],
  ['pink and green mahjong mat', '1,487', '#2', '$1.00', '$15'],
  ['golf mahjong tiles', '1,190', '#21', '$1.00', '$12'],
  ['virora christmas mahjong tiles', '1,044', '#3', '$1.00', '$10'],
  ['mahjong tiles 4 layer', '978', '#2', '$1.00', '$10'],
  ['acrylic mahjong tile sets', '959', '#4', '$1.00', '$10'],
  ['american mah jongg tiles', '741', '#7', '$1.00', '$7'],
  ['4 layer acrylic mahjong tiles', '450', '#9', '$1.00', '$4'],
  ['american mahjong tile set complete', '450', '#30', '$1.00', '$4'],
  ['american mahjong tile sets 160 pieces', '450', '#1', '$1.00', '$4'],
  ['blossom mahjong tiles', '450', '#1', '$1.00', '$4'],
  ['americana mahjong mat', '450', '#8', '$1.00', '$4'],
  ['coral mahjong mat', '450', '#5', '$1.00', '$4'],
  ['green and orange mahjong mat', '450', '#2', '$1.00', '$4'],
  ['pretty mahjong mat', '450', '#5', '$1.00', '$4'],
  ['veteb mahjong mat', '450', '#4', '$1.00', '$4'],];
