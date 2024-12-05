import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./alert";

export function ErrorAlert({message}:{message:string}) {
	return (
		<Alert variant='destructive' className="md:max-w-[50%]">
			<AlertCircle className='h-4 w-4' />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>
				{message}
			</AlertDescription>
		</Alert>
	);
}
