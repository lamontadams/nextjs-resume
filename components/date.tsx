import { parseISO, format } from "date-fns";

interface Props {
    dateString?: string,
    dateFormat?: string
}
const DEFAULT_FORMAT = "LLLL yyyy";

export default function Date({ dateString, dateFormat }: Props) {
    const date = parseISO(dateString);
    dateFormat = dateFormat || DEFAULT_FORMAT;
    return <time dateTime={dateString}>{format(date, dateFormat)}</time>
}