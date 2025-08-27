import axios, { AxiosInstance } from "axios";

interface BuildClientContext {
  req?: {
    headers: {
      [key: string]: string;
    };
  };
}

const buildClient = ({ req }: BuildClientContext): AxiosInstance => {
  if (typeof window === "undefined") {
    // Server side
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req?.headers,
    });
  } else {
    // Client side
    console.log('building client for browser');
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
