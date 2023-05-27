import http from "k6/http";
import { sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

export let successRate = new Rate("request_success_rate");
export let requestDuration = new Trend("request_duration");

export let options = {
  vus: 100,
  duration: "1m",

  thresholds: {
    request_success_rate: ["rate>=0.8"],

    request_duration: ["p(95)<300000"],
  },
};

export default function () {
  let start = new Date().getTime();
  let res = http.get("https://reqres.in/api/users");
  let end = new Date().getTime();
  let duration = end - start;

  successRate.add(res.status === 200);
  requestDuration.add(duration);

  sleep(1);
}
