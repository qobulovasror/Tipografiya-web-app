

const bgs = [
  "#FFFFFF",  // White (Classic & Professional)
  "#F8F9FA",  // Light Gray (Soft & Minimalist)
  "#E3E3E3",  // Silver Gray (Modern & Clean)
  "#FFD700",  // Gold (Luxurious & Premium)
  "#F4A261",  // Soft Orange (Creative & Friendly)
  "#E63946",  // Deep Red (Bold & Passionate)
  "#A8DADC",  // Soft Cyan (Fresh & Trustworthy)
  "#457B9D",  // Blue Steel (Professional & Corporate)
  "#1D3557",  // Dark Blue (Strong & Elegant)
  "#4CAF50",  // Green (Eco-Friendly & Growth)
  "#2ECC71",  // Emerald Green (Vibrant & Dynamic)
  "#8E44AD",  // Purple (Royal & Stylish)
  "#FFC107",  // Amber (Bright & Energetic)
  "#34495E",  // Charcoal Gray (Sleek & Modern)
  "#000000",   // Black (Luxury & High-End)
  "linear-gradient(to right, #FFD700, #FF6347)",
  "linear-gradient(to bottom, #4CAF50, #2ECC71)",
  "linear-gradient(to right, #FFD700, #E63946)",
  "linear-gradient(to right, #A8DADC, #457B9D)",
  "linear-gradient(to right, #2ECC71, #1D3557)",
  "linear-gradient(to right, #FFC107, #F4A261)",
  "linear-gradient(to right, #34495E, #000000)",

]

export function BackgroundColors() {
  return (
    <>
      {bgs.map((bg, index) => (
        <div key={index} className="w-10 h-10 hover:cursor-pointer" style={{ background: bg }}></div>
      ))}
    </>
  )
}




export function BackgroundImages() {
  return (
    <>
      {bgs.map((bg, index) => (
        <div key={index} className="w-10 h-10 hover:cursor-pointer" style={{ backgroundColor: bg }}></div>
      ))}
    </>
  )
}