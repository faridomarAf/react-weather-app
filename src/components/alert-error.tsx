import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

interface AlertErrorProps {
    onClick?: ()=> void,
    title: string;
    errorMessage: string;
    useForLocationError?: boolean;
    useForCoordinates?: boolean;
}

export default function AlertError({onClick, title, errorMessage,useForLocationError = false, useForCoordinates = false}: AlertErrorProps) {
    
    return (
        <Alert variant={'destructive'}>
            {useForLocationError && <AlertTriangle className="h-4 w-4"/>}
            {useForCoordinates && <MapPin className="h-4 w-4" />}
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
                <p>{errorMessage}</p>
                <Button onClick={onClick} variant={'outline'} className="w-fit">
                    {useForCoordinates || useForLocationError ? (<MapPin className="mr-2 w-4 h-4"/>) :
                    (<RefreshCw className="mr-2 h-4 w-4" />)
                    }
                    {useForCoordinates || useForLocationError ? 'Enable location': 'Retry'}
                </Button>
            </AlertDescription>
        </Alert>
    )
}
