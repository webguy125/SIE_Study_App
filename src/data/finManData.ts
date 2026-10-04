export interface FinManFlashcard {
  term: string;
  def: string;
}

export interface FinManQuestion {
  id: string;
  text: string;
  opts: string[];
  correct: number;
  rationale: string;
}

export interface FinManLevel {
  name: string;
  flashcards: FinManFlashcard[];
  questions: FinManQuestion[];
}

export type FinManSectionId = '1' | '2' | '3' | '4';

export interface FinManDatabase {
  levels: Record<FinManSectionId, FinManLevel>;
}

export const FIN_MAN_DATA: FinManDatabase = {
  levels: {
    '1': {
      name: 'Knowledge of Capital Markets (16%)',
      flashcards: [
        { term: 'Broker vs Dealer', def: 'Brokers act as agents for commissions; Dealers act as principals trading out of inventory for markups.' },
        { term: 'SRO Status', def: 'Self-Regulatory Organizations (FINRA, MSRB) regulate member firms but are NOT government agencies.' },
        { term: 'Form U4', def: 'Registration form required to become an associated person of a broker-dealer.' },
        { term: 'Monetary Policy', def: 'Managed exclusively by the Federal Reserve Board (FRB) using reserve limits and discount rates.' },
      ],
      questions: [
        {
          id: 'q101',
          text: 'When a broker-dealer acts as a principal in a transaction, it is trading out of its own inventory and charging the client a:',
          opts: ['Commission', 'Markup or Markdown', 'Advisory fee', 'Surrender charge'],
          correct: 1,
          rationale: 'Dealers act as principals, trade out of inventory, and charge markups on purchases or markdowns on sales. Brokers act as agents and charge commissions.',
        },
        {
          id: 'q102',
          text: 'Which entity is primarily responsible for setting the federal funds rate and conducting monetary policy?',
          opts: ['SEC', 'FINRA', 'Federal Reserve Board', 'U.S. Treasury'],
          correct: 2,
          rationale: 'The Federal Reserve Board manages monetary policy, including the federal funds rate and reserve requirements. The SEC regulates securities markets; FINRA is an SRO.',
        },
        {
          id: 'q103',
          text: 'FINRA is best described as a:',
          opts: ['Federal government agency', 'Self-regulatory organization (SRO)', 'State securities commissioner', 'Municipal bond issuer'],
          correct: 1,
          rationale: 'FINRA is a self-regulatory organization that oversees broker-dealers and registered representatives under SEC oversight — not a government agency.',
        },
        {
          id: 'q104',
          text: 'A new associated person of a broker-dealer must file which registration form before performing regulated activities?',
          opts: ['Form U5', 'Form U4', 'Form BD', 'Form ADV'],
          correct: 1,
          rationale: 'Form U4 registers associated persons with the Central Registration Depository (CRD). Form U5 is filed when employment terminates.',
        },
        {
          id: 'q105',
          text: 'A broker-dealer acting as an agent in a customer trade typically charges a:',
          opts: ['Markup', 'Markdown', 'Commission', '12b-1 fee only'],
          correct: 2,
          rationale: 'Brokers act as agents matching buyers and sellers and charge commissions. Markups and markdowns apply when the firm acts as principal.',
        },
        {
          id: 'q106',
          text: 'The MSRB primarily regulates:',
          opts: ['NYSE listed equities', 'Municipal securities market rules', 'Federal Reserve member banks', 'Insurance products'],
          correct: 1,
          rationale: 'The Municipal Securities Rulemaking Board (MSRB) creates rules for the municipal securities market. It is a rulemaking board, not a broker-dealer regulator like FINRA.',
        },
        {
          id: 'q107',
          text: 'Which statement about primary vs secondary markets is correct?',
          opts: ['The secondary market is where new issues are sold to the public', 'The primary market is where investors trade with each other', 'The primary market is where new securities are first sold', 'Both markets are regulated only by state law'],
          correct: 2,
          rationale: 'Primary markets involve new securities (IPOs, new issues). Secondary markets involve trading of already-issued securities among investors.',
        },
        {
          id: 'q108',
          text: 'Economic growth slowing while unemployment rises would most likely lead the Federal Reserve to:',
          opts: ['Tighten monetary policy aggressively', 'Lower interest rates to stimulate growth', 'Eliminate reserve requirements', 'File a Currency Transaction Report'],
          correct: 1,
          rationale: 'During economic slowdowns, the Fed often eases monetary policy (lower rates) to encourage borrowing and investment. Tightening is used to fight inflation.',
        },
      ],
    },
    '2': {
      name: 'Understanding Financial Products (44%)',
      flashcards: [
        { term: 'Inverse Law', def: 'When market interest rates increase, outstanding fixed-income bond values fall proportionally.' },
        { term: 'Call Risk', def: 'The danger that an issuer will pay off a high-coupon bond early when market interest rates drop.' },
        { term: 'Open-End Fund', def: 'Mutual funds that continuously issue new shares and redeem daily at NAV; they do not trade on secondary markets.' },
        { term: 'In-The-Money Call', def: 'A call option contract possesses intrinsic value whenever the underlying asset price rises higher than the strike price.' },
      ],
      questions: [
        {
          id: 'q201',
          text: "An investor owns an 8% corporate bond. If general market interest rates decline to 6%, what will happen to the market value of the investor's bond?",
          opts: ['It will decrease.', 'It will increase.', 'It will remain completely unchanged.', 'It will automatically adjust to 6%.'],
          correct: 1,
          rationale: 'Bond prices and interest rates move inversely. When interest rates fall, outstanding bonds with higher coupons become more valuable, causing their prices to rise.',
        },
        {
          id: 'q202',
          text: 'An open-end mutual fund investor redeems shares on Tuesday before the fund cutoff. The shareholder will receive:',
          opts: ['Tuesday closing market price of underlying stocks', 'NAV calculated after market close that day', 'A guaranteed fixed price set by FINRA', 'The IPO offering price'],
          correct: 1,
          rationale: 'Open-end funds price purchases and redemptions at net asset value (NAV), typically computed once daily after the markets close.',
        },
        {
          id: 'q203',
          text: 'A call option is in-the-money when:',
          opts: ['The strike price exceeds the market price of the underlying', 'The market price of the underlying exceeds the strike price', 'The option has zero days to expiration', 'The premium equals the strike price'],
          correct: 1,
          rationale: 'A call has intrinsic value when the underlying market price is above the strike price, allowing the holder to buy below market.',
        },
        {
          id: 'q204',
          text: 'Call risk is greatest for bondholders when:',
          opts: ['Interest rates rise sharply', 'Interest rates fall and the bond trades at a premium', 'The issuer files for bankruptcy', 'The bond is non-callable'],
          correct: 1,
          rationale: 'Callable issuers are likely to call high-coupon bonds when rates fall so they can refinance at lower rates — bondholders lose premium price and high income.',
        },
        {
          id: 'q205',
          text: 'Preferred stock is generally considered:',
          opts: ['A debt obligation of the issuer', 'An equity security with priority over common stock', 'A money market instrument', 'A municipal revenue bond'],
          correct: 1,
          rationale: 'Preferred stock is an equity security representing ownership, typically with priority over common stock for dividends and liquidation — but it is not a loan.',
        },
        {
          id: 'q206',
          text: 'Which product trades intraday on an exchange at market-driven prices rather than end-of-day NAV?',
          opts: ['Open-end mutual fund', 'Unit investment trust only', 'Exchange-traded fund (ETF)', 'Variable annuity fixed account'],
          correct: 2,
          rationale: 'ETFs are exchange-traded and priced continuously by supply and demand. Traditional open-end mutual funds transact at once-daily NAV.',
        },
        {
          id: 'q207',
          text: 'A T-bill is purchased at $9,800 and redeems at $10,000 at maturity. The investor\'s return comes primarily from:',
          opts: ['Semi-annual coupon interest', 'Capital appreciation / discount accretion', 'Common stock dividends', 'Municipal tax refunds'],
          correct: 1,
          rationale: 'Treasury bills are zero-coupon, sold at a discount to par. The investor\'s return is the difference between purchase price and par at maturity.',
        },
        {
          id: 'q208',
          text: 'Rising market interest rates will generally cause the price of an existing fixed-rate bond to:',
          opts: ['Increase', 'Decrease', 'Remain unchanged', 'Convert to equity'],
          correct: 1,
          rationale: 'Bond prices and yields move inversely. Newer issues offer higher yields, so older lower-coupon bonds must drop in price to compete.',
        },
      ],
    },
    '3': {
      name: 'Trading, Accounts & Prohibited Activities (31%)',
      flashcards: [
        { term: 'T+1 Settlement', def: 'Standard next-business-day settlement time frame for Options, T-Bills, and Treasury bonds.' },
        { term: 'T+2 Settlement', def: 'Standard settlement window for Corporate Equities, Corporate Bonds, and Municipal Bonds.' },
        { term: 'Front-Running', def: 'Prohibited practice of placing personal trades right ahead of a known pending block trade from an institution.' },
        { term: 'Free-Riding', def: 'Buying a security and selling it immediately without ever executing full cash payment for the entry transaction.' },
      ],
      questions: [
        {
          id: 'q301',
          text: 'A registered representative learns that an institutional client is about to buy 100,000 shares of XYZ stock. The representative immediately buys 500 shares for their personal account. This is known as:',
          opts: ['Matched trading', 'Front-running', 'Insider trading', 'Freeriding'],
          correct: 1,
          rationale: 'Front-running is the prohibited practice of executing personal securities transactions ahead of an imminent, pending block order in the same security.',
        },
        {
          id: 'q302',
          text: 'Under standard industry settlement cycles, corporate stock trades typically settle:',
          opts: ['Same day (T+0)', 'T+1', 'T+2', 'T+5'],
          correct: 2,
          rationale: 'Corporate equities, corporate bonds, and municipal securities generally settle T+2 (trade date plus two business days). Many options and Treasuries settle T+1.',
        },
        {
          id: 'q303',
          text: 'A customer buys stock and sells it before paying for the purchase. This violation is called:',
          opts: ['Churning', 'Freeriding', 'Painting the tape', 'Window dressing'],
          correct: 1,
          rationale: 'Freeriding involves selling securities before paying for them — effectively using unsettled proceeds without meeting payment requirements.',
        },
        {
          id: 'q304',
          text: 'A registered rep executes excessive trades in an elderly client account primarily to generate commissions. This is:',
          opts: ['Legitimate market making', 'Churning', 'Dollar-cost averaging', 'Portfolio rebalancing'],
          correct: 1,
          rationale: 'Churning is excessive trading in a customer account to generate commissions without regard to the client\'s investment objectives.',
        },
        {
          id: 'q305',
          text: 'Trading on material nonpublic information about an upcoming merger before public announcement is:',
          opts: ['Arbitrage', 'Insider trading', 'Short selling', 'Rights offering participation'],
          correct: 1,
          rationale: 'Trading while in possession of material nonpublic information (MNPI) is illegal insider trading, whether the trader is an insider or received a tip.',
        },
        {
          id: 'q306',
          text: 'A cash account customer must pay for securities purchased by:',
          opts: ['The settlement date at the latest', 'Within 30 calendar days', 'Only if the stock price rises', 'Never — margin is required'],
          correct: 0,
          rationale: 'In cash accounts, full payment is required by settlement date. Failure to pay can trigger sale of securities and account restrictions.',
        },
        {
          id: 'q307',
          text: 'Which activity involves coordinated trades designed to create a false appearance of market activity?',
          opts: ['Painting the tape', 'Dollar-cost averaging', 'Asset allocation', 'Dividend reinvestment'],
          correct: 0,
          rationale: 'Painting the tape (market manipulation) uses deceptive trades to create artificial volume or price movement misleading other participants.',
        },
        {
          id: 'q308',
          text: 'Options, U.S. Treasury bills, and many government securities most commonly settle on:',
          opts: ['T+0', 'T+1', 'T+2', 'T+3'],
          correct: 1,
          rationale: 'Options, T-bills, and many Treasury securities follow a T+1 settlement cycle under current industry standards.',
        },
      ],
    },
    '4': {
      name: 'Overview of Regulatory Framework (9%)',
      flashcards: [
        { term: 'SAR Rule', def: 'Suspicious Activity Reports must be filed within 30 days for suspect events totaling $5,000 or more.' },
        { term: 'CTR Rule', def: 'Currency Transaction Reports must be generated for cash transactions exceeding $10,000 within a single day.' },
        { term: 'Selling Away', def: 'The execution of private securities transactions completely outside the regular employment scope of the member firm.' },
        { term: 'Form U5', def: 'The termination notice registration form that must be uploaded to the CRD within 30 days of an representative departing.' },
      ],
      questions: [
        {
          id: 'q401',
          text: 'A bank cash deposit of $11,500 made by a retail customer in a single business day requires the broker-dealer to file which of the following?',
          opts: ['Suspicious Activity Report (SAR)', 'Currency Transaction Report (CTR)', 'Form U5', 'FINRA Disclosure Waiver'],
          correct: 1,
          rationale: 'FinCEN regulations require firms to file a CTR for any cash transactions (deposits or withdrawals) exceeding $10,000 in a single business day.',
        },
        {
          id: 'q402',
          text: 'A Suspicious Activity Report (SAR) is generally required when suspicious transactions involve at least:',
          opts: ['$1,000', '$5,000', '$10,000', '$25,000'],
          correct: 1,
          rationale: 'Firms must file SARs for suspicious activity meeting regulatory thresholds — commonly $5,000 or more when a suspect pattern exists.',
        },
        {
          id: 'q403',
          text: 'When a registered representative terminates employment, Form U5 must be filed within:',
          opts: ['10 business days', '30 calendar days', '90 calendar days', 'One year'],
          correct: 1,
          rationale: 'Form U5 (termination notice) must be filed to the CRD within 30 calendar days of the representative\'s termination date.',
        },
        {
          id: 'q404',
          text: 'Selling away occurs when a registered person:',
          opts: ['Sells firm inventory to a customer', 'Conducts private securities deals outside the member firm', 'Files a timely SAR', 'Executes a customer limit order'],
          correct: 1,
          rationale: 'Selling away is participating in private securities transactions outside the scope of the member firm without required written notice and approval.',
        },
        {
          id: 'q405',
          text: 'Anti-Money Laundering (AML) programs at broker-dealers are designed primarily to:',
          opts: ['Guarantee trading profits', 'Detect and report suspicious financial activity', 'Eliminate all cash accounts', 'Replace FINRA arbitration'],
          correct: 1,
          rationale: 'AML programs require policies, training, and reporting (SARs/CTRs) to detect money laundering and suspicious activity — a core compliance obligation.',
        },
        {
          id: 'q406',
          text: 'The SEC\'s primary role includes:',
          opts: ['Setting the federal funds rate', 'Enforcing federal securities laws', 'Issuing municipal GO bonds', 'Administering state insurance exams'],
          correct: 1,
          rationale: 'The Securities and Exchange Commission enforces federal securities laws and regulates the securities industry. The Fed handles monetary policy.',
        },
        {
          id: 'q407',
          text: 'A customer refuses to provide information for a large wire transfer that appears structured to avoid reporting. The firm should consider filing a:',
          opts: ['Form U4', 'Suspicious Activity Report (SAR)', 'Prospectus supplement only', 'Form 1099-DIV'],
          correct: 1,
          rationale: 'Structuring or evasive behavior around large transactions may indicate money laundering — firms file SARs for suspicious activity regardless of cash vs wire.',
        },
        {
          id: 'q408',
          text: 'FINRA\'s role in the regulatory structure is best described as:',
          opts: ['Writing federal criminal statutes', 'Self-regulation of broker-dealers and registered reps', 'Insuring customer accounts against market loss', 'Setting corporate income tax rates'],
          correct: 1,
          rationale: 'FINRA is the primary SRO for broker-dealers, enforcing rules, conducting exams, and maintaining registration — under SEC oversight.',
        },
      ],
    },
  },
};

export const FIN_MAN_SECTIONS: FinManSectionId[] = ['1', '2', '3', '4'];