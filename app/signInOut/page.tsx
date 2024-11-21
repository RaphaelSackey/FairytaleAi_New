"use client";

import { useState } from "react";

type formDataType = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export default function signInOut() {
	const [formState, setFormState] = useState<"sign up" | "sign in">(
		"sign up"
	);

	const [formData, setFormData] = useState<formDataType>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	function changeFormState() {
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
		setFormState((prev) => {
			if (prev === "sign in") {
				return "sign up";
			}
			return "sign in";
		});
	}

	function handleFormChange(
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (verifyPassword()) {
			console.log(formData);
		} else {
			alert("Passwords do not match");
		}
	}

	function verifyPassword(): boolean {
		if (formData.password === formData.confirmPassword) {
			return true;
		}
		return false;
	}

	function handleSigIn(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		console.log(formData);
	}

	return (
		<div>
			{formState === "sign up" ? (
				<form
					onSubmit={handleSignUp}
					className='flex items-center justify-center'>
					<div className='flex flex-col gap-3 w-80 lg:w-96'>
						<div className='font-suseMedium flex items-center justify-center text-4xl mb-8'>
							Read to be creative?
						</div>
						<label
							htmlFor='firstName'
							className=''>
							First Name
						</label>
						<input
							type='text'
							id='firstName'
							name='firstName'
							placeholder='Enter your first name'
							className='h-10 border pl-1 rounded'
							value={formData.firstName}
							onChange={handleFormChange}
							required
						/>

						<label htmlFor='lastName'>Last Name</label>
						<input
							type='text'
							id='lastName'
							name='lastName'
							placeholder='Enter your last name'
							className='h-10 border pl-1 rounded'
							value={formData.lastName}
							onChange={handleFormChange}
							required
						/>

						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							name='email'
							placeholder='Enter your email'
							className='h-10 border pl-1 rounded'
							value={formData.email}
							onChange={handleFormChange}
							required
						/>

						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							placeholder='Enter your password'
							className='h-10 border pl-1 rounded'
							value={formData.password}
							onChange={handleFormChange}
							autoComplete=''
							required
						/>

						<label htmlFor='confirmPassword'>
							Confirm Password
						</label>
						<input
							type='password'
							id='confirmPassword'
							name='confirmPassword'
							placeholder='Confirm your password'
							className='h-10 border pl-1 rounded'
							value={formData.confirmPassword}
							onChange={handleFormChange}
							autoComplete=''
							required
						/>

						<button
							type='submit'
							className='bg-varCallToAction h-11 rounded mt-3'>
							Sign Up
						</button>

						<div className='flex items-center justify-center'>
							Already have an account?{" "}
							<span
								className='underline ml-1 text-varCallToAction hover:cursor-pointer'
								onClick={changeFormState}>
								Sign in
							</span>
						</div>
					</div>
				</form>
			) : (
				<form
					onSubmit={handleSigIn}
					className='flex items-center justify-center'>
					<div className='flex flex-col gap-3 w-80 lg:w-96'>
						<div className='font-suseMedium flex items-center justify-center text-4xl mb-10'>
							Welcome Back
						</div>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							name='email'
							placeholder='Enter your email'
							className='h-10 border pl-1 rounded'
							value={formData.email}
							onChange={handleFormChange}
							required
						/>

						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							placeholder='Enter your password'
							className='h-10 border pl-1 rounded'
							value={formData.password}
							onChange={handleFormChange}
							autoComplete=''
							required
						/>
						<button
							type='submit'
							className='bg-varCallToAction h-11 rounded mt-3'>
							Sign In
						</button>
						<div className='flex items-center justify-center'>
							Don't have an account?{" "}
							<span
								className='underline ml-1 text-varCallToAction hover:cursor-pointer'
								onClick={changeFormState}>
								Sign up
							</span>
						</div>
					</div>
				</form>
			)}
		</div>
	);
}
