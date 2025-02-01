import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Eye, Heart, Upload } from "lucide-react";
import Spinner from "../ui/spinner";
import { useAnalytics } from "@/hooks/analytics";

const Analytics = () => {
  const { data, isLoading } = useAnalytics();

  if (isLoading)
    return (
      <div className="flex justify-center my-5">
        <Spinner />
      </div>
    );

  const {
    data: { totalViews, totalLikes, totalUploads },
  } = data || {};

  const stats = [
    {
      label: "Total Views",
      value: totalViews,
      icon: <Eye className="w-6 h-6 text-blue-500" />,
    },
    {
      label: "Total Likes",
      value: totalLikes,
      icon: <Heart className="w-6 h-6 text-red-500" />,
    },
    {
      label: "Total Uploads",
      value: totalUploads,
      icon: <Upload className="w-6 h-6 text-green-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex items-center gap-3">
            {stat.icon}
            <CardTitle className="text-lg font-semibold">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Analytics;
