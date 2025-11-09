import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { HappeningType } from '../types';
import Spinner from './ui/Spinner';
import { UsersIcon, UserPlusIcon, SparklesIcon, FireIcon } from '@heroicons/react/24/outline';

interface Stats {
  totalUsers: number | null;
  newUsersToday: number | null;
  totalHappenings: number | null;
  mostFrequentAction: { type: string; count: number } | null;
}

const StatCard: React.FC<{ icon: React.ElementType, title: string, value: string | number, isLoading: boolean }> = ({ icon: Icon, title, value, isLoading }) => (
    <div className="bg-primary p-4 rounded-lg flex items-center gap-4">
        <div className="bg-accent/20 text-accent p-3 rounded-full">
            <Icon className="h-6 w-6" />
        </div>
        <div>
            <p className="text-sm text-medium">{title}</p>
            {isLoading ? <div className="h-7 w-16 bg-secondary/50 rounded animate-pulse mt-1"></div> : 
            <p className="text-2xl font-bold text-light">{value}</p>}
        </div>
    </div>
);


const PlatformStats: React.FC = () => {
    const [stats, setStats] = useState<Stats>({
        totalUsers: null,
        newUsersToday: null,
        totalHappenings: null,
        mostFrequentAction: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const [
                { count: totalUsers },
                { count: newUsersToday },
                { count: totalHappenings },
                { data: recentHappenings }
            ] = await Promise.all([
                supabase.from('users').select('*', { count: 'exact', head: true }),
                supabase.from('users').select('*', { count: 'exact', head: true }).gte('created_at', today.toISOString()),
                supabase.from('happenings').select('*', { count: 'exact', head: true }),
                supabase.from('happenings').select('action_type').limit(1000)
            ]);
            
            let mostFrequent: { type: string; count: number } | null = null;
            if (recentHappenings && recentHappenings.length > 0) {
                const counts = recentHappenings.reduce((acc, { action_type }) => {
                    acc[action_type] = (acc[action_type] || 0) + 1;
                    return acc;
                }, {} as Record<HappeningType, number>);
                
                const [type, count] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
                mostFrequent = { type, count };
            }

            setStats({
                totalUsers,
                newUsersToday,
                totalHappenings,
                mostFrequentAction: mostFrequent
            });
            setLoading(false);
        };

        fetchStats();
    }, []);

    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-light mb-4">Platform Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               <StatCard 
                    icon={UsersIcon} 
                    title="Total Users" 
                    value={stats.totalUsers ?? '...'} 
                    isLoading={loading}
                />
                 <StatCard 
                    icon={UserPlusIcon} 
                    title="New Users Today" 
                    value={stats.newUsersToday ?? '...'} 
                    isLoading={loading}
                />
                 <StatCard 
                    icon={SparklesIcon} 
                    title="Total Happenings" 
                    value={stats.totalHappenings ?? '...'} 
                    isLoading={loading}
                />
                 <StatCard 
                    icon={FireIcon} 
                    title="Hottest Action" 
                    value={stats.mostFrequentAction?.type.replace(/_/g, ' ') ?? '...'} 
                    isLoading={loading}
                />
            </div>
        </div>
    );
};

export default PlatformStats;