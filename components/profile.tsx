import { PersonalData } from "../models/personalData";
import ProfileContact from "./profileContact";
import ProfileName from "./profileName";
import ProfileSocial from "./profileSocial";
import ProfileContent from "./profileContent";
import { isNil } from "lodash";
interface Props {
    personal: PersonalData;
}

export default function Profile({ personal }: Props) {
    return (
    <section className="profile section-padding">
        <div className="container">
            <div className="picture-resume-wrapper">
                <div className="picture-resume">
                    <span>
                        <img src={personal.picture} alt={personal.name} />
                    </span>
                    <svg version="1.1" viewBox="0 0 350 350">

                        <defs>
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9" result="cm" />
                            </filter>
                        </defs>


                        <g filter="url(#goo)" >

                            <circle id="main_circle" className="st0" cx="171.5" cy="175.6" r="145" />

                            {/* <circle id="circle" className="bubble0 st1" cx="171.5" cy="175.6" r="122.7" />
                            <circle id="circle" className="bubble1 st1" cx="171.5" cy="175.6" r="122.7" />
                            <circle id="circle" className="bubble2 st1" cx="171.5" cy="175.6" r="122.7" />
                            <circle id="circle" className="bubble3 st1" cx="171.5" cy="175.6" r="122.7" />
                            <circle id="circle" className="bubble4 st1" cx="171.5" cy="175.6" r="122.7" />
                            <circle id="circle" className="bubble5 st1" cx="171.5" cy="175.6" r="122.7" />
                            <circle id="circle" className="bubble6 st1" cx="171.5" cy="175.6" r="122.7" />
                            <circle id="circle" className="bubble7 st1" cx="171.5" cy="175.6" r="122.7" />
                            <circle id="circle" className="bubble8 st1" cx="171.5" cy="175.6" r="122.7" />
                            <circle id="circle" className="bubble9 st1" cx="171.5" cy="175.6" r="122.7" />
                            <circle id="circle" className="bubble10 st1" cx="171.5" cy="175.6" r="122.7" />  */}

                        </g>
                    </svg>
                </div>
            <div className="clearfix"></div>
        </div>
        <ProfileName personal={personal} />
        <div className="clearfix"></div>
        <ProfileContact personal={personal} />
        <ProfileContent personal={personal} />
        <ProfileSocial personal={personal} />
        <div className="clearfix"></div>

        {(!isNil(personal.aboutSite) && <div className="about-site" dangerouslySetInnerHTML={{__html: personal.aboutSite}}></div>)}
    </div>
</section>

    )

}