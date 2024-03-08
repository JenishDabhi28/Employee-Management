import axios from 'axios';

const BASE_API_URL = "http://localhost:8080/api/v1";
const BASE_API_URLL =  "http://localhost:8080/api"
const EmpService = {
  saveEmp: (emp) => {
    return axios.post(BASE_API_URL + "/save", emp);
  },
  getAllEmp: () => {
    return axios.get(BASE_API_URL + "/");
  },
  getEmpById: (id) => {
    return axios.get(BASE_API_URL + "/" + id);
  },
  deleteEmpById: (id) => {
    return axios.get(BASE_API_URL + "/delete/" + id);
  },
  updateEmpById: (id, emp) => {
    return axios.post(BASE_API_URL + "/update/" + id, emp);
  },

  User:(id, username)=>{
    return axios.get(BASE_API_URLL + "/user/" + id, username);

  }
};

export default EmpService;



// import React from 'react';
// import axios from 'axios';

// const BASE_API_URL="http:/localhost:8080/";

// const EmpService = () => {
 
//     saveEmp(emp)
//     {
//         return axios.post(BASE_API_URL+"/save",emp);
//     }

//     getAllEmp()
    
//     {
//         return axios.post(BASE_API_URL+"/");
//     }

//     getEmpByid(id)
    
//     {
//         return axios.post(BASE_API_URL+"/"+id);
//     }

//     deleteEmpid(id)
    
//     {
//         return axios.post(BASE_API_URL+"/delete/"+id);
//     }

//     updateEmpid(id, emp)
    
//     {
//         return axios.post(BASE_API_URL+"/update/"+id);
//     }
// }

// export default EmpService;

