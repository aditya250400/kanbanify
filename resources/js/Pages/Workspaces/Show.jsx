import ActionDialog from '@/Components/ActionDIalog';
import GetPriorityBadge from '@/Components/GetPriorityBadge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { PiDotsThreeOutlineFill, PiPlus } from 'react-icons/pi';
import { toast } from 'sonner';

export default function Show({ ...props }) {
    const { workspace, statuses, cards } = props;
    return (
        <>
            <div>
                <img src={workspace.cover} alt={workspace.name} className="h-32 w-full object-cover lg:h-48" />
            </div>
            <div className="px-2 sm:px-4">
                <div className="-mt-12 sm:flex sm:items-center sm:space-x-5">
                    <div className="flex w-full gap-x-6">
                        <img
                            src={workspace.logo}
                            className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                            alt={workspace.name}
                        />
                        <div className="items-center sm:flex sm:min-w-0 sm:flex-1 sm:justify-end sm:pb-1">
                            <div className="mt-6 min-w-0 flex-1">
                                <CardTitle className="text-4xl leading-relaxed tracking-tighter">
                                    {workspace.name}
                                </CardTitle>
                            </div>
                            <div className="mt-8 flex items-center gap-x-6">
                                <Link
                                    href={route('cards.create', [workspace])}
                                    className="items-tenter inline-flex justify-center whitespace-nowrap text-sm font-medium text-foreground transition-colors hover:font-bold hover:text-blue-500 hover:no-underline hover:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Create Card
                                </Link>
                                <Link
                                    href={route('workspaces.edit', [workspace])}
                                    className="items-tenter inline-flex justify-center whitespace-nowrap text-sm font-medium text-foreground transition-colors hover:font-bold hover:text-blue-500 hover:no-underline hover:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Settings
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* cards */}
                <div className="mt-8 flex w-full flex-col justify-start gap-x-5 gap-y-8 sm:flex-row">
                    {statuses.map((status, index) => (
                        <div key={index} className="w-full space-y-4 sm:w-1/4">
                            <div className="flex items-center justify-between">
                                <span className="text-base font-semibold leading-relaxed tracking-tighter">
                                    {status.value}
                                </span>
                                <div className="flex items-center gap-x-3">
                                    <Link
                                        href={route('cards.create', {
                                            workspace,
                                            _query: {
                                                status: status.value,
                                            },
                                        })}
                                    >
                                        <PiPlus className="h-4 w-4 text-foreground transition-colors duration-200 hover:text-blue-500" />
                                    </Link>
                                </div>
                            </div>

                            {/* Column card container */}
                            <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
                                {cards
                                    .filter((card) => card.status == status.value)
                                    .map((card, index) => (
                                        <Card
                                            key={index}
                                            className="relative rounded-xl hover:ring-2 hover:ring-inset hover:ring-blue-500"
                                        >
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="line-clamp-2 text-base leading-relaxed tracking-tighter">
                                                        <Link
                                                            className="hover:text-blue-500"
                                                            href={route('cards.show', [workspace, card])}
                                                        >
                                                            {card.title}
                                                        </Link>
                                                    </CardTitle>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <PiDotsThreeOutlineFill className="size-4" />
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-48">
                                                            <DropdownMenuItem className="hover:cursor-pointer" asChild>
                                                                <Link href={route('cards.edit', [workspace, card])}>
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuGroup>
                                                                <ActionDialog
                                                                    title="Delete Card"
                                                                    description="Are you sure want to delete card?"
                                                                    action={() =>
                                                                        router.delete(
                                                                            route('cards.destroy', [workspace, card]),
                                                                            {
                                                                                preserveScroll: true,
                                                                                preserveState: true,
                                                                                onSuccess: (success) => {
                                                                                    const flash = flashMessage(success);
                                                                                    if (flash)
                                                                                        toast[flash.type](
                                                                                            flash.message,
                                                                                        );
                                                                                },
                                                                            },
                                                                        )
                                                                    }
                                                                    trigger={
                                                                        <DropdownMenuItem
                                                                            onSelect={(e) => e.preventDefault()}
                                                                            className="hover:cursor-pointer"
                                                                        >
                                                                            Delete
                                                                        </DropdownMenuItem>
                                                                    }
                                                                />
                                                            </DropdownMenuGroup>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                                <div>
                                                    <GetPriorityBadge priority={card.priority} />
                                                </div>
                                                <CardDescription className="line-clamp-4 leading-relaxed tracking-tighter">
                                                    {card.description}
                                                </CardDescription>
                                            </CardHeader>
                                        </Card>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

Show.layout = (page) => <AppLayout children={page} title={page.props.workspace.name} />;
