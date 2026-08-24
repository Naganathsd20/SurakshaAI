/**
 * SurakshaAI — Phase 4 URL Phishing Detection Engine
 * Deterministic, rule-based web link detector analyzing domain structure, protocols, and URL patterns.
 */

const PHISHING_URL_KEYWORDS = [
  'verify', 'login', 'secure', 'account', 'update', 'payment', 
  'wallet', 'banking', 'kyc', 'confirm', 'sign-in', 'authenticate',
  'billing', 'free', 'bonus', 'claim', 'award', 'support-service'
];

/**
 * Analyzes a URL string for security indicators
 * Returns structured evidence object
 */
const detectUrlIndicators = (rawUrl = '') => {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return {
      type: 'url',
      detected: false,
      indicatorCount: 0,
      evidenceList: []
    };
  }

  const trimmed = rawUrl.trim();
  const lower = trimmed.toLowerCase();
  const evidenceList = [];

  let parsedUrl = null;
  try {
    const checkUrl = lower.match(/^https?:\/\//i) ? trimmed : `http://${trimmed}`;
    parsedUrl = new URL(checkUrl);
  } catch (err) {
    // Malformed URL format fallback
    return {
      type: 'url',
      detected: true,
      indicatorCount: 1,
      evidenceList: [{
        code: 'MALFORMED_URL',
        label: 'Malformed or invalid URL structure',
        severity: 'high',
        evidence: `URL string: "${trimmed}"`,
        description: 'Provided web link fails standard URL parsing rules.'
      }]
    };
  }

  const protocol = parsedUrl.protocol;
  const hostname = parsedUrl.hostname;
  const pathname = parsedUrl.pathname;
  const search = parsedUrl.search;

  // 1. Protocol Security Check
  if (protocol === 'http:') {
    evidenceList.push({
      code: 'HTTP_PROTOCOL',
      label: 'Unencrypted HTTP protocol in use',
      severity: 'medium',
      evidence: `Protocol: 'http:'`,
      description: 'Lacks SSL/TLS encryption. Data transmitted over this link is vulnerable to interception.'
    });
  }

  // 2. Raw IP Address Host Check
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipRegex.test(hostname)) {
    evidenceList.push({
      code: 'IP_HOST',
      label: 'URL uses a raw IP address instead of a domain name',
      severity: 'high',
      evidence: `Host IP: '${hostname}'`,
      description: 'Legitimate organizations rarely use raw IP addresses for user portals. Common phishing kit indicator.'
    });
  }

  // 3. Domain Subdomain & Separator Analysis
  const domainParts = hostname.split('.');
  if (domainParts.length > 3 && !hostname.endsWith('.gov.in') && !hostname.endsWith('.co.uk')) {
    evidenceList.push({
      code: 'EXCESSIVE_SUBDOMAINS',
      label: 'Excessive subdomain depth detected',
      severity: 'medium',
      evidence: `Subdomains count: ${domainParts.length} ('${hostname}')`,
      description: 'High number of subdomains often masks true domain ownership.'
    });
  }

  if (hostname.includes('-') && (hostname.includes('bank') || hostname.includes('sbi') || hostname.includes('hdfc') || hostname.includes('kyc'))) {
    evidenceList.push({
      code: 'SUSPICIOUS_DOMAIN_SEPARATOR',
      label: 'Suspicious hyphenated brand combination in host',
      severity: 'high',
      evidence: `Host: '${hostname}'`,
      description: 'Combines brand keywords with hyphens (e.g. sbi-kyc-verify) to spoof official portals.'
    });
  }

  // 4. Phishing Path / Host Keyword Matches
  const matchedKeywords = [];
  for (const kw of PHISHING_URL_KEYWORDS) {
    if (lower.includes(kw)) {
      matchedKeywords.push(kw);
    }
  }

  if (matchedKeywords.length > 0) {
    evidenceList.push({
      code: 'PHISHING_URL_KEYWORD',
      label: 'Phishing-sensitive keywords present in URL',
      severity: matchedKeywords.length > 1 ? 'high' : 'medium',
      evidence: `Matched keywords: [${matchedKeywords.join(', ')}]`,
      description: 'Contains high-risk target keywords often used in credential harvesting paths.'
    });
  }

  // 5. Unusually Long / Complex URL Check
  if (trimmed.length > 85) {
    evidenceList.push({
      code: 'UNUSUALLY_LONG_URL',
      label: 'Unusually long web link length',
      severity: 'low',
      evidence: `URL length: ${trimmed.length} chars`,
      description: 'Excessively long links are often used to hide the destination or pass tracking tokens.'
    });
  }

  // 6. Suspicious Query Parameter Inspection
  if (search && (search.includes('token=') || search.includes('session=') || search.includes('redirect=') || search.includes('auth='))) {
    evidenceList.push({
      code: 'SUSPICIOUS_QUERY_PARAMS',
      label: 'Suspicious authentication query parameters in link',
      severity: 'medium',
      evidence: `Query string: '${search.substring(0, 40)}...'`,
      description: 'Contains redirection or authorization query parameters.'
    });
  }

  return {
    type: 'url',
    detected: evidenceList.length > 0,
    indicatorCount: evidenceList.length,
    evidenceList
  };
};

module.exports = {
  detectUrlIndicators,
  PHISHING_URL_KEYWORDS
};
