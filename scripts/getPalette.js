const { r, g, b } = hexToRgb('#ffc15e')

const color = `yellow`

console.log(`
  ${color}90: css\`#${getShit(r, 90)}${getShit(g, 90)}${getShit(b, 90)}\`,
  ${color}80: css\`#${getShit(r, 80)}${getShit(g, 80)}${getShit(b, 80)}\`,
  ${color}70: css\`#${getShit(r, 70)}${getShit(g, 70)}${getShit(b, 70)}\`,
  ${color}60: css\`#${getShit(r, 60)}${getShit(g, 60)}${getShit(b, 60)}\`,
  ${color}50: css\`#${getShit(r, 50)}${getShit(g, 50)}${getShit(b, 50)}\`,
  ${color}40: css\`#${getShit(r, 40)}${getShit(g, 40)}${getShit(b, 40)}\`,
  ${color}30: css\`#${getShit(r, 30)}${getShit(g, 30)}${getShit(b, 30)}\`,
  ${color}20: css\`#${getShit(r, 20)}${getShit(g, 20)}${getShit(b, 20)}\`,
  ${color}10: css\`#${getShit(r, 10)}${getShit(g, 10)}${getShit(b, 10)}\`,
  ${color}01: css\`#${getShit(r, 1)}${getShit(g, 1)}${getShit(b, 1)}\`,
`)

function getShit (shit, fuck) {
  const percent = fuck / 100
  const suka = Math.round(shit + (1 - percent) * (255 - shit)).toString(16)
  return suka.length === 1 ? `0${suka}` : suka
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
