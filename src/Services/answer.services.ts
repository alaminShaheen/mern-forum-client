import config from "Config/config";
import AxiosInstances from "Interceptors/config";
import { Answer } from "Models/answer.model";

export const postAnswer = async (
	questionId: string,
	answer: { Description: string; CreatedBy: string }
) => {
	return await AxiosInstances.authHttpService.post(
		`${config.apiEndpoints.answers}/create/${questionId}`,
		answer
	);
};

const AnswerServices = {
	postAnswer,
};

export default AnswerServices;
