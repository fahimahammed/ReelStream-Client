import React, { useState, useEffect } from "react";
import { socket } from "../services/socket"; // Import socket instance

const UploadProgress: React.FC = () => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        socket.on("uploadProgress", (data: { progress: number }) => {
            console.log(data.progress);
            setProgress(data.progress);
        });

        return () => {
            socket.off("uploadProgress");
        };
    }, []);

    return (
        <div className="p-5">
            <h1 className="text-xl font-bold mb-3">Upload Progress</h1>
            <div className="mt-4">
                <p>Progress: {progress.toFixed(2)}%</p>
                <div className="w-full bg-gray-200 h-4 rounded">
                    <div
                        className="h-full bg-blue-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default UploadProgress;
