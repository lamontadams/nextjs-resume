import { PersonalData } from "../models/personalData";

interface Props {
    personal: PersonalData;
}

export default function ProfileSlug({ personal }: Props) {
    const content = { __html: personal.content };
    return (
        <div className="contact-presentation">
            <div dangerouslySetInnerHTML={ content }></div>
        </div>
    )
}