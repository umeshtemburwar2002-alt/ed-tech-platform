import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, Copy, CheckCheck, RefreshCw, Wand2, FileText, HelpCircle, ClipboardList, BookOpen, Zap } from "lucide-react";
import toast from "react-hot-toast";

const MODES = [
  { id: "quiz",       label: "Quiz Generator",        icon: HelpCircle,    color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/25", desc: "Generate MCQ quizzes from any topic" },
  { id: "notes",      label: "Notes Summarizer",      icon: FileText,      color: "text-cyan-400",   bg: "bg-cyan-500/10 border-cyan-500/25",     desc: "Create structured lesson notes" },
  { id: "assignment", label: "Assignment Creator",    icon: ClipboardList, color: "text-emerald-400",bg: "bg-emerald-500/10 border-emerald-500/25",desc: "Design assignments with rubric" },
  { id: "outline",    label: "Course Outline",        icon: BookOpen,      color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/25",   desc: "Build a full course curriculum" },
];

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

const SYSTEM_PROMPTS = {
  quiz: (topic, level) => `Generate a ${level} level quiz on "${topic}" with 5 multiple-choice questions. For each question include: the question text, 4 options (A, B, C, D), correct answer, and a brief explanation. Format clearly with numbered questions.`,
  notes: (topic, level) => `Create comprehensive ${level}-level lesson notes on "${topic}". Include: Learning Objectives, Key Concepts (with explanations), Important Terms, Code examples if applicable, Summary, and Further Reading suggestions. Format with clear headings.`,
  assignment: (topic, level) => `Design a ${level}-level assignment on "${topic}". Include: Assignment Title, Objective, Task Description (with 3-5 clear tasks), Submission Guidelines, Grading Rubric (with point breakdown), and Estimated Time. Make it practical and engaging.`,
  outline: (topic, level) => `Create a detailed ${level}-level course outline for "${topic}". Include: Course Overview, Target Audience, Prerequisites, 6-8 Modules with sub-topics (3-5 each), Learning Outcomes per module, Suggested Resources, and Estimated Duration. Make it comprehensive and logical.`,
};

const MOCK_RESPONSES = {
  quiz: (topic, level) => `# ${level} Quiz: ${topic}

**Question 1:** What is the primary purpose of ${topic}?
- A) To complicate simple processes
- B) To provide a structured approach to problem-solving ✓
- C) To replace human decision-making entirely
- D) To generate random outputs

*Explanation: The primary purpose is to provide structure and efficiency.*

---

**Question 2:** Which of the following best describes a key principle of ${topic}?
- A) Randomization
- B) Abstraction and modularization ✓
- C) Manual intervention
- D) Sequential processing only

*Explanation: Abstraction is a fundamental principle that enables scalability.*

---

**Question 3:** In ${level} implementations of ${topic}, what is most critical?
- A) Speed over correctness
- B) Understanding edge cases ✓
- C) Avoiding documentation
- D) Using outdated practices

*Explanation: Edge case handling ensures robust, production-ready solutions.*

---

**Question 4:** How does ${topic} relate to real-world applications?
- A) It has no real-world relevance
- B) It forms the theoretical foundation only
- C) It directly enables practical solutions ✓
- D) It is only applicable in research

*Explanation: Modern applications extensively rely on these concepts.*

---

**Question 5:** What distinguishes ${level}-level ${topic} from basics?
- A) Complexity alone
- B) Depth of understanding and application ✓
- C) More syntax memorization
- D) Fewer concepts

*Explanation: Deeper understanding enables more sophisticated problem-solving.*

✅ **5 Questions Generated** | 📊 **Difficulty: ${level}** | ⏱ **Est. 10 mins**`,

  notes: (topic, level) => `# ${level} Notes: ${topic}

## 📌 Learning Objectives
By the end of these notes, you will:
- Understand the core concepts of ${topic}
- Apply ${level}-appropriate techniques effectively
- Analyze real-world scenarios involving ${topic}

## 🔑 Key Concepts

### 1. Fundamentals
${topic} is built on three pillars: **Structure**, **Efficiency**, and **Scalability**. At the ${level} level, we focus on applying these in combination.

### 2. Core Principles
- **Principle A:** Everything starts with a clear problem definition
- **Principle B:** Iterative refinement leads to optimal solutions
- **Principle C:** Testing and validation are non-negotiable

### 3. Advanced Techniques (${level})
At this level, practitioners leverage:
\`\`\`
// Example pattern
function optimizedApproach(input) {
  const validated = validate(input);
  return process(validated);
}
\`\`\`

## 📚 Important Terms
| Term | Definition |
|------|-----------|
| Core Concept | The fundamental building block |
| Pattern | A repeatable solution template |
| Abstraction | Hiding complexity behind simple interfaces |

## 💡 Summary
${topic} at the ${level} level requires both theoretical knowledge and practical application. Focus on building strong foundations while exploring advanced patterns.

## 📖 Further Reading
1. Official Documentation
2. Industry Case Studies
3. Community Forums and Practice Problems`,

  assignment: (topic, level) => `# Assignment: ${topic} — ${level} Level

## 📋 Overview
**Title:** Mastering ${topic}: A Practical Challenge
**Level:** ${level}
**Estimated Time:** 3-5 hours

## 🎯 Objective
Students will demonstrate their understanding of ${topic} by completing a series of progressively challenging tasks that mirror real-world scenarios.

## 📝 Tasks

### Task 1 (20 pts): Foundation
Explain the core concepts of ${topic} in your own words. Provide at least 2 real-world examples where these concepts apply.

### Task 2 (30 pts): Implementation
Build a working demonstration of ${topic}. Your solution must:
- Handle at least 3 different input scenarios
- Include proper error handling
- Be well-commented

### Task 3 (25 pts): Analysis
Compare two different approaches to solving the problem. Create a comparison table covering: performance, readability, scalability, and use cases.

### Task 4 (25 pts): Reflection
Write a 300-word reflection on:
- Challenges encountered
- What you learned
- How you would improve your solution

## 📤 Submission Guidelines
- Submit via the course portal by the deadline
- Include all source code and documentation
- Add a README with setup instructions

## 📊 Grading Rubric
| Criteria | Points |
|----------|--------|
| Task 1 | 20 |
| Task 2 | 30 |
| Task 3 | 25 |
| Task 4 | 25 |
| **Total** | **100** |

*Late submissions lose 10% per day.*`,

  outline: (topic, level) => `# Course Outline: ${topic} (${level})

## 📌 Course Overview
**Title:** Complete ${topic} — ${level} Edition
**Duration:** 8-10 weeks | ~4 hours/week
**Target Audience:** ${level} learners seeking mastery in ${topic}

## ✅ Prerequisites
- Basic computer literacy
- Curiosity and commitment to learn

## 🗂 Modules

### Module 1: Introduction & Setup (Week 1)
- 1.1 What is ${topic} and why it matters
- 1.2 Setting up your environment
- 1.3 Your first hands-on project
**Outcome:** Environment ready, foundational understanding

### Module 2: Core Concepts (Week 2)
- 2.1 Fundamental principles
- 2.2 Key terminology and patterns
- 2.3 Practical exercises
**Outcome:** Solid grasp of building blocks

### Module 3: Intermediate Techniques (Week 3-4)
- 3.1 Advanced patterns
- 3.2 Error handling strategies
- 3.3 Performance considerations
**Outcome:** Can solve intermediate problems independently

### Module 4: Real-World Application (Week 5-6)
- 4.1 Industry use cases
- 4.2 Building a mini-project
- 4.3 Code review best practices
**Outcome:** Portfolio-ready project

### Module 5: Advanced Topics (Week 7-8)
- 5.1 ${level}-specific techniques
- 5.2 Optimization strategies
- 5.3 Integration with modern tools
**Outcome:** ${level}-grade problem-solving capability

### Module 6: Final Project (Week 9-10)
- 6.1 Project planning
- 6.2 Implementation
- 6.3 Presentation and review
**Outcome:** Comprehensive capstone project

## 🎓 Suggested Resources
1. Official documentation
2. Community practice platforms
3. Peer review sessions`
};

export default function AIAssistant() {
  const [mode, setMode]         = useState("quiz");
  const [topic, setTopic]       = useState("");
  const [level, setLevel]       = useState("Beginner");
  const [output, setOutput]     = useState("");
  const [loading, setLoading]   = useState(false);
  const [copied, setCopied]     = useState(false);
  const [charIdx, setCharIdx]   = useState(0);
  const outputRef               = useRef(null);

  const currentMode = MODES.find((m) => m.id === mode);

  const generate = async () => {
    if (!topic.trim()) { toast.error("Please enter a topic first!"); return; }
    setLoading(true);
    setOutput("");
    setCharIdx(0);

    // Simulate streaming
    const fullText = MOCK_RESPONSES[mode](topic, level);
    let i = 0;
    const interval = setInterval(() => {
      i += 3;
      setOutput(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setOutput(fullText);
        setLoading(false);
        toast.success("Content generated successfully!");
      }
    }, 8);
  };

  const copy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              AI Course Assistant <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </h1>
            <p className="text-sm text-slate-500">Generate quizzes, notes, assignments & outlines with AI</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        {/* Left: Controls */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="xl:col-span-2 space-y-5">

          {/* Mode selector */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Select Mode</h2>
            <div className="grid grid-cols-2 gap-2">
              {MODES.map((m) => (
                <button key={m.id} onClick={() => setMode(m.id)}
                  className={`flex flex-col items-start gap-2 p-3 rounded-xl border text-left transition-all ${
                    mode === m.id ? m.bg + " border-opacity-50 scale-[1.02]" : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]"
                  }`}>
                  <m.icon className={`w-4 h-4 ${mode === m.id ? m.color : "text-slate-500"}`} />
                  <div>
                    <p className={`text-xs font-bold ${mode === m.id ? "text-white" : "text-slate-400"}`}>{m.label}</p>
                    <p className="text-[10px] text-slate-600 mt-0.5 leading-tight">{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Config */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">Configuration</h2>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Topic or Subject</label>
              <input
                value={topic} onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. JavaScript Promises, React Hooks..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Difficulty Level</label>
              <div className="grid grid-cols-2 gap-2">
                {LEVELS.map((l) => (
                  <button key={l} onClick={() => setLevel(l)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      level === l ? "bg-violet-600/30 border-violet-500/50 text-violet-300" : "bg-white/[0.03] border-white/[0.08] text-slate-500 hover:text-white hover:bg-white/[0.06]"
                    }`}>{l}</button>
                ))}
              </div>
            </div>
            <button
              onClick={generate}
              disabled={loading || !topic.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/20"
            >
              {loading ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Generating…</>
              ) : (
                <><Wand2 className="w-4 h-4" /> Generate {currentMode?.label}</>
              )}
            </button>
          </div>

          {/* Quick prompts */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Quick Topics</h2>
            <div className="flex flex-wrap gap-2">
              {["React Hooks","Python Basics","SQL Joins","CSS Grid","REST APIs","Git Workflow"].map((t) => (
                <button key={t} onClick={() => setTopic(t)}
                  className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-violet-500/30 transition-all flex items-center gap-1.5">
                  <Zap className="w-2.5 h-2.5 text-violet-400" /> {t}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Output */}
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
          className="xl:col-span-3 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex flex-col" style={{ minHeight: "600px" }}>
          <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <currentMode.icon className={`w-4 h-4 ${currentMode.color}`} />
              <h2 className="text-sm font-bold text-white">{currentMode.label} Output</h2>
              {loading && <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-[10px] font-bold animate-pulse">Generating…</span>}
            </div>
            {output && (
              <div className="flex items-center gap-2">
                <button onClick={copy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-semibold text-slate-400 hover:text-white transition-all">
                  {copied ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button onClick={() => setOutput("")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-semibold text-slate-400 hover:text-white transition-all">
                  <RefreshCw className="w-3 h-3" /> Clear
                </button>
              </div>
            )}
          </div>

          <div ref={outputRef} className="flex-1 overflow-y-auto p-5">
            {!output && !loading ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/20 flex items-center justify-center">
                  <Bot className="w-8 h-8 text-violet-400" />
                </div>
                <div>
                  <p className="text-white font-bold mb-1">Ready to Generate</p>
                  <p className="text-sm text-slate-500 max-w-xs">Choose a mode, enter a topic, set the difficulty level, then click Generate</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 w-full max-w-xs">
                  {MODES.map((m) => (
                    <div key={m.id} className={`p-3 rounded-xl ${m.bg} text-center`}>
                      <m.icon className={`w-4 h-4 ${m.color} mx-auto mb-1`} />
                      <p className="text-[10px] text-slate-400">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="prose prose-invert prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm text-slate-300 leading-relaxed">
                  {output}
                  {loading && <span className="inline-block w-0.5 h-4 bg-violet-400 ml-0.5 animate-pulse" />}
                </pre>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
