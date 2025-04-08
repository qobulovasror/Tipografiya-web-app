
const bgs = [
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
]

interface Props {
  setCardBackground: (url: string)=>void
} 

export function BackgroundColors({setCardBackground}: Props) {
  return (
    <>
      {bgs.map((bg, index) => (
        <div key={index} onClick={()=>setCardBackground(bg)} className="w-9 h-9 hover:cursor-pointer" style={{ background: bg }}></div>
      ))}
    </>
  )
}



export function BackgroundImages({setCardBackground}: Props) {
  return (
    <>
      <div className="grid grid-cols-2">
        {Array(20).fill(1).map((_, index) => (
          <img
            key={index}
            src={`/images/img_for_cardBg/imgs${index+1}.jpg`}
            onClick={()=>setCardBackground(`url(/images/img_for_cardBg/imgs${index+1}.jpg)`)}
            className="w-full h-18 object-cover rounded-lg shadow-md m-1 px-1"
          />
        ))}
      </div>
    </>
  )
}