export default `
<p>In the margin models behind the Amazon brands we track, the tariff line takes between <strong>0.75% and 5.4% of revenue</strong>. Per unit, at the rates in force on 10 November 2026, it runs from about <strong>6 cents on a $12.99 deck of cards to $2.28 on a $19.95 corkscrew</strong>. The same factory price can carry a 12.5% duty or a 41.2% one, depending on what the product is and where it was made. This page shows how that duty is worked out, using real products from our case studies, and how to look up your own rate.</p>
<p>We do not have a tariff calculator yet, because a calculator is only as good as its duty-rate data, and we have not sourced that for every product. What follows is the same arithmetic a calculator would do, done by hand on products we have priced.</p>

<h2>How the duty is calculated</h2>
<p>US import duty on a product is a percentage of its customs value. The percentage is a stack of separate duties, each set by a different authority:</p>
<p><strong>Duty = customs value × (base rate + every additional duty that applies to that product and that country)</strong></p>
<ol>
<li><strong>Classify the product.</strong> Every product has a 10-digit code in the Harmonized Tariff Schedule of the United States (HTSUS), published by the US International Trade Commission. The code decides the base rate.</li>
<li><strong>Read the base rate.</strong> The "General" column of the HTSUS is the normal (most-favoured-nation) rate. Playing cards and puzzles are free; plastic kitchenware is 3.4%; drinking glasses valued between $0.30 and $3 each are 22.5%.</li>
<li><strong>Add the extra duties for the country of origin.</strong> These sit in Chapter 99 of the HTSUS. For goods made in China in November 2026 there are two layers that matter for most Amazon products, covered below.</li>
<li><strong>Multiply by the customs value.</strong> That is normally the price you paid the factory, not including international freight and insurance (more on this below).</li>
<li><strong>Add the entry fees.</strong> Customs also charges a merchandise processing fee and, for ocean freight, a harbour maintenance fee. They are small, but they are on every entry.</li>
</ol>

<h2>The rates on Chinese goods, as of 10 November 2026</h2>
<p>Rates have changed several times in 2026 alone, so every figure here is dated. We read them from the HTSUS 2026 Revision 22 and the official notices on 10 November 2026.</p>
<table>
<thead><tr><th>Layer</th><th>Rate on Chinese goods</th><th>Applies to</th></tr></thead>
<tbody>
<tr><td>Base (MFN) rate</td><td>Free to 22.5% for the products on this page</td><td>Everything, from any country</td></tr>
<tr><td>Section 301, China Lists 1 to 3</td><td>+25%</td><td>Products on those lists, including steel kitchen tools and hand-operated kitchen appliances</td></tr>
<tr><td>Section 301, China List 4A</td><td>+7.5%</td><td>Products on that list, including drinking glasses and some wooden kitchenware</td></tr>
<tr><td>Section 301, China List 4B</td><td>Suspended (0%)</td><td>Among others: toys and puzzles (9503), playing cards, plastic kitchenware (3924.10.40)</td></tr>
<tr><td>Section 301 "forced labour" duty (heading 9903.05.31)</td><td>+12.5%</td><td>All products of China since 24 July 2026, with listed exemptions</td></tr>
</tbody>
</table>
<p>What is no longer there matters as much. On 20 February 2026 the Supreme Court held, in <em>Learning Resources, Inc. v. Trump</em>, that the International Emergency Economic Powers Act (IEEPA) does not authorise tariffs. The "reciprocal" and "fentanyl" duties imposed under it stopped being collected on goods entered from 24 February 2026, and CBP has been refunding them through a process it calls CAPE. A temporary 10% surcharge under Section 122 of the Trade Act replaced them from 24 February to 24 July 2026, and on 24 July USTR's new Section 301 duties took over. They came out of 60 investigations into whether trading partners ban imports made with forced labour: 12.5% on products of China, Hong Kong, Vietnam and most of the others, 10% on a group that includes India and Indonesia.</p>
<p>The 12.5% stacks on top of the base rate and on top of the older China lists. USTR exempts goods already subject to the Section 232 sector tariffs, and some listed raw materials. The new duties are being challenged in the Court of International Trade; as of 10 November we found no order stopping their collection.</p>

<h2>Worked examples from our case studies</h2>
<p>Each row takes a product's factory price from our margin model and applies today's stack. The classification is ours, made for this example, and where a CBP ruling covers a similar product we say so. A different code would give a different rate, which is the point of the last two rows.</p>
<table>
<thead><tr><th>Product</th><th>Factory price</th><th>HTS code (basis)</th><th>Base</th><th>China list</th><th>Forced labour</th><th>Total</th><th>Duty a unit</th></tr></thead>
<tbody>
<tr><td><a href="/business/spite-house-games/">Spite House Games</a> deck of cards</td><td>$0.47</td><td>9504.40.00, playing cards</td><td>Free</td><td>List 4B, suspended</td><td>12.5%</td><td>12.5%</td><td>$0.06</td></tr>
<tr><td><a href="/business/ototo/">OTOTO</a> Splatypus silicone jar spatula</td><td>$1.40</td><td>3924.10.40, plastic kitchenware (CBP ruling N331924)</td><td>3.4%</td><td>List 4B, suspended</td><td>12.5%</td><td>15.9%</td><td>$0.22</td></tr>
<tr><td><a href="/business/doctor-jupiter/">Doctor Jupiter</a> preschool science kit, if entered as a toy</td><td>$3.25</td><td>9503.00.00, toys</td><td>Free</td><td>List 4B, suspended</td><td>12.5% (China) or 10% (India)</td><td>12.5% or 10%</td><td>$0.41 or $0.33</td></tr>
<tr><td>OTOTO Vino bat corkscrew</td><td>$5.54</td><td>8205.51.30, steel kitchen implements (CBP ruling N309532)</td><td>3.7%</td><td>List 3, 25%</td><td>12.5%</td><td>41.2%</td><td>$2.28</td></tr>
<tr><td><a href="/business/draft-top/">Draft Top</a> Lift can opener, if mainly plastic</td><td>$1.37</td><td>3924.10.40</td><td>3.4%</td><td>List 4B, suspended</td><td>12.5%</td><td>15.9%</td><td>$0.22</td></tr>
<tr><td>Draft Top Lift can opener, if a steel hand tool</td><td>$1.37</td><td>8205.51.30 or 8210.00.00</td><td>3.7%</td><td>List 3, 25%</td><td>12.5%</td><td>41.2%</td><td>$0.56</td></tr>
</tbody>
</table>
<p>Three things stand out.</p>
<p><strong>The code matters more than the price.</strong> The corkscrew's factory price is under four times the spatula's, but its duty is ten times larger, because steel kitchen tools sit on the 25% List 3 and plastic kitchenware does not. The can opener shows the same thing on one product: $0.22 or $0.56 a unit depending on which material gives it its essential character. That is a question for a customs broker or a CBP ruling, not a guess.</p>
<p><strong>The country matters.</strong> Doctor Jupiter's own manufacturer is Indian, according to our research. If its kits were made in India, the forced-labour layer would be 10% rather than 12.5%. Draft Top says its opener is made in the USA; a US-made product pays no import duty at all, although then a Chinese factory quote would not be its cost either.</p>
<p><strong>A flat assumption is a blunt tool.</strong> Most of our margin models apply a flat 20% to the factory price, the old List 4A 7.5% plus 12.5%, because the brand's real classification and origin are not public. On the card deck that overstates today's duty ($0.09 against $0.06 a deck, about $360 a month on Spite House's September volume). On a List 3 steel tool it would understate it by half.</p>

<h2>What the tariff line looks like in our margin models</h2>
<p>These are the tariff lines as they sit in each business's published margin model, with the assumption each one rests on. They were built at different times, so the rate each uses reflects the rules for the month it models.</p>
<table>
<thead><tr><th>Business</th><th>Tariff as % of revenue</th><th>Per unit</th><th>What it assumes</th></tr></thead>
<tbody>
<tr><td><a href="/business/gamblin-golf/">Gamblin' Golf</a></td><td>0.75%</td><td>$0.18 on a $24 game</td><td>20% of an $0.88 factory price; China origin assumed</td></tr>
<tr><td>Draft Top</td><td>1.02%</td><td>$0.27 on a $26.76 average sale</td><td>20% of $1.37; China assumed, though the brand says USA</td></tr>
<tr><td><a href="/business/bizzikins/">Bizzikins</a></td><td>1.8%</td><td>$0.68 on a $37.50 doll</td><td>12.5% of $5.40; sources disagreed between 12.5% and 20%</td></tr>
<tr><td><a href="/business/songbird-specialties/">Songbird Specialties</a></td><td>1.91%</td><td>$0.57 on a $29.99 pourer</td><td>20% of $2.87; origin unknown</td></tr>
<tr><td><a href="/business/virora-mahjong/">Virora Mahjong</a></td><td>3.0%</td><td>$5,134 in September</td><td>20% (7.5% List 4A plus 12.5%); China assumed</td></tr>
<tr><td>Doctor Jupiter</td><td>3.01%</td><td>$0.65 on the $26.99 kit</td><td>20%; China assumed (its maker is Indian)</td></tr>
<tr><td>OTOTO</td><td>3.01%</td><td>$0.19 spatula, $2.14 corkscrew</td><td>Duty classes by material; a June 2026 import, so the 10% Section 122 surcharge rather than today's 12.5%</td></tr>
<tr><td><a href="/business/woodlands-usa/">WOODLANDS USA</a></td><td>3.28%</td><td>$0.27 to $1.77</td><td>20%; China assumed (the teak may be Indonesian)</td></tr>
<tr><td><a href="/business/lighten-life/">LIGHTEN LIFE</a></td><td>5%</td><td>$2,549 in September</td><td>Glassware under 7013.37 (CBP ruling N345029): 22.5% base plus 7.5% List 4A, plus the extra China duty for the import month</td></tr>
<tr><td><a href="/business/restoration-games/">Restoration Games</a></td><td>5.42%</td><td>$1,877 in September</td><td>20% of manufacturing; China assumed</td></tr>
</tbody>
</table>
<p>Two patterns. First, tariffs are a small line next to Amazon's own fees: the referral fee alone is about 15% of revenue for every one of these businesses, roughly three to twenty times the tariff line. See <a href="/blog/how-much-does-amazon-take-from-sellers/">how much Amazon takes from sellers</a>. Second, the tariff hurts most where the factory price is high relative to the selling price. OTOTO's corkscrew pays more than 10% of its $19.95 price in duty; Spite House's deck pays about 1%. Duty is charged on what you paid the factory, so a cheap item with a big markup barely feels it. LIGHTEN LIFE shows the other way duty gets big: drinking glass carries a 22.5% base rate before any China duty is added.</p>

<h2>What counts as the customs value</h2>
<p>CBP's guidance on customs value defines it, for most imports, as the "transaction value": the total the buyer pays the seller, <strong>excluding international freight, insurance and other C.I.F. charges</strong>. In practice, on an FOB or EXW factory quote the duty is charged on that price, not on your landed cost. Two additions catch new importers:</p>
<ul>
<li><strong>Moulds and tooling.</strong> CBP lists "tools, dies, molds" used to make the goods as an "assist" that is added to the value when the buyer provides them. Several of our case studies need moulds: about $9,000 for Draft Top, $1,200 for Songbird, $8,800 for Restoration Games' Thunder Road miniatures. If you pay the factory for a mould, ask your broker how it enters the value of the goods it makes.</li>
<li><strong>Packing, commissions and royalties</strong> paid by the buyer are added too, if they are not already in the price.</li>
</ul>
<p>Freight itself is not dutiable, which is why our margin models carry freight as its own line, priced from a Freightos China to US West Coast rate, and apply the tariff to the factory price alone.</p>

<h2>The fees on top of duty</h2>
<p>From CBP's user fee table (last updated 9 October 2026):</p>
<ul>
<li><strong>Merchandise processing fee:</strong> 0.3464% of value on a formal entry, minimum $34.58 and maximum $670.86. On a $20,000 shipment that is about $69.</li>
<li><strong>Harbor maintenance fee:</strong> 0.125% of value on goods arriving by sea; $25 on the same $20,000.</li>
</ul>
<p>Customs brokers charge their own fee per entry, which is not a government charge and varies by broker.</p>

<h2>Small parcels pay too now</h2>
<p>The de minimis exemption used to let a shipment valued at $800 or less enter duty-free. CBP has now suspended it indefinitely: for courier and freight shipments from 24 June 2026, and for international mail from 24 July 2026. Samples sent by express and small restocks now go through entry and pay duty like anything else. That also applies to stock bought from AliExpress or Temu; we compare those prices in <a href="/blog/alibaba-vs-aliexpress/">Alibaba vs AliExpress</a>.</p>

<h2>How to look up your own tariff rate</h2>
<ol>
<li><strong>Find your HTS code.</strong> Search the HTSUS at hts.usitc.gov by product words, then read down to the 10-digit line that describes your product. The first six digits are international, so your supplier's export code is a good starting point, but the US digits after them are yours to get right.</li>
<li><strong>Check a CBP ruling.</strong> Search CBP's rulings database (CROSS, at rulings.cbp.gov) for a product like yours. Rulings show the code CBP chose and usually name the Chapter 99 duty that applies. N331924 and N309532, cited above, are examples.</li>
<li><strong>Read the base rate</strong> in the "General" column.</li>
<li><strong>Check the China lists.</strong> If the product is made in China, see whether its 8-digit code appears in U.S. note 20 to Chapter 99 (Lists 1 to 4A). Note 20 also shows List 4B as suspended. USTR's Section 301 pages carry the same lists.</li>
<li><strong>Add the 2026 Section 301 rate for the country of origin</strong>: 12.5% for China, Hong Kong and Vietnam, 10% for India, Indonesia and some others, under headings 9903.05.20 to 9903.05.84. Check the exemptions in U.S. note 52.</li>
<li><strong>Multiply</strong> the total by your factory price per unit, then add the fees above.</li>
<li><strong>If the answer moves your margin,</strong> pay a customs broker to confirm it, or ask CBP for a binding ruling before you order. The can opener above is the reason.</li>
</ol>
<p>Then put the landed cost into our <a href="/tools/amazon-fba-calculator/">Amazon FBA fee and profit calculator</a> to see what is left after Amazon's fees. For what those fees are on each product type, see <a href="/blog/amazon-fba-fees-2026/">Amazon FBA fees 2026</a>.</p>

<h2>What we do not know</h2>
<p>None of these brands publishes its HTS codes or customs entries, so every tariff line on this site is an estimate. Most rest on an assumed country of origin. The rates themselves can change with a court ruling or a new notice; the forced-labour duty is under challenge as we write. Treat the worked examples as a method, check the date on every rate, and re-check before you place an order.</p>
`;
