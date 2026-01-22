'use client';

import { signOutUser } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOutUser();
  };
  return (
    <DropdownMenuItem className="mb-1 p-0" onSelect={e => e.preventDefault()}>
      <Button
        className="h-4 w-full justify-start px-2 py-4"
        variant="ghost"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </DropdownMenuItem>
  );
};

export default SignOutButton;
