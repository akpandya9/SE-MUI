export const faqs = [
  {
    id: "what-is-e2b",
    question: "What is E2B (R3)?",
    answer:
      "E2B (R3) is the latest international standard for the electronic transmission of Individual Case Safety Reports (ICSRs), developed by the International Council for Harmonisation (ICH). It replaces the older E2B (R2) format and introduces more structured, comprehensive, and standardized data fields to improve the quality and consistency of pharmacovigilance reporting worldwide.",
  },
  {
    id: "what-does-product-do",
    question: "What does your product do?",
    answer:
      "SafetyXchange simplifies E2B R3 compliance by providing a cloud-based platform that automates validation, reduces reporting time, and ensures your pharmacovigilance data meets international standards.",
  },
  {
    id: "meets-standards",
    question: "Does it meet E2B R3 standards?",
    answer:
      "Yes, SafetyXchange is fully compliant with E2B R3 standards and undergoes regular validation to ensure continued compliance with evolving regulations.",
  },
  {
    id: "data-security",
    question: "How secure is the data?",
    answer:
      "We implement enterprise-grade security measures including encryption at rest and in transit, regular security audits, and compliance with international data protection standards.",
  },
  {
    id: "data-storage",
    question: "Where is data stored?",
    answer:
      "Data is stored in secure, compliant cloud infrastructure with redundancy and backup systems to ensure availability and data integrity.",
  },
  {
    id: "fda-compliant",
    question: "Is it FDA compliant?",
    answer:
      "Yes, SafetyXchange meets FDA requirements for pharmacovigilance reporting and maintains compliance with relevant regulatory standards.",
  },
];

export const sampleXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<ichicrsmessageheader>
  <messagetype>ichicssr</messagetype>
  <messageformatversion>2.1</messageformatversion>
  <messageformatrelease>2.8</messageformatrelease>
  <messagenumb>800001</messagenumb>
  <messagesenderidentifier>PHARMACO1</messagesenderidentifier>
  <messagereceiveridentifier>REGULATORY1</messagereceiveridentifier>
  <messagedateformat>204</messagedateformat>
  <messagedate>20250512</messagedate>
</ichicrsmessageheader>
<safetyreport>
  <safetyreportversion>1</safetyreportversion>
  <safetyreportid>US-PHARMACO1-2025-00001</safetyreportid>
  <primarysourcecountry>US</primarysourcecountry>
  <occurcountry>US</occurcountry>
  <transmissiondateformat>102</transmissiondateformat>
  <transmissiondate>20250512</transmissiondate>
  <reporttype>1</reporttype>
  <serious>1</serious>
  <seriousnessdeath>1</seriousnessdeath>
  </safetyreport>
`;

export const sampleMissingElements = [
  {
    id: 1,
    field: "messagedate",
    message:
      "Message date is missing or not in the correct format (YYYYMMDDHHMMSS).",
  },
  {
    id: 2,
    field: "messagenumb",
    message:
      "Line: 119 Field: messagenumb Error: Unique message identifier is required. Please enter a valid value.",
  },
  { id: 3, field: "messagesenderidentifier", message: "" },
  { id: 4, field: "messagereceiveridentifier", message: "" },
  {
    id: 5,
    field: "safetyreportid",
    message:
      "Line: 245 Error: Safety Report ID is required and must be unique.",
  },
  {
    id: 6,
    field: "fulfillespeditedcriteria",
    message:
      "Line: 305 Error: Please specify if this report meets expedited reporting criteria (1 = Yes, 2 = No).",
  },
  { id: 7, field: "drugstartdate", message: "" },
  { id: 8, field: "drugindication", message: "" },
  { id: 9, field: "drugindication", message: "" },
  {
    id: 10,
    field: "narrativeincluedclinical",
    message:
      "Line: 355 Error: Case narrative is required. Please provide a clinical summary of the case.",
  },
  {
    id: 11,
    field: "receiverorganization",
    message: "Error: Receiver organization must be specified (e.g., FDA, EMA).",
  },
  { id: 12, field: "primarysourcereaction", message: "" },
];
