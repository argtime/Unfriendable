import React from 'react';

const premadeAvatars = [
    'https://robohash.org/1.png?set=set4&size=120x120',
    'https://robohash.org/2.png?set=set4&size=120x120',
    'https://robohash.org/3.png?set=set4&size=120x120',
    'https://robohash.org/4.png?set=set4&size=120x120',
    'https://robohash.org/5.png?set=set4&size=120x120',
    'https://robohash.org/6.png?set=set4&size=120x120',
    'https://robohash.org/7.png?set=set4&size=120x120',
    'https://robohash.org/8.png?set=set4&size=120x120',
];

interface AvatarSelectorProps {
    selectedAvatar: string;
    onSelectAvatar: (url: string) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ selectedAvatar, onSelectAvatar }) => {
    return (
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 bg-primary p-2 rounded-lg">
            {premadeAvatars.map(url => (
                <button
                    type="button"
                    key={url}
                    onClick={() => onSelectAvatar(url)}
                    className={`
                        rounded-full aspect-square transition-all duration-200 bg-gray-700
                        ${selectedAvatar === url ? 'ring-2 ring-accent ring-offset-2 ring-offset-primary scale-110' : 'opacity-70 hover:opacity-100'}
                    `}
                >
                    <img src={url} alt="Avatar option" className="rounded-full w-full h-full object-cover" />
                </button>
            ))}
        </div>
    );
};

export default AvatarSelector;