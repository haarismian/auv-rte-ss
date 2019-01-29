export var DATA = {
  agreeLeadsheetData: [
    ["Record", "Description", "Figure", "Attachments",''],
    ["<Text>", '<Text>', '<numeric>', '<attachment>', '<attachment>'],
    ["Total", '','','<Sum>'],
    [],
    [],
    ["Amount from the Trial Balance","","",4000],
    ["Difference","","", 2000],
    ["Reconciling item explanation (Insert above)","","", '<Sum>'],
    ["Final Diffrence","","", '=D6-SUM(D7:D8)']
  ],
  sampleCalculation: [
    ["Samples",""],
    ["Determine the appropriate sample size"],
    ["How do you want to determine Sample Size", 'Calculation', "Judgemental"],
    ["Sample Calculation"],
    ["Population", "<Sum>"],
    ["Adjustments to Balance", "<Numeric>"],
    ["Remaining Population", "<Sum>"],
    ["Performance Materiality", "<Numeric>"],
    ["Risk Level", "<Lower>"],
    ["Control Conclusion", "<Sum>"],
    ["Sample Size", "<Formula>"],
  ],

  // have TB data object with one field thats just the balance
  // associate components with the data file and the tb
  // database has a first column = table name, second column = column#, third column = row#, fourth column = value, fifth column = predefined formula
  //ex. tablename = leadsheet, column# = 0, row# = 0, value = cellValue, predefineFormula(True/False)

  instructions: {
    risk: {
      number: "TAR.02",
      title:
        "Trade Accounts Receivable have been recorded which do not relate to the entity, do not exist and/or have been incorrectly recorded.",
      assertion:
        "Existence (AB), Rights & Obligations (AB), Valuation & Allocation (AB)"
    },
    procedure: {
      number: "TAR.P02a",
      title:
        "Obtain and conclude on customer confirmations. [Perform either TAR.P02a or TAR.P02b]."
    },
    tasks:
      "1. Enter the population of Trade Accounts Receivable into the system. 2. Calculate the appropriate sample size. 3. Select a sample of customers/invoices using an appropriate sampling method. 4. For each selection, prepare confirmation letters requesting the customer to confirm the outstanding balance/invoice amount owed by the customer to the entity.  5. Perform follow-ups with customers if no response has been received from the confirmations sent out, and, if needed, send a second confirmation. 6. Obtain completed confirmations. 7. Compare the value per the completed confirmation to the value per the entity's sub-ledger. 8. Investigate and conclude on any variances. 9. If material variances cannot be reconciled or the confirmation is not received, perform subsequent receipts testing set out in TAR.P02b."
  }
};
