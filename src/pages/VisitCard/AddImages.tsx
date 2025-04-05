export default function AddImages() {
  return (
    <>
      <div className="grid grid-cols-5">
        {Array(10).fill(1).map((_, index) => (
          <img
            key={index}
            src={`/images/img_for_cardImg/img${index+1}.png`}
            className="w-full h-10 object-cover rounded-lg shadow-md m-1 px-1"
          />
        ))}
      </div>
    </>
  )
}