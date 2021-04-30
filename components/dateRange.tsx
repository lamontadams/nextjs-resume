import { isNil } from "lodash";
import Date from "./date";

interface Props {
    startDateString: string;
    endDateString?: string;
    dateFormat?: string;
}


export default function DateRange({ startDateString, endDateString, dateFormat }: Props) {
    return <span>
        <Date dateString={startDateString} dateFormat={dateFormat} /> 
        {<> &ndash; </>}
        {isNil(endDateString) ? <span>Present</span> : <Date dateString={endDateString} dateFormat={dateFormat} />}

    </span>;
}