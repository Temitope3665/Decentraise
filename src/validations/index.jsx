import * as yup from "yup";

export const CreateProjectSchema = yup.object().shape({
    project_name: yup.string().required('Project name is required').min(2, 'Project name should be at least 2 characters'),
    tagline: yup.string().required('Tagline is required').min(2, 'Tagline should be at least 2 characters').max(50, 'Tagline should be at least 50 characters'),
    project_description: yup.string().required('Project description is required').min(2, 'Tagline should be at least 2 characters'),
    goal: yup.string().required('Goal is required'),
    duration: yup.number().required('Duration is required'),
  });