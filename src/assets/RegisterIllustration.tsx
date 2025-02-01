const RegisterIllustration = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            {...props}
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            {/* Background Circle */}
            <circle cx="100" cy="100" r="80" fill="#3B82F6" opacity="0.2" />

            {/* User Icon */}
            <circle cx="100" cy="80" r="30" fill="#3B82F6" stroke="white" strokeWidth="4" />
            <path
                d="M50 150c0-20 20-40 50-40s50 20 50 40"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#3B82F6"
            />

            {/* Clipboard */}
            <rect x="120" y="70" width="40" height="50" rx="5" fill="white" />
            <rect x="128" y="78" width="24" height="5" rx="2" fill="#3B82F6" />
            <rect x="128" y="90" width="18" height="3" rx="1.5" fill="#3B82F6" />
            <rect x="128" y="98" width="18" height="3" rx="1.5" fill="#3B82F6" />

            {/* Checkmark */}
            <path d="M130 110l5 5 10-10" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default RegisterIllustration;
