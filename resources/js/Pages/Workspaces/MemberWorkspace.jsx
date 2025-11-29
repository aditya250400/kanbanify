import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { flashMessage } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { router, useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function MemberWorkspace({ action, members, workspace }) {
    const { data, setData, processing, errors, reset, post, recentlySuccessful } = useForm({
        email: '',
    });
    const { user } = usePage().props.auth;

    const emailFocusRef = useRef(null);

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
        });
    };

    const onHandleReset = () => {
        setData('email', '');
        emailFocusRef.current.focus();
    };
    return (
        <Card className="md:col-span-2">
            <CardContent>
                <form onSubmit={onHandleSubmit}>
                    <div className="py-6">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <InputLabel htmlFor="email" value="Email" />
                                <Input
                                    ref={emailFocusRef}
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={data.email}
                                    onChange={onHandleChange}
                                    onErrors={errors.email && <InputError message={errors.email} />}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end py-6 gap-x-2">
                        <Button type="button" variant="ghost" onClick={onHandleReset}>
                            Reset
                        </Button>
                        <Button variant="blue" type="submit" disabled={processing}>
                            Invite
                        </Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-put"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveFrom="0"
                        >
                            <p className="text-sm text-muted-foreground">Invited!</p>
                        </Transition>
                    </div>
                </form>
                <div className="py-6 space-y-4">
                    <ul role="list" className="border border-gray-200 divide-y divide-gray-100 rounded-md">
                        {members.map((member, index) => (
                            <li
                                className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-relaxed"
                                key={index}
                            >
                                <div className="flex items-center flex-1 w-0">
                                    <Avatar>
                                        <AvatarImage src={member.user.avatar} alt={member.user.name} />
                                        <AvatarFallback>{member.user.name.substring(0, 1)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col min-w-0 ml-4">
                                        <span className="font-medium truncate">{`${member.user.name} ${member.user.name == user.name ? '(You)' : ''}`}</span>
                                        <span className="hidden text-muted-foreground sm:block">
                                            {member.user.email}
                                        </span>
                                    </div>
                                </div>
                                {member.role != 'Owner' ? (
                                    <div className="flex ml-4 shrink-0">
                                        <Button
                                            onClick={() =>
                                                router.delete(
                                                    route('workspaces.member.destroy', {
                                                        workspace: member.memberable_id,
                                                        member: member.id,
                                                    }),
                                                    {
                                                        preserveScroll: true,
                                                        preserveState: true,
                                                        onSuccess: (success) => {
                                                            const flash = flashMessage(success);
                                                            if (flash) toast[flash.type](flash.message);
                                                        },
                                                    },
                                                )
                                            }
                                            variant="link"
                                            className="font-medium text-blue-500 hover:text-blue-600 hover:no-underline"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        variant="ghost"
                                        className="font-medium text-blue-500 hover:text-blue-600 hover:no-underline"
                                    >
                                        {member.role}
                                    </Button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
