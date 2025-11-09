import React from 'react';
import FeedSkeleton from './ui/FeedSkeleton';
import Card from './ui/Card';

const ProfilePageSkeleton: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
                {/* Profile Header Skeleton */}
                <Card className="!p-0 overflow-hidden relative">
                    <div className="h-32 w-full bg-primary/80"></div>
                    <div className="absolute -bottom-12 left-6">
                        <div className="h-24 w-24 rounded-full bg-primary/80 border-4 border-secondary"></div>
                    </div>
                    <div className="pt-16 px-6 pb-6 space-y-2">
                        <div className="h-8 w-3/4 bg-primary/80 rounded"></div>
                        <div className="h-6 w-1/2 bg-primary/80 rounded"></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-x-full animate-shimmer"></div>
                </Card>

                {/* Bio Skeleton */}
                <Card className="relative overflow-hidden">
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-primary/80 rounded"></div>
                        <div className="h-4 w-3/4 bg-primary/80 rounded"></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-x-full animate-shimmer"></div>
                </Card>

                {/* Stats Skeleton */}
                <Card className="relative overflow-hidden">
                    <div className="grid grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center space-y-2">
                                <div className="h-7 w-8 bg-primary/80 rounded"></div>
                                <div className="h-3 w-12 bg-primary/80 rounded"></div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-x-full animate-shimmer"></div>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <div className="h-8 w-48 bg-secondary rounded mb-4"></div>
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => <FeedSkeleton key={i} />)}
                </div>
            </div>
        </div>
    );
};

export default ProfilePageSkeleton;
