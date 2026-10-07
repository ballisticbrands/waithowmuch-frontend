/**
 * Mount Cleverest — revenue by listing, Sep 2026, and the profile's
 * photographs.
 *
 * 🚨 GENERATED from the Keepa pull, not authored. Every row is one ASIN from
 * waithowmuch-research research/mount-cleverest/keepa/breakdown-2026-09.json
 * (built from catalogue.json, read 2026-10-06): `sold` is Amazon's "bought in
 * past month" badge at the September month end, `price` the buy box (priceCents
 * in the catalogue pull), and `revenue` their product. Regenerate from that
 * file rather than editing a row, or the table stops matching the evidence.
 *
 * All EIGHTEEN storefront listings are here, seven of them at zero: they carry
 * no badge, which means under roughly 50 a month, not none. They sum to
 * $39,048.00, the 2026-09 revenue row exactly, which check-profile.mjs asserts.
 * The three Mount Cleverest editions are one product line; the ten 100 PICS and
 * five SMART CARDS listings are two older ones. Largest first.
 */

/** Photos from our bucket, never /public and never Amazon's CDN. Values are
 *  the content hashes `npm run product-image` printed on 2026-10-07; keyed by
 *  ASIN so no row types a 64-character hash. */
const BUCKET = 'https://storage.googleapis.com/verifiedmargins/products/mount-cleverest/';
const PHOTOS = {
  B0B6B25BKW: 'd395da1315a37909933d059b344a467aed590f2ebe7216c947ce101ad072ed8f',
  B087MWB61Y: '2810d1bf455d954869838a77e8dfef1336b42ee37d7ba0a048b8d4457901f239',
  B0CBSHKWSD: 'd9e9f3a08aa846192841fe0c2ad7853a083db5005fc8f1b265faa5e43ee5d79c',
  B0CBSJDH54: '421239d76bd077aaa7b99f938e39e80afe1ad2e824fa3eb6ea23bc80d6622c5c',
  B07VF6SFMX: '24f9391c2861fd91dbd5a1dfa938f8a22c0045cd02bb81f74e5e707dce2c823e',
  B0CBQK97HF: 'af3cec56563678c2b64bb16c5b0c761774441536726891ac65c98777d1211ff4',
  B087MW9JD9: '53bc89fd1ada48f79744c92a1b9348ea9ecbf36e4ac9a7ebf7a1f2fecca8d580',
  B07VK983MC: '13fa37a4ce6ed2d133e6e892b7c5e553295036608cb8b0515c4833ffb20aa0cb',
  B094XZ45Q5: '4463bd6dc58df08c2343714441a92ccc22aa46e88a75eee7c3f928910b0917af',
  B09YJWN6W1: '02bb4c2c983f77d2a8f7fd6b5084ef5a3ebe3aa606396b897ee3203e8580d130',
  B07VK9FM73: '88be37d3d468678222727a88cc7249a8d00ccd788c2c3f14031fd21bd8f09a75',
  B09D3FLZD8: '66c425c73dfab4247dab1902b94859b770a61d5b74b26c3c26fd7d858142d7b1',
  B08B8WJN5G: 'b7302733858cd9b25e6c02c01bac66fd000e7fc8388a0c59159b2905205c0ec5',
  B0CBSRCNVC: '757810d1b7ace89ccf8fe3bb9818ee38754c87438dbe7f5a10531af8e80540a8',
  B087N53LJP: 'ea56545a753e0b39dbb813487c15d2dc97b252ecd0ef0431fec57bb5e5163481',
  B07L6MJ1X5: '432ff25d2fa4e746c215bca826f1189233b110f0a39928c1d333ac5381f4da32',
  B0CBQK916R: '75d4c8856b80a64d51e31bf622e0484e9239d722b858aa658617f0507d9e1e9c',
  B08BCB8DK5: '80a531f3c0be470baf869770a7e0a260d66cbacd4508f040984c54b1a968dac7',
};
/** A photo's bucket URL, by ASIN. */
export const mountCleverestPhoto = (asin) => PHOTOS[asin] && `${BUCKET}${PHOTOS[asin]}.jpg`;

export const MOUNT_CLEVEREST_BREAKDOWN = [
  {
    name: "Mount Cleverest Original Edition — true-or-false trivia deck",
    asin: 'B0B6B25BKW',
    listed: '15 Jul 2022',
    sold: 1000,
    price: 16.99,
    revenue: 16990,
    image: mountCleverestPhoto('B0B6B25BKW'),
  },
  {
    name: "100 PICS US States & Capitals flash cards",
    asin: 'B087MWB61Y',
    listed: '24 Apr 2020',
    sold: 900,
    price: 12.99,
    revenue: 11691,
    image: mountCleverestPhoto('B087MWB61Y'),
  },
  {
    name: "Mount Cleverest Geography Edition — true-or-false trivia deck",
    asin: 'B0CBSHKWSD',
    listed: '13 Jul 2023',
    sold: 200,
    price: 16.99,
    revenue: 3398,
    image: mountCleverestPhoto('B0CBSHKWSD'),
  },
  {
    name: "Mount Cleverest Movie Edition — true-or-false trivia deck",
    asin: 'B0CBSJDH54',
    listed: '13 Jul 2023',
    sold: 100,
    price: 16.99,
    revenue: 1699,
    image: mountCleverestPhoto('B0CBSJDH54'),
  },
  {
    name: "100 PICS Flags of the World travel game",
    asin: 'B07VF6SFMX',
    listed: '1 Oct 2019',
    sold: 100,
    price: 12.99,
    revenue: 1299,
    image: mountCleverestPhoto('B07VF6SFMX'),
  },
  {
    name: "SMART CARDS Trains, 7-in-1 card game",
    asin: 'B0CBQK97HF',
    listed: '7 Jul 2023',
    sold: 100,
    price: 9.99,
    revenue: 999,
    image: mountCleverestPhoto('B0CBQK97HF'),
  },
  {
    name: "100 PICS Logos travel game",
    asin: 'B087MW9JD9',
    listed: '24 Apr 2020',
    sold: 100,
    price: 8.39,
    revenue: 839,
    image: mountCleverestPhoto('B087MW9JD9'),
  },
  {
    name: "100 PICS Countries of the World travel game",
    asin: 'B07VK983MC',
    listed: '1 Oct 2019',
    sold: 50,
    price: 12.94,
    revenue: 647,
    image: mountCleverestPhoto('B07VK983MC'),
  },
  {
    name: "SMART CARDS Dinosaurs, 7-in-1 card game",
    asin: 'B094XZ45Q5',
    listed: '21 Aug 2021',
    sold: 50,
    price: 9.99,
    revenue: 499.5,
    image: mountCleverestPhoto('B094XZ45Q5'),
  },
  {
    name: "SMART CARDS Cars, 7-in-1 card game",
    asin: 'B09YJWN6W1',
    listed: '19 Aug 2021',
    sold: 50,
    price: 9.99,
    revenue: 499.5,
    image: mountCleverestPhoto('B09YJWN6W1'),
  },
  {
    name: "100 PICS Riddles travel game",
    asin: 'B07VK9FM73',
    listed: '1 Oct 2019',
    sold: 50,
    price: 9.74,
    revenue: 487,
    image: mountCleverestPhoto('B07VK9FM73'),
  },
  {
    name: "100 PICS US Road Signs travel game",
    asin: 'B09D3FLZD8',
    listed: '19 Aug 2021',
    sold: 0,
    price: 12.99,
    revenue: 0,
    image: mountCleverestPhoto('B09D3FLZD8'),
  },
  {
    name: "SMART CARDS Countries, 7-in-1 card game",
    asin: 'B08B8WJN5G',
    listed: '30 May 2024',
    sold: 0,
    price: 9.99,
    revenue: 0,
    image: mountCleverestPhoto('B08B8WJN5G'),
  },
  {
    name: "100 PICS Brain Teasers travel game",
    asin: 'B0CBSRCNVC',
    listed: '13 Jul 2023',
    sold: 0,
    price: 12.99,
    revenue: 0,
    image: mountCleverestPhoto('B0CBSRCNVC'),
  },
  {
    name: "100 PICS Jokes travel game",
    asin: 'B087N53LJP',
    listed: '24 Apr 2020',
    sold: 0,
    price: 12.99,
    revenue: 0,
    image: mountCleverestPhoto('B087N53LJP'),
  },
  {
    name: "100 PICS Animals travel game",
    asin: 'B07L6MJ1X5',
    listed: '16 Jul 2019',
    sold: 0,
    price: 6.94,
    revenue: 0,
    image: mountCleverestPhoto('B07L6MJ1X5'),
  },
  {
    name: "SMART Cards US States, 7-in-1 card game",
    asin: 'B0CBQK916R',
    listed: '7 Jul 2023',
    sold: 0,
    price: 9.99,
    revenue: 0,
    image: mountCleverestPhoto('B0CBQK916R'),
  },
  {
    name: "SMART Cards Animals, 7-in-1 card game",
    asin: 'B08BCB8DK5',
    listed: '19 Sep 2023',
    sold: 0,
    price: 9.99,
    revenue: 0,
    image: mountCleverestPhoto('B08BCB8DK5'),
  },
  {
    /* 🚨 Not a listing: the whole UK TikTok Shop "100 PICS" (Kalodata shop/detail,
       2026-09, 43 units, $941.14). A third-party estimate, no ASIN, shown with
       the Original's photo because every row gets one. */
    name: 'TikTok Shop UK, all products (Kalodata estimate)',
    listed: 'Oct 2025',
    sold: 43,
    price: 21.89,
    revenue: 941.14,
    image: mountCleverestPhoto('B0B6B25BKW'),
  },
];
