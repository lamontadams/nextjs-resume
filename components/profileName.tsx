import { PersonalData } from "../models/personalData";

interface Props {
    personal: PersonalData;
}
export default function ProfileName({ personal }: Props) {
    return (
        <div className="name-wrapper">
            <h1>{personal.firstName}<br />{personal.lastName}</h1>
        </div>
    )
}