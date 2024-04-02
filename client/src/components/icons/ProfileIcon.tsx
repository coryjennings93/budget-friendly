import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { BadgeDollarSign, LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const ProfileIcon = () => {
  const { logoutUser } = useAuth();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <FontAwesomeIcon icon={faUser} size="xl" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-lg">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/dashboard">
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>

          <Link to="">
            <DropdownMenuItem>
              <BadgeDollarSign className="w-4 h-4 mr-2" />
              <span>Budgets</span>
            </DropdownMenuItem>
          </Link>

          <Link to="/">
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logoutUser()}>
            <LogOut className="w-4 h-4 mr-2" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileIcon;
