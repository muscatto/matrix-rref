function rrefFraction(matrix) {
  const rowCount = matrix.length;
  const colCount = matrix[0].length;
  let lead = 0; // 現在注目している列

  let operationCount = 0;

  // 行ごとに見ていく(r: 現在の行)
  for (let r = 0; r < rowCount; r++) {
    if (lead >= colCount) break;

    // lead列の中で0でない行をさがす
    let i = r;
    while (matrix[i][lead].isZero()) {
      i++;
      if (i === rowCount) {
        // lead列が全て0の場合
        i = r; // 初期化
        lead++; // 次の列に進む
        if (lead === colCount) return { matrix, operationCount };
      }
    }

    // 行交換
    if (i !== r) {
      // 主成分がある行を上に持ってくる
      // iは0でない行
      [matrix[i], matrix[r]] = [matrix[r], matrix[i]];
      operationCount++;
    }

    // ピボットを1に
    const pivot = matrix[r][lead];
    if (!(pivot.n === 1 && pivot.d === 1)) {
      // 行全体をpivotで割る
      for (let j = 0; j < colCount; j++) {
        matrix[r][j] = matrix[r][j].div(pivot);
      }
      operationCount++;
    }

    // 他の行を0に
    for (let i2 = 0; i2 < rowCount; i2++) {
      // pivod行以外の全ての行について
      if (i2 !== r && !matrix[i2][lead].isZero()) {
        const factor = matrix[i2][lead];
        for (let j = 0; j < colCount; j++) {
          // i2行の全ての列でr行のfactor倍を引く
          matrix[i2][j] = matrix[i2][j].sub(factor.mul(matrix[r][j]));
        }
        operationCount++;
      }
    }

    lead++;
  }

  return { matrix, operationCount };
}

export default rrefFraction;
