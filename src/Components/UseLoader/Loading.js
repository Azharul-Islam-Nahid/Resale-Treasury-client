import React from "react";
import './Loading.css';

const Loading = () => {
    return (
        <div className="loading">
            <div className="w-20 h-20 border-b-4 border-teal-500 rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;