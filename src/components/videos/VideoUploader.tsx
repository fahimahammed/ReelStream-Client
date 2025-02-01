import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { uploadReel } from "@/services/reel.api";
import { toast } from "sonner";
import { uploadVideo } from "@/services/video.api";

const MAX_SIZE_MB = 50;
const MAX_DURATION_SEC = 60;

const VideoUploader = () => {
  const [uploadState, setUploadState] = useState({
    video: null as File | null,
    videoURL: null as string | null,
    title: "",
    description: "",
    error: null as string | null,
    progress: 0,
    uploading: false,
  });

  const { video, videoURL, title, description, error, progress, uploading } =
    uploadState;

  const queryClient = useQueryClient();

  const validateFile = (file: File): string | null => {
    if (file.type !== "video/mp4") return "Only MP4 format is allowed.";
    if (file.size > MAX_SIZE_MB * 1024 * 1024)
      return "File size should not exceed 50MB.";
    return null;
  };

  const handleFile = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setUploadState((prev) => ({ ...prev, error: validationError }));
      return;
    }

    const videoElement = document.createElement("video");
    videoElement.preload = "metadata";
    videoElement.src = URL.createObjectURL(file);

    videoElement.onloadedmetadata = () => {
      if (videoElement.duration > MAX_DURATION_SEC) {
        setUploadState((prev) => ({
          ...prev,
          error: "Video duration should not exceed 60 seconds.",
        }));
        return;
      }

      setUploadState({
        video: file,
        videoURL: URL.createObjectURL(file),
        title: "",
        description: "",
        error: null,
        progress: 0,
        uploading: false,
      });
    };
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    event.target.value = "";
    handleFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    handleFile(file);
  };

  const handleRemoveVideo = () => {
    setUploadState({
      video: null,
      videoURL: null,
      title: "",
      description: "",
      error: null,
      progress: 0,
      uploading: false,
    });
  };

  const handleUpload = async () => {
    if (!video || !title || !description) return;

    setUploadState((prev) => ({ ...prev, uploading: true, progress: 5 }));

    const formData = new FormData();
    formData.append("video", video);
    formData.append("data", JSON.stringify({ title, description }));

    let progress = 5;
    const interval = setInterval(() => {
      progress += 1;
      setUploadState((prev) => ({ ...prev, progress }));

      if (progress >= 95) clearInterval(interval);
    }, 300);

    try {
      const res = await uploadVideo(formData);
      console.log(res);
      clearInterval(interval);

      if (res?.success) {
        setUploadState((prev) => ({ ...prev, progress: 100 }));
        queryClient.invalidateQueries({ queryKey: ["video", "videos"] });
        toast.success(res.message);
        setTimeout(() => {
          setUploadState({
            video: null,
            videoURL: null,
            title: "",
            description: "",
            error: null,
            progress: 0,
            uploading: false,
          });
        }, 500);
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error("Upload Error:", err.message);
      setUploadState((prev) => ({
        ...prev,
        error: err.message,
        uploading: false,
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-3">
      <Card className="p-4 border rounded-lg bg-black text-white">
        <Label htmlFor="video-upload" className="block text-lg font-semibold">
          Upload Video
        </Label>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer h-72"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {!video ? (
            <label
              htmlFor="video-upload"
              className="flex flex-col items-center cursor-pointer"
            >
              <UploadCloud className="w-12 h-12 text-gray-500" />
              <span className="mt-2 text-gray-500">
                Drag & drop or click to upload
              </span>
            </label>
          ) : (
            <div className="relative w-full max-h-64">
              <video className="rounded-lg w-full h-auto max-h-64" controls>
                <source src={videoURL!} type="video/mp4" />
              </video>
              <button
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                onClick={handleRemoveVideo}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        <Input
          id="video-upload"
          type="file"
          className="hidden"
          accept="video/mp4"
          onChange={handleFileChange}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </Card>

      {uploading && <Progress value={progress} className="h-3 mt-1" />}

      {video && (
        <Card className="p-4 mt-1 bg-black text-white">
          <Input
            type="text"
            placeholder="Enter video title..."
            value={title}
            onChange={(e) =>
              setUploadState((prev) => ({ ...prev, title: e.target.value }))
            }
            className="mt-2"
          />
          <Textarea
            placeholder="Enter video description..."
            value={description}
            onChange={(e: any) =>
              setUploadState((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="mt-2"
          />
        </Card>
      )}

      <Button
        className="w-full mt-2"
        disabled={!video || !title || uploading || !description}
        onClick={handleUpload}
      >
        {uploading ? "Uploading..." : "Upload Video"}
      </Button>
    </div>
  );
};

export default VideoUploader;
