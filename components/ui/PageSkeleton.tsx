import React from 'react';
import Card from './Card';

const PageSkeleton: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto w-full">
            <div className="relative overflow-hidden mb-8">
                <div className="h-10 w-1/3 bg-secondary rounded"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-x-full animate-shimmer"></div>
            </div>

            <Card className="relative overflow-hidden">
                 <div className="space-y-4">
                    <div className="h-6 w-3/4 bg-primary/80 rounded"></div>
                    <div className="h-4 w-full bg-primary/80 rounded"></div>
                    <div className="h-4 w-full bg-primary/80 rounded"></div>
                    <div className="h-4 w-5/6 bg-primary/80 rounded"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-x-full animate-shimmer"></div>
            </Card>
        </div>
    );
};

export default PageSkeleton;
