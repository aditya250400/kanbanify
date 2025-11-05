import HeaderForm from '@/Components/HeaderForm';
import AppLayout from '@/Layouts/AppLayout';
import Edit from './Edit';
import MemberWorkspace from './MemberWorkspace';

export default function Setting(props) {
    const { page_settings, workspace, visibilities } = props;

    return (
        <div className="space-y-10 divide-y divide-dashed divide-gray-900/10">
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
                <HeaderForm title={page_settings.title} subtitle={page_settings.subtitle} />
                <Edit visibilities={visibilities} page_settings={page_settings} workspace={workspace} />
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 pt-5 md:grid-cols-3">
                <HeaderForm title={'Members'} subtitle={'Add members to the Card'} />
                <MemberWorkspace members={workspace.members} action={route('workspaces.member.store', [workspace])} />
            </div>
        </div>
    );
}

Setting.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
