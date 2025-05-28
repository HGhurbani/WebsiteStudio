import type { TextSection } from "@/types";

interface TextWidgetProps {
  section: TextSection;
  isEditing?: boolean;
}

export default function TextWidget({ section, isEditing = false }: TextWidgetProps) {
  const { title, content, alignment } = section.content;

  const getAlignmentClass = () => {
    switch (alignment) {
      case "center":
        return "text-center";
      case "left":
        return "text-left";
      case "right":
        return "text-right";
      default:
        return "text-right";
    }
  };

  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2 className={`text-3xl font-bold text-gray-900 mb-8 ${getAlignmentClass()}`}>
            {title}
          </h2>
        )}
        <div
          className={`prose prose-lg max-w-none text-gray-600 ${getAlignmentClass()}`}
          dangerouslySetInnerHTML={{ 
            __html: content || "محتوى نصي فارغ"
          }}
        />
      </div>
      {isEditing && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          قسم النص
        </div>
      )}
    </div>
  );
}
