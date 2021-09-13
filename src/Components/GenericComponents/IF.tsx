import { ReactNode } from "react";

interface IIF {
	predicate: boolean;
	children: ReactNode;
}

const IF = ({ predicate, children }: IIF) => {
	return predicate ? <>{children}</> : <></>;
};

export default IF;
