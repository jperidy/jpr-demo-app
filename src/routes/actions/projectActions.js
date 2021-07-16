export const getProjects = async () => {
    const res = await fetch('/api/project.json');

    let projects = [];

    if(res.ok) {
        try {
            const data = await res.json();
            projects = data.projects;
        } catch (error) {
            console.log(error);
        }
    }
    //console.log(projects);
    return projects;
};