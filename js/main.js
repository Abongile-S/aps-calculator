// ===================================================
// APSFINDER - MAIN JAVASCRIPT
// ===================================================


// ===== STANDARD APS FORMULA =====
function getAPSPoints(mark) {
  mark = parseInt(mark);
  if (isNaN(mark)) return 0;
  if (mark >= 80) return 7;
  if (mark >= 70) return 6;
  if (mark >= 60) return 5;
  if (mark >= 50) return 4;
  if (mark >= 40) return 3;
  if (mark >= 30) return 2;
  if (mark >= 0)  return 1;
  return 0;
}


// ===== QUALIFICATION LEVEL =====
function getQualification(total) {
  if (total >= 30) {
    return {
      level: "✅ Bachelor's Degree",
      message: "You qualify for a Bachelor's Degree at most South African universities.",
      color: "#16a34a"
    };
  } else if (total >= 24) {
    return {
      level: "📋 Diploma",
      message: "You qualify for a Diploma at most South African universities.",
      color: "#d97706"
    };
  } else if (total >= 15) {
    return {
      level: "📄 Higher Certificate",
      message: "You qualify for a Higher Certificate at most South African universities.",
      color: "#ea580c"
    };
  } else {
    return {
      level: "📝 Keep Going",
      message: "Enter all your subjects to see your full score.",
      color: "#94a3b8"
    };
  }
}


// ===== ELECTIVE OPTIONS HTML =====
function getElectiveOptions() {
  return `
    <option value="">-- Select Subject --</option>
    <optgroup label="Mathematics">
      <option value="mathematics">Mathematics</option>
      <option value="maths-literacy">Mathematical Literacy</option>
      <option value="technical-mathematics">Technical Mathematics</option>
    </optgroup>
    <optgroup label="Sciences">
      <option value="physical-sciences">Physical Sciences</option>
      <option value="life-sciences">Life Sciences</option>
      <option value="agricultural-sciences">Agricultural Sciences</option>
      <option value="technical-sciences">Technical Sciences</option>
    </optgroup>
    <optgroup label="Commerce">
      <option value="accounting">Accounting</option>
      <option value="business-studies">Business Studies</option>
      <option value="economics">Economics</option>
    </optgroup>
    <optgroup label="Humanities">
      <option value="geography">Geography</option>
      <option value="history">History</option>
      <option value="religion-studies">Religion Studies</option>
      <option value="philosophy">Philosophy</option>
    </optgroup>
    <optgroup label="Technology">
      <option value="computer-applications">Computer Applications Technology</option>
      <option value="information-technology">Information Technology</option>
      <option value="engineering-graphics">Engineering Graphics & Design</option>
      <option value="civil-technology">Civil Technology</option>
      <option value="electrical-technology">Electrical Technology</option>
      <option value="mechanical-technology">Mechanical Technology</option>
    </optgroup>
    <optgroup label="Arts & Culture">
      <option value="visual-arts">Visual Arts</option>
      <option value="dramatic-arts">Dramatic Arts</option>
      <option value="music">Music</option>
      <option value="dance-studies">Dance Studies</option>
      <option value="design">Design</option>
    </optgroup>
    <optgroup label="Hospitality & Tourism">
      <option value="tourism">Tourism</option>
      <option value="hospitality-studies">Hospitality Studies</option>
      <option value="consumer-studies">Consumer Studies</option>
    </optgroup>
    <optgroup label="Agricultural">
      <option value="agricultural-management">Agricultural Management Practices</option>
      <option value="agricultural-technology">Agricultural Technology</option>
    </optgroup>
    <optgroup label="Other">
      <option value="life-orientation">Life Orientation</option>
      <option value="sport-exercise">Sport & Exercise Science</option>
      <option value="marine-sciences">Marine Sciences</option>
    </optgroup>
  `;
}


// ===== COLLECT ALL SUBJECT DATA =====
// Returns an array of {subject, mark, points} for every filled row
function collectSubjectData() {
  const rows = document.querySelectorAll('.subject-row');
  const includeLO = document.getElementById('includeLO').checked;
  const subjects = [];

  rows.forEach(function(row) {
    const select = row.querySelector('.subject-select');
    const markInput = row.querySelector('.mark-input');
    const subject = select.value;
    const mark = parseInt(markInput.value);

    if (!subject || isNaN(mark)) return;

    let points = getAPSPoints(mark);

    // LO at half value
    if (subject === 'life-orientation') {
      if (!includeLO) return;
      points = Math.round(points / 2);
    }

    subjects.push({ subject, mark, points });
  });

  return subjects;
}


// ===== CALCULATE STANDARD APS =====
function calculateAPS() {
  const rows = document.querySelectorAll('.subject-row');
  const includeLO = document.getElementById('includeLO').checked;
  let total = 0;

  rows.forEach(function(row) {
    const select = row.querySelector('.subject-select');
    const markInput = row.querySelector('.mark-input');
    const pointsDisplay = row.querySelector('.aps-points');
    const subject = select.value;
    const mark = markInput.value;

    if (!mark || !subject) {
      pointsDisplay.textContent = '0';
      pointsDisplay.style.color = '#ccc';
      return;
    }

    const points = getAPSPoints(mark);

    if (subject === 'life-orientation' && !includeLO) {
      pointsDisplay.textContent = '0';
      pointsDisplay.style.color = '#ccc';
      return;
    }

    if (subject === 'life-orientation' && includeLO) {
      const loPoints = Math.round(points / 2);
      pointsDisplay.textContent = loPoints + ' (LO)';
      pointsDisplay.style.color = '#f59e0b';
      total += loPoints;
      return;
    }

    pointsDisplay.textContent = points;
    pointsDisplay.style.color = '#ff6b35';
    total += points;
  });

  // Update score display
  document.getElementById('aps-total').textContent = total;
  sessionStorage.setItem('userAPS', total);
  // Save subject selections for matcher warnings
const subjectData = [];
document.querySelectorAll('.subject-row').forEach(function(row) {
  const subject = row.querySelector('.subject-select').value;
  const mark = row.querySelector('.mark-input').value;
  if (subject && mark) {
    subjectData.push({ subject, mark: parseInt(mark) });
  }
});
sessionStorage.setItem('userSubjects', JSON.stringify(subjectData));
sessionStorage.setItem('userLO', document.getElementById('includeLO').checked);

  // Update qualification message
  const qualification = getQualification(total);
  const resultQualify = document.getElementById('result-qualify');
  resultQualify.innerHTML = `
    <div class="qualify-badge">${qualification.level}</div>
    <p>${qualification.message}</p>
    <p style="font-size:0.75rem;opacity:0.6;margin-top:0.5rem;font-weight:600;">
      ℹ️ Standard APS is used by most SA universities as a baseline score.
    </p>
  `;

  // Recalculate uni score if one is active
  const activeBtn = document.querySelector('.uni-btn.active');
  if (activeBtn) {
    calculateUniScore(activeBtn.dataset.uni);
  }
}


// ===================================================
// UNIVERSITY SPECIFIC SCORING SYSTEMS
// ===================================================

function calculateUniScore(uni) {

  // Mark the active button
  document.querySelectorAll('.uni-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-uni="${uni}"]`).classList.add('active');

  const subjects = collectSubjectData();
  const standardAPS = parseInt(document.getElementById('aps-total').textContent);

  if (subjects.length === 0) {
    showUniResult(uni, null, standardAPS,
      'Please enter your subject marks first, then click a university button.');
    return;
  }

  let uniScore = 0;
  let explanation = '';
  let disclaimer = '';

  // -------------------------------------------
  if (uni === 'uct') {
    // UCT uses a points system based on best 4 subjects
    // excluding Life Orientation and Home Language
    // Scale: 80-100=8pts, 70-79=7, 60-69=6, 50-59=5,
    //        40-49=4, 30-39=3, below 30=0

    function getUCTPoints(mark) {
      mark = parseInt(mark);
      if (mark >= 80) return 8;
      if (mark >= 70) return 7;
      if (mark >= 60) return 6;
      if (mark >= 50) return 5;
      if (mark >= 40) return 4;
      if (mark >= 30) return 3;
      return 0;
    }

    // Filter out LO and languages, take best 4
    const eligible = subjects
      .filter(s => !s.subject.includes('home') &&
                   !s.subject.includes('fal') &&
                   s.subject !== 'life-orientation')
      .map(s => ({ ...s, uctPoints: getUCTPoints(s.mark) }))
      .sort((a, b) => b.uctPoints - a.uctPoints)
      .slice(0, 4);

    uniScore = eligible.reduce((sum, s) => sum + s.uctPoints, 0);

    explanation = `
      <strong>How UCT calculates your score:</strong>
      UCT uses their own points scale (max 8 per subject) and takes your 
      best 4 subjects, excluding Home Language and Life Orientation. 
      Maximum possible score is 32. UCT also requires NBT 
      (National Benchmark Tests) which we cannot calculate here.
    `;
    disclaimer = `⚠️ UCT also considers NBT scores alongside this result. 
      Always check uct.ac.za for faculty-specific requirements.`;

  // -------------------------------------------
  } else if (uni === 'up') {
    // UP uses their own points scale per subject
    // then adds them — no "best of" selection,
    // counts best 6 subjects excluding LO

    function getUPPoints(mark) {
      mark = parseInt(mark);
      if (mark >= 90) return 8;
      if (mark >= 80) return 7;
      if (mark >= 70) return 6;
      if (mark >= 60) return 5;
      if (mark >= 50) return 4;
      if (mark >= 40) return 3;
      if (mark >= 30) return 2;
      return 0;
    }

    // Take best 6 subjects excluding LO
    const eligible = subjects
      .filter(s => s.subject !== 'life-orientation')
      .map(s => ({ ...s, upPoints: getUPPoints(s.mark) }))
      .sort((a, b) => b.upPoints - a.upPoints)
      .slice(0, 6);

    uniScore = eligible.reduce((sum, s) => sum + s.upPoints, 0);

    explanation = `
      <strong>How UP calculates your score:</strong>
      The University of Pretoria uses their own points table 
      (slightly different from standard APS) and counts your 
      best 6 subjects, excluding Life Orientation. 
      Maximum possible score is 48.
    `;
    disclaimer = `⚠️ Some UP faculties have additional subject-specific 
      requirements. Always check up.ac.za for your chosen faculty.`;

  // -------------------------------------------
  } else if (uni === 'wits') {
    // Wits uses standard APS for most faculties
    // but Engineering and Health Sciences have
    // specific subject requirements

    uniScore = standardAPS;

    const hasMaths = subjects.some(s => s.subject === 'mathematics');
    const hasPhysics = subjects.some(s => s.subject === 'physical-sciences');
    const hasEnglish = subjects.some(s =>
      s.subject === 'en-home' || s.subject === 'en-fal');

    let facultyNotes = '';

    if (!hasMaths) {
      facultyNotes += '⚠️ Most Wits faculties require Mathematics (not Maths Literacy).<br/>';
    }
    if (!hasPhysics) {
      facultyNotes += '⚠️ Engineering & Science faculties require Physical Sciences.<br/>';
    }
    if (!hasEnglish) {
      facultyNotes += '⚠️ Wits recommends English as Home or First Additional Language.<br/>';
    }

    explanation = `
      <strong>How Wits calculates your score:</strong>
      Wits University uses the standard APS for most faculties, 
      so your score is the same as your standard APS. However, 
      specific faculties have minimum subject requirements you 
      must meet regardless of your APS total.
      <br/><br/>${facultyNotes}
    `;
    disclaimer = `⚠️ Always check wits.ac.za for your specific faculty requirements.`;

  // -------------------------------------------
  } else if (uni === 'su') {
    // Stellenbosch uses standard APS but
    // counts best 6 subjects, never includes LO

    const eligible = subjects
      .filter(s => s.subject !== 'life-orientation')
      .sort((a, b) => b.points - a.points)
      .slice(0, 6);

    uniScore = eligible.reduce((sum, s) => sum + s.points, 0);

    explanation = `
      <strong>How Stellenbosch calculates your score:</strong>
      Stellenbosch University uses the standard APS points scale 
      but only counts your best 6 subjects and never includes 
      Life Orientation, regardless of your checkbox selection above.
    `;
    disclaimer = `⚠️ Some SU faculties require Afrikaans or English proficiency. 
      Always check sun.ac.za for faculty-specific requirements.`;
  }

  showUniResult(uni, uniScore, standardAPS, explanation, disclaimer);
}


// ===== SHOW UNI RESULT =====
function showUniResult(uni, uniScore, standardAPS, explanation, disclaimer) {
  const uniNames = {
    uct: '🎓 UCT — University of Cape Town',
    up:  '🎓 UP — University of Pretoria',
    wits:'🎓 Wits — University of the Witwatersrand',
    su:  '🎓 SU — Stellenbosch University'
  };

  const box = document.getElementById('uni-result-box');
  const header = document.getElementById('uni-result-header');
  const body = document.getElementById('uni-result-body');
  const disc = document.getElementById('uni-result-disclaimer');

  box.style.display = 'block';
  header.innerHTML = uniNames[uni] || uni;

  if (uniScore === null) {
    body.innerHTML = `<p style="color:#999;font-weight:600;">${explanation}</p>`;
    disc.innerHTML = '';
    return;
  }

  const label = uni === 'wits' ? 'Standard APS (Wits)' : `${uni.toUpperCase()} Score`;

  body.innerHTML = `
    <div class="uni-score-display">
      <div class="uni-score-main">
        <div class="score-num">${uniScore}</div>
        <div class="score-label">${label}</div>
      </div>
      <div class="uni-score-vs">vs</div>
      <div class="uni-score-standard">
        <div class="score-num">${standardAPS}</div>
        <div class="score-label">Standard APS</div>
      </div>
    </div>
    <div class="uni-how-it-works">${explanation}</div>
  `;

  disc.innerHTML = disclaimer || '';

  // Smooth scroll to result
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


// ===== ADD SUBJECT ROW =====
function addSubjectRow() {
  const subjectList = document.getElementById('subject-list');
  const rows = subjectList.querySelectorAll('.subject-row');

  if (rows.length >= 9) {
    alert('Maximum 9 subjects allowed.');
    return;
  }

  const newRow = document.createElement('div');
  newRow.classList.add('subject-row');
  newRow.innerHTML = `
    <select class="subject-select elective-select">
      ${getElectiveOptions()}
    </select>
    <input type="number" class="mark-input" placeholder="0 - 100" min="0" max="100"/>
    <span class="aps-points">0</span>
    <button class="btn-remove" onclick="removeSubjectRow(this)">✕</button>
  `;

  subjectList.appendChild(newRow);
  updateSubjectCount();
  attachListeners(newRow);
}


// ===== REMOVE SUBJECT ROW =====
function removeSubjectRow(button) {
  button.closest('.subject-row').remove();
  updateSubjectCount();
  calculateAPS();
}


// ===== UPDATE SUBJECT COUNT =====
function updateSubjectCount() {
  const count = document.querySelectorAll('.subject-row').length;
  document.getElementById('subject-count').textContent = count + ' subjects';
  const addBtn = document.getElementById('add-subject');
  if (count >= 9) {
    addBtn.disabled = true;
    addBtn.textContent = 'Maximum reached (9)';
  } else {
    addBtn.disabled = false;
    addBtn.textContent = '+ Add Subject';
  }
}


// ===== ATTACH LISTENERS =====
function attachListeners(row) {
  row.querySelector('.subject-select').addEventListener('change', calculateAPS);
  row.querySelector('.mark-input').addEventListener('input', calculateAPS);
}


// ===== INIT =====
  document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.subject-row').forEach(attachListeners);
  document.getElementById('add-subject').addEventListener('click', addSubjectRow);
  document.getElementById('includeLO').addEventListener('change', calculateAPS);

  // ── Restore saved subjects if student comes back ──
  restoreSavedSubjects();

  calculateAPS();
});


// ===== RESTORE SAVED SUBJECTS =====
function restoreSavedSubjects() {
  let savedSubjects = [];

  try {
    savedSubjects = JSON.parse(sessionStorage.getItem('userSubjects')) || [];
  } catch(e) {
    return; // nothing saved, start fresh
  }

  if (savedSubjects.length === 0) return;

  const rows = document.querySelectorAll('.subject-row');

  savedSubjects.forEach(function(saved, index) {
    // If row exists use it, otherwise add a new one
    if (index >= rows.length) {
      addSubjectRow();
    }

    const allRows = document.querySelectorAll('.subject-row');
    const row = allRows[index];

    if (!row) return;

    const select = row.querySelector('.subject-select');
    const markInput = row.querySelector('.mark-input');

    // Set the saved values
    if (select && saved.subject) {
      select.value = saved.subject;
    }

    if (markInput && saved.mark) {
      markInput.value = saved.mark;
    }
  });

  // Restore LO checkbox
  const savedLO = sessionStorage.getItem('userLO');
  if (savedLO === 'true') {
    document.getElementById('includeLO').checked = true;
  }
}
// ===== CLEAR CALCULATOR =====
function clearCalculator() {
  if (!confirm('Are you sure you want to clear all your marks?')) return;

  // Clear sessionStorage
  sessionStorage.removeItem('userSubjects');
  sessionStorage.removeItem('userAPS');
  sessionStorage.removeItem('userLO');

  // Reset all mark inputs
  document.querySelectorAll('.mark-input').forEach(input => {
    input.value = '';
  });

  // Reset all selects to first option
  document.querySelectorAll('.subject-select').forEach(select => {
    select.selectedIndex = 0;
  });

  // Uncheck LO
  document.getElementById('includeLO').checked = false;

  // Remove any extra rows added beyond the default 7
  const rows = document.querySelectorAll('.subject-row');
  rows.forEach((row, index) => {
    if (index >= 7) row.remove();
  });

  // Recalculate to reset score to 0
  calculateAPS();

  updateSubjectCount();
}
