import axios from "axios";

export function requestGetProducts() {
    return axios.request({
        method:"get",
        url: 'https://dummyjson.com/products',
    })
}