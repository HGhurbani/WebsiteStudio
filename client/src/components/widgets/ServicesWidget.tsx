import type { ServicesSection } from "@/types";

interface ServicesWidgetProps {
  section: ServicesSection;
  isEditing?: boolean;
}

export default function ServicesWidget({ section, isEditing = false }: ServicesWidgetProps) {
  const { title, services } = section.content;

  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          {title || "عنوان قسم الخدمات"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services && services.length > 0 ? (
            services.map((service, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${service.icon || 'fas fa-star'} text-blue-600 text-2xl`}></i>
                </div>
                <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              <p>لا توجد خدمات مضافة بعد</p>
            </div>
          )}
        </div>
      </div>
      {isEditing && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          قسم الخدمات
        </div>
      )}
    </div>
  );
}
