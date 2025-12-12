import React from 'react';
import { AnalysisResult, Language } from '../types';
import { translations } from '../translations';
import FunctionChart from './FunctionChart';
import { 
  Brain, 
  ShieldCheck, 
  GraduationCap, 
  AlertTriangle, 
  CheckCircle, 
  HeartHandshake,
  Activity,
  ListTodo,
  XCircle,
  Printer,
  RefreshCw
} from 'lucide-react';

interface ResultViewProps {
  result: AnalysisResult;
  onReset: () => void;
  language: Language;
}

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string; color?: string }> = ({ icon, title, color = "text-slate-800" }) => (
  <h3 className={`text-xl font-bold ${color} flex items-center gap-2 mb-4 border-b pb-2 break-inside-avoid`}>
    {icon}
    {title}
  </h3>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6 break-inside-avoid print:shadow-none print:border-slate-300 ${className}`}>
    {children}
  </div>
);

const ResultView: React.FC<ResultViewProps> = ({ result, onReset, language }) => {
  const t = translations[language];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-fade-in print:pb-0">
      
      {/* Action Bar (Hidden when printing) */}
      <div className="flex justify-end gap-3 print:hidden">
         <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium shadow-sm"
        >
          <Printer className="w-4 h-4" />
          {t.print}
        </button>
      </div>

      {/* 1. Summary */}
      <Card className="border-l-4 border-l-indigo-500">
        <SectionTitle icon={<Activity className="text-indigo-500" />} title={t.sectionSummary} />
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t.fact}</span>
            <p className="text-slate-800 mt-1">{result.summary.behavior}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t.interpretation}</span>
            <p className="text-slate-600 mt-1 italic">"{result.summary.emotionalInterpretation}"</p>
          </div>
        </div>
      </Card>

      {/* 2. Function Analysis */}
      <Card>
        <SectionTitle icon={<Brain className="text-indigo-500" />} title={t.sectionFunction} />
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="break-inside-avoid">
             <FunctionChart scores={result.functionAnalysis.scores} language={language} />
          </div>
          <div className="bg-slate-50 p-4 rounded-lg print:bg-white print:border print:border-slate-200">
            <h4 className="font-bold text-slate-700 mb-2">{t.mainCause}</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {result.functionAnalysis.mainFunctionExplanation}
            </p>
          </div>
        </div>
      </Card>

      {/* 3. Mechanism */}
      <Card>
        <h3 className="text-lg font-bold text-slate-800 mb-4 break-inside-avoid">{t.sectionMechanism}</h3>
        <div className="flex flex-col md:flex-row gap-4 text-sm">
          <div className="flex-1 bg-red-50 p-4 rounded-lg border border-red-100 print:bg-white print:border-red-200">
            <span className="font-bold text-red-600 block mb-1">{t.trigger}</span>
            {result.mechanism.triggers}
          </div>
          <div className="hidden md:flex items-center text-slate-300">➜</div>
          <div className="flex-1 bg-slate-100 p-4 rounded-lg border border-slate-200 print:bg-white">
            <span className="font-bold text-slate-600 block mb-1">{t.pattern}</span>
            {result.mechanism.pattern}
          </div>
          <div className="hidden md:flex items-center text-slate-300">➜</div>
          <div className="flex-1 bg-green-50 p-4 rounded-lg border border-green-100 print:bg-white print:border-green-200">
            <span className="font-bold text-green-600 block mb-1">{t.consequence}</span>
            {result.mechanism.consequences}
          </div>
        </div>
      </Card>

      {/* 4. Prevention Strategies */}
      <Card>
        <SectionTitle icon={<ShieldCheck className="text-teal-500" />} title={t.sectionPrevention} />
        <ul className="space-y-3">
          {result.preventionStrategies.map((strategy, idx) => (
            <li key={idx} className="flex items-start gap-3 break-inside-avoid">
              <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-sm font-bold mt-0.5 print:border print:border-teal-700">{idx + 1}</span>
              <span className="text-slate-700">{strategy}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 5. Teaching Skills */}
      <Card>
        <SectionTitle icon={<GraduationCap className="text-blue-500" />} title={t.sectionTeaching} />
        <div className="space-y-4">
          {result.teachingSkills.map((item, idx) => (
            <div key={idx} className="bg-blue-50 p-4 rounded-lg border border-blue-100 break-inside-avoid print:bg-white print:border-blue-200">
              <h5 className="font-bold text-blue-800 mb-2">{item.skill}</h5>
              <div className="bg-white p-3 rounded border border-blue-100 text-slate-600 text-sm italic">
                <span className="font-semibold text-blue-400 not-italic mr-2">{t.tip}</span>
                "{item.script}"
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 6. Consequence Strategies */}
      <Card>
        <SectionTitle icon={<CheckCircle className="text-green-500" />} title={t.sectionConsequence} />
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg break-inside-avoid print:bg-white print:border print:border-green-200">
            <span className="text-green-800 font-bold block mb-1">{t.csReinforce}</span>
            <p className="text-sm text-slate-700">{result.consequenceStrategies.reinforce}</p>
          </div>
          <div className="p-4 bg-slate-100 rounded-lg break-inside-avoid print:bg-white print:border print:border-slate-200">
            <span className="text-slate-600 font-bold block mb-1">{t.csIgnore}</span>
            <p className="text-sm text-slate-700">{result.consequenceStrategies.ignore}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg break-inside-avoid print:bg-white print:border print:border-orange-200">
            <span className="text-orange-800 font-bold block mb-1">{t.csNatural}</span>
            <p className="text-sm text-slate-700">{result.consequenceStrategies.natural}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg break-inside-avoid print:bg-white print:border print:border-red-200">
            <span className="text-red-800 font-bold block mb-1">{t.csSafety}</span>
            <p className="text-sm text-slate-700">{result.consequenceStrategies.safety}</p>
          </div>
        </div>
      </Card>

      {/* 7. Common Mistakes */}
      <Card>
        <SectionTitle icon={<XCircle className="text-rose-500" />} title={t.sectionMistakes} />
        <div className="space-y-3">
          {result.commonMistakes.map((item, idx) => (
            <div key={idx} className="flex gap-3 items-start break-inside-avoid">
               <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-1" />
               <div>
                 <span className="font-semibold text-slate-800">{item.mistake}</span>
                 <p className="text-sm text-slate-500 mt-1">{item.reason}</p>
               </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 8. Checklist */}
      <Card className="border-2 border-indigo-100 print:border-slate-200">
        <SectionTitle icon={<ListTodo className="text-indigo-600" />} title={t.sectionChecklist} />
        <div className="mb-4 text-sm bg-indigo-50 text-indigo-800 p-3 rounded print:bg-white print:border print:border-indigo-200">
          <strong>{t.clGoal}</strong> {result.checklist.goal} <br/>
          <strong>{t.clSuccess}</strong> {result.checklist.successCriteria}
        </div>
        <div className="space-y-2">
          {result.checklist.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-2 border-b last:border-0 border-slate-50 break-inside-avoid">
              <div className="w-5 h-5 rounded border border-slate-300 bg-white"></div>
              <span className="text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 9. Red Flags */}
      <Card className="bg-rose-50 border-rose-100 print:bg-white print:border-rose-200">
        <SectionTitle icon={<AlertTriangle className="text-rose-600" />} title={t.sectionRedFlags} color="text-rose-800" />
        <ul className="list-disc list-inside space-y-1 text-rose-700 text-sm">
          {result.redFlags.map((flag, idx) => (
            <li key={idx}>{flag}</li>
          ))}
        </ul>
      </Card>

      {/* 10. Closing */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-center text-white shadow-lg print:bg-none print:text-slate-800 print:border print:border-slate-200 print:shadow-none break-inside-avoid">
        <HeartHandshake className="w-12 h-12 mx-auto mb-4 text-white/80 print:text-indigo-600" />
        <p className="text-lg font-medium leading-relaxed">
          "{result.closingComment}"
        </p>
        <button 
          onClick={onReset}
          className="mt-8 bg-white text-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition-colors shadow-md print:hidden"
        >
          {t.reset}
        </button>
      </div>

    </div>
  );
};

export default ResultView;