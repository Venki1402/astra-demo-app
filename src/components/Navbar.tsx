import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LogOut, LayoutDashboard, Shield } from 'lucide-react';

export default function Navbar() {
  const { user, userRole, loading, error, signIn, logOut, clearError } = useAuth();
  const [showError, setShowError] = useState(false);

  // Show error alert when error changes
  useEffect(() => {
    if (error) {
      setShowError(true);
      // Auto-hide error after 10 seconds
      const timer = setTimeout(() => {
        setShowError(false);
        clearError();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleDismissError = () => {
    setShowError(false);
    clearError();
  };

  return (
    <>
      <nav className="bg-white border-b-4 border-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <Image 
              src="/icon.svg" 
              alt="Astra Labs Logo" 
              width={32} 
              height={32} 
              className="h-8 w-auto" 
            />
            Astra Labs
          </Link>

          <div className="flex items-center gap-6">
            {/* Main Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/gallery" className="text-lg font-bold hover:underline">
                Gallery
              </Link>
              <Link href="/leaderboard" className="text-lg font-bold hover:underline">
                Leaderboard
              </Link>
            </div>

            {/* Mobile Navigation Links */}
            <div className="md:hidden flex gap-4">
              <Link href="/gallery" className="text-base font-bold">
                Gallery
              </Link>
              <Link href="/leaderboard" className="text-base font-bold">
                Leaderboard
              </Link>
            </div>

            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center">
                    {/* User Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                          {user.photoURL ? (
                            <img 
                              src={user.photoURL} 
                              alt={user.displayName || 'User'} 
                              className="w-8 h-8 rounded-full border-2 border-black"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border-2 border-black">
                              <span className="font-bold">{user.displayName?.charAt(0) || 'U'}</span>
                            </div>
                          )}
                          <span className="font-bold text-lg hidden md:inline">{user.displayName}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 border-2 border-black bg-white mt-1 p-0 rounded-none">
                        <DropdownMenuItem asChild className="py-3 focus:bg-gray-100 focus:text-black border-b border-gray-200">
                          <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                            <LayoutDashboard className="h-4 w-4" />
                            <span>Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        {userRole === 'admin' && (
                          <DropdownMenuItem asChild className="py-3 focus:bg-gray-100 focus:text-black border-b border-gray-200">
                            <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
                              <Shield className="h-4 w-4" />
                              <span>Admin Dashboard</span>
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={logOut} className="flex items-center gap-2 cursor-pointer text-red-600 py-3 focus:bg-gray-100 focus:text-red-600">
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <Button onClick={signIn} className="border-2 border-black">
                    Sign In with Google
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Error Alert */}
      {showError && error && (
        <div className="container mx-auto px-4 mt-4">
          <Alert variant="destructive" className="relative">
            <AlertDescription>{error}</AlertDescription>
            <button 
              onClick={handleDismissError}
              className="absolute top-2 right-2 text-xl font-bold"
              aria-label="Close"
            >
              ×
            </button>
          </Alert>
        </div>
      )}
    </>
  );
} 