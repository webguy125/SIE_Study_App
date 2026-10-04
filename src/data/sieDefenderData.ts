export type WeaponKey = 'A' | 'S' | 'D' | 'F';

export interface WeaponSlot {
  key: WeaponKey;
  term: string;
  matchesDefinition: (def: string) => boolean;
}

export interface ThreatTemplate {
  definition: string;
  correctKey: WeaponKey;
}

/** Active loadout — keys A/S/D/F map to settlement and margin weapons. */
export const WEAPON_SLOTS: WeaponSlot[] = [
  {
    key: 'A',
    term: 'T+1',
    matchesDefinition: (def) => def.includes('Options settlement'),
  },
  {
    key: 'S',
    term: 'T+2',
    matchesDefinition: (def) => def.includes('Stock settlement'),
  },
  {
    key: 'D',
    term: 'Reg T',
    matchesDefinition: (def) => def.includes('50% margin requirement'),
  },
  {
    key: 'F',
    term: 'Rule 144',
    matchesDefinition: (def) => def.includes('Restricted stock volume'),
  },
];

/** Incoming threat definitions — each phrase embeds the weapon match token. */
export const THREAT_POOL: ThreatTemplate[] = [
  {
    definition:
      'Listed equity options follow a T+1 Options settlement cycle — trade date plus one business day.',
    correctKey: 'A',
  },
  {
    definition:
      'Index options and many listed options use Options settlement on T+1 under current industry standards.',
    correctKey: 'A',
  },
  {
    definition:
      'U.S. Treasury bills and many government notes settle T+1; options share the same Options settlement window.',
    correctKey: 'A',
  },
  {
    definition:
      'An options assignment must be funded by the Options settlement date to avoid delivery failures.',
    correctKey: 'A',
  },
  {
    definition:
      'Corporate common stock trades on a T+2 Stock settlement cycle — two business days after the trade date.',
    correctKey: 'S',
  },
  {
    definition:
      'Investment-grade corporate bonds generally follow Stock settlement at T+2, same as listed equities.',
    correctKey: 'S',
  },
  {
    definition:
      'Municipal revenue bonds typically settle on the Stock settlement schedule (T+2 regular way).',
    correctKey: 'S',
  },
  {
    definition:
      'Cash account customers must pay for a stock purchase by the Stock settlement date at the latest.',
    correctKey: 'S',
  },
  {
    definition:
      'Regulation T sets a 50% margin requirement for the initial purchase of marginable securities.',
    correctKey: 'D',
  },
  {
    definition:
      'A customer depositing only 50% margin requirement cash may borrow the remainder on eligible stock.',
    correctKey: 'D',
  },
  {
    definition:
      'Federal Reserve Regulation T governs credit extended by brokers — including the 50% margin requirement.',
    correctKey: 'D',
  },
  {
    definition:
      'Short sales in margin accounts require 150% of market value — 100% proceeds plus 50% margin requirement.',
    correctKey: 'D',
  },
  {
    definition:
      'Rule 144 limits Restricted stock volume that may be sold in any three-month period without registration.',
    correctKey: 'F',
  },
  {
    definition:
      'Affiliates selling control stock must comply with Rule 144 Restricted stock volume caps and holding periods.',
    correctKey: 'F',
  },
  {
    definition:
      'Unregistered shares from a private placement are subject to Rule 144 Restricted stock volume limits when resold.',
    correctKey: 'F',
  },
  {
    definition:
      'After the required holding period, Rule 144 still caps Restricted stock volume based on public float and trading volume.',
    correctKey: 'F',
  },
];

export function pickThreatTemplate(pool: ThreatTemplate[], exclude?: Set<string>): ThreatTemplate {
  const available = exclude
    ? pool.filter((t) => !exclude.has(t.definition))
    : pool;
  const source = available.length > 0 ? available : pool;
  return source[Math.floor(Math.random() * source.length)];
}

export function weaponForKey(key: string): WeaponSlot | undefined {
  return WEAPON_SLOTS.find((w) => w.key === key);
}