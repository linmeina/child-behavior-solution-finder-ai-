import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserInput, AnalysisResult, Language } from "../types";

// Safely retrieve API Key (handles environments where process is undefined)
const getApiKey = (): string => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore error
  }
  // Return empty string or handle error appropriately in UI if key is missing
  return '';
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.OBJECT,
      properties: {
        behavior: { type: Type.STRING, description: "Object summary of the behavior" },
        emotionalInterpretation: { type: Type.STRING, description: "Separated emotional interpretation" },
      },
      required: ["behavior", "emotionalInterpretation"],
    },
    functionAnalysis: {
      type: Type.OBJECT,
      properties: {
        scores: {
          type: Type.OBJECT,
          properties: {
            escape: { type: Type.NUMBER, description: "0-5 scale for Escape" },
            attention: { type: Type.NUMBER, description: "0-5 scale for Attention" },
            tangible: { type: Type.NUMBER, description: "0-5 scale for Tangible" },
            sensory: { type: Type.NUMBER, description: "0-5 scale for Sensory" },
          },
          required: ["escape", "attention", "tangible", "sensory"],
        },
        mainFunctionExplanation: { type: Type.STRING, description: "Detailed explanation of the highest scoring function" },
      },
      required: ["scores", "mainFunctionExplanation"],
    },
    mechanism: {
      type: Type.OBJECT,
      properties: {
        triggers: { type: Type.STRING, description: "Antecedent/Triggers" },
        consequences: { type: Type.STRING, description: "Consequences" },
        pattern: { type: Type.STRING, description: "Repeated pattern" },
      },
      required: ["triggers", "consequences", "pattern"],
    },
    preventionStrategies: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 5-8 prevention strategies",
    },
    teachingSkills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          skill: { type: Type.STRING },
          script: { type: Type.STRING, description: "Example script for parents" },
        },
        required: ["skill", "script"],
      },
    },
    consequenceStrategies: {
      type: Type.OBJECT,
      properties: {
        reinforce: { type: Type.STRING },
        ignore: { type: Type.STRING },
        natural: { type: Type.STRING },
        safety: { type: Type.STRING },
      },
      required: ["reinforce", "ignore", "natural", "safety"],
    },
    commonMistakes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          mistake: { type: Type.STRING },
          reason: { type: Type.STRING },
        },
        required: ["mistake", "reason"],
      },
    },
    checklist: {
      type: Type.OBJECT,
      properties: {
        items: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Items to track for 7 days" },
        goal: { type: Type.STRING, description: "Goal (frequency/duration etc)" },
        successCriteria: { type: Type.STRING, description: "Success criteria" },
      },
      required: ["items", "goal", "successCriteria"],
    },
    redFlags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Red flags requiring professional help",
    },
    closingComment: { type: Type.STRING, description: "Warm closing encouragement" },
  },
  required: [
    "summary",
    "functionAnalysis",
    "mechanism",
    "preventionStrategies",
    "teachingSkills",
    "consequenceStrategies",
    "commonMistakes",
    "checklist",
    "redFlags",
    "closingComment",
  ],
};

export const analyzeBehavior = async (input: UserInput, language: Language = 'ko'): Promise<AnalysisResult> => {
  const prompt = `
[Language Settings / 언어 설정]

You are a multilingual assistant for a “Child Behavior Solution Finder” app.
The app sends you a parameter called \`target_language\`.  
You MUST always answer ONLY in the language specified by \`target_language\`.

Target Language: ${language}

Supported languages and tone guide:

- ko: Korean (한국어)
  - Use polite, warm, and encouraging tone.
  - Write in 자연스럽고 부드러운 존댓말.
  - Avoid expressions that could make parents feel blamed or guilty.

- en: English
  - Use clear, simple, friendly language.
  - Keep sentences concise and accessible for parents without professional background.

- zh-CN: Simplified Chinese (简体中文)
  - Use warm, supportive, non-judgmental language.
  - Avoid harsh or overly direct tones; keep explanations parent-friendly.

[Developmental Stage Integration / 结合年龄发展阶段]

The app will provide a parameter \`child_age\`.  
You MUST compare the child's behavior and needs with the typical developmental expectations for this age.

When generating the behavior solution, always consider:

1. Developmental Milestones  
   Compare the child's age with general expectations in:
   - Communication & language development  
   - Social interaction  
   - Emotional regulation  
   - Play skills  
   - Motor skills  
   - Cognitive ability  
   - Independence / self-help skills  

2. Why this behavior may occur at this developmental stage  
   Determine whether the behavior:
   - Is developmentally typical  
   - Is a common transitional challenge  
   - Reflects a developmental need or skill gap  
   - Suggests that the task is too difficult for the child’s stage  

3. Developmental Needs  
   Identify what the child may need at this age:
   - More structure?  
   - Clearer routines?  
   - Visual supports?  
   - Communication modeling?  
   - Regulation support from caregivers?  
   - Opportunities for independence?  
   - Social play guidance?  

4. Age-Appropriate Strategies  
   For younger ages (1–3):
     - Simplify tasks  
     - Use play-based teaching  
     - More modeling, prompting, co-regulation  
     - Teach simple gestures or single words  
   For preschool ages (4–6):
     - Visual schedules, simple rules  
     - Begin waiting, turn-taking, functional communication  
     - Reinforcement systems only if appropriate  
   For school-age children (7–12):
     - More advanced ABA strategies  
     - Behavior contracts, token systems  
     - Self-regulation skills  
     - Problem-solving, natural consequences  

5. Avoid over-expecting or under-expecting  
   Do NOT suggest strategies beyond the child's developmental level.  
   Always adjust difficulty based on age.

Your output MUST integrate:
- developmental expectations  
- developmental needs  
- behavior function  
- age-appropriate interventions  

into all 10 sections of the behavior solution.

[Output Rule]

- Always respond ONLY in \`target_language\`.
- Do NOT mix multiple languages in one answer.
- Keep language simple enough for non-professional parents.
- You are providing educational guidance, NOT medical diagnosis.
- Output MUST follow the structured JSON schema provided below.

[Role & Persona]
You are a "Child Behavior Solution Finder AI" for parents and experts.
Analyze the user's input (Age, Behavior & Context) and provide an ABA-based solution.
    
User Input:
- Age: ${input.age}
- Behavior: ${input.behavior}
- Context: ${input.context}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.7, 
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Error analyzing behavior:", error);
    const errorMsg = {
      'ko': "분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요. (API KEY 확인 필요)",
      'en': "An error occurred during analysis. Please try again later. (Check API KEY)",
      'zh-CN': "分析过程中发生错误。请稍后再试。(请检查 API KEY)"
    };
    throw new Error(errorMsg[language] || errorMsg['en']);
  }
};

export const getABAInfo = async (language: Language): Promise<string> => {
  const prompt = `
[Language Settings / 언어 설정]
The app sends you a parameter called \`target_language\`.  
You MUST always answer ONLY in the language specified by \`target_language\`.
Target Language: ${language}

[Mode: ABA Info]
The user is requesting an explanation of what ABA (Applied Behavior Analysis) is.
You MUST ignore any behavior description and ONLY return the ABA explanation text.
The output must be in the language specified by \`target_language\`.

Respond EXACTLY with the following content, according to \`target_language\`:

If target_language = "ko", respond with:

ABA란 무엇인가요?

ABA(응용행동분석)은 과학적 연구에 기반한 방법으로,  
아이의 행동이 왜 나타나는지 이해하고,  
보다 긍정적인 방향으로 변화할 수 있도록 돕는  
전문적인 분석 및 교육 접근법입니다.

ABA는 다음을 목표로 합니다:

• 아이가 원하는 방식으로 의사소통할 수 있도록 돕기  
• 문제 행동의 이유를 이해하고, 적절한 대안을 가르치기  
• 일상 속에서 배우기 쉬운 방법으로 스킬을 익히도록 돕기  
• 부모가 아이를 더 잘 이해하고, 쉽게 양육할 수 있도록 지원하기  

ABA는 미국을 포함한 여러 나라에서  
아동 발달과 행동 지원을 위해 널리 활용되는  
검증된 과학적 방법입니다.


If target_language = "zh-CN", respond with:

什么是 ABA？

ABA（应用行为分析）是一种基于科学研究的方法，  
通过理解孩子行为出现的原因，  
帮助孩子以更积极的方式学习与成长，  
是一种专业的行为分析与教育方法。

ABA 的目标包括：

• 帮助孩子更好地表达需求与情绪  
• 理解问题行为背后的原因，并教授更合适的替代方式  
• 让孩子在日常生活中以简单自然的方式学习技能  
• 帮助父母更好地理解孩子，减轻育儿压力  

ABA 在美国等多个国家被广泛应用于  
儿童发展与行为支持领域，  
是一种经过验证的科学方法。


If target_language = "en", respond with:

What is ABA?

ABA (Applied Behavior Analysis) is a science-based approach  
that helps us understand why a child’s behavior occurs  
and supports the child in learning new, positive skills.  
It is a professional method used in behavior analysis and education.

The goals of ABA include:

• Helping children communicate their needs effectively  
• Understanding the reasons behind challenging behaviors  
  and teaching appropriate alternatives  
• Supporting children in learning skills naturally  
  in their daily routines  
• Helping parents understand their child better  
  and reduce stress in everyday parenting  

ABA is widely used in the United States and many other countries  
for supporting children’s development and behavior,  
and is recognized as an evidence-based scientific method.

Do NOT generate any other content.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.1, // Low temperature for consistent output
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return text.trim();
  } catch (error) {
    console.error("Error fetching ABA info:", error);
    const errorMsg = {
      'ko': "정보를 불러오는 중 오류가 발생했습니다.",
      'en': "An error occurred while fetching information.",
      'zh-CN': "获取信息时发生错误。"
    };
    throw new Error(errorMsg[language] || errorMsg['en']);
  }
};