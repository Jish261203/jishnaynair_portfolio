const colorSchemes = {
  blue: {
    background: "#60A5FA",
    circles: ["#4E71FF", "#A78BFA", "#0065F8", "#3B82F6", "#0F2F65", "#679EF8"],
  },
  sunset: {
    background: "#FED7AA",
    circles: ["#F97316", "#FBBF24", "#FB923C", "#FCA5A5", "#DC2626", "#FDE047"],
  },
  ocean: {
    background: "#67E8F9",
    circles: ["#0891B2", "#06B6D4", "#0E7490", "#22D3EE", "#155E75", "#38BDF8"],
  },
  forest: {
    background: "#86EFAC",
    circles: ["#16A34A", "#22C55E", "#15803D", "#4ADE80", "#14532D", "#84CC16"],
  },
  purple: {
    background: "#E9D5FF",
    circles: ["#9333EA", "#A855F7", "#7C3AED", "#C084FC", "#6B21A8", "#D946EF"],
  },
  cosmic: {
    background: "#1E1B4B",
    circles: ["#8B5CF6", "#EC4899", "#6366F1", "#A78BFA", "#7C3AED", "#C084FC"],
  },
  coral: {
    background: "#FFE4E1",
    circles: ["#FF6B6B", "#FF8787", "#FA5252", "#FFA8A8", "#FF4757", "#EE5A6F"],
  },
  midnight: {
    background: "#0F172A",
    circles: ["#3B82F6", "#8B5CF6", "#06B6D4", "#6366F1", "#0EA5E9", "#7C3AED"],
  },
  aurora: {
    background: "#064E3B",
    circles: ["#34D399", "#10B981", "#6EE7B7", "#A7F3D0", "#5EEAD4", "#2DD4BF"],
  },
  rose: {
    background: "#FFF1F2",
    circles: ["#F43F5E", "#FB7185", "#E11D48", "#FDA4AF", "#BE123C", "#FBBF24"],
  },
  neon: {
    background: "#0A0E27",
    circles: ["#00FF88", "#FF006E", "#00D9FF", "#FFD600", "#FF00FF", "#00FFFF"],
  },
  lavender: {
    background: "#F3E8FF",
    circles: ["#9F7AEA", "#B794F4", "#805AD5", "#D6BCFA", "#6B46C1", "#E9D8FD"],
  },
  tropical: {
    background: "#FEFCE8",
    circles: ["#F59E0B", "#10B981", "#EC4899", "#14B8A6", "#EAB308", "#06B6D4"],
  },
  ember: {
    background: "#431407",
    circles: ["#F97316", "#EA580C", "#FB923C", "#FDBA74", "#DC2626", "#FED7AA"],
  },
  arctic: {
    background: "#F0F9FF",
    circles: ["#7DD3FC", "#BAE6FD", "#38BDF8", "#E0F2FE", "#0284C7", "#DBEAFE"],
  },

  mint: {
    background: "#D1FAE5",
    circles: ["#34D399", "#10B981", "#2DD4BF", "#06B6D4", "#84CC16", "#059669"],
  },
  dusk: {
    background: "#EDE9FE",
    circles: ["#7C3AED", "#6366F1", "#4338CA", "#A78BFA", "#4F46E5", "#60A5FA"],
  },

  citrus: {
    background: "#FEF9C3",
    circles: ["#F59E0B", "#84CC16", "#FDE047", "#F97316", "#22C55E", "#EAB308"],
  },
  lava: {
    background: "#FEE2E2",
    circles: ["#EF4444", "#DC2626", "#B91C1C", "#F97316", "#EA580C", "#FB923C"],
  },
  sakura: {
    background: "#FFE4E6",
    circles: ["#F9A8D4", "#F472B6", "#EC4899", "#FB7185", "#F43F5E", "#DB2777"],
  },
  vaporwave: {
    background: "#F5D0FE",
    circles: ["#D946EF", "#22D3EE", "#A78BFA", "#06B6D4", "#F59E0B", "#F43F5E"],
  },
  desert: {
    background: "#FFEDD5",
    circles: ["#D97706", "#A16207", "#92400E", "#F59E0B", "#78350F", "#EAB308"],
  },
};

const circles = [
  {
    width: "687px",
    height: "521px",
    top: "23.25%",
    left: "26.72%",
    tx1: -0.1894,
    ty1: -0.8007,
    tx2: -0.9368,
    ty2: -0.12,
    tx3: -0.5575,
    ty3: 0.0602,
    tx4: 0.3657,
    ty4: 0.4741,
  },
  {
    width: "521px",
    height: "687px",
    top: "28.37%",
    left: "24.60%",
    tx1: 0.3813,
    ty1: 0.2026,
    tx2: -0.8279,
    ty2: 0.3383,
    tx3: -0.0991,
    ty3: -0.5716,
    tx4: 0.035,
    ty4: 0.3917,
  },
  {
    width: "521px",
    height: "521px",
    top: "22.69%",
    left: "3.82%",
    tx1: 0.1156,
    ty1: 0.159,
    tx2: -0.3001,
    ty2: 0.3193,
    tx3: -0.1404,
    ty3: 0.3908,
    tx4: -0.5032,
    ty4: 0.2224,
  },
  {
    width: "687px",
    height: "521px",
    top: "28.05%",
    left: "8.27%",
    tx1: 0.491,
    ty1: 0.366,
    tx2: 0.3841,
    ty2: 0.1078,
    tx3: -0.151,
    ty3: -0.5057,
    tx4: 0.2474,
    ty4: 0.1654,
  },
  {
    width: "687px",
    height: "687px",
    top: "28.74%",
    left: "28.14%",
    tx1: 0.3705,
    ty1: -0.3162,
    tx2: 0.3057,
    ty2: -0.9262,
    tx3: -0.0795,
    ty3: 0.2212,
    tx4: 0.178,
    ty4: -0.0017,
  },
  {
    width: "687px",
    height: "687px",
    top: "1.33%",
    left: "25.59%",
    tx1: -0.1754,
    ty1: 0.2373,
    tx2: -0.5778,
    ty2: -0.6463,
    tx3: 0.3439,
    ty3: 0.017,
    tx4: -0.1192,
    ty4: 0.3185,
  },
];

const BackgroundAnimation = ({
  color = "blue",
}: {
  color?: keyof typeof colorSchemes;
}) => {
  const selectedScheme = colorSchemes[color] || colorSchemes.blue;

  return (
    <>
      <div
        className="relative h-screen overflow-hidden duration-500 transition-colors"
        style={{ backgroundColor: selectedScheme.background }}
      >
        <div className="absolute inset-0 blur-[100px]">
          {circles.map((circle, index) => (
            <svg
              key={index}
              className="animate-background-gradient absolute"
              width={circle.width}
              height={circle.height}
              viewBox="0 0 100 100"
              style={
                {
                  top: circle.top,
                  left: circle.left,
                  "--tx-1": circle.tx1,
                  "--ty-1": circle.ty1,
                  "--tx-2": circle.tx2,
                  "--ty-2": circle.ty2,
                  "--tx-3": circle.tx3,
                  "--ty-3": circle.ty3,
                  "--tx-4": circle.tx4,
                  "--ty-4": circle.ty4,
                } as React.CSSProperties
              }
            >
              <circle
                cx="50"
                cy="50"
                r="50"
                fill={selectedScheme.circles[index]}
              />
            </svg>
          ))}
        </div>
      </div>
    </>
  );
};

export default BackgroundAnimation;