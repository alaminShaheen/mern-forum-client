import { QuestionFormType } from "Components/AppComponents/AskQuestionForm";
import config from "Config/config";
import AxiosInstances from "Interceptors/config";
import { UpdateQuestionType } from "Pages/Post";

const getAllQuestions = async () => {
    return await AxiosInstances.authHttpService.get(config.apiEndpoints.questions);
};

const getQuestion = async (questionId: string) => {
    return await AxiosInstances.authHttpService.get(`${config.apiEndpoints.questions}/${questionId}`);
};

const postQuestion = async (formData: QuestionFormType) => {
    return await AxiosInstances.authHttpService.post(`${config.apiEndpoints.questions}/create`, formData);
};

const updateQuestion = async (formData: UpdateQuestionType, questionId: string) => {
    return await AxiosInstances.authHttpService.put(`${config.apiEndpoints.questions}/update/${questionId}`, formData);
};

const deleteQuestion = async (questionId: string) => {
    return await AxiosInstances.authHttpService.delete(`${config.apiEndpoints.questions}/delete/${questionId}`);
};

const QuestionServices = {
    getAllQuestions,
    getQuestion,
    postQuestion,
    updateQuestion,
    deleteQuestion,
};

export default QuestionServices;
