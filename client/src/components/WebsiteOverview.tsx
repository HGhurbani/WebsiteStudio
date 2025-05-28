import { Card, CardContent } from "@/components/ui/card";

interface OverviewCardProps {
  icon: string;
  iconColor: string;
  value: string | number;
  title: string;
  subtitle: string;
}

function OverviewCard({ icon, iconColor, value, title, subtitle }: OverviewCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 bg-${iconColor}-100 rounded-lg flex items-center justify-center`}>
            <i className={`${icon} text-${iconColor}-600 text-xl`}></i>
          </div>
          <span className="text-2xl font-bold text-gray-900">{value}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

export default function WebsiteOverview() {
  const overviewData = [
    {
      icon: "fas fa-file-alt",
      iconColor: "blue",
      value: 24,
      title: "إجمالي الصفحات",
      subtitle: "+3 هذا الشهر"
    },
    {
      icon: "fas fa-eye",
      iconColor: "green",
      value: "1,234",
      title: "الزيارات اليومية",
      subtitle: "+12% من الأمس"
    },
    {
      icon: "fas fa-language",
      iconColor: "orange",
      value: 2,
      title: "اللغات المتاحة",
      subtitle: "عربي، إنجليزي"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {overviewData.map((item, index) => (
        <OverviewCard key={index} {...item} />
      ))}
    </div>
  );
}
