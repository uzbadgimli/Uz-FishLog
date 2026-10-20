// Spor sayfası süs çizimleri - yumuşak renkli, karikatür tarzı SVG figürler

export const RENK = {
  ten: '#f3cfb3',
  sac: '#5b4a5e',
  mavi: '#8fb6ea',
  maviKoyu: '#6f97d4',
  lavanta: '#c3b3ee',
  nane: '#a8dcc9',
  seftali: '#f7c1a8',
  pembe: '#f4b6c9',
  sari: '#f8dc9a',
  gri: '#9aa7bd',
}

// Uzuv: yuvarlak uçlu kalın çizgi
const U = ({ d, renk, k = 14 }) => (
  <path d={d} fill="none" stroke={renk} strokeWidth={k} strokeLinecap="round" strokeLinejoin="round" />
)

function Kafa({ x, y, r = 14, sacYon = 0 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={RENK.ten} />
      <path d={`M${x - r} ${y} A${r} ${r} 0 0 1 ${x + r} ${y} Q${x} ${y - r * 0.3} ${x - r} ${y}`} fill={RENK.sac} />
      <circle cx={x + sacYon * r} cy={y - r * 0.95} r={r * 0.45} fill={RENK.sac} />
      <circle cx={x - r * 0.38} cy={y + r * 0.25} r={1.6} fill={RENK.sac} />
      <circle cx={x + r * 0.38} cy={y + r * 0.25} r={1.6} fill={RENK.sac} />
      <path d={`M${x - 4} ${y + r * 0.55} Q${x} ${y + r * 0.8} ${x + 4} ${y + r * 0.55}`} fill="none" stroke={RENK.sac} strokeWidth={1.5} strokeLinecap="round" />
      <circle cx={x - r * 0.65} cy={y + r * 0.5} r={2.4} fill={RENK.pembe} opacity={0.8} />
      <circle cx={x + r * 0.65} cy={y + r * 0.5} r={2.4} fill={RENK.pembe} opacity={0.8} />
    </g>
  )
}

const Mat = ({ x, y, w, renk }) => <rect x={x} y={y} width={w} height={8} rx={4} fill={renk} />

// Yoga - ağaç duruşu
export function Yoga({ style }) {
  return (
    <svg viewBox="0 0 200 210" style={style} aria-hidden="true">
      <circle cx="100" cy="110" r="88" fill={RENK.nane} opacity="0.25" />
      <Mat x={50} y={192} w={100} renk={RENK.nane} />
      <U d="M95 66 L80 36 L100 12" renk={RENK.ten} k={10} />
      <U d="M105 66 L120 36 L100 12" renk={RENK.ten} k={10} />
      <U d="M100 118 L100 188" renk={RENK.gri} k={15} />
      <U d="M100 120 L132 146 L106 156" renk={RENK.gri} k={14} />
      <U d="M100 66 L100 116" renk={RENK.lavanta} k={26} />
      <Kafa x={100} y={46} sacYon={0} />
    </svg>
  )
}

// Pilates - teaser (V oturuşu) ve pilates topu
export function Pilates({ style }) {
  return (
    <svg viewBox="0 0 220 180" style={style} aria-hidden="true">
      <circle cx="110" cy="100" r="80" fill={RENK.seftali} opacity="0.22" />
      <circle cx="182" cy="140" r="24" fill={RENK.pembe} />
      <path d="M166 128 Q178 118 194 124" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <Mat x={20} y={162} w={150} renk={RENK.mavi} />
      <U d="M92 150 L148 96" renk={RENK.gri} k={15} />
      <U d="M148 96 L156 90" renk={RENK.ten} k={10} />
      <U d="M92 150 L66 104" renk={RENK.seftali} k={26} />
      <U d="M70 110 L128 86" renk={RENK.ten} k={10} />
      <Kafa x={58} y={84} sacYon={-0.6} />
    </svg>
  )
}

// Cimnastik - kurdeleli zıplama
export function Cimnastik({ style }) {
  return (
    <svg viewBox="0 0 200 210" style={style} aria-hidden="true">
      <circle cx="100" cy="105" r="88" fill={RENK.lavanta} opacity="0.22" />
      <path d="M158 22 C190 40 150 62 178 82 S160 120 186 136" fill="none" stroke={RENK.pembe} strokeWidth="6" strokeLinecap="round" />
      <U d="M100 70 L64 34" renk={RENK.ten} k={10} />
      <U d="M100 70 L144 30" renk={RENK.ten} k={10} />
      <path d="M144 30 L158 22" stroke={RENK.sac} strokeWidth="3" strokeLinecap="round" />
      <U d="M100 118 L72 186" renk={RENK.maviKoyu} k={15} />
      <U d="M100 118 L132 186" renk={RENK.maviKoyu} k={15} />
      <U d="M100 70 L100 116" renk={RENK.sari} k={26} />
      <Kafa x={100} y={50} sacYon={0.4} />
    </svg>
  )
}

// Esneme - yana uzanma
export function Esneme({ style }) {
  return (
    <svg viewBox="0 0 200 210" style={style} aria-hidden="true">
      <circle cx="100" cy="110" r="86" fill={RENK.mavi} opacity="0.22" />
      <Mat x={36} y={192} w={128} renk={RENK.lavanta} />
      <U d="M100 124 L64 186" renk={RENK.gri} k={15} />
      <U d="M100 124 L140 186" renk={RENK.gri} k={15} />
      <U d="M92 76 L70 30 L56 22" renk={RENK.ten} k={10} />
      <U d="M104 82 L120 112" renk={RENK.ten} k={10} />
      <U d="M100 124 L90 78" renk={RENK.nane} k={26} />
      <Kafa x={84} y={58} sacYon={0.6} />
    </svg>
  )
}

// Malzemeler - dambıl, top, ip, kettlebell, rulo mat
export function Malzemeler({ style }) {
  const Dambil = ({ x, y, renk, a = 0 }) => (
    <g transform={`rotate(${a} ${x + 30} ${y + 10})`}>
      <rect x={x + 10} y={y + 7} width={40} height={6} rx={3} fill={RENK.gri} />
      <rect x={x} y={y} width={14} height={20} rx={5} fill={renk} />
      <rect x={x + 46} y={y} width={14} height={20} rx={5} fill={renk} />
    </g>
  )
  return (
    <svg viewBox="0 0 260 170" style={style} aria-hidden="true">
      <ellipse cx="130" cy="150" rx="120" ry="14" fill={RENK.mavi} opacity="0.2" />
      {/* rulo mat */}
      <rect x="18" y="104" width="70" height="40" rx="20" fill={RENK.lavanta} />
      <circle cx="38" cy="124" r="14" fill="#fff" opacity="0.5" />
      <circle cx="38" cy="124" r="7" fill={RENK.lavanta} />
      {/* pilates topu */}
      <circle cx="126" cy="104" r="42" fill={RENK.nane} />
      <path d="M98 86 Q120 66 150 76" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      {/* kettlebell */}
      <path d="M196 96 a14 14 0 0 1 28 0" fill="none" stroke={RENK.seftali} strokeWidth="7" />
      <circle cx="210" cy="122" r="22" fill={RENK.seftali} />
      {/* dambıllar */}
      <Dambil x={60} y={134} renk={RENK.pembe} />
      <Dambil x={170} y={140} renk={RENK.maviKoyu} a={-8} />
      {/* atlama ipi */}
      <path d="M30 60 C60 10 110 90 150 40 S220 20 236 50" fill="none" stroke={RENK.sari} strokeWidth="4" strokeLinecap="round" />
      <rect x="22" y="56" width="10" height="24" rx="5" fill={RENK.maviKoyu} transform="rotate(-20 27 68)" />
      <rect x="232" y="46" width="10" height="24" rx="5" fill={RENK.maviKoyu} transform="rotate(20 237 58)" />
    </svg>
  )
}
