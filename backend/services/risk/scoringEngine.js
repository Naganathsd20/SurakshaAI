/**
 * SurakshaAI — Phase 6 Risk Scoring & Explainability Engine
 * Combines Phase 4 security indicators and Phase 5 NLP intent signals.
 * Performs cross-layer deduplication, weighted scoring, risk level classification,
 * explainability narrative synthesis, and prioritized safety recommendations.
 */

// Base Weight Catalog for Threat Concepts
const THREAT_CATALOG = {
  // Credential & Authentication Solicitations (40 pts)
  OTP_REQUEST: { label: 'Sensitive OTP or PIN Credential Solicitation', baseWeight: 40, severity: 'HIGH', concept: 'OTP' },
  PIN_PASSWORD_REQUEST: { label: 'Sensitive Authentication Credential Solicitation', baseWeight: 40, severity: 'HIGH', concept: 'OTP' },
  CREDENTIAL_HARVESTING: { label: 'Identity / KYC Document Harvest Solicitation', baseWeight: 35, severity: 'HIGH', concept: 'CREDENTIAL' },
  CREDENTIAL_REQUEST: { label: 'Identity or KYC Verification Solicitation', baseWeight: 35, severity: 'HIGH', concept: 'CREDENTIAL' },
  CONFIDENTIAL_INFO_REQUEST: { label: 'Request for Private Banking Credentials', baseWeight: 35, severity: 'HIGH', concept: 'CREDENTIAL' },

  // Panic & Service Loss Threats (35 pts)
  ACCOUNT_CLOSURE_THREAT: { label: 'Account Suspension or Disconnection Threat', baseWeight: 35, severity: 'HIGH', concept: 'THREAT' },
  FEAR_THREAT: { label: 'Account Disconnection or Blockage Panic Threat', baseWeight: 35, severity: 'HIGH', concept: 'THREAT' },

  // Urgency & Time Pressure (30 pts)
  URGENT_LANGUAGE: { label: 'Urgent Time-Pressure Language', baseWeight: 30, severity: 'HIGH', concept: 'URGENCY' },
  URGENCY: { label: 'Urgent Action Request', baseWeight: 30, severity: 'HIGH', concept: 'URGENCY' },

  // Impersonation & Financial Bait (25 pts)
  BANK_IMPERSONATION: { label: 'Bank or Financial Institution Impersonation', baseWeight: 25, severity: 'MEDIUM', concept: 'IMPERSONATION' },
  AUTHORITY_IMPERSONATION: { label: 'Authority or Banking Impersonation', baseWeight: 25, severity: 'MEDIUM', concept: 'IMPERSONATION' },
  UTILITY_SERVICE_IMPERSONATION: { label: 'Utility Board or Service Provider Impersonation', baseWeight: 20, severity: 'MEDIUM', concept: 'IMPERSONATION' },
  LOTTERY_PRIZE_OFFER: { label: 'Fake Lottery or Cashback Reward Bait', baseWeight: 25, severity: 'MEDIUM', concept: 'REWARD' },
  REWARD_PRIZE_BAIT: { label: 'Reward / Lottery Prize Bait', baseWeight: 25, severity: 'MEDIUM', concept: 'REWARD' },

  // Financial Transfers & External Links (20 pts)
  PAYMENT_REQUEST: { label: 'Unverified Money Transfer Prompt', baseWeight: 20, severity: 'MEDIUM', concept: 'PAYMENT' },
  FEE_REFUND_SCAM: { label: 'Processing Fee or Refund Prompt', baseWeight: 20, severity: 'MEDIUM', concept: 'PAYMENT' },
  SUSPICIOUS_LINK_PROMPT: { label: 'External Link Follow Prompt', baseWeight: 20, severity: 'MEDIUM', concept: 'LINK' },
  REQUEST_CLICK_LINK: { label: 'Prompt to Open External Web Link', baseWeight: 20, severity: 'MEDIUM', concept: 'LINK' },

  // Web Link & Host Infrastructure Heuristics (URL Analysis)
  MALFORMED_URL: { label: 'Malformed or Invalid Web Link Structure', baseWeight: 40, severity: 'HIGH', concept: 'MALFORMED' },
  IP_HOST: { label: 'Raw IP Address Host (No Registered Domain)', baseWeight: 35, severity: 'HIGH', concept: 'RAW_IP' },
  SUSPICIOUS_DOMAIN_SEPARATOR: { label: 'Spoofed Brand Hyphenation in Domain', baseWeight: 35, severity: 'HIGH', concept: 'DOMAIN_SPOOF' },
  PHISHING_URL_KEYWORD: { label: 'Sensitive Phishing Keywords in Path/Host', baseWeight: 25, severity: 'MEDIUM', concept: 'PATH_KEYWORD' },
  EXCESSIVE_SUBDOMAINS: { label: 'Excessive Subdomain Depth', baseWeight: 20, severity: 'MEDIUM', concept: 'SUBDOMAINS' },
  SUSPICIOUS_QUERY_PARAMS: { label: 'Suspicious Auth/Redirect Query Parameters', baseWeight: 20, severity: 'MEDIUM', concept: 'QUERY_PARAMS' },
  SUSPICIOUS_TLD: { label: 'Unusual Top-Level Domain Extension', baseWeight: 15, severity: 'MEDIUM', concept: 'TLD' },
  HTTP_PROTOCOL: { label: 'Unencrypted HTTP Web Connection', baseWeight: 15, severity: 'LOW', concept: 'PROTOCOL' },
  UNUSUALLY_LONG_URL: { label: 'Unusually Long Web Address Length', baseWeight: 10, severity: 'LOW', concept: 'URL_LENGTH' },

  // Generic Call to Actions (10 pts)
  ACCOUNT_VERIFICATION: { label: 'Unsolicited Account Verification Prompt', baseWeight: 10, severity: 'LOW', concept: 'CTA' },
  SUSPICIOUS_CALL_TO_ACTION: { label: 'High-Pressure Call to Action', baseWeight: 10, severity: 'LOW', concept: 'CTA' }
};

/**
 * Calculates weighted risk score, deduplicates signals, and builds explainability output
 */
const calculateRiskAssessment = ({ phase4Indicators = {}, intentSignals = [], inputType = 'message' }) => {
  const phase4List = phase4Indicators.evidenceList || [];
  const phase5List = intentSignals || [];

  // Group signals by shared threat concept to eliminate duplicate scoring
  const conceptGroups = {};

  // Process Phase 4 Indicators
  for (const item of phase4List) {
    const meta = THREAT_CATALOG[item.code] || {
      label: item.label || item.code,
      baseWeight: item.severity === 'high' ? 30 : 15,
      severity: (item.severity || 'MEDIUM').toUpperCase(),
      concept: item.code
    };

    const conceptKey = meta.concept;
    if (!conceptGroups[conceptKey]) {
      conceptGroups[conceptKey] = {
        code: item.code,
        label: meta.label,
        severity: meta.severity,
        p4Weight: meta.baseWeight,
        p5Weight: 0,
        sources: ['Phase 4 Rule'],
        evidence: item.evidence || ''
      };
    } else {
      if (!conceptGroups[conceptKey].sources.includes('Phase 4 Rule')) {
        conceptGroups[conceptKey].sources.push('Phase 4 Rule');
      }
      conceptGroups[conceptKey].p4Weight = Math.max(conceptGroups[conceptKey].p4Weight, meta.baseWeight);
    }
  }

  // Process Phase 5 NLP Intent Signals
  for (const item of phase5List) {
    const meta = THREAT_CATALOG[item.code] || {
      label: item.label || item.code,
      baseWeight: 25,
      severity: 'MEDIUM',
      concept: item.code
    };

    const conf = item.confidence || 0.85;
    const effectiveP5Weight = Math.round(meta.baseWeight * conf);

    const conceptKey = meta.concept;
    if (!conceptGroups[conceptKey]) {
      conceptGroups[conceptKey] = {
        code: item.code,
        label: meta.label,
        severity: meta.severity,
        p4Weight: 0,
        p5Weight: effectiveP5Weight,
        sources: ['Phase 5 NLP Intent'],
        evidence: item.evidence || ''
      };
    } else {
      if (!conceptGroups[conceptKey].sources.includes('Phase 5 NLP Intent')) {
        conceptGroups[conceptKey].sources.push('Phase 5 NLP Intent');
      }
      conceptGroups[conceptKey].p5Weight = Math.max(conceptGroups[conceptKey].p5Weight, effectiveP5Weight);
    }
  }

  // Calculate Weighted Evidence Items & Raw Cumulative Score
  const weightedEvidence = [];
  let rawCumulativeScore = 0;

  for (const [conceptKey, group] of Object.entries(conceptGroups)) {
    let itemWeight = Math.max(group.p4Weight, group.p5Weight);

    // Multi-Layer Confirmation Boost if flagged by BOTH Phase 4 & Phase 5
    if (group.sources.length > 1) {
      itemWeight += 5;
    }

    rawCumulativeScore += itemWeight;

    weightedEvidence.push({
      code: group.code,
      concept: conceptKey,
      label: group.label,
      severity: group.severity,
      weight: itemWeight,
      sources: group.sources,
      evidence: group.evidence
    });
  }

  // Sort weighted evidence by weight descending
  weightedEvidence.sort((a, b) => b.weight - a.weight);

  // Apply Scaled Curve to Clamp Final Score cleanly between 0 - 100
  let finalRiskScore = 0;
  if (rawCumulativeScore > 0) {
    if (rawCumulativeScore >= 90) {
      finalRiskScore = Math.min(100, Math.round(90 + ((rawCumulativeScore - 90) * 0.25)));
    } else if (rawCumulativeScore >= 70) {
      finalRiskScore = Math.round(70 + ((rawCumulativeScore - 70) * 0.85));
    } else {
      finalRiskScore = Math.round(rawCumulativeScore);
    }
  } else {
    finalRiskScore = inputType === 'url' ? 2 : 5; // Default baseline for safe input
  }

  // Determine Risk Level Classification
  let riskLevel = 'SAFE';
  let resultClassification = 'LIKELY_SAFE';

  if (finalRiskScore >= 70) {
    riskLevel = 'HIGH';
    resultClassification = inputType === 'url' ? 'SUSPICIOUS_PHISHING_URL' : 'SUSPICIOUS_PHISHING';
  } else if (finalRiskScore >= 30) {
    riskLevel = 'MEDIUM';
    resultClassification = inputType === 'url' ? 'MODERATE_RISK_URL' : 'MODERATE_CAUTION';
  } else {
    riskLevel = 'SAFE';
    resultClassification = inputType === 'url' ? 'VERIFIED_SAFE_URL' : 'LIKELY_SAFE';
  }

  // Synthesize Unified Explainability Narrative
  let explanation = '';
  if (weightedEvidence.length === 0) {
    explanation = inputType === 'url'
      ? 'Target web URL exhibits standard domain structure and valid security protocol. No threat indicators were detected.'
      : 'No phishing indicators, time-pressure urgency, or credential solicitations were detected in the input message.';
  } else {
    const topThreats = weightedEvidence.slice(0, 3).map(e => e.label).join(', ');
    explanation = `${riskLevel === 'HIGH' ? 'Critical' : 'Moderate'} Security Threat (Risk Score: ${finalRiskScore}/100). The analysis engine identified ${weightedEvidence.length} confirmed threat driver(s): ${topThreats}.`;
  }

  // Generate Prioritized Actionable Recommendations
  const recommendations = [];
  const codesPresent = weightedEvidence.map(e => e.code);

  if (codesPresent.includes('OTP_REQUEST') || codesPresent.includes('PIN_PASSWORD_REQUEST')) {
    recommendations.push('NEVER share your OTP, PIN, or net banking password with anyone.');
  }
  if (codesPresent.includes('REQUEST_CLICK_LINK') || codesPresent.includes('SUSPICIOUS_LINK_PROMPT') || codesPresent.includes('IP_HOST') || codesPresent.includes('SUSPICIOUS_DOMAIN_SEPARATOR')) {
    recommendations.push('Do NOT click on web links or enter credentials on unverified domain addresses.');
  }
  if (codesPresent.includes('AUTHORITY_IMPERSONATION') || codesPresent.includes('BANK_IMPERSONATION') || codesPresent.includes('FEAR_THREAT') || codesPresent.includes('ACCOUNT_CLOSURE_THREAT')) {
    recommendations.push('Verify account status directly through your official banking portal or customer care number.');
  }
  if (codesPresent.includes('LOTTERY_PRIZE_OFFER') || codesPresent.includes('REWARD_PRIZE_BAIT')) {
    recommendations.push('Be skeptical of unearned prize, cashback, or lottery rewards demanding personal details.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Always verify unexpected messages from unverified senders through official channels.');
    recommendations.push('Report suspected financial cyber fraud to national helpline 1930.');
  }

  return {
    riskScore: finalRiskScore,
    riskLevel,
    result: resultClassification,
    weightedEvidence,
    explanation,
    recommendations,
    scoringBreakdown: {
      rawCumulativeScore,
      saturatedScore: finalRiskScore,
      totalEvidenceItems: weightedEvidence.length
    }
  };
};

module.exports = {
  calculateRiskAssessment,
  THREAT_CATALOG
};
