import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { usePageStore } from "@/stores/pageStore";
import type { WidgetType } from "@/types";

const availableWidgets: WidgetType[] = [
  {
    id: "hero",
    name: "قسم رئيسي",
    icon: "fas fa-star",
    description: "عنوان + وصف + زر",
    type: "hero"
  },
  {
    id: "services",
    name: "بلوك الخدمات",
    icon: "fas fa-th-large", 
    description: "شبكة خدمات",
    type: "services"
  },
  {
    id: "gallery",
    name: "معرض صور",
    icon: "fas fa-images",
    description: "شبكة صور",
    type: "gallery"
  },
  {
    id: "video",
    name: "قسم فيديو",
    icon: "fas fa-play",
    description: "مقطع مرئي",
    type: "video"
  },
  {
    id: "text",
    name: "نص",
    icon: "fas fa-align-right",
    description: "محتوى نصي",
    type: "text"
  }
];

const headerTemplates = [
  {
    id: "classic",
    name: "رأس كلاسيكي",
    isSelected: true
  },
  {
    id: "centered",
    name: "رأس وسطي",
    isSelected: false
  },
  {
    id: "vertical",
    name: "رأس عمودي",
    isSelected: false
  }
];

export default function PropertiesPanel() {
  const { selectedSection, updateSection } = usePageStore();

  const handleSectionUpdate = (field: string, value: any) => {
    if (selectedSection) {
      updateSection(selectedSection.id, { [field]: value });
    }
  };

  const handleSave = () => {
    console.log("Save changes");
  };

  const renderSectionProperties = () => {
    if (!selectedSection) {
      return (
        <div className="text-center text-gray-500 py-8">
          <i className="fas fa-mouse-pointer text-2xl mb-2"></i>
          <p>اختر قسماً لتحرير خصائصه</p>
        </div>
      );
    }

    switch (selectedSection.type) {
      case "hero":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">العنوان الرئيسي</Label>
              <Input
                id="title"
                value={selectedSection.content.title || ""}
                onChange={(e) => handleSectionUpdate("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                rows={3}
                value={selectedSection.content.description || ""}
                onChange={(e) => handleSectionUpdate("description", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="buttonText">نص الزر</Label>
              <Input
                id="buttonText"
                value={selectedSection.content.buttonText || ""}
                onChange={(e) => handleSectionUpdate("buttonText", e.target.value)}
              />
            </div>
            <div>
              <Label>لون الخلفية</Label>
              <div className="flex space-x-2 space-x-reverse mt-2">
                {["from-purple-500 to-blue-600", "from-green-400 to-blue-600", "from-red-400 to-pink-600", "from-yellow-400 to-orange-600"].map((gradient, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 bg-gradient-to-r ${gradient} rounded border-2 cursor-pointer ${
                      index === 0 ? "border-primary" : "border-gray-300"
                    }`}
                    onClick={() => handleSectionUpdate("backgroundValue", `linear-gradient(135deg, ${gradient.replace("from-", "").replace(" to-", " 0%, ").replace("-", " ")} 100%)`)}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case "services":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="servicesTitle">عنوان القسم</Label>
              <Input
                id="servicesTitle"
                value={selectedSection.content.title || ""}
                onChange={(e) => handleSectionUpdate("title", e.target.value)}
              />
            </div>
            <div>
              <Label>الخدمات</Label>
              <p className="text-sm text-gray-600">
                عدد الخدمات: {selectedSection.content.services?.length || 0}
              </p>
            </div>
          </div>
        );

      case "text":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="textTitle">العنوان (اختياري)</Label>
              <Input
                id="textTitle"
                value={selectedSection.content.title || ""}
                onChange={(e) => handleSectionUpdate("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="textContent">المحتوى</Label>
              <Textarea
                id="textContent"
                rows={6}
                value={selectedSection.content.content || ""}
                onChange={(e) => handleSectionUpdate("content", e.target.value)}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <p>خصائص هذا النوع من الأقسام غير متاحة حالياً</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Widget Library */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">مكتبة الأدوات</CardTitle>
          <p className="text-sm text-gray-600">اسحب العناصر للصفحة</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {availableWidgets.map((widget) => (
            <div
              key={widget.id}
              className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer widget-preview transition-all"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <i className={`${widget.icon} text-blue-600`}></i>
                <div>
                  <div className="font-medium text-sm">{widget.name}</div>
                  <div className="text-xs text-gray-600">{widget.description}</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Section Properties */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">خصائص القسم</CardTitle>
          <p className="text-sm text-gray-600">
            {selectedSection ? `${selectedSection.type} محدد` : "لا يوجد قسم محدد"}
          </p>
        </CardHeader>
        <CardContent>
          {renderSectionProperties()}
          {selectedSection && (
            <Button onClick={handleSave} className="w-full mt-4 bg-primary hover:bg-primary/90">
              حفظ التغييرات
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Header Templates */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">قوالب الرأس</CardTitle>
          <p className="text-sm text-gray-600">اختر تصميم رأس الصفحة</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {headerTemplates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                template.isSelected
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{template.name}</span>
                {template.isSelected && (
                  <i className="fas fa-check text-primary"></i>
                )}
              </div>
              <div className="bg-white rounded p-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-3 bg-gray-300 rounded"></div>
                  <div className="flex space-x-1 space-x-reverse">
                    <div className="w-6 h-2 bg-gray-200 rounded"></div>
                    <div className="w-6 h-2 bg-gray-200 rounded"></div>
                    <div className="w-6 h-2 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
