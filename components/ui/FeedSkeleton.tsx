import React from 'react';

const FeedSkeleton: React.FC = () => (
    <div className="bg-secondary p-4 rounded-lg border border-gray-800 flex items-start gap-4 overflow-hidden relative">
        <div className="w-10 h-10 rounded-full shrink-0 bg-primary/80"></div>
        <div className="flex-grow min-w-0 space-y-2">
            <div className="h-4 bg-primary/80 rounded w-3/4"></div>
            <div className="h-3 bg-primary/80 rounded w-1/2"></div>
            <div className="h-3 bg-primary/80 rounded w-1/4"></div>
        </div>
        <div className="w-10 h-10 rounded-full shrink-0 bg-primary/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-x-full animate-shimmer"></div>
    </div>
);

export default FeedSkeleton;
