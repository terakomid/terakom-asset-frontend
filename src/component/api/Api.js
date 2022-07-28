import axios from "axios";

// let apiURL = "http://localhost:8000/api/";
let apiURL = "http://api-asset.terakom.id/api/";

const axiosInstance = axios.create({
   baseURL: apiURL,
   headers: {
      Authorization:
         "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzVkYzRmYmExZTEwZGM3YmFiZTllMTBlOTk0NDYxMzM2ZDU3ZDExMDg1YzZlMWY2NjIyN2U2YmRmMzI2YWNjOGJlZTdiMjk5NTNiNDEyODkiLCJpYXQiOjE2NTkwNDk2NjcuNDU5MTQ2LCJuYmYiOjE2NTkwNDk2NjcuNDU5MTUyLCJleHAiOjE2OTA1ODU2NjcuNDA0OTkxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.GokKHfw0Pt_K8rKEzk3ZdQ7BdWpJBsF6BnyvZMkevTgUFBQr-Nus0pY1yDRPeo6TcPEftXXq1g2lTGiNs3Z3vq9jxZrzdWTSrIou7unScbcHzszuVUxT0ytfFFwj9NIN4-t6rBEnzfmjXzuSnikBdsBj0n2fdtfLnaCNj9vEf03gzZ0JqRDTC2Xk9CdBk73yL6FCvtuzcJ6Bu14yU-UQM-yiooLxrr0kD4dh2QUskRmPHuBK2YOe4DdTialRFaV_ek6r_v7-4iN-hu66VWkszsmN0tOdnNDm_1j3cfwEqOdv_Y7yQqijAbzAg9YFt3H_ETNQ9l4jXh0OFStl_fNv6vo-ICrWK5uA2toNBtf5Qab4ZbgelgN7k1mcMteYl88MN2QVy3eWwK-swOUKXffXN9DUhPYS3hqHESGNtoCVYV2V8TOMVOkftwXvS0snFU4rN77iO6GHWowinJ0tzs7OEcy-dZAilQhTZ9QX7K3NMck5pADXLxki9WJ9Jq4TlSLtF-TkFfInulmX1F02hhLwFKZDJ826fSPsZf_A5KnjoP415HPNWKjG-ecs4gv5BdjnvGsqADtCWlUIpl6keLJe9eh_xqk8h17-tIn7bxZdMFQuk57ZV8QnKJw4dDuZk9fhINwiI1CDXz4ZonZZ4QXFvy_GbHYcWoP7b8z1TIubGuQ",
      "Content-Type": "application/json",
   },
});

export default axiosInstance;
