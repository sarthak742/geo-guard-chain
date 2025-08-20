import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Shield, Wallet } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const UserProfile = () => {
  const { user, signOut } = useAuth();
  const [walletAddress] = useState('0x1234...5678'); // Mock wallet address

  if (!user) return null;

  const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email;
  const initials = displayName
    ?.split(' ')
    .map((name: string) => name[0])
    .join('')
    .toUpperCase() || '?';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={displayName} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium leading-none">{displayName}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user.email}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center">
          <Wallet className="mr-2 h-4 w-4" />
          <div className="flex flex-col">
            <span className="text-sm">Wallet Connected</span>
            <span className="text-xs text-muted-foreground">{walletAddress}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center">
          <Shield className="mr-2 h-4 w-4" />
          <span>Blockchain Status: Active</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="flex items-center text-red-600 dark:text-red-400"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};