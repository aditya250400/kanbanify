import ActionDialog from '@/Components/ActionDIalog';
import Header from '@/Components/Header';
import PaginationTable from '@/Components/PaginationTable';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import UseFilter from '@/Hooks/UseFilter';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { PiArrowsClockwise, PiArrowsDownUp, PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import { toast } from 'sonner';

export default function Index({ page_settings, ...props }) {
    const { data: users, meta, links } = props.users;
    const [params, setParams] = useState(props.state);

    const onSortable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    UseFilter({
        route: route('users.index'),
        values: params,
        only: ['users'],
    });
    return (
        <>
            <div className="flex items-center justify-between">
                <Header title={page_settings.title} subtitle={page_settings.subtitle} />
                <Button variant="blue" size="lg" asChild>
                    <Link href={route('users.create')}>Create</Link>
                </Button>
            </div>
            <Card>
                <CardHeader className="mb-4 p-0">
                    {/* Filters */}

                    <div className="flex w-full flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center">
                        <Input
                            className="w-full sm:w-1/4"
                            placeholder="search"
                            value={params?.search}
                            onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value }))}
                        />
                        <Select value={params?.load} onValueChange={(e) => setParams({ ...params, load: e })}>
                            <SelectTrigger className="w-full sm:w-24">
                                <SelectValue placeholder="Load" />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 23, 50, 75, 100].map((number, index) => (
                                    <SelectItem key={index} value={number}>
                                        {number}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="blue" onClick={() => setParams(props.state)}>
                            <PiArrowsClockwise className="w-4h-4 mr-2" />
                            Clear
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="my-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block w-full py-2 align-middle sm:px-2">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-600">
                                            <th
                                                className="px-2 py-3.5 text-left text-sm font-semibold text-foreground"
                                                scope="col"
                                            >
                                                <Button
                                                    onClick={() => onSortable('name')}
                                                    variant="ghost"
                                                    className="group inline-flex"
                                                >
                                                    Name
                                                    <span className="ml-2 flex-none rounded text-foreground">
                                                        <PiArrowsDownUp className="h-5 w-5" />
                                                    </span>
                                                </Button>
                                            </th>
                                            <th
                                                className="px-2 py-3.5 text-left text-sm font-semibold text-foreground"
                                                scope="col"
                                            >
                                                <Button
                                                    onClick={() => onSortable('email')}
                                                    variant="ghost"
                                                    className="group inline-flex"
                                                >
                                                    Email
                                                    <span className="ml-2 flex-none rounded text-foreground">
                                                        <PiArrowsDownUp className="h-5 w-5" />
                                                    </span>
                                                </Button>
                                            </th>
                                            <th
                                                className="px-2 py-3.5 text-left text-sm font-semibold text-foreground"
                                                scope="col"
                                            >
                                                Avatar
                                            </th>
                                            <th
                                                className="px-2 py-3.5 text-left text-sm font-semibold text-foreground"
                                                scope="col"
                                            >
                                                <Button
                                                    onClick={() => onSortable('created_at')}
                                                    variant="ghost"
                                                    className="group inline-flex"
                                                >
                                                    Created At
                                                    <span className="ml-2 flex-none rounded text-foreground">
                                                        <PiArrowsDownUp className="h-5 w-5" />
                                                    </span>
                                                </Button>
                                            </th>
                                            <th
                                                className="px-2 py-3.5 text-left text-sm font-semibold text-foreground"
                                                scope="col"
                                            >
                                                <span className="sr-only">Action</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap px-6 py-8 text-sm font-medium text-foreground">
                                                    {user.name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-8 text-sm font-medium text-foreground">
                                                    {user.email}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-8 text-sm font-medium text-foreground">
                                                    <Avatar>
                                                        <AvatarImage src={user.avatar} />
                                                        <AvatarFallback>{user.name.substring(0, 1)}</AvatarFallback>
                                                    </Avatar>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-8 text-sm font-medium text-foreground">
                                                    {user.created_at}
                                                </td>
                                                <td className="relative space-x-4 whitespace-nowrap px-6 py-8 text-right text-sm">
                                                    <div className="flex justify-end">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger>
                                                                <PiDotsThreeOutlineVerticalFill className="size-4" />
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-48">
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={route('users.edit', [user])}>Edit</Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuGroup>
                                                                    <ActionDialog
                                                                        trigger={
                                                                            <DropdownMenuItem
                                                                                onSelect={(e) => e.preventDefault()}
                                                                            >
                                                                                Delete
                                                                            </DropdownMenuItem>
                                                                        }
                                                                        title={'Delete People'}
                                                                        description={'Are you sure?'}
                                                                        action={() =>
                                                                            router.delete(
                                                                                route('users.destroy', [user]),
                                                                                {
                                                                                    preserveScroll: true,
                                                                                    preserveState: true,
                                                                                    onSuccess: (success) => {
                                                                                        const flash =
                                                                                            flashMessage(success);
                                                                                        if (flash)
                                                                                            toast[flash.type](
                                                                                                flash.message,
                                                                                            );
                                                                                    },
                                                                                },
                                                                            )
                                                                        }
                                                                    />
                                                                </DropdownMenuGroup>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex w-full flex-col items-center justify-between gap-y-2 border-t py-3 lg:flex-row">
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-medium text-blue-600">{meta.to ?? 0}</span> from {meta.total}{' '}
                        tasks
                    </p>
                    <div className="overflow-x-auto">
                        {meta.has_pages && <PaginationTable meta={meta} links={links} />}
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}

Index.layout = (page) => (
    <AppLayout children={page} title={page.props.page_settings.title} subtitle={page.props.page_settings.subtitle} />
);
