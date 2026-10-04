/**
 * SIE exam vocabulary aligned with the FINRA Content Outline (Oct 2025).
 * Each term has exam-focused hints — no auto-extracted question fragments.
 */

export interface SieVocabTerm {
  id: string;
  /** Vocabulary phrase shown in the game */
  term: string;
  /** FINRA outline section 1–4 */
  section: 1 | 2 | 3 | 4;
  category: string;
  /** Short definition hints matched to this term */
  clues: string[];
}

export const SIE_VOCABULARY: SieVocabTerm[] = [
  // ── Section 1: Knowledge of Capital Markets ──────────────────────────────
  // Standalone acronyms (SEC, FINRA, MSRB, etc.) live in sieAcronyms.ts
  { id: 's1-fed', term: 'Federal Reserve', section: 1, category: 'Economic factors', clues: [
    'US central bank setting monetary policy',
    'Influences interest rates and economic activity',
    'Sets the federal funds rate and discount rate',
  ]},
  { id: 's1-primary', term: 'primary market', section: 1, category: 'Market structure', clues: [
    'Where new securities are sold by issuers',
    'IPO and new bond issues trade here first',
    'Investors buy directly from the issuer',
  ]},
  { id: 's1-secondary', term: 'secondary market', section: 1, category: 'Market structure', clues: [
    'Trading of existing securities among investors',
    'NYSE and NASDAQ are secondary markets',
    'Does not raise new capital for the issuer',
  ]},
  { id: 's1-otc', term: 'OTC market', section: 1, category: 'Market structure', clues: [
    'Over-the-counter market for unlisted securities',
    'Trades occur away from a formal exchange',
  ]},
  { id: 's1-broker-dealer', term: 'broker-dealer', section: 1, category: 'Market participants', clues: [
    'Firm that buys and sells securities for others or itself',
    'Must register with the SEC and FINRA',
    'Introduces or clears customer trades',
  ]},
  { id: 's1-market-maker', term: 'market maker', section: 1, category: 'Market participants', clues: [
    'Quotes bid and ask prices to provide liquidity',
    'May trade from inventory as principal',
    'Helps maintain an orderly market',
  ]},
  { id: 's1-underwriter', term: 'underwriter', section: 1, category: 'Market participants', clues: [
    'Helps issuers bring new securities to market',
    'May use firm commitment or best efforts',
    'Part of the underwriting syndicate on new issues',
  ]},
  { id: 's1-prospectus', term: 'prospectus', section: 1, category: 'Offerings', clues: [
    'Legal disclosure document for a new offering',
    'Describes risks, fees, and issuer finances',
    'Must be delivered before or with the sale',
  ]},
  { id: 's1-shelf', term: 'shelf registration', section: 1, category: 'Offerings', clues: [
    'SEC filing allowing delayed securities offerings',
    'Issuer can bring deals to market quickly',
    'Registered securities held on the shelf',
  ]},
  { id: 's1-firm-commitment', term: 'firm commitment', section: 1, category: 'Offerings', clues: [
    'Underwriter buys entire issue from the issuer',
    'Underwriter bears unsold inventory risk',
    'Most common method for IPO underwriting',
  ]},
  { id: 's1-best-efforts', term: 'best efforts', section: 1, category: 'Offerings', clues: [
    'Underwriter acts as agent, not buyer of issue',
    'Does not guarantee the issuer full proceeds',
    'Common for smaller or riskier offerings',
  ]},
  { id: 's1-accredited', term: 'accredited investor', section: 1, category: 'Market participants', clues: [
    'Investor meeting income or net worth thresholds',
    'May participate in certain private offerings',
    'Defined under SEC Regulation D',
  ]},
  { id: 's1-rule-144', term: 'Rule 144', section: 1, category: 'Offerings', clues: [
    'SEC rule governing sale of restricted securities',
    'Sets holding periods and volume limits',
    'Applies to control stock and unregistered shares',
  ]},

  // ── Section 2: Products and Their Risks ────────────────────────────────
  { id: 's2-common', term: 'common stock', section: 2, category: 'Equity', clues: [
    'Equity ownership with voting rights',
    'Last in line in bankruptcy liquidation',
    'May receive dividends at board discretion',
  ]},
  { id: 's2-preferred', term: 'preferred stock', section: 2, category: 'Equity', clues: [
    'Equity with priority over common for dividends',
    'Usually limited or no voting rights',
    'Paid before common in liquidation',
  ]},
  { id: 's2-cumulative', term: 'cumulative preferred', section: 2, category: 'Equity', clues: [
    'Missed preferred dividends must be paid up',
    'Receives arrearages before common dividends',
    'Unpaid dividends accumulate over time',
  ]},
  { id: 's2-warrant', term: 'warrant', section: 2, category: 'Equity', clues: [
    'Right to buy stock from the issuer at a set price',
    'Similar to a long-term call from the company',
    'Often attached to bond or preferred offerings',
  ]},
  { id: 's2-rights', term: 'rights offering', section: 2, category: 'Equity', clues: [
    'Short-term offer to buy new shares at a discount',
    'Existing shareholders get preemptive rights',
    'Anti-dilution protection for current owners',
  ]},
  { id: 's2-treasury', term: 'treasury stock', section: 2, category: 'Equity', clues: [
    'Shares repurchased and held by the issuer',
    'Reduces shares outstanding in circulation',
    'No voting rights or dividends while held',
  ]},
  { id: 's2-corporate-bond', term: 'corporate bond', section: 2, category: 'Debt', clues: [
    'Debt security issued by a corporation',
    'Bondholder is a creditor of the company',
    'Pays periodic interest to holders',
  ]},
  { id: 's2-debenture', term: 'debenture', section: 2, category: 'Debt', clues: [
    'Unsecured corporate bond backed by issuer credit',
    'No specific collateral pledged to holders',
    'Higher yield than secured bonds of same issuer',
  ]},
  { id: 's2-go', term: 'general obligation bond', section: 2, category: 'Municipal', clues: [
    'Municipal bond backed by taxing power',
    'GO bond secured by issuer credit and taxes',
    'Voter approval often required for issuance',
  ]},
  { id: 's2-revenue', term: 'revenue bond', section: 2, category: 'Municipal', clues: [
    'Municipal bond backed by project revenue',
    'Paid from tolls, fees, or lease income',
    'Not backed by the issuer taxing power',
  ]},
  { id: 's2-tbill', term: 'T-bill', section: 2, category: 'Government', clues: [
    'Short-term Treasury obligation one year or less',
    'Sold at a discount, no periodic coupon',
    'Backed by full faith and credit of US government',
  ]},
  { id: 's2-tnote', term: 'T-note', section: 2, category: 'Government', clues: [
    'Intermediate-term Treasury note 2 to 10 years',
    'Pays semiannual interest to holders',
    'Backed by full faith and credit of US government',
  ]},
  { id: 's2-mbs', term: 'mortgage-backed security', section: 2, category: 'Agency', clues: [
    'Pool of mortgage loans securitized for investors',
    'Subject to prepayment risk from homeowners',
    'GNMA, FNMA, and FHLMC issue agency MBS',
  ]},
  { id: 's2-callable', term: 'callable bond', section: 2, category: 'Debt features', clues: [
    'Issuer may redeem before maturity at set dates',
    'Benefits issuer when interest rates fall',
    'Investor faces reinvestment risk if called',
  ]},
  { id: 's2-convertible', term: 'convertible bond', section: 2, category: 'Debt features', clues: [
    'Bond exchangeable into a fixed number of shares',
    'Offers bond downside with equity upside',
    'Coupon is usually lower than straight debt',
  ]},
  { id: 's2-zero', term: 'zero coupon bond', section: 2, category: 'Debt features', clues: [
    'Sold at a deep discount with no periodic interest',
    'Pays par value at maturity',
    'High interest rate sensitivity due to long duration',
  ]},
  { id: 's2-par', term: 'par value', section: 2, category: 'Debt basics', clues: [
    'Face value of a bond at maturity',
    'Bonds trade at premium above or discount below',
    'Also called nominal or face value',
  ]},
  { id: 's2-coupon', term: 'coupon rate', section: 2, category: 'Debt basics', clues: [
    'Stated annual interest rate on a bond',
    'Fixed percentage of par paid to holders',
    'Distinct from current yield and YTM',
  ]},
  { id: 's2-ytm', term: 'yield to maturity', section: 2, category: 'Yields', clues: [
    'Total return if bond is held to maturity',
    'Accounts for price, coupon, and time value',
  ]},
  { id: 's2-current-yield', term: 'current yield', section: 2, category: 'Yields', clues: [
    'Annual coupon divided by current market price',
    'Does not account for gain or loss at maturity',
    'Simpler measure than yield to maturity',
  ]},
  { id: 's2-premium', term: 'premium bond', section: 2, category: 'Bond pricing', clues: [
    'Bond trading above its par value',
    'Occurs when coupon exceeds market rates',
    'Current yield is below the coupon rate',
  ]},
  { id: 's2-discount', term: 'discount bond', section: 2, category: 'Bond pricing', clues: [
    'Bond trading below its par value',
    'Occurs when coupon is below market rates',
    'Current yield exceeds the coupon rate',
  ]},
  { id: 's2-call', term: 'call option', section: 2, category: 'Options', clues: [
    'Right to buy the underlying at the strike price',
    'Buyer pays a premium for upside potential',
    'Used for speculation or hedging short stock',
  ]},
  { id: 's2-put', term: 'put option', section: 2, category: 'Options', clues: [
    'Right to sell the underlying at the strike price',
    'Protective put hedges against stock declines',
    'Buyer profits when the underlying price falls',
  ]},
  { id: 's2-strike', term: 'strike price', section: 2, category: 'Options', clues: [
    'Predetermined price in an options contract',
    'Also called the exercise price',
    'Determines whether the option is in the money',
  ]},
  { id: 's2-covered-call', term: 'covered call', section: 2, category: 'Options strategies', clues: [
    'Generates income from premiums on owned stock',
    'Caps upside on shares you already own',
    'Short call against a long stock position',
  ]},
  { id: 's2-open-end', term: 'open-end fund', section: 2, category: 'Funds', clues: [
    'Mutual fund issuing and redeeming shares at NAV',
    'Priced once daily after markets close',
    'Continuously offers new shares to investors',
  ]},
  { id: 's2-closed-end', term: 'closed-end fund', section: 2, category: 'Funds', clues: [
    'Fund with fixed shares trading on an exchange',
    'Market price can differ from net asset value',
    'Does not redeem shares directly with investors',
  ]},
  { id: 's2-12b1', term: '12b-1 fee', section: 2, category: 'Fund fees', clues: [
    'Annual marketing and distribution fee in funds',
    'Named after Investment Company Act section',
    'Included in the fund expense ratio',
  ]},
  { id: 's2-expense-ratio', term: 'expense ratio', section: 2, category: 'Fund fees', clues: [
    'Annual operating costs as percent of assets',
    'Includes management and 12b-1 fees',
    'Lower ratios leave more return for investors',
  ]},
  { id: 's2-breakpoint', term: 'breakpoint', section: 2, category: 'Fund sales', clues: [
    'Sales charge discount at higher investment levels',
    'Reduces front-end load for larger purchases',
    'FINRA Rule 2342 covers breakpoint sales',
  ]},
  { id: 's2-roa', term: 'rights of accumulation', section: 2, category: 'Fund sales', clues: [
    'Combines past and current purchases for breakpoints',
    'Counts holdings across a fund family',
    'ROA helps qualify for reduced sales charges',
  ]},
  { id: 's2-529', term: '529 plan', section: 2, category: 'Municipal fund', clues: [
    'Tax-advantaged education savings plan',
    'Municipal fund security under MSRB rules',
    'Earnings grow tax-deferred for qualified expenses',
  ]},
  { id: 's2-systematic', term: 'systematic risk', section: 2, category: 'Investment risks', clues: [
    'Market-wide risk affecting all securities',
    'Also called non-diversifiable risk',
    'Cannot be eliminated through diversification alone',
  ]},
  { id: 's2-unsystematic', term: 'unsystematic risk', section: 2, category: 'Investment risks', clues: [
    'Company or industry-specific risk',
    'Can be reduced through portfolio diversification',
    'Also called diversifiable or non-market risk',
  ]},
  { id: 's2-liquidity-risk', term: 'liquidity risk', section: 2, category: 'Investment risks', clues: [
    'Risk of being unable to sell quickly at fair price',
    'Higher in thinly traded or restricted securities',
    'Important for elderly or short-term investors',
  ]},
  { id: 's2-interest-rate-risk', term: 'interest rate risk', section: 2, category: 'Investment risks', clues: [
    'Bond prices fall when interest rates rise',
    'Inverse relationship between price and yield',
    'Longer maturities have greater rate sensitivity',
  ]},
  { id: 's2-prepayment-risk', term: 'prepayment risk', section: 2, category: 'Investment risks', clues: [
    'Homeowners refinance when rates drop',
    'Affects mortgage-backed and callable bonds',
    'Investor may be repaid early at an inconvenient time',
  ]},
  { id: 's2-diversification', term: 'diversification', section: 2, category: 'Risk mitigation', clues: [
    'Spreading investments across asset classes',
    'Reduces unsystematic risk in a portfolio',
    'Does not eliminate overall market risk',
  ]},

  // ── Section 3: Trading, Accounts & Prohibited Activities ─────────────────
  { id: 's3-market-order', term: 'market order', section: 3, category: 'Orders', clues: [
    'Executes immediately at the best available price',
    'Prioritizes speed of execution over price',
    'No guarantee of the execution price',
  ]},
  { id: 's3-limit-order', term: 'limit order', section: 3, category: 'Orders', clues: [
    'Executes only at a specified price or better',
    'Provides price control but may not fill',
    'Buy limit is placed below the current market',
  ]},
  { id: 's3-stop-order', term: 'stop order', section: 3, category: 'Orders', clues: [
    'Becomes a market order when trigger price is hit',
    'Stop-loss limits downside on a long position',
    'Also called a stop-loss order',
  ]},
  { id: 's3-bid-ask', term: 'bid-ask spread', section: 3, category: 'Trading', clues: [
    'Difference between highest bid and lowest ask',
    'Narrower spread indicates better liquidity',
    'Market makers profit from the spread',
  ]},
  { id: 's3-long', term: 'long position', section: 3, category: 'Trading', clues: [
    'Owning securities expecting the price to rise',
    'Profits when the market price increases',
    'Opposite of a short position',
  ]},
  { id: 's3-short', term: 'short sale', section: 3, category: 'Trading', clues: [
    'Selling borrowed shares expecting a price decline',
    'Must eventually buy shares to cover the loan',
    'Unlimited loss potential if price rises',
  ]},
  { id: 's3-tplus1', term: 'T+1 settlement', section: 3, category: 'Settlement', clues: [
    'Most securities settle one business day after trade',
    'Replaced the former T+2 settlement cycle',
    'Applies to stocks, bonds, ETFs, and mutual funds',
  ]},
  { id: 's3-ex-div', term: 'ex-dividend date', section: 3, category: 'Dividends', clues: [
    'First day a buyer does not receive the dividend',
    'Stock price typically drops by the dividend amount',
    'Must own shares before this date to get dividend',
  ]},
  { id: 's3-stock-split', term: 'stock split', section: 3, category: 'Corporate actions', clues: [
    'Increases share count and reduces price per share',
    'Total market value stays the same for holders',
    'A 2-for-1 split doubles shares and halves price',
  ]},
  { id: 's3-proxy', term: 'proxy', section: 3, category: 'Corporate actions', clues: [
    'Voting ballot for shareholder corporate decisions',
    'Firms must forward proxy materials to holders',
    'Used for board elections and major proposals',
  ]},
  { id: 's3-cash-account', term: 'cash account', section: 3, category: 'Account types', clues: [
    'Securities paid in full, no margin borrowing',
    'Regulation T prohibits margin in cash accounts',
    'Freeriding violates cash account settlement rules',
  ]},
  { id: 's3-margin', term: 'margin account', section: 3, category: 'Account types', clues: [
    'Allows borrowing from the broker to buy securities',
    'Subject to Regulation T and FINRA margin rules',
    'Requires minimum equity and margin maintenance',
  ]},
  { id: 's3-reg-t', term: 'Regulation T', section: 3, category: 'Margin', clues: [
    'Federal Reserve rule governing margin credit',
    'Sets initial margin requirements for purchases',
    'Currently requires 50% minimum initial deposit',
  ]},
  { id: 's3-suitability', term: 'suitability', section: 3, category: 'Customer protection', clues: [
    'Recommendations must fit the customer profile',
    'Considers objectives, risk tolerance, and experience',
    'FINRA Rule 2111 governs suitability obligations',
  ]},
  { id: 's3-reg-bi', term: 'Regulation Best Interest', section: 3, category: 'Customer protection', clues: [
    'SEC rule requiring best interest for retail recommendations',
    'Broker-dealers must disclose conflicts of interest',
    'Applies to securities recommendations to retail customers',
  ]},
  { id: 's3-churning', term: 'churning', section: 3, category: 'Prohibited activities', clues: [
    'Excessive trading to generate commissions',
    'Violates suitability and fair-dealing standards',
    'Watch for high turnover in inactive accounts',
  ]},
  { id: 's3-front-running', term: 'front running', section: 3, category: 'Prohibited activities', clues: [
    'Trading ahead of a large pending customer order',
    'Rep profits from knowledge of firm order flow',
    'Prohibited under fiduciary and fair-dealing rules',
  ]},
  { id: 's3-insider', term: 'insider trading', section: 3, category: 'Prohibited activities', clues: [
    'Trading on material nonpublic information',
    'Prohibited under SEC Rule 10b-5',
    'Applies to tipped information and corporate insiders',
  ]},
  { id: 's3-pump-dump', term: 'pump and dump', section: 3, category: 'Market manipulation', clues: [
    'Artificially inflating price then selling shares',
    'Classic market manipulation scheme',
    'Often uses false or misleading promotions',
  ]},
  { id: 's3-freeriding', term: 'freeriding', section: 3, category: 'Prohibited activities', clues: [
    'Using unsettled sale proceeds before settlement',
    'Violates cash account settlement requirements',
    'Can result in a frozen account for 90 days',
  ]},
  { id: 's3-wash-sale', term: 'wash sale', section: 3, category: 'Market manipulation', clues: [
    'Simultaneous buy and sell to create false activity',
    'Illegal form of market manipulation',
    'Creates misleading picture of volume or demand',
  ]},

  // ── Section 4: Regulatory Framework ──────────────────────────────────────
  { id: 's4-form-u4', term: 'Form U4', section: 4, category: 'Registration', clues: [
    'Registration form for broker-dealer personnel',
    'Records rep disclosures and employment history',
    'Public data available through FINRA BrokerCheck',
  ]},
  { id: 's4-form-u5', term: 'Form U5', section: 4, category: 'Registration', clues: [
    'Termination notice when a rep leaves a firm',
    'Filed within 30 days of association ending',
    'Updates registration status with regulators',
  ]},
  { id: 's4-brokercheck', term: 'BrokerCheck', section: 4, category: 'Registration', clues: [
    'FINRA database for researching registered reps',
    'Shows Form U4 disclosures and employment history',
    'Free public tool for broker background checks',
  ]},
  { id: 's4-statutory-disqualification', term: 'statutory disqualification', section: 4, category: 'Registration', clues: [
    'Bars association with a broker-dealer',
    'Triggered by certain criminal and regulatory events',
    'Disclosed on Form U4 registration',
  ]},
  { id: 's4-continuing-education', term: 'continuing education', section: 4, category: 'Registration', clues: [
    'Ongoing training required for registered persons',
    'Includes Regulatory Element and Firm Element',
    'FINRA Rule 1240 governs CE requirements',
  ]},
  { id: 's4-oba', term: 'outside business activity', section: 4, category: 'Reportable events', clues: [
    'Must be disclosed and approved by the firm',
    'FINRA Rule 3270 governs outside activities',
    'Includes any business outside the member firm',
  ]},
  { id: 's4-pst', term: 'private securities transaction', section: 4, category: 'Reportable events', clues: [
    'Must be disclosed to the employing firm',
    'FINRA Rule 3280 requires prior written notice',
    'Also called selling away from the firm',
  ]},
  { id: 's4-political', term: 'political contribution', section: 4, category: 'Reportable events', clues: [
    'MSRB Rule G-37 limits muni banker contributions',
    'Excessive contributions can bar muni business',
    'Must be reported and monitored by firms',
  ]},
  { id: 's4-gifts', term: 'gifts and gratuities', section: 4, category: 'Reportable events', clues: [
    'FINRA limits non-cash compensation to customers',
    'Excessive gifts can violate fair-dealing rules',
    'Must be reasonable and properly documented',
  ]},
];