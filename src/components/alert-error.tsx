import { AlertTriangle, MapPin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Coordinates } from "../types/types";

interface AlertErrorProps {
    locationError: string | null,
    onClick: ()=> void,
    coordinates: Coordinates | null;
}

export default function AlertError({locationError, onClick, coordinates}: AlertErrorProps) {
    
    if(locationError){
        return (
            <Alert variant={'destructive'}>
                <AlertTriangle className="h-4 w-4"/>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>{locationError}</p>
                    <Button onClick={onClick} variant={'outline'} className="w-fit">
                        <MapPin className="mr-2 w-4 h-4"/>
                        Enable location
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    if (!coordinates){
        return (
            <Alert variant={'destructive'}>
                <AlertTitle>Location required!</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Please enable location access to see your local weather</p>
                    <Button onClick={onClick} variant={'outline'} className="w-fit">
                        <MapPin className="mr-2 w-4 h-4"/>
                        Enable location
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }
}
