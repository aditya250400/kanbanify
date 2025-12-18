import { CardTitle } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function Show({ ...props }) {
    const { workspace } = props;
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
            </div>
        </>
    );
}

Show.layout = (page) => <AppLayout children={page} title={page.props.workspace.name} />;
