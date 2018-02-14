import axios from 'axios';

interface IFetchRepos {
  type: 'orgs' | 'users';
  name: string;
  page: string;
  per_page: string;
}

export const API_LINK = 'https://api.github.com';

export const fetchRepos = ({type, name, page, per_page}: IFetchRepos) => {
  return axios.get(`${API_LINK}/${type}/${name}/repos`, { params: {page, per_page} }).then(response => response.data);
}
