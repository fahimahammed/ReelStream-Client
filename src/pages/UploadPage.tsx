import React from "react";
import UploadProgress from "../components/UploadProgress";

const UploadPage: React.FC = () => {
    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold">Upload Progress Tracker</h1>
            <UploadProgress />
        </div>
    );
};

export default UploadPage;
