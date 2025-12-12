import { Language } from './types';

export const translations = {
  ko: {
    title: "아이 행동 AI 도우미",
    subtitle: "부모님을 위한 행동 솔루션",
    inputTitle: "어떤 어려움이 있나요?",
    inputDescPre: "아이의 행동과 상황을 자세히 알려주시면,\n가장 적절한 ",
    inputDescLink: "ABA",
    inputDescPost: " 기반 솔루션을 제안해드립니다.",
    labelAge: "아이의 나이 (또는 발달 연령)",
    placeholderAge: "예: 만 3세, 36개월, 초등학교 1학년",
    labelBehavior: "가장 걱정되는 행동은 무엇인가요?",
    placeholderBehavior: "예: 마트에서 장난감을 안 사주면 바닥에 드러누워 소리를 질러요.",
    labelContext: "그 행동은 주로 언제, 어떤 상황에서 일어나나요?",
    placeholderContext: "예: 주로 피곤한 저녁 시간대나, 제가 전화를 받느라 관심을 주지 못할 때 발생해요.",
    submit: "솔루션 찾기",
    analyzing: "분석 중...",
    disclaimer: "* 이 서비스는 교육 및 조언 목적이며 의학적 진단을 대체하지 않습니다.",
    
    // Result View
    fact: "행동 (Fact)",
    interpretation: "정서적 해석 분리",
    mainCause: "주요 원인 분석",
    trigger: "자극 (Trigger)",
    pattern: "행동 패턴",
    consequence: "결과 (Consequence)",
    tip: "Tip:",
    
    sectionSummary: "문제 행동 요약",
    sectionFunction: "행동의 기능(이유) 분석",
    sectionMechanism: "행동이 유지되는 패턴",
    sectionPrevention: "예방 전략 (환경 수정)",
    sectionTeaching: "가르쳐야 할 기술",
    sectionConsequence: "행동 발생 시 대응 (후속 전략)",
    sectionMistakes: "자주 하는 실수 (주의사항)",
    sectionChecklist: "7일 실천 체크리스트",
    sectionRedFlags: "전문가 의뢰가 필요한 경우",
    
    csReinforce: "👍 강화할 행동",
    csIgnore: "😶 무시/반응 최소화",
    csNatural: "🍂 자연적 결과",
    csSafety: "🛡️ 안전 확보",
    
    clGoal: "목표:",
    clSuccess: "성공 기준:",
    
    reset: "다른 행동 분석하기",
    print: "결과 저장 / 인쇄 (PDF)",
    autoSaved: "자동 저장됨",
    
    chart: { 
      escape: "회피/도망", 
      attention: "관심/주의", 
      tangible: "물건/활동", 
      sensory: "감각",
      low: "가능성 낮음",
      high: "가능성 높음"
    },
    
    features: [
       { title: "원인 분석", desc: "아이가 왜 그런 행동을 하는지\n기능(Function)을 파악합니다." },
       { title: "맞춤 솔루션", desc: "예방부터 대처까지\n구체적인 가이드를 제공합니다." },
       { title: "따뜻한 코칭", desc: "비난이나 판단 없이\n전문적이고 따뜻하게 돕습니다." }
    ],

    // Language Bar
    currentLanguage: "현재 언어",
    selectableLanguages: "선택 가능 언어"
  },
  en: {
    title: "Child Behavior AI",
    subtitle: "Behavior Solutions for Parents",
    inputTitle: "What challenges are you facing?",
    inputDescPre: "Describe the behavior and context,\nand we'll suggest practical ",
    inputDescLink: "ABA",
    inputDescPost: "-based solutions.",
    labelAge: "Child's Age (or Developmental Age)",
    placeholderAge: "Ex: 3 years old, 36 months, 1st grade",
    labelBehavior: "What behavior concerns you most?",
    placeholderBehavior: "Ex: My child screams and lies on the floor when I don't buy a toy.",
    labelContext: "When and where does this usually happen?",
    placeholderContext: "Ex: Usually when tired in the evening, or when I'm on the phone.",
    submit: "Find Solution",
    analyzing: "Analyzing...",
    disclaimer: "* This service is for educational purposes and does not replace medical diagnosis.",
    
    fact: "Behavior (Fact)",
    interpretation: "Emotional Interpretation",
    mainCause: "Main Function Analysis",
    trigger: "Trigger",
    pattern: "Behavior Pattern",
    consequence: "Consequence",
    tip: "Tip:",
    
    sectionSummary: "Behavior Summary",
    sectionFunction: "Function of Behavior",
    sectionMechanism: "Behavior Mechanism",
    sectionPrevention: "Prevention Strategies",
    sectionTeaching: "Skills to Teach",
    sectionConsequence: "Consequence Strategies",
    sectionMistakes: "Common Mistakes",
    sectionChecklist: "7-Day Checklist",
    sectionRedFlags: "When to Seek Help",
    
    csReinforce: "👍 Reinforce",
    csIgnore: "😶 Ignore / Minimize Reaction",
    csNatural: "🍂 Natural Consequences",
    csSafety: "🛡️ Ensure Safety",
    
    clGoal: "Goal:",
    clSuccess: "Success Criteria:",
    
    reset: "Analyze Another Behavior",
    print: "Save as PDF / Print",
    autoSaved: "Auto-saved",
    
    chart: { 
      escape: "Escape", 
      attention: "Attention", 
      tangible: "Tangible", 
      sensory: "Sensory",
      low: "Low Prob.",
      high: "High Prob."
    },
    
    features: [
       { title: "Cause Analysis", desc: "Understand the function\nbehind the behavior." },
       { title: "Tailored Solutions", desc: "Practical guides from\nprevention to reaction." },
       { title: "Warm Coaching", desc: "Professional support\nwithout judgment." }
    ],

    // Language Bar
    currentLanguage: "Current Language",
    selectableLanguages: "Available Languages"
  },
  "zh-CN": {
    title: "儿童行为 AI 助手",
    subtitle: "为家长提供行为解决方案",
    inputTitle: "您遇到了什么困难？",
    inputDescPre: "请详细描述孩子的行为和情境，\n我们将为您提供基于 ",
    inputDescLink: "ABA",
    inputDescPost: " 的实用建议。",
    labelAge: "孩子年龄（或发育年龄）",
    placeholderAge: "例如：3岁，36个月，小学一年级",
    labelBehavior: "您最担心的行为是什么？",
    placeholderBehavior: "例如：如果不买玩具，孩子就会躺在地上尖叫。",
    labelContext: "这种行为通常在什么时候、什么情况下发生？",
    placeholderContext: "例如：通常在晚上累的时候，或者我在打电话没空理他的时候。",
    submit: "寻找解决方案",
    analyzing: "分析中...",
    disclaimer: "* 本服务仅用于教育和建议目的，不能替代医学诊断。",
    
    fact: "行为事实 (Fact)",
    interpretation: "情绪解读分离",
    mainCause: "主要原因分析",
    trigger: "诱因 (Trigger)",
    pattern: "行为模式",
    consequence: "结果 (Consequence)",
    tip: "提示:",
    
    sectionSummary: "问题行为摘要",
    sectionFunction: "行为功能（原因）分析",
    sectionMechanism: "行为维持机制",
    sectionPrevention: "预防策略（环境调整）",
    sectionTeaching: "需要教授的技能",
    sectionConsequence: "行为发生时的应对（后果策略）",
    sectionMistakes: "常见错误（注意事项）",
    sectionChecklist: "7天实践清单",
    sectionRedFlags: "需要专家介入的情况",
    
    csReinforce: "👍 强化行为",
    csIgnore: "😶 忽视/最小化反应",
    csNatural: "🍂 自然结果",
    csSafety: "🛡️ 确保安全",
    
    clGoal: "目标:",
    clSuccess: "成功标准:",
    
    reset: "分析其他行为",
    print: "保存结果 / 打印 (PDF)",
    autoSaved: "已自动保存",
    
    chart: { 
      escape: "逃避 / 回避功能", 
      attention: "获得注意", 
      tangible: "获得物品或活动", 
      sensory: "自我刺激 / 感觉功能",
      low: "可能性低",
      high: "可能性高"
    },
    
    features: [
       { title: "原因分析", desc: "了解孩子为什么\n会有这种行为（功能）。" },
       { title: "定制方案", desc: "从预防到应对\n的具体指南。" },
       { title: "温和辅导", desc: "无评判的\n专业支持。" }
    ],

    // Language Bar
    currentLanguage: "当前语言",
    selectableLanguages: "可选语言"
  }
};