import type { SieVocabTerm } from './sieVocabulary';

/**
 * SIE exam acronyms — each entry's asteroid answer IS the acronym.
 * Every term has a full-name clue plus 2+ definition hints.
 */
export const SIE_ACRONYMS: SieVocabTerm[] = [
  // Regulators & infrastructure
  { id: 'acr-sec', term: 'SEC', section: 1, category: 'Acronyms', clues: [
    'Securities and Exchange Commission',
    'Federal regulator of US securities markets',
    'Enforces the Securities Acts of 1933 and 1934',
    'Oversees disclosure and new issue registration',
  ]},
  { id: 'acr-finra', term: 'FINRA', section: 1, category: 'Acronyms', clues: [
    'Financial Industry Regulatory Authority',
    'Largest securities industry self-regulatory organization',
    'Regulates broker-dealers and registered representatives',
    'Administers the SIE and Series qualification exams',
  ]},
  { id: 'acr-msrb', term: 'MSRB', section: 1, category: 'Acronyms', clues: [
    'Municipal Securities Rulemaking Board',
    'Creates rules for the municipal securities market',
    'Self-regulatory organization for municipal bonds',
    'FINRA and SEC enforce its rules on dealers',
  ]},
  { id: 'acr-sipc', term: 'SIPC', section: 1, category: 'Acronyms', clues: [
    'Securities Investor Protection Corporation',
    'Protects customers if a broker-dealer fails',
    'Covers cash and securities at failed brokerage firms',
    'Not the same as FDIC bank deposit insurance',
  ]},
  { id: 'acr-fdic', term: 'FDIC', section: 1, category: 'Acronyms', clues: [
    'Federal Deposit Insurance Corporation',
    'Insures bank deposits up to statutory limits',
    'Protects depositors when banks fail',
  ]},
  { id: 'acr-dtcc', term: 'DTCC', section: 1, category: 'Acronyms', clues: [
    'Depository Trust and Clearing Corporation',
    'Clears and settles most US securities trades',
    'Central infrastructure for post-trade processing',
  ]},
  { id: 'acr-occ', term: 'OCC', section: 1, category: 'Acronyms', clues: [
    'Options Clearing Corporation',
    'Clears and guarantees listed options contracts',
    'Assigns and exercises standardized options',
  ]},
  { id: 'acr-cboe', term: 'CBOE', section: 1, category: 'Acronyms', clues: [
    'Chicago Board Options Exchange',
    'Major exchange for listed options trading',
    'Self-regulatory organization for options markets',
  ]},
  { id: 'acr-nscc', term: 'NSCC', section: 1, category: 'Acronyms', clues: [
    'National Securities Clearing Corporation',
    'DTCC subsidiary clearing stock and bond trades',
    'Provides central counterparty clearing services',
  ]},
  { id: 'acr-sro', term: 'SRO', section: 1, category: 'Acronyms', clues: [
    'Self-Regulatory Organization',
    'Industry body writing rules under SEC oversight',
    'FINRA and CBOE are examples of this type of body',
  ]},
  { id: 'acr-nasaa', term: 'NASAA', section: 1, category: 'Acronyms', clues: [
    'North American Securities Administrators Association',
    'Organization of state securities regulators',
    'Oversees state blue-sky laws and registration',
  ]},

  // Markets & offerings
  { id: 'acr-otc', term: 'OTC', section: 1, category: 'Acronyms', clues: [
    'Over-the-Counter market',
    'Trading venue away from a listed exchange',
    'Where many unlisted and thinly traded securities trade',
  ]},
  { id: 'acr-ipo', term: 'IPO', section: 1, category: 'Acronyms', clues: [
    'Initial Public Offering',
    'First sale of company stock to the public',
    'Primary market event bringing new equity to market',
  ]},

  // Equity & funds
  { id: 'acr-adr', term: 'ADR', section: 2, category: 'Acronyms', clues: [
    'American Depositary Receipt',
    'US-traded certificate representing foreign shares',
    'Simplifies US investor access to non-US companies',
  ]},
  { id: 'acr-etf', term: 'ETF', section: 2, category: 'Acronyms', clues: [
    'Exchange-Traded Fund',
    'Pooled fund that trades on an exchange like a stock',
    'Often tracks an index or sector basket',
  ]},
  { id: 'acr-etn', term: 'ETN', section: 2, category: 'Acronyms', clues: [
    'Exchange-Traded Note',
    'Unsecured debt security tracking an index return',
    'Issuer credit risk unlike a typical ETF structure',
  ]},
  { id: 'acr-nav', term: 'NAV', section: 2, category: 'Acronyms', clues: [
    'Net Asset Value',
    'Per-share value of fund assets minus liabilities',
    'Mutual funds price shares at this value once daily',
  ]},
  { id: 'acr-reit', term: 'REIT', section: 2, category: 'Acronyms', clues: [
    'Real Estate Investment Trust',
    'Company owning or financing income-producing property',
    'Must distribute most taxable income to shareholders',
  ]},
  { id: 'acr-uit', term: 'UIT', section: 2, category: 'Acronyms', clues: [
    'Unit Investment Trust',
    'Fixed unmanaged portfolio with a termination date',
    'Investors own units of a static trust basket',
  ]},
  { id: 'acr-roa', term: 'ROA', section: 2, category: 'Acronyms', clues: [
    'Rights of Accumulation',
    'Combines purchases to qualify for sales charge breakpoints',
    'Counts holdings across a mutual fund family',
  ]},
  { id: 'acr-loi', term: 'LOI', section: 2, category: 'Acronyms', clues: [
    'Letter of Intent',
    'Commitment to reach breakpoint investment level',
    'Allows breakpoint discount before full amount is invested',
  ]},

  // Government & agency debt
  { id: 'acr-tips', term: 'TIPS', section: 2, category: 'Acronyms', clues: [
    'Treasury Inflation-Protected Securities',
    'Principal adjusts with Consumer Price Index changes',
    'Protects holders against inflation erosion',
  ]},
  { id: 'acr-strips', term: 'STRIPS', section: 2, category: 'Acronyms', clues: [
    'Separate Trading of Registered Interest and Principal',
    'Zero-coupon Treasury securities from coupon stripping',
    'Sold at discount with no periodic interest payments',
  ]},
  { id: 'acr-gnma', term: 'GNMA', section: 2, category: 'Acronyms', clues: [
    'Government National Mortgage Association',
    'Agency issuing mortgage-backed securities',
    'Backed by full faith and credit of US government',
  ]},
  { id: 'acr-fnma', term: 'FNMA', section: 2, category: 'Acronyms', clues: [
    'Federal National Mortgage Association (Fannie Mae)',
    'Agency purchasing mortgages for securitization',
    'Issues mortgage-backed securities to investors',
  ]},
  { id: 'acr-fhlmc', term: 'FHLMC', section: 2, category: 'Acronyms', clues: [
    'Federal Home Loan Mortgage Corporation (Freddie Mac)',
    'Agency securitizing residential mortgages',
    'Issues pass-through mortgage-backed securities',
  ]},
  { id: 'acr-mbs', term: 'MBS', section: 2, category: 'Acronyms', clues: [
    'Mortgage-Backed Security',
    'Pool of mortgage loans sold to investors',
    'Subject to prepayment risk when rates fall',
  ]},
  { id: 'acr-cmo', term: 'CMO', section: 2, category: 'Acronyms', clues: [
    'Collateralized Mortgage Obligation',
    'MBS structured into tranches with varying risk',
    'Some tranches absorb prepayment variability',
  ]},
  { id: 'acr-go', term: 'GO', section: 2, category: 'Acronyms', clues: [
    'General Obligation municipal bond',
    'Backed by issuer taxing power and credit',
    'Voter approval often required for issuance',
  ]},

  // Yields
  { id: 'acr-ytm', term: 'YTM', section: 2, category: 'Acronyms', clues: [
    'Yield to Maturity',
    'Total return if a bond is held to maturity',
    'Accounts for coupon, price, and time value of money',
  ]},
  { id: 'acr-ytc', term: 'YTC', section: 2, category: 'Acronyms', clues: [
    'Yield to Call',
    'Return if a callable bond is redeemed early',
    'Used when issuer is likely to call the bond',
  ]},

  // Trading & accounts
  { id: 'acr-gtc', term: 'GTC', section: 3, category: 'Acronyms', clues: [
    'Good-Til-Canceled order',
    'Stays open until executed or canceled by customer',
    'Many firms cancel automatically after 90 days',
  ]},
  { id: 'acr-pdt', term: 'PDT', section: 3, category: 'Acronyms', clues: [
    'Pattern Day Trader',
    'Four or more day trades within five business days',
    'Must maintain $25,000 minimum account equity',
  ]},
  { id: 'acr-ira', term: 'IRA', section: 3, category: 'Acronyms', clues: [
    'Individual Retirement Account',
    'Tax-advantaged account for retirement savings',
    'Traditional and Roth types have different tax rules',
  ]},
  { id: 'acr-utma', term: 'UTMA', section: 3, category: 'Acronyms', clues: [
    'Uniform Transfers to Minors Act account',
    'Custodial account for minors under state law',
    'Adult custodian manages assets for the child',
  ]},
  { id: 'acr-ugma', term: 'UGMA', section: 3, category: 'Acronyms', clues: [
    'Uniform Gifts to Minors Act account',
    'Custodial account for gifts to minors',
    'Predecessor model to UTMA in many states',
  ]},

  // AML & compliance
  { id: 'acr-aml', term: 'AML', section: 3, category: 'Acronyms', clues: [
    'Anti-Money Laundering program',
    'Broker-dealer compliance to detect illicit funds',
    'Required by the Bank Secrecy Act and FINRA rules',
  ]},
  { id: 'acr-sar', term: 'SAR', section: 3, category: 'Acronyms', clues: [
    'Suspicious Activity Report',
    'Filed with FinCEN for suspicious transactions',
    'Must not be disclosed to the customer (tipping off)',
  ]},
  { id: 'acr-ctr', term: 'CTR', section: 3, category: 'Acronyms', clues: [
    'Currency Transaction Report',
    'Required for cash transactions over $10,000',
    'Filed to track large cash movements',
  ]},
  { id: 'acr-fincen', term: 'FinCEN', section: 3, category: 'Acronyms', clues: [
    'Financial Crimes Enforcement Network',
    'US Treasury bureau receiving SARs and CTRs',
    'Central agency for anti-money laundering intelligence',
  ]},
  { id: 'acr-ofac', term: 'OFAC', section: 3, category: 'Acronyms', clues: [
    'Office of Foreign Assets Control',
    'Administers economic and trade sanctions lists',
    'Firms must block SDN-listed persons and entities',
  ]},
  { id: 'acr-sdn', term: 'SDN', section: 3, category: 'Acronyms', clues: [
    'Specially Designated Nationals list',
    'OFAC list of blocked persons and entities',
    'Firms must reject transactions with listed parties',
  ]},
  { id: 'acr-kyc', term: 'KYC', section: 3, category: 'Acronyms', clues: [
    'Know Your Customer',
    'Firm obligation to understand each customer profile',
    'Foundation for suitability and Reg BI recommendations',
  ]},
  { id: 'acr-mnpi', term: 'MNPI', section: 3, category: 'Acronyms', clues: [
    'Material Nonpublic Information',
    'Undisclosed news that would move a stock price',
    'Trading on this information is illegal insider trading',
  ]},

  // Registration & municipal
  { id: 'acr-sie', term: 'SIE', section: 4, category: 'Acronyms', clues: [
    'Securities Industry Essentials exam',
    'FINRA qualifying exam for industry entry',
    'Required foundation before Series top-off exams',
  ]},
  { id: 'acr-u4', term: 'U4', section: 4, category: 'Acronyms', clues: [
    'Uniform Application for Securities Industry Registration',
    'Registration form for broker-dealer personnel',
    'Public info available on FINRA BrokerCheck',
  ]},
  { id: 'acr-u5', term: 'U5', section: 4, category: 'Acronyms', clues: [
    'Uniform Termination Notice for Securities Industry Registration',
    'Filed when a registered person leaves a firm',
    'Updates termination and disclosure status',
  ]},
  { id: 'acr-emma', term: 'EMMA', section: 4, category: 'Acronyms', clues: [
    'Electronic Municipal Market Access',
    'Official website for municipal bond disclosures',
    'Free public access to official statements and continuing disclosure',
  ]},
  { id: 'acr-odd', term: 'ODD', section: 2, category: 'Acronyms', clues: [
    'Options Disclosure Document',
    'Required delivery before opening an options account',
    'Explains risks of options trading to customers',
  ]},
  { id: 'acr-cpi', term: 'CPI', section: 1, category: 'Acronyms', clues: [
    'Consumer Price Index',
    'Measures inflation affecting purchasing power',
    'TIPS principal adjusts based on changes in this index',
  ]},
  { id: 'acr-gdp', term: 'GDP', section: 1, category: 'Acronyms', clues: [
    'Gross Domestic Product',
    'Total value of goods and services produced in the US',
    'Key macroeconomic indicator for markets',
  ]},
];