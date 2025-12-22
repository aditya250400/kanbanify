import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { flashMessage } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { PiPaperclip } from 'react-icons/pi';
import { toast } from 'sonner';

export default function AttachmentCard({ action, attachments }) {
    const { data, setData, processing, errors, reset, post, recentlySuccessful } = useForm({
        file: '',
        link: '',
        name: '',
    });

    const fileInput = useRef(null);

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
                onReset();
            },
        });
    };

    const onReset = () => {
        reset();
        fileInput.current.value = null;
    };
    return (
        <>
            <Card className="lg:col-span-2">
                <CardContent>
                    <form onSubmit={onHandleSubmit}>
                        <div className="py-6">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <InputLabel htmlFor="file" value="File" />
                                    <TextInput
                                        onChange={(e) => setData(e.target.name, e.target.files[0])}
                                        onErrors={errors.file && <InputError message={errors.file} />}
                                        type="file"
                                        name="file"
                                        exRef={fileInput}
                                        id="file"
                                    />
                                </div>
                                <div className="col-span-full">
                                    <InputLabel htmlFor="link" value="Link" />
                                    <TextInput
                                        onChange={onHandleChange}
                                        value={data.link}
                                        onErrors={errors.link && <InputError message={errors.link} />}
                                        type="url"
                                        name="link"
                                        id="link"
                                    />
                                </div>
                                <div className="col-span-full">
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        onChange={onHandleChange}
                                        value={data.name}
                                        onErrors={errors.name && <InputError message={errors.name} />}
                                        type="text"
                                        name="name"
                                        id="name"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-x-2 py-6">
                            <Button tabIndex={-1} type="button" variant="ghost" onClick={() => onReset()}>
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
                                <p className="text-sm text-muted-foreground">Saved.</p>
                            </Transition>
                        </div>
                    </form>
                    <div className="space-y-4 py-6">
                        <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                            {attachments.map((attachment, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                                >
                                    <div className="flex w-0 flex-1 items-center">
                                        <PiPaperclip className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                                        <div className="ml-4 flex min-w-0 flex-col">
                                            <span className="truncate font-medium">
                                                {attachment.name ? attachment.name : attachment.file}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="ml-4 flex shrink-0">
                                        <Button
                                            variant="link"
                                            className="font-medium text-blue-500 hover:text-blue-600 hover:no-underline"
                                            onClick={() => alert('delete')}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
