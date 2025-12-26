import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { PiHouse, PiLockKeyOpen, PiPlus, PiSquaresFour, PiUsers } from 'react-icons/pi';

export default function Sidebar({ auth, url, workspaces }) {
    return (
        <>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-2">
                            {/* menu */}
                            <li>
                                <Link
                                    href={route('dashboard')}
                                    className={cn(
                                        url.startsWith('/dashboard')
                                            ? 'bg-blue-500 text-white'
                                            : 'text-foreground hover:bg-gray-100 dark:hover:bg-blue-500',
                                        'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed',
                                    )}
                                >
                                    <PiHouse
                                        className={cn(
                                            url.startsWith('/dashboard') ? 'text-white' : 'text-foreground',
                                            'h-6 w-6 shrink-0',
                                        )}
                                    />
                                    Dashboard
                                </Link>
                            </li>
                            {auth.is_admin && (
                                <li>
                                    <Link
                                        href={route('users.index')}
                                        className={cn(
                                            url.startsWith('/users')
                                                ? 'bg-blue-500 text-white'
                                                : 'text-foreground hover:bg-gray-100 dark:hover:bg-blue-500',
                                            'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed',
                                        )}
                                    >
                                        <PiUsers
                                            className={cn(
                                                url.startsWith('/users') ? 'text-white' : 'text-foreground',
                                                'h-6 w-6 shrink-0',
                                            )}
                                        />
                                        Peoples
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link
                                    href={route('mytasks.index')}
                                    className={cn(
                                        url.startsWith('/my-tasks')
                                            ? 'bg-blue-500 text-white'
                                            : 'text-foreground hover:bg-gray-100 dark:hover:bg-blue-500',
                                        'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed',
                                    )}
                                >
                                    <PiSquaresFour
                                        className={cn(
                                            url.startsWith('/my-tasks') ? 'text-white' : 'text-foreground',
                                            'h-6 w-6 shrink-0',
                                        )}
                                    />
                                    My Tasks
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route('logout')}
                                    method="POST"
                                    as="button"
                                    className={cn(
                                        url.startsWith('/logout')
                                            ? 'bg-blue-500 text-white'
                                            : 'text-foreground hover:bg-gray-100 dark:hover:bg-blue-500',
                                        'group flex w-full gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed',
                                    )}
                                >
                                    <PiLockKeyOpen
                                        className={cn(
                                            url.startsWith('/logout') ? 'text-white' : 'text-foreground',
                                            'h-6 w-6 shrink-0',
                                        )}
                                    />
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
                            <Link href={route('workspaces.create')}>
                                <PiPlus className="h-4 w-4 text-foreground hover:text-blue-500" />
                            </Link>
                        </div>
                        <ul role="list" className="-mx-2 mt-2 space-y-2">
                            {workspaces.map((workspace, index) => (
                                <li key={index}>
                                    <Link
                                        href={route('workspaces.show', [workspace.memberable.slug])}
                                        className={cn(
                                            url.startsWith(`/workspaces/p/${workspace.memberable.slug}`)
                                                ? 'bg-blue-500 text-white'
                                                : 'text-foreground hover:bg-gray-100 dark:hover:bg-blue-500',
                                            'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed',
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                url.startsWith(`/workspaces/p/${workspace.memberable.slug}`)
                                                    ? 'border-white bg-blue-500 text-white'
                                                    : 'border-foreground text-foreground hover:bg-gray-100 dark:hover:bg-blue-500',
                                                'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium',
                                            )}
                                        >
                                            {workspace.memberable.name.slice(0, 1)}
                                        </span>
                                        <span className="truncate">{workspace.memberable.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="-mx-6 mt-auto">
                        {/* profile */}
                        <Link
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-relaxed text-foreground hover:bg-gray-100 dark:hover:bg-blue-500"
                            href={route('profile.edit')}
                        >
                            <Avatar>
                                <AvatarFallback>{auth.name.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                            <span>{auth.name}</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
