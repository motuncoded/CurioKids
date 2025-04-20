import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";



export default function Card({imageUrl, name, onNext, onPrev}) {
  const [rotation, setRotation] = useState(0);
  const [isSwinging, setIsSwinging] = useState(false);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  const handleMouseInteraction = () => {
    if (!isSwinging) {
      setIsSwinging(true);
      startTimeRef.current = Date.now();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animateSwing();
    } else {
      startTimeRef.current = Date.now();
    }
  };

  const animateSwing = () => {
    if (!startTimeRef.current) return;

    const elapsed = Date.now() - startTimeRef.current;
    const amplitude = 5;
    const period = 2000;
    const dampingFactor = Math.exp(-elapsed / 5000);

    const newRotation =
      amplitude * Math.sin((2 * Math.PI * elapsed) / period) * dampingFactor;
    setRotation(newRotation);

    if (Math.abs(dampingFactor) < 0.01) {
      setIsSwinging(false);
      setRotation(0);
      return;
    }

    animationRef.current = requestAnimationFrame(animateSwing);
  };

  useEffect(() => {
    handleMouseInteraction();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      {/* Wooden peg */}

      <div className="w-6 h-20 bg-gradient-to-b from-amber-700 to-amber-900 rounded-md shadow-md z-10" />

      {/* Rope + Card container */}
      <div
        className="flex flex-col items-center transition-transform"
        style={{
          transformOrigin: "top center",
          transform: `rotate(${rotation}deg)`,
          transition: isSwinging ? "none" : "transform 0.5s ease-out",
        }}
        onClick={handleMouseInteraction}
      >
        {/* Rope SVG */}
        <svg width="100" height="6" viewBox="0 0 100 60" className="my-2">
          <path
            d="M50,0 Q50,40 50,60"
            stroke="url(#ropeGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
        </svg>

        {/* Decorative line */}
        <div className=" absolute -top-16 w-64 h-1 bg-gradient-to-b from-amber-800 to-amber-600 rounded-full shadow-sm mb-4" />

        {/* Card */}
        <div className="w-full max-w-4xl shadow-lg border-2 border-amber-200 cursor-pointer hover:shadow-xl px-4 py-6 transition-shadow duration-300 bg-white rounded-md overflow-hidden">
          <div className="relative w-full overflow-hidden rounded-sm">
            <figure>
              <img
                src={imageUrl}
                alt={name}
                className="w-64 h-64 object-cover rounded-lg  mb-4"
              />
            </figure>
          </div>
        </div>
      </div>

      <div className="flex justify-around mt-4">
        <button className="flex" onClick={onPrev}>
          <ArrowLeft />
        </button>
        <button className="flex " onClick={onNext}>
          <ArrowRight />
        </button>
      </div>
      {/* Instructions */}
      <p className="text-sm text-slate-500 mt-8 text-center">
        Click on the card to make it swing!
      </p>
    </div>
  );
}
