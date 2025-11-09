import React from 'react';

interface TableSkeletonProps {
    rows?: number;
    cols?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, cols = 4 }) => {
    return (
        <div className="w-full overflow-hidden relative border border-gray-800 rounded-lg">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-primary">
                        <tr>
                            {Array.from({ length: cols }).map((_, i) => (
                                <th key={i} className="p-3">
                                    <div className="h-5 bg-secondary/80 rounded"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <tr key={rowIndex} className="border-b border-gray-800">
                                {Array.from({ length: cols }).map((_, colIndex) => (
                                    <td key={colIndex} className="p-3">
                                        <div className="h-5 bg-secondary/80 rounded"></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-x-full animate-shimmer"></div>
        </div>
    );
};

export default TableSkeleton;
