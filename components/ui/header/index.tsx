'use client';
import IconLogout from '@/components/Icon/IconLogout';
import IconMenu from '@/components/Icon/IconMenu';
import { themeSelectors } from '@/store/selectors/theme-selectors';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '../button';
import Dropdown from './dropdown';
function createMarkup(messages: any) {
	return { __html: messages };
}

const notifications = [
	{
		id: 1,
		profile: 'user-profile.jpeg',
		message:
			'<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
		time: '45 min ago',
	},
	{
		id: 2,
		profile: 'profile-34.jpeg',
		message:
			'<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
		time: '9h Ago',
	},
	{
		id: 3,
		profile: 'profile-16.jpeg',
		message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
		time: '9h Ago',
	},
];

const messages = [
	{
		id: 1,
		image:
			'<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
		title: 'Congratulations!',
		message: 'Your OS has been updated.',
		time: '1hr',
	},
	{
		id: 2,
		image:
			'<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
		title: 'Did you know?',
		message: 'You can switch between artboards.',
		time: '2hr',
	},
	{
		id: 3,
		image:
			'<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
		title: 'Something went wrong!',
		message: 'Send Reposrt',
		time: '2days',
	},
	{
		id: 4,
		image:
			'<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
		title: 'Warning',
		message: 'Your password strength is low.',
		time: '5days',
	},
];

const Header = () => {
	const toggleSidebar = themeSelectors.use.toggleSidebar();
	const { data } = useSession();
	const { user } = data ?? {};

	return (
		<header className="z-40">
			<div className="shadow-sm">
				<div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
					<div className="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
						<button
							type="button"
							className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
							onClick={() => toggleSidebar()}
						>
							<IconMenu className="h-5 w-5" />
						</button>
					</div>
					<div className="flex justify-end items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
						<div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>
						<div className="dropdown flex shrink-0">
							<Dropdown
								offset={[0, 8]}
								btnClassName="relative group block"
								button={
									<div>
										<div className="flex items-center gap-2">
											<p>{user?.info?.fullName}</p>
											<p className="text-[12px] font-bold text-primary2 bg-primary2-light px-2 py-1 rounded-md">
												{user?.info?.positions?.[0]?.position?.name ??
													'Chưa có chức vụ'}
											</p>
											<p className="text-secondary2 bg-secondary2-light w-max px-2 py-1 rounded-md text-[12px] font-bold">
												{user?.info.departments?.[0]?.department?.name ??
													'Chưa có phòng ban'}
											</p>
										</div>
									</div>
								}
							>
								<ul className="!py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90 w-max max-w-[260px]">
									<li>
										<div className="flex items-center px-4 py-4">
											<div className="pl-4">
												<h4 className="text-base">
													{user?.info?.phone ?? 'N/A'}
												</h4>
												<button
													type="button"
													className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
												>
													{user?.info?.email}
												</button>
											</div>
										</div>
									</li>
									<li className="border-t border-white-light dark:border-white-light/10">
										<Button
											variant="destructive"
											className="bg-transparent text-destructive hover:!text-destructive rounded-none"
											onClick={() => signOut()}
										>
											<IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 mr-2" />
											Đăng xuất
										</Button>
									</li>
								</ul>
							</Dropdown>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
