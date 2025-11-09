import React from 'react';
import Card from './Card';

const SearchResultSkeleton: React.FC = () => (
    <Card className="relative overflow-hidden">
        <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full shrink-0 bg-primary/80"></div>
            <div className="w-full space-y-2">
                <div className="h-6 bg-primary/80 rounded w-3/4"></div>
                <div className="h-4 bg-primary/80 rounded w-1/2"></div>
            </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-x-full animate-shimmer"></div>
    </Card>
);

export default SearchResultSkeleton;
