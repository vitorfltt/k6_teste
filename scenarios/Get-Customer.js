import http from "k6/http";
import { sleep } from "k6";
import { Rate } from "k6/metrics";

export let successRate = new Rate("request_success_rate");

export let options = {
  vus: 100,
  duration: "1m",
  thresholds: {
    request_success_rate: ["rate>=0.8"],
    http_req_duration: ["p(95)<300000"],
  },
};

export default function () {
  let res = http.get("https://reqres.in/api/users");

  successRate.add(res.status === 200);

  sleep(1);
}
