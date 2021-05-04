import Link from "next/link";

interface Props {
    route: string;
}

export default function ReadMoreLink({ route }: Props) {
    return (
        <Link href={route}>
            Read More
        </Link>
    )
}