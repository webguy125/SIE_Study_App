"""Section 2: Understanding Products and Their Risks — 187 SIE exam prep questions."""

SECTION_NAME = "Understanding Products and Their Risks"


def q(section_id, topic, difficulty, prompt, choices, correct, explanation, tags, objective, tip):
    return {
        "section_id": section_id,
        "section_name": SECTION_NAME,
        "topic": topic,
        "difficulty": difficulty,
        "prompt": prompt,
        "choices": {"A": choices[0], "B": choices[1], "C": choices[2], "D": choices[3]},
        "correct_answer": correct,
        "explanation": explanation,
        "keyword_tags": tags,
        "learning_objective": objective,
        "remediation_tip": tip,
    }


def section2_questions():
    items = []

    # Mutual funds (26)
    items.append(q(2, "mutual funds", "easy",
        "The net asset value (NAV) of a mutual fund is calculated by:",
        ["Dividing total fund assets minus liabilities by shares outstanding",
         "Multiplying the fund's closing market price by 100",
         "Adding the sales charge to the bid price",
         "Using only the fund's cash holdings"],
        "A",
        "NAV = (total assets − liabilities) ÷ shares outstanding. It represents the per-share value of fund holdings.",
        ["NAV", "mutual funds", "fund valuation"],
        "Calculate and interpret mutual fund NAV",
        "NAV is priced once daily after markets close; it is not the same as a closed-end fund's market price."))

    items.append(q(2, "mutual funds", "medium",
        "An open-end mutual fund investor who redeems shares on a business day generally receives:",
        ["The next day's opening stock price of the largest holding",
         "The NAV calculated at the close of that business day, minus any applicable fees",
         "A guaranteed price set at purchase",
         "The average price of the past 30 trading days"],
        "B",
        "Open-end funds redeem at forward-priced NAV (typically the close of the day the order is received), less redemption fees or CDSC if applicable.",
        ["open-end fund", "redemption", "mutual funds"],
        "Explain open-end fund pricing and redemption mechanics",
        "Forward pricing means you do not know the exact redemption price when you submit the order."))

    items.append(q(2, "mutual funds", "medium",
        "A mutual fund with a 5% front-end load and an NAV of $20 per share at purchase will have an offering price of approximately:",
        ["$19.00", "$20.00", "$21.00", "$25.00"],
        "C",
        "Offering price = NAV ÷ (1 − load). $20 ÷ 0.95 ≈ $21.05, closest to $21. The load is taken from the purchase amount.",
        ["front-end load", "offering price", "mutual funds"],
        "Calculate offering price with a front-end sales charge",
        "Memorize: offering price = NAV / (1 − load percentage)."))

    items.append(q(2, "mutual funds", "hard",
        "A customer invests $25,000 in a Class A mutual fund with a 5% front-end load. Approximately how much is actually invested in fund shares?",
        ["$25,000", "$23,750", "$26,250", "$24,500"],
        "B",
        "With a front-end load, the sales charge is deducted first: $25,000 × 5% = $1,250 load, leaving $23,750 invested at NAV.",
        ["front-end load", "sales charge", "mutual funds"],
        "Apply front-end load calculations to customer investments",
        "Work both directions: load from gross investment and net amount reaching the fund."))

    items.append(q(2, "mutual funds", "medium",
        "A contingent deferred sales charge (CDSC) on Class B mutual fund shares is typically assessed:",
        ["At the time of purchase", "When shares are redeemed within a specified holding period",
         "Annually regardless of trading activity", "Only on dividend distributions"],
        "B",
        "CDSC is a back-end load that declines over time and is charged if the investor sells before the schedule expires.",
        ["CDSC", "back-end load", "mutual funds"],
        "Understand back-end sales charge schedules",
        "CDSC percentages usually step down each year until reaching zero."))

    items.append(q(2, "mutual funds", "easy",
        "Rule 12b-1 fees in a mutual fund are used primarily to cover:",
        ["Portfolio management and trading costs", "Distribution and shareholder service expenses",
         "SEC registration filing fees only", "Federal income taxes on fund gains"],
        "B",
        "12b-1 fees pay for marketing, distribution, and shareholder servicing. They are part of the expense ratio.",
        ["12b-1 fees", "expense ratio", "mutual funds"],
        "Identify the purpose of Rule 12b-1 fees",
        "No-load funds may still charge 12b-1 fees up to regulatory limits."))

    items.append(q(2, "mutual funds", "medium",
        "A no-load mutual fund is best described as one that:",
        ["Charges no fees of any kind", "Does not charge a traditional sales load but may have other fees",
         "Guarantees positive annual returns", "Trades only on stock exchanges"],
        "B",
        "No-load means no sales charge on purchase or redemption, but the fund can still charge management fees, 12b-1 fees, and redemption fees.",
        ["no-load fund", "mutual funds", "sales charge"],
        "Distinguish no-load funds from zero-fee funds",
        "Always review the prospectus fee table—no-load is not the same as no expenses."))

    items.append(q(2, "mutual funds", "hard",
        "An investor signs a letter of intent (LOI) to invest $50,000 over 13 months in a fund with breakpoint reductions at $25,000 and $50,000. The LOI allows the investor to:",
        ["Lock in a lower sales charge immediately based on the committed total",
         "Avoid all future management fees", "Convert Class B shares to Class A without cost",
         "Receive a guaranteed NAV for 13 months"],
        "A",
        "An LOI lets investors receive breakpoint pricing during the accumulation period based on the stated commitment, if fulfilled.",
        ["letter of intent", "breakpoint", "mutual funds"],
        "Apply letter of intent and breakpoint sales charge rules",
        "Pair LOI with rights of accumulation when studying sales charge reductions."))

    items.append(q(2, "mutual funds", "medium",
        "Rights of accumulation allow an investor to:",
        ["Vote on Federal Reserve policy", "Combine existing fund holdings and new purchases to qualify for reduced sales charges",
         "Accumulate dividends without taxation", "Avoid capital gains distributions permanently"],
        "B",
        "Rights of accumulation count prior investments in the fund family toward breakpoint thresholds for lower front-end loads.",
        ["rights of accumulation", "breakpoint", "mutual funds"],
        "Explain rights of accumulation for sales charge discounts",
        "Breakpoints reward larger purchases—know dollar thresholds in examples."))

    items.append(q(2, "mutual funds", "easy",
        "A mutual fund expense ratio represents:",
        ["The sales charge at purchase", "Annual fund operating costs as a percentage of average net assets",
         "The fund's turnover rate", "The maximum CDSC in year one"],
        "B",
        "Expense ratio includes management fees, administrative costs, and often 12b-1 fees, expressed as a percentage of assets.",
        ["expense ratio", "mutual funds", "fund costs"],
        "Interpret mutual fund expense ratios",
        "Lower expense ratios leave more return for shareholders over long holding periods."))

    items.append(q(2, "mutual funds", "medium",
        "A high portfolio turnover ratio in an equity mutual fund suggests:",
        ["The manager rarely trades holdings", "The manager frequently buys and sells securities",
         "The fund holds only Treasury bills", "The fund is a passive index fund"],
        "B",
        "Turnover measures how often the portfolio is traded. High turnover can increase transaction costs and taxable distributions.",
        ["turnover ratio", "mutual funds", "portfolio management"],
        "Relate turnover to trading activity and tax efficiency",
        "Compare active funds with high turnover to index funds with low turnover."))

    items.append(q(2, "mutual funds", "hard",
        "At year-end, a mutual fund distributes net capital gains to shareholders. Shareholders generally:",
        ["Owe no taxes because mutual funds are tax-exempt entities",
         "May owe taxes on the distribution even if they reinvest it",
         "Receive tax-free treatment for all equity fund gains",
         "Must sell shares within 30 days to avoid taxation"],
        "B",
        "Funds pass through capital gains and dividends. Reinvesting distributions does not defer the tax liability.",
        ["capital gains distribution", "mutual fund taxation", "mutual funds"],
        "Understand tax treatment of mutual fund distributions",
        "Hold funds in tax-advantaged accounts when distributions are a concern."))

    items.append(q(2, "mutual funds", "easy",
        "Money market mutual funds invest primarily in:",
        ["Long-term growth stocks", "Short-term, high-quality debt instruments",
         "Municipal real estate projects", "Speculative penny stocks"],
        "B",
        "Money market funds seek stability and liquidity by holding short-term debt such as T-bills, commercial paper, and repos.",
        ["money market fund", "mutual funds", "short-term debt"],
        "Describe money market fund investments and objectives",
        "Money market funds are not FDIC-insured despite their stable NAV tradition."))

    items.append(q(2, "mutual funds", "medium",
        "Class C mutual fund shares are often characterized by:",
        ["The highest front-end load and lowest 12b-1 fees",
         "Level loads through higher ongoing expenses and a short CDSC period",
         "No ability to convert to other share classes",
         "Availability only to institutional investors"],
        "B",
        "Class C shares typically have no front-end load but higher ongoing fees and a CDSC that expires after a relatively short period.",
        ["share classes", "Class C shares", "mutual funds"],
        "Compare mutual fund share class fee structures",
        "Build a chart of Class A, B, and C load and fee patterns."))

    items.append(q(2, "mutual funds", "medium",
        "A mutual fund prospectus is required to disclose:",
        ["Guaranteed future performance", "Investment objectives, risks, fees, and past performance",
         "The personal finances of portfolio managers", "FINRA arbitration awards against the fund"],
        "B",
        "The prospectus is the primary disclosure document covering objectives, strategies, risks, fees, and historical results.",
        ["prospectus", "disclosure", "mutual funds"],
        "Identify required mutual fund prospectus disclosures",
        "Also review the Statement of Additional Information (SAI) for deeper detail."))

    items.append(q(2, "mutual funds", "hard",
        "Under the Investment Company Act of 1940, mutual funds must:",
        ["Guarantee shareholder principal", "Register with the SEC and meet diversification and governance standards",
         "Invest only in U.S. Treasury securities", "Eliminate all investment risk through hedging"],
        "B",
        "The 1940 Act regulates investment companies, requiring registration, disclosure, and structural protections for fund investors.",
        ["Investment Company Act", "mutual funds", "SEC registration"],
        "Understand basic Investment Company Act requirements",
        "Contrast the 1940 Act (funds) with the 1933 Act (new securities offerings)."))

    items.append(q(2, "mutual funds", "easy",
        "A primary benefit of investing in a diversified equity mutual fund compared to a single stock is:",
        ["Elimination of all market risk", "Reduced company-specific risk through broader holdings",
         "Guaranteed dividends every quarter", "Exemption from federal income tax"],
        "B",
        "Mutual funds pool capital to hold many securities, reducing unsystematic (company-specific) risk but not overall market risk.",
        ["diversification", "mutual funds", "investment risks"],
        "Explain diversification benefits of mutual funds",
        "Diversification reduces specific risk, not systematic market risk."))

    items.append(q(2, "mutual funds", "medium",
        "An index mutual fund typically aims to:",
        ["Outperform its benchmark by 5% annually", "Match the performance of a specified index before expenses",
         "Avoid holding any bonds", "Change its benchmark monthly"],
        "B",
        "Index funds use passive management to replicate index returns, minus fees and tracking differences.",
        ["index fund", "passive management", "mutual funds"],
        "Describe index mutual fund objectives and management style",
        "Tracking error measures how closely a fund follows its index."))

    items.append(q(2, "mutual funds", "hard",
        "A fund family switching privilege generally allows shareholders to:",
        ["Transfer between funds in the same family without a new sales charge, subject to policy",
         "Switch to any fund on any exchange without fees",
         "Convert mutual fund shares to ETFs at NAV without cost",
         "Avoid capital gains taxes on all exchanges"],
        "B",
        "Many fund families permit tax-reportable exchanges among their funds, sometimes waiving loads but not potential tax consequences.",
        ["fund family", "exchange privilege", "mutual funds"],
        "Understand mutual fund exchange privileges and tax effects",
        "Exchanges may be taxable events even when sales charges are waived."))

    items.append(q(2, "mutual funds", "medium",
        "A mutual fund redemption fee, unlike a sales load, is typically:",
        ["Paid to a registered representative as commission",
         "Retained by the fund to discourage short-term trading",
         "Capped at 8.5% under FINRA rules",
         "Assessed only on retirement accounts"],
        "B",
        "Redemption fees go back to the fund to offset trading costs from frequent in-and-out trading.",
        ["redemption fee", "mutual funds", "market timing"],
        "Distinguish redemption fees from sales loads",
        "Redemption fees protect long-term shareholders from costs of rapid traders."))

    items.append(q(2, "mutual funds", "easy",
        "The board of directors (or trustees) of a mutual fund is responsible for:",
        ["Day-to-day stock selection by the portfolio manager",
         "Overseeing the fund and protecting shareholder interests",
         "Setting Federal Reserve interest rates",
         "Underwriting municipal bond offerings"],
        "B",
        "The board oversees the adviser, reviews fees, and acts on behalf of shareholders under the 1940 Act.",
        ["board of trustees", "mutual funds", "governance"],
        "Describe mutual fund governance structure",
        "The investment adviser manages daily operations; the board provides oversight."))

    items.append(q(2, "mutual funds", "medium",
        "A growth and income mutual fund typically invests in securities that:",
        ["Mature in less than 90 days", "Offer both capital appreciation potential and dividend income",
         "Are issued only by municipalities", "Have no equity component"],
        "B",
        "Growth and income funds blend stocks with growth potential and dividend-paying companies for dual objectives.",
        ["growth and income", "fund objectives", "mutual funds"],
        "Match mutual fund categories to investor objectives",
        "Align fund objective statements with customer goals and risk tolerance."))

    items.append(q(2, "mutual funds", "hard",
        "If a mutual fund's NAV rises from $15 to $18 and it distributes a $1 dividend, an investor who reinvests the dividend has:",
        ["A lower cost basis and fewer shares", "Additional shares purchased at the distribution NAV",
         "No tax reporting requirement", "A guaranteed $3 short-term gain"],
        "B",
        "Reinvested dividends buy more shares at the post-distribution price. The distribution is still taxable unless held in a qualified account.",
        ["dividend reinvestment", "mutual funds", "cost basis"],
        "Analyze dividend reinvestment effects on share count and taxes",
        "Track distributions for tax reporting even when automatically reinvested."))

    items.append(q(2, "mutual funds", "medium",
        "Closed-end funds differ from open-end mutual funds because closed-end funds:",
        ["Always sell shares at NAV", "Issue a fixed number of shares that trade on exchanges at market prices",
         "Redeem shares daily at the fund company", "Are exempt from SEC registration"],
        "B",
        "Closed-end funds trade like stocks and may price at a premium or discount to NAV.",
        ["closed-end fund", "mutual funds", "premium discount"],
        "Compare open-end and closed-end fund structures",
        "Open-end = fund company transactions at NAV; closed-end = exchange trading at market price."))

    items.append(q(2, "mutual funds", "easy",
        "A mutual fund's investment objective is found primarily in the:",
        ["Form U4", "Prospectus", "Currency Transaction Report", "Blue Sheet filing"],
        "B",
        "The prospectus states whether the fund seeks growth, income, preservation of capital, or a combination.",
        ["investment objective", "prospectus", "mutual funds"],
        "Locate and interpret fund investment objectives",
        "Mismatch between client goals and fund objective is a suitability concern."))

    items.append(q(2, "mutual funds", "hard",
        "A customer owns Class B shares with a declining CDSC schedule. After the CDSC period expires, the customer would typically:",
        ["Pay a higher front-end load on redemption", "Redeem without a CDSC, though other fees may apply",
         "Automatically convert to Class A with no action",
         "Lose voting rights in the fund"],
        "B",
        "Once the CDSC schedule ends, redemption is not subject to the deferred sales charge, but annual expenses may remain higher than Class A.",
        ["CDSC", "Class B shares", "mutual funds"],
        "Apply CDSC schedule expiration rules",
        "Some Class B shares convert to Class A after a set period—check fund policy."))

    # ETFs (20)
    items.append(q(2, "ETFs", "easy",
        "Exchange-traded funds (ETFs) are bought and sold:",
        ["Only once daily at NAV directly from the fund", "On stock exchanges throughout the trading day at market prices",
         "Exclusively through insurance agents", "Only in the primary market from the issuer"],
        "B",
        "ETFs trade intraday on exchanges like stocks, with prices driven by supply and demand.",
        ["ETF trading", "secondary market", "ETFs"],
        "Explain how ETF shares trade in the market",
        "Intraday trading is a key difference from traditional open-end mutual funds."))

    items.append(q(2, "ETFs", "medium",
        "The creation and redemption process for ETFs involves:",
        ["Retail investors exchanging shares directly with the fund for cash daily",
         "Authorized participants assembling baskets of securities with the fund sponsor",
         "The SEC issuing new ETF shares at auction", "FDIC insurance on each creation unit"],
        "B",
        "Authorized participants create or redeem large blocks (creation units) by delivering or receiving the underlying portfolio securities.",
        ["creation redemption", "authorized participant", "ETFs"],
        "Describe ETF creation and redemption mechanics",
        "This in-kind process helps ETFs stay near NAV and can improve tax efficiency."))

    items.append(q(2, "ETFs", "medium",
        "An ETF trading at $52 when its NAV is $50 is said to be trading at a:",
        ["Discount", "Premium", "Breakpoint", "Par call"],
        "B",
        "When market price exceeds NAV, the ETF trades at a premium. Below NAV is a discount.",
        ["premium", "NAV", "ETFs"],
        "Identify ETF premium and discount to NAV",
        "Arbitrage by authorized participants tends to keep prices near NAV."))

    items.append(q(2, "ETFs", "hard",
        "ETFs are often more tax-efficient than actively managed mutual funds primarily because:",
        ["ETF gains are always tax-exempt", "In-kind redemptions can minimize the fund's need to sell appreciated securities",
         "ETFs never distribute dividends", "ETFs are not subject to capital gains taxes"],
        "B",
        "In-kind creation/redemption allows the fund to shed low-basis shares without triggering fund-level taxable sales.",
        ["tax efficiency", "in-kind redemption", "ETFs"],
        "Explain ETF tax efficiency relative to mutual funds",
        "Investors still owe taxes on their own gains and on distributions received."))

    items.append(q(2, "ETFs", "easy",
        "Compared to most actively managed mutual funds, index ETFs generally have:",
        ["Higher expense ratios and more trading restrictions",
         "Lower expense ratios and passive management",
         "No underlying holdings disclosure", "Mandatory front-end loads"],
        "B",
        "Passive index ETFs typically charge lower fees than active mutual funds and track a benchmark.",
        ["expense ratio", "index ETF", "ETFs"],
        "Compare ETF and mutual fund cost structures",
        "Always compare total costs including spreads and commissions."))

    items.append(q(2, "ETFs", "medium",
        "A sector ETF that tracks the energy industry will primarily hold:",
        ["Only U.S. Treasury securities", "Stocks of companies in the energy sector",
         "Municipal revenue bonds", "Annuity contracts"],
        "B",
        "Sector ETFs concentrate in a specific industry, increasing sector-specific risk.",
        ["sector ETF", "concentration risk", "ETFs"],
        "Understand sector ETF composition and risks",
        "Sector funds lack broad diversification across industries."))

    items.append(q(2, "ETFs", "hard",
        "Leveraged ETFs seek to deliver a multiple of the daily return of an index. A 2x leveraged ETF is MOST appropriate for:",
        ["Long-term buy-and-hold retirement accounts",
         "Short-term trading by sophisticated investors who understand daily reset risk",
         "Investors seeking guaranteed principal protection",
         "Clients who cannot tolerate volatility"],
        "B",
        "Leveraged ETFs reset daily; compounding effects can cause long-term returns to diverge sharply from the index multiple.",
        ["leveraged ETF", "daily reset", "ETFs"],
        "Assess suitability and risks of leveraged ETFs",
        "Daily leverage is a trading tool, not a long-term investment vehicle."))

    items.append(q(2, "ETFs", "medium",
        "An inverse ETF is designed to:",
        ["Deliver twice the positive return of an index",
         "Move opposite to the daily performance of its benchmark",
         "Invest only in investment-grade bonds",
         "Eliminate market risk entirely"],
        "B",
        "Inverse ETFs seek the opposite of the benchmark's daily return and carry significant risk, especially over longer periods.",
        ["inverse ETF", "ETFs", "hedging"],
        "Explain inverse ETF objectives and risks",
        "Inverse and leveraged products require careful suitability review."))

    items.append(q(2, "ETFs", "easy",
        "Bond ETFs differ from individual bonds because bond ETFs:",
        ["Have a single fixed maturity date like a corporate bond",
         "Do not mature; they maintain a portfolio with ongoing duration",
         "Are always insured by the FDIC", "Pay no interest income"],
        "B",
        "Bond ETFs are perpetual funds holding a changing portfolio of bonds rather than a single fixed-maturity obligation.",
        ["bond ETF", "duration", "ETFs"],
        "Compare bond ETFs to individual bond ownership",
        "Individual bonds can be held to maturity; bond ETFs do not offer that same defined maturity."))

    items.append(q(2, "ETFs", "medium",
        "Tracking error in an ETF measures:",
        ["The bid-ask spread at market open",
         "How closely the ETF's performance matches its benchmark index",
         "The fund's credit rating", "The sales charge on purchase"],
        "B",
        "Tracking error reflects differences between ETF returns and index returns, often due to fees, sampling, or timing.",
        ["tracking error", "index ETF", "ETFs"],
        "Define and interpret ETF tracking error",
        "Lower tracking error generally indicates better index replication."))

    items.append(q(2, "ETFs", "hard",
        "A physically backed gold ETF holds:",
        ["Only gold mining company stocks", "Actual gold bullion or similar physical assets",
         "Gold futures without collateral", "Municipal bond proceeds"],
        "B",
        "Physical ETFs hold the underlying commodity in storage, while others may use derivatives for exposure.",
        ["commodity ETF", "physical backing", "ETFs"],
        "Distinguish physical vs synthetic ETF structures",
        "Review whether exposure comes from holdings or derivatives."))

    items.append(q(2, "ETFs", "medium",
        "The bid-ask spread on an ETF represents:",
        ["The fund's annual expense ratio", "The difference between the highest buy price and lowest sell price",
         "The CDSC on redemption", "The dividend yield of the underlying index"],
        "B",
        "Wider spreads increase transaction costs, especially for thinly traded ETFs.",
        ["bid-ask spread", "ETF liquidity", "ETFs"],
        "Understand ETF trading costs beyond expense ratios",
        "Use limit orders on less liquid ETFs to control execution price."))

    items.append(q(2, "ETFs", "easy",
        "Most ETFs provide portfolio transparency by:",
        ["Disclosing holdings daily or frequently", "Hiding holdings for five years",
         "Reporting only once at fund termination", "Publishing holdings only to institutional investors"],
        "A",
        "ETFs typically disclose holdings daily, helping investors understand exposures.",
        ["transparency", "ETF holdings", "ETFs"],
        "Explain ETF disclosure practices",
        "Transparency supports informed investment decisions."))

    items.append(q(2, "ETFs", "medium",
        "Actively managed ETFs differ from traditional index ETFs because they:",
        ["Track a fixed index with no manager discretion",
         "Use portfolio managers to select securities seeking to outperform a benchmark",
         "Cannot trade on exchanges", "Are not registered with the SEC"],
        "B",
        "Active ETFs employ managers making investment decisions rather than passive index replication.",
        ["actively managed ETF", "ETFs", "portfolio management"],
        "Compare active and passive ETF strategies",
        "Active ETFs may have higher fees and different tax profiles."))

    items.append(q(2, "ETFs", "hard",
        "When comparing an ETF to a similar open-end index mutual fund, an active trader who values intraday execution would likely prefer the ETF because:",
        ["ETFs always trade free of commissions",
         "ETFs can be bought and sold at market prices throughout the day",
         "ETFs never trade at a premium or discount",
         "ETFs are FDIC insured"],
        "B",
        "Intraday exchange trading gives ETFs flexibility that once-daily mutual fund pricing does not.",
        ["intraday trading", "ETF vs mutual fund", "ETFs"],
        "Match product features to investor trading needs",
        "Long-term investors may care more about automatic investing and fractional shares."))

    items.append(q(2, "ETFs", "medium",
        "Dividends received by an ETF shareholder are generally:",
        ["Tax-exempt for all investors", "Taxable according to the character of the underlying income",
         "Treated as return of capital only", "Paid only to authorized participants"],
        "B",
        "ETF distributions may be qualified dividends, ordinary income, or capital gains depending on fund holdings.",
        ["ETF dividends", "taxation", "ETFs"],
        "Understand ETF distribution tax treatment",
        "Check the fund's distribution history and tax supplements."))

    items.append(q(2, "ETFs", "easy",
        "A broad market equity ETF provides investors with:",
        ["Exposure to a wide segment of the stock market in a single security",
         "A guarantee against loss of principal",
         "Access only to foreign securities", "Fixed annual interest payments like a bond"],
        "A",
        "Broad market ETFs hold diversified baskets of stocks tracking indices such as the S&P 500 or total market indexes.",
        ["broad market ETF", "diversification", "ETFs"],
        "Describe benefits of broad market ETFs",
        "One share provides instant diversification across many companies."))

    items.append(q(2, "ETFs", "medium",
        "Settlement for ETF trades on exchanges generally follows:",
        ["Same-day cash settlement only", "Regular-way equity settlement time frames",
         "Thirty-day deferred settlement", "Settlement only at fund month-end"],
        "B",
        "As of 2026, ETFs settle like stocks on the T+1 regular-way equity settlement cycle.",
        ["settlement", "ETF trading", "T+1"],
        "Know ETF settlement conventions",
        "T+1 settlement affects cash availability and good-faith violations in cash accounts."))

    items.append(q(2, "ETFs", "hard",
        "A customer comparing a closed-end fund and an ETF notices both trade on an exchange. A key similarity is:",
        ["Both redeem shares daily at NAV with the issuer",
         "Both can trade at prices different from NAV",
         "Both are issued only in the primary market",
         "Neither holds a portfolio of securities"],
        "B",
        "Exchange trading means both can trade at premiums or discounts relative to portfolio value.",
        ["closed-end fund", "premium discount", "ETFs"],
        "Compare ETFs and closed-end funds trading characteristics",
        "ETF arbitrage mechanisms often keep prices closer to NAV than closed-end funds."))

    items.append(q(2, "ETFs", "medium",
        "An investor using a limit order to buy an ETF is attempting to:",
        ["Purchase at the best available price with no price control",
         "Set the maximum price they will pay for the ETF shares",
         "Avoid all brokerage commissions", "Buy directly from the fund at NAV"],
        "B",
        "Limit orders specify the highest price a buyer will pay, controlling execution cost on ETFs.",
        ["limit order", "ETF trading", "ETFs"],
        "Apply order types to ETF transactions",
        "Market orders execute quickly but may pay wider spreads in illiquid ETFs."))

    # REITs (14)
    items.append(q(2, "REITs", "easy",
        "A Real Estate Investment Trust (REIT) is a company that:",
        ["Owns or finances income-producing real estate and distributes income to shareholders",
         "Issues only municipal bonds for housing authorities",
         "Guarantees property values against market declines",
         "Operates exclusively as a hedge fund"],
        "A",
        "REITs pool investor capital to own or finance real estate and pass income through to investors.",
        ["REIT", "real estate", "income distribution"],
        "Define REIT structure and purpose",
        "REITs must meet IRS requirements including income distribution thresholds."))

    items.append(q(2, "REITs", "medium",
        "Equity REITs primarily generate income from:",
        ["Originating and holding mortgages", "Owning and operating properties that collect rent",
         "Trading Treasury STRIPS", "Writing options on commodities"],
        "B",
        "Equity REITs own physical properties—apartments, offices, malls—and earn rental income.",
        ["equity REIT", "rental income", "REITs"],
        "Distinguish equity REITs from mortgage REITs",
        "Mortgage REITs lend money or hold mortgages rather than operating buildings."))

    items.append(q(2, "REITs", "medium",
        "Mortgage REITs (mREITs) are most exposed to:",
        ["Tenant vacancy in shopping malls only", "Interest rate changes and credit spreads on loans",
         "Crop failures in agricultural regions", "Currency pegs in emerging markets"],
        "B",
        "mREITs profit from the spread between borrowing costs and mortgage yields, making them rate-sensitive.",
        ["mortgage REIT", "interest rate risk", "REITs"],
        "Identify risks specific to mortgage REITs",
        "Compare equity REIT property risk vs mREIT financing risk."))

    items.append(q(2, "REITs", "hard",
        "To qualify as a REIT, a company must distribute at least what percentage of taxable income to shareholders annually?",
        ["50%", "75%", "90%", "100%"],
        "C",
        "REITs must pay out at least 90% of taxable income as dividends to maintain REIT tax status.",
        ["REIT qualification", "distribution requirement", "REITs"],
        "Know REIT income distribution requirements",
        "High payout ratios can limit reinvestment for growth."))

    items.append(q(2, "REITs", "medium",
        "REIT dividends paid to investors are generally taxed as:",
        ["Tax-free return of principal only", "Ordinary income, capital gains, or return of capital components",
         "Always long-term capital gains", "Exempt from all federal taxes"],
        "B",
        "REIT distributions may include ordinary income, capital gains, and return of capital, each with different tax treatment.",
        ["REIT taxation", "dividends", "REITs"],
        "Understand REIT dividend tax character",
        "Review the year-end 1099-DIV breakdown for each component."))

    items.append(q(2, "REITs", "easy",
        "Publicly traded REITs offer investors liquidity because they:",
        ["Can only be redeemed quarterly at NAV", "Trade on major stock exchanges",
         "Require a 10-year holding period", "Are sold exclusively through life insurance agents"],
        "B",
        "Listed REIT shares trade on exchanges, unlike many non-traded REITs with limited liquidity.",
        ["publicly traded REIT", "liquidity", "REITs"],
        "Compare liquidity of traded vs non-traded REITs",
        "Non-traded REITs may have redemption programs with limits and delays."))

    items.append(q(2, "REITs", "medium",
        "A hybrid REIT holds:",
        ["Only U.S. Treasury inflation-protected securities",
         "Both physical properties and mortgage loans",
         "Exclusively foreign currency contracts",
         "Only undeveloped land with no income"],
        "B",
        "Hybrid REITs combine equity (property ownership) and mortgage (lending) activities.",
        ["hybrid REIT", "REITs", "real estate"],
        "Identify hybrid REIT investment activities",
        "Know the three REIT types: equity, mortgage, and hybrid."))

    items.append(q(2, "REITs", "hard",
        "Rising interest rates typically pressure REIT share prices primarily because:",
        ["REITs must delist from exchanges", "Higher rates increase borrowing costs and compete with REIT yields",
         "REITs lose their tax status immediately", "Rental income becomes illegal under federal law"],
        "B",
        "REITs use leverage and compete with bonds for yield-seeking investors; higher rates can reduce relative attractiveness.",
        ["interest rate risk", "REITs", "investment risks"],
        "Explain interest rate sensitivity of REIT investments",
        "Not all REIT sectors react identically—some are more defensive."))

    items.append(q(2, "REITs", "medium",
        "Non-traded REITs are characterized by:",
        ["Daily exchange trading at market prices",
         "Limited liquidity, often with periodic redemption programs",
         "SEC exemption from all disclosure",
         "Guaranteed NAV appreciation"],
        "B",
        "Non-traded REITs do not trade on exchanges; liquidity is limited and may come through sponsor redemption plans.",
        ["non-traded REIT", "liquidity risk", "REITs"],
        "Assess liquidity risks of non-traded REITs",
        "Review offering documents for redemption frequency and limits."))

    items.append(q(2, "REITs", "easy",
        "Investing in a REIT allows shareholders to gain real estate exposure without:",
        ["Any market risk", "Directly buying and managing physical property",
         "Receiving any income distributions", "Paying taxes on dividends"],
        "B",
        "REITs provide indirect real estate investment with professional management and smaller capital requirements.",
        ["real estate exposure", "REITs", "diversification"],
        "Explain indirect real estate investment through REITs",
        "REITs still carry property market and economic risks."))

    items.append(q(2, "REITs", "medium",
        "Occupancy rates are a key performance metric for:",
        ["Mortgage REITs holding only Treasury bonds", "Equity REITs that lease space to tenants",
         "Money market mutual funds", "Variable annuity subaccounts only"],
        "B",
        "Higher occupancy supports rental revenue for property-owning equity REITs.",
        ["occupancy rate", "equity REIT", "REITs"],
        "Interpret REIT operating metrics",
        "Pair occupancy with lease terms and tenant credit quality."))

    items.append(q(2, "REITs", "hard",
        "A REIT's use of leverage (borrowing) increases:",
        ["FDIC insurance on shares", "Potential returns and financial risk",
         "Guaranteed dividend stability", "Exemption from SEC reporting"],
        "B",
        "Debt can amplify returns in strong markets but increases vulnerability in downturns or when rates rise.",
        ["leverage", "REITs", "investment risks"],
        "Evaluate leverage risk in REIT capital structures",
        "Review debt ratios and interest coverage in REIT analysis."))

    items.append(q(2, "REITs", "medium",
        "REITs may serve as a partial inflation hedge over time because:",
        ["Real estate rents and property values may rise with inflation",
         "REIT dividends are indexed to CPI by law",
         "REITs hold only fixed-rate Treasuries", "REIT shares are backed by the FDIC"],
        "A",
        "Tangible real estate income streams can adjust over time, though REIT stocks remain volatile.",
        ["inflation hedge", "REITs", "real estate"],
        "Discuss REIT role in inflation environments",
        "REITs are not perfect inflation hedges—stock prices fluctuate."))

    items.append(q(2, "REITs", "easy",
        "Shares of a REIT represent:",
        ["Direct deed ownership of a single apartment unit",
         "Ownership interest in a company that holds a real estate portfolio",
         "A municipal bond backed by property taxes",
         "A call option on land"],
        "B",
        "Investors own stock in the REIT entity, not direct title to individual properties.",
        ["REIT ownership", "REITs", "equity securities"],
        "Clarify what REIT shareholders actually own",
        "Contrast REIT shares with direct property ownership and landlord duties."))

    # Options basics (26)
    items.append(q(2, "options basics", "easy",
        "A call option gives the holder the right to:",
        ["Sell 100 shares of stock at the strike price", "Buy 100 shares of stock at the strike price",
         "Receive a dividend from the OCC", "Cancel a margin loan at any price"],
        "B",
        "A call grants the right, not the obligation, to purchase the underlying at the strike price before expiration.",
        ["call option", "options basics", "strike price"],
        "Define call option holder rights",
        "Standard equity options cover 100 shares per contract."))

    items.append(q(2, "options basics", "easy",
        "A put option gives the holder the right to:",
        ["Buy stock at the strike price", "Sell stock at the strike price",
         "Receive interest on a bond", "Convert bonds to common stock"],
        "B",
        "A put grants the right to sell the underlying at the strike price, useful for hedging or bearish strategies.",
        ["put option", "options basics", "strike price"],
        "Define put option holder rights",
        "Long puts profit when the underlying price falls below the strike (minus premium)."))

    items.append(q(2, "options basics", "medium",
        "The premium of an option represents:",
        ["The strike price of the contract", "The price the buyer pays for the option contract",
         "The dividend per share", "The margin requirement for the underlying stock"],
        "B",
        "Premium is the market price of the option, paid by the buyer to the seller (writer).",
        ["option premium", "options basics", "options pricing"],
        "Define option premium",
        "Premium = intrinsic value + time value (for American options before expiration)."))

    items.append(q(2, "options basics", "medium",
        "A call option is in-the-money when the market price of the stock is:",
        ["Below the strike price", "Above the strike price",
         "Equal to the strike price", "Unchanged from purchase date"],
        "B",
        "Calls are ITM when the stock price exceeds the strike, giving exercise economic value.",
        ["in-the-money", "call option", "options basics"],
        "Determine moneyness for call options",
        "ITM calls have intrinsic value; OTM calls have only time value."))

    items.append(q(2, "options basics", "medium",
        "A put option is out-of-the-money when the stock price is:",
        ["Below the strike price", "Above the strike price",
         "Equal to zero", "Equal to the premium"],
        "B",
        "Puts are OTM when the stock trades above the strike; exercising would not be advantageous.",
        ["out-of-the-money", "put option", "options basics"],
        "Determine moneyness for put options",
        "ATM means stock price approximately equals strike price."))

    items.append(q(2, "options basics", "hard",
        "An investor buys a call with a $50 strike when the stock is at $55. The intrinsic value is:",
        ["$0", "$5", "$50", "$55"],
        "B",
        "Intrinsic value for a call = stock price − strike = $55 − $50 = $5 per share ($500 per contract).",
        ["intrinsic value", "call option", "options basics"],
        "Calculate option intrinsic value",
        "If stock were at $48, a $50 call intrinsic value would be zero."))

    items.append(q(2, "options basics", "hard",
        "A put option with a $40 strike is purchased when the stock is at $35. The intrinsic value per share is:",
        ["$0", "$5", "$35", "$40"],
        "B",
        "Put intrinsic value = strike − stock price = $40 − $35 = $5.",
        ["intrinsic value", "put option", "options basics"],
        "Calculate put option intrinsic value",
        "Total contract intrinsic value = per-share value × 100."))

    items.append(q(2, "options basics", "medium",
        "Time value in an option premium equals:",
        ["The strike price minus the stock price always",
         "The portion of premium exceeding intrinsic value",
         "The dividend yield on the underlying", "The margin interest rate"],
        "B",
        "Time value reflects the possibility the option could gain more intrinsic value before expiration.",
        ["time value", "options basics", "option premium"],
        "Separate intrinsic and time value components",
        "At expiration, time value approaches zero."))

    items.append(q(2, "options basics", "easy",
        "The Options Clearing Corporation (OCC) acts as:",
        ["The issuer of all corporate bonds", "The central counterparty guaranteeing standardized option contracts",
         "A municipal bond rating agency", "A mutual fund transfer agent"],
        "B",
        "OCC clears and guarantees exchange-traded options, reducing counterparty risk.",
        ["OCC", "options clearing", "options basics"],
        "Explain OCC role in options markets",
        "Standardization includes contract size, expiration dates, and strike intervals."))

    items.append(q(2, "options basics", "medium",
        "American-style options may be exercised:",
        ["Only at expiration", "At any time up to and including expiration",
         "Only if the stock pays a dividend", "Only by institutional investors"],
        "B",
        "American options allow early exercise; most U.S. equity options are American-style.",
        ["American-style", "exercise", "options basics"],
        "Distinguish American vs European exercise styles",
        "Index options are often European-style—check contract specifications."))

    items.append(q(2, "options basics", "medium",
        "An investor who writes (sells) an uncovered call option faces:",
        ["Limited risk equal to the premium received",
         "Potentially unlimited risk if the stock rises sharply",
         "No obligation if the option expires", "FDIC protection on losses"],
        "B",
        "Uncovered call writers must deliver stock if assigned, with theoretically unlimited upside risk on the stock.",
        ["uncovered call", "option writer", "options basics"],
        "Assess risk of writing uncovered options",
        "Writing options obligates the writer—unlike the holder's right to exercise."))

    items.append(q(2, "options basics", "hard",
        "A covered call strategy involves:",
        ["Owning the underlying stock and writing a call against it",
         "Buying a put and call on different stocks",
         "Writing a put without cash reserves",
         "Buying calls on margin without owning shares"],
        "A",
        "The investor owns shares and sells calls, generating premium income with limited upside above the strike.",
        ["covered call", "options basics", "income strategy"],
        "Describe covered call construction and objectives",
        "Covered calls cap upside but generate income from premiums."))

    items.append(q(2, "options basics", "medium",
        "A protective put strategy is used to:",
        ["Speculate on unlimited stock declines with no stock ownership",
         "Hedge a stock position against downside risk by owning puts",
         "Eliminate all investment risk", "Generate tax-free income"],
        "B",
        "Owning stock plus a put limits downside (floor) while preserving upside minus premium paid.",
        ["protective put", "hedging", "options basics"],
        "Explain protective put risk management",
        "Think of a protective put as portfolio insurance."))

    items.append(q(2, "options basics", "easy",
        "If an option expires out-of-the-money, the holder will typically:",
        ["Be required to exercise", "Allow it to expire worthless",
         "Receive the strike price in cash", "Automatically sell the underlying stock"],
        "B",
        "An OTM option has no exercise value; the holder loses the premium paid.",
        ["expiration", "out-of-the-money", "options basics"],
        "Understand option expiration outcomes",
        "Writers keep the premium if options expire worthless."))

    items.append(q(2, "options basics", "medium",
        "Closing an options position before expiration is done by:",
        ["Exercising the option only", "Entering an offsetting transaction in the market",
         "Filing a Form U4", "Requesting a stock split"],
        "B",
        "Most positions are closed by trading the opposite side (buy to close a short, sell to close a long).",
        ["closing transaction", "options basics", "offsetting trade"],
        "Explain how to close options positions",
        "Exercise is one alternative but not required to realize gains or losses."))

    items.append(q(2, "options basics", "hard",
        "An investor buys one call contract at a $3 premium. Maximum loss is:",
        ["$3", "$300", "$30,000", "Unlimited"],
        "B",
        "One contract = 100 shares. Maximum loss for a long option is the premium paid: $3 × 100 = $300.",
        ["maximum loss", "long call", "options basics"],
        "Calculate maximum loss on long option positions",
        "Long options have limited risk (premium); short options can have substantial risk."))

    items.append(q(2, "options basics", "medium",
        "The strike price of an option is:",
        ["The current market price of the stock always",
         "The predetermined price at which the underlying can be bought or sold",
         "The OCC guarantee fund limit", "The commission charged by the broker"],
        "B",
        "Strike price is fixed in the contract and determines moneyness and exercise economics.",
        ["strike price", "options basics", "contract terms"],
        "Define strike price in option contracts",
        "Match strike selection to the investor's outlook and risk tolerance."))

    items.append(q(2, "options basics", "easy",
        "Standardized exchange-traded equity options represent how many shares of the underlying?",
        ["10", "50", "100", "1,000"],
        "C",
        "One equity option contract typically covers 100 shares of the underlying stock.",
        ["contract size", "options basics", "standardization"],
        "Know standard equity option contract size",
        "Multiply per-share values by 100 for per-contract dollar amounts."))

    items.append(q(2, "options basics", "medium",
        "A bullish investor expecting moderate stock appreciation might consider:",
        ["Buying a put", "Buying a call",
         "Writing a covered call only if willing to cap upside", "Selling uncovered puts without cash"],
        "B",
        "Long calls benefit from rising stock prices. Covered calls are bullish to neutral with income.",
        ["bullish strategy", "call option", "options basics"],
        "Match option strategies to market outlook",
        "Strategy choice depends on risk tolerance and income vs growth goals."))

    items.append(q(2, "options basics", "hard",
        "An investor owns stock purchased at $60 and buys a $55 put for $2. If the stock falls to $45 at expiration, the net result per share is approximately:",
        ["A $7 loss", "A $3 profit", "A $10 profit", "A $15 loss"],
        "A",
        "Stock loses $15 ($60 to $45). The put gains $8 intrinsic value minus $2 premium = $8 net on the put. Combined: −$15 + $8 = −$7 per share.",
        ["protective put", "options basics", "profit loss"],
        "Calculate combined stock and protective put outcomes",
        "Protective puts limit downside but do not eliminate loss from premium and strike gap."))

    items.append(q(2, "options basics", "medium",
        "A bearish investor who owns no stock might consider buying:",
        ["A call option", "A put option",
         "A covered call", "An uncovered call"],
        "B",
        "Long puts increase in value as the underlying price falls, profiting from bearish moves without owning stock.",
        ["bearish strategy", "put option", "options basics"],
        "Select option strategies for bearish outlooks",
        "Short selling stock is another bearish approach with different risk profile."))

    items.append(q(2, "options basics", "hard",
        "An investor sells an uncovered put and receives a $4 premium. If assigned when the stock is $38 and the strike is $40, the effective purchase price per share is:",
        ["$38", "$36", "$42", "$34"],
        "B",
        "Assignment requires buying at $40 strike. Net cost = $40 − $4 premium = $36 per share.",
        ["uncovered put", "assignment", "options basics"],
        "Calculate net cost after put assignment",
        "Cash-secured put writers should be willing to own the stock at the net price."))

    items.append(q(2, "options basics", "medium",
        "The expiration date of an option contract is significant because:",
        ["After expiration the holder may exercise at any time",
         "After expiration the option ceases to exist except for settlement of exercised contracts",
         "Expiration resets the strike price", "Expiration eliminates all stock market risk"],
        "B",
        "Options are wasting assets; after expiration unexercised contracts expire worthless.",
        ["expiration date", "options basics", "time decay"],
        "Understand option expiration mechanics",
        "Time decay accelerates as expiration approaches."))

    items.append(q(2, "options basics", "easy",
        "When an option holder exercises a call, the writer must:",
        ["Deliver the underlying stock at the strike price", "Cancel all other open orders",
         "Repurchase the option at double premium", "File a registration statement with the SEC"],
        "A",
        "Call writers are obligated to deliver shares upon assignment when the holder exercises.",
        ["exercise", "option writer", "options basics"],
        "Explain writer obligations upon exercise",
        "Assignment can occur at any time for American-style options."))

    items.append(q(2, "options basics", "medium",
        "Options provide leverage because:",
        ["They always cost more than buying the stock outright",
         "A relatively small premium controls exposure to 100 shares of stock",
         "They eliminate the need for margin", "They guarantee profits in volatile markets"],
        "B",
        "A modest premium can provide significant exposure to price moves in the underlying.",
        ["leverage", "options basics", "risk reward"],
        "Explain leverage characteristics of options",
        "Leverage magnifies both gains and losses."))

    items.append(q(2, "options basics", "hard",
        "A call option with a $30 strike trades at $4 when the stock is at $33. The time value per share is:",
        ["$0", "$1", "$3", "$4"],
        "B",
        "Intrinsic value = $33 − $30 = $3. Premium $4 − intrinsic $3 = $1 time value per share.",
        ["time value", "intrinsic value", "options basics"],
        "Calculate time value from premium and intrinsic value",
        "ATM and OTM options consist entirely of time value."))

    # Annuity basics (16)
    items.append(q(2, "annuity basics", "easy",
        "A fixed annuity guarantees:",
        ["Returns tied directly to a stock index with no minimum",
         "A specified minimum rate of interest on the insurer's general account",
         "Daily liquidity with no surrender charges", "SEC registration like a mutual fund"],
        "B",
        "Fixed annuities credit interest at rates set by the contract, backed by the insurance company's general account.",
        ["fixed annuity", "annuity basics", "insurance products"],
        "Describe fixed annuity features",
        "Fixed annuities are insurance products, not securities in typical form."))

    items.append(q(2, "annuity basics", "medium",
        "A variable annuity invests primarily in:",
        ["Only U.S. Treasury bills", "Separate account subaccounts selected by the contract owner",
         "Municipal bond pools exclusively", "FDIC-insured CDs"],
        "B",
        "Variable annuity assets are held in separate accounts, often resembling mutual fund portfolios.",
        ["variable annuity", "separate account", "annuity basics"],
        "Explain variable annuity investment structure",
        "Separate account assets are insulated from the insurer's general account creditors."))

    items.append(q(2, "annuity basics", "medium",
        "An indexed annuity (fixed indexed annuity) credits interest based on:",
        ["A formula linked to an equity index with caps, spreads, or participation rates",
         "Daily trading on a stock exchange", "Federal Reserve discount rate only",
         "Unlimited upside with no minimum return"],
        "A",
        "Indexed annuities link returns to an index but typically guarantee principal with limited upside through contract terms.",
        ["indexed annuity", "annuity basics", "insurance products"],
        "Understand indexed annuity return mechanics",
        "Read caps, participation rates, and floors in the contract."))

    items.append(q(2, "annuity basics", "easy",
        "An immediate annuity begins payments:",
        ["Within one year of purchase, typically within 30 days",
         "Only after the owner reaches age 70½",
         "Never; only lump sums are allowed", "Only upon stock market correction"],
        "A",
        "Immediate annuities start the income stream shortly after a lump-sum premium is paid.",
        ["immediate annuity", "annuitization", "annuity basics"],
        "Distinguish immediate from deferred annuities",
        "Deferred annuities accumulate before payouts begin."))

    items.append(q(2, "annuity basics", "medium",
        "A deferred annuity is designed primarily for:",
        ["Instant pension payments at purchase", "Tax-deferred accumulation during a savings phase",
         "Day trading of options", "Short-term cash management only"],
        "B",
        "Deferred annuities have an accumulation period before annuitization or withdrawal.",
        ["deferred annuity", "tax deferral", "annuity basics"],
        "Explain deferred annuity accumulation phase",
        "Owners may later annuitize, withdraw, or surrender depending on contract terms."))

    items.append(q(2, "annuity basics", "hard",
        "Annuitization converts the annuity account value into:",
        ["A margin loan", "A stream of periodic payments based on contract options",
         "Common stock in the insurer", "A mutual fund NAV"],
        "B",
        "Annuitization exchanges the lump sum for guaranteed periodic payments under selected settlement options.",
        ["annuitization", "payout phase", "annuity basics"],
        "Define annuitization and payout phase",
        "Once annuitized, the decision is generally irrevocable."))

    items.append(q(2, "annuity basics", "medium",
        "Surrender charges on annuities typically apply when:",
        ["The owner withdraws more than allowed during the early contract years",
         "The insurer pays the death benefit", "The owner reaches age 59½",
         "Interest rates fall below 2%"],
        "A",
        "Surrender charges decline over a schedule and penalize early withdrawals above free amounts.",
        ["surrender charge", "annuity basics", "liquidity risk"],
        "Understand annuity surrender charge schedules",
        "Many contracts allow annual free withdrawal percentages."))

    items.append(q(2, "annuity basics", "easy",
        "Growth inside a non-qualified annuity is generally:",
        ["Tax-free forever with no withdrawal taxes", "Tax-deferred until withdrawn",
         "Taxable annually like a savings account", "Exempt only for corporate buyers"],
        "B",
        "Earnings grow tax-deferred until distribution, when ordinary income tax may apply.",
        ["tax deferral", "annuity basics", "taxation"],
        "Know tax-deferred growth feature of annuities",
        "Qualified annuities in IRAs are taxed on withdrawal like other IRA assets."))

    items.append(q(2, "annuity basics", "hard",
        "Withdrawals from an annuity before age 59½ may incur:",
        ["Only state sales tax", "A 10% federal penalty in addition to ordinary income tax on earnings",
         "Capital gains treatment automatically", "No tax consequences"],
        "B",
        "IRS rules generally impose a 10% penalty on early withdrawals of taxable earnings, with exceptions.",
        ["10% penalty", "early withdrawal", "annuity basics"],
        "Apply early withdrawal penalty rules to annuities",
        "Exceptions exist for death, disability, and certain annuity payments."))

    items.append(q(2, "annuity basics", "medium",
        "A death benefit rider on a variable annuity typically guarantees:",
        ["That beneficiaries receive at least a specified minimum, often the greater of purchase payments or account value",
         "That the separate account beats the S&P 500 annually",
         "FDIC insurance on the full account", "Tax-free inheritance in all cases"],
        "A",
        "Death benefit riders can protect beneficiaries if account value falls below premiums paid.",
        ["death benefit rider", "variable annuity", "annuity basics"],
        "Explain variable annuity death benefit features",
        "Riders may carry additional fees—review the contract."))

    items.append(q(2, "annuity basics", "medium",
        "Variable annuities are considered securities because they involve:",
        ["Only fixed guaranteed returns", "Investment risk in separate account subaccounts",
         "Municipal tax exemption", "FDIC deposit insurance"],
        "B",
        "Variable annuity separate accounts invest in securities, requiring prospectus delivery and registration.",
        ["variable annuity", "SEC registration", "annuity basics"],
        "Distinguish variable annuities from fixed annuities regulatorily",
        "Fixed annuities are primarily insurance products regulated by state insurance departments."))

    items.append(q(2, "annuity basics", "easy",
        "Joint and survivor annuity settlement options provide:",
        ["Payments only to the first owner who dies", "Income continuing to a surviving annuitant, often at a reduced rate",
         "Lump sum only with no periodic payments", "Payments indexed to commodity prices"],
        "B",
        "Joint and survivor options pay while either annuitant lives, commonly at 50% or 100% to survivor.",
        ["joint and survivor", "settlement options", "annuity basics"],
        "Identify common annuity payout settlement options",
        "Higher survivor percentages reduce initial payment amounts."))

    items.append(q(2, "annuity basics", "hard",
        "The exclusion ratio applies when annuity payments represent:",
        ["Only return of principal excluded from tax and earnings taxed as ordinary income",
         "Entirely tax-free income", "Only capital gains treatment",
         "AMT preference items only"],
        "A",
        "Part of each payment is excluded as return of principal; the remainder is taxable earnings.",
        ["exclusion ratio", "annuity taxation", "annuity basics"],
        "Understand annuity payment tax exclusion ratio",
        "After principal is recovered, payments are fully taxable."))

    items.append(q(2, "annuity basics", "medium",
        "An annuity is generally LEAST suitable for an investor who:",
        ["Needs long-term retirement income and tax deferral",
         "Requires full liquidity for short-term goals and may need immediate access to all funds",
         "Has maximized other retirement accounts", "Seeks guaranteed lifetime payout options"],
        "B",
        "Surrender charges and tax penalties make annuities poor choices for short-term or highly liquid needs.",
        ["suitability", "liquidity risk", "annuity basics"],
        "Assess annuity suitability for client objectives",
        "Match product illiquidity to the client's time horizon."))

    items.append(q(2, "annuity basics", "medium",
        "Guaranteed minimum income benefit (GMIB) riders on variable annuities promise:",
        ["Unlimited stock market returns", "A minimum income base for annuitization regardless of poor investment performance",
         "Elimination of all mortality risk", "SEC insurance on separate accounts"],
        "B",
        "GMIB riders guarantee a minimum benefit base for converting to income even if investments underperform.",
        ["GMIB", "rider", "variable annuity"],
        "Describe guaranteed minimum income benefit riders",
        "Riders add cost and have specific triggering conditions."))

    items.append(q(2, "annuity basics", "easy",
        "Life insurance companies issue annuities primarily to provide:",
        ["Margin loans to broker-dealers", "Long-term income and accumulation products",
         "Currency exchange services", "Municipal bond underwriting"],
        "B",
        "Annuities are insurance company products for retirement income and tax-deferred savings.",
        ["life insurance company", "annuity basics", "insurance products"],
        "Identify annuity issuers and product purpose",
        "Creditworthiness of the insurer matters for fixed and guaranteed features."))

    # Investment risks (20)
    items.append(q(2, "investment risks", "easy",
        "Market risk is the risk that:",
        ["A single company will default on its bonds",
         "Securities prices will decline due to overall market movements",
         "An investor cannot find a buyer quickly", "Inflation will exceed 10% annually"],
        "B",
        "Market (systematic) risk affects broad segments of the market and cannot be eliminated through diversification alone.",
        ["market risk", "systematic risk", "investment risks"],
        "Define market risk and its systematic nature",
        "Also called systematic risk—exposure to economic and market-wide events."))

    items.append(q(2, "investment risks", "medium",
        "Unsystematic risk can best be reduced by:",
        ["Investing in a single industry leader", "Diversifying across many securities and sectors",
         "Avoiding all equity investments", "Timing the market perfectly"],
        "B",
        "Company- and industry-specific risks are unsystematic and can be mitigated through diversification.",
        ["unsystematic risk", "diversification", "investment risks"],
        "Explain how diversification addresses unsystematic risk",
        "Systematic risk remains even in well-diversified portfolios."))

    items.append(q(2, "investment risks", "medium",
        "Interest rate risk most directly affects:",
        ["Fixed-income securities", "Checking account balances at banks",
         "Life insurance death benefits only", "Currency futures margin requirements only"],
        "A",
        "Bond prices move inversely to interest rates; longer maturities generally have greater sensitivity.",
        ["interest rate risk", "bonds", "investment risks"],
        "Identify securities most exposed to interest rate risk",
        "Duration measures approximate price sensitivity to rate changes."))

    items.append(q(2, "investment risks", "easy",
        "Credit risk is the risk that:",
        ["Interest rates will rise unexpectedly", "An issuer will fail to make timely principal or interest payments",
         "The stock market will crash", "Currency values will fluctuate"],
        "B",
        "Credit (default) risk reflects the issuer's ability to meet debt obligations.",
        ["credit risk", "default risk", "investment risks"],
        "Define credit risk for debt investments",
        "Bond ratings help assess credit risk levels."))

    items.append(q(2, "investment risks", "medium",
        "Liquidity risk means an investor may:",
        ["Always sell at a profit", "Not be able to sell quickly without significantly affecting price",
         "Never owe taxes on gains", "Automatically receive FDIC insurance"],
        "B",
        "Thin markets can force large discounts for rapid liquidation of a position.",
        ["liquidity risk", "investment risks", "thinly traded"],
        "Explain liquidity risk and market depth",
        "Penny stocks and small caps often have higher liquidity risk."))

    items.append(q(2, "investment risks", "medium",
        "Purchasing power (inflation) risk is especially concerning for investors holding:",
        ["Long-term fixed-rate bonds with no inflation adjustment",
         "TIPS that adjust with CPI", "Floating-rate notes tied to benchmarks", "Commodities during commodity booms"],
        "A",
        "Fixed payments lose real value when inflation rises, hurting bondholders and fixed annuities.",
        ["inflation risk", "purchasing power risk", "investment risks"],
        "Recognize inflation risk in fixed-income investments",
        "Equities and TIPS may offer better inflation protection over time."))

    items.append(q(2, "investment risks", "hard",
        "Reinvestment risk occurs when:",
        ["A bond defaults before maturity", "Coupon payments must be reinvested at lower rates than the original bond",
         "The SEC suspends trading", "A stock splits 2-for-1"],
        "B",
        "Falling rates mean interim cash flows are reinvested at reduced yields, lowering total return.",
        ["reinvestment risk", "coupon income", "investment risks"],
        "Define reinvestment risk for bond investors",
        "Callable bonds exacerbate reinvestment risk when rates fall."))

    items.append(q(2, "investment risks", "medium",
        "Political (sovereign) risk is most associated with:",
        ["U.S. Treasury securities", "International investments in unstable regions",
         "FDIC-insured CDs", "Domestic money market funds"],
        "B",
        "Government actions, instability, or policy changes abroad can harm foreign investments.",
        ["political risk", "international investing", "investment risks"],
        "Identify political risk in global portfolios",
        "Combine political risk with currency risk in international allocations."))

    items.append(q(2, "investment risks", "medium",
        "Currency (exchange rate) risk affects an investor who holds:",
        ["Only U.S. dollar-denominated domestic stocks",
         "Foreign securities or funds when the dollar strengthens against local currencies",
         "U.S. savings bonds only", "Municipal bonds from their home state"],
        "B",
        "A stronger dollar can reduce returns on foreign investments when converted back to dollars.",
        ["currency risk", "foreign exchange", "investment risks"],
        "Explain currency risk for international investments",
        "Hedged international funds attempt to offset currency fluctuations."))

    items.append(q(2, "investment risks", "easy",
        "Business risk refers to:",
        ["The chance a company's operating performance will disappoint",
         "The risk the Federal Reserve changes rates",
         "The risk of a brokerage firm failure only", "Guaranteed loss from diversification"],
        "A",
        "Poor management, competition, or declining sales create company-specific business risk.",
        ["business risk", "unsystematic risk", "investment risks"],
        "Define business risk at the issuer level",
        "Diversification across companies reduces exposure to any single firm's business risk."))

    items.append(q(2, "investment risks", "hard",
        "Call risk is borne primarily by holders of:",
        ["Callable bonds when interest rates decline",
         "Non-callable Treasury bonds when rates rise", "Common stock during bull markets", "Money market funds only"],
        "A",
        "Issuers call bonds when rates fall, forcing investors to reinvest at lower yields.",
        ["call risk", "callable bonds", "investment risks"],
        "Understand call risk for bondholders",
        "Callable bonds often offer higher coupons to compensate for call risk."))

    items.append(q(2, "investment risks", "medium",
        "Prepayment risk in mortgage-backed securities arises because:",
        ["Homeowners may pay off mortgages early when rates fall",
         "The U.S. government guarantees all MBS principal",
         "MBS never change in price", "Prepayment eliminates interest rate risk"],
        "A",
        "Early principal return forces reinvestment at lower prevailing rates.",
        ["prepayment risk", "MBS", "investment risks"],
        "Explain prepayment risk in pass-through securities",
        "Extension risk can occur when rates rise and prepayments slow."))

    items.append(q(2, "investment risks", "medium",
        "Beta measures a stock's sensitivity to:",
        ["Credit rating changes only", "Overall market movements",
         "Dividend tax rates", "Municipal bond supply"],
        "B",
        "Beta compares a security's volatility relative to the market; beta > 1 indicates higher market sensitivity.",
        ["beta", "market risk", "investment risks"],
        "Interpret beta as a measure of systematic risk",
        "High-beta stocks tend to amplify market moves."))

    items.append(q(2, "investment risks", "easy",
        "Concentration risk increases when a portfolio:",
        ["Holds many uncorrelated asset classes", "Has large positions in a single stock or sector",
         "Uses dollar-cost averaging", "Rebalances annually"],
        "B",
        "Heavy weighting in one security or industry magnifies company- or sector-specific losses.",
        ["concentration risk", "diversification", "investment risks"],
        "Recognize concentration risk in portfolio construction",
        "Sector funds and employer stock holdings can create concentration."))

    items.append(q(2, "investment risks", "hard",
        "Legislative (regulatory) risk is illustrated when:",
        ["New laws change tax treatment or industry regulation affecting investments",
         "A company reports quarterly earnings", "A stock pays an unexpected dividend",
         "A bond coupon payment arrives on schedule"],
        "A",
        "Government policy changes can materially impact sectors such as healthcare, energy, or financials.",
        ["legislative risk", "regulatory risk", "investment risks"],
        "Identify legislative and regulatory risk factors",
        "Monitor policy proposals affecting heavily regulated industries."))

    items.append(q(2, "investment risks", "medium",
        "Event risk for a corporation could include:",
        ["A surprise takeover bid or natural disaster affecting operations",
         "Gradual CPI increases over a decade", "Routine semiannual coupon payments",
         "Standard quarterly index rebalancing"],
        "A",
        "Sudden unexpected events can shock stock and bond prices of affected issuers.",
        ["event risk", "investment risks", "headline risk"],
        "Define event risk and sudden corporate shocks",
        "Event risk is a form of unsystematic risk."))

    items.append(q(2, "investment risks", "medium",
        "Capital risk in equity investing means the investor may:",
        ["Lose part or all of the amount invested", "Earn guaranteed returns",
         "Avoid all taxation", "Receive FDIC insurance on stock purchases"],
        "A",
        "Equity investors have no principal guarantee; share prices can fall to zero in extreme cases.",
        ["capital risk", "equity risk", "investment risks"],
        "Understand capital loss potential in equity investments",
        "Risk tolerance questionnaires assess acceptable capital risk."))

    items.append(q(2, "investment risks", "hard",
        "Duration is used to estimate:",
        ["A bond's approximate percentage price change for a given interest rate change",
         "The issuer's annual revenue growth", "The stock's P/E ratio", "The mutual fund's 12b-1 fee"],
        "A",
        "Higher duration indicates greater price volatility when interest rates move.",
        ["duration", "interest rate risk", "investment risks"],
        "Apply duration to interest rate risk measurement",
        "Longer maturity and lower coupons generally increase duration."))

    items.append(q(2, "investment risks", "easy",
        "A risk-averse investor typically prefers investments with:",
        ["Higher potential return and higher volatility", "Lower volatility and more predictable outcomes",
         "Maximum leverage", "No disclosure of fees"],
        "B",
        "Risk-averse clients prioritize capital preservation and stable income over aggressive growth.",
        ["risk tolerance", "risk-averse", "investment risks"],
        "Match investment risk to client risk tolerance",
        "Suitability requires aligning risk profiles with product features."))

    items.append(q(2, "investment risks", "medium",
        "Systematic risk differs from unsystematic risk because systematic risk:",
        ["Affects the entire market or economy and cannot be diversified away",
         "Applies only to one company", "Is eliminated by owning 20 stocks",
         "Relates only to municipal bond insurance"],
        "A",
        "Systematic risks include market, interest rate, and purchasing power risks affecting broad markets.",
        ["systematic risk", "unsystematic risk", "investment risks"],
        "Contrast systematic and unsystematic risk",
        "Asset allocation across stocks, bonds, and cash manages overall systematic exposure."))

    # Yield and bond price relationship (14)
    items.append(q(2, "yield and bond price relationship", "easy",
        "When market interest rates rise, existing bond prices generally:",
        ["Increase", "Decrease", "Remain fixed at par", "Are guaranteed by the FDIC"],
        "B",
        "Bond prices and yields move inversely; higher new-issue rates make existing bonds less attractive.",
        ["inverse relationship", "interest rates", "bond prices"],
        "Explain inverse price-yield relationship",
        "This is fundamental bond math for the SIE exam."))

    items.append(q(2, "yield and bond price relationship", "medium",
        "A bond selling at a discount has a coupon rate that is:",
        ["Above current market interest rates", "Below current market interest rates",
         "Equal to zero only", "Unrelated to market rates"],
        "B",
        "Investors pay less than par when the coupon is below prevailing rates.",
        ["discount bond", "coupon rate", "yield and bond price relationship"],
        "Relate discount pricing to below-market coupons",
        "Discount bond current yield exceeds coupon rate."))

    items.append(q(2, "yield and bond price relationship", "medium",
        "A bond selling at a premium has a coupon rate that is:",
        ["Below market rates", "Above market rates",
         "Always zero", "Set by FINRA annually"],
        "B",
        "Higher coupons than new issues justify paying above par.",
        ["premium bond", "coupon rate", "yield and bond price relationship"],
        "Relate premium pricing to above-market coupons",
        "Premium bond current yield is less than coupon rate."))

    items.append(q(2, "yield and bond price relationship", "hard",
        "A $1,000 par bond with a 4% coupon purchased at $800 has a current yield of:",
        ["4.0%", "5.0%", "6.25%", "8.0%"],
        "B",
        "Annual interest = $40. Current yield = $40 / $800 = 5%.",
        ["current yield", "discount bond", "yield and bond price relationship"],
        "Calculate current yield for bonds trading at discount",
        "Current yield ignores capital gain if held to maturity at par."))

    items.append(q(2, "yield and bond price relationship", "medium",
        "Nominal (coupon) yield is calculated as:",
        ["Annual coupon payment divided by par value",
         "Annual coupon divided by market price",
         "Capital gain divided by years to maturity", "Yield to maturity plus inflation"],
        "A",
        "Nominal yield uses the stated coupon relative to face value, not purchase price.",
        ["nominal yield", "coupon yield", "yield and bond price relationship"],
        "Distinguish nominal yield from current yield and YTM",
        "Create a three-column comparison for the same bond."))

    items.append(q(2, "yield and bond price relationship", "hard",
        "Yield to maturity (YTM) represents:",
        ["Only the annual coupon divided by par", "The total return if the bond is held to maturity, considering price, coupons, and time",
         "The issuer's credit rating", "The sales charge on a bond fund"],
        "B",
        "YTM is the internal rate of return assuming all coupons are reinvested at the same yield.",
        ["yield to maturity", "total return", "yield and bond price relationship"],
        "Define yield to maturity conceptually",
        "YTM is the most comprehensive yield measure for hold-to-maturity investors."))

    items.append(q(2, "yield and bond price relationship", "easy",
        "If a bond trades at par, its coupon rate is:",
        ["Always zero", "Approximately equal to current market interest rates for similar bonds",
         "Double the market rate", "Unrelated to market conditions"],
        "B",
        "At par, coupon and prevailing yields are roughly aligned.",
        ["par value", "coupon rate", "yield and bond price relationship"],
        "Understand par pricing conditions",
        "New issues often price near par when coupons match market rates."))

    items.append(q(2, "yield and bond price relationship", "medium",
        "Longer-term bonds generally experience:",
        ["Less price volatility when rates change", "Greater price volatility when rates change",
         "No interest rate risk", "Fixed prices regardless of rates"],
        "B",
        "Longer maturities have higher duration, amplifying price swings from rate changes.",
        ["maturity", "price volatility", "yield and bond price relationship"],
        "Relate maturity to interest rate sensitivity",
        "Compare 2-year vs 30-year Treasury price reactions to rate moves."))

    items.append(q(2, "yield and bond price relationship", "hard",
        "A $1,000 par bond with a 6% coupon bought at $1,100 has a current yield closest to:",
        ["5.45%", "6.00%", "6.60%", "10.00%"],
        "A",
        "Annual coupon = $60. Current yield = $60 / $1,100 ≈ 5.45%.",
        ["current yield", "premium bond", "yield and bond price relationship"],
        "Calculate current yield for premium bonds",
        "Premium → current yield < coupon rate."))

    items.append(q(2, "yield and bond price relationship", "medium",
        "The yield curve typically plots:",
        ["Stock dividends against P/E ratios", "Interest rates of bonds against their maturities",
         "Mutual fund loads against NAV", "Option premiums against strike prices"],
        "B",
        "Yield curves show term structure of interest rates across maturities.",
        ["yield curve", "term structure", "yield and bond price relationship"],
        "Interpret the yield curve graphic",
        "Normal curves slope upward; inverted curves may signal economic concerns."))

    items.append(q(2, "yield and bond price relationship", "medium",
        "Zero-coupon bonds have the highest interest rate sensitivity because they:",
        ["Pay large semiannual coupons", "Have no interim cash flows and longer effective duration",
         "Are always callable", "Trade only at premiums"],
        "B",
        "All return comes at maturity, maximizing duration for a given maturity date.",
        ["zero-coupon bond", "duration", "yield and bond price relationship"],
        "Explain rate sensitivity of zero-coupon bonds",
        "Zeros can swing sharply with rate changes despite no coupon reinvestment."))

    items.append(q(2, "yield and bond price relationship", "hard",
        "Market rates fall from 6% to 4%. An existing 6% coupon bond will most likely:",
        ["Trade at a discount", "Trade at a premium", "Stop paying interest", "Convert to common stock"],
        "B",
        "Above-market coupons become more valuable, pushing prices above par.",
        ["interest rate decline", "premium bond", "yield and bond price relationship"],
        "Predict price direction from rate and coupon comparison",
        "Bondholders benefit from price appreciation when rates fall."))

    items.append(q(2, "yield and bond price relationship", "easy",
        "Current yield differs from nominal yield when a bond is purchased:",
        ["Only at par value", "At a price different from par value",
         "Only if it is municipal", "Only if it is callable"],
        "B",
        "Current yield uses market price in the denominator; nominal yield uses par.",
        ["current yield", "nominal yield", "yield and bond price relationship"],
        "Know when current and nominal yields diverge",
        "At par, current yield equals nominal yield."))

    items.append(q(2, "yield and bond price relationship", "medium",
        "Callable bonds often offer higher coupons because investors require extra compensation for:",
        ["Credit risk only", "Call risk if rates decline",
         "Currency fluctuations", "Equity conversion features"],
        "B",
        "Issuers call bonds when advantageous, shifting reinvestment risk to investors.",
        ["callable bond", "call risk", "yield and bond price relationship"],
        "Link callable features to yield spreads",
        "Yield-to-call may be more relevant than YTM for premium callable bonds."))

    # Equity securities (14)
    items.append(q(2, "equity securities", "easy",
        "Common stockholders have:",
        ["A prior claim over bondholders in bankruptcy", "Voting rights and potential dividends, but last claim in liquidation",
         "Guaranteed fixed dividends", "No exposure to company performance"],
        "B",
        "Common stock offers ownership with voting rights and residual claims after creditors and preferred shareholders.",
        ["common stock", "equity securities", "shareholder rights"],
        "Describe rights and risks of common stock ownership",
        "Common stock has unlimited upside but ranks last in liquidation."))

    items.append(q(2, "equity securities", "medium",
        "Preferred stock is most similar to bonds in that it typically:",
        ["Grants unlimited voting control", "Pays a fixed dividend and has priority over common in dividends and liquidation",
         "Matures in 90 days", "Is FDIC insured"],
        "B",
        "Preferred shares blend equity and fixed-income features with stated dividends and priority.",
        ["preferred stock", "equity securities", "fixed dividends"],
        "Compare preferred stock to common stock and bonds",
        "Cumulative preferred must receive missed dividends before common dividends."))

    items.append(q(2, "equity securities", "medium",
        "Growth stocks are generally characterized by:",
        ["High dividend yields and slow earnings growth", "Reinvested earnings and above-average growth potential",
         "Guaranteed principal", "Exclusive utility sector focus"],
        "B",
        "Growth companies prioritize expansion over distributing earnings as dividends.",
        ["growth stock", "equity securities", "capital appreciation"],
        "Identify growth stock characteristics",
        "Growth stocks often have higher P/E ratios reflecting growth expectations."))

    items.append(q(2, "equity securities", "easy",
        "Value stocks often trade at:",
        ["P/E ratios above industry averages with no earnings",
         "Lower valuations relative to fundamentals such as earnings or book value",
         "Prices set by the Federal Reserve", "Only on bond exchanges"],
        "B",
        "Value investing seeks companies perceived undervalued by the market.",
        ["value stock", "equity securities", "valuation"],
        "Define value stock investment style",
        "Value stocks may offer higher dividend yields than growth stocks."))

    items.append(q(2, "equity securities", "medium",
        "Cyclical stocks tend to perform best when:",
        ["The economy is in recession", "The economy is expanding",
         "Interest rates are zero", "Inflation is negative only"],
        "B",
        "Cyclical companies (autos, travel, luxury) benefit from rising consumer and business spending.",
        ["cyclical stock", "economic cycle", "equity securities"],
        "Relate cyclical stocks to economic conditions",
        "Defensive stocks (utilities, staples) often hold up better in downturns."))

    items.append(q(2, "equity securities", "easy",
        "Defensive stocks are often found in industries such as:",
        ["Luxury resorts and airlines", "Utilities and consumer staples",
         "High-beta technology startups only", "Speculative mining ventures"],
        "B",
        "Defensive sectors provide necessities with steadier demand across economic cycles.",
        ["defensive stock", "equity securities", "sector investing"],
        "Identify defensive equity sectors",
        "Defensive does not mean risk-free—only relatively stable demand."))

    items.append(q(2, "equity securities", "hard",
        "A 2-for-1 stock split will result in an investor who owned 100 shares at $80 per share having:",
        ["50 shares at $160", "200 shares at approximately $40", "100 shares at $160", "200 shares at $80"],
        "B",
        "Splits increase share count and reduce price proportionally; total value stays roughly the same.",
        ["stock split", "equity securities", "share count"],
        "Analyze effects of stock splits on shares and price",
        "Splits are cosmetic—they do not change company fundamentals."))

    items.append(q(2, "equity securities", "medium",
        "Penny stocks are considered especially risky because they:",
        ["Trade on major exchanges with high liquidity always",
         "Often have low price, limited disclosure, and thin trading markets",
         "Are guaranteed by the SIPC", "Pay federally tax-exempt dividends"],
        "B",
        "Low-priced speculative securities can be volatile and susceptible to fraud.",
        ["penny stock", "speculative risk", "equity securities"],
        "Recognize risks of penny stock investing",
        "Penny stocks may trade OTC with less stringent listing standards."))

    items.append(q(2, "equity securities", "medium",
        "Dividend yield on a stock equals:",
        ["Annual dividend per share divided by market price per share",
         "Earnings per share divided by par value", "Market cap divided by revenue",
         "Book value divided by shares outstanding"],
        "A",
        "Dividend yield shows income return relative to current share price.",
        ["dividend yield", "equity securities", "income investing"],
        "Calculate and interpret dividend yield",
        "Unusually high yields may signal dividend cut risk."))

    items.append(q(2, "equity securities", "hard",
        "A high price-to-earnings (P/E) ratio may indicate investors expect:",
        ["Bankruptcy within one year", "Strong future earnings growth",
         "No earnings ever", "Fixed bond-like payments only"],
        "B",
        "Investors pay more per dollar of current earnings when growth expectations are high.",
        ["P/E ratio", "valuation", "equity securities"],
        "Interpret P/E ratio in stock analysis",
        "Compare P/E to industry peers and historical averages."))

    items.append(q(2, "equity securities", "easy",
        "American Depositary Receipts (ADRs) represent:",
        ["Direct ownership of U.S. municipal bonds", "Foreign company shares trading in U.S. markets in dollars",
         "U.S. Treasury inflation-protected securities", "Annuity contracts from foreign insurers"],
        "B",
        "ADRs facilitate U.S. investor access to non-U.S. equities with dollar trading.",
        ["ADR", "foreign equity", "equity securities"],
        "Explain ADR purpose for domestic investors",
        "ADRs still carry currency and foreign market risks."))

    items.append(q(2, "equity securities", "medium",
        "Small-cap stocks compared to large-cap stocks generally have:",
        ["Lower growth potential and lower volatility", "Higher growth potential and higher volatility",
         "Identical risk profiles", "Government guarantees on principal"],
        "B",
        "Smaller companies can grow faster but are often less established and more volatile.",
        ["small-cap", "large-cap", "equity securities"],
        "Compare market capitalization categories",
        "Market cap = share price × shares outstanding."))

    items.append(q(2, "equity securities", "medium",
        "A rights offering allows existing shareholders to:",
        ["Sell shares back to the government", "Purchase additional shares, often at a discount, to maintain ownership percentage",
         "Convert bonds to preferred stock automatically", "Avoid all dilution without investing"],
        "B",
        "Rights help current owners offset dilution from new share issuance.",
        ["rights offering", "dilution", "equity securities"],
        "Understand rights offerings and anti-dilution purpose",
        "Rights are short-term; unexercised rights may be sold or expire."))

    items.append(q(2, "equity securities", "hard",
        "Convertible preferred stock allows the holder to:",
        ["Exchange preferred shares for a fixed number of common shares",
         "Receive U.S. Treasury bonds at maturity", "Vote on all Federal Reserve decisions",
         "Avoid all market risk permanently"],
        "A",
        "The conversion feature provides equity upside while preferred dividends offer income.",
        ["convertible preferred", "equity securities", "hybrid securities"],
        "Describe convertible preferred stock features",
        "Conversion is advantageous when common stock rises above conversion value."))

    # Debt securities (11)
    items.append(q(2, "debt securities", "easy",
        "A corporate bond represents:",
        ["Ownership in the issuing corporation", "A loan by the investor to the corporation",
         "A deposit insured by the FDIC", "A share of the company's profits only"],
        "B",
        "Bondholders are creditors entitled to interest and return of principal per the indenture.",
        ["corporate bond", "debt securities", "creditor"],
        "Define corporate bonds as debt instruments",
        "Bondholders do not have ownership voting rights like stockholders."))

    items.append(q(2, "debt securities", "medium",
        "Debentures are bonds that are:",
        ["Secured by specific collateral", "Unsecured, backed by the issuer's general credit",
         "Issued only by municipalities", "Guaranteed by the FDIC"],
        "B",
        "Debentures rely on the issuer's overall financial strength without pledged assets.",
        ["debentures", "unsecured debt", "debt securities"],
        "Distinguish debentures from secured bonds",
        "Secured bonds have collateral; debentures do not."))

    items.append(q(2, "debt securities", "medium",
        "Secured bonds provide investors with:",
        ["A claim on specific assets pledged as collateral",
         "No claim in bankruptcy", "Voting rights on corporate policy",
         "Guaranteed stock conversion"],
        "A",
        "Collateral backing improves recovery prospects if the issuer defaults.",
        ["secured bonds", "collateral", "debt securities"],
        "Explain collateral protection for secured bondholders",
        "Mortgage bonds and equipment trust certificates are secured examples."))

    items.append(q(2, "debt securities", "hard",
        "Convertible corporate bonds allow investors to:",
        ["Convert the bond into a fixed number of common shares",
         "Avoid all interest rate risk", "Receive tax-exempt federal interest",
         "Trade only on municipal exchanges"],
        "A",
        "Convertibles offer bond income plus potential equity participation through conversion.",
        ["convertible bonds", "hybrid securities", "debt securities"],
        "Describe convertible bond features",
        "Conversion value rises with the underlying stock price."))

    items.append(q(2, "debt securities", "medium",
        "Zero-coupon corporate bonds:",
        ["Pay semiannual interest at the coupon rate", "Are issued at a discount and pay par at maturity",
         "Cannot default", "Are always callable at par"],
        "B",
        "Zeros provide return through price appreciation to face value with no interim coupons.",
        ["zero-coupon bond", "discount bond", "debt securities"],
        "Identify zero-coupon bond payment structure",
        "Zeros have high interest rate sensitivity."))

    items.append(q(2, "debt securities", "easy",
        "A bond indenture is:",
        ["The broker-dealer margin agreement", "The legal contract outlining bond terms and covenants",
         "A mutual fund prospectus only", "A stock split announcement"],
        "B",
        "Indentures specify coupon, maturity, call features, and issuer obligations.",
        ["indenture", "bond covenants", "debt securities"],
        "Define bond indenture purpose",
        "Trustees monitor issuer compliance with indenture terms."))

    items.append(q(2, "debt securities", "medium",
        "High-yield (junk) bonds are characterized by:",
        ["Investment-grade ratings and low yields", "Below-investment-grade ratings and higher yields",
         "U.S. government guarantees", "No credit risk"],
        "B",
        "Lower credit ratings compensate investors with higher yields for greater default risk.",
        ["high-yield bonds", "junk bonds", "credit risk"],
        "Classify high-yield bonds and associated risks",
        "High yield does not mean high quality—often the opposite."))

    items.append(q(2, "debt securities", "hard",
        "Senior debt compared to subordinated debt has:",
        ["Lower priority in bankruptcy liquidation", "Higher priority in bankruptcy liquidation",
         "No claim on assets", "Automatic conversion to equity"],
        "B",
        "Senior bondholders are paid before subordinated (junior) debtholders in liquidation.",
        ["senior debt", "subordinated debt", "debt securities"],
        "Understand debt priority in capital structure",
        "Subordinated debt pays higher yields for lower priority."))

    items.append(q(2, "debt securities", "medium",
        "Commercial paper is:",
        ["Long-term municipal debt maturing in 30 years", "Short-term unsecured corporate debt typically maturing in 270 days or less",
         "A type of common stock", "FDIC-insured bank deposit paper"],
        "B",
        "Commercial paper finances short-term corporate cash needs and is issued by creditworthy firms.",
        ["commercial paper", "money market", "debt securities"],
        "Describe commercial paper characteristics",
        "Only issuers with strong credit typically access the commercial paper market."))

    items.append(q(2, "debt securities", "easy",
        "Certificates of deposit (CDs) issued by banks differ from corporate bonds because CDs:",
        ["Are equity securities", "Are bank time deposits that may be FDIC insured up to limits",
         "Trade on the NYSE like stocks", "Have no stated maturity"],
        "B",
        "CDs are deposit obligations of banks, not corporate debt securities, with FDIC insurance up to applicable limits.",
        ["certificates of deposit", "debt securities", "FDIC"],
        "Distinguish CDs from corporate bonds",
        "Early CD withdrawal may trigger penalties."))

    items.append(q(2, "debt securities", "medium",
        "A corporate bond's credit rating downgrade will most likely cause its:",
        ["Price to rise and yield to fall", "Price to fall and yield to rise",
         "Coupon rate to increase immediately", "Maturity to shorten automatically"],
        "B",
        "Lower credit quality demands higher yields, which means lower prices in the secondary market.",
        ["credit rating", "bond prices", "debt securities"],
        "Predict market reaction to credit downgrades",
        "Rating agencies include Moody's, S&P, and Fitch."))

    # Municipal bonds (9)
    items.append(q(2, "municipal bonds", "easy",
        "General obligation (GO) municipal bonds are backed by:",
        ["Revenue from a toll road only", "The issuer's taxing power",
         "Corporate earnings", "Federal Reserve discount window"],
        "B",
        "GO bonds rely on the municipality's ability to levy taxes for debt service.",
        ["GO bonds", "municipal bonds", "tax backing"],
        "Differentiate GO from revenue municipal bonds",
        "GO bonds often require voter approval for issuance."))

    items.append(q(2, "municipal bonds", "medium",
        "Revenue bonds are repaid primarily from:",
        ["Unlimited property taxes", "Income generated by the specific project or facility",
         "Federal income tax receipts", "Sales of corporate stock"],
        "B",
        "Examples include toll roads, airports, and utility projects funded by user fees.",
        ["revenue bonds", "municipal bonds", "project finance"],
        "Identify revenue sources for revenue bonds",
        "Revenue bond credit depends on project viability, not general taxing power."))

    items.append(q(2, "municipal bonds", "hard",
        "An investor in the 32% federal tax bracket compares a 3.5% tax-exempt muni to a taxable bond. The taxable-equivalent yield is approximately:",
        ["3.5%", "4.2%", "5.15%", "7.0%"],
        "C",
        "TEY = muni yield / (1 − tax rate) = 3.5% / 0.68 ≈ 5.15%.",
        ["taxable-equivalent yield", "municipal bonds", "tax considerations"],
        "Calculate taxable-equivalent yield for muni bonds",
        "Use TEY to compare munis with taxable corporate or Treasury bonds."))

    items.append(q(2, "municipal bonds", "medium",
        "Interest on most municipal bonds issued for governmental purposes is generally:",
        ["Fully taxable at federal and state levels", "Exempt from federal income tax",
         "Taxable only as capital gains", "Subject to payroll taxes"],
        "B",
        "Federal tax exemption is a primary attraction for investors in higher tax brackets.",
        ["tax-exempt interest", "municipal bonds", "tax considerations"],
        "Know federal tax treatment of municipal bond interest",
        "In-state munis may also avoid state income tax for residents."))

    items.append(q(2, "municipal bonds", "hard",
        "Interest from certain private activity municipal bonds may be subject to:",
        ["SEC registration fees only", "The alternative minimum tax (AMT)",
         "FINRA arbitration fees", "Social Security payroll tax"],
        "B",
        "Private activity bond interest can be an AMT preference item for some taxpayers.",
        ["AMT", "private activity bonds", "municipal bonds"],
        "Recognize AMT implications for certain munis",
        "Ask high-income clients about AMT exposure before recommending private activity bonds."))

    items.append(q(2, "municipal bonds", "easy",
        "The official statement for a new municipal bond offering is comparable to:",
        ["A corporate bond prospectus", "A Form U4 registration",
         "A currency transaction report", "A margin account agreement"],
        "A",
        "Official statements disclose terms, financial condition, and risks for new muni issues.",
        ["official statement", "municipal bonds", "disclosure"],
        "Identify key muni primary market disclosure documents",
        "Continuing disclosure is available on the EMMA system."))

    items.append(q(2, "municipal bonds", "medium",
        "Municipal bond insurance is intended to:",
        ["Guarantee the bond will never trade at a discount",
         "Enhance credit quality by guaranteeing timely payment if the issuer defaults",
         "Convert the bond to a Treasury security", "Eliminate all interest rate risk"],
        "B",
        "Insurers promise payment of principal and interest if the issuer cannot, improving marketability.",
        ["municipal bond insurance", "credit enhancement", "municipal bonds"],
        "Understand municipal bond insurance benefits and limits",
        "Investors still face interest rate and liquidity risks on insured bonds."))

    items.append(q(2, "municipal bonds", "medium",
        "Industrial development revenue bonds (IDRBs) are typically:",
        ["GO bonds backed by unlimited taxes", "Revenue bonds issued to finance private business facilities",
         "U.S. Treasury notes", "Agency pass-through securities"],
        "B",
        "IDRBs carry project and business risk in addition to typical municipal considerations.",
        ["IDRB", "revenue bonds", "municipal bonds"],
        "Classify IDRBs within municipal bond types",
        "Credit analysis focuses on the private user's ability to pay."))

    items.append(q(2, "municipal bonds", "easy",
        "Compared to Treasuries, municipal bonds generally offer:",
        ["Lower credit quality always with no tax benefits",
         "Tax-exempt income that may appeal to high-bracket investors",
         "FDIC insurance on principal", "Guaranteed returns above inflation"],
        "B",
        "Tax exemption can make lower nominal muni yields attractive on an after-tax basis.",
        ["municipal bonds", "tax-exempt", "fixed income"],
        "Explain muni bond appeal for taxable investors",
        "Compare after-tax yields, not just stated coupon rates."))

    # Treasuries (8)
    items.append(q(2, "treasuries", "easy",
        "U.S. Treasury bills (T-bills) are issued:",
        ["At par with semiannual coupons", "At a discount to par with no periodic interest payments",
         "Only to foreign central banks", "With 20-year maturities"],
        "B",
        "T-bills mature in one year or less and pay par at maturity; return is the discount.",
        ["T-bills", "treasuries", "discount securities"],
        "Describe T-bill structure and maturities",
        "T-bills are short-term government discount obligations."))

    items.append(q(2, "treasuries", "medium",
        "U.S. Treasury notes typically mature in:",
        ["4 weeks to 52 weeks", "2 to 10 years",
         "More than 30 years only", "Exactly 5 days"],
        "B",
        "Treasury notes pay semiannual interest and cover the intermediate maturity range.",
        ["Treasury notes", "treasuries", "government securities"],
        "Match Treasury types to maturity ranges",
        "Bills < 1 year; notes 2–10 years; bonds 20–30 years."))

    items.append(q(2, "treasuries", "medium",
        "U.S. Treasury bonds generally have maturities of:",
        ["3 months", "2 years", "20 to 30 years", "1 week"],
        "C",
        "Long-term Treasury bonds pay semiannual interest with maturities up to 30 years.",
        ["Treasury bonds", "treasuries", "long-term debt"],
        "Identify Treasury bond maturity characteristics",
        "Longer Treasuries have greater interest rate sensitivity."))

    items.append(q(2, "treasuries", "hard",
        "Treasury Inflation-Protected Securities (TIPS) adjust:",
        ["Coupon payments only, never principal", "Principal based on changes in the Consumer Price Index",
         "Only state tax rates", "Stock dividend yields"],
        "B",
        "CPI increases raise TIPS principal; deflation can lower it but not below par at maturity.",
        ["TIPS", "inflation protection", "treasuries"],
        "Explain TIPS inflation adjustment mechanism",
        "TIPS protect purchasing power but can lag in sudden inflation spikes."))

    items.append(q(2, "treasuries", "medium",
        "STRIPS are:",
        ["Preferred stock issued by the Treasury", "Zero-coupon Treasury securities created by separating coupons from principal",
         "Municipal revenue bonds", "Agency mortgage pools"],
        "B",
        "STRIPS trade as zero-coupon instruments with no interim payments.",
        ["STRIPS", "zero-coupon", "treasuries"],
        "Understand STRIPS structure",
        "STRIPS eliminate coupon reinvestment risk."))

    items.append(q(2, "treasuries", "easy",
        "Interest on U.S. Treasury securities is:",
        ["Exempt from federal income tax", "Taxable federally but generally exempt from state and local income taxes",
         "Exempt from all U.S. taxes", "Taxed only as capital gains"],
        "B",
        "Treasury interest is subject to federal tax but usually not state/local income tax.",
        ["Treasury taxation", "treasuries", "tax considerations"],
        "Know tax treatment of Treasury securities",
        "Contrast with municipal bond federal tax exemption."))

    items.append(q(2, "treasuries", "medium",
        "U.S. Treasury securities are considered highly liquid because:",
        ["They cannot be sold before maturity", "They trade in deep, active markets with strong dealer participation",
         "FINRA insures them against loss", "They have no interest rate risk"],
        "B",
        "Large trading volume and dealer networks support easy buying and selling.",
        ["liquidity", "treasuries", "secondary market"],
        "Explain Treasury market liquidity",
        "Liquidity does not eliminate price volatility from rate changes."))

    items.append(q(2, "treasuries", "hard",
        "Treasuries are considered benchmark securities because:",
        ["They carry the highest corporate default risk", "They are viewed as free of credit risk and set baseline yields",
         "They are not traded in secondary markets", "They are issued only by municipalities"],
        "B",
        "U.S. government full faith and credit backing makes Treasuries the risk-free rate reference.",
        ["benchmark", "risk-free rate", "treasuries"],
        "Understand Treasury role as pricing benchmark",
        "Other bonds trade at yield spreads relative to Treasuries."))

    # Agency securities (9)
    items.append(q(2, "agency securities", "easy",
        "Agency securities are issued by:",
        ["Individual municipalities only", "Government-sponsored enterprises and certain federal agencies",
         "Private corporations without government ties", "Foreign central banks exclusively"],
        "B",
        "Issuers include Fannie Mae, Freddie Mac, FHLB, and federally related agencies.",
        ["agency securities", "GSE", "government-related issuers"],
        "Identify issuers of agency securities",
        "Distinguish full-faith agencies from GSE obligations."))

    items.append(q(2, "agency securities", "medium",
        "GNMA (Ginnie Mae) mortgage-backed securities are backed by:",
        ["Corporate bond covenants", "The full faith and credit of the U.S. government",
         "State property taxes only", "FDIC deposit insurance"],
        "B",
        "Ginnie Mae pass-throughs are the only MBS with explicit U.S. government backing.",
        ["GNMA", "agency securities", "government guarantee"],
        "Distinguish GNMA from Fannie Mae and Freddie Mac",
        "GNMA pools FHA/VA insured mortgages."))

    items.append(q(2, "agency securities", "medium",
        "Compared to Treasuries of similar maturity, agency debentures generally offer:",
        ["Lower yields because they are risk-free", "Slightly higher yields reflecting marginally greater credit risk",
         "Identical yields in all markets", "No secondary market"],
        "B",
        "GSE debt typically yields more than Treasuries due to perceived credit differences.",
        ["agency yield spread", "agency securities", "credit risk"],
        "Compare agency and Treasury yields",
        "Higher yield compensates for slightly higher perceived risk."))

    items.append(q(2, "agency securities", "hard",
        "Mortgage pass-through securities expose investors to prepayment risk because:",
        ["Homeowners may refinance when interest rates fall",
         "The SEC calls the bonds at par annually", "Agency debt cannot be prepaid",
         "Prepayment guarantees a loss of principal"],
        "A",
        "Early mortgage payoff returns principal sooner, forcing reinvestment at lower rates.",
        ["prepayment risk", "MBS", "agency securities"],
        "Understand prepayment risk in agency MBS",
        "Extension risk can occur when rising rates slow prepayments."))

    items.append(q(2, "agency securities", "medium",
        "Fannie Mae and Freddie Mac are classified as:",
        ["Municipal housing authorities", "Government-sponsored enterprises (GSEs)",
         "U.S. Treasury departments", "State insurance guaranty funds"],
        "B",
        "GSEs support housing finance; their obligations historically had implicit but not explicit federal guarantees.",
        ["Fannie Mae", "Freddie Mac", "GSE"],
        "Identify major housing GSEs",
        "Know policy changes can affect GSE credit perceptions."))

    items.append(q(2, "agency securities", "easy",
        "A mortgage pass-through security pays investors:",
        ["Only at maturity with no interim cash flow",
         "Pro-rata shares of principal and interest from underlying mortgages",
         "Dividends from common stock holdings", "Tax-exempt municipal interest only"],
        "B",
        "Pass-throughs distribute monthly payments from the underlying mortgage pool.",
        ["pass-through", "MBS", "agency securities"],
        "Describe mortgage pass-through payment structure",
        "Payments vary as mortgages prepay or default."))

    items.append(q(2, "agency securities", "hard",
        "Collateralized Mortgage Obligations (CMOs) differ from pass-throughs because CMOs:",
        ["Have only one maturity class", "Allocate cash flows into tranches with different risk and maturity profiles",
         "Are not related to mortgages", "Are issued only by municipalities"],
        "B",
        "CMO tranches (PAC, TAC, Z-bonds) target different prepayment and duration exposures.",
        ["CMO", "tranches", "agency securities"],
        "Explain CMO tranche structure",
        "Some tranches absorb prepayment variability for others."))

    items.append(q(2, "mutual funds", "medium",
        "A 529 college savings plan is best described as:",
        ["A FDIC-insured bank deposit", "A tax-advantaged municipal fund security for education savings",
         "A type of corporate bond issued by universities", "An exchange-traded note tied to tuition inflation only"],
        "B",
        "529 plans are municipal fund securities offering tax-advantaged education savings; MSRB rules apply to dealers.",
        ["529 plan", "municipal fund securities", "mutual funds"],
        "Identify 529 plans on the SIE product outline",
        "529 earnings grow tax-deferred; qualified withdrawals are federally tax-free."))

    items.append(q(2, "mutual funds", "easy",
        "A unit investment trust (UIT) differs from an open-end mutual fund because a UIT:",
        ["Issues redeemable shares daily at NAV forever", "Has a fixed portfolio and a stated termination date",
         "Is never registered with the SEC", "Cannot hold bonds or equities"],
        "B",
        "UITs have a fixed, generally unmanaged portfolio and a defined termination date, unlike open-end funds.",
        ["UIT", "unit investment trust", "mutual funds"],
        "Compare UITs to open-end funds per the SIE outline",
        "UIT units are sold in an initial offering; secondary trading may occur at market prices."))

    return items


if __name__ == "__main__":
    items = section2_questions()
    print(len(items))