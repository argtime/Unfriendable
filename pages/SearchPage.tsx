import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { UserProfile } from '../types';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import SearchResultSkeleton from '../components/ui/SearchResultSkeleton';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localQuery, setLocalQuery] = useState(query || '');

  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
        .limit(25);

      if (error) {
        setError('Failed to fetch search results.');
        console.error(error);
      } else {
        setResults(data || []);
      }
      setLoading(false);
    };

    performSearch();
  }, [query]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery.trim() });
    } else {
      setSearchParams({});
    }
  };


  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {query ? (
          <>Search Results for <span className="text-accent">"{query}"</span></>
        ) : (
          "Search for Users"
        )}
      </h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Find users by username or display name..."
            className="w-full bg-secondary border border-gray-700 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
          />
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
      </form>
      
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SearchResultSkeleton key={i} />)}
        </div>
      )}
      
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map(user => (
                <Link to={`/profile/${user.username}`} key={user.id}>
                  <Card className="hover:border-accent transition-all duration-200 ease-in-out hover:scale-[1.02]">
                    <div className="flex items-center gap-4">
                      <Avatar displayName={user.display_name} imageUrl={user.avatar_url} size="md" />
                      <div>
                        <h2 className="text-xl font-bold">{user.display_name}</h2>
                        <p className="text-medium">@{user.username}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
             query && <p className="text-center text-medium mt-10">No users found for "{query}".</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;