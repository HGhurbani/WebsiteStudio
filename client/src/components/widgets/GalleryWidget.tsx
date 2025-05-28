import type { GallerySection } from "@/types";

interface GalleryWidgetProps {
  section: GallerySection;
  isEditing?: boolean;
}

export default function GalleryWidget({ section, isEditing = false }: GalleryWidgetProps) {
  const { title, images, layout } = section.content;

  const getGridClass = () => {
    switch (layout) {
      case "masonry":
        return "columns-1 md:columns-3 gap-4";
      case "carousel":
        return "flex overflow-x-auto space-x-4 space-x-reverse pb-4";
      default:
        return "grid grid-cols-1 md:grid-cols-3 gap-4";
    }
  };

  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          {title || "معرض الصور"}
        </h2>
        {images && images.length > 0 ? (
          <div className={getGridClass()}>
            {images.map((image, index) => (
              <div
                key={index}
                className={`${layout === "carousel" ? "flex-shrink-0 w-80" : ""} relative group`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-64 object-cover rounded-lg"
                />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg">
                    <p className="text-sm">{image.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <i className="fas fa-images text-4xl mb-4"></i>
            <p>لا توجد صور مضافة بعد</p>
          </div>
        )}
      </div>
      {isEditing && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          معرض الصور
        </div>
      )}
    </div>
  );
}
