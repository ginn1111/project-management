'use client';
import IconLockDots from '@/components/Icon/IconLockDots';
import IconMail from '@/components/Icon/IconMail';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AccountSchema } from '@/yup-schema/account';
import { yupResolver } from '@hookform/resolvers/yup';
import { AlertCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';

const Login = () => {
	const searchParams = useSearchParams();
	const form = useForm({
		resolver: yupResolver(AccountSchema),
	});

	const handleLogin: SubmitHandler<{
		username: string;
		password: string;
	}> = async (value) => {
		await signIn('credentials', {
			username: value.username,
			password: value.password,
			redirect: true,
			callbackUrl: '/du-an',
		});
	};

	return (
		<div className="relative">
			<div className="absolute inset-0">
				<img
					src="/assets/images/auth/bg-gradient.png"
					alt="image"
					className="h-full w-full object-cover"
				/>
			</div>

			<div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
				<img
					src="/assets/images/auth/coming-soon-object1.png"
					alt="image"
					className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2"
				/>
				<img
					src="/assets/images/auth/coming-soon-object2.png"
					alt="image"
					className="absolute left-24 top-0 h-40 md:left-[30%]"
				/>
				<img
					src="/assets/images/auth/coming-soon-object3.png"
					alt="image"
					className="absolute right-0 top-0 h-[300px]"
				/>
				<img
					src="/assets/images/auth/polygon-object.svg"
					alt="image"
					className="absolute bottom-0 end-[28%]"
				/>
				<div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
					<div className="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px]">
						<div className="mx-auto w-full max-w-[440px]">
							<div className="mb-10">
								{searchParams.get('error') ? (
									<Alert className="mb-10 bg-danger-light text-danger">
										<AlertTitle className="flex items-center gap-2">
											<AlertCircle />
											<p>Tài khoản hoặc mật khẩu không đúng!</p>
										</AlertTitle>
										<AlertDescription className="pl-8">
											Vui lòng kiểm tra lại tài khoản và mật khẩu
										</AlertDescription>
									</Alert>
								) : null}
								<h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">
									Đăng nhập
								</h1>
								<p className="text-base font-bold leading-normal text-white-dark">
									Dùng tài khoản và mật khẩu để đăng nhập
								</p>
							</div>
							<form
								onSubmit={form.handleSubmit(handleLogin)}
								className="space-y-5 dark:text-white"
							>
								<div>
									<Label htmlFor="username">Tài khoản</Label>
									<div className="relative text-white-dark">
										<Input
											{...form.register('username')}
											className="ps-10"
											placeholder="nhập tài khoản"
										/>
										<span className="absolute start-4 top-1/2 -translate-y-1/2">
											<IconMail fill={true} />
										</span>
									</div>

									{form.formState.errors.username?.message ? (
										<p className="text-danger font-medium mt-1">
											{form.formState.errors.username.message}
										</p>
									) : null}
								</div>
								<div>
									<Label htmlFor="password">Mật khẩu</Label>
									<div className="relative text-white-dark">
										<Input
											{...form.register('password')}
											type="password"
											className="ps-10"
											placeholder="nhập mật khẩu"
										/>
										<span className="absolute start-4 top-1/2 -translate-y-1/2">
											<IconLockDots fill={true} />
										</span>
									</div>
									{form.formState.errors.password?.message ? (
										<p className="text-danger font-medium mt-1">
											{form.formState.errors.password.message}
										</p>
									) : null}
								</div>
								<button
									type="submit"
									className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
								>
									Đăng nhập
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
