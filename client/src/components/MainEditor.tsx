import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { usePageStore } from "@/stores/pageStore";
import HeroWidget from "./widgets/HeroWidget";
import ServicesWidget from "./widgets/ServicesWidget";
import GalleryWidget from "./widgets/GalleryWidget";
import VideoWidget from "./widgets/VideoWidget";
import TextWidget from "./widgets/TextWidget";
import type { PageSection } from "@/types";

export default function MainEditor() {
  const { currentPage } = usePageStore();
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const sections = currentPage?.sections || [];

  const renderSection = (section: PageSection) => {
    switch (section.type) {
      case "hero":
        return <HeroWidget key={section.id} section={section} />;
      case "services":
        return <ServicesWidget key={section.id} section={section} />;
      case "gallery":
        return <GalleryWidget key={section.id} section={section} />;
      case "video":
        return <VideoWidget key={section.id} section={section} />;
      case "text":
        return <TextWidget key={section.id} section={section} />;
      default:
        return (
          <div key={section.id} className="p-6 bg-gray-100 rounded-lg">
            <p className="text-gray-500">نوع قسم غير مدعوم: {section.type}</p>
          </div>
        );
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">تحرير المحتوى</h3>
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                previewMode === "desktop"
                  ? "bg-gray-100"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              سطح المكتب
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                previewMode === "mobile"
                  ? "bg-gray-100"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              الجوال
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div
          className={`transition-all duration-300 ${
            previewMode === "mobile" ? "max-w-sm mx-auto" : "w-full"
          }`}
        >
          <div className="min-h-[500px] bg-gray-50">
            {sections.length === 0 ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <i className="fas fa-plus text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    لا توجد أقسام بعد
                  </h3>
                  <p className="text-gray-600">
                    ابدأ بإضافة قسم جديد من الشريط الجانبي
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-0">
                {sections.map(renderSection)}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
