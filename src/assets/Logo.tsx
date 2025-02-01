const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {/* Clapperboard Base */}
      <rect x="5" y="15" width="40" height="28" rx="3" fill="black" stroke="white" strokeWidth="2" />

      {/* Play Button */}
      <polygon points="20,22 32,25 20,32" fill="white" />

      {/* Clapperboard Top */}
      <path d="M5 15 L45 15 L40 5 L10 5 Z" fill="black" stroke="white" strokeWidth="2" />

      {/* Clapperboard Stripes */}
      <line x1="10" y1="5" x2="17" y2="15" stroke="white" strokeWidth="2" />
      <line x1="20" y1="5" x2="27" y2="15" stroke="white" strokeWidth="2" />
      <line x1="30" y1="5" x2="37" y2="15" stroke="white" strokeWidth="2" />
    </svg>
  );
};

export default Logo;
