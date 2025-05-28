import { Button } from "@/components/ui/button";
import type { HeroSection } from "@/types";

interface HeroWidgetProps {
  section: HeroSection;
  isEditing?: boolean;
}

export default function HeroWidget({ section, isEditing = false }: HeroWidgetProps) {
  const { title, description, buttonText, backgroundValue } = section.content;
  
  const backgroundStyle = backgroundValue.startsWith("linear-gradient") 
    ? { background: backgroundValue }
    : { backgroundColor: backgroundValue };

  return (
    <div 
      className="text-center text-white py-16 px-6"
      style={backgroundStyle}
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        {title || "عنوان القسم الرئيسي"}
      </h1>
      <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
        {description || "وصف القسم الرئيسي"}
      </p>
      {buttonText && (
        <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-bold">
          {buttonText}
        </Button>
      )}
      {isEditing && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          قسم رئيسي
        </div>
      )}
    </div>
  );
}
