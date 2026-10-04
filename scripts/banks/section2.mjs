export const questions = [
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "easy",
    "prompt": "The net asset value (NAV) of a mutual fund is calculated by:",
    "choices": {
      "A": "Dividing total fund assets minus liabilities by shares outstanding",
      "B": "Multiplying the fund's closing market price by 100",
      "C": "Adding the sales charge to the bid price",
      "D": "Using only the fund's cash holdings"
    },
    "correct_answer": "A",
    "explanation": "NAV = (total assets − liabilities) ÷ shares outstanding. It represents the per-share value of fund holdings.",
    "keyword_tags": [
      "NAV",
      "mutual funds",
      "fund valuation"
    ],
    "learning_objective": "Calculate and interpret mutual fund NAV",
    "remediation_tip": "NAV is priced once daily after markets close; it is not the same as a closed-end fund's market price."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "medium",
    "prompt": "An open-end mutual fund investor who redeems shares on a business day generally receives:",
    "choices": {
      "A": "The next day's opening stock price of the largest holding",
      "B": "The NAV calculated at the close of that business day, minus any applicable fees",
      "C": "A guaranteed price set at purchase",
      "D": "The average price of the past 30 trading days"
    },
    "correct_answer": "B",
    "explanation": "Open-end funds redeem at forward-priced NAV (typically the close of the day the order is received), less redemption fees or CDSC if applicable.",
    "keyword_tags": [
      "open-end fund",
      "redemption",
      "mutual funds"
    ],
    "learning_objective": "Explain open-end fund pricing and redemption mechanics",
    "remediation_tip": "Forward pricing means you do not know the exact redemption price when you submit the order."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "medium",
    "prompt": "A mutual fund with a 5% front-end load and an NAV of $20 per share at purchase will have an offering price of approximately:",
    "choices": {
      "A": "$19.00",
      "B": "$20.00",
      "C": "$21.00",
      "D": "$25.00"
    },
    "correct_answer": "C",
    "explanation": "Offering price = NAV ÷ (1 − load). $20 ÷ 0.95 ≈ $21.05, closest to $21. The load is taken from the purchase amount.",
    "keyword_tags": [
      "front-end load",
      "offering price",
      "mutual funds"
    ],
    "learning_objective": "Calculate offering price with a front-end sales charge",
    "remediation_tip": "Memorize: offering price = NAV / (1 − load percentage)."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "hard",
    "prompt": "A customer invests $25,000 in a Class A mutual fund with a 5% front-end load. Approximately how much is actually invested in fund shares?",
    "choices": {
      "A": "$25,000",
      "B": "$23,750",
      "C": "$26,250",
      "D": "$24,500"
    },
    "correct_answer": "B",
    "explanation": "With a front-end load, the sales charge is deducted first: $25,000 × 5% = $1,250 load, leaving $23,750 invested at NAV.",
    "keyword_tags": [
      "front-end load",
      "sales charge",
      "mutual funds"
    ],
    "learning_objective": "Apply front-end load calculations to customer investments",
    "remediation_tip": "Work both directions: load from gross investment and net amount reaching the fund."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "medium",
    "prompt": "A contingent deferred sales charge (CDSC) on Class B mutual fund shares is typically assessed:",
    "choices": {
      "A": "At the time of purchase",
      "B": "When shares are redeemed within a specified holding period",
      "C": "Annually regardless of trading activity",
      "D": "Only on dividend distributions"
    },
    "correct_answer": "B",
    "explanation": "CDSC is a back-end load that declines over time and is charged if the investor sells before the schedule expires.",
    "keyword_tags": [
      "CDSC",
      "back-end load",
      "mutual funds"
    ],
    "learning_objective": "Understand back-end sales charge schedules",
    "remediation_tip": "CDSC percentages usually step down each year until reaching zero."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "easy",
    "prompt": "Rule 12b-1 fees in a mutual fund are used primarily to cover:",
    "choices": {
      "A": "Portfolio management and trading costs",
      "B": "Distribution and shareholder service expenses",
      "C": "SEC registration filing fees only",
      "D": "Federal income taxes on fund gains"
    },
    "correct_answer": "B",
    "explanation": "12b-1 fees pay for marketing, distribution, and shareholder servicing. They are part of the expense ratio.",
    "keyword_tags": [
      "12b-1 fees",
      "expense ratio",
      "mutual funds"
    ],
    "learning_objective": "Identify the purpose of Rule 12b-1 fees",
    "remediation_tip": "No-load funds may still charge 12b-1 fees up to regulatory limits."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "medium",
    "prompt": "A no-load mutual fund is best described as one that:",
    "choices": {
      "A": "Charges no fees of any kind",
      "B": "Does not charge a traditional sales load but may have other fees",
      "C": "Guarantees positive annual returns",
      "D": "Trades only on stock exchanges"
    },
    "correct_answer": "B",
    "explanation": "No-load means no sales charge on purchase or redemption, but the fund can still charge management fees, 12b-1 fees, and redemption fees.",
    "keyword_tags": [
      "no-load fund",
      "mutual funds",
      "sales charge"
    ],
    "learning_objective": "Distinguish no-load funds from zero-fee funds",
    "remediation_tip": "Always review the prospectus fee table—no-load is not the same as no expenses."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "hard",
    "prompt": "An investor signs a letter of intent (LOI) to invest $50,000 over 13 months in a fund with breakpoint reductions at $25,000 and $50,000. The LOI allows the investor to:",
    "choices": {
      "A": "Lock in a lower sales charge immediately based on the committed total",
      "B": "Avoid all future management fees",
      "C": "Convert Class B shares to Class A without cost",
      "D": "Receive a guaranteed NAV for 13 months"
    },
    "correct_answer": "A",
    "explanation": "An LOI lets investors receive breakpoint pricing during the accumulation period based on the stated commitment, if fulfilled.",
    "keyword_tags": [
      "letter of intent",
      "breakpoint",
      "mutual funds"
    ],
    "learning_objective": "Apply letter of intent and breakpoint sales charge rules",
    "remediation_tip": "Pair LOI with rights of accumulation when studying sales charge reductions."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "medium",
    "prompt": "Rights of accumulation allow an investor to:",
    "choices": {
      "A": "Vote on Federal Reserve policy",
      "B": "Combine existing fund holdings and new purchases to qualify for reduced sales charges",
      "C": "Accumulate dividends without taxation",
      "D": "Avoid capital gains distributions permanently"
    },
    "correct_answer": "B",
    "explanation": "Rights of accumulation count prior investments in the fund family toward breakpoint thresholds for lower front-end loads.",
    "keyword_tags": [
      "rights of accumulation",
      "breakpoint",
      "mutual funds"
    ],
    "learning_objective": "Explain rights of accumulation for sales charge discounts",
    "remediation_tip": "Breakpoints reward larger purchases—know dollar thresholds in examples."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "easy",
    "prompt": "A mutual fund expense ratio represents:",
    "choices": {
      "A": "The sales charge at purchase",
      "B": "Annual fund operating costs as a percentage of average net assets",
      "C": "The fund's turnover rate",
      "D": "The maximum CDSC in year one"
    },
    "correct_answer": "B",
    "explanation": "Expense ratio includes management fees, administrative costs, and often 12b-1 fees, expressed as a percentage of assets.",
    "keyword_tags": [
      "expense ratio",
      "mutual funds",
      "fund costs"
    ],
    "learning_objective": "Interpret mutual fund expense ratios",
    "remediation_tip": "Lower expense ratios leave more return for shareholders over long holding periods."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "medium",
    "prompt": "A high portfolio turnover ratio in an equity mutual fund suggests:",
    "choices": {
      "A": "The manager rarely trades holdings",
      "B": "The manager frequently buys and sells securities",
      "C": "The fund holds only Treasury bills",
      "D": "The fund is a passive index fund"
    },
    "correct_answer": "B",
    "explanation": "Turnover measures how often the portfolio is traded. High turnover can increase transaction costs and taxable distributions.",
    "keyword_tags": [
      "turnover ratio",
      "mutual funds",
      "portfolio management"
    ],
    "learning_objective": "Relate turnover to trading activity and tax efficiency",
    "remediation_tip": "Compare active funds with high turnover to index funds with low turnover."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "hard",
    "prompt": "At year-end, a mutual fund distributes net capital gains to shareholders. Shareholders generally:",
    "choices": {
      "A": "Owe no taxes because mutual funds are tax-exempt entities",
      "B": "May owe taxes on the distribution even if they reinvest it",
      "C": "Receive tax-free treatment for all equity fund gains",
      "D": "Must sell shares within 30 days to avoid taxation"
    },
    "correct_answer": "B",
    "explanation": "Funds pass through capital gains and dividends. Reinvesting distributions does not defer the tax liability.",
    "keyword_tags": [
      "capital gains distribution",
      "mutual fund taxation",
      "mutual funds"
    ],
    "learning_objective": "Understand tax treatment of mutual fund distributions",
    "remediation_tip": "Hold funds in tax-advantaged accounts when distributions are a concern."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "easy",
    "prompt": "Money market mutual funds invest primarily in:",
    "choices": {
      "A": "Long-term growth stocks",
      "B": "Short-term, high-quality debt instruments",
      "C": "Municipal real estate projects",
      "D": "Speculative penny stocks"
    },
    "correct_answer": "B",
    "explanation": "Money market funds seek stability and liquidity by holding short-term debt such as T-bills, commercial paper, and repos.",
    "keyword_tags": [
      "money market fund",
      "mutual funds",
      "short-term debt"
    ],
    "learning_objective": "Describe money market fund investments and objectives",
    "remediation_tip": "Money market funds are not FDIC-insured despite their stable NAV tradition."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "medium",
    "prompt": "Class C mutual fund shares are often characterized by:",
    "choices": {
      "A": "The highest front-end load and lowest 12b-1 fees",
      "B": "Level loads through higher ongoing expenses and a short CDSC period",
      "C": "No ability to convert to other share classes",
      "D": "Availability only to institutional investors"
    },
    "correct_answer": "B",
    "explanation": "Class C shares typically have no front-end load but higher ongoing fees and a CDSC that expires after a relatively short period.",
    "keyword_tags": [
      "share classes",
      "Class C shares",
      "mutual funds"
    ],
    "learning_objective": "Compare mutual fund share class fee structures",
    "remediation_tip": "Build a chart of Class A, B, and C load and fee patterns."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "medium",
    "prompt": "A mutual fund prospectus is required to disclose:",
    "choices": {
      "A": "Guaranteed future performance",
      "B": "Investment objectives, risks, fees, and past performance",
      "C": "The personal finances of portfolio managers",
      "D": "FINRA arbitration awards against the fund"
    },
    "correct_answer": "B",
    "explanation": "The prospectus is the primary disclosure document covering objectives, strategies, risks, fees, and historical results.",
    "keyword_tags": [
      "prospectus",
      "disclosure",
      "mutual funds"
    ],
    "learning_objective": "Identify required mutual fund prospectus disclosures",
    "remediation_tip": "Also review the Statement of Additional Information (SAI) for deeper detail."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "hard",
    "prompt": "Under the Investment Company Act of 1940, mutual funds must:",
    "choices": {
      "A": "Guarantee shareholder principal",
      "B": "Register with the SEC and meet diversification and governance standards",
      "C": "Invest only in U.S. Treasury securities",
      "D": "Eliminate all investment risk through hedging"
    },
    "correct_answer": "B",
    "explanation": "The 1940 Act regulates investment companies, requiring registration, disclosure, and structural protections for fund investors.",
    "keyword_tags": [
      "Investment Company Act",
      "mutual funds",
      "SEC registration"
    ],
    "learning_objective": "Understand basic Investment Company Act requirements",
    "remediation_tip": "Contrast the 1940 Act (funds) with the 1933 Act (new securities offerings)."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "easy",
    "prompt": "A primary benefit of investing in a diversified equity mutual fund compared to a single stock is:",
    "choices": {
      "A": "Elimination of all market risk",
      "B": "Reduced company-specific risk through broader holdings",
      "C": "Guaranteed dividends every quarter",
      "D": "Exemption from federal income tax"
    },
    "correct_answer": "B",
    "explanation": "Mutual funds pool capital to hold many securities, reducing unsystematic (company-specific) risk but not overall market risk.",
    "keyword_tags": [
      "diversification",
      "mutual funds",
      "investment risks"
    ],
    "learning_objective": "Explain diversification benefits of mutual funds",
    "remediation_tip": "Diversification reduces specific risk, not systematic market risk."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "medium",
    "prompt": "An index mutual fund typically aims to:",
    "choices": {
      "A": "Outperform its benchmark by 5% annually",
      "B": "Match the performance of a specified index before expenses",
      "C": "Avoid holding any bonds",
      "D": "Change its benchmark monthly"
    },
    "correct_answer": "B",
    "explanation": "Index funds use passive management to replicate index returns, minus fees and tracking differences.",
    "keyword_tags": [
      "index fund",
      "passive management",
      "mutual funds"
    ],
    "learning_objective": "Describe index mutual fund objectives and management style",
    "remediation_tip": "Tracking error measures how closely a fund follows its index."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "hard",
    "prompt": "A fund family switching privilege generally allows shareholders to:",
    "choices": {
      "A": "Transfer between funds in the same family without a new sales charge, subject to policy",
      "B": "Switch to any fund on any exchange without fees",
      "C": "Convert mutual fund shares to ETFs at NAV without cost",
      "D": "Avoid capital gains taxes on all exchanges"
    },
    "correct_answer": "B",
    "explanation": "Many fund families permit tax-reportable exchanges among their funds, sometimes waiving loads but not potential tax consequences.",
    "keyword_tags": [
      "fund family",
      "exchange privilege",
      "mutual funds"
    ],
    "learning_objective": "Understand mutual fund exchange privileges and tax effects",
    "remediation_tip": "Exchanges may be taxable events even when sales charges are waived."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "medium",
    "prompt": "A mutual fund redemption fee, unlike a sales load, is typically:",
    "choices": {
      "A": "Paid to a registered representative as commission",
      "B": "Retained by the fund to discourage short-term trading",
      "C": "Capped at 8.5% under FINRA rules",
      "D": "Assessed only on retirement accounts"
    },
    "correct_answer": "B",
    "explanation": "Redemption fees go back to the fund to offset trading costs from frequent in-and-out trading.",
    "keyword_tags": [
      "redemption fee",
      "mutual funds",
      "market timing"
    ],
    "learning_objective": "Distinguish redemption fees from sales loads",
    "remediation_tip": "Redemption fees protect long-term shareholders from costs of rapid traders."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "easy",
    "prompt": "The board of directors (or trustees) of a mutual fund is responsible for:",
    "choices": {
      "A": "Day-to-day stock selection by the portfolio manager",
      "B": "Overseeing the fund and protecting shareholder interests",
      "C": "Setting Federal Reserve interest rates",
      "D": "Underwriting municipal bond offerings"
    },
    "correct_answer": "B",
    "explanation": "The board oversees the adviser, reviews fees, and acts on behalf of shareholders under the 1940 Act.",
    "keyword_tags": [
      "board of trustees",
      "mutual funds",
      "governance"
    ],
    "learning_objective": "Describe mutual fund governance structure",
    "remediation_tip": "The investment adviser manages daily operations; the board provides oversight."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "medium",
    "prompt": "A growth and income mutual fund typically invests in securities that:",
    "choices": {
      "A": "Mature in less than 90 days",
      "B": "Offer both capital appreciation potential and dividend income",
      "C": "Are issued only by municipalities",
      "D": "Have no equity component"
    },
    "correct_answer": "B",
    "explanation": "Growth and income funds blend stocks with growth potential and dividend-paying companies for dual objectives.",
    "keyword_tags": [
      "growth and income",
      "fund objectives",
      "mutual funds"
    ],
    "learning_objective": "Match mutual fund categories to investor objectives",
    "remediation_tip": "Align fund objective statements with customer goals and risk tolerance."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "hard",
    "prompt": "If a mutual fund's NAV rises from $15 to $18 and it distributes a $1 dividend, an investor who reinvests the dividend has:",
    "choices": {
      "A": "A lower cost basis and fewer shares",
      "B": "Additional shares purchased at the distribution NAV",
      "C": "No tax reporting requirement",
      "D": "A guaranteed $3 short-term gain"
    },
    "correct_answer": "B",
    "explanation": "Reinvested dividends buy more shares at the post-distribution price. The distribution is still taxable unless held in a qualified account.",
    "keyword_tags": [
      "dividend reinvestment",
      "mutual funds",
      "cost basis"
    ],
    "learning_objective": "Analyze dividend reinvestment effects on share count and taxes",
    "remediation_tip": "Track distributions for tax reporting even when automatically reinvested."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "medium",
    "prompt": "Closed-end funds differ from open-end mutual funds because closed-end funds:",
    "choices": {
      "A": "Always sell shares at NAV",
      "B": "Issue a fixed number of shares that trade on exchanges at market prices",
      "C": "Redeem shares daily at the fund company",
      "D": "Are exempt from SEC registration"
    },
    "correct_answer": "B",
    "explanation": "Closed-end funds trade like stocks and may price at a premium or discount to NAV.",
    "keyword_tags": [
      "closed-end fund",
      "mutual funds",
      "premium discount"
    ],
    "learning_objective": "Compare open-end and closed-end fund structures",
    "remediation_tip": "Open-end = fund company transactions at NAV; closed-end = exchange trading at market price."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "easy",
    "prompt": "A mutual fund's investment objective is found primarily in the:",
    "choices": {
      "A": "Form U4",
      "B": "Prospectus",
      "C": "Currency Transaction Report",
      "D": "Blue Sheet filing"
    },
    "correct_answer": "B",
    "explanation": "The prospectus states whether the fund seeks growth, income, preservation of capital, or a combination.",
    "keyword_tags": [
      "investment objective",
      "prospectus",
      "mutual funds"
    ],
    "learning_objective": "Locate and interpret fund investment objectives",
    "remediation_tip": "Mismatch between client goals and fund objective is a suitability concern."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "hard",
    "prompt": "A customer owns Class B shares with a declining CDSC schedule. After the CDSC period expires, the customer would typically:",
    "choices": {
      "A": "Pay a higher front-end load on redemption",
      "B": "Redeem without a CDSC, though other fees may apply",
      "C": "Automatically convert to Class A with no action",
      "D": "Lose voting rights in the fund"
    },
    "correct_answer": "B",
    "explanation": "Once the CDSC schedule ends, redemption is not subject to the deferred sales charge, but annual expenses may remain higher than Class A.",
    "keyword_tags": [
      "CDSC",
      "Class B shares",
      "mutual funds"
    ],
    "learning_objective": "Apply CDSC schedule expiration rules",
    "remediation_tip": "Some Class B shares convert to Class A after a set period—check fund policy."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "easy",
    "prompt": "Exchange-traded funds (ETFs) are bought and sold:",
    "choices": {
      "A": "Only once daily at NAV directly from the fund",
      "B": "On stock exchanges throughout the trading day at market prices",
      "C": "Exclusively through insurance agents",
      "D": "Only in the primary market from the issuer"
    },
    "correct_answer": "B",
    "explanation": "ETFs trade intraday on exchanges like stocks, with prices driven by supply and demand.",
    "keyword_tags": [
      "ETF trading",
      "secondary market",
      "ETFs"
    ],
    "learning_objective": "Explain how ETF shares trade in the market",
    "remediation_tip": "Intraday trading is a key difference from traditional open-end mutual funds."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "medium",
    "prompt": "The creation and redemption process for ETFs involves:",
    "choices": {
      "A": "Retail investors exchanging shares directly with the fund for cash daily",
      "B": "Authorized participants assembling baskets of securities with the fund sponsor",
      "C": "The SEC issuing new ETF shares at auction",
      "D": "FDIC insurance on each creation unit"
    },
    "correct_answer": "B",
    "explanation": "Authorized participants create or redeem large blocks (creation units) by delivering or receiving the underlying portfolio securities.",
    "keyword_tags": [
      "creation redemption",
      "authorized participant",
      "ETFs"
    ],
    "learning_objective": "Describe ETF creation and redemption mechanics",
    "remediation_tip": "This in-kind process helps ETFs stay near NAV and can improve tax efficiency."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "medium",
    "prompt": "An ETF trading at $52 when its NAV is $50 is said to be trading at a:",
    "choices": {
      "A": "Discount",
      "B": "Premium",
      "C": "Breakpoint",
      "D": "Par call"
    },
    "correct_answer": "B",
    "explanation": "When market price exceeds NAV, the ETF trades at a premium. Below NAV is a discount.",
    "keyword_tags": [
      "premium",
      "NAV",
      "ETFs"
    ],
    "learning_objective": "Identify ETF premium and discount to NAV",
    "remediation_tip": "Arbitrage by authorized participants tends to keep prices near NAV."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "hard",
    "prompt": "ETFs are often more tax-efficient than actively managed mutual funds primarily because:",
    "choices": {
      "A": "ETF gains are always tax-exempt",
      "B": "In-kind redemptions can minimize the fund's need to sell appreciated securities",
      "C": "ETFs never distribute dividends",
      "D": "ETFs are not subject to capital gains taxes"
    },
    "correct_answer": "B",
    "explanation": "In-kind creation/redemption allows the fund to shed low-basis shares without triggering fund-level taxable sales.",
    "keyword_tags": [
      "tax efficiency",
      "in-kind redemption",
      "ETFs"
    ],
    "learning_objective": "Explain ETF tax efficiency relative to mutual funds",
    "remediation_tip": "Investors still owe taxes on their own gains and on distributions received."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "easy",
    "prompt": "Compared to most actively managed mutual funds, index ETFs generally have:",
    "choices": {
      "A": "Higher expense ratios and more trading restrictions",
      "B": "Lower expense ratios and passive management",
      "C": "No underlying holdings disclosure",
      "D": "Mandatory front-end loads"
    },
    "correct_answer": "B",
    "explanation": "Passive index ETFs typically charge lower fees than active mutual funds and track a benchmark.",
    "keyword_tags": [
      "expense ratio",
      "index ETF",
      "ETFs"
    ],
    "learning_objective": "Compare ETF and mutual fund cost structures",
    "remediation_tip": "Always compare total costs including spreads and commissions."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "medium",
    "prompt": "A sector ETF that tracks the energy industry will primarily hold:",
    "choices": {
      "A": "Only U.S. Treasury securities",
      "B": "Stocks of companies in the energy sector",
      "C": "Municipal revenue bonds",
      "D": "Annuity contracts"
    },
    "correct_answer": "B",
    "explanation": "Sector ETFs concentrate in a specific industry, increasing sector-specific risk.",
    "keyword_tags": [
      "sector ETF",
      "concentration risk",
      "ETFs"
    ],
    "learning_objective": "Understand sector ETF composition and risks",
    "remediation_tip": "Sector funds lack broad diversification across industries."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "hard",
    "prompt": "Leveraged ETFs seek to deliver a multiple of the daily return of an index. A 2x leveraged ETF is MOST appropriate for:",
    "choices": {
      "A": "Long-term buy-and-hold retirement accounts",
      "B": "Short-term trading by sophisticated investors who understand daily reset risk",
      "C": "Investors seeking guaranteed principal protection",
      "D": "Clients who cannot tolerate volatility"
    },
    "correct_answer": "B",
    "explanation": "Leveraged ETFs reset daily; compounding effects can cause long-term returns to diverge sharply from the index multiple.",
    "keyword_tags": [
      "leveraged ETF",
      "daily reset",
      "ETFs"
    ],
    "learning_objective": "Assess suitability and risks of leveraged ETFs",
    "remediation_tip": "Daily leverage is a trading tool, not a long-term investment vehicle."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "medium",
    "prompt": "An inverse ETF is designed to:",
    "choices": {
      "A": "Deliver twice the positive return of an index",
      "B": "Move opposite to the daily performance of its benchmark",
      "C": "Invest only in investment-grade bonds",
      "D": "Eliminate market risk entirely"
    },
    "correct_answer": "B",
    "explanation": "Inverse ETFs seek the opposite of the benchmark's daily return and carry significant risk, especially over longer periods.",
    "keyword_tags": [
      "inverse ETF",
      "ETFs",
      "hedging"
    ],
    "learning_objective": "Explain inverse ETF objectives and risks",
    "remediation_tip": "Inverse and leveraged products require careful suitability review."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "easy",
    "prompt": "Bond ETFs differ from individual bonds because bond ETFs:",
    "choices": {
      "A": "Have a single fixed maturity date like a corporate bond",
      "B": "Do not mature; they maintain a portfolio with ongoing duration",
      "C": "Are always insured by the FDIC",
      "D": "Pay no interest income"
    },
    "correct_answer": "B",
    "explanation": "Bond ETFs are perpetual funds holding a changing portfolio of bonds rather than a single fixed-maturity obligation.",
    "keyword_tags": [
      "bond ETF",
      "duration",
      "ETFs"
    ],
    "learning_objective": "Compare bond ETFs to individual bond ownership",
    "remediation_tip": "Individual bonds can be held to maturity; bond ETFs do not offer that same defined maturity."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "medium",
    "prompt": "Tracking error in an ETF measures:",
    "choices": {
      "A": "The bid-ask spread at market open",
      "B": "How closely the ETF's performance matches its benchmark index",
      "C": "The fund's credit rating",
      "D": "The sales charge on purchase"
    },
    "correct_answer": "B",
    "explanation": "Tracking error reflects differences between ETF returns and index returns, often due to fees, sampling, or timing.",
    "keyword_tags": [
      "tracking error",
      "index ETF",
      "ETFs"
    ],
    "learning_objective": "Define and interpret ETF tracking error",
    "remediation_tip": "Lower tracking error generally indicates better index replication."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "hard",
    "prompt": "A physically backed gold ETF holds:",
    "choices": {
      "A": "Only gold mining company stocks",
      "B": "Actual gold bullion or similar physical assets",
      "C": "Gold futures without collateral",
      "D": "Municipal bond proceeds"
    },
    "correct_answer": "B",
    "explanation": "Physical ETFs hold the underlying commodity in storage, while others may use derivatives for exposure.",
    "keyword_tags": [
      "commodity ETF",
      "physical backing",
      "ETFs"
    ],
    "learning_objective": "Distinguish physical vs synthetic ETF structures",
    "remediation_tip": "Review whether exposure comes from holdings or derivatives."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "medium",
    "prompt": "The bid-ask spread on an ETF represents:",
    "choices": {
      "A": "The fund's annual expense ratio",
      "B": "The difference between the highest buy price and lowest sell price",
      "C": "The CDSC on redemption",
      "D": "The dividend yield of the underlying index"
    },
    "correct_answer": "B",
    "explanation": "Wider spreads increase transaction costs, especially for thinly traded ETFs.",
    "keyword_tags": [
      "bid-ask spread",
      "ETF liquidity",
      "ETFs"
    ],
    "learning_objective": "Understand ETF trading costs beyond expense ratios",
    "remediation_tip": "Use limit orders on less liquid ETFs to control execution price."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "easy",
    "prompt": "Most ETFs provide portfolio transparency by:",
    "choices": {
      "A": "Disclosing holdings daily or frequently",
      "B": "Hiding holdings for five years",
      "C": "Reporting only once at fund termination",
      "D": "Publishing holdings only to institutional investors"
    },
    "correct_answer": "A",
    "explanation": "ETFs typically disclose holdings daily, helping investors understand exposures.",
    "keyword_tags": [
      "transparency",
      "ETF holdings",
      "ETFs"
    ],
    "learning_objective": "Explain ETF disclosure practices",
    "remediation_tip": "Transparency supports informed investment decisions."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "medium",
    "prompt": "Actively managed ETFs differ from traditional index ETFs because they:",
    "choices": {
      "A": "Track a fixed index with no manager discretion",
      "B": "Use portfolio managers to select securities seeking to outperform a benchmark",
      "C": "Cannot trade on exchanges",
      "D": "Are not registered with the SEC"
    },
    "correct_answer": "B",
    "explanation": "Active ETFs employ managers making investment decisions rather than passive index replication.",
    "keyword_tags": [
      "actively managed ETF",
      "ETFs",
      "portfolio management"
    ],
    "learning_objective": "Compare active and passive ETF strategies",
    "remediation_tip": "Active ETFs may have higher fees and different tax profiles."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "hard",
    "prompt": "When comparing an ETF to a similar open-end index mutual fund, an active trader who values intraday execution would likely prefer the ETF because:",
    "choices": {
      "A": "ETFs always trade free of commissions",
      "B": "ETFs can be bought and sold at market prices throughout the day",
      "C": "ETFs never trade at a premium or discount",
      "D": "ETFs are FDIC insured"
    },
    "correct_answer": "B",
    "explanation": "Intraday exchange trading gives ETFs flexibility that once-daily mutual fund pricing does not.",
    "keyword_tags": [
      "intraday trading",
      "ETF vs mutual fund",
      "ETFs"
    ],
    "learning_objective": "Match product features to investor trading needs",
    "remediation_tip": "Long-term investors may care more about automatic investing and fractional shares."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "medium",
    "prompt": "Dividends received by an ETF shareholder are generally:",
    "choices": {
      "A": "Tax-exempt for all investors",
      "B": "Taxable according to the character of the underlying income",
      "C": "Treated as return of capital only",
      "D": "Paid only to authorized participants"
    },
    "correct_answer": "B",
    "explanation": "ETF distributions may be qualified dividends, ordinary income, or capital gains depending on fund holdings.",
    "keyword_tags": [
      "ETF dividends",
      "taxation",
      "ETFs"
    ],
    "learning_objective": "Understand ETF distribution tax treatment",
    "remediation_tip": "Check the fund's distribution history and tax supplements."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "easy",
    "prompt": "A broad market equity ETF provides investors with:",
    "choices": {
      "A": "Exposure to a wide segment of the stock market in a single security",
      "B": "A guarantee against loss of principal",
      "C": "Access only to foreign securities",
      "D": "Fixed annual interest payments like a bond"
    },
    "correct_answer": "A",
    "explanation": "Broad market ETFs hold diversified baskets of stocks tracking indices such as the S&P 500 or total market indexes.",
    "keyword_tags": [
      "broad market ETF",
      "diversification",
      "ETFs"
    ],
    "learning_objective": "Describe benefits of broad market ETFs",
    "remediation_tip": "One share provides instant diversification across many companies."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "medium",
    "prompt": "Settlement for ETF trades on exchanges generally follows:",
    "choices": {
      "A": "Same-day cash settlement only",
      "B": "Regular-way equity settlement time frames",
      "C": "Thirty-day deferred settlement",
      "D": "Settlement only at fund month-end"
    },
    "correct_answer": "B",
    "explanation": "As of 2026, ETFs settle like stocks on the T+1 regular-way equity settlement cycle.",
    "keyword_tags": [
      "settlement",
      "ETF trading",
      "T+1"
    ],
    "learning_objective": "Know ETF settlement conventions",
    "remediation_tip": "T+1 settlement affects cash availability and good-faith violations in cash accounts."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "hard",
    "prompt": "A customer comparing a closed-end fund and an ETF notices both trade on an exchange. A key similarity is:",
    "choices": {
      "A": "Both redeem shares daily at NAV with the issuer",
      "B": "Both can trade at prices different from NAV",
      "C": "Both are issued only in the primary market",
      "D": "Neither holds a portfolio of securities"
    },
    "correct_answer": "B",
    "explanation": "Exchange trading means both can trade at premiums or discounts relative to portfolio value.",
    "keyword_tags": [
      "closed-end fund",
      "premium discount",
      "ETFs"
    ],
    "learning_objective": "Compare ETFs and closed-end funds trading characteristics",
    "remediation_tip": "ETF arbitrage mechanisms often keep prices closer to NAV than closed-end funds."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "ETFs",
    "difficulty": "medium",
    "prompt": "An investor using a limit order to buy an ETF is attempting to:",
    "choices": {
      "A": "Purchase at the best available price with no price control",
      "B": "Set the maximum price they will pay for the ETF shares",
      "C": "Avoid all brokerage commissions",
      "D": "Buy directly from the fund at NAV"
    },
    "correct_answer": "B",
    "explanation": "Limit orders specify the highest price a buyer will pay, controlling execution cost on ETFs.",
    "keyword_tags": [
      "limit order",
      "ETF trading",
      "ETFs"
    ],
    "learning_objective": "Apply order types to ETF transactions",
    "remediation_tip": "Market orders execute quickly but may pay wider spreads in illiquid ETFs."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "REITs",
    "difficulty": "easy",
    "prompt": "A Real Estate Investment Trust (REIT) is a company that:",
    "choices": {
      "A": "Owns or finances income-producing real estate and distributes income to shareholders",
      "B": "Issues only municipal bonds for housing authorities",
      "C": "Guarantees property values against market declines",
      "D": "Operates exclusively as a hedge fund"
    },
    "correct_answer": "A",
    "explanation": "REITs pool investor capital to own or finance real estate and pass income through to investors.",
    "keyword_tags": [
      "REIT",
      "real estate",
      "income distribution"
    ],
    "learning_objective": "Define REIT structure and purpose",
    "remediation_tip": "REITs must meet IRS requirements including income distribution thresholds."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "REITs",
    "difficulty": "medium",
    "prompt": "Equity REITs primarily generate income from:",
    "choices": {
      "A": "Originating and holding mortgages",
      "B": "Owning and operating properties that collect rent",
      "C": "Trading Treasury STRIPS",
      "D": "Writing options on commodities"
    },
    "correct_answer": "B",
    "explanation": "Equity REITs own physical properties—apartments, offices, malls—and earn rental income.",
    "keyword_tags": [
      "equity REIT",
      "rental income",
      "REITs"
    ],
    "learning_objective": "Distinguish equity REITs from mortgage REITs",
    "remediation_tip": "Mortgage REITs lend money or hold mortgages rather than operating buildings."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "REITs",
    "difficulty": "medium",
    "prompt": "Mortgage REITs (mREITs) are most exposed to:",
    "choices": {
      "A": "Tenant vacancy in shopping malls only",
      "B": "Interest rate changes and credit spreads on loans",
      "C": "Crop failures in agricultural regions",
      "D": "Currency pegs in emerging markets"
    },
    "correct_answer": "B",
    "explanation": "mREITs profit from the spread between borrowing costs and mortgage yields, making them rate-sensitive.",
    "keyword_tags": [
      "mortgage REIT",
      "interest rate risk",
      "REITs"
    ],
    "learning_objective": "Identify risks specific to mortgage REITs",
    "remediation_tip": "Compare equity REIT property risk vs mREIT financing risk."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "REITs",
    "difficulty": "hard",
    "prompt": "To qualify as a REIT, a company must distribute at least what percentage of taxable income to shareholders annually?",
    "choices": {
      "A": "50%",
      "B": "75%",
      "C": "90%",
      "D": "100%"
    },
    "correct_answer": "C",
    "explanation": "REITs must pay out at least 90% of taxable income as dividends to maintain REIT tax status.",
    "keyword_tags": [
      "REIT qualification",
      "distribution requirement",
      "REITs"
    ],
    "learning_objective": "Know REIT income distribution requirements",
    "remediation_tip": "High payout ratios can limit reinvestment for growth."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "REITs",
    "difficulty": "medium",
    "prompt": "REIT dividends paid to investors are generally taxed as:",
    "choices": {
      "A": "Tax-free return of principal only",
      "B": "Ordinary income, capital gains, or return of capital components",
      "C": "Always long-term capital gains",
      "D": "Exempt from all federal taxes"
    },
    "correct_answer": "B",
    "explanation": "REIT distributions may include ordinary income, capital gains, and return of capital, each with different tax treatment.",
    "keyword_tags": [
      "REIT taxation",
      "dividends",
      "REITs"
    ],
    "learning_objective": "Understand REIT dividend tax character",
    "remediation_tip": "Review the year-end 1099-DIV breakdown for each component."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "REITs",
    "difficulty": "easy",
    "prompt": "Publicly traded REITs offer investors liquidity because they:",
    "choices": {
      "A": "Can only be redeemed quarterly at NAV",
      "B": "Trade on major stock exchanges",
      "C": "Require a 10-year holding period",
      "D": "Are sold exclusively through life insurance agents"
    },
    "correct_answer": "B",
    "explanation": "Listed REIT shares trade on exchanges, unlike many non-traded REITs with limited liquidity.",
    "keyword_tags": [
      "publicly traded REIT",
      "liquidity",
      "REITs"
    ],
    "learning_objective": "Compare liquidity of traded vs non-traded REITs",
    "remediation_tip": "Non-traded REITs may have redemption programs with limits and delays."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "REITs",
    "difficulty": "medium",
    "prompt": "A hybrid REIT holds:",
    "choices": {
      "A": "Only U.S. Treasury inflation-protected securities",
      "B": "Both physical properties and mortgage loans",
      "C": "Exclusively foreign currency contracts",
      "D": "Only undeveloped land with no income"
    },
    "correct_answer": "B",
    "explanation": "Hybrid REITs combine equity (property ownership) and mortgage (lending) activities.",
    "keyword_tags": [
      "hybrid REIT",
      "REITs",
      "real estate"
    ],
    "learning_objective": "Identify hybrid REIT investment activities",
    "remediation_tip": "Know the three REIT types: equity, mortgage, and hybrid."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "REITs",
    "difficulty": "hard",
    "prompt": "Rising interest rates typically pressure REIT share prices primarily because:",
    "choices": {
      "A": "REITs must delist from exchanges",
      "B": "Higher rates increase borrowing costs and compete with REIT yields",
      "C": "REITs lose their tax status immediately",
      "D": "Rental income becomes illegal under federal law"
    },
    "correct_answer": "B",
    "explanation": "REITs use leverage and compete with bonds for yield-seeking investors; higher rates can reduce relative attractiveness.",
    "keyword_tags": [
      "interest rate risk",
      "REITs",
      "investment risks"
    ],
    "learning_objective": "Explain interest rate sensitivity of REIT investments",
    "remediation_tip": "Not all REIT sectors react identically—some are more defensive."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "REITs",
    "difficulty": "medium",
    "prompt": "Non-traded REITs are characterized by:",
    "choices": {
      "A": "Daily exchange trading at market prices",
      "B": "Limited liquidity, often with periodic redemption programs",
      "C": "SEC exemption from all disclosure",
      "D": "Guaranteed NAV appreciation"
    },
    "correct_answer": "B",
    "explanation": "Non-traded REITs do not trade on exchanges; liquidity is limited and may come through sponsor redemption plans.",
    "keyword_tags": [
      "non-traded REIT",
      "liquidity risk",
      "REITs"
    ],
    "learning_objective": "Assess liquidity risks of non-traded REITs",
    "remediation_tip": "Review offering documents for redemption frequency and limits."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "REITs",
    "difficulty": "easy",
    "prompt": "Investing in a REIT allows shareholders to gain real estate exposure without:",
    "choices": {
      "A": "Any market risk",
      "B": "Directly buying and managing physical property",
      "C": "Receiving any income distributions",
      "D": "Paying taxes on dividends"
    },
    "correct_answer": "B",
    "explanation": "REITs provide indirect real estate investment with professional management and smaller capital requirements.",
    "keyword_tags": [
      "real estate exposure",
      "REITs",
      "diversification"
    ],
    "learning_objective": "Explain indirect real estate investment through REITs",
    "remediation_tip": "REITs still carry property market and economic risks."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "REITs",
    "difficulty": "medium",
    "prompt": "Occupancy rates are a key performance metric for:",
    "choices": {
      "A": "Mortgage REITs holding only Treasury bonds",
      "B": "Equity REITs that lease space to tenants",
      "C": "Money market mutual funds",
      "D": "Variable annuity subaccounts only"
    },
    "correct_answer": "B",
    "explanation": "Higher occupancy supports rental revenue for property-owning equity REITs.",
    "keyword_tags": [
      "occupancy rate",
      "equity REIT",
      "REITs"
    ],
    "learning_objective": "Interpret REIT operating metrics",
    "remediation_tip": "Pair occupancy with lease terms and tenant credit quality."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "REITs",
    "difficulty": "hard",
    "prompt": "A REIT's use of leverage (borrowing) increases:",
    "choices": {
      "A": "FDIC insurance on shares",
      "B": "Potential returns and financial risk",
      "C": "Guaranteed dividend stability",
      "D": "Exemption from SEC reporting"
    },
    "correct_answer": "B",
    "explanation": "Debt can amplify returns in strong markets but increases vulnerability in downturns or when rates rise.",
    "keyword_tags": [
      "leverage",
      "REITs",
      "investment risks"
    ],
    "learning_objective": "Evaluate leverage risk in REIT capital structures",
    "remediation_tip": "Review debt ratios and interest coverage in REIT analysis."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "REITs",
    "difficulty": "medium",
    "prompt": "REITs may serve as a partial inflation hedge over time because:",
    "choices": {
      "A": "Real estate rents and property values may rise with inflation",
      "B": "REIT dividends are indexed to CPI by law",
      "C": "REITs hold only fixed-rate Treasuries",
      "D": "REIT shares are backed by the FDIC"
    },
    "correct_answer": "A",
    "explanation": "Tangible real estate income streams can adjust over time, though REIT stocks remain volatile.",
    "keyword_tags": [
      "inflation hedge",
      "REITs",
      "real estate"
    ],
    "learning_objective": "Discuss REIT role in inflation environments",
    "remediation_tip": "REITs are not perfect inflation hedges—stock prices fluctuate."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "REITs",
    "difficulty": "easy",
    "prompt": "Shares of a REIT represent:",
    "choices": {
      "A": "Direct deed ownership of a single apartment unit",
      "B": "Ownership interest in a company that holds a real estate portfolio",
      "C": "A municipal bond backed by property taxes",
      "D": "A call option on land"
    },
    "correct_answer": "B",
    "explanation": "Investors own stock in the REIT entity, not direct title to individual properties.",
    "keyword_tags": [
      "REIT ownership",
      "REITs",
      "equity securities"
    ],
    "learning_objective": "Clarify what REIT shareholders actually own",
    "remediation_tip": "Contrast REIT shares with direct property ownership and landlord duties."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "easy",
    "prompt": "A call option gives the holder the right to:",
    "choices": {
      "A": "Sell 100 shares of stock at the strike price",
      "B": "Buy 100 shares of stock at the strike price",
      "C": "Receive a dividend from the OCC",
      "D": "Cancel a margin loan at any price"
    },
    "correct_answer": "B",
    "explanation": "A call grants the right, not the obligation, to purchase the underlying at the strike price before expiration.",
    "keyword_tags": [
      "call option",
      "options basics",
      "strike price"
    ],
    "learning_objective": "Define call option holder rights",
    "remediation_tip": "Standard equity options cover 100 shares per contract."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "easy",
    "prompt": "A put option gives the holder the right to:",
    "choices": {
      "A": "Buy stock at the strike price",
      "B": "Sell stock at the strike price",
      "C": "Receive interest on a bond",
      "D": "Convert bonds to common stock"
    },
    "correct_answer": "B",
    "explanation": "A put grants the right to sell the underlying at the strike price, useful for hedging or bearish strategies.",
    "keyword_tags": [
      "put option",
      "options basics",
      "strike price"
    ],
    "learning_objective": "Define put option holder rights",
    "remediation_tip": "Long puts profit when the underlying price falls below the strike (minus premium)."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "medium",
    "prompt": "The premium of an option represents:",
    "choices": {
      "A": "The strike price of the contract",
      "B": "The price the buyer pays for the option contract",
      "C": "The dividend per share",
      "D": "The margin requirement for the underlying stock"
    },
    "correct_answer": "B",
    "explanation": "Premium is the market price of the option, paid by the buyer to the seller (writer).",
    "keyword_tags": [
      "option premium",
      "options basics",
      "options pricing"
    ],
    "learning_objective": "Define option premium",
    "remediation_tip": "Premium = intrinsic value + time value (for American options before expiration)."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "medium",
    "prompt": "A call option is in-the-money when the market price of the stock is:",
    "choices": {
      "A": "Below the strike price",
      "B": "Above the strike price",
      "C": "Equal to the strike price",
      "D": "Unchanged from purchase date"
    },
    "correct_answer": "B",
    "explanation": "Calls are ITM when the stock price exceeds the strike, giving exercise economic value.",
    "keyword_tags": [
      "in-the-money",
      "call option",
      "options basics"
    ],
    "learning_objective": "Determine moneyness for call options",
    "remediation_tip": "ITM calls have intrinsic value; OTM calls have only time value."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "medium",
    "prompt": "A put option is out-of-the-money when the stock price is:",
    "choices": {
      "A": "Below the strike price",
      "B": "Above the strike price",
      "C": "Equal to zero",
      "D": "Equal to the premium"
    },
    "correct_answer": "B",
    "explanation": "Puts are OTM when the stock trades above the strike; exercising would not be advantageous.",
    "keyword_tags": [
      "out-of-the-money",
      "put option",
      "options basics"
    ],
    "learning_objective": "Determine moneyness for put options",
    "remediation_tip": "ATM means stock price approximately equals strike price."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "hard",
    "prompt": "An investor buys a call with a $50 strike when the stock is at $55. The intrinsic value is:",
    "choices": {
      "A": "$0",
      "B": "$5",
      "C": "$50",
      "D": "$55"
    },
    "correct_answer": "B",
    "explanation": "Intrinsic value for a call = stock price − strike = $55 − $50 = $5 per share ($500 per contract).",
    "keyword_tags": [
      "intrinsic value",
      "call option",
      "options basics"
    ],
    "learning_objective": "Calculate option intrinsic value",
    "remediation_tip": "If stock were at $48, a $50 call intrinsic value would be zero."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "hard",
    "prompt": "A put option with a $40 strike is purchased when the stock is at $35. The intrinsic value per share is:",
    "choices": {
      "A": "$0",
      "B": "$5",
      "C": "$35",
      "D": "$40"
    },
    "correct_answer": "B",
    "explanation": "Put intrinsic value = strike − stock price = $40 − $35 = $5.",
    "keyword_tags": [
      "intrinsic value",
      "put option",
      "options basics"
    ],
    "learning_objective": "Calculate put option intrinsic value",
    "remediation_tip": "Total contract intrinsic value = per-share value × 100."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "medium",
    "prompt": "Time value in an option premium equals:",
    "choices": {
      "A": "The strike price minus the stock price always",
      "B": "The portion of premium exceeding intrinsic value",
      "C": "The dividend yield on the underlying",
      "D": "The margin interest rate"
    },
    "correct_answer": "B",
    "explanation": "Time value reflects the possibility the option could gain more intrinsic value before expiration.",
    "keyword_tags": [
      "time value",
      "options basics",
      "option premium"
    ],
    "learning_objective": "Separate intrinsic and time value components",
    "remediation_tip": "At expiration, time value approaches zero."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "easy",
    "prompt": "The Options Clearing Corporation (OCC) acts as:",
    "choices": {
      "A": "The issuer of all corporate bonds",
      "B": "The central counterparty guaranteeing standardized option contracts",
      "C": "A municipal bond rating agency",
      "D": "A mutual fund transfer agent"
    },
    "correct_answer": "B",
    "explanation": "OCC clears and guarantees exchange-traded options, reducing counterparty risk.",
    "keyword_tags": [
      "OCC",
      "options clearing",
      "options basics"
    ],
    "learning_objective": "Explain OCC role in options markets",
    "remediation_tip": "Standardization includes contract size, expiration dates, and strike intervals."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "medium",
    "prompt": "American-style options may be exercised:",
    "choices": {
      "A": "Only at expiration",
      "B": "At any time up to and including expiration",
      "C": "Only if the stock pays a dividend",
      "D": "Only by institutional investors"
    },
    "correct_answer": "B",
    "explanation": "American options allow early exercise; most U.S. equity options are American-style.",
    "keyword_tags": [
      "American-style",
      "exercise",
      "options basics"
    ],
    "learning_objective": "Distinguish American vs European exercise styles",
    "remediation_tip": "Index options are often European-style—check contract specifications."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "medium",
    "prompt": "An investor who writes (sells) an uncovered call option faces:",
    "choices": {
      "A": "Limited risk equal to the premium received",
      "B": "Potentially unlimited risk if the stock rises sharply",
      "C": "No obligation if the option expires",
      "D": "FDIC protection on losses"
    },
    "correct_answer": "B",
    "explanation": "Uncovered call writers must deliver stock if assigned, with theoretically unlimited upside risk on the stock.",
    "keyword_tags": [
      "uncovered call",
      "option writer",
      "options basics"
    ],
    "learning_objective": "Assess risk of writing uncovered options",
    "remediation_tip": "Writing options obligates the writer—unlike the holder's right to exercise."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "hard",
    "prompt": "A covered call strategy involves:",
    "choices": {
      "A": "Owning the underlying stock and writing a call against it",
      "B": "Buying a put and call on different stocks",
      "C": "Writing a put without cash reserves",
      "D": "Buying calls on margin without owning shares"
    },
    "correct_answer": "A",
    "explanation": "The investor owns shares and sells calls, generating premium income with limited upside above the strike.",
    "keyword_tags": [
      "covered call",
      "options basics",
      "income strategy"
    ],
    "learning_objective": "Describe covered call construction and objectives",
    "remediation_tip": "Covered calls cap upside but generate income from premiums."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "medium",
    "prompt": "A protective put strategy is used to:",
    "choices": {
      "A": "Speculate on unlimited stock declines with no stock ownership",
      "B": "Hedge a stock position against downside risk by owning puts",
      "C": "Eliminate all investment risk",
      "D": "Generate tax-free income"
    },
    "correct_answer": "B",
    "explanation": "Owning stock plus a put limits downside (floor) while preserving upside minus premium paid.",
    "keyword_tags": [
      "protective put",
      "hedging",
      "options basics"
    ],
    "learning_objective": "Explain protective put risk management",
    "remediation_tip": "Think of a protective put as portfolio insurance."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "easy",
    "prompt": "If an option expires out-of-the-money, the holder will typically:",
    "choices": {
      "A": "Be required to exercise",
      "B": "Allow it to expire worthless",
      "C": "Receive the strike price in cash",
      "D": "Automatically sell the underlying stock"
    },
    "correct_answer": "B",
    "explanation": "An OTM option has no exercise value; the holder loses the premium paid.",
    "keyword_tags": [
      "expiration",
      "out-of-the-money",
      "options basics"
    ],
    "learning_objective": "Understand option expiration outcomes",
    "remediation_tip": "Writers keep the premium if options expire worthless."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "medium",
    "prompt": "Closing an options position before expiration is done by:",
    "choices": {
      "A": "Exercising the option only",
      "B": "Entering an offsetting transaction in the market",
      "C": "Filing a Form U4",
      "D": "Requesting a stock split"
    },
    "correct_answer": "B",
    "explanation": "Most positions are closed by trading the opposite side (buy to close a short, sell to close a long).",
    "keyword_tags": [
      "closing transaction",
      "options basics",
      "offsetting trade"
    ],
    "learning_objective": "Explain how to close options positions",
    "remediation_tip": "Exercise is one alternative but not required to realize gains or losses."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "hard",
    "prompt": "An investor buys one call contract at a $3 premium. Maximum loss is:",
    "choices": {
      "A": "$3",
      "B": "$300",
      "C": "$30,000",
      "D": "Unlimited"
    },
    "correct_answer": "B",
    "explanation": "One contract = 100 shares. Maximum loss for a long option is the premium paid: $3 × 100 = $300.",
    "keyword_tags": [
      "maximum loss",
      "long call",
      "options basics"
    ],
    "learning_objective": "Calculate maximum loss on long option positions",
    "remediation_tip": "Long options have limited risk (premium); short options can have substantial risk."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "medium",
    "prompt": "The strike price of an option is:",
    "choices": {
      "A": "The current market price of the stock always",
      "B": "The predetermined price at which the underlying can be bought or sold",
      "C": "The OCC guarantee fund limit",
      "D": "The commission charged by the broker"
    },
    "correct_answer": "B",
    "explanation": "Strike price is fixed in the contract and determines moneyness and exercise economics.",
    "keyword_tags": [
      "strike price",
      "options basics",
      "contract terms"
    ],
    "learning_objective": "Define strike price in option contracts",
    "remediation_tip": "Match strike selection to the investor's outlook and risk tolerance."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "easy",
    "prompt": "Standardized exchange-traded equity options represent how many shares of the underlying?",
    "choices": {
      "A": "10",
      "B": "50",
      "C": "100",
      "D": "1,000"
    },
    "correct_answer": "C",
    "explanation": "One equity option contract typically covers 100 shares of the underlying stock.",
    "keyword_tags": [
      "contract size",
      "options basics",
      "standardization"
    ],
    "learning_objective": "Know standard equity option contract size",
    "remediation_tip": "Multiply per-share values by 100 for per-contract dollar amounts."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "medium",
    "prompt": "A bullish investor expecting moderate stock appreciation might consider:",
    "choices": {
      "A": "Buying a put",
      "B": "Buying a call",
      "C": "Writing a covered call only if willing to cap upside",
      "D": "Selling uncovered puts without cash"
    },
    "correct_answer": "B",
    "explanation": "Long calls benefit from rising stock prices. Covered calls are bullish to neutral with income.",
    "keyword_tags": [
      "bullish strategy",
      "call option",
      "options basics"
    ],
    "learning_objective": "Match option strategies to market outlook",
    "remediation_tip": "Strategy choice depends on risk tolerance and income vs growth goals."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "hard",
    "prompt": "An investor owns stock purchased at $60 and buys a $55 put for $2. If the stock falls to $45 at expiration, the net result per share is approximately:",
    "choices": {
      "A": "A $7 loss",
      "B": "A $3 profit",
      "C": "A $10 profit",
      "D": "A $15 loss"
    },
    "correct_answer": "A",
    "explanation": "Stock loses $15 ($60 to $45). The put gains $8 intrinsic value minus $2 premium = $8 net on the put. Combined: −$15 + $8 = −$7 per share.",
    "keyword_tags": [
      "protective put",
      "options basics",
      "profit loss"
    ],
    "learning_objective": "Calculate combined stock and protective put outcomes",
    "remediation_tip": "Protective puts limit downside but do not eliminate loss from premium and strike gap."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "medium",
    "prompt": "A bearish investor who owns no stock might consider buying:",
    "choices": {
      "A": "A call option",
      "B": "A put option",
      "C": "A covered call",
      "D": "An uncovered call"
    },
    "correct_answer": "B",
    "explanation": "Long puts increase in value as the underlying price falls, profiting from bearish moves without owning stock.",
    "keyword_tags": [
      "bearish strategy",
      "put option",
      "options basics"
    ],
    "learning_objective": "Select option strategies for bearish outlooks",
    "remediation_tip": "Short selling stock is another bearish approach with different risk profile."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "hard",
    "prompt": "An investor sells an uncovered put and receives a $4 premium. If assigned when the stock is $38 and the strike is $40, the effective purchase price per share is:",
    "choices": {
      "A": "$38",
      "B": "$36",
      "C": "$42",
      "D": "$34"
    },
    "correct_answer": "B",
    "explanation": "Assignment requires buying at $40 strike. Net cost = $40 − $4 premium = $36 per share.",
    "keyword_tags": [
      "uncovered put",
      "assignment",
      "options basics"
    ],
    "learning_objective": "Calculate net cost after put assignment",
    "remediation_tip": "Cash-secured put writers should be willing to own the stock at the net price."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "medium",
    "prompt": "The expiration date of an option contract is significant because:",
    "choices": {
      "A": "After expiration the holder may exercise at any time",
      "B": "After expiration the option ceases to exist except for settlement of exercised contracts",
      "C": "Expiration resets the strike price",
      "D": "Expiration eliminates all stock market risk"
    },
    "correct_answer": "B",
    "explanation": "Options are wasting assets; after expiration unexercised contracts expire worthless.",
    "keyword_tags": [
      "expiration date",
      "options basics",
      "time decay"
    ],
    "learning_objective": "Understand option expiration mechanics",
    "remediation_tip": "Time decay accelerates as expiration approaches."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "easy",
    "prompt": "When an option holder exercises a call, the writer must:",
    "choices": {
      "A": "Deliver the underlying stock at the strike price",
      "B": "Cancel all other open orders",
      "C": "Repurchase the option at double premium",
      "D": "File a registration statement with the SEC"
    },
    "correct_answer": "A",
    "explanation": "Call writers are obligated to deliver shares upon assignment when the holder exercises.",
    "keyword_tags": [
      "exercise",
      "option writer",
      "options basics"
    ],
    "learning_objective": "Explain writer obligations upon exercise",
    "remediation_tip": "Assignment can occur at any time for American-style options."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "medium",
    "prompt": "Options provide leverage because:",
    "choices": {
      "A": "They always cost more than buying the stock outright",
      "B": "A relatively small premium controls exposure to 100 shares of stock",
      "C": "They eliminate the need for margin",
      "D": "They guarantee profits in volatile markets"
    },
    "correct_answer": "B",
    "explanation": "A modest premium can provide significant exposure to price moves in the underlying.",
    "keyword_tags": [
      "leverage",
      "options basics",
      "risk reward"
    ],
    "learning_objective": "Explain leverage characteristics of options",
    "remediation_tip": "Leverage magnifies both gains and losses."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "options basics",
    "difficulty": "hard",
    "prompt": "A call option with a $30 strike trades at $4 when the stock is at $33. The time value per share is:",
    "choices": {
      "A": "$0",
      "B": "$1",
      "C": "$3",
      "D": "$4"
    },
    "correct_answer": "B",
    "explanation": "Intrinsic value = $33 − $30 = $3. Premium $4 − intrinsic $3 = $1 time value per share.",
    "keyword_tags": [
      "time value",
      "intrinsic value",
      "options basics"
    ],
    "learning_objective": "Calculate time value from premium and intrinsic value",
    "remediation_tip": "ATM and OTM options consist entirely of time value."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "annuity basics",
    "difficulty": "easy",
    "prompt": "A fixed annuity guarantees:",
    "choices": {
      "A": "Returns tied directly to a stock index with no minimum",
      "B": "A specified minimum rate of interest on the insurer's general account",
      "C": "Daily liquidity with no surrender charges",
      "D": "SEC registration like a mutual fund"
    },
    "correct_answer": "B",
    "explanation": "Fixed annuities credit interest at rates set by the contract, backed by the insurance company's general account.",
    "keyword_tags": [
      "fixed annuity",
      "annuity basics",
      "insurance products"
    ],
    "learning_objective": "Describe fixed annuity features",
    "remediation_tip": "Fixed annuities are insurance products, not securities in typical form."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "annuity basics",
    "difficulty": "medium",
    "prompt": "A variable annuity invests primarily in:",
    "choices": {
      "A": "Only U.S. Treasury bills",
      "B": "Separate account subaccounts selected by the contract owner",
      "C": "Municipal bond pools exclusively",
      "D": "FDIC-insured CDs"
    },
    "correct_answer": "B",
    "explanation": "Variable annuity assets are held in separate accounts, often resembling mutual fund portfolios.",
    "keyword_tags": [
      "variable annuity",
      "separate account",
      "annuity basics"
    ],
    "learning_objective": "Explain variable annuity investment structure",
    "remediation_tip": "Separate account assets are insulated from the insurer's general account creditors."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "annuity basics",
    "difficulty": "medium",
    "prompt": "An indexed annuity (fixed indexed annuity) credits interest based on:",
    "choices": {
      "A": "A formula linked to an equity index with caps, spreads, or participation rates",
      "B": "Daily trading on a stock exchange",
      "C": "Federal Reserve discount rate only",
      "D": "Unlimited upside with no minimum return"
    },
    "correct_answer": "A",
    "explanation": "Indexed annuities link returns to an index but typically guarantee principal with limited upside through contract terms.",
    "keyword_tags": [
      "indexed annuity",
      "annuity basics",
      "insurance products"
    ],
    "learning_objective": "Understand indexed annuity return mechanics",
    "remediation_tip": "Read caps, participation rates, and floors in the contract."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "annuity basics",
    "difficulty": "easy",
    "prompt": "An immediate annuity begins payments:",
    "choices": {
      "A": "Within one year of purchase, typically within 30 days",
      "B": "Only after the owner reaches age 70½",
      "C": "Never; only lump sums are allowed",
      "D": "Only upon stock market correction"
    },
    "correct_answer": "A",
    "explanation": "Immediate annuities start the income stream shortly after a lump-sum premium is paid.",
    "keyword_tags": [
      "immediate annuity",
      "annuitization",
      "annuity basics"
    ],
    "learning_objective": "Distinguish immediate from deferred annuities",
    "remediation_tip": "Deferred annuities accumulate before payouts begin."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "annuity basics",
    "difficulty": "medium",
    "prompt": "A deferred annuity is designed primarily for:",
    "choices": {
      "A": "Instant pension payments at purchase",
      "B": "Tax-deferred accumulation during a savings phase",
      "C": "Day trading of options",
      "D": "Short-term cash management only"
    },
    "correct_answer": "B",
    "explanation": "Deferred annuities have an accumulation period before annuitization or withdrawal.",
    "keyword_tags": [
      "deferred annuity",
      "tax deferral",
      "annuity basics"
    ],
    "learning_objective": "Explain deferred annuity accumulation phase",
    "remediation_tip": "Owners may later annuitize, withdraw, or surrender depending on contract terms."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "annuity basics",
    "difficulty": "hard",
    "prompt": "Annuitization converts the annuity account value into:",
    "choices": {
      "A": "A margin loan",
      "B": "A stream of periodic payments based on contract options",
      "C": "Common stock in the insurer",
      "D": "A mutual fund NAV"
    },
    "correct_answer": "B",
    "explanation": "Annuitization exchanges the lump sum for guaranteed periodic payments under selected settlement options.",
    "keyword_tags": [
      "annuitization",
      "payout phase",
      "annuity basics"
    ],
    "learning_objective": "Define annuitization and payout phase",
    "remediation_tip": "Once annuitized, the decision is generally irrevocable."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "annuity basics",
    "difficulty": "medium",
    "prompt": "Surrender charges on annuities typically apply when:",
    "choices": {
      "A": "The owner withdraws more than allowed during the early contract years",
      "B": "The insurer pays the death benefit",
      "C": "The owner reaches age 59½",
      "D": "Interest rates fall below 2%"
    },
    "correct_answer": "A",
    "explanation": "Surrender charges decline over a schedule and penalize early withdrawals above free amounts.",
    "keyword_tags": [
      "surrender charge",
      "annuity basics",
      "liquidity risk"
    ],
    "learning_objective": "Understand annuity surrender charge schedules",
    "remediation_tip": "Many contracts allow annual free withdrawal percentages."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "annuity basics",
    "difficulty": "easy",
    "prompt": "Growth inside a non-qualified annuity is generally:",
    "choices": {
      "A": "Tax-free forever with no withdrawal taxes",
      "B": "Tax-deferred until withdrawn",
      "C": "Taxable annually like a savings account",
      "D": "Exempt only for corporate buyers"
    },
    "correct_answer": "B",
    "explanation": "Earnings grow tax-deferred until distribution, when ordinary income tax may apply.",
    "keyword_tags": [
      "tax deferral",
      "annuity basics",
      "taxation"
    ],
    "learning_objective": "Know tax-deferred growth feature of annuities",
    "remediation_tip": "Qualified annuities in IRAs are taxed on withdrawal like other IRA assets."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "annuity basics",
    "difficulty": "hard",
    "prompt": "Withdrawals from an annuity before age 59½ may incur:",
    "choices": {
      "A": "Only state sales tax",
      "B": "A 10% federal penalty in addition to ordinary income tax on earnings",
      "C": "Capital gains treatment automatically",
      "D": "No tax consequences"
    },
    "correct_answer": "B",
    "explanation": "IRS rules generally impose a 10% penalty on early withdrawals of taxable earnings, with exceptions.",
    "keyword_tags": [
      "10% penalty",
      "early withdrawal",
      "annuity basics"
    ],
    "learning_objective": "Apply early withdrawal penalty rules to annuities",
    "remediation_tip": "Exceptions exist for death, disability, and certain annuity payments."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "annuity basics",
    "difficulty": "medium",
    "prompt": "A death benefit rider on a variable annuity typically guarantees:",
    "choices": {
      "A": "That beneficiaries receive at least a specified minimum, often the greater of purchase payments or account value",
      "B": "That the separate account beats the S&P 500 annually",
      "C": "FDIC insurance on the full account",
      "D": "Tax-free inheritance in all cases"
    },
    "correct_answer": "A",
    "explanation": "Death benefit riders can protect beneficiaries if account value falls below premiums paid.",
    "keyword_tags": [
      "death benefit rider",
      "variable annuity",
      "annuity basics"
    ],
    "learning_objective": "Explain variable annuity death benefit features",
    "remediation_tip": "Riders may carry additional fees—review the contract."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "annuity basics",
    "difficulty": "medium",
    "prompt": "Variable annuities are considered securities because they involve:",
    "choices": {
      "A": "Only fixed guaranteed returns",
      "B": "Investment risk in separate account subaccounts",
      "C": "Municipal tax exemption",
      "D": "FDIC deposit insurance"
    },
    "correct_answer": "B",
    "explanation": "Variable annuity separate accounts invest in securities, requiring prospectus delivery and registration.",
    "keyword_tags": [
      "variable annuity",
      "SEC registration",
      "annuity basics"
    ],
    "learning_objective": "Distinguish variable annuities from fixed annuities regulatorily",
    "remediation_tip": "Fixed annuities are primarily insurance products regulated by state insurance departments."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "annuity basics",
    "difficulty": "easy",
    "prompt": "Joint and survivor annuity settlement options provide:",
    "choices": {
      "A": "Payments only to the first owner who dies",
      "B": "Income continuing to a surviving annuitant, often at a reduced rate",
      "C": "Lump sum only with no periodic payments",
      "D": "Payments indexed to commodity prices"
    },
    "correct_answer": "B",
    "explanation": "Joint and survivor options pay while either annuitant lives, commonly at 50% or 100% to survivor.",
    "keyword_tags": [
      "joint and survivor",
      "settlement options",
      "annuity basics"
    ],
    "learning_objective": "Identify common annuity payout settlement options",
    "remediation_tip": "Higher survivor percentages reduce initial payment amounts."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "annuity basics",
    "difficulty": "hard",
    "prompt": "The exclusion ratio applies when annuity payments represent:",
    "choices": {
      "A": "Only return of principal excluded from tax and earnings taxed as ordinary income",
      "B": "Entirely tax-free income",
      "C": "Only capital gains treatment",
      "D": "AMT preference items only"
    },
    "correct_answer": "A",
    "explanation": "Part of each payment is excluded as return of principal; the remainder is taxable earnings.",
    "keyword_tags": [
      "exclusion ratio",
      "annuity taxation",
      "annuity basics"
    ],
    "learning_objective": "Understand annuity payment tax exclusion ratio",
    "remediation_tip": "After principal is recovered, payments are fully taxable."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "annuity basics",
    "difficulty": "medium",
    "prompt": "An annuity is generally LEAST suitable for an investor who:",
    "choices": {
      "A": "Needs long-term retirement income and tax deferral",
      "B": "Requires full liquidity for short-term goals and may need immediate access to all funds",
      "C": "Has maximized other retirement accounts",
      "D": "Seeks guaranteed lifetime payout options"
    },
    "correct_answer": "B",
    "explanation": "Surrender charges and tax penalties make annuities poor choices for short-term or highly liquid needs.",
    "keyword_tags": [
      "suitability",
      "liquidity risk",
      "annuity basics"
    ],
    "learning_objective": "Assess annuity suitability for client objectives",
    "remediation_tip": "Match product illiquidity to the client's time horizon."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "annuity basics",
    "difficulty": "medium",
    "prompt": "Guaranteed minimum income benefit (GMIB) riders on variable annuities promise:",
    "choices": {
      "A": "Unlimited stock market returns",
      "B": "A minimum income base for annuitization regardless of poor investment performance",
      "C": "Elimination of all mortality risk",
      "D": "SEC insurance on separate accounts"
    },
    "correct_answer": "B",
    "explanation": "GMIB riders guarantee a minimum benefit base for converting to income even if investments underperform.",
    "keyword_tags": [
      "GMIB",
      "rider",
      "variable annuity"
    ],
    "learning_objective": "Describe guaranteed minimum income benefit riders",
    "remediation_tip": "Riders add cost and have specific triggering conditions."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "annuity basics",
    "difficulty": "easy",
    "prompt": "Life insurance companies issue annuities primarily to provide:",
    "choices": {
      "A": "Margin loans to broker-dealers",
      "B": "Long-term income and accumulation products",
      "C": "Currency exchange services",
      "D": "Municipal bond underwriting"
    },
    "correct_answer": "B",
    "explanation": "Annuities are insurance company products for retirement income and tax-deferred savings.",
    "keyword_tags": [
      "life insurance company",
      "annuity basics",
      "insurance products"
    ],
    "learning_objective": "Identify annuity issuers and product purpose",
    "remediation_tip": "Creditworthiness of the insurer matters for fixed and guaranteed features."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "easy",
    "prompt": "Market risk is the risk that:",
    "choices": {
      "A": "A single company will default on its bonds",
      "B": "Securities prices will decline due to overall market movements",
      "C": "An investor cannot find a buyer quickly",
      "D": "Inflation will exceed 10% annually"
    },
    "correct_answer": "B",
    "explanation": "Market (systematic) risk affects broad segments of the market and cannot be eliminated through diversification alone.",
    "keyword_tags": [
      "market risk",
      "systematic risk",
      "investment risks"
    ],
    "learning_objective": "Define market risk and its systematic nature",
    "remediation_tip": "Also called systematic risk—exposure to economic and market-wide events."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "medium",
    "prompt": "Unsystematic risk can best be reduced by:",
    "choices": {
      "A": "Investing in a single industry leader",
      "B": "Diversifying across many securities and sectors",
      "C": "Avoiding all equity investments",
      "D": "Timing the market perfectly"
    },
    "correct_answer": "B",
    "explanation": "Company- and industry-specific risks are unsystematic and can be mitigated through diversification.",
    "keyword_tags": [
      "unsystematic risk",
      "diversification",
      "investment risks"
    ],
    "learning_objective": "Explain how diversification addresses unsystematic risk",
    "remediation_tip": "Systematic risk remains even in well-diversified portfolios."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "medium",
    "prompt": "Interest rate risk most directly affects:",
    "choices": {
      "A": "Fixed-income securities",
      "B": "Checking account balances at banks",
      "C": "Life insurance death benefits only",
      "D": "Currency futures margin requirements only"
    },
    "correct_answer": "A",
    "explanation": "Bond prices move inversely to interest rates; longer maturities generally have greater sensitivity.",
    "keyword_tags": [
      "interest rate risk",
      "bonds",
      "investment risks"
    ],
    "learning_objective": "Identify securities most exposed to interest rate risk",
    "remediation_tip": "Duration measures approximate price sensitivity to rate changes."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "easy",
    "prompt": "Credit risk is the risk that:",
    "choices": {
      "A": "Interest rates will rise unexpectedly",
      "B": "An issuer will fail to make timely principal or interest payments",
      "C": "The stock market will crash",
      "D": "Currency values will fluctuate"
    },
    "correct_answer": "B",
    "explanation": "Credit (default) risk reflects the issuer's ability to meet debt obligations.",
    "keyword_tags": [
      "credit risk",
      "default risk",
      "investment risks"
    ],
    "learning_objective": "Define credit risk for debt investments",
    "remediation_tip": "Bond ratings help assess credit risk levels."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "medium",
    "prompt": "Liquidity risk means an investor may:",
    "choices": {
      "A": "Always sell at a profit",
      "B": "Not be able to sell quickly without significantly affecting price",
      "C": "Never owe taxes on gains",
      "D": "Automatically receive FDIC insurance"
    },
    "correct_answer": "B",
    "explanation": "Thin markets can force large discounts for rapid liquidation of a position.",
    "keyword_tags": [
      "liquidity risk",
      "investment risks",
      "thinly traded"
    ],
    "learning_objective": "Explain liquidity risk and market depth",
    "remediation_tip": "Penny stocks and small caps often have higher liquidity risk."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "medium",
    "prompt": "Purchasing power (inflation) risk is especially concerning for investors holding:",
    "choices": {
      "A": "Long-term fixed-rate bonds with no inflation adjustment",
      "B": "TIPS that adjust with CPI",
      "C": "Floating-rate notes tied to benchmarks",
      "D": "Commodities during commodity booms"
    },
    "correct_answer": "A",
    "explanation": "Fixed payments lose real value when inflation rises, hurting bondholders and fixed annuities.",
    "keyword_tags": [
      "inflation risk",
      "purchasing power risk",
      "investment risks"
    ],
    "learning_objective": "Recognize inflation risk in fixed-income investments",
    "remediation_tip": "Equities and TIPS may offer better inflation protection over time."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "hard",
    "prompt": "Reinvestment risk occurs when:",
    "choices": {
      "A": "A bond defaults before maturity",
      "B": "Coupon payments must be reinvested at lower rates than the original bond",
      "C": "The SEC suspends trading",
      "D": "A stock splits 2-for-1"
    },
    "correct_answer": "B",
    "explanation": "Falling rates mean interim cash flows are reinvested at reduced yields, lowering total return.",
    "keyword_tags": [
      "reinvestment risk",
      "coupon income",
      "investment risks"
    ],
    "learning_objective": "Define reinvestment risk for bond investors",
    "remediation_tip": "Callable bonds exacerbate reinvestment risk when rates fall."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "medium",
    "prompt": "Political (sovereign) risk is most associated with:",
    "choices": {
      "A": "U.S. Treasury securities",
      "B": "International investments in unstable regions",
      "C": "FDIC-insured CDs",
      "D": "Domestic money market funds"
    },
    "correct_answer": "B",
    "explanation": "Government actions, instability, or policy changes abroad can harm foreign investments.",
    "keyword_tags": [
      "political risk",
      "international investing",
      "investment risks"
    ],
    "learning_objective": "Identify political risk in global portfolios",
    "remediation_tip": "Combine political risk with currency risk in international allocations."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "medium",
    "prompt": "Currency (exchange rate) risk affects an investor who holds:",
    "choices": {
      "A": "Only U.S. dollar-denominated domestic stocks",
      "B": "Foreign securities or funds when the dollar strengthens against local currencies",
      "C": "U.S. savings bonds only",
      "D": "Municipal bonds from their home state"
    },
    "correct_answer": "B",
    "explanation": "A stronger dollar can reduce returns on foreign investments when converted back to dollars.",
    "keyword_tags": [
      "currency risk",
      "foreign exchange",
      "investment risks"
    ],
    "learning_objective": "Explain currency risk for international investments",
    "remediation_tip": "Hedged international funds attempt to offset currency fluctuations."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "easy",
    "prompt": "Business risk refers to:",
    "choices": {
      "A": "The chance a company's operating performance will disappoint",
      "B": "The risk the Federal Reserve changes rates",
      "C": "The risk of a brokerage firm failure only",
      "D": "Guaranteed loss from diversification"
    },
    "correct_answer": "A",
    "explanation": "Poor management, competition, or declining sales create company-specific business risk.",
    "keyword_tags": [
      "business risk",
      "unsystematic risk",
      "investment risks"
    ],
    "learning_objective": "Define business risk at the issuer level",
    "remediation_tip": "Diversification across companies reduces exposure to any single firm's business risk."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "hard",
    "prompt": "Call risk is borne primarily by holders of:",
    "choices": {
      "A": "Callable bonds when interest rates decline",
      "B": "Non-callable Treasury bonds when rates rise",
      "C": "Common stock during bull markets",
      "D": "Money market funds only"
    },
    "correct_answer": "A",
    "explanation": "Issuers call bonds when rates fall, forcing investors to reinvest at lower yields.",
    "keyword_tags": [
      "call risk",
      "callable bonds",
      "investment risks"
    ],
    "learning_objective": "Understand call risk for bondholders",
    "remediation_tip": "Callable bonds often offer higher coupons to compensate for call risk."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "medium",
    "prompt": "Prepayment risk in mortgage-backed securities arises because:",
    "choices": {
      "A": "Homeowners may pay off mortgages early when rates fall",
      "B": "The U.S. government guarantees all MBS principal",
      "C": "MBS never change in price",
      "D": "Prepayment eliminates interest rate risk"
    },
    "correct_answer": "A",
    "explanation": "Early principal return forces reinvestment at lower prevailing rates.",
    "keyword_tags": [
      "prepayment risk",
      "MBS",
      "investment risks"
    ],
    "learning_objective": "Explain prepayment risk in pass-through securities",
    "remediation_tip": "Extension risk can occur when rates rise and prepayments slow."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "medium",
    "prompt": "Beta measures a stock's sensitivity to:",
    "choices": {
      "A": "Credit rating changes only",
      "B": "Overall market movements",
      "C": "Dividend tax rates",
      "D": "Municipal bond supply"
    },
    "correct_answer": "B",
    "explanation": "Beta compares a security's volatility relative to the market; beta > 1 indicates higher market sensitivity.",
    "keyword_tags": [
      "beta",
      "market risk",
      "investment risks"
    ],
    "learning_objective": "Interpret beta as a measure of systematic risk",
    "remediation_tip": "High-beta stocks tend to amplify market moves."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "easy",
    "prompt": "Concentration risk increases when a portfolio:",
    "choices": {
      "A": "Holds many uncorrelated asset classes",
      "B": "Has large positions in a single stock or sector",
      "C": "Uses dollar-cost averaging",
      "D": "Rebalances annually"
    },
    "correct_answer": "B",
    "explanation": "Heavy weighting in one security or industry magnifies company- or sector-specific losses.",
    "keyword_tags": [
      "concentration risk",
      "diversification",
      "investment risks"
    ],
    "learning_objective": "Recognize concentration risk in portfolio construction",
    "remediation_tip": "Sector funds and employer stock holdings can create concentration."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "hard",
    "prompt": "Legislative (regulatory) risk is illustrated when:",
    "choices": {
      "A": "New laws change tax treatment or industry regulation affecting investments",
      "B": "A company reports quarterly earnings",
      "C": "A stock pays an unexpected dividend",
      "D": "A bond coupon payment arrives on schedule"
    },
    "correct_answer": "A",
    "explanation": "Government policy changes can materially impact sectors such as healthcare, energy, or financials.",
    "keyword_tags": [
      "legislative risk",
      "regulatory risk",
      "investment risks"
    ],
    "learning_objective": "Identify legislative and regulatory risk factors",
    "remediation_tip": "Monitor policy proposals affecting heavily regulated industries."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "medium",
    "prompt": "Event risk for a corporation could include:",
    "choices": {
      "A": "A surprise takeover bid or natural disaster affecting operations",
      "B": "Gradual CPI increases over a decade",
      "C": "Routine semiannual coupon payments",
      "D": "Standard quarterly index rebalancing"
    },
    "correct_answer": "A",
    "explanation": "Sudden unexpected events can shock stock and bond prices of affected issuers.",
    "keyword_tags": [
      "event risk",
      "investment risks",
      "headline risk"
    ],
    "learning_objective": "Define event risk and sudden corporate shocks",
    "remediation_tip": "Event risk is a form of unsystematic risk."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "medium",
    "prompt": "Capital risk in equity investing means the investor may:",
    "choices": {
      "A": "Lose part or all of the amount invested",
      "B": "Earn guaranteed returns",
      "C": "Avoid all taxation",
      "D": "Receive FDIC insurance on stock purchases"
    },
    "correct_answer": "A",
    "explanation": "Equity investors have no principal guarantee; share prices can fall to zero in extreme cases.",
    "keyword_tags": [
      "capital risk",
      "equity risk",
      "investment risks"
    ],
    "learning_objective": "Understand capital loss potential in equity investments",
    "remediation_tip": "Risk tolerance questionnaires assess acceptable capital risk."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "hard",
    "prompt": "Duration is used to estimate:",
    "choices": {
      "A": "A bond's approximate percentage price change for a given interest rate change",
      "B": "The issuer's annual revenue growth",
      "C": "The stock's P/E ratio",
      "D": "The mutual fund's 12b-1 fee"
    },
    "correct_answer": "A",
    "explanation": "Higher duration indicates greater price volatility when interest rates move.",
    "keyword_tags": [
      "duration",
      "interest rate risk",
      "investment risks"
    ],
    "learning_objective": "Apply duration to interest rate risk measurement",
    "remediation_tip": "Longer maturity and lower coupons generally increase duration."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "easy",
    "prompt": "A risk-averse investor typically prefers investments with:",
    "choices": {
      "A": "Higher potential return and higher volatility",
      "B": "Lower volatility and more predictable outcomes",
      "C": "Maximum leverage",
      "D": "No disclosure of fees"
    },
    "correct_answer": "B",
    "explanation": "Risk-averse clients prioritize capital preservation and stable income over aggressive growth.",
    "keyword_tags": [
      "risk tolerance",
      "risk-averse",
      "investment risks"
    ],
    "learning_objective": "Match investment risk to client risk tolerance",
    "remediation_tip": "Suitability requires aligning risk profiles with product features."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "investment risks",
    "difficulty": "medium",
    "prompt": "Systematic risk differs from unsystematic risk because systematic risk:",
    "choices": {
      "A": "Affects the entire market or economy and cannot be diversified away",
      "B": "Applies only to one company",
      "C": "Is eliminated by owning 20 stocks",
      "D": "Relates only to municipal bond insurance"
    },
    "correct_answer": "A",
    "explanation": "Systematic risks include market, interest rate, and purchasing power risks affecting broad markets.",
    "keyword_tags": [
      "systematic risk",
      "unsystematic risk",
      "investment risks"
    ],
    "learning_objective": "Contrast systematic and unsystematic risk",
    "remediation_tip": "Asset allocation across stocks, bonds, and cash manages overall systematic exposure."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "yield and bond price relationship",
    "difficulty": "easy",
    "prompt": "When market interest rates rise, existing bond prices generally:",
    "choices": {
      "A": "Increase",
      "B": "Decrease",
      "C": "Remain fixed at par",
      "D": "Are guaranteed by the FDIC"
    },
    "correct_answer": "B",
    "explanation": "Bond prices and yields move inversely; higher new-issue rates make existing bonds less attractive.",
    "keyword_tags": [
      "inverse relationship",
      "interest rates",
      "bond prices"
    ],
    "learning_objective": "Explain inverse price-yield relationship",
    "remediation_tip": "This is fundamental bond math for the SIE exam."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "yield and bond price relationship",
    "difficulty": "medium",
    "prompt": "A bond selling at a discount has a coupon rate that is:",
    "choices": {
      "A": "Above current market interest rates",
      "B": "Below current market interest rates",
      "C": "Equal to zero only",
      "D": "Unrelated to market rates"
    },
    "correct_answer": "B",
    "explanation": "Investors pay less than par when the coupon is below prevailing rates.",
    "keyword_tags": [
      "discount bond",
      "coupon rate",
      "yield and bond price relationship"
    ],
    "learning_objective": "Relate discount pricing to below-market coupons",
    "remediation_tip": "Discount bond current yield exceeds coupon rate."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "yield and bond price relationship",
    "difficulty": "medium",
    "prompt": "A bond selling at a premium has a coupon rate that is:",
    "choices": {
      "A": "Below market rates",
      "B": "Above market rates",
      "C": "Always zero",
      "D": "Set by FINRA annually"
    },
    "correct_answer": "B",
    "explanation": "Higher coupons than new issues justify paying above par.",
    "keyword_tags": [
      "premium bond",
      "coupon rate",
      "yield and bond price relationship"
    ],
    "learning_objective": "Relate premium pricing to above-market coupons",
    "remediation_tip": "Premium bond current yield is less than coupon rate."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "yield and bond price relationship",
    "difficulty": "hard",
    "prompt": "A $1,000 par bond with a 4% coupon purchased at $800 has a current yield of:",
    "choices": {
      "A": "4.0%",
      "B": "5.0%",
      "C": "6.25%",
      "D": "8.0%"
    },
    "correct_answer": "B",
    "explanation": "Annual interest = $40. Current yield = $40 / $800 = 5%.",
    "keyword_tags": [
      "current yield",
      "discount bond",
      "yield and bond price relationship"
    ],
    "learning_objective": "Calculate current yield for bonds trading at discount",
    "remediation_tip": "Current yield ignores capital gain if held to maturity at par."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "yield and bond price relationship",
    "difficulty": "medium",
    "prompt": "Nominal (coupon) yield is calculated as:",
    "choices": {
      "A": "Annual coupon payment divided by par value",
      "B": "Annual coupon divided by market price",
      "C": "Capital gain divided by years to maturity",
      "D": "Yield to maturity plus inflation"
    },
    "correct_answer": "A",
    "explanation": "Nominal yield uses the stated coupon relative to face value, not purchase price.",
    "keyword_tags": [
      "nominal yield",
      "coupon yield",
      "yield and bond price relationship"
    ],
    "learning_objective": "Distinguish nominal yield from current yield and YTM",
    "remediation_tip": "Create a three-column comparison for the same bond."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "yield and bond price relationship",
    "difficulty": "hard",
    "prompt": "Yield to maturity (YTM) represents:",
    "choices": {
      "A": "Only the annual coupon divided by par",
      "B": "The total return if the bond is held to maturity, considering price, coupons, and time",
      "C": "The issuer's credit rating",
      "D": "The sales charge on a bond fund"
    },
    "correct_answer": "B",
    "explanation": "YTM is the internal rate of return assuming all coupons are reinvested at the same yield.",
    "keyword_tags": [
      "yield to maturity",
      "total return",
      "yield and bond price relationship"
    ],
    "learning_objective": "Define yield to maturity conceptually",
    "remediation_tip": "YTM is the most comprehensive yield measure for hold-to-maturity investors."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "yield and bond price relationship",
    "difficulty": "easy",
    "prompt": "If a bond trades at par, its coupon rate is:",
    "choices": {
      "A": "Always zero",
      "B": "Approximately equal to current market interest rates for similar bonds",
      "C": "Double the market rate",
      "D": "Unrelated to market conditions"
    },
    "correct_answer": "B",
    "explanation": "At par, coupon and prevailing yields are roughly aligned.",
    "keyword_tags": [
      "par value",
      "coupon rate",
      "yield and bond price relationship"
    ],
    "learning_objective": "Understand par pricing conditions",
    "remediation_tip": "New issues often price near par when coupons match market rates."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "yield and bond price relationship",
    "difficulty": "medium",
    "prompt": "Longer-term bonds generally experience:",
    "choices": {
      "A": "Less price volatility when rates change",
      "B": "Greater price volatility when rates change",
      "C": "No interest rate risk",
      "D": "Fixed prices regardless of rates"
    },
    "correct_answer": "B",
    "explanation": "Longer maturities have higher duration, amplifying price swings from rate changes.",
    "keyword_tags": [
      "maturity",
      "price volatility",
      "yield and bond price relationship"
    ],
    "learning_objective": "Relate maturity to interest rate sensitivity",
    "remediation_tip": "Compare 2-year vs 30-year Treasury price reactions to rate moves."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "yield and bond price relationship",
    "difficulty": "hard",
    "prompt": "A $1,000 par bond with a 6% coupon bought at $1,100 has a current yield closest to:",
    "choices": {
      "A": "5.45%",
      "B": "6.00%",
      "C": "6.60%",
      "D": "10.00%"
    },
    "correct_answer": "A",
    "explanation": "Annual coupon = $60. Current yield = $60 / $1,100 ≈ 5.45%.",
    "keyword_tags": [
      "current yield",
      "premium bond",
      "yield and bond price relationship"
    ],
    "learning_objective": "Calculate current yield for premium bonds",
    "remediation_tip": "Premium → current yield < coupon rate."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "yield and bond price relationship",
    "difficulty": "medium",
    "prompt": "The yield curve typically plots:",
    "choices": {
      "A": "Stock dividends against P/E ratios",
      "B": "Interest rates of bonds against their maturities",
      "C": "Mutual fund loads against NAV",
      "D": "Option premiums against strike prices"
    },
    "correct_answer": "B",
    "explanation": "Yield curves show term structure of interest rates across maturities.",
    "keyword_tags": [
      "yield curve",
      "term structure",
      "yield and bond price relationship"
    ],
    "learning_objective": "Interpret the yield curve graphic",
    "remediation_tip": "Normal curves slope upward; inverted curves may signal economic concerns."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "yield and bond price relationship",
    "difficulty": "medium",
    "prompt": "Zero-coupon bonds have the highest interest rate sensitivity because they:",
    "choices": {
      "A": "Pay large semiannual coupons",
      "B": "Have no interim cash flows and longer effective duration",
      "C": "Are always callable",
      "D": "Trade only at premiums"
    },
    "correct_answer": "B",
    "explanation": "All return comes at maturity, maximizing duration for a given maturity date.",
    "keyword_tags": [
      "zero-coupon bond",
      "duration",
      "yield and bond price relationship"
    ],
    "learning_objective": "Explain rate sensitivity of zero-coupon bonds",
    "remediation_tip": "Zeros can swing sharply with rate changes despite no coupon reinvestment."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "yield and bond price relationship",
    "difficulty": "hard",
    "prompt": "Market rates fall from 6% to 4%. An existing 6% coupon bond will most likely:",
    "choices": {
      "A": "Trade at a discount",
      "B": "Trade at a premium",
      "C": "Stop paying interest",
      "D": "Convert to common stock"
    },
    "correct_answer": "B",
    "explanation": "Above-market coupons become more valuable, pushing prices above par.",
    "keyword_tags": [
      "interest rate decline",
      "premium bond",
      "yield and bond price relationship"
    ],
    "learning_objective": "Predict price direction from rate and coupon comparison",
    "remediation_tip": "Bondholders benefit from price appreciation when rates fall."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "yield and bond price relationship",
    "difficulty": "easy",
    "prompt": "Current yield differs from nominal yield when a bond is purchased:",
    "choices": {
      "A": "Only at par value",
      "B": "At a price different from par value",
      "C": "Only if it is municipal",
      "D": "Only if it is callable"
    },
    "correct_answer": "B",
    "explanation": "Current yield uses market price in the denominator; nominal yield uses par.",
    "keyword_tags": [
      "current yield",
      "nominal yield",
      "yield and bond price relationship"
    ],
    "learning_objective": "Know when current and nominal yields diverge",
    "remediation_tip": "At par, current yield equals nominal yield."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "yield and bond price relationship",
    "difficulty": "medium",
    "prompt": "Callable bonds often offer higher coupons because investors require extra compensation for:",
    "choices": {
      "A": "Credit risk only",
      "B": "Call risk if rates decline",
      "C": "Currency fluctuations",
      "D": "Equity conversion features"
    },
    "correct_answer": "B",
    "explanation": "Issuers call bonds when advantageous, shifting reinvestment risk to investors.",
    "keyword_tags": [
      "callable bond",
      "call risk",
      "yield and bond price relationship"
    ],
    "learning_objective": "Link callable features to yield spreads",
    "remediation_tip": "Yield-to-call may be more relevant than YTM for premium callable bonds."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "equity securities",
    "difficulty": "easy",
    "prompt": "Common stockholders have:",
    "choices": {
      "A": "A prior claim over bondholders in bankruptcy",
      "B": "Voting rights and potential dividends, but last claim in liquidation",
      "C": "Guaranteed fixed dividends",
      "D": "No exposure to company performance"
    },
    "correct_answer": "B",
    "explanation": "Common stock offers ownership with voting rights and residual claims after creditors and preferred shareholders.",
    "keyword_tags": [
      "common stock",
      "equity securities",
      "shareholder rights"
    ],
    "learning_objective": "Describe rights and risks of common stock ownership",
    "remediation_tip": "Common stock has unlimited upside but ranks last in liquidation."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "equity securities",
    "difficulty": "medium",
    "prompt": "Preferred stock is most similar to bonds in that it typically:",
    "choices": {
      "A": "Grants unlimited voting control",
      "B": "Pays a fixed dividend and has priority over common in dividends and liquidation",
      "C": "Matures in 90 days",
      "D": "Is FDIC insured"
    },
    "correct_answer": "B",
    "explanation": "Preferred shares blend equity and fixed-income features with stated dividends and priority.",
    "keyword_tags": [
      "preferred stock",
      "equity securities",
      "fixed dividends"
    ],
    "learning_objective": "Compare preferred stock to common stock and bonds",
    "remediation_tip": "Cumulative preferred must receive missed dividends before common dividends."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "equity securities",
    "difficulty": "medium",
    "prompt": "Growth stocks are generally characterized by:",
    "choices": {
      "A": "High dividend yields and slow earnings growth",
      "B": "Reinvested earnings and above-average growth potential",
      "C": "Guaranteed principal",
      "D": "Exclusive utility sector focus"
    },
    "correct_answer": "B",
    "explanation": "Growth companies prioritize expansion over distributing earnings as dividends.",
    "keyword_tags": [
      "growth stock",
      "equity securities",
      "capital appreciation"
    ],
    "learning_objective": "Identify growth stock characteristics",
    "remediation_tip": "Growth stocks often have higher P/E ratios reflecting growth expectations."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "equity securities",
    "difficulty": "easy",
    "prompt": "Value stocks often trade at:",
    "choices": {
      "A": "P/E ratios above industry averages with no earnings",
      "B": "Lower valuations relative to fundamentals such as earnings or book value",
      "C": "Prices set by the Federal Reserve",
      "D": "Only on bond exchanges"
    },
    "correct_answer": "B",
    "explanation": "Value investing seeks companies perceived undervalued by the market.",
    "keyword_tags": [
      "value stock",
      "equity securities",
      "valuation"
    ],
    "learning_objective": "Define value stock investment style",
    "remediation_tip": "Value stocks may offer higher dividend yields than growth stocks."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "equity securities",
    "difficulty": "medium",
    "prompt": "Cyclical stocks tend to perform best when:",
    "choices": {
      "A": "The economy is in recession",
      "B": "The economy is expanding",
      "C": "Interest rates are zero",
      "D": "Inflation is negative only"
    },
    "correct_answer": "B",
    "explanation": "Cyclical companies (autos, travel, luxury) benefit from rising consumer and business spending.",
    "keyword_tags": [
      "cyclical stock",
      "economic cycle",
      "equity securities"
    ],
    "learning_objective": "Relate cyclical stocks to economic conditions",
    "remediation_tip": "Defensive stocks (utilities, staples) often hold up better in downturns."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "equity securities",
    "difficulty": "easy",
    "prompt": "Defensive stocks are often found in industries such as:",
    "choices": {
      "A": "Luxury resorts and airlines",
      "B": "Utilities and consumer staples",
      "C": "High-beta technology startups only",
      "D": "Speculative mining ventures"
    },
    "correct_answer": "B",
    "explanation": "Defensive sectors provide necessities with steadier demand across economic cycles.",
    "keyword_tags": [
      "defensive stock",
      "equity securities",
      "sector investing"
    ],
    "learning_objective": "Identify defensive equity sectors",
    "remediation_tip": "Defensive does not mean risk-free—only relatively stable demand."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "equity securities",
    "difficulty": "hard",
    "prompt": "A 2-for-1 stock split will result in an investor who owned 100 shares at $80 per share having:",
    "choices": {
      "A": "50 shares at $160",
      "B": "200 shares at approximately $40",
      "C": "100 shares at $160",
      "D": "200 shares at $80"
    },
    "correct_answer": "B",
    "explanation": "Splits increase share count and reduce price proportionally; total value stays roughly the same.",
    "keyword_tags": [
      "stock split",
      "equity securities",
      "share count"
    ],
    "learning_objective": "Analyze effects of stock splits on shares and price",
    "remediation_tip": "Splits are cosmetic—they do not change company fundamentals."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "equity securities",
    "difficulty": "medium",
    "prompt": "Penny stocks are considered especially risky because they:",
    "choices": {
      "A": "Trade on major exchanges with high liquidity always",
      "B": "Often have low price, limited disclosure, and thin trading markets",
      "C": "Are guaranteed by the SIPC",
      "D": "Pay federally tax-exempt dividends"
    },
    "correct_answer": "B",
    "explanation": "Low-priced speculative securities can be volatile and susceptible to fraud.",
    "keyword_tags": [
      "penny stock",
      "speculative risk",
      "equity securities"
    ],
    "learning_objective": "Recognize risks of penny stock investing",
    "remediation_tip": "Penny stocks may trade OTC with less stringent listing standards."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "equity securities",
    "difficulty": "medium",
    "prompt": "Dividend yield on a stock equals:",
    "choices": {
      "A": "Annual dividend per share divided by market price per share",
      "B": "Earnings per share divided by par value",
      "C": "Market cap divided by revenue",
      "D": "Book value divided by shares outstanding"
    },
    "correct_answer": "A",
    "explanation": "Dividend yield shows income return relative to current share price.",
    "keyword_tags": [
      "dividend yield",
      "equity securities",
      "income investing"
    ],
    "learning_objective": "Calculate and interpret dividend yield",
    "remediation_tip": "Unusually high yields may signal dividend cut risk."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "equity securities",
    "difficulty": "hard",
    "prompt": "A high price-to-earnings (P/E) ratio may indicate investors expect:",
    "choices": {
      "A": "Bankruptcy within one year",
      "B": "Strong future earnings growth",
      "C": "No earnings ever",
      "D": "Fixed bond-like payments only"
    },
    "correct_answer": "B",
    "explanation": "Investors pay more per dollar of current earnings when growth expectations are high.",
    "keyword_tags": [
      "P/E ratio",
      "valuation",
      "equity securities"
    ],
    "learning_objective": "Interpret P/E ratio in stock analysis",
    "remediation_tip": "Compare P/E to industry peers and historical averages."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "equity securities",
    "difficulty": "easy",
    "prompt": "American Depositary Receipts (ADRs) represent:",
    "choices": {
      "A": "Direct ownership of U.S. municipal bonds",
      "B": "Foreign company shares trading in U.S. markets in dollars",
      "C": "U.S. Treasury inflation-protected securities",
      "D": "Annuity contracts from foreign insurers"
    },
    "correct_answer": "B",
    "explanation": "ADRs facilitate U.S. investor access to non-U.S. equities with dollar trading.",
    "keyword_tags": [
      "ADR",
      "foreign equity",
      "equity securities"
    ],
    "learning_objective": "Explain ADR purpose for domestic investors",
    "remediation_tip": "ADRs still carry currency and foreign market risks."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "equity securities",
    "difficulty": "medium",
    "prompt": "Small-cap stocks compared to large-cap stocks generally have:",
    "choices": {
      "A": "Lower growth potential and lower volatility",
      "B": "Higher growth potential and higher volatility",
      "C": "Identical risk profiles",
      "D": "Government guarantees on principal"
    },
    "correct_answer": "B",
    "explanation": "Smaller companies can grow faster but are often less established and more volatile.",
    "keyword_tags": [
      "small-cap",
      "large-cap",
      "equity securities"
    ],
    "learning_objective": "Compare market capitalization categories",
    "remediation_tip": "Market cap = share price × shares outstanding."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "equity securities",
    "difficulty": "medium",
    "prompt": "A rights offering allows existing shareholders to:",
    "choices": {
      "A": "Sell shares back to the government",
      "B": "Purchase additional shares, often at a discount, to maintain ownership percentage",
      "C": "Convert bonds to preferred stock automatically",
      "D": "Avoid all dilution without investing"
    },
    "correct_answer": "B",
    "explanation": "Rights help current owners offset dilution from new share issuance.",
    "keyword_tags": [
      "rights offering",
      "dilution",
      "equity securities"
    ],
    "learning_objective": "Understand rights offerings and anti-dilution purpose",
    "remediation_tip": "Rights are short-term; unexercised rights may be sold or expire."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "equity securities",
    "difficulty": "hard",
    "prompt": "Convertible preferred stock allows the holder to:",
    "choices": {
      "A": "Exchange preferred shares for a fixed number of common shares",
      "B": "Receive U.S. Treasury bonds at maturity",
      "C": "Vote on all Federal Reserve decisions",
      "D": "Avoid all market risk permanently"
    },
    "correct_answer": "A",
    "explanation": "The conversion feature provides equity upside while preferred dividends offer income.",
    "keyword_tags": [
      "convertible preferred",
      "equity securities",
      "hybrid securities"
    ],
    "learning_objective": "Describe convertible preferred stock features",
    "remediation_tip": "Conversion is advantageous when common stock rises above conversion value."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "debt securities",
    "difficulty": "easy",
    "prompt": "A corporate bond represents:",
    "choices": {
      "A": "Ownership in the issuing corporation",
      "B": "A loan by the investor to the corporation",
      "C": "A deposit insured by the FDIC",
      "D": "A share of the company's profits only"
    },
    "correct_answer": "B",
    "explanation": "Bondholders are creditors entitled to interest and return of principal per the indenture.",
    "keyword_tags": [
      "corporate bond",
      "debt securities",
      "creditor"
    ],
    "learning_objective": "Define corporate bonds as debt instruments",
    "remediation_tip": "Bondholders do not have ownership voting rights like stockholders."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "debt securities",
    "difficulty": "medium",
    "prompt": "Debentures are bonds that are:",
    "choices": {
      "A": "Secured by specific collateral",
      "B": "Unsecured, backed by the issuer's general credit",
      "C": "Issued only by municipalities",
      "D": "Guaranteed by the FDIC"
    },
    "correct_answer": "B",
    "explanation": "Debentures rely on the issuer's overall financial strength without pledged assets.",
    "keyword_tags": [
      "debentures",
      "unsecured debt",
      "debt securities"
    ],
    "learning_objective": "Distinguish debentures from secured bonds",
    "remediation_tip": "Secured bonds have collateral; debentures do not."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "debt securities",
    "difficulty": "medium",
    "prompt": "Secured bonds provide investors with:",
    "choices": {
      "A": "A claim on specific assets pledged as collateral",
      "B": "No claim in bankruptcy",
      "C": "Voting rights on corporate policy",
      "D": "Guaranteed stock conversion"
    },
    "correct_answer": "A",
    "explanation": "Collateral backing improves recovery prospects if the issuer defaults.",
    "keyword_tags": [
      "secured bonds",
      "collateral",
      "debt securities"
    ],
    "learning_objective": "Explain collateral protection for secured bondholders",
    "remediation_tip": "Mortgage bonds and equipment trust certificates are secured examples."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "debt securities",
    "difficulty": "hard",
    "prompt": "Convertible corporate bonds allow investors to:",
    "choices": {
      "A": "Convert the bond into a fixed number of common shares",
      "B": "Avoid all interest rate risk",
      "C": "Receive tax-exempt federal interest",
      "D": "Trade only on municipal exchanges"
    },
    "correct_answer": "A",
    "explanation": "Convertibles offer bond income plus potential equity participation through conversion.",
    "keyword_tags": [
      "convertible bonds",
      "hybrid securities",
      "debt securities"
    ],
    "learning_objective": "Describe convertible bond features",
    "remediation_tip": "Conversion value rises with the underlying stock price."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "debt securities",
    "difficulty": "medium",
    "prompt": "Zero-coupon corporate bonds:",
    "choices": {
      "A": "Pay semiannual interest at the coupon rate",
      "B": "Are issued at a discount and pay par at maturity",
      "C": "Cannot default",
      "D": "Are always callable at par"
    },
    "correct_answer": "B",
    "explanation": "Zeros provide return through price appreciation to face value with no interim coupons.",
    "keyword_tags": [
      "zero-coupon bond",
      "discount bond",
      "debt securities"
    ],
    "learning_objective": "Identify zero-coupon bond payment structure",
    "remediation_tip": "Zeros have high interest rate sensitivity."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "debt securities",
    "difficulty": "easy",
    "prompt": "A bond indenture is:",
    "choices": {
      "A": "The broker-dealer margin agreement",
      "B": "The legal contract outlining bond terms and covenants",
      "C": "A mutual fund prospectus only",
      "D": "A stock split announcement"
    },
    "correct_answer": "B",
    "explanation": "Indentures specify coupon, maturity, call features, and issuer obligations.",
    "keyword_tags": [
      "indenture",
      "bond covenants",
      "debt securities"
    ],
    "learning_objective": "Define bond indenture purpose",
    "remediation_tip": "Trustees monitor issuer compliance with indenture terms."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "debt securities",
    "difficulty": "medium",
    "prompt": "High-yield (junk) bonds are characterized by:",
    "choices": {
      "A": "Investment-grade ratings and low yields",
      "B": "Below-investment-grade ratings and higher yields",
      "C": "U.S. government guarantees",
      "D": "No credit risk"
    },
    "correct_answer": "B",
    "explanation": "Lower credit ratings compensate investors with higher yields for greater default risk.",
    "keyword_tags": [
      "high-yield bonds",
      "junk bonds",
      "credit risk"
    ],
    "learning_objective": "Classify high-yield bonds and associated risks",
    "remediation_tip": "High yield does not mean high quality—often the opposite."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "debt securities",
    "difficulty": "hard",
    "prompt": "Senior debt compared to subordinated debt has:",
    "choices": {
      "A": "Lower priority in bankruptcy liquidation",
      "B": "Higher priority in bankruptcy liquidation",
      "C": "No claim on assets",
      "D": "Automatic conversion to equity"
    },
    "correct_answer": "B",
    "explanation": "Senior bondholders are paid before subordinated (junior) debtholders in liquidation.",
    "keyword_tags": [
      "senior debt",
      "subordinated debt",
      "debt securities"
    ],
    "learning_objective": "Understand debt priority in capital structure",
    "remediation_tip": "Subordinated debt pays higher yields for lower priority."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "debt securities",
    "difficulty": "medium",
    "prompt": "Commercial paper is:",
    "choices": {
      "A": "Long-term municipal debt maturing in 30 years",
      "B": "Short-term unsecured corporate debt typically maturing in 270 days or less",
      "C": "A type of common stock",
      "D": "FDIC-insured bank deposit paper"
    },
    "correct_answer": "B",
    "explanation": "Commercial paper finances short-term corporate cash needs and is issued by creditworthy firms.",
    "keyword_tags": [
      "commercial paper",
      "money market",
      "debt securities"
    ],
    "learning_objective": "Describe commercial paper characteristics",
    "remediation_tip": "Only issuers with strong credit typically access the commercial paper market."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "debt securities",
    "difficulty": "easy",
    "prompt": "Certificates of deposit (CDs) issued by banks differ from corporate bonds because CDs:",
    "choices": {
      "A": "Are equity securities",
      "B": "Are bank time deposits that may be FDIC insured up to limits",
      "C": "Trade on the NYSE like stocks",
      "D": "Have no stated maturity"
    },
    "correct_answer": "B",
    "explanation": "CDs are deposit obligations of banks, not corporate debt securities, with FDIC insurance up to applicable limits.",
    "keyword_tags": [
      "certificates of deposit",
      "debt securities",
      "FDIC"
    ],
    "learning_objective": "Distinguish CDs from corporate bonds",
    "remediation_tip": "Early CD withdrawal may trigger penalties."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "debt securities",
    "difficulty": "medium",
    "prompt": "A corporate bond's credit rating downgrade will most likely cause its:",
    "choices": {
      "A": "Price to rise and yield to fall",
      "B": "Price to fall and yield to rise",
      "C": "Coupon rate to increase immediately",
      "D": "Maturity to shorten automatically"
    },
    "correct_answer": "B",
    "explanation": "Lower credit quality demands higher yields, which means lower prices in the secondary market.",
    "keyword_tags": [
      "credit rating",
      "bond prices",
      "debt securities"
    ],
    "learning_objective": "Predict market reaction to credit downgrades",
    "remediation_tip": "Rating agencies include Moody's, S&P, and Fitch."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "municipal bonds",
    "difficulty": "easy",
    "prompt": "General obligation (GO) municipal bonds are backed by:",
    "choices": {
      "A": "Revenue from a toll road only",
      "B": "The issuer's taxing power",
      "C": "Corporate earnings",
      "D": "Federal Reserve discount window"
    },
    "correct_answer": "B",
    "explanation": "GO bonds rely on the municipality's ability to levy taxes for debt service.",
    "keyword_tags": [
      "GO bonds",
      "municipal bonds",
      "tax backing"
    ],
    "learning_objective": "Differentiate GO from revenue municipal bonds",
    "remediation_tip": "GO bonds often require voter approval for issuance."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "municipal bonds",
    "difficulty": "medium",
    "prompt": "Revenue bonds are repaid primarily from:",
    "choices": {
      "A": "Unlimited property taxes",
      "B": "Income generated by the specific project or facility",
      "C": "Federal income tax receipts",
      "D": "Sales of corporate stock"
    },
    "correct_answer": "B",
    "explanation": "Examples include toll roads, airports, and utility projects funded by user fees.",
    "keyword_tags": [
      "revenue bonds",
      "municipal bonds",
      "project finance"
    ],
    "learning_objective": "Identify revenue sources for revenue bonds",
    "remediation_tip": "Revenue bond credit depends on project viability, not general taxing power."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "municipal bonds",
    "difficulty": "hard",
    "prompt": "An investor in the 32% federal tax bracket compares a 3.5% tax-exempt muni to a taxable bond. The taxable-equivalent yield is approximately:",
    "choices": {
      "A": "3.5%",
      "B": "4.2%",
      "C": "5.15%",
      "D": "7.0%"
    },
    "correct_answer": "C",
    "explanation": "TEY = muni yield / (1 − tax rate) = 3.5% / 0.68 ≈ 5.15%.",
    "keyword_tags": [
      "taxable-equivalent yield",
      "municipal bonds",
      "tax considerations"
    ],
    "learning_objective": "Calculate taxable-equivalent yield for muni bonds",
    "remediation_tip": "Use TEY to compare munis with taxable corporate or Treasury bonds."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "municipal bonds",
    "difficulty": "medium",
    "prompt": "Interest on most municipal bonds issued for governmental purposes is generally:",
    "choices": {
      "A": "Fully taxable at federal and state levels",
      "B": "Exempt from federal income tax",
      "C": "Taxable only as capital gains",
      "D": "Subject to payroll taxes"
    },
    "correct_answer": "B",
    "explanation": "Federal tax exemption is a primary attraction for investors in higher tax brackets.",
    "keyword_tags": [
      "tax-exempt interest",
      "municipal bonds",
      "tax considerations"
    ],
    "learning_objective": "Know federal tax treatment of municipal bond interest",
    "remediation_tip": "In-state munis may also avoid state income tax for residents."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "municipal bonds",
    "difficulty": "hard",
    "prompt": "Interest from certain private activity municipal bonds may be subject to:",
    "choices": {
      "A": "SEC registration fees only",
      "B": "The alternative minimum tax (AMT)",
      "C": "FINRA arbitration fees",
      "D": "Social Security payroll tax"
    },
    "correct_answer": "B",
    "explanation": "Private activity bond interest can be an AMT preference item for some taxpayers.",
    "keyword_tags": [
      "AMT",
      "private activity bonds",
      "municipal bonds"
    ],
    "learning_objective": "Recognize AMT implications for certain munis",
    "remediation_tip": "Ask high-income clients about AMT exposure before recommending private activity bonds."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "municipal bonds",
    "difficulty": "easy",
    "prompt": "The official statement for a new municipal bond offering is comparable to:",
    "choices": {
      "A": "A corporate bond prospectus",
      "B": "A Form U4 registration",
      "C": "A currency transaction report",
      "D": "A margin account agreement"
    },
    "correct_answer": "A",
    "explanation": "Official statements disclose terms, financial condition, and risks for new muni issues.",
    "keyword_tags": [
      "official statement",
      "municipal bonds",
      "disclosure"
    ],
    "learning_objective": "Identify key muni primary market disclosure documents",
    "remediation_tip": "Continuing disclosure is available on the EMMA system."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "municipal bonds",
    "difficulty": "medium",
    "prompt": "Municipal bond insurance is intended to:",
    "choices": {
      "A": "Guarantee the bond will never trade at a discount",
      "B": "Enhance credit quality by guaranteeing timely payment if the issuer defaults",
      "C": "Convert the bond to a Treasury security",
      "D": "Eliminate all interest rate risk"
    },
    "correct_answer": "B",
    "explanation": "Insurers promise payment of principal and interest if the issuer cannot, improving marketability.",
    "keyword_tags": [
      "municipal bond insurance",
      "credit enhancement",
      "municipal bonds"
    ],
    "learning_objective": "Understand municipal bond insurance benefits and limits",
    "remediation_tip": "Investors still face interest rate and liquidity risks on insured bonds."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "municipal bonds",
    "difficulty": "medium",
    "prompt": "Industrial development revenue bonds (IDRBs) are typically:",
    "choices": {
      "A": "GO bonds backed by unlimited taxes",
      "B": "Revenue bonds issued to finance private business facilities",
      "C": "U.S. Treasury notes",
      "D": "Agency pass-through securities"
    },
    "correct_answer": "B",
    "explanation": "IDRBs carry project and business risk in addition to typical municipal considerations.",
    "keyword_tags": [
      "IDRB",
      "revenue bonds",
      "municipal bonds"
    ],
    "learning_objective": "Classify IDRBs within municipal bond types",
    "remediation_tip": "Credit analysis focuses on the private user's ability to pay."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "municipal bonds",
    "difficulty": "easy",
    "prompt": "Compared to Treasuries, municipal bonds generally offer:",
    "choices": {
      "A": "Lower credit quality always with no tax benefits",
      "B": "Tax-exempt income that may appeal to high-bracket investors",
      "C": "FDIC insurance on principal",
      "D": "Guaranteed returns above inflation"
    },
    "correct_answer": "B",
    "explanation": "Tax exemption can make lower nominal muni yields attractive on an after-tax basis.",
    "keyword_tags": [
      "municipal bonds",
      "tax-exempt",
      "fixed income"
    ],
    "learning_objective": "Explain muni bond appeal for taxable investors",
    "remediation_tip": "Compare after-tax yields, not just stated coupon rates."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "treasuries",
    "difficulty": "easy",
    "prompt": "U.S. Treasury bills (T-bills) are issued:",
    "choices": {
      "A": "At par with semiannual coupons",
      "B": "At a discount to par with no periodic interest payments",
      "C": "Only to foreign central banks",
      "D": "With 20-year maturities"
    },
    "correct_answer": "B",
    "explanation": "T-bills mature in one year or less and pay par at maturity; return is the discount.",
    "keyword_tags": [
      "T-bills",
      "treasuries",
      "discount securities"
    ],
    "learning_objective": "Describe T-bill structure and maturities",
    "remediation_tip": "T-bills are short-term government discount obligations."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "treasuries",
    "difficulty": "medium",
    "prompt": "U.S. Treasury notes typically mature in:",
    "choices": {
      "A": "4 weeks to 52 weeks",
      "B": "2 to 10 years",
      "C": "More than 30 years only",
      "D": "Exactly 5 days"
    },
    "correct_answer": "B",
    "explanation": "Treasury notes pay semiannual interest and cover the intermediate maturity range.",
    "keyword_tags": [
      "Treasury notes",
      "treasuries",
      "government securities"
    ],
    "learning_objective": "Match Treasury types to maturity ranges",
    "remediation_tip": "Bills < 1 year; notes 2–10 years; bonds 20–30 years."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "treasuries",
    "difficulty": "medium",
    "prompt": "U.S. Treasury bonds generally have maturities of:",
    "choices": {
      "A": "3 months",
      "B": "2 years",
      "C": "20 to 30 years",
      "D": "1 week"
    },
    "correct_answer": "C",
    "explanation": "Long-term Treasury bonds pay semiannual interest with maturities up to 30 years.",
    "keyword_tags": [
      "Treasury bonds",
      "treasuries",
      "long-term debt"
    ],
    "learning_objective": "Identify Treasury bond maturity characteristics",
    "remediation_tip": "Longer Treasuries have greater interest rate sensitivity."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "treasuries",
    "difficulty": "hard",
    "prompt": "Treasury Inflation-Protected Securities (TIPS) adjust:",
    "choices": {
      "A": "Coupon payments only, never principal",
      "B": "Principal based on changes in the Consumer Price Index",
      "C": "Only state tax rates",
      "D": "Stock dividend yields"
    },
    "correct_answer": "B",
    "explanation": "CPI increases raise TIPS principal; deflation can lower it but not below par at maturity.",
    "keyword_tags": [
      "TIPS",
      "inflation protection",
      "treasuries"
    ],
    "learning_objective": "Explain TIPS inflation adjustment mechanism",
    "remediation_tip": "TIPS protect purchasing power but can lag in sudden inflation spikes."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "treasuries",
    "difficulty": "medium",
    "prompt": "STRIPS are:",
    "choices": {
      "A": "Preferred stock issued by the Treasury",
      "B": "Zero-coupon Treasury securities created by separating coupons from principal",
      "C": "Municipal revenue bonds",
      "D": "Agency mortgage pools"
    },
    "correct_answer": "B",
    "explanation": "STRIPS trade as zero-coupon instruments with no interim payments.",
    "keyword_tags": [
      "STRIPS",
      "zero-coupon",
      "treasuries"
    ],
    "learning_objective": "Understand STRIPS structure",
    "remediation_tip": "STRIPS eliminate coupon reinvestment risk."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "treasuries",
    "difficulty": "easy",
    "prompt": "Interest on U.S. Treasury securities is:",
    "choices": {
      "A": "Exempt from federal income tax",
      "B": "Taxable federally but generally exempt from state and local income taxes",
      "C": "Exempt from all U.S. taxes",
      "D": "Taxed only as capital gains"
    },
    "correct_answer": "B",
    "explanation": "Treasury interest is subject to federal tax but usually not state/local income tax.",
    "keyword_tags": [
      "Treasury taxation",
      "treasuries",
      "tax considerations"
    ],
    "learning_objective": "Know tax treatment of Treasury securities",
    "remediation_tip": "Contrast with municipal bond federal tax exemption."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "treasuries",
    "difficulty": "medium",
    "prompt": "U.S. Treasury securities are considered highly liquid because:",
    "choices": {
      "A": "They cannot be sold before maturity",
      "B": "They trade in deep, active markets with strong dealer participation",
      "C": "FINRA insures them against loss",
      "D": "They have no interest rate risk"
    },
    "correct_answer": "B",
    "explanation": "Large trading volume and dealer networks support easy buying and selling.",
    "keyword_tags": [
      "liquidity",
      "treasuries",
      "secondary market"
    ],
    "learning_objective": "Explain Treasury market liquidity",
    "remediation_tip": "Liquidity does not eliminate price volatility from rate changes."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "treasuries",
    "difficulty": "hard",
    "prompt": "Treasuries are considered benchmark securities because:",
    "choices": {
      "A": "They carry the highest corporate default risk",
      "B": "They are viewed as free of credit risk and set baseline yields",
      "C": "They are not traded in secondary markets",
      "D": "They are issued only by municipalities"
    },
    "correct_answer": "B",
    "explanation": "U.S. government full faith and credit backing makes Treasuries the risk-free rate reference.",
    "keyword_tags": [
      "benchmark",
      "risk-free rate",
      "treasuries"
    ],
    "learning_objective": "Understand Treasury role as pricing benchmark",
    "remediation_tip": "Other bonds trade at yield spreads relative to Treasuries."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "agency securities",
    "difficulty": "easy",
    "prompt": "Agency securities are issued by:",
    "choices": {
      "A": "Individual municipalities only",
      "B": "Government-sponsored enterprises and certain federal agencies",
      "C": "Private corporations without government ties",
      "D": "Foreign central banks exclusively"
    },
    "correct_answer": "B",
    "explanation": "Issuers include Fannie Mae, Freddie Mac, FHLB, and federally related agencies.",
    "keyword_tags": [
      "agency securities",
      "GSE",
      "government-related issuers"
    ],
    "learning_objective": "Identify issuers of agency securities",
    "remediation_tip": "Distinguish full-faith agencies from GSE obligations."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "agency securities",
    "difficulty": "medium",
    "prompt": "GNMA (Ginnie Mae) mortgage-backed securities are backed by:",
    "choices": {
      "A": "Corporate bond covenants",
      "B": "The full faith and credit of the U.S. government",
      "C": "State property taxes only",
      "D": "FDIC deposit insurance"
    },
    "correct_answer": "B",
    "explanation": "Ginnie Mae pass-throughs are the only MBS with explicit U.S. government backing.",
    "keyword_tags": [
      "GNMA",
      "agency securities",
      "government guarantee"
    ],
    "learning_objective": "Distinguish GNMA from Fannie Mae and Freddie Mac",
    "remediation_tip": "GNMA pools FHA/VA insured mortgages."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "agency securities",
    "difficulty": "medium",
    "prompt": "Compared to Treasuries of similar maturity, agency debentures generally offer:",
    "choices": {
      "A": "Lower yields because they are risk-free",
      "B": "Slightly higher yields reflecting marginally greater credit risk",
      "C": "Identical yields in all markets",
      "D": "No secondary market"
    },
    "correct_answer": "B",
    "explanation": "GSE debt typically yields more than Treasuries due to perceived credit differences.",
    "keyword_tags": [
      "agency yield spread",
      "agency securities",
      "credit risk"
    ],
    "learning_objective": "Compare agency and Treasury yields",
    "remediation_tip": "Higher yield compensates for slightly higher perceived risk."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "agency securities",
    "difficulty": "hard",
    "prompt": "Mortgage pass-through securities expose investors to prepayment risk because:",
    "choices": {
      "A": "Homeowners may refinance when interest rates fall",
      "B": "The SEC calls the bonds at par annually",
      "C": "Agency debt cannot be prepaid",
      "D": "Prepayment guarantees a loss of principal"
    },
    "correct_answer": "A",
    "explanation": "Early mortgage payoff returns principal sooner, forcing reinvestment at lower rates.",
    "keyword_tags": [
      "prepayment risk",
      "MBS",
      "agency securities"
    ],
    "learning_objective": "Understand prepayment risk in agency MBS",
    "remediation_tip": "Extension risk can occur when rising rates slow prepayments."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "agency securities",
    "difficulty": "medium",
    "prompt": "Fannie Mae and Freddie Mac are classified as:",
    "choices": {
      "A": "Municipal housing authorities",
      "B": "Government-sponsored enterprises (GSEs)",
      "C": "U.S. Treasury departments",
      "D": "State insurance guaranty funds"
    },
    "correct_answer": "B",
    "explanation": "GSEs support housing finance; their obligations historically had implicit but not explicit federal guarantees.",
    "keyword_tags": [
      "Fannie Mae",
      "Freddie Mac",
      "GSE"
    ],
    "learning_objective": "Identify major housing GSEs",
    "remediation_tip": "Know policy changes can affect GSE credit perceptions."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "agency securities",
    "difficulty": "easy",
    "prompt": "A mortgage pass-through security pays investors:",
    "choices": {
      "A": "Only at maturity with no interim cash flow",
      "B": "Pro-rata shares of principal and interest from underlying mortgages",
      "C": "Dividends from common stock holdings",
      "D": "Tax-exempt municipal interest only"
    },
    "correct_answer": "B",
    "explanation": "Pass-throughs distribute monthly payments from the underlying mortgage pool.",
    "keyword_tags": [
      "pass-through",
      "MBS",
      "agency securities"
    ],
    "learning_objective": "Describe mortgage pass-through payment structure",
    "remediation_tip": "Payments vary as mortgages prepay or default."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "agency securities",
    "difficulty": "hard",
    "prompt": "Collateralized Mortgage Obligations (CMOs) differ from pass-throughs because CMOs:",
    "choices": {
      "A": "Have only one maturity class",
      "B": "Allocate cash flows into tranches with different risk and maturity profiles",
      "C": "Are not related to mortgages",
      "D": "Are issued only by municipalities"
    },
    "correct_answer": "B",
    "explanation": "CMO tranches (PAC, TAC, Z-bonds) target different prepayment and duration exposures.",
    "keyword_tags": [
      "CMO",
      "tranches",
      "agency securities"
    ],
    "learning_objective": "Explain CMO tranche structure",
    "remediation_tip": "Some tranches absorb prepayment variability for others."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "medium",
    "prompt": "A 529 college savings plan is best described as:",
    "choices": {
      "A": "A FDIC-insured bank deposit",
      "B": "A tax-advantaged municipal fund security for education savings",
      "C": "A type of corporate bond issued by universities",
      "D": "An exchange-traded note tied to tuition inflation only"
    },
    "correct_answer": "B",
    "explanation": "529 plans are municipal fund securities offering tax-advantaged education savings; MSRB rules apply to dealers.",
    "keyword_tags": [
      "529 plan",
      "municipal fund securities",
      "mutual funds"
    ],
    "learning_objective": "Identify 529 plans on the SIE product outline",
    "remediation_tip": "529 earnings grow tax-deferred; qualified withdrawals are federally tax-free."
  },
  {
    "section_id": 2,
    "section_name": "Understanding Products and Their Risks",
    "topic": "mutual funds",
    "difficulty": "easy",
    "prompt": "A unit investment trust (UIT) differs from an open-end mutual fund because a UIT:",
    "choices": {
      "A": "Issues redeemable shares daily at NAV forever",
      "B": "Has a fixed portfolio and a stated termination date",
      "C": "Is never registered with the SEC",
      "D": "Cannot hold bonds or equities"
    },
    "correct_answer": "B",
    "explanation": "UITs have a fixed, generally unmanaged portfolio and a defined termination date, unlike open-end funds.",
    "keyword_tags": [
      "UIT",
      "unit investment trust",
      "mutual funds"
    ],
    "learning_objective": "Compare UITs to open-end funds per the SIE outline",
    "remediation_tip": "UIT units are sold in an initial offering; secondary trading may occur at market prices."
  }
];
