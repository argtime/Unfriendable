import React from 'react';

const premadeCovers = [
    'https://images.unsplash.com/photo-1554189097-90d532b24864?q=80&w=800&h=200&auto=format&fit=crop&crop=entropy',
    'https://images.unsplash.com/photo-1501696461415-6bd6660c6742?q=80&w=800&h=200&auto=format&fit=crop&crop=entropy',
    'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&h=200&auto=format&fit=crop&crop=entropy',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&h=200&auto=format&fit=crop&crop=entropy',
];


interface CoverImageSelectorProps {
    selectedCover: string;
    onSelectCover: (url: string) => void;
}

const CoverImageSelector: React.FC<CoverImageSelectorProps> = ({ selectedCover, onSelectCover }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-primary p-2 rounded-lg">
            {premadeCovers.map(url => (
                <button
                    type="button"
                    key={url}
                    onClick={() => onSelectCover(url)}
                    className={`
                       rounded-md aspect-[16/5] transition-all duration-200 bg-gray-700
                        ${selectedCover === url ? 'ring-2 ring-accent ring-offset-2 ring-offset-primary scale-105' : 'opacity-70 hover:opacity-100'}
                    `}
                >
                    <img src={url} alt="Cover image option" className="rounded-md w-full h-full object-cover" />
                </button>
            ))}
        </div>
    );
};

export default CoverImageSelector;