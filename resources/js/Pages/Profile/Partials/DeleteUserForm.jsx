import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = (e) => {
        e.preventDefault();
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Delete Account</CardTitle>

                <CardDescription>
                    Once your account is deleted, all of its resources and data will be CardDescriptionermanently
                    deleted. Before deleting your account, please download any data or information that you wish to
                    retain.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Button variant="red" onClick={confirmUserDeletion}>
                    Delete Account
                </Button>

                <Modal show={confirmingUserDeletion} onClose={closeModal}>
                    <form onSubmit={deleteUser} className="p-6">
                        <h2 className="text-lg font-medium text-foreground">
                            Are you sure you want delete your account?
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Your account and your data will deleted permanently
                        </p>

                        <div className="mt-6">
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-3/4"
                                placeholder="Password"
                            />
                            {errors.password && <InputError message={errors.password} className="mt-2" />}{' '}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button variant="ghost" size="lg" onClick={closeModal}>
                                Batal
                            </Button>

                            <Button variant="red" size="lg" className="ms-3" disabled={processing}>
                                Delete Account
                            </Button>
                        </div>
                    </form>
                </Modal>
            </CardContent>
        </Card>
    );
}
