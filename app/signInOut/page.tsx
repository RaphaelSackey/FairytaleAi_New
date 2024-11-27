"use client";

import { useState } from "react";
import CreateAccount, {
	CreateAccountTypes,
} from "../../client_services/createAccount";
import { Axios, AxiosResponse } from "axios";
import { redirect } from "next/navigation";
import Spinner from "../../components/ui/spinner/spinner";
import signIn from "@/client_services/clientSignIn";

type formDataType = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword?: string;
};

type responseMessageType = {
	message: string;
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

	const [loader, setLoader] = useState<boolean>(false);

	function changeLoader() {
		setLoader((prev) => !prev);
	}

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

	async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		changeLoader();
		if (verifyPassword()) {
			const data: CreateAccountTypes = {
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				password: formData.password,
			};

			const response = await CreateAccount(data);
			if (response.data.message === "success") {
				redirect("/");
			} else if (response.data.message === "user already exists") {
				alert("An account already exists with this email");
			} else {
				alert("something went wrong please try again");
			}
		} else {
			alert("Passwords do not match");
		}
		changeLoader();
	}

	function verifyPassword(): boolean {
		if (formData.password === formData.confirmPassword) {
			return true;
		}
		return false;
	}

	async function handleSigIn(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		changeLoader()
		const response = await signIn(formData)

		if (response.data.message === 'success'){
			redirect("/");
		}else if (response.data.message === 'incorrect password'){
			alert('Wrong Password')
		}else{
			alert('An account with this email does not exist')
		}
		
		changeLoader()
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
							className='bg-varCallToAction h-11 rounded mt-3 hover:opacity-80'>
							{loader? <Spinner /> : 'Sign Up'}
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
							className='bg-varCallToAction h-11 rounded mt-3 hover:opacity-80'>
							{loader? <Spinner /> : 'Sign In'}
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
