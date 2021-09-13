interface ITitle {
	titleText: string;
}

const Title = ({ titleText }: ITitle) => {
	return <h1 style={{ textAlign: "center" }}>{titleText}</h1>;
};

export default Title;
