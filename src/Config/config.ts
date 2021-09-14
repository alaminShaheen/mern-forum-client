const config = {
	server: {
		port: 1337, 
		url: process.env.NODE_ENV === "production" ? "https://mern-forum-app-server.herokuapp.com" : "http://localhost:1337"
	},
	apiEndpoints: {
		questions: process.env.NODE_ENV === "production" ? `https://mern-forum-app-server.herokuapp.com/questions` : "http://localhost:1337/questions",
		answers: process.env.NODE_ENV === "production" ? "https://mern-forum-app-server.herokuapp.com/answers" : "http://localhost:1337/answers",
		auth: process.env.NODE_ENV === "production" ? "https://mern-forum-app-server.herokuapp.com" : "http://localhost:1337"
	}
};

export default config;
