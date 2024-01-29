export const AnimatedTextGradientTW: React.FC = () => {
  return (
    <div className="bg-secondary/5 border rounded-lg  p-4 flex items-center justify-center mt-4">
      <span
        className="animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] 
      bg-[200%_auto] bg-clip-text text-transparent font-bold text-2xl"
      >
        Lorem, ipsum dolor sit amet
      </span>
    </div>
  );
};
