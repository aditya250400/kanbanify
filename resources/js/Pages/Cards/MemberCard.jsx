import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { flashMessage } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function MemberCard({ action }) {
    const { data, setData, processing, errors, reset, post, recentlySuccessful } = useForm({
        email: '',
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(action, {
            preserveScroll: true,
            preserveState: false,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
                reset();
            },
        });
    };
    return (
        <>
            <Card className="lg:col-span-2">
                <CardContent>
                    <form onSubmit={onHandleSubmit}>
                        <div className="py-6">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        onChange={onHandleChange}
                                        value={data.email}
                                        onErrors={errors.email && <InputError message={errors.email} />}
                                        type="email"
                                        name="email"
                                        id="email"
                                        isFocused={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-x-2 py-6">
                            <Button tabIndex={-1} type="button" variant="ghost" onClick={() => reset()}>
                                Reset
                            </Button>
                            <Button variant="blue" type="submit" disabled={processing}>
                                Save
                            </Button>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-muted-foreground">Invited.</p>
                            </Transition>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
