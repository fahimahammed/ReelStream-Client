import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Heart, Upload, LineChart } from "lucide-react";
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

  if (!data || !data.data) return null;

  const {
    totalViews = 0,
    totalLikes = 0,
    totalUploads = 0,
    engagementRate = 0,
    topVideos = [],
  } = data.data;

  console.log({ data })

  const stats = [
    {
      label: "Total Uploads",
      value: totalUploads,
      icon: <Upload className="w-6 h-6 text-green-500" />,
    },
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
      label: "Engagement Rate",
      value: `${engagementRate}%`,
      icon: <LineChart className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <div className="my-5">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-5">
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

      {/* Top Videos */}
      {topVideos.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Top Performing Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topVideos.map((video: any, index: any) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Views: {video.viewCount}</p>
                  <p className="text-sm text-gray-500">Likes: {video.likeCount}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
