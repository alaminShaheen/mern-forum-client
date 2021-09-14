import { QuestionFormType } from 'Components/AppComponents/AskQuestionForm';
import config from 'Config/config';
import AxiosInstances from 'Interceptors/config';

const getAllQuestions = async () => {
    return await AxiosInstances.authHttpService.get(config.apiEndpoints.questions);
};

const getQuestion = async (questionId: string) => {
    return await AxiosInstances.authHttpService.get(`${config.apiEndpoints.questions}/${questionId}`);
};

const postQuestion = async (formData: QuestionFormType) => {
    return await AxiosInstances.authHttpService.post(`${config.apiEndpoints.questions}/create`, formData);
};

const QuestionServices = {
    getAllQuestions,
    getQuestion,
    postQuestion,
};

export default QuestionServices;
