import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePageStore } from "@/stores/pageStore";
import type { PageSection } from "@/types";

interface SectionItemProps {
  section: PageSection;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
}

function SectionItem({ section, isSelected, onSelect, onEdit }: SectionItemProps) {
  const getSectionIcon = (type: string) => {
    switch (type) {
      case "hero": return "fas fa-star";
      case "services": return "fas fa-th-large";
      case "gallery": return "fas fa-images";
      case "video": return "fas fa-play";
      case "text": return "fas fa-align-right";
      default: return "fas fa-square";
    }
  };

  const getSectionTitle = (type: string) => {
    switch (type) {
      case "hero": return "القسم الرئيسي";
      case "services": return "قسم الخدمات";
      case "gallery": return "معرض الصور";
      case "video": return "قسم الفيديو";
      case "text": return "قسم النص";
      default: return "قسم";
    }
  };

  const getSectionDescription = (section: PageSection) => {
    switch (section.type) {
      case "hero": return "عنوان + وصف + زر";
      case "services": return `${section.content.services?.length || 0} خدمات`;
      case "gallery": return `${section.content.images?.length || 0} صور في الشبكة`;
      case "video": return "مقطع مرئي";
      case "text": return "محتوى نصي";
      default: return "محتوى مخصص";
    }
  };

  return (
    <div
      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
        isSelected ? "border-primary bg-primary/5" : "border-gray-200 bg-gray-50"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 space-x-reverse">
          <i className="fas fa-grip-vertical text-gray-400 drag-handle"></i>
          <i className={`${getSectionIcon(section.type)} text-blue-600`}></i>
          <span className="font-medium text-sm">{getSectionTitle(section.type)}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <i className="fas fa-edit text-sm"></i>
        </button>
      </div>
      <div className="text-xs text-gray-600">{getSectionDescription(section)}</div>
    </div>
  );
}

export default function PageStructurePanel() {
  const { currentPage, selectedSection, setSelectedSection } = usePageStore();
  const sections = currentPage?.sections || [];

  const handleSelectSection = (section: PageSection) => {
    setSelectedSection(section);
  };

  const handleEditSection = (section: PageSection) => {
    setSelectedSection(section);
  };

  const handleAddSection = () => {
    // This would open a modal to add a new section
    console.log("Add new section");
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">هيكل الصفحة</CardTitle>
        <p className="text-sm text-gray-600">اسحب العناصر لإعادة ترتيبها</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {sections.map((section) => (
          <SectionItem
            key={section.id}
            section={section}
            isSelected={selectedSection?.id === section.id}
            onSelect={() => handleSelectSection(section)}
            onEdit={() => handleEditSection(section)}
          />
        ))}
        
        <div className="pt-4 border-t border-gray-200">
          <Button 
            onClick={handleAddSection}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <i className="fas fa-plus ml-2 mr-0"></i>
            إضافة قسم جديد
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
