// Comprehensive Course Curriculum and Rich Learning Content

const getEditorStarter = (courseName) => {
  const normalized = courseName.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (normalized.includes('word')) {
    return {
      html: `<div class="word-app">
  <div class="word-ribbon">
    <div class="ribbon-tab active">Home</div>
    <div class="ribbon-tab">Insert</div>
    <div class="ribbon-tab">Layout</div>
    <div class="ribbon-tab">References</div>
  </div>
  <div class="word-toolbar">
    <button id="btnBold" class="tool-btn"><b>B</b></button>
    <button id="btnItalic" class="tool-btn"><i>I</i></button>
    <button id="btnUnderline" class="tool-btn"><u>U</u></button>
    <select id="selectHeading" class="tool-select">
      <option value="p">Normal Text</option>
      <option value="h1">Heading 1 (Title)</option>
      <option value="h2">Heading 2 (Subtitle)</option>
    </select>
    <button id="btnHighlight" class="tool-btn bg-yellow">Highlight</button>
  </div>
  <div class="word-document-wrapper">
    <div id="wordDoc" class="word-page" contenteditable="true">
      <h1 id="docTitle">Executive Project Summary</h1>
      <p class="meta">Prepared by: VeeruPro Academy Student | Date: August 2026</p>
      <hr />
      <h2>1. Project Objectives & Overview</h2>
      <p>Microsoft Word is the industry-standard word processor for business documentation, academic reports, and publication design.</p>
      <h2>2. Key Features & Formatting Styles</h2>
      <ul>
        <li><strong>Styles Gallery:</strong> Apply consistent typography across all pages.</li>
        <li><strong>Table of Contents:</strong> Auto-generate clickable document indexes.</li>
        <li><strong>Mail Merge:</strong> Create batch personalized letters from Excel datasets.</li>
      </ul>
    </div>
  </div>
</div>`,
      css: `body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #e6ebf2; padding: 16px; margin: 0; }
.word-app { background: white; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.12); overflow: hidden; border: 1px solid #c8d1dc; }
.word-ribbon { background: #2b579a; color: white; display: flex; gap: 16px; padding: 8px 16px; font-size: 13px; font-weight: 600; }
.ribbon-tab { opacity: 0.8; cursor: pointer; }
.ribbon-tab.active { opacity: 1; font-weight: bold; text-decoration: underline; }
.word-toolbar { background: #f3f5f8; border-bottom: 1px solid #d0d7de; padding: 8px 16px; display: flex; gap: 8px; align-items: center; }
.tool-btn { padding: 6px 12px; border: 1px solid #b8c4d1; background: white; border-radius: 4px; cursor: pointer; font-size: 13px; }
.tool-btn:hover { background: #e2e8f0; }
.tool-select { padding: 6px; border-radius: 4px; border: 1px solid #b8c4d1; }
.word-document-wrapper { padding: 24px; background: #c0c9d6; display: flex; justify-content: center; }
.word-page { background: white; width: 100%; max-width: 650px; min-height: 400px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border-radius: 2px; color: #1e293b; outline: none; }
.word-page h1 { color: #2b579a; margin-top: 0; border-bottom: 2px solid #2b579a; padding-bottom: 6px; }
.word-page h2 { color: #1e3a8a; margin-top: 20px; }
.meta { font-size: 12px; color: #64748b; font-style: italic; }`,
      js: `console.log("[MS Word Studio Initialized]");
document.getElementById('btnBold')?.addEventListener('click', () => { document.execCommand('bold'); });
document.getElementById('btnItalic')?.addEventListener('click', () => { document.execCommand('italic'); });
document.getElementById('btnUnderline')?.addEventListener('click', () => { document.execCommand('underline'); });
document.getElementById('btnHighlight')?.addEventListener('click', () => { document.execCommand('hiliteColor', false, '#fef08a'); });
document.getElementById('selectHeading')?.addEventListener('change', (e) => { document.execCommand('formatBlock', false, e.target.value); });`
    };
  }

  if (normalized.includes('excel')) {
    return {
      html: `<div class="excel-app">
  <div class="excel-ribbon">
    <span class="logo">MS Excel Engine</span>
    <span class="formula-label">fx Formula Bar:</span>
    <input id="formulaInput" type="text" value="=SUM(B2:B5)" class="formula-input" />
  </div>
  <div class="excel-actions">
    <button id="calcSum" class="btn-formula">=SUM(B2:B5)</button>
    <button id="calcAvg" class="btn-formula">=AVERAGE(B2:B5)</button>
    <button id="calcMax" class="btn-formula">=MAX(B2:B5)</button>
    <button id="calcVlookup" class="btn-formula">=VLOOKUP("Q1", A2:B5, 2)</button>
  </div>
  <div class="spreadsheet-wrapper">
    <table class="excel-grid">
      <thead>
        <tr><th></th><th>A (Quarter)</th><th>B (Sales ₹)</th><th>C (Growth %)</th><th>D (Status)</th></tr>
      </thead>
      <tbody>
        <tr><td class="row-num">2</td><td>Q1 2026</td><td contenteditable="true" id="cellB2">45000</td><td>12%</td><td>Target Met</td></tr>
        <tr><td class="row-num">3</td><td>Q2 2026</td><td contenteditable="true" id="cellB3">52000</td><td>15%</td><td>Target Met</td></tr>
        <tr><td class="row-num">4</td><td>Q3 2026</td><td contenteditable="true" id="cellB4">61000</td><td>18%</td><td>Target Met</td></tr>
        <tr><td class="row-num">5</td><td>Q4 2026</td><td contenteditable="true" id="cellB5">78000</td><td>25%</td><td>Exceeded</td></tr>
        <tr class="total-row"><td class="row-num">6</td><td><strong>Total Result</strong></td><td id="resultCell" class="result-highlight">₹ 236,000</td><td id="calcType">Formula: SUM</td><td>OK</td></tr>
      </tbody>
    </table>
  </div>
</div>`,
      css: `body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #e2e8f0; padding: 16px; margin: 0; }
.excel-app { background: white; border-radius: 8px; border: 1px solid #107c41; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
.excel-ribbon { background: #107c41; color: white; padding: 10px 16px; display: flex; align-items: center; gap: 12px; font-size: 13px; }
.excel-ribbon .logo { font-weight: 800; font-size: 14px; background: rgba(0,0,0,0.2); padding: 4px 10px; border-radius: 4px; }
.formula-label { font-weight: 700; color: #a7f3d0; }
.formula-input { flex: 1; padding: 6px 12px; font-family: monospace; border: none; border-radius: 4px; font-weight: bold; color: #064e3b; }
.excel-actions { background: #f0fdf4; border-bottom: 1px solid #bbf7d0; padding: 8px 16px; display: flex; gap: 8px; flex-wrap: wrap; }
.btn-formula { background: white; border: 1px solid #107c41; color: #107c41; padding: 6px 12px; border-radius: 4px; font-weight: 700; font-family: monospace; cursor: pointer; font-size: 12px; }
.btn-formula:hover { background: #107c41; color: white; }
.spreadsheet-wrapper { padding: 16px; overflow-x: auto; }
.excel-grid { width: 100%; border-collapse: collapse; font-size: 13px; }
.excel-grid th { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 8px; color: #475569; font-weight: 700; }
.excel-grid td { border: 1px solid #cbd5e1; padding: 8px 12px; color: #0f172a; text-align: center; }
.excel-grid .row-num { background: #f8fafc; font-weight: 700; color: #64748b; width: 40px; }
.total-row { background: #ecfdf5; font-weight: bold; }
.result-highlight { background: #fef08a !important; font-size: 14px; font-weight: 800; color: #854d0e; }`,
      js: `console.log("[MS Excel Spreadsheet Engine Ready]");
function getValues() {
  const b2 = parseFloat(document.getElementById('cellB2')?.textContent || 45000);
  const b3 = parseFloat(document.getElementById('cellB3')?.textContent || 52000);
  const b4 = parseFloat(document.getElementById('cellB4')?.textContent || 61000);
  const b5 = parseFloat(document.getElementById('cellB5')?.textContent || 78000);
  return [b2, b3, b4, b5];
}
document.getElementById('calcSum')?.addEventListener('click', () => {
  const vals = getValues();
  const sum = vals.reduce((a, b) => a + b, 0);
  document.getElementById('formulaInput').value = "=SUM(B2:B5)";
  document.getElementById('resultCell').textContent = "₹ " + sum.toLocaleString();
  document.getElementById('calcType').textContent = "Formula: SUM";
});
document.getElementById('calcAvg')?.addEventListener('click', () => {
  const vals = getValues();
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  document.getElementById('formulaInput').value = "=AVERAGE(B2:B5)";
  document.getElementById('resultCell').textContent = "₹ " + avg.toLocaleString();
  document.getElementById('calcType').textContent = "Formula: AVERAGE";
});
document.getElementById('calcMax')?.addEventListener('click', () => {
  const vals = getValues();
  const max = Math.max(...vals);
  document.getElementById('formulaInput').value = "=MAX(B2:B5)";
  document.getElementById('resultCell').textContent = "₹ " + max.toLocaleString();
  document.getElementById('calcType').textContent = "Formula: MAX";
});
document.getElementById('calcVlookup')?.addEventListener('click', () => {
  document.getElementById('formulaInput').value = '=VLOOKUP("Q1", A2:B5, 2)';
  document.getElementById('resultCell').textContent = "₹ 45,000";
  document.getElementById('calcType').textContent = "Result: Q1 Sales";
});`
    };
  }

  if (normalized.includes('powerpoint') || normalized.includes('ppt')) {
    return {
      html: `<div class="ppt-app">
  <div class="ppt-header">
    <span class="ppt-title">MS PowerPoint Presentation Studio</span>
    <div class="ppt-theme-picker">
      <span>Theme:</span>
      <button id="themeNavy" class="btn-theme bg-navy">Navy</button>
      <button id="themeOrange" class="btn-theme bg-orange">Sunset</button>
      <button id="themeDark" class="btn-theme bg-dark">Dark</button>
    </div>
  </div>
  <div class="ppt-workspace">
    <div class="slide-nav">
      <div id="thumb1" class="thumb active">Slide 1</div>
      <div id="thumb2" class="thumb">Slide 2</div>
      <div id="thumb3" class="thumb">Slide 3</div>
    </div>
    <div class="slide-stage">
      <div id="currentSlide" class="slide-card theme-navy">
        <div class="slide-badge">PRESENTATION SLIDE 1</div>
        <h1 id="slideHeading">Mastering Executive Presentations</h1>
        <p id="slideSub">Design sleek slides, apply Morph transitions, and present with confidence.</p>
        <ul id="slideBullets">
          <li><strong>Rule of 6:</strong> Maximum 6 lines per slide, 6 words per line.</li>
          <li><strong>Visual Hierarchy:</strong> Bold titles (32pt+) with high-contrast text.</li>
          <li><strong>Smooth Animations:</strong> Use Morph for seamless item movement.</li>
        </ul>
      </div>
    </div>
  </div>
</div>`,
      css: `body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #0f172a; padding: 16px; margin: 0; }
.ppt-app { background: #1e293b; border-radius: 8px; border: 1px solid #d24726; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.3); color: white; }
.ppt-header { background: #d24726; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; }
.ppt-title { font-weight: 800; font-size: 14px; }
.ppt-theme-picker { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: bold; }
.btn-theme { padding: 4px 10px; border-radius: 4px; border: 1px solid white; color: white; font-weight: bold; cursor: pointer; }
.bg-navy { background: #1e3a8a; }
.bg-orange { background: #ea580c; }
.bg-dark { background: #020617; }
.ppt-workspace { display: flex; height: 360px; }
.slide-nav { background: #0f172a; border-right: 1px solid #334155; padding: 12px; display: flex; flex-direction: column; gap: 10px; width: 110px; }
.thumb { background: #334155; border-radius: 4px; padding: 12px 8px; text-align: center; font-size: 11px; font-weight: 700; cursor: pointer; color: #94a3b8; border: 2px solid transparent; }
.thumb.active { border-color: #d24726; background: rgba(210,71,38,0.2); color: white; }
.slide-stage { flex: 1; padding: 24px; display: flex; justify-content: center; align-items: center; background: #090d16; }
.slide-card { width: 100%; max-width: 520px; height: 280px; padding: 28px; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); transition: all 0.4s ease; display: flex; flex-direction: column; justify-content: center; }
.theme-navy { background: linear-gradient(135deg, #1e3a8a, #1e1b4b); color: white; }
.theme-orange { background: linear-gradient(135deg, #ea580c, #9a3412); color: white; }
.theme-dark { background: linear-gradient(135deg, #0f172a, #020617); color: white; border: 1px solid #334155; }
.slide-badge { font-size: 10px; font-weight: 800; letter-spacing: 0.15em; color: #fdba74; margin-bottom: 8px; }
.slide-card h1 { font-size: 22px; font-weight: 800; margin: 0 0 8px 0; }
.slide-card p { font-size: 12px; opacity: 0.9; margin-bottom: 12px; }
.slide-card ul { font-size: 11px; padding-left: 16px; margin: 0; line-height: 1.6; }`,
      js: `console.log("[MS PowerPoint Presentation Engine Ready]");
const card = document.getElementById('currentSlide');
document.getElementById('themeNavy')?.addEventListener('click', () => { if(card) card.className = "slide-card theme-navy"; });
document.getElementById('themeOrange')?.addEventListener('click', () => { if(card) card.className = "slide-card theme-orange"; });
document.getElementById('themeDark')?.addEventListener('click', () => { if(card) card.className = "slide-card theme-dark"; });
const slides = [
  { badge: "PRESENTATION SLIDE 1", h: "Mastering Executive Presentations", p: "Design sleek slides, apply Morph transitions, and present with confidence.", bullets: ["<strong>Rule of 6:</strong> Maximum 6 lines per slide, 6 words per line.", "<strong>Visual Hierarchy:</strong> Bold titles with high-contrast text.", "<strong>Smooth Animations:</strong> Use Morph for seamless movement."] },
  { badge: "PRESENTATION SLIDE 2", h: "Key Animations & Transitions", p: "Transform static bullet points into animated visual stories.", bullets: ["<strong>Morph Transition:</strong> Fluid object transformations.", "<strong>Animation Pane:</strong> Precise timing and entrance triggers.", "<strong>Presenter View:</strong> Secret notes visible only to speaker."] },
  { badge: "PRESENTATION SLIDE 3", h: "Export & Distribution", p: "Share your presentation across multiple formats.", bullets: ["<strong>PDF Export:</strong> Ideal for client handouts.", "<strong>MP4 Video:</strong> Render slides into high-res video presentations.", "<strong>Slide Master:</strong> One-click brand template updates."] }
];
function loadSlide(idx) {
  document.querySelectorAll('.thumb').forEach((t, i) => { if (i === idx) t.classList.add('active'); else t.classList.remove('active'); });
  const data = slides[idx];
  if (data) {
    const badge = document.querySelector('.slide-badge'); if (badge) badge.textContent = data.badge;
    const h = document.getElementById('slideHeading'); if (h) h.textContent = data.h;
    const p = document.getElementById('slideSub'); if (p) p.textContent = data.p;
    const ul = document.getElementById('slideBullets'); if (ul) ul.innerHTML = data.bullets.map(b => \`<li>\${b}</li>\`).join('');
  }
}
document.getElementById('thumb1')?.addEventListener('click', () => loadSlide(0));
document.getElementById('thumb2')?.addEventListener('click', () => loadSlide(1));
document.getElementById('thumb3')?.addEventListener('click', () => loadSlide(2));`
    };
  }

  if (normalized.includes('html')) {
    return {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>HTML Practice</title>
  </head>
  <body>
    <header className="site-header">
      <h1>Welcome to LearnHub HTML Studio</h1>
      <p>Build real web pages using structured semantic tags.</p>
    </header>
    <main>
      <section className="card">
        <h2>My First Component</h2>
        <p>HTML provides structure, meaning, and accessibility to web pages.</p>
        <button id="actionBtn">Click Me</button>
      </section>
    </main>
  </body>
</html>`,
      css: `body { font-family: system-ui, sans-serif; padding: 24px; background: #f8fafc; color: #0f172a; }
.site-header { margin-bottom: 24px; border-bottom: 2px solid #e2e8f0; pb: 12px; }
h1 { color: #2563eb; }
.card { background: white; padding: 20px; border-radius: 12px; border: 1px solid #cbd5e1; shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
button { background: #2563eb; color: white; border: none; padding: 10px 18px; border-radius: 6px; cursor: pointer; }
button:hover { background: #1d4ed8; }`,
      js: `console.log("HTML Exercise Ready");
document.getElementById('actionBtn')?.addEventListener('click', () => {
  alert('Great job! HTML element click event captured successfully.');
});`,
    };
  }

  if (normalized.includes('css') || normalized.includes('tailwind')) {
    return {
      html: `<div class="hero-container">
  <div class="badge">CSS Mastery</div>
  <h1 class="title">Design Modern Interfaces</h1>
  <p class="subtitle">Learn Flexbox, CSS Grid, animations, and responsive layouts.</p>
  <div class="button-group">
    <button class="btn btn-primary">Get Started</button>
    <button class="btn btn-secondary">Learn More</button>
  </div>
</div>`,
      css: `body { font-family: system-ui, sans-serif; background: #0f172a; color: white; display: flex; justify-content: center; align-items: center; min-height: 80vh; margin: 0; }
.hero-container { text-align: center; max-width: 500px; padding: 32px; background: #1e293b; border-radius: 20px; border: 1px solid #334155; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3); }
.badge { display: inline-block; padding: 6px 12px; background: rgba(59,130,246,0.2); color: #60a5fa; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 16px; }
.title { font-size: 28px; font-weight: 800; margin: 0 0 12px 0; background: linear-gradient(to right, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.subtitle { color: #94a3b8; font-size: 14px; margin-bottom: 24px; }
.button-group { display: flex; gap: 12px; justify-content: center; }
.btn { padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; }
.btn-primary { background: #2563eb; color: white; }
.btn-primary:hover { background: #1d4ed8; transform: translateY(-2px); }
.btn-secondary { background: #334155; color: #e2e8f0; }
.btn-secondary:hover { background: #475569; }`,
      js: `console.log("CSS Exercise Ready - Experiment with styles!");`,
    };
  }

  if (normalized.includes('javascript') || normalized.includes('typescript') || normalized.includes('js')) {
    return {
      html: `<div className="app-card">
  <h2>JavaScript Interactive Playground</h2>
  <div className="counter-box">
    <span id="counterValue">0</span>
  </div>
  <div className="btn-row">
    <button id="decBtn">- Decrease</button>
    <button id="resetBtn">Reset</button>
    <button id="incBtn">+ Increase</button>
  </div>
  <p id="statusText" className="status">Click buttons to mutate state.</p>
</div>`,
      css: `body { font-family: system-ui, sans-serif; padding: 32px; background: #f1f5f9; display: flex; justify-content: center; }
.app-card { background: white; padding: 28px; border-radius: 16px; width: 340px; text-align: center; border: 1px solid #e2e8f0; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
.counter-box { font-size: 48px; font-weight: 800; color: #2563eb; margin: 20px 0; }
.btn-row { display: flex; gap: 8px; justify-content: center; }
button { padding: 8px 14px; border-radius: 8px; border: 1px solid #cbd5e1; background: #f8fafc; font-weight: 600; cursor: pointer; transition: 0.2s; }
button:hover { background: #2563eb; color: white; border-color: #2563eb; }
.status { font-size: 12px; color: #64748b; margin-top: 16px; }`,
      js: `let count = 0;
const valueEl = document.getElementById('counterValue');
const statusEl = document.getElementById('statusText');

document.getElementById('incBtn').onclick = () => {
  count++;
  updateDisplay("Incremented counter");
};
document.getElementById('decBtn').onclick = () => {
  count--;
  updateDisplay("Decremented counter");
};
document.getElementById('resetBtn').onclick = () => {
  count = 0;
  updateDisplay("Reset counter to 0");
};

function updateDisplay(msg) {
  valueEl.textContent = count;
  statusEl.textContent = msg;
  console.log(\`[State Update] Counter = \${count}\`);
}`,
    };
  }

  if (normalized.includes('java') && !normalized.includes('script')) {
    return {
      html: `<div class="java-container">
  <h2>Java 21 JVM Environment</h2>
  <div class="terminal">
    <div class="code-line"><span class="kw">public class</span> <span class="cls">Main</span> {</div>
    <div class="code-line indent"><span class="kw">public static void</span> <span class="func">main</span>(String[] args) {</div>
    <div class="code-line indent-2">System.out.println(<span class="str">"Hello, Java 21 Masterclass!"</span>);</div>
    <div class="code-line indent-2"><span class="cls">Student</span> s = <span class="kw">new</span> <span class="cls">Student</span>(<span class="str">"Alex"</span>, <span class="str">"Java Backend"</span>);</div>
    <div class="code-line indent-2">System.out.println(s.getDetails());</div>
    <div class="code-line indent">}</div>
    <div class="code-line">}</div>
    <div class="output" id="javaOut">Output: Hello, Java 21 Masterclass!</div>
  </div>
  <button id="runJavaBtn">Run Java Virtual Machine (javac)</button>
</div>`,
      css: `body { font-family: monospace; background: #0f172a; color: #e2e8f0; padding: 24px; }
.java-container { max-width: 580px; margin: 0 auto; background: #1e293b; padding: 24px; border-radius: 16px; border: 1px solid #334155; }
.terminal { background: #090d16; padding: 18px; border-radius: 12px; font-size: 13px; line-height: 1.6; border: 1px solid #334155; margin: 16px 0; }
.kw { color: #f472b6; font-weight: bold; }
.cls { color: #38bdf8; }
.func { color: #fbbf24; }
.str { color: #4ade80; }
.indent { padding-left: 16px; }
.indent-2 { padding-left: 32px; }
.output { color: #38bdf8; border-top: 1px solid #334155; margin-top: 12px; pt: 8px; font-weight: bold; }
button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }`,
      js: `console.log("[Java JVM]: Initializing Java 21 runtime...");
document.getElementById('runJavaBtn').onclick = () => {
  document.getElementById('javaOut').textContent = "Output: Alex is enrolled in Java Backend Masterclass (Compiled & Executed cleanly with 0 errors)";
  console.log("Java Virtual Machine bytecode executed successfully.");
};`,
    };
  }

  if (normalized.includes('csharp') || normalized.includes('c#')) {
    return {
      html: `<div class="dotnet-container">
  <h2>C# .NET 8 Enterprise Console</h2>
  <div class="terminal">
    <code><span class="kw">using</span> System;<br/><br/><span class="kw">namespace</span> VeeruProAc.CSharp;<br/><span class="kw">class</span> <span class="cls">Program</span> {<br/>&nbsp;&nbsp;<span class="kw">static void</span> <span class="func">Main</span>() {<br/>&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(<span class="str">"C# .NET 8 Enterprise Console App"</span>);<br/>&nbsp;&nbsp;}<br/>}</code>
    <div id="csOut" class="output">Output: C# .NET 8 Enterprise Console App</div>
  </div>
  <button id="runCsBtn">Compile & Run C# (.NET SDK)</button>
</div>`,
      css: `body { font-family: monospace; background: #0d1117; color: white; padding: 24px; }
.dotnet-container { background: #161b22; padding: 24px; border-radius: 16px; max-width: 580px; margin: 0 auto; border: 1px solid #30363d; }
.terminal { background: #010409; padding: 18px; border-radius: 12px; font-size: 13px; margin: 16px 0; border: 1px solid #30363d; }
.kw { color: #ff7b72; font-weight: bold; }
.cls { color: #79c0ff; }
.func { color: #d2a8ff; }
.str { color: #a5d6ff; }
.output { color: #58a6ff; margin-top: 12px; border-top: 1px solid #30363d; pt: 8px; font-weight: bold; }
button { width: 100%; padding: 12px; background: #238636; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }`,
      js: `console.log("[.NET 8 SDK]: Ready");
document.getElementById('runCsBtn').onclick = () => {
  document.getElementById('csOut').textContent = "Output: C# .NET 8 Enterprise Console App [Process exited with code 0]";
  console.log("C# dotnet run command completed successfully.");
};`,
    };
  }

  if (normalized.includes('cplusplus') || normalized.includes('cpp') || normalized.includes('c++')) {
    return {
      html: `<div class="cpp-container">
  <h2>C++20 High-Performance Code Studio</h2>
  <div class="terminal">
    <code><span class="pp">#include</span> <span class="hdr">&lt;iostream&gt;</span><br/><span class="pp">#include</span> <span class="hdr">&lt;vector&gt;</span><br/><br/><span class="kw">int</span> <span class="func">main</span>() {<br/>&nbsp;&nbsp;std::cout &lt;&lt; <span class="str">"C++20 High Performance Engine"</span> &lt;&lt; std::endl;<br/>&nbsp;&nbsp;<span class="kw">return</span> 0;<br/>}</code>
    <div id="cppOut" class="output">Output: C++20 High Performance Engine</div>
  </div>
  <button id="runCppBtn">Compile & Execute (g++ -O3)</button>
</div>`,
      css: `body { font-family: monospace; background: #0f172a; color: white; padding: 24px; }
.cpp-container { background: #1e293b; padding: 24px; border-radius: 16px; max-width: 580px; margin: 0 auto; border: 1px solid #334155; }
.terminal { background: #090d16; padding: 18px; border-radius: 12px; font-size: 13px; margin: 16px 0; border: 1px solid #334155; }
.pp { color: #f472b6; }
.hdr { color: #4ade80; }
.kw { color: #38bdf8; font-weight: bold; }
.func { color: #fbbf24; }
.str { color: #4ade80; }
.output { color: #38bdf8; margin-top: 12px; border-top: 1px solid #334155; pt: 8px; font-weight: bold; }
button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }`,
      js: `console.log("[GCC g++]: C++20 compiler initialized.");
document.getElementById('runCppBtn').onclick = () => {
  document.getElementById('cppOut').textContent = "Output: C++20 High Performance Engine (Execution time: 0.0012s, Memory: 1.4MB)";
  console.log("C++ binary compiled and executed cleanly.");
};`,
    };
  }

  if (normalized.includes('sql') || normalized.includes('postgres') || normalized.includes('mongo')) {
    return {
      html: `<div class="sql-container">
  <h2>Database Query Terminal (${courseName})</h2>
  <div class="terminal">
    <div class="line"><span class="kw">SELECT</span> id, username, email, created_at</div>
    <div class="line"><span class="kw">FROM</span> users</div>
    <div class="line"><span class="kw">WHERE</span> status = <span class="str">'ACTIVE'</span></div>
    <div class="line"><span class="kw">ORDER BY</span> id <span class="kw">DESC</span> <span class="kw">LIMIT</span> 5;</div>
    <div id="sqlOut" class="output">Rows Returned: 5 Records Found in 4ms</div>
  </div>
  <button id="runSqlBtn">Execute SQL Database Query</button>
</div>`,
      css: `body { font-family: monospace; background: #0b132b; color: white; padding: 24px; }
.sql-container { background: #1c2541; padding: 24px; border-radius: 16px; max-width: 580px; margin: 0 auto; border: 1px solid #3a506b; }
.terminal { background: #0b132b; padding: 18px; border-radius: 12px; font-size: 13px; line-height: 1.6; margin: 16px 0; border: 1px solid #3a506b; }
.kw { color: #5bc0be; font-weight: bold; }
.str { color: #6fffe9; }
.output { color: #6fffe9; margin-top: 12px; border-top: 1px solid #3a506b; pt: 8px; font-weight: bold; }
button { width: 100%; padding: 12px; background: #5bc0be; color: #0b132b; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }`,
      js: `console.log("Database Connection Pool Active.");
document.getElementById('runSqlBtn').onclick = () => {
  document.getElementById('sqlOut').textContent = "Query Result: [User#1: Alex, User#2: Sarah, User#3: David] — Query Time: 3.2ms";
  console.log("SQL query executed successfully.");
};`,
    };
  }

  return {
    html: `<div class="practice-box">
  <h1>${courseName} Interactive Playground</h1>
  <p>Learn core syntax, practical architecture, and real-world implementation step by step.</p>
  <button id="demoBtn">Run ${courseName} Code Demo</button>
  <div id="demoOutput" class="output-box">Output ready...</div>
</div>`,
    css: `body { font-family: system-ui, sans-serif; padding: 32px; background: #f8fafc; color: #0f172a; }
.practice-box { background: white; padding: 32px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); max-width: 500px; margin: 0 auto; text-align: center; }
h1 { color: #2563eb; font-size: 24px; margin-bottom: 12px; }
p { color: #64748b; font-size: 14px; margin-bottom: 24px; }
button { background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }
button:hover { background: #1d4ed8; }
.output-box { margin-top: 20px; padding: 14px; background: #f1f5f9; border-radius: 8px; font-family: monospace; font-size: 13px; color: #0f172a; border: 1px solid #cbd5e1; }`,
    js: `document.getElementById('demoBtn').onclick = () => {
  document.getElementById('demoOutput').textContent = \`✓ ${courseName} code executed successfully at \${new Date().toLocaleTimeString()}\`;
  console.log("${courseName} exercise initialized cleanly.");
};`,
  };
};

const RICH_COURSES = {
  HTML: {
    title: 'HTML',
    summary: 'Master the fundamental structure, semantic elements, and accessibility of web pages.',
    intro: 'HTML (HyperText Markup Language) is the backbone of web development. Learn how to structure text, links, images, tables, forms, and layout regions using semantic HTML5 elements.',
    editorStarter: getEditorStarter('HTML'),
    exercises: [
      'Build a complete personal bio page using semantic header, main, section, and footer tags.',
      'Create an interactive contact form with text, email, text area, and submit input fields.',
      'Construct an accessible navigation bar with an unordered list and clickable internal anchors.',
    ],
    quizzes: [
      { id: 1, q: 'Which HTML5 tag is used to specify a footer for a document or section?', options: ['<bottom>', '<footer>', '<section>', '<div>'], correct: 1 },
      { id: 2, q: 'What is the correct HTML element for inserting a line break?', options: ['<break>', '<lb>', '<br>', '<hr>'], correct: 2 },
      { id: 3, q: 'Which semantic tag is used to define navigation links?', options: ['<nav>', '<navigate>', '<menu>', '<links>'], correct: 0 },
      { id: 4, q: 'How can you open a link in a new tab/browser window?', options: ['<a href="url" new>', '<a href="url" target="new">', '<a href="url" target="_blank">', '<a href="url" blank>'], correct: 2 },
      { id: 5, q: 'Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?', options: ['alt', 'title', 'src', 'longdesc'], correct: 0 }
    ],
    modules: [
      {
        title: 'Module 1: HTML5 Foundations & Semantics',
        summary: 'Learn the core building blocks of the web, focusing on correct semantic markup, text formatting, and accessible content structures.',
        lessons: [
          {
            title: 'Lesson 1: Intro to Web Structure & Tags',
            duration: '10m',
            summary: 'Learn how HTML documents are structured and how tags create web elements.',
            details: 'Understand standard document boilerplate (<!DOCTYPE html>, <html>, <head>, <body>), tag syntax, attributes, and element nesting.',
            codeExample: `<!DOCTYPE html>\n<html>\n  <head><title>My Page</title></head>\n  <body>\n    <h1>Welcome to HTML5</h1>\n    <p>HTML provides semantic markup for web browsers.</p>\n  </body>\n</html>`,
            exercisePrompt: 'Create a valid HTML document containing an h1 heading, h2 subhead, and two paragraphs of text.',
          },
          {
            title: 'Lesson 2: Text Formatting, Headings & Links',
            duration: '12m',
            summary: 'Format text content and connect pages with hyperlinks.',
            details: 'Use heading hierarchy (h1 through h6), paragraph tags, emphasis (strong, em), and hyperlinks (a tag with href and target attributes).',
            codeExample: `<h1>Web Development</h1>\n<p>Learn more at <a href="https://learnhub.org" target="_blank">LearnHub Academy</a>.</p>`,
            exercisePrompt: 'Add two headings, a bold phrase, an italicized term, and an outbound link to an external website.',
          },
          {
            title: 'Lesson 3: Images, Media & Captions',
            duration: '14m',
            summary: 'Embed responsive images, audio, video, and figures with alt text.',
            details: 'Master the img tag, alt attributes for web accessibility, figure and figcaption elements, and video/audio tags.',
            codeExample: `<figure>\n  <img src="developer.jpg" alt="Developer coding at desk" width="400" />\n  <figcaption>Figure 1: Full-stack developer at work.</figcaption>\n</figure>`,
            exercisePrompt: 'Embed an image with descriptive alt text wrapped inside a figure element with a caption.',
          },
        ],
      },
      {
        title: 'Module 1.5: Environment Setup & Installation',
        summary: 'Learn how to install and configure the necessary tools for HTML & CSS development.',
        lessons: [
          {
            title: 'Installing Visual Studio Code',
            duration: '15m',
            summary: 'Set up your code editor.',
            details: 'Download Visual Studio Code from the [official website](https://code.visualstudio.com/). Install the "Live Server" extension to preview your HTML files in real-time.',
            codeExample: 'N/A',
            exercisePrompt: 'Download VS Code, install it, and add the Live Server extension.'
          }
        ]
      },
      {
        title: 'Module 2: Forms, Tables & Advanced Layout',
        summary: 'Master interactive data collection forms, tabular data display, and combining semantic regions for fully-fledged page layouts.',
        lessons: [
          {
            title: 'Lesson 4: Forms & Input Validation',
            duration: '16m',
            summary: 'Collect user data using HTML forms, inputs, labels, and validation attributes.',
            details: 'Explore input types (text, email, password, number, checkbox, radio), label associations, required fields, and placeholder text.',
            codeExample: `<form action="/submit" method="POST">\n  <label for="username">Username:</label>\n  <input type="text" id="username" name="username" required />\n  <button type="submit">Register</button>\n</form>`,
            exercisePrompt: 'Build a user registration form containing Name, Email, Password, Terms Checkbox, and Submit Button.',
          },
          {
            title: 'Lesson 5: Lists, Tables & Semantic Regions',
            duration: '15m',
            summary: 'Organize tabular data and section web pages with semantic layout tags.',
            details: 'Construct ordered/unordered lists, structured data tables (thead, tbody, tr, th, td), and semantic containers (header, nav, main, section, article, footer).',
            codeExample: `<table>\n  <thead><tr><th>Skill</th><th>Level</th></tr></thead>\n  <tbody><tr><td>HTML5</td><td>Expert</td></tr></tbody>\n</table>`,
            exercisePrompt: 'Create a data table displaying 3 course names, durations, and skill levels with proper table headers.',
          },
        ],
      },
    ],
  },

  CSS: {
    title: 'CSS',
    summary: 'Style websites with modern layouts, vibrant color palettes, Flexbox, Grid, and responsive design.',
    intro: 'CSS (Cascading Style Sheets) brings web pages to life. Master selectors, box model geometry, Flexbox, CSS Grid layout systems, typography, transitions, and responsive media queries.',
    editorStarter: getEditorStarter('CSS'),
    exercises: [
      'Style a responsive product pricing card with custom borders, rounded corners, and hover shadows.',
      'Create a two-column responsive layout using Flexbox that stacks on mobile viewports.',
      'Design a multi-item photo gallery grid using CSS Grid and smooth transform animations.',
    ],
    quizzes: [
      { id: 1, q: 'Where in an HTML document is the correct place to refer to an external style sheet?', options: ['At the end of the document', 'In the <head> section', 'In the <body> section', 'Inside a <script> tag'], correct: 1 },
      { id: 2, q: 'Which HTML tag is used to define an internal style sheet?', options: ['<css>', '<script>', '<style>', '<design>'], correct: 2 },
      { id: 3, q: 'Which CSS property controls the text size?', options: ['font-size', 'text-size', 'font-style', 'text-style'], correct: 0 },
      { id: 4, q: 'How do you select an element with id "demo"?', options: ['.demo', '*demo', '#demo', 'demo'], correct: 2 },
      { id: 5, q: 'Which property is used to change the background color?', options: ['color', 'bgcolor', 'background-color', 'background'], correct: 2 }
    ],
    modules: [
      {
        title: 'Module 1: CSS Selectors & Box Model',
        summary: 'Dive into the fundamentals of styling, mastering selectors, specificity, colors, typography, and how the box model dictates element size and spacing.',
        lessons: [
          {
            title: 'Lesson 1: Selectors, Specificity & Colors',
            duration: '12m',
            summary: 'Target HTML elements with CSS selectors and apply colors, fonts, and backgrounds.',
            details: 'Understand element, class, ID, and attribute selectors. Master HSL, RGB, and Hex color formats, line height, and font families.',
            codeExample: `.card {\n  background-color: #ffffff;\n  color: #1e293b;\n  font-family: 'Inter', sans-serif;\n}`,
            exercisePrompt: 'Write CSS selectors to style a card component with a primary blue background and white text.',
          },
          {
            title: 'Lesson 2: The CSS Box Model',
            duration: '14m',
            summary: 'Master content, padding, border, and margin dimensions.',
            details: 'Learn how elements consume space on the screen. Enforce box-sizing: border-box for consistent element layout calculations.',
            codeExample: `* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid #cbd5e1;\n  margin: 16px auto;\n}`,
            exercisePrompt: 'Create a centered container box with 24px internal padding, a soft gray border, and 32px vertical margin.',
          },
        ],
      },
      {
        title: 'Module 1.5: Environment Setup & Installation',
        summary: 'Learn how to install and configure the necessary tools for CSS development.',
        lessons: [
          {
            title: 'Installing Visual Studio Code',
            duration: '15m',
            summary: 'Set up your code editor.',
            details: 'Download Visual Studio Code from the [official website](https://code.visualstudio.com/). It is the standard editor for web development.',
            codeExample: 'N/A',
            exercisePrompt: 'Download VS Code and install it.'
          }
        ]
      },
      {
        title: 'Module 2: Layout Systems & Responsiveness',
        summary: 'Learn modern layout techniques using Flexbox and CSS Grid, and build fluid designs that look great on any device using media queries.',
        lessons: [
          {
            title: 'Lesson 3: Flexbox Mastery',
            duration: '18m',
            summary: 'Build flexible 1D layouts using display: flex, justify-content, and align-items.',
            details: 'Align components along main and cross axes. Master flex-direction, flex-wrap, gap, and flex-grow properties.',
            codeExample: `.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n}`,
            exercisePrompt: 'Build a top navigation bar with a logo on the left and navigation links spaced evenly on the right using Flexbox.',
          },
          {
            title: 'Lesson 4: CSS Grid & Responsive Media Queries',
            duration: '20m',
            summary: 'Design 2D grid layouts and adapt designs across mobile, tablet, and desktop screens.',
            details: 'Use grid-template-columns, fr units, auto-fit, minmax, and @media queries for fluid responsiveness.',
            codeExample: `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n}`,
            exercisePrompt: 'Build a responsive card grid that displays 3 columns on desktop screens and collapses to 1 column on mobile.',
          },
        ],
      },
    ],
  },

  JavaScript: {
    title: 'JavaScript',
    summary: 'Add dynamic interactivity, logic, API fetching, and state management to web applications.',
    intro: 'JavaScript is the programming language of the web. Learn variables, data structures, functions, DOM manipulation, asynchronous programming, and modern ES6+ concepts through hands-on exercises.',
    editorStarter: getEditorStarter('JavaScript'),
    exercises: [
      'Write a program that filters an array of numbers and returns only even values doubled.',
      'Create an interactive counter component that updates the browser DOM dynamically when clicked.',
      'Fetch user data from a mock API using async/await and render it cleanly into an HTML list.',
    ],
    modules: [
      {
        title: 'Module 1: JS Basics, Scope & Functions',
        summary: 'Grasp the foundational logic of JavaScript, including variables, data types, control flow, functions, and powerful array manipulation methods.',
        lessons: [
          {
            title: 'Lesson 1: Variables, Types & Logic',
            duration: '14m',
            summary: 'Learn const, let, primitive types, and conditional logic.',
            details: 'Master block scoping with const and let, string interpolation, booleans, and if/else control flow.',
            codeExample: `const username = "Alex";\nlet score = 85;\nif (score >= 80) {\n  console.log(\`Great job \${username}, you passed!\`);\n}`,
            exercisePrompt: 'Declare variables for user name and score, and write a condition checking if the score is greater than 50.',
          },
          {
            title: 'Lesson 2: Array Methods & Functional Iteration',
            duration: '16m',
            summary: 'Transform and filter datasets using map, filter, reduce, and forEach.',
            details: 'Work with arrays of objects. Use arrow functions to cleanly transform and aggregate data without mutating original arrays.',
            codeExample: `const prices = [10, 20, 30, 40];\nconst discounted = prices.map(p => p * 0.9);\nconst cheap = discounted.filter(p => p < 25);`,
            exercisePrompt: 'Take an array of course prices, apply a 20% discount using .map(), and filter out prices over $50.',
          },
        ],
      },
      {
        title: 'Module 1.5: Environment Setup & Installation',
        summary: 'Learn how to install Node.js and a code editor for JavaScript development.',
        lessons: [
          {
            title: 'Installing Node.js & VS Code',
            duration: '20m',
            summary: 'Set up your JavaScript environment.',
            details: 'Download [Node.js](https://nodejs.org/) and [Visual Studio Code](https://code.visualstudio.com/). Node.js allows you to run JS outside the browser.',
            codeExample: 'N/A',
            exercisePrompt: 'Install Node.js and verify the installation by running "node -v" in your terminal.'
          }
        ]
      },
      {
        title: 'Module 2: DOM Events & Asynchronous JS',
        summary: 'Bring your pages to life by manipulating the DOM, listening to user events, and fetching remote data using modern async/await patterns.',
        lessons: [
          {
            title: 'Lesson 3: DOM Selection & Event Listeners',
            duration: '18m',
            summary: 'Select HTML elements, modify styles, text, and react to user events.',
            details: 'Use document.querySelector, element.classList, and addEventListener to create dynamic user interfaces.',
            codeExample: `const btn = document.querySelector('#submitBtn');\nbtn.addEventListener('click', (e) => {\n  document.body.classList.toggle('dark-mode');\n});`,
            exercisePrompt: 'Select a button element and add a click event listener that toggles a dark theme CSS class on the body.',
          },
          {
            title: 'Lesson 4: Async/Await & Promises',
            duration: '22m',
            summary: 'Fetch data asynchronously from web APIs using Promises and async/await.',
            details: 'Handle asynchronous network requests, parse JSON responses, and catch HTTP errors cleanly.',
            codeExample: `async function loadData() {\n  try {\n    const res = await fetch('https://api.example.com/data');\n    const data = await res.json();\n    console.log(data);\n  } catch (err) {\n    console.error('Fetch error:', err);\n  }\n}`,
            exercisePrompt: 'Write an async function that fetches a remote user list, parses JSON, and logs the results to the console.',
          },
        ],
      },
    ],
  },

  Python: {
    title: 'Python',
    summary: 'Master Python syntax, data structures, object-oriented programming, and file automation.',
    intro: 'Python is a versatile, beginner-friendly programming language widely used in web backend development, data analysis, automation, and AI. Learn fundamental syntax, functions, modules, and OOP.',
    editorStarter: getEditorStarter('Python'),
    exercises: [
      'Write a function that accepts a sentence string and returns a dictionary with word frequency counts.',
      'Create a BankAccount class with deposit, withdraw, and check_balance methods.',
      'Read data from a list of user tuples and filter users over age 21.',
    ],
    modules: [
      {
        title: 'Module 1: Python Fundamentals & Data Structures',
        summary: 'Understand Python syntax, core data types, logic branching, and versatile collections like lists, dictionaries, and tuples.',
        lessons: [
          {
            title: 'Lesson 1: Variables, Expressions & Control Flow',
            duration: '12m',
            summary: 'Understand Python syntax, indentation, variables, and logic branching.',
            details: 'Learn dynamically typed variables, string formatting (f-strings), if/elif/else blocks, and while/for loops.',
            codeExample: `name = "Python Student"\nage = 24\nif age >= 18:\n    print(f"{name} is an adult learner.")`,
            exercisePrompt: 'Write a Python script that takes a score value and prints grade letters A, B, C, or F based on conditions.',
          },
          {
            title: 'Lesson 2: Lists, Tuples & Dictionaries',
            duration: '15m',
            summary: 'Organize data using Python collections and list comprehensions.',
            details: 'Master mutable lists, immutable tuples, key-value dictionaries, and concise list comprehensions.',
            codeExample: `nums = [1, 2, 3, 4, 5]\nsquares = [n**2 for n in nums if n % 2 != 0]\nprint(squares)  # [1, 9, 25]`,
            exercisePrompt: 'Create a dictionary storing course titles as keys and student counts as values. Write a loop printing key-value pairs.',
          },
        ],
      },
      {
        title: 'Module 1.5: Environment Setup & Installation',
        summary: 'Learn how to install Python and configure your development environment.',
        lessons: [
          {
            title: 'Installing Python',
            duration: '20m',
            summary: 'Download and install Python.',
            details: 'Download Python from the [official website](https://www.python.org/downloads/). Make sure to check the box "Add Python to PATH" during installation.',
            codeExample: 'N/A',
            exercisePrompt: 'Install Python and verify by running "python --version" in your terminal.'
          }
        ]
      },
      {
        title: 'Module 2: Functions & Object-Oriented Python',
        summary: 'Organize your Python code with custom functions, modular design, and robust object-oriented programming architectures.',
        lessons: [
          {
            title: 'Lesson 3: Custom Functions & Scope',
            duration: '14m',
            summary: 'Define reusable functions with positional, keyword, and default parameters.',
            details: 'Learn def syntax, return statements, *args, **kwargs, and docstrings for modular code development.',
            codeExample: `def calculate_total(price, tax_rate=0.08, discount=0):\n    return (price - discount) * (1 + tax_rate)\n\nprint(calculate_total(100, discount=10))`,
            exercisePrompt: 'Write a function calculate_bmi(weight_kg, height_m) that returns the body mass index formatted to 2 decimals.',
          },
          {
            title: 'Lesson 4: Classes & Object-Oriented Design',
            duration: '18m',
            summary: 'Build custom object types using class definitions, __init__, and inheritance.',
            details: 'Master class constructors, instance attributes, methods, encapsulation, and class inheritance.',
            codeExample: `class Student:\n    def __init__(self, name, course):\n        self.name = name\n        self.course = course\n    def get_info(self):\n        return f"{self.name} is enrolled in {self.course}"`,
            exercisePrompt: 'Define a Course class with title and duration attributes, and a get_summary() method returning course details.',
          },
        ],
      },
    ],
  },

  React: {
    title: 'React',
    summary: 'Build fast, component-driven user interfaces using modern React 18, JSX, and Hooks.',
    intro: 'React is the world\'s leading UI framework. Learn functional components, props, state management with useState, side effects with useEffect, custom hooks, and clean component patterns.',
    editorStarter: getEditorStarter('React'),
    exercises: [
      'Create a reusable Button component accepting variant, size, and onClick props.',
      'Build a todo item list component that allows adding, toggling, and deleting items.',
      'Fetch data from an endpoint on component mount using useEffect and display a loading spinner.',
    ],
    modules: [
      {
        title: 'Module 1: Components, JSX & Props',
        summary: 'Learn the core concepts of React: writing JSX markup, composing reusable components, and managing state with the useState Hook.',
        lessons: [
          {
            title: 'Lesson 1: Intro to React & JSX',
            duration: '14m',
            summary: 'Understand JSX markup, component structure, and Virtual DOM rendering.',
            details: 'Write clean functional components, embed JavaScript expressions in JSX, and structure component files.',
            codeExample: `function Greeting({ name }) {\n  return <h2 className="text-xl font-bold">Hello, {name}!</h2>;\n}`,
            exercisePrompt: 'Create a Card component that accepts title and description props and renders them inside a styled div.',
          },
          {
            title: 'Lesson 2: State Management with useState',
            duration: '16m',
            summary: 'Make components reactive using the useState Hook.',
            details: 'Manage local state, trigger UI re-renders, and update state arrays/objects immutably.',
            codeExample: `import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;\n}`,
            exercisePrompt: 'Build a LikeButton component that tracks like count and toggles an active state on click.',
          },
        ],
      },
      {
        title: 'Module 1.5: Environment Setup & Installation',
        summary: 'Learn how to install Node.js and create a React app.',
        lessons: [
          {
            title: 'Installing Node.js and Vite',
            duration: '25m',
            summary: 'Set up your React development environment.',
            details: 'Download [Node.js](https://nodejs.org/). Then, create a new React app using Vite by running "npm create vite@latest my-app -- --template react" in your terminal.',
            codeExample: 'N/A',
            exercisePrompt: 'Install Node.js and create a new React project using Vite.'
          }
        ]
      },
    ],
  },

  'Full-Stack-MERN-Python-Masterclass': {
    title: 'Full Stack MERN & Python Masterclass',
    summary: 'The ultimate zero-to-hero engineering path covering Frontend, Backend, Databases, and Python Scripting.',
    intro: 'This comprehensive PRO masterclass combines the power of the MERN stack (MongoDB, Express, React, Node.js) with the data crunching capabilities of Python. You will build production-ready applications from scratch.',
    editorStarter: getEditorStarter('React'),
    exercises: [
      'Build a responsive web layout using HTML and CSS.',
      'Develop an interactive React single-page application.',
      'Create a robust REST API using Node.js and Express.',
      'Design a MongoDB database schema and connect it to your backend.',
      'Write Python scripts for data analysis and backend automation.'
    ],
    modules: [
      {
        title: 'Module 1: Frontend Fundamentals (HTML & CSS)',
        summary: 'Master the visual building blocks of the web.',
        lessons: [
          { title: 'Semantic HTML5', duration: '15m', summary: 'Structure web pages correctly.', details: 'Learn core HTML tags and accessibility.', codeExample: '<h1>Hello World</h1>' },
          { title: 'CSS Layouts & Styling', duration: '20m', summary: 'Style pages with Flexbox and Grid.', details: 'Responsive design principles.', codeExample: '.flex { display: flex; }' }
        ]
      },
      {
        title: 'Module 1.5: Environment Setup & Installation',
        summary: 'Install Node.js, Python, MongoDB, and VS Code.',
        lessons: [
          {
            title: 'Installing Full-Stack Tools',
            duration: '45m',
            summary: 'Complete development environment setup.',
            details: 'Download [Node.js](https://nodejs.org/), [Python](https://www.python.org/downloads/), [MongoDB Community Server](https://www.mongodb.com/try/download/community), and [VS Code](https://code.visualstudio.com/).',
            codeExample: 'N/A',
            exercisePrompt: 'Install all required tools and verify their versions in the terminal.'
          }
        ]
      },
      {
        title: 'Module 2: Interactive UIs with React',
        summary: 'Build dynamic frontend applications.',
        lessons: [
          { title: 'React Components & Props', duration: '25m', summary: 'Create reusable UI parts.', details: 'JSX syntax and functional components.', codeExample: 'const App = () => <div>App</div>;' },
          { title: 'State Management & Hooks', duration: '30m', summary: 'Manage component data.', details: 'useState and useEffect.', codeExample: 'const [state, setState] = useState();' }
        ]
      },
      {
        title: 'Module 3: Backend Engineering (Node.js & Python)',
        summary: 'Develop server-side logic and APIs.',
        lessons: [
          { title: 'Node.js & Express APIs', duration: '35m', summary: 'Build scalable REST APIs.', details: 'Routing, middleware, and request handling.', codeExample: 'app.get("/", (req, res) => res.send("OK"));' },
          { title: 'Python Automation', duration: '30m', summary: 'Scripting and data processing.', details: 'Python syntax for backend tasks.', codeExample: 'print("Backend Python Script")' }
        ]
      },
      {
        title: 'Module 4: Database Design (MongoDB)',
        summary: 'Persist data using NoSQL databases.',
        lessons: [
          { title: 'NoSQL & Mongoose', duration: '25m', summary: 'Design document schemas.', details: 'Connecting Node.js to MongoDB.', codeExample: 'const User = mongoose.model("User", schema);' }
        ]
      }
    ]
  },

  'Web-Engineering-Pro-Masterclass': {
    title: 'Web Engineering Pro Masterclass',
    summary: 'Master advanced web technologies and frontend architecture.',
    intro: 'Elevate your frontend skills to a senior level. Dive deep into advanced JavaScript, performance optimization, React architecture, and modern CSS frameworks.',
    editorStarter: getEditorStarter('JavaScript'),
    exercises: [
      'Optimize a sluggish web application for high performance.',
      'Implement an advanced state management system in React.',
      'Build a complex CSS Grid layout with smooth animations.'
    ],
    modules: [
      {
        title: 'Module 1: Advanced HTML/CSS',
        summary: 'Next-level styling and semantic structure.',
        lessons: [
          { title: 'CSS Grid & Animations', duration: '20m', summary: 'Complex layouts and movement.', details: 'Keyframes and grid templates.', codeExample: '@keyframes fade { to { opacity: 1; } }' }
        ]
      },
      {
        title: 'Module 1.5: Environment Setup & Installation',
        summary: 'Install advanced tools for web engineering.',
        lessons: [
          {
            title: 'Installing Node.js & Tools',
            duration: '20m',
            summary: 'Set up advanced frontend tooling.',
            details: 'Download [Node.js](https://nodejs.org/) and install [VS Code](https://code.visualstudio.com/).',
            codeExample: 'N/A',
            exercisePrompt: 'Ensure you have Node.js version 18+ installed.'
          }
        ]
      },
      {
        title: 'Module 2: Vanilla JavaScript Deep Dive',
        summary: 'Understand JS under the hood.',
        lessons: [
          { title: 'Closures & Prototypes', duration: '25m', summary: 'Advanced JS concepts.', details: 'Lexical scope and inheritance.', codeExample: 'function makeCounter() { let count = 0; return () => count++; }' }
        ]
      },
      {
        title: 'Module 3: React Architecture',
        summary: 'Scale your React apps.',
        lessons: [
          { title: 'Custom Hooks & Context', duration: '30m', summary: 'Global state and reusable logic.', details: 'React Context API.', codeExample: 'const MyContext = createContext();' }
        ]
      }
    ]
  },

  'AI-Data-Science-Specialist-Track': {
    title: 'AI & Data Science Specialist Track',
    summary: 'Learn Python data analysis, machine learning, and AI fundamentals.',
    intro: 'Enter the world of Artificial Intelligence. Use Python to manipulate massive datasets, build predictive models, and train neural networks.',
    editorStarter: getEditorStarter('Python'),
    exercises: [
      'Clean and analyze a dataset using Pandas.',
      'Train a machine learning model using Scikit-Learn.',
      'Build a simple neural network with TensorFlow.'
    ],
    modules: [
      {
        title: 'Module 1: Python for Data',
        summary: 'Data manipulation basics.',
        lessons: [
          { title: 'Pandas & NumPy', duration: '25m', summary: 'Dataframes and arrays.', details: 'Handling CSVs and numerical data.', codeExample: 'import pandas as pd' }
        ]
      },
      {
        title: 'Module 1.5: Environment Setup & Installation',
        summary: 'Install Python and Data Science libraries.',
        lessons: [
          {
            title: 'Installing Python & Anaconda',
            duration: '30m',
            summary: 'Set up Python for Data Science.',
            details: 'We recommend installing [Anaconda](https://www.anaconda.com/products/distribution) as it includes Python and essential data science libraries like Pandas, NumPy, and Jupyter Notebook.',
            codeExample: 'N/A',
            exercisePrompt: 'Install Anaconda and launch a Jupyter Notebook.'
          }
        ]
      },
      {
        title: 'Module 2: Machine Learning',
        summary: 'Predictive modeling.',
        lessons: [
          { title: 'Scikit-Learn Basics', duration: '35m', summary: 'Training models.', details: 'Linear regression and classification.', codeExample: 'model.fit(X_train, y_train)' }
        ]
      },
      {
        title: 'Module 3: Deep Learning',
        summary: 'Neural networks.',
        lessons: [
          { title: 'Neural Nets with PyTorch', duration: '40m', summary: 'Building deep models.', details: 'Tensors and backpropagation.', codeExample: 'import torch' }
        ]
      }
    ]
  },

  'MS Word': {
    title: 'MS Word',
    summary: 'Master Microsoft Word from foundational document creation to professional document layout, automated styles, Mail Merge, and collaboration tools.',
    intro: 'Microsoft Word is the global benchmark for word processing. Learn typography formatting, paragraph spacing, section breaks, automated Table of Contents, custom headers/footers, and Mail Merge with Excel data.',
    editorStarter: getEditorStarter('MS Word'),
    exercises: [
      'Format an executive proposal with custom heading styles, line spacing, and paragraph indentation.',
      'Generate an automated Table of Contents and add page numbering with section breaks.',
      'Configure a Mail Merge operation connecting a Word template to an Excel subscriber list.'
    ],
    modules: [
      {
        title: 'Module 1: MS Word Interface & Core Document Creation',
        summary: 'Understand the Ribbon layout, Backstage view, margins, font formatting, and text alignment.',
        lessons: [
          {
            title: 'Lesson 1: Ribbon Navigation & Page Setup',
            duration: '15m',
            summary: 'Learn Ribbon tabs, Quick Access Toolbar, and page margins.',
            details: 'Master document orientation (Portrait vs Landscape), custom margins, page size selection (A4, Letter), and ruler controls.',
            codeExample: 'Ribbon Layout: Home -> Layout -> Margins (Normal: Top 1", Left 1") -> Orientation (Portrait)',
            exercisePrompt: 'Set up a new document in A4 format with 1-inch custom margins and enable the View Ruler.'
          },
          {
            title: 'Lesson 2: Typography & Character Formatting',
            duration: '18m',
            summary: 'Format font families, font sizes, colors, highlight, bold/italic, and superscript/subscript.',
            details: 'Explore font pairings, character spacing, subscript/superscript (Ctrl+= / Ctrl+Shift+=), text effects, and the Format Painter tool (Ctrl+Shift+C / Ctrl+Shift+V).',
            codeExample: 'Shortcuts: Bold (Ctrl+B), Italic (Ctrl+I), Underline (Ctrl+U), Change Case (Shift+F3)',
            exercisePrompt: 'Apply font styles to an executive memo title using Format Painter to copy styles across headers.'
          }
        ]
      },
      {
        title: 'Module 2: Paragraph Styles & Advanced Document Layout',
        summary: 'Use Heading Styles, Line Spacing, Bullet Lists, and Section Breaks.',
        lessons: [
          {
            title: 'Lesson 3: Heading Styles & Automated Table of Contents',
            duration: '22m',
            summary: 'Apply Heading 1, Heading 2, Heading 3, and insert automated TOC.',
            details: 'Styles ensure visual consistency and drive navigation panes. Learn to insert a dynamic Table of Contents via References -> Table of Contents.',
            codeExample: 'Apply Style: Home -> Styles -> Heading 1 (Ctrl+Alt+1)\nInsert TOC: References -> Table of Contents -> Automatic Table 1',
            exercisePrompt: 'Assign Heading 1 and Heading 2 styles to 4 section titles and generate an automated Table of Contents.'
          },
          {
            title: 'Lesson 4: Section Breaks, Headers & Footers',
            duration: '25m',
            summary: 'Manage section breaks (Next Page) for unlinked headers and page numbering.',
            details: 'Understand the difference between Page Breaks and Section Breaks. Unlink headers ("Link to Previous") to restart page numbering from Page 1 on Chapter 1.',
            codeExample: 'Insert Break: Layout -> Breaks -> Section Breaks (Next Page)\nUnlink Footer: Header & Footer Tools -> Deselect "Link to Previous"',
            exercisePrompt: 'Insert a Section Break before Chapter 1 and configure page numbers starting at 1 on Chapter 1.'
          }
        ]
      },
      {
        title: 'Module 3: Tables, Media & Mail Merge Automation',
        summary: 'Build formatted tables, insert SmartArt diagrams, and automate Mail Merge.',
        lessons: [
          {
            title: 'Lesson 5: Tables, SmartArt & Graphics Wrapping',
            duration: '20m',
            summary: 'Format data tables, alignment, shading, and text wrapping around images.',
            details: 'Insert tables, adjust cell padding, merge/split cells, apply table styles, and configure image text wrapping (Square, Tight, In Front of Text).',
            codeExample: 'Insert Table: Insert -> Table (3x4)\nText Wrapping: Picture Format -> Wrap Text -> Square',
            exercisePrompt: 'Create a 4-column pricing table with alternating row colors and custom header cell shading.'
          },
          {
            title: 'Lesson 6: Mail Merge & Team Collaboration',
            duration: '30m',
            summary: 'Perform Mail Merge with Excel data and manage Track Changes with comments.',
            details: 'Automate customized mass letters/emails using Mailings -> Start Mail Merge -> Select Recipients (Excel sheet). Use Review -> Track Changes for team editing.',
            codeExample: 'Mail Merge: Mailings -> Select Recipients -> Use Existing List (clients.xlsx) -> Insert Merge Field (<<FirstName>>)',
            exercisePrompt: 'Configure a Mail Merge letter with dynamic fields for Name, Address, and Account Balance.'
          }
        ]
      }
    ]
  },

  'MS Excel': {
    title: 'MS Excel',
    summary: 'Master Microsoft Excel from formulas (SUM, VLOOKUP, XLOOKUP, IF) to Data Validation, Conditional Formatting, Charts, and Pivot Tables.',
    intro: 'Microsoft Excel is the premier spreadsheet program for data analysis, financial modeling, and business intelligence. Learn essential formulas, conditional logic, lookup functions, data cleaning, and dynamic PivotTable reports.',
    editorStarter: getEditorStarter('MS Excel'),
    exercises: [
      'Calculate quarterly sales totals, averages, and max figures using SUM, AVERAGE, and MAX formulas.',
      'Write VLOOKUP and XLOOKUP queries to extract employee details from a database table.',
      'Create a Pivot Table summary analyzing product revenue across regions with conditional formatting.'
    ],
    modules: [
      {
        title: 'Module 1: Excel Fundamentals & Cell Formulas',
        summary: 'Learn cell references, relative vs absolute locking ($A$1), and basic arithmetic operations.',
        lessons: [
          {
            title: 'Lesson 1: Cell Grid, Data Types & Basic Arithmetic',
            duration: '15m',
            summary: 'Navigate columns/rows, enter text/numbers/dates, and write basic arithmetic.',
            details: 'Master formula syntax starting with =. Learn addition (+), subtraction (-), multiplication (*), and division (/). AutoSum shortcut (Alt+=).',
            codeExample: '=SUM(A1:A10)\n=AVERAGE(B2:B20)\n=COUNT(C1:C100)',
            exercisePrompt: 'Enter 5 monthly revenue values and write formulas for Total (=SUM) and Average (=AVERAGE).'
          },
          {
            title: 'Lesson 2: Absolute Cell Locking ($A$1) & AutoFill',
            duration: '18m',
            summary: 'Understand relative vs absolute cell references using F4.',
            details: 'Learn how relative references shift during drag-fill. Press F4 to lock column/row references ($A$1) when calculating tax rates or static multipliers.',
            codeExample: '=B2 * $E$1  // $E$1 locks tax rate cell so dragging formula does not shift reference',
            exercisePrompt: 'Multiply column B prices by a tax rate in cell E1 using absolute locking ($E$1).'
          }
        ]
      },
      {
        title: 'Module 2: Lookup Functions & Logical Analysis',
        summary: 'Master VLOOKUP, XLOOKUP, INDEX/MATCH, IF, IFS, SUMIF, and COUNTIF.',
        lessons: [
          {
            title: 'Lesson 3: VLOOKUP, XLOOKUP & INDEX/MATCH',
            duration: '28m',
            summary: 'Search tables and retrieve data dynamically using VLOOKUP and modern XLOOKUP.',
            details: 'Understand VLOOKUP syntax: =VLOOKUP(lookup_val, table_range, col_index, FALSE). Learn XLOOKUP for bidirectional lookups without column restrictions.',
            codeExample: '=VLOOKUP(102, A2:D50, 3, FALSE)\n=XLOOKUP(E2, A2:A100, C2:C100, "Not Found")',
            exercisePrompt: 'Write a VLOOKUP query to return the salary of an employee given their ID number.'
          },
          {
            title: 'Lesson 4: Conditional Formulas (IF, SUMIF, COUNTIF)',
            duration: '25m',
            summary: 'Perform logic tests and conditional aggregations.',
            details: 'Use IF for decision logic (=IF(score>=70, "Pass", "Fail")). Use SUMIF and COUNTIF to aggregate specific subsets of data based on criteria.',
            codeExample: '=IF(B2>50000, "High Performer", "Standard")\n=SUMIF(A2:A100, "North", C2:C100)\n=COUNTIF(D2:D100, "Completed")',
            exercisePrompt: 'Write a SUMIF formula calculating total revenue generated exclusively in the "West" region.'
          }
        ]
      },
      {
        title: 'Module 3: Data Analysis, PivotTables & Charts',
        summary: 'Clean datasets, apply Data Validation, build Pivot Tables and dynamic charts.',
        lessons: [
          {
            title: 'Lesson 5: Data Validation, Sorting & Filtering',
            duration: '20m',
            summary: 'Create dropdown selection lists and filter complex datasets.',
            details: 'Prevent data entry errors using Data -> Data Validation -> List. Use Filters (Ctrl+Shift+L) and Remove Duplicates to sanitize raw data.',
            codeExample: 'Data Validation: Allow: List -> Source: "Approved, Pending, Rejected"\nFilter Shortcut: Ctrl + Shift + L',
            exercisePrompt: 'Create a Data Validation dropdown for employee department selection.'
          },
          {
            title: 'Lesson 6: Pivot Tables, Slicers & Chart Visualizations',
            duration: '35m',
            summary: 'Summarize millions of rows instantly into interactive Pivot Table reports.',
            details: 'Master Pivot Table field lists (Rows, Columns, Values, Filters). Add visual Slicers and interactive Bar/Line charts for executive dashboard reporting.',
            codeExample: 'Insert PivotTable: Insert -> PivotTable -> Drag Region to Rows, Sales to Values (Sum)',
            exercisePrompt: 'Build a Pivot Table summarizing total sales by product category with an interactive Slicer.'
          }
        ]
      }
    ]
  },

  PowerPoint: {
    title: 'PowerPoint',
    summary: 'Master Microsoft PowerPoint presentation design, Slide Masters, typography rules, Morph transitions, custom animations, and presenter tools.',
    intro: 'Microsoft PowerPoint is the leading presentation software for business pitches, executive briefings, and educational lectures. Master visual hierarchy, color harmony, Morph transitions, SmartArt diagrams, and presenter tools.',
    editorStarter: getEditorStarter('PowerPoint'),
    exercises: [
      'Design a 5-slide executive presentation with consistent color themes and visual hierarchy.',
      'Apply Morph transitions to animate elements seamlessly across slides.',
      'Configure Slide Master templates to update headers, logos, and fonts across all slides in one click.'
    ],
    modules: [
      {
        title: 'Module 1: PowerPoint Interface & Slide Layout Design',
        summary: 'Learn presentation structure, slide layouts, typography hierarchy, and shape design.',
        lessons: [
          {
            title: 'Lesson 1: Slide Architecture & Visual Hierarchy',
            duration: '15m',
            summary: 'Understand slide aspect ratios (16:9 widescreen), grid guides, and font pairing.',
            details: 'Master slide layout selection (Title Slide, Title & Content, Comparison). Apply font rules (headings 32pt+, body text 18pt+, high contrast against backgrounds).',
            codeExample: 'Layout Selection: Home -> New Slide -> Title and Content\nFont Rules: Title (36pt Bold) | Body (20pt Regular)',
            exercisePrompt: 'Create a 16:9 title slide with a bold heading, subtitle, and branded background fill.'
          },
          {
            title: 'Lesson 2: Color Palettes, Shapes & SmartArt Diagrams',
            duration: '20m',
            summary: 'Use color harmony, shape formatting, icons, and SmartArt processes.',
            details: 'Convert boring bullet lists into visual SmartArt diagrams (Process, Hierarchy, Cycle). Format custom shapes with gradient fills and soft drop shadows.',
            codeExample: 'Convert to SmartArt: Right-click text box -> Convert to SmartArt -> Process Diagram',
            exercisePrompt: 'Convert a 4-step bullet list into a horizontal Process SmartArt graphic.'
          }
        ]
      },
      {
        title: 'Module 2: Morph Transitions & Advanced Animations',
        summary: 'Animate elements smoothly using Morph transitions and the Animation Pane.',
        lessons: [
          {
            title: 'Lesson 3: Morph Transition & Fluid Object Movement',
            duration: '25m',
            summary: 'Create cinematic slide transitions with Morph.',
            details: 'Duplicate slides and resize/reposition elements. Apply Transitions -> Morph for smooth automatic animation between slide states without manual keyframing.',
            codeExample: 'Apply Morph: Duplicate Slide 1 to Slide 2 -> Move Shape to new position -> Transitions -> Morph',
            exercisePrompt: 'Create a 2-slide sequence animating a product diagram from small to expanded using Morph.'
          },
          {
            title: 'Lesson 4: Animation Pane & Entrance/Exit Triggers',
            duration: '22m',
            summary: 'Sequence entrance, emphasis, and exit animations using the Animation Pane.',
            details: 'Master animation timing (On Click, With Previous, After Previous). Adjust duration and delay to reveal bullet points progressively during speeches.',
            codeExample: 'Animation Timing: Animations -> Animation Pane -> Start: After Previous, Duration: 0.5s',
            exercisePrompt: 'Set up progressive entrance animations for 3 key statistics with 0.3s delay between each.'
          }
        ]
      },
      {
        title: 'Module 3: Slide Master & Presenter Tools',
        summary: 'Build reusable templates with Slide Master and present confidently with Presenter View.',
        lessons: [
          {
            title: 'Lesson 5: Slide Master Template Customization',
            duration: '25m',
            summary: 'Edit top-level Master slides to propagate logos, fonts, and slide numbers.',
            details: 'Access View -> Slide Master to customize master layouts. Adding a company logo or footer to the Master Master updates all layout children instantly.',
            codeExample: 'Open Master: View -> Slide Master -> Insert Logo on top slide -> Close Master View',
            exercisePrompt: 'Insert a corporate logo into the Master Slide header and verify it appears across all slides.'
          },
          {
            title: 'Lesson 6: Presenter View, Rehearse Timing & Video Export',
            duration: '20m',
            summary: 'Deliver presentations seamlessly and export slide decks to PDF or MP4 video.',
            details: 'Use Presenter View (Alt+F5) to read private speaker notes while displaying full-screen slides to audience. Export finished decks to MP4 video or PDF handouts.',
            codeExample: 'Presenter View: Alt + F5 (Shows timer, notes, and next slide preview)\nExport: File -> Export -> Create a Video (1080p MP4)',
            exercisePrompt: 'Add speaker notes to 3 slides and launch Presenter View to rehearse timing.'
          }
        ]
      }
    ]
  }
};

export const getCourseData = (rawCourseName) => {
  const name = rawCourseName ? decodeURIComponent(rawCourseName).trim() : 'Course';
  let matchedCourse = null;

  // 1. Direct case-insensitive match
  for (const k of Object.keys(RICH_COURSES)) {
    if (k.toLowerCase() === name.toLowerCase()) {
      matchedCourse = RICH_COURSES[k];
      break;
    }
  }

  const norm = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 2. Normalized match without collapsing + and # symbols
  if (!matchedCourse && norm && !name.includes('+') && !name.includes('#')) {
    for (const k of Object.keys(RICH_COURSES)) {
      const kNorm = k.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (kNorm === norm) {
        matchedCourse = RICH_COURSES[k];
        break;
      }
    }
  }

  // 3. Dynamic course structure generator for any custom course name
  if (!matchedCourse) {
    matchedCourse = {
      title: name,
      summary: `Master fundamental concepts, practical techniques, and hands-on exercises in ${name} from scratch to advanced engineering.`,
      intro: `${name} is a high-demand technology in modern software engineering. Learn step-by-step with structured modules, W3Schools-style code documentation, and interactive practice challenges.`,
      editorStarter: getEditorStarter(name),
      exercises: [
        `Write your first ${name} example program in the live code editor.`,
        `Implement input validation and core logic handling in ${name}.`,
        `Build a complete mini project demonstrating real-world ${name} principles.`,
      ],
      modules: [
        {
        title: `Module 1: ${name} Fundamentals & Setup`,
        summary: `Establish a strong foundation by learning the basic syntax, environment configuration, and core concepts of ${name}.`,
        lessons: [
            {
              title: `Lesson 1: Introduction to ${name}`,
              duration: '12m',
              summary: `Understand foundational principles, syntax rules, and environment setup for ${name}.`,
              details: `This lesson covers the core architecture, foundational building blocks, and step-by-step concepts required to write clean ${name} programs.`,
              codeExample: `// ${name} Foundation Code\nconsole.log("Welcome to ${name} Masterclass!");\n\nfunction startCourse() {\n  return "Course initialized successfully.";\n}\n\nstartCourse();`,
              exercisePrompt: `Write a basic ${name} script, run code verification, and inspect console output.`,
            },
            {
              title: `Lesson 2: Variables, Data Types & Control Flow in ${name}`,
              duration: '15m',
              summary: `Learn data representation, state management, and conditional branching in ${name}.`,
              details: `Explore primitive data types, collections, operators, and control structures (if/else statements, loops) used in ${name}.`,
              codeExample: `// ${name} Control Flow Example\nconst studentName = "Alex";\nconst completionScore = 95;\n\nif (completionScore >= 80) {\n  console.log(\`\${studentName} has passed the ${name} exam!\`);\n}`,
              exercisePrompt: `Modify the control flow condition to dynamically check student scores and return pass/fail status.`,
            },
          ],
        },
        {
        title: `Module 2: Advanced ${name} Architecture & Real-World Projects`,
        summary: `Move beyond the basics to implement scalable patterns, professional workflows, and real-world architectures in ${name}.`,
        lessons: [
            {
              title: `Lesson 3: Functions, Objects & Modular Design in ${name}`,
              duration: '18m',
              summary: `Master reusable modular structures, functions, and object-oriented patterns in ${name}.`,
              details: `Deep dive into function definitions, parameter passing, asynchronous operations, and object abstractions.`,
              codeExample: `// ${name} Modular Component\nclass ${name.replace(/[^a-zA-Z]/g, '') || 'App'}Module {\n  constructor(name) {\n    this.name = name;\n  }\n  execute() {\n    console.log(\`Executing \${this.name} module...\`);\n  }\n}\n\nconst mod = new ${name.replace(/[^a-zA-Z]/g, '') || 'App'}Module("${name}");\nmod.execute();`,
              exercisePrompt: `Implement a custom class or helper module in ${name} with two methods and test execution.`,
            },
            {
              title: `Lesson 4: Deployment & Best Practices for ${name}`,
              duration: '20m',
              summary: `Learn production deployment strategies, testing, and performance optimization for ${name}.`,
              details: `Explore clean code patterns, error handling, performance tuning, and project deployment workflows.`,
              codeExample: `// ${name} Production Setup\ntry {\n  console.log("${name} Application ready for production deployment!");\n} catch (err) {\n  console.error(err.message);\n}`,
              exercisePrompt: `Add try/catch error handling around your ${name} code and verify clean execution.`,
            },
          ],
        },
      ],
    };
  }

  // Clone to avoid mutating original dictionary object
  const course = JSON.parse(JSON.stringify(matchedCourse));

  // 4. Ensure some courses have 20 modules, and others have 10 by padding dynamically
  const targetModuleCount = ['javascript', 'python', 'react'].includes(course.title.toLowerCase()) ? 20 : 10;
  if (course.modules && course.modules.length < targetModuleCount) {
    const currentLen = course.modules.length;
    for (let i = currentLen + 1; i <= targetModuleCount; i++) {
      course.modules.push({
        title: `Module ${i}: Advanced ${course.title} Phase ${i}`,
        summary: `Deepen your expertise with advanced paradigms, professional optimizations, and robust real-world implementations of ${course.title}.`,
        lessons: [
          {
            title: `Lesson ${i}.1: Deep Dive Mechanics & Theory`,
            duration: '15m',
            summary: `Explore advanced concepts and core mechanics in ${course.title}.`,
            details: `This lesson covers deeper mechanics, real-world patterns, and advanced implementation details of ${course.title} that are typically seen in enterprise environments.`,
            codeExample: `// ${course.title} Advanced Phase ${i}\nconsole.log("Executing Module ${i} Advanced Logic");\n// More complex logic goes here...`,
            exercisePrompt: `Implement the advanced architectural pattern discussed for ${course.title}.`
          },
          {
            title: `Lesson ${i}.2: Professional Implementation & Scale`,
            duration: '20m',
            summary: `Apply industry standards to scale ${course.title} development.`,
            details: `Master the techniques used by senior developers when writing, scaling, and maintaining ${course.title} codebases.`,
            codeExample: `// Production Grade ${course.title} - Module ${i}\nfunction advancedImplementation${i}() {\n  return "Optimized and production-ready for scaling.";\n}\n\nadvancedImplementation${i}();`,
            exercisePrompt: `Refactor your codebase to meet professional scalability standards.`
          },
          {
            title: `Lesson ${i}.3: Real-World Architecture Project`,
            duration: '25m',
            summary: `Build a robust module feature using ${course.title}.`,
            details: `Integrate all the concepts from this module into a cohesive, functional mini-project that mimics a real-world ticket.`,
            codeExample: `// Real-world Project Template\nconst projectModule${i} = {\n  init: () => {\n    console.log("Project ${i} Initialized");\n  }\n};\nprojectModule${i}.init();`,
            exercisePrompt: `Complete the module project and verify all test cases pass.`
          }
        ]
      });
    }
  }

  course.modules.push({
    title: `Final Capstone Project`,
    summary: `Apply everything you've learned in a comprehensive, real-world project to complete your ${course.title} training.`,
    lessons: [
      {
        title: `Capstone Project Requirements & Structure`,
        duration: '120m',
        summary: `Project specifications and expected folder structure for your ${course.title} capstone.`,
        details: `This final project tests your end-to-end understanding. You must set up a local development environment and structure your project exactly as outlined below to pass the automated assessment.`,
        codeExample: `// Expected Project Structure:\n// /project-root\n//  ├── src/\n//  │    ├── index.js     // Main entry point\n//  │    ├── app.js       // Core logic\n//  │    └── utils/       // Helper functions\n//  ├── tests/\n//  │    └── app.test.js  // Unit tests\n//  ├── package.json      // Dependencies\n//  └── README.md         // Documentation\n\nconsole.log("Good luck on your capstone project!");`,
        exercisePrompt: `Set up your project directory structure on your local machine, initialize the necessary files, and write the core business logic as specified in the project requirements. Once completed, zip your project and upload it for grading.`
      }
    ]
  });

  return course;
};
