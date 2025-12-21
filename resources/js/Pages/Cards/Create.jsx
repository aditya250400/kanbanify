import HeaderForm from '@/Components/HeaderForm';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function Create({ page_settings, statuses, priorities, workspace, status }) {
    const { data, setData, processing, errors, reset, post, recentlySuccessful } = useForm({
        title: '',
        description: '',
        deadline: '',
        status,
        priority: 'Unknown',
        _method: page_settings.method,
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
        });
    };
    return (
        <>
            <div className="space-y-10 divide-y divide-dashed divide-gray-900/10">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
                    <HeaderForm title="Information" subtitle="Add your card information" />

                    <Card className="lg:col-span-2">
                        <CardContent>
                            <form onSubmit={onHandleSubmit}>
                                <div className="py-6">
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="title" value="Title" />
                                            <TextInput
                                                onChange={onHandleChange}
                                                value={data.title}
                                                onErrors={errors.title && <InputError message={errors.title} />}
                                                type="text"
                                                name="title"
                                                id="title"
                                                isFocused={true}
                                            />
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="description" value="Description" />
                                            <TextInput
                                                onChange={onHandleChange}
                                                value={data.description}
                                                onErrors={
                                                    errors.description && <InputError message={errors.description} />
                                                }
                                                type="text"
                                                name="description"
                                                id="description"
                                            />
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="deadline" value="Deadline" />
                                            <TextInput
                                                onChange={onHandleChange}
                                                value={data.deadline}
                                                onErrors={errors.deadline && <InputError message={errors.deadline} />}
                                                type="date"
                                                name="deadline"
                                                id="deadline"
                                            />
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="priority" value="Priority" />
                                            <Select
                                                onValueChange={(value) => setData('priority', value)}
                                                defaultValue="Select a priority"
                                            >
                                                <SelectTrigger>
                                                    <SelectValue>
                                                        {priorities.find((priority) => priority.value == data.priority)
                                                            ?.value ?? 'Select a priority'}
                                                    </SelectValue>
                                                    <SelectContent>
                                                        {priorities.map((priority, index) => (
                                                            <SelectItem value={priority.value} key={index}>
                                                                {priority.value}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </SelectTrigger>
                                            </Select>
                                            {errors.priority && <InputError message={errors.priority} />}
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="status" value="status" />
                                            <Select
                                                onValueChange={(value) => setData('status', value)}
                                                defaultValue="Select a status"
                                            >
                                                <SelectTrigger>
                                                    <SelectValue>
                                                        {statuses.find((status) => status.value == data.status)
                                                            ?.value ?? 'Select a status'}
                                                    </SelectValue>
                                                    <SelectContent>
                                                        {statuses.map((status, index) => (
                                                            <SelectItem value={status.value} key={index}>
                                                                {status.value}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </SelectTrigger>
                                            </Select>
                                            {errors.status && <InputError message={errors.status} />}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-x-2 py-6">
                                    <Button type="button" variant="ghost" onClick={() => reset()}>
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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Create.layout = (page) => (
    <AppLayout children={page} title={page.props.page_settings.title} subtitle={page.props.page_settings.subtitle} />
);
