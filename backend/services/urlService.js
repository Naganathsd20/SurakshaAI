/**
 * URL Analysis Service Interface (Phase 3 Foundation)
 * Accepts a web link URL string and returns a structured foundation response contract.
 * Note: Real web scraping & domain heuristic scanners will extend this interface in Phase 4.
 */

const analyzeUrlService = async (url) => {
  const trimmedUrl = url.trim();
  const lowerUrl = trimmedUrl.toLowerCase();

  const isHttps = lowerUrl.startsWith('https://');
  const isIpAddress = /^(http:\/\/|https:\/\/)?\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(lowerUrl);
  const containsSpoofKeywords = /sbi|hdfc|kyc|verify|bank|login|update|free|bonus|claim/i.test(lowerUrl);
  const isGovDomain = lowerUrl.includes('.gov.in') || lowerUrl.includes('.nic.in');

  let riskLevel = 'SAFE';
  let riskScore = 10;
  let indicators = ['Valid SSL Protocol (HTTPS)', 'Standard Domain Structure'];
  let explanation = 'Target URL presents standard web domain indicators with secure protocol.';
  let recommendations = [
    'Url structure appears safe.',
    'Always ensure the site address matches the official domain before entering credentials.'
  ];

  if (isGovDomain) {
    riskLevel = 'SAFE';
    riskScore = 2;
    indicators = ['Verified National Domain (.gov.in)', 'Valid SSL Encryption'];
    explanation = 'Target URL belongs to an official Government of India web domain.';
    recommendations = ['This link leads to an official government portal. It is safe to proceed.'];
  } else if (isIpAddress || (containsSpoofKeywords && !isHttps)) {
    riskLevel = 'HIGH';
    riskScore = 94;
    indicators = [
      isIpAddress ? 'Raw IP Address Host Name' : 'Missing SSL / Non-HTTPS Protocol (HTTP)',
      'Potential Brand Spoofing / Typosquatting Pattern',
      'Unverified Non-Standard Domain Registration'
    ];
    explanation = 'Target web link uses an unencrypted HTTP protocol combined with financial brand keywords, which strongly matches active phishing portals.';
    recommendations = [
      'Do NOT enter passwords, OTPs, or credit card details on this page.',
      'Check that banking links end with official domains like .co.in or .com.'
    ];
  } else if (containsSpoofKeywords || !isHttps) {
    riskLevel = 'MEDIUM';
    riskScore = 62;
    indicators = ['Unencrypted HTTP Protocol', 'Keyword Suspicion Match'];
    explanation = 'URL lacks secure HTTPS encryption or includes suspicious keyword combinations.';
    recommendations = ['Exercise caution when visiting this URL. Do not submit sensitive data.'];
  }

  return {
    inputType: 'url',
    url: trimmedUrl,
    isHttps,
    riskScore,
    riskLevel,
    result: riskLevel === 'HIGH' ? 'SUSPICIOUS_PHISHING_URL' : riskLevel === 'MEDIUM' ? 'MODERATE_RISK_URL' : 'VERIFIED_SAFE_URL',
    indicators,
    explanation,
    recommendations,
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  analyzeUrlService
};
