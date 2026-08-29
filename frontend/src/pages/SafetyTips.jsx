import React from 'react';
import { 
  ShieldAlert, 
  KeyRound, 
  Smartphone, 
  Globe, 
  Gift, 
  AlertTriangle, 
  UserX, 
  QrCode,
  CheckCircle2,
  Lock
} from 'lucide-react';

const safetyTopics = [
  {
    icon: Smartphone,
    title: 'OTP & Banking SMS Safety',
    desc: 'Banks and financial institutions in India will NEVER ask for your OTP, debit card PIN, or net banking password over SMS, call, or email.',
    tips: [
      'Never share 6-digit OTPs received via SMS with anyone.',
      'Ignore messages claiming your bank account will be blocked today.',
      'Report bank impersonation messages to your bank customer care immediately.'
    ]
  },
  {
    icon: Globe,
    title: 'Suspicious Links & Domain Spoofing',
    desc: 'Fraudulent SMS messages often include short links or fake web addresses designed to look like legitimate bank portals.',
    tips: [
      'Check web links carefully: SBI is sbi.co.in, not sbi-kyc-update.com.',
      'Look for HTTPS security lock icon in your browser address bar.',
      'Never click links in SMS claiming urgent PAN or Aadhaar verification.'
    ]
  },
  {
    icon: QrCode,
    title: 'UPI & QR Code Payment Fraud',
    desc: 'Scanning a UPI QR code or entering your UPI PIN is strictly for PAYING money, never for RECEIVING money.',
    tips: [
      'You DO NOT need to enter your UPI PIN to receive money into your account.',
      'Never scan QR codes sent by unknown buyers on OLX or social media.',
      'Verify recipient names on BHIM/GPay/PhonePe before approving any payment.'
    ]
  },
  {
    icon: AlertTriangle,
    title: 'Electricity & Utility Disconnection Scams',
    desc: 'Scammers send SMS in regional languages claiming your electricity or water connection will be cut off in 2 hours due to unpaid bills.',
    tips: [
      'Electricity boards do not send disconnection threats from personal 10-digit mobile numbers.',
      'Pay bills only through official electricity board apps (e.g. BESCOM, MSEDCL, TANGEDCO).',
      'Do not call phone numbers printed in suspicious SMS messages.'
    ]
  },
  {
    icon: Gift,
    title: 'Fake Government Schemes & Lottery Claims',
    desc: 'Promises of free laptops, festive cash bonuses, or lottery prize wins requiring small processing fees are 100% scams.',
    tips: [
      'Government schemes end with .gov.in domains only.',
      'Never pay "processing fees" or "taxes" to claim a prize or grant.',
      'Do not share family bank account details or Aadhaar photos online.'
    ]
  },
  {
    icon: UserX,
    title: 'Emergency Friend / Relative Impersonation',
    desc: 'Scammers hack WhatsApp accounts or impersonate police officers claiming a relative has been arrested or hospitalized.',
    tips: [
      'Always call your relative on their original phone number to verify first.',
      'Do not panic or transfer money urgently to unknown UPI handles.',
      'Verify police station details independently if someone claims an arrest.'
    ]
  },
  {
    icon: KeyRound,
    title: 'Password & Account Hygiene',
    desc: 'Protect your digital identities with strong passphrases and multi-factor authentication.',
    tips: [
      'Use unique passwords for banking, primary email, and social media.',
      'Enable Two-Factor Authentication (2FA) on WhatsApp, Google, and email accounts.',
      'Never save banking passwords in public cyber cafe computers.'
    ]
  }
];

export const SafetyTips = () => {
  return (
    <div className="space-y-8 py-2">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-[#00ff66]" />
            Regional Cybersecurity Safety Guidelines
          </h1>
          <p className="text-xs text-slate-400 font-mono-cyber mt-1">
            Essential awareness guidelines to protect yourself against regional digital scams
          </p>
        </div>
        <span className="text-[11px] font-mono-cyber px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[#00ff66] shrink-0 self-start sm:self-auto">
          CYBER AWARENESS
        </span>
      </div>

      {/* Grid of 7 Safety Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safetyTopics.map((topic, idx) => {
          const Icon = topic.icon;
          return (
            <div key={idx} className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-[#00ff66]/40 flex items-center justify-center text-[#00ff66] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold font-heading text-white">{topic.title}</h2>
                  <p className="text-xs text-slate-400 font-mono-cyber">Threat Vector #{idx + 1}</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans border-b border-slate-800/80 pb-3">
                {topic.desc}
              </p>

              <div className="space-y-2">
                <p className="text-[11px] font-mono-cyber text-[#00ff66] font-semibold">PROTECTIVE STEPS:</p>
                <ul className="space-y-1.5">
                  {topic.tips.map((tip, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff66] shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cyber Crime Helpline Banner */}
      <div className="cyber-card p-6 rounded-xl border border-red-500/30 bg-red-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center gap-2 text-red-400 font-bold font-heading">
            <Lock className="w-4 h-4" />
            <span>National Cyber Crime Helpline</span>
          </div>
          <p className="text-xs text-slate-300">
            If you have lost money to a cyber financial fraud, report immediately within 2 hours (Golden Hour).
          </p>
        </div>
        <div className="px-5 py-2.5 rounded-lg bg-red-950 border border-red-500/50 text-red-400 font-mono-cyber font-bold text-sm shrink-0">
          DIAL 1930 / cybercrime.gov.in
        </div>
      </div>
    </div>
  );
};
