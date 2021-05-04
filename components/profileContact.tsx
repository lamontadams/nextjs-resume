import { isNil } from "lodash";
import { PersonalData } from "../models/personalData";

interface Props {
    personal: PersonalData;
}

export default function Contact({ personal }: Props) {
    return (
        <>
        <div className="contact-info clearfix">
            <ul className="list-titles">
                { !isNil(personal.phone) ? (<li>Call</li>) : <></>}
                { !isNil(personal.email) ? (<li>EMail</li>) : <></>}
                { !isNil(personal.web) ? (<li>Web</li>) : <></>}
                { !isNil(personal.home) ? (<li>Home</li>) : <></>}
            </ul>
            <ul className="list-content ">
                { !isNil(personal.phone) ? (<li>{personal.phone}</li>) : <></>}
                { !isNil(personal.email) ? (<li>{personal.email}</li>) : <></>}
                { !isNil(personal.web) ? ( <li><a href={personal.web}>{personal.web}</a></li>) : <></>}
                { !isNil(personal.home) ? (<li>{personal.home}</li>) : <></>}
            </ul>
        </div>
        </>
    );
}