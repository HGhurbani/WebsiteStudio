import type { VideoSection } from "@/types";

interface VideoWidgetProps {
  section: VideoSection;
  isEditing?: boolean;
}

export default function VideoWidget({ section, isEditing = false }: VideoWidgetProps) {
  const { title, videoUrl, description, thumbnail } = section.content;

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          {title || "قسم الفيديو"}
        </h2>
        {videoUrl ? (
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={getEmbedUrl(videoUrl)}
              title={title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <i className="fas fa-play text-4xl mb-4"></i>
              <p>لا يوجد فيديو مضاف بعد</p>
            </div>
          </div>
        )}
        {description && (
          <p className="text-center text-gray-600 mt-6 text-lg">
            {description}
          </p>
        )}
      </div>
      {isEditing && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          قسم الفيديو
        </div>
      )}
    </div>
  );
}
