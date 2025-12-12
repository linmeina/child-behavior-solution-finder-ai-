export type Language = 'ko' | 'en' | 'zh-CN';

export interface FunctionScores {
  escape: number;
  attention: number;
  tangible: number;
  sensory: number;
}

export interface TeachingSkill {
  skill: string;
  script: string;
}

export interface CommonMistake {
  mistake: string;
  reason: string;
}

export interface ChecklistItem {
  task: string;
}

export interface AnalysisResult {
  summary: {
    behavior: string;
    emotionalInterpretation: string;
  };
  functionAnalysis: {
    scores: FunctionScores;
    mainFunctionExplanation: string;
  };
  mechanism: {
    triggers: string;
    consequences: string;
    pattern: string;
  };
  preventionStrategies: string[];
  teachingSkills: TeachingSkill[];
  consequenceStrategies: {
    reinforce: string;
    ignore: string;
    natural: string;
    safety: string;
  };
  commonMistakes: CommonMistake[];
  checklist: {
    items: string[];
    goal: string;
    successCriteria: string;
  };
  redFlags: string[];
  closingComment: string;
}

export interface UserInput {
  age: string;
  behavior: string;
  context: string;
}