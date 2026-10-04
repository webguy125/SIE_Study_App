const SECTION_NAMES = {
    3: "Understanding Trading, Customer Accounts and Prohibited Activities",
}


function q(section_id, topic, difficulty, prompt, choices, correct, explanation, tags, objective, tip) {
    return {
        "section_id": section_id,
        "section_name": SECTION_NAMES[section_id],
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
}

function section3_questions() {
  const items = [];

    items.push(q(3, "customer accounts", "easy",
        "A customer opens a cash account and buys 500 shares of ABC stock on Monday. Under regular-way settlement, payment is due by:",
        ["Trade date (Monday)", "Tuesday (T+1)", "Wednesday (T+2)", "Friday (T+4)"],
        "B", "As of 2026, most equity and ETF trades settle T+1 (trade date plus one business day). Payment and delivery are due on settlement date.",
        ["customer accounts", "settlement", "cash account"],
        "Know cash account payment timing under current T+1 settlement",
        "Cash accounts require full payment by settlement; freeriding violates Regulation T."))

    items.push(q(3, "customer accounts", "medium",
        "Mr. and Mrs. Chen hold a joint brokerage account registered as joint tenants with rights of survivorship (JTWROS). If Mr. Chen dies, Mrs. Chen will:",
        ["Need probate court approval to access the account", "Automatically own the entire account by operation of law",
         "Share the account equally with Mr. Chen's estate creditors only", "Lose all rights until a new account is opened"],
        "B", "JTWROS provides equal ownership and automatic transfer of the deceased owner's interest to the surviving joint tenant.",
        ["customer accounts", "JTWROS", "account registration"],
        "Compare JTWROS with tenants in common and TOD registrations",
        "JTWROS avoids probate; tenants in common allows unequal shares and probate."))

    items.push(q(3, "customer accounts", "easy",
        "A Transfer on Death (TOD) registration allows a customer to:",
        ["Avoid all estate taxes automatically", "Designate beneficiaries to receive account assets upon death without probate",
         "Trade options without margin approval", "Convert a cash account to a partnership account"],
        "B", "TOD designations pass account assets directly to named beneficiaries at death, bypassing probate for the brokerage account.",
        ["customer accounts", "TOD", "beneficiary designation"],
        "Understand TOD account registration benefits",
        "TOD applies to brokerage accounts; beneficiary designations should be kept current."))

    items.push(q(3, "customer accounts", "medium",
        "A grandmother opens a custodial account under the Uniform Gifts to Minors Act (UGMA) for her 8-year-old grandson. The assets in the account legally belong to:",
        ["The grandmother until the child turns 18", "The broker-dealer holding the account",
         "The minor beneficiary, with the custodian managing the assets", "The state education fund"],
        "C", "Custodial account assets are irrevocable gifts owned by the minor, managed by the custodian until the age of majority.",
        ["customer accounts", "UGMA", "custodial accounts"],
        "Know ownership and control rules for custodial accounts",
        "Gifts to custodial accounts may affect the donor's gift tax reporting."))

    items.push(q(3, "customer accounts", "hard",
        "A corporation wants to open a brokerage account to invest excess cash reserves. Before the firm may accept the account, it typically must obtain:",
        ["A personal financial statement from each employee", "A corporate resolution authorizing the account and designated traders",
         "Approval from the Federal Reserve", "A municipal bond official statement"],
        "B", "Corporate accounts require documentation proving the corporation authorized opening the account and naming authorized signers.",
        ["customer accounts", "corporate accounts", "new account documentation"],
        "Identify documentation required for non-individual accounts",
        "Partnership agreements and trust documents serve similar authorization purposes."))

    items.push(q(3, "customer accounts", "medium",
        "Which account type would MOST likely be used by two business partners who want proportional ownership without survivorship rights?",
        ["Joint tenants with rights of survivorship", "Tenants in common",
         "Transfer on Death", "Custodial UGMA"],
        "B", "Tenants in common allows specified ownership percentages and each owner's share passes through their estate, not automatically to the co-owner.",
        ["customer accounts", "tenants in common", "account registration"],
        "Distinguish tenants in common from JTWROS",
        "Tenants in common can hold unequal ownership percentages."))

    items.push(q(3, "customer accounts", "easy",
        "A traditional IRA brokerage account is characterized by:",
        ["Tax-free withdrawals at any age without penalty", "Tax-deferred growth with contributions that may be tax-deductible depending on circumstances",
         "Unlimited annual contributions without income limits", "Required minimum distributions only after age 75 for all owners"],
        "B", "Traditional IRAs offer tax-deferred growth; contributions may be deductible and withdrawals are generally taxed as ordinary income.",
        ["customer accounts", "IRA", "retirement accounts"],
        "Understand basic IRA account tax features",
        "Contrast traditional IRA with Roth IRA tax treatment."))

    items.push(q(3, "customer accounts", "medium",
        "A customer wants to sell short shares of XYZ. The firm should verify the customer has:",
        ["Only a cash account with sufficient funds", "A margin account meeting minimum equity requirements",
         "An options approval level 1", "A municipal bond advisory agreement"],
        "B", "Short sales require a margin account because they involve borrowing securities and potential unlimited loss exposure.",
        ["customer accounts", "short sales", "margin account"],
        "Know account type requirements for short selling",
        "Short sales cannot be executed in cash accounts."))

    items.push(q(3, "customer accounts", "easy",
        "When a customer transfers a brokerage account from Firm A to Firm B, the transfer is typically processed through:",
        ["The SEC directly", "ACATS (Automated Customer Account Transfer Service)",
         "A municipal securities dealer", "FinCEN's currency reporting system"],
        "B", "ACATS standardizes transfers of assets and account information between broker-dealers.",
        ["customer accounts", "ACATS", "account transfer"],
        "Understand the standard account transfer process",
        "Transfers should complete within a reasonable period; customers may file complaints for delays."))

    items.push(q(3, "customer accounts", "hard",
        "A registered representative notices a retired customer with a fixed income suddenly wiring large sums from overseas and requesting rapid trading in thinly traded penny stocks. The BEST immediate action is:",
        ["Execute all trades promptly to retain the customer", "Follow firm AML procedures, including possible account restriction and escalation",
         "Recommend more penny stocks to diversify", "Ignore the activity because the customer is long-standing"],
        "B", "Sudden changes in behavior, international wires, and penny stock activity are AML red flags requiring escalation per firm procedures.",
        ["customer accounts", "AML", "red flags"],
        "Recognize account activity requiring AML escalation",
        "Document suspicious activity and consult the AML compliance officer before continuing trading."))

    items.push(q(3, "customer accounts", "medium",
        "A durable power of attorney (POA) on a customer account allows the attorney-in-fact to:",
        ["Assume ownership of all account assets", "Transact in the account as authorized by the POA document on file with the firm",
         "Remove all FINRA registration requirements", "Guarantee the customer against market losses"],
        "B", "A POA grants trading authority within the scope of the document; the firm must verify and maintain the POA on file.",
        ["customer accounts", "power of attorney", "account authority"],
        "Understand POA authority on brokerage accounts",
        "Firms should review POA documents for scope, durability, and revocation notices."))

    items.push(q(3, "customer accounts", "hard",
        "A discretionary account permits a registered representative to:",
        ["Change the customer's tax filing status", "Determine which securities to buy or sell without prior approval for each trade",
         "Borrow money from the customer without disclosure", "Guarantee account performance"],
        "B", "Discretionary authority allows trade decisions without contacting the customer each time, but requires written customer authorization and principal approval.",
        ["customer accounts", "discretionary account", "supervision"],
        "Know discretionary account requirements",
        "Discretionary accounts require heightened supervision and written authorization."))

    items.push(q(3, "customer accounts", "easy",
        "Holding securities in 'street name' means:",
        ["The securities are registered directly with the issuer in the customer's name", "The broker-dealer holds securities in its name for the customer's benefit",
         "The securities are held only in physical certificate form", "The customer has no ownership rights"],
        "B", "Street name registration places securities in the firm's name on the customer's behalf, simplifying transfer and settlement.",
        ["customer accounts", "street name", "custody"],
        "Define street name registration",
        "Customers still own the securities; the firm maintains records of beneficial ownership."))

    items.push(q(3, "customer accounts", "medium",
        "Under SEC Rule 17a-3, broker-dealers must send account statements to customers at least:",
        ["Monthly for all accounts regardless of activity", "Quarterly, and more often if the account had activity generating statements",
         "Annually only", "Only when the customer requests them"],
        "B", "Quarterly statements are required at minimum; accounts with activity may receive monthly statements.",
        ["customer accounts", "account statements", "recordkeeping"],
        "Know customer account statement delivery requirements",
        "Statements help customers detect unauthorized activity and confirm holdings."))

    items.push(q(3, "customer accounts", "easy",
        "When opening a new customer account, the Customer Identification Program (CIP) requires the firm to:",
        ["Guarantee investment returns", "Verify the customer's identity using documentary or non-documentary methods",
         "Obtain a credit score above 700", "File a SAR for every new account"],
        "B", "CIP is an AML requirement to verify customer identity at account opening and maintain verification records.",
        ["customer accounts", "CIP", "AML"],
        "Understand CIP requirements at account opening",
        "CIP includes name, date of birth, address, and identification number verification."))

    items.push(q(3, "customer accounts", "medium",
        "A trusted contact person designation on an account allows the firm to:",
        ["Give the contact person trading authority automatically", "Contact a trusted individual if the firm suspects financial exploitation or cannot reach the customer",
         "Transfer all assets to the contact upon account opening", "Waive margin requirements"],
        "B", "Trusted contact information helps firms address possible exploitation or diminished capacity; it does not grant trading authority.",
        ["customer accounts", "trusted contact", "senior investor protection"],
        "Know the purpose of trusted contact designations",
        "Trusted contacts are a protective tool, not a substitute for POA or TOD."))

    items.push(q(3, "customer accounts", "hard",
        "An estate account is opened after a customer's death. Trading in the estate account may generally proceed once:",
        ["Any family member requests it by phone", "The firm receives proper legal documentation such as letters testamentary or court appointment",
         "The deceased customer's PIN is provided", "FINRA approves each trade individually"],
        "B", "Estate accounts require legal documentation establishing the executor's or administrator's authority.",
        ["customer accounts", "estate account", "account documentation"],
        "Understand requirements for estate account trading",
        "Distinguish estate accounts from individual accounts and TOD transfers."))

    items.push(q(3, "customer accounts", "medium",
        "A partnership brokerage account requires the firm to verify authority to trade using:",
        ["Only the personal driver's license of one partner", "The partnership agreement and authorized signer list",
         "A municipal bond indenture", "SEC Form S-1"],
        "B", "Partnership accounts need the partnership agreement and documentation identifying partners authorized to trade.",
        ["customer accounts", "partnership account", "new account documentation"],
        "Identify documentation for partnership accounts",
        "Non-individual accounts always need entity authorization documents."))

    items.push(q(3, "customer accounts", "easy",
        "A customer with a cash account has $15,000 in settled cash. The customer may purchase up to how much in securities without borrowing?",
        ["$7,500", "$15,000", "$30,000", "$50,000"],
        "B", "Cash accounts require full payment; purchasing power equals available settled funds absent other restrictions.",
        ["customer accounts", "cash account", "buying power"],
        "Calculate cash account purchasing capacity",
        "Purchases using unsettled sale proceeds may trigger good-faith violations."))

    items.push(q(3, "customer accounts", "hard",
        "A customer sells stock on Tuesday in a cash account and immediately uses the proceeds to buy other stock the same day, before the sale settles. This may create:",
        ["A margin call", "A good-faith violation under Regulation T",
         "An automatic SAR filing", "A long-term capital gain"],
        "B", "Using unsettled funds to purchase securities in a cash account before paying for the purchase is a good-faith violation.",
        ["customer accounts", "good-faith violation", "Regulation T"],
        "Recognize cash account settlement violations",
        "Three good-faith violations in 12 months may restrict the account to settled funds only."))

    items.push(q(3, "orders", "easy",
        "A customer places a market order to buy 200 shares of DEF. The order will be executed:",
        ["Only at a price specified by the customer", "At the best available current market price",
         "Only at the previous day's closing price", "At the opening price of the next trading session only"],
        "B", "Market orders prioritize execution speed over price certainty, filling at the prevailing market price.",
        ["orders", "market order", "order types"],
        "Differentiate market orders from limit orders",
        "Market orders in fast-moving markets may fill at prices different from the last quote."))

    items.push(q(3, "orders", "medium",
        "A customer enters a buy limit order for GHI at $42. The order will execute when the market price is:",
        ["$42 or higher only", "$42 or lower", "Exactly $42 with no exceptions", "Any price because it is a limit order"],
        "B", "Buy limit orders execute at the limit price or better (lower); they provide price protection but not guaranteed execution.",
        ["orders", "limit order", "order types"],
        "Apply buy limit order price rules",
        "Sell limit orders execute at the limit price or higher."))

    items.push(q(3, "orders", "medium",
        "A customer owns shares of JKL trading at $55 and wants to sell if the price falls to $50. The appropriate order is:",
        ["Buy stop order at $50", "Sell stop order at $50",
         "Sell limit order at $50", "Buy limit order at $50"],
        "B", "A sell stop order triggers when the price falls to the stop price, becoming a market order to limit downside loss.",
        ["orders", "stop order", "sell stop"],
        "Select appropriate stop orders for protection",
        "Stop orders become market orders when triggered and may fill below the stop in fast markets."))

    items.push(q(3, "orders", "hard",
        "A customer places a sell stop-limit order with a stop at $48 and limit at $47. If the stock gaps down from $50 to $44 at the open, the order will:",
        ["Execute at $44 immediately", "Trigger and become a limit order that may not execute if the market stays below $47",
         "Cancel automatically because of the gap", "Convert to a buy order"],
        "B", "Stop-limit orders trigger a limit order at the stop price; if the market is below the limit, the order may not fill.",
        ["orders", "stop-limit order", "order execution"],
        "Understand stop-limit order behavior in gap scenarios",
        "Stop-limit orders provide price control after triggering but risk non-execution."))

    items.push(q(3, "orders", "easy",
        "A good-til-canceled (GTC) order remains in effect until:",
        ["The end of the trading day", "It is executed or canceled by the customer",
         "The issuer pays a dividend", "FINRA changes margin rules"],
        "B", "GTC orders stay open across trading sessions until filled or canceled, subject to firm time limits.",
        ["orders", "GTC", "time in force"],
        "Know GTC order duration",
        "Many firms cancel GTC orders after 30-90 days per their policies."))

    items.push(q(3, "orders", "medium",
        "A day order that is not executed by the close of the trading day will:",
        ["Automatically become a GTC order", "Expire at the end of the trading day",
         "Execute at the next day's opening price regardless of market", "Convert to a market-on-close order"],
        "B", "Day orders are valid only for the current trading session and expire if not filled.",
        ["orders", "day order", "time in force"],
        "Understand day order expiration",
        "Day orders are the default time-in-force if none is specified at many firms."))

    items.push(q(3, "orders", "hard",
        "An All-or-None (AON) order instructs the broker to:",
        ["Execute the order in multiple partial fills at any size", "Execute the entire order quantity in a single transaction or not at all",
         "Execute only during the first hour of trading", "Execute at the average price of the day"],
        "B", "AON orders must fill completely in one execution; partial fills are not accepted.",
        ["orders", "AON", "order instructions"],
        "Identify special order handling instructions",
        "AON orders may take longer to fill, especially for large quantities."))

    items.push(q(3, "orders", "medium",
        "A Fill-or-Kill (FOK) order must be:",
        ["Executed completely immediately or canceled entirely", "Executed in part over several days",
         "Held until the end of the month", "Executed only at the closing auction"],
        "A", "FOK orders demand immediate full execution or immediate cancellation; partial fills are not permitted.",
        ["orders", "FOK", "order instructions"],
        "Distinguish FOK from IOC and AON orders",
        "IOC allows partial fills of whatever is immediately available."))

    items.push(q(3, "orders", "medium",
        "An Immediate-or-Cancel (IOC) order allows:",
        ["No execution under any circumstances", "Immediate execution of any available portion, with the remainder canceled",
         "Execution only at the limit price after 30 days", "Execution only by a market maker"],
        "B", "IOC orders execute immediately against available liquidity; unfilled portions are canceled.",
        ["orders", "IOC", "order instructions"],
        "Understand IOC order behavior",
        "IOC differs from FOK because partial fills are permitted."))

    items.push(q(3, "orders", "easy",
        "A trailing stop sell order set at 10% below the highest price reached will:",
        ["Remain fixed at the original stop price forever", "Adjust the stop price upward as the stock price rises, maintaining the percentage distance",
         "Only trigger at market close", "Automatically convert to a limit order at purchase"],
        "B", "Trailing stops follow favorable price movement, locking in gains while maintaining a cushion below the peak price.",
        ["orders", "trailing stop", "order types"],
        "Explain trailing stop order mechanics",
        "Trailing stops ratchet up with price increases but do not move down."))

    items.push(q(3, "orders", "hard",
        "A customer who is short 100 shares of MNO at $30 places a buy stop order at $35. This order is intended to:",
        ["Limit profit on the short position", "Limit loss on the short position if the stock rises",
         "Add to the short position", "Cancel the short position automatically at $25"],
        "B", "A buy stop above the market price on a short position limits loss if the stock rises unexpectedly.",
        ["orders", "short covering", "stop order"],
        "Apply stop orders to short positions",
        "Short sellers face unlimited theoretical loss; stop orders help manage risk."))

    items.push(q(3, "orders", "medium",
        "A customer cancels a limit order and immediately places a new limit order at a different price. This is called:",
        ["Front running", "Cancel/replace (order modification)",
         "Painting the tape", "A wash sale"],
        "B", "Cancel/replace modifies order terms without losing queue priority in some markets, depending on exchange rules.",
        ["orders", "order modification", "cancel replace"],
        "Understand order cancellation and replacement",
        "Excessive cancel/replace activity may draw regulatory scrutiny."))

    items.push(q(3, "orders", "easy",
        "A sell limit order at $75 will execute when the market price is:",
        ["$75 or lower", "$75 or higher", "Only below $70", "Only at exactly $75 with no exceptions"],
        "B", "Sell limit orders execute at the limit price or better (higher), providing a price floor for the sale.",
        ["orders", "limit order", "sell limit"],
        "Apply sell limit order price rules",
        "If the market never reaches the limit price, the order will not execute."))

    items.push(q(3, "orders", "hard",
        "During a volatile market, a customer places a sell stop order at $40. The stock trades through $40 quickly and the order fills at $38.50. This illustrates:",
        ["Limit order price protection", "Market order price uncertainty after a stop is triggered",
         "Guaranteed execution at the stop price", "A violation of Regulation T"],
        "B", "Once triggered, stop orders become market orders and may fill below the stop price in fast or thin markets.",
        ["orders", "stop order", "execution risk"],
        "Explain stop order slippage risk",
        "Stop-limit orders address slippage but may not execute at all."))

    items.push(q(3, "settlement", "easy",
        "Under current industry practice, regular-way settlement for most equity trades is:",
        ["T+0 (same day)", "T+1 (next business day)", "T+2 (two business days after trade date)", "T+5"],
        "B", "The 2026 industry standard is T+1 settlement for most corporate equity and ETF trades per FINRA/SEC rules.",
        ["settlement", "T+1", "equity settlement"],
        "Know standard equity settlement cycle for the 2026 SIE",
        "The current FINRA content outline tests T and T+1 settlement; T+2 is no longer correct for equities."))

    items.push(q(3, "settlement", "medium",
        "A customer buys a stock on Monday, June 3. The regular-way settlement date is:",
        ["Monday, June 3", "Tuesday, June 4", "Wednesday, June 5", "Friday, June 7"],
        "B", "T+1 means trade date plus one business day: a Monday trade settles Tuesday (assuming no holidays).",
        ["settlement", "T+1", "settlement date calculation"],
        "Calculate settlement dates excluding weekends and holidays",
        "Use a business-day calendar; the SIE frequently tests settlement date math."))

    items.push(q(3, "settlement", "medium",
        "The ex-dividend date for a stock is the first day a purchaser will NOT receive the declared dividend. A customer who buys on the ex-dividend date:",
        ["Receives the full dividend", "Does not receive that dividend; the seller receives it",
         "Receives double the dividend", "Must return the dividend to the issuer"],
        "B", "Ownership for dividend purposes is determined as of the ex-dividend date; buyers after that date miss the upcoming dividend.",
        ["settlement", "ex-dividend date", "dividends"],
        "Understand ex-dividend date impact on buyers",
        "Stock price typically drops by approximately the dividend amount on the ex-date."))

    items.push(q(3, "settlement", "easy",
        "The record date for a dividend determines:",
        ["The price at which the stock will trade", "Which shareholders are entitled to receive the dividend",
         "The date the company files its 10-K", "The settlement date for bond trades"],
        "B", "Shareholders of record on the record date receive the dividend; the ex-date is set accordingly.",
        ["settlement", "record date", "dividends"],
        "Distinguish record date, ex-date, and payable date",
        "Buy before ex-date to receive the dividend; settlement need not occur before record date."))

    items.push(q(3, "settlement", "hard",
        "Delivery versus Payment (DVP) settlement means:",
        ["Securities are delivered before payment is ever required", "Payment and securities delivery occur simultaneously through the clearing system",
         "Only cash accounts may use DVP", "The SEC guarantees both sides of the trade"],
        "B", "DVP ensures the buyer's payment and seller's securities transfer occur together, reducing settlement risk.",
        ["settlement", "DVP", "clearing"],
        "Define DVP settlement mechanics",
        "Clearing corporations facilitate DVP through netting and guarantee funds."))

    items.push(q(3, "settlement", "medium",
        "If a seller fails to deliver securities by settlement date, the buying broker may:",
        ["Cancel the customer's purchase permanently", "Buy in the securities in the open market and charge the failing seller",
         "Ignore the failure with no consequences", "Convert the trade to a municipal bond transaction"],
        "B", "Buy-in procedures allow the broker to purchase securities to complete settlement, with costs charged to the party that failed to deliver.",
        ["settlement", "buy-in", "fail to deliver"],
        "Understand remedies for settlement failures",
        "Chronic fail-to-deliver situations may indicate locate or short-sale compliance issues."))

    items.push(q(3, "settlement", "easy",
        "Cash settlement (cash trade) for equities means settlement occurs:",
        ["T+2 like regular way", "On the same day as the trade (T+0)",
         "T+5", "Only for municipal bonds"],
        "B", "Cash trades require same-day payment and delivery, though they are less common for retail equity trades.",
        ["settlement", "cash trade", "same-day settlement"],
        "Know cash versus regular-way settlement",
        "Cash trades demand immediate funds and delivery."))

    items.push(q(3, "settlement", "medium",
        "When-issued (WI) trading of a new security refers to trading:",
        ["Only after the security is fully retired", "Before the security is issued, settling on the issue date",
         "Exclusively in the pink sheets", "Only by institutional investors without settlement"],
        "B", "WI transactions trade conditionally before issuance and settle when the security is actually issued.",
        ["settlement", "when-issued", "new issues"],
        "Understand when-issued trading and settlement",
        "WI trading is common in Treasury auctions and some new stock offerings."))

    items.push(q(3, "settlement", "hard",
        "For a standard exchange-traded equity option, settlement of the underlying transaction when exercised is typically:",
        ["T+0", "T+1", "T+2", "T+5"],
        "B", "Option exercises and assignments generally settle T+1 for the underlying equity transaction.",
        ["settlement", "options settlement", "T+1"],
        "Know option exercise settlement timing",
        "Cash-settled index options do not involve underlying securities delivery."))

    items.push(q(3, "settlement", "medium",
        "Mutual fund share purchases receive the NAV price determined at:",
        ["The time the customer called the firm", "The next calculated NAV after the order is received (forward pricing)",
         "The previous day's NAV regardless of order time", "A price negotiated with the fund manager"],
        "B", "Forward pricing means mutual fund orders execute at the NAV calculated after the firm receives the order, typically at the next market close.",
        ["settlement", "mutual funds", "forward pricing"],
        "Understand mutual fund pricing and settlement",
        "Late trading—executing after NAV calculation using earlier prices—is prohibited."))

    items.push(q(3, "settlement", "easy",
        "Good delivery for common stock certificates historically required:",
        ["Certificates in the buyer's name only", "Properly endorsed certificates in multiples that meet exchange standards",
         "Certificates issued by the Federal Reserve", "Only digital tokens on a blockchain"],
        "B", "Good delivery rules specify certificate quantities, endorsements, and registration requirements for physical settlement.",
        ["settlement", "good delivery", "transfer"],
        "Know basic good delivery requirements",
        "Most securities today settle in book-entry (electronic) form."))

    items.push(q(3, "settlement", "hard",
        "A customer sells stock on Thursday before a three-day holiday weekend. Under T+1 settlement, settlement occurs on:",
        ["Friday", "Monday", "Tuesday", "Wednesday"],
        "B", "Settlement counts business days only. If Friday is a holiday, a Thursday trade settles on the next business day—Monday.",
        ["settlement", "T+1", "holiday calendar"],
        "Calculate settlement across holidays and weekends",
        "Always use a business-day calendar, not a simple calendar-day count."))

    items.push(q(3, "margin basics", "easy",
        "Regulation T generally requires customers to deposit a minimum of what percentage of the purchase price when buying securities on margin?",
        ["25%", "50%", "75%", "100%"],
        "B", "Regulation T sets the initial margin requirement at 50% of the purchase price for marginable securities.",
        ["margin basics", "Regulation T", "initial margin"],
        "Recall Reg T initial margin percentage",
        "Reg T governs Federal Reserve credit; FINRA sets maintenance margin."))

    items.push(q(3, "margin basics", "medium",
        "FINRA Rule 4210 sets the minimum maintenance margin requirement for long equity positions at:",
        ["10% of current market value", "25% of current market value", "50% of current market value", "100% of current market value"],
        "B", "FINRA requires at least 25% equity maintenance for long margin positions, though firms may impose higher house requirements.",
        ["margin basics", "maintenance margin", "FINRA 4210"],
        "Know FINRA minimum maintenance margin for long positions",
        "House maintenance requirements above 25% trigger calls sooner."))

    items.push(q(3, "margin basics", "hard",
        "A customer has a margin account with $20,000 in securities and a $12,000 debit balance, for $8,000 equity. With a 25% maintenance requirement on $20,000 market value, the account:",
        ["Is below maintenance and will receive a margin call", "Meets maintenance because equity is 40% of market value",
         "Must be closed immediately", "Requires 50% equity at all times"],
        "B", "Equity percentage = $8,000 / $20,000 = 40%, which exceeds the 25% maintenance requirement.",
        ["margin basics", "margin call", "equity calculation"],
        "Calculate whether a margin account meets maintenance requirements",
        "Equity = market value minus debit balance; compare to required maintenance percentage."))

    items.push(q(3, "margin basics", "medium",
        "A margin call occurs when account equity falls below:",
        ["Regulation T initial requirement only", "The firm's maintenance margin requirement",
         "The customer's original deposit only", "The SIPC insurance limit"],
        "B", "Maintenance margin calls require the customer to restore equity to the maintenance level when it falls below the requirement.",
        ["margin basics", "margin call", "maintenance margin"],
        "Understand when margin calls are triggered",
        "Customers may deposit cash or marginable securities to meet a call."))

    items.push(q(3, "margin basics", "easy",
        "Special Memorandum Account (SMA) balance in a margin account represents:",
        ["Cash that may never be withdrawn", "A line of credit created by excess equity that may be used for withdrawals or purchases",
         "Funds held by the FDIC", "Only short-sale proceeds"],
        "B", "SMA reflects excess equity above Reg T requirements and can be used for limited withdrawals or additional purchases.",
        ["margin basics", "SMA", "margin account"],
        "Define SMA and its uses in margin accounts",
        "SMA increases with market appreciation and dividend payments in margin accounts."))

    items.push(q(3, "margin basics", "hard",
        "A customer buys $20,000 of marginable stock depositing the Reg T minimum. The debit balance is $10,000. If the stock falls to $14,000, the equity is:",
        ["$10,000", "$7,000", "$4,000", "$14,000"],
        "C", "Equity = market value minus debit balance = $14,000 - $10,000 = $4,000. Equity percentage = $4,000/$14,000 ≈ 28.6%.",
        ["margin basics", "equity calculation", "market decline"],
        "Calculate margin account equity after a price decline",
        "Price drops reduce equity faster because the debit balance stays fixed."))

    items.push(q(3, "margin basics", "medium",
        "The minimum equity required to open and maintain a margin account is generally:",
        ["$500", "$2,000", "$10,000", "$25,000"],
        "B", "FINRA requires at least $2,000 minimum equity in a margin account, or full payment for the purchase if less.",
        ["margin basics", "minimum equity", "margin account"],
        "Know the $2,000 minimum margin account equity rule",
        "Pattern day traders have a separate $25,000 minimum requirement."))

    items.push(q(3, "margin basics", "hard",
        "For short sales in a margin account, the initial Reg T requirement is generally:",
        ["50% of the short sale proceeds only", "150% of the short sale market value (100% proceeds plus 50% additional margin)",
         "25% of the short sale proceeds", "No margin is required for short sales"],
        "B", "Short sales require 150% of the short market value: 100% of proceeds plus an additional 50% margin deposit.",
        ["margin basics", "short sales", "Regulation T"],
        "Calculate initial margin for short positions",
        "Short margin requirements are higher due to unlimited loss potential."))

    items.push(q(3, "margin basics", "medium",
        "A pattern day trader is defined as a customer who executes:",
        ["Any margin trade", "Four or more day trades within five business days in a margin account",
         "Only short sales", "Trades only in municipal bonds"],
        "B", "Four or more day trades in five business days in a margin account, representing more than 6% of activity, defines a pattern day trader.",
        ["margin basics", "pattern day trader", "day trading"],
        "Define pattern day trader status",
        "PDT rules apply to margin accounts with frequent day trading activity."))

    items.push(q(3, "margin basics", "easy",
        "A pattern day trader must maintain minimum combined equity of:",
        ["$2,000", "$10,000", "$25,000", "$100,000"],
        "C", "FINRA requires pattern day traders to maintain at least $25,000 in their margin accounts.",
        ["margin basics", "pattern day trader", "PDT"],
        "Know the $25,000 PDT minimum equity requirement",
        "Falling below $25,000 restricts day trading until equity is restored."))

    items.push(q(3, "margin basics", "medium",
        "A Regulation T call requires the customer to deposit enough funds to bring the account to:",
        ["25% equity", "50% of the current market value for the purchase that caused the deficiency",
         "100% cash for all holdings", "Zero debit balance"],
        "B", "A fed call (Reg T call) demands payment to meet the 50% initial margin requirement on the purchase.",
        ["margin basics", "Regulation T call", "fed call"],
        "Distinguish Reg T calls from maintenance margin calls",
        "Reg T calls relate to initial margin; maintenance calls relate to ongoing equity levels."))

    items.push(q(3, "margin basics", "hard",
        "A firm's house maintenance requirement on a concentrated position is 40%. A customer holds $50,000 of one stock with a $30,000 debit balance. The equity percentage is 40%. The account is:",
        ["Above house maintenance at 40% equity", "Below house maintenance and subject to a house call",
         "Exempt from margin rules", "Automatically converted to cash"],
        "B", "Equity = $50,000 - $30,000 = $20,000; $20,000/$50,000 = 40%. At exactly 40% with a 40% house requirement, the account is at the minimum and may receive a call if it drops further.",
        ["margin basics", "house maintenance", "concentration"],
        "Apply firm house maintenance requirements",
        "Firms may impose higher maintenance on concentrated or volatile positions."))

    items.push(q(3, "margin basics", "easy",
        "Buying power in a margin account with 50% Reg T requirement is approximately:",
        ["Equal to cash on hand only", "Twice the excess equity available for Reg T purposes (for standard marginable securities)",
         "Four times equity always", "Unlimited with any deposit"],
        "B", "With 50% initial margin, each dollar of excess equity supports roughly two dollars of purchasing power.",
        ["margin basics", "buying power", "margin account"],
        "Estimate margin account buying power",
        "Buying power is reduced by existing positions, pending orders, and house requirements."))

    items.push(q(3, "margin basics", "medium",
        "Margin interest charged to customers is based on:",
        ["The federal funds rate only", "The firm's debit balance and its margin interest rate schedule",
         "A fixed 10% rate set by the SEC", "Only short-sale proceeds"],
        "B", "Customers pay interest on the debit balance in margin accounts per the firm's disclosed rate schedule.",
        ["margin basics", "margin interest", "debit balance"],
        "Understand margin interest charges",
        "Margin interest is generally not tax-deductible for most investors (subject to tax law)."))

    items.push(q(3, "margin basics", "hard",
        "A restricted margin account typically results from:",
        ["Exceeding the PDT $25,000 minimum", "Regulation T violations such as good-faith violations in related cash accounts or failure to meet calls",
         "Opening a custodial account", "Filing a SAR"],
        "B", "Reg T violations can restrict accounts to trading only with settled funds or cash up front.",
        ["margin basics", "restricted account", "Regulation T"],
        "Know consequences of Reg T violations",
        "Restricted accounts limit leverage until the violation period expires."))

    items.push(q(3, "margin basics", "medium",
        "Which security is generally NOT marginable under typical broker-dealer policies?",
        ["NYSE-listed common stock", "Shares trading below $5 on the OTC market",
         "Investment-grade corporate bonds", "Major index ETFs"],
        "B", "Low-priced OTC and penny stocks are often non-marginable due to volatility and credit risk.",
        ["margin basics", "non-marginable securities", "OTC"],
        "Identify securities that may not be purchased on margin",
        "Firms publish marginable security lists and may impose additional restrictions."))

    items.push(q(3, "margin basics", "easy",
        "Marking a margin account to the market means:",
        ["Closing the account at year-end", "Recalculating account value based on current market prices daily",
         "Converting all holdings to cash", "Filing a CTR with FinCEN"],
        "B", "Daily mark-to-market updates position values and equity, determining whether maintenance requirements are met.",
        ["margin basics", "mark to market", "margin account"],
        "Define mark-to-market in margin accounts",
        "Daily marks trigger maintenance calls when equity falls below requirements."))

    items.push(q(3, "margin basics", "hard",
        "A customer in a margin account has long stock worth $30,000 and a debit of $15,000. The firm allows $10,000 SMA. The customer may withdraw approximately:",
        ["$30,000", "Up to $10,000 subject to maintenance requirements after withdrawal",
         "Nothing ever from a margin account", "$15,000 automatically"],
        "B", "SMA permits limited withdrawals, but the account must still meet maintenance requirements after the withdrawal.",
        ["margin basics", "SMA", "withdrawals"],
        "Understand SMA withdrawal limitations",
        "Withdrawals that reduce equity below maintenance will trigger a margin call."))

    items.push(q(3, "tax considerations", "easy",
        "Long-term capital gains tax rates generally apply to securities held for more than:",
        ["30 days", "Six months", "One year", "Three years"],
        "C", "Securities held longer than one year qualify for long-term capital gains treatment (rates depend on income level).",
        ["tax considerations", "capital gains", "holding period"],
        "Know the one-year holding period for long-term gains",
        "The holding period begins the day after purchase."))

    items.push(q(3, "tax considerations", "medium",
        "Short-term capital gains from securities held one year or less are generally taxed at:",
        ["Zero percent always", "The investor's ordinary income tax rates",
         "A flat 15% for all taxpayers", "Only at the state level"],
        "B", "Short-term gains are taxed as ordinary income, at the investor's marginal tax bracket.",
        ["tax considerations", "short-term gains", "ordinary income"],
        "Distinguish short-term from long-term capital gains taxation",
        "Holding period determines rate; asset type may affect other tax rules."))

    items.push(q(3, "tax considerations", "hard",
        "A customer sells 100 shares of PQR at a $2,000 loss on March 15 and repurchases 100 shares of PQR on April 1. Under wash sale rules, the loss is:",
        ["Fully deductible in the current tax year", "Disallowed and added to the cost basis of the repurchased shares",
         "Deductible up to $3,000 only", "Reported to FinCEN"],
        "B", "Repurchasing substantially identical securities within 30 days before or after the sale triggers wash sale treatment, deferring the loss.",
        ["tax considerations", "wash sale", "capital losses"],
        "Apply wash sale rules to loss transactions",
        "The 30-day window applies to purchases by the investor or their IRA."))

    items.push(q(3, "tax considerations", "medium",
        "The wash sale rule disallows loss recognition if substantially identical securities are purchased within:",
        ["7 days before or after the sale", "30 days before or after the sale",
         "90 days before or after the sale", "One year after the sale only"],
        "B", "The wash sale period is 30 days before and 30 days after the sale that generated the loss.",
        ["tax considerations", "wash sale", "30-day rule"],
        "Know the wash sale 30-day window",
        "Substantially identical includes options on the same stock in many cases."))

    items.push(q(3, "tax considerations", "easy",
        "If a customer does not specify shares sold, the IRS default method for determining cost basis is generally:",
        ["Last in, first out (LIFO)", "First in, first out (FIFO)",
         "Highest cost", "Average cost for all securities"],
        "B", "FIFO is the default cost basis method unless the customer specifies another acceptable method.",
        ["tax considerations", "cost basis", "FIFO"],
        "Understand default and elective cost basis methods",
        "Specific identification allows choosing which tax lots to sell."))

    items.push(q(3, "tax considerations", "medium",
        "Qualified dividends received by individual investors are generally taxed at:",
        ["Ordinary income rates always", "Preferential long-term capital gains rates if holding period requirements are met",
         "Zero percent for all investors", "A flat 39.6% rate"],
        "B", "Qualified dividends meet IRS requirements and are taxed at long-term capital gains rates for eligible taxpayers.",
        ["tax considerations", "qualified dividends", "dividend taxation"],
        "Distinguish qualified from ordinary dividends",
        "The stock must be held more than 60 days during the 121-day period around the ex-date."))

    items.push(q(3, "tax considerations", "hard",
        "Net capital losses exceeding the annual deduction limit may be:",
        ["Forgotten permanently", "Carried forward to offset future capital gains",
         "Converted to ordinary income deductions without limit", "Reported on Form U4"],
        "B", "Unused capital losses carry forward indefinitely to offset future capital gains.",
        ["tax considerations", "capital losses", "carryforward"],
        "Know capital loss deduction limits and carryforward rules",
        "Individuals may deduct up to $3,000 of net capital losses against ordinary income annually."))

    items.push(q(3, "tax considerations", "easy",
        "Interest income from U.S. Treasury securities is generally:",
        ["Exempt from all federal and state taxes", "Taxable at the federal level; exempt from state and local income taxes in most states",
         "Taxable only at the state level", "Never reported on tax returns"],
        "B", "Treasury interest is subject to federal income tax but is typically exempt from state and local income taxes.",
        ["tax considerations", "Treasury securities", "interest income"],
        "Understand tax treatment of Treasury interest",
        "Contrast with municipal bond interest, often exempt from federal tax."))

    items.push(q(3, "tax considerations", "medium",
        "Municipal bond interest for in-state residents is often:",
        ["Fully taxable at federal, state, and local levels", "Exempt from federal income tax and often from state/local tax if from the investor's state",
         "Taxed as short-term capital gains", "Subject to AML reporting only"],
        "B", "Municipal bond interest is generally federal tax-exempt and may also be state tax-exempt for in-state bonds.",
        ["tax considerations", "municipal bonds", "tax-exempt interest"],
        "Know municipal bond tax advantages",
        "AMT may affect some municipal bond interest for certain taxpayers."))

    items.push(q(3, "tax considerations", "hard",
        "A customer inherits stock from a deceased relative. The cost basis for the inherited shares is generally:",
        ["The deceased's original purchase price only", "The fair market value on the date of death (stepped-up basis)",
         "Always zero", "The average price for the past year"],
        "B", "Inherited assets typically receive a stepped-up basis to fair market value at death, reducing capital gains if sold soon after.",
        ["tax considerations", "inherited stock", "stepped-up basis"],
        "Understand basis rules for inherited securities",
        "Gifted stock may use carryover basis instead of step-up."))

    items.push(q(3, "tax considerations", "medium",
        "The holding period for determining long-term versus short-term status begins:",
        ["On the trade date", "The day after the purchase trade date",
         "On the settlement date only for all purposes", "On the dividend record date"],
        "B", "The holding period clock starts the day after the trade date for purchases.",
        ["tax considerations", "holding period", "trade date"],
        "Know when the capital gains holding period begins",
        "Selling requires meeting the full one-year period from day after purchase."))

    items.push(q(3, "tax considerations", "easy",
        "A customer receives a Form 1099-B from the broker-dealer reporting:",
        ["Only dividend income", "Proceeds from securities sales and cost basis information",
         "Currency transaction reports", "SAR filings"],
        "B", "Form 1099-B reports sales proceeds and basis information for the customer's tax reporting.",
        ["tax considerations", "Form 1099-B", "cost basis reporting"],
        "Identify tax reporting forms from broker-dealers",
        "1099-DIV reports dividends; 1099-INT reports interest income."))

    items.push(q(3, "prohibited practices", "medium",
        "Churning is BEST described as:",
        ["Buy-and-hold investing for the long term", "Excessive trading in a customer account primarily to generate commissions",
         "Diversifying across asset classes", "Filing required regulatory reports"],
        "B", "Churning is unsuitable excessive trading driven by a representative's desire to earn commissions.",
        ["prohibited practices", "churning", "suitability"],
        "Recognize churning in customer accounts",
        "Compare annual turnover rate to customer objectives and financial profile."))

    items.push(q(3, "prohibited practices", "hard",
        "A registered representative learns a large institutional client will place a major buy order and purchases the same stock for a personal account minutes before the client order. This is:",
        ["Legitimate market making", "Prohibited front running",
         "Required portfolio diversification", "A standard block trade procedure"],
        "B", "Trading ahead of a known customer order for personal benefit is front running, a prohibited fraudulent practice.",
        ["prohibited practices", "front running", "fiduciary duty"],
        "Identify front running scenarios",
        "Front running violates duties to customers and firm policies."))

    items.push(q(3, "prohibited practices", "medium",
        "Painting the tape involves:",
        ["Publishing accurate research reports", "Creating artificial trading activity to give a false impression of volume or price movement",
         "Filing required customer confirmations", "Filing timely SARs"],
        "B", "Painting the tape is a form of market manipulation using wash trades or coordinated transactions to mislead the market.",
        ["prohibited practices", "market manipulation", "painting the tape"],
        "Recognize market manipulation techniques",
        "Manipulation schemes may involve multiple accounts and coordinated trading."))

    items.push(q(3, "prohibited practices", "hard",
        "A registered representative guarantees a customer will earn 20% annually on a stock purchase. This is:",
        ["Permissible if the stock previously returned 20%", "Prohibited because guarantees of investment performance are not allowed",
         "Required under suitability rules", "Allowed only in margin accounts"],
        "B", "Registered persons may not guarantee specific investment returns or against loss.",
        ["prohibited practices", "guaranteed returns", "communications with the public"],
        "Know prohibitions on guaranteeing investment performance",
        "All investments carry risk; guarantees mislead customers."))

    items.push(q(3, "prohibited practices", "easy",
        "Executing trades in a customer account without the customer's knowledge or authorization is:",
        ["Standard industry practice", "Prohibited unauthorized trading",
         "Required for discretionary accounts without documentation", "Allowed for all cash accounts"],
        "B", "Trades require customer authorization unless a properly documented discretionary arrangement exists.",
        ["prohibited practices", "unauthorized trading", "customer authorization"],
        "Understand authorization requirements for trades",
        "Unauthorized trading exposes firms to liability and regulatory sanctions."))

    items.push(q(3, "prohibited practices", "medium",
        "Selling away occurs when a registered person:",
        ["Sells securities through the member firm's normal channels", "Sells securities or investments outside the member firm without firm approval",
         "Sells only U.S. Treasury securities", "Reduces commissions for loyal customers"],
        "B", "Selling away involves private securities transactions away from the firm, bypassing supervision.",
        ["prohibited practices", "selling away", "private securities transactions"],
        "Define selling away and its regulatory implications",
        "Firms require pre-approval or notice for outside business activities."))

    items.push(q(3, "prohibited practices", "hard",
        "A registered representative shares in the gains and losses of a customer's account without firm approval. This is:",
        ["Encouraged to align interests", "Prohibited profit sharing in customer accounts",
         "Required for all IRA accounts", "Permitted if the customer agrees orally"],
        "B", "Registered representatives generally may not share in customer account profits or losses without proper firm approval and arrangements.",
        ["prohibited practices", "profit sharing", "compensation"],
        "Know rules on sharing in customer account performance",
        "Profit sharing creates conflicts of interest and is tightly restricted."))

    items.push(q(3, "prohibited practices", "medium",
        "A pump-and-dump scheme typically involves:",
        ["Publishing balanced research", "Promoting a stock with false or misleading positive statements to inflate price, then selling at the peak",
         "Executing customer limit orders", "Maintaining AML compliance programs"],
        "B", "Pump-and-dump is fraud: hype the stock (pump), then sell inflated shares (dump), harming other investors.",
        ["prohibited practices", "pump and dump", "fraud"],
        "Recognize pump-and-dump manipulation",
        "Penny stocks are frequent targets of pump-and-dump schemes."))

    items.push(q(3, "prohibited practices", "easy",
        "A registered representative borrows money from a customer who is not a bank or family member. This is:",
        ["Always permitted", "Generally prohibited",
         "Required for margin accounts", "Allowed without disclosure"],
        "B", "Borrowing from customers is prohibited except in narrow circumstances involving immediate family and certain institutions.",
        ["prohibited practices", "borrowing from customers", "conflicts of interest"],
        "Know prohibitions on borrowing from customers",
        "Lending and borrowing between reps and customers create conflicts."))

    items.push(q(3, "prohibited practices", "hard",
        "Late trading in mutual funds—accepting orders after the NAV is calculated and executing at the earlier NAV—is:",
        ["A customer benefit program", "Prohibited market timing/late trading that harms long-term shareholders",
         "Required by the SEC", "Only applicable to ETFs"],
        "B", "Late trading allows selected investors to trade on stale prices, defrauding other fund shareholders.",
        ["prohibited practices", "late trading", "mutual funds"],
        "Understand late trading prohibitions",
        "Forward pricing requires all orders received before cut-off to get the same NAV."))

    items.push(q(3, "prohibited practices", "medium",
        "Freeriding in a cash account occurs when a customer:",
        ["Pays for purchases before settlement", "Sells securities and uses proceeds to buy other securities before paying for the original purchase",
         "Maintains a $25,000 balance", "Files a CTR for cash deposits"],
        "B", "Freeriding uses unsettled sale proceeds to pay for new purchases without meeting good-faith payment obligations.",
        ["prohibited practices", "freeriding", "cash account"],
        "Define freeriding and related cash account violations",
        "Freeriding is a Regulation T violation with account restrictions."))

    items.push(q(3, "prohibited practices", "medium",
        "Spoofing in the markets involves:",
        ["Placing large orders with intent to cancel before execution to create a false impression of supply or demand",
         "Delivering securities on settlement date", "Verifying customer identity under CIP", "Approving retail communications"],
        "A", "Spoofing places non-bona fide orders to manipulate prices by creating false liquidity impressions.",
        ["prohibited practices", "spoofing", "market manipulation"],
        "Identify spoofing as prohibited manipulation",
        "Spoofing and layering are forms of market abuse subject to enforcement."))

    items.push(q(3, "prohibited practices", "easy",
        "Recommending a speculative penny stock to an 80-year-old widow with low risk tolerance and limited income is MOST likely:",
        ["Suitable because penny stocks are diversified", "Unsuitable and potentially a prohibited practice",
         "Required by FINRA Rule 2210", "Exempt from suitability rules"],
        "B", "Recommending unsuitable investments based on customer profile violates suitability and fair dealing obligations.",
        ["prohibited practices", "suitability", "unsuitable recommendations"],
        "Apply suitability standards to recommendations",
        "Consider age, finances, objectives, and risk tolerance for every recommendation."))

    items.push(q(3, "prohibited practices", "hard",
        "Withholding material negative information about a security while aggressively recommending it to customers violates:",
        ["Only municipal bond rules", "Antifraud and fair dealing obligations",
         "Settlement procedures only", "CTR filing requirements"],
        "B", "Omitting material facts while recommending securities is fraudulent and prohibited.",
        ["prohibited practices", "material omission", "antifraud"],
        "Recognize material omission as fraud",
        "Fair dealing requires disclosing material risks and conflicts."))

    items.push(q(3, "prohibited practices", "medium",
        "Paying referral fees to unregistered persons for introducing customers who purchase securities is:",
        ["Always allowed without limits", "Generally prohibited as paying unregistered persons for securities activities",
         "Required under AML rules", "Only prohibited for municipal bonds"],
        "B", "Paying transaction-based compensation to unregistered persons for securities referrals violates registration requirements.",
        ["prohibited practices", "finders fees", "registration"],
        "Know rules on compensating unregistered persons",
        "Finder's fees for securities transactions require appropriate registration."))

    items.push(q(3, "prohibited practices", "easy",
        "Making false or misleading statements about a security's prospects in order to induce trading is:",
        ["Acceptable sales technique", "Prohibited fraudulent conduct",
         "Required in institutional communications only", "Allowed if the stock price later rises"],
        "B", "False or misleading statements to induce trading violate antifraud provisions.",
        ["prohibited practices", "fraud", "misleading statements"],
        "Understand antifraud standards in sales practices",
        "All communications must be fair, balanced, and not misleading."))

    items.push(q(3, "insider trading", "medium",
        "Material nonpublic information (MNPI) is information that:",
        ["Is available on the company website", "A reasonable investor would consider important in making an investment decision and that has not been widely disseminated",
         "Only relates to bond ratings", "Is always more than one year old"],
        "B", "MNPI is significant, undisclosed information that would likely affect a security's price if made public.",
        ["insider trading", "MNPI", "material information"],
        "Define material nonpublic information",
        "Earnings surprises, mergers, and major litigation are often material."))

    items.push(q(3, "insider trading", "easy",
        "Trading securities based on material nonpublic information in violation of a duty is prohibited under:",
        ["Only state insurance laws", "SEC Rule 10b-5 and related antifraud provisions",
         "MSRB Rule G-37 only", "Regulation T margin rules"],
        "B", "Rule 10b-5 prohibits fraudulent conduct in connection with securities purchases and sales, including insider trading.",
        ["insider trading", "Rule 10b-5", "SEC"],
        "Identify the primary antifraud rule for insider trading",
        "Rule 10b-5 applies broadly to fraud in securities transactions."))

    items.push(q(3, "insider trading", "hard",
        "A corporate attorney learns of an undisclosed merger while working on the deal documents and buys the target company's stock. The attorney is liable under:",
        ["No rules because attorneys are exempt", "Insider trading prohibitions as a temporary insider",
         "Only the firm's dress code", "AML CTR requirements"],
        "B", "Lawyers, accountants, and consultants who receive MNPI through their work are temporary insiders subject to trading restrictions.",
        ["insider trading", "temporary insider", "misappropriation"],
        "Recognize temporary insider status",
        "Anyone with a duty of trust and confidence who trades on MNPI may violate the law."))

    items.push(q(3, "insider trading", "medium",
        "Tipper liability for insider trading generally requires:",
        ["The tipper received no benefit from tipping", "The tipper breached a duty by disclosing MNPI and received a benefit (including reputational or indirect gain)",
         "The tippee lost money on the trade", "The information was already on social media"],
        "B", "Tippers breach their duty and must benefit from the tip; tippees who know or should know of the breach are also liable.",
        ["insider trading", "tipper tippee", "liability"],
        "Understand tipper and tippee liability elements",
        "Passing stock tips from confidential work information can create liability for both parties."))

    items.push(q(3, "insider trading", "easy",
        "Once material information has been disseminated to the public through appropriate channels, insiders may generally:",
        ["Never trade the company's stock", "Trade after the market has had time to absorb the information",
         "Trade only on margin", "Trade only through unregistered persons"],
        "B", "After public dissemination and reasonable time for market absorption, the information is no longer nonpublic.",
        ["insider trading", "public dissemination", "trading restrictions"],
        "Know when insider trading restrictions end",
        "Companies often impose blackout periods around earnings announcements."))

    items.push(q(3, "insider trading", "hard",
        "A broker-dealer employee overhears a confidential client order conversation and trades ahead of the client. This violates:",
        ["Only firm dress code", "Misappropriation theory of insider trading",
         "Municipal bond continuing disclosure rules", "The dividend record date rules"],
        "B", "Misappropriation involves stealing confidential information for securities trading in breach of a duty.",
        ["insider trading", "misappropriation", "front running"],
        "Apply misappropriation theory to employee conduct",
        "Misappropriation covers theft of information from any source owed a duty of confidentiality."))

    items.push(q(3, "insider trading", "medium",
        "A Rule 10b5-1 trading plan allows insiders to trade company stock:",
        ["At any time with no restrictions", "Under a pre-arranged plan adopted in good faith when not aware of MNPI",
         "Only during blackout periods", "Only after tipping friends and family"],
        "B", "10b5-1 plans provide an affirmative defense when adopted without MNPI and executed per plan terms.",
        ["insider trading", "10b5-1 plan", "affirmative defense"],
        "Understand 10b5-1 plan requirements",
        "Plans must be entered into in good faith without manipulating MNPI timing."))

    items.push(q(3, "insider trading", "easy",
        "Penalties for insider trading may include:",
        ["Only a verbal warning", "Civil penalties, disgorgement of profits, criminal fines, and imprisonment",
         "Automatic promotion at the firm", "Exemption from all future registration"],
        "B", "Insider trading carries severe civil and criminal penalties including fines and imprisonment.",
        ["insider trading", "penalties", "enforcement"],
        "Know consequences of insider trading violations",
        "SEC and DOJ pursue insider trading aggressively."))

    items.push(q(3, "insider trading", "medium",
        "Company-imposed blackout periods during earnings season prohibit:",
        ["All market trading globally", "Insiders and covered persons from trading company stock during specified periods",
         "Customers from using limit orders", "Filing of any SEC reports"],
        "B", "Blackout periods restrict insider trading around sensitive events like earnings releases.",
        ["insider trading", "blackout period", "corporate policy"],
        "Understand corporate blackout period policies",
        "Blackout periods supplement legal restrictions with company compliance policies."))

    items.push(q(3, "insider trading", "hard",
        "A friend receives a stock tip from a corporate insider knowing the information is confidential and trades on it. The friend (tippee) is:",
        ["Not liable if they did not work for the company", "Potentially liable if they knew or recklessly disregarded that the information was improperly disclosed",
         "Liable only if they made a profit", "Exempt if trading in a cash account"],
        "B", "Tippees who know or should know the tip breached a duty face insider trading liability.",
        ["insider trading", "tippee liability", "MNPI"],
        "Apply tippee liability standards",
        "Receiving a hot tip from an insider friend can still be illegal trading."))

    items.push(q(3, "AML", "easy",
        "The Bank Secrecy Act (BSA) requires broker-dealers to:",
        ["Guarantee customer investment returns", "Establish Anti-Money Laundering programs to detect and report suspicious activity",
         "Eliminate all cash transactions", "Register municipal securities advisers"],
        "B", "BSA/AML rules require firms to implement programs including CIP, monitoring, training, and reporting.",
        ["AML", "BSA", "compliance program"],
        "Understand BSA obligations for broker-dealers",
        "AML programs include a designated compliance officer and independent testing."))

    items.push(q(3, "AML", "medium",
        "The Customer Identification Program (CIP) is a component of AML compliance that requires firms to:",
        ["Predict customer investment returns", "Verify customer identity when opening accounts and maintain records",
         "File SARs for every trade", "Approve all retail communications"],
        "B", "CIP verifies identity at account opening using documentary or non-documentary methods.",
        ["AML", "CIP", "identity verification"],
        "Know CIP requirements under AML programs",
        "CIP must be completed before or within a reasonable time after account opening."))

    items.push(q(3, "AML", "easy",
        "A Currency Transaction Report (CTR) must be filed for cash transactions exceeding:",
        ["$3,000 in a single day", "$5,000 in a single day", "$10,000 in a single business day", "$25,000 in a single day"],
        "C", "CTR filing is required for cash transactions over $10,000 in one business day.",
        ["AML", "CTR", "$10000 threshold"],
        "Know the $10,000 CTR filing threshold",
        "Multiple cash transactions aggregating over $10,000 may also require CTR filing."))

    items.push(q(3, "AML", "hard",
        "Structuring (smurfing) occurs when a customer:",
        ["Deposits exactly $10,000 once", "Breaks up cash deposits to stay below CTR reporting thresholds to evade reporting",
         "Uses only wire transfers", "Maintains a diversified portfolio"],
        "B", "Structuring to avoid BSA reporting is illegal even if each transaction is below $10,000.",
        ["AML", "structuring", "CTR evasion"],
        "Recognize structuring as a federal crime",
        "Suspicious patterns of sub-threshold deposits trigger SAR consideration."))

    items.push(q(3, "AML", "medium",
        "OFAC sanctions screening requires firms to:",
        ["Ignore international customers", "Check customers and transactions against government sanctions lists",
         "File Form U4 for each trade", "Guarantee foreign currency exchange rates"],
        "B", "Firms must screen against OFAC's Specially Designated Nationals and blocked persons lists.",
        ["AML", "OFAC", "sanctions screening"],
        "Understand OFAC compliance obligations",
        "Transactions with sanctioned parties must be blocked and reported."))

    items.push(q(3, "AML", "easy",
        "Every broker-dealer AML program must designate:",
        ["A marketing director only", "An AML compliance officer responsible for the program",
         "A customer entertainment coordinator", "A municipal securities principal only"],
        "B", "A designated AML compliance officer oversees the firm's BSA/AML program.",
        ["AML", "compliance officer", "BSA program"],
        "Know AML program personnel requirements",
        "AML officers coordinate training, monitoring, and reporting."))

    items.push(q(3, "AML", "medium",
        "Which activity is an AML red flag?",
        ["Regular dividend reinvestment in a long-term portfolio", "A customer unwilling to provide identification or providing suspicious documentation",
         "Using a limit order on a listed stock", "Receiving quarterly account statements"],
        "B", "Refusing to provide ID or providing false documents is a classic AML red flag.",
        ["AML", "red flags", "suspicious activity"],
        "Identify common AML red flags",
        "Other red flags: unusual wire activity, shell company accounts, inconsistent business profile."))

    items.push(q(3, "AML", "hard",
        "Politically Exposed Persons (PEPs) require:",
        ["No additional due diligence", "Enhanced due diligence because of higher corruption and money laundering risk",
         "Automatic account closure", "Exemption from CTR rules"],
        "B", "PEPs—foreign senior political figures and close associates—warrant enhanced scrutiny.",
        ["AML", "PEP", "enhanced due diligence"],
        "Understand enhanced due diligence for high-risk customers",
        "PEP status does not automatically prohibit an account but increases monitoring."))

    items.push(q(3, "AML", "medium",
        "A customer opens an account using funds from unknown third parties with instructions to quickly wire funds overseas. The firm should:",
        ["Ignore because the customer is always right", "Treat as potential suspicious activity and follow AML escalation procedures",
         "Increase margin leverage", "Waive CIP requirements"],
        "B", "Third-party funding with rapid outbound wires is a common money laundering red flag.",
        ["AML", "suspicious activity", "wire transfers"],
        "Respond appropriately to AML red flags",
        "Escalate to the AML officer; consider SAR filing if suspicious."))

    items.push(q(3, "AML", "easy",
        "Beneficial ownership identification for legal entity customers is required to:",
        ["Identify individuals who own or control the entity", "Eliminate all corporate accounts",
         "File CTRs automatically", "Approve IPO underwriting"],
        "A", "Firms must identify beneficial owners of legal entity customers under CDD (Customer Due Diligence) rules.",
        ["AML", "beneficial ownership", "CDD"],
        "Know beneficial ownership identification requirements",
        "CDD rules require knowing who ultimately owns and controls entity accounts."))

    items.push(q(3, "AML", "medium",
        "Independent testing of a firm's AML program must be conducted:",
        ["Never", "Periodically by personnel independent of AML function, commensurate with firm size",
         "Only by customers", "Only after criminal conviction"],
        "B", "AML programs require periodic independent testing to verify effectiveness.",
        ["AML", "independent testing", "BSA program"],
        "Understand AML program audit/testing requirements",
        "Testing frequency and scope depend on the firm's AML risk profile."))

    items.push(q(3, "AML", "hard",
        "A customer repeatedly deposits cash just under $10,000 and requests immediate purchases of bearer instruments. The firm should MOST likely:",
        ["Encourage more deposits", "File a SAR and continue monitoring; structuring and bearer instruments are high-risk indicators",
         "Waive all compliance procedures", "Convert the account to a PDT account"],
        "B", "Structuring combined with high-risk instruments strongly suggests money laundering requiring SAR filing.",
        ["AML", "SAR filing concepts", "structuring"],
        "Connect AML red flags to SAR filing decisions",
        "No minimum dollar amount is required to file a SAR when activity is suspicious."))

    items.push(q(3, "SAR filing concepts", "medium",
        "A Suspicious Activity Report (SAR) must generally be filed within how many days of initial detection of suspicious activity?",
        ["5 calendar days", "10 business days", "30 calendar days", "90 calendar days"],
        "C", "Firms generally must file SARs within 30 calendar days of detecting facts sufficient to conclude activity is suspicious.",
        ["SAR filing concepts", "filing deadline", "FinCEN"],
        "Know SAR filing timeline requirements",
        "A 30-day extension is available if the suspect cannot be identified."))

    items.push(q(3, "SAR filing concepts", "easy",
        "SARs are filed with:",
        ["The customer's local bank only", "FinCEN (Financial Crimes Enforcement Network)",
         "The New York Stock Exchange", "The MSRB"],
        "B", "FinCEN receives SARs filed by financial institutions including broker-dealers.",
        ["SAR filing concepts", "FinCEN", "BSA reporting"],
        "Identify where SARs are filed",
        "FinCEN is the Treasury bureau administering BSA reporting."))

    items.push(q(3, "SAR filing concepts", "hard",
        "Informing a customer that a SAR has been or will be filed is:",
        ["Required by customer service standards", "Prohibited (tipping off)",
         "Required within 24 hours", "Allowed if the customer promises to stop"],
        "B", "Disclosing SAR filings to subjects is prohibited and may constitute a criminal offense.",
        ["SAR filing concepts", "tipping off", "confidentiality"],
        "Understand SAR confidentiality requirements",
        "SAR filings are confidential; even subpoenas have special handling rules."))

    items.push(q(3, "SAR filing concepts", "medium",
        "A SAR should be filed when the firm knows, suspects, or has reason to suspect that a transaction:",
        ["Is always profitable", "Involves funds from illegal activity or is designed to evade BSA requirements",
         "Is below the CTR dollar threshold", "Is placed as a limit order"],
        "B", "SARs report activity that may involve illicit funds, evasion of reporting, or lack of business purpose.",
        ["SAR filing concepts", "suspicious activity", "BSA"],
        "Know when SAR filing is appropriate",
        "No dollar minimum is required for SAR filing."))

    items.push(q(3, "SAR filing concepts", "easy",
        "Is there a minimum dollar amount required before filing a SAR?",
        ["Yes, always $10,000", "Yes, always $25,000", "No, SARs may be filed regardless of dollar amount if activity is suspicious", "Yes, always $100,000"],
        "C", "SARs are based on suspicious activity, not a minimum transaction amount.",
        ["SAR filing concepts", "no minimum", "suspicious activity"],
        "Know SAR filing is not limited by dollar thresholds",
        "Contrast SARs (suspicion-based) with CTRs ($10,000 cash threshold)."))

    items.push(q(3, "SAR filing concepts", "medium",
        "If suspicious activity continues after an initial SAR is filed, the firm should:",
        ["Never file another SAR for the same customer", "File continuing activity SARs every 90 days while the activity continues",
         "Close the SAR file permanently", "Notify the customer of the SAR"],
        "B", "Continuing activity SARs are filed at 90-day intervals if the suspicious activity persists.",
        ["SAR filing concepts", "continuing activity", "ongoing monitoring"],
        "Understand continuing SAR filing requirements",
        "Monitor accounts after SAR filing for ongoing suspicious patterns."))

    items.push(q(3, "SAR filing concepts", "hard",
        "Insider abuse involving employees of the financial institution:",
        ["Is exempt from SAR filing", "Must be reported on a SAR regardless of amount",
         "Requires only a verbal warning", "Is reported only on Form U4"],
        "B", "Employee insider abuse or violations of BSA requirements must be reported via SAR regardless of dollar amount.",
        ["SAR filing concepts", "insider abuse", "employee misconduct"],
        "Know mandatory SAR reporting for insider abuse",
        "Internal theft, collusion, and BSA violations by employees trigger SARs."))

    items.push(q(3, "SAR filing concepts", "medium",
        "When multiple broker-dealers detect related suspicious activity, they should:",
        ["Coordinate to file a single joint SAR when appropriate", "Never communicate about SARs", "Only file CTRs instead", "Wait one year before filing"],
        "A", "Joint SARs may be filed when multiple firms identify related suspicious activity in the same investigation.",
        ["SAR filing concepts", "joint SAR", "information sharing"],
        "Understand joint SAR filing practices",
        "FinCEN encourages information sharing among firms for related activity."))

    items.push(q(3, "communications with the public", "easy",
        "Under FINRA Rule 2210, communications with the public must be:",
        ["As aggressive as possible to attract clients", "Fair, balanced, and not misleading",
         "Approved only by the customer", "Limited to institutional investors only"],
        "B", "Rule 2210 requires communications to be fair, balanced, and not misleading with prominent disclosures.",
        ["communications with the public", "FINRA 2210", "fair and balanced"],
        "Know FINRA communication content standards",
        "Claims must be supported; risks must be disclosed with equal prominence."))

    items.push(q(3, "communications with the public", "medium",
        "Retail communications must be approved by a registered principal before:",
        ["Internal training sessions", "First use or distribution to more than 25 retail investors within 30 days",
         "Every phone call with one customer", "Settlement of trades"],
        "B", "Principal pre-approval is required before first use or broad retail distribution.",
        ["communications with the public", "retail communications", "principal approval"],
        "Know retail communication approval requirements",
        "Correspondence (25 or fewer recipients) has different approval rules."))

    items.push(q(3, "communications with the public", "hard",
        "An advertisement shows hypothetical trading results without disclosing that the results are hypothetical. This is:",
        ["Fully compliant", "Misleading and violates communication standards",
         "Required by the SEC", "Allowed for penny stocks only"],
        "B", "Hypothetical performance must include prominent disclosures that results are hypothetical and have limitations.",
        ["communications with the public", "hypothetical performance", "disclosure"],
        "Understand hypothetical performance disclosure requirements",
        "Past performance disclaimers must state results are no guarantee of future results."))

    items.push(q(3, "communications with the public", "medium",
        "Past performance disclosed in advertising must include a statement that:",
        ["Past performance guarantees future results", "Past performance is not indicative of future results",
         "Only losses will continue", "The SEC endorses the strategy"],
        "B", "Standard disclaimer: past performance does not guarantee future results.",
        ["communications with the public", "past performance", "disclaimer"],
        "Know required past performance disclaimers",
        "Disclosures must be clear, prominent, and not buried in fine print."))

    items.push(q(3, "communications with the public", "easy",
        "A registered representative's post on a personal social media account recommending a specific stock to the general public is:",
        ["Exempt from all rules because it is personal", "A communication with the public subject to FINRA rules",
         "Allowed only on weekends", "Permitted without supervision if under 280 characters"],
        "B", "Social media posts about securities to the public are communications subject to FINRA 2210 and firm policies.",
        ["communications with the public", "social media", "FINRA 2210"],
        "Apply communication rules to social media",
        "Firms must supervise associated persons' business-related social media."))

    items.push(q(3, "communications with the public", "medium",
        "Correspondence is defined as written communication distributed to:",
        ["More than 100 retail investors", "25 or fewer retail investors within 30 days",
         "Only institutional investors", "Only FINRA examiners"],
        "B", "Correspondence reaches 25 or fewer retail investors in 30 days; retail communications exceed that threshold.",
        ["communications with the public", "correspondence", "retail communications"],
        "Distinguish correspondence from retail communications",
        "Institutional communications are directed solely to institutional investors."))

    items.push(q(3, "communications with the public", "hard",
        "Institutional communications are those distributed solely to:",
        ["Any member of the general public", "Institutional investors such as banks, investment companies, and government entities",
         "Only employees of the broker-dealer", "Only customers under age 18"],
        "B", "Institutional communications target qualified institutional investors and have different content and filing rules.",
        ["communications with the public", "institutional communications", "audience"],
        "Define institutional communications audience",
        "Institutional investors meet specific asset or role criteria under FINRA rules."))

    items.push(q(3, "communications with the public", "easy",
        "Promissory communications that predict or project specific future performance with certainty are:",
        ["Encouraged to attract clients", "Prohibited",
         "Required for all mutual fund ads", "Allowed with oral disclaimers only"],
        "B", "FINRA prohibits promissory statements predicting future performance or guaranteeing results.",
        ["communications with the public", "promissory statements", "prohibited claims"],
        "Identify prohibited promissory claims",
        "Words like guarantee, certain profit, and can't lose are red flags."))

    items.push(q(3, "communications with the public", "hard",
        "Regulation Best Interest (Reg BI) requires broker-dealers, when making a recommendation to a retail customer, to:",
        ["Guarantee the highest return in all market conditions", "Act in the retail customer's best interest and not place the firm's interests ahead of the customer's",
         "Eliminate all fees and commissions", "Recommend only proprietary products"],
        "B", "Reg BI establishes a best-interest standard for recommendations to retail customers, including care, disclosure, conflict management, and compliance obligations.",
        ["Regulation Best Interest", "Reg BI", "suitability"],
        "Apply Reg BI best-interest standard for retail recommendations",
        "Reg BI supplements suitability—know both when the SIE tests retail recommendations."))

    items.push(q(3, "customer accounts", "medium",
        "Regulation S-P requires broker-dealers to:",
        ["Publish all customer passwords online", "Protect nonpublic personal customer information and provide privacy notices",
         "Eliminate all electronic records", "Share customer data freely with unaffiliated marketers without consent"],
        "B", "Reg S-P governs privacy of consumer financial information, including safeguards and initial/annual privacy notices.",
        ["Regulation S-P", "privacy", "customer accounts"],
        "Know Reg S-P privacy and safeguard requirements on the SIE",
        "Customers must receive privacy notices explaining information-sharing practices."))

    return items;
}

export const questions = section3_questions();
