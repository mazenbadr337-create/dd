
import React from 'react';

interface SchemaVisualizerProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const SchemaVisualizer: React.FC<SchemaVisualizerProps> = ({ selectedId, onSelect }) => {
  
  // Styling Constants
  const bondColor = "#1e293b"; // Slate-800
  const bondWidth = 2.5;
  const activeColor = "#ef4444"; // Rose-500
  
  const getHighlight = (id: string) => ({
    opacity: selectedId === id ? 0.3 : 0,
    fill: activeColor,
    transition: "opacity 0.2s ease-in-out"
  });

  const AtomGroup = ({ id, children }: { id: string, children: React.ReactNode }) => (
    <g 
      onClick={() => onSelect(id)} 
      className="cursor-pointer group hover:opacity-80 transition-opacity"
    >
      {children}
    </g>
  );

  return (
    <div className="w-full h-full flex items-center justify-center bg-white rounded-xl shadow-inner border border-slate-200 p-2 relative select-none overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <svg viewBox="0 0 600 350" className="w-full max-w-[650px] h-auto drop-shadow-sm">
        
        {/* ================= PYRIDINE RING (LEFT) ================= */}
        <g transform="translate(150, 200)">
            {/* 6. sp2 N Oxidation */}
            <AtomGroup id="sp2_n_ox">
                {/* Ring */}
                <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" stroke={bondColor} strokeWidth={bondWidth} fill="none" />
                <line x1="-20" y1="-12" x2="0" y2="-24" stroke={bondColor} strokeWidth="1.5" />
                <line x1="-20" y1="12" x2="-4" y2="22" stroke={bondColor} strokeWidth="1.5" />
                <line x1="20" y1="-12" x2="4" y2="-22" stroke={bondColor} strokeWidth="1.5" />
                
                {/* N Atom (Bottom - sp2) */}
                <circle cx="0" cy="30" r="8" fill="white" />
                <text x="0" y="34" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2563eb">N</text>
                {/* Highlight sp2 N */}
                <circle cx="0" cy="30" r="15" {...getHighlight('sp2_n_ox')} />
            </AtomGroup>

            {/* Tertiary Amine at Top-Left (-26, -15) */}
            <g transform="translate(-26, -15)">
                <line x1="0" y1="0" x2="-20" y2="-20" stroke={bondColor} strokeWidth={bondWidth} />
                <g transform="translate(-20, -20)">
                    <circle cx="0" cy="0" r="8" fill="white" />
                    <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2563eb">N</text>
                    
                    {/* 7. Oxidative Dealkylation (N) */}
                    <AtomGroup id="dealk_n">
                        <line x1="0" y1="0" x2="-15" y2="-10" stroke={bondColor} strokeWidth={bondWidth} />
                        <text x="-25" y="-10" fontSize="10" fontWeight="bold">CH<tspan dy="3">3</tspan></text>
                        <line x1="0" y1="0" x2="0" y2="-20" stroke={bondColor} strokeWidth={bondWidth} />
                        <text x="-10" y="-25" fontSize="10" fontWeight="bold">CH<tspan dy="3">3</tspan></text>
                        <circle cx="-10" cy="-15" r="20" {...getHighlight('dealk_n')} />
                    </AtomGroup>
                </g>
            </g>
        </g>

        {/* LINK Bond */}
        <line x1="176" y1="200" x2="224" y2="200" stroke={bondColor} strokeWidth={bondWidth} />

        {/* ================= BENZENE RING (CENTER) ================= */}
        <g transform="translate(250, 200)">
            {/* 1. Aromatic Oxidation */}
            <AtomGroup id="aromatic_ox">
                <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" stroke={bondColor} strokeWidth={bondWidth} fill="none" />
                <circle cx="0" cy="0" r="18" stroke={bondColor} strokeWidth="1" fill="none" strokeDasharray="4,2" />
                <circle cx="0" cy="0" r="25" {...getHighlight('aromatic_ox')} />
            </AtomGroup>

            {/* TOP: 7. O-Dealkylation (-OCH3) */}
            <g transform="translate(0, -30)">
                <AtomGroup id="dealk_o">
                    <line x1="0" y1="0" x2="0" y2="-20" stroke={bondColor} strokeWidth={bondWidth} />
                    <text x="0" y="-25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#dc2626">OCH<tspan dy="3" fontSize="10">3</tspan></text>
                    <circle cx="0" cy="-30" r="15" {...getHighlight('dealk_o')} />
                </AtomGroup>
            </g>

            {/* BOTTOM: S-Oxidation / S-Dealkylation (-SCH3) */}
            <g transform="translate(0, 30)">
                <line x1="0" y1="0" x2="0" y2="20" stroke={bondColor} strokeWidth={bondWidth} />
                <g transform="translate(0, 30)">
                    {/* 5. Sulfur Oxidation */}
                    <AtomGroup id="sulfur_ox">
                        <text x="-10" y="5" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#d97706">S</text>
                        <circle cx="-10" cy="0" r="12" {...getHighlight('sulfur_ox')} />
                    </AtomGroup>
                    <line x1="-2" y1="0" x2="15" y2="0" stroke={bondColor} strokeWidth={bondWidth} />
                    
                    {/* 7. S-Dealkylation */}
                    <AtomGroup id="dealk_s">
                        <text x="25" y="5" textAnchor="middle" fontSize="12" fontWeight="bold">CH<tspan dy="3">3</tspan></text>
                        <rect x="10" y="-10" width="30" height="20" rx="5" {...getHighlight('dealk_s')} />
                    </AtomGroup>
                </g>
            </g>

            {/* RIGHT SIDE CHAIN (Skeletal Zig-Zag) */}
            {/* Attached at bottom-right vertex (26, 15) */}
            <g transform="translate(26, 15)">
                
                {/* Chain Path: Alpha -> Alkene -> Alcohol -> Omega-1 -> Omega */}
                {/* 
                   Coords relative to (26,15):
                   Start: 0,0
                   C1(α): 25, 15
                   C2: 50, 0
                   C3: 75, 15
                   C4(OH): 100, 0
                   C5: 125, 15
                   C6(ω-1): 150, 0
                   C7(ω): 175, 15
                */}
                <path 
                  d="M0,0 L25,15 L50,0 L75,15 L100,0 L125,15 L150,0 L175,15" 
                  stroke={bondColor} 
                  strokeWidth={bondWidth} 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />

                {/* Double Bond (C2-C3) */}
                <line x1="52" y1="5" x2="73" y2="18" stroke={bondColor} strokeWidth={bondWidth} strokeLinecap="round" />

                {/* OH Group at C4 */}
                <line x1="100" y1="0" x2="100" y2="-20" stroke={bondColor} strokeWidth={bondWidth} strokeLinecap="round" />
                <text x="100" y="-28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">OH</text>

                {/* 3. Alpha Hit (C1) */}
                <AtomGroup id="alkyl_ox_alpha">
                    <text x="25" y="35" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="bold">α</text>
                    <circle cx="25" cy="15" r="10" {...getHighlight('alkyl_ox_alpha')} />
                </AtomGroup>

                {/* 2. Alkene Hit (C2-C3) */}
                <AtomGroup id="alkene_ox">
                     <circle cx="62.5" cy="7.5" r="18" {...getHighlight('alkene_ox')} />
                </AtomGroup>

                {/* 4. Alcohol Hit (OH) */}
                <AtomGroup id="alcohol_ox">
                    <circle cx="100" cy="-30" r="15" {...getHighlight('alcohol_ox')} />
                </AtomGroup>

                {/* 3. Omega-1 Hit (C6) */}
                <AtomGroup id="alkyl_ox_omega_1">
                    <text x="150" y="-15" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="bold">ω-1</text>
                    <circle cx="150" cy="0" r="10" {...getHighlight('alkyl_ox_omega_1')} />
                </AtomGroup>

                {/* 3. Omega Hit (C7) */}
                <AtomGroup id="alkyl_ox_omega">
                    <text x="175" y="35" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="bold">ω</text>
                    <circle cx="175" cy="15" r="10" {...getHighlight('alkyl_ox_omega')} />
                </AtomGroup>
            </g>
        </g>

      </svg>
    </div>
  );
};
