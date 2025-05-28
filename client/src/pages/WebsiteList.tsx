import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import type { Website } from "@shared/schema";

export default function WebsiteList() {
  const { data: websites, isLoading } = useQuery<Website[]>({
    queryKey: ["/api/websites"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
          <p className="text-lg text-gray-600">جاري تحميل المواقع...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader websiteName="إدارة جميع المواقع" />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">المواقع الإلكترونية</h1>
                <p className="text-gray-600 mt-1">إدارة وتحرير مواقعك الإلكترونية</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <i className="fas fa-plus ml-2 mr-0"></i>
                إضافة موقع جديد
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {websites?.map((website) => (
                <Card key={website.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{website.name}</CardTitle>
                      <Badge variant={website.isActive ? "default" : "secondary"}>
                        {website.isActive ? "نشط" : "غير نشط"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <i className="fas fa-globe w-4 ml-2 mr-0"></i>
                        {website.domain}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <i className="fas fa-language w-4 ml-2 mr-0"></i>
                        {website.supportedLanguages.join(", ")}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <i className="fas fa-palette w-4 ml-2 mr-0"></i>
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: website.primaryColor }}
                        ></div>
                        <span className="mr-2">{website.primaryColor}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 space-x-reverse mt-4">
                      <Link href={`/websites/${website.id}/pages/1`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          <i className="fas fa-edit ml-2 mr-0"></i>
                          تحرير
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <i className="fas fa-eye"></i>
                      </Button>
                      <Button variant="outline" size="sm">
                        <i className="fas fa-cog"></i>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {(!websites || websites.length === 0) && (
              <Card className="text-center py-12">
                <CardContent>
                  <i className="fas fa-globe text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    لا توجد مواقع بعد
                  </h3>
                  <p className="text-gray-600 mb-4">
                    ابدأ بإنشاء موقعك الإلكتروني الأول
                  </p>
                  <Button className="bg-primary hover:bg-primary/90">
                    <i className="fas fa-plus ml-2 mr-0"></i>
                    إضافة موقع جديد
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
