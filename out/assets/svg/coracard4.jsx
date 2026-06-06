const CoraCard4 = () => (
  <svg width="360" height="240" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="100%" height="100%" fill="none" />

    {/* Card */}
    <rect x="20" y="20" width="320" height="200" rx="16" fill="#141428" stroke="#00ff00" strokeOpacity="0.1" strokeWidth="1" />

    {/* Inner Shadow/Glow Effect */}
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    {/* Header: SOL + +0.65 */}
    <circle cx="50" cy="45" r="16" fill="#f00" />
    <text x="50" y="50" fontSize="12" fontFamily="Segoe UI" fill="white" textAnchor="middle" fontWeight="bold">S</text>
    <text x="72" y="48" fontSize="14" fontFamily="Segoe UI" fill="white" fontWeight="600">SOL</text>
    <text x="110" y="48" fontSize="12" fontFamily="Segoe UI" fill="#0f0" fontWeight="500">+0.65</text>

    {/* Price Input Box */}
    <rect x="40" y="75" width="280" height="40" rx="12" fill="#191932" />
    <text x="60" y="102" fontSize="18" fontFamily="Segoe UI" fill="white">−</text>
    <text x="130" y="102" fontSize="22" fontFamily="Segoe UI" fill="white" fontWeight="700">$455.80</text>
    <text x="260" y="102" fontSize="18" fontFamily="Segoe UI" fill="white">+</text>

    {/* Bell Icon (Green Square) */}
    <rect x="280" y="70" width="40" height="40" rx="12" fill="#0c0" filter="url(#glow)" />
    <path d="M300 78c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2s2-.9 2-2v-6c0-1.1-.9-2-2-2zm0 15c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="white"/>

    {/* Dotted Line */}
    <line x1="180" y1="120" x2="180" y2="200" stroke="#0c0" strokeWidth="1" strokeDasharray="2,4" opacity="0.6" />

    {/* Alert Section */}
    <rect x="40" y="160" width="280" height="40" rx="12" fill="#191932" />
    {/* Green Triangle */}
    <circle cx="60" cy="180" r="10" fill="#0c0" />
    <path d="M57 177l6 6-6 6" stroke="white" strokeWidth="1.5" fill="none" />
    <text x="80" y="186" fontSize="14" fontFamily="Segoe UI" fill="white">Price alert</text>

    {/* Solana Logo in Badge */}
    <g transform="translate(290, 180)">
      <circle cx="0" cy="0" r="10" fill="none" stroke="white" strokeWidth="1.5"/>
      <path d="M0 -8 v16 M-8 0 h16" stroke="white" strokeWidth="1.5" />
      <path d="M0 -8 v16 M-8 0 h16" stroke="white" strokeWidth="1.5" transform="rotate(45)" />
    </g>
  </svg>
);

export default CoraCard4;