export interface FinManFlashcard {
  term: string;
  def: string;
}

export interface FinManTopic {
  id: string;
  title: string;
  /** Short enough to read in about 20 seconds. */
  brief: string;
}

export interface FinManQuestion {
  id: string;
  topicId: string;
  text: string;
  opts: string[];
  correct: number;
  rationale: string;
}

export interface FinManLevel {
  name: string;
  flashcards: FinManFlashcard[];
  topics: FinManTopic[];
  questions: FinManQuestion[];
}

export type FinManSectionId = '1' | '2' | '3' | '4';

export interface FinManDatabase {
  levels: Record<FinManSectionId, FinManLevel>;
}

export const TOPIC_READ_MS = 20_000;

export function topicById(section: FinManSectionId, topicId: string): FinManTopic | undefined {
  return FIN_MAN_DATA.levels[section].topics.find((topic) => topic.id === topicId);
}

export const FIN_MAN_DATA: FinManDatabase = {
  levels: {
    '1': {
      name: 'Knowledge of Capital Markets (16%)',
      flashcards: [
        { term: 'Broker vs Dealer', def: 'Brokers act as agents for commissions. Dealers act as principals and charge a markup or markdown.' },
        { term: 'SRO', def: 'FINRA and the MSRB are self-regulatory organizations. They are not government agencies.' },
        { term: 'Primary market', def: 'Issuers sell new securities to investors. The secondary market is trading among investors.' },
        { term: 'Monetary vs fiscal', def: 'The Fed runs monetary policy. Congress and the President run fiscal policy through taxing and spending.' },
      ],
      topics: [
        {
          id: 's1-regulators',
          title: 'Regulators',
          brief: 'The SEC enforces federal securities laws and oversees disclosure. FINRA is the SRO for broker-dealers and reps. The MSRB writes municipal rules; FINRA and the SEC enforce many of them. The Fed runs monetary policy, not brokerage exams. States register many reps and small advisers.',
        },
        {
          id: 's1-sipc-fdic',
          title: 'SIPC and FDIC',
          brief: 'SIPC protects customers if a member broker-dealer fails, generally up to $500,000, including no more than $250,000 cash. It does not insure market losses. FDIC insures bank deposits, not brokerage accounts. Do not mix the two on the exam.',
        },
        {
          id: 's1-participants',
          title: 'Market participants',
          brief: 'A broker is an agent and charges a commission. A dealer is a principal, trades from inventory, and charges a markup or markdown. Issuers raise capital. Retail and institutional customers differ in size and protection. Accredited investors meet income or net-worth tests used in private offerings.',
        },
        {
          id: 's1-structure',
          title: 'Market structure',
          brief: 'The primary market is new issues from the issuer. The secondary market is investor-to-investor trading on exchanges or OTC. The third market is listed stocks traded OTC. The fourth market is institutions trading directly, often through ECNs. Transfer agents and clearing firms handle records and settlement.',
        },
        {
          id: 's1-offerings',
          title: 'Offerings',
          brief: 'A public offering uses a registration statement and prospectus. Firm-commitment underwriting means the syndicate buys the deal. Best efforts does not. Regulation D is a private placement, often to accredited investors, with resale limits. Rule 144 governs resale of restricted and control stock.',
        },
        {
          id: 's1-economy',
          title: 'The economy',
          brief: 'The business cycle moves through expansion, peak, contraction, and trough. Leading indicators turn before the economy. Coincident indicators move with it. Lagging indicators confirm a turn. Inflation erodes purchasing power. Fiscal policy is taxing and spending. Monetary policy is the Fed.',
        },
        {
          id: 's1-fed',
          title: 'Fed tools and rates',
          brief: 'The Fed eases by buying Treasuries, cutting the discount rate, or lowering reserve requirements. It tightens by doing the opposite. The federal funds rate is the overnight bank-to-bank rate. A normal yield curve slopes up. An inverted curve, short rates above long rates, often signals slowdown.',
        },
        {
          id: 's1-capital',
          title: 'Why markets exist',
          brief: 'Capital markets move savings to businesses and governments. Equity is ownership. Debt is a loan. Investors take risk for return. Issuers get funding. Intermediaries match the two sides, and regulators require disclosure so buyers can judge that risk.',
        },
      ],
      questions: [
        {
          id: 'q101',
          topicId: 's1-participants',
          text: 'When a broker-dealer acts as a principal, it trades from inventory and charges the customer a:',
          opts: ['Commission', 'Markup or markdown', 'Advisory fee only', 'Surrender charge'],
          correct: 1,
          rationale: 'Dealers act as principals and charge markups or markdowns. Brokers act as agents and charge commissions.',
        },
        {
          id: 'q102',
          topicId: 's1-fed',
          text: 'Which body conducts U.S. monetary policy and influences the federal funds rate?',
          opts: ['SEC', 'FINRA', 'Federal Reserve', 'MSRB'],
          correct: 2,
          rationale: 'The Federal Reserve runs monetary policy. The SEC and FINRA regulate securities markets. The MSRB writes municipal rules.',
        },
        {
          id: 'q103',
          topicId: 's1-regulators',
          text: 'FINRA is best described as a:',
          opts: ['Federal government agency', 'Self-regulatory organization', 'State insurance commissioner', 'Municipal bond issuer'],
          correct: 1,
          rationale: 'FINRA is an SRO for broker-dealers and registered representatives. It is overseen by the SEC and is not a government agency.',
        },
        {
          id: 'q104',
          topicId: 's1-participants',
          text: 'Before a person can work as an associated person of a broker-dealer, the firm files:',
          opts: ['Form U5', 'Form U4', 'Form 1099', 'A currency transaction report'],
          correct: 1,
          rationale: 'Form U4 registers the person. Form U5 is the termination notice filed later.',
        },
        {
          id: 'q105',
          topicId: 's1-participants',
          text: 'A broker-dealer acting as an agent in a customer trade typically charges a:',
          opts: ['Markup', 'Markdown', 'Commission', '12b-1 fee only'],
          correct: 2,
          rationale: 'Agents match buyers and sellers and charge commissions. Markups apply when the firm acts as principal.',
        },
        {
          id: 'q106',
          topicId: 's1-regulators',
          text: 'The MSRB primarily writes rules for:',
          opts: ['NYSE-listed equity trading only', 'The municipal securities market', 'Federal Reserve member banks', 'Insurance product sales'],
          correct: 1,
          rationale: 'The MSRB is the municipal rule writer. It does not examine broker-dealers the way FINRA does.',
        },
        {
          id: 'q107',
          topicId: 's1-structure',
          text: 'Newly issued securities are sold by the issuer to investors in the:',
          opts: ['Secondary market', 'Fourth market only', 'Primary market', 'Options market only'],
          correct: 2,
          rationale: 'The primary market is the new-issue market. The secondary market is trading of securities that are already outstanding.',
        },
        {
          id: 'q108',
          topicId: 's1-economy',
          text: 'Growth is slowing and unemployment is rising. The Fed is most likely to:',
          opts: ['Tighten policy to fight a boom', 'Ease policy to support borrowing', 'Cancel all reserve requirements forever', 'File a currency transaction report'],
          correct: 1,
          rationale: 'A slowdown calls for easier monetary policy, such as lower rates or buying securities. Tightening is used to cool inflation.',
        },
        {
          id: 'q109',
          topicId: 's1-sipc-fdic',
          text: 'If a SIPC-member broker-dealer fails, SIPC protection is best described as:',
          opts: ['A guarantee against a decline in stock prices', 'FDIC insurance on brokerage stocks', 'Coverage of customer cash and securities up to stated limits', 'Insurance issued by the Federal Reserve'],
          correct: 2,
          rationale: 'SIPC covers customers of a failed member firm, generally up to $500,000, with a $250,000 cash sublimit. It does not cover market losses.',
        },
        {
          id: 'q110',
          topicId: 's1-offerings',
          text: 'A Regulation D offering is typically:',
          opts: ['A listed IPO with no resale limits', 'A private placement, often to accredited investors, with resale restrictions', 'A Treasury auction', 'An exchange-traded fund creation basket'],
          correct: 1,
          rationale: 'Regulation D is the common private-placement exemption. Buyers are often accredited, and the securities are restricted.',
        },
        {
          id: 'q111',
          topicId: 's1-capital',
          text: 'Capital markets exist mainly to:',
          opts: ['Insure investors against a fall in stock prices', 'Move savings from investors to issuers that need funding', 'Set the federal funds rate', 'Replace bank deposits'],
          correct: 1,
          rationale: 'Issuers raise money and investors supply it. Equity is ownership and debt is a loan. Markets do not insure against price declines.',
        },
      ],
    },
    '2': {
      name: 'Understanding Products and Their Risks (44%)',
      flashcards: [
        { term: 'Inverse prices', def: 'When market rates rise, outstanding fixed-rate bond prices fall.' },
        { term: 'Call risk', def: 'The issuer redeems a high-coupon bond early after rates fall.' },
        { term: 'Open-end fund', def: 'Shares are issued and redeemed at NAV. They do not trade on an exchange.' },
        { term: 'Call option', def: 'The holder may buy the underlying at the strike. It is in-the-money when the market price is above the strike.' },
      ],
      topics: [
        {
          id: 's2-common',
          title: 'Common stock',
          brief: 'Common stock is ownership. Holders may vote and receive dividends if the board declares them. Dividends are not required. In bankruptcy, common is last, behind creditors and preferred. A split changes the share count and price, not the total value. Growth firms often reinvest instead of paying large dividends.',
        },
        {
          id: 's2-preferred',
          title: 'Preferred, rights, warrants, ADRs',
          brief: 'Preferred usually pays a stated dividend and stands ahead of common for dividends and liquidation, with little or no vote. Cumulative preferred must catch up missed dividends first. Rights are short-term and let current holders buy new shares below the market. Warrants last longer. ADRs are dollar receipts for foreign shares and carry currency risk.',
        },
        {
          id: 's2-debt',
          title: 'Bond prices and yields',
          brief: 'Bond prices and interest rates move in opposite directions. Nominal yield is the coupon divided by par. Current yield is the annual coupon divided by the market price. Yield to maturity includes the gain or loss to par. A premium bond trades above par. A discount bond trades below par.',
        },
        {
          id: 's2-treasury',
          title: 'Treasuries and agencies',
          brief: 'Treasuries are backed by the full faith and credit of the United States. T-bills mature in one year or less and are sold at a discount. Notes and bonds pay coupons. STRIPS are zero-coupon pieces of Treasury interest or principal. Agency securities are not all full-faith-and-credit obligations. Read the backing.',
        },
        {
          id: 's2-munis',
          title: 'Municipal bonds',
          brief: 'General obligation bonds are backed by the issuer’s taxing power. Revenue bonds are backed by a project, such as tolls or utility fees. Interest is often exempt from federal income tax, so compare them on a tax-equivalent yield. Munis still have credit risk and interest-rate risk.',
        },
        {
          id: 's2-corporate',
          title: 'Corporate bonds and call risk',
          brief: 'Corporate bonds may be secured or unsecured. Debentures are unsecured. Convertibles can be exchanged for stock. Call risk is highest when rates fall and the bond trades at a premium: the issuer refinances and the holder loses the high coupon. Credit ratings measure default risk, not interest-rate risk.',
        },
        {
          id: 's2-money',
          title: 'Money markets',
          brief: 'Money-market instruments mature in one year or less. Examples include T-bills, commercial paper, bankers’ acceptances, and negotiable CDs. They are used for liquidity and principal stability, not for long-term growth. They still have some credit risk depending on the issuer.',
        },
        {
          id: 's2-funds',
          title: 'Funds and ETFs',
          brief: 'Open-end funds issue and redeem shares at the next NAV, usually once a day. Closed-end funds and ETFs trade all day on an exchange. UITs hold a mostly fixed portfolio. Breakpoints lower a mutual-fund sales charge. A 12b-1 fee is an annual marketing fee.',
        },
        {
          id: 's2-annuities',
          title: 'Annuities, 529s, and savings plans',
          brief: 'A fixed annuity is an insurance product with a credited rate. A variable annuity puts premiums in a separate account and the investor bears market risk. It is a security. 529 plans are municipal fund securities for education. ABLE accounts are tax-advantaged savings for eligible people with disabilities.',
        },
        {
          id: 's2-options',
          title: 'Options',
          brief: 'A call is the right to buy. A put is the right to sell. The buyer pays the premium and has the right. The seller has the obligation. A call is in-the-money when the market is above the strike. The OCC guarantees listed options. A covered call pairs long stock with a short call.',
        },
        {
          id: 's2-alts',
          title: 'REITs, DPPs, and private funds',
          brief: 'A REIT owns or finances property and must distribute most of its taxable income. Equity REITs trade, but the economic exposure is real estate. DPPs, often limited partnerships, pass income and losses through and are illiquid. The general partner manages. Limited partners have limited liability. Hedge funds are lightly regulated, illiquid, and aimed at wealthy investors.',
        },
        {
          id: 's2-risks',
          title: 'The risk list',
          brief: 'Systematic risk, such as market and interest-rate risk, is not removed by diversification. Unsystematic risk, such as one company’s news, can be. Interest-rate risk: prices fall when rates rise. Reinvestment and call risk rise when rates fall. Also know credit, liquidity, inflation, currency, legislative, and political risk.',
        },
      ],
      questions: [
        {
          id: 'q201',
          topicId: 's2-debt',
          text: 'An investor owns an 8% corporate bond. Market rates fall to 6%. The bond’s market price will most likely:',
          opts: ['Fall', 'Rise', 'Stay unchanged because the coupon is fixed', 'Convert into common stock automatically'],
          correct: 1,
          rationale: 'Prices and rates move inversely. A higher coupon becomes more valuable when new bonds pay less, so the price rises.',
        },
        {
          id: 'q202',
          topicId: 's2-funds',
          text: 'An open-end mutual fund redemption received before the cutoff is priced at:',
          opts: ['The last trade on the NYSE at that minute', 'The NAV next computed after the markets close', 'A price guaranteed by FINRA', 'The original IPO price'],
          correct: 1,
          rationale: 'Open-end funds transact at NAV, which is calculated once a day after the close. They are not priced trade by trade.',
        },
        {
          id: 'q203',
          topicId: 's2-options',
          text: 'A call option is in-the-money when:',
          opts: ['The strike is above the market price', 'The market price is above the strike', 'The premium equals the strike', 'The contract has expired'],
          correct: 1,
          rationale: 'The call holder can buy below the current market only when the underlying price is above the strike.',
        },
        {
          id: 'q204',
          topicId: 's2-corporate',
          text: 'Call risk is greatest for a bondholder when:',
          opts: ['Rates rise and the bond is at a discount', 'Rates fall and the high-coupon bond is at a premium', 'The bond is non-callable', 'The investor owns a T-bill'],
          correct: 1,
          rationale: 'Issuers call high coupons after rates fall so they can refinance. The holder loses the premium price and the high income.',
        },
        {
          id: 'q205',
          topicId: 's2-preferred',
          text: 'Preferred stock is:',
          opts: ['A loan that must be repaid on a stated maturity', 'An equity security with priority over common for dividends', 'A money-market instrument', 'A general obligation bond'],
          correct: 1,
          rationale: 'Preferred is ownership, not debt. It usually has a stated dividend and stands ahead of common, but behind creditors.',
        },
        {
          id: 'q206',
          topicId: 's2-funds',
          text: 'Which product trades throughout the day at a market price rather than once-daily NAV?',
          opts: ['Open-end mutual fund', 'Variable annuity fixed account', 'Exchange-traded fund', 'Traditional UIT held to term only'],
          correct: 2,
          rationale: 'ETFs trade on exchanges all day. Traditional open-end mutual funds are purchased and redeemed at the next NAV.',
        },
        {
          id: 'q207',
          topicId: 's2-treasury',
          text: 'A T-bill bought at $9,800 and redeemed at $10,000 earns its return mainly from:',
          opts: ['A semi-annual coupon', 'The discount from par', 'A common-stock dividend', 'A municipal tax credit'],
          correct: 1,
          rationale: 'T-bills are zeros. The investor’s return is the difference between the discount price and par.',
        },
        {
          id: 'q208',
          topicId: 's2-debt',
          text: 'If market interest rates rise, the price of an existing fixed-rate bond will generally:',
          opts: ['Rise', 'Fall', 'Stay the same', 'Convert to equity'],
          correct: 1,
          rationale: 'New bonds pay more, so the old lower coupon must fall in price until its yield is competitive.',
        },
        {
          id: 'q209',
          topicId: 's2-common',
          text: 'Common stockholders have which position if the company is liquidated?',
          opts: ['Paid before all creditors', 'Paid after creditors and preferred stockholders', 'Guaranteed par value from SIPC', 'Converted into general obligation bonds'],
          correct: 1,
          rationale: 'Common stock is the residual claim. Creditors and preferred stock are ahead of it.',
        },
        {
          id: 'q210',
          topicId: 's2-munis',
          text: 'A municipal bond backed by the issuer’s taxing power is a:',
          opts: ['Revenue bond', 'General obligation bond', 'Treasury STRIP', 'Bankers’ acceptance'],
          correct: 1,
          rationale: 'GO bonds are backed by taxes. Revenue bonds are backed by project income.',
        },
        {
          id: 'q211',
          topicId: 's2-options',
          text: 'The buyer of a put has the right to:',
          opts: ['Buy the underlying at the strike', 'Sell the underlying at the strike', 'Force the issuer to call a bond', 'Convert preferred stock into common'],
          correct: 1,
          rationale: 'A put is the right to sell. A call is the right to buy. The seller of either has the obligation.',
        },
        {
          id: 'q212',
          topicId: 's2-alts',
          text: 'A direct participation program is most accurately described as:',
          opts: ['A liquid ETF that tracks the S&P 500', 'An illiquid pass-through investment, often a limited partnership', 'An FDIC-insured deposit', 'A T-bill sold at a premium'],
          correct: 1,
          rationale: 'DPPs pass tax items through to owners and are hard to sell. Limited partners have limited liability. The general partner manages.',
        },
        {
          id: 'q213',
          topicId: 's2-risks',
          text: 'Interest-rate risk on a fixed-rate bond means:',
          opts: ['The issuer calls the bond when rates fall', 'The market price falls when rates rise', 'Dividends are omitted', 'The ETF cannot trade during market hours'],
          correct: 1,
          rationale: 'Interest-rate risk is the price decline caused by higher rates. Call risk is the issuer redeeming the bond when rates fall.',
        },
        {
          id: 'q214',
          topicId: 's2-debt',
          text: 'Current yield equals:',
          opts: ['Coupon divided by par', 'Annual interest divided by the current market price', 'Par divided by years to maturity', 'The federal funds rate minus inflation'],
          correct: 1,
          rationale: 'Current yield uses the price the investor would pay today, not par. Nominal yield uses par.',
        },
        {
          id: 'q215',
          topicId: 's2-money',
          text: 'Which of the following is a money-market instrument?',
          opts: ['A 30-year Treasury bond', 'Commercial paper', 'Common stock', 'A variable annuity'],
          correct: 1,
          rationale: 'Money-market instruments mature in one year or less. Commercial paper is short-term corporate debt. A 30-year bond is not in that category.',
        },
        {
          id: 'q216',
          topicId: 's2-annuities',
          text: 'A variable annuity differs from a fixed annuity because the investor:',
          opts: ['Bears market risk in a separate account', 'Is insured by SIPC against market loss', 'Holds an FDIC-insured deposit', 'Must invest only in municipal bonds'],
          correct: 0,
          rationale: 'Variable annuity premiums go into a separate account. The owner takes the market risk. A fixed annuity credits a rate set by the insurer.',
        },
      ],
    },
    '3': {
      name: 'Trading, Accounts, and Prohibited Activities (31%)',
      flashcards: [
        { term: 'T+1', def: 'Equities, ETFs, corporate bonds, municipal bonds, listed options, and Treasuries settle the next business day.' },
        { term: 'Front-running', def: 'Trading for yourself ahead of a large customer order you know is coming.' },
        { term: 'Freeriding', def: 'Buying a security and selling it before paying for the purchase.' },
        { term: 'Reg T', def: 'The typical initial margin requirement to buy stock long is 50%.' },
      ],
      topics: [
        {
          id: 's3-orders',
          title: 'Orders',
          brief: 'A market order fills now at the best price. A buy limit fills at the limit or lower. A sell limit fills at the limit or higher. A stop becomes a market order once triggered. Choosing the security, the size, or whether to trade for a customer requires written discretionary authority.',
        },
        {
          id: 's3-settlement',
          title: 'Settlement',
          brief: 'Equities, ETFs, corporate bonds, and municipal bonds settle T+1, the next business day. Listed options and Treasuries also settle T+1. In a cash account the customer pays in full by settlement. The old T+2 equity cycle is not the current tested standard.',
        },
        {
          id: 's3-accounts',
          title: 'Account types',
          brief: 'A cash account is paid in full. A margin account can borrow against eligible securities. JTWROS passes to the survivor. Tenants in common does not. TOD names a beneficiary and avoids probate. UGMA and UTMA accounts hold an irrevocable gift for a minor, with an adult custodian.',
        },
        {
          id: 's3-margin',
          title: 'Margin',
          brief: 'Regulation T generally requires 50% initial margin to buy stock long. FINRA maintenance is commonly 25% for long stock and 30% for short stock. Hypothecation lets the firm pledge margin securities as collateral for the loan. A margin call is a demand for more equity. Margin magnifies gains and losses.',
        },
        {
          id: 's3-kyc',
          title: 'Know your customer',
          brief: 'The new-account record covers identity, objectives, experience, time horizon, liquidity needs, and risk tolerance. A recommendation needs a reasonable basis and must fit that customer. What is suitable for a young growth investor can be unsuitable for a conservative retiree who needs income and stability.',
        },
        {
          id: 's3-retirement',
          title: 'Retirement accounts',
          brief: 'A traditional IRA may give a deduction now and taxes withdrawals later. A Roth IRA uses after-tax money, and qualified withdrawals are tax-free. A 401(k) is an employer plan. These accounts have contribution and withdrawal rules. They are not a reason to ignore suitability.',
        },
        {
          id: 's3-prohibited',
          title: 'Prohibited practices',
          brief: 'Churning is excessive trading for commissions. Front-running is trading ahead of a customer order. Freeriding is selling before paying, and it can freeze the account. Painting the tape fakes activity. Backing away means refusing a firm quote. You may not guarantee a customer against loss.',
        },
        {
          id: 's3-insider',
          title: 'Insider trading',
          brief: 'Material nonpublic information is news a reasonable investor would want, such as an unannounced merger or earnings surprise. Trading on it is illegal. A tipper who leaks it and a tippee who trades can both be liable. Public information and rumors are not the same as MNPI.',
        },
        {
          id: 's3-actions',
          title: 'Corporate actions and complaints',
          brief: 'Splits, dividends, and proxies are corporate actions. A proxy lets a shareholder vote without attending. Customer complaints must be captured and reviewed under firm procedures. Commingling customer securities with firm securities is prohibited. Correspondence and retail communications have different approval and record rules.',
        },
      ],
      questions: [
        {
          id: 'q301',
          topicId: 's3-prohibited',
          text: 'A rep buys stock for a personal account just before placing a large customer buy in the same stock. This is:',
          opts: ['Matched trading', 'Front-running', 'A covered call', 'Dollar-cost averaging'],
          correct: 1,
          rationale: 'Front-running is trading ahead of a pending customer order to benefit from the price move that order may cause.',
        },
        {
          id: 'q302',
          topicId: 's3-settlement',
          text: 'Under the current settlement cycle, a corporate stock trade settles:',
          opts: ['The same calendar day in every case', 'T+1', 'T+2', 'T+5'],
          correct: 1,
          rationale: 'Equities, ETFs, corporate bonds, and municipal securities settle T+1. T+2 is the old equity cycle and is not the current standard.',
        },
        {
          id: 'q303',
          topicId: 's3-prohibited',
          text: 'A customer buys stock and sells it before paying for the purchase. This is:',
          opts: ['Churning', 'Freeriding', 'A stock split', 'Reinvestment risk'],
          correct: 1,
          rationale: 'Freeriding is selling before paying. Firms can freeze the account under Regulation T, often for 90 days.',
        },
        {
          id: 'q304',
          topicId: 's3-prohibited',
          text: 'Excessive trades made mainly to generate commissions are:',
          opts: ['Best execution', 'Churning', 'A limit order', 'A Treasury auction'],
          correct: 1,
          rationale: 'Churning ignores the customer’s interest and uses the account to produce commissions.',
        },
        {
          id: 'q305',
          topicId: 's3-insider',
          text: 'Trading on a nonpublic merger announcement before it is released is:',
          opts: ['Index arbitrage', 'Insider trading', 'A rights offering', 'A fourth-market print'],
          correct: 1,
          rationale: 'A merger that is not public is material nonpublic information. Trading on it is illegal for insiders and tippees.',
        },
        {
          id: 'q306',
          topicId: 's3-settlement',
          text: 'In a cash account, the customer must pay for a purchase:',
          opts: ['By the settlement date', 'Within 30 calendar days if they prefer', 'Only if the price rises', 'Never, because margin is automatic'],
          correct: 0,
          rationale: 'Cash-account purchases are paid in full by settlement. Margin borrowing belongs in a margin account.',
        },
        {
          id: 'q307',
          topicId: 's3-prohibited',
          text: 'Trades arranged to create a false appearance of active trading are called:',
          opts: ['Painting the tape', 'Dollar-cost averaging', 'Asset allocation', 'A stock dividend'],
          correct: 0,
          rationale: 'Painting the tape is manipulation. It misleads other investors about price or volume.',
        },
        {
          id: 'q308',
          topicId: 's3-settlement',
          text: 'Listed options and Treasury bills settle:',
          opts: ['T+0 only', 'T+1', 'T+2', 'T+3'],
          correct: 1,
          rationale: 'Listed options and Treasury securities settle T+1, the same next-business-day cycle now used for equities.',
        },
        {
          id: 'q309',
          topicId: 's3-margin',
          text: 'Regulation T initial margin for a typical long stock purchase is:',
          opts: ['10%', '25%', '50%', '100%'],
          correct: 2,
          rationale: 'Reg T initial margin is 50%. The 25% figure is the common FINRA maintenance requirement for long stock, which is a different test.',
        },
        {
          id: 'q310',
          topicId: 's3-kyc',
          text: 'A recommendation is unsuitable when the rep:',
          opts: ['Matches the customer’s objectives and risk tolerance', 'Ignores the customer’s finances, horizon, and risk tolerance', 'Delivers a prospectus', 'Uses a limit order'],
          correct: 1,
          rationale: 'Suitability requires a reasonable basis and a fit to that customer. A mismatched risk level fails the test.',
        },
        {
          id: 'q311',
          topicId: 's3-accounts',
          text: 'An UGMA or UTMA account is:',
          opts: ['A joint account with rights of survivorship', 'A custodial account for a minor', 'A margin account that waives Regulation T', 'An employer 401(k)'],
          correct: 1,
          rationale: 'The gift is irrevocable. An adult custodian manages the property for the minor until the age set by state law.',
        },
        {
          id: 'q312',
          topicId: 's3-orders',
          text: 'A buy limit order can be filled:',
          opts: ['Only above the limit price', 'At the limit price or lower', 'Only as a short sale', 'Only after a stop is elected at a worse price'],
          correct: 1,
          rationale: 'A buy limit sets the highest price the customer will pay. It can fill at that price or better, meaning lower.',
        },
        {
          id: 'q313',
          topicId: 's3-retirement',
          text: 'A qualified withdrawal from a Roth IRA is generally:',
          opts: ['Taxed as ordinary income', 'Tax-free', 'A margin loan under Regulation T', 'Reported on a currency transaction report'],
          correct: 1,
          rationale: 'Roth contributions are after-tax. Qualified withdrawals, including earnings if the rules are met, are tax-free. Traditional IRA withdrawals are generally taxed.',
        },
        {
          id: 'q314',
          topicId: 's3-actions',
          text: 'Mixing a customer’s securities with the firm’s own securities is:',
          opts: ['Standard custody practice', 'Commingling, which is prohibited', 'A stock split', 'Required by Regulation T'],
          correct: 1,
          rationale: 'Customer securities must be kept separate from firm securities. Mixing them is commingling and is prohibited.',
        },
      ],
    },
    '4': {
      name: 'Overview of the Regulatory Framework (9%)',
      flashcards: [
        { term: 'CTR', def: 'File a currency transaction report for more than $10,000 in cash in one business day.' },
        { term: 'SAR', def: 'File a suspicious activity report when activity looks like money laundering. The usual tested threshold is $5,000 if a suspect is known.' },
        { term: 'Form U5', def: 'Termination notice. File it within 30 days.' },
        { term: 'Selling away', def: 'Private securities business outside the firm. Written notice is required, and approval is required if you are paid.' },
      ],
      topics: [
        {
          id: 's4-registration',
          title: 'Registration',
          brief: 'Form U4 starts association with a broker-dealer and discloses employment, addresses, and disciplinary history. Form U5 ends it and is due within 30 days. Certain felonies and securities misdemeanors cause statutory disqualification. Fingerprints and firm supervision come with registration. You may not act as a rep before you are properly registered.',
        },
        {
          id: 's4-ce-oba',
          title: 'Education and outside activity',
          brief: 'Continuing education has a Regulatory Element and a Firm Element. An outside business activity needs written notice to the firm. Selling securities away from the firm needs written notice. If you will be paid, the firm must approve it. Doing the business quietly is selling away.',
        },
        {
          id: 's4-aml',
          title: 'AML, CTRs, and SARs',
          brief: 'Broker-dealers need an AML program and must identify customers. Cash over $10,000 in one business day requires a currency transaction report. Splitting deposits to stay under that line is suspicious. A suspicious activity report is filed for suspected laundering. The tested amount is $5,000 when a suspect is known.',
        },
        {
          id: 's4-sipc',
          title: 'SIPC coverage',
          brief: 'SIPC protects customers if the broker-dealer fails, not if the market falls. The usual limit is $500,000 per customer, and no more than $250,000 of that may be cash. Separate capacity, such as an IRA, can be a separate customer. Commodities and market losses are not SIPC’s job.',
        },
        {
          id: 's4-communications',
          title: 'Communications',
          brief: 'Retail communication goes to more than 25 retail investors in a 30-day period and generally needs principal approval. Correspondence is 25 or fewer. Institutional communication is aimed at institutions. Retail posts, ads, and seminars that reach the public are treated as communications with the public and must be fair and balanced.',
        },
        {
          id: 's4-privacy',
          title: 'Privacy',
          brief: 'Regulation S-P requires firms to protect nonpublic personal information and to give customers a privacy notice and a chance to opt out of certain sharing. Identity-theft programs watch for red flags. Customer data is not a rep’s personal mailing list.',
        },
        {
          id: 's4-enforcement',
          title: 'Discipline and arbitration',
          brief: 'FINRA’s Code of Procedure is the disciplinary path: investigations, complaints, fines, suspensions, and bars. Customer money disputes and many industry disputes go to arbitration, not to the Code of Procedure. A predispute arbitration clause is common in customer agreements. The SEC can review SRO action and bring its own cases.',
        },
      ],
      questions: [
        {
          id: 'q401',
          topicId: 's4-aml',
          text: 'A customer deposits $11,500 in cash in one business day. The firm files a:',
          opts: ['Form U5', 'Currency transaction report', 'Prospectus', 'Form ADV'],
          correct: 1,
          rationale: 'Cash over $10,000 in one business day requires a CTR. A SAR is for suspicious activity, which is a different report.',
        },
        {
          id: 'q402',
          topicId: 's4-aml',
          text: 'When a suspect is identified, the SAR threshold commonly tested on the SIE is:',
          opts: ['$1,000', '$5,000', '$50,000', '$250,000'],
          correct: 1,
          rationale: 'The familiar tested threshold is $5,000 of suspicious activity when a suspect is known. The CTR cash line is $10,000 and is a different filing.',
        },
        {
          id: 'q403',
          topicId: 's4-registration',
          text: 'Form U5 must be filed within:',
          opts: ['10 business days', '30 days', '90 days', 'One year'],
          correct: 1,
          rationale: 'The termination notice is due within 30 days. Form U4 is the registration form used when the person joins.',
        },
        {
          id: 'q404',
          topicId: 's4-ce-oba',
          text: 'Selling away means a registered person:',
          opts: ['Sells the firm’s inventory to a customer', 'Does securities business outside the firm without the required notice and approval', 'Files a timely SAR', 'Places a customer limit order'],
          correct: 1,
          rationale: 'Private securities transactions away from the firm require written notice. Compensation also requires firm approval.',
        },
        {
          id: 'q405',
          topicId: 's4-aml',
          text: 'A broker-dealer AML program exists to:',
          opts: ['Guarantee trading profits', 'Detect and report money laundering and suspicious activity', 'Eliminate cash accounts', 'Replace FINRA arbitration'],
          correct: 1,
          rationale: 'AML programs include policies, a customer identification program, training, and reports such as SARs and CTRs.',
        },
        {
          id: 'q406',
          topicId: 's4-enforcement',
          text: 'The SEC’s primary role includes:',
          opts: ['Setting the federal funds rate', 'Enforcing federal securities laws', 'Insuring bank deposits', 'Writing state insurance exams'],
          correct: 1,
          rationale: 'The SEC is the federal securities regulator. The Fed sets monetary policy. FDIC insures bank deposits.',
        },
        {
          id: 'q407',
          topicId: 's4-aml',
          text: 'A customer splits a large cash deposit into several amounts just under $10,000. The firm should consider a:',
          opts: ['Form U4', 'Suspicious activity report', 'Stock split', 'Breakpoint letter only'],
          correct: 1,
          rationale: 'Structuring is an attempt to evade the CTR. That pattern is suspicious and can require a SAR even when no single deposit exceeds $10,000.',
        },
        {
          id: 'q408',
          topicId: 's4-enforcement',
          text: 'FINRA’s role is best described as:',
          opts: ['Writing federal criminal statutes', 'Self-regulation of broker-dealers and their reps', 'Insuring customers against market loss', 'Setting income-tax rates'],
          correct: 1,
          rationale: 'FINRA examines member firms, writes and enforces conduct rules, and runs arbitration, under SEC oversight.',
        },
        {
          id: 'q409',
          topicId: 's4-sipc',
          text: 'SIPC coverage is generally:',
          opts: ['$250,000 of market-loss insurance', '$500,000 total, including no more than $250,000 cash', 'Unlimited coverage of every security', '$10,000, the same figure as a CTR'],
          correct: 1,
          rationale: 'The basic SIPC limit is $500,000 per customer, with a $250,000 cap on cash. Market losses are not covered.',
        },
        {
          id: 'q410',
          topicId: 's4-ce-oba',
          text: 'A rep who will be paid for a private securities deal outside the firm must:',
          opts: ['Keep the firm uninformed', 'Give written notice and get the firm’s approval', 'File a CTR first', 'Wait until Form U5 is filed'],
          correct: 1,
          rationale: 'Notice is always required. If the rep receives compensation, the firm must approve the transaction before it happens.',
        },
        {
          id: 'q411',
          topicId: 's4-privacy',
          text: 'Regulation S-P requires firms to:',
          opts: ['Guarantee a minimum return', 'Protect nonpublic personal information and provide privacy notices', 'Settle stock trades on T+2', 'Set the federal funds rate'],
          correct: 1,
          rationale: 'Regulation S-P is the privacy rule. It covers customer data and required notices, not trade settlement or monetary policy.',
        },
        {
          id: 'q412',
          topicId: 's4-communications',
          text: 'A retail communication is generally a message sent to:',
          opts: ['More than 25 retail investors within 30 days', 'One institutional customer', 'Only the SEC staff', '25 or fewer retail investors'],
          correct: 0,
          rationale: 'Retail communication reaches more than 25 retail investors in 30 days and usually needs principal approval. Correspondence is 25 or fewer.',
        },
      ],
    },
  },
};

export const FIN_MAN_SECTIONS: FinManSectionId[] = ['1', '2', '3', '4'];
