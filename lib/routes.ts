class Routes {
    employment=(id: string) => `/employment/${id}`;
    project=(id: string) => `/projects/${id}`;
    skill=(id: string) => `/skills/${id}`;
    home="/";
}

export default new Routes();