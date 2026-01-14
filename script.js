function solveLP() {
  const pT = Number(document.getElementById("profitTable").value);
  const pC = Number(document.getElementById("profitChair").value);
  const aT = Number(document.getElementById("laborTable").value);
  const aC = Number(document.getElementById("laborChair").value);
  const wT = Number(document.getElementById("woodTable").value);
  const wC = Number(document.getElementById("woodChair").value);
  const L = Number(document.getElementById("laborLimit").value);
  const W = Number(document.getElementById("woodLimit").value);

  const points = [
    { T: 0, C: 0 },
    { T: L / aT, C: 0 },
    { T: 0, C: L / aC },
    { T: W / wT, C: 0 },
    { T: 0, C: W / wC }
  ];

  const det = aT * wC - aC * wT;
  if (det !== 0) {
    const T = (L * wC - aC * W) / det;
    const C = (aT * W - L * wT) / det;
    if (T >= 0 && C >= 0) points.push({ T, C });
  }

  let bestZ = -Infinity;
  let bestT = 0;
  let bestC = 0;

  points.forEach(p => {
    if (aT * p.T + aC * p.C <= L &&
        wT * p.T + wC * p.C <= W) {
      const Z = pT * p.T + pC * p.C;
      if (Z > bestZ) {
        bestZ = Z;
        bestT = p.T;
        bestC = p.C;
      }
    }
  });

  document.getElementById("resultT").textContent = bestT.toFixed(2);
  document.getElementById("resultC").textContent = bestC.toFixed(2);
  document.getElementById("resultZ").textContent = bestZ.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("solveBtn")
    .addEventListener("click", solveLP);
});
