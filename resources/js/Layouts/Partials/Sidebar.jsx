import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Link } from '@inertiajs/react';
import { PiHouse, PiLockKeyOpen, PiPlus, PiSquaresFour, PiUsers } from 'react-icons/pi';

export default function Sidebar() {
    return (
        <>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-2">
                            {/* menu */}
                            <li>
                                <Link
                                    href="#"
                                    className="group flex items-center gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed tracking-tighter text-foreground hover:bg-gray-100"
                                >
                                    <PiHouse className="h-6 w-6 shrink-0 text-foreground" />
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="group flex items-center gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed tracking-tighter text-foreground hover:bg-gray-100"
                                >
                                    <PiUsers className="h-6 w-6 shrink-0 text-foreground" />
                                    Peoples
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="group flex items-center gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed tracking-tighter text-foreground hover:bg-gray-100"
                                >
                                    <PiSquaresFour className="h-6 w-6 shrink-0 text-foreground" />
                                    My Tasks
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="group flex items-center gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed tracking-tighter text-foreground hover:bg-gray-100"
                                >
                                    <PiLockKeyOpen className="h-6 w-6 shrink-0 text-foreground" />
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        {/* workspaces */}
                        <div className="flex items-center justify-between">
                            <div className="text-xs font-semibold uppercase leading-relaxed text-foreground">
                                Workspaces
                            </div>
                            <Link href="#">
                                <PiPlus className="h-4 w-4 text-foreground hover:text-blue-500" />
                            </Link>
                        </div>
                        <ul role="list" className="-mx-2 mt-2 space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="group flex w-full gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed text-foreground hover:bg-gray-100"
                                >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-foreground bg-white text-[0.625rem] font-medium text-foreground">
                                        B
                                    </span>
                                    <span className="truncate">sadasd</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="-mx-6 mt-auto">
                        {/* profile */}
                        <Link
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-relaxed text-foreground hover:bg-gray-100"
                            href={'#'}
                        >
                            <Avatar>
                                <AvatarFallback>X</AvatarFallback>
                            </Avatar>
                            <span>Luffy</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
