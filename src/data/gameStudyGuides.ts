export interface StudyGuideSection {
  title: string;
  body: string;
}

export interface GameStudyGuide {
  title: string;
  intro: string;
  sections: StudyGuideSection[];
}

export const studyGuides: Record<'match' | 'sort' | 'agency' | 'prohibited', GameStudyGuide> = {
  prohibited: {
    title: 'Prohibited Activities & Compliance',
    intro:
      'Reference sheet for common SIE violations and reporting rules. Read this first, then answer the scenarios below without peeking — they are not listed here in the same order.',
    sections: [
      {
        title: 'Front running',
        body:
          'A registered person trades for their own account ahead of a large pending customer order, expecting the customer order to move the price. The rep profits from information about firm order flow. Prohibited under fiduciary and fair-dealing standards.',
      },
      {
        title: 'Churning',
        body:
          'Excessive buying and selling in a customer account mainly to generate commissions, not to meet the customer\'s investment objectives. Watch for high turnover, especially in elderly or inactive accounts controlled by the rep.',
      },
      {
        title: 'Insider trading',
        body:
          'Buying or selling securities while in possession of material nonpublic information (MNPI). Examples include undisclosed mergers, earnings surprises, or regulatory actions. Applies to firm employees and anyone who receives tipped MNPI.',
      },
      {
        title: 'Painting the tape (market manipulation)',
        body:
          'Coordinated or deceptive trades meant to create a false picture of volume, demand, or price movement. Includes wash sales and matched orders used to mislead other market participants.',
      },
      {
        title: 'Unsuitable recommendations',
        body:
          'Firms and reps must have a reasonable basis for recommendations and they must be suitable based on the customer\'s profile — age, objectives, risk tolerance, liquidity needs, and experience. Aggressive strategies are often unsuitable for conservative retirees.',
      },
      {
        title: 'AML violations & suspicious activity',
        body:
          'Broker-dealers must maintain Anti-Money Laundering (AML) programs. Suspicious Activity Reports (SARs) must be filed when activity appears suspicious. Currency Transaction Reports (CTRs) are required for large cash transactions (typically over $10,000 in one business day). Failing to report is a compliance violation.',
      },
      {
        title: 'Other prohibited practices (SIE favorites)',
        body:
          'Unauthorized trading, misrepresentation, withholding material facts, sharing in customer accounts without disclosure, and guaranteeing customers against loss are also prohibited. Know the difference between unethical sales tactics and criminal fraud.',
      },
    ],
  },
  sort: {
    title: 'Product & Risk Categories',
    intro:
      'Use this guide to learn how securities are classified. The quiz below asks you to sort specific products — the examples are not listed here.',
    sections: [
      {
        title: 'Equity securities',
        body:
          'Represent ownership in a company. Common stock usually has voting rights; preferred stock has priority on dividends and liquidation but limited voting. Stockholders are last in line after creditors in bankruptcy.',
      },
      {
        title: 'Debt securities',
        body:
          'Represent a loan to the issuer. Bondholders are creditors entitled to interest and return of principal. Corporate bonds, notes, and debentures are debt — not ownership even if issued by the same company that has stock.',
      },
      {
        title: 'Municipal securities',
        body:
          'Issued by states, cities, or other municipal entities. General obligation (GO) bonds are backed by taxing power; revenue bonds are backed by project income (tolls, fees, etc.).',
      },
      {
        title: 'Government securities',
        body:
          'Obligations of the U.S. Treasury such as T-bills, notes, and bonds. Backed by the full faith and credit of the federal government. T-bills are short-term (one year or less), sold at a discount.',
      },
      {
        title: 'Funds (mutual funds & ETFs)',
        body:
          'Pooled investment vehicles. Investors own shares of the fund, which holds a portfolio of securities. ETFs trade on exchanges intraday; mutual funds transact at end-of-day NAV.',
      },
      {
        title: 'Derivatives',
        body:
          'Contracts whose value is derived from an underlying asset — stocks, indexes, interest rates, etc. Options and futures are derivatives. A call option gives the right to buy; a put gives the right to sell.',
      },
      {
        title: 'Real estate securities',
        body:
          'REITs (Real Estate Investment Trusts) own or finance income-producing property and must distribute most taxable income. They trade like equity but their economic exposure is real estate.',
      },
    ],
  },
  agency: {
    title: 'Regulators & Their Roles',
    intro:
      'Know which agency handles which function. The matching quiz below uses different wording — study the roles here first.',
    sections: [
      {
        title: 'SEC (Securities and Exchange Commission)',
        body:
          'Federal regulator of the securities markets. Enforces securities laws, oversees disclosure, reviews registration of new issues, regulates investment advisers (over threshold), and protects investors. Does not examine every broker-dealer day-to-day — that is largely FINRA.',
      },
      {
        title: 'FINRA (Financial Industry Regulatory Authority)',
        body:
          'Largest securities SRO. Regulates broker-dealers and registered representatives, conducts examinations, enforces conduct rules, operates arbitration, and administers qualifying exams including the SIE and Series exams.',
      },
      {
        title: 'MSRB (Municipal Securities Rulemaking Board)',
        body:
          'Creates rules for the municipal securities market — underwriting, trading, and disclosure standards for munis. Does not directly regulate broker-dealers the way FINRA does; FINRA and the SEC enforce many MSRB rules.',
      },
      {
        title: 'Federal Reserve',
        body:
          'Central bank of the United States. Sets monetary policy including the federal funds rate, supervises bank holding companies, and influences overall interest rates and economic conditions — not day-to-day broker-dealer regulation.',
      },
      {
        title: 'SIPC',
        body:
          'Securities Investor Protection Corporation — not on the quiz but often confused. Protects customers if a broker-dealer fails (cash and securities limits). Not the same as FDIC and not a market regulator.',
      },
    ],
  },
  match: {
    title: 'Key Terminology Reference',
    intro:
      'General definitions for capital-markets concepts tested on the SIE. The matching game pairs terms with definitions in random order — study here first, then test yourself.',
    sections: [
      {
        title: 'Equity basics',
        body:
          'Dividends are distributions to shareholders. Stock splits increase share count and reduce price per share without changing total value. Treasury stock is repurchased shares held by the issuer, reducing shares outstanding.',
      },
      {
        title: 'Preferred & ADRs',
        body:
          'Cumulative preferred must receive all missed dividends before common receives dividends. ADRs represent foreign shares and trade in U.S. markets in dollars, simplifying access to non-U.S. companies.',
      },
      {
        title: 'Corporate actions',
        body:
          'Warrants and rights give holders the option to buy new shares from the company, often at a discount. Growth companies tend to retain earnings rather than pay large dividends.',
      },
      {
        title: 'Debt & yields',
        body:
          'Bond prices move inversely to interest rates. Current yield = annual coupon ÷ market price. Premium bonds trade above par; discount bonds trade below par.',
      },
      {
        title: 'Markets & regulation',
        body:
          'Primary market: new issues from issuers. Secondary market: trading among investors. FINRA regulates broker-dealers; SEC enforces federal securities law.',
      },
    ],
  },
};