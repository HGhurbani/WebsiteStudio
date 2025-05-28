import { Button } from "@/components/ui/button";

interface TopHeaderProps {
  websiteName?: string;
  onPreview?: () => void;
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

export default function TopHeader({
  websiteName = "موقع الشركة الرئيسي",
  onPreview,
  currentLanguage = "ar",
  onLanguageChange
}: TopHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="lg:hidden text-gray-500 hover:text-gray-700">
            <i className="fas fa-bars text-xl"></i>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              إدارة الموقع: {websiteName}
            </h1>
            <p className="text-gray-600">تحرير صفحات الموقع والمحتوى</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <Button onClick={onPreview} className="bg-primary hover:bg-primary/90">
            <i className="fas fa-eye ml-2 mr-0"></i>
            معاينة الموقع
          </Button>
          <div className="flex items-center space-x-2 space-x-reverse bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onLanguageChange?.("ar")}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                currentLanguage === "ar"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              عربي
            </button>
            <button
              onClick={() => onLanguageChange?.("en")}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                currentLanguage === "en"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
