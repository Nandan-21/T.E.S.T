import { motion } from "framer-motion";

interface AccessPoint {
  x: string;
  y: string;
  type: "authorized" | "blocked";
  pulse?: boolean;
}

const accessPoints: AccessPoint[] = [
  { x: "25%", y: "35%", type: "authorized" },
  { x: "48%", y: "55%", type: "blocked" },
  { x: "72%", y: "45%", type: "authorized" },
  { x: "65%", y: "65%", type: "blocked", pulse: true },
  { x: "55%", y: "40%", type: "authorized" },
];

export function WorldMap() {
  return (
    <div className="relative w-full h-full bg-background overflow-hidden">
      {/* World Map SVG */}
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full opacity-30"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Simplified world map paths */}
        <g fill="currentColor" className="text-muted-foreground">
          {/* North America */}
          <path d="M150,120 Q180,100 220,105 L250,95 Q280,90 300,100 L320,95 Q350,100 370,120 L380,140 Q370,160 350,170 L330,180 Q300,200 280,210 L260,220 Q230,235 200,230 L180,220 Q150,200 140,180 L135,160 Q140,140 150,120 Z" />
          {/* South America */}
          <path d="M250,270 Q270,260 290,270 L310,290 Q320,320 315,350 L300,380 Q280,410 260,420 L240,415 Q220,400 225,370 L230,340 Q235,310 240,290 L250,270 Z" />
          {/* Europe */}
          <path d="M450,100 Q480,95 510,100 L540,105 Q560,110 570,125 L560,140 Q540,150 510,145 L480,150 Q460,145 450,130 L450,100 Z" />
          {/* Africa */}
          <path d="M470,180 Q500,170 530,175 L560,190 Q580,220 575,260 L560,300 Q540,340 510,360 L480,355 Q450,330 455,290 L460,250 Q465,210 470,180 Z" />
          {/* Asia */}
          <path d="M580,90 Q620,80 670,85 L720,95 Q770,100 810,120 L840,150 Q860,180 850,210 L820,230 Q780,250 730,245 L680,235 Q630,220 600,190 L580,160 Q570,130 580,90 Z" />
          {/* Russia/Northern Asia */}
          <path d="M550,60 Q600,50 680,55 L760,60 Q820,65 860,80 L880,100 Q870,120 840,115 L780,105 Q720,100 660,105 L600,100 Q560,90 550,60 Z" />
          {/* Australia */}
          <path d="M780,320 Q810,310 840,315 L870,330 Q890,350 885,375 L870,395 Q840,410 810,400 L785,385 Q765,360 770,340 L780,320 Z" />
          {/* Indonesia/Southeast Asia */}
          <path d="M740,250 Q760,245 780,250 L800,260 Q810,275 805,290 L790,300 Q770,305 755,295 L745,280 Q740,265 740,250 Z" />
          {/* Greenland */}
          <path d="M350,40 Q380,35 400,45 L410,60 Q405,80 385,85 L360,80 Q345,70 350,40 Z" />
          {/* UK/Ireland */}
          <path d="M430,110 Q445,105 455,115 L450,130 Q440,135 430,125 L430,110 Z" />
          {/* Japan */}
          <path d="M860,140 Q875,135 885,145 L880,165 Q870,175 860,165 L860,140 Z" />
          {/* Madagascar */}
          <path d="M590,340 Q600,335 610,345 L605,370 Q595,380 585,370 L590,340 Z" />
        </g>
      </svg>

      {/* Grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-10" />

      {/* Access Points */}
      {accessPoints.map((point, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: point.x, top: point.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              point.type === "authorized"
                ? "bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
                : "bg-cyber-red shadow-[0_0_10px_hsl(var(--cyber-red))]"
            } ${point.pulse ? "animate-ping" : ""}`}
          />
          {!point.pulse && (
            <div
              className={`absolute inset-0 w-3 h-3 rounded-full ${
                point.type === "authorized" ? "bg-primary" : "bg-cyber-red"
              } animate-pulse opacity-50`}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
