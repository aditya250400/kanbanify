import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { flashMessage } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function MemberWorkspace({ action, members }) {
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
                    <div className="flex items-center justify-end gap-x-2 py-6">
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
                <div className="space-y-4 py-6">
                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                        {members.map((member, index) => (
                            <li
                                className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-relaxed"
                                key={index}
                            >
                                <div className="flex w-0 flex-1 items-center">
                                    <Avatar>
                                        <AvatarImage src={member.user.avatar} alt={member.user.name} />
                                        <AvatarFallback>{member.user.name.substring(0, 1)}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 flex min-w-0 flex-col">
                                        <span className="truncate font-medium">{`${member.user.name} ${member.user.name == user.name ? '(You)' : ''}`}</span>
                                        <span className="hidden text-muted-foreground sm:block">
                                            {member.user.email}
                                        </span>
                                    </div>
                                </div>
                                {member.user.id == user.id ? null : (
                                    <div className="ml-4 flex shrink-0">
                                        <Button
                                            variant="link"
                                            className="font-medium text-blue-500 hover:text-blue-600 hover:no-underline"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
