import Spinner from "@/components/ui/spinner";
import LoadMore from "@/components/videos/LoadMore";
import VideoFeed from "@/components/videos/VideoFeed";
import { useGetAllVideos } from "@/hooks/video";

const Home = () => {
    const { data: videosData, isLoading } = useGetAllVideos(1, 4);

    console.log(videosData)

    if (isLoading)
        return (
            <div className="flex justify-center my-5">
                <Spinner />
            </div>
        );

    const {
        data: { data: videos, meta },
    } = videosData || {};

    console.log({ meta })

    return (
        <div className="container mx-auto">
            {/* <VideoFeed /> */}
            {videos?.length ? (
                <>
                    <VideoFeed videosData={videos} />
                    {meta?.total >= 5 && <LoadMore />}
                </>
            ) : (
                <p className="text-center mt-10">No Video Found!</p>
            )}
        </div>
    );
};

export default Home;
