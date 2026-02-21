"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Avatar,AvatarImage,AvatarFallback} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {useRouter} from 'next/navigation'
import Cookies from 'js-cookie';
export default function Profile() {
  const router = useRouter()
  function handleLogout(){
    Cookies.remove('session')
    router.push('/Login');
  }
  return (
    <DropdownMenu>
      {/* ส่วนที่คลิกเพื่อเปิด */}
      <DropdownMenuTrigger asChild>
        
            <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          className="grayscale"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      
      </DropdownMenuTrigger>

      {/* ส่วนเนื้อหาใน Dropdown */}
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Setting</DropdownMenuItem>
        <DropdownMenuItem className="text-red-600" onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}