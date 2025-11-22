import React, { useState } from 'react';
import { Header } from './components/Header';
import { SchemaVisualizer } from './components/SchemaVisualizer';
import { METABOLIC_DATA, SCHEMA_SMILES } from './constants';
import { Copy, ExternalLink, Info, BookOpen, Languages, Printer } from 'lucide-react';

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  const handleSelect = (id: string) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const copySmiles = () => {
    navigator.clipboard.writeText(SCHEMA_SMILES);
    alert(lang === 'en' 
      ? "SMILES string copied!\nPaste this into Marvin JS, ChemDraw, or any molecular editor." 
      : "تم نسخ كود SMILES!\nيمكنك لصقه الآن في Marvin JS أو ChemDraw.");
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  const selectedInfo = selectedId ? METABOLIC_DATA[selectedId] : null;

  // UI Text
  const ui = {
    title: lang === 'en' ? "Metabolic Oxidation Pathways" : "مسارات الأكسدة الأيضية",
    copyBtn: lang === 'en' ? "Copy Structure" : "نسخ المركب",
    printBtn: lang === 'en' ? "Download PDF" : "تحميل PDF",
    instruction: lang === 'en' 
      ? "Explore the 7 oxidation types: Aromatic Ox, Alkene Ox, Alkyl Ox (α, ω, ω-1), Alcohol Ox, Sulfur Ox, sp² N Ox, and Oxidative Dealkylation (N/O/S)."
      : "استكشف أنواع الأكسدة السبعة: الأكسدة العطرية، الألكينات، الألكيل (ألفا، أوميغا، أوميغا-1)، الكحولات، الكبريت، النيتروجين sp²، ونزع الألكيل الأكسدي (N/O/S).",
    descTitle: lang === 'en' ? "Description" : "الشرح",
    prodTitle: lang === 'en' ? "Major Products" : "النواتج الرئيسية",
    mechTitle: lang === 'en' ? "Mechanism Note" : "ملاحظة حول الآلية",
    source: lang === 'en' ? "PDF Reference:" : "مرجع الملف:",
    emptyState: lang === 'en' ? "Select a functional group to view details" : "اختر مجموعة وظيفية لعرض التفاصيل",
    fullRef: lang === 'en' ? "Complete Metabolic Reference" : "المرجع الكامل للأكسدة الأيضية"
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 no-print">
        <button 
          onClick={toggleLang}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
          title="Switch Language"
        >
          <Languages className="w-5 h-5" />
          <span className="font-bold text-sm">{lang === 'en' ? "عربي" : "EN"}</span>
        </button>
      </div>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Visualizer Column (Expands to full width in print) */}
          <div className="lg:col-span-7 flex flex-col gap-6 print-full-width">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 transition-all hover:shadow-lg print-full-width print-auto-height">
               <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    {ui.title}
                  </h2>
                  <div className="flex gap-2 no-print">
                     <button 
                      onClick={handlePrint}
                      className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-2 rounded-md transition-colors"
                    >
                      <Printer className="w-3 h-3" />
                      {ui.printBtn}
                    </button>
                    <button 
                      onClick={copySmiles}
                      className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-2 rounded-md transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      {ui.copyBtn}
                    </button>
                  </div>
               </div>
               
               <div className="aspect-[5/3] w-full bg-slate-50 rounded-lg border border-slate-100 overflow-hidden relative">
                  <SchemaVisualizer selectedId={selectedId} onSelect={handleSelect} />
               </div>
               
               <div className={`mt-4 text-sm text-slate-600 bg-amber-50 p-4 rounded-lg border border-amber-100 flex gap-3 ${lang === 'ar' ? 'text-right' : 'text-left'} no-print`}>
                  <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p>{ui.instruction}</p>
               </div>
            </div>
          </div>

          {/* Information Column (Hidden in print, replaced by full list below) */}
          <div className="lg:col-span-5 no-print">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 h-full min-h-[400px] flex flex-col relative overflow-hidden sticky top-24">
              
              {selectedInfo ? (
                <div className="p-6 flex flex-col h-full animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide bg-indigo-100 text-indigo-700">
                      {selectedInfo.reactionType}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                    {lang === 'en' ? selectedInfo.title : selectedInfo.titleAr}
                  </h3>
                  
                  <div className="space-y-6 flex-grow">
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider">
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        {ui.descTitle}
                      </h4>
                      <p className="text-slate-700 leading-relaxed text-lg">
                        {lang === 'en' ? selectedInfo.description : selectedInfo.descriptionAr}
                      </p>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider">
                        <ExternalLink className="w-4 h-4 text-emerald-500" />
                        {ui.prodTitle}
                      </h4>
                      <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
                        <p className="text-emerald-900 font-medium">
                          {lang === 'en' ? selectedInfo.products : selectedInfo.productsAr}
                        </p>
                      </div>
                    </div>

                    {(lang === 'en' ? selectedInfo.mechanismNote : selectedInfo.mechanismNoteAr) && (
                       <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider">{ui.mechTitle}</h4>
                        <p className="text-slate-500 italic text-sm bg-slate-50 p-3 rounded border border-slate-100">
                          {lang === 'en' ? selectedInfo.mechanismNote : selectedInfo.mechanismNoteAr}
                        </p>
                       </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">
                        {ui.source} {selectedInfo.pdfReference}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-12 text-center text-slate-400">
                  <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 border-2 border-indigo-100">
                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-ping" />
                  </div>
                  <p className="text-lg font-medium text-slate-600 mb-2">{ui.emptyState}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PRINT ONLY SECTION: Full Metabolic Reference Table */}
        <div className="print-only mt-8 w-full">
           <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">{ui.fullRef}</h2>
           <div className="grid grid-cols-1 gap-6">
              {Object.values(METABOLIC_DATA).map((item) => (
                <div key={item.id} className="border border-slate-300 rounded-lg p-4 print-break-inside-avoid bg-white">
                   <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-slate-900">
                         {lang === 'en' ? item.title : item.titleAr}
                      </h3>
                      <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">
                        {item.pdfReference}
                      </span>
                   </div>
                   <div className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">
                      {item.reactionType}
                   </div>
                   <div className="grid grid-cols-1 gap-2 text-sm">
                      <p className="text-slate-800">
                        <span className="font-bold">{ui.descTitle}: </span>
                        {lang === 'en' ? item.description : item.descriptionAr}
                      </p>
                      <p className="text-emerald-800">
                        <span className="font-bold">{ui.prodTitle}: </span>
                        {lang === 'en' ? item.products : item.productsAr}
                      </p>
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-8 text-center text-xs text-slate-400 border-t pt-4">
              Generated by MetaboSchema • Faculty of Pharmacy • 2025/2026
           </div>
        </div>

      </main>
    </div>
  );
}

export default App;