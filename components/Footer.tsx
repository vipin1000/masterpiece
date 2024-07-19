import React from "react";
import {
	GitHubLogoIcon,
	DiscIcon,
	LinkedInLogoIcon,
	DiscordLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
export default function Footer() {
	return (
		<footer className=" border-t py-10">
			<div className="max-w-7xl py-10 px-5 md:p-0 space-y-5  mx-auto flex justify-between md:items-end flex-col md:flex-row">
				<div className="space-y-10">
					<div className="space-y-2 w-full sm:w-96">
						<h1 className="text-3xl font-bold">Hardware Garage</h1>
						<p className="">
						get the knowledge of  mechatronics 	and robotics
						</p>
					</div>
					<div className="flex items-center gap-2">
						<GitHubLogoIcon className="w-5 h-5" />
						<LinkedInLogoIcon className="w-5 h-5" />
						<DiscordLogoIcon className="w-5 h-5" />
					</div>
				</div>

				<h1 className="text-sm">
					&copy; 2024 Ashish Rohilla.All right reserved
				</h1>
				<Link
				href="/privacypolicy">
				<h1>priacy policy</h1>
				</Link>
				<Link
				href="/contactus">
				<h1>contact us</h1>
				</Link><Link
				href="/aboutus">
				<h1>About us </h1>
				</Link>
			</div>
		</footer>
	);
}
