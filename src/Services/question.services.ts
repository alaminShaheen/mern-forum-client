import { QuestionFormType } from "Components/AppComponents/AskQuestionForm";
import config from "Config/config";
import { authHttpService } from "Interceptors/config";

const getAllQuestions = async () => {
	return await authHttpService.get(config.apiEndpoints.questions);
};

const postQuestion = async (formData: QuestionFormType) => {
	return await authHttpService.post(`${config.apiEndpoints.questions}/create`, formData);
};

const QuestionServices = {
	getAllQuestions,
	postQuestion
};

export default QuestionServices;
