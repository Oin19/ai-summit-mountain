import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Activity,
  MapPin,
  Send,
  Heart,
  Bandage,
  Snowflake,
  Mountain,
  CheckCircle2,
  Clock,
  Radio,
  ArrowRight,
  Loader2,
  Globe,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Info,
  MessageSquare,
  ShieldAlert,
  Stethoscope,
  Cloud,
  Wind,
  Thermometer,
  Eye,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { toast } from "sonner";

export const Route = createFileRoute("/triage")({
  head: () => ({
    meta: [
      { title: "AI Emergency Triage System — AI to the Summit" },
      {
        name: "description",
        content:
          "AI-powered triage that assesses injured trekkers and prioritizes rescue in remote mountainous regions.",
      },
      { property: "og:title", content: "AI Emergency Triage System" },
      {
        property: "og:description",
        content:
          "Quickly assess injuries and prioritize rescue operations in remote mountainous regions.",
      },
    ],
  }),
  component: TriagePage,
});

/* -------------------------------------------------------------------------- */
/*                                  i18n                                      */
/* -------------------------------------------------------------------------- */

type LangCode = "en" | "hi" | "ne" | "bn" | "es";

const LANGS: { code: LangCode; label: string; native: string; bcp47: string }[] = [
  { code: "en", label: "English", native: "English", bcp47: "en-US" },
  { code: "hi", label: "Hindi", native: "हिन्दी", bcp47: "hi-IN" },
  { code: "ne", label: "Nepali", native: "नेपाली", bcp47: "ne-NP" },
  { code: "bn", label: "Bengali", native: "বাংলা", bcp47: "bn-IN" },
  { code: "es", label: "Spanish", native: "Español", bcp47: "es-ES" },
];

type StepKey =
  | "conscious"
  | "breathing"
  | "bleeding"
  | "injury"
  | "mobility"
  | "pain";

type InjuryKey =
  | "Fall"
  | "Fracture"
  | "Head Injury"
  | "Altitude Sickness"
  | "Hypothermia"
  | "Avalanche"
  | "Other";

type MobilityKey = "Yes" | "With Difficulty" | "No";
type YesNoKey = "Yes" | "No";
type SeverityKey = "Low Risk" | "Moderate" | "High Priority" | "Critical";

type Dict = {
  hero: { badge: string; title1: string; title2: string; title3: string; subtitle: string };
  how: {
    title: string;
    intro: string;
    steps: { title: string; body: string }[];
  };
  ui: {
    step: string;
    of: string;
    restart: string;
    assessmentComplete: string;
    triageAnalysis: string;
    injuryType: string;
    painScore: string;
    mobilityStatus: string;
    conscious: string;
    recommendedAction: string;
    firstAidTitle: string;
    firstAidSubtitle: string;
    forBleeding: string;
    forHypothermia: string;
    sosBeacon: string;
    sosTitle: string;
    sendSos: string;
    sosSent: string;
    emergencyId: string;
    timeReported: string;
    status: string;
    rescueNotified: string;
    location: string;
    liveGps: string;
    latitude: string;
    longitude: string;
    elevation: string;
    nearestShelter: string;
    emergencySummary: string;
    painLevel: string;
    canWalk: string;
    severity: string;
    awaitingDispatch: string;
    sosSentShort: string;
    completeTriage: string;
    language: string;
    voiceMode: string;
    voiceOn: string;
    voiceOff: string;
    listening: string;
    sayYesNo: string;
    voiceUnsupported: string;
    submit: string;
    minimal: string;
    severePain: string;
    forInjury: (i: string) => string;
    sosToastTitle: string;
    sosToastDesc: (id: string) => string;
  };
  questions: Record<StepKey, string>;
  yesno: Record<YesNoKey, string>;
  mobility: Record<MobilityKey, string>;
  injuries: Record<InjuryKey, string>;
  severities: Record<SeverityKey, string>;
  actions: Record<SeverityKey, string>;
  firstAid: Record<InjuryKey, string[]>;
  bleedingAid: string[];
  hypothermiaAid: string[];
};

const EN: Dict = {
  hero: {
    badge: "Emergency Module",
    title1: "AI ",
    title2: "Emergency Triage",
    title3: " System",
    subtitle:
      "Quickly assess injuries and prioritize rescue operations in remote mountainous regions.",
  },
  how: {
    title: "What is the AI Triage System?",
    intro:
      "When something goes wrong on the mountain, every second counts. The AI Triage System is a guided emergency assistant that helps trekkers, guides, and rescue teams figure out how serious an injury is — even when there's no doctor nearby and the signal is weak.",
    steps: [
      {
        title: "1. Quick guided assessment",
        body:
          "Answer 6 simple questions about consciousness, breathing, bleeding, injury type, mobility and pain. You can tap buttons, switch language, or just speak Yes / No.",
      },
      {
        title: "2. AI severity decision",
        body:
          "The system instantly classifies the case as Low Risk, Moderate, High Priority or Critical, and tells you exactly what to do while you wait.",
      },
      {
        title: "3. First-aid guidance",
        body:
          "Tailored first-aid steps appear for the specific injury — fracture, hypothermia, altitude sickness, avalanche, head injury and more.",
      },
      {
        title: "4. SOS with GPS",
        body:
          "Send a one-tap SOS to rescue teams. Your GPS, elevation, nearest shelter and a structured emergency summary are bundled in automatically.",
      },
    ],
  },
  ui: {
    step: "Step",
    of: "of",
    restart: "↻ Restart triage",
    assessmentComplete: "Emergency Assessment Complete",
    triageAnalysis: "Triage Analysis",
    injuryType: "Injury Type",
    painScore: "Pain Score",
    mobilityStatus: "Mobility Status",
    conscious: "Conscious",
    recommendedAction: "Recommended Action",
    firstAidTitle: "First Aid Recommendations",
    firstAidSubtitle: "Follow these steps until rescue arrives",
    forBleeding: "For Bleeding",
    forHypothermia: "For Hypothermia",
    sosBeacon: "SOS Beacon",
    sosTitle: "Emergency Rescue Signal",
    sendSos: "🚨 SEND SOS ALERT",
    sosSent: "Alert sent successfully",
    emergencyId: "Emergency ID",
    timeReported: "Time Reported",
    status: "Status",
    rescueNotified: "Rescue Team Notified",
    location: "Location",
    liveGps: "Live GPS",
    latitude: "Latitude",
    longitude: "Longitude",
    elevation: "Elevation",
    nearestShelter: "Nearest Shelter",
    emergencySummary: "Emergency Summary",
    painLevel: "Pain Level",
    canWalk: "Can Walk",
    severity: "Severity",
    awaitingDispatch: "Awaiting Dispatch",
    sosSentShort: "SOS Sent",
    completeTriage: "Complete triage to generate full emergency report.",
    language: "Language",
    voiceMode: "Voice Mode",
    voiceOn: "On",
    voiceOff: "Off",
    listening: "Listening… say Yes or No",
    sayYesNo: "Speak your answer",
    voiceUnsupported:
      "Voice mode isn't supported in this browser. Try Chrome on desktop or Android.",
    submit: "Submit Assessment",
    minimal: "1 — Minimal",
    severePain: "10 — Severe",
    forInjury: (i) => `For ${i}`,
    sosToastTitle: "Emergency alert sent successfully.",
    sosToastDesc: (id) => `Rescue Team Notified — ${id}`,
  },
  questions: {
    conscious: "Are you or the injured person conscious?",
    breathing: "Is the person breathing normally?",
    bleeding: "Is there severe bleeding?",
    injury: "What type of injury occurred?",
    mobility: "Can the injured person walk?",
    pain: "Rate the pain level from 1 to 10.",
  },
  yesno: { Yes: "Yes", No: "No" },
  mobility: { Yes: "Yes", "With Difficulty": "With Difficulty", No: "No" },
  injuries: {
    Fall: "Fall",
    Fracture: "Fracture",
    "Head Injury": "Head Injury",
    "Altitude Sickness": "Altitude Sickness",
    Hypothermia: "Hypothermia",
    Avalanche: "Avalanche",
    Other: "Other",
  },
  severities: {
    "Low Risk": "Low Risk",
    Moderate: "Moderate",
    "High Priority": "High Priority",
    Critical: "Critical",
  },
  actions: {
    "Low Risk": "Self-monitor and descend slowly with a partner. Stay hydrated.",
    Moderate: "Stabilize on site and request a non-urgent rescue team.",
    "High Priority": "Dispatch rescue team immediately. Prepare evacuation route.",
    Critical: "LIFE-THREATENING: Helicopter evac & medical team required now.",
  },
  firstAid: {
    Fracture: [
      "Keep the injured area completely still.",
      "Avoid unnecessary movement.",
      "Splint if possible and wait for medical assistance.",
    ],
    Fall: [
      "Check for hidden injuries before moving.",
      "Stabilize the neck and spine.",
      "Apply pressure to any bleeding.",
    ],
    "Head Injury": [
      "Keep the person awake and calm.",
      "Avoid sudden movement of the head/neck.",
      "Monitor for confusion, vomiting, or loss of consciousness.",
    ],
    "Altitude Sickness": [
      "Stop ascending immediately.",
      "Descend to lower altitude as soon as possible.",
      "Hydrate and rest in a sheltered area.",
    ],
    Hypothermia: [
      "Move to a sheltered area.",
      "Replace wet clothes and wrap in dry layers.",
      "Provide warm fluids if conscious.",
    ],
    Avalanche: [
      "Clear airway of snow first.",
      "Check breathing and pulse.",
      "Treat for hypothermia and trauma simultaneously.",
    ],
    Other: [
      "Keep the patient calm and warm.",
      "Monitor breathing and consciousness.",
      "Await professional help.",
    ],
  },
  bleedingAid: [
    "Apply firm pressure to the wound with a clean cloth.",
    "Elevate the injured area above the heart if possible.",
    "Do not remove embedded objects.",
  ],
  hypothermiaAid: [
    "Move to a sheltered area.",
    "Keep the person warm and dry.",
    "Avoid sudden re-warming of extremities.",
  ],
};

const HI: Dict = {
  hero: {
    badge: "आपातकालीन मॉड्यूल",
    title1: "एआई ",
    title2: "आपातकालीन ट्राइएज",
    title3: " सिस्टम",
    subtitle:
      "दूरस्थ पहाड़ी क्षेत्रों में चोटों का त्वरित आकलन करें और बचाव कार्यों को प्राथमिकता दें।",
  },
  how: {
    title: "एआई ट्राइएज सिस्टम क्या है?",
    intro:
      "पहाड़ पर हर सेकंड कीमती है। यह सिस्टम ट्रेकर्स, गाइड और बचाव दलों को बताता है कि चोट कितनी गंभीर है — जब डॉक्टर पास न हो और सिग्नल कमज़ोर हो।",
    steps: [
      { title: "1. त्वरित मार्गदर्शित आकलन", body: "होश, साँस, खून, चोट का प्रकार, चलने की क्षमता और दर्द पर 6 सरल प्रश्न। बटन दबाएँ, भाषा बदलें या केवल हाँ/नहीं बोलें।" },
      { title: "2. एआई गंभीरता निर्णय", body: "सिस्टम तुरंत मामले को कम जोखिम, मध्यम, उच्च प्राथमिकता या गंभीर के रूप में वर्गीकृत करता है।" },
      { title: "3. प्राथमिक उपचार मार्गदर्शन", body: "विशेष चोट के लिए अनुकूल प्राथमिक उपचार चरण दिखाए जाते हैं।" },
      { title: "4. जीपीएस के साथ एसओएस", body: "एक टैप में बचाव दल को एसओएस भेजें। जीपीएस, ऊँचाई और सारांश स्वतः शामिल होते हैं।" },
    ],
  },
  ui: {
    step: "चरण", of: "/", restart: "↻ पुनः आरंभ करें",
    assessmentComplete: "आपातकालीन आकलन पूर्ण",
    triageAnalysis: "ट्राइएज विश्लेषण",
    injuryType: "चोट का प्रकार", painScore: "दर्द स्कोर",
    mobilityStatus: "गतिशीलता", conscious: "होश में",
    recommendedAction: "अनुशंसित कार्रवाई",
    firstAidTitle: "प्राथमिक उपचार सुझाव",
    firstAidSubtitle: "बचाव दल आने तक इन चरणों का पालन करें",
    forBleeding: "खून बहने के लिए", forHypothermia: "हाइपोथर्मिया के लिए",
    sosBeacon: "एसओएस बीकन", sosTitle: "आपातकालीन बचाव संकेत",
    sendSos: "🚨 एसओएस अलर्ट भेजें", sosSent: "अलर्ट सफलतापूर्वक भेजा गया",
    emergencyId: "आपातकालीन आईडी", timeReported: "रिपोर्ट का समय",
    status: "स्थिति", rescueNotified: "बचाव दल को सूचित किया गया",
    location: "स्थान", liveGps: "लाइव जीपीएस",
    latitude: "अक्षांश", longitude: "देशांतर",
    elevation: "ऊँचाई", nearestShelter: "निकटतम आश्रय",
    emergencySummary: "आपातकालीन सारांश",
    painLevel: "दर्द स्तर", canWalk: "चल सकते हैं",
    severity: "गंभीरता", awaitingDispatch: "प्रेषण की प्रतीक्षा",
    sosSentShort: "एसओएस भेजा गया",
    completeTriage: "पूर्ण रिपोर्ट के लिए ट्राइएज पूरा करें।",
    language: "भाषा", voiceMode: "वॉइस मोड", voiceOn: "चालू", voiceOff: "बंद",
    listening: "सुन रहा हूँ… हाँ या नहीं बोलें",
    sayYesNo: "अपना उत्तर बोलें",
    voiceUnsupported: "इस ब्राउज़र में वॉइस मोड समर्थित नहीं है।",
    submit: "आकलन जमा करें", minimal: "1 — न्यूनतम", severePain: "10 — गंभीर",
    forInjury: (i) => `${i} के लिए`,
    sosToastTitle: "आपातकालीन अलर्ट भेजा गया।",
    sosToastDesc: (id) => `बचाव दल को सूचित — ${id}`,
  },
  questions: {
    conscious: "क्या आप या घायल व्यक्ति होश में हैं?",
    breathing: "क्या व्यक्ति सामान्य रूप से साँस ले रहा है?",
    bleeding: "क्या गंभीर रक्तस्राव हो रहा है?",
    injury: "किस प्रकार की चोट हुई है?",
    mobility: "क्या घायल व्यक्ति चल सकता है?",
    pain: "दर्द का स्तर 1 से 10 तक बताएँ।",
  },
  yesno: { Yes: "हाँ", No: "नहीं" },
  mobility: { Yes: "हाँ", "With Difficulty": "कठिनाई से", No: "नहीं" },
  injuries: {
    Fall: "गिरना", Fracture: "फ्रैक्चर", "Head Injury": "सिर की चोट",
    "Altitude Sickness": "ऊँचाई बीमारी", Hypothermia: "हाइपोथर्मिया",
    Avalanche: "हिमस्खलन", Other: "अन्य",
  },
  severities: {
    "Low Risk": "कम जोखिम", Moderate: "मध्यम",
    "High Priority": "उच्च प्राथमिकता", Critical: "गंभीर",
  },
  actions: {
    "Low Risk": "साथी के साथ धीरे-धीरे उतरें, खुद की निगरानी करें, हाइड्रेटेड रहें।",
    Moderate: "मौके पर स्थिर करें और गैर-तत्काल बचाव दल बुलाएँ।",
    "High Priority": "तुरंत बचाव दल भेजें। निकासी मार्ग तैयार करें।",
    Critical: "जानलेवा: तुरंत हेलीकॉप्टर और चिकित्सा दल आवश्यक।",
  },
  firstAid: {
    Fracture: ["घायल क्षेत्र को बिल्कुल स्थिर रखें।", "अनावश्यक हलचल से बचें।", "यदि संभव हो तो स्प्लिंट लगाएँ।"],
    Fall: ["हिलाने से पहले छिपी चोटों की जाँच करें।", "गर्दन और रीढ़ को स्थिर करें।", "किसी भी रक्तस्राव पर दबाव डालें।"],
    "Head Injury": ["व्यक्ति को जगाए रखें और शांत रखें।", "सिर/गर्दन को अचानक न हिलाएँ।", "भ्रम, उल्टी पर नज़र रखें।"],
    "Altitude Sickness": ["तुरंत चढ़ना बंद करें।", "जल्द से जल्द नीचे उतरें।", "हाइड्रेट करें और आराम करें।"],
    Hypothermia: ["आश्रय में ले जाएँ।", "गीले कपड़े बदलें और सूखी परतों में लपेटें।", "होश में हो तो गर्म तरल दें।"],
    Avalanche: ["पहले बर्फ से वायुमार्ग साफ करें।", "साँस और नाड़ी जाँचें।", "हाइपोथर्मिया और आघात का एक साथ उपचार करें।"],
    Other: ["रोगी को शांत और गर्म रखें।", "साँस और चेतना पर नज़र रखें।", "पेशेवर सहायता की प्रतीक्षा करें।"],
  },
  bleedingAid: [
    "साफ कपड़े से घाव पर मजबूत दबाव डालें।",
    "यदि संभव हो तो घायल क्षेत्र को हृदय से ऊपर उठाएँ।",
    "धँसी हुई वस्तुओं को न हटाएँ।",
  ],
  hypothermiaAid: [
    "आश्रय वाले क्षेत्र में जाएँ।",
    "व्यक्ति को गर्म और सूखा रखें।",
    "अंगों को अचानक गर्म करने से बचें।",
  ],
};

const NE: Dict = {
  hero: {
    badge: "आपतकालीन मोड्युल",
    title1: "एआई ", title2: "आपतकालीन ट्रायाज", title3: " प्रणाली",
    subtitle: "दुर्गम पहाडी क्षेत्रहरूमा चोटको द्रुत मूल्यांकन गर्नुहोस् र उद्धारलाई प्राथमिकता दिनुहोस्।",
  },
  how: {
    title: "एआई ट्रायाज प्रणाली के हो?",
    intro: "पहाडमा हरेक सेकेन्ड महत्वपूर्ण हुन्छ। यो प्रणालीले ट्रेकर र उद्धारकर्तालाई चोट कति गम्भीर छ भन्ने तुरुन्त बताउँछ।",
    steps: [
      { title: "1. द्रुत मूल्यांकन", body: "होस, सास, रगत, चोट, हिँडाइ र पीडामा ६ सरल प्रश्न।" },
      { title: "2. एआई गम्भीरता निर्णय", body: "तुरुन्तै केसलाई कम/मध्यम/उच्च/गम्भीर वर्गीकरण।" },
      { title: "3. प्राथमिक उपचार", body: "विशिष्ट चोटका लागि अनुकूल चरणहरू।" },
      { title: "4. जीपीएससहित एसओएस", body: "एक ट्यापमा उद्धार टोलीलाई जीपीएससहित एसओएस।" },
    ],
  },
  ui: {
    step: "चरण", of: "/", restart: "↻ पुनः सुरु",
    assessmentComplete: "मूल्यांकन सकियो", triageAnalysis: "ट्रायाज विश्लेषण",
    injuryType: "चोटको प्रकार", painScore: "पीडा स्कोर",
    mobilityStatus: "हिँडाइ स्थिति", conscious: "होसमा",
    recommendedAction: "सिफारिस कार्य",
    firstAidTitle: "प्राथमिक उपचार सुझाव",
    firstAidSubtitle: "उद्धार नआउँदासम्म पालना गर्नुहोस्",
    forBleeding: "रक्तस्रावका लागि", forHypothermia: "हाइपोथर्मियाका लागि",
    sosBeacon: "एसओएस बीकन", sosTitle: "आपतकालीन उद्धार संकेत",
    sendSos: "🚨 एसओएस पठाउनुहोस्", sosSent: "सफलतापूर्वक पठाइयो",
    emergencyId: "आपतकालीन आईडी", timeReported: "समय",
    status: "स्थिति", rescueNotified: "उद्धार टोलीलाई सूचित",
    location: "स्थान", liveGps: "लाइभ जीपीएस",
    latitude: "अक्षांश", longitude: "देशान्तर",
    elevation: "उचाइ", nearestShelter: "नजिकैको आश्रय",
    emergencySummary: "आपतकालीन सारांश",
    painLevel: "पीडा स्तर", canWalk: "हिँड्न सक्छ",
    severity: "गम्भीरता", awaitingDispatch: "प्रेषण पर्खाइमा",
    sosSentShort: "एसओएस पठाइयो",
    completeTriage: "पूर्ण रिपोर्टका लागि ट्रायाज पूरा गर्नुहोस्।",
    language: "भाषा", voiceMode: "भ्वाइस मोड", voiceOn: "अन", voiceOff: "अफ",
    listening: "सुन्दैछ… हो वा होइन भन्नुहोस्",
    sayYesNo: "जवाफ बोल्नुहोस्",
    voiceUnsupported: "यो ब्राउजरमा भ्वाइस मोड समर्थित छैन।",
    submit: "मूल्यांकन पेश गर्नुहोस्", minimal: "१ — न्यून", severePain: "१० — गम्भीर",
    forInjury: (i) => `${i} का लागि`,
    sosToastTitle: "आपतकालीन अलर्ट पठाइयो।",
    sosToastDesc: (id) => `उद्धार टोलीलाई सूचित — ${id}`,
  },
  questions: {
    conscious: "के तपाईं वा घाइते होसमा हुनुहुन्छ?",
    breathing: "के व्यक्ति सामान्य रूपमा सास फेर्दैछ?",
    bleeding: "के गम्भीर रक्तस्राव छ?",
    injury: "कस्तो प्रकारको चोट लागेको हो?",
    mobility: "के घाइते हिँड्न सक्छ?",
    pain: "पीडाको स्तर १ देखि १० मा बताउनुहोस्।",
  },
  yesno: { Yes: "हो", No: "होइन" },
  mobility: { Yes: "हो", "With Difficulty": "कठिनाइसँग", No: "होइन" },
  injuries: {
    Fall: "लड्नु", Fracture: "हड्डी भाँचिनु", "Head Injury": "टाउकोको चोट",
    "Altitude Sickness": "उचाइ बिरामी", Hypothermia: "हाइपोथर्मिया",
    Avalanche: "हिमपहिरो", Other: "अन्य",
  },
  severities: {
    "Low Risk": "कम जोखिम", Moderate: "मध्यम",
    "High Priority": "उच्च प्राथमिकता", Critical: "गम्भीर",
  },
  actions: {
    "Low Risk": "साथीसँग बिस्तारै ओर्लनुहोस्, हाइड्रेट रहनुहोस्।",
    Moderate: "स्थिर गरी सामान्य उद्धार बोलाउनुहोस्।",
    "High Priority": "तुरुन्तै उद्धार पठाउनुहोस्।",
    Critical: "जीवन-घातक: तुरुन्तै हेलिकप्टर र चिकित्सा टोली चाहिन्छ।",
  },
  firstAid: {
    Fracture: ["घाइते भागलाई स्थिर राख्नुहोस्।", "अनावश्यक चालबाट जोगिनुहोस्।", "सम्भव भए स्प्लिन्ट लगाउनुहोस्।"],
    Fall: ["चलाउनुअघि लुकेका चोट जाँच्नुहोस्।", "घाँटी र मेरुदण्ड स्थिर गर्नुहोस्।", "रक्तस्रावमा दबाब दिनुहोस्।"],
    "Head Injury": ["व्यक्तिलाई जागा र शान्त राख्नुहोस्।", "टाउको/घाँटी अचानक नचलाउनुहोस्।", "अल्मलिने, बान्ता हेर्नुहोस्।"],
    "Altitude Sickness": ["तुरुन्त चढ्न बन्द गर्नुहोस्।", "तल्लो उचाइमा झर्नुहोस्।", "हाइड्रेट गर्नुहोस् र आराम गर्नुहोस्।"],
    Hypothermia: ["आश्रयमा जानुहोस्।", "भिजेका कपडा फेरेर सुक्खा लपेट्नुहोस्।", "होसमा भए न्यानो तरल दिनुहोस्।"],
    Avalanche: ["पहिले हिउँबाट सास नली सफा गर्नुहोस्।", "सास र नाडी जाँच्नुहोस्।", "हाइपोथर्मिया र आघातको सँगै उपचार।"],
    Other: ["बिरामीलाई शान्त र न्यानो राख्नुहोस्।", "सास र होस हेर्नुहोस्।", "व्यावसायिक सहायता पर्खनुहोस्।"],
  },
  bleedingAid: ["सफा कपडाले घाउमा दबाब दिनुहोस्।", "सम्भव भए मुटुभन्दा माथि उठाउनुहोस्।", "गाडिएका वस्तु नहटाउनुहोस्।"],
  hypothermiaAid: ["आश्रयमा जानुहोस्।", "व्यक्तिलाई न्यानो र सुक्खा राख्नुहोस्।", "अचानक तताउनबाट जोगिनुहोस्।"],
};

const BN: Dict = {
  hero: {
    badge: "জরুরি মডিউল",
    title1: "এআই ", title2: "জরুরি ট্রায়াজ", title3: " সিস্টেম",
    subtitle: "দূরবর্তী পার্বত্য অঞ্চলে দ্রুত আঘাত মূল্যায়ন ও উদ্ধার অগ্রাধিকার।",
  },
  how: {
    title: "এআই ট্রায়াজ সিস্টেম কী?",
    intro: "পাহাড়ে প্রতিটি সেকেন্ড মূল্যবান। এটি ট্রেকার ও উদ্ধারকারীকে আঘাতের তীব্রতা তাৎক্ষণিক জানায়।",
    steps: [
      { title: "১. দ্রুত মূল্যায়ন", body: "চেতনা, শ্বাস, রক্তপাত, আঘাত, চলাফেরা ও ব্যথায় ৬টি প্রশ্ন।" },
      { title: "২. এআই তীব্রতা নির্ধারণ", body: "তাৎক্ষণিক কম/মাঝারি/উচ্চ/সংকটজনক শ্রেণিবিন্যাস।" },
      { title: "৩. প্রাথমিক চিকিৎসা", body: "নির্দিষ্ট আঘাতের জন্য উপযুক্ত পদক্ষেপ।" },
      { title: "৪. জিপিএসসহ এসওএস", body: "এক ট্যাপে উদ্ধার দলকে এসওএস।" },
    ],
  },
  ui: {
    step: "ধাপ", of: "/", restart: "↻ পুনরায় শুরু",
    assessmentComplete: "মূল্যায়ন সম্পন্ন", triageAnalysis: "ট্রায়াজ বিশ্লেষণ",
    injuryType: "আঘাতের ধরন", painScore: "ব্যথার স্কোর",
    mobilityStatus: "চলাফেরা", conscious: "সচেতন",
    recommendedAction: "প্রস্তাবিত পদক্ষেপ",
    firstAidTitle: "প্রাথমিক চিকিৎসা পরামর্শ",
    firstAidSubtitle: "উদ্ধার আসা পর্যন্ত অনুসরণ করুন",
    forBleeding: "রক্তপাতের জন্য", forHypothermia: "হাইপোথার্মিয়ার জন্য",
    sosBeacon: "এসওএস বীকন", sosTitle: "জরুরি উদ্ধার সংকেত",
    sendSos: "🚨 এসওএস পাঠান", sosSent: "সফলভাবে পাঠানো হয়েছে",
    emergencyId: "জরুরি আইডি", timeReported: "সময়",
    status: "অবস্থা", rescueNotified: "উদ্ধার দলকে অবহিত",
    location: "অবস্থান", liveGps: "লাইভ জিপিএস",
    latitude: "অক্ষাংশ", longitude: "দ্রাঘিমাংশ",
    elevation: "উচ্চতা", nearestShelter: "নিকটতম আশ্রয়",
    emergencySummary: "জরুরি সারসংক্ষেপ",
    painLevel: "ব্যথার মাত্রা", canWalk: "হাঁটতে পারে",
    severity: "তীব্রতা", awaitingDispatch: "প্রেরণের অপেক্ষায়",
    sosSentShort: "এসওএস প্রেরিত",
    completeTriage: "পূর্ণ রিপোর্টের জন্য ট্রায়াজ সম্পূর্ণ করুন।",
    language: "ভাষা", voiceMode: "ভয়েস মোড", voiceOn: "চালু", voiceOff: "বন্ধ",
    listening: "শুনছি… হ্যাঁ বা না বলুন",
    sayYesNo: "আপনার উত্তর বলুন",
    voiceUnsupported: "এই ব্রাউজারে ভয়েস মোড সমর্থিত নয়।",
    submit: "মূল্যায়ন জমা দিন", minimal: "১ — সামান্য", severePain: "১০ — তীব্র",
    forInjury: (i) => `${i}-এর জন্য`,
    sosToastTitle: "জরুরি সতর্কতা পাঠানো হয়েছে।",
    sosToastDesc: (id) => `উদ্ধার দলকে অবহিত — ${id}`,
  },
  questions: {
    conscious: "আপনি বা আহত ব্যক্তি কি সচেতন?",
    breathing: "ব্যক্তি কি স্বাভাবিকভাবে শ্বাস নিচ্ছেন?",
    bleeding: "গুরুতর রক্তপাত হচ্ছে?",
    injury: "কী ধরনের আঘাত লেগেছে?",
    mobility: "আহত ব্যক্তি কি হাঁটতে পারেন?",
    pain: "ব্যথার মাত্রা ১ থেকে ১০ এ বলুন।",
  },
  yesno: { Yes: "হ্যাঁ", No: "না" },
  mobility: { Yes: "হ্যাঁ", "With Difficulty": "কষ্টে", No: "না" },
  injuries: {
    Fall: "পড়ে যাওয়া", Fracture: "হাড় ভাঙা", "Head Injury": "মাথায় আঘাত",
    "Altitude Sickness": "উচ্চতাজনিত অসুস্থতা", Hypothermia: "হাইপোথার্মিয়া",
    Avalanche: "তুষারধস", Other: "অন্যান্য",
  },
  severities: {
    "Low Risk": "কম ঝুঁকি", Moderate: "মাঝারি",
    "High Priority": "উচ্চ অগ্রাধিকার", Critical: "সংকটজনক",
  },
  actions: {
    "Low Risk": "সঙ্গীর সাথে ধীরে নামুন, হাইড্রেটেড থাকুন।",
    Moderate: "স্থিতিশীল করুন, সাধারণ উদ্ধার ডাকুন।",
    "High Priority": "তাৎক্ষণিক উদ্ধার দল পাঠান।",
    Critical: "জীবনঘাতী: হেলিকপ্টার ও চিকিৎসা দল এখনই প্রয়োজন।",
  },
  firstAid: {
    Fracture: ["আহত স্থান স্থির রাখুন।", "অপ্রয়োজনীয় নড়াচড়া এড়ান।", "সম্ভব হলে স্প্লিন্ট লাগান।"],
    Fall: ["সরানোর আগে লুকানো আঘাত পরীক্ষা করুন।", "ঘাড় ও মেরুদণ্ড স্থির রাখুন।", "রক্তপাতে চাপ দিন।"],
    "Head Injury": ["ব্যক্তিকে জাগ্রত ও শান্ত রাখুন।", "মাথা/ঘাড় হঠাৎ নাড়াবেন না।", "বিভ্রান্তি ও বমি পর্যবেক্ষণ করুন।"],
    "Altitude Sickness": ["তাৎক্ষণিক উপরে ওঠা বন্ধ করুন।", "নিচু উচ্চতায় নামুন।", "হাইড্রেট ও বিশ্রাম নিন।"],
    Hypothermia: ["আশ্রয়ে নিন।", "ভেজা কাপড় বদলে শুকনো দিয়ে ঢাকুন।", "সচেতন হলে গরম তরল দিন।"],
    Avalanche: ["আগে শ্বাসনালী বরফমুক্ত করুন।", "শ্বাস ও নাড়ি পরীক্ষা করুন।", "হাইপোথার্মিয়া ও আঘাত একসাথে চিকিৎসা।"],
    Other: ["রোগীকে শান্ত ও উষ্ণ রাখুন।", "শ্বাস ও চেতনা পর্যবেক্ষণ করুন।", "পেশাদার সাহায্যের অপেক্ষা করুন।"],
  },
  bleedingAid: ["পরিষ্কার কাপড় দিয়ে ক্ষতস্থানে চাপ দিন।", "সম্ভব হলে হৃৎপিণ্ডের উপরে তুলুন।", "গেঁথে থাকা বস্তু সরাবেন না।"],
  hypothermiaAid: ["আশ্রয়ে নিন।", "ব্যক্তিকে উষ্ণ ও শুকনো রাখুন।", "হঠাৎ উষ্ণায়ন এড়ান।"],
};

const ES: Dict = {
  hero: {
    badge: "Módulo de Emergencia",
    title1: "Sistema de ", title2: "Triaje de Emergencia", title3: " con IA",
    subtitle:
      "Evalúa rápidamente las lesiones y prioriza los rescates en regiones montañosas remotas.",
  },
  how: {
    title: "¿Qué es el sistema de triaje con IA?",
    intro:
      "En la montaña cada segundo cuenta. Este asistente guiado ayuda a trekkers, guías y equipos de rescate a saber qué tan grave es una lesión, incluso sin médico y con poca señal.",
    steps: [
      { title: "1. Evaluación guiada rápida", body: "6 preguntas sobre conciencia, respiración, sangrado, tipo de lesión, movilidad y dolor. Toca, cambia idioma o di Sí/No." },
      { title: "2. Decisión de gravedad por IA", body: "Clasifica al instante como Bajo, Moderado, Alta Prioridad o Crítico." },
      { title: "3. Guía de primeros auxilios", body: "Pasos a medida según la lesión específica." },
      { title: "4. SOS con GPS", body: "Envía SOS al equipo de rescate con GPS, altitud y resumen." },
    ],
  },
  ui: {
    step: "Paso", of: "de", restart: "↻ Reiniciar triaje",
    assessmentComplete: "Evaluación completada", triageAnalysis: "Análisis de triaje",
    injuryType: "Tipo de lesión", painScore: "Puntuación de dolor",
    mobilityStatus: "Movilidad", conscious: "Consciente",
    recommendedAction: "Acción recomendada",
    firstAidTitle: "Recomendaciones de primeros auxilios",
    firstAidSubtitle: "Sigue estos pasos hasta que llegue el rescate",
    forBleeding: "Para sangrado", forHypothermia: "Para hipotermia",
    sosBeacon: "Baliza SOS", sosTitle: "Señal de rescate de emergencia",
    sendSos: "🚨 ENVIAR ALERTA SOS", sosSent: "Alerta enviada con éxito",
    emergencyId: "ID de emergencia", timeReported: "Hora reportada",
    status: "Estado", rescueNotified: "Equipo de rescate notificado",
    location: "Ubicación", liveGps: "GPS en vivo",
    latitude: "Latitud", longitude: "Longitud",
    elevation: "Elevación", nearestShelter: "Refugio más cercano",
    emergencySummary: "Resumen de emergencia",
    painLevel: "Nivel de dolor", canWalk: "Puede caminar",
    severity: "Gravedad", awaitingDispatch: "Esperando despacho",
    sosSentShort: "SOS enviado",
    completeTriage: "Completa el triaje para generar el reporte completo.",
    language: "Idioma", voiceMode: "Modo voz", voiceOn: "Activado", voiceOff: "Desactivado",
    listening: "Escuchando… di Sí o No",
    sayYesNo: "Di tu respuesta",
    voiceUnsupported: "El modo voz no es compatible con este navegador.",
    submit: "Enviar evaluación", minimal: "1 — Mínimo", severePain: "10 — Severo",
    forInjury: (i) => `Para ${i}`,
    sosToastTitle: "Alerta de emergencia enviada.",
    sosToastDesc: (id) => `Equipo de rescate notificado — ${id}`,
  },
  questions: {
    conscious: "¿Está usted o el herido consciente?",
    breathing: "¿La persona respira con normalidad?",
    bleeding: "¿Hay sangrado severo?",
    injury: "¿Qué tipo de lesión ocurrió?",
    mobility: "¿Puede caminar la persona herida?",
    pain: "Califica el dolor del 1 al 10.",
  },
  yesno: { Yes: "Sí", No: "No" },
  mobility: { Yes: "Sí", "With Difficulty": "Con dificultad", No: "No" },
  injuries: {
    Fall: "Caída", Fracture: "Fractura", "Head Injury": "Lesión en la cabeza",
    "Altitude Sickness": "Mal de altura", Hypothermia: "Hipotermia",
    Avalanche: "Avalancha", Other: "Otro",
  },
  severities: {
    "Low Risk": "Bajo riesgo", Moderate: "Moderado",
    "High Priority": "Alta prioridad", Critical: "Crítico",
  },
  actions: {
    "Low Risk": "Auto-monitoreo y descenso lento con compañero. Hidrátate.",
    Moderate: "Estabiliza in situ y solicita rescate no urgente.",
    "High Priority": "Despacha equipo de rescate de inmediato.",
    Critical: "AMENAZA VITAL: evacuación en helicóptero y equipo médico ya.",
  },
  firstAid: {
    Fracture: ["Mantén la zona completamente inmóvil.", "Evita movimientos innecesarios.", "Inmoviliza con férula si es posible."],
    Fall: ["Revisa lesiones ocultas antes de mover.", "Estabiliza cuello y columna.", "Aplica presión en cualquier sangrado."],
    "Head Injury": ["Mantén a la persona despierta y calmada.", "Evita movimientos bruscos de cabeza/cuello.", "Vigila confusión o vómitos."],
    "Altitude Sickness": ["Detén el ascenso de inmediato.", "Desciende lo antes posible.", "Hidrátate y descansa."],
    Hypothermia: ["Lleva a un lugar resguardado.", "Cambia ropa mojada por seca.", "Da líquidos tibios si está consciente."],
    Avalanche: ["Despeja la vía aérea de nieve primero.", "Verifica respiración y pulso.", "Trata hipotermia y trauma a la vez."],
    Other: ["Mantén al paciente calmado y abrigado.", "Vigila respiración y conciencia.", "Espera ayuda profesional."],
  },
  bleedingAid: [
    "Aplica presión firme con un paño limpio.",
    "Eleva la zona sobre el corazón si es posible.",
    "No retires objetos incrustados.",
  ],
  hypothermiaAid: [
    "Lleva a la persona a un refugio.",
    "Mantenla cálida y seca.",
    "Evita recalentar bruscamente las extremidades.",
  ],
};

const DICTS: Record<LangCode, Dict> = { en: EN, hi: HI, ne: NE, bn: BN, es: ES };

/* -------------------------------------------------------------------------- */
/*                                 Triage Logic                               */
/* -------------------------------------------------------------------------- */

type Answers = {
  conscious?: YesNoKey;
  breathing?: YesNoKey;
  bleeding?: YesNoKey;
  injury?: InjuryKey;
  mobility?: MobilityKey;
  pain?: number;
};

const STEPS: (StepKey | "done")[] = [
  "conscious", "breathing", "bleeding", "injury", "mobility", "pain", "done",
];

function computeSeverity(a: Answers): SeverityKey {
  if (a.conscious === "No" || a.breathing === "No") return "Critical";
  if (a.bleeding === "Yes" || a.injury === "Head Injury" || a.injury === "Avalanche")
    return "Critical";
  const pain = a.pain ?? 0;
  if (pain >= 8 || a.mobility === "No") return "High Priority";
  if (pain >= 5 || a.mobility === "With Difficulty") return "Moderate";
  return "Low Risk";
}

const SEVERITY_STYLES: Record<SeverityKey, { bg: string; text: string; ring: string; dot: string }> = {
  "Low Risk": { bg: "bg-emerald-500/15", text: "text-emerald-300", ring: "ring-emerald-400/40", dot: "bg-emerald-400" },
  Moderate: { bg: "bg-yellow-500/15", text: "text-yellow-300", ring: "ring-yellow-400/40", dot: "bg-yellow-400" },
  "High Priority": { bg: "bg-orange-500/15", text: "text-orange-300", ring: "ring-orange-400/40", dot: "bg-orange-400" },
  Critical: { bg: "bg-red-500/15", text: "text-red-300", ring: "ring-red-400/40", dot: "bg-red-400" },
};

type LiveLocation = {
  lat: string;
  lng: string;
  elevation: string;
  shelter: string;
  route: string;
  accuracy: string;
  updatedAt: string;
};

const DEFAULT_LOCATION: LiveLocation = {
  lat: "Acquiring…",
  lng: "Acquiring…",
  elevation: "Acquiring…",
  shelter: "Resolving nearest place…",
  route: "Awaiting GPS lock",
  accuracy: "—",
  updatedAt: "—",
};

const INJURY_KEYS: InjuryKey[] = [
  "Fall", "Fracture", "Head Injury", "Altitude Sickness", "Hypothermia", "Avalanche", "Other",
];

/* -------------------------------------------------------------------------- */
/*                          Speech (TTS + STT) helpers                        */
/* -------------------------------------------------------------------------- */

type SpeechRec = {
  start: () => void;
  stop: () => void;
  abort: () => void;
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
};

function getSpeechRecognition(): (new () => SpeechRec) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRec;
    webkitSpeechRecognition?: new () => SpeechRec;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function speak(text: string, bcp47: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = bcp47;
    u.rate = 1;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  } catch {
    /* ignore */
  }
}

function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

/* Lightweight multilingual yes/no matcher */
const YES_WORDS = ["yes", "yeah", "yep", "yup", "sure", "ok", "okay", "हाँ", "हां", "जी", "हो", "हजुर", "হ্যাঁ", "হা", "sí", "si", "claro"];
const NO_WORDS = ["no", "nope", "nah", "negative", "नहीं", "ना", "होइन", "না", "নয়"];

function classifyYesNo(transcript: string): YesNoKey | null {
  const t = transcript.toLowerCase().trim();
  if (YES_WORDS.some((w) => t.includes(w.toLowerCase()))) return "Yes";
  if (NO_WORDS.some((w) => t.includes(w.toLowerCase()))) return "No";
  return null;
}

/* -------------------------------------------------------------------------- */
/*                                  Page                                      */
/* -------------------------------------------------------------------------- */

function TriagePage() {
  const [lang, setLang] = useState<LangCode>("en");
  const t = DICTS[lang];
  const bcp47 = LANGS.find((l) => l.code === lang)!.bcp47;

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [pain, setPain] = useState(5);
  const [sosSent, setSosSent] = useState<null | { id: string; time: string }>(null);

  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [listening, setListening] = useState(false);
  const recogRef = useRef<SpeechRec | null>(null);
  const lastSpokenStepRef = useRef<string>("");

  const [location, setLocation] = useState<LiveLocation>(DEFAULT_LOCATION);
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "ok" | "denied" | "unavailable">("idle");

  type Weather = {
    tempC: number;
    feelsC: number;
    windKmh: number;
    windDir: number;
    humidity: number;
    precipMm: number;
    code: number;
    description: string;
    isDay: boolean;
    updatedAt: string;
  };
  const [weather, setWeather] = useState<Weather | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setWeatherStatus("loading");
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,is_day&wind_speed_unit=kmh&timezone=auto`;
      const r = await fetch(url);
      if (!r.ok) throw new Error("weather fetch failed");
      const d = await r.json();
      const c = d.current;
      const codeMap: Record<number, string> = {
        0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
        45: "Fog", 48: "Rime fog",
        51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle",
        61: "Light rain", 63: "Rain", 65: "Heavy rain",
        66: "Freezing rain", 67: "Heavy freezing rain",
        71: "Light snow", 73: "Snow", 75: "Heavy snow", 77: "Snow grains",
        80: "Rain showers", 81: "Heavy showers", 82: "Violent showers",
        85: "Snow showers", 86: "Heavy snow showers",
        95: "Thunderstorm", 96: "Thunderstorm w/ hail", 99: "Severe thunderstorm",
      };
      setWeather({
        tempC: c.temperature_2m,
        feelsC: c.apparent_temperature,
        windKmh: c.wind_speed_10m,
        windDir: c.wind_direction_10m,
        humidity: c.relative_humidity_2m,
        precipMm: c.precipitation,
        code: c.weather_code,
        description: codeMap[c.weather_code] ?? "Unknown",
        isDay: c.is_day === 1,
        updatedAt: new Date().toLocaleTimeString(),
      });
      setWeatherStatus("ok");
    } catch {
      setWeatherStatus("error");
    }
  }, []);

  const fetchLocation = useCallback(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setGeoStatus("unavailable");
      return;
    }
    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const latStr = `${Math.abs(latitude).toFixed(4)}° ${latitude >= 0 ? "N" : "S"}`;
        const lngStr = `${Math.abs(longitude).toFixed(4)}° ${longitude >= 0 ? "E" : "W"}`;
        setLocation((prev) => ({
          ...prev,
          lat: latStr,
          lng: lngStr,
          accuracy: `±${Math.round(accuracy)} m`,
          updatedAt: new Date().toLocaleTimeString(),
        }));
        setGeoStatus("ok");

        void fetchWeather(latitude, longitude);

        // Reverse geocode (OpenStreetMap Nominatim — no API key required)
        try {
          const r = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=14`,
            { headers: { "Accept-Language": "en" } },
          );
          if (r.ok) {
            const d: { display_name?: string; address?: Record<string, string> } = await r.json();
            const a = d.address ?? {};
            const place =
              a.village || a.town || a.city || a.hamlet || a.suburb || a.county || a.state || d.display_name || "Unknown area";
            const region = [a.state, a.country].filter(Boolean).join(", ");
            setLocation((prev) => ({
              ...prev,
              shelter: place,
              route: region ? `${place} — ${region}` : place,
            }));
          }
        } catch { /* ignore */ }

        // Elevation via Open-Elevation (free, no key)
        try {
          const r = await fetch(
            `https://api.open-elevation.com/api/v1/lookup?locations=${latitude},${longitude}`,
          );
          if (r.ok) {
            const d: { results?: { elevation: number }[] } = await r.json();
            const el = d.results?.[0]?.elevation;
            if (typeof el === "number") {
              setLocation((prev) => ({ ...prev, elevation: `${Math.round(el).toLocaleString()} m` }));
            }
          }
        } catch { /* ignore */ }
      },
      (err) => {
        setGeoStatus(err.code === err.PERMISSION_DENIED ? "denied" : "unavailable");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 },
    );
  }, [fetchWeather]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  // Derive hazard alerts from live weather + elevation
  const hazards = useMemo(() => {
    const list: { level: "info" | "warning" | "danger"; title: string; detail: string }[] = [];
    if (!weather) return list;
    const elNum = parseInt(location.elevation.replace(/[^\d-]/g, ""), 10);
    if (weather.feelsC <= -10) list.push({ level: "danger", title: "Severe cold — hypothermia risk", detail: `Feels like ${Math.round(weather.feelsC)}°C. Shelter and insulate immediately.` });
    else if (weather.feelsC <= 0) list.push({ level: "warning", title: "Freezing conditions", detail: `Feels like ${Math.round(weather.feelsC)}°C. Watch for frostbite on exposed skin.` });
    if (weather.windKmh >= 60) list.push({ level: "danger", title: "Dangerous winds", detail: `${Math.round(weather.windKmh)} km/h winds. Avalanche & exposure risk — descend or shelter.` });
    else if (weather.windKmh >= 35) list.push({ level: "warning", title: "Strong winds", detail: `${Math.round(weather.windKmh)} km/h winds — wind chill and balance hazard.` });
    if ([95, 96, 99].includes(weather.code)) list.push({ level: "danger", title: "Thunderstorm active", detail: "Descend ridges and peaks immediately. Avoid exposed terrain." });
    if ([71, 73, 75, 77, 85, 86].includes(weather.code)) list.push({ level: "warning", title: "Snowfall in progress", detail: "Reduced visibility and elevated avalanche risk on slopes." });
    if ([45, 48].includes(weather.code)) list.push({ level: "warning", title: "Fog — low visibility", detail: "Stay on marked trails. Navigation difficulty." });
    if (weather.precipMm >= 5) list.push({ level: "warning", title: "Heavy precipitation", detail: `${weather.precipMm} mm/h — hypothermia and rockfall risk.` });
    if (!Number.isNaN(elNum) && elNum >= 3500) list.push({ level: "warning", title: "High altitude zone", detail: `${elNum.toLocaleString()} m — monitor for AMS, HAPE, HACE symptoms.` });
    if (!Number.isNaN(elNum) && elNum >= 5000) list.push({ level: "danger", title: "Extreme altitude", detail: "Acute mountain sickness highly likely. Descend if symptomatic." });
    if (list.length === 0) list.push({ level: "info", title: "Conditions nominal", detail: "No active hazards detected for your location." });
    return list;
  }, [weather, location.elevation]);

  const step = STEPS[stepIndex];
  const progress = (stepIndex / (STEPS.length - 1)) * 100;
  const severity = useMemo(() => computeSeverity(answers), [answers]);
  const styles = SEVERITY_STYLES[severity];
  const isDone = step === "done";

  const speechSupported = !!getSpeechRecognition() &&
    typeof window !== "undefined" && "speechSynthesis" in window;

  const answer = useCallback((patch: Partial<Answers>) => {
    setAnswers((prev) => ({ ...prev, ...patch }));
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }, []);

  const reset = () => {
    stopRecognition();
    stopSpeaking();
    setAnswers({});
    setPain(5);
    setStepIndex(0);
    setSosSent(null);
    lastSpokenStepRef.current = "";
  };

  const sendSos = () => {
    const id = `EM-${Math.floor(1000 + Math.random() * 9000)}`;
    const time = new Date().toLocaleString();
    setSosSent({ id, time });
    toast.success(t.ui.sosToastTitle, { description: t.ui.sosToastDesc(id) });
  };

  /* ----------------------------- Speech control ---------------------------- */

  const stopRecognition = useCallback(() => {
    try {
      recogRef.current?.abort();
    } catch {
      /* ignore */
    }
    recogRef.current = null;
    setListening(false);
  }, []);

  const startRecognitionForYesNo = useCallback(
    (currentStep: StepKey) => {
      const Ctor = getSpeechRecognition();
      if (!Ctor) return;
      stopRecognition();
      const rec = new Ctor();
      rec.lang = bcp47;
      rec.continuous = false;
      rec.interimResults = false;
      rec.onresult = (e) => {
        const transcript = e.results?.[0]?.[0]?.transcript ?? "";
        const yn = classifyYesNo(transcript);
        if (yn) {
          if (currentStep === "conscious") answer({ conscious: yn });
          else if (currentStep === "breathing") answer({ breathing: yn });
          else if (currentStep === "bleeding") answer({ bleeding: yn });
        } else {
          toast.message(transcript || "—", { description: t.ui.sayYesNo });
        }
        setListening(false);
      };
      rec.onerror = () => setListening(false);
      rec.onend = () => setListening(false);
      try {
        rec.start();
        recogRef.current = rec;
        setListening(true);
      } catch {
        setListening(false);
      }
    },
    [answer, bcp47, stopRecognition, t.ui.sayYesNo],
  );

  // When step changes & voice is on: speak the question, then listen if yes/no.
  useEffect(() => {
    if (!voiceEnabled) return;
    if (isDone) return;
    const k = step as StepKey;
    const key = `${lang}:${stepIndex}`;
    if (lastSpokenStepRef.current === key) return;
    lastSpokenStepRef.current = key;

    stopSpeaking();
    speak(t.questions[k], bcp47);

    if (k === "conscious" || k === "breathing" || k === "bleeding") {
      const id = window.setTimeout(() => startRecognitionForYesNo(k), 1800);
      return () => window.clearTimeout(id);
    }
  }, [voiceEnabled, step, stepIndex, lang, bcp47, t.questions, isDone, startRecognitionForYesNo]);

  useEffect(() => {
    return () => {
      stopRecognition();
      stopSpeaking();
    };
  }, [stopRecognition]);

  const toggleVoice = () => {
    if (!speechSupported) {
      toast.error(t.ui.voiceUnsupported);
      return;
    }
    setVoiceEnabled((v) => {
      const nv = !v;
      if (!nv) {
        stopRecognition();
        stopSpeaking();
      } else {
        // Force re-speak current question
        lastSpokenStepRef.current = "";
      }
      return nv;
    });
  };

  /* --------------------------------- UI ---------------------------------- */

  const btn =
    "px-5 py-3 rounded-xl glass border border-white/10 hover:border-neon/50 hover:text-neon hover:glow-neon transition-all text-sm font-medium";

  const renderOptions = () => {
    if (step === "conscious" || step === "breathing" || step === "bleeding") {
      return (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <button className={btn} onClick={() => answer({ [step]: "Yes" } as Answers)}>
              {t.yesno.Yes}
            </button>
            <button className={btn} onClick={() => answer({ [step]: "No" } as Answers)}>
              {t.yesno.No}
            </button>
            {voiceEnabled && (
              <button
                className={`${btn} ${listening ? "border-neon/60 text-neon" : ""}`}
                onClick={() => startRecognitionForYesNo(step as StepKey)}
                disabled={listening}
              >
                {listening ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-neon animate-pulse" />
                    {t.ui.listening}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <Mic className="h-3.5 w-3.5" />
                    {t.ui.sayYesNo}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      );
    }
    if (step === "injury") {
      return (
        <div className="flex flex-wrap gap-2">
          {INJURY_KEYS.map((k) => (
            <button key={k} className={btn} onClick={() => answer({ injury: k })}>
              {t.injuries[k]}
            </button>
          ))}
        </div>
      );
    }
    if (step === "mobility") {
      return (
        <div className="flex flex-wrap gap-3">
          {(["Yes", "With Difficulty", "No"] as MobilityKey[]).map((o) => (
            <button key={o} className={btn} onClick={() => answer({ mobility: o })}>
              {t.mobility[o]}
            </button>
          ))}
        </div>
      );
    }
    if (step === "pain") {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t.ui.minimal}</span>
            <span className="text-2xl font-display font-bold text-neon">{pain}</span>
            <span className="text-muted-foreground">{t.ui.severePain}</span>
          </div>
          <input
            type="range" min={1} max={10} value={pain}
            onChange={(e) => setPain(Number(e.target.value))}
            className="w-full accent-[hsl(var(--neon))]"
          />
          <button
            className="w-full px-5 py-3 rounded-xl bg-neon text-primary-foreground font-semibold hover:glow-neon transition-shadow flex items-center justify-center gap-2"
            onClick={() => answer({ pain })}
          >
            {t.ui.submit} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      );
    }
    return null;
  };

  const renderAnswerLabel = (k: StepKey): string => {
    if (k === "pain") return `${answers.pain}/10`;
    if (k === "injury" && answers.injury) return t.injuries[answers.injury];
    if (k === "mobility" && answers.mobility) return t.mobility[answers.mobility];
    if ((k === "conscious" || k === "breathing" || k === "bleeding") && answers[k]) {
      return t.yesno[answers[k] as YesNoKey];
    }
    return "";
  };

  const firstAidList = answers.injury ? t.firstAid[answers.injury] : [];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute inset-0 topo-bg pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-neon/10 blur-3xl pointer-events-none" />
      <Navbar />

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-10 animate-[fade-up_0.6s_ease-out]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 mb-5">
              <AlertTriangle className="h-3.5 w-3.5 text-neon" />
              <span className="text-xs font-medium text-muted-foreground">{t.hero.badge}</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
              {t.hero.title1}
              <span className="text-gradient">{t.hero.title2}</span>
              {t.hero.title3}
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{t.hero.subtitle}</p>
          </div>

          {/* "What is this?" explainer */}
          <div className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10 mb-8 animate-[fade-up_0.6s_ease-out]">
            <div className="flex items-start gap-4 mb-5">
              <div className="h-11 w-11 rounded-xl bg-neon/15 flex items-center justify-center shrink-0">
                <Info className="h-5 w-5 text-neon" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">{t.how.title}</h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-3xl">{t.how.intro}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {t.how.steps.map((s, i) => {
                const icons = [MessageSquare, Stethoscope, Bandage, ShieldAlert];
                const Icon = icons[i];
                return (
                  <div key={s.title} className="glass rounded-2xl p-4 border border-white/5">
                    <Icon className="h-4 w-4 text-neon mb-2" />
                    <p className="text-sm font-semibold">{s.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls: language + voice */}
          <div className="glass rounded-2xl p-3 md:p-4 border border-white/10 mb-6 flex flex-wrap items-center gap-3 justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <Globe className="h-4 w-4 text-neon" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground mr-1">
                {t.ui.language}
              </span>
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code);
                    lastSpokenStepRef.current = "";
                  }}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                    lang === l.code
                      ? "bg-neon text-primary-foreground"
                      : "glass text-muted-foreground hover:text-neon"
                  }`}
                >
                  {l.native}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                {t.ui.voiceMode}
              </span>
              <button
                onClick={toggleVoice}
                className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-2 transition-all ${
                  voiceEnabled
                    ? "bg-neon text-primary-foreground glow-soft"
                    : "glass text-muted-foreground hover:text-neon"
                }`}
              >
                {voiceEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
                {voiceEnabled ? t.ui.voiceOn : t.ui.voiceOff}
              </button>
              {voiceEnabled && listening && (
                <span className="text-xs text-neon inline-flex items-center gap-1.5">
                  <Mic className="h-3.5 w-3.5 animate-pulse" /> {t.ui.listening}
                </span>
              )}
              {voiceEnabled && !speechSupported && (
                <span className="text-xs text-yellow-300 inline-flex items-center gap-1.5">
                  <MicOff className="h-3.5 w-3.5" /> {t.ui.voiceUnsupported}
                </span>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chat / Triage */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10">
                <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
                  <span>
                    {t.ui.step} {Math.min(stepIndex + 1, STEPS.length - 1)} {t.ui.of}{" "}
                    {STEPS.length - 1}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-6">
                  <div
                    className="h-full bg-neon transition-all duration-500 glow-neon"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {STEPS.slice(0, stepIndex).map((s) => {
                    if (s === "done") return null;
                    const k = s as StepKey;
                    return (
                      <div key={s} className="space-y-2 animate-[fade-up_0.4s_ease-out]">
                        <div className="flex gap-3">
                          <div className="h-8 w-8 rounded-full bg-neon/20 flex items-center justify-center flex-shrink-0">
                            <Activity className="h-4 w-4 text-neon" />
                          </div>
                          <div className="glass rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] text-sm">
                            {t.questions[k]}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-neon/20 border border-neon/30 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm">
                            {renderAnswerLabel(k)}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {!isDone && (
                    <div className="space-y-4 animate-[fade-up_0.4s_ease-out]">
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-neon/20 flex items-center justify-center flex-shrink-0">
                          <Activity className="h-4 w-4 text-neon" />
                        </div>
                        <div className="glass rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] text-sm flex items-center gap-2">
                          {t.questions[step as StepKey]}
                          {voiceEnabled && (
                            <button
                              onClick={() => speak(t.questions[step as StepKey], bcp47)}
                              className="text-neon hover:opacity-80"
                              title="Replay"
                            >
                              <Volume2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="pl-11">{renderOptions()}</div>
                    </div>
                  )}

                  {isDone && (
                    <div className="flex gap-3 animate-[fade-up_0.4s_ease-out]">
                      <div className="h-8 w-8 rounded-full bg-neon/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-neon" />
                      </div>
                      <div className="glass rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] text-sm">
                        {t.ui.assessmentComplete}.
                      </div>
                    </div>
                  )}
                </div>

                {isDone && (
                  <button
                    onClick={reset}
                    className="mt-6 text-xs text-muted-foreground hover:text-neon transition-colors"
                  >
                    {t.ui.restart}
                  </button>
                )}
              </div>

              {isDone && (
                <div
                  className={`glass-strong rounded-3xl p-6 md:p-8 border border-white/10 ring-1 ${styles.ring} animate-[fade-up_0.5s_ease-out]`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {t.ui.assessmentComplete}
                      </p>
                      <h2 className="font-display text-2xl font-bold mt-1">
                        {t.ui.triageAnalysis}
                      </h2>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full ${styles.bg} ${styles.text} text-sm font-semibold flex items-center gap-2`}
                    >
                      <span className={`h-2 w-2 rounded-full ${styles.dot} animate-pulse`} />
                      {t.severities[severity]}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Stat label={t.ui.injuryType} value={answers.injury ? t.injuries[answers.injury] : "—"} />
                    <Stat label={t.ui.painScore} value={`${answers.pain ?? 0}/10`} />
                    <Stat label={t.ui.mobilityStatus} value={answers.mobility ? t.mobility[answers.mobility] : "—"} />
                    <Stat label={t.ui.conscious} value={answers.conscious ? t.yesno[answers.conscious] : "—"} />
                  </div>

                  <div className={`mt-6 p-4 rounded-2xl ${styles.bg} border border-white/5`}>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      {t.ui.recommendedAction}
                    </p>
                    <p className={`text-sm font-medium ${styles.text}`}>
                      {t.actions[severity]}
                    </p>
                  </div>
                </div>
              )}

              {isDone && (
                <div className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10 animate-[fade-up_0.6s_ease-out]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 rounded-xl bg-neon/15 flex items-center justify-center">
                      <Bandage className="h-5 w-5 text-neon" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold">{t.ui.firstAidTitle}</h3>
                      <p className="text-xs text-muted-foreground">{t.ui.firstAidSubtitle}</p>
                    </div>
                  </div>

                  <AidBlock
                    title={t.ui.forInjury(answers.injury ? t.injuries[answers.injury] : "—")}
                    items={firstAidList}
                    icon={<Heart className="h-4 w-4 text-neon" />}
                  />
                  {answers.bleeding === "Yes" && (
                    <AidBlock
                      title={t.ui.forBleeding}
                      items={t.bleedingAid}
                      icon={<Bandage className="h-4 w-4 text-red-400" />}
                    />
                  )}
                  {(answers.injury === "Hypothermia" || answers.injury === "Avalanche") && (
                    <AidBlock
                      title={t.ui.forHypothermia}
                      items={t.hypothermiaAid}
                      icon={<Snowflake className="h-4 w-4 text-cyan-300" />}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="glass-strong rounded-3xl p-6 border border-red-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <Radio className="h-4 w-4 text-red-400 animate-pulse" />
                    <span className="text-xs uppercase tracking-wider text-red-300 font-semibold">
                      {t.ui.sosBeacon}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold mb-4">{t.ui.sosTitle}</h3>

                  {!sosSent ? (
                    <button
                      onClick={sendSos}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-sm hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all flex items-center justify-center gap-2 animate-pulse"
                    >
                      <Send className="h-4 w-4" />
                      {t.ui.sendSos}
                    </button>
                  ) : (
                    <div className="space-y-3 animate-[fade-up_0.4s_ease-out]">
                      <div className="flex items-center gap-2 text-emerald-300 text-sm">
                        <CheckCircle2 className="h-4 w-4" />
                        {t.ui.sosSent}
                      </div>
                      <div className="space-y-2 text-xs">
                        <Row k={t.ui.emergencyId} v={sosSent.id} />
                        <Row k={t.ui.timeReported} v={sosSent.time} />
                        <Row k={t.ui.status} v={t.ui.rescueNotified} valueClass="text-emerald-300" />
                        <Row k={t.ui.location} v={location.route} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="glass-strong rounded-3xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-neon" />
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      {t.ui.liveGps}
                    </span>
                    {geoStatus === "ok" && (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-300 ml-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE
                      </span>
                    )}
                  </div>
                  <button
                    onClick={fetchLocation}
                    className="text-[10px] uppercase tracking-wider text-neon hover:text-neon/80"
                  >
                    {geoStatus === "loading" ? "…" : "Refresh"}
                  </button>
                </div>
                {geoStatus === "denied" && (
                  <div className="mb-3 text-[11px] text-yellow-300 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2">
                    Location permission denied. Enable GPS access in your browser to share real coordinates with rescue.
                  </div>
                )}
                {geoStatus === "unavailable" && (
                  <div className="mb-3 text-[11px] text-yellow-300 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2">
                    GPS unavailable on this device.
                  </div>
                )}
                <div className="aspect-video rounded-2xl mb-4 relative overflow-hidden border border-white/10 bg-gradient-to-br from-primary/20 to-background">
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--neon))_0%,transparent_60%)]" />
                  <Mountain className="absolute bottom-3 right-3 h-10 w-10 text-neon/60" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="h-3 w-3 rounded-full bg-neon glow-neon" />
                    <div className="absolute inset-0 h-3 w-3 rounded-full bg-neon animate-ping" />
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <Row k={t.ui.latitude} v={location.lat} />
                  <Row k={t.ui.longitude} v={location.lng} />
                  <Row k={t.ui.elevation} v={location.elevation} />
                  <Row k={t.ui.nearestShelter} v={location.shelter} />
                  <Row k="Accuracy" v={location.accuracy} />
                  <Row k="Updated" v={location.updatedAt} />
                </div>
              </div>

              {isDone && (
                <div className="glass-strong rounded-3xl p-6 border border-white/10 animate-[fade-up_0.6s_ease-out]">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-neon" />
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      {t.ui.emergencySummary}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <Row k={t.ui.emergencyId} v={sosSent?.id ?? "—"} />
                    <Row k={t.ui.injuryType} v={answers.injury ? t.injuries[answers.injury] : "—"} />
                    <Row k={t.ui.painLevel} v={`${answers.pain ?? 0}/10`} />
                    <Row k={t.ui.canWalk} v={answers.mobility ? t.mobility[answers.mobility] : "—"} />
                    <Row k={t.ui.severity} v={t.severities[severity]} valueClass={styles.text} />
                    <Row k={t.ui.location} v={location.route} />
                    <Row
                      k={t.ui.status}
                      v={sosSent ? t.ui.sosSentShort : t.ui.awaitingDispatch}
                      valueClass={sosSent ? "text-emerald-300" : "text-yellow-300"}
                    />
                </div>
              </div>

              <div className="glass-strong rounded-3xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-4 w-4 text-neon" />
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Live Weather & Hazards
                    </span>
                    {weatherStatus === "ok" && (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-300 ml-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE
                      </span>
                    )}
                  </div>
                  {weatherStatus === "loading" && (
                    <Loader2 className="h-3.5 w-3.5 text-neon animate-spin" />
                  )}
                </div>

                {!weather && weatherStatus !== "error" && (
                  <p className="text-xs text-muted-foreground">
                    {geoStatus === "ok" ? "Fetching current conditions…" : "Waiting for GPS lock to fetch weather…"}
                  </p>
                )}
                {weatherStatus === "error" && (
                  <p className="text-xs text-yellow-300">Weather service unreachable. Retry from GPS card.</p>
                )}

                {weather && (
                  <>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                          <Thermometer className="h-3 w-3" /> Temp
                        </div>
                        <p className="text-lg font-semibold mt-0.5">{Math.round(weather.tempC)}°C</p>
                        <p className="text-[10px] text-muted-foreground">feels {Math.round(weather.feelsC)}°C</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                          <Wind className="h-3 w-3" /> Wind
                        </div>
                        <p className="text-lg font-semibold mt-0.5">{Math.round(weather.windKmh)} <span className="text-xs font-normal">km/h</span></p>
                        <p className="text-[10px] text-muted-foreground">{weather.windDir}°</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                          <Cloud className="h-3 w-3" /> Sky
                        </div>
                        <p className="text-sm font-semibold mt-0.5 leading-tight">{weather.description}</p>
                        <p className="text-[10px] text-muted-foreground">{weather.isDay ? "Daytime" : "Night"}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                          <Eye className="h-3 w-3" /> Precip
                        </div>
                        <p className="text-lg font-semibold mt-0.5">{weather.precipMm} <span className="text-xs font-normal">mm</span></p>
                        <p className="text-[10px] text-muted-foreground">humidity {weather.humidity}%</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                        <AlertTriangle className="h-3 w-3 text-neon" /> Hazard alerts
                      </div>
                      {hazards.map((h, i) => {
                        const tone =
                          h.level === "danger"
                            ? "border-red-500/30 bg-red-500/10 text-red-200"
                            : h.level === "warning"
                              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-200"
                              : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200";
                        return (
                          <div key={i} className={`rounded-xl border ${tone} p-2.5`}>
                            <p className="text-xs font-semibold">{h.title}</p>
                            <p className="text-[11px] opacity-90 mt-0.5">{h.detail}</p>
                          </div>
                        );
                      })}
                      <p className="text-[10px] text-muted-foreground pt-1">
                        Updated {weather.updatedAt} • Source: Open-Meteo
                      </p>
                    </div>
                  </>
                )}
              )}

              {!isDone && (
                <div className="glass rounded-2xl p-4 border border-white/10 flex items-center gap-3 text-xs text-muted-foreground">
                  <Loader2 className="h-4 w-4 text-neon animate-spin" />
                  {t.ui.completeTriage}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-4 border border-white/5">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-base font-semibold mt-1">{value}</p>
    </div>
  );
}

function Row({
  k, v, valueClass = "",
}: { k: string; v: string; valueClass?: string }) {
  return (
    <div className="flex justify-between gap-3 py-1.5 border-b border-white/5 last:border-0">
      <span className="text-muted-foreground">{k}</span>
      <span className={`font-medium text-right ${valueClass}`}>{v}</span>
    </div>
  );
}

function AidBlock({
  title, items, icon,
}: { title: string; items: string[]; icon: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      <ul className="space-y-1.5 pl-6">
        {items.map((i) => (
          <li key={i} className="text-sm text-muted-foreground relative before:content-['•'] before:absolute before:-left-4 before:text-neon">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
