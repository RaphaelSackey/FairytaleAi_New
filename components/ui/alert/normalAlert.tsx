import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./alert";

export function NormalAlert(message:string) {
	return (
		<Alert className="md:max-w-[50%]">
			<Terminal className='h-4 w-4' />
			<AlertTitle>Heads up!</AlertTitle>
			<AlertDescription>
            {message}
			</AlertDescription>
		</Alert>
	);
}
