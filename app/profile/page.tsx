"use client";
import StoryCard from "@/components/ui/storyCard/storyCard";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getUserData } from "@/client_actions/getUserData";
import { getProjectImages } from "@/client_actions/getProjectImages";
import { useLogInStatus } from "@/contexts/loggedInStatusContext";
import checkSignIn from "@/client_actions/utils/checkSignIn";
import { NormalAlert } from "@/components/ui/alert/normalAlert";
import { getProjectData } from "@/client_actions/getPeojectData";

export default function Profile() {
	const { loggedInStatus, setLoggedInStatus } = useLogInStatus();
	const [selectedTab, setSelectedTab] = useState<"Storyboards" | "queries">(
		"Storyboards"
	);
	const [usersName, setUsersName] = useState('')
	const [sidenavTabData, setSidenavTabData] = useState<{
		Storyboards: [string, string, any] | any[];
		queries: [string, string, any] |any[];
	}>({ Storyboards: [], queries: [] });

	function generateCards() {
		return sidenavTabData[`${selectedTab}`].map((item, index) => {
			
			if (selectedTab === "Storyboards") {
				console.log(item)
				return (
					<StoryCard
						key={item[0]}
						img={item[1]}
						id={item[0]}
						date = {item[2].dateCreated}
						num={item[2].scenes[0].scenes.length}
					/>
				);
			} else if (selectedTab === "queries") {
				return (
					<div
						key={index}
						className='h-48 w-full overflow-auto rounded-lg p-4 bg-gray-100 dark:bg-gray-800 shadow-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'>
						<p className='whitespace-pre-wrap leading-relaxed'>
							{item}
						</p>
					</div>
				);
			}
		});
	}

	const cards = generateCards();
	useEffect(() => {
		async function run() {
			const alreadySignedIn = await checkSignIn();
			setLoggedInStatus(alreadySignedIn.message === "logged in");
		}
		run();
	}, []);

	useEffect(() => {
		const doIt = async () => {
			const userData = await getUserData();

			const info: [string, string, any] = await Promise.all(
				userData.projects.map(async (item: string) => {
					const images = await getProjectImages(item);
					const projectData = await getProjectData(item);
					if (images.hasImages) {
						return [item, images.images[0], projectData];
					} else {
						return [item, "/assets/image.webp", projectData];
					}
				})
			) as [string, string, any];
			setUsersName(`${userData.firstName} ${userData.lastName}`)
			console.log(userData)
			setSidenavTabData(({
				queries: info.map((item) => item[2].prompt),
				Storyboards: info.filter((item) => item[1] !== ""),
			}));
		};

		if (loggedInStatus) {
			doIt();
		}
	}, [loggedInStatus]);

	function handleTabSelect(e: React.MouseEvent<HTMLDivElement>) {
		const name = e.currentTarget.id;
		setSelectedTab(name as "Storyboards" | "queries");
	}

	if (loggedInStatus === null) {
		return <div>loading...</div>;
	} else {
		return loggedInStatus ? (
			<div className='flex'>
				<div className='h-[78vh] w-1/6 border-r-2 border-border px-3'>
					<div className='flex items-center flex-col mb-12'>
						<div className='aspect-square w-full relative bg-gray-200 dark:bg-gray-600'>
							<Image
								src='/assets/user.svg'
								fill
								objectFit='contain'
								alt='profile image'
								className='dark:invert'
							/>
						</div>
						<div className='w-full text-center mt-2'>{usersName}</div>
					</div>
					<div
						id='Storyboards'
						className={`h-10 bg-border flex items-center justify-center rounded-md mb-1 hover:opacity-80 hover:cursor-pointer ${
							selectedTab == "Storyboards"
								? "bg-varCallToAction"
								: ""
						}`}
						onClick={handleTabSelect}>
						Storyboards
					</div>
					<div
						id='queries'
						className={`h-10 bg-border flex items-center justify-center rounded-md mb-1 hover:opacity-80 hover:cursor-pointer ${
							selectedTab == "queries" ? "bg-varCallToAction" : ""
						}`}
						onClick={handleTabSelect}>
						Queries
					</div>
				</div>
				<div className='container h-[78vh] overflow-auto grid lg:grid-cols-4 gap-3 md:grid-cols-3 grid-cols-2 mx-5 border border-border p-1 rounded-lg'>
					{cards}
				</div>
			</div>
		) : (
			<div className='container mx-auto flex items-center justify-center w-full  min-w-full'>
				<NormalAlert message='Log in to view your profile' />
			</div>
		);
	}
}
