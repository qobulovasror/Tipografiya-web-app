import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Reklama Dizayn Platformasi</h1>
      <p className="text-lg text-gray-600 mb-6">Vizitka, flyer, banner va boshqa dizaynlarni yarat!</p>
      <Button className="text-lg">Boshlash</Button>
    </div>
  );
}
