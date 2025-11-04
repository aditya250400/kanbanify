import HeaderForm from '@/Components/HeaderForm';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function Create({ page_settings, visibilities }) {
    const inputFileCover = useRef(null);
    const inputFileLogo = useRef(null);
    const { data, setData, processing, reset, post, errors } = useForm({
        name: '',
        cover: null,
        logo: null,
        visibility: '',
    });

    const onHandleReset = () => {
        inputFileCover.current.value = null;
        inputFileLogo.current.value = null;
        reset();
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(page_settings.action, {
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
                console.log(success);
                onHandleReset();
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <>
            <div className="space-y-10 divide-y divide-dashed divide-gray-900/10">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-3">
                    <HeaderForm title={page_settings.title} subtitle={page_settings.subtitle} />
                    <Card className="md:col-span-2">
                        <CardContent>
                            <form onSubmit={onHandleSubmit}>
                                <div className="py-6">
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-6">
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="name" value="Name" />
                                            <Input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                            />
                                            {errors.name && <InputError message={errors.name} />}
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="cover" value="Cover" />
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                ref={inputFileCover}
                                                name="cover"
                                                id="cover"
                                                onChange={(e) => setData('cover', e.target.files[0])}
                                            />
                                            {errors.cover && <InputError message={errors.cover} />}
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="logo" value="Logo" />
                                            <Input
                                                onChange={(e) => setData('logo', e.target.files[0])}
                                                type="file"
                                                ref={inputFileLogo}
                                                accept="image/*"
                                                name="logo"
                                                id="logo"
                                            />
                                            {errors.logo && <InputError message={errors.logo} />}
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="visibility" value="Visibility" />
                                            <Select
                                                onValueChange={(value) => setData('visibility', value)}
                                                defaultValue="Select a visibility"
                                            >
                                                <SelectTrigger>
                                                    <SelectValue>
                                                        {visibilities.find(
                                                            (visibility) => visibility.value == data.visibility,
                                                        )?.value ?? 'Select a visibility'}
                                                    </SelectValue>
                                                    <SelectContent>
                                                        {visibilities.map((visibility, index) => (
                                                            <SelectItem value={visibility.value} key={index}>
                                                                {visibility.value}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </SelectTrigger>
                                            </Select>
                                            {errors.visibility && <InputError message={errors.visibility} />}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end gap-x-6 py-6">
                                        <Button type="button" variant="ghost" tabIndex={-1} onClick={onHandleReset}>
                                            Reset
                                        </Button>
                                        <Button type="submit" variant="blue" disabled={processing}>
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Create.layout = (page) => <AppLayout children={page} title="Workspace Create" />;
