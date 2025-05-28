import { Link, useLocation } from "wouter";

export default function Sidebar() {
  const [location] = useLocation();

  const navigationItems = [
    { icon: "fas fa-tachometer-alt", label: "لوحة القيادة", path: "/", count: null },
    { icon: "fas fa-globe", label: "إدارة المواقع", path: "/websites", count: 12 },
    { icon: "fas fa-file-alt", label: "الصفحات", path: "/pages", count: null },
    { icon: "fas fa-palette", label: "التصميم والألوان", path: "/design", count: null },
    { icon: "fas fa-language", label: "اللغات", path: "/languages", count: null },
    { icon: "fas fa-cog", label: "الإعدادات", path: "/settings", count: null },
  ];

  return (
    <div className="w-80 bg-white shadow-lg flex-shrink-0 border-l border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <i className="fas fa-globe text-white text-lg"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">إدارة المواقع</h2>
            <p className="text-sm text-gray-600">لوحة التحكم الرئيسية</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center space-x-3 space-x-reverse p-3 rounded-lg font-medium transition-colors ${
              location === item.path
                ? "bg-primary/10 text-primary"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <i className={`${item.icon} w-5`}></i>
            <span className="flex-1">{item.label}</span>
            {item.count && (
              <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                {item.count}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 right-4 left-4">
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">أح</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">أحمد محمد</p>
              <p className="text-sm text-gray-600">مدير النظام</p>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
