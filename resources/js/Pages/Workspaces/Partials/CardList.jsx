import ActionDialog from '@/Components/ActionDIalog';
import GetPriorityBadge from '@/Components/GetPriorityBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link } from '@inertiajs/react';
import { PiCheckSquare, PiDotsThreeOutlineFill, PiLinkSimple, PiUser } from 'react-icons/pi';

export default function CardList({ card, workspace, handleDeleteCard }) {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: card.id,
        data: {
            type: 'card',
            card,
        },
    });

    const style = {
        transition,
        tansform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <Card
                ref={setNodeRef}
                style={style}
                className="relative flex h-[100px] min-h-[200px] cursor-grab items-center rounded-xl border border-dashed border-muted-foreground p-2.5 text-left opacity-30"
            ></Card>
        );
    }

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="task relative cursor-grab rounded-xl hover:ring-2 hover:ring-inset hover:ring-blue-500"
        >
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="line-clamp-2 text-base leading-relaxed tracking-tighter group-hover:line-clamp-none">
                        <Link className="hover:text-blue-500" href={route('cards.show', [workspace, card])}>
                            {card.title}
                        </Link>
                    </CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <PiDotsThreeOutlineFill className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="hover:cursor-pointer" asChild>
                                    <Link href={route('cards.edit', [workspace, card])}>Edit</Link>
                                </DropdownMenuItem>
                                <ActionDialog
                                    title="Delete Card"
                                    description="Are you sure want to delete card?"
                                    action={() => handleDeleteCard(card.id)}
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
            <CardContent>
                <div className="flex flex-col space-y-8">
                    <div>
                        <div className="mb-1.5 flex items-center justify-between">
                            {card.has_task ? (
                                <p className="text-sm leading-relaxed tracking-tighter text-muted-foreground">
                                    <span className="font-medium text-blue-500">{card.percentage} of 100</span>
                                </p>
                            ) : (
                                <div></div>
                            )}
                            <p className="text-sm leading-relaxed tracking-tighter text-muted-foreground">
                                {card.deadline > 0 ? (
                                    <span>{card.deadline} days left</span>
                                ) : card.deadline == 0 ? (
                                    <span className="text-red-500">Today is deadline</span>
                                ) : (
                                    <span className="font-semibold text-red-700">Overdue</span>
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        {card.has_task && (
                            <div className="flex items-center gap-x-1">
                                <PiCheckSquare className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm leading-relaxed tracking-tighter text-muted-foreground">
                                    {card.tasks_count} Tasks
                                </span>
                            </div>
                        )}

                        {card.members_count > 0 && (
                            <div className="flex items-center gap-x-1">
                                <PiUser className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm leading-relaxed tracking-tighter text-muted-foreground">
                                    {card.members_count} Members
                                </span>
                            </div>
                        )}
                        {card.has_attachment > 0 && (
                            <div className="flex items-center gap-x-1">
                                <PiLinkSimple className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm leading-relaxed tracking-tighter text-muted-foreground">
                                    {card.attachments_count} Attachments
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
