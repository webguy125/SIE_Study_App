"""Section 4: Overview of Regulatory Framework — 38 SIE exam prep questions."""

SECTION_NAME = "Overview of Regulatory Framework"


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


def section4_questions():
    items = []

    # FINRA (8)
    items.append(q(4, "FINRA", "easy",
        "FINRA is best described as:",
        ["A federal agency that issues currency", "A self-regulatory organization that regulates broker-dealers and registered persons",
         "An insurance guaranty association", "A municipal bond credit rating agency"],
        "B", "FINRA is an SRO authorized by Congress to regulate member broker-dealers and associated persons.",
        ["FINRA", "SROs", "broker-dealer regulation"],
        "Define FINRA's role in the securities industry",
        "List FINRA functions: registration, examinations, rulemaking, enforcement, arbitration."))

    items.append(q(4, "FINRA", "medium",
        "BrokerCheck allows investors to:",
        ["Execute trades without a broker-dealer", "Research registration and disciplinary history of firms and representatives",
         "File Suspicious Activity Reports", "Register for the SIE exam without a sponsor"],
        "B", "BrokerCheck is FINRA's free public tool for background research on brokers and firms.",
        ["BrokerCheck", "FINRA", "disclosure"],
        "Use BrokerCheck as an investor protection resource",
        "Practice looking up a sample rep on brokercheck.finra.org before exam day."))

    items.append(q(4, "FINRA", "hard",
        "Under most customer account agreements, disputes with a FINRA member firm are typically resolved through:",
        ["Small claims court only", "FINRA arbitration rather than court litigation",
         "SEC administrative hearings exclusively", "MSRB mediation only"],
        "B", "Customer agreements usually require FINRA arbitration for industry-related disputes.",
        ["FINRA", "arbitration", "dispute resolution"],
        "Understand FINRA arbitration requirements",
        "Arbitration awards are binding; appeals are limited compared to court cases."))

    items.append(q(4, "FINRA", "medium",
        "A registered representative's continuing education Regulatory Element is required:",
        ["Only on the first day of employment", "On a periodic schedule established by FINRA",
         "Only after a customer complaint is filed", "Never for principals"],
        "B", "FINRA's Regulatory Element keeps reps current on rules and regulations on a set schedule.",
        ["continuing education", "Regulatory Element", "FINRA"],
        "Know FINRA CE Regulatory Element requirements",
        "Pair Regulatory Element with the Firm Element required of member firms."))

    items.append(q(4, "FINRA", "easy",
        "Which entity administers the Securities Industry Essentials (SIE) examination?",
        ["SEC", "FINRA", "MSRB", "Federal Reserve"],
        "B", "FINRA administers qualifying exams including the SIE and Series top-off exams.",
        ["SIE", "FINRA", "registration"],
        "Identify who administers SIE and qualification exams",
        "SIE can be taken without firm sponsorship; Series 7 requires sponsorship."))

    items.append(q(4, "FINRA", "medium",
        "A FINRA member firm must designate a:",
        ["Chief monetary policy officer", "Supervisory principal responsible for firm compliance",
         "Municipal bond insurer", "Federal tax collector"],
        "B", "Firms must appoint principals to supervise activities and ensure compliance with rules.",
        ["supervision", "FINRA", "registered principal"],
        "Understand firm supervisory structure requirements",
        "Principals approve communications, supervise reps, and enforce firm policies."))

    items.append(q(4, "FINRA", "hard",
        "Statutory disqualification under the Securities Exchange Act may result from:",
        ["Passing the SIE on the first attempt", "Certain criminal convictions and regulatory sanctions",
         "Completing the Firm Element annually", "Maintaining a net capital surplus"],
        "B", "Serious criminal and regulatory events can bar association with a broker-dealer absent exemptions.",
        ["statutory disqualification", "disciplinary disclosures", "Form U4"],
        "Recognize events causing statutory disqualification",
        "Review Form U4 disclosure questions for reportable criminal and regulatory events."))

    items.append(q(4, "FINRA", "medium",
        "FINRA Rule 2210 governs:",
        ["Margin maintenance requirements", "Communications with the public",
         "Municipal bond underwriting spreads", "Currency Transaction Reports"],
        "B", "Rule 2210 sets standards for broker-dealer communications with the public.",
        ["communications with the public", "FINRA", "advertising"],
        "Associate FINRA 2210 with public communications standards",
        "Communications must be fair, balanced, and not misleading."))

    # SEC (8)
    items.append(q(4, "SEC", "easy",
        "The primary mission of the SEC includes:",
        ["Setting the federal funds rate", "Protecting investors and maintaining fair, orderly, efficient markets",
         "Guaranteeing municipal bond principal", "Collecting state income taxes"],
        "B", "The SEC enforces securities laws, requires disclosure, and regulates markets and participants.",
        ["SEC", "investor protection", "securities regulation"],
        "State the SEC's core mission",
        "Contrast SEC (securities) with Fed (monetary policy) and FINRA (SRO)."))

    items.append(q(4, "SEC", "medium",
        "The Securities Act of 1933 primarily regulates:",
        ["Secondary market trading on exchanges", "The initial issuance of securities and prospectus disclosure",
         "Municipal continuing disclosure only", "Bank deposit insurance"],
        "B", "The 1933 Act focuses on primary market disclosures and registration of new securities.",
        ["Securities Act of 1933", "SEC", "registration"],
        "Distinguish Securities Act of 1933 from 1934 Act",
        "1933 = new issues; 1934 = secondary markets, broker-dealers, reporting companies."))

    items.append(q(4, "SEC", "medium",
        "The Securities Exchange Act of 1934 primarily governs:",
        ["Only municipal bond tax treatment", "Secondary market trading, broker-dealers, and reporting companies",
         "Insurance product illustrations", "Federal Reserve open market operations"],
        "B", "The 1934 Act regulates exchanges, broker-dealers, and ongoing corporate reporting.",
        ["Securities Exchange Act of 1934", "SEC", "secondary market"],
        "Identify scope of the 1934 Act",
        "The 1934 Act created the SEC and regulates ongoing market activity."))

    items.append(q(4, "SEC", "hard",
        "SEC Rule 17a-4 requires broker-dealers to:",
        ["Publish all customer Social Security numbers", "Preserve records in an accessible, non-rewriteable format for required periods",
         "Eliminate all electronic communications", "File Form U4 for each retail trade"],
        "B", "Rule 17a-4 sets retention periods and WORM/electronic storage standards for books and records.",
        ["SEC", "record retention", "Rule 17a-4"],
        "Know SEC record retention requirements for broker-dealers",
        "Records must be readily accessible for SEC and FINRA examinations."))

    items.append(q(4, "SEC", "medium",
        "Insider trading prohibitions are primarily enforced under:",
        ["Bank Secrecy Act provisions only", "SEC antifraud rules such as Rule 10b-5",
         "MSRB Rule G-37 exclusively", "FINRA margin requirements"],
        "B", "Rule 10b-5 prohibits fraud in connection with securities transactions, including trading on MNPI.",
        ["insider trading", "SEC", "Rule 10b-5"],
        "Connect insider trading to SEC antifraud authority",
        "MNPI + breach of duty + personal benefit = classic insider trading elements."))

    items.append(q(4, "SEC", "easy",
        "The SEC requires public companies to file periodic reports including:",
        ["Form U4", "Form 10-K (annual) and Form 10-Q (quarterly)", "Currency Transaction Reports", "SARs"],
        "B", "Public reporting companies file annual 10-K and quarterly 10-Q reports with the SEC.",
        ["SEC", "10-K", "disclosure"],
        "Identify key SEC periodic report forms",
        "10-K = annual; 10-Q = quarterly; 8-K = material current events."))

    items.append(q(4, "SEC", "hard",
        "Investment advisers with sufficient assets under management generally register with:",
        ["FINRA only", "The SEC or state securities regulators depending on AUM and clients",
         "The MSRB exclusively", "The FDIC"],
        "B", "Advisers above SEC thresholds register with the SEC; smaller advisers may register with states.",
        ["investment adviser", "SEC", "registration"],
        "Understand investment adviser registration jurisdiction",
        "Distinguish investment advisers (Advisers Act) from broker-dealers (Exchange Act)."))

    items.append(q(4, "SEC", "medium",
        "The SEC's EDGAR system is used for:",
        ["Executing customer trades", "Electronic filing and public access to issuer disclosure documents",
         "Administering the SIE exam", "Filing CTRs for cash transactions"],
        "B", "EDGAR provides electronic access to registration statements, periodic reports, and other filings.",
        ["EDGAR", "SEC", "disclosure"],
        "Explain EDGAR's role in securities disclosure",
        "Investors use EDGAR to research public company financials and filings."))

    # MSRB (5)
    items.append(q(4, "MSRB", "easy",
        "The Municipal Securities Rulemaking Board (MSRB) is responsible for:",
        ["Setting rules for municipal securities dealers and market transparency",
         "Regulating Federal Reserve monetary policy", "Insuring bank deposits", "Administering the Series 7 exam"],
        "A", "The MSRB creates rules for the municipal securities market but does not enforce them directly.",
        ["MSRB", "municipal bonds", "SROs"],
        "Define MSRB's rulemaking role",
        "FINRA and the SEC enforce MSRB rules against dealers."))

    items.append(q(4, "MSRB", "medium",
        "EMMA (Electronic Municipal Market Access) provides:",
        ["Real-time stock quotes for NYSE listings", "Public access to municipal bond disclosure documents",
         "Margin loan calculators", "Insurance policy illustrations"],
        "B", "EMMA is the MSRB's official repository for municipal bond disclosures.",
        ["EMMA", "MSRB", "municipal bonds"],
        "Use EMMA for municipal bond research",
        "Official statements and continuing disclosures are available on EMMA."))

    items.append(q(4, "MSRB", "hard",
        "A municipal finance professional (MFP) must pass which exam?",
        ["Series 7 only", "Series 50 (Municipal Advisor Representative) or Series 52 (Municipal Securities Representative)",
         "SIE only with no top-off", "Series 63 exclusively"],
        "B", "Municipal professionals take specialized MSRB exams such as Series 50 or 52 after the SIE.",
        ["MSRB", "Series 50", "registration"],
        "Know municipal representative qualification exams",
        "SIE is the foundation; municipal top-off exams depend on role."))

    items.append(q(4, "MSRB", "medium",
        "MSRB Rule G-17 requires municipal securities dealers to:",
        ["Deal fairly with all persons and not mislead any party", "Guarantee all municipal bond principal",
         "Avoid all continuing disclosure", "Set federal income tax rates"],
        "A", "G-17 imposes a fair dealing standard on municipal securities professionals.",
        ["MSRB", "G-17", "fair dealing"],
        "Understand MSRB fair dealing obligations",
        "G-17 applies to dealings with issuers, investors, and other parties."))

    items.append(q(4, "MSRB", "easy",
        "Unlike FINRA, the MSRB does NOT:",
        ["Write rules for the municipal market", "Directly examine and enforce against dealers",
         "Operate EMMA", "Require continuing education for municipal professionals"],
        "B", "MSRB is a rulemaking board; FINRA and the SEC handle enforcement and examination.",
        ["MSRB", "FINRA", "SROs"],
        "Distinguish MSRB rulemaking from enforcement",
        "Remember: MSRB makes rules; FINRA/SEC enforce for dealers."))

    # SROs (4)
    items.append(q(4, "SROs", "easy",
        "Self-regulatory organizations (SROs) in the securities industry include:",
        ["FINRA and registered national securities exchanges", "Only the U.S. Treasury",
         "State insurance commissioners", "The FDIC"],
        "A", "FINRA and exchanges like NYSE (as SROs) develop and enforce industry rules under SEC oversight.",
        ["SROs", "FINRA", "exchanges"],
        "List major securities industry SROs",
        "All SROs operate under SEC oversight."))

    items.append(q(4, "SROs", "medium",
        "The SEC's relationship to SROs is best described as:",
        ["SEC has no authority over SRO rules", "SEC oversees and approves SRO rule changes",
         "SROs regulate the SEC", "SROs replace all SEC enforcement"],
        "B", "SROs self-regulate but remain under SEC oversight, including rule approval.",
        ["SROs", "SEC", "regulation"],
        "Explain SEC oversight of SROs",
        "SRO proposed rule changes often require SEC approval before effectiveness."))

    items.append(q(4, "SROs", "hard",
        "A national securities exchange acting as an SRO is responsible for:",
        ["Setting federal tax brackets", "Regulating its member firms' trading activities and enforcing exchange rules",
         "Issuing municipal bonds", "Administering bank deposit insurance"],
        "B", "Exchanges enforce their own rules and trading requirements on members.",
        ["SROs", "exchanges", "market regulation"],
        "Understand exchange SRO self-regulatory functions",
        "Exchanges and FINRA both function as SROs with different scopes."))

    items.append(q(4, "SROs", "medium",
        "Which statement about SROs is TRUE?",
        ["SROs are created by private firms without government authorization",
         "SROs are authorized by Congress and overseen by the SEC",
         "SROs only regulate insurance products", "SROs cannot discipline member firms"],
        "B", "SRO authority comes from federal securities laws with SEC oversight.",
        ["SROs", "SEC", "regulation"],
        "Understand legal basis for SRO authority",
        "FINRA can fine, suspend, or bar members through disciplinary proceedings."))

    # Registration (5)
    items.append(q(4, "registration", "easy",
        "The Securities Industry Essentials (SIE) exam:",
        ["Requires firm sponsorship before taking", "Tests foundational industry knowledge and can be taken without sponsorship",
         "Replaces all qualification exams", "Is administered only by the MSRB"],
        "B", "The SIE is a standalone exam open to anyone age 18+, without firm sponsorship.",
        ["SIE", "registration", "FINRA"],
        "Know SIE eligibility and sponsorship rules",
        "After passing SIE, candidates need firm sponsorship for a top-off exam like Series 7."))

    items.append(q(4, "registration", "medium",
        "To become a registered representative of a FINRA member firm, a candidate must generally:",
        ["Pass the SIE and a qualification (top-off) exam and be sponsored by a member firm",
         "Only complete a high school diploma", "Register directly with the SEC without a firm",
         "Obtain a CPA license"],
        "A", "Registration requires sponsorship, passing exams, and filing Form U4.",
        ["registration", "Series 7", "sponsorship"],
        "Outline the registered representative pathway",
        "Typical path: pass SIE → obtain sponsorship → pass Series 7 → register on U4."))

    items.append(q(4, "registration", "hard",
        "A registered representative who changes firms must:",
        ["Start the SIE exam over", "Have the new firm file a Form U4 transfer registration",
         "Surrender all licenses permanently", "Re-register with the Federal Reserve"],
        "B", "Registration transfers between FINRA member firms via U4 filing by the new employer.",
        ["registration", "Form U4", "transfer"],
        "Understand inter-firm registration transfer process",
        "Disclosure questions on U4 must be updated when material changes occur."))

    items.append(q(4, "registration", "medium",
        "Which exam is typically required for a general securities representative?",
        ["Series 3 only", "Series 7 (General Securities Representative)", "Series 65 only", "Series 27 only"],
        "B", "Series 7 qualifies reps to sell most securities products after passing the SIE.",
        ["Series 7", "registration", "qualification exam"],
        "Match Series exams to job functions",
        "Series 6 = limited products; Series 7 = broad securities; Series 63 = state law."))

    items.append(q(4, "registration", "easy",
        "The SIE exam consists of:",
        ["50 scored questions in 60 minutes", "75 scored questions in 105 minutes with a 70% passing score",
         "200 questions in 4 hours", "10 questions without a time limit"],
        "B", "As of 2026, the SIE has 75 scored questions, 5 unscored pretest items (80 on screen), 105 minutes, and a 70% passing score.",
        ["SIE", "exam structure", "registration"],
        "Memorize 2026 SIE exam format and passing score",
        "Pretest items were reduced from 10 to 5 effective October 27, 2025; only scored items count toward pass/fail."))

    # Form U4 (4)
    items.append(q(4, "Form U4", "medium",
        "Form U4 is used to:",
        ["Register broker-dealer and associated person information with FINRA",
         "File a customer's tax return", "Report currency transactions over $10,000",
         "Register new securities with the SEC"],
        "A", "Form U4 is the Uniform Application for Securities Industry Registration.",
        ["Form U4", "registration", "FINRA"],
        "Identify the purpose of Form U4",
        "U4 collects personal info, employment history, and disclosure events."))

    items.append(q(4, "Form U4", "hard",
        "Which event must be disclosed on Form U4?",
        ["A parking ticket", "A felony conviction or investment-related misdemeanor",
         "Changing a home address within the same city", "Completing continuing education"],
        "B", "Criminal and regulatory disclosure questions on U4 cover felonies and investment-related misdemeanors.",
        ["Form U4", "disciplinary disclosures", "disclosure"],
        "Know reportable disclosure categories on U4",
        "Review all U4 disclosure sections: criminal, regulatory, civil, financial, bonding."))

    items.append(q(4, "Form U4", "medium",
        "A registered person must amend Form U4 within 30 days of:",
        ["Receiving a customer birthday card", "Material changes such as a new felony charge or regulatory action",
         "Completing a routine trade", "Reading a research report"],
        "B", "Prompt amendment is required for reportable events and material changes.",
        ["Form U4", "amendment", "disciplinary disclosures"],
        "Understand U4 amendment timing requirements",
        "Firms and individuals share responsibility for timely U4 updates."))

    items.append(q(4, "Form U4", "easy",
        "Information filed on Form U4 is available to the public through:",
        ["Only the registered person's immediate family", "FINRA BrokerCheck",
         "The customer's margin account statement", "Unpublished SEC archives"],
        "B", "Much U4 information, including disclosures, is accessible via BrokerCheck.",
        ["Form U4", "BrokerCheck", "public disclosure"],
        "Know that registration info is largely public",
        "Customers can research reps on BrokerCheck before opening accounts."))

    # Continuing education (2)
    items.append(q(4, "continuing education", "easy",
        "FINRA continuing education consists of:",
        ["Only the SIE exam retake", "Regulatory Element and Firm Element components",
         "State insurance licensing only", "Annual Series 7 retesting for all reps"],
        "B", "CE includes FINRA's Regulatory Element and the firm's Firm Element training.",
        ["continuing education", "Regulatory Element", "Firm Element"],
        "Name the two components of FINRA CE",
        "Regulatory Element = FINRA-driven; Firm Element = firm-specific annual training."))

    # Disciplinary disclosures (2)
    items.append(q(4, "disciplinary disclosures", "medium",
        "A customer complaint alleging damages above a reportable threshold must be:",
        ["Ignored until resolved in the customer's favor", "Disclosed on Form U4 according to FINRA requirements",
         "Reported only to local police", "Kept completely confidential with no filing"],
        "B", "Reportable customer complaints and settlements must be disclosed on U4.",
        ["disciplinary disclosures", "customer complaints", "Form U4"],
        "Know customer complaint disclosure requirements",
        "Review FINRA reportable event thresholds for complaints and arbitrations."))

    items.append(q(4, "Form U4", "medium",
        "Form U5 is filed to:",
        ["Register a new associated person with FINRA", "Report the termination of a registered person's association with a member firm",
         "File a customer's tax election", "Register a new municipal bond issue"],
        "B", "Form U5 is the Uniform Termination Notice for Securities Industry Registration, filed when a person leaves a firm.",
        ["Form U5", "registration", "Form U4"],
        "Distinguish Form U4 (hire/registration) from Form U5 (termination)",
        "U5 termination disclosures may affect future registration."))

    items.append(q(4, "registration", "hard",
        "FINRA Rule 3270 requires registered persons to:",
        ["Disclose and obtain firm approval for outside business activities (OBA)",
         "Avoid all contact with customers", "Trade only municipal securities", "Skip continuing education"],
        "A", "Registered persons must provide prior written notice of outside business activities so firms can supervise conflicts.",
        ["outside business activities", "Rule 3270", "registration"],
        "Know outside business activity disclosure requirements",
        "Private securities transactions (PST) have separate Rule 3280 requirements."))

    return items[:38]


if __name__ == "__main__":
    print(len(section4_questions()))