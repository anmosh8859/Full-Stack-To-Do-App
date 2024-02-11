
// export function retrieveHelloWorldBean(){
//     return axios.get('http://localhost:8081/hello-world-bean')
// }

import axios from "axios"

// or
const apiClient = axios.create(
    {
        baseURL:'http://localhost:8081'
    }
)
export const retrieveHelloWorldBean = () => apiClient.get('/hello-world-bean')

export const retrieveHelloWorldBeanWithPathParam = (param) => apiClient.get(`/hello-world/path-variable/${param}`)