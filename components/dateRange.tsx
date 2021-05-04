import { isNil } from "lodash";
import Date from "./date";

interface Props {
    startDateString?: string;
    endDateString?: string;
    dateFormat?: string;
}


export default function DateRange({ startDateString, endDateString, dateFormat }: Props) {
    return <span>
        {isNil(startDateString) ? <></> : <Date dateString={startDateString} dateFormat={dateFormat} /> }
        {isNil(startDateString) ? <></> : <> &ndash; </>}
        {isNil(endDateString) ? <span>Present</span> : <Date dateString={endDateString} dateFormat={dateFormat} />}

    </span>;
}